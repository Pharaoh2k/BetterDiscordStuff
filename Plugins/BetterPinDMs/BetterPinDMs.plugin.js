/**
 * @name BetterPinDMs
 * @author Pharaoh2k
 * @description Enhanced DM pinning with category headers, drag & drop, unread tracking, hotkeys, import/export (from similar plugins too), and smart categories. Pinned DMs are shown in a separate 📌 PINNED DMs section above "Direct Messages".
 * @version 2.0.0
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterPinDMs/BetterPinDMs.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterPinDMs/BetterPinDMs.plugin.js
 */
/* BdApi based, BDFDB-free feature-packed plugin. Inspired by mwittrien / Devilbro's "PinDMs" */
/*
Copyright © 2025-present Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
"use strict";
//#region Configuration
const CONFIG = {
	cssId: "betterpindms-style",
	defaultSettings: {
		pinIcon: true,
		guildListPinIcon: true,
		unreadAmount: true,
		channelAmount: true,
		sortChannelListByRecent: false,
		sortGuildListByRecent: false,
		enableFriends: false,
		enableBlocked: false,
		enableBots: false,
		enableGroups: false,
		enableActiveToday: false,
		enableMuted: false,
		confirmDragActions: true,
		collapsedCategories: {},
		autoUpdate: true,
		shortcutTogglePinEnabled: true,
		shortcutTogglePinKeys: ["Ctrl", "P"],
		shortcutQuickPickerEnabled: true,
		shortcutQuickPickerKeys: ["Ctrl", "Shift", "P"],
		shortcutJumpCategoryEnabled: true,
		shortcutJumpCategoryKeys: ["Ctrl"]
	},
	info: {
		name: "BetterPinDMs",
		github: "Pharaoh2k/BetterDiscordStuff"
	}
};
const CHANNEL_TYPES = {
	DM: 1,
	GROUP_DM: 3
};
const CATEGORY_KEYS = ["friends", "blocked", "bots", "groups", "muted", "activeToday"];
const CATEGORY_META = {
	friends: { name: "FRIENDS", color: "#43b581" },
	blocked: { name: "BLOCKED", color: "#f04747" },
	bots: { name: "Bots", color: "#7289da" },
	groups: { name: "GROUPS", color: "#faa61a" },
	activeToday: { name: "Active Today", color: "#1abc9c" },
	muted: { name: "Muted", color: "#95a5a6" }
};
const TIMEOUTS = {
	INITIAL_HEADER_INJECT: 1000,
	HEADER_RETRY: 500,
	DOM_SYNC_DEBOUNCE: 0,
	UPDATE_DEBOUNCE: 0,
	DM_LIST_RESYNC: 200,
	HEADER_HEALTH_INTERVAL: 1000
};
//#endregion Configuration
//#region BdApi destructuring & Utils helpers
const { React, ReactDOM, UI, DOM, Data, Patcher, Webpack, Logger, ContextMenu, Utils, Hooks } = BdApi;
const { className, debounce, findInTree } = Utils;
//#endregion BdApi destructuring
//#region Update Manager
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
//#endregion Update Manager
//#region Discord Store Service
class DiscordStoreService {
	constructor() {
		this.stores = {};
		this._initialized = false;
	}
	init() {
		if (!this._initialized) {
			const storeNames = [
				"ChannelStore",
				"UserStore",
				"RelationshipStore",
				"PrivateChannelSortStore",
				"ReadStateStore",
				"SelectedChannelStore",
				"UserSettingsProtoStore",
				"PrivateChannelReadStateStore",
				"UserGuildSettingsStore"
			];
			for (const name of storeNames) {
				this.stores[name] = Webpack.getStore(name);
				if (!this.stores[name]) {
					Logger?.warn?.("BetterPinDMs", `Store not found: ${name}`);
				}
			}
			this._initialized = true;
		}
		return true;
	}
	getChannel(id) {
		return this._getFromStore("ChannelStore", "getChannel", id);
	}
	getUser(id) {
		return this._getFromStore("UserStore", "getUser", id);
	}
	getCurrentUserId() {
		try {
			const store = this.stores.UserStore;
			if (store?.getCurrentUser) {
				const user = store.getCurrentUser();
				return user?.id ?? null;
			}
		} catch { }
		return null;
	}
	isFriend(userId) {
		return this._getFromStore("RelationshipStore", "isFriend", userId);
	}
	isBlocked(userId) {
		return this._getFromStore("RelationshipStore", "isBlocked", userId);
	}
	getSelectedChannelId() {
		return this._getFromStore("SelectedChannelStore", "getChannelId");
	}
	getLastMessageId(channelId) {
		const store = this.stores.ReadStateStore;
		if (!store) return null;
		if (typeof store.lastMessageId === "function") return store.lastMessageId(channelId);
		if (typeof store.getLastMessageId === "function") return store.getLastMessageId(channelId);
		return null;
	}
	getMentionCount(channelId) {
		return this._getFromStore("ReadStateStore", "getMentionCount", channelId) || 0;
	}
	getPrivateChannelIds() {
		return this._getFromStore("PrivateChannelSortStore", "getPrivateChannelIds") || [];
	}
	getUnreadPrivateChannelIds() {
		return this._getFromStore("PrivateChannelReadStateStore", "getUnreadPrivateChannelIds") || [];
	}
	isChannelMuted(channelId) {
		try {
			if (!channelId) return false;
			const guildSettings = this.stores.UserGuildSettingsStore;
			const channelStore = this.stores.ChannelStore;
			if (!guildSettings || !channelStore) return false;
			const channel = channelStore.getChannel(channelId);
			const guildId = channel?.guild_id ?? null;
			const fn = guildSettings.isChannelMuted;
			if (typeof fn !== "function") return false;
			if (fn.length >= 2) {
				return !!fn.call(guildSettings, guildId, channelId);
			} else {
				return !!fn.call(guildSettings, channelId);
			}
		} catch {
			return false;
		}
	}
	emitPrivateChannelSortChange() {
		const store = this.stores.PrivateChannelSortStore;
		if (store?.emitChange) {
			store.emitChange();
		}
	}
	emitPrivateChannelReadStateChange() {
		const store = this.stores.PrivateChannelReadStateStore;
		if (store?.emitChange) {
			store.emitChange();
		}
	}
	getRawStore(name) {
		return this.stores[name];
	}
	_getFromStore(storeName, methodName, ...args) {
		try {
			const store = this.stores[storeName];
			if (!store || typeof store[methodName] !== "function") {
				return null;
			}
			return store[methodName](...args);
		} catch (err) {
			Logger?.warn?.("BetterPinDMs", `Store call failed: ${storeName}.${methodName}`, err);
			return null;
		}
	}
}
//#endregion Discord Store Service
//#region UI Manager
class UIManager {
	constructor(plugin) {
		this.plugin = plugin;
		this.headerRoots = new Map();
		this._noopStore = new Utils.Store();
		this.SettingsPanelComponent = this._SettingsPanelComponent.bind(this);
		this.CategoryHeaderComponent = this._CategoryHeaderComponent.bind(this);
		this.CustomCategoriesSection = this._CustomCategoriesSection.bind(this);
		this.ActionsSection = this._ActionsSection.bind(this);
		this.ColorInput = BdApi.ColorInput || BdApi.Components?.ColorInput || null;
	}
	renderSettingsPanel() {
		const panel = document.createElement("div");
		const root = ReactDOM.createRoot(panel);
		panel._betterpindmsRoot = root;
		root.render(React.createElement(this.SettingsPanelComponent));
		return panel;
	}
	_SettingsPanelComponent() {
		const pluginName = this.plugin.pluginName;
		const settings =
			(Hooks?.useData ? Hooks.useData(pluginName, "settings") : null) ??
			this.plugin.settings;
		const settingsSchema = [
			{
				type: "category",
				id: "general",
				name: "General",
				collapsible: true,
				shown: true,
				settings: [
					{ type: "switch", id: "pinIcon", name: "Show pin icons on pins categories", value: settings.pinIcon },
					{ type: "switch", id: "guildListPinIcon", name: "Show pin icons on server list DMs", value: settings.guildListPinIcon },
					{ type: "switch", id: "unreadAmount", name: "Show unread count per category", value: settings.unreadAmount },
					{ type: "switch", id: "channelAmount", name: "Show DM count per category", value: settings.channelAmount },
					{ type: "switch", id: "confirmDragActions", name: "Ask confirmation for drag & drop changes", value: settings.confirmDragActions }
				]
			},
			{
				type: "category",
				id: "sorting",
				name: "Sort by Recent Message",
				collapsible: true,
				shown: false,
				settings: [
					{ type: "switch", id: "sortChannelListByRecent", name: "DM list", value: settings.sortChannelListByRecent },
					{ type: "switch", id: "sortGuildListByRecent", name: "Server-list Recents", value: settings.sortGuildListByRecent }
				]
			},
			{
				type: "category",
				id: "shortcuts",
				name: "Keyboard Shortcuts",
				collapsible: true,
				shown: false,
				settings: [
					{ type: "switch", id: "shortcutTogglePinEnabled", name: "Toggle pin / unpin current DM", value: settings.shortcutTogglePinEnabled },
					{
						type: "keybind",
						id: "shortcutTogglePinKeys",
						name: "Shortcut",
						note: "Click and press the combo (e.g. Ctrl+P). Clear to leave unassigned.",
						value: settings.shortcutTogglePinKeys,
						clearable: true
					},
					{ type: "switch", id: "shortcutQuickPickerEnabled", name: "Open quick category picker", value: settings.shortcutQuickPickerEnabled },
					{
						type: "keybind",
						id: "shortcutQuickPickerKeys",
						name: "Shortcut",
						note: "Click and press the combo (e.g. Ctrl+Shift+P). Clear to leave unassigned.",
						value: settings.shortcutQuickPickerKeys,
						clearable: true
					},
					{ type: "switch", id: "shortcutJumpCategoryEnabled", name: "Jump to category 1–9", value: settings.shortcutJumpCategoryEnabled },
					{
						type: "keybind",
						id: "shortcutJumpCategoryKeys",
						name: "Prefix keys",
						note: "These modifiers will be combined with number keys 1–9 (e.g. Ctrl → Ctrl+1, Ctrl+2, …).",
						value: settings.shortcutJumpCategoryKeys,
						clearable: true
					}
				]
			},
			{
				type: "category",
				id: "predefined",
				name: "Predefined Categories",
				collapsible: true,
				shown: false,
				settings: CATEGORY_KEYS.slice(0, 4).map(key => ({
					type: "switch",
					id: `enable${key.charAt(0).toUpperCase() + key.slice(1)}`,
					name: CATEGORY_META[key].name,
					value: settings[`enable${key.charAt(0).toUpperCase() + key.slice(1)}`]
				}))
			},
			{
				type: "category",
				id: "smart",
				name: "Smart Categories",
				collapsible: true,
				shown: false,
				settings: CATEGORY_KEYS.slice(4).map(key => ({
					type: "switch",
					id: `enable${key.charAt(0).toUpperCase() + key.slice(1)}`,
					name: CATEGORY_META[key].name,
					value: settings[`enable${key.charAt(0).toUpperCase() + key.slice(1)}`]
				}))
			},
			{
				type: "category",
				id: "updates",
				name: "Updates",
				collapsible: true,
				shown: false,
				settings: [
					{
						type: "switch",
						id: "autoUpdate",
						name: "Automatic Updates",
						note: "Check for updates every 24 hours and on Discord startup",
						value: settings.autoUpdate ?? true
					},
					{ type: "button", id: "checkUpdate", name: "Check for Updates", note: "Manually check for plugin updates", children: "Check Now", onClick: () => this.plugin.updateManager?.check() },
					{ type: "button", id: "viewChangelog", name: "View Changelog", note: "View all version changes", children: "View Changelog", onClick: () => this.plugin.updateManager?.showFullChangelog() }
				]
			}
		];
		return React.createElement("div", {}, [
			UI.buildSettingsPanel({
				settings: settingsSchema,
				onChange: (_category, id, value) => this.plugin.updateSetting(id, value)
			}),
			React.createElement(this.CustomCategoriesSection, { key: "custom" }),
			React.createElement(this.ActionsSection, { key: "actions" })
		]);
	}
	_CustomCategoriesSection() {
		const pluginName = this.plugin.pluginName;
		const categoriesData =
			(Hooks?.useData ? Hooks.useData(pluginName, "categories") : null) ??
			this.plugin.categories;
		const categories = Object.values(categoriesData?.custom ?? {}).sort((a, b) => (a.pos || 0) - (b.pos || 0));
		return React.createElement(
			"div",
			{ className: "betterpindms-customcategories" },
			[
				React.createElement("div", { key: "header", className: "betterpindms-customcategories-header" }, "Custom Categories"),
				React.createElement("div", { key: "hint", className: "betterpindms-customcategories-hint" }, "Use arrows to reorder. Click ✕ to delete."),
				...categories.map((cat, i) => this._createCategoryRow(cat, i, categories.length)),
				React.createElement(
					"button",
					{
						key: "add",
						onClick: () => this.plugin.createCategory({ name: `Pinned DMs #${categories.length + 1}`, color: "#5865F2" }),
						className: "betterpindms-customcategories-addbtn"
					},
					"Add Category"
				)
			]
		);
	}
	_createCategoryRow(cat, index, total) {
		return React.createElement(
			"div",
			{ key: cat.id, className: "betterpindms-category-row" },
			[
				React.createElement("input", {
					key: "color",
					type: "color",
					value: cat.color,
					onChange: (e) => this.plugin.updateCategory(cat.id, { color: e.target.value }),
					className: "betterpindms-category-color-input"
				}),
				React.createElement("input", {
					key: "name",
					type: "text",
					value: cat.name,
					onChange: (e) => this.plugin.updateCategory(cat.id, { name: e.target.value }),
					className: "betterpindms-category-name-input"
				}),
				React.createElement(
					"button",
					{
						key: "up",
						onClick: () => this.plugin.moveCategory(cat.id, "up"),
						disabled: index === 0,
						className: "betterpindms-category-movebtn betterpindms-category-movebtn-up"
					},
					"↑"
				),
				React.createElement(
					"button",
					{
						key: "down",
						onClick: () => this.plugin.moveCategory(cat.id, "down"),
						disabled: index === total - 1,
						className: "betterpindms-category-movebtn betterpindms-category-movebtn-down"
					},
					"↓"
				),
				React.createElement(
					"button",
					{
						key: "delete",
						onClick: () => {
							UI.showConfirmationModal("Delete Category", `Delete "${cat.name}"?`, {
								confirmText: "Delete",
								danger: true,
								onConfirm: () => this.plugin.deleteCategory(cat.id)
							});
						},
						className: "betterpindms-category-deletebtn"
					},
					"✕"
				)
			]
		);
	}
	_ActionsSection() {
		return React.createElement(
			"div",
			{ className: "betterpindms-actions" },
			[
				React.createElement("div", { key: "header", className: "betterpindms-actions-header" }, "Backup & Actions"),
				React.createElement("button", { key: "export", onClick: () => this.plugin.exportConfig(), className: "betterpindms-actions-button" }, "Export Configuration"),
				React.createElement("button", { key: "import", onClick: () => this.plugin.importConfig(), className: "betterpindms-actions-button" }, "Import Configuration"),
				React.createElement(
					"button",
					{
						key: "unpin",
						onClick: () => {
							UI.showConfirmationModal("Unpin all DMs", "Remove all custom categories and server-list pins?", {
								confirmText: "Unpin All",
								danger: true,
								onConfirm: () => {
									this.plugin.categories = { custom: Object.create(null) };
									this.plugin.saveCategories();
									this.plugin.pins = { channelList: [], guildList: [] };
									this.plugin.savePins();
									this.plugin.forceUpdate({ immediate: true, dmList: true });
									UI.showToast("All pins removed", { type: "success" });
								}
							});
						},
						className: "betterpindms-actions-button betterpindms-actions-button-danger"
					},
					"Unpin All"
				),
				React.createElement(
					"div",
					{ key: "shortcuts", className: "betterpindms-shortcuts" },
					[
						React.createElement("div", { key: "shortcuts-header", className: "betterpindms-shortcuts-header" }, "Keyboard Shortcuts"),
						React.createElement(
							"div",
							{ key: "shortcuts-list", className: "betterpindms-shortcuts-list" },
							[
								React.createElement("div", { key: "s1" }, [
									React.createElement("kbd", { className: "betterpindms-shortcuts-kbd" }, "Ctrl+P"),
									" Pin/unpin current DM (default, configurable in settings)"
								]),
								React.createElement("div", { key: "s2" }, [
									React.createElement("kbd", { className: "betterpindms-shortcuts-kbd" }, "Ctrl+Shift+P"),
									" Quick category picker (default, configurable in settings)"
								]),
								React.createElement("div", { key: "s3" }, [
									React.createElement("kbd", { className: "betterpindms-shortcuts-kbd" }, "Ctrl+1-9"),
									" Jump to category (prefix configurable in settings)"
								])
							]
						)
					]
				)
			]
		);
	}
	renderCategoryHeader(container, category, callbacks = {}) {
		let root = this.headerRoots.get(container);
		if (!root) {
			root = ReactDOM.createRoot(container);
			this.headerRoots.set(container, root);
		}
		root.render(
			React.createElement(
				this.CategoryHeaderComponent,
				{ category, callbacks }
			)
		);
		return root;
	}
	removeHeader(container) {
		const root = this.headerRoots.get(container);
		if (root) {
			try {
				root.unmount();
			} catch (err) {
				Logger?.warn?.("BetterPinDMs", "Failed to unmount header:", err);
			}
			this.headerRoots.delete(container);
		}
		container.remove();
	}
	renderVirtualReactHeader(category) {
		const callbacks = {
			onToggleCollapse: (id) => this.plugin.toggleCategoryCollapse(id),
			onContextMenu: (e, cat) => this.plugin._showCategoryContextMenu ? this.plugin._showCategoryContextMenu(e, cat) : null
		};
		return React.createElement(this.CategoryHeaderComponent, { category, callbacks });
	}
	_CategoryHeaderComponent({ category, callbacks }) {
		const readStore = this.plugin.storeService?.getRawStore?.("PrivateChannelReadStateStore");
		const stores = readStore ? [readStore] : [this._noopStore];
		const unreadIds = Hooks?.useStateFromStores
			? Hooks.useStateFromStores(stores, () => (
				this.plugin._originalUnreadIds?.() ??
				this.plugin.storeService.getUnreadPrivateChannelIds?.() ??
				[]
			))
			: (this.plugin._originalUnreadIds?.() ?? this.plugin.storeService.getUnreadPrivateChannelIds?.() ?? []);
		const unreadSet = React.useMemo(() => new Set(Array.isArray(unreadIds) ? unreadIds : []), [unreadIds]);
		const unreadCount = this._getUnreadCount(category.dms, unreadSet);
		const showUnread = this.plugin.settings.unreadAmount && unreadCount > 0;
		const showCount = this.plugin.settings.channelAmount;
		const onClick = (e) => {
			e?.preventDefault();
			e?.stopPropagation();
			callbacks.onToggleCollapse?.(category.id);
		};
		const onContextMenu = (e) => {
			e.preventDefault();
			e.stopPropagation();
			callbacks.onContextMenu?.(e, category);
		};
		const headerClasses = className(
			"betterpindms-category-header-inner",
			"betterpindms-category-header-inner-static"
		);
		const arrowIconClass = className(
			"betterpindms-category-arrow-icon",
			category.collapsed ? "betterpindms-category-arrow-collapsed" : "betterpindms-category-arrow-expanded"
		);
		return React.createElement(
			"div",
			{ className: headerClasses, onClick, onContextMenu },
			[
				...(this.plugin.settings.pinIcon && !category.predefined ? [
					React.createElement("span", { key: "pin", className: "betterpindms-category-pin" }, "📌")
				] : []),
				React.createElement(
					"span",
					{ key: "name", className: "betterpindms-category-name", style: { color: category.color || "var(--mobile-text-heading-primary)" } },
					category.name
				),
				...(showUnread ? [
					React.createElement("span", { key: "unread", className: "betterpindms-category-unread" }, String(unreadCount))
				] : []),
				...(showCount ? [
					React.createElement("span", { key: "count", className: "betterpindms-category-count" }, String(category.dms.length))
				] : []),
				React.createElement(
					"div",
					{ key: "arrow", className: "betterpindms-category-arrow" },
					React.createElement(
						"svg",
						{ width: 16, height: 16, viewBox: "4 4 16 16", className: arrowIconClass },
						React.createElement("path", {
							fill: "currentColor",
							fillRule: "evenodd",
							clipRule: "evenodd",
							d: "M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
						})
					)
				)
			]
		);
	}
	_getUnreadCount(dms, unreadSet) {
		if (!Array.isArray(dms) || !unreadSet) return 0;
		let count = 0;
		for (const id of dms) if (unreadSet.has(id)) count++;
		return count;
	}
	removeAllCategoryHeaders() {
		for (const root of this.headerRoots.values()) {
			try {
				root.unmount();
			} catch (err) {
				Logger?.warn?.("BetterPinDMs", "Failed to unmount header:", err);
			}
		}
		this.headerRoots.clear();
		const headers = document.querySelectorAll(".betterpindms-category-header");
		for (const el of headers) {
			el.remove();
		}
	}
	showCategoryCreateModal(defaultName, callback) {
		let newName = defaultName || "";
		let newColor = "#5865F2";
		const EditorComponent = () => {
			const [name, setName] = React.useState(defaultName || "");
			const [color, setColor] = React.useState("#5865F2");
			return React.createElement(
				"div",
				{ className: "betterpindms-modal-editor" },
				[
					this._createModalInputSection("Category Name", name, setName, (val) => { newName = val; }),
					this._createModalColorSection(color, setColor, (val) => { newColor = val; })
				]
			);
		};
		UI.showConfirmationModal(
			"Create Category",
			React.createElement(EditorComponent),
			{
				confirmText: "Create",
				cancelText: "Cancel",
				onConfirm: () => {
					if (newName) callback(newName, newColor);
				}
			}
		);
	}
	showCategoryEditModal(category, callback) {
		let newName = category.name;
		let newColor = category.color || "#5865F2";
		const EditorComponent = () => {
			const [name, setName] = React.useState(category.name);
			const [color, setColor] = React.useState(category.color || "#5865F2");
			return React.createElement(
				"div",
				{ className: "betterpindms-modal-editor" },
				[
					this._createModalInputSection("Category Name", name, setName, (val) => { newName = val; }),
					this._createModalColorSection(color, setColor, (val) => { newColor = val; })
				]
			);
		};
		UI.showConfirmationModal(
			"Edit Category",
			React.createElement(EditorComponent),
			{
				confirmText: "Save",
				cancelText: "Cancel",
				onConfirm: () => {
					if (newName) callback(newName, newColor);
				}
			}
		);
	}
	showQuickCategoryPicker(categories, callback) {
		if (!categories.length) return;
		const names = categories.map((c, i) => `${i + 1}. ${c.name}`).join("\n");
		let selection = "";
		const PickerComponent = () => {
			const [val, setVal] = React.useState("");
			return React.createElement("div", {}, [
				React.createElement("div", { className: "betterpindms-quickpicker-label" }, "Select category by number:"),
				React.createElement("div", { className: "betterpindms-quickpicker-list" }, names),
				React.createElement("input", {
					type: "number",
					min: 1,
					max: categories.length,
					value: val,
					onChange: (e) => {
						setVal(e.target.value);
						selection = e.target.value;
					},
					className: "betterpindms-input-modal-field",
					autoFocus: true
				})
			]);
		};
		UI.showConfirmationModal(
			"Quick Category Picker",
			React.createElement(PickerComponent),
			{
				confirmText: "Go",
				cancelText: "Cancel",
				onConfirm: () => {
					const index = Number.parseInt(selection, 10) - 1;
					if (index >= 0 && index < categories.length) {
						callback(categories[index]);
					}
				}
			}
		);
	}
	_createModalInputSection(label, value, setValue, onChange) {
		return React.createElement(
			"div",
			{ key: "name-section", className: "betterpindms-modal-section" },
			[
				React.createElement(
					"label",
					{
						key: "name-label",
						className: "betterpindms-modal-label"
					},
					label
				),
				React.createElement("input", {
					key: "name-input",
					type: "text",
					value: value,
					placeholder: "My Category",
					onChange: (e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					},
					autoFocus: true,
					className: "betterpindms-modal-input"
				})
			]
		);
	}
	_createModalColorSection(color, setColor, onChange) {
		const ColorInput = this.ColorInput;
		const handleChange = (newValue) => {
			let hex;
			if (typeof newValue === "number") {
				hex = "#" + newValue.toString(16).padStart(6, "0");
			} else if (typeof newValue === "string") {
				hex = newValue.startsWith("#") ? newValue : `#${newValue}`;
			} else {
				return;
			}
			setColor(hex);
			onChange(hex);
		};
		if (!ColorInput) {
			return React.createElement(
				"div",
				{ key: "color-section", className: "betterpindms-modal-section" },
				[
					React.createElement(
						"label",
						{
							key: "color-label",
							className: "betterpindms-modal-label"
						},
						"Category Color"
					),
					React.createElement("input", {
						key: "color-custom",
						type: "color",
						value: color,
						onChange: (e) => handleChange(e.target.value),
						className: "betterpindms-modal-color-picker"
					})
				]
			);
		}
		return React.createElement(
			"div",
			{ key: "color-section", className: "betterpindms-modal-section" },
			[
				React.createElement(
					"label",
					{
						key: "color-label",
						className: "betterpindms-modal-label"
					},
					"Category Color"
				),
				React.createElement(ColorInput, {
					key: "color-input",
					value: typeof color === "string"
						? Number.parseInt(color.replace("#", "") || "5865F2", 16)
						: color,
					disabled: false,
					onChange: handleChange
				})
			]
		);
	}
}
//#endregion UI Manager
//#region Shortcut Manager
class ShortcutManager {
	constructor(plugin) {
		this.plugin = plugin;
		this.keyboardHandler = null;
		this._running = false;
	}
	start() {
		if (this._running) return;
		this._running = true;
		this.keyboardHandler = this._handleKeyboardShortcut.bind(this);
		document.addEventListener("keydown", this.keyboardHandler);
	}
	stop() {
		if (!this._running) return;
		this._running = false;
		if (this.keyboardHandler) {
			document.removeEventListener("keydown", this.keyboardHandler);
			this.keyboardHandler = null;
		}
	}
	_handleKeyboardShortcut(e) {
		if (!this._running) return;
		if (e.repeat) return;
		const target = e.target;
		if (target instanceof HTMLElement && (
			target.tagName === "INPUT" ||
			target.tagName === "TEXTAREA" ||
			target.isContentEditable ||
			target.getAttribute("role") === "textbox"
		)) {
			return;
		}
		const plugin = this.plugin;
		if (!plugin || typeof plugin._getShortcutConfig !== "function") return;
		const shortcuts = plugin._getShortcutConfig();
		const parseBinding = (binding) => {
			if (!binding || !Array.isArray(binding.keys) || !binding.keys.length) return null;
			const mods = { ctrl: false, shift: false, alt: false, meta: false };
			let mainKey = null;
			for (const raw of binding.keys) {
				const lower = String(raw).toLowerCase();
				if (lower === "ctrl" || lower === "control") mods.ctrl = true;
				else if (lower === "shift") mods.shift = true;
				else if (lower === "alt" || lower === "option") mods.alt = true;
				else if (lower === "meta" || lower === "cmd" || lower === "command" || lower === "win") mods.meta = true;
				else mainKey = lower;
			}
			return { mods, mainKey };
		};
		const modifiersMatch = (mods, evt) => (
			!!mods.ctrl === !!evt.ctrlKey &&
			!!mods.shift === !!evt.shiftKey &&
			!!mods.alt === !!evt.altKey &&
			!!mods.meta === !!evt.metaKey
		);
		const handleSimpleShortcut = (binding, callback) => {
			if (!binding?.enabled) return false;
			const parsed = parseBinding(binding);
			if (!parsed) return false;
			if (!parsed.mainKey) return false;
			if (!modifiersMatch(parsed.mods, e)) return false;
			const key = String(e.key || "").toLowerCase();
			if (key !== parsed.mainKey) return false;
			e.preventDefault();
			callback();
			return true;
		};
		if (handleSimpleShortcut(shortcuts.togglePin, () => plugin.toggleCurrentDmPin())) {
			return;
		}
		if (handleSimpleShortcut(shortcuts.quickPicker, () => plugin.showQuickCategoryPicker())) {
			return;
		}
		const jump = shortcuts.jumpCategory;
		if (jump?.enabled) {
			const parsed = parseBinding(jump);
			if (parsed && modifiersMatch(parsed.mods, e)) {
				const key = String(e.key || "");
				if (key >= "1" && key <= "9") {
					e.preventDefault();
					const index = Number.parseInt(key, 10) - 1;
					plugin.jumpToCategory(index);
				}
			}
		}
	}
}
//#endregion Shortcut Manager
//#region Main Plugin
module.exports = class BetterPinDMs {
	constructor(meta) {
		this.meta = meta;
		this.pluginName = meta?.name ?? "BetterPinDMs";
		this.settings = {};
		this.categories = { custom: {} };
		this.pins = { channelList: [], guildList: [] };
		this.storeService = null;
		this.uiManager = null;
		this.shortcutManager = null;
		this.patches = [];
		this._dmListPatched = false;
		this._innerClassPatched = false;
		this._dmListFallbackPatched = false;
		this._guildDmPatched = false;
		this._settingsRoot = null;
		this._updatePending = null;
		this._dmListForceUpdate = null;
		this._originalGetPrivateChannelIds = null;
		this._flushUpdatesDebounced = debounce(() => {
			this._flushPendingUpdates();
		}, TIMEOUTS.UPDATE_DEBOUNCE);
		this.updateManager = new UpdateManager(
			this.pluginName,
			this.meta?.version ?? "1.0.0",
			CONFIG.info.github
		);
		this._running = false;
		this._timeouts = new Set();
		this._dmListPatched = false;
		this._dmListFallbackPatched = false;
		this._dragEl = null;
		this._onDragEnd = this._handleDragEnd.bind(this);
		this._dmListPatchState = {
			baseRenderRow: null,
			baseRenderSection: null,
			originalSec0Count: 0,
			pinnedRows: [],
			unpinnedList: [],
			indexOfId: new Map(),
			lastOriginalIds: null
		};
		this._stableRenderRow = (args) => {
			const st = this._dmListPatchState;
			const originalRenderRow = st.baseRenderRow;
			if (typeof originalRenderRow !== "function") return null;
			const { section, row } = args || {};
			if (section === 0) {
				if (row < st.originalSec0Count) return originalRenderRow(args);
				const pinnedIndex = row - st.originalSec0Count;
				if (pinnedIndex < 0 || pinnedIndex >= st.pinnedRows.length) return null;
				const desc = st.pinnedRows[pinnedIndex];
				if (desc.type === "category") return this._renderCategoryHeaderRow(desc.category, args);
				if (desc.type === "dm") {
					const originalIndex = st.indexOfId.get(desc.dmId);
					if (originalIndex === undefined) return null;
					const rowElement = originalRenderRow({ ...args, section: 1, row: originalIndex });
					return this._wrapDmRow(rowElement, desc.dmId, args);
				}
				return null;
			}
			if (section === 1) {
				if (row < 0 || row >= st.unpinnedList.length) return null;
				const id = st.unpinnedList[row];
				const originalIndex = st.indexOfId.get(id);
				if (originalIndex === undefined) return null;
				const rowElement = originalRenderRow({ ...args, row: originalIndex });
				return this._wrapDmRow(rowElement, id, args);
			}
			return originalRenderRow(args);
		};
		this._stableRenderSection = (args) => {
			const st = this._dmListPatchState;
			const originalRenderSection = st.baseRenderSection;
			if (typeof originalRenderSection !== "function") return null;
			const sectionElement = originalRenderSection(args);
			if (args?.section === 1 && BdApi.React.isValidElement(sectionElement)) {
				return BdApi.React.cloneElement(sectionElement, {
					onDragOver: this._composeHandler(sectionElement.props?.onDragOver, (e) => this._handleDragOver(e, "header-unpin", "unpin")),
					onDrop: this._composeHandler(sectionElement.props?.onDrop, (e) => this._handleDrop(e, "header-unpin", "unpinned-target")),
					onDragLeave: this._composeHandler(sectionElement.props?.onDragLeave, (e) => this._handleDragLeave(e))
				});
			}
			return sectionElement;
		};
	}
	//#region Metadata
	getName() { return this.meta.name; }
	getAuthor() { return this.meta.author; }
	getVersion() { return this.meta.version; }
	getDescription() { return this.meta.description; }
	//#endregion Metadata
	//#region Lifecycle
	start() {
		try {
			this._dmListPatched = false;
			this._innerClassPatched = false;
			this._dmListFallbackPatched = false;
			this._guildDmPatched = false;
			if (!Webpack?.getModule || !Patcher) {
				UI.showToast(`${this.meta.name}: BdApi outdated`, { type: "error" });
				return;
			}
			this._running = true;
			Logger.info(this.pluginName, `Starting v${this.meta.version} (React Injection Mode)`);
			this.loadSettings();
			this.loadCategories();
			this.loadPins();
			this.storeService = new DiscordStoreService();
			this.storeService.init();
			this.uiManager = new UIManager(this);
			this.shortcutManager = new ShortcutManager(this);
			this._injectStyles();
			this._patchStores();
			this._patchContextMenus();
			document.addEventListener("dragend", this._onDragEnd, true);
			this._patchPrivateChannelsList();
			this._guildDmPatched = false;
			this._patchGuildDmComponent();
			this.storeService?.emitPrivateChannelReadStateChange?.();
			this.storeService?.emitPrivateChannelSortChange?.();
			this.shortcutManager.start();
			this.updateManager.start(this.settings.autoUpdate ?? true);
			this.forceUpdate({ immediate: true });
		} catch (err) {
			Logger.error(this.pluginName, "Failed to start", err);
			UI.showToast(`${this.pluginName}: Failed to start`, { type: "error" });
		}
	}
	stop() {
		try {
			Logger.info(this.pluginName, "Stopping");
			this._running = false;
			document.removeEventListener("dragend", this._onDragEnd, true);
			this._handleDragEnd();
			if (this.shortcutManager) this.shortcutManager.stop();
			if (this.uiManager) this.uiManager?.removeAllCategoryHeaders?.();
			if (this._settingsRoot) {
				try { this._settingsRoot.unmount(); } catch { }
				this._settingsRoot = null;
			}
			for (const unpatch of this.patches) {
				try { unpatch(); } catch (err) { Logger.warn(this.pluginName, "Failed to unpatch", err); }
			}
			this.patches = [];
			this._originalUnreadIds = null;
			this.storeService?.emitPrivateChannelReadStateChange?.();
			this.storeService?.emitPrivateChannelSortChange?.();
			DOM.removeStyle(CONFIG.cssId);
			this.updateManager.stop();
			if (this._dmListForceUpdate) this._dmListForceUpdate();
		} catch (err) {
			Logger.error(this.pluginName, "Error during stop", err);
		}
	}
	//#endregion Lifecycle
	//#region Patching - The React Fix
	_patchPrivateChannelsList() {
		if (this._dmListPatched && this._innerClassPatched) return;
		const hasPrivateIdsProp = (node) => {
			const ids = node?.props?.privateChannelIds;
			return ids != null && (Array.isArray(ids) || typeof ids[Symbol.iterator] === 'function');
		};
		const filters = [
			() => Webpack.getByStrings("private-channels-", "getMutablePrivateChannels", { defaultExport: false }),
			() => Webpack.getByStrings("private-channels-", "getPrivateChannelIds", { defaultExport: false }),
			() => Webpack.getByStrings("private-channels-", "privateChannelIds", { defaultExport: false }),
			() => Webpack.getByStrings("listScrollerRef", "showDMHeader", { defaultExport: false })
		];
		let PrivateChannelsModule = null;
		for (const filter of filters) {
			try {
				const m = filter();
				if (m) {
					PrivateChannelsModule = m;
					break;
				}
			} catch {}
		}
		if (PrivateChannelsModule) {
			let exportKey = null;
			if (PrivateChannelsModule.Z) exportKey = "Z";
			else if (PrivateChannelsModule.default) exportKey = "default";
			if (exportKey) {
				Logger.info(this.pluginName, "Found PrivateChannelsList module via Webpack! Patching wrapper...");
				const unpatchWrapper = Patcher.after(
					this.pluginName,
					PrivateChannelsModule,
					exportKey,
					(_, __, returnValue) => {
						try {
							if (!this._innerClassPatched) {
								const inner = Utils.findInTree(
									returnValue,
									n => n?.type?.prototype?.render && hasPrivateIdsProp(n),
									{ walkable: ["props", "children"] }
								);
								if (inner?.type) this._patchInnerListClass(inner.type);
							}
						} catch (err) {
							Logger.error(this.pluginName, "Error finding inner DM List Class", err);
						}
						return returnValue;
					}
				);
				this.patches.push(unpatchWrapper);
				this._dmListPatched = true;
			}
		}
		if (!this._innerClassPatched && BdApi.ReactUtils?.getInternalInstance) {
			const selectors = ["[data-list-id^='private-channels-uid']", "[class^='privateChannels'] [data-list-id]"];
			let domList = null;
			for (const s of selectors) {
				domList = document.querySelector(s);
				if (domList) break;
			}
			if (domList) {
				try {
					Logger.info(this.pluginName, "Attempting Fiber Hot-Patch...");
					const fiber = BdApi.ReactUtils.getInternalInstance(domList);
					const found = Utils.findInTree(
						fiber,
						n => n?.type?.prototype?.render && n?.memoizedProps?.privateChannelIds != null,
						{ walkable: ["return"] }
					);
					if (found?.type) {
						this._patchInnerListClass(found.type);
						if (found.stateNode?.forceUpdate) {
							this._dmListForceUpdate = () => found.stateNode.forceUpdate();
							found.stateNode.forceUpdate();
						}
						this._dmListPatched = true;
						Logger.info(this.pluginName, "Fiber Hot-Patch successful!");
					}
				} catch (err) {
					Logger.error(this.pluginName, "Fiber Hot-Patch failed", err);
				}
			}
		}
	}
	_patchInnerListClass(ListClass) {
		Logger.info(this.pluginName, "Found Inner List Class! Patching prototype...");
		const unpatch = Patcher.after(
			this.pluginName,
			ListClass.prototype,
			"render",
			(thisObject, _, returnValue) => {
				this._dmListForceUpdate = () => thisObject.forceUpdate();
				return this._modifyDmListRender(thisObject, returnValue);
			}
		);
		this.patches.push(unpatch);
		this._innerClassPatched = true;
		this.storeService.emitPrivateChannelSortChange();
	}
	_activateDmListFallback(reason) {
		if (this._dmListFallbackPatched || this._dmListPatched) return;
		Logger.warn(this.pluginName, `UI DM list patch failed; using fallback reorder only. Reason: ${reason}`);
		UI.showToast(
			"[BetterPinDMs] UI patch failed; using fallback (reorder only). Category headers/drag UI may be unavailable until Discord UI changes are handled.",
			{ type: "warning", timeout: 8000 }
		);
		if (this._patchPrivateChannelsListFallback()) {
			this._dmListFallbackPatched = true;
		}
	}
	_patchPrivateChannelsListFallback() {
		const sortStore = this.storeService.getRawStore("PrivateChannelSortStore");
		if (!sortStore?.getPrivateChannelIds) {
			Logger.error(this.pluginName, "Could not find PrivateChannelSortStore for fallback");
			return false;
		}
		this._originalGetPrivateChannelIds = sortStore.getPrivateChannelIds.bind(sortStore);
		const unpatch = Patcher.after(
			this.pluginName,
			sortStore,
			"getPrivateChannelIds",
			(_, _args, ret) => {
				try {
					if (this._dmListPatched) return ret;
					return this._reorderChannelIds(ret);
				} catch (err) {
					Logger.error(this.pluginName, "getPrivateChannelIds patch error", err);
					return ret;
				}
			}
		);
		this.patches.push(unpatch);
		this._dmListForceUpdate = () => this.storeService.emitPrivateChannelSortChange();
		Logger.info(this.pluginName, "Using fallback store patching method");
		return true;
	}
	_reorderChannelIds(originalIds) {
		if (!Array.isArray(originalIds)) return originalIds;
		const pinnedCategories = this._getPinnedCategoriesWithDms();
		const pinnedIds = new Set();
		const orderedPinned = [];
		for (const cat of pinnedCategories) {
			const validDms = cat.dms.filter(id => originalIds.includes(id));
			const sortedDms = this.settings.sortChannelListByRecent
				? this._sortDmsByTime(validDms)
				: validDms;
			for (const dmId of sortedDms) {
				if (!pinnedIds.has(dmId)) {
					orderedPinned.push(dmId);
					pinnedIds.add(dmId);
				}
			}
		}
		const unpinned = originalIds.filter(id => !pinnedIds.has(id));
		return [...orderedPinned, ...unpinned];
	}
	_modifyDmListRender(componentInstance, returnValue) {
		const originalProps = componentInstance.props;
		const originalIds = originalProps.privateChannelIds;
		if (!originalIds?.length) return returnValue;
		const { pinnedRows, pinnedSet, unpinnedList } = this._calculateSortedList(originalIds);
		if (!BdApi.React.isValidElement(returnValue) || typeof returnValue.props.children !== "function") {
			return returnValue;
		}
		const originalLevel1 = returnValue.props.children;
		return BdApi.React.cloneElement(returnValue, {
			children: (...args1) => {
				const level1Result = originalLevel1(...args1);
				if (!BdApi.React.isValidElement(level1Result) || typeof level1Result.props.children !== "function") {
					return level1Result;
				}
				const originalLevel2 = level1Result.props.children;
				return BdApi.React.cloneElement(level1Result, {
					children: (...args2) => {
						let finalResult = originalLevel2(...args2);
						if (BdApi.React.isValidElement(finalResult)) {
							finalResult = this._applyListPatch(finalResult, originalIds, pinnedRows, pinnedSet, unpinnedList);
						}
						return finalResult;
					}
				});
			}
		});
	}
	_applyListPatch(listElement, originalIds, pinnedRows, _pinnedSet, unpinnedList) {
		if (!BdApi.React.isValidElement(listElement)) return listElement;
		const props = listElement.props;
		if (!props?.sections || props.sections.length < 2) return listElement;
		if (typeof props.renderRow !== "function") return listElement;
		const originalSec0Count = props.sections[0];
		const pinnedRowCount = pinnedRows.length;
		const newSec0Count = originalSec0Count + pinnedRowCount;
		const newSec1Count = unpinnedList.length;
		const newSections = [...props.sections];
		newSections[0] = newSec0Count;
		newSections[1] = newSec1Count;
		const totalNewCount = newSec0Count + newSec1Count;
		const st = this._dmListPatchState;
		st.baseRenderRow = (props.renderRow === this._stableRenderRow) ? st.baseRenderRow : props.renderRow;
		st.baseRenderSection = (props.renderSection === this._stableRenderSection) ? st.baseRenderSection : props.renderSection;
		st.originalSec0Count = originalSec0Count;
		st.pinnedRows = pinnedRows;
		st.unpinnedList = unpinnedList;
		if (st.lastOriginalIds !== originalIds) {
			const indexOfId = new Map();
			for (let i = 0; i < originalIds.length; i++) indexOfId.set(originalIds[i], i);
			st.indexOfId = indexOfId;
			st.lastOriginalIds = originalIds;
		}
		return BdApi.React.cloneElement(listElement, {
			sections: newSections,
			numRows: props.numRows === undefined ? props.numRows : totalNewCount,
			rowCount: props.rowCount === undefined ? props.rowCount : totalNewCount,
			renderRow: this._stableRenderRow,
			renderSection: typeof props.renderSection === "function" ? this._stableRenderSection : props.renderSection
		});
	}
	_renderCategoryHeaderRow(category, rowArgs) {
		return BdApi.React.createElement(
			"div",
			{
				key: `header:${category.id}`,
				role: "listitem",
				style: rowArgs?.style,
				className: "betterpindms-virtual-header",
				draggable: true,
				onDragStart: (e) => this._handleDragStart(e, "category", category.id),
				onDragOver: (e) => this._handleDragOver(e, "category", category.id),
				onDrop: (e) => this._handleDrop(e, "category", category.id),
				onDragLeave: (e) => this._handleDragLeave(e)
			},
			this.uiManager.renderVirtualReactHeader(category)
		);
	}
	_wrapDmRow(rowElement, id, rowArgs) {
		if (!rowElement) return rowElement;
		const innerContent = React.isValidElement(rowElement)
			? React.cloneElement(rowElement, { style: undefined })
			: rowElement;
		return React.createElement("div", {
			key: `dm:${id}`,
			className: "betterpindms-draggable-wrapper",
			style: rowArgs?.style,
			draggable: true,
			onDragStart: (e) => this._handleDragStart(e, "dm", id),
			onDragOver: (e) => this._handleDragOver(e, "dm", id),
			onDrop: (e) => this._handleDrop(e, "dm", id),
			onDragLeave: (e) => this._handleDragLeave(e)
		}, innerContent);
	}
	_decorateRowElement(el, stableKey, styleFromArgs, extraProps) {
		if (React.isValidElement(el)) {
			const prev = el.props || {};
			const mergedClass = className(prev.className, "betterpindms-draggable-wrapper");
			const nextProps = {
				...extraProps,
				className: mergedClass,
				onDragStart: this._composeHandler(prev.onDragStart, extraProps.onDragStart),
				onDragOver: this._composeHandler(prev.onDragOver, extraProps.onDragOver),
				onDrop: this._composeHandler(prev.onDrop, extraProps.onDrop),
				onDragLeave: this._composeHandler(prev.onDragLeave, extraProps.onDragLeave)
			};
			if (styleFromArgs && !prev.style) nextProps.style = styleFromArgs;
			nextProps.key = stableKey;
			try {
				return React.cloneElement(el, nextProps);
			} catch {
			}
		}
		return BdApi.React.createElement(
			"div",
			{
				key: stableKey,
				style: styleFromArgs,
				className: "betterpindms-draggable-wrapper",
				...extraProps
			},
			el
		);
	}
	_composeHandler(existing, added) {
		if (typeof existing !== "function") return added;
		if (typeof added !== "function") return existing;
		return function composed(e) {
			try { existing(e); } catch { }
			return added(e);
		};
	}
	//#region Drag & Drop Logic
	_handleDragStart(e, type, id) {
		e.stopPropagation();
		this._dragInfo = { type, id };
		this._dragEl = e.currentTarget;
		e.dataTransfer.setData("text/plain", JSON.stringify({ type, id }));
		e.dataTransfer.effectAllowed = "move";
		if (this._dragEl?.style) this._dragEl.style.opacity = "0.5";
	}
	_cleanupDragVisuals() {
		if (this._dragEl?.style) this._dragEl.style.opacity = "";
		this._dragEl = null;
		const els = document.querySelectorAll(
			".betterpindms-drop-target-top, .betterpindms-drop-target-bottom, .betterpindms-drop-target-center"
		);
		for (const el of els) {
			el.classList.remove(
				"betterpindms-drop-target-top",
				"betterpindms-drop-target-bottom",
				"betterpindms-drop-target-center"
			);
		}
	}
	_handleDragOver(e, targetType, targetId) {
		if (!this._dragInfo) return;
		e.preventDefault();
		e.stopPropagation();
		const target = e.currentTarget;
		const rect = target.getBoundingClientRect();
		const offsetY = e.clientY - rect.top;
		const height = rect.height;
		target.classList.remove("betterpindms-drop-target-top", "betterpindms-drop-target-bottom", "betterpindms-drop-target-center");
		if (targetType === "category") {
			if (this._dragInfo.type === "dm") {
				target.classList.add("betterpindms-drop-target-center");
				e.dataTransfer.dropEffect = "copy";
			}
			else if (this._dragInfo.type === "category") {
				if (offsetY < height / 2) target.classList.add("betterpindms-drop-target-top");
				else target.classList.add("betterpindms-drop-target-bottom");
				e.dataTransfer.dropEffect = "move";
			}
		}
		else if (targetType === "dm") {
			if (this._dragInfo.type === "dm") {
				if (offsetY < height / 2) target.classList.add("betterpindms-drop-target-top");
				else target.classList.add("betterpindms-drop-target-bottom");
				e.dataTransfer.dropEffect = "move";
			}
		}
		else if (targetType === "header-unpin") {
			target.classList.add("betterpindms-drop-target-center");
		}
	}
	_handleDragLeave(e) {
		e.currentTarget.classList.remove("betterpindms-drop-target-top", "betterpindms-drop-target-bottom", "betterpindms-drop-target-center");
	}
	_handleDrop(e, targetType, targetId) {
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.classList.remove("betterpindms-drop-target-top", "betterpindms-drop-target-bottom", "betterpindms-drop-target-center");
		this._cleanupDragVisuals();
		if (!this._dragInfo) return;
		const { type: dragType, id: dragId } = this._dragInfo;
		this._dragInfo = null;
		const rect = e.currentTarget.getBoundingClientRect();
		const offsetY = e.clientY - rect.top;
		const isTop = offsetY < rect.height / 2;
		if (dragType === "category" && targetType === "category") {
			this._reorderCategories(dragId, targetId, isTop);
			return;
		}
		if (dragType === "dm" && targetType === "category") {
			this.addDmToCategory(dragId, targetId);
			BdApi.UI.showToast("DM Pinned", { type: "success" });
			return;
		}
		if (dragType === "dm" && targetType === "dm") {
			this._reorderDm(dragId, targetId, isTop);
			return;
		}
		if (dragType === "dm" && targetType === "header-unpin") {
			this._reorderDm(dragId, "unpinned-target", true);
		}
	}
	_handleDragEnd(_e) {
		this._dragInfo = null;
		this._cleanupDragVisuals();
	}
	//#endregion
	_reorderCategories(dragId, targetId, insertBefore) {
		if (dragId === targetId) return;
		const cats = this.getCustomCategoriesSorted();
		if (!cats.some(c => c.id === dragId) || !cats.some(c => c.id === targetId)) return;
		const newDragIdx = cats.findIndex(c => c.id === dragId);
		const item = cats.splice(newDragIdx, 1)[0];
		let newTargetIdx = cats.findIndex(c => c.id === targetId);
		if (!insertBefore) newTargetIdx++;
		cats.splice(newTargetIdx, 0, item);
		cats.forEach((c, i) => c.pos = i);
		this.saveCategories();
		this.forceUpdate({ dmList: true });
	}
	_reorderDm(dragId, targetId, insertBefore = true) {
		if (targetId === "unpinned-target") {
			const dragCat = this.getCategoryForDm(dragId);
			if (dragCat) {
				const doUnpin = () => {
					this.removeDmFromAnyCategory(dragId);
					BdApi.UI.showToast("DM Unpinned", { type: "success" });
				};
				if (this.settings.confirmDragActions) {
					BdApi.UI.showConfirmationModal("Unpin DM", "Unpin this DM?", { confirmText: "Unpin", danger: true, onConfirm: doUnpin });
				} else { doUnpin(); }
			}
			return;
		}
		if (dragId === targetId) return;
		const dragCat = this.getCategoryForDm(dragId);
		const targetCat = this.getCategoryForDm(targetId);
		if (dragCat && !targetCat) {
			const doUnpin = () => {
				this.removeDmFromAnyCategory(dragId);
				BdApi.UI.showToast("DM Unpinned", { type: "success" });
			};
			if (this.settings.confirmDragActions) {
				BdApi.UI.showConfirmationModal("Unpin DM", "Unpin this DM?", { confirmText: "Unpin", danger: true, onConfirm: doUnpin });
			} else { doUnpin(); }
			return;
		}
		if (!dragCat && targetCat) {
			this.addDmToCategory(dragId, targetCat.id);
			BdApi.UI.showToast("DM Pinned", { type: "success" });
			return;
		}
		if (dragCat && targetCat) {
			if (dragCat.id === targetCat.id) {
				const dms = targetCat.dms;
				const fromIdx = dms.indexOf(dragId);
				let toIdx = dms.indexOf(targetId);
				if (fromIdx !== -1 && toIdx !== -1) {
					dms.splice(fromIdx, 1);
					if (fromIdx < toIdx) toIdx--;
					if (!insertBefore) toIdx++;
					dms.splice(toIdx, 0, dragId);
					this.saveCategories();
					this.forceUpdate({ dmList: true });
				}
			}
			else {
				this.removeDmFromAnyCategory(dragId);
				let toIdx = targetCat.dms.indexOf(targetId);
				if (!insertBefore) toIdx++;
				targetCat.dms.splice(toIdx, 0, dragId);
				this.saveCategories();
				this.forceUpdate({ dmList: true });
			}
		}
	}
	//#endregion
	_calculateSortedList(originalIds) {
		const pinnedCategories = this._getPinnedCategoriesWithDms();
		const pinnedSet = new Set();
		for (const cat of pinnedCategories) for (const id of cat.dms) pinnedSet.add(id);
		const pinnedRows = [];
		for (const cat of pinnedCategories) {
			pinnedRows.push({ type: "category", category: cat });
			if (!cat.collapsed) {
				const validDms = cat.dms.filter(id => originalIds.includes(id));
				const sortedDms = this.settings.sortChannelListByRecent ? this._sortDmsByTime(validDms) : validDms;
				for (const dmId of sortedDms) pinnedRows.push({ type: "dm", dmId, categoryId: cat.id });
			}
		}
		const unpinnedList = [];
		for (const id of originalIds) if (!pinnedSet.has(id)) unpinnedList.push(id);
		return { pinnedRows, pinnedSet, unpinnedList };
	}
	_patchGuildDmComponent() {
		if (this._guildDmPatched) return;
		const want = ["treeItemProps", "statusIndicatorsEnabled", "isCurrentUserInThisDMCall"];
		const isGuildItem = (v) => {
			if (!v || typeof v !== "object") return false;
			if (!v.$$typeof || typeof v.render !== "function") return false;
			const src = Function.prototype.toString.call(v.render);
			return want.every((s) => src.includes(s));
		};
		const scanForGuildItem = (x, d = 0) => {
			if (!x || d > 2) return false;
			if (isGuildItem(x)) return true;
			if (typeof x === "object") return Object.values(x).some((v) => scanForGuildItem(v, d + 1));
			return false;
		};
		const pickGuildItem = (mod) => {
			if (!mod) return null;
			if (isGuildItem(mod)) return mod;
			if (isGuildItem(mod?.default)) return mod.default;
			if (typeof mod === "object") {
				for (const v of Object.values(mod)) {
					if (isGuildItem(v)) return v;
				}
			}
			return null;
		};
		const patch = (GuildItem) => {
			if (!this._running || this._guildDmPatched || !GuildItem) return;
			Logger.info(this.pluginName, "Found Guild DM item via Webpack (module-first). Patching...");
			const unpatch = Patcher.after(this.pluginName, GuildItem, "render", (_t, args, ret) => {
				try {
					if (ret) return this._processGuildDirectMessage({ props: args?.[0] }, ret);
				} catch (err) {
					Logger.error(this.pluginName, "Guild DM render error", err);
				}
				return ret;
			});
			this.patches.push(unpatch);
			this._guildDmPatched = true;
			this.storeService?.emitPrivateChannelReadStateChange?.();
			this.storeService?.emitPrivateChannelSortChange?.();
		};
		const filter = (m) => scanForGuildItem(m);
		const immediateMod = Webpack.getModule(filter, { searchExports: true });
		const immediate = pickGuildItem(immediateMod);
		if (immediate) {
			patch(immediate);
			return;
		}
		Webpack.waitForModule(filter, { searchExports: true })
			.then((mod) => patch(pickGuildItem(mod)))
			.catch((err) => {
				Logger.warn(this.pluginName, "Failed to locate Guild DM module via Webpack.waitForModule", err);
			});
	}
	_processGuildDirectMessage(instance, returnValue) {
		const props = instance?.props;
		const channel = props?.channel;
		if (!channel?.id) return returnValue;
		const isPinned = this.isPinnedInGuildList(channel.id);
		if (!isPinned) return returnValue;
		if (React.isValidElement(returnValue) && returnValue.props) {
			const originalTreeProps = returnValue.props.treeItemProps || {};
			const newTreeProps = {
				...originalTreeProps,
				className: className(originalTreeProps.className, "betterpindms-recent-pinned")
			};
			return React.cloneElement(returnValue, {
				treeItemProps: newTreeProps
			});
		}
		return returnValue;
	}
	//#endregion Patching
	//#region Data Management
	loadSettings() {
		const saved = Data.load(this.pluginName, "settings") || {};
		this.settings = this._migrateSettings(saved);
	}
	saveSettings() {
		Data.save(this.pluginName, "settings", this.settings);
	}
	updateSetting(key, value) {
		if (this.settings[key] === value) return;
		this.settings[key] = value;
		this.saveSettings();
		if (key === "autoUpdate") {
			if (value) this.updateManager.start(true);
			else this.updateManager.stop();
		}
		this.forceUpdate({ dmList: true });
	}
	_migrateSettings(saved) {
		const defaults = structuredClone(CONFIG.defaultSettings);
		if (saved.general || saved.recentOrder || saved.preCategories || saved.smartCategories) {
			const migrated = { ...defaults };
			if (saved.general) {
				migrated.pinIcon = saved.general.pinIcon ?? defaults.pinIcon;
				migrated.guildListPinIcon = saved.general.guildListPinIcon ?? defaults.guildListPinIcon;
				migrated.unreadAmount = saved.general.unreadAmount ?? defaults.unreadAmount;
				migrated.channelAmount = saved.general.channelAmount ?? defaults.channelAmount;
			}
			if (saved.recentOrder) {
				migrated.sortChannelListByRecent = saved.recentOrder.channelList ?? defaults.sortChannelListByRecent;
				migrated.sortGuildListByRecent = saved.recentOrder.guildList ?? defaults.sortGuildListByRecent;
			}
			if (saved.preCategories) {
				migrated.enableFriends = saved.preCategories.friends?.enabled ?? defaults.enableFriends;
				migrated.enableBlocked = saved.preCategories.blocked?.enabled ?? defaults.enableBlocked;
				migrated.enableBots = saved.preCategories.bots?.enabled ?? defaults.enableBots;
				migrated.enableGroups = saved.preCategories.groups?.enabled ?? defaults.enableGroups;
			}
			if (saved.smartCategories) {
				migrated.enableActiveToday = saved.smartCategories.activeToday?.enabled ?? defaults.enableActiveToday;
				migrated.enableMuted = saved.smartCategories.muted?.enabled ?? defaults.enableMuted;
			}
			if (saved.preCategories || saved.smartCategories) {
				migrated.collapsedCategories = {};
				for (const key of CATEGORY_KEYS) {
					const collapsed = saved.preCategories?.[key]?.collapsed || saved.smartCategories?.[key]?.collapsed;
					if (collapsed) migrated.collapsedCategories[key] = true;
				}
			}
			if (Object.hasOwn(saved, "autoUpdate")) {
				migrated.autoUpdate = saved.autoUpdate;
			}
			migrated.shortcutTogglePinEnabled = saved.shortcutTogglePinEnabled ?? defaults.shortcutTogglePinEnabled;
			migrated.shortcutTogglePinKeys = Array.isArray(saved.shortcutTogglePinKeys) ? saved.shortcutTogglePinKeys : defaults.shortcutTogglePinKeys;
			migrated.shortcutQuickPickerEnabled = saved.shortcutQuickPickerEnabled ?? defaults.shortcutQuickPickerEnabled;
			migrated.shortcutQuickPickerKeys = Array.isArray(saved.shortcutQuickPickerKeys) ? saved.shortcutQuickPickerKeys : defaults.shortcutQuickPickerKeys;
			migrated.shortcutJumpCategoryEnabled = saved.shortcutJumpCategoryEnabled ?? defaults.shortcutJumpCategoryEnabled;
			migrated.shortcutJumpCategoryKeys = Array.isArray(saved.shortcutJumpCategoryKeys) ? saved.shortcutJumpCategoryKeys : defaults.shortcutJumpCategoryKeys;
			return migrated;
		}
		const safeSaved = Object.create(null);
		if (saved && typeof saved === "object") {
			for (const [k, v] of Object.entries(saved)) {
				if (this._isUnsafeKey(k)) continue;
				safeSaved[k] = v;
			}
		}
		return { ...defaults, ...safeSaved };
	}
	loadCategories() {
		const saved = Data.load(this.pluginName, "categories") || {};
		const custom = Object.create(null);
		if (saved.custom && typeof saved.custom === "object") {
			for (const key of Object.keys(saved.custom)) {
				if (this._isUnsafeKey(key)) continue;
				const cat = saved.custom[key];
				if (!cat || typeof cat !== "object") continue;
				const id = (typeof cat.id === "string" && !this._isUnsafeKey(cat.id)) ? cat.id : key;
				custom[id] = {
					id,
					name: typeof cat.name === "string" ? cat.name : `Category ${id}`,
					color: typeof cat.color === "string" ? cat.color : "#5865F2",
					pos: typeof cat.pos === "number" ? cat.pos : 0,
					collapsed: !!cat.collapsed,
					dms: Array.isArray(cat.dms) ? cat.dms.filter(x => typeof x === "string") : []
				};
			}
		}
		this.categories = { custom };
	}
	saveCategories() {
		Data.save(this.pluginName, "categories", this.categories);
	}
	loadPins() {
		const saved = Data.load(this.pluginName, "pinned") || {};
		this.pins = {
			channelList: Array.isArray(saved.channelList) ? saved.channelList : [],
			guildList: Array.isArray(saved.guildList) ? saved.guildList : []
		};
	}
	savePins() {
		Data.save(this.pluginName, "pinned", this.pins);
	}
	//#endregion Data Management
	//#region Category Logic
	getCustomCategoriesSorted() {
		return Object.values(this.categories.custom || {}).sort((a, b) => (a.pos || 0) - (b.pos || 0));
	}
	generateCategoryId() {
		return Math.random().toString(36).slice(2, 10);
	}
	createCategory({ name, color }) {
		const id = this.generateCategoryId();
		const existing = this.getCustomCategoriesSorted();
		const pos = existing.length ? Math.max(...existing.map(c => c.pos || 0)) + 1 : 0;
		const category = { id, name, color, pos, collapsed: false, dms: [] };
		this.categories.custom[id] = category;
		this.saveCategories();
		this.forceUpdate({ dmList: true });
		return category;
	}
	deleteCategory(categoryId) {
		delete this.categories.custom[categoryId];
		this.saveCategories();
		this.forceUpdate({ dmList: true });
	}
	updateCategory(categoryId, updates) {
		const cat = this.categories.custom[categoryId];
		if (!cat) return;
		Object.assign(cat, updates);
		this.saveCategories();
		this.forceUpdate({ dmList: true });
	}
	moveCategory(categoryId, direction) {
		const list = this.getCustomCategoriesSorted();
		const index = list.findIndex(c => c.id === categoryId);
		if (index === -1) return;
		const swapIndex = index + (direction === "up" ? -1 : 1);
		if (swapIndex < 0 || swapIndex >= list.length) return;
		[list[index].pos, list[swapIndex].pos] = [list[swapIndex].pos, list[index].pos];
		this.saveCategories();
		this.forceUpdate({ dmList: true });
	}
	getCategoryForDm(dmId) {
		if (!dmId) return null;
		for (const id in this.categories.custom) {
			const cat = this.categories.custom[id];
			if (cat.dms.includes(dmId)) return cat;
		}
		return null;
	}
	addDmToCategory(dmId, categoryId) {
		const cat = this.categories.custom[categoryId];
		if (!cat) return;
		this.removeDmFromAnyCategory(dmId);
		cat.dms.unshift(dmId);
		this.saveCategories();
		this.forceUpdate({ dmList: true });
	}
	removeDmFromAnyCategory(dmId) {
		let changed = false;
		for (const id in this.categories.custom) {
			const cat = this.categories.custom[id];
			const idx = cat.dms.indexOf(dmId);
			if (idx !== -1) {
				cat.dms.splice(idx, 1);
				changed = true;
			}
		}
		if (changed) {
			this.saveCategories();
			this.forceUpdate({ dmList: true });
		}
	}
	toggleCategoryCollapse(categoryId) {
		if (CATEGORY_KEYS.includes(categoryId)) {
			if (!this.settings.collapsedCategories) this.settings.collapsedCategories = {};
			this.settings.collapsedCategories[categoryId] = !this.settings.collapsedCategories[categoryId];
			this.saveSettings();
		} else {
			const cat = this.categories.custom[categoryId];
			if (cat) {
				cat.collapsed = !cat.collapsed;
				this.saveCategories();
			}
		}
		this.forceUpdate({ dmList: true });
	}
	_getPinnedCategoriesWithDms() {
		const allIds = this._originalGetPrivateChannelIds
			? this._originalGetPrivateChannelIds()
			: this.storeService.getPrivateChannelIds();
		const buckets = this._categorizeDms(allIds);
		return [
			...this._createPredefinedCategories(buckets),
			...this._createCustomCategories()
		];
	}
	_categorizeDms(channelIds) {
		const buckets = {};
		for (const key of CATEGORY_KEYS) {
			if (this.settings[`enable${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
				buckets[key] = [];
			}
		}
		for (const id of channelIds) {
			const key = this._getPredefinedCategoryKey(id);
			if (key && buckets[key]) buckets[key].push(id);
		}
		return buckets;
	}
	_createPredefinedCategories(buckets) {
		const categories = [];
		const collapsed = this.settings.collapsedCategories || {};
		for (const [key, dms] of Object.entries(buckets)) {
			const filtered = dms.filter(id => !this.getCategoryForDm(id));
			if (filtered.length) {
				categories.push({
					id: key,
					name: CATEGORY_META[key].name,
					color: CATEGORY_META[key].color,
					predefined: true,
					collapsed: !!collapsed[key],
					dms: filtered
				});
			}
		}
		return categories;
	}
	_createCustomCategories() {
		return this.getCustomCategoriesSorted().map(cat => ({
			id: cat.id,
			name: cat.name,
			color: cat.color,
			predefined: false,
			collapsed: cat.collapsed,
			dms: cat.dms.filter(id => this.storeService.getChannel(id))
		})).filter(cat => cat.dms.length > 0);
	}
	_getPredefinedCategoryKey(channelId) {
		const channel = this.storeService.getChannel(channelId);
		if (!channel) return null;
		if (this.settings.enableMuted && this.storeService.isChannelMuted(channel.id)) return "muted";
		if (this.settings.enableActiveToday && this._wasActiveToday(channel)) return "activeToday";
		if (channel.type === CHANNEL_TYPES.GROUP_DM && this.settings.enableGroups) return "groups";
		if (channel.type === CHANNEL_TYPES.DM && channel.recipients?.length === 1) {
			const userId = channel.recipients[0];
			if (this.settings.enableFriends && this.storeService.isFriend(userId)) return "friends";
			if (this.settings.enableBlocked && this.storeService.isBlocked(userId)) return "blocked";
			if (this.settings.enableBots && this.storeService.getUser(userId)?.bot) return "bots";
		}
		return null;
	}
	_wasActiveToday(channel) {
		const lastMsg = this.storeService.getLastMessageId(channel.id);
		if (!lastMsg) return false;
		try {
			const ts = Number((BigInt(lastMsg) >> 22n) + 1420070400000n);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			return ts >= today.getTime();
		} catch {
			return false;
		}
	}
	_sortDmsByTime(dms) {
		return [...dms].sort((a, b) => {
			try {
				const tA = Number((BigInt(this.storeService.getLastMessageId(a) || "0") >> 22n));
				const tB = Number((BigInt(this.storeService.getLastMessageId(b) || "0") >> 22n));
				return tB - tA;
			} catch {
				return 0;
			}
		});
	}
	//#endregion Category Logic
	//#region Server List Pins
	isPinnedInGuildList(id) { return this.pins.guildList?.includes(id); }
	pinInGuildList(id) {
		if (!this.pins.guildList) this.pins.guildList = [];
		if (!this.pins.guildList.includes(id)) this.pins.guildList.unshift(id);
		this.savePins();
		this.storeService.emitPrivateChannelReadStateChange();
	}
	unpinInGuildList(id) {
		if (!this.pins.guildList) return;
		const idx = this.pins.guildList.indexOf(id);
		if (idx !== -1) {
			this.pins.guildList.splice(idx, 1);
			this.savePins();
			this.storeService.emitPrivateChannelReadStateChange();
		}
	}
	//#endregion Server List Pins
	//#region Context Menus
	_patchContextMenus() {
		const patch = (tree, props) => {
			if (!tree || !props?.channel) return;
			if ([CHANNEL_TYPES.DM, CHANNEL_TYPES.GROUP_DM].includes(props.channel.type)) {
				this._injectContextSubmenu(tree, props.channel.id);
			}
		};
		this.patches.push(
			ContextMenu.patch("user-context", patch),
			ContextMenu.patch("gdm-context", patch)
		);
	}
	_injectContextSubmenu(tree, channelId) {
		let children = tree.props.children;
		if (!Array.isArray(children)) {
			children = tree.props.children = [children].filter(Boolean);
		}
		const currentCategory = this.getCategoryForDm(channelId);
		const categories = this.getCustomCategoriesSorted();
		const pinnedInGuild = this.isPinnedInGuildList(channelId);
		const categoryItems = [];
		if (currentCategory) {
			categoryItems.push({
				type: "text",
				label: `Remove from "${currentCategory.name}"`,
				danger: true,
				action: () => {
					this.removeDmFromAnyCategory(channelId);
					UI.showToast("DM unpinned", { type: "info" });
				}
			});
		} else {
			categoryItems.push({
				type: "text",
				label: "Add to new category...",
				action: () => {
					this.uiManager.showCategoryCreateModal(`Pinned DMs #${categories.length + 1}`, (n, c) => {
						const cat = this.createCategory({ name: n, color: c });
						this.addDmToCategory(channelId, cat.id);
						UI.showToast(`Added to "${n}"`, { type: "success" });
					});
				}
			});
		}
		if (categories.length) {
			categoryItems.push({ type: "separator" });
			for (const cat of categories) {
				const isCurrent = currentCategory?.id === cat.id;
				categoryItems.push({
					type: "text",
					label: isCurrent ? `● ${cat.name}` : cat.name,
					disabled: isCurrent,
					action: () => {
						this.addDmToCategory(channelId, cat.id);
						UI.showToast(`Pinned to "${cat.name}"`, { type: "success" });
					}
				});
			}
		}
		const submenu = ContextMenu.buildItem({
			type: "submenu",
			label: "BetterPinDMs",
			items: [
				{
					type: "submenu",
					label: "Categories",
					items: categoryItems
				},
				{ type: "separator" },
				{
					type: "text",
					label: pinnedInGuild ? "Unpin from server list" : "Pin to server list",
					danger: pinnedInGuild,
					action: () => pinnedInGuild ? this.unpinInGuildList(channelId) : this.pinInGuildList(channelId)
				}
			]
		});
		children.push(submenu);
	}
	_showCategoryContextMenu(event, category) {
		try {
			event.preventDefault();
			event.stopPropagation();
			const items = [];
			if (category.predefined) {
				items.push({
					type: "text",
					label: "Disable Category",
					action: () => {
						const key = `enable${category.id.charAt(0).toUpperCase() + category.id.slice(1)}`;
						this.updateSetting(key, false);
					}
				});
			} else {
				items.push(
					{
						type: "text",
						label: "Edit Category",
						action: () => {
							this.uiManager.showCategoryEditModal(category, (name, color) => {
								this.updateCategory(category.id, { name, color });
							});
						}
					},
					{
						type: "text",
						label: "Delete Category",
						danger: true,
						action: () => {
							UI.showConfirmationModal(
								"Delete Category",
								`Delete "${category.name}"?`,
								{
									confirmText: "Delete",
									danger: true,
									onConfirm: () => {
										this.deleteCategory(category.id);
									}
								}
							);
						}
					}
				);
			}
			if (!items.length) return;
			const menuComponent = ContextMenu.buildMenu(items);
			ContextMenu.open(event, menuComponent, {
				position: "right",
				align: "top"
			});
		} catch (err) {
			Logger.error(this.pluginName, "Category context menu error", err);
		}
	}
	//#endregion Context Menus
	//#region Updates
	_flushPendingUpdates() {
		if (this._updatePending) {
			if (this._updatePending.dmList && this._dmListForceUpdate) this._dmListForceUpdate();
			this._updatePending = null;
		}
	}
	forceUpdate(updates = {}) {
		if (updates.immediate) {
			if (updates.dmList !== false && this._dmListForceUpdate) this._dmListForceUpdate();
			return;
		}
		if (!this._updatePending) this._updatePending = {};
		Object.assign(this._updatePending, updates);
		this._flushUpdatesDebounced();
	}
	//#endregion Updates
	//#region Store Patches
	_patchStores() {
		const readStore = this.storeService.getRawStore("PrivateChannelReadStateStore");
		if (readStore?.getUnreadPrivateChannelIds) {
			this._originalUnreadIds = readStore.getUnreadPrivateChannelIds.bind(readStore);
			this.patches.push(Patcher.after(
				this.pluginName,
				readStore,
				"getUnreadPrivateChannelIds",
				(_, __, ret) => {
					if (!Array.isArray(ret)) return ret;
					if (!Array.isArray(this.pins.guildList) || !this.pins.guildList.length) return ret;
					const pinned = this.pins.guildList.filter(id => typeof id === "string" && this.storeService.getChannel(id));
					if (!pinned.length) return ret;
					const set = new Set(ret);
					const added = pinned.filter(id => !set.has(id));
					if (!added.length) return ret;
					const combined = [...added, ...ret];
					return this.settings.sortGuildListByRecent
						? this._sortDmsByTime(combined)
						: combined;
				}
			));
		}
	}
	//#endregion Store Patches
	//#region Settings Panel
	getSettingsPanel() {
		if (!this.uiManager) return null;
		const panel = this.uiManager.renderSettingsPanel();
		if (panel?._betterpindmsRoot) {
			this._settingsRoot = panel._betterpindmsRoot;
		}
		return panel;
	}
	//#endregion Settings Panel
	//#region Keyboard Shortcuts
	_getShortcutConfig() {
		const s = this.settings || {};
		const d = CONFIG.defaultSettings || {};
		const normalizeKeys = (value, fallback) => {
			if (Array.isArray(value) && value.length) return value;
			if (Array.isArray(fallback) && fallback.length) return fallback;
			return [];
		};
		return {
			togglePin: {
				enabled: s.shortcutTogglePinEnabled ?? d.shortcutTogglePinEnabled,
				keys: normalizeKeys(s.shortcutTogglePinKeys, d.shortcutTogglePinKeys)
			},
			quickPicker: {
				enabled: s.shortcutQuickPickerEnabled ?? d.shortcutQuickPickerEnabled,
				keys: normalizeKeys(s.shortcutQuickPickerKeys, d.shortcutQuickPickerKeys)
			},
			jumpCategory: {
				enabled: s.shortcutJumpCategoryEnabled ?? d.shortcutJumpCategoryEnabled,
				keys: normalizeKeys(s.shortcutJumpCategoryKeys, d.shortcutJumpCategoryKeys)
			}
		};
	}
	toggleCurrentDmPin() {
		const channelId = this.storeService.getSelectedChannelId();
		if (!channelId) return;
		const channel = this.storeService.getChannel(channelId);
		if (!channel || ![CHANNEL_TYPES.DM, CHANNEL_TYPES.GROUP_DM].includes(channel.type)) return;
		const currentCat = this.getCategoryForDm(channelId);
		if (currentCat) {
			this.removeDmFromAnyCategory(channelId);
			UI.showToast("DM unpinned", { type: "info" });
		} else {
			const categories = this.getCustomCategoriesSorted();
			if (categories.length) {
				this.addDmToCategory(channelId, categories[0].id);
				UI.showToast(`Pinned to "${categories[0].name}"`, { type: "info" });
			} else {
				UI.showToast("No categories available. Create one first.", { type: "warning" });
			}
		}
	}
	showQuickCategoryPicker() {
		const channelId = this.storeService.getSelectedChannelId();
		if (!channelId) return;
		const channel = this.storeService.getChannel(channelId);
		if (!channel || ![CHANNEL_TYPES.DM, CHANNEL_TYPES.GROUP_DM].includes(channel.type)) return;
		const categories = this.getCustomCategoriesSorted();
		if (!categories.length) {
			UI.showToast("No categories available", { type: "info" });
			return;
		}
		this.uiManager.showQuickCategoryPicker(categories, (category) => {
			this.addDmToCategory(channelId, category.id);
			UI.showToast(`Pinned to "${category.name}"`, { type: "success" });
		});
	}
	jumpToCategory(index) {
		const categories = this._getPinnedCategoriesWithDms();
		if (categories[index]) {
			const firstDm = categories[index].dms[0];
			if (firstDm) {
				globalThis.location.hash = `#/channels/@me/${firstDm}`;
			}
		}
	}
	//#endregion Keyboard Shortcuts
	//#region Import/Export
	_hexToRgbaArray(color) {
		let hex = color;
		if (typeof hex === "number") {
			hex = "#" + (hex & 0xffffff).toString(16).padStart(6, "0");
		}
		if (typeof hex !== "string") {
			return [88, 101, 242, 1];
		}
		hex = hex.trim();
		if (hex.startsWith("#")) hex = hex.slice(1);
		if (hex.length === 3) {
			hex = hex.split("").map(c => c + c).join("");
		}
		if (hex.length < 6) {
			return [88, 101, 242, 1];
		}
		const int = Number.parseInt(hex.slice(0, 6), 16);
		if (Number.isNaN(int)) return [88, 101, 242, 1];
		const r = (int >> 16) & 0xff;
		const g = (int >> 8) & 0xff;
		const b = int & 0xff;
		return [r, g, b, 1];
	}
	_rgbaToHex(color) {
		if (typeof color === "string") {
			return color;
		}
		if (typeof color === "number") {
			return "#" + (color & 0xffffff).toString(16).padStart(6, "0");
		}
		if (!Array.isArray(color) || color.length < 3) {
			return "#5865F2";
		}
		const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
		const [r, g, b] = color;
		return "#" + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, "0")).join("");
	}
	_buildPinDmsSettingsObject() {
		const s = this.settings || {};
		const collapsed = s.collapsedCategories || {};
		return {
			general: {
				pinIcon: !!s.pinIcon,
				unreadAmount: !!s.unreadAmount,
				channelAmount: !!s.channelAmount
			},
			preCategories: {
				friends: { enabled: !!s.enableFriends, collapsed: !!collapsed.friends },
				blocked: { enabled: !!s.enableBlocked, collapsed: !!collapsed.blocked },
				bots: { enabled: !!s.enableBots, collapsed: !!collapsed.bots },
				groups: { enabled: !!s.enableGroups, collapsed: !!collapsed.groups }
			},
			smartCategories: {
				activeToday: { enabled: !!s.enableActiveToday, collapsed: !!collapsed.activeToday },
				muted: { enabled: !!s.enableMuted, collapsed: !!collapsed.muted }
			},
			recentOrder: {
				channelList: !!s.sortChannelListByRecent,
				guildList: !!s.sortGuildListByRecent
			}
		};
	}
	_buildPinDmsPinnedObject() {
		const userId = this.storeService?.getCurrentUserId?.() || "0";
		const channelList = {};
		for (const cat of this.getCustomCategoriesSorted()) {
			channelList[cat.id] = {
				id: cat.id,
				name: cat.name,
				dms: Array.isArray(cat.dms) ? [...cat.dms] : [],
				pos: typeof cat.pos === "number" ? cat.pos : 0,
				collapsed: !!cat.collapsed,
				color: this._hexToRgbaArray(cat.color || "#5865F2")
			};
		}
		const guildList = Array.isArray(this.pins?.guildList) ? [...this.pins.guildList].filter(x => typeof x === "string") : [];
		const pinnedForUser = { channelList, guildList };
		return { [userId]: pinnedForUser };
	}
	_importFromPinDmsConfig(config) {
		const all = config.all || {};
		this.settings = this._migrateSettings(all);
		const pinnedRoot = all.pinned || {};
		const currentUserId = this.storeService?.getCurrentUserId?.();
		let pinnedForUser = currentUserId ? pinnedRoot[currentUserId] : null;
		if (!pinnedForUser) {
			const firstKey = Object.keys(pinnedRoot)[0];
			if (firstKey) pinnedForUser = pinnedRoot[firstKey];
		}
		const channelList = (pinnedForUser?.channelList) || {};
		const custom = Object.create(null);
		let fallbackPos = 0;
		for (const [rawId, cat] of Object.entries(channelList)) {
			if (this._isUnsafeKey(rawId)) continue;
			if (!cat || typeof cat !== "object") continue;
			const id = (typeof cat.id === "string" && !this._isUnsafeKey(cat.id)) ? cat.id : rawId;
			const hex = this._rgbaToHex(cat.color);
			const dms = Array.isArray(cat.dms) ? cat.dms.filter(x => typeof x === "string") : [];
			custom[id] = {
				id,
				name: typeof cat.name === "string" ? cat.name : `Pinned DMs #${fallbackPos + 1}`,
				color: hex,
				pos: typeof cat.pos === "number" ? cat.pos : fallbackPos++,
				collapsed: !!cat.collapsed,
				dms
			};
		}
		const guildList = Array.isArray(pinnedForUser?.guildList) ? pinnedForUser.guildList.filter(x => typeof x === "string") : [];
		this.categories = { custom };
		this.pins = { channelList: [], guildList };
	}
	_importFromLegacyConfig(config) {
		if (!config.version || !config.categories || !config.settings) {
			throw new Error("Invalid configuration file");
		}
		if (config.settings && typeof config.settings === "object") {
			const safe = Object.create(null);
			for (const [k, v] of Object.entries(config.settings)) {
				if (this._isUnsafeKey(k)) continue;
				safe[k] = v;
			}
			this.settings = { ...this.settings, ...safe };
		}
		const custom = Object.create(null);
		const srcCustom = config.categories?.custom;
		if (srcCustom && typeof srcCustom === "object") {
			for (const key of Object.keys(srcCustom)) {
				if (this._isUnsafeKey(key)) continue;
				const cat = srcCustom[key];
				if (!cat || typeof cat !== "object") continue;
				const id = (typeof cat.id === "string" && !this._isUnsafeKey(cat.id)) ? cat.id : key;
				custom[id] = {
					id,
					name: typeof cat.name === "string" ? cat.name : `Category ${id}`,
					color: typeof cat.color === "string" ? cat.color : "#5865F2",
					pos: typeof cat.pos === "number" ? cat.pos : 0,
					collapsed: !!cat.collapsed,
					dms: Array.isArray(cat.dms) ? cat.dms.filter(x => typeof x === "string") : []
				};
			}
		}
		this.categories = { custom };
		const pins = config.pins || {};
		this.pins = {
			channelList: Array.isArray(pins.channelList) ? pins.channelList.filter(x => typeof x === "string") : [],
			guildList: Array.isArray(pins.guildList) ? pins.guildList.filter(x => typeof x === "string") : []
		};
	}
	_isUnsafeKey(key) {
		return key === "__proto__" || key === "prototype" || key === "constructor";
	}
	exportConfig() {
		try {
			const all = this._buildPinDmsSettingsObject();
			all.pinned = this._buildPinDmsPinnedObject();
			const config = { all };
			const json = JSON.stringify(config, null, 2);
			const blob = new Blob([json], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `PinDMs.config.${Date.now()}.json`;
			a.click();
			URL.revokeObjectURL(url);
			UI.showToast("Configuration exported (PinDMs-compatible)", { type: "success" });
		} catch (err) {
			Logger.error(this.pluginName, "Export config failed", err);
			UI.showToast("Failed to export configuration", { type: "error" });
		}
	}
	async importConfig() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";
		input.onchange = async (e) => {
			const file = e.target.files[0];
			if (!file) return;
			try {
				const text = await file.text();
				const config = JSON.parse(text);
				if (config?.all) {
					this._importFromPinDmsConfig(config);
				} else {
					this._importFromLegacyConfig(config);
				}
				this.saveSettings();
				this.saveCategories();
				this.savePins();
				this.forceUpdate({ immediate: true });
				UI.showToast("Configuration imported successfully", { type: "success" });
			} catch (err) {
				Logger.error(this.pluginName, "Import config failed", err);
				UI.showToast("Failed to import configuration", { type: "error" });
			}
		};
		input.click();
	}
	//#endregion Import/Export
	//#region Styles
	_injectStyles() {
		DOM.addStyle(CONFIG.cssId, `
			/* --- Layout & Animation --- */
			.betterpindms-virtual-header { padding: 0 8px; box-sizing: border-box; position: relative; }
			.betterpindms-group-content { display: flex; flex-direction: column; }
			.betterpindms-group-content.collapsed { max-height: 0; opacity: 0; }
			.betterpindms-group-content.expanded { opacity: 1; }
			/* --- Drag & Drop Wrappers --- */
			.betterpindms-draggable-wrapper { display: block; position: relative;  }
			/* --- Sidebar Pin Icon --- */
			.betterpindms-recent-pinned { 
				position: relative; 
			}
			.betterpindms-recent-pinned::after { content: "📌"; position: absolute; top: 2px; right: 2px; font-size: 10px; line-height: 1; z-index: 10; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.8)); pointer-events: none; background: rgba(0, 0, 0, 0.6); border-radius: 4px; padding: 1px; }
			/* Clean up old class */
			.betterpindms-pinbadge { display: none; }
			/* --- Drop Indicators --- */
			/* Top Line */
			.betterpindms-drop-target-top::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background-color: var(--background-brand,#5865F2);  z-index: 1000; pointer-events: none; }
			/* Bottom Line */
			.betterpindms-drop-target-bottom::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background-color: var(--background-brand,#5865F2); z-index: 1000; pointer-events: none; }
			/* Center Highlight (Drop into Category) */
			.betterpindms-drop-target-center { position: relative; }
			.betterpindms-drop-target-center::after { content: ""; position: absolute; inset: 0; background-color: rgba(88, 101, 242, 0.25);  border: 2px solid var(--background-brand,#5865F2); border-radius: 4px; pointer-events: none; z-index: 1000; }
			/* --- Settings UI (Custom Categories) --- */
			.betterpindms-customcategories { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
			.betterpindms-customcategories-header { font-size: 14px; font-weight: 600; color: var(--mobile-text-heading-primary); margin-bottom: 4px; }
			.betterpindms-customcategories-hint { color: var(--text-muted); font-size: 12px; opacity: 0.7; margin-bottom: 8px; }
			.betterpindms-customcategories-addbtn { padding: 8px 12px; cursor: pointer; background-color: var(--background-mod-subtle); color: var(--text-default); border: none; border-radius: 4px; margin-top: 8px; }
			.betterpindms-customcategories-addbtn:hover { background-color: var(--background-mod-strong); }
			.betterpindms-category-row { display: flex; align-items: center; gap: 8px; padding: 8px; background-color: var(--background-mod-subtle); border-radius: 4px; }
			.betterpindms-category-color-input { width: 32px; height: 32px; cursor: pointer; border: none; border-radius: 4px; background: transparent; }
			.betterpindms-category-name-input { flex: 1; padding: 6px 8px; background-color: var(--input-background-default); color: var(--text-default); border: 1px solid var(--input-background-default); border-radius: 4px; font-size: 14px; }
			.betterpindms-category-movebtn { padding: 4px 8px; cursor: pointer; border-radius: 3px; border: none; background: var(--background-mod-subtle); color: var(--text-default); }
			.betterpindms-category-movebtn:disabled { cursor: not-allowed; opacity: 0.5; }
			.betterpindms-category-deletebtn { padding: 4px 8px; border: none; border-radius: 3px; color: var(--status-danger); background: transparent; cursor: pointer; }
			.betterpindms-category-deletebtn:hover { background-color: var(--background-mod-subtle); }
			/* --- Settings UI (Actions & Shortcuts) --- */
			.betterpindms-actions { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
			.betterpindms-actions-header { font-size: 14px; font-weight: 600; color: var(--mobile-text-heading-primary); margin-bottom: 8px; }
			.betterpindms-actions-button { padding: 8px 12px; cursor: pointer; background-color: var(--background-mod-subtle); color: var(--text-default); border: none; border-radius: 4px; }
			.betterpindms-actions-button:hover { background-color: var(--background-mod-strong); }
			.betterpindms-actions-button-danger { background-color: var(--status-danger); color: #fff; margin-top: 8px; }
			.betterpindms-actions-button-danger:hover { filter: brightness(1.05); }
			.betterpindms-shortcuts { margin-top: 16px; }
			.betterpindms-shortcuts-header { font-size: 14px; font-weight: 600; color: var(--mobile-text-heading-primary); margin-bottom: 8px; }
			.betterpindms-shortcuts-list { color: var(--text-muted); display: flex; flex-direction: column; gap: 4px; font-size: 12px; }
			.betterpindms-shortcuts-kbd { background: var(--background-mod-subtle); padding: 2px 6px; border-radius: 3px; font-family: monospace; font-size: 11px; margin-right: 4px; }
			/* --- Modals --- */
			.betterpindms-modal-editor { display: flex; flex-direction: column; gap: 12px; }
			.betterpindms-modal-section { display: block; }
			.betterpindms-modal-label { display: block; margin-bottom: 4px; font-size: 12px; font-weight: 600; color: var(--text-muted); }
			.betterpindms-modal-input { width: 100%; padding: 8px; background-color: var(--input-background-default); color: var(--text-default); border: 1px solid var(--input-background-default); border-radius: 4px; font-size: 14px; }
			.betterpindms-modal-color-picker { width: 48px; height: 32px; cursor: pointer; border: none; border-radius: 4px; }
			.betterpindms-input-modal-field { width: 100%; padding: 8px; background-color: var(--input-background-default); color: var(--text-default); border: 1px solid var(--input-background-default); border-radius: 4px; margin-top: 8px; font-size: 14px; }
			/* --- Category Header (Inner) --- */
			.betterpindms-category-header-inner { display: flex; align-items: center; gap: 4px; user-select: none; border-radius: 4px; margin: 0; padding: 6px 0px; cursor: pointer; position: relative; }
			.betterpindms-category-header-inner:hover { background-color: var(--background-mod-subtle); }
			.betterpindms-category-arrow { margin-left: auto; display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; color: var(--icon-muted); pointer-events: none; }
			/* Smoothly rotates the arrow */
			.betterpindms-category-arrow-icon { transition: transform 0.2s ease; }
			.betterpindms-category-arrow-collapsed { transform: rotate(-90deg); }
			.betterpindms-category-arrow-expanded { transform: rotate(0deg); }
			.betterpindms-category-pin { font-size: 12px; margin-right: -2px; opacity: 0.7; }
			.betterpindms-category-name { font-weight: 600; font-size: 12px; text-transform: uppercase; flex: 1; pointer-events: none; }
			.betterpindms-category-unread { background-color: var(--status-danger); color: #fff; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 600; margin-left: 4px; }
			.betterpindms-category-count { background-color: var(--background-accent); color: #fff; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 600; margin-left: 4px; }
			/* --- Quick Picker --- */
			.betterpindms-quickpicker-label { margin-bottom: 8px; color: var(--text-default); }
			.betterpindms-quickpicker-list { white-space: pre-line; color: var(--text-muted); margin-bottom: 8px; font-size: 13px; }
		`);
	}
	//#endregion Styles
};
//#endregion Main Plugin


