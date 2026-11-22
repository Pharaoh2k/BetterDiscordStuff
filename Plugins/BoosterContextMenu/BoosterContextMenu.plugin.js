/**
 * @name BoosterContextMenu
 * @version 1.0.0
 * @description Right-click a booster in a server's Server Boosts activity to open their user menu, just like in chat.
 * @author Pharaoh2k
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BoosterContextMenu/BoosterContextMenu.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BoosterContextMenu/BoosterContextMenu.plugin.js
 */
/*
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * * *
 * Contributions are welcome via GitHub pull requests.
 * Please ensure submissions align with the project's guidelines and coding standards.
 * By contributing, you agree that your work will be licensed under the same terms as this project.
*/
"use strict";
const { Data, Logger, Net, Plugins, ReactUtils, UI, Utils, Webpack } = new BdApi("BoosterContextMenu");
const { UserStore, SelectedChannelStore, GuildChannelStore } = Webpack.Stores;
const GITHUB = "Pharaoh2k/BetterDiscordStuff";
const panelConfig = [
	{
		type: "switch",
		id: "autoUpdate",
		name: "Automatic Updates",
		note: "Check for updates on startup and every 24 hours",
		value: true
	}
];
// Shared by Pharaoh2k's plugins: one "Plugin Updater" notification that lists every pending update, like
// BetterDiscord's own addon updater, instead of one popup per plugin. The first plugin to load creates it, the
// others reuse it, and a newer copy replaces an older one.
const SharedUpdateNotice = (() => {
	const VERSION = 1;
	const previous = globalThis.__pharaohUpdateNotice;
	if (previous?.version >= VERSION) return previous;
	const TITLE = "Plugin Updater";
	const h = BdApi.React.createElement;
	const notice = { version: VERSION, pending: new Map(), dismissed: new Map(), timer: null, handle: null, shown: "" };
	const close = () => {
		const handle = notice.handle;
		notice.handle = null;
		if (!handle || handle.isVisible?.() === false) return;
		// handle.close() can leave the notice on screen with dead buttons; its own X closes it through BetterDiscord's working path
		const element = [...document.querySelectorAll(".bd-notification")].find(el => el.querySelector(".bd-notification-title")?.textContent === TITLE);
		const button = element?.querySelector(".bd-notification-close");
		if (button) button.click();
		else handle.close?.();
	};
	const render = () => {
		notice.timer = null;
		const items = [...notice.pending.values()].sort((a, b) => a.name.localeCompare(b.name));
		const signature = items.map(p => `${p.name}@${p.version}`).join(",");
		if (!items.length) { notice.shown = ""; close(); return; }
		if (signature === notice.shown && notice.handle) return;
		close();
		notice.shown = signature;
		const count = items.length === 1 ? "One plugin has an update!" : `${items.length} plugins have updates!`;
		const list = h("ul", { className: "bd-notification-updates-list" }, items.map(p => h("li", { key: p.name }, p.name, " ", h("i", null, `(${p.version})`))));
		const updateAll = () => {
			notice.pending.clear();
			notice.shown = "";
			for (const p of items) { try { p.apply(); } catch (e) { BdApi.Logger.error(p.name, "Update failed:", e); } }
		};
		const dismiss = () => {
			for (const p of items) notice.dismissed.set(p.name, p.version);
			notice.pending.clear();
			notice.shown = "";
		};
		// BetterDiscord closes the notice itself after an action runs, so the actions must not close it too
		const actions = [{ label: "Update All!", onClick: updateAll }, { label: "Dismiss", onClick: dismiss }];
		const handle = BdApi.UI.showNotification({
			id: `pharaoh-plugin-updates:${Date.now()}`,
			title: TITLE,
			content: [count, list],
			type: "info",
			duration: Infinity,
			actions,
			onClose: () => { if (notice.handle === handle) notice.handle = null; }
		});
		notice.handle = handle || null;
		// notifications can be switched off in BetterDiscord's settings; fall back to the notice bar
		if (!handle) BdApi.UI.showNotice(`${count} ${items.map(p => p.name).join(", ")}`, { type: "info", buttons: actions });
	};
	const schedule = (delay) => { clearTimeout(notice.timer); notice.timer = setTimeout(render, delay); };
	notice.add = (entry) => {
		if (notice.dismissed.get(entry.name) === entry.version) return false;
		notice.pending.set(entry.name, entry);
		schedule(notice.handle ? 500 : 2500); // give the other plugins' checks a moment so they land in the same notice
		return true;
	};
	notice.remove = (name) => {
		if (!notice.pending.delete(name)) return;
		if (notice.handle) schedule(500);
		else notice.shown = "";
	};
	notice.has = (name) => notice.pending.has(name);
	notice.close = close;
	if (previous) {
		clearTimeout(previous.timer);
		previous.close?.();
		for (const [name, entry] of previous.pending ?? []) notice.pending.set(name, entry);
		if (notice.pending.size) schedule(2500);
	}
	globalThis.__pharaohUpdateNotice = notice;
	return notice;
})();

