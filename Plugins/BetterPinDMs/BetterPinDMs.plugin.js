/**
 * @name BetterPinDMs
 * @author Pharaoh2k
 * @description Enhanced DM pinning with category headers, drag & drop, unread tracking, hotkeys, import/export (from similar plugins too), and smart categories. Pinned DMs are shown in a separate PINNED DMs section above "Direct Messages".
 * @version 3.0.0
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterPinDMs/BetterPinDMs.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterPinDMs/BetterPinDMs.plugin.js
 */
/*
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * **
 * Contributions are welcome via GitHub pull requests. 
 * Please ensure submissions align with the project's guidelines and coding standards.
*/
/* BdApi based, BDFDB-free feature-packed plugin. Inspired by mwittrien / Devilbro's "PinDMs" */
"use strict";
//#region BdApi & Constants
const { Webpack, UI, Patcher, React, ReactDOM, Data, ContextMenu, ReactUtils, Utils, Logger, DOM, Components, Hooks, Net, Plugins } = new BdApi("BetterPinDMs");
const { Filters } = Webpack;
const ce = React.createElement;
const DEFAULT_COLOR = "#5865F2";
const DEFAULT_CATEGORY_PREFIX = "Pinned DMs #";
const CHANNEL_TYPES = { DM: 1, GROUP_DM: 3 };
const ChevronDown = Webpack.getByStrings("M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29", { searchExports: true });
const PinSvg = () => ce("svg", { viewBox: "0 0 24 24", width: 14, height: 14 },
  ce("path", { fill: "currentColor", d: "M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" })
);
//#endregion BdApi & Constants
const GITHUB_REPO = "Pharaoh2k/BetterDiscordStuff";
const STORE_NAMES = ["ChannelStore", "UserStore", "RelationshipStore", "ReadStateStore", "PrivateChannelSortStore", "SelectedChannelStore", "PrivateChannelReadStateStore", "UserGuildSettingsStore"];
//#region CSS
const CSS = String.raw`
.bpindms-header { display: flex; cursor: pointer; align-items: center; padding: 0 10px; height: 40px; box-sizing: border-box; }
.bpindms-header:hover { background-color: var(--background-mod-subtle); }
.bpindms-header-pin { font-size: 12px; line-height: 1; margin-right: 4px; flex: 0 0 auto; }
.bpindms-header-text { line-height: 16px; margin-right: 6px; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--channels-default); }
.bpindms-badge { position: relative; top: -1px; margin-right: 6px; min-width: 16px; height: 16px; border-radius: 8px; font-size: 12px; font-weight: 600; line-height: 16px; text-align: center; padding: 0 4px; box-sizing: border-box; background-color: var(--background-accent); color: var(--text-default); }
.bpindms-badge-unread { background-color: var(--status-danger); color: white; }
.bpindms-arrow { display: flex; align-items: center; justify-content: center; flex: 0 0 16px; width: 16px; height: 16px; margin-right: 2px; transition: transform 0.15s; color: var(--channels-default); }
.bpindms-header-collapsed .bpindms-arrow { transform: rotate(-90deg); }
.bpindms-dm-wrapper { position: relative; }
.bpindms-dm-wrapper:hover > .bpindms-unpin { display: flex; }
.bpindms-unpin { display: none; position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; opacity: .7; cursor: pointer; z-index: 2; color: var(--interactive-icon-default); background: none; border: none; padding: 0; line-height: 0; align-items: center; justify-content: center; }
.bpindms-unpin:hover { opacity: 1; color: var(--interactive-icon-hover); }
.bpindms-unpin svg { display: block; width: 16px; height: 16px; }
.bpindms-drop-target-top { position: relative; }
.bpindms-drop-target-top::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background-color: var(--background-brand, #5865F2); z-index: 1000; pointer-events: none; }
.bpindms-drop-target-bottom { position: relative; }
.bpindms-drop-target-bottom::after { content: ""; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background-color: var(--background-brand, #5865F2); z-index: 1000; pointer-events: none; }
.bpindms-drop-target-center { position: relative; }
.bpindms-drop-target-center::after { content: ""; position: absolute; inset: 0; background-color: rgba(88, 101, 242, 0.25); border: 2px solid var(--background-brand, #5865F2); border-radius: 4px; pointer-events: none; z-index: 1000; }
.bpindms-action-btn { margin: 16px 16px 0; padding: 8px 16px; background: var(--background-mod-subtle); color: var(--text-default); border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500; display: block; width: calc(100% - 32px); }
.bpindms-action-btn:hover { background: var(--background-mod-strong); }
.bpindms-unpin-all { margin: 16px; padding: 8px 16px; background: var(--status-danger); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500; display: block; width: calc(100% - 32px); }
.bpindms-unpin-all:hover { filter: brightness(1.1); }
.bpindms-custom-categories { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.bpindms-custom-categories-header { font-size: 14px; font-weight: 600; color: var(--text-default); margin-bottom: 4px; }
.bpindms-custom-categories-hint { color: var(--text-muted); font-size: 12px; opacity: 0.7; margin-bottom: 8px; }
.bpindms-custom-categories-addbtn { padding: 8px 12px; cursor: pointer; background-color: var(--background-mod-subtle); color: var(--text-default); border: none; border-radius: 4px; margin-top: 8px; }
.bpindms-custom-categories-addbtn:hover { background-color: var(--background-mod-strong); }
.bpindms-category-row { display: flex; align-items: center; gap: 8px; padding: 8px; background-color: var(--background-mod-subtle); border-radius: 4px; }
.bpindms-category-color-input { width: 32px; height: 32px; cursor: pointer; border: none; border-radius: 4px; background: transparent; flex: 0 0 32px; }
.bpindms-category-name-input { flex: 1; padding: 6px 8px; background-color: var(--input-background-default); color: var(--text-default); border: 1px solid var(--input-background-default); border-radius: 4px; font-size: 14px; }
.bpindms-category-movebtn { padding: 4px 8px; cursor: pointer; border-radius: 3px; border: none; background: var(--background-mod-subtle); color: var(--text-default); }
.bpindms-category-movebtn:disabled { cursor: not-allowed; opacity: 0.5; }
.bpindms-category-deletebtn { padding: 4px 8px; border: none; border-radius: 3px; color: var(--status-danger); background: transparent; cursor: pointer; }
.bpindms-category-deletebtn:hover { background-color: var(--background-mod-subtle); }
.bpindms-shortcuts-ref { padding: 16px; margin-top: 8px; }
.bpindms-shortcuts-ref-header { font-size: 14px; font-weight: 600; color: var(--text-default); margin-bottom: 8px; }
.bpindms-shortcuts-ref-list { color: var(--text-muted); display: flex; flex-direction: column; gap: 4px; font-size: 12px; }
.bpindms-kbd { background: var(--background-mod-subtle); padding: 2px 6px; border-radius: 3px; font-family: monospace; font-size: 11px; margin-right: 4px; }
.bpindms-input-field { width: 100%; padding: 8px; background-color: var(--input-background-default); color: var(--text-default); border: 1px solid var(--input-background-default); border-radius: 4px; margin-top: 8px; font-size: 14px; }
`;
//#endregion CSS
//#region Utility Helpers
const DRAG_CLASSES = ["bpindms-drop-target-top", "bpindms-drop-target-bottom", "bpindms-drop-target-center"];
const removeDragClasses = (el) => {
  if (el) for (const c of DRAG_CLASSES) el.classList.remove(c);
};
const _isUnsafeKey = (key) => {
  return key === "__proto__" || key === "prototype" || key === "constructor";
};
const safeClone = (obj) => {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (!_isUnsafeKey(k)) out[k] = v;
  }
  return out;
};
const arrRemove = (arr, item) => {
  const i = arr.indexOf(item);
  if (i > -1) arr.splice(i, 1);
};
const colorToStyle = (color) => {
  return color ? { color } : {};
};
const clampColor = (hex) => {
  if (!hex) return hex;
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return hex;
  const [r, g, b] = [Number.parseInt(m[1], 16), Number.parseInt(m[2], 16), Number.parseInt(m[3], 16)];
  if (!(r < 30 && g < 30 && b < 30) && !(r > 225 && g > 225 && b > 225)) return hex;
  const rf = r / 255, gf = g / 255, bf = b / 255;
  const cmax = Math.max(rf, gf, bf), cmin = Math.min(rf, gf, bf);
  let h = 0, s = 0, l = (cmax + cmin) / 2;
  if (cmax !== cmin) {
    const d = cmax - cmin;
    s = l > 0.5 ? d / (2 - cmax - cmin) : d / (cmax + cmin);
    if (cmax === rf) h = ((gf - bf) / d + (gf < bf ? 6 : 0)) / 6;
    else if (cmax === gf) h = ((bf - rf) / d + 2) / 6;
    else h = ((rf - gf) / d + 4) / 6;
  }
  l = r < 30 ? Math.max(l + 0.12, 0.12) : Math.min(l - 0.12, 0.88);
  const hue2rgb = (p, q, t) => {
    if (t < 0) { t++; }
    if (t > 1) { t--; }
    if (t < 1/6) { return p + (q - p) * 6 * t; }
    if (t < 1/2) { return q; }
    if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
    return p;
  };
  const q2 = l < 0.5 ? l * (1 + s) : l + s - l * s, p2 = 2 * l - q2;
  const ro = s === 0 ? l : hue2rgb(p2, q2, h + 1/3);
  const go = s === 0 ? l : hue2rgb(p2, q2, h);
  const bo = s === 0 ? l : hue2rgb(p2, q2, h - 1/3);
  return "#" + [ro, go, bo].map(c => Math.min(255, Math.max(0, Math.round(c * 255))).toString(16).padStart(2, "0")).join("");
};
const suppress = (fn, fallback = null) => {
  return function (...args) {
    try { return fn.apply(this, args); }
    catch (e) {
      Logger.error(fn.name || "anon", e);
      return typeof fallback === "function" ? fallback(...args) : fallback;
    }
  };
};
//#endregion Utility Helpers
//#region Update Manager
class UpdateManager {
	/* using Net, UI, Logger, Data, Plugins, Utils from BdApi */
	constructor(pluginName, version, github = GITHUB_REPO) {
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
		this._closeNotification();
	}
	_closeNotification() {
		if (!this.notification) return;
		if (typeof this.notification === "function") this.notification();
		else if (this.notification.close) this.notification.close();
		this.notification = null;
	}
	async check(silent = false) {
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
		const handle = UI.showNotification({
			id: `bd-plugin-update:${this.name}`,
			title: `${this.name}`,
			content: `v${version} is available`,
			type: "info",
			duration: 6000000,
			actions: [
				{
					label: "Update",
					onClick: () => {
						this._closeNotification();
						this.applyUpdate(text);
					},
				},
				{
					label: "Dismiss",
					onClick: () => this._closeNotification(),
				},
			],
			onClose: () => {
				if (this.notification === handle) this.notification = null;
			},
		});
		this.notification = handle;
	}
	applyUpdate(text) {
		try {
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) {
				UI.showToast(`[${this.name}] Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
				return;
			}
			const nextVersion = validated.version;
			require("fs").writeFileSync(__filename, text);
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
	async showChangelog() {
		const last = Data.load('version');
		Logger.info(`showChangelog: last=${last}, current=${this.version}`);
		if (last === this.version) { Logger.info("Skipping: versions match"); return; }
		Data.save('version', this.version);
		if (!last) { Logger.info("Skipping: fresh install"); return; }
		try {
			const res = await Net.fetch(this.urls.changelog);
			Logger.info(`Changelog fetch status: ${res.status}`);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			Logger.info("Parsed changes:", changes);
			if (changes.length === 0) return;
			UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes });
		} catch (e) { Logger.error("Changelog error:", e); }
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
//#endregion Update Manager
//#region Main Plugin
module.exports = class BetterPinDMs {
  constructor(meta) {
    this.meta = meta;
    this.cmUnpatches = [];
    this.categoryStore = new Utils.Store();
    this.updateManager = new UpdateManager(meta.name, meta.version, GITHUB_REPO);
    this.defaultSettings = {
      pinIcon: true,
      guildListPinIcon: true,
      unreadAmount: true,
      channelAmount: true,
      recentOrderChannelList: false,
      recentOrderGuildList: false,
      confirmDragActions: true,
      shortcutTogglePinEnabled: true,
      shortcutTogglePinKeys: ["Ctrl", "P"],
      shortcutQuickPickerEnabled: true,
      shortcutQuickPickerKeys: ["Ctrl", "Shift", "P"],
      shortcutJumpCategoryEnabled: true,
      shortcutJumpCategoryKeys: ["Ctrl"],
      autoUpdate: true,
    };
    this.defaultPreCategories = {
      friends: { enabled: false, collapsed: false },
      blocked: { enabled: false, collapsed: false },
      bots: { enabled: false, collapsed: false },
      groups: { enabled: false, collapsed: false },
      muted: { enabled: false, collapsed: false },
      activeToday: { enabled: false, collapsed: false },
    };
    this.preCategoryMeta = {
      friends: { name: "Friends", color: "#43b581" },
      blocked: { name: "Blocked", color: "#f04747" },
      bots: { name: "Bots", color: "#7289da" },
      groups: { name: "Groups", color: "#faa61a" },
      activeToday: { name: "Active Today", color: "#1abc9c" },
      muted: { name: "Muted", color: "#95a5a6" },
    };
    this._CategoryHeader = ({ category, foundDMs, plugin }) => {
      const stores = [plugin.stores.ReadStateStore, plugin.stores.PrivateChannelReadStateStore].filter(Boolean);
      const unread = Hooks.useStateFromStores(stores, () => {
        if (!plugin.settings.unreadAmount) return 0;
        let count = 0;
        for (const id of foundDMs) count += plugin.stores.ReadStateStore.getMentionCount(id) || 0;
        return count;
      }, [foundDMs, plugin.settings.unreadAmount]);
      const cls = "bpindms-header" + (category.collapsed ? " bpindms-header-collapsed" : "");
      return ce("h2", {
        className: cls,
        "data-category-id": category.id,
        draggable: !category.predefined,
        onDragStart: category.predefined ? null : (e) => plugin._handleDragStart(e, "category", category.id),
        onDragOver: (e) => plugin._handleDragOver(e, "category"),
        onDrop: (e) => plugin._handleDrop(e, "category", category.id),
        onDragLeave: (e) => plugin._handleDragLeave(e),
        onClick: () => {
          if (foundDMs.length || !category.collapsed) {
            const newCollapsed = !category.collapsed;
            if (category.predefined) {
              plugin.preCategories[category.id].collapsed = newCollapsed;
              Data.save("preCategories", plugin.preCategories);
            } else {
              plugin.saveCategory({ ...category, collapsed: newCollapsed }, "channelList");
            }
            plugin.updateContainer("channelList");
          }
        },
        onContextMenu: (e) => plugin.openCategoryContextMenu(e, category),
      },
        plugin.settings.pinIcon && !category.predefined ? ce("span", { key: "pin", className: "bpindms-header-pin" }, "\u{1F4CC}") : null,
        ce("span", { key: "name", className: "bpindms-header-text", style: colorToStyle(category.color) }, category.name),
        unread ? ce("span", { className: "bpindms-badge bpindms-badge-unread", key: "u" }, unread) : null,
        plugin.settings.channelAmount ? ce("span", { className: "bpindms-badge", key: "c" }, foundDMs.length) : null,
        ce("div", { className: "bpindms-arrow", key: "a" }, ce(ChevronDown, { size: "sm" }))
      );
    };
    this._dmListPatched = false;
    this._innerClassPatched = false;
    this._dmListFallbackPatched = false;
    this._PatchedBClass = null;
    this._PatchedBOrigType = null;
    this._updatePending = null;
    this._flushUpdatesDebounced = (() => {
      let tid = null;
      const fn = () => { clearTimeout(tid); tid = setTimeout(() => this._flushPendingUpdates(), 0); };
      fn.cancel = () => { clearTimeout(tid); tid = null; };
      return fn;
    })();
    this._dmListPatchState = {
      categories: [],
      pinnedIdsByCat: {},
      pinnedIdsReversed: [],
      totalPinnedCount: 0,
      origRenderDM: null,
      origSectionHeight: null,
      origRowHeight: null,
      origRenderRow: null,
      origRenderSection: null,
      totalSections: 0,
      inst: null,
    };
    this._stableRenderDM = suppress((section, row, ...rest) => {
      const st = this._dmListPatchState;
      if (!st.inst || !st.origRenderDM) return null;
      const { categories, inst } = st;
      if (section === 0) return st.origRenderDM.call(inst, section, row, ...rest);
      const catIndex = section - 1;
      if (catIndex >= categories.length) {
        return st.origRenderDM.call(inst, section, row + st.totalPinnedCount, ...rest);
      }
      const cat = categories[catIndex];
      const offset = st.pinnedIdsReversed.slice(0, catIndex).flat().length;
      const adjRow = row + offset;
      const id = inst.props.privateChannelIds[adjRow];
      const channel = inst.props.channels[id];
      if (!id ||
          (cat.collapsed && this.stores.SelectedChannelStore.getChannelId() !== id) ||
          !this.filterDMs(cat.dms, !cat.predefined).includes(id)) {
        return null;
      }
      let result = channel ? st.origRenderDM.call(inst, section, adjRow, ...rest) : null;
      result = this.wrapDMResult(id, cat, result);
      return result;
    });
    this._stableSectionHeight = suppress((...a) => {
      const st = this._dmListPatchState;
      if (a[0] !== 0 && a[0] !== st.totalSections - 1) {
        if (st.categories[a[0] - 1]) return 40;
      }
      const orig = st.origSectionHeight;
      return typeof orig === "function" ? orig(...a) : orig;
    }, (...a) => {
      const orig = this._dmListPatchState.origSectionHeight;
      return typeof orig === "function" ? orig(...a) : 0;
    });
    this._stableRowHeight = suppress((...a) => {
      const st = this._dmListPatchState;
      if (a[0] !== 0 && a[0] !== st.totalSections - 1) {
        const cat = st.categories[a[0] - 1];
        if (cat && cat.collapsed) return 0;
      }
      const orig = st.origRowHeight;
      return typeof orig === "function" ? orig(...a) : orig;
    }, (...a) => {
      const orig = this._dmListPatchState.origRowHeight;
      return typeof orig === "function" ? orig(...a) : 0;
    });
    this._stableRenderRow = suppress((...a) => {
      const st = this._dmListPatchState;
      if (!st.origRenderRow) return null;
      const row = st.origRenderRow(...a);
      return row?.key === "no-private-channels" ? null : row;
    });
    this._stableRenderSection = suppress((...a) => {
      const st = this._dmListPatchState;
      if (!st.origRenderSection) return null;
      const idx = a[0]?.section ?? a[0];
      if (idx !== 0 && idx !== st.totalSections - 1) {
        const cat = st.categories[idx - 1];
        if (cat) return this.renderCategoryHeader(cat);
        return null;
      }
      const result = st.origRenderSection(...a);
      if (idx === st.totalSections - 1 && React.isValidElement(result)) {
        return React.cloneElement(result, {
          onDragOver: this._composeHandler(result.props.onDragOver, (e) => this._handleDragOver(e, "header-unpin")),
          onDrop: this._composeHandler(result.props.onDrop, (e) => this._handleDrop(e, "header-unpin", null)),
          onDragLeave: this._composeHandler(result.props.onDragLeave, (e) => this._handleDragLeave(e))
        });
      }
      return result;
    });
  }
  //#region Lifecycle
  start() {
    const saved = Data.load("settings") || {};
    this.settings = this._migrateSettings(saved);
    this.preCategories = {};
    const savedPre = Data.load("preCategories");
    for (const k of Object.keys(this.defaultPreCategories)) {
      this.preCategories[k] = { ...this.defaultPreCategories[k], ...savedPre?.[k] };
    }
    this.stores = {};
    for (const name of STORE_NAMES) {
      this.stores[name] = Webpack.Stores[name];
      if (!this.stores[name]) Logger.warn(`Store not found: ${name}`);
    }
    this.LocaleMessages = Webpack.getModule(m => m.Messages?.UNPIN && m.Messages?.SAVE)?.Messages;
    Logger.info("Starting BetterPinDMs v" + this.meta.version);
    this.updateManager.start(this.settings.autoUpdate);
    DOM.addStyle(CSS);
    this.patchGuildList();
    this.patchChannelList();
    this.patchContextMenus();
    this.patchDirectMessage();
    this.setupStoreListener();
    this._onDragEnd = this._handleDragEnd.bind(this);
    document.addEventListener("dragend", this._onDragEnd, true);
    this._onKeyDown = this._handleKeyboardShortcut.bind(this);
    document.addEventListener("keydown", this._onKeyDown);
    this.forceUpdateAll(true);
  }
  stop() {
    Logger.info("Stopping BetterPinDMs");
    this.updateManager.stop();
    Patcher.unpatchAll();
    DOM.removeStyle();
    this.cmUnpatches.forEach(u => u());
    this.cmUnpatches = [];
    if (this._settingsRoot) {
      try { this._settingsRoot.unmount(); } catch {}
      this._settingsRoot = null;
    }
    if (this._channelChangeHandler) this.stores.ChannelStore?.removeChangeListener(this._channelChangeHandler);
    if (this._storeDebounceTimer) { clearTimeout(this._storeDebounceTimer); this._storeDebounceTimer = null; }
    if (this._channelListRenderingTimer) { clearTimeout(this._channelListRenderingTimer); this._channelListRenderingTimer = null; }
    this._channelListRendering = false;
    if (this._onDragEnd) document.removeEventListener("dragend", this._onDragEnd, true);
    if (this._onKeyDown) document.removeEventListener("keydown", this._onKeyDown);
    this._flushUpdatesDebounced.cancel();
    this._updatePending = null;
    this._dragInfo = null;
    this._cleanupDragVisuals();
    this._dmListForceUpdate = null;
    this._remountTarget = null;
    this._dmListPatched = false;
    this._innerClassPatched = false;
    this._dmListFallbackPatched = false;
    this._PatchedBClass = null;
    this._PatchedBOrigType = null;
    const st = this._dmListPatchState;
    st.categories = [];
    st.pinnedIdsByCat = {};
    st.pinnedIdsReversed = [];
    st.totalPinnedCount = 0;
    st.origRenderDM = null;
    st.origSectionHeight = null;
    st.origRowHeight = null;
    st.origRenderRow = null;
    st.origRenderSection = null;
    st.totalSections = 0;
    st.inst = null;
    this.forceUpdateAll(true);
  }
  //#endregion Lifecycle
  //#region Data Management
  getStr(key, fallback) {
    return this.LocaleMessages?.[key] || fallback;
  }
  getCurrentUserId() {
    return this.stores.UserStore?.getCurrentUser()?.id;
  }
  getPinnedChannels(type) {
    const uid = this.getCurrentUserId();
    if (!uid) return {};
    const raw = Data.load("pinned")?.[uid]?.[type];
    if (!raw || typeof raw !== "object") return {};
    return safeClone(raw);
  }
  savePinnedChannels(channels, type) {
    const uid = this.getCurrentUserId();
    if (!uid) return;
    const all = Data.load("pinned") || {};
    if (!all[uid]) all[uid] = {};
    if (channels && typeof channels === "object" && Object.keys(channels).length) {
      all[uid][type] = channels;
    } else {
      delete all[uid][type];
    }
    if (!Object.keys(all[uid]).length) delete all[uid];
    Data.save("pinned", Object.keys(all).length ? all : null);
    this.categoryStore.emitChange();
  }
  saveCategory(cat, type) {
    this.savePinnedChannels({ ...this.getPinnedChannels(type), [cat.id]: cat }, type);
  }
  generateId() {
    return Math.random().toString(36).slice(2, 10);
  }
  filterDMs(dms, removePredefined) {
    return dms.filter(id =>
      this.stores.ChannelStore.getChannel(id) &&
      !(removePredefined && this.getPredefinedCategory(id))
    );
  }
  sortDMsByTime(dms, type) {
    const key = type === "channelList" ? "recentOrderChannelList" : "recentOrderGuildList";
    if (dms.length > 1 && this.settings[key]) {
      return [...dms].sort((a, b) => {
        try {
          const msgA = this.stores.ReadStateStore.lastMessageId(a) || "0";
          const msgB = this.stores.ReadStateStore.lastMessageId(b) || "0";
          const tA = Number(BigInt(msgA) >> 22n);
          const tB = Number(BigInt(msgB) >> 22n);
          return tB - tA;
        } catch { return 0; }
      });
    }
    return dms;
  }
  getPredefinedCategory(id) {
    if (!id || this.getChannelListCategory(id)) return "";
    const ch = this.stores.ChannelStore.getChannel(id);
    if (!ch) return "";
    if (this.preCategories.muted.enabled && this._isChannelMuted(id)) return "muted";
    if (this.preCategories.activeToday.enabled && this._wasActiveToday(ch)) return "activeToday";
    const recipient = ch.type === CHANNEL_TYPES.DM ? ch.recipients?.[0] : null;
    if (recipient && this.preCategories.friends.enabled && this.stores.RelationshipStore.isFriend(recipient)) return "friends";
    if (recipient && this.preCategories.blocked.enabled && this.stores.RelationshipStore.isBlocked(recipient)) return "blocked";
    if (recipient && this.preCategories.bots.enabled && this.stores.UserStore.getUser(recipient)?.bot) return "bots";
    if (this.preCategories.groups.enabled && ch.type === CHANNEL_TYPES.GROUP_DM) return "groups";
    return "";
  }
  _isChannelMuted(channelId) {
    const channel = this.stores.ChannelStore.getChannel(channelId);
    const guildId = channel?.guild_id ?? null;
    const fn = this.stores.UserGuildSettingsStore.isChannelMuted;
    return fn.length >= 2
      ? !!fn.call(this.stores.UserGuildSettingsStore, guildId, channelId)
      : !!fn.call(this.stores.UserGuildSettingsStore, channelId);
  }
  _wasActiveToday(channel) {
    const lastMsg = this.stores.ReadStateStore.lastMessageId(channel.id);
    if (!lastMsg) return false;
    try {
      const ts = Number((BigInt(lastMsg) >> 22n) + 1420070400000n);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return ts >= today.getTime();
    } catch { return false; }
  }
  getChannelListCategory(id) {
    if (!id) return null;
    const cats = this.getPinnedChannels("channelList");
    for (const cid of Object.keys(cats)) if (cats[cid].dms.includes(id)) return cats[cid];
    return null;
  }
  _normalizeCategoryPositions(data, type) {
    const entries = Object.entries(data).sort((a, b) => (a[1].pos || 0) - (b[1].pos || 0));
    const newData = {};
    let pos = 0;
    let changed = false;
    for (const [id, cat] of entries) {
      if (cat.pos !== pos) changed = true;
      newData[id] = { ...cat, pos };
      pos++;
    }
    if (changed && Object.keys(newData).length) {
      this.savePinnedChannels(newData, type);
    }
    return newData;
  }
  getCategories(type, reverse) {
    const data = this.getPinnedChannels(type);
    const normalized = this._normalizeCategoryPositions(data, type);
    const sorted = Object.values(normalized).sort((a, b) => a.pos - b.pos);
    if (type === "channelList") {
      const allDMIds = this.stores.PrivateChannelSortStore.getPrivateChannelIds() || [];
      const preDMs = {};
      for (const chId of allDMIds) {
        const cat = this.getPredefinedCategory(chId);
        if (cat) {
          if (!preDMs[cat]) preDMs[cat] = [];
          preDMs[cat].push(chId);
        }
      }
      for (const t of Object.keys(this.defaultPreCategories).reverse()) {
        if (preDMs[t]?.length) {
          const entry = {
            predefined: true, collapsed: this.preCategories[t].collapsed,
            color: this.preCategoryMeta[t].color, dms: preDMs[t], id: t, name: this.preCategoryMeta[t].name
          };
          if (t === "activeToday") sorted.push(entry);
          else sorted.unshift(entry);
        }
      }
    }
    return reverse ? [...sorted].reverse() : sorted;
  }
  //#endregion Data Management
  //#region Category Logic
  addToCategory(id, category, type, silent) {
    if (!id || !category || !type) return;
    const wasEmpty = !this.filterDMs(category.dms, !category.predefined).length;
    if (!category.dms.includes(id)) category.dms.unshift(id);
    if (wasEmpty && category.dms.length) category.collapsed = false;
    this.saveCategory(category, type);
    this.updateContainer(type, true);
    if (!silent) UI.showToast(`Pinned to "${category.name}"`, { type: "success" });
  }
  removeFromCategory(id, category, type, silent) {
    if (!id || !category || !type) return;
    arrRemove(category.dms, id);
    if (!this.filterDMs(category.dms, !category.predefined).length) category.collapsed = true;
    this.saveCategory(category, type);
    this.updateContainer(type, true);
    if (!silent) UI.showToast("DM unpinned", { type: "info" });
  }
  addGuildPin(id) {
    if (!id) return;
    const ch = this.getPinnedChannels("guildList");
    for (const i of Object.keys(ch)) ch[i] = ch[i] + 1;
    ch[id] = 0;
    this.savePinnedChannels(ch, "guildList");
    this.updateContainer("guildList");
    UI.showToast("Pinned to server list", { type: "success" });
  }
  removeGuildPin(id) {
    if (!id) return;
    const ch = this.getPinnedChannels("guildList");
    delete ch[id];
    this.savePinnedChannels(ch, "guildList");
    this.updateContainer("guildList");
    UI.showToast("Unpinned from server list", { type: "info" });
  }
  isGuildPinned(id) {
    return this.getPinnedChannels("guildList")[id] !== undefined;
  }
  getSortedGuildPins() {
    const data = this.getPinnedChannels("guildList");
    delete data[""]; delete data["null"];
    const sorted = [], existing = [];
    const place = (id, pos) => {
      if (sorted[pos] === undefined) sorted[pos] = id;
      else place(id, pos + 1);
    };
    for (const id of Object.keys(data)) place(id, data[id]);
    for (const id of sorted.filter(Boolean)) {
      if (this.stores.ChannelStore.getChannel(id)) existing.push(id);
    }
    return this.sortDMsByTime(existing, "guildList");
  }
  //#endregion Category Logic
  //#region Patching
  patchGuildList() {
    Patcher.after(this.stores.PrivateChannelReadStateStore, "getUnreadPrivateChannelIds", (_, _args, ret) => {
      const pinned = this.getSortedGuildPins();
      if (pinned.length) return [...new Set([...pinned, ...ret])];
      return ret;
    });
  }
  _beforeRender(inst) {
    const categories = this.getCategories("channelList", true);
    this._dmListPatchState._cachedCategories = categories;
    if (!categories.length) return;
    const channels = { ...inst.props.channels };
    const privateChannelIds = [...inst.props.privateChannelIds];
    const pinnedChannelIds = {};
    for (const cat of [...categories].reverse()) {
      pinnedChannelIds[cat.id] = [];
      for (const id of this.sortDMsByTime(this.filterDMs(cat.dms, !cat.predefined), "channelList").reverse()) {
        arrRemove(privateChannelIds, id);
        privateChannelIds.unshift(id);
        pinnedChannelIds[cat.id].push(id);
      }
    }
    inst.props = { ...inst.props, channels, privateChannelIds, pinnedChannelIds };
  }
  _afterRender(inst, ret) {
    this._dmListForceUpdate = () => inst.forceUpdate();
    const categories = this._dmListPatchState._cachedCategories || this.getCategories("channelList", true);
    this._dmListPatchState._cachedCategories = null;
    if (!categories.length) return ret;
    if (!inst._bpindms_origRenderDM) inst._bpindms_origRenderDM = inst.renderDM;
    const st = this._dmListPatchState;
    st.inst = inst;
    st.categories = categories;
    st.pinnedIdsByCat = inst.props.pinnedChannelIds;
    st.pinnedIdsReversed = Object.values(inst.props.pinnedChannelIds).reverse();
    st.totalPinnedCount = st.pinnedIdsReversed.flat().length;
    st.origRenderDM = inst._bpindms_origRenderDM.bind(inst);
    inst.renderDM = this._stableRenderDM;
    return this.injectCategories(inst, ret, categories);
  }
  _ensurePatchedSubclass(OrigType) {
    if (this._PatchedBClass && this._PatchedBOrigType === OrigType) {
      return this._PatchedBClass;
    }
    this._PatchedBOrigType = OrigType;
    const PatchedPCL = class PatchedPCL extends OrigType {
      render() {
        PatchedPCL._plugin._beforeRender(this);
        const result = super.render();
        return PatchedPCL._plugin._afterRender(this, result) || result;
      }
      scrollToChannel(channelId) {
        const p = PatchedPCL._plugin;
        const categories = p.getCategories("channelList", true);
        const ROW_HEIGHT = 44;
        const HEADER_HEIGHT = 40;
        const PADDING = 8;
        let pixelOffset = (this.state.preRenderedChildren ?? 0) * ROW_HEIGHT;
        for (const cat of categories) {
          pixelOffset += HEADER_HEIGHT;
          if (cat.collapsed) {
            if (p.stores.SelectedChannelStore.getChannelId() === channelId) {
              const validDms = p.filterDMs(cat.dms, !cat.predefined);
              if (validDms.includes(channelId)) {
                if (this._list?.scrollIntoViewRect) {
                  this._list.scrollIntoViewRect({ start: Math.max(pixelOffset - PADDING, 0), end: pixelOffset + ROW_HEIGHT + PADDING });
                  return;
                }
              }
            }
            continue;
          }
          const validDms = p.sortDMsByTime(p.filterDMs(cat.dms, !cat.predefined), "channelList");
          for (const id of validDms) {
            if (id === channelId) {
              if (this._list?.scrollIntoViewRect) {
                this._list.scrollIntoViewRect({ start: Math.max(pixelOffset - PADDING, 0), end: pixelOffset + ROW_HEIGHT + PADDING });
                return;
              }
            }
            pixelOffset += ROW_HEIGHT;
          }
        }
        return super.scrollToChannel(channelId);
      }
    };
    PatchedPCL._plugin = this;
    this._PatchedBClass = PatchedPCL;
    return PatchedPCL;
  }
  _replaceInTree(node, predicate, replacer) {
    if (!node || typeof node !== "object") return node;
    if (predicate(node)) return replacer(node);
    if (Array.isArray(node)) {
      let changed = false;
      const result = node.map(child => {
        const newChild = this._replaceInTree(child, predicate, replacer);
        if (newChild !== child) changed = true;
        return newChild;
      });
      return changed ? result : node;
    }
    if (React.isValidElement(node) && node.props?.children) {
      const oldChildren = node.props.children;
      const newChildren = this._replaceInTree(oldChildren, predicate, replacer);
      if (newChildren !== oldChildren) {
        return React.cloneElement(node, { children: newChildren });
      }
    }
    return node;
  }
  patchChannelList() {
    const hasPrivateIdsProp = (node) => {
      const ids = node?.props?.privateChannelIds;
      return ids != null && (Array.isArray(ids) || typeof ids[Symbol.iterator] === "function");
    };
    const filterCandidates = [
      Filters.byStrings("private-channels-", "getMutablePrivateChannels"),
      Filters.byStrings("private-channels-", "getPrivateChannelIds"),
      Filters.byStrings("private-channels-", "privateChannelIds"),
      Filters.byStrings("listScrollerRef", "showDMHeader"),
    ];
    const patchReturnValue = (_, __, returnValue) => {
      const predicate = n => n?.type?.prototype?.render && hasPrivateIdsProp(n);
      const inner = Utils.findInTree(returnValue, predicate, { walkable: ["props", "children"] });
      if (inner?.type) {
        const PatchedClass = this._ensurePatchedSubclass(inner.type);
        this._innerClassPatched = true;
        return this._replaceInTree(returnValue, predicate, (node) => {
          const newProps = { ...node.props };
          if (node.key != null) newProps.key = node.key;
          if (node.ref != null) newProps.ref = node.ref;
          return ce(PatchedClass, newProps);
        });
      }
      return returnValue;
    };
    let moduleWithKey = null;
    for (const filter of filterCandidates) {
      const result = Webpack.getWithKey(filter);
      if (result) { moduleWithKey = result; break; }
    }
    if (moduleWithKey) {
      const [mod, key] = moduleWithKey;
      Patcher.after(mod, key, patchReturnValue);
      this._dmListPatched = true;
      Logger.info("DM list patched via Webpack module");
      return;
    }
    const asyncFilter = filterCandidates[0];
    Webpack.waitForModule(asyncFilter).then((mod) => {
      if (this._dmListPatched) return;
      const result = Webpack.getWithKey(asyncFilter);
      if (result) {
        const [m, k] = result;
        Patcher.after(m, k, patchReturnValue);
        this._dmListPatched = true;
        Logger.info("DM list patched via async Webpack module");
        this.forceUpdateAll(true);
      }
    }).catch(() => {});
    if (!this._dmListPatched && !this._innerClassPatched) {
      this._activateStoreFallback();
    }
  }
  _activateStoreFallback() {
    if (this._dmListFallbackPatched || this._dmListPatched) return;
    Logger.warn("UI patch failed; using store-level reorder fallback (no category headers).");
    UI.showToast(
      "[BetterPinDMs] UI patch failed; using fallback (reorder only). Category headers/drag UI may be unavailable until Discord UI changes are handled.",
      { type: "warning", timeout: 8000 }
    );
    Patcher.after(this.stores.PrivateChannelSortStore, "getPrivateChannelIds", (_, _args, ret) => {
      if (this._dmListPatched) return ret;
      if (!Array.isArray(ret)) return ret;
      const categories = this.getCategories("channelList", true);
      if (!categories.length) return ret;
      const pinnedSet = new Set();
      const orderedPinned = [];
      for (const cat of [...categories].reverse()) {
        for (const id of this.sortDMsByTime(this.filterDMs(cat.dms, !cat.predefined), "channelList")) {
          if (!pinnedSet.has(id) && ret.includes(id)) {
            orderedPinned.push(id);
            pinnedSet.add(id);
          }
        }
      }
      return [...orderedPinned, ...ret.filter(id => !pinnedSet.has(id))];
    });
    this._dmListFallbackPatched = true;
    Logger.info("Using fallback store patching method");
  }
  injectCategories(instance, rv, categories) {
    if (!rv) return rv;
    if (rv.props?.sections && Array.isArray(rv.props.sections)) {
      const pinnedIds = Object.values(instance.props.pinnedChannelIds).reverse();
      const sections = [instance.state.preRenderedChildren ?? 0];
      for (const ids of pinnedIds) sections.push(ids.length || 1);
      sections.push(instance.props.privateChannelIds.length - pinnedIds.flat().length);
      const st = this._dmListPatchState;
      st.totalSections = sections.length;
      if (rv.props.sectionHeight !== this._stableSectionHeight) {
        st.origSectionHeight = rv.props.sectionHeight;
      }
      if (rv.props.rowHeight !== this._stableRowHeight) {
        st.origRowHeight = rv.props.rowHeight;
      }
      if (rv.props.renderRow !== this._stableRenderRow) {
        st.origRenderRow = rv.props.renderRow;
      }
      if (rv.props.renderSection !== this._stableRenderSection) {
        st.origRenderSection = rv.props.renderSection;
      }
      return React.cloneElement(rv, {
        sections,
        sectionHeight: this._stableSectionHeight,
        rowHeight: this._stableRowHeight,
        renderRow: this._stableRenderRow,
        renderSection: this._stableRenderSection,
      });
    }
    if (typeof rv.props?.children === "function") {
      const orig = rv.props.children;
      return React.cloneElement(rv, {
        children: suppress((...a) => {
          const c = orig(...a);
          return this.injectCategories(instance, c, categories) || c;
        })
      });
    }
    if (Array.isArray(rv)) {
      return rv.map(child => this.injectCategories(instance, child, categories) || child);
    }
    if (rv.props?.children) {
      const newChildren = this.injectCategories(instance, rv.props.children, categories);
      if (newChildren !== rv.props.children) {
        return React.cloneElement(rv, { children: newChildren });
      }
    }
    return rv;
  }
  renderCategoryHeader(category) {
    const foundDMs = this.filterDMs(category.dms, !category.predefined);
    if (category.predefined && foundDMs.length < 1) return null;
    return [
      ce(this._CategoryHeader, {
        key: "bpindms-hdr-" + category.id,
        category,
        foundDMs,
        plugin: this
      })
    ];
  }
  //#endregion Patching
  //#region Context Menus
  patchContextMenus() {
    const buildSubmenu = (channelId) => {
      const guildPinned = this.isGuildPinned(channelId);
      const categories = this.getCategories("channelList", true);
      const currentCat = this.getChannelListCategory(channelId);
      const clItems = [];
      if (currentCat) {
        clItems.push({
          type: "text", label: "Unpin from Channel List", danger: true,
          action: () => this.removeFromCategory(channelId, currentCat, "channelList")
        });
      } else {
        clItems.push({
          type: "text", label: "Add to New Category",
          action: () => this.openCategoryModal({
            id: this.generateId(),
            name: DEFAULT_CATEGORY_PREFIX + (categories.filter(c => !c.predefined).length + 1),
            dms: [channelId], pos: categories.length, collapsed: false, color: DEFAULT_COLOR
          }, "channelList", true)
        });
      }
      const catItems = categories
        .filter(c => !c.predefined)
        .map(c => {
          const isCurrent = currentCat && currentCat.id === c.id;
          return {
            type: "text",
            label: isCurrent ? `\u25CF ${c.name || "Pinned DMs"}` : (c.name || "Pinned DMs"),
            disabled: isCurrent,
            action: () => {
              if (currentCat) this.removeFromCategory(channelId, currentCat, "channelList", true);
              this.addToCategory(channelId, c, "channelList");
            }
          };
        });
      if (catItems.length) {
        clItems.push({ type: "separator" }, ...catItems);
      }
      return ContextMenu.buildItem({
        type: "submenu", label: "Pin DM",
        items: [
          { type: "submenu", label: "Pin to Channel List", items: clItems },
          {
            type: "text",
            label: guildPinned ? "Unpin from Server List" : "Pin to Server List",
            danger: guildPinned,
            action: () => guildPinned ? this.removeGuildPin(channelId) : this.addGuildPin(channelId)
          }
        ]
      });
    };
    this.cmUnpatches.push(
      ContextMenu.patch("user-context", (tree, props) => {
        if (!props.channel || ![CHANNEL_TYPES.DM, CHANNEL_TYPES.GROUP_DM].includes(props.channel.type)) return;
        const existing = Array.isArray(tree.props.children) ? tree.props.children : [tree.props.children];
        tree.props.children = [...existing, buildSubmenu(props.channel.id)];
      }),
      ContextMenu.patch("gdm-context", (tree, props) => {
        if (!props.channel) return;
        const existing = Array.isArray(tree.props.children) ? tree.props.children : [tree.props.children];
        tree.props.children = [...existing, buildSubmenu(props.channel.id)];
      })
    );
  }
  openCategoryContextMenu(event, category) {
    const items = [];
    if (category.predefined) {
      items.push({
        type: "text", label: "Disable Category",
        action: () => {
          this.preCategories[category.id].enabled = false;
          Data.save("preCategories", this.preCategories);
          this.updateContainer("channelList", true);
        }
      });
    } else {
      items.push(
        {
          type: "text", label: this.getStr("CATEGORY_SETTINGS", "Category Settings"),
          action: () => this.openCategoryModal(category, "channelList")
        },
        {
          type: "text", label: this.getStr("DELETE_CATEGORY", "Delete Category"), danger: true,
          action: () => {
            const d = this.getPinnedChannels("channelList");
            delete d[category.id];
            this.savePinnedChannels(d, "channelList");
            this.updateContainer("channelList", true);
          }
        }
      );
    }
    ContextMenu.open(event, ContextMenu.buildMenu(items));
  }
  //#endregion Context Menus
  //#region Settings Panel
  getSettingsPanel() {
    if (this._settingsRoot) {
      try { this._settingsRoot.unmount(); } catch {}
      this._settingsRoot = null;
    }
    const panel = document.createElement("div");
    const root = ReactDOM.createRoot(panel);
    this._settingsRoot = root;
    root.render(ce(this._SettingsPanelComponent));
    return panel;
  }
  _SettingsPanelComponent = () => {
    const savedSettings = Hooks.useData("settings") || {};
    const settings = { ...this.defaultSettings, ...savedSettings };
    const rawPreCats = Hooks.useData("preCategories") || {};
    const preCategories = Object.fromEntries(
      Object.entries(this.defaultPreCategories).map(([k, v]) => {
        const saved = rawPreCats[k] || {};
        return [k, { ...v, ...saved }];
      })
    );
    const categoryData = Hooks.useStateFromStores([this.categoryStore], () => this.getPinnedChannels("channelList"));
    const [, rerender] = Hooks.useForceUpdate();
    const colorTimerRef = React.useRef(null);
    const pendingColorsRef = React.useRef({});
    const settingsSchema = [
      {
        type: "category", id: "general", name: "General",
        collapsible: true, shown: true,
        settings: [
          { type: "switch", id: "pinIcon", name: "Pin Icon on Category Headers", note: "Shows a pin icon on custom pinned category headers", value: settings.pinIcon },
          { type: "switch", id: "guildListPinIcon", name: "Pin Icon in Server List", note: "Shows a pin icon on pinned DMs in the server list", value: settings.guildListPinIcon },
          { type: "switch", id: "unreadAmount", name: "Unread Count on Categories", note: "Shows unread message count in category headers", value: settings.unreadAmount },
          { type: "switch", id: "channelAmount", name: "DM Count on Categories", note: "Shows number of pinned DMs in category headers", value: settings.channelAmount },
          { type: "switch", id: "confirmDragActions", name: "Confirm Drag Actions", note: "Ask for confirmation before unpinning via drag & drop", value: settings.confirmDragActions }
        ]
      },
      {
        type: "category", id: "sorting", name: "Sort by Recent Message",
        collapsible: true, shown: false,
        settings: [
          { type: "switch", id: "recentOrderChannelList", name: "Sort by Recent (Channel List)", note: "Sort pinned DMs by most recent message in the DM list", value: settings.recentOrderChannelList },
          { type: "switch", id: "recentOrderGuildList", name: "Sort by Recent (Server List)", note: "Sort pinned DMs by most recent message in the server list", value: settings.recentOrderGuildList }
        ]
      },
      {
        type: "category", id: "shortcuts", name: "Keyboard Shortcuts",
        collapsible: true, shown: false,
        settings: [
          { type: "switch", id: "shortcutTogglePinEnabled", name: "Toggle Pin/Unpin Current DM", note: "Default: Ctrl+P", value: settings.shortcutTogglePinEnabled },
          { type: "keybind", id: "shortcutTogglePinKeys", name: "Toggle Pin Shortcut", value: settings.shortcutTogglePinKeys, clearable: true },
          { type: "switch", id: "shortcutQuickPickerEnabled", name: "Open Quick Category Picker", note: "Default: Ctrl+Shift+P", value: settings.shortcutQuickPickerEnabled },
          { type: "keybind", id: "shortcutQuickPickerKeys", name: "Quick Picker Shortcut", value: settings.shortcutQuickPickerKeys, clearable: true },
          { type: "switch", id: "shortcutJumpCategoryEnabled", name: "Jump to Category 1\u20139", note: "Prefix keys combined with number keys 1\u20139", value: settings.shortcutJumpCategoryEnabled },
          { type: "keybind", id: "shortcutJumpCategoryKeys", name: "Jump Prefix Keys", note: "e.g. Ctrl \u2192 Ctrl+1, Ctrl+2, \u2026", value: settings.shortcutJumpCategoryKeys, clearable: true }
        ]
      },
      {
        type: "category", id: "predefined", name: "Predefined Categories",
        collapsible: true, shown: false,
        settings: [
          { type: "switch", id: "preCatFriends", name: "Friends", note: "Auto-group friend DMs into a category", value: preCategories.friends.enabled },
          { type: "switch", id: "preCatBlocked", name: "Blocked", note: "Auto-group blocked user DMs into a category", value: preCategories.blocked.enabled },
          { type: "switch", id: "preCatBots", name: "Bots", note: "Auto-group bot DMs into a category", value: preCategories.bots.enabled },
          { type: "switch", id: "preCatGroups", name: "Groups", note: "Auto-group group DMs into a category", value: preCategories.groups.enabled }
        ]
      },
      {
        type: "category", id: "smart", name: "Smart Categories",
        collapsible: true, shown: false,
        settings: [
          { type: "switch", id: "preCatMuted", name: "Muted", note: "Auto-group muted DMs into a category", value: preCategories.muted.enabled },
          { type: "switch", id: "preCatActiveToday", name: "Active Today", note: "Auto-group DMs with messages from today into a category", value: preCategories.activeToday.enabled }
        ]
      },
      {
        type: "category", id: "updates", name: "Updates",
        collapsible: true, shown: false,
        settings: [
          { type: "switch", id: "autoUpdate", name: "Auto Update", note: "Automatically check for plugin updates", value: settings.autoUpdate },
          { type: "button", id: "checkUpdate", name: "Check for Updates", note: "Manually check for plugin updates", children: "Check Now", onClick: () => this.updateManager.check() },
          { type: "button", id: "viewChangelog", name: "View Changelog", note: "View all version changes", children: "View Changelog", onClick: () => this.updateManager.showChangelog() }
        ]
      },
    ];
    const preCatMap = {
      preCatFriends: "friends", preCatBlocked: "blocked",
      preCatBots: "bots", preCatGroups: "groups",
      preCatMuted: "muted", preCatActiveToday: "activeToday"
    };
    const categories = Object.entries(categoryData)
      .sort((a, b) => (a[1].pos || 0) - (b[1].pos || 0))
      .map(([id, cat]) => ({ ...cat, id }));
    return ce("div", {}, [
      ce(React.Fragment, { key: "settings" },
        UI.buildSettingsPanel({
          settings: settingsSchema,
          onChange: (_category, id, value) => {
            if (preCatMap[id]) {
              this.preCategories[preCatMap[id]].enabled = value;
              Data.save("preCategories", this.preCategories);
            } else {
              this.settings[id] = value;
              Data.save("settings", this.settings);
              if (id === "autoUpdate") {
                if (value) this.updateManager.start(true);
                else this.updateManager.stop();
              }
            }
            this.forceUpdateAll();
          }
        })
      ),
      ce("div", { key: "custom-cats", className: "bpindms-custom-categories" }, [
        ce("div", { key: "header", className: "bpindms-custom-categories-header" }, "Custom Categories"),
        ce("div", { key: "hint", className: "bpindms-custom-categories-hint" }, "Use arrows to reorder. Click \u2715 to delete."),
        ...categories.map((cat, i) => ce("div", { key: cat.id, className: "bpindms-category-row" }, [
          ce("input", {
            key: "color", type: "color",
            value: pendingColorsRef.current[cat.id] || cat.color || DEFAULT_COLOR,
            onChange: (e) => {
              const newColor = clampColor(e.target.value);
              pendingColorsRef.current[cat.id] = newColor;
              rerender();
              clearTimeout(colorTimerRef.current);
              colorTimerRef.current = setTimeout(() => {
                this.saveCategory({ ...cat, color: newColor }, "channelList");
                delete pendingColorsRef.current[cat.id];
                this.forceUpdateAll();
              }, 300);
            },
            className: "bpindms-category-color-input"
          }),
          ce("input", {
            key: "name", type: "text",
            value: cat.name,
            onChange: (e) => {
              this.saveCategory({ ...cat, name: e.target.value }, "channelList");
              this.forceUpdateAll();
              rerender();
            },
            className: "bpindms-category-name-input"
          }),
          ce("button", {
            key: "up",
            onClick: () => {
              if (i === 0) return;
              const prev = categories[i - 1];
              const ch = this.getPinnedChannels("channelList");
              ch[cat.id] = { ...cat, pos: prev.pos };
              ch[prev.id] = { ...prev, pos: cat.pos };
              this.savePinnedChannels(ch, "channelList");
              this.forceUpdateAll();
              rerender();
            },
            disabled: i === 0,
            className: "bpindms-category-movebtn"
          }, "\u2191"),
          ce("button", {
            key: "down",
            onClick: () => {
              if (i === categories.length - 1) return;
              const next = categories[i + 1];
              const ch = this.getPinnedChannels("channelList");
              ch[cat.id] = { ...cat, pos: next.pos };
              ch[next.id] = { ...next, pos: cat.pos };
              this.savePinnedChannels(ch, "channelList");
              this.forceUpdateAll();
              rerender();
            },
            disabled: i === categories.length - 1,
            className: "bpindms-category-movebtn"
          }, "\u2193"),
          ce("button", {
            key: "delete",
            onClick: () => {
              UI.showConfirmationModal("Delete Category", `Delete "${cat.name}"?`, {
                confirmText: "Delete", danger: true,
                onConfirm: () => {
                  const d = this.getPinnedChannels("channelList");
                  delete d[cat.id];
                  this.savePinnedChannels(d, "channelList");
                  this.forceUpdateAll();
                  rerender();
                }
              });
            },
            className: "bpindms-category-deletebtn"
          }, "\u2715")
        ])),
        ce("button", {
          key: "add",
          onClick: () => {
            this.openCategoryModal({
              id: this.generateId(),
              name: DEFAULT_CATEGORY_PREFIX + (categories.length + 1),
              dms: [], pos: categories.length, collapsed: false, color: DEFAULT_COLOR
            }, "channelList", true, rerender);
          },
          className: "bpindms-custom-categories-addbtn"
        }, "Add Category")
      ]),
      ce("div", { key: "actions" }, [
        ce("button", { key: "export", className: "bpindms-action-btn", onClick: () => this._exportConfig() }, "Export Configuration"),
        ce("button", { key: "import", className: "bpindms-action-btn", onClick: () => this._importConfig() }, "Import Configuration"),
        ce("button", {
          key: "unpin", className: "bpindms-unpin-all",
          onClick: () => {
            UI.showConfirmationModal("Unpin All", "Are you sure you want to unpin all pinned DMs?", {
              danger: true, confirmText: "Unpin All", cancelText: "Cancel",
              onConfirm: () => {
                const uid = this.getCurrentUserId();
                if (!uid) return;
                const all = Data.load("pinned") || {};
                delete all[uid];
                Data.save("pinned", Object.keys(all).length ? all : null);
                this.forceUpdateAll(true);
              }
            });
          }
        }, "Unpin All")
      ]),
      ce("div", { key: "shortcuts-ref", className: "bpindms-shortcuts-ref" }, [
        ce("div", { key: "header", className: "bpindms-shortcuts-ref-header" }, "Keyboard Shortcuts"),
        ce("div", { key: "list", className: "bpindms-shortcuts-ref-list" }, [
          ce("div", { key: "s1" }, ce("kbd", { className: "bpindms-kbd" }, (settings.shortcutTogglePinKeys || []).join("+")), " Pin/unpin current DM"),
          ce("div", { key: "s2" }, ce("kbd", { className: "bpindms-kbd" }, (settings.shortcutQuickPickerKeys || []).join("+")), " Quick category picker"),
          ce("div", { key: "s3" }, ce("kbd", { className: "bpindms-kbd" }, (settings.shortcutJumpCategoryKeys || []).join("+") + "+1-9"), " Jump to category")
        ])
      ])
    ]);
  }
  openCategoryModal(data, type, isNew, onDone) {
    if (!data || !type) return;
    const newData = { ...data };
    const hexToInt = (hex) => Number.parseInt((hex || DEFAULT_COLOR).replace("#", ""), 16);
    const handleColorChange = (v) => {
      if (typeof v === "number") newData.color = "#" + v.toString(16).padStart(6, "0");
      else if (typeof v === "string") newData.color = v.startsWith("#") ? v : `#${v}`;
    };
    const ColorInput = Components.ColorInput;
    const colorElement = ColorInput
      ? ce(ColorInput, {
          value: hexToInt(data.color),
          disabled: false,
          onChange: handleColorChange
        })
      : ce("input", {
          type: "color",
          value: data.color || DEFAULT_COLOR,
          onChange: (e) => { newData.color = e.target.value; },
          style: { width: 48, height: 32, cursor: "pointer", border: "none", borderRadius: 4 }
        });
    const SettingItem = Components.SettingItem || "div";
    const TextInput = Components.TextInput;
    const nameElement = TextInput
      ? ce(TextInput, { value: data.name, placeholder: data.name, onChange: v => { newData.name = v; } })
      : ce("input", {
          type: "text", value: data.name, placeholder: data.name,
          onChange: (e) => { newData.name = e.target.value; },
          style: { width: "100%", padding: "8px", fontSize: 14, borderRadius: 4, border: "1px solid var(--input-background-default)", background: "var(--input-background-default)", color: "var(--text-default)" }
        });
    const content = ce("div", { style: { padding: "8px 0" } },
      ce(SettingItem, { name: "Category Name" },
        nameElement
      ),
      ce(SettingItem, { name: "Category Color" }, colorElement)
    );
    UI.showConfirmationModal(
      isNew ? "Create Category" : this.getStr("CATEGORY_SETTINGS", "Category Settings"),
      content,
      {
        confirmText: isNew ? this.getStr("CREATE", "Create") : this.getStr("SAVE", "Save"),
        cancelText: this.getStr("CANCEL", "Cancel"),
        onConfirm: () => {
          newData.color = clampColor(newData.color);
          this.saveCategory(newData, type);
          this.updateContainer(type, true);
          if (typeof onDone === "function") onDone();
        }
      }
    );
  }
  //#endregion Settings Panel
  //#region Drag & Drop
  wrapDMResult(id, cat, result) {
    if (result && !cat.predefined) {
      result = ce("div", {
        className: "bpindms-dm-wrapper",
        key: "bpindms-wrap-" + id,
        "data-bpindms-channel": id,
        draggable: true,
        onDragStart: (e) => this._handleDragStart(e, "dm", id),
        onDragOver: (e) => this._handleDragOver(e, "dm"),
        onDrop: (e) => this._handleDrop(e, "dm", id),
        onDragLeave: (e) => this._handleDragLeave(e)
      },
        result,
        ce(Components.Tooltip, { text: this.getStr("UNPIN", "Unpin"), position: "top" },
          tooltipProps => ce("button", {
            ...tooltipProps,
            className: "bpindms-unpin",
            onClick: (e) => {
              e.stopPropagation();
              e.preventDefault();
              this.removeFromCategory(id, cat, "channelList");
            },
            children: ce(PinSvg)
          })
        )
      );
    }
    return result;
  }
  _composeHandler(existing, added) {
    if (typeof existing !== "function") return added;
    if (typeof added !== "function") return existing;
    return (e) => { existing(e); return added(e); };
  }
  _handleDragStart(e, type, id) {
    e.stopPropagation();
    this._dragInfo = { type, id };
    this._dragEl = e.currentTarget;
    e.dataTransfer.setData("text/plain", JSON.stringify({ type, id }));
    e.dataTransfer.effectAllowed = "move";
    this._dragEl.style.opacity = "0.5";
  }
  _cleanupDragVisuals() {
    if (this._dragEl) this._dragEl.style.opacity = "";
    this._dragEl = null;
    for (const el of document.querySelectorAll(DRAG_CLASSES.map(c => `.${c}`).join(", "))) {
      removeDragClasses(el);
    }
  }
  _handleDragOver(e, targetType) {
    if (!this._dragInfo) return;
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const height = rect.height;
    removeDragClasses(target);
    if (targetType === "category") {
      if (this._dragInfo.type === "dm") {
        target.classList.add("bpindms-drop-target-center");
        e.dataTransfer.dropEffect = "copy";
      } else if (this._dragInfo.type === "category") {
        target.classList.add(offsetY < height / 2 ? "bpindms-drop-target-top" : "bpindms-drop-target-bottom");
        e.dataTransfer.dropEffect = "move";
      }
    } else if (targetType === "dm" && this._dragInfo.type === "dm") {
      target.classList.add(offsetY < height / 2 ? "bpindms-drop-target-top" : "bpindms-drop-target-bottom");
      e.dataTransfer.dropEffect = "move";
    } else if (targetType === "header-unpin" && this._dragInfo.type === "dm") {
      target.classList.add("bpindms-drop-target-center");
      e.dataTransfer.dropEffect = "move";
    }
  }
  _handleDragLeave(e) {
    removeDragClasses(e.currentTarget);
  }
  _handleDrop(e, targetType, targetId) {
    e.preventDefault();
    e.stopPropagation();
    this._cleanupDragVisuals();
    if (!this._dragInfo) return;
    const { type: dragType, id: dragId } = this._dragInfo;
    this._dragInfo = null;
    const rect = e.currentTarget.getBoundingClientRect();
    const isTop = (e.clientY - rect.top) < rect.height / 2;
    if (dragType === "dm" && targetType === "header-unpin") {
      this._confirmUnpin(dragId);
      return;
    }
    if (dragType === "category" && targetType === "category") {
      this._reorderCategories(dragId, targetId, isTop);
    } else if (dragType === "dm" && targetType === "category") {
      this._moveDmToCategory(dragId, targetId);
    } else if (dragType === "dm" && targetType === "dm") {
      this._reorderDm(dragId, targetId, isTop);
    }
  }
  _handleDragEnd() {
    this._dragInfo = null;
    this._cleanupDragVisuals();
  }
  _confirmUnpin(dmId) {
    const cat = this.getChannelListCategory(dmId);
    if (!cat) return;
    const doUnpin = () => {
      this.removeFromCategory(dmId, cat, "channelList");
    };
    if (this.settings.confirmDragActions) {
      UI.showConfirmationModal(
        this.getStr("UNPIN", "Unpin DM"),
        "Unpin this DM?",
        { confirmText: this.getStr("UNPIN", "Unpin"), danger: true, onConfirm: doUnpin }
      );
    } else {
      doUnpin();
    }
  }
  _reorderDm(dragId, targetId, insertBefore) {
    if (dragId === targetId) return;
    const categories = this.getCategories("channelList", true);
    const sourceCat = categories.find(c => !c.predefined && c.dms.includes(dragId));
    const targetCat = categories.find(c => !c.predefined && c.dms.includes(targetId));
    if (!sourceCat || !targetCat) return;
    if (sourceCat.id === targetCat.id) {
      if (this.settings.recentOrderChannelList) {
        this.settings.recentOrderChannelList = false;
        Data.save("settings", this.settings);
        UI.showToast("Disabled 'Sort by Recent (Channel List)' to apply manual order", { type: "info" });
      }
      const dms = targetCat.dms;
      const fromIdx = dms.indexOf(dragId);
      let toIdx = dms.indexOf(targetId);
      if (fromIdx === -1 || toIdx === -1) return;
      dms.splice(fromIdx, 1);
      if (fromIdx < toIdx) toIdx--;
      if (!insertBefore) toIdx++;
      dms.splice(toIdx, 0, dragId);
    } else {
      arrRemove(sourceCat.dms, dragId);
      let toIdx = targetCat.dms.indexOf(targetId);
      if (!insertBefore) toIdx++;
      targetCat.dms.splice(toIdx, 0, dragId);
    }
    const channels = this.getPinnedChannels("channelList");
    channels[sourceCat.id] = sourceCat;
    channels[targetCat.id] = targetCat;
    this.savePinnedChannels(channels, "channelList");
    this.forceUpdateChannelList(true);
  }
  _moveDmToCategory(dragId, targetCatId) {
    const categories = this.getCategories("channelList", true);
    const sourceCat = categories.find(c => !c.predefined && c.dms.includes(dragId));
    const targetCat = categories.find(c => c.id === targetCatId && !c.predefined);
    if (!targetCat) return;
    if (sourceCat) arrRemove(sourceCat.dms, dragId);
    if (!targetCat.dms.includes(dragId)) targetCat.dms.unshift(dragId);
    const channels = this.getPinnedChannels("channelList");
    if (sourceCat) channels[sourceCat.id] = sourceCat;
    channels[targetCat.id] = targetCat;
    this.savePinnedChannels(channels, "channelList");
    this.forceUpdateChannelList(true);
    UI.showToast(`Moved to "${targetCat.name}"`, { type: "success" });
  }
  _reorderCategories(dragId, targetId, insertBefore) {
    if (dragId === targetId) return;
    const categories = this.getCategories("channelList", true);
    const dCat = categories.find(c => c.id === dragId);
    const rCat = categories.find(c => c.id === targetId);
    if (!dCat || !rCat) return;
    arrRemove(categories, dCat);
    let targetIdx = categories.indexOf(rCat);
    if (!insertBefore) targetIdx++;
    categories.splice(targetIdx, 0, dCat);
    const nc = {};
    let p = 0;
    for (const c of [...categories].reverse()) if (!c.predefined) nc[c.id] = { ...c, pos: p++ };
    this.savePinnedChannels(nc, "channelList");
    this.forceUpdateChannelList(true);
  }
  //#endregion Drag & Drop
  //#region Updates & Force Refresh
  updateContainer(type, force) {
    if (type === "channelList") {
      if (force && !this._channelListRendering) {
        this._channelListRendering = true;
        this._channelListRenderingTimer = setTimeout(() => { this._channelListRendering = false; this._channelListRenderingTimer = null; }, 3000);
        this.remountDmList();
      } else {
        this.forceUpdateChannelList(true);
      }
    } else if (type === "guildList") {
      this.remountDmList();
    }
  }
  remountDmList() {
    if (this._remountTarget && !this._remountTarget._reactInternals) {
      this._remountTarget = null;
    }
    if (!this._remountTarget) {
      const node = document.querySelector('[class*="privateChannels"]');
      if (!node) return;
      const fiber = ReactUtils.getInternalInstance(node);
      for (let current = fiber; current; current = current.return) {
        const { stateNode } = current;
        if (stateNode?.forceUpdate && stateNode?.render) {
          this._remountTarget = stateNode;
          break;
        }
      }
    }
    if (!this._remountTarget) return;
    const fragmentKey = String(Math.random());
    const restore = Patcher.instead(this._remountTarget, "render", (_, args, originalRender) => {
      restore();
      return React.createElement(React.Fragment, { key: fragmentKey }, originalRender(...args));
    });
    try {
      this._remountTarget.forceUpdate();
    } catch {
      restore();
      this._remountTarget = null;
    }
  }
  _flushPendingUpdates() {
    if (this._updatePending) {
      if (this._updatePending.dmList && this._dmListForceUpdate) this._dmListForceUpdate();
      if (this._updatePending.remount) this.remountDmList();
      this._updatePending = null;
    }
  }
  forceUpdateChannelList(immediate) {
    if (immediate) {
      if (this._dmListForceUpdate) this._dmListForceUpdate();
      else this.remountDmList();
      return;
    }
    if (!this._updatePending) this._updatePending = {};
    this._updatePending.dmList = true;
    this._flushUpdatesDebounced();
  }
  forceUpdateAll(immediate) {
    if (immediate) {
      this.remountDmList();
      return;
    }
    if (!this._updatePending) this._updatePending = {};
    this._updatePending.remount = true;
    this._flushUpdatesDebounced();
  }
  //#endregion Updates & Force Refresh
  //#region Guild DM Patching
  patchDirectMessage() {
    this._pinBadgeElement = ce("div", {
      style: {
        width: 16, height: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: "scale(-1, 1)",
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
      }
    },
      ce("svg", { viewBox: "0 0 24 24", width: 14, height: 14 },
        ce("path", { fill: "white", d: "M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z" })
      )
    );
    this._patchBlobMask();
  }
  _patchBlobMask() {
    const blobResult = Webpack.getMangled(
      Filters.bySource("baseViewBoxSize", "badgeMaskStroke"),
      { BlobMask: Filters.byStrings("baseViewBoxSize") }
    );
    if (!blobResult?.BlobMask) { Logger.warn("BlobMask module not found"); return; }
    Patcher.before(blobResult, "BlobMask", (_t, args) => {
      if (!this.settings.guildListPinIcon) return;
      const to = args[0]?.children?.props?.to;
      if (typeof to !== "string") return;
      const match = to.match(/^\/channels\/@me\/(\d+)$/);
      if (!match) return;
      if (this.isGuildPinned(match[1])) {
        args[0] = { ...args[0], upperBadge: this._pinBadgeElement };
      }
    });
    Logger.info("BlobMask component patched via getMangled");
  }
  //#endregion Guild DM Patching
  //#region Settings Migration
  _migratePreCats(source, keys) {
    if (!source) return;
    for (const k of keys) {
      if (source[k]?.enabled !== undefined) {
        this.preCategories = this.preCategories || {};
        if (!this.preCategories[k]) this.preCategories[k] = { ...this.defaultPreCategories[k] };
        this.preCategories[k].enabled = source[k].enabled;
        if (source[k].collapsed) this.preCategories[k].collapsed = true;
      }
    }
  }
  _migrateSettings(saved) {
    if (!saved || typeof saved !== "object") return structuredClone(this.defaultSettings);
    if (saved.general || saved.recentOrder || saved.preCategories || saved.smartCategories) {
      Logger.info("Migrating settings from older nested format");
      const migrated = structuredClone(this.defaultSettings);
      if (saved.general) {
        migrated.pinIcon = saved.general.pinIcon ?? migrated.pinIcon;
        migrated.guildListPinIcon = saved.general.guildListPinIcon ?? migrated.guildListPinIcon;
        migrated.unreadAmount = saved.general.unreadAmount ?? migrated.unreadAmount;
        migrated.channelAmount = saved.general.channelAmount ?? migrated.channelAmount;
      }
      if (saved.recentOrder) {
        migrated.recentOrderChannelList = saved.recentOrder.channelList ?? migrated.recentOrderChannelList;
        migrated.recentOrderGuildList = saved.recentOrder.guildList ?? migrated.recentOrderGuildList;
      }
      this._migratePreCats(saved.preCategories, Object.keys(this.defaultPreCategories));
      this._migratePreCats(saved.smartCategories, ["muted", "activeToday"]);
      if (saved.preCategories || saved.smartCategories) {
        Data.save("preCategories", this.preCategories);
      }
      if (saved.sortChannelListByRecent !== undefined) migrated.recentOrderChannelList = saved.sortChannelListByRecent;
      if (saved.sortGuildListByRecent !== undefined) migrated.recentOrderGuildList = saved.sortGuildListByRecent;
      if (Object.hasOwn(saved, "confirmDragActions")) migrated.confirmDragActions = saved.confirmDragActions;
      for (const name of ["TogglePin", "QuickPicker", "JumpCategory"]) {
        const enabledKey = `shortcut${name}Enabled`;
        const keysKey = `shortcut${name}Keys`;
        if (saved[enabledKey] !== undefined) migrated[enabledKey] = saved[enabledKey];
        if (Array.isArray(saved[keysKey])) migrated[keysKey] = saved[keysKey];
      }
      Data.save("settings", migrated);
      return migrated;
    }
    return { ...structuredClone(this.defaultSettings), ...safeClone(saved) };
  }
  //#endregion Settings Migration
  //#region Import & Export
  _exportConfig() {
    try {
      const s = this.settings;
      const pc = this.preCategories;
      const all = {
        general: {
          pinIcon: !!s.pinIcon,
          guildListPinIcon: !!s.guildListPinIcon,
          unreadAmount: !!s.unreadAmount,
          channelAmount: !!s.channelAmount,
          confirmDragActions: !!s.confirmDragActions
        },
        preCategories: {
          friends: { enabled: !!pc.friends.enabled, collapsed: !!pc.friends.collapsed },
          blocked: { enabled: !!pc.blocked.enabled, collapsed: !!pc.blocked.collapsed },
          bots: { enabled: !!pc.bots.enabled, collapsed: !!pc.bots.collapsed },
          groups: { enabled: !!pc.groups.enabled, collapsed: !!pc.groups.collapsed }
        },
        smartCategories: {
          activeToday: { enabled: !!pc.activeToday.enabled, collapsed: !!pc.activeToday.collapsed },
          muted: { enabled: !!pc.muted.enabled, collapsed: !!pc.muted.collapsed }
        },
        recentOrder: {
          channelList: !!s.recentOrderChannelList,
          guildList: !!s.recentOrderGuildList
        },
        shortcuts: {
          shortcutTogglePinEnabled: !!s.shortcutTogglePinEnabled,
          shortcutTogglePinKeys: s.shortcutTogglePinKeys || [],
          shortcutQuickPickerEnabled: !!s.shortcutQuickPickerEnabled,
          shortcutQuickPickerKeys: s.shortcutQuickPickerKeys || [],
          shortcutJumpCategoryEnabled: !!s.shortcutJumpCategoryEnabled,
          shortcutJumpCategoryKeys: s.shortcutJumpCategoryKeys || []
        },
        pinned: Data.load("pinned") || {}
      };
      const config = { all };
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const date = new Date().toISOString().slice(0, 10);
      a.download = `BetterPinDMs-backup-${date}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      Logger.info("Configuration exported successfully");
      UI.showToast("Configuration exported (cross-compatible)", { type: "success" });
    } catch (e) {
      Logger.error("Export failed:", e);
      UI.showToast("Export failed", { type: "error" });
    }
  }
  _rgbaToHex(color) {
    if (typeof color === "string") return color;
    if (typeof color === "number") return "#" + (color & 0xffffff).toString(16).padStart(6, "0");
    if (!Array.isArray(color) || color.length < 3) return null;
    const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
    return "#" + [clamp(color[0]), clamp(color[1]), clamp(color[2])].map(v => v.toString(16).padStart(2, "0")).join("");
  }
  _convertCategoryEntries(entries) {
    const converted = Object.create(null);
    for (const [catId, cat] of entries) {
      if (_isUnsafeKey(catId) || !cat || typeof cat !== "object") continue;
      converted[catId] = {
        id: cat.id || catId,
        name: typeof cat.name === "string" ? cat.name : "Imported Category",
        dms: Array.isArray(cat.dms) ? cat.dms.filter(d => typeof d === "string") : [],
        pos: typeof cat.pos === "number" ? cat.pos : 0,
        collapsed: !!cat.collapsed,
        color: this._rgbaToHex(cat.color)
      };
    }
    return converted;
  }
  _importBetterPinDMs(config) {
    const all = config.all || {};
    if (all.general || all.recentOrder || all.shortcuts) {
      if (all.general) {
        if (all.general.pinIcon !== undefined) this.settings.pinIcon = all.general.pinIcon;
        if (all.general.unreadAmount !== undefined) this.settings.unreadAmount = all.general.unreadAmount;
        if (all.general.channelAmount !== undefined) this.settings.channelAmount = all.general.channelAmount;
        if (all.general.guildListPinIcon !== undefined) this.settings.guildListPinIcon = all.general.guildListPinIcon;
        if (all.general.confirmDragActions !== undefined) this.settings.confirmDragActions = all.general.confirmDragActions;
      }
      if (all.recentOrder) {
        if (all.recentOrder.channelList !== undefined) this.settings.recentOrderChannelList = all.recentOrder.channelList;
        if (all.recentOrder.guildList !== undefined) this.settings.recentOrderGuildList = all.recentOrder.guildList;
      }
      if (all.shortcuts) {
        for (const key of ["shortcutTogglePinEnabled", "shortcutQuickPickerEnabled", "shortcutJumpCategoryEnabled"]) {
          if (all.shortcuts[key] !== undefined) this.settings[key] = all.shortcuts[key];
        }
        for (const key of ["shortcutTogglePinKeys", "shortcutQuickPickerKeys", "shortcutJumpCategoryKeys"]) {
          if (Array.isArray(all.shortcuts[key])) this.settings[key] = all.shortcuts[key];
        }
      }
      Data.save("settings", this.settings);
    }
    if (all.preCategories) {
      for (const k of Object.keys(this.defaultPreCategories)) {
        if (all.preCategories[k]) {
          this.preCategories[k] = { ...this.defaultPreCategories[k], ...all.preCategories[k] };
        }
      }
    }
    if (all.smartCategories) {
      for (const k of ["muted", "activeToday"]) {
        if (all.smartCategories[k]) {
          this.preCategories[k] = { ...this.defaultPreCategories[k], ...all.smartCategories[k] };
        }
      }
    }
    Data.save("preCategories", this.preCategories);
    const pinnedRoot = all.pinned || {};
    const uid = this.getCurrentUserId();
    let pinnedForUser = uid ? pinnedRoot[uid] : null;
    if (!pinnedForUser) {
      const firstKey = Object.keys(pinnedRoot)[0];
      if (firstKey) pinnedForUser = pinnedRoot[firstKey];
    }
    if (pinnedForUser) {
      const channelList = pinnedForUser.channelList || {};
      const convertedCats = this._convertCategoryEntries(Object.entries(channelList));
      const guildList = Object.create(null);
      if (Array.isArray(pinnedForUser.guildList)) {
        for (let i = 0; i < pinnedForUser.guildList.length; i++) {
          const id = pinnedForUser.guildList[i];
          if (typeof id === "string") guildList[id] = i;
        }
      } else if (pinnedForUser.guildList && typeof pinnedForUser.guildList === "object") {
        for (const [id, pos] of Object.entries(pinnedForUser.guildList)) {
          if (typeof id === "string" && typeof pos === "number") guildList[id] = pos;
        }
      }
      const allPinned = Data.load("pinned") || {};
      if (!allPinned[uid]) allPinned[uid] = {};
      if (Object.keys(convertedCats).length) allPinned[uid].channelList = convertedCats;
      if (Object.keys(guildList).length) allPinned[uid].guildList = guildList;
      Data.save("pinned", allPinned);
    }
  }
  _importBetterPinDMsLegacy(config) {
    if (config.settings && typeof config.settings === "object") {
      const safe = safeClone(config.settings);
      if (safe.sortChannelListByRecent !== undefined) { this.settings.recentOrderChannelList = safe.sortChannelListByRecent; delete safe.sortChannelListByRecent; }
      if (safe.sortGuildListByRecent !== undefined) { this.settings.recentOrderGuildList = safe.sortGuildListByRecent; delete safe.sortGuildListByRecent; }
      if (safe.enableFriends !== undefined) { this.preCategories.friends.enabled = safe.enableFriends; }
      if (safe.enableBlocked !== undefined) { this.preCategories.blocked.enabled = safe.enableBlocked; }
      if (safe.enableBots !== undefined) { this.preCategories.bots.enabled = safe.enableBots; }
      if (safe.enableGroups !== undefined) { this.preCategories.groups.enabled = safe.enableGroups; }
      if (safe.enableMuted !== undefined) { this.preCategories.muted.enabled = safe.enableMuted; }
      if (safe.enableActiveToday !== undefined) { this.preCategories.activeToday.enabled = safe.enableActiveToday; }
      for (const k of ["pinIcon", "guildListPinIcon", "unreadAmount", "channelAmount", "confirmDragActions"]) {
        if (safe[k] !== undefined) this.settings[k] = safe[k];
      }
      Data.save("settings", this.settings);
      Data.save("preCategories", this.preCategories);
    }
    if (config.categories?.custom && typeof config.categories.custom === "object") {
      const uid = this.getCurrentUserId();
      if (uid) {
        const convertedCats = this._convertCategoryEntries(Object.entries(config.categories.custom));
        const allPinned = Data.load("pinned") || {};
        if (!allPinned[uid]) allPinned[uid] = {};
        if (Object.keys(convertedCats).length) allPinned[uid].channelList = convertedCats;
        Data.save("pinned", allPinned);
      }
    }
  }
  _importConfig() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.style.display = "none";
    input.addEventListener("change", async () => {
      const file = input.files[0];
      input.remove();
      if (!file) return;
      try {
        const text = await file.text();
        const config = JSON.parse(text);
        if (!config || typeof config !== "object") throw new Error("Invalid JSON");
        const isCrossCompatExport = !!config.all;
        const isBetterPinDMsLegacy = !!(config.categories?.custom && config.version && !config.plugin);
        let formatLabel = "";
        if (isCrossCompatExport) formatLabel = " (cross-compatible format detected)";
        else if (isBetterPinDMsLegacy) formatLabel = " (BetterPinDMs legacy format detected)";
        UI.showConfirmationModal("Import Configuration",
          `This will overwrite your current settings, categories, and pins.${formatLabel} Continue?`,
          {
            danger: true, confirmText: "Import", cancelText: "Cancel",
            onConfirm: () => {
              if (isCrossCompatExport) {
                this._importBetterPinDMs(config);
              } else if (isBetterPinDMsLegacy) {
                this._importBetterPinDMsLegacy(config);
              } else {
                if (config.settings && typeof config.settings === "object") {
                  this.settings = { ...this.defaultSettings, ...safeClone(config.settings) };
                  Data.save("settings", this.settings);
                }
                if (config.preCategories && typeof config.preCategories === "object") {
                  for (const k of Object.keys(this.defaultPreCategories)) {
                    this.preCategories[k] = { ...this.defaultPreCategories[k], ...config.preCategories[k] };
                  }
                  Data.save("preCategories", this.preCategories);
                }
                if (config.pinned && typeof config.pinned === "object") {
                  Data.save("pinned", safeClone(config.pinned));
                }
              }
              this.forceUpdateAll(true);
              Logger.info("Configuration imported successfully");
              UI.showToast("Configuration imported", { type: "success" });
            }
          }
        );
      } catch (e) {
        Logger.error("Import failed:", e);
        UI.showToast("Import failed: invalid file", { type: "error" });
      }
    });
    document.body.appendChild(input);
    input.click();
  }
  //#endregion Import & Export
  //#region Store Listener
  setupStoreListener() {
    this._storeDebounceTimer = null;
    this._channelChangeHandler = () => {
      if (this._storeDebounceTimer) clearTimeout(this._storeDebounceTimer);
      this._storeDebounceTimer = setTimeout(() => {
        this._storeDebounceTimer = null;
        const categories = this.getCategories("channelList", false);
        for (const cat of categories) {
          for (const id of cat.dms) {
            if (!this.stores.ChannelStore.getChannel(id)) {
              this.updateContainer("channelList");
              return;
            }
          }
        }
      }, 500);
    };
    this.stores.ChannelStore?.addChangeListener(this._channelChangeHandler);
  }
  //#endregion Store Listener
  //#region Keyboard Shortcuts
  _handleKeyboardShortcut(e) {
    if (e.repeat) return;
    const target = e.target;
    if (target instanceof HTMLElement && (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable ||
      target.getAttribute("role") === "textbox"
    )) return;
    const s = this.settings;
    const parseKeys = (keys) => {
      const mods = { ctrl: false, shift: false, alt: false, meta: false };
      let mainKey = null;
      for (const raw of keys) {
        const lower = String(raw).toLowerCase();
        if (lower === "ctrl" || lower === "control") mods.ctrl = true;
        else if (lower === "shift") mods.shift = true;
        else if (lower === "alt" || lower === "option") mods.alt = true;
        else if (lower === "meta" || lower === "cmd" || lower === "command" || lower === "win") mods.meta = true;
        else mainKey = lower;
      }
      return { mods, mainKey };
    };
    const modsMatch = (mods, evt) =>
      !!mods.ctrl === !!evt.ctrlKey && !!mods.shift === !!evt.shiftKey &&
      !!mods.alt === !!evt.altKey && !!mods.meta === !!evt.metaKey;
    const matchesBinding = (keys, evt) => {
      if (!Array.isArray(keys) || !keys.length) return false;
      const { mods, mainKey } = parseKeys(keys);
      if (!modsMatch(mods, evt) || !mainKey) return false;
      return String(evt.key || "").toLowerCase() === mainKey;
    };
    const matchesModifiers = (keys, evt) => {
      if (!Array.isArray(keys) || !keys.length) return false;
      return modsMatch(parseKeys(keys).mods, evt);
    };
    if (s.shortcutTogglePinEnabled && matchesBinding(s.shortcutTogglePinKeys, e)) {
      e.preventDefault();
      this.toggleCurrentDmPin();
      return;
    }
    if (s.shortcutQuickPickerEnabled && matchesBinding(s.shortcutQuickPickerKeys, e)) {
      e.preventDefault();
      this.showQuickCategoryPicker();
      return;
    }
    if (s.shortcutJumpCategoryEnabled && matchesModifiers(s.shortcutJumpCategoryKeys, e)) {
      const key = String(e.key || "");
      if (key >= "1" && key <= "9") {
        e.preventDefault();
        this.jumpToCategory(Number.parseInt(key, 10) - 1);
      }
    }
  }
  _getSelectedDmChannelId() {
    const channelId = this.stores.SelectedChannelStore.getChannelId();
    if (!channelId) return null;
    const channel = this.stores.ChannelStore.getChannel(channelId);
    if (!channel || ![CHANNEL_TYPES.DM, CHANNEL_TYPES.GROUP_DM].includes(channel.type)) return null;
    return channelId;
  }
  toggleCurrentDmPin() {
    const channelId = this._getSelectedDmChannelId();
    if (!channelId) return;
    const currentCat = this.getChannelListCategory(channelId);
    if (currentCat) {
      this.removeFromCategory(channelId, currentCat, "channelList");
    } else {
      const categories = this.getCategories("channelList", true).filter(c => !c.predefined);
      if (categories.length) {
        this.addToCategory(channelId, categories[0], "channelList");
      } else {
        UI.showToast("No categories available. Create one first.", { type: "warning" });
      }
    }
  }
  showQuickCategoryPicker() {
    const channelId = this._getSelectedDmChannelId();
    if (!channelId) return;
    const categories = this.getCategories("channelList", true).filter(c => !c.predefined);
    if (!categories.length) {
      UI.showToast("No categories available", { type: "info" });
      return;
    }
    const names = categories.map((c, i) => `${i + 1}. ${c.name}`).join("\n");
    const selectionRef = { current: "" };
    const content = ce("div", {},
      ce("div", { style: { marginBottom: 8 } }, "Select category by number:"),
      ce("div", { style: { whiteSpace: "pre-line", color: "var(--text-muted)", marginBottom: 8, fontSize: 13 } }, names),
      ce("input", {
        type: "number", min: 1, max: categories.length,
        autoFocus: true,
        className: "bpindms-input-field",
        onChange: (e) => { selectionRef.current = e.target.value; }
      })
    );
    UI.showConfirmationModal("Quick Category Picker", content, {
      confirmText: "Go", cancelText: "Cancel",
      onConfirm: () => {
        const index = Number.parseInt(selectionRef.current, 10) - 1;
        if (index >= 0 && index < categories.length) {
          const currentCat = this.getChannelListCategory(channelId);
          if (currentCat) this.removeFromCategory(channelId, currentCat, "channelList", true);
          this.addToCategory(channelId, categories[index], "channelList");
        }
      }
    });
  }
  jumpToCategory(index) {
    const categories = this.getCategories("channelList", true);
    if (categories[index]) {
      const firstDm = this.filterDMs(categories[index].dms, !categories[index].predefined)[0];
      if (firstDm) {
        globalThis.location.hash = `#/channels/@me/${firstDm}`;
      }
    }
  }
  //#endregion Keyboard Shortcuts
};
//#endregion Main Plugin
