/**
 * @name PluginHub
 * @version 1.0.1
 * @description A plugin store inside BetterDiscord's settings - browse, install, update and remove unofficial plugins from Pharaoh2k's hub and other sources, with hash-verified downloads.
 * @author Pharaoh2k
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/PluginHub/PluginHub.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/PluginHub/PluginHub.plugin.js
 */
/*
 * Copyright © 2026-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * * *
 * Contributions are welcome via GitHub pull requests.
 */
"use strict";

const fs = require("fs");
const path = require("path");

//#region Constants
const PLUGIN_NAME = "PluginHub";
const DISPLAY_NAME = "Plugin Hub";
const PLUGIN_VERSION = "1.0.1";
const SUPPORTED_SCHEMA = 1;
const BUILTIN_SOURCE = {
	id: "pluginhub",
	name: "Plugin Hub",
	url: "https://raw.githubusercontent.com/Pharaoh2k/pluginhub-registry/main/index.json",
	builtin: true
};
const KEYS = {
	item: "pluginhub_sidebarItem",
	panel: "pluginhub_panel",
	category: "pluginhub_category",
	custom: "pluginhub_custom",
	section: "pluginhub_section"
};
const BD_SECTION_KEY = "betterdiscord_betterdiscord_section";
const BD_PLUGINS_ITEM_KEY = "betterdiscord_plugins_sidebarItem";
const FALLBACK_AFTER_SECTION_KEY = "games_and_apps_section";
const ALLOWED_HOSTS = ["raw.githubusercontent.com", "cdn.jsdelivr.net", "github.com", "objects.githubusercontent.com", "pharaoh2k.github.io"];
const BACKUP_ROOT = ".pluginhub";
const FILE_NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._ -]*\.plugin\.js$/;
const SORTS = [
	{ label: "Recently updated", value: "updated" },
	{ label: "Name", value: "name" },
	{ label: "Recently added", value: "added" },
	{ label: "Author", value: "author" }
];
const DEFAULT_SETTINGS = {
	extraSources: "",
	checkForUpdates: true,
	updateIntervalHours: 4,
	startupDelaySeconds: 20,
	notifyUpdates: true,
	notifyScope: "all",
	enableAfterInstall: true,
	editAction: "bd",
	autoUpdateFirstParty: false,
	showNewBadges: true,
	showDeprecated: false,
	placeUnderBdHeader: true,
	backupsToKeep: 5,
	sort: "updated"
};
//#endregion

//#region Helpers
const React = BdApi.React;
const h = React.createElement;

function cn(...parts) {
	return parts.filter(Boolean).join(" ");
}

function lower(value) {
	return String(value || "").trim().toLowerCase();
}

