/**
 * @name ShowAllChannelsAuto
 * @version 1.0.2
 * @website https://github.com/Pharaoh2k/BetterDiscordStuff
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/ShowAllChannelsAuto/ShowAllChannelsAuto.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowAllChannelsAuto/ShowAllChannelsAuto.plugin.js
 * @authorId 874825550408089610
 * @description Automatically enables "Show All Channels" for every Discord server by clearing the guild flag that disables it.
 * @author Pharaoh2k
 */
/*
Copyright © 2025-present, Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
"use strict";
const TAG = "ShowAllChannelsAuto";
const DEV = false;
const log = (...a) => DEV && console.log(`[${TAG}]`, ...a);
const SHOW_ALL_OFF_BIT = 1 << 14; // 16384
const CONFIG = {
    github: "Pharaoh2k/BetterDiscordStuff",
    defaultConfig: [
        {
            type: "switch",
            id: "autoUpdate",
            name: "Automatic Updates",
            note: "Check for updates every 24 hours and on Discord startup",
            value: true
        }
    ]
};
class UpdateManager {
	constructor(pluginName, version, github = "Pharaoh2k/BetterDiscordStuff") {
		this.name = pluginName;
		this.version = version;
		const [user, repo] = github.split('/');
		this.urls = {
			plugin: `https://raw.githubusercontent.com/${user}/${repo}/main/Plugins/${pluginName}/${pluginName}.plugin.js`,
			changelog: `https://raw.githubusercontent.com/${user}/${repo}/main/Plugins/${pluginName}/CHANGELOG.md`
		};
		this.timer = null;
		this.notification = null;
		this._initialTimeout = null;
	}
	async start(autoUpdate = true) {
		this.stop();
		if (autoUpdate) {
			this._initialTimeout = setTimeout(() => this.check(true), 15000);
			this.timer = setInterval(() => this.check(true), 24 * 60 * 60 * 1000);
		}
		this.showChangelog();
	}
	stop() {
		if (this._initialTimeout) {
			clearTimeout(this._initialTimeout);
			this._initialTimeout = null;
		}
		clearInterval(this.timer);
		this.timer = null;
		if (typeof this.notification === "function") this.notification();
		else this.notification?.close?.();
		this.notification = null;
	}
	async check(silent = false) {
		try {
			const res = await BdApi.Net.fetch(this.urls.plugin);
			if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
			const text = await res.text();
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) throw new Error(`Remote plugin validation failed: ${validated.reason}`);
			const version = validated.version;
			if (this.isNewer(version)) {
				this.showUpdateNotice(version, text);
			} else if (!silent) {
				BdApi.UI.showToast(`[${this.name}] You're up to date.`, { type: "info" });
			}
		} catch (e) {
			BdApi.Logger.error(this.name, "Update check failed:", e);
			if (!silent) BdApi.UI.showToast(`[${this.name}] Update check failed`, { type: "error" });
		}
	}
	showUpdateNotice(version, text) {
		if (typeof this.notification === "function") this.notification();
		else this.notification?.close?.();
		let handle = null;
		const closeHandle = () => {
			if (typeof handle === "function") handle();
			else handle?.close?.();
		};
		handle = BdApi.UI.showNotification?.({
			id: `bd-plugin-update:${this.name}`,
			title: `${this.name}`,
			content: `v${version} is available`,
			type: "info",
			duration: 6000000,
			actions: [
				{
					label: "Update",
					onClick: () => {
						closeHandle();
						this.applyUpdate(text, version);
					},
				},
				{
					label: "Dismiss",
					onClick: closeHandle,
				},
			],
			onClose: () => {
				if (this.notification === handle) this.notification = null;
			},
		}) ?? BdApi.UI.showNotice(`${this.name} v${version} is available`, {
			type: "info",
			buttons: [
				{
					label: "Update",
					onClick: (closeOrEvent) => {
						if (typeof closeOrEvent === "function") closeOrEvent();
						else closeHandle();
						this.applyUpdate(text, version);
					},
				},
				{
					label: "Dismiss",
					onClick: (closeOrEvent) => {
						if (typeof closeOrEvent === "function") closeOrEvent();
						else closeHandle();
					},
				},
			],
		});
		this.notification = handle;
	}
	applyUpdate(text, version) {
		try {
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) {
				BdApi.UI.showToast(`Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
				return;
			}
			const nextVersion = validated.version ?? version;
			require("fs").writeFileSync(__filename, text);
			BdApi.UI.showToast(`Updated to v${nextVersion}. Reloading...`, { type: "success" });
			setTimeout(() => {
				try {
					BdApi.Plugins.reload(this.name);
				} catch {
					BdApi.UI.showToast("Please reload Discord (Ctrl+R)", { type: "info", timeout: 0 });
				}
			}, 100);
		} catch (e) {
			BdApi.Logger.error(this.name, "Update failed:", e);
			BdApi.UI.showToast("Update failed", { type: "error" });
		}
	}
	async showChangelog() {
		const last = BdApi.Data.load(this.name, 'version');
		console.log(`[${this.name}] showChangelog: last=${last}, current=${this.version}`);
		if (last === this.version) { console.log(`[${this.name}] Skipping: versions match`); return; }
		BdApi.Data.save(this.name, 'version', this.version);
		if (!last) { console.log(`[${this.name}] Skipping: fresh install`); return; }
		try {
			const res = await BdApi.Net.fetch(this.urls.changelog);
			console.log(`[${this.name}] Changelog fetch status: ${res.status}`);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			console.log(`[${this.name}] Parsed changes:`, changes);
			if (changes.length === 0) return;
			BdApi.UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes });
		} catch (e) { console.error(`[${this.name}] Changelog error:`, e); }
	}
	async showFullChangelog() {
		try {
			const res = await BdApi.Net.fetch(this.urls.changelog);
			if (res.status !== 200) throw new Error("Failed to fetch changelog");
			const md = await res.text();
			const changes = this.parseChangelog(md, "0.0.0", this.version);
			BdApi.UI.showChangelogModal({
				title: this.name,
				subtitle: `All Changes`,
				changes: changes.length ? changes : [{ title: "No changes found", items: [] }]
			});
		} catch {
			BdApi.UI.showToast("Could not fetch changelog", { type: "error" });
		}
	}
	parseChangelog(md, from, to) {
		const versions = this._parseChangelogVersions(md);
		const relevant = versions.filter(
			v => this.isNewer(v.version, from) && !this.isNewer(v.version, to)
		);
		const grouped = { added: [], improved: [], fixed: [], other: [] };
		const getType = (lower) => {
			if (lower.includes("fix")) return "fixed";
			if (lower.includes("add") || lower.includes("initial")) return "added";
			if (lower.includes("improv") || lower.includes("updat")) return "improved";
			return "other";
		};
		for (const v of relevant) {
			for (const item of v.items) {
				const lower = item.toLowerCase();
				const tagged = `${item} (v${v.version})`;
				grouped[getType(lower)].push(tagged);
			}
		}
		const sections = [
			["New Features", "added", "added"],
			["Improvements", "improved", "improved"],
			["Bug Fixes", "fixed", "fixed"],
			["Other Changes", "other", "progress"]
		];
		const result = [];
		for (const [title, key, type] of sections) {
			if (grouped[key].length) {
				result.push({ title, type, items: grouped[key] });
			}
		}
		return result;
	}
	_parseChangelogVersions(md) {
		const lines = md.split("\n");
		const versions = [];
		let current = null;
		let items = [];
		const push = () => {
			if (!current) return;
			versions.push({ version: current, items });
			items = [];
		};
		for (const line of lines) {
			const ver = line.match(/^###\s+([\d.]+)/)?.[1];
			if (ver) {
				push();
				current = ver;
				continue;
			}
			if (!current) continue;
			const trimmed = line.trim();
			if (!trimmed.startsWith("-")) continue;
			const item = trimmed.substring(1).trim();
			if (item) items.push(item);
		}
		push();
		return versions;
	}
	isNewer(remoteVersion, localVersion = this.version) {
		return this._compareSemver(remoteVersion, localVersion) > 0;
	}
	_compareSemver(a, b) {
		const pa = String(a ?? "").split(".").map(n => Number.parseInt(n, 10));
		const pb = String(b ?? "").split(".").map(n => Number.parseInt(n, 10));
		const len = Math.max(pa.length, pb.length);
		for (let i = 0; i < len; i++) {
			const va = Number.isFinite(pa[i]) ? pa[i] : 0;
			const vb = Number.isFinite(pb[i]) ? pb[i] : 0;
			if (va > vb) return 1;
			if (va < vb) return -1;
		}
		return 0;
	}
	_validateRemotePluginText(text) {
		if (typeof text !== "string") return { ok: false, reason: "Not a string" };
		if (text.length < 800) return { ok: false, reason: "File too small" };
		const remoteName = text.match(/@name\s+([^\n\r]+)/)?.[1]?.trim();
		if (!remoteName) return { ok: false, reason: "Missing @name" };
		if (remoteName !== this.name) return { ok: false, reason: `Unexpected @name (${remoteName})` };
		const remoteVersion = text.match(/@version\s+([\d.]+)/)?.[1];
		if (!remoteVersion) return { ok: false, reason: "Missing @version" };
		if (!text.includes("module.exports")) return { ok: false, reason: "Missing module.exports" };
		if (!text.includes("@updateUrl")) return { ok: false, reason: "Missing @updateUrl header" };
		return { ok: true, version: remoteVersion };
	}
}
function getConfigWithCurrentValues(current, defaults = CONFIG.defaultConfig) {
    return defaults.map(opt => ({
        ...opt,
        value: current[opt.id] ?? opt.value
    }));
}
module.exports = class ShowAllChannelsAuto {
    constructor(meta) {
        this.meta = meta;
        const repo = this._repoFromMeta(this.meta) || CONFIG.github;
        this.updateManager = new UpdateManager(this.meta.name, this.meta.version, repo);
        this.settings = this.getSettings();
        this.guildListener = null;
        this.Dispatcher = null;
        this.GuildStore = null;
        this.UserGuildSettingsStore = null;
    }
    _repoFromMeta(meta) {
        const src = meta?.source || meta?.website || meta?.updateUrl || "";
        const m = src.match(/github\.com\/([^/]+)\/([^/]+)/i);
        return m ? `${m[1]}/${m[2].replace(/\.git$/, "")}` : null;
    }
    getSettings() {
        const defaults = CONFIG.defaultConfig.reduce((acc, cfg) => ({ ...acc, [cfg.id]: cfg.value }), {});
        defaults.excludeGuildIds = [];
        return { ...defaults, ...BdApi.Data.load(this.meta.name, "settings") };
    }
    saveSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        BdApi.Data.save(this.meta.name, "settings", this.settings);
        if (Object.prototype.hasOwnProperty.call(newSettings, "autoUpdate")) {
            newSettings.autoUpdate ? this.updateManager.start(true) : this.updateManager.stop();
        }
    }
    start() {
        const W = BdApi.Webpack;
        this.Dispatcher = W.getModule(m => m?.dispatch && m?.subscribe);
        this.GuildStore = W.getStore("GuildStore");
        this.UserGuildSettingsStore = W.getStore("UserGuildSettingsStore");
        if (!this.Dispatcher || !this.GuildStore || !this.UserGuildSettingsStore) {
            BdApi.UI.showToast(`[${TAG}] Missing Discord internals (client update?)`, { type: "error" });
            return;
        }
        this._startTimer = setTimeout(() => this.enableAllGuilds(), 1000);
        this.updateManager.start(this.settings.autoUpdate);
        BdApi.UI.showToast(`[${TAG}] Enabled`, { type: "success" });
    }
    stop() {
        if (this._startTimer) { clearTimeout(this._startTimer); this._startTimer = null; }
        this.updateManager.stop();
        BdApi.UI.showToast(`[${TAG}] Disabled`, { type: "info" });
    }
    enableAllGuilds() {
        const guilds = this.GuildStore?.getGuilds?.() ?? {};
        const excluded = new Set(this.settings?.excludeGuildIds || []);
        for (const guildId of Object.keys(guilds)) {
            if (excluded.has(guildId)) continue;
            this.enableGuild(guildId);
        }
    }
    enableGuild(guildId) {
        try {
            const allSettings = this.UserGuildSettingsStore.getAllSettings();
            const settings = allSettings?.userGuildSettings?.[guildId];
            if (!settings) return;
            const current = settings.flags ?? 0;
            if ((current & SHOW_ALL_OFF_BIT) !== 0) {
                const next = current & ~SHOW_ALL_OFF_BIT;
                this._dispatchUpdate(guildId, next);
                log(`Enabled for guild ${guildId} (${current} -> ${next})`);
            }
        } catch (e) {
            log(`Failed to enable for guild ${guildId}`, e);
        }
    }
    _dispatchUpdate(guildId, flags) {
        try {
            this.Dispatcher.dispatch({
                type: "USER_GUILD_SETTINGS_GUILD_UPDATE",
                guildId,
                settings: { flags }
            });
        } catch (e) {
            log(`Dispatch failed for ${guildId}`, e);
        }
    }
    _debounce(fn, ms) {
        let t = null;
        return (...args) => {
            if (t) clearTimeout(t);
            t = setTimeout(() => fn(...args), ms);
        };
    }
    getSettingsPanel() {
        const config = getConfigWithCurrentValues(this.settings);
        const guilds = this.GuildStore?.getGuilds?.() ?? {};
        const excluded = new Set(this.settings?.excludeGuildIds || []);
        const sortedGuilds = Object.entries(guilds)
            .sort((a, b) => (a[1]?.name || "").localeCompare(b[1]?.name || ""));
        if (sortedGuilds.length > 0) {
            config.push({
                type: "category",
                id: "exclusions",
                name: "Server Exclusions",
                collapsible: true,
                shown: false,
                settings: sortedGuilds.map(([id, guild]) => ({
                    type: "switch",
                    id: `exclude_${id}`,
                    name: guild?.name || id,
                    note: `Exclude this server from auto-enable`,
                    value: excluded.has(id)
                }))
            });
        }
        config.push({
            type: "button",
            id: "applyNow",
            name: "Apply Now",
            note: "Immediately re-enable all non-excluded servers",
            onClick: () => {
                this.enableAllGuilds();
                BdApi.UI.showToast("Applied!", { type: "success" });
            }
        });
        config.push({
            type: "button",
            id: "checkUpdate",
            name: "Check for Updates",
            note: "Manually check for plugin updates",
            onClick: () => this.updateManager.check()
        });
        config.push({
            type: "button",
            id: "viewChangelog",
            name: "View Changelog",
            note: "View all version changes",
            onClick: () => this.updateManager.showFullChangelog()
        });
        const panel = BdApi.UI.buildSettingsPanel({
            settings: config,
            onChange: (_, id, value) => {
                if (id.startsWith('exclude_')) {
                    const guildId = id.substring(8);
                    const excluded = new Set(this.settings?.excludeGuildIds || []);
                    if (value) excluded.add(guildId);
                    else excluded.delete(guildId);
                    this.saveSettings({ excludeGuildIds: Array.from(excluded) });
                } else {
                    this.saveSettings({ [id]: value });
                }
            }
        });
        requestAnimationFrame(() => {
            const applyBtn = document.querySelector("#applyNow .bd-button-content");
            if (applyBtn) applyBtn.textContent = "Apply Now";
            const checkBtn = document.querySelector("#checkUpdate .bd-button-content");
            if (checkBtn) checkBtn.textContent = "Check Now";
            const changelogBtn = document.querySelector("#viewChangelog .bd-button-content");
            if (changelogBtn) changelogBtn.textContent = "View Changelog";
        });
        return panel;
    }
};