class UpdateManager {
	/* using Net, UI, Logger, Data, Plugins, Utils from BdApi */
	constructor(pluginName, version, github) {
		this.name = pluginName;
		this.version = version;
		const [user, repo] = github.split('/');
		this.urls = {
			plugin: `https://raw.githubusercontent.com/${user}/${repo}/main/Plugins/${pluginName}/${pluginName}.plugin.js`,
			changelog: `https://raw.githubusercontent.com/${user}/${repo}/main/Plugins/${pluginName}/CHANGELOG.md`
		};
		this.timer = null;
		this.notification = null;
		this._noticeContent = "";
		this._initialTimeout = null;
	}
	start(autoUpdate = true) {
		this.stop();
		if (autoUpdate) {
			this._initialTimeout = setTimeout(() => this.check(true), 15000);
			this.timer = setInterval(() => this.check(true), 24 * 60 * 60 * 1000);
		}
		this.showChangelog();
	}
	stop() {
		clearTimeout(this._initialTimeout);
		this._initialTimeout = null;
		clearInterval(this.timer);
		this.timer = null;
		this._closeNotification();
	}
	_closeNotification() {
		const handle = this.notification;
		this.notification = null;
		if (!handle) return;
		if (typeof handle === "function") return handle();
		if (handle.isVisible?.() === false) return;
		// BetterDiscord's handle.close() takes the notice out of its list without re-rendering, which leaves it on
		// screen with its buttons and X dead. Clicking its own X closes it through BetterDiscord's working path.
		const notice = [...document.querySelectorAll(".bd-notification")].find(el =>
			el.querySelector(".bd-notification-title")?.textContent === this.name &&
			el.querySelector(".bd-notification-content-text")?.textContent.includes(this._noticeContent));
		const closeButton = notice?.querySelector(".bd-notification-close");
		if (closeButton) closeButton.click();
		else handle.close?.();
	}
	async check(silent = false) {
		// Plugin Hub reviews and delivers updates for the plugins it manages, so this updater steps aside while it runs
		const hub = BdApi.Plugins.isEnabled("PluginHub") ? BdApi.Plugins.get("PluginHub")?.instance : null;
		if (hub && (typeof hub.manages !== "function" || hub.manages(this.name))) {
			if (!silent) BdApi.UI.showToast(`[${this.name}] Updates are handled by Plugin Hub`, { type: "info" });
			return;
		}
		try {
			const res = await Net.fetch(this.urls.plugin);
			if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
			const text = await res.text();
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) throw new Error(`Remote plugin validation failed: ${validated.reason}`);
			const version = validated.version;
			if (this.isNewer(version)) {
				this.showUpdateNotice(version, text);
			} else if (!silent) {
				UI.showToast(`[${this.name}] You're up to date.`, { type: "info" });
			}
		} catch (e) {
			Logger.error("Update check failed:", e);
			if (!silent) UI.showToast(`[${this.name}] Update check failed`, { type: "error" });
		}
	}
	showUpdateNotice(version, text) {
		this._closeNotification();
		this._noticeContent = `v${version} is available`;
		const name = this.name;
		if (!SharedUpdateNotice.add({ name, version, apply: () => this.applyUpdate(text, version) })) return;
		// shaped like a BetterDiscord notification handle so _closeNotification() drops this plugin from the shared notice
		this.notification = { close: () => SharedUpdateNotice.remove(name), isVisible: () => SharedUpdateNotice.has(name) };
	}
	applyUpdate(text) {
		try {
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) {
				UI.showToast(`[${this.name}] Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
				return;
			}
			const nextVersion = validated.version;
			const path = require("path");
			const target = path.join(__dirname, path.basename(__filename));
			require("fs").writeFileSync(target, text);
			UI.showToast(`[${this.name}] Updated to v${nextVersion}. Reloading...`, { type: "success" });
			setTimeout(() => {
				try {
					Plugins.reload(this.name);
				} catch {
					UI.showToast(`[${this.name}] Please reload Discord (Ctrl+R)`, { type: "info", timeout: 0 });
				}
			}, 100);
		} catch (e) {
			Logger.error("Update failed:", e);
			UI.showToast(`[${this.name}] Update failed`, { type: "error" });
		}
	}
	// A short request to star the repository, shown under every changelog
	changelogFooter() {
		const { createElement } = BdApi.React;
		return createElement("div", { style: { color: "var(--text-default)", fontSize: "14px", lineHeight: "18px" } },
			`If you use ${this.name}, please `,
			createElement("a", { href: "https://github.com/Pharaoh2k/BetterDiscordStuff", target: "_blank", rel: "noreferrer noopener" }, "star ⭐ the repo"),
			". It's free of charge and only takes a moment. :)"
		);
	}
	async showChangelog() {
		const last = Data.load('version');
		if (last === this.version) return;
		Data.save('version', this.version);
		if (!last) return;
		try {
			const res = await Net.fetch(this.urls.changelog);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			if (changes.length === 0) return;
			UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes, footer: this.changelogFooter() });
		} catch (e) { Logger.error("Changelog error:", e); }
	}
	async showFullChangelog() {
		try {
			const res = await Net.fetch(this.urls.changelog);
			if (res.status !== 200) throw new Error("Failed to fetch changelog");
			const md = await res.text();
			const changes = this.parseChangelog(md, "0.0.0", this.version);
			UI.showChangelogModal({
				title: this.name,
				subtitle: `All Changes`,
				changes: changes.length ? changes : [{ title: "No changes found", items: [] }],
				footer: this.changelogFooter()
			});
		} catch {
			UI.showToast("Could not fetch changelog", { type: "error" });
		}
	}
	parseChangelog(md, from, to) {
		const versions = this._parseChangelogVersions(md);
		const relevant = versions.filter(
			v => this.isNewer(v.version, from) && !this.isNewer(v.version, to)
		);
		const getType = (lower) => {
			if (lower.includes("fix")) return "fixed";
			if (lower.includes("add") || lower.includes("initial")) return "added";
			if (lower.includes("improv") || lower.includes("updat")) return "improved";
			return "other";
		};
		const sections = [
			["New Features", "added", "added"],
			["Improvements", "improved", "improved"],
			["Bug Fixes", "fixed", "fixed"],
			["Other Changes", "other", "progress"]
		];
		const result = [];
		for (const v of relevant) {
			const grouped = { added: [], improved: [], fixed: [], other: [] };
			for (const item of v.items) {
				grouped[getType(item.toLowerCase())].push(item);
			}
			result.push({ title: `Version ${v.version}`, type: "", items: [] });
			for (const [title, key, type] of sections) {
				if (grouped[key].length) {
					result.push({ title, type, items: grouped[key] });
				}
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
		return Utils.semverCompare(localVersion, remoteVersion) > 0;
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

// Discord's user mention rule opens the same user menu as right-clicking a name in chat, loading it on demand. It is
// part of the chat parser, so it is there from startup.
const MentionRule = Webpack.getModule(m => typeof m?.handleUserContextMenu === "function", { searchExports: true });
const PHASES = new Set(["gave", "expiring", "expired"]);
// The Recent Activity rows on the Server Boosts page render plain elements; the row component gets the boost as a prop
const findBoost = target => {
	let fiber = ReactUtils.getInternalInstance(target);
	for (let depth = 0; fiber && depth < 15; fiber = fiber.return, depth++) {
		const { boost, phase } = fiber.memoizedProps ?? {};
		if (boost?.userId && boost.guildId && PHASES.has(phase)) return boost;
	}
	return null;
};
module.exports = class BoosterContextMenu {
	constructor(meta) {
		this.updateManager = new UpdateManager(meta.name, meta.version, GITHUB);
		this.settings = { ...Object.fromEntries(panelConfig.map(s => [s.id, s.value])), ...Data.load("settings") };
		this.onContextMenu = this.onContextMenu.bind(this);
	}
	start() {
		if (!MentionRule) Logger.error("Could not find Discord's user menu, right-clicking boosters will do nothing");
		document.addEventListener("contextmenu", this.onContextMenu);
		this.updateManager.start(this.settings.autoUpdate);
	}
	stop() {
		this.updateManager.stop();
		document.removeEventListener("contextmenu", this.onContextMenu);
	}
	onContextMenu(event) {
		if (!MentionRule || event.defaultPrevented) return;
		const boost = findBoost(event.target);
		if (!boost) return;
		const user = UserStore.getUser(boost.userId) ?? boost.user;
		// The menu's channel items need a channel of the server, so use the one you were last in there
		const channelId = SelectedChannelStore.getMostRecentSelectedTextChannelId(boost.guildId) ?? GuildChannelStore.getDefaultChannel(boost.guildId)?.id;
		if (!user || !channelId) return;
		MentionRule.handleUserContextMenu(user, channelId, boost.guildId, event);
	}
	getSettingsPanel() {
		return UI.buildSettingsPanel({
			settings: [
				...panelConfig.map(s => ({ ...s, value: this.settings[s.id] })),
				{
					type: "button",
					id: "checkUpdate",
					name: "Check for Updates",
					note: "Manually check if a new version is available",
					children: "Check Now",
					onClick: () => this.updateManager.check()
				},
				{
					type: "button",
					id: "viewChangelog",
					name: "View Changelog",
					note: "View the complete changelog for this plugin",
					children: "View Changelog",
					onClick: () => this.updateManager.showFullChangelog()
				}
			],
			onChange: (_, id, value) => {
				this.settings[id] = value;
				Data.save("settings", this.settings);
				if (id === "autoUpdate") {
					if (value) this.updateManager.start(true);
					else this.updateManager.stop();
				}
			}
		});
	}
};