function formatBytes(size) {
	if (!Number.isFinite(size) || size <= 0) return "";
	if (size < 1024) return `${size} B`;
	if (size < 1024 * 1024) return `${(size / 1024).toFixed(size < 10240 ? 1 : 0)} KB`;
	return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function relativeTime(value) {
	const time = new Date(value).getTime();
	if (!Number.isFinite(time)) return "";
	const diff = Date.now() - time;
	const minutes = Math.round(diff / 60000);
	if (minutes < 1) return "just now";
	if (minutes < 60) return `${minutes} min ago`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `${hours} h ago`;
	const days = Math.round(hours / 24);
	if (days < 30) return `${days} d ago`;
	const months = Math.round(days / 30);
	if (months < 12) return `${months} mo ago`;
	return `${Math.round(months / 12)} y ago`;
}

function parseVersionParts(version) {
	return String(version || "0").split(/[.-]/).map(part => {
		const n = parseInt(part, 10);
		return Number.isFinite(n) ? n : 0;
	});
}

/** Returns 1 when `remote` is newer than `local`, -1 when older, 0 when equal. */
function compareVersions(local, remote) {
	try {
		const result = BdApi.Utils.semverCompare(String(local), String(remote));
		if (result === 1 || result === -1 || result === 0) return result;
	} catch {
		// fall through to the manual comparison
	}
	const a = parseVersionParts(local);
	const b = parseVersionParts(remote);
	const length = Math.max(a.length, b.length);
	for (let i = 0; i < length; i++) {
		const x = a[i] || 0;
		const y = b[i] || 0;
		if (x !== y) return y > x ? 1 : -1;
	}
	return 0;
}

/** Parses the JSDoc meta block at the top of a plugin file. */
function parseMeta(text) {
	const block = String(text).match(/^\s*\/\*\*([\s\S]*?)\*\//);
	if (!block) return null;
	const meta = {};
	for (const rawLine of block[1].split(/\r?\n/)) {
		const line = rawLine.replace(/^\s*\*\s?/, "");
		const match = line.match(/^@(\w+)\s+(.*)$/);
		if (match) meta[match[1]] = match[2].trim();
	}
	return meta.name ? meta : null;
}

async function sha256Hex(bytes) {
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function isLocalSource(url) {
	return /^file:/i.test(url) || /^[A-Za-z]:[\\/]/.test(url) || url.startsWith("\\\\") || url.startsWith("/");
}

function localPathOf(url) {
	if (/^file:/i.test(url)) {
		try { return decodeURIComponent(new URL(url).pathname.replace(/^\/([A-Za-z]:)/, "$1")); }
		catch { return url.replace(/^file:\/*/i, ""); }
	}
	return url;
}

function openExternal(url) {
	if (!url || !/^https:\/\//i.test(url)) return;
	window.open(url, "_blank", "noopener,noreferrer");
}

function hashHue(text) {
	let hash = 0;
	for (const ch of String(text)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
	return hash % 360;
}

/** Capital letters of a name, up to four (BetterPinDMs -> BPDM); falls back to the first two characters. */
function initials(name) {
	const capitals = String(name).replace(/[^A-Z]/g, "");
	if (capitals.length >= 2) return capitals.slice(0, 4);
	return String(name).replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "?";
}

class HubError extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
	}
}
//#endregion

//#region Stores
/** Utils.Store with a revision counter so React components can subscribe cheaply. */
class Store extends BdApi.Utils.Store {
	constructor() {
		super();
		this.revision = 0;
	}
	emitChange() {
		this.revision++;
		super.emitChange();
	}
}

class SettingsStore extends Store {
	constructor(api) {
		super();
		this.api = api;
		const saved = api.Data.load("settings");
		this.data = Object.assign({}, DEFAULT_SETTINGS, saved && typeof saved === "object" ? saved : {});
	}
	get(key) {
		return this.data[key];
	}
	set(key, value) {
		this.data[key] = value;
		this.api.Data.save("settings", this.data);
		this.emitChange();
	}
	/** Built-in source first, then any extra URLs or local paths the user configured. */
	get sources() {
		const extras = String(this.data.extraSources || "").split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
		return [BUILTIN_SOURCE, ...extras.map((url, i) => ({ id: `extra-${i + 1}`, name: isLocalSource(url) ? path.basename(localPathOf(url)) : url.replace(/^https?:\/\//, "").split("/")[0], url, builtin: false }))];
	}
}

class IndexStore extends Store {
	constructor(api, settings) {
		super();
		this.api = api;
		this.settings = settings;
		this.entries = new Map();
		this.errors = new Map();
		this.status = "idle";
		this.loading = false;
		this.lastFetched = 0;
		this.cache = api.Data.load("index-cache") || {};
		const known = api.Data.load("known");
		this.known = known && typeof known === "object" ? known : { initialized: false, seen: {} };
		if (!this.known.seen) this.known.seen = {};
	}

	loadFromCache() {
		let any = false;
		for (const source of this.settings.sources) {
			const cached = this.cache[source.id];
			if (cached?.body && cached.url === source.url) {
				try { this.ingest(source, cached.body); any = true; }
				catch (e) { this.api.Logger.warn(`Cached index for ${source.name} is unusable:`, e); }
			}
		}
		if (any) {
			this.status = "ready";
			this.lastFetched = Math.max(...Object.values(this.cache).map(c => c?.fetchedAt || 0));
		}
		this.emitChange();
	}

	refresh(options = {}) {
		if (this.loading) return this.pending;
		this.loading = true;
		this.pending = this._refresh(options).finally(() => { this.loading = false; this.pending = null; this.emitChange(); });
		this.emitChange();
		return this.pending;
	}

	async _refresh({ force = false } = {}) {
		this.status = this.entries.size ? "ready" : "loading";
		this.emitChange();
		const sources = this.settings.sources;
		const activeIds = new Set(sources.map(s => s.id));
		for (const key of [...this.entries.keys()]) {
			if (!activeIds.has(this.entries.get(key).sourceId)) this.entries.delete(key);
		}
		let okCount = 0;
		for (const source of sources) {
			try {
				const body = await this.fetchSource(source, force);
				this.ingest(source, body);
				this.errors.delete(source.id);
				okCount++;
			} catch (e) {
				this.api.Logger.warn(`Could not load index "${source.name}":`, e);
				this.errors.set(source.id, { source, message: e.message || String(e), code: e.code || "fetch" });
				if (e.code === "schema") {
					for (const key of [...this.entries.keys()]) {
						if (this.entries.get(key).sourceId === source.id) this.entries.delete(key);
					}
				}
			}
		}
		if (okCount) this.lastFetched = Date.now();
		this.status = this.entries.size ? "ready" : (this.errors.size ? "error" : "ready");
		if (!this.known.initialized && this.entries.size) {
			// First successful load: everything that exists now counts as seen, so NEW only marks later additions.
			for (const entry of this.entries.values()) this.known.seen[entry.key] = entry.version;
			this.known.initialized = true;
			this.saveKnown();
		}
		this.emitChange();
	}

	async fetchSource(source, force) {
		let body;
		let etag = null;
		if (isLocalSource(source.url)) {
			body = JSON.parse(fs.readFileSync(localPathOf(source.url), "utf8"));
		} else {
			if (!/^https:\/\//i.test(source.url)) throw new HubError("url", "Only https:// index URLs are allowed");
			const cached = this.cache[source.id];
			const headers = { "Cache-Control": "no-cache", "Pragma": "no-cache" };
			if (cached?.etag && !force && cached.url === source.url) headers["If-None-Match"] = cached.etag;
			const url = force ? `${source.url}${source.url.includes("?") ? "&" : "?"}t=${Date.now()}` : source.url;
			const res = await this.api.Net.fetch(url, { headers, timeout: 20000, maxRedirects: 5 });
			if (res.status === 304 && cached?.body) {
				body = cached.body;
				etag = cached.etag;
			} else if (!res.ok) {
				throw new HubError(res.status === 429 ? "ratelimit" : "http", `HTTP ${res.status}`);
			} else {
				body = await res.json();
				try { etag = res.headers?.get?.("etag") ?? res.headers?.etag ?? null; } catch { etag = null; }
			}
		}
		this.validateSchema(body);
		this.cache[source.id] = { url: source.url, etag, fetchedAt: Date.now(), body };
		this.api.Data.save("index-cache", this.cache);
		return body;
	}

	validateSchema(body) {
		if (!body || typeof body !== "object" || !Array.isArray(body.addons)) throw new HubError("schema", "Index has no addons list");
		if (Number(body.schema_version) > SUPPORTED_SCHEMA) throw new HubError("schema", `Index schema ${body.schema_version} needs a newer ${DISPLAY_NAME}`);
		if (body.min_client_version && compareVersions(PLUGIN_VERSION, body.min_client_version) > 0) throw new HubError("schema", `Index needs ${DISPLAY_NAME} ${body.min_client_version} or newer`);
	}

	ingest(source, body) {
		for (const key of [...this.entries.keys()]) {
			if (this.entries.get(key).sourceId === source.id) this.entries.delete(key);
		}
		const authors = body.authors || {};
		for (const addon of body.addons) {
			if (!addon || typeof addon !== "object" || !addon.file_name || !addon.name || !addon.version) continue;
			if ((addon.type || "plugin") !== "plugin") continue;
			if (!FILE_NAME_RE.test(addon.file_name)) continue;
			const id = String(addon.id || addon.file_name.replace(/\.plugin\.js$/i, "")).toLowerCase();
			const key = `${source.id}/${id}`;
			const authorInfo = Object.assign({ display_name: String(addon.author || "Unknown") }, authors[addon.author] || {});
			let trust = addon.trust || "third-party";
			if (!source.builtin && trust === "first-party") trust = "third-party";
			this.entries.set(key, Object.assign({}, addon, {
				key, id, trust,
				sourceId: source.id,
				sourceName: body.name || source.name,
				sourceBuiltin: !!source.builtin,
				verified: source.builtin ? addon.verified === true : false,
				fileLower: addon.file_name.toLowerCase(),
				nameLower: lower(addon.name),
				authorInfo,
				tags: Array.isArray(addon.tags) ? addon.tags : [],
				features: Array.isArray(addon.features) ? addon.features : [],
				mirrors: Array.isArray(addon.mirrors) ? addon.mirrors : [],
				requires: Array.isArray(addon.requires) ? addon.requires : [],
				replaces: Array.isArray(addon.replaces) ? addon.replaces : [],
				description: String(addon.description || "")
			}));
		}
	}

	/** All entries, with the same file listed by several sources collapsed to one (built-in source wins). */
	getAll() {
		const byFile = new Map();
		for (const entry of this.entries.values()) {
			const current = byFile.get(entry.fileLower);
			if (!current || (entry.sourceBuiltin && !current.sourceBuiltin)) byFile.set(entry.fileLower, entry);
		}
		return [...byFile.values()];
	}

	get(key) {
		return this.entries.get(key);
	}

	findDependency(requirement) {
		const all = this.getAll();
		return all.find(e => requirement.id && e.id === lower(requirement.id))
			|| all.find(e => requirement.file_name && e.fileLower === lower(requirement.file_name))
			|| all.find(e => requirement.name && e.nameLower === lower(requirement.name))
			|| null;
	}

	tagCounts() {
		const counts = new Map();
		for (const entry of this.entries.values()) {
			for (const tag of entry.tags) counts.set(tag, (counts.get(tag) || 0) + 1);
		}
		return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
	}

	isNew(entry) {
		return this.known.initialized && !(entry.key in this.known.seen);
	}

	isUpdatedSinceSeen(entry) {
		const seen = this.known.seen[entry.key];
		return !!seen && seen !== entry.version;
	}

	markSeen(entry) {
		if (this.known.seen[entry.key] === entry.version) return;
		this.known.seen[entry.key] = entry.version;
		this.saveKnown();
		this.emitChange();
	}

	markAllSeen() {
		for (const entry of this.entries.values()) this.known.seen[entry.key] = entry.version;
		this.known.initialized = true;
		this.saveKnown();
		this.emitChange();
	}

	saveKnown() {
		this.api.Data.save("known", this.known);
	}

	clearCache() {
		this.cache = {};
		this.api.Data.save("index-cache", this.cache);
	}
}

class InstalledStore extends Store {
	constructor(api) {
		super();
		this.api = api;
		this.byFile = new Map();
		this.byName = new Map();
		this.watcher = null;
		this.timer = null;
		this.refresh();
	}

	refresh() {
		this.byFile = new Map();
		this.byName = new Map();
		let list = [];
		try { list = this.api.Plugins.getAll() || []; } catch (e) { this.api.Logger.warn("Could not list plugins:", e); }
		for (const addon of list) {
			if (!addon?.filename) continue;
			const record = {
				name: addon.name,
				version: String(addon.version || "0"),
				filename: addon.filename,
				author: addon.author,
				description: addon.description,
				source: addon.source,
				updateUrl: addon.updateUrl,
				modified: addon.modified,
				size: addon.size,
				enabled: this.isEnabled(addon.filename)
			};
			this.byFile.set(addon.filename.toLowerCase(), record);
			if (addon.name) this.byName.set(lower(addon.name), record);
		}
		this.emitChange();
	}

	isEnabled(filename) {
		try { return !!this.api.Plugins.isEnabled(filename); } catch { return false; }
	}

	get(fileName) {
		return this.byFile.get(lower(fileName)) || null;
	}

	getByName(name) {
		return this.byName.get(lower(name)) || null;
	}

	all() {
		return [...this.byFile.values()];
	}

	watch() {
		if (this.watcher) return;
		try {
			this.watcher = fs.watch(this.api.Plugins.folder, { persistent: false }, (eventType, file) => {
				if (file && !/\.plugin\.js$/i.test(String(file))) return;
				clearTimeout(this.timer);
				this.timer = setTimeout(() => this.refresh(), 400);
			});
		} catch (e) {
			this.api.Logger.warn("Could not watch the plugins folder:", e);
		}
	}

	unwatch() {
		clearTimeout(this.timer);
		this.timer = null;
		try { this.watcher?.close(); } catch { /* ignore */ }
		this.watcher = null;
	}
}

class OpsStore extends Store {
	constructor() {
		super();
		this.ops = new Map();
	}
	begin(key, op, stage = "download") {
		this.ops.set(key, { op, stage, startedAt: Date.now() });
		this.emitChange();
	}
	stage(key, stage) {
		const current = this.ops.get(key);
		if (!current) return;
		current.stage = stage;
		this.emitChange();
	}
	end(key) {
		if (this.ops.delete(key)) this.emitChange();
	}
	get(key) {
		return this.ops.get(key) || null;
	}
	get busy() {
		return this.ops.size > 0;
	}
}
//#endregion

//#region Resolver
/** Describes how an index entry relates to what is installed. */
function resolveEntry(ctx, entry) {
	const { installed, ledger } = ctx;
	const result = { state: "not-installed", installed: null, via: null, warnings: [] };
	const byFile = installed.get(entry.file_name);
	const byName = installed.getByName(entry.name);
	let target = null;
	if (byFile) {
		if (lower(byFile.name) === entry.nameLower) {
			target = byFile;
			result.via = "file";
		} else {
			result.state = "conflict";
			result.installed = byFile;
			result.warnings.push(`${entry.file_name} already exists but contains "${byFile.name}"`);
			return result;
		}
	} else if (byName) {
		target = byName;
		result.via = "name";
		result.warnings.push(`Installed as ${byName.filename}`);
	}
	if (entry.official_collision) result.warnings.push("Same file name as a plugin on BetterDiscord's official store");
	if (entry.deprecated) result.warnings.push(entry.deprecated.reason ? `Deprecated: ${entry.deprecated.reason}` : "Deprecated");
	if (entry.min_bd_version && compareVersions(BdApi.version, entry.min_bd_version) > 0) {
		result.state = "blocked";
		result.reason = `Needs BetterDiscord ${entry.min_bd_version}`;
		result.installed = target;
		return result;
	}
	if (!target) return result;
	result.installed = target;
	result.tracked = !!ledger.get(target.filename);
	const cmp = compareVersions(target.version, entry.version);
	result.state = cmp > 0 ? "update-available" : cmp < 0 ? "newer-local" : "installed";
	return result;
}

function unmetDependencies(ctx, entry) {
	const missing = [];
	for (const requirement of entry.requires) {
		const have = (requirement.file_name && ctx.installed.get(requirement.file_name)) || (requirement.name && ctx.installed.getByName(requirement.name));
		if (have) continue;
		missing.push({ requirement, entry: ctx.index.findDependency(requirement) });
	}
	return missing;
}

function installedReplacements(ctx, entry) {
	return entry.replaces.map(r => (r.file_name && ctx.installed.get(r.file_name)) || (r.name && ctx.installed.getByName(r.name))).filter(Boolean);
}
//#endregion

//#region Ledger
/** Remembers which installed files came through the hub, and from where. */
class Ledger {
	constructor(api) {
		this.api = api;
		const saved = api.Data.load("ledger");
		this.records = saved && typeof saved === "object" ? saved : {};
		const dismissed = api.Data.load("dismissed");
		this.dismissed = dismissed && typeof dismissed === "object" ? dismissed : {};
	}
	get(fileName) {
		return this.records[lower(fileName)] || null;
	}
	set(fileName, record) {
		this.records[lower(fileName)] = record;
		this.api.Data.save("ledger", this.records);
	}
	remove(fileName) {
		if (delete this.records[lower(fileName)]) this.api.Data.save("ledger", this.records);
	}
	isDismissed(entry) {
		return this.dismissed[entry.key] === entry.version;
	}
	dismiss(entry) {
		this.dismissed[entry.key] = entry.version;
		this.api.Data.save("dismissed", this.dismissed);
	}
	undismiss(entry) {
		if (delete this.dismissed[entry.key]) this.api.Data.save("dismissed", this.dismissed);
	}
}
//#endregion

//#region Downloader
function assertAllowedUrl(url) {
	let parsed;
	try { parsed = new URL(url); } catch { throw new HubError("url", `Invalid download URL: ${url}`); }
	if (parsed.protocol !== "https:") throw new HubError("host-denied", `Refusing non-https download: ${url}`);
	const host = parsed.hostname.toLowerCase();
	if (!ALLOWED_HOSTS.some(allowed => host === allowed || host.endsWith(`.${allowed}`))) throw new HubError("host-denied", `Download host not allowed: ${host}`);
}

async function verifyBytes(entry, bytes) {
	if (Number.isFinite(entry.size) && bytes.byteLength !== entry.size) {
		throw new HubError("size", `Size mismatch: expected ${entry.size} bytes, got ${bytes.byteLength}`);
	}
	if (!/^[0-9a-f]{64}$/i.test(String(entry.sha256 || ""))) throw new HubError("sha256", "Index entry has no sha256; refusing to install an unverifiable file");
	const hash = await sha256Hex(bytes);
	if (hash !== entry.sha256.toLowerCase()) throw new HubError("sha256", `Integrity check failed (sha256 ${hash.slice(0, 12)}… does not match the index)`);
	let text;
	try { text = new TextDecoder("utf-8", { fatal: true }).decode(bytes); }
	catch { throw new HubError("utf8", "File is not valid UTF-8"); }
	const meta = parseMeta(text);
	if (!meta) throw new HubError("not-plugin", "File has no BetterDiscord meta header");
	if (lower(meta.name) !== entry.nameLower) throw new HubError("meta-name", `File is "${meta.name}", expected "${entry.name}"`);
	if (String(meta.version) !== String(entry.version)) throw new HubError("meta-version", `File is version ${meta.version}, the index says ${entry.version} (index out of date?)`);
	if (!text.includes("module.exports")) throw new HubError("not-plugin", "File does not export a plugin (no module.exports)");
	return { text, meta };
}

async function fetchVerified(api, entry, { signal } = {}) {
	const urls = [entry.download_url, ...entry.mirrors].filter(Boolean);
	if (!urls.length) throw new HubError("url", "Index entry has no download URL");
	let integrityError = null;
	let lastError = null;
	for (const url of urls) {
		try {
			assertAllowedUrl(url);
			const res = await api.Net.fetch(url, { headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" }, timeout: 30000, maxRedirects: 5, signal });
			if (!res.ok) throw new HubError("http", `HTTP ${res.status} from ${new URL(url).hostname}`);
			const bytes = new Uint8Array(await res.arrayBuffer());
			const { text, meta } = await verifyBytes(entry, bytes);
			return { bytes, text, meta, url };
		} catch (e) {
			lastError = e;
			if (e instanceof HubError && !["http", "url"].includes(e.code)) integrityError = integrityError || e;
			api.Logger.warn(`Download attempt failed for ${entry.name} from ${url}:`, e.message || e);
		}
	}
	throw integrityError || lastError || new HubError("http", "Download failed");
}
//#endregion

//#region Installer
class Installer {
	constructor(ctx) {
		this.ctx = ctx;
		this.api = ctx.api;
	}

	get folder() {
		return this.api.Plugins.folder;
	}

	targetPath(fileName) {
		if (!FILE_NAME_RE.test(fileName) || path.basename(fileName) !== fileName) throw new HubError("path", `Unsafe file name: ${fileName}`);
		const target = path.join(this.folder, fileName);
		if (path.dirname(path.resolve(target)) !== path.resolve(this.folder)) throw new HubError("path", "Target escapes the plugins folder");
		return target;
	}

	backupDir(fileName) {
		return path.join(this.folder, BACKUP_ROOT, "backups", fileName.replace(/\.plugin\.js$/i, ""));
	}

	backup(target, fileName, version) {
		if (!fs.existsSync(target)) return null;
		const dir = this.backupDir(fileName);
		fs.mkdirSync(dir, { recursive: true });
		const stamp = new Date().toISOString().replace(/[:.]/g, "-");
		const safeVersion = String(version || "unknown").replace(/[^0-9A-Za-z.-]/g, "_");
		const dest = path.join(dir, `${safeVersion}__${stamp}.js`);
		// BetterDiscord's fs shim has no copyFileSync; a read + write keeps the exact bytes.
		fs.writeFileSync(dest, fs.readFileSync(target));
		this.pruneBackups(dir);
		return dest;
	}

	pruneBackups(dir) {
		const keep = Math.max(1, Number(this.ctx.settings.get("backupsToKeep")) || 5);
		const files = this.listBackupFiles(dir);
		for (const file of files.slice(keep)) {
			try { fs.unlinkSync(file.path); } catch { /* ignore */ }
		}
	}

	listBackupFiles(dir) {
		if (!fs.existsSync(dir)) return [];
		return fs.readdirSync(dir)
			.filter(f => f.endsWith(".js"))
			.map(f => {
				const full = path.join(dir, f);
				const stat = fs.statSync(full);
				return { path: full, name: f, version: f.split("__")[0], mtime: stat.mtimeMs, size: stat.size };
			})
			.sort((a, b) => b.mtime - a.mtime);
	}

	listBackups(fileName) {
		return this.listBackupFiles(this.backupDir(fileName));
	}

	writeAtomic(target, bytes) {
		const temp = `${target}.phtmp`;
		fs.writeFileSync(temp, bytes);   // Uint8Array or Buffer; avoids the deprecated Buffer global
		try {
			fs.renameSync(temp, target);
		} catch (e) {
			try { fs.unlinkSync(temp); } catch { /* ignore */ }
			throw e;
		}
	}

	async waitForAddon(name, version, timeout = 6000) {
		const started = Date.now();
		while (Date.now() - started < timeout) {
			const addon = this.api.Plugins.get(name);
			if (addon && (!version || String(addon.version) === String(version))) return addon;
			await new Promise(res => setTimeout(res, 150));
		}
		return null;
	}

	/**
	 * Installs or updates `entry`. Options: enable (after install), targetFile (write over a fork that uses a
	 * different file name), disableReplaced (array of installed records to disable), autoUpdate (ledger flag).
	 */
	async install(entry, options = {}) {
		const { ops, installed, ledger, updates } = this.ctx;
		const status = resolveEntry(this.ctx, entry);
		const isUpdate = status.state === "update-available" || status.state === "newer-local" || status.state === "installed";
		const fileName = options.targetFile || (status.via === "name" ? status.installed.filename : entry.file_name);
		ops.begin(entry.key, isUpdate ? "update" : "install", "download");
		try {
			const target = this.targetPath(fileName);
			if (status.state === "blocked") throw new HubError("blocked", status.reason);
			if (status.state === "conflict" && !options.replaceConfirmed) throw new HubError("conflict", `${fileName} belongs to another plugin`);
			const { bytes } = await fetchVerified(this.api, entry);
			ops.stage(entry.key, "write");
			const previous = installed.get(fileName);
			const wasEnabled = previous ? installed.isEnabled(previous.filename) : false;
			const backupPath = this.backup(target, fileName, previous?.version);
			this.writeAtomic(target, bytes);
			ops.stage(entry.key, "load");
			let addon = await this.waitForAddon(entry.name, entry.version, 6000);
			if (!addon && previous && wasEnabled) {
				try { this.api.Plugins.reload(previous.filename); } catch { /* ignore */ }
				addon = await this.waitForAddon(entry.name, entry.version, 2000);
			}
			if (addon && options.enable && !this.api.Plugins.isEnabled(addon.filename)) this.api.Plugins.enable(addon.filename);
			for (const replaced of options.disableReplaced || []) {
				if (installed.isEnabled(replaced.filename)) {
					try { this.api.Plugins.disable(replaced.filename); } catch (e) { this.api.Logger.warn(`Could not disable ${replaced.name}:`, e); }
				}
			}
			ledger.set(fileName, {
				key: entry.key, id: entry.id, sourceId: entry.sourceId, name: entry.name, fileName,
				version: entry.version, sha256: entry.sha256, installedAt: Date.now(),
				autoUpdate: options.autoUpdate ?? ledger.get(fileName)?.autoUpdate ?? false,
				backup: backupPath
			});
			ledger.undismiss(entry);
			installed.refresh();
			updates.recompute();
			const verb = isUpdate ? "Updated" : "Installed";
			if (addon) this.api.UI.showToast(`${verb} ${entry.name} v${entry.version}`, { type: "success" });
			else this.api.UI.showToast(`${verb} ${entry.name} v${entry.version}. Reload Discord (Ctrl+R) if it does not show up.`, { type: "warning", timeout: 8000 });
			return { ok: true, loaded: !!addon, backupPath };
		} catch (e) {
			this.api.Logger.error(`Install of ${entry.name} failed:`, e);
			this.reportError(entry, e, isUpdate ? "update" : "install");
			return { ok: false, error: e };
		} finally {
			ops.end(entry.key);
		}
	}

	async uninstall(record, entry = null) {
		const { ops, installed, ledger, updates } = this.ctx;
		const key = entry?.key || `file/${lower(record.filename)}`;
		ops.begin(key, "uninstall", "write");
		try {
			const target = this.targetPath(record.filename);
			if (installed.isEnabled(record.filename)) {
				try { this.api.Plugins.disable(record.filename); } catch (e) { this.api.Logger.warn(`Could not disable ${record.name} before removal:`, e); }
			}
			this.backup(target, record.filename, record.version);
			fs.unlinkSync(target);
			ledger.remove(record.filename);
			installed.refresh();
			updates.recompute();
			this.api.UI.showToast(`Removed ${record.name}`, { type: "success" });
			return { ok: true };
		} catch (e) {
			this.api.Logger.error(`Uninstall of ${record.name} failed:`, e);
			this.api.UI.showToast(`Could not remove ${record.name}: ${e.message || e}`, { type: "error", timeout: 8000 });
			return { ok: false, error: e };
		} finally {
			ops.end(key);
		}
	}

	async rollback(entry, backup) {
		const { ops, installed, ledger, updates } = this.ctx;
		ops.begin(entry.key, "rollback", "write");
		try {
			const record = installed.get(entry.file_name) || installed.getByName(entry.name);
			const fileName = record?.filename || entry.file_name;
			const target = this.targetPath(fileName);
			const bytes = fs.readFileSync(backup.path);
			const meta = parseMeta(bytes.toString("utf8"));
			if (!meta || lower(meta.name) !== entry.nameLower) throw new HubError("meta-name", "Backup does not contain this plugin");
			this.backup(target, fileName, record?.version);
			this.writeAtomic(target, bytes);
			ops.stage(entry.key, "load");
			const addon = await this.waitForAddon(entry.name, meta.version, 6000);
			const current = ledger.get(fileName);
			if (current) ledger.set(fileName, Object.assign({}, current, { version: meta.version, sha256: null, rolledBackAt: Date.now() }));
			installed.refresh();
			updates.recompute();
			this.api.UI.showToast(`Restored ${entry.name} v${meta.version}${addon ? "" : " (reload Discord if it does not show up)"}`, { type: "success" });
			return { ok: true };
		} catch (e) {
			this.api.Logger.error(`Rollback of ${entry.name} failed:`, e);
			this.api.UI.showToast(`Could not restore ${entry.name}: ${e.message || e}`, { type: "error", timeout: 8000 });
			return { ok: false, error: e };
		} finally {
			ops.end(entry.key);
		}
	}

	async updateAll(items) {
		const ordered = [...items].sort((a, b) => (a.entry.nameLower === lower(PLUGIN_NAME)) - (b.entry.nameLower === lower(PLUGIN_NAME)));
		const results = [];
		for (const { entry } of ordered) {
			results.push(await this.install(entry, { enable: false }));
		}
		return results;
	}

	reportError(entry, error, action) {
		const code = error?.code;
		const message = error?.message || String(error);
		if (["sha256", "size", "meta-name", "meta-version", "utf8", "not-plugin"].includes(code)) {
			this.api.UI.showConfirmationModal(`${entry.name} was not ${action === "update" ? "updated" : "installed"}`, [
				`The downloaded file did not pass verification, so nothing was written to your plugins folder.`,
				``,
				message,
				``,
				`The index may be out of date. Refresh it and try again; if it keeps failing, report it to the source maintainer.`
			].join("\n"), { confirmText: "Refresh index", cancelText: "Close", onConfirm: () => this.ctx.index.refresh({ force: true }) });
			return;
		}
		if (code === "conflict" || code === "blocked" || code === "host-denied" || code === "path") {
			this.api.UI.showToast(`${entry.name}: ${message}`, { type: "error", timeout: 8000 });
			return;
		}
		const verb = code === "http" || code === "url" ? "download" : action;
		this.api.UI.showToast(`Could not ${verb} ${entry.name}: ${message}`, { type: "error", timeout: 8000 });
	}
}
//#endregion

//#region UpdateChecker
class UpdateChecker extends Store {
	constructor(ctx) {
		super();
		this.ctx = ctx;
		this.api = ctx.api;
		this.pending = [];
		this.lastCheck = 0;
		this.checking = false;
		this.notification = null;
		this.lastSignature = "";
		this.startupTimer = null;
		this.interval = null;
	}

	start() {
		this.stop(false);
		if (!this.ctx.settings.get("checkForUpdates")) return;
		const delay = Math.max(5, Number(this.ctx.settings.get("startupDelaySeconds")) || 20) * 1000;
		this.startupTimer = setTimeout(() => this.check({ silent: true }), delay);
		const hours = Math.min(168, Math.max(1, Number(this.ctx.settings.get("updateIntervalHours")) || 4));
		this.interval = setInterval(() => this.check({ silent: true }), hours * 3600 * 1000);
	}

	stop(closeNotice = true) {
		clearTimeout(this.startupTimer);
		clearInterval(this.interval);
		this.startupTimer = null;
		this.interval = null;
		if (closeNotice) this.closeNotification();
	}

	restart() {
		this.start();
	}

	inScope(status) {
		const scope = this.ctx.settings.get("notifyScope");
		return scope === "all" || status.tracked;
	}

	recompute() {
		const { index, ledger } = this.ctx;
		const pending = [];
		for (const entry of index.getAll()) {
			const status = resolveEntry(this.ctx, entry);
			if (status.state !== "update-available") continue;
			pending.push({ entry, status, dismissed: ledger.isDismissed(entry) });
		}
		pending.sort((a, b) => a.entry.name.localeCompare(b.entry.name));
		this.pending = pending;
		this.emitChange();
		return pending;
	}

	get count() {
		return this.pending.filter(p => !p.dismissed).length;
	}

	async check({ silent = true, force = false } = {}) {
		if (this.checking) return this.pending;
		this.checking = true;
		this.emitChange();
		try {
			await this.ctx.index.refresh({ force });
			this.ctx.installed.refresh();
			this.recompute();
			this.lastCheck = Date.now();
			await this.autoUpdate();
			this.notify();
			if (!silent) {
				const n = this.count;
				this.api.UI.showToast(n ? `${n} plugin update${n === 1 ? "" : "s"} available` : "All hub plugins are up to date", { type: n ? "info" : "success" });
			}
		} catch (e) {
			this.api.Logger.error("Update check failed:", e);
			if (!silent) this.api.UI.showToast(`Update check failed: ${e.message || e}`, { type: "error" });
		} finally {
			this.checking = false;
			this.emitChange();
		}
		return this.pending;
	}

	async autoUpdate() {
		const { settings, ledger, installer } = this.ctx;
		const auto = this.pending.filter(({ entry, status }) => {
			const record = status.installed ? ledger.get(status.installed.filename) : null;
			return record?.autoUpdate || (settings.get("autoUpdateFirstParty") && entry.trust === "first-party" && status.tracked);
		});
		if (!auto.length) return;
		const done = [];
		for (const item of auto) {
			const result = await installer.install(item.entry, { enable: false });
			if (result.ok) done.push(item.entry.name);
		}
		if (done.length) {
			this.recompute();
			this.api.UI.showNotification({
				title: `${DISPLAY_NAME}: updated ${done.length} plugin${done.length === 1 ? "" : "s"}`,
				content: done.join(", "),
				type: "success",
				duration: 15000,
				actions: [{ label: "Open hub", onClick: () => this.ctx.integration.open("installed") }]
			});
		}
	}

	notify() {
		const { settings } = this.ctx;
		if (!settings.get("notifyUpdates")) return;
		const items = this.pending.filter(p => !p.dismissed && this.inScope(p.status));
		if (!items.length) { this.lastSignature = ""; return; }
		const signature = items.map(p => `${p.entry.key}@${p.entry.version}`).sort().join(",");
		if (signature === this.lastSignature) return;
		this.lastSignature = signature;
		this.closeNotification();
		// Same anatomy as BetterDiscord's own addon updater notice: a count line, the list with versions, two actions, stays until closed
		this.noticeContent = items.length === 1 ? "One plugin has an update!" : `${items.length} plugins have updates!`;
		const list = h("ul", { className: "bd-notification-updates-list" }, items.map(p =>
			h("li", { key: p.entry.key }, p.entry.name, " ", h("i", null, `(v${p.status.installed.version} → v${p.entry.version})`))));
		const handle = this.api.UI.showNotification({
			id: `pluginhub-updates:${Date.now()}`, // BetterDiscord returns an existing notice for a known id instead of refreshing it
			title: DISPLAY_NAME,
			content: [this.noticeContent, list],
			type: "info",
			icon: () => h(HubIcon, { size: 16 }),
			duration: Infinity,
			actions: [
				{ label: "View updates", onClick: () => this.ctx.integration.open("updates") },
				{ label: "Update all", onClick: () => this.ctx.installer.updateAll(items) }
			],
			onClose: () => { if (this.notification === handle) this.notification = null; }
		});
		this.notification = handle;
	}

	closeNotification() {
		const handle = this.notification;
		this.notification = null;
		if (!handle) return;
		if (handle.isVisible?.() === false) return;
		// BetterDiscord's handle.close() can leave the notice on screen with dead buttons; clicking its own X works.
		const notice = [...document.querySelectorAll(".bd-notification")].find(el =>
			el.querySelector(".bd-notification-title")?.textContent?.startsWith(DISPLAY_NAME) &&
			el.querySelector(".bd-notification-content-text")?.textContent?.includes(String(this.noticeContent || "").split("\n")[0] || ""));
		const button = notice?.querySelector(".bd-notification-close");
		if (button) button.click();
		else handle.close?.();
	}
}
//#endregion

//#region Changelog
function parseChangelogVersions(markdown) {
	const versions = [];
	let current = null;
	let items = [];
	const push = () => { if (current) versions.push({ version: current, items }); items = []; };
	for (const line of String(markdown).split(/\r?\n/)) {
		const version = line.match(/^#{2,4}\s+v?([\d][\w.-]*)/)?.[1];
		if (version) { push(); current = version; continue; }
		if (!current) continue;
		const trimmed = line.trim();
		if (!/^[-*]\s+/.test(trimmed)) continue;
		const item = trimmed.replace(/^[-*]\s+/, "").trim();
		if (item) items.push(item);
	}
	push();
	return versions;
}

function changelogType(item) {
	const text = item.toLowerCase();
	if (/\bfix|resolv|crash|bug/.test(text)) return "fixed";
	if (/\badd|new\b|initial|introduc/.test(text)) return "added";
	if (/improv|updat|better|faster|rework|refactor/.test(text)) return "improved";
	return "progress";
}

async function showChangelog(ctx, entry, { onlySince = null } = {}) {
	if (!entry.changelog_url) {
		ctx.api.UI.showToast(`${entry.name} has no changelog`, { type: "info" });
		return;
	}
	try {
		assertAllowedUrl(entry.changelog_url);
		const res = await ctx.api.Net.fetch(entry.changelog_url, { timeout: 20000, maxRedirects: 5 });
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const versions = parseChangelogVersions(await res.text());
		const relevant = onlySince ? versions.filter(v => compareVersions(onlySince, v.version) > 0) : versions;
		const changes = [];
		for (const v of relevant.slice(0, 15)) {
			const grouped = { added: [], improved: [], fixed: [], progress: [] };
			for (const item of v.items) grouped[changelogType(item)].push(item);
			const first = Object.entries(grouped).find(([, list]) => list.length);
			if (!first) continue;
			changes.push({ title: `Version ${v.version}`, type: first[0], items: first[1] });
			for (const [type, list] of Object.entries(grouped)) {
				if (type === first[0] || !list.length) continue;
				changes.push({ title: { added: "Added", improved: "Improved", fixed: "Fixed", progress: "Changes" }[type], type, items: list });
			}
		}
		ctx.api.UI.showChangelogModal({
			title: entry.name,
			subtitle: onlySince ? `Changes since v${onlySince}` : `Version ${entry.version}`,
			changes: changes.length ? changes : [{ title: "No entries found", type: "progress", items: ["The changelog could not be parsed."] }]
		});
	} catch (e) {
		ctx.api.Logger.warn(`Changelog for ${entry.name} failed:`, e);
		ctx.api.UI.showToast(`Could not load the changelog for ${entry.name}`, { type: "error" });
	}
}
//#endregion

//#region Settings integration
/**
 * Discord resolves the settings layout once per modal mount (useMemo keyed on the root object), so a plugin that
 * starts while Settings is open would only show up after a reopen. A single, permanent wrapper around Discord's
 * layout hook subscribes to a version counter and hands the hook a fresh copy of the root whenever we bump it,
 * which rebuilds the sidebar in place. It lives on `window` and is installed once so the hook count React sees
 * never changes across plugin reloads (it is inert while the hub is stopped).
 */
function layoutSignal() {
	return window.__pluginhubLayout ??= {
		version: 0,
		listeners: new Set(),
		copies: new WeakMap(),
		installed: false,
		bump() {
			this.version++;
			for (const listener of [...this.listeners]) {
				try { listener(); } catch { /* ignore */ }
			}
		}
	};
}

function installLayoutHook(api) {
	const signal = layoutSignal();
	if (signal.installed) return true;
	const { Webpack } = api;
	const found = Webpack.getModule(Webpack.Filters.byStrings("visibleDirectory", "accessibleDirectory"), { searchExports: true, withKey: true });
	const [exportsObject, key] = Array.isArray(found) ? found : [];
	if (!exportsObject || typeof key !== "string" || typeof exportsObject[key] !== "function") return false;
	const subscribe = listener => { signal.listeners.add(listener); return () => signal.listeners.delete(listener); };
	const getSnapshot = () => signal.version;
	BdApi.Patcher.instead("PluginHub:layout-hook", exportsObject, key, (thisArg, args, original) => {
		const version = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
		const root = args[0];
		if (version > 0 && root && typeof root === "object" && typeof root.buildLayout === "function") {
			let cached = signal.copies.get(root);
			if (!cached || cached.version !== version) {
				cached = { version, copy: Object.assign(Object.create(Object.getPrototypeOf(root)), root) };
				signal.copies.set(root, cached);
			}
			args = [cached.copy, ...args.slice(1)];
		}
		return original.apply(thisArg, args);
	});
	signal.installed = true;
	return true;
}

/** Puts the hub into Discord's settings sidebar the same way BetterDiscord adds its own pages. */
class SettingsIntegration {
	constructor(ctx) {
		this.ctx = ctx;
		this.api = ctx.api;
		this.abort = null;
		this.layout = null;
		this.root = null;
		this.degraded = false;
	}

	async patch() {
		const { Webpack } = this.api;
		const { Filters } = Webpack;
		this.abort = new AbortController();
		let root;
		try {
			root = await Webpack.waitForModule(m => m?.key === "$Root", { searchExports: true, searchDefault: false, signal: this.abort.signal });
		} catch (e) {
			this.api.Logger.warn("Waiting for Discord's settings layout failed:", e);
		}
		if (!root || !this.ctx.started) return;
		this.root = root;
		this.layout = Webpack.getBySource("$Root", ".ACCORDION", {
			searchDefault: false,
			map: {
				section: Filters.byStrings(".SECTION,"),
				sidebarItem: Filters.byStrings(".SIDEBAR_ITEM,"),
				panel: Filters.byStrings(".PANEL,"),
				category: Filters.byStrings(".CATEGORY,"),
				custom: Filters.byStrings(".CUSTOM,")
			}
		});
		const L = this.layout;
		if (!L || ["section", "sidebarItem", "panel", "category", "custom"].some(k => typeof L[k] !== "function")) {
			this.degraded = true;
			this.api.Logger.error("Discord's settings layout builders were not found; the hub page is unavailable until an update.");
			this.api.UI.showToast(`${DISPLAY_NAME}: Discord's settings layout changed, the hub page is unavailable`, { type: "error", timeout: 8000 });
			return;
		}
		this.api.Patcher.after(root, "buildLayout", (_, __, sections) => {
			if (!this.ctx.started || !Array.isArray(sections)) return;
			this.inject(sections);
		});
		this.liveRebuild = installLayoutHook(this.api);
		if (this.liveRebuild) layoutSignal().bump();
		else this.noticeIfSettingsOpen();
	}

	/** Rebuilds an open settings sidebar so changes show immediately. */
	refreshLayout() {
		if (this.liveRebuild) layoutSignal().bump();
	}

	inject(sections) {
		const L = this.layout;
		const bd = sections.find(s => s?.key === BD_SECTION_KEY);
		if (bd && this.ctx.settings.get("placeUnderBdHeader") && typeof bd.buildLayout === "function") {
			// BetterDiscord creates this section object once and reuses it, so the wrapper must survive plugin
			// reloads: a marker on the object lets the newest instance take over, and unpatch() restores it.
			if (bd.__pluginhub && typeof bd.__pluginhub === "object") {
				bd.__pluginhub.integration = this;
				this.wrapped = bd;
				return;
			}
			const original = bd.buildLayout;
			const marker = { integration: this, original };
			bd.__pluginhub = marker;
			bd.buildLayout = function (...args) {
				const items = original.apply(this, args);
				const self = marker.integration;
				if (!self?.ctx?.started || !Array.isArray(items) || items.some(i => i?.key === KEYS.item)) return items;
				const at = items.findIndex(i => i?.key === BD_PLUGINS_ITEM_KEY);
				items.splice(at >= 0 ? at + 1 : items.length, 0, self.buildSidebarItem());
				return items;
			};
			this.wrapped = bd;
			return;
		}
		if (sections.some(s => s?.key === KEYS.section)) return;
		const anchor = sections.findIndex(s => s?.key === (bd ? bd.key : FALLBACK_AFTER_SECTION_KEY));
		const section = L.section(KEYS.section, {
			useTitle: () => DISPLAY_NAME,
			buildLayout: () => [this.buildSidebarItem()]
		});
		sections.splice(anchor >= 0 ? anchor + 1 : sections.length, 0, section);
	}

	buildSidebarItem() {
		const L = this.layout;
		const ctx = this.ctx;
		const custom = L.custom(KEYS.custom, { Component: HubPageBoundary });
		const category = L.category(KEYS.category, { buildLayout: () => [custom] });
		const panel = L.panel(KEYS.panel, { useTitle: () => DISPLAY_NAME, buildLayout: () => [category] });
		return L.sidebarItem(KEYS.item, {
			useTitle: () => {
				const count = ctx.updates.count;
				if (!count) return DISPLAY_NAME;
				return Object.assign(h("span", { className: "ph-sidebar-title" }, DISPLAY_NAME, h("span", { className: "ph-sidebar-badge" }, count)), { toString: () => DISPLAY_NAME });
			},
			icon: HubIcon,
			usePredicate: () => ctx.started,
			useSearchTerms: () => ["plugin hub", "plugin store", "store", "plugins", "install plugins", "betterdiscord", "bd", "pharaoh2k"],
			buildLayout: () => [panel]
		});
	}

	unpatch() {
		try { this.abort?.abort(); } catch { /* ignore */ }
		this.abort = null;
		const wrapped = this.wrapped;
		if (wrapped?.__pluginhub?.integration === this) {
			wrapped.buildLayout = wrapped.__pluginhub.original;
			delete wrapped.__pluginhub;
		}
		this.wrapped = null;
		this.api.Patcher.unpatchAll();
		// The re-render this schedules runs after our patches are gone, so the entry disappears right away.
		if (this.liveRebuild) layoutSignal().bump();
	}

	get settingsOpener() {
		return this.api.Webpack.getModule(m => typeof m?.openUserSettings === "function", { searchExports: true });
	}

	get modalActions() {
		return this.api.Webpack.getModule(m => m && typeof m.closeModal === "function" && typeof m.openModal === "function", { searchExports: true });
	}

	settingsModalKey() {
		try {
			const keys = this.modalActions?.getOpenModalKeys?.() || [];
			return keys.find(k => /USER_SETTINGS/i.test(String(k))) || "USER_SETTINGS_MODAL_MODAL_KEY";
		} catch {
			return "USER_SETTINGS_MODAL_MODAL_KEY";
		}
	}

	isSettingsOpen() {
		try {
			const ma = this.modalActions;
			if (!ma) return false;
			const key = this.settingsModalKey();
			return typeof ma.hasModalOpen === "function" ? !!ma.hasModalOpen(key) : (ma.getOpenModalKeys?.() || []).includes(key);
		} catch {
			return false;
		}
	}

	/** Opens Discord's settings on the hub page; `tab` is browse | installed | updates. */
	open(tab = "browse") {
		this.ctx.pendingTab = tab;
		this.ctx.ops.emitChange();
		const opener = this.settingsOpener;
		if (!opener || this.degraded) {
			this.api.UI.showToast(`Open Settings > BetterDiscord > ${DISPLAY_NAME}`, { type: "info" });
			return false;
		}
		const navigate = () => opener.openUserSettings(KEYS.panel, { section: KEYS.item });
		try {
			navigate();
		} catch (e) {
			this.api.Logger.warn("Could not open the hub page:", e);
			return false;
		}
		// Fallback for a settings modal whose layout could not be rebuilt in place: reopen it once.
		setTimeout(() => {
			if (!this.ctx.started || this.liveRebuild || document.querySelector(".ph-root") || !this.isSettingsOpen()) return;
			try {
				this.modalActions.closeModal(this.settingsModalKey());
				setTimeout(() => {
					if (!this.ctx.started) return;
					this.ctx.pendingTab = tab;
					try { navigate(); } catch (e) { this.api.Logger.warn("Could not reopen settings:", e); }
				}, 600);
			} catch (e) {
				this.api.Logger.warn("Could not refresh the settings modal:", e);
			}
		}, 400);
		return true;
	}

	noticeIfSettingsOpen() {
		if (this.isSettingsOpen() && !document.querySelector(".ph-root")) {
			this.api.UI.showToast(`${DISPLAY_NAME} added. Reopen Settings to see it under BetterDiscord.`, { type: "info" });
		}
	}
}
//#endregion

//#region Icon
const ICON_SIZES = { xxs: 12, xs: 16, sm: 18, md: 20, lg: 24, xl: 32 };
function HubIcon({ size = "md", width, height, color, className }) {
	const px = typeof size === "number" ? size : (ICON_SIZES[size] || 20);
	return h("svg", {
		className, width: width || px, height: height || px, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true
	}, h("path", {
		fill: color || "currentColor",
		d: "M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"
	}));
}
//#endregion

//#region UI helpers
let activeCtx = null;
/** Emits whenever the plugin starts or stops, so a mounted hub page swaps to the live context. */
const lifecycle = new Store();

function useStores(stores) {
	return BdApi.Hooks.useStateFromStores(stores, () => stores.reduce((sum, store) => sum + store.revision, 0));
}

function avatarUrl(author) {
	if (author?.github_id) return `https://avatars.githubusercontent.com/u/${encodeURIComponent(author.github_id)}?s=160`;
	if (author?.github_name) return `https://avatars.githubusercontent.com/${encodeURIComponent(author.github_name)}?s=160`;
	return null;
}

function togglePlugin(ctx, record) {
	// BetterDiscord's toggle() looks its state up by the raw argument, so it can only ever enable; be explicit.
	try {
		if (ctx.api.Plugins.isEnabled(record.filename)) ctx.api.Plugins.disable(record.filename);
		else ctx.api.Plugins.enable(record.filename);
	} catch (e) {
		ctx.api.Logger.warn(e);
	}
	setTimeout(() => ctx.installed.refresh(), 50);
}

function openInSystem(ctx, file) {
	try {
		Promise.resolve(require("electron").shell.openPath(file)).then(error => { if (error) ctx.api.UI.showToast(`Could not open ${path.basename(file)}: ${error}`, { type: "error" }); });
	} catch (e) {
		ctx.api.Logger.warn("Could not open the plugin file:", e);
		ctx.api.UI.showToast(`Could not open ${path.basename(file)}`, { type: "error" });
	}
}

function revealInFolder(ctx, record) {
	try { require("electron").shell.showItemInFolder(path.join(ctx.api.Plugins.folder, record.filename)); }
	catch (e) { ctx.api.Logger.warn("Could not reveal the plugin file:", e); }
}

//#region Editor
// The same CDN files BetterDiscord loads for its own editor, so a user who already opened BD's editor pays nothing twice.
const MONACO_BASE = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min";
const MONACO_LOADER = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/loader.min.js";
let monacoPromise = null;

/** BetterDiscord's own settings file (read only): its Edit Action and editor preferences. */
function bdSettings(api) {
	try {
		const channel = window.DiscordNative?.app?.getReleaseChannel?.() || "stable";
		return JSON.parse(fs.readFileSync(path.join(api.Plugins.folder, "..", "data", channel, "settings.json"), "utf8")) || {};
	} catch {
		return {};
	}
}

function loadResource(tag, id, url) {
	return new Promise((resolve, reject) => {
		if (document.getElementById(id)) return resolve();
		const el = document.createElement(tag);
		el.id = id;
		if (tag === "link") { el.rel = "stylesheet"; el.href = url; } else el.src = url;
		el.onload = () => resolve();
		el.onerror = () => reject(new Error(`Failed to load ${url}`));
		document.head.append(el);
	});
}

/** Resolves true once window.monaco is usable; loads it the way BetterDiscord does when BD has not yet. */
function ensureMonaco(api) {
	if (window.monaco?.editor) return Promise.resolve(true);
	return monacoPromise ??= (async () => {
		const nodeRequire = window.require;
		const nodeModule = window.module;
		try {
			loadResource("link", "ph-monaco-style", `${MONACO_BASE}/vs/editor/editor.main.min.css`).catch(() => {});
			if (!window.MonacoEnvironment) {
				window.MonacoEnvironment = { getWorker: (moduleId, label) => new Worker(`data:text/javascript;charset=utf-8,${encodeURIComponent(`importScripts('${MONACO_BASE}/vs/base/worker/${moduleId}');`)}`, { type: "classic", name: label }) };
			}
			delete window.module;                       // the AMD loader must not think it runs under CommonJS
			await loadResource("script", "ph-monaco-script", MONACO_LOADER);
			const amdRequire = window.require;
			amdRequire.config({ paths: { vs: `${MONACO_BASE}/vs` } });
			await new Promise((resolve, reject) => amdRequire(["vs/editor/editor.main"], resolve, reject));
		} finally {
			window.require = nodeRequire;                // give plugins their Node require back
			if (nodeModule !== undefined) window.module = nodeModule;
		}
		return !!window.monaco?.editor;
	})().catch(e => {
		api.Logger.error("Monaco failed to load:", e);
		monacoPromise = null;
		return false;
	});
}

function monacoOptions(api, value) {
	const prefs = bdSettings(api).editor || {};
	const discordLight = api.Webpack.getStore("ThemeStore")?.theme === "light";
	const light = prefs.theme === "light" || (prefs.theme !== "dark" && discordLight);
	return {
		value, language: "javascript", theme: light ? "vs" : "vs-dark", automaticLayout: true, scrollBeyondLastLine: false,
		fontSize: prefs.fontSize || 14, lineNumbers: prefs.lineNumbers === false ? "off" : "on",
		minimap: { enabled: prefs.minimap !== false }, hover: { enabled: prefs.hover !== false },
		quickSuggestions: prefs.quickSuggestions !== false, insertSpaces: !!prefs.insertSpaces,
		tabSize: prefs.tabSize || 4, renderWhitespace: prefs.renderWhitespace || "selection"
	};
}

function HubEditor({ ctx, file, name, handle }) {
	const hostRef = React.useRef(null);
	const [status, setStatus] = React.useState({ ready: false, dirty: false, error: null });
	React.useEffect(() => {
		let editor = null;
		let subscription = null;
		let disposed = false;
		(async () => {
			const ok = await ensureMonaco(ctx.api);
			if (disposed) return;
			if (!ok || !hostRef.current) return setStatus({ ready: false, dirty: false, error: "The Monaco editor could not be loaded. Use the system editor instead." });
			const monaco = window.monaco;
			let saved = fs.readFileSync(file, "utf8");
			editor = monaco.editor.create(hostRef.current, monacoOptions(ctx.api, saved));
			const save = () => {
				try {
					fs.writeFileSync(file, editor.getValue());
					saved = editor.getValue();
					handle.dirty = false;
					setStatus(s => ({ ...s, dirty: false }));
					ctx.api.UI.showToast(`Saved ${name}`, { type: "success" });
				} catch (e) {
					ctx.api.UI.showToast(`Could not save ${name}: ${e.message || e}`, { type: "error" });
				}
			};
			subscription = editor.onDidChangeModelContent(() => {
				const dirty = editor.getValue() !== saved;
				if (dirty === handle.dirty) return;
				handle.dirty = dirty;
				setStatus(s => ({ ...s, dirty }));
			});
			editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, save);
			Object.assign(handle, { save, layout: () => editor.layout() });
			setStatus({ ready: true, dirty: false, error: null });
		})();
		return () => { disposed = true; subscription?.dispose(); editor?.dispose(); };
	}, [file]);
	const { Button, Spinner } = BdApi.Components;
	return h("div", { className: "ph-editor" },
		h("div", { className: "ph-editor-bar" },
			h("span", { className: "ph-editor-file" }, path.basename(file), status.dirty && h("span", { className: "ph-editor-dirty" }, " · unsaved")),
			h("div", { className: "ph-editor-actions" },
				h(Button, { size: Button.Sizes.SMALL, look: Button.Looks.LINK, color: Button.Colors.PRIMARY, onClick: () => openInSystem(ctx, file) }, "System editor"),
				h(Button, { size: Button.Sizes.SMALL, color: Button.Colors.BRAND, disabled: !status.dirty, onClick: () => handle.save?.() }, "Save"))),
		status.error
			? h("div", { className: "ph-editor-message" }, status.error)
			: !status.ready && h("div", { className: "ph-editor-message" }, h(Spinner, { type: Spinner.Type.PULSING_ELLIPSIS }), "Loading editor…"),
		h("div", { className: "ph-editor-host", ref: hostRef }));
}

/** Where the Edit button opens a file: the hub setting, or BetterDiscord's own Edit Action when set to "bd". */
function resolveEditAction(ctx) {
	const setting = ctx.settings.get("editAction");
	if (setting && setting !== "bd") return setting;
	const action = bdSettings(ctx.api).addons?.editAction;
	return ["detached", "external", "system"].includes(action) ? action : "detached";
}

function openEditor(ctx, record) {
	const file = path.join(ctx.api.Plugins.folder, record.filename);
	const action = resolveEditAction(ctx);
	if (action === "system") return openInSystem(ctx, file);
	if (action === "external") {
		try { return void require("electron").ipcRenderer.invoke("bd-editor-open", "plugin", record.filename); }   // BetterDiscord's own external editor window
		catch (e) { ctx.api.Logger.warn("BetterDiscord's external editor is unavailable, using the floating editor:", e); }
	}
	const id = `pluginhub-editor-${record.filename}`;
	if (ctx.editors.has(id)) return;
	const handle = { dirty: false, save: null, layout: null };
	const window_ = ctx.api.UI.openFloatingWindow({
		id, title: record.name, className: "ph-editor-window", width: 780, height: 540, center: true, resizable: true,
		children: h(HubEditor, { ctx, file, name: record.name, handle }),
		onResize: () => handle.layout?.(),
		confirmClose: () => handle.dirty,
		confirmationText: `${record.name} has unsaved changes. Close without saving?`,
		onClose: () => ctx.editors.delete(id)
	});
	ctx.editors.set(id, window_);
}
//#endregion

/**
 * BetterDiscord's dropdown list is a popover positioned with `anchor()` against its implicit anchor (the button
 * that opens it). Chromium 152 no longer resolves that implicit anchor, so the list lands in a viewport corner.
 * A named anchor still works, so give each dropdown inside the hub its own name right before it opens; BD's own
 * positioning CSS then applies unchanged. Registered as a capturing "beforetoggle" listener (it does not bubble).
 */
let anchorCounter = 0;
function anchorDropdown(event) {
	const list = event.target;
	if (event.newState !== "open" || !(list instanceof HTMLElement) || !list.classList.contains("bd-select-options")) return;
	if (!list.closest(".ph-root, .ph-settings-panel")) return;
	const button = list.previousElementSibling;
	if (!button || button.style.anchorName) return;
	const name = `--ph-select-${++anchorCounter}`;
	button.style.anchorName = name;
	list.style.positionAnchor = name;
}

function IconButton({ text, onClick, disabled, danger, children }) {
	const { Button, Tooltip } = BdApi.Components;
	return h(Tooltip, { text }, props => h(Button, Object.assign({}, props, {
		size: Button.Sizes.ICON, look: Button.Looks.BLANK, color: danger ? Button.Colors.RED : Button.Colors.PRIMARY,
		className: cn("ph-icon-button", danger && "ph-icon-danger"), disabled, onClick, "aria-label": text
	}), children));
}

function reviewLabel(entry) {
	const review = entry.review;
	if (!review || typeof review !== "object") return null;
	if (review.status === "passed") return `Security review passed${review.reviewed_at ? ` ${relativeTime(review.reviewed_at)}` : ""}`;
	if (review.status === "pending") return "Security review pending";
	return null;
}

function trustLabel(entry) {
	const base = entry.trust === "first-party" ? "Published by the hub maintainer"
		: entry.trust === "mirror" ? "Mirrored from the author's repository"
			: "Community plugin";
	const review = reviewLabel(entry);
	return review ? `${base} · ${review}` : base;
}

function stateLabel(status, op) {
	if (op) return { install: "Installing…", update: "Updating…", uninstall: "Removing…", rollback: "Restoring…" }[op.op] || "Working…";
	switch (status.state) {
		case "update-available": return "Update";
		case "installed": return "Installed";
		case "newer-local": return "Installed (newer)";
		case "conflict": return "Replace…";
		case "blocked": return status.reason || "Unavailable";
		default: return "Install";
	}
}

function openCardMenu(ctx, event, entry, status) {
	const { ContextMenu } = ctx.api;
	const items = [];
	if (entry.changelog_url) items.push({ label: "Changelog", action: () => showChangelog(ctx, entry) });
	if (entry.readme_url || entry.source_url) items.push({ label: "Source code", action: () => openExternal(entry.source_url || entry.readme_url) });
	if (entry.homepage) items.push({ label: "Website", action: () => openExternal(entry.homepage) });
	if (status.installed) {
		items.push({ label: "Show in folder", action: () => revealInFolder(ctx, status.installed) });
		const backups = ctx.installer.listBackups(status.installed.filename);
		if (backups.length) {
			items.push({
				type: "submenu", label: "Restore backup", items: backups.slice(0, 5).map(b => ({
					label: `v${b.version} (${relativeTime(b.mtime)})`,
					action: () => ctx.api.UI.showConfirmationModal(`Restore ${entry.name} v${b.version}?`, `The current file is backed up first.`, { confirmText: "Restore", onConfirm: () => ctx.installer.rollback(entry, b) })
				}))
			});
		}
	}
	if (!items.length) return;
	ContextMenu.open(event, ContextMenu.buildMenu(items));
}

function showPluginSettings(ctx, entry, record) {
	try {
		const instance = ctx.api.Plugins.get(record.filename)?.instance;
		const panel = instance?.getSettingsPanel?.();
		if (!panel) return ctx.api.UI.showToast(`${entry.name} has no settings panel`, { type: "info" });
		const content = typeof panel === "string" ? h("div", { dangerouslySetInnerHTML: { __html: panel } })
			: panel instanceof Node ? h("div", { ref: el => { if (el && !el.contains(panel)) el.append(panel); } })
				: panel;
		ctx.api.UI.showConfirmationModal(`${entry.name} settings`, h("div", { className: "ph-plugin-settings" }, content), { confirmText: "Close", cancelText: null, size: "bd-modal-medium" });
	} catch (e) {
		ctx.api.Logger.error(`Could not open settings for ${entry.name}:`, e);
		ctx.api.UI.showToast(`Could not open settings for ${entry.name}`, { type: "error" });
	}
}

function requestInstall(ctx, entry, status) {
	const deps = unmetDependencies(ctx, entry);
	const replaced = installedReplacements(ctx, entry);
	const opts = {
		enable: !!ctx.settings.get("enableAfterInstall"),
		autoUpdate: false,
		disableReplaced: true
	};
	const isUpdate = status.state === "update-available" || status.state === "newer-local" || status.state === "installed";
	const isConflict = status.state === "conflict";
	const title = isConflict ? `Replace ${status.installed.name} with ${entry.name}?` : isUpdate ? `Update ${entry.name}` : `Install ${entry.name}`;
	ctx.api.UI.showConfirmationModal(title, h(InstallSummary, { ctx, entry, status, deps, replaced, opts }), {
		confirmText: isConflict ? "Replace" : isUpdate ? "Update" : "Install",
		cancelText: "Cancel",
		danger: isConflict,
		onConfirm: async () => {
			for (const dep of deps) {
				if (!dep.entry) continue;
				const result = await ctx.installer.install(dep.entry, { enable: opts.enable });
				if (!result.ok) return;
			}
			await ctx.installer.install(entry, {
				enable: status.installed ? false : opts.enable,   // updates keep the plugin's current enabled state
				replaceConfirmed: isConflict,
				disableReplaced: opts.disableReplaced ? replaced : [],
				autoUpdate: opts.autoUpdate
			});
		}
	});
}

function requestUninstall(ctx, record, entry) {
	ctx.api.UI.showConfirmationModal(`Uninstall ${record.name}?`, [
		`${record.filename} will be removed from your plugins folder. A copy is kept under plugins/${BACKUP_ROOT}/backups so you can restore it from the card menu.`
	], { danger: true, confirmText: "Uninstall", cancelText: "Cancel", onConfirm: () => ctx.installer.uninstall(record, entry) });
}
//#endregion

//#region UI components
function HubPageBoundary() {
	useStores([lifecycle]);
	const ctx = activeCtx;
	if (!ctx?.started) return h("div", { className: "ph-root ph-inactive" }, `${DISPLAY_NAME} is not running.`);
	return h(BdApi.Components.ErrorBoundary, { id: "pluginhub-page", name: PLUGIN_NAME }, h(HubPage, { key: ctx.id, ctx }));
}

function HubPage({ ctx }) {
	const { index, installed, ops, updates, settings } = ctx;
	useStores([index, installed, ops, updates, settings]);
	const [tab, setTab] = React.useState(() => { const t = ctx.pendingTab || "browse"; ctx.pendingTab = null; return t; });
	const [query, setQuery] = React.useState("");
	const [tag, setTag] = React.useState(null);
	const sort = settings.get("sort") || "updated";

	React.useEffect(() => {
		installed.refresh();
		if (index.status === "idle") index.loadFromCache();
		if (!index.lastFetched || Date.now() - index.lastFetched > 10 * 60 * 1000) index.refresh();
	}, []);
	React.useEffect(() => {
		if (ctx.pendingTab) { setTab(ctx.pendingTab); ctx.pendingTab = null; }
	});

	const entries = index.getAll();
	const statuses = React.useMemo(() => new Map(entries.map(e => [e.key, resolveEntry(ctx, e)])), [index.revision, installed.revision]);
	const needle = lower(query);
	const showDeprecated = settings.get("showDeprecated");

	const visible = entries.filter(entry => {
		const status = statuses.get(entry.key);
		if (tab === "installed" && !status.installed && status.state !== "conflict") return false;
		if (tab === "browse" && entry.deprecated && !showDeprecated && !status.installed) return false;
		if (tag && !entry.tags.includes(tag)) return false;
		if (needle) {
			const haystack = `${entry.name} ${entry.description} ${entry.tags.join(" ")} ${entry.authorInfo.display_name || ""}`.toLowerCase();
			if (!haystack.includes(needle)) return false;
		}
		return true;
	}).sort((a, b) => {
		switch (sort) {
			case "name": return a.name.localeCompare(b.name);
			case "added": return new Date(b.added).getTime() - new Date(a.added).getTime() || a.name.localeCompare(b.name);
			case "author": return String(a.authorInfo.display_name).localeCompare(String(b.authorInfo.display_name)) || a.name.localeCompare(b.name);
			default: return new Date(b.updated).getTime() - new Date(a.updated).getTime() || a.name.localeCompare(b.name);
		}
	});

	const installedCount = entries.filter(e => statuses.get(e.key).installed).length;
	const updateCount = updates.count;

	return h("div", { className: "ph-root" },
		h(Toolbar, { ctx, tab, setTab, query, setQuery, sort, installedCount, updateCount, total: entries.length }),
		h(SourceErrors, { ctx }),
		tab !== "updates" && h(TagRow, { ctx, tag, setTag }),
		tab === "updates"
			? h(UpdatesView, { ctx, statuses })
			: h(CardGrid, { ctx, entries: visible, statuses, setTag, query, tab }),
		tab === "installed" && h(UntrackedList, { ctx, statuses })
	);
}

function Toolbar({ ctx, tab, setTab, query, setQuery, sort, installedCount, updateCount, total }) {
	const { SearchInput, DropdownInput } = BdApi.Components;
	const { index, updates, settings } = ctx;
	const refreshing = index.loading || updates.checking;
	const subtitle = index.status === "loading" ? "Loading index…"
		: index.lastFetched ? `${total} plugin${total === 1 ? "" : "s"} · refreshed ${relativeTime(index.lastFetched)}`
			: `${total} plugin${total === 1 ? "" : "s"}`;
	return h("div", { className: "ph-toolbar" },
		h("div", { className: "ph-header" },
			h("div", { className: "ph-header-text" },
				h("h2", { className: "ph-title" }, DISPLAY_NAME),
				h("div", { className: "ph-subtitle" }, subtitle)),
			h("div", { className: "ph-header-actions" },
				h(IconButton, { text: refreshing ? "Refreshing…" : "Refresh index and check for updates", disabled: refreshing, onClick: () => updates.check({ silent: false, force: true }) }, h(RefreshIcon, { spinning: refreshing })),
				h(IconButton, { text: "Mark everything as seen", onClick: () => index.markAllSeen() }, h(EyeIcon)),
				h(IconButton, { text: `${DISPLAY_NAME} settings`, onClick: () => ctx.api.UI.showConfirmationModal(`${DISPLAY_NAME} settings`, buildSettingsPanel(ctx), { confirmText: "Close", cancelText: null, size: "bd-modal-medium" }) }, h(GearIcon)))),
		h("div", { className: "ph-controls" },
			h("div", { className: "ph-tabs", role: "tablist" },
				[["browse", "Browse", total], ["installed", "Installed", installedCount], ["updates", "Updates", updateCount]].map(([id, label, count]) =>
					h("button", { key: id, role: "tab", className: cn("ph-tab", tab === id && "ph-tab-active", id === "updates" && count > 0 && "ph-tab-attention"), "aria-selected": tab === id, onClick: () => setTab(id) },
						label, count > 0 && h("span", { className: "ph-tab-count" }, count)))),
			h("div", { className: "ph-controls-right" },
				h(SearchInput, { className: "ph-search", placeholder: "Search plugins", value: query, onChange: value => setQuery(typeof value === "string" ? value : value?.currentTarget?.value ?? "") }),
				h("div", { className: "ph-sort" }, h(DropdownInput, { options: SORTS, value: sort, onChange: value => settings.set("sort", value) })))));
}

function SourceErrors({ ctx }) {
	const { index } = ctx;
	if (!index.errors.size) return null;
	return h("div", { className: "ph-banner" },
		[...index.errors.values()].map(err => h("div", { key: err.source.id, className: "ph-banner-line" },
			h("strong", null, err.source.name), ": ", err.message,
			index.entries.size ? " (showing the cached list)" : "",
			" ", h("a", { className: "ph-link", onClick: () => index.refresh({ force: true }) }, "Retry"))));
}

function TagRow({ ctx, tag, setTag }) {
	const tags = ctx.index.tagCounts();
	if (!tags.length) return null;
	return h("div", { className: "ph-tags" },
		h("button", { className: cn("ph-chip", !tag && "ph-chip-active"), onClick: () => setTag(null) }, "All"),
		tags.map(([name, count]) => h("button", { key: name, className: cn("ph-chip", tag === name && "ph-chip-active"), onClick: () => setTag(tag === name ? null : name), title: `${count} plugin${count === 1 ? "" : "s"}` }, name)));
}

function CardGrid({ ctx, entries, statuses, setTag, query, tab }) {
	const { index } = ctx;
	if (index.status === "loading" && !entries.length) {
		return h("div", { className: "ph-empty" }, h(BdApi.Components.Spinner, { type: BdApi.Components.Spinner.Type.WANDERING_CUBES }), h("div", null, "Fetching the plugin index…"));
	}
	if (!entries.length) {
		const text = index.status === "error" ? "The plugin index could not be loaded."
			: query ? `No plugins match "${query}".`
				: tab === "installed" ? "None of the hub's plugins are installed yet." : "No plugins to show.";
		return h("div", { className: "ph-empty" }, h("div", null, text),
			index.status === "error" && h("a", { className: "ph-link", onClick: () => index.refresh({ force: true }) }, "Try again"));
	}
	return h("div", { className: "ph-grid" }, entries.map(entry => h(Card, { key: entry.key, ctx, entry, status: statuses.get(entry.key), setTag })));
}

function Card({ ctx, entry, status, setTag }) {
	const { Button, Tooltip, SwitchInput } = BdApi.Components;
	const { index, ops, settings } = ctx;
	const op = ops.get(entry.key);
	const showBadges = settings.get("showNewBadges");
	const isNew = showBadges && index.isNew(entry);
	const isUpdated = showBadges && !isNew && index.isUpdatedSinceSeen(entry);
	const avatar = avatarUrl(entry.authorInfo);
	const record = status.installed && status.state !== "conflict" ? status.installed : null;
	const hasSettings = !!record && typeof ctx.api.Plugins.get(record.filename)?.instance?.getSettingsPanel === "function";
	const canAct = !op && status.state !== "blocked" && status.state !== "installed" && status.state !== "newer-local";
	const showPrimary = !!op || (status.state !== "installed" && status.state !== "newer-local");
	const primaryColor = status.state === "update-available" ? Button.Colors.GREEN : status.state === "conflict" ? Button.Colors.RED : Button.Colors.BRAND;
	const meta = [formatBytes(entry.size), entry.updated ? relativeTime(entry.updated) : ""].filter(Boolean);
	const badges = [];
	if (status.state === "update-available") badges.push(["update", "Update available"]);
	else if (status.installed) badges.push(["installed", "Installed"]);
	if (status.state === "conflict") badges.push(["conflict", "Conflict"]);
	if (isNew) badges.push(["new", "New"]);
	if (isUpdated) badges.push(["updated", "Updated"]);
	if (entry.deprecated) badges.push(["deprecated", "Deprecated"]);

	return h("div", { className: cn("ph-card", `ph-state-${status.state}`), onMouseEnter: () => index.markSeen(entry) },
		h("div", { className: "ph-card-banner", style: entry.thumbnail_url ? undefined : { background: `linear-gradient(135deg, hsl(${hashHue(entry.name)} 55% 35%), hsl(${(hashHue(entry.name) + 40) % 360} 60% 22%))` } },
			entry.thumbnail_url
				? h("img", { className: "ph-card-thumb", src: entry.thumbnail_url, loading: "lazy", alt: "", onError: e => { e.currentTarget.style.display = "none"; } })
				: h("span", { className: "ph-card-initials" }, initials(entry.name)),
			badges.length > 0 && h("div", { className: "ph-badges" }, badges.map(([kind, text]) => h("span", { key: kind, className: `ph-badge ph-badge-${kind}` }, text))),
			h(Tooltip, { text: `${entry.authorInfo.display_name} · ${trustLabel(entry)}` }, props =>
				h("div", Object.assign({}, props, { className: "ph-avatar", onClick: () => openExternal(entry.authorInfo.url || (entry.authorInfo.github_name ? `https://github.com/${entry.authorInfo.github_name}` : entry.homepage)) }),
					avatar ? h("img", { src: avatar, loading: "lazy", alt: "" }) : h("span", null, initials(entry.authorInfo.display_name)),
					entry.trust === "first-party" && entry.verified && h("span", { className: "ph-avatar-check", "aria-label": "Verified" }, h(CheckIcon, { size: 14 }))))),
		h("div", { className: "ph-card-body" },
			h("div", { className: "ph-card-title" },
				h("span", { className: "ph-card-name", title: entry.name }, entry.name),
				h("span", { className: "ph-card-version" }, status.state === "update-available" ? `v${status.installed.version} → v${entry.version}` : `v${entry.version}`)),
			h("div", { className: "ph-card-author" }, "by ", h("span", { className: "ph-card-author-name" }, entry.authorInfo.display_name),
				!entry.sourceBuiltin && ` · ${entry.sourceName}`,
				meta.length > 0 && h("span", { className: "ph-card-meta" }, meta.map(text => ` · ${text}`).join(""))),
			h("div", { className: "ph-card-desc", title: entry.description }, entry.description || "No description provided."),
			entry.tags.length > 0 && h("div", { className: "ph-card-tags" }, entry.tags.slice(0, 4).map(tag => h("span", { key: tag, className: "ph-tag", onClick: () => setTag(tag) }, tag)),
				entry.tags.length > 4 && h("span", { className: "ph-tag ph-tag-more" }, `+${entry.tags.length - 4}`)),
			status.warnings.length > 0 && h("div", { className: "ph-card-warning", title: status.warnings.join("\n") }, h(WarnIcon), " ", status.warnings[0]),
			h("div", { className: "ph-card-footer" },
				record && h(Tooltip, { text: record.enabled ? "Disable" : "Enable" }, props =>
					h("div", Object.assign({}, props, { className: "ph-switch" }), h(SwitchInput, { value: record.enabled, onChange: () => togglePlugin(ctx, record) }))),
				h("div", { className: "ph-card-actions" },
					record && hasSettings && h(IconButton, { text: "Settings", onClick: () => showPluginSettings(ctx, entry, record) }, h(GearIcon)),
					record && h(IconButton, { text: "Edit", onClick: () => openEditor(ctx, record) }, h(PencilIcon)),
					record && h(IconButton, { text: "Delete", danger: true, disabled: !!op, onClick: () => requestUninstall(ctx, record, entry) }, h(TrashIcon)),
					showPrimary && h(Button, {
						size: Button.Sizes.SMALL, color: canAct ? primaryColor : Button.Colors.PRIMARY, look: canAct ? Button.Looks.FILLED : Button.Looks.OUTLINED,
						disabled: !canAct, className: "ph-primary", onClick: () => requestInstall(ctx, entry, status)
					}, stateLabel(status, op)),
					h(IconButton, { text: "More", onClick: e => openCardMenu(ctx, e, entry, status) }, h(DotsIcon))))));
}

function InstallSummary({ ctx, entry, status, deps, replaced, opts }) {
	const { SwitchInput } = BdApi.Components;
	const [, forceUpdate] = BdApi.Hooks.useForceUpdate();
	const set = (key, value) => { opts[key] = value; forceUpdate(); };
	const row = (label, value) => h("div", { className: "ph-summary-row" }, h("span", { className: "ph-summary-label" }, label), h("span", { className: "ph-summary-value" }, value));
	const toggle = (key, label, note) => h("div", { className: "ph-summary-toggle" },
		h("div", null, h("div", { className: "ph-summary-toggle-label" }, label), note && h("div", { className: "ph-summary-note" }, note)),
		h(SwitchInput, { value: !!opts[key], onChange: value => set(key, typeof value === "boolean" ? value : !opts[key]) }));
	return h("div", { className: "ph-summary" },
		row("Plugin", `${entry.name} v${entry.version}`),
		row("Author", `${entry.authorInfo.display_name} (${trustLabel(entry)})`),
		row("File", `${status.via === "name" ? status.installed.filename : entry.file_name}${entry.size ? ` · ${formatBytes(entry.size)}` : ""}`),
		row("Source", h("a", { className: "ph-link", onClick: () => openExternal(entry.source_url || entry.download_url) }, (entry.source_url || entry.download_url || "").replace(/^https:\/\//, "").slice(0, 70))),
		row("Integrity", `sha256 ${String(entry.sha256 || "").slice(0, 16)}… is verified after download, before anything is written`),
		reviewLabel(entry) && row("Review", reviewLabel(entry)),
		status.state === "conflict" && h("div", { className: "ph-summary-alert" }, `${status.installed.filename} currently contains "${status.installed.name}". It will be backed up and overwritten.`),
		status.state === "update-available" && h("div", { className: "ph-summary-info" }, `Installed v${status.installed.version} will be backed up and replaced.`),
		entry.official_collision && h("div", { className: "ph-summary-alert" }, `A plugin with this file name also exists on BetterDiscord's official store. BetterDiscord's own updater may offer to overwrite it with the official version.`),
		deps.length > 0 && h("div", { className: "ph-summary-info" }, "Also installs: ", deps.map(d => d.entry ? `${d.entry.name} v${d.entry.version}` : `${d.requirement.name || d.requirement.id} (not in the index, install it manually)`).join(", ")),
		replaced.length > 0 && toggle("disableReplaced", `Disable ${replaced.map(r => r.name).join(", ")}`, "This plugin replaces it; running both can conflict."),
		!status.installed && toggle("enable", "Enable after install"),
		toggle("autoUpdate", "Auto-update this plugin", "Future versions install silently after the same verification."));
}

function UpdatesView({ ctx }) {
	const { Button } = BdApi.Components;
	const { updates, ledger, ops } = ctx;
	const items = updates.pending;
	const active = items.filter(i => !i.dismissed);
	if (!items.length) {
		return h("div", { className: "ph-empty" }, h(CheckIcon, { size: 40 }), h("div", null, "Everything is up to date."),
			h("div", { className: "ph-muted" }, updates.lastCheck ? `Last checked ${relativeTime(updates.lastCheck)}` : "Not checked yet"),
			h(Button, { size: Button.Sizes.SMALL, look: Button.Looks.OUTLINED, color: Button.Colors.PRIMARY, disabled: updates.checking, onClick: () => updates.check({ silent: false, force: true }) }, updates.checking ? "Checking…" : "Check now"));
	}
	return h("div", { className: "ph-updates" },
		h("div", { className: "ph-updates-head" },
			h("span", null, `${active.length} update${active.length === 1 ? "" : "s"} available${items.length !== active.length ? ` (${items.length - active.length} snoozed)` : ""}`),
			h(Button, { size: Button.Sizes.SMALL, color: Button.Colors.GREEN, disabled: !active.length || ops.busy, onClick: () => ctx.installer.updateAll(active) }, "Update all")),
		items.map(({ entry, status, dismissed }) => h("div", { key: entry.key, className: cn("ph-update-row", dismissed && "ph-update-snoozed") },
			h("div", { className: "ph-update-text" },
				h("div", { className: "ph-update-name" }, entry.name, h("span", { className: "ph-card-version" }, ` v${status.installed.version} → v${entry.version}`)),
				h("div", { className: "ph-muted" }, `${entry.authorInfo.display_name} · ${status.installed.filename}${status.tracked ? "" : " · installed outside the hub"}${dismissed ? " · snoozed" : ""}`)),
			h("div", { className: "ph-update-actions" },
				entry.changelog_url && h(Button, { size: Button.Sizes.SMALL, look: Button.Looks.LINK, color: Button.Colors.PRIMARY, onClick: () => showChangelog(ctx, entry, { onlySince: status.installed.version }) }, "What's new"),
				h(Button, { size: Button.Sizes.SMALL, look: Button.Looks.OUTLINED, color: Button.Colors.PRIMARY, onClick: () => { if (dismissed) ledger.undismiss(entry); else ledger.dismiss(entry); updates.recompute(); } }, dismissed ? "Unsnooze" : "Snooze"),
				h(Button, { size: Button.Sizes.SMALL, color: Button.Colors.GREEN, disabled: !!ops.get(entry.key), onClick: () => requestInstall(ctx, entry, status) }, ops.get(entry.key) ? "Updating…" : "Update")))));
}

function UntrackedList({ ctx, statuses }) {
	const known = new Set();
	for (const entry of ctx.index.getAll()) {
		const status = statuses.get(entry.key);
		if (status?.installed) known.add(status.installed.filename.toLowerCase());
	}
	const others = ctx.installed.all().filter(r => !known.has(r.filename.toLowerCase()) && r.name !== PLUGIN_NAME).sort((a, b) => a.name.localeCompare(b.name));
	if (!others.length) return null;
	return h("details", { className: "ph-untracked" },
		h("summary", null, `${others.length} other installed plugin${others.length === 1 ? "" : "s"} not in the hub`),
		h("div", { className: "ph-untracked-list" }, others.map(r => h("span", { key: r.filename, className: cn("ph-tag", !r.enabled && "ph-tag-muted"), title: r.filename }, `${r.name} v${r.version}`))));
}

function RefreshIcon({ spinning }) {
	return h("svg", { className: cn("ph-svg", spinning && "ph-spin"), width: 20, height: 20, viewBox: "0 0 24 24" }, h("path", { fill: "currentColor", d: "M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.74 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }));
}
function GearIcon() {
	return h("svg", { className: "ph-svg", width: 20, height: 20, viewBox: "0 0 24 24" }, h("path", { fill: "currentColor", d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87a.48.48 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z" }));
}
function EyeIcon() {
	return h("svg", { className: "ph-svg", width: 20, height: 20, viewBox: "0 0 24 24" }, h("path", { fill: "currentColor", d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" }));
}
function PencilIcon() {
	return h("svg", { className: "ph-svg", width: 20, height: 20, viewBox: "0 0 24 24" }, h("path", { fill: "currentColor", d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" }));
}
function TrashIcon() {
	return h("svg", { className: "ph-svg", width: 20, height: 20, viewBox: "0 0 24 24" }, h("path", { fill: "currentColor", d: "M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" }));
}
function DotsIcon() {
	return h("svg", { className: "ph-svg", width: 20, height: 20, viewBox: "0 0 24 24" }, h("path", { fill: "currentColor", d: "M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" }));
}
function CheckIcon({ size = 12 }) {
	return h("svg", { className: "ph-svg", width: size, height: size, viewBox: "0 0 24 24" }, h("path", { fill: "currentColor", d: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }));
}
function WarnIcon() {
	return h("svg", { className: "ph-svg", width: 14, height: 14, viewBox: "0 0 24 24" }, h("path", { fill: "currentColor", d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" }));
}
//#endregion

//#region Settings panel
function buildSettingsPanel(ctx) {
	const { settings, updates, index, integration, api } = ctx;
	const { Button } = BdApi.Components;
	const button = (id, name, note, label, onClick, color = Button.Colors.PRIMARY) => ({
		type: "custom", id, name, note, inline: true,
		children: h(Button, { size: Button.Sizes.SMALL, color, look: Button.Looks.OUTLINED, onClick }, label)
	});
	return h("div", { className: "ph-settings-panel" }, api.UI.buildSettingsPanel({
		settings: [
			{
				type: "category", id: "updates", name: "Updates", collapsible: true, shown: true, settings: [
					{ type: "switch", id: "checkForUpdates", name: "Check for updates", note: "Compare installed plugins with the hub index on startup and on an interval.", value: settings.get("checkForUpdates") },
					{ type: "slider", id: "updateIntervalHours", name: "Check interval", note: "Hours between automatic checks.", value: settings.get("updateIntervalHours"), min: 1, max: 48, step: 1, markers: [1, 4, 8, 12, 24, 48], units: "h" },
					{ type: "switch", id: "notifyUpdates", name: "Update notifications", note: "Show an in-app notification when updates are found.", value: settings.get("notifyUpdates") },
					{ type: "dropdown", id: "notifyScope", name: "Notify about", note: "Pharaoh2k's plugins hand their updates to the hub while it runs, so every plugin the hub knows is covered by default. Limit this to hub installs if another plugin's own updater duplicates the notice.", value: settings.get("notifyScope"), options: [{ label: "Plugins installed through the hub", value: "hub" }, { label: "Every installed plugin the hub knows", value: "all" }] },
					{ type: "switch", id: "autoUpdateFirstParty", name: "Auto-update first-party plugins", note: "Install verified first-party updates for hub-installed plugins without asking.", value: settings.get("autoUpdateFirstParty") }
				]
			},
			{
				type: "category", id: "install", name: "Installing", collapsible: true, shown: true, settings: [
					{ type: "switch", id: "enableAfterInstall", name: "Enable after install", note: "Turn new plugins on right after they are written.", value: settings.get("enableAfterInstall") },
					{ type: "dropdown", id: "editAction", name: "Edit action", note: "Where a card's Edit button opens the plugin file. \"Same as BetterDiscord\" follows BD's own Edit Action setting (Monaco floating editor by default).", value: settings.get("editAction"), options: [{ label: "Same as BetterDiscord", value: "bd" }, { label: "Floating Monaco editor in Discord", value: "detached" }, { label: "BetterDiscord's external editor window", value: "external" }, { label: "System default editor", value: "system" }] },
					{ type: "number", id: "backupsToKeep", name: "Backups to keep per plugin", note: `Older versions are kept in plugins/${BACKUP_ROOT}/backups and can be restored from a card's menu.`, value: settings.get("backupsToKeep"), min: 1, max: 20 }
				]
			},
			{
				type: "category", id: "display", name: "Display", collapsible: true, shown: true, settings: [
					{ type: "switch", id: "showNewBadges", name: "NEW and UPDATED badges", value: settings.get("showNewBadges") },
					{ type: "switch", id: "showDeprecated", name: "Show deprecated plugins", value: settings.get("showDeprecated") },
					{ type: "switch", id: "placeUnderBdHeader", name: "List under the BetterDiscord header", note: "Off puts the hub in its own sidebar section. Reopen Settings after changing.", value: settings.get("placeUnderBdHeader") }
				]
			},
			{
				type: "category", id: "sources", name: "Sources", collapsible: true, shown: true, settings: [
					{ type: "text", id: "extraSources", name: "Additional index URLs", note: "Comma separated https:// URLs (or local paths) of other hub indexes. Their plugins are always shown as third-party.", value: settings.get("extraSources"), placeholder: "https://example.com/store/index.json" },
					button("refresh", "Refresh index", "Fetch all sources again, bypassing caches.", "Refresh", () => updates.check({ silent: false, force: true })),
					button("clearCache", "Clear cached index", "Drops the cached copies and refetches.", "Clear", () => { index.clearCache(); updates.check({ silent: false, force: true }); }),
					button("open", `Open ${DISPLAY_NAME}`, "Jump to the hub page in Settings.", "Open", () => integration.open("browse"), Button.Colors.BRAND)
				]
			}
		],
		onChange: (category, id, value) => {
			settings.set(id, value);
			if (["checkForUpdates", "updateIntervalHours", "startupDelaySeconds"].includes(id)) updates.restart();
			if (id === "extraSources") index.refresh({ force: true });
			if (id === "notifyScope" || id === "notifyUpdates") updates.notify();
		},
		onDrawerToggle: (category, shown) => { const state = api.Data.load("drawers") || {}; state[category] = shown; api.Data.save("drawers", state); },
		getDrawerState: (category, fallback) => { const state = api.Data.load("drawers") || {}; return category in state ? state[category] : fallback; }
	}));
}
//#endregion

//#region CSS
const CSS = `
.ph-root{display:flex;flex-direction:column;gap:14px;padding:0 0 24px;color:var(--text-default,#dbdee1);font-family:var(--font-primary,"gg sans",sans-serif)}
.ph-inactive{padding:24px;color:var(--text-muted,#949ba4)}
.ph-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.ph-title{margin:0;font-family:var(--font-display,var(--font-primary));font-size:20px;font-weight:600;color:var(--text-strong,#f2f3f5)}
.ph-subtitle{margin-top:2px;font-size:13px;color:var(--text-muted,#949ba4)}
.ph-header-actions{display:flex;gap:4px;flex-shrink:0}
.ph-icon-button.bd-button{color:var(--interactive-normal,#b5bac1)}
.ph-icon-button.bd-button:hover{color:var(--interactive-hover,#dbdee1)}
.ph-svg{display:block}
.ph-spin{animation:ph-spin 1s linear infinite}
@keyframes ph-spin{to{transform:rotate(360deg)}}
.ph-controls{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.ph-controls-right{display:flex;align-items:center;gap:8px;flex:1 1 320px;justify-content:flex-end}
.ph-search{flex:1 1 180px;max-width:320px}
.ph-sort{min-width:170px}
.ph-tabs{display:flex;gap:4px;padding:3px;border-radius:8px;background:var(--background-base-lower,#1e1f22)}
.ph-tab{appearance:none;border:0;background:transparent;color:var(--text-muted,#949ba4);font:inherit;font-size:14px;font-weight:500;padding:6px 12px;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background-color .15s,color .15s}
.ph-tab:hover{color:var(--text-default,#dbdee1);background:var(--background-mod-subtle,rgba(255,255,255,.06))}
.ph-tab-active,.ph-tab-active:hover{color:var(--text-strong,#f2f3f5);background:var(--background-base-low,#2b2d31)}
.ph-tab-count{font-size:11px;font-weight:700;line-height:1;padding:3px 6px;border-radius:999px;background:var(--background-mod-strong,rgba(255,255,255,.12));color:var(--text-default,#dbdee1)}
.ph-tab-attention .ph-tab-count{background:var(--brand-500,#5865f2);color:#fff}
.ph-banner{border-radius:8px;padding:10px 14px;background:var(--background-base-lower,#1e1f22);border:1px solid var(--border-subtle,rgba(255,255,255,.1));border-left:4px solid var(--status-warning,#f0b232);font-size:13px;line-height:1.45;color:var(--text-default,#dbdee1)}
.ph-banner strong{color:var(--text-strong,#f2f3f5);font-weight:600}
.ph-banner-line+.ph-banner-line{margin-top:4px}
.ph-banner .ph-link{font-weight:600;margin-left:4px}
.ph-link{color:var(--text-link,#00a8fc);cursor:pointer;text-decoration:none}
.ph-link:hover{text-decoration:underline}
.ph-tags{display:flex;flex-wrap:wrap;gap:6px}
.ph-chip{appearance:none;border:1px solid var(--border-subtle,rgba(255,255,255,.1));background:var(--background-base-lower,#1e1f22);color:var(--text-muted,#949ba4);font:inherit;font-size:12px;font-weight:500;padding:4px 10px;border-radius:999px;cursor:pointer;transition:background-color .15s,color .15s,border-color .15s}
.ph-chip:hover{color:var(--text-default,#dbdee1);border-color:var(--border-strong,rgba(255,255,255,.2))}
.ph-chip-active,.ph-chip-active:hover{background:var(--brand-500,#5865f2);border-color:var(--brand-500,#5865f2);color:#fff}
.ph-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px}
.ph-card{display:flex;flex-direction:column;border-radius:10px;overflow:hidden;background:var(--card-background-default,var(--background-base-lower,#1e1f22));border:1px solid var(--border-faint,rgba(255,255,255,.06));transition:border-color .15s,transform .15s,box-shadow .15s}
.ph-card:hover{border-color:var(--border-subtle,rgba(255,255,255,.14));box-shadow:0 4px 14px rgba(0,0,0,.25)}
.ph-card-banner{position:relative;height:104px;display:flex;align-items:center;justify-content:center;background:var(--background-base-lowest,#111214)}
.ph-card-thumb{width:100%;height:100%;object-fit:cover;display:block}
.ph-card-initials{font-family:var(--font-display,var(--font-primary));font-size:34px;font-weight:700;letter-spacing:1px;color:rgba(255,255,255,.85);text-shadow:0 2px 8px rgba(0,0,0,.35)}
.ph-badges{position:absolute;top:8px;left:8px;display:flex;gap:4px;flex-wrap:wrap;max-width:calc(100% - 60px)}
.ph-badge{font-size:10px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;padding:3px 6px;border-radius:4px;background:rgba(0,0,0,.55);color:#fff;backdrop-filter:blur(4px)}
.ph-badge-new{background:var(--brand-500,#5865f2)}
.ph-badge-update{background:var(--status-positive,#23a55a)}
.ph-badge-installed{background:rgba(0,0,0,.55)}
.ph-badge-conflict,.ph-badge-deprecated{background:var(--status-danger,#f23f43)}
.ph-badge-updated{background:var(--status-warning,#f0b232);color:#111}
.ph-avatar{position:absolute;right:14px;bottom:-28px;width:80px;height:80px;border-radius:50%;background:var(--background-base-low,#2b2d31);border:4px solid var(--card-background-default,var(--background-base-lower,#1e1f22));display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:var(--text-strong,#f2f3f5);cursor:pointer;overflow:visible;box-shadow:0 2px 8px rgba(0,0,0,.3)}
.ph-avatar img{width:100%;height:100%;border-radius:50%;object-fit:cover}
.ph-avatar-check{position:absolute;right:0;bottom:2px;width:22px;height:22px;border-radius:50%;background:var(--status-positive,#23a55a);color:#fff;display:flex;align-items:center;justify-content:center;border:3px solid var(--card-background-default,var(--background-base-lower,#1e1f22))}
.ph-card-body{display:flex;flex-direction:column;flex:1;gap:6px;padding:14px 14px 12px}
.ph-card-title{display:flex;align-items:baseline;gap:8px;min-width:0;padding-right:96px}
.ph-card-name{font-family:var(--font-display,var(--font-primary));font-size:16px;font-weight:600;color:var(--text-strong,#f2f3f5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ph-card-version{font-size:12px;color:var(--text-muted,#949ba4);white-space:nowrap}
.ph-card-author{font-size:12px;color:var(--text-muted,#949ba4)}
.ph-card-author-name{color:var(--text-default,#dbdee1);font-weight:500}
.ph-card-desc{font-size:13px;line-height:1.4;color:var(--text-default,#dbdee1);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;min-height:3.6em}
.ph-card-tags{display:flex;flex-wrap:wrap;gap:4px}
.ph-tag{font-size:11px;font-weight:500;padding:2px 7px;border-radius:999px;background:var(--background-mod-subtle,rgba(255,255,255,.06));color:var(--text-muted,#949ba4);cursor:pointer}
.ph-tag:hover{color:var(--text-default,#dbdee1);background:var(--background-mod-strong,rgba(255,255,255,.12))}
.ph-tag-more,.ph-tag-muted{cursor:default;opacity:.7}
.ph-card-warning{display:flex;align-items:center;gap:4px;font-size:12px;color:var(--status-warning,#f0b232);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ph-card-footer{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:auto;padding-top:6px}
.ph-card-meta{font-size:11px;color:var(--text-muted,#949ba4)}
.ph-card-actions{display:flex;align-items:center;gap:2px;flex-shrink:0;margin-left:auto}
.ph-switch{display:flex;align-items:center;transform:scale(.8);transform-origin:left center}
.ph-primary.bd-button{min-width:84px;margin-left:4px}
.ph-icon-danger.bd-button:hover{color:var(--status-danger,#f23f43)}
.ph-empty{display:flex;flex-direction:column;align-items:center;gap:10px;padding:48px 16px;text-align:center;color:var(--text-muted,#949ba4);font-size:14px}
.ph-muted{color:var(--text-muted,#949ba4);font-size:12px}
.ph-updates{display:flex;flex-direction:column;gap:8px}
.ph-updates-head{display:flex;align-items:center;justify-content:space-between;font-size:14px;font-weight:500;color:var(--text-strong,#f2f3f5);padding:4px 0}
.ph-update-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 14px;border-radius:8px;background:var(--background-base-lower,#1e1f22);border:1px solid var(--border-faint,rgba(255,255,255,.06))}
.ph-update-snoozed{opacity:.6}
.ph-update-name{font-weight:600;color:var(--text-strong,#f2f3f5);font-size:14px}
.ph-update-actions{display:flex;align-items:center;gap:6px;flex-shrink:0}
.ph-untracked{margin-top:4px;font-size:13px;color:var(--text-muted,#949ba4)}
.ph-untracked summary{cursor:pointer;padding:6px 0}
.ph-untracked-list{display:flex;flex-wrap:wrap;gap:4px;padding:4px 0}
.ph-summary{display:flex;flex-direction:column;gap:8px;font-size:14px;color:var(--text-default,#dbdee1)}
.ph-summary-row{display:flex;gap:10px;line-height:1.4}
.ph-summary-label{flex:0 0 76px;color:var(--text-muted,#949ba4)}
.ph-summary-value{min-width:0;word-break:break-word}
.ph-summary-info,.ph-summary-alert{padding:8px 10px;border-radius:6px;font-size:13px;background:var(--background-mod-subtle,rgba(255,255,255,.06))}
.ph-summary-alert{background:var(--status-danger-background,rgba(242,63,67,.12));border:1px solid var(--status-danger,#f23f43)}
.ph-summary-toggle{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:4px}
.ph-summary-toggle-label{font-weight:500;color:var(--text-strong,#f2f3f5)}
.ph-summary-note{font-size:12px;color:var(--text-muted,#949ba4)}
.ph-sidebar-title{display:inline-flex;align-items:center;gap:6px}
.ph-sidebar-badge{font-size:10px;font-weight:700;line-height:1;padding:3px 5px;border-radius:999px;background:var(--brand-500,#5865f2);color:#fff}
.ph-settings-modal,.ph-plugin-settings{min-height:120px}
.ph-editor{display:flex;flex-direction:column;flex:1;min-height:0}
.ph-editor-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px;border-bottom:1px solid var(--border-subtle,rgba(255,255,255,.1));font-size:13px;color:var(--text-muted,#949ba4)}
.ph-editor-file{font-family:var(--font-code,Consolas,monospace);color:var(--text-default,#dbdee1)}
.ph-editor-dirty{color:var(--status-warning,#f0b232)}
.ph-editor-actions{display:flex;align-items:center;gap:4px}
.ph-editor-host{flex:1;min-height:0}
.ph-editor-message{display:flex;align-items:center;gap:8px;padding:10px 12px;color:var(--text-muted,#949ba4);font-size:13px}
`;
//#endregion

//#region Plugin
module.exports = class PluginHub {
	constructor(meta) {
		this.meta = meta;
		this.api = new BdApi(meta.name);
	}

	start() {
		const api = this.api;
		const ctx = { api, id: Date.now(), started: true, pendingTab: null, editors: new Map() };
		ctx.settings = new SettingsStore(api);
		ctx.ledger = new Ledger(api);
		ctx.index = new IndexStore(api, ctx.settings);
		ctx.installed = new InstalledStore(api);
		ctx.ops = new OpsStore();
		ctx.installer = new Installer(ctx);
		ctx.updates = new UpdateChecker(ctx);
		ctx.integration = new SettingsIntegration(ctx);
		this.ctx = ctx;
		activeCtx = ctx;

		api.DOM.addStyle(CSS);
		document.addEventListener("beforetoggle", anchorDropdown, true);
		ctx.index.loadFromCache();
		ctx.updates.recompute();
		ctx.installed.watch();
		this.onInstalledChange = () => ctx.updates.recompute();
		ctx.installed.addChangeListener(this.onInstalledChange);
		ctx.integration.patch().catch(e => api.Logger.error("Settings integration failed:", e));
		ctx.updates.start();
		lifecycle.emitChange();
		api.Logger.info(`${DISPLAY_NAME} v${PLUGIN_VERSION} started`);
	}

	stop() {
		const ctx = this.ctx;
		if (!ctx) return;
		ctx.started = false;
		for (const editor of ctx.editors.values()) { try { editor.close(); } catch { /* ignore */ } }
		ctx.editors.clear();
		try { ctx.updates.stop(); } catch (e) { this.api.Logger.warn(e); }
		try { ctx.installed.removeChangeListener(this.onInstalledChange); ctx.installed.unwatch(); } catch (e) { this.api.Logger.warn(e); }
		try { ctx.integration.unpatch(); } catch (e) { this.api.Logger.warn(e); }
		this.api.Patcher.unpatchAll();
		this.api.DOM.removeStyle();
		document.removeEventListener("beforetoggle", anchorDropdown, true);
		if (activeCtx === ctx) activeCtx = null;
		this.ctx = null;
		lifecycle.emitChange();
	}

	getSettingsPanel() {
		if (!this.ctx) return h("div", null, `${DISPLAY_NAME} is not running.`);
		return buildSettingsPanel(this.ctx);
	}

	// Public: other plugins' updaters ask this before handling their own updates (registry POLICY.md, ban 4)
	manages(name) {
		const ctx = this.ctx;
		return !!ctx && ctx.index.getAll().some(e => e.name === name || e.file_name === name);
	}
};
//#endregion
