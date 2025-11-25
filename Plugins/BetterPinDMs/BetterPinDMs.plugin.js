/**
 * @name BetterPinDMs
 * @author Pharaoh2k
 * @description Enhanced DM pinning with category headers, drag & drop, unread tracking, hotkeys, import/export (from similar plugins too), and smart categories. Pinned DMs are shown in a separate 📌 PINNED DMs section above "Direct Messages".
 * @version 1.0.0
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterPinDMs/BetterPinDMs.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterPinDMs/BetterPinDMs.plugin.js
 */
/* BdApi based, BDFDB-free feature-packed plugin. Inspired by mwittrien / Devilbro's “PinDMs” */
/*@cc_on
@if (@_jscript)
    var shell = WScript.CreateObject('WScript.Shell');
    var fs = new ActiveXObject('Scripting.FileSystemObject');
    var pathPlugins = shell.ExpandEnvironmentStrings('%APPDATA%\\BetterDiscord\\plugins');
    var pathSelf = WScript.ScriptFullName;
    shell.Popup('It looks like you\'ve mistakenly tried to run me directly. \n(Don\'t do that!)', 0, 'I\'m a plugin for BetterDiscord', 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup('I\'m in the correct folder already.\nJust reload Discord with Ctrl+R.', 0, 'I\'m already installed', 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup('I can\'t find the BetterDiscord plugins folder.\nAre you sure it\'s even installed?', 0, 'Can\'t install myself', 0x10);
    } else if (shell.Popup('Should I copy myself to BetterDiscord\'s plugins folder for you?', 0, 'Do you need some help?', 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        shell.Exec('explorer ' + pathPlugins);
        shell.Popup('I\'m installed!\nJust reload Discord with Ctrl+R.', 0, 'Successfully installed', 0x40);
    }
    WScript.Quit();
@else@*/
/*
Copyright © 2025 Pharaoh2k. All rights reserved.
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
const { React, ReactDOM, UI, DOM, Data, Patcher, Webpack, Logger, ContextMenu, ReactUtils, Utils, Net, Plugins } = BdApi;
const { className, debounce, findInTree } = Utils;
//#endregion BdApi destructuring
//#region Update Manager
const UPDATE_DEV = false;
const updateLog = (...a) => UPDATE_DEV && console.log("[BetterPinDMs/Updater]", ...a);
class UpdateManager {
	constructor(pluginName, version, github = "Pharaoh2k/BetterDiscordStuff") {
		this.name = pluginName;
		this.version = version;
		const [user, repo] = github.split("/");
		this.urls = {
			plugin: `https://raw.githubusercontent.com/${user}/${repo}/refs/heads/main/Plugins/${pluginName}/${pluginName}.plugin.js`,
			changelog: `https://raw.githubusercontent.com/${user}/${repo}/refs/heads/main/Plugins/${pluginName}/CHANGELOG.md`
		};
		this.timer = null;
		this.notice = null;
	}
	async start(autoUpdate = true) {
		if (autoUpdate) {
			this.check(true);
			this.timer = setInterval(() => this.check(true), 24 * 60 * 60 * 1000);
		}
		this.showChangelog();
	}
	stop() {
		if (this.timer) clearInterval(this.timer);
		this.timer = null;
		this.notice?.();
	}
	async check(silent = false) {
		try {
			const res = await Net.fetch(this.urls.plugin);
			if (res.status !== 200) throw new Error("Failed");
			const text = await res.text();
			const version = text.match(/@version\s+([\d.]+)/)?.[1];
			if (!version) throw new Error("No version");
			if (this.isNewer(version)) {
				this.showUpdateNotice(version, text);
			} else if (!silent) {
				UI.showToast(`[${this.name}] You're up to date.`, { type: "info" });
			}
		} catch (e) {
			updateLog("Update check failed:", e);
			if (!silent) UI.showToast(`[${this.name}] Update check failed`, { type: "error" });
		}
	}
	showUpdateNotice(version, text) {
		this.notice?.();
		this.notice = UI.showNotice(
			`${this.name} v${version} is available`,
			{
				type: "info",
				buttons: [
					{
						label: "Update",
						onClick: (close) => {
							close();
							this.applyUpdate(text, version);
						}
					},
					{
						label: "Dismiss",
						onClick: (close) => close()
					}
				]
			}
		);
	}
	applyUpdate(text, version) {
		try {
			require("fs").writeFileSync(__filename, text);
			UI.showToast(`Updated to v${version}. Reloading...`, { type: "success" });
			setTimeout(() => {
				try {
					Plugins.reload(this.name);
				} catch {
					UI.showToast("Please reload Discord (Ctrl+R)", { type: "info", timeout: 0 });
				}
			}, 100);
		} catch {
			UI.showToast("Update failed", { type: "error" });
		}
	}
	async showChangelog() {
		const last = Data.load(this.name, "version");
		if (last === this.version) return;
		Data.save(this.name, "version", this.version);
		if (!last) return;
		try {
			const res = await Net.fetch(this.urls.changelog);
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			if (changes.length === 0) return;
			UI.showChangelogModal({
				title: this.name,
				subtitle: `Version ${this.version}`,
				changes
			});
		} catch { /* ignore */ }
	}
	async showFullChangelog() {
		try {
			const res = await Net.fetch(this.urls.changelog);
			const md = await res.text();
			const changes = this.parseChangelog(md, "0.0.0", this.version);
			UI.showChangelogModal({
				title: this.name,
				subtitle: "All Changes",
				changes: changes.length ? changes : [{ title: "No changes found", items: [] }]
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
	isNewer(v1, v2 = this.version) {
		return Utils.semverCompare(v2, v1) === 1;
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
		return this._getFromStore("ReadStateStore", "lastMessageId", channelId);
	}
	getMentionCount(channelId) {
		return this._getFromStore("ReadStateStore", "getMentionCount", channelId) || 0;
	}
	getPrivateChannelIds() {
		return this._getFromStore("PrivateChannelSortStore", "getPrivateChannelIds") || [];
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
		this.React = React;
		this.headerRoots = new Map();
		this.settingsPanelRefresh = null;
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
		root.render(this.React.createElement(this.SettingsPanelComponent));
		return panel;
	}
	_SettingsPanelComponent() {
		const settings = this.plugin.settings;
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
					{
						type: "switch",
						id: "shortcutTogglePinEnabled",
						name: "Toggle pin / unpin current DM",
						value: settings.shortcutTogglePinEnabled
					},
					{
						type: "keybind",
						id: "shortcutTogglePinKeys",
						name: "Shortcut",
						note: "Click and press the combo (e.g. Ctrl+P). Clear to leave unassigned.",
						value: settings.shortcutTogglePinKeys,
						clearable: true
					},
					{
						type: "switch",
						id: "shortcutQuickPickerEnabled",
						name: "Open quick category picker",
						value: settings.shortcutQuickPickerEnabled
					},
					{
						type: "keybind",
						id: "shortcutQuickPickerKeys",
						name: "Shortcut",
						note: "Click and press the combo (e.g. Ctrl+Shift+P). Clear to leave unassigned.",
						value: settings.shortcutQuickPickerKeys,
						clearable: true
					},
					{
						type: "switch",
						id: "shortcutJumpCategoryEnabled",
						name: "Jump to category 1–9",
						value: settings.shortcutJumpCategoryEnabled
					},
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
					{
						type: "button",
						id: "checkUpdate",
						name: "Check for Updates",
						note: "Manually check for plugin updates",
						children: "Check Now",
						onClick: () => this.plugin.updateManager?.check()
					},
					{
						type: "button",
						id: "viewChangelog",
						name: "View Changelog",
						note: "View all version changes",
						children: "View Changelog",
						onClick: () => this.plugin.updateManager?.showFullChangelog()
					}
				]
			}
		];
		return this.React.createElement(
			"div",
			{},
			[
				UI.buildSettingsPanel({
					settings: settingsSchema,
					onChange: (_category, id, value) => {
						this.plugin.updateSetting(id, value);
					}
				}),
				this.React.createElement(this.CustomCategoriesSection, { key: "custom" }),
				this.React.createElement(this.ActionsSection, { key: "actions" })
			]
		);
	}
	_CustomCategoriesSection() {
		const React = this.React;
		const [categories, setCategories] = React.useState(this.plugin.getCustomCategoriesSorted());
		const [, forceUpdate] = React.useReducer(x => x + 1, 0);
		const refresh = () => {
			setCategories(this.plugin.getCustomCategoriesSorted());
			forceUpdate();
		};
		React.useEffect(() => {
			this.settingsPanelRefresh = refresh;
			return () => { this.settingsPanelRefresh = null; };
		}, []);
		return React.createElement(
			"div",
			{ className: "betterpindms-customcategories" },
			[
				React.createElement(
					"div",
					{
						key: "header",
						className: "betterpindms-customcategories-header"
					},
					"Custom Categories"
				),
				React.createElement(
					"div",
					{
						key: "hint",
						className: "betterpindms-customcategories-hint"
					},
					"Drag categories to reorder. Click ✕ to delete."
				),
				...categories.map((cat, i) => this._createCategoryRow(cat, i, categories.length, refresh)),
				React.createElement(
					"button",
					{
						key: "add",
						onClick: () => {
							this.plugin.createCategory({
								name: `Pinned DMs #${categories.length + 1}`,
								color: "#5865F2"
							});
							refresh();
						},
						className: "betterpindms-customcategories-addbtn"
					},
					"Add Category"
				)
			]
		);
	}
	_createCategoryRow(cat, index, total, refresh) {
		const React = this.React;
		return React.createElement(
			"div",
			{
				key: cat.id,
				className: "betterpindms-category-row"
			},
			[
				React.createElement("input", {
					key: "color",
					type: "color",
					value: cat.color,
					onChange: (e) => {
						this.plugin.updateCategory(cat.id, { color: e.target.value });
						refresh();
					},
					className: "betterpindms-category-color-input"
				}),
				React.createElement("input", {
					key: "name",
					type: "text",
					value: cat.name,
					onChange: (e) => {
						this.plugin.updateCategory(cat.id, { name: e.target.value });
						refresh();
					},
					className: "betterpindms-category-name-input"
				}),
				React.createElement(
					"button",
					{
						key: "up",
						onClick: () => {
							this.plugin.moveCategory(cat.id, "up");
							refresh();
						},
						disabled: index === 0,
						className: "betterpindms-category-movebtn betterpindms-category-movebtn-up"
					},
					"↑"
				),
				React.createElement(
					"button",
					{
						key: "down",
						onClick: () => {
							this.plugin.moveCategory(cat.id, "down");
							refresh();
						},
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
							UI.showConfirmationModal(
								"Delete Category",
								`Delete "${cat.name}"?`,
								{
									confirmText: "Delete",
									danger: true,
									onConfirm: () => {
										this.plugin.deleteCategory(cat.id);
										refresh();
									}
								}
							);
						},
						className: "betterpindms-category-deletebtn"
					},
					"✕"
				)
			]
		);
	}
	_ActionsSection() {
		const React = this.React;
		return React.createElement(
			"div",
			{ className: "betterpindms-actions" },
			[
				React.createElement(
					"div",
					{
						key: "header",
						className: "betterpindms-actions-header"
					},
					"Backup & Actions"
				),
				React.createElement(
					"button",
					{
						key: "export",
						onClick: () => this.plugin.exportConfig(),
						className: "betterpindms-actions-button"
					},
					"Export Configuration"
				),
				React.createElement(
					"button",
					{
						key: "import",
						onClick: () => this.plugin.importConfig(),
						className: "betterpindms-actions-button"
					},
					"Import Configuration"
				),
				React.createElement(
					"button",
					{
						key: "unpin",
						onClick: () => {
							UI.showConfirmationModal(
								"Unpin all DMs",
								"Remove all custom categories and server-list pins?",
								{
									confirmText: "Unpin All",
									danger: true,
									onConfirm: () => {
										this.plugin.categories = { custom: {} };
										this.plugin.saveCategories();
										this.plugin.pins = { channelList: [], guildList: [] };
										this.plugin.savePins();
										this.plugin.forceUpdate();
										if (this.settingsPanelRefresh) {
											this.settingsPanelRefresh();
										}
										UI.showToast("All pins removed", { type: "success" });
									}
								}
							);
						},
						className: "betterpindms-actions-button betterpindms-actions-button-danger"
					},
					"Unpin All"
				),
				React.createElement(
					"div",
					{
						key: "shortcuts",
						className: "betterpindms-shortcuts"
					},
					[
						React.createElement(
							"div",
							{
								key: "shortcuts-header",
								className: "betterpindms-shortcuts-header"
							},
							"Keyboard Shortcuts"
						),
						React.createElement(
							"div",
							{
								key: "shortcuts-list",
								className: "betterpindms-shortcuts-list"
							},
							[
								React.createElement(
									"div",
									{ key: "s1" },
									[
										React.createElement(
											"kbd",
											{ className: "betterpindms-shortcuts-kbd" },
											"Ctrl+P"
										),
										" Pin/unpin current DM (default, configurable in settings)"
									]
								),
								React.createElement(
									"div",
									{ key: "s2" },
									[
										React.createElement(
											"kbd",
											{ className: "betterpindms-shortcuts-kbd" },
											"Ctrl+Shift+P"
										),
										" Quick category picker (default, configurable in settings)"
									]
								),
								React.createElement(
									"div",
									{ key: "s3" },
									[
										React.createElement(
											"kbd",
											{ className: "betterpindms-shortcuts-kbd" },
											"Ctrl+1-9"
										),
										" Jump to category (prefix configurable in settings)"
									]
								)
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
			this.React.createElement(
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
	_CategoryHeaderComponent({ category, callbacks }) {
		const React = this.React;
		const dragRef = React.useRef({ isDragging: false });
		const unreadCount = this._getUnreadCount(category.dms);
		const showUnread = this.plugin.settings.unreadAmount && unreadCount > 0;
		const showCount = this.plugin.settings.channelAmount;
		const onClick = (e) => {
			e?.preventDefault();
			e?.stopPropagation();
			if (!dragRef.current.isDragging && callbacks.onToggleCollapse) {
				callbacks.onToggleCollapse(category.id);
			}
		};
		const onContextMenu = (e) => {
			e.preventDefault();
			e.stopPropagation();
			if (callbacks.onContextMenu) {
				callbacks.onContextMenu(e, category);
			}
		};
		const draggable = !category.predefined;
		const onDragStart = (e) => {
			if (!draggable || !callbacks.onDragStart) return;
			dragRef.current.isDragging = true;
			callbacks.onDragStart(e, category);
		};
		const onDragEnd = (e) => {
			if (!draggable || !callbacks.onDragEnd) return;
			callbacks.onDragEnd(e, category);
			setTimeout(() => {
				dragRef.current.isDragging = false;
			}, TIMEOUTS.DOM_SYNC_DEBOUNCE);
		};
		const onDragOver = (e) => {
			if (!draggable || !callbacks.onDragOver) return;
			callbacks.onDragOver(e, category);
		};
		const onDragLeave = (e) => {
			if (!draggable || !callbacks.onDragLeave) return;
			callbacks.onDragLeave(e, category);
		};
		const onDrop = (e) => {
			if (!draggable || !callbacks.onDrop) return;
			callbacks.onDrop(e, category);
			dragRef.current.isDragging = false;
		};
		const headerClasses = className(
			"betterpindms-category-header-inner",
			draggable
				? "betterpindms-category-header-inner-draggable"
				: "betterpindms-category-header-inner-static"
		);
		const arrowIconClass = className(
			"betterpindms-category-arrow-icon",
			category.collapsed
				? "betterpindms-category-arrow-collapsed"
				: "betterpindms-category-arrow-expanded"
		);
		return React.createElement(
			"div",
			{
				className: headerClasses,
				onClick,
				onContextMenu,
				draggable,
				onDragStart: draggable ? onDragStart : undefined,
				onDragEnd: draggable ? onDragEnd : undefined,
				onDragOver: draggable ? onDragOver : undefined,
				onDragLeave: draggable ? onDragLeave : undefined,
				onDrop: draggable ? onDrop : undefined
			},
			[
				...(this.plugin.settings.pinIcon && !category.predefined ? [
					React.createElement(
						"span",
						{
							key: "pin",
							className: "betterpindms-category-pin"
						},
						"📌"
					)
				] : []),
				React.createElement(
					"span",
					{
						key: "name",
						className: "betterpindms-category-name",
						style: { color: category.color || "var(--header-primary)" }
					},
					category.name
				),
				...(showUnread ? [
					React.createElement(
						"span",
						{
							key: "unread",
							className: "betterpindms-category-unread"
						},
						String(unreadCount)
					)
				] : []),
				...(showCount ? [
					React.createElement(
						"span",
						{
							key: "count",
							className: "betterpindms-category-count"
						},
						String(category.dms.length)
					)
				] : []),
				React.createElement(
					"div",
					{
						key: "arrow",
						className: "betterpindms-category-arrow"
					},
					React.createElement(
						"svg",
						{
							width: 16,
							height: 16,
							viewBox: "4 4 16 16",
							className: arrowIconClass
						},
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
	_getUnreadCount(dms) {
		return dms.reduce((total, id) => total + this.plugin.storeService.getMentionCount(id), 0);
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
			const React = this.React;
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
			this.React.createElement(EditorComponent),
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
			const React = this.React;
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
			this.React.createElement(EditorComponent),
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
			const React = this.React;
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
			this.React.createElement(PickerComponent),
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
		const React = this.React;
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
		const React = this.React;
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
//#region DragDrop Manager
class DragDropManager {
	constructor(plugin) {
		this.plugin = plugin;
		this.dragState = {
			draggedDm: null,
			draggedCategory: null
		};
		this.rowHandlers = new Map();
		this._running = false;
	}
	start() {
		this._running = true;
	}
	stop() {
		this._running = false;
		this.detachAll();
		this.dragState = { draggedDm: null, draggedCategory: null };
	}
	attachToDmRows(dmRows) {
		if (!this._running) return;
		for (const row of dmRows) {
			const link = row.querySelector('a[href^="/channels/@me/"]');
			if (!link) continue;
			const href = link.getAttribute("href");
			const channelId = href?.split("/").pop();
			if (!channelId) continue;
			const hasHandlers = this.rowHandlers.has(row);
			if (!hasHandlers) {
				this._setupDragHandlersForRow(row, channelId);
			}
		}
	}
	detachAll() {
		for (const row of this.rowHandlers.keys()) {
			this._teardownDragHandlersForRow(row);
		}
		this.rowHandlers.clear();
	}
	_setupDragHandlersForRow(row, channelId) {
		row.draggable = true;
		row.classList.add("betterpindms-dm-row-draggable");
		const handlers = {
			onDragStart: (e) => {
				if (!this._running) return;
				this.dragState.draggedDm = channelId;
				const cat = this.plugin.getCategoryForDm(channelId);
				this.dragState.draggedCategory = cat?.id || null;
				row.classList.add("betterpindms-dm-row-dragging");
				if (e.dataTransfer) {
					e.dataTransfer.effectAllowed = "move";
					e.dataTransfer.setData("text/plain", channelId);
				}
			},
			onDragEnd: () => {
				if (!this._running) return;
				row.classList.remove("betterpindms-dm-row-dragging", "betterpindms-dm-row-dragover");
				this.dragState.draggedDm = null;
				this.dragState.draggedCategory = null;
			},
			onDragOver: (e) => {
				if (!this._running) return;
				this._handleDragOver(e, row, channelId);
			},
			onDragLeave: () => {
				if (!this._running) return;
				row.classList.remove("betterpindms-dm-row-dragover");
			},
			onDrop: (e) => {
				if (!this._running) return;
				this._handleDrop(e, row, channelId);
			}
		};
		this.rowHandlers.set(row, handlers);
		row.addEventListener("dragstart", handlers.onDragStart);
		row.addEventListener("dragend", handlers.onDragEnd);
		row.addEventListener("dragover", handlers.onDragOver);
		row.addEventListener("dragleave", handlers.onDragLeave);
		row.addEventListener("drop", handlers.onDrop);
	}
	_teardownDragHandlersForRow(row) {
		const handlers = this.rowHandlers.get(row);
		if (!handlers) return;
		row.removeEventListener("dragstart", handlers.onDragStart);
		row.removeEventListener("dragend", handlers.onDragEnd);
		row.removeEventListener("dragover", handlers.onDragOver);
		row.removeEventListener("dragleave", handlers.onDragLeave);
		row.removeEventListener("drop", handlers.onDrop);
		this.rowHandlers.delete(row);
		row.draggable = false;
		row.classList.remove(
			"betterpindms-dm-row-draggable",
			"betterpindms-dm-row-dragging",
			"betterpindms-dm-row-dragover"
		);
	}
	_handleDragOver(e, row, channelId) {
		if (!this._running) return;
		const draggedId = this.dragState.draggedDm;
		if (!draggedId || draggedId === channelId) return;
		const targetCategory = this.plugin.getCategoryForDm(channelId);
		const draggedCatId = this.dragState.draggedCategory;
		if (!draggedCatId && !targetCategory) return;
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
		row.classList.add("betterpindms-dm-row-dragover");
	}
	_handleDrop(e, row, channelId) {
		if (!this._running) return;
		e.preventDefault();
		e.stopPropagation();
		row.classList.remove("betterpindms-dm-row-dragover");
		const draggedId = this.dragState.draggedDm;
		const draggedCatId = this.dragState.draggedCategory;
		if (!draggedId || draggedId === channelId) return;
		const targetCategory = this.plugin.getCategoryForDm(channelId);
		const fromCategory = draggedCatId ? this.plugin.categories.custom[draggedCatId] : null;
		if (fromCategory && targetCategory && fromCategory.id === targetCategory.id) {
			const cat = fromCategory;
			const draggedIdx = cat.dms.indexOf(draggedId);
			const targetIdx = cat.dms.indexOf(channelId);
			if (draggedIdx === -1 || targetIdx === -1) return;
			cat.dms.splice(draggedIdx, 1);
			const newTargetIdx = cat.dms.indexOf(channelId);
			const insertIdx = draggedIdx < targetIdx ? newTargetIdx + 1 : newTargetIdx;
			cat.dms.splice(insertIdx, 0, draggedId);
			this.plugin.saveCategories();
			this.plugin.forceUpdate();
			return;
		}
		if (fromCategory || targetCategory) {
			const toCategory = targetCategory || null;
			this.plugin._handleCategoryChangeByDrag(
				draggedId,
				fromCategory,
				toCategory
			);
		}
	}
	getCategoryDragHandlers() {
		return {
			onDragStart: (e, category) => {
				if (!this._running) return;
				this.dragState.draggedCategory = category.id;
				this.dragState.draggedDm = null;
				if (e.dataTransfer) {
					e.dataTransfer.effectAllowed = "move";
					e.dataTransfer.setData("text/plain", category.id);
				}
				e.currentTarget.classList.add("betterpindms-category-header-dragging");
			},
			onDragEnd: (e) => {
				if (!this._running) return;
				e.currentTarget.classList.remove(
					"betterpindms-category-header-dragging",
					"betterpindms-category-header-dragover"
				);
				this.dragState.draggedCategory = null;
			},
			onDragOver: (e, category) => {
				if (!this._running) return;
				const draggedDmId = this.dragState.draggedDm;
				const draggedCategoryId = this.dragState.draggedCategory;
				if (draggedDmId && this.plugin.categories.custom[category.id]) {
					e.preventDefault();
					if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
					e.currentTarget.classList.add("betterpindms-category-header-dragover");
					return;
				}
				if (!draggedDmId && draggedCategoryId && draggedCategoryId !== category.id) {
					e.preventDefault();
					if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
					e.currentTarget.classList.add("betterpindms-category-header-dragover");
				}
			},
			onDragLeave: (e) => {
				if (!this._running) return;
				e.currentTarget.classList.remove("betterpindms-category-header-dragover");
			},
			onDrop: (e, category) => {
				if (!this._running) return;
				e.preventDefault();
				e.stopPropagation();
				e.currentTarget.classList.remove("betterpindms-category-header-dragover");
				const draggedDmId = this.dragState.draggedDm;
				const draggedCategoryId = this.dragState.draggedCategory;
				if (draggedDmId && this.plugin.categories.custom[category.id]) {
					const fromCategory = this.plugin.getCategoryForDm(draggedDmId);
					const toCategory = this.plugin.categories.custom[category.id];
					this.plugin._handleCategoryChangeByDrag(
						draggedDmId,
						fromCategory,
						toCategory
					);
					return;
				}
				if (!draggedDmId && draggedCategoryId && draggedCategoryId !== category.id) {
					this.plugin.swapCategories(draggedCategoryId, category.id);
				}
				this.dragState.draggedCategory = null;
			}
		};
	}
}
//#endregion DragDrop Manager
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
			if (!modifiersMatch(parsed.mods, e)) return false;
			if (parsed.mainKey) {
				const key = String(e.key || "").toLowerCase();
				if (key !== parsed.mainKey) return false;
			}
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
		this.dragDropManager = null;
		this.shortcutManager = null;
		this.patches = [];
		this._settingsRoot = null;
		this._originalGetPrivateChannelIds = null;
		this._updatePending = null;
		this._dmDomRefreshTimeout = null;
		this._headerInterval = null;
		this._running = false;
		this._dmInstances = new Set();
		this._guildDmPatched = false;
		this._syncDomDebounced = debounce(() => {
			if (this._running) {
				this._syncPinnedUiWithDom();
			}
		}, TIMEOUTS.DOM_SYNC_DEBOUNCE);
		this._flushUpdatesDebounced = debounce(() => {
			this._flushPendingUpdates();
		}, TIMEOUTS.UPDATE_DEBOUNCE);
		this.updateManager = new UpdateManager(
			this.pluginName,
			this.meta?.version ?? "1.0.0",
			CONFIG.info.github
		);
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
			if (!Webpack?.getStore || !Patcher) {
				UI.showToast(`${this.meta.name}: BdApi not available or outdated`, { type: "error" });
				return;
			}
			this._running = true;
			Logger.info(this.pluginName, `Starting v${this.meta.version}`);
			this.loadSettings();
			this.loadCategories();
			this.loadPins();
			this.storeService = new DiscordStoreService();
			this.storeService.init();
			this.uiManager = new UIManager(this);
			this.dragDropManager = new DragDropManager(this);
			this.shortcutManager = new ShortcutManager(this);
			this._injectStyles();
			this._patchStores();
			this._patchContextMenus();
			this._patchDmListReact();
			this._patchGuildDmComponent();
			this.dragDropManager.start();
			this.shortcutManager.start();
			this._ensureHeaderInterval();
			this._scheduleDomSync(TIMEOUTS.INITIAL_HEADER_INJECT);
			this.updateManager.start(this.settings.autoUpdate ?? true);
		} catch (err) {
			this._running = false;
			Logger.error(this.pluginName, "Failed to start", err);
			UI.showToast(`${this.pluginName}: Failed to start`, { type: "error" });
		}
	}
	stop() {
		try {
			Logger.info(this.pluginName, "Stopping");
			this._running = false;
			this._guildDmPatched = false;
			if (this.dragDropManager) this.dragDropManager.stop();
			if (this.shortcutManager) this.shortcutManager.stop();
			if (this._settingsRoot) {
				try { this._settingsRoot.unmount(); } catch { }
				this._settingsRoot = null;
			}
			for (const unpatch of this.patches) {
				try {
					if (typeof unpatch === "function") unpatch();
				} catch (err) {
					Logger.warn(this.pluginName, "Failed to unpatch", err);
				}
			}
			this.patches = [];
			if (this._dmInstances) {
				for (const inst of this._dmInstances) {
					try {
						if (inst && inst._betterpindmsPatched && inst._betterpindmsOriginalRender) {
							inst.render = inst._betterpindmsOriginalRender;
							delete inst._betterpindmsOriginalRender;
							delete inst._betterpindmsPatched;
							if (typeof inst.forceUpdate === "function") inst.forceUpdate();
						}
					} catch (err) {
						Logger.warn(this.pluginName, "Failed to restore DM instance", err);
					}
				}
				this._dmInstances.clear();
			}
			this._updatePending = null;
			if (this._headerInterval) {
				clearInterval(this._headerInterval);
				this._headerInterval = null;
			}
			DOM.removeStyle(CONFIG.cssId);
			if (this.uiManager) {
				this.uiManager.removeAllCategoryHeaders();
			}
			this.updateManager.stop();
		} catch (err) {
			Logger.error(this.pluginName, "Error during stop", err);
		}
	}
	//#endregion Lifecycle
	//#region Settings Panel
	getSettingsPanel() {
		if (!this.uiManager) return document.createElement("div");
		const panel = this.uiManager.renderSettingsPanel();
		if (panel && panel._betterpindmsRoot) {
			this._settingsRoot = panel._betterpindmsRoot;
		}
		return panel;
	}
	//#endregion Settings Panel
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
			if (value) {
				this.updateManager.start(true);
			} else {
				this.updateManager.stop();
			}
		}
		this.forceUpdate();
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
			if (Object.hasOwn.call(saved, "autoUpdate")) {
				migrated.autoUpdate = saved.autoUpdate;
			}
			migrated.shortcutTogglePinEnabled =
				saved.shortcutTogglePinEnabled ?? defaults.shortcutTogglePinEnabled;
			migrated.shortcutTogglePinKeys =
				Array.isArray(saved.shortcutTogglePinKeys) ? saved.shortcutTogglePinKeys : defaults.shortcutTogglePinKeys;
			migrated.shortcutQuickPickerEnabled =
				saved.shortcutQuickPickerEnabled ?? defaults.shortcutQuickPickerEnabled;
			migrated.shortcutQuickPickerKeys =
				Array.isArray(saved.shortcutQuickPickerKeys) ? saved.shortcutQuickPickerKeys : defaults.shortcutQuickPickerKeys;
			migrated.shortcutJumpCategoryEnabled =
				saved.shortcutJumpCategoryEnabled ?? defaults.shortcutJumpCategoryEnabled;
			migrated.shortcutJumpCategoryKeys =
				Array.isArray(saved.shortcutJumpCategoryKeys) ? saved.shortcutJumpCategoryKeys : defaults.shortcutJumpCategoryKeys;
			return migrated;
		}
		return { ...defaults, ...saved };
	}
	loadCategories() {
		const saved = Data.load(this.pluginName, "categories") || {};
		const result = { custom: {} };
		if (saved.custom && typeof saved.custom === "object") {
			for (const id in saved.custom) {
				const cat = saved.custom[id];
				if (cat && typeof cat === "object") {
					result.custom[id] = {
						id: cat.id || id,
						name: cat.name || `Category ${id}`,
						color: cat.color || "#5865F2",
						pos: typeof cat.pos === "number" ? cat.pos : 0,
						collapsed: !!cat.collapsed,
						dms: Array.isArray(cat.dms) ? cat.dms : []
					};
				}
			}
		}
		this.categories = result;
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
	//#region Category Management
	getCustomCategoriesSorted() {
		return Object.values(this.categories.custom || {}).sort((a, b) => (a.pos || 0) - (b.pos || 0));
	}
	generateCategoryId() {
		let id;
		do {
			id = Math.random().toString(36).slice(2, 10);
		} while (this.categories.custom[id]);
		return id;
	}
	createCategory({ name, color }) {
		const id = this.generateCategoryId();
		const existing = this.getCustomCategoriesSorted();
		const pos = existing.length ? Math.max(...existing.map(c => c.pos || 0)) + 1 : 0;
		const category = { id, name, color, pos, collapsed: false, dms: [] };
		this.categories.custom[id] = category;
		this.saveCategories();
		this.forceUpdate();
		return category;
	}
	deleteCategory(categoryId) {
		delete this.categories.custom[categoryId];
		this.saveCategories();
		this.forceUpdate();
	}
	updateCategory(categoryId, updates) {
		const cat = this.categories.custom[categoryId];
		if (!cat) return;
		if ("name" in updates) cat.name = updates.name;
		if ("color" in updates) cat.color = updates.color;
		if ("collapsed" in updates) cat.collapsed = updates.collapsed;
		this.saveCategories();
		this.forceUpdate();
	}
	moveCategory(categoryId, direction) {
		const list = this.getCustomCategoriesSorted();
		const index = list.findIndex(c => c.id === categoryId);
		if (index === -1) return;
		const swapIndex = index + (direction === "up" ? -1 : 1);
		if (swapIndex < 0 || swapIndex >= list.length) return;
		[list[index].pos, list[swapIndex].pos] = [list[swapIndex].pos, list[index].pos];
		this.saveCategories();
		this.forceUpdate();
	}
	swapCategories(id1, id2) {
		const cat1 = this.categories.custom[id1];
		const cat2 = this.categories.custom[id2];
		if (!cat1 || !cat2) return;
		[cat1.pos, cat2.pos] = [cat2.pos, cat1.pos];
		this.saveCategories();
		this.forceUpdate();
	}
	getCategoryForDm(dmId) {
		if (!dmId) return null;
		for (const id in this.categories.custom) {
			const cat = this.categories.custom[id];
			if (Array.isArray(cat.dms) && cat.dms.includes(dmId)) return cat;
		}
		return null;
	}
	addDmToCategory(dmId, categoryId) {
		if (!dmId || !categoryId) return;
		const cat = this.categories.custom[categoryId];
		if (!cat) return;
		this.removeDmFromAnyCategory(dmId);
		if (!cat.dms.includes(dmId)) cat.dms.unshift(dmId);
		this.saveCategories();
		this.forceUpdate();
	}
	removeDmFromAnyCategory(dmId) {
		if (!dmId) return false;
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
			this.forceUpdate();
		}
		return changed;
	}
	toggleCategoryCollapse(categoryId) {
		const predefKeys = CATEGORY_KEYS;
		if (predefKeys.includes(categoryId)) {
			if (!this.settings.collapsedCategories) {
				this.settings.collapsedCategories = {};
			}
			const categories = this._getPinnedCategoriesWithDms();
			const category = categories.find(c => c.id === categoryId);
			if (!category) return;
			this.settings.collapsedCategories[categoryId] = !category.collapsed;
			this.saveSettings();
		} else {
			const cat = this.categories.custom[categoryId];
			if (!cat) return;
			cat.collapsed = !cat.collapsed;
			this.saveCategories();
		}
		this.forceUpdate();
	}
	_handleCategoryChangeByDrag(dmId, fromCategory, toCategory) {
		const fromName = fromCategory?.name;
		const toName = toCategory?.name;
		const settings = this.settings || {};
		if (!toCategory && !fromCategory) return;
		if (fromCategory && toCategory && fromCategory.id === toCategory.id) {
			return;
		}
		const perform = () => {
			if (toCategory) {
				this.addDmToCategory(dmId, toCategory.id);
			} else if (fromCategory && !toCategory) {
				this.removeDmFromAnyCategory(dmId);
			}
		};
		if (!settings.confirmDragActions) {
			perform();
			return;
		}
		let body;
		if (fromCategory && toCategory) {
			body = `Move this DM from "${fromName}" to "${toName}"?`;
		} else if (!fromCategory && toCategory) {
			body = `Add this DM to "${toName}"?`;
		} else if (fromCategory && !toCategory) {
			body = `Remove this DM from "${fromName}"?`;
		}
		if (!body) {
			perform();
			return;
		}
		UI.showConfirmationModal(
			"Confirm DM change",
			body,
			{
				confirmText: "Confirm",
				cancelText: "Cancel",
				onConfirm: perform
			}
		);
	}
	//#endregion Category Management
	//#region Pin Management
	isPinnedInGuildList(id) {
		return this.pins.guildList?.includes(id) || false;
	}
	pinInGuildList(id) {
		if (!this.pins.guildList) this.pins.guildList = [];
		const idx = this.pins.guildList.indexOf(id);
		if (idx !== -1) this.pins.guildList.splice(idx, 1);
		this.pins.guildList.unshift(id);
		this.savePins();
		this.forceUpdate({ guildRecents: true });
	}
	unpinInGuildList(id) {
		if (!this.pins.guildList) return;
		const idx = this.pins.guildList.indexOf(id);
		if (idx !== -1) {
			this.pins.guildList.splice(idx, 1);
			this.savePins();
			this.forceUpdate({ guildRecents: true });
		}
	}
	//#endregion Pin Management
	//#region Category Helpers
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
			const settingKey = `enable${key.charAt(0).toUpperCase() + key.slice(1)}`;
			if (this.settings[settingKey]) {
				buckets[key] = [];
			}
		}
		for (const id of channelIds) {
			const key = this._getPredefinedCategoryKey(id);
			if (key && buckets[key]) {
				buckets[key].push(id);
			}
		}
		return buckets;
	}
	_createPredefinedCategories(buckets) {
		const categories = [];
		const collapsedCategories = this.settings.collapsedCategories || {};
		for (const [key, dms] of Object.entries(buckets)) {
			const filteredDms = dms.filter(id => !this.getCategoryForDm(id));
			if (filteredDms.length) {
				categories.push({
					id: key,
					name: CATEGORY_META[key].name,
					color: CATEGORY_META[key].color,
					predefined: true,
					collapsed: !!collapsedCategories[key],
					dms: filteredDms
				});
			}
		}
		return categories;
	}
	_createCustomCategories() {
		const categories = [];
		for (const cat of this.getCustomCategoriesSorted()) {
			const dms = (cat.dms || []).filter(id => this.storeService.getChannel(id));
			if (dms.length) {
				categories.push({
					id: cat.id,
					name: cat.name,
					color: cat.color,
					predefined: false,
					collapsed: cat.collapsed,
					dms
				});
			}
		}
		return categories;
	}
	_getPredefinedCategoryKey(channelId) {
		const channel = this.storeService.getChannel(channelId);
		if (!channel) return null;
		const type = channel.type;
		const recipients = channel.recipients || [];
		if (this.settings.enableMuted && this.storeService.isChannelMuted(channel.id)) {
			return "muted";
		}
		if (this.settings.enableActiveToday && this._wasActiveToday(channel)) {
			return "activeToday";
		}
		if (type === CHANNEL_TYPES.GROUP_DM && this.settings.enableGroups) {
			return "groups";
		}
		if (type === CHANNEL_TYPES.DM && recipients.length === 1) {
			const userId = recipients[0];
			if (this.settings.enableFriends && this.storeService.isFriend(userId)) {
				return "friends";
			}
			if (this.settings.enableBlocked && this.storeService.isBlocked(userId)) {
				return "blocked";
			}
			if (this.settings.enableBots) {
				const user = this.storeService.getUser(userId);
				if (user?.bot) return "bots";
			}
		}
		return null;
	}
	_wasActiveToday(channel) {
		const lastMessageId = this.storeService.getLastMessageId(channel.id);
		const ts = this._snowflakeToTimestamp(lastMessageId);
		if (!ts) return false;
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return ts >= today.getTime();
	}
	_snowflakeToTimestamp(id) {
		if (!id) return null;
		try {
			const snowflake = BigInt(id);
			const discordEpoch = 1420070400000n;
			const ms = (snowflake >> 22n) + discordEpoch;
			return Number(ms);
		} catch {
			return null;
		}
	}
	_getPinnedDmIdsForDmList() {
		const useRecent = this.settings.sortChannelListByRecent;
		const categories = this._getPinnedCategoriesWithDms();
		const seen = new Set();
		const allPinned = [];
		for (const cat of categories) {
			const dms = useRecent ? this._sortDmsByTime(cat.dms) : cat.dms;
			for (const id of dms) {
				if (!seen.has(id)) {
					seen.add(id);
					allPinned.push(id);
				}
			}
		}
		return allPinned;
	}
	_sortDmsByTime(dms) {
		return [...dms].sort((a, b) => {
			const aId = this.storeService.getLastMessageId(a) || "0";
			const bId = this.storeService.getLastMessageId(b) || "0";
			const aTime = this._snowflakeToTimestamp(aId) || 0;
			const bTime = this._snowflakeToTimestamp(bId) || 0;
			return bTime - aTime;
		});
	}
	//#endregion Category Helpers
	//#region Store Patching
	_patchStores() {
		const sortStore = this.storeService.getRawStore("PrivateChannelSortStore");
		if (sortStore?.getPrivateChannelIds) {
			this._originalGetPrivateChannelIds = sortStore.getPrivateChannelIds.bind(sortStore);
			const unpatch = Patcher.after(
				this.pluginName,
				sortStore,
				"getPrivateChannelIds",
				(_, _args, ret) => {
					try {
						return this._filterPinnedChannels(ret);
					} catch (err) {
						Logger.error(this.pluginName, "getPrivateChannelIds patch error", err);
						return ret;
					}
				}
			);
			this.patches.push(unpatch);
		}
		const readStore = this.storeService.getRawStore("PrivateChannelReadStateStore");
		if (readStore?.getUnreadPrivateChannelIds) {
			const unpatch = Patcher.after(
				this.pluginName,
				readStore,
				"getUnreadPrivateChannelIds",
				(_, _args, ret) => {
					try {
						const useRecent = this.settings.sortGuildListByRecent;
						const pinned = this.pins.guildList
							.filter(id => this.storeService.getChannel(id));
						if (!pinned.length) return ret;
						const sorted = useRecent ? this._sortDmsByTime(pinned) : pinned;
						const combined = [...sorted, ...ret];
						const seen = new Set();
						return combined.filter(id => {
							if (seen.has(id)) return false;
							seen.add(id);
							return true;
						});
					} catch (err) {
						Logger.error(this.pluginName, "getUnreadPrivateChannelIds patch error", err);
						return ret;
					}
				}
			);
			this.patches.push(unpatch);
		}
	}
	_filterPinnedChannels(ret) {
		if (!Array.isArray(ret)) return ret;
		const pinned = this._getPinnedDmIdsForDmList();
		if (!pinned.length) return ret;
		const categories = this._getPinnedCategoriesWithDms();
		const selectedId = this.storeService.getSelectedChannelId();
		const hiddenDms = this._getHiddenDms(categories, selectedId);
		const setPinned = new Set(pinned);
		const pinnedFiltered = pinned.filter(id => ret.includes(id) && !hiddenDms.has(id));
		const rest = ret.filter(id => !setPinned.has(id));
		return [...pinnedFiltered, ...rest];
	}
	_getHiddenDms(_categories, _selectedId) {
		return new Set();
	}
	//#endregion Store Patching
	//#region Component Patches
	_patchDmListReact() {
		try {
			if (!Webpack || typeof Webpack.getByStrings !== "function") {
				Logger.warn(this.pluginName, "Webpack.getByStrings not available");
				return;
			}
			const PrivateChannels = Webpack.getByStrings("getPrivateChannelIds", { defaultExport: false });
			if (!PrivateChannels || typeof PrivateChannels.Z !== "function") {
				Logger.warn(this.pluginName, "DM list module not found");
				return;
			}
			Logger.info(this.pluginName, "Patching DM list React component (light)");
			const unpatch = Patcher.after(
				this.pluginName,
				PrivateChannels,
				"Z",
				(_, __, returnValue) => {
					try {
						this._scheduleDomSync(0);
					} catch (err) {
						Logger.warn(this.pluginName, "DM list React patch callback error", err);
					}
					return returnValue;
				}
			);
			this.patches.push(unpatch);
		} catch (err) {
			Logger.warn(this.pluginName, "Failed to patch DM list via Webpack", err);
		}
	}
	_patchGuildDmComponent() {
		if (!this._running || this._guildDmPatched) return;
		let attemptCount = 0;
		const maxAttempts = 5;
		const attemptPatch = () => {
			if (!this._running || this._guildDmPatched) return;
			attemptCount++;
			const dmElement = document.querySelector(
				'[data-list-item-id^="guildsnav___"]:not([data-list-item-id="guildsnav___home"])'
			);
			if (!dmElement || !ReactUtils?.getOwnerInstance) {
				if (attemptCount < maxAttempts) {
					Logger.info(
						this.pluginName,
						`Guild DM element not ready, retrying (${attemptCount}/${maxAttempts})...`
					);
					setTimeout(attemptPatch, 2000);
				} else {
					Logger.warn(this.pluginName, "Guild DM element not found - guild DM patching skipped");
				}
				return;
			}
			const owner = ReactUtils.getOwnerInstance(dmElement, {
				filter: inst => inst?.props?.channel?.id && inst?.props?.channelName
			});
			if (!owner || !owner.constructor?.prototype?.render) {
				if (attemptCount < maxAttempts) {
					Logger.info(this.pluginName, "Guild DM owner instance not found, retrying...");
					setTimeout(attemptPatch, 500);
				}
				return;
			}
			const TargetComponent = owner.constructor;
			const unpatch = Patcher.after(
				this.pluginName,
				TargetComponent.prototype,
				"render",
				(instance, args, returnValue) => {
					try {
						if (returnValue) {
							this._processGuildDirectMessage(instance, returnValue);
						}
					} catch (err) {
						Logger.error(this.pluginName, "Guild DM render error", err);
					}
					return returnValue;
				}
			);
			this.patches.push(unpatch);
			this._guildDmPatched = true;
			Logger.info(this.pluginName, "Guild DM component patched via ReactUtils.getOwnerInstance");
		};
		setTimeout(attemptPatch, 100);
	}
	_processGuildDirectMessage(instance, returnValue) {
		const props = instance?.props;
		const channel = props?.channel;
		if (!channel?.id) return;
		const channelId = channel.id;
		const isPinned = this.isPinnedInGuildList(channelId);
		if (!isPinned) return;
		if (returnValue?.props) {
			returnValue.props.className = className(
				returnValue.props.className,
				"betterpindms-recent-pinned"
			);
		}
		if (!this.settings.guildListPinIcon || !findInTree) return;
		const badgeContainer = findInTree(
			returnValue,
			node => node?.props && ("upperBadge" in node.props || "lowerBadge" in node.props),
			{ walkable: ["props", "children"] }
		);
		if (badgeContainer?.props) {
			badgeContainer.props.upperBadge = React.createElement(
				"div",
				{
					className: "betterpindms-pinbadge",
					style: { transform: "scale(1, 1)" }
				},
				"📌"
			);
		}
	}
	/**
	 * Deep React patch:
	 * Patching the DM list owner instance's render, walk down two children layers,
	 * and then split the SectionList into [pre, pinned, unpinned] so that
	 * pinned DMs are shown above the "Direct Messages" section.
	 */
	_ensureDeepReactPatch(dmListElement) {
		try {
			if (!this._running || !dmListElement || !ReactUtils?.getOwnerInstance) return;
			const instance = ReactUtils.getOwnerInstance(dmListElement);
			if (!instance || instance._betterpindmsPatched) return;
			if (typeof instance.render !== "function") return;
			const origRender = instance.render.bind(instance);
			instance._betterpindmsPatched = true;
			instance._betterpindmsOriginalRender = origRender;
			instance._betterpindmsPlugin = this;
			this._dmInstances.add(instance);
			instance.render = this._dmListRenderWrapperNested;
			if (typeof instance.forceUpdate === "function") {
				instance.forceUpdate();
			}
			Logger.info(this.pluginName, "Deep React patch applied to DM list instance");
		} catch (err) {
			Logger.warn(this.pluginName, "Failed to apply deep React patch", err);
		}
	}
	_dmListRenderWrapperNested(...args) {
		const originalRender = this._betterpindmsOriginalRender;
		const plugin = this._betterpindmsPlugin;
		if (!originalRender) return null;
		if (!plugin) return originalRender(...args);
		const originalChannelIds = Array.isArray(this.props?.privateChannelIds)
			? [...this.props.privateChannelIds]
			: [];
		const returnValue = originalRender(...args);
		try {
			if (returnValue?.props?.children && typeof returnValue.props.children === "function") {
				const originalChildrenFunc = returnValue.props.children;
				if (!originalChildrenFunc.__betterpindmsPatched) {
					returnValue.props.children = (props) => {
						const childrenResult = originalChildrenFunc(props);
						if (childrenResult?.props?.children && typeof childrenResult.props.children === "function") {
							const originalChildrenFunc2 = childrenResult.props.children;
							if (!originalChildrenFunc2.__betterpindmsPatched) {
								childrenResult.props.children = (props2) => {
									const childrenResult2 = originalChildrenFunc2(props2);
									let targetElement = childrenResult2;
									if (!targetElement?.props?.sections && findInTree) {
										const found = findInTree(
											childrenResult2,
											prop =>
												prop &&
												prop.props &&
												Array.isArray(prop.props.sections) &&
												typeof prop.props.renderRow === "function" &&
												typeof prop.props.renderSection === "function",
											{ walkable: ["props", "children"] }
										);
										if (found) targetElement = found;
									}
									if (targetElement?.props?.sections) {
										plugin._applyPinnedSectionSplit(this, targetElement, originalChannelIds);
									}
									return childrenResult2;
								};
								childrenResult.props.children.__betterpindmsPatched = true;
							}
						}
						return childrenResult;
					};
					returnValue.props.children.__betterpindmsPatched = true;
				}
			}
		} catch (err) {
			const pluginName = plugin?.pluginName || "BetterPinDMs";
			Logger.warn(pluginName, "Deep DM list patch error in render", err);
		}
		return returnValue;
	}
	_applyPinnedSectionSplit(instance, sectionElement, originalChannelIds) {
		try {
			const props = sectionElement?.props;
			if (!props || props._betterpindmsPatched) return;
			if (!Array.isArray(props.sections) || props.sections.length < 2) return;
			if (typeof props.renderSection !== "function" || typeof props.renderRow !== "function") return;
			const sections = props.sections;
			const allNumbers = sections.every(s => typeof s === "number");
			if (!allNumbers) {
				Logger?.debug?.(
					this.pluginName,
					"SectionList sections are not numeric; skipping pinned split",
					sections
				);
				return;
			}
			let channelIds = [];
			if (Array.isArray(instance.props?.privateChannelIds)) {
				channelIds = [...instance.props.privateChannelIds];
			} else if (Array.isArray(originalChannelIds)) {
				channelIds = [...originalChannelIds];
			}
			if (!channelIds.length) return;
			const allPinned = this._getPinnedDmIdsForDmList();
			if (!allPinned.length) return;
			const categories = this._getPinnedCategoriesWithDms();
			const selectedId = this.storeService.getSelectedChannelId();
			const hiddenDms = this._getHiddenDms(categories, selectedId);
			const pinnedVisible = allPinned.filter(id => channelIds.includes(id) && !hiddenDms.has(id));
			const originalSections = [...sections];
			const totalDmCount = originalSections[1];
			if (!Number.isFinite(totalDmCount) || totalDmCount <= 0) return;
			const pinnedCount = Math.min(pinnedVisible.length, totalDmCount);
			if (!pinnedCount) return;
			const unpinnedCount = Math.max(totalDmCount - pinnedCount, 0);
			props.sections = [
				originalSections[0],
				pinnedCount,
				unpinnedCount
			];
			const originalRenderSection = props.renderSection;
			const originalRenderRow = props.renderRow;
			props.renderSection = (data) => {
				if (data.section === 1) return null;
				return originalRenderSection(data);
			};
			props.renderRow = (data) => {
				if (data.section === 2) {
					return originalRenderRow({
						...data,
						section: 1,
						row: data.row + pinnedCount
					});
				}
				return originalRenderRow(data);
			};
			props._betterpindmsPatched = true;
			Logger?.debug?.(this.pluginName, "Pinned section split applied", { pinnedCount, totalDmCount });
		} catch (err) {
			Logger.warn(this.pluginName, "Failed to apply pinned section split", err);
		}
	}
	//#endregion Component Patches
	//#region Context Menus
	_patchContextMenus() {
		const patch = (tree, props) => {
			try {
				if (!tree || !props?.channel) return;
				const channel = props.channel;
				if (channel.type !== CHANNEL_TYPES.DM && channel.type !== CHANNEL_TYPES.GROUP_DM) return;
				this._injectContextSubmenu(tree, channel.id);
			} catch (err) {
				Logger.error(this.pluginName, "Context menu patch error", err);
			}
		};
		try {
			this.patches.push(
				ContextMenu.patch("user-context", patch),
				ContextMenu.patch("gdm-context", patch)
			);
		} catch (err) {
			Logger.warn(this.pluginName, "Failed to patch context menus", err);
		}
	}
	_injectContextSubmenu(tree, channelId) {
		let children = tree.props.children;
		if (!Array.isArray(children)) {
			children = tree.props.children = [children].filter(Boolean);
		}
		const currentCategory = this.getCategoryForDm(channelId);
		const categories = this.getCustomCategoriesSorted();
		const pinnedInGuild = this.isPinnedInGuildList(channelId);
		const dmListItems = this._buildDmListItems(channelId, currentCategory, categories);
		const submenu = ContextMenu.buildItem({
			type: "submenu",
			label: "BetterPinDMs",
			items: [
				{
					type: "submenu",
					label: "Categories",
					items: dmListItems
				},
				{ type: "separator" },
				{
					type: "text",
					label: pinnedInGuild ? "Unpin from server list" : "Pin to server list",
					danger: pinnedInGuild,
					action: () => {
						if (pinnedInGuild) {
							this.unpinInGuildList(channelId);
						} else {
							this.pinInGuildList(channelId);
						}
					}
				}
			]
		});
		children.push(submenu);
	}
	_buildDmListItems(channelId, currentCategory, categories) {
		const dmListItems = [];
		if (currentCategory) {
			dmListItems.push({
				type: "text",
				label: `Remove from "${currentCategory.name}"`,
				danger: true,
				action: () => {
					this.removeDmFromAnyCategory(channelId);
					UI.showToast("DM unpinned", { type: "info" });
				}
			});
		} else {
			dmListItems.push({
				type: "text",
				label: "Add to new category...",
				action: () => {
					const existing = this.getCustomCategoriesSorted();
					const defaultName = `Pinned DMs #${existing.length + 1}`;
					this.uiManager.showCategoryCreateModal(defaultName, (name, color) => {
						const cat = this.createCategory({ name, color });
						this.addDmToCategory(channelId, cat.id);
						UI.showToast(`Added to "${cat.name}"`, { type: "info" });
					});
				}
			});
		}
		if (categories.length) {
			dmListItems.push({ type: "separator" });
			for (const cat of categories) {
				const isCurrent = currentCategory?.id === cat.id;
				dmListItems.push({
					type: "text",
					label: isCurrent ? `● ${cat.name}` : cat.name,
					disabled: isCurrent,
					action: () => {
						this.addDmToCategory(channelId, cat.id);
						UI.showToast(`Pinned to "${cat.name}"`, { type: "info" });
					}
				});
			}
		}
		return dmListItems;
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
		const currentCat = this.getCategoryForDm(channelId);
		if (currentCat) {
			this.removeDmFromAnyCategory(channelId);
			UI.showToast("DM unpinned", { type: "info" });
		} else {
			const categories = this.getCustomCategoriesSorted();
			if (categories.length) {
				this.addDmToCategory(channelId, categories[0].id);
				UI.showToast(`Pinned to "${categories[0].name}"`, { type: "info" });
			}
		}
	}
	showQuickCategoryPicker() {
		const channelId = this.storeService.getSelectedChannelId();
		if (!channelId) return;
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
	//#region DOM Management
	_getDmListElement() {
		if (this._dmList && document.documentElement.contains(this._dmList)) {
			return this._dmList;
		}
		const dmAnchorSelector =
			'a[href^="/channels/@me/"][data-list-item-id^="private-channels-uid_"]';
		const lists = document.querySelectorAll('ul[role="list"]');
		for (const ul of lists) {
			if (ul.querySelector(dmAnchorSelector)) {
				this._dmList = ul;
				return ul;
			}
		}
		const dmLink =
			document.querySelector(dmAnchorSelector) ||
			document.querySelector('a[href^="/channels/@me/"]');
		if (dmLink) {
			const ul = dmLink.closest('ul[role="list"]');
			if (ul) {
				this._dmList = ul;
				return ul;
			}
		}
		return null;
	}
	_scheduleDomSync(delay = TIMEOUTS.DOM_SYNC_DEBOUNCE) {
		if (!this._running) return;
		if (delay <= TIMEOUTS.DOM_SYNC_DEBOUNCE) {
			this._syncDomDebounced();
		} else {
			setTimeout(() => this._syncDomDebounced(), delay - TIMEOUTS.DOM_SYNC_DEBOUNCE);
		}
	}
	_syncPinnedUiWithDom() {
		if (!this._running) return;
		try {
			this._injectCategoryHeaders();
			this._addDragHandlersToDmRows();
			this._updateCategoryCollapsedStateOnRows();
		} catch (err) {
			Logger.warn(this.pluginName, "Failed to sync pinned DM UI with DOM", err);
		}
	}
	_injectCategoryHeaders() {
		const dmList = this._getDmListElement();
		if (!dmList) {
			if (!this._running) return;
			setTimeout(() => this._injectCategoryHeaders(), TIMEOUTS.HEADER_RETRY);
			return;
		}
		this._ensureDeepReactPatch(dmList);
		const categories = this._getPinnedCategoriesWithDms();
		const activeIds = new Set(categories.map(c => c.id));
		const existingHeaders = dmList.querySelectorAll(".betterpindms-category-header");
		for (const el of existingHeaders) {
			if (!activeIds.has(el.dataset.categoryId)) {
				this.uiManager.removeHeader(el);
			}
		}
		this._insertCategoryHeaders(dmList, categories);
	}
	_insertCategoryHeaders(dmList, categories) {
		let previousHeader = null;
		const dragHandlers = this.dragDropManager.getCategoryDragHandlers();
		const callbacks = {
			onToggleCollapse: (id) => this.toggleCategoryCollapse(id),
			onContextMenu: (e, cat) => this._showCategoryContextMenu(e, cat),
			...dragHandlers
		};
		for (const [index, category] of categories.entries()) {
			let container = dmList.querySelector(`.betterpindms-category-header[data-category-id="${category.id}"]`);
			if (!container) {
				container = document.createElement("div");
				container.className = "betterpindms-category-header";
				container.dataset.categoryId = category.id;
			}
			this.uiManager.renderCategoryHeader(container, category, callbacks);
			if (index === 0) {
				this._insertFirstCategoryHeader(dmList, container);
			} else if (previousHeader?.parentNode) {
				this._insertSubsequentCategoryHeader(dmList, container, categories[index - 1], previousHeader);
			}
			previousHeader = container;
		}
	}
	_insertFirstCategoryHeader(dmList, header) {
		const allPinnedIds = this._getPinnedDmIdsForDmList();
		let inserted = false;
		for (const dmId of allPinnedIds) {
			const dmRow = this._findDmRow(dmList, dmId);
			if (dmRow) {
				if (dmRow.previousSibling !== header) {
					dmRow.parentNode.insertBefore(header, dmRow);
				}
				inserted = true;
				break;
			}
		}
		if (!inserted) {
			const allDmLinks = dmList.querySelectorAll('a[href^="/channels/@me/"]');
			if (allDmLinks.length) {
				const firstRow = allDmLinks[0].closest("li");
				if (firstRow && firstRow.parentNode) {
					if (firstRow.previousSibling !== header) {
						firstRow.parentNode.insertBefore(header, firstRow);
					}
				}
			}
		}
	}
	_insertSubsequentCategoryHeader(dmList, header, prevCategory, previousHeader) {
		let insertAfter = previousHeader;
		for (const dmId of prevCategory.dms) {
			const dmRow = this._findDmRow(dmList, dmId);
			if (dmRow && dmRow.parentNode === dmList) {
				insertAfter = dmRow;
			}
		}
		if (insertAfter.nextSibling) {
			if (insertAfter.nextSibling !== header) {
				insertAfter.parentNode.insertBefore(header, insertAfter.nextSibling);
			}
		} else if (insertAfter.parentNode.lastChild !== header) {
			insertAfter.parentNode.appendChild(header);
		}
	}
	_findDmRow(dmList, dmId) {
		const dmLink = dmList.querySelector(`a[href="/channels/@me/${dmId}"]`);
		return dmLink?.closest("li") || null;
	}
	_addDragHandlersToDmRows() {
		if (!this._running) return;
		const dmLinks = document.querySelectorAll('a[href^="/channels/@me/"]');
		const rows = [];
		const pinnedIds = new Set(this._getPinnedDmIdsForDmList());
		let lastPinnedRow = null;
		for (const link of dmLinks) {
			const row = link.closest("li");
			if (!row) continue;
			rows.push(row);
			const href = link.getAttribute("href");
			const channelId = href?.split("/").pop();
			if (channelId && pinnedIds.has(channelId)) {
				lastPinnedRow = row;
			}
		}
		this.dragDropManager.attachToDmRows(rows);
		for (const el of document.querySelectorAll(".betterpindms-last-pinned")) {
			el.classList.remove("betterpindms-last-pinned");
		}
		if (lastPinnedRow) {
			lastPinnedRow.classList.add("betterpindms-last-pinned");
		}
	}
	_updateCategoryCollapsedStateOnRows() {
		if (!this._running) return;
		const categories = this._getPinnedCategoriesWithDms();
		const dmToCategory = new Map();
		const collapsedIds = new Set();
		for (const cat of categories) {
			if (cat.collapsed) collapsedIds.add(cat.id);
			for (const id of cat.dms) {
				dmToCategory.set(id, cat.id);
			}
		}
		const dmLinks = document.querySelectorAll('a[href^="/channels/@me/"]');
		for (const link of dmLinks) {
			const row = link.closest("li");
			if (!row) continue;
			const href = link.getAttribute("href");
			const channelId = href?.split("/").pop();
			if (!channelId) continue;
			const catId = dmToCategory.get(channelId);
			if (catId) {
				row.classList.add("betterpindms-category-dm");
				row.dataset.betterpindmsCatId = catId;
				const isSelected = !!row.querySelector('[aria-selected="true"]');
				if (collapsedIds.has(catId) && !isSelected) {
					row.classList.add("betterpindms-category-dm-collapsed");
				} else {
					row.classList.remove("betterpindms-category-dm-collapsed");
				}
			} else {
				row.classList.remove("betterpindms-category-dm", "betterpindms-category-dm-collapsed");
				delete row.dataset.betterpindmsCatId;
			}
		}
	}
	_ensureHeaderInterval() {
		if (this._headerInterval) return;
		this._headerInterval = setInterval(() => {
			if (!this._running) return;
			try {
				const dmList = this._getDmListElement();
				if (!dmList) return;
				const categories = this._getPinnedCategoriesWithDms();
				if (!categories || !categories.length) return;
				const hasHeaders = document.querySelector(".betterpindms-category-header");
				if (hasHeaders) return;
				this._injectCategoryHeaders();
				this._addDragHandlersToDmRows();
			} catch (err) {
				Logger.warn(this.pluginName, "Header interval error", err);
			}
		}, TIMEOUTS.HEADER_HEALTH_INTERVAL);
	}
	//#endregion DOM Management
	//#region Update Methods
	_flushPendingUpdates() {
		if (!this._running || !this._updatePending) return;
		const pending = this._updatePending;
		this._updatePending = null;
		if (pending.dmList) this._forceDmListUpdate();
		if (pending.guildRecents) this._forceGuildRecentsUpdate();
		if (pending.dom) this._scheduleDomSync();
	}
	forceUpdate(updates = {}) {
		if (!this._running) return;
		const defaults = { dmList: true, guildRecents: true, dom: true };
		const { dmList, guildRecents, dom, immediate } = Object.assign(defaults, updates);
		if (immediate) {
			if (dmList) this._forceDmListUpdate();
			if (guildRecents) this._forceGuildRecentsUpdate();
			if (dom) this._scheduleDomSync();
			return;
		}
		if (this._updatePending) {
			this._updatePending.dmList ||= dmList;
			this._updatePending.guildRecents ||= guildRecents;
			this._updatePending.dom ||= dom;
		} else {
			this._updatePending = { dmList, guildRecents, dom };
		}
		this._flushUpdatesDebounced();
	}
	_forceDmListUpdate() {
		try {
			this.storeService.emitPrivateChannelSortChange();
		} catch (err) {
			Logger.warn(this.pluginName, "Could not trigger DM list update", err);
		}
		this._scheduleDomSync(TIMEOUTS.DM_LIST_RESYNC);
	}
	_forceGuildRecentsUpdate() {
		try {
			this.storeService.emitPrivateChannelReadStateChange();
		} catch (err) {
			Logger.warn(this.pluginName, "Could not trigger guild recents update", err);
		}
	}
	//#endregion Update Methods
	//#region Import/Export & PinDMs Compatibility
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
		return (
			"#" +
			[clamp(r), clamp(g), clamp(b)]
				.map(v => v.toString(16).padStart(2, "0"))
				.join("")
		);
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
				friends: {
					enabled: !!s.enableFriends,
					collapsed: !!collapsed.friends
				},
				blocked: {
					enabled: !!s.enableBlocked,
					collapsed: !!collapsed.blocked
				},
				bots: {
					enabled: !!s.enableBots,
					collapsed: !!collapsed.bots
				},
				groups: {
					enabled: !!s.enableGroups,
					collapsed: !!collapsed.groups
				}
			},
			smartCategories: {
				activeToday: {
					enabled: !!s.enableActiveToday,
					collapsed: !!collapsed.activeToday
				},
				muted: {
					enabled: !!s.enableMuted,
					collapsed: !!collapsed.muted
				}
			},
			recentOrder: {
				channelList: !!s.sortChannelListByRecent,
				guildList: !!s.sortGuildListByRecent
			}
		};
	}
	_buildPinDmsPinnedObject() {
		const userId =
			this.storeService?.getCurrentUserId?.() ||
			this.storeService?.getUser?.()?.id ||
			"0";
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
		const pinnedForUser = { channelList };
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
		const channelList = (pinnedForUser && pinnedForUser.channelList) || {};
		const custom = {};
		let fallbackPos = 0;
		for (const [id, cat] of Object.entries(channelList)) {
			if (!cat || typeof cat !== "object") continue;
			const hex = this._rgbaToHex(cat.color);
			custom[id] = {
				id: cat.id || id,
				name: cat.name || `Pinned DMs #${fallbackPos + 1}`,
				color: hex,
				pos: typeof cat.pos === "number" ? cat.pos : fallbackPos++,
				collapsed: !!cat.collapsed,
				dms: Array.isArray(cat.dms) ? [...cat.dms] : []
			};
		}
		this.categories = { custom };
		const guildList = Array.isArray(pinnedForUser?.guildList)
			? [...pinnedForUser.guildList]
			: [];
		this.pins = { channelList: [], guildList };
	}
	_importFromLegacyConfig(config) {
		if (!config.version || !config.categories || !config.settings) {
			throw new Error("Invalid configuration file");
		}
		this.settings = { ...this.settings, ...config.settings };
		this.categories = config.categories;
		this.pins = config.pins || { channelList: [], guildList: [] };
	}
	//#endregion Import/Export & PinDMs Compatibility
	//#region Import/Export
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
			UI.showToast("Configuration exported (PinDMs-compatible)", {
				type: "success"
			});
		} catch (err) {
			Logger.error(this.pluginName, "Export config failed", err);
			UI.showToast("Failed to export configuration", {
				type: "error"
			});
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
				if (config && config.all) {
					this._importFromPinDmsConfig(config);
				} else {
					this._importFromLegacyConfig(config);
				}
				this.saveSettings();
				this.saveCategories();
				this.savePins();
				this.forceUpdate({ immediate: true });
				if (this.uiManager?.settingsPanelRefresh) {
					this.uiManager.settingsPanelRefresh();
				}
				UI.showToast("Configuration imported successfully", {
					type: "success"
				});
			} catch (err) {
				Logger.error(this.pluginName, "Import config failed", err);
				UI.showToast("Failed to import configuration", {
					type: "error"
				});
			}
		};
		input.click();
	}
	//#endregion Import/Export
	//#region Styles
	_injectStyles() {
		DOM.addStyle(CONFIG.cssId, `
	/* Custom Categories in settings */
	.betterpindms-customcategories { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
	.betterpindms-customcategories-header { font-size: 14px; font-weight: 600; color: var(--header-primary); margin-bottom: 4px; }
	.betterpindms-customcategories-hint { color: var(--text-default); font-size: 12px; opacity: 0.7; margin-bottom: 8px; }
	.betterpindms-customcategories-addbtn { padding: 8px 12px; cursor: pointer; background-color: var(--button-secondary-background); color: var(--text-default); border: none; border-radius: 4px; margin-top: 8px; }
	.betterpindms-customcategories-addbtn:hover { background-color: var(--button-secondary-background-hover); }
	.betterpindms-category-row { display: flex; align-items: center; gap: 8px; padding: 8px; background-color: var(--background-secondary-alt); border-radius: 4px; }
	.betterpindms-category-color-input { width: 32px; height: 32px; cursor: pointer; border: none; border-radius: 4px; background: transparent; }
	.betterpindms-category-name-input { flex: 1; padding: 6px 8px; background-color: var(--input-background); color: var(--text-default); border: 1px solid var(--input-border); border-radius: 4px; font-size: 14px; }
	.betterpindms-category-movebtn { padding: 4px 8px; cursor: pointer; border-radius: 3px; border: none; background: var(--button-secondary-background); color: var(--text-default); }
	.betterpindms-category-movebtn:disabled { cursor: not-allowed; opacity: 0.5; }
	.betterpindms-category-deletebtn { padding: 4px 8px; border: none; border-radius: 3px; color: var(--status-danger); background: transparent; cursor: pointer; }
	.betterpindms-category-deletebtn:hover { background-color: var(--background-secondary); }
	/* Actions section */
	.betterpindms-actions { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
	.betterpindms-actions-header { font-size: 14px; font-weight: 600; color: var(--header-primary); margin-bottom: 8px; }
	.betterpindms-actions-button { padding: 8px 12px; cursor: pointer; background-color: var(--button-secondary-background); color: var(--text-default); border: none; border-radius: 4px; }
	.betterpindms-actions-button:hover { background-color: var(--button-secondary-background-hover); }
	.betterpindms-actions-button-danger { background-color: var(--status-danger); color: #fff; margin-top: 8px; }
	.betterpindms-actions-button-danger:hover { filter: brightness(1.05); }
	/* Shortcuts section */
	.betterpindms-shortcuts { margin-top: 16px; }
	.betterpindms-shortcuts-header { font-size: 14px; font-weight: 600; color: var(--header-primary); margin-bottom: 8px; }
	.betterpindms-shortcuts-list { color: var(--text-default); display: flex; flex-direction: column; gap: 4px; font-size: 12px; opacity: 0.85; }
	.betterpindms-shortcuts-kbd { background: var(--background-secondary); padding: 2px 6px; border-radius: 3px; font-family: monospace; font-size: 11px; margin-right: 4px; }
	/* Input modal field */
	.betterpindms-input-modal-field { width: 100%; padding: 8px; background-color: var(--input-background); color: var(--text-default); border: 1px solid var(--input-border); border-radius: 4px; margin-top: 8px; font-size: 14px; }
	/* Modal sections */
	.betterpindms-modal-editor { display: flex; flex-direction: column; gap: 12px; }
	.betterpindms-modal-section { display: block; }
	.betterpindms-modal-label { display: block; margin-bottom: 4px; font-size: 12px; font-weight: 600; color: var(--header-secondary); }
	.betterpindms-modal-input { width: 100%; padding: 8px; background-color: var(--input-background); color: var(--text-default); border: 1px solid var(--input-border); border-radius: 4px; font-size: 14px; }
	/* Category headers outer container in DM list */
	.betterpindms-category-header { margin: 8px 8px 4px 8px; border-radius: 4px; }
	.betterpindms-category-header:hover { filter: brightness(1.1); }
	/* Category header inner layout */
	.betterpindms-category-header-inner { background-color: var(--background-secondary); padding: 4px 8px; display: flex; align-items: center; gap: 4px; user-select: none; border-radius: 4px; }
	.betterpindms-category-header-inner-static { cursor: pointer; }
	.betterpindms-category-header-inner-draggable { cursor: grab; padding: inherit; }
	.betterpindms-category-header-dragging .betterpindms-category-header-inner, .betterpindms-category-header-inner.betterpindms-category-header-dragging { opacity: 0.5; cursor: grabbing; }
	.betterpindms-category-header-dragover .betterpindms-category-header-inner, .betterpindms-category-header-inner.betterpindms-category-header-dragover { border-top: 3px solid var(--brand-500); }
	.betterpindms-category-arrow { margin-left: auto; display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; color: var(--interactive-normal); pointer-events: none; }
	.betterpindms-category-arrow-icon { transition: transform 0.2s ease; }
	.betterpindms-category-arrow-icon.betterpindms-category-arrow-collapsed { transform: rotate(-90deg); }
	.betterpindms-category-arrow-icon.betterpindms-category-arrow-expanded { transform: rotate(0deg); }
	.betterpindms-category-pin { font-size: 12px; margin-right: -4px; opacity: 0.7; }
	.betterpindms-category-name { font-weight: 600; font-size: 12px; text-transform: uppercase; flex: 1; pointer-events: none; }
	.betterpindms-category-unread { background-color: #f04747; color: #fff; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 600; margin-left: 4px; }
	.betterpindms-category-count { background-color: var(--background-accent); color: #fff; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 600; margin-left: 4px; }
	/* DM row drag states */
	.betterpindms-dm-row-draggable { cursor: grab; }
	.betterpindms-dm-row-dragging { opacity: 0.5; cursor: grabbing; }
	.betterpindms-dm-row-dragover { border-top: 2px solid var(--brand-500); }
	.betterpindms-last-pinned { margin-bottom: 10px; }
	/* Category DM slide animation */
	.betterpindms-category-dm { overflow: hidden; max-height: 40px; transition: max-height 0.18s ease, opacity 0.18s ease, transform 0.18s ease; }
	.betterpindms-category-dm-collapsed { max-height: 0; opacity: 0; transform: translateY(-4px); pointer-events: none; }
	/* Server-list "Recent DMs" pinned state */
	.betterpindms-recent-pinned { position: relative; }
	/* Pin badge shown on the DM avatar in the server list */
	.betterpindms-pinbadge { display: flex; align-items: center; justify-content: center; font-size: 11px; line-height: 1; pointer-events: none; }
		`);
	}
	//#endregion Styles	
};
//#endregion Main Plugin
/*@end@*/
