/**
 * @name BetterServerDetails
 * @author Pharaoh2k
 * @description Shows Server Details (owner, creation/join date, members, etc.) in a custom tooltip on the server list.
 * @version 1.0.2
 * @authorId 874825550408089610
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterServerDetails/BetterServerDetails.plugin.js
 */
/* BdApi based & BDFDB-free. Inspired by mwittrien / Devilbro's "ServerDetails" */
/*
Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
"use strict";
//#region Configuration
const CONFIG = {
	cssId: "serverdetails-plugin-style",
	defaultSettings: {
		onlyShowOnShift: false,
		showIcon: true,
		showOwner: true,
		showCreationDate: true,
		showJoinDate: true,
		showMembers: true,
		showChannels: true,
		showRoles: true,
		showBoosts: true,
		showLanguage: true,
		tooltipDelay: 0,
		tooltipWidth: 300,
		tooltipColor: "",
		accentColor: "#5865f2",
		showIcons: true,
		rowSpacing: 8,
		includeTime: false,
		dateLocale: "",
		hideNativeTooltip: false,
		autoUpdate: true
	}
};
const TIMEOUTS = {
	DEBOUNCE: 150
};
//#endregion Configuration
//#region BdApi Destructuring & Utils
const { React, ReactDOM, UI, DOM, Data, Webpack, Logger, Utils } = BdApi;
const { debounce } = Utils;
//#endregion BdApi Destructuring
//#region Updater
class UpdateManager {
	constructor(pluginName, version, github = "Pharaoh2k/BetterDiscordStuff") {
		this.name = pluginName;
		this.version = version;
		const [user, repo] = github.split('/');
		this.urls = {
			plugin: `https://raw.githubusercontent.com/${user}/${repo}/refs/heads/main/Plugins/${pluginName}/${pluginName}.plugin.js`,
			changelog: `https://raw.githubusercontent.com/${user}/${repo}/refs/heads/main/Plugins/${pluginName}/CHANGELOG.md`
		};
		this.timer = null;
		this.notification = null;
	}
	async start(autoUpdate = true) {
		if (autoUpdate) {
			setTimeout(() => this.check(true), 15000);
			this.timer = setInterval(() => this.check(true), 24 * 60 * 60 * 1000);
		}
		this.showChangelog();
	}
	stop() {
		clearInterval(this.timer);
		if (typeof this.notification === "function") this.notification();
		else this.notification?.close?.();
		this.notification = null;
	}
	async check(silent = false) {
		try {
			const res = await BdApi.Net.fetch(this.urls.plugin);
			if (res.status !== 200) throw new Error("Failed");
			const text = await res.text();
			const version = text.match(/@version\s+([\d.]+)/)?.[1];
			if (!version) throw new Error("No version");
			if (this.isNewer(version)) {
				this.showUpdateNotice(version, text);
			} else if (!silent) {
				BdApi.UI.showToast(`[${this.name}] You're up to date.`, { type: 'info' });
			}
		} catch (e) {
			BdApi.Logger.error(this.name, "Update check failed:", e);
			if (!silent) BdApi.UI.showToast(`[${this.name}] Update check failed`, { type: 'error' });
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
			require('fs').writeFileSync(__filename, text);
			BdApi.UI.showToast(`Updated to v${version}. Reloading...`, { type: 'success' });
			setTimeout(() => {
				try {
					BdApi.Plugins.reload(this.name);
				} catch {
					BdApi.UI.showToast('Please reload Discord (Ctrl+R)', { type: 'info', timeout: 0 });
				}
			}, 100);
		} catch (e) {
			BdApi.Logger.error(this.name, "Update failed:", e);
			BdApi.UI.showToast('Update failed', { type: 'error' });
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
	isNewer(v1, v2 = this.version) {
		return Utils.semverCompare(v2, v1) === 1;
	}
}
//#endregion Updater
//#region Discord Store Service
class DiscordStoreService {
	constructor() {
		this.stores = {};
		this._initialized = false;
	}
	init() {
		if (!this._initialized) {
			const storeNames = [
				"UserStore",
				"GuildStore",
				"GuildMemberStore",
				"GuildChannelStore",
				"GuildMemberCountStore",
				"GuildRoleStore"
			];
			for (const name of storeNames) {
				this.stores[name] = Webpack.getStore(name);
				if (!this.stores[name]) Logger?.warn?.("BetterServerDetails", `Store not found: ${name}`);
			}
			this._initialized = true;
		}
		return true;
	}
	getUser(id) { return this._getFromStore("UserStore", "getUser", id); }
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
	getGuild(id) { return this._getFromStore("GuildStore", "getGuild", id); }
	getGuildRoles(guildId) {
		try {
			const roleStore = this.stores.GuildRoleStore;
			if (roleStore?.getSortedRoles) {
				const res = roleStore.getSortedRoles(guildId) || [];
				if (Array.isArray(res)) return res;
				if (res && typeof res === "object") return Object.values(res);
			}
		} catch (err) {
			Logger?.warn?.("BetterServerDetails", "Store call failed: GuildRoleStore.getSortedRoles", err);
		}
		return [];
	}
	getGuildMember(guildId, userId) { return this._getFromStore("GuildMemberStore", "getMember", guildId, userId); }
	getGuildMemberCount(guildId) {
		try {
			const store = this.stores.GuildMemberCountStore;
			if (store?.getMemberCount) {
				const count = store.getMemberCount(guildId);
				if (typeof count === "number") return count;
			}
		} catch (err) {
			Logger?.warn?.("BetterServerDetails", "Store call failed: GuildMemberCountStore.getMemberCount", err);
		}
		const guild = this.getGuild(guildId);
		return (
			guild?.memberCount ??
			guild?.member_count ??
			guild?.approximateMemberCount ??
			guild?.approximate_member_count ??
			null
		);
	}
	getGuildChannelCount(guildId) {
		try {
			const store = this.stores.GuildChannelStore;
			if (!store) return null;
			if (typeof store.getChannels === "function") {
				const res = store.getChannels(guildId);
				if (res && typeof res.count === "number") return res.count;
				if (Array.isArray(res)) return res.length;
				if (res && typeof res === "object") {
					let total = 0;
					for (const key in res) {
						if (Array.isArray(res[key])) total += res[key].length;
					}
					if (total > 0) return total;
				}
			}
			const guild = this.getGuild(guildId);
			if (guild?.channels && Array.isArray(guild.channels)) return guild.channels.length;
		} catch (err) {
			Logger?.warn?.("BetterServerDetails", "GuildChannelStore access failed", err);
		}
		return null;
	}
	_getFromStore(storeName, methodName, ...args) {
		try {
			const store = this.stores[storeName];
			if (!store || typeof store[methodName] !== "function") return null;
			return store[methodName](...args);
		} catch (err) {
			Logger?.warn?.("BetterServerDetails", `Store call failed: ${storeName}.${methodName}`, err);
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
		this.SettingsPanelComponent = this._SettingsPanelComponent.bind(this);
	}
	renderSettingsPanel() {
		const panel = document.createElement("div");
		const root = ReactDOM.createRoot(panel);
		panel._pluginRoot = root;
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
					{ type: "switch", id: "onlyShowOnShift", name: "Only show tooltip while holding Shift", note: "When enabled, the server details tooltip will only appear while Shift is pressed.", value: settings.onlyShowOnShift }
				]
			},
			{
				type: "category",
				id: "items",
				name: "Tooltip items",
				collapsible: true,
				shown: true,
				settings: [
					{ type: "switch", id: "showIcon", name: "Server icon", value: settings.showIcon },
					{ type: "switch", id: "showOwner", name: "Owner", value: settings.showOwner },
					{ type: "switch", id: "showCreationDate", name: "Creation date", value: settings.showCreationDate },
					{ type: "switch", id: "showJoinDate", name: "Join date", value: settings.showJoinDate },
					{ type: "switch", id: "showMembers", name: "Member count", value: settings.showMembers },
					{ type: "switch", id: "showChannels", name: "Channel count", value: settings.showChannels },
					{ type: "switch", id: "showRoles", name: "Role count", value: settings.showRoles },
					{ type: "switch", id: "showBoosts", name: "Boosts", value: settings.showBoosts },
					{ type: "switch", id: "showLanguage", name: "Language", value: settings.showLanguage }
				]
			},
			{
				type: "category",
				id: "styling",
				name: "Modern Minimalist Styling",
				collapsible: true,
				shown: true,
				settings: [
					{ type: "color", id: "accentColor", name: "Accent color", note: "Color for borders, icon glow, and visual accents", value: settings.accentColor || "#5865f2", defaultValue: "#5865f2", inline: true },
					{ type: "switch", id: "showIcons", name: "Show row icons", note: "Display emoji icons next to each data field", value: settings.showIcons ?? true },
					{ type: "slider", id: "rowSpacing", name: "Row spacing", note: "Space between each row in pixels.", value: settings.rowSpacing ?? 8, min: 0, max: 20, step: 1, markers: [0, 4, 8, 12, 16, 20] }
				]
			},
			{
				type: "category",
				id: "display",
				name: "Tooltip display",
				collapsible: true,
				shown: true,
				settings: [
					{ type: "slider", id: "tooltipWidth", name: "Tooltip width", note: "Width of the tooltip in pixels.", value: settings.tooltipWidth, min: 200, max: 600, step: 10, markers: true },
					{ type: "slider", id: "tooltipDelay", name: "Tooltip delay", note: "Delay before the tooltip appears (in seconds).", value: settings.tooltipDelay, min: 0, max: 10, step: 0.1, markers: true },
					{ type: "switch", id: "hideNativeTooltip", name: "Hide native tooltip while custom tooltip is visible", note: "When enabled, Discord's built-in tooltips are hidden while this plugin's tooltip is shown.", value: settings.hideNativeTooltip },
					{ type: "switch", id: "includeTime", name: "Include time in dates", note: "Adds HH:MM to creation and join dates.", value: settings.includeTime },
					{ type: "textbox", id: "dateLocale", name: "Date locale override", note: "Examples: en-US, de-DE. Leave empty to use your system/Discord locale.", value: settings.dateLocale },
					{ type: "color", id: "tooltipColor", name: "Tooltip background color", note: "Pick a custom solid color, or leave at default to use the Modern Minimalist gradient.", value: settings.tooltipColor || "#2b2d31", defaultValue: "#2b2d31", inline: true }
				]
			},
			{
				type: "category",
				id: "updates",
				name: "Updates",
				collapsible: true,
				shown: true,
				settings: [
					{
						type: "switch",
						id: "autoUpdate",
						name: "Automatic Updates",
						note: "Check for updates every 24 hours and on Discord startup.",
						value: settings.autoUpdate
					},
					{
						type: "button",
						id: "checkUpdate",
						name: "Check for Updates",
						note: "Manually check for plugin updates.",
						children: "Check Now",
						onClick: () => this.plugin.updateManager.check()
					},
					{
						type: "button",
						id: "viewChangelog",
						name: "View Changelog",
						note: "View all version changes.",
						children: "View Changelog",
						onClick: () => this.plugin.updateManager.showFullChangelog()
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
					onChange: (category, id, value) => {
						this.plugin.updateSetting(id, value);
					}
				})
			]
		);
	}
}
//#endregion UI Manager
//#region Server Tooltip Manager
class ServerTooltipManager {
	constructor(plugin, storeService) {
		this.plugin = plugin;
		this.storeService = storeService;
		this.tooltipElement = null;
		this.currentGuildElement = null;
		this.hoveredGuildId = null;
		this.showTimeout = null;
		this.shiftPressed = false;
		document.body.classList.remove("bsd-hide-native-tooltip");
		this._running = false;
		this._boundMouseOver = this._handleMouseOver.bind(this);
		this._boundMouseOut = this._handleMouseOut.bind(this);
		this._boundKeyDown = this._handleKeyDown.bind(this);
		this._boundKeyUp = this._handleKeyUp.bind(this);
		this._boundFocusIn = this._handleFocusIn.bind(this);
		this._boundFocusOut = this._handleFocusOut.bind(this);
		this._boundTooltipMouseOut = this._handleTooltipMouseOut.bind(this);
	}
	start() {
		if (this._running) return;
		this._running = true;
		this._createTooltipElement();
		this.onSettingsUpdated();
		document.addEventListener("mouseover", this._boundMouseOver);
		document.addEventListener("mouseout", this._boundMouseOut);
		document.addEventListener("keydown", this._boundKeyDown);
		document.addEventListener("keyup", this._boundKeyUp);
		document.addEventListener("focusin", this._boundFocusIn);
		document.addEventListener("focusout", this._boundFocusOut);
	}
	stop() {
		if (!this._running) return;
		this._running = false;
		document.removeEventListener("mouseover", this._boundMouseOver);
		document.removeEventListener("mouseout", this._boundMouseOut);
		document.removeEventListener("keydown", this._boundKeyDown);
		document.removeEventListener("keyup", this._boundKeyUp);
		document.removeEventListener("focusin", this._boundFocusIn);
		document.removeEventListener("focusout", this._boundFocusOut);
		this._clearShowTimeout();
		this._hideTooltip();
		this._removeTooltipElement();
		this.currentGuildElement = null;
		this.hoveredGuildId = null;
		this.shiftPressed = false;
	}
	_applyTooltipStyles(el) {
		if (!el) return;
		const width = Number(this.plugin.settings.tooltipWidth) || 300;
		el.style.setProperty("--serverdetails-tooltip-width", `${width}px`);
		const color = this.plugin.settings.tooltipColor;
		const defaultGradientColor = "#2b2d31";
		if (color?.trim() && color.trim() !== defaultGradientColor) {
			el.style.setProperty("--serverdetails-bg-color", color.trim());
		} else {
			el.style.setProperty("--serverdetails-bg-color", "linear-gradient(135deg, #2b2d31 0%, #232428 100%)");
		}
		const accentColor = this.plugin.settings.accentColor;
		if (accentColor?.trim()) {
			el.style.setProperty("--serverdetails-accent-color", accentColor.trim());
		} else {
			el.style.setProperty("--serverdetails-accent-color", "#5865f2");
		}
		const rowSpacing = Number(this.plugin.settings.rowSpacing);
		el.style.setProperty(
			"--serverdetails-row-spacing",
			`${Number.isNaN(rowSpacing) ? 4 : rowSpacing}px`
		);
	}
	onSettingsUpdated() {
		if (!this.tooltipElement) return;
		this._applyTooltipStyles(this.tooltipElement);
	}
	_createTooltipElement() {
		if (this.tooltipElement) return;
		const el = document.createElement("div");
		el.className = "serverdetails-tooltip";
		el.id = "serverdetails-tooltip";
		el.setAttribute("role", "tooltip");
		el.setAttribute("aria-hidden", "true");
		this._applyTooltipStyles(el);
		el.addEventListener("mouseout", this._boundTooltipMouseOut);
		document.body.appendChild(el);
		this.tooltipElement = el;
	}
	_removeTooltipElement() {
		if (this.tooltipElement) {
			this.tooltipElement.removeEventListener("mouseout", this._boundTooltipMouseOut);
			this.tooltipElement.remove();
		}
		this.tooltipElement = null;
	}
	_handleKeyDown(e) {
		if (!this._running) return;
		if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
			this._clearShowTimeout();
			this._hideTooltip();
			return;
		}
		if (e.key === "Shift" || e.keyCode === 16) {
			const wasPressed = this.shiftPressed;
			this.shiftPressed = true;
			if (this.plugin.settings.onlyShowOnShift && this.hoveredGuildId && !this._isTooltipVisible() && !wasPressed) {
				this._clearShowTimeout();
				this._showTooltipForCurrent();
			}
		}
	}
	_handleKeyUp(e) {
		if (!this._running) return;
		if (e.key === "Shift" || e.keyCode === 16) {
			this.shiftPressed = false;
			if (this.plugin.settings.onlyShowOnShift && this._isTooltipVisible()) this._hideTooltip();
		}
	}
	_handleMouseOver(e) {
		if (!this._running) return;
		const guildEl = this._findGuildElement(e.target);
		if (!guildEl) return;
		if (this.currentGuildElement === guildEl) return;
		if (this.currentGuildElement) this._handleGuildLeave(this.currentGuildElement);
		this.currentGuildElement = guildEl;
		this._handleGuildEnter(guildEl);
	}
	_handleMouseOut(e) {
		if (!this._running) return;
		const guildEl = this._findGuildElement(e.target);
		if (!guildEl) return;
		if (guildEl !== this.currentGuildElement) return;
		const related = e.relatedTarget;
		if (
			related &&
			(guildEl.contains(related) || (this.tooltipElement?.contains(related)))
		) return;
		this._handleGuildLeave(guildEl);
		this.currentGuildElement = null;
	}
	_handleFocusIn(e) {
		if (!this._running) return;
		const guildEl = this._findGuildElement(e.target);
		if (!guildEl) return;
		if (this.currentGuildElement && this.currentGuildElement !== guildEl) {
			this._handleGuildLeave(this.currentGuildElement);
		}
		this.currentGuildElement = guildEl;
		const guildId = this._extractGuildId(guildEl);
		if (!guildId) return;
		this.hoveredGuildId = guildId;
		this._clearShowTimeout();
		if (this.plugin.settings.onlyShowOnShift && !this.shiftPressed) return;
		this._showTooltipForCurrent();
	}
	_handleFocusOut(e) {
		if (!this._running) return;
		const guildEl = this._findGuildElement(e.target);
		if (!guildEl) return;
		if (guildEl !== this.currentGuildElement) return;
		this._handleGuildLeave(guildEl);
		this.currentGuildElement = null;
	}
	_handleTooltipMouseOut(e) {
		if (!this._running || !this.tooltipElement) return;
		const related = e.relatedTarget;
		if (
			related &&
			((this.tooltipElement?.contains(related)) ||
				(this.currentGuildElement?.contains(related)))
		) return;
		this._clearShowTimeout();
		this._hideTooltip();
	}
	_findGuildElement(target) {
		if (!target || !(target instanceof Element)) return null;
		return target.closest('[data-list-item-id^="guildsnav___"]');
	}
	_handleGuildEnter(element) {
		const guildId = this._extractGuildId(element);
		if (!guildId) return;
		this.hoveredGuildId = guildId;
		this._clearShowTimeout();
		if (this.plugin.settings.onlyShowOnShift && !this.shiftPressed) return;
		const delayMs = Math.max(this.plugin.settings.tooltipDelay || 0, 0) * 1000;
		if (delayMs > 0) {
			this.showTimeout = setTimeout(() => {
				this._showTooltipForCurrent();
			}, delayMs);
		} else {
			this._showTooltipForCurrent();
		}
	}
	_handleGuildLeave(element) {
		if (this.hoveredGuildId && this._extractGuildId(element) === this.hoveredGuildId) this.hoveredGuildId = null;
		this._clearShowTimeout();
		this._setAnchorAria(element, false);
		this._hideTooltip();
	}
	_clearShowTimeout() {
		if (this.showTimeout) {
			clearTimeout(this.showTimeout);
			this.showTimeout = null;
		}
	}
	_isTooltipVisible() {
		return this.tooltipElement?.classList.contains("visible");
	}
	_showTooltipForCurrent() {
		if (!this._running || !this.tooltipElement || !this.hoveredGuildId) return;
		const guild = this.storeService.getGuild(this.hoveredGuildId);
		if (!guild) return;
		this.tooltipElement.innerHTML = this._buildTooltipHTML(guild);
		this._positionTooltip(this.currentGuildElement);
		this.tooltipElement.classList.add("visible");
		this.tooltipElement.setAttribute("aria-hidden", "false");
		if (this.currentGuildElement) this._setAnchorAria(this.currentGuildElement, true);
		if (this.plugin.settings.hideNativeTooltip) document.body.classList.add("bsd-hide-native-tooltip");
	}
	_hideTooltip() {
		if (!this.tooltipElement) return;
		this.tooltipElement.classList.remove("visible");
		this.tooltipElement.setAttribute("aria-hidden", "true");
		if (this.currentGuildElement) this._setAnchorAria(this.currentGuildElement, false);
		document.body.classList.remove("bsd-hide-native-tooltip");
	}
	_positionTooltip(anchorElement) {
		if (!this.tooltipElement || !anchorElement) return;
		const rect = anchorElement.getBoundingClientRect();
		const margin = 12;
		const configuredWidth = this.plugin.settings.tooltipWidth || 300;
		const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
		const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
		this.tooltipElement.style.left = "0px";
		this.tooltipElement.style.top = "0px";
		const tooltipRect = this.tooltipElement.getBoundingClientRect();
		const tooltipWidth = tooltipRect.width || configuredWidth;
		const tooltipHeight = tooltipRect.height || 0;
		let left = rect.right + margin;
		const maxLeft = viewportWidth - margin - tooltipWidth;
		if (left > maxLeft) left = maxLeft;
		if (left < margin) left = margin;
		let top = rect.top + (rect.height - tooltipHeight) / 2;
		const minTop = margin;
		const maxTop = viewportHeight - tooltipHeight - margin;
		if (!Number.isNaN(tooltipHeight) && tooltipHeight > 0) {
			if (top < minTop) top = minTop;
			if (top > maxTop) top = Math.max(minTop, maxTop);
		}
		this.tooltipElement.style.left = `${Math.round(left)}px`;
		this.tooltipElement.style.top = `${Math.round(top)}px`;
	}
	_extractGuildId(element) {
		if (!element) return null;
		const raw = element.dataset?.listItemId;
		if (!raw) return null;
		const match = /^guildsnav___(\d+)$/.exec(raw);
		return match ? match[1] : null;
	}
	_setAnchorAria(anchor, enable) {
		if (!anchor) return;
		const attrName = "aria-describedby";
		const dataKey = "serverdetailsAriaDescribedBy";
		const tooltipId = this.tooltipElement?.id || "";
		if (!tooltipId) return;
		if (enable) {
			if (!anchor.dataset[dataKey]) {
				const existing = anchor.getAttribute(attrName);
				if (existing) anchor.dataset[dataKey] = existing;
			}
			let describedBy = anchor.getAttribute(attrName) || "";
			const parts = describedBy.split(/\s+/).filter(Boolean);
			if (!parts.includes(tooltipId)) parts.push(tooltipId);
			anchor.setAttribute(attrName, parts.join(" "));
		} else {
			const existing = anchor.getAttribute(attrName);
			if (existing) {
				const parts = existing
					.split(/\s+/)
					.filter(Boolean)
					.filter(id => id !== tooltipId);
				if (parts.length) {
					anchor.setAttribute(attrName, parts.join(" "));
				} else {
					anchor.removeAttribute(attrName);
				}
			}
		}
	}
	_buildTooltipHTML(guild) {
		const escapeHtml = str => Utils.escapeHTML(String(str));
		const settings = this.plugin.settings;
		const rows = [];
		const name = guild.name || "Unknown Server";
		const rowTypes = {
			owner: { label: "Owner", icon: "owner" },
			created: { label: "Created", icon: "created" },
			joined: { label: "Joined", icon: "joined" },
			members: { label: "Members", icon: "members" },
			channels: { label: "Channels", icon: "channels" },
			roles: { label: "Roles", icon: "roles" },
			boosts: { label: "Boosts", icon: "boosts" },
			language: { label: "Language", icon: "language" }
		};
		if (settings.showOwner) {
			rows.push({ type: "owner", label: rowTypes.owner.label, value: this._getOwnerTag(guild) });
		}
		if (settings.showCreationDate) {
			const created = this._getCreationDate(guild);
			rows.push({ type: "created", label: rowTypes.created.label, value: created ? this.plugin._formatDate(created) : "Unknown" });
		}
		if (settings.showJoinDate) {
			const joined = this._getJoinDate(guild);
			rows.push({ type: "joined", label: rowTypes.joined.label, value: joined ? this.plugin._formatDate(joined) : "Unknown" });
		}
		if (settings.showMembers) {
			const count = this.storeService.getGuildMemberCount(guild.id);
			rows.push({ type: "members", label: rowTypes.members.label, value: typeof count === "number" ? String(count) : "?" });
		}
		if (settings.showChannels) {
			const count = this.storeService.getGuildChannelCount(guild.id);
			rows.push({ type: "channels", label: rowTypes.channels.label, value: typeof count === "number" ? String(count) : "?" });
		}
		if (settings.showRoles) {
			const rolesArr = this.storeService.getGuildRoles(guild.id);
			const roleCount = Array.isArray(rolesArr) ? rolesArr.length : 0;
			rows.push({ type: "roles", label: rowTypes.roles.label, value: String(roleCount) });
		}
		if (settings.showBoosts) {
			const boosts =
				guild.premiumSubscriptionCount ??
				guild.premium_subscription_count ??
				guild.premiumSubscriberCount ??
				guild.premium_subscriber_count ??
				0;
			rows.push({ type: "boosts", label: rowTypes.boosts.label, value: String(boosts) });
		}
		if (settings.showLanguage) {
			rows.push({ type: "language", label: rowTypes.language.label, value: this._getGuildLanguage(guild) });
		}
		let iconHtml = "";
		if (settings.showIcon) {
			const iconUrl = this._getGuildIconURL(guild);
			const acronym = this._getGuildAcronym(guild);
			if (iconUrl) {
				iconHtml =
					'<div class="serverdetails-tooltip-icon">' +
					'<img src="' + escapeHtml(iconUrl) + '" alt="' + escapeHtml(name) + '">' +
					"</div>";
			} else {
				iconHtml =
					'<div class="serverdetails-tooltip-icon">' +
					escapeHtml(acronym) +
					"</div>";
			}
		}
		const rowsHtml = rows
			.filter(r => r?.value !== undefined && r.value !== null)
			.map(r => {
				const dataAttr = settings.showIcons ? ` data-type="${escapeHtml(r.type)}"` : '';
				return (
					'<div class="serverdetails-row"' + dataAttr + '>' +
					'<span class="serverdetails-row-label">' + escapeHtml(r.label) + '</span>' +
					'<span class="serverdetails-row-value">' + escapeHtml(r.value) + "</span>" +
					"</div>"
				);
			})
			.join("");
		const headerHtml =
			'<div class="serverdetails-tooltip-header">' +
			(iconHtml || "") +
			'<div class="serverdetails-tooltip-name">' + escapeHtml(name) + "</div>" +
			"</div>";
		return headerHtml + rowsHtml;
	}
	_getGuildIconURL(guild) {
		if (!guild?.icon) return null;
		const ext = guild.icon.startsWith("a_") ? "gif" : "webp";
		return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${ext}?size=256`;
	}
	_getGuildAcronym(guild) {
		const name = guild?.name ? guild.name : "";
		if (!name) return "?";
		const words = name.split(/\s+/).filter(Boolean);
		if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
		return words.map(w => w[0]).join("").slice(0, 4).toUpperCase();
	}
	_getOwnerTag(guild) {
		if (!guild) return "Unknown";
		const ownerId = guild.ownerId || guild.owner_id;
		if (!ownerId) return "Unknown";
		const user = this.storeService.getUser(ownerId);
		if (!user) return ownerId;
		let tag = user.username || "Unknown";
		if (user.discriminator && user.discriminator !== "0") tag += "#" + user.discriminator;
		return tag;
	}
	_getCreationDate(guild) {
		if (!guild?.id) return null;
		const ts = this.plugin._snowflakeToTimestamp(guild.id);
		return ts ? new Date(ts) : null;
	}
	_getJoinDate(guild) {
		const currentUserId = this.storeService.getCurrentUserId();
		if (!currentUserId) return null;
		const member = this.storeService.getGuildMember(guild.id, currentUserId);
		if (!member) return null;
		const joined = member.joinedAt || member.joined_at;
		if (!joined) return null;
		if (joined instanceof Date) return joined;
		return new Date(joined);
	}
	_getGuildLanguage(guild) {
		const loc = guild.preferredLocale || guild.preferred_locale || "";
		if (!loc) return "Unknown";
		const localeSetting = this.plugin.settings.dateLocale;
		const displayLocale = localeSetting?.trim().length ? localeSetting.trim() : undefined;
		try {
			if (typeof Intl !== "undefined" && Intl.DisplayNames) {
				const baseLang = loc.split("-")[0];
				const dn = new Intl.DisplayNames(displayLocale ? [displayLocale] : undefined, { type: "language" });
				const name = dn.of(baseLang);
				if (name) return `${name} (${loc})`;
			}
		} catch { }
		return loc;
	}
}
//#endregion Server Tooltip Manager
//#region Main Plugin Class
module.exports = class BetterServerDetails {
	constructor(meta) {
		this.meta = meta;
		this.pluginName = meta?.name ?? "BetterServerDetails";
		this.updateManager = new UpdateManager(
			this.pluginName,
			meta?.version ?? "1.0.0",
			"Pharaoh2k/BetterDiscordStuff"
		);
		this.settings = {};
		this.storeService = null;
		this.uiManager = null;
		this.tooltipManager = null;
		this._running = false;
		this._settingsRoot = null;
		this._updateDebounced = debounce(() => {
			this._performUpdate();
		}, TIMEOUTS.DEBOUNCE);
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
			if (!Webpack?.getStore) {
				UI.showToast(`${this.meta.name}: BdApi/Webpack not available or outdated`, { type: "error" });
				return;
			}
			this._running = true;
			Logger.info(this.pluginName, `Starting v${this.meta.version}`);
			this.loadSettings();
			this.updateManager?.start(this.settings.autoUpdate);
			this.storeService = new DiscordStoreService();
			this.storeService.init();
			this.uiManager = new UIManager(this);
			this.tooltipManager = new ServerTooltipManager(this, this.storeService);
			this._injectStyles();
			this.tooltipManager.start();
			this._scheduleUpdate();
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
			if (this.updateManager) this.updateManager.stop();
			if (this.tooltipManager) this.tooltipManager.stop();
			if (this._settingsRoot) {
				try { this._settingsRoot.unmount(); } catch { }
				this._settingsRoot = null;
			}
			DOM.removeStyle(CONFIG.cssId);
		} catch (err) {
			Logger.error(this.pluginName, "Error during stop", err);
		}
	}
	//#endregion Lifecycle
	//#region Settings Panel
	getSettingsPanel() {
		if (!this.uiManager) return document.createElement("div");
		const panel = this.uiManager.renderSettingsPanel();
		if (panel?._pluginRoot) this._settingsRoot = panel._pluginRoot;
		return panel;
	}
	//#endregion Settings Panel
	//#region Settings Management
	loadSettings() {
		const saved = Data.load(this.pluginName, "settings") || {};
		this.settings = { ...CONFIG.defaultSettings, ...saved };
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
		this.forceUpdate();
	}
	//#endregion Settings Management
	//#region DOM / Update Management
	_scheduleUpdate(delay = TIMEOUTS.DEBOUNCE) {
		if (!this._running) return;
		if (delay <= TIMEOUTS.DEBOUNCE) {
			this._updateDebounced();
		} else {
			setTimeout(() => this._updateDebounced(), delay - TIMEOUTS.DEBOUNCE);
		}
	}
	_performUpdate() {
		if (!this._running) return;
		try {
			if (this.tooltipManager) this.tooltipManager.onSettingsUpdated();
		} catch (err) {
			Logger.warn(this.pluginName, "Update failed", err);
		}
	}
	forceUpdate(options = {}) {
		if (!this._running) return;
		const { immediate = false } = options;
		if (immediate) {
			this._performUpdate();
			return;
		}
		this._scheduleUpdate();
	}
	//#endregion DOM / Update Management
	//#region Utility Methods
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
	_formatDate(date) {
		if (!date) return "Unknown";
		const localeSetting = this.settings?.dateLocale;
		const includeTime = this.settings?.includeTime;
		const options = { year: "numeric", month: "short", day: "2-digit" };
		if (includeTime) {
			options.hour = "2-digit";
			options.minute = "2-digit";
		}
		try {
			return date.toLocaleString(
				(localeSetting?.trim().length) ? localeSetting.trim() : undefined,
				options
			);
		} catch {
			return date.toString();
		}
	}
	//#endregion Utility Methods
	//#region Styles
	_injectStyles() {
		DOM.addStyle(CONFIG.cssId, `
			.serverdetails-tooltip { position: fixed; z-index: 1002; background: var(--serverdetails-bg-color, linear-gradient(135deg, #2b2d31 0%, #232428 100%)); color: var(--text-default, #f2f3f5); border-radius: 12px; padding: 16px; min-width: var(--serverdetails-tooltip-width, 300px); max-width: var(--serverdetails-tooltip-width, 300px); max-height: calc(100vh - 24px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05); opacity: 0; display: flex; flex-direction: column; align-items: stretch; gap: var(--serverdetails-row-spacing, 8px); font-size: 14px; line-height: 1.3; overflow-y: auto; pointer-events: none; transition: opacity 0.12s ease-out, transform 0.12s ease-out; transform: scale(0.98); }
			.serverdetails-tooltip.visible { opacity: 1; transform: scale(1); pointer-events: auto; }
			.serverdetails-tooltip-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 8px; padding-bottom: 12px; border-bottom: 2px solid; border-image: linear-gradient(90deg, transparent, var(--serverdetails-accent-color, #5865f2), transparent) 1; }
			.serverdetails-tooltip-name { font-weight: 700; font-size: 16px; margin-bottom: 8px; text-align: center; color: #fff; }
			.serverdetails-tooltip-icon { display: flex; align-items: center; justify-content: center; margin-bottom: 8px; width: calc(var(--serverdetails-tooltip-width, 300px) - 80px); height: calc(var(--serverdetails-tooltip-width, 300px) - 80px); max-width: 200px; max-height: 200px; border-radius: 16px; overflow: hidden; background-color: var(--modal-background); color: var(--mobile-text-heading-primary); font-size: 32px; font-weight: 600; text-transform: uppercase; box-shadow: 0 4px 16px rgba(88, 101, 242, 0.4); position: relative; }
			.serverdetails-tooltip-icon::after { content: ''; position: absolute; top: -50%; right: -50%; width: 100%; height: 100%; background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent); }
			.serverdetails-tooltip-icon img { width: 100%; height: 100%; object-fit: cover; }
			.serverdetails-row { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; padding: 6px 8px; border-radius: 6px; }
			.serverdetails-row-label { font-weight: 600; font-size: 13px; color: #b5bac1; display: flex; align-items: center; gap: 6px; }
			.serverdetails-row[data-type="owner"] .serverdetails-row-label::before { content: '👑'; }
			.serverdetails-row[data-type="created"] .serverdetails-row-label::before { content: '📅'; }
			.serverdetails-row[data-type="joined"] .serverdetails-row-label::before { content: '🚪'; }
			.serverdetails-row[data-type="members"] .serverdetails-row-label::before { content: '👥'; }
			.serverdetails-row[data-type="channels"] .serverdetails-row-label::before { content: '💬'; }
			.serverdetails-row[data-type="roles"] .serverdetails-row-label::before { content: '🏷️'; }
			.serverdetails-row[data-type="boosts"] .serverdetails-row-label::before { content: '⚡'; }
			.serverdetails-row[data-type="language"] .serverdetails-row-label::before { content: '🌐'; }
			.serverdetails-row-value { text-align: right; font-weight: 500; color: #fff; }
			.bsd-hide-native-tooltip [role="tooltip"][class*="listItemTooltip"] { opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
		`);
	}
	//#endregion Styles
};
//#endregion Main Plugin Class

