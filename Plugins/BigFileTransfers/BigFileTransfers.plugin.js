/**
 * @name BigFileTransfers
 * @author Pharaoh2k
 * @authorId 874825550408089610
 * @description Enables uploading and downloading very large files (up to ~2GB) by splitting them into chunks and reassembling them automatically. Both sender and receiver need the plugin. Includes automatic chunk sending, low‑memory mode, and other conveniences. Like BetterSplitLargeMessages, it doesn’t bypass Discord’s limits or Nitro, it simply works within them to make large transfers possible.

 * @version 1.0.1
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BigFileTransfers/BigFileTransfers.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BigFileTransfers/BigFileTransfers.plugin.js
 */
/*
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * **
 * Contributions are welcome via GitHub pull requests. 
 * Please ensure submissions align with the project's guidelines and coding standards.
*/
const { DOM, UI, Patcher, Data, Hooks, Webpack, ContextMenu, Logger, React, Net, Plugins, Utils } = BdApi;
const { Filters } = Webpack;
const DEFAULT_UPLOAD_LIMIT = 10 * 1024 * 1024; /* Default Discord upload limit (10MB) for non-Nitro users */
const UPLOAD_OVERHEAD = 4096; /* Reserved bytes for Discord's upload metadata/headers */
const STORE_NAMES = ["UserStore", "MessageStore", "ChannelStore", "SelectedChannelStore"];
const GITHUB_REPO = "Pharaoh2k/BetterDiscordStuff";
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
            Logger.error(this.name, "Update check failed:", e);
            if (!silent) UI.showToast(`[${this.name}] Update check failed`, { type: "error" });
        }
    }
    showUpdateNotice(version, text) {
        this._closeNotification();
        const handle = UI.showNotification?.({
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
                        this.applyUpdate(text, version);
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
        }) ?? UI.showNotice(`${this.name} v${version} is available`, {
            type: "info",
            buttons: [
                {
                    label: "Update",
                    onClick: (closeOrEvent) => {
                        if (typeof closeOrEvent === "function") closeOrEvent();
                        else this._closeNotification();
                        this.applyUpdate(text, version);
                    },
                },
                {
                    label: "Dismiss",
                    onClick: (closeOrEvent) => {
                        if (typeof closeOrEvent === "function") closeOrEvent();
                        else this._closeNotification();
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
                UI.showToast(`Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
                return;
            }
            const nextVersion = validated.version ?? version;
            require("fs").writeFileSync(__filename, text);
            UI.showToast(`Updated to v${nextVersion}. Reloading...`, { type: "success" });
            setTimeout(() => {
                try {
                    Plugins.reload(this.name);
                } catch {
                    UI.showToast("Please reload Discord (Ctrl+R)", { type: "info", timeout: 0 });
                }
            }, 100);
        } catch (e) {
            Logger.error(this.name, "Update failed:", e);
            UI.showToast("Update failed", { type: "error" });
        }
    }
    async showChangelog() {
        const last = Data.load(this.name, 'version');
        Logger.info(this.name, `showChangelog: last=${last}, current=${this.version}`);
        if (last === this.version) { Logger.info(this.name, "Skipping: versions match"); return; }
        Data.save(this.name, 'version', this.version);
        if (!last) { Logger.info(this.name, "Skipping: fresh install"); return; }
        try {
            const res = await Net.fetch(this.urls.changelog);
            Logger.info(this.name, `Changelog fetch status: ${res.status}`);
            if (res.status !== 200) return;
            const md = await res.text();
            const changes = this.parseChangelog(md, last, this.version);
            Logger.info(this.name, "Parsed changes:", changes);
            if (changes.length === 0) return;
            UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes });
        } catch (e) { Logger.error(this.name, "Changelog error:", e); }
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
module.exports = class BigFileTransfers {
    EXT = ".bftr";
    HEADER_SIZE = 4;
    MAGIC0 = 0xdf;
    MAGIC1 = 0x00;
    BATCH_SIZE = 10;
    MAX_CHUNKS = 200;
    DOWNLOAD_CONCURRENCY = 6;
    MAX_RAM_ASSEMBLY_SIZE = 2000 * 1024 * 1024;
    _refreshTimer = null;
    _queuedUploads = new Map();
    _uploadPumpInFlight = new Set();
    _uploadProgress = new Map();
    _dispatcherSubs = [];
    _unpatches = [];
    _fileSizePatch = null;
    _totalSizePatch = null;
    _discordModules = {};
    _realUploadLimit = DEFAULT_UPLOAD_LIMIT;
    _netApi = null;
    _DownloadIcon = (props) => React.createElement("svg", {
        "aria-hidden": true, role: "img", xmlns: "http://www.w3.org/2000/svg",
        width: 24, height: 24, fill: "none", viewBox: "0 0 24 24", ...props
    }, React.createElement("path", {
        fill: "currentColor",
        d: "M12 2a1 1 0 0 1 1 1v10.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V3a1 1 0 0 1 1-1ZM3 20a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z"
    }));
    _TrashIcon = (props) => React.createElement("svg", {
        "aria-hidden": true, role: "img", xmlns: "http://www.w3.org/2000/svg",
        width: 24, height: 24, fill: "none", viewBox: "0 0 24 24", ...props
    },
        React.createElement("path", {
            fill: "currentColor",
            d: "M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"
        }),
        React.createElement("path", {
            fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd",
            d: "M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
        })
    );
    constructor(meta) {
        this.meta = meta;
        this.name = meta.name;
        this._timers = new Set();
        this._settings = this._getDefaultSettings();
        this._initState();
        this.updateManager = new UpdateManager(this.name, this.meta.version, GITHUB_REPO);
    }
    getName() { return this.meta.name; }
    getAuthor() { return this.meta.author; }
    getVersion() { return this.meta.version; }
    getDescription() { return this.meta.description; }
    _initState() {
        this._state = Object.assign(new Utils.Store(), {
            enabled: false,
            downloads: [],
            incomplete: [],
            downloadByFirstAttachmentId: new Map(),
            incompleteByAttachmentId: new Map(),
            allCompleteChunkIds: new Set(),
            incompleteRepresentativeMessageIds: new Set(),
            incompleteRepresentativeAttachmentIds: new Set(),
            activeDownloads: new Map(),
            deletingUploadIds: new Set()
        });
    }
    /*---  LIFECYCLE ---*/
    start() {
        try {
            this._settings = this._loadSettings();
            this._netApi = new BdApi(this.name).Net;
            DOM.addStyle(this.name, this._css());
            this._initModules();
            this._realUploadLimit = this._getMaxFileSize() || DEFAULT_UPLOAD_LIMIT;
            this._patchFileSizeLimitLogic();
            this._patchTotalMessageSizeLimit();
            this._patchUploadPipeline();
            this._patchContextMenus();
            this._patchFileAttachment();
            this._patchMessageAccessories();
            this._patchMessageComponent();
            this._wireDispatcher();
            UI.showToast(`${this.name} started`, { type: "success" });
            this._state.enabled = true;
            this._findAvailableDownloads();
            this._forceMessageRerender();
            this.updateManager.start(this._settings.autoUpdate);
        } catch (e) {
            Logger.error(this.name, "Startup failed", e);
            UI.showToast(`${this.name} failed to start`, { type: "error" });
            this.stop();
        }
    }
    stop() {
        for (const timer of this._timers) clearTimeout(timer);
        this._timers.clear();
        try { Patcher.unpatchAll(this.name); } catch { }
        while (this._unpatches.length) {
            try { this._unpatches.pop()?.(); } catch { }
        }
        for (const sub of this._dispatcherSubs) {
            try { sub.dispatcher.unsubscribe(sub.event, sub.fn); } catch { }
        }
        this._dispatcherSubs = [];
        if (this._fileSizePatch) {
            const { module, key, original } = this._fileSizePatch;
            try { module[key] = original; } catch { }
            this._fileSizePatch = null;
        }
        if (this._totalSizePatch) {
            const { module, key, original } = this._totalSizePatch;
            try { module[key] = original; } catch { }
            this._totalSizePatch = null;
        }
        if (this._refreshTimer) {
            clearTimeout(this._refreshTimer);
            this._refreshTimer = null;
        }
        this._lastRefreshChannelId = null;
        this._lastRefreshFingerprint = null;
        this._queuedUploads.clear();
        this._uploadPumpInFlight.clear();
        this._uploadProgress.clear();
        this._state.activeDownloads.clear();
        this._state.enabled = false;
        this._state.emitChange();
        DOM.removeStyle(this.name);
        this.updateManager.stop();
    }
    /*---  SETTINGS ---*/
    _SettingsPanel = () => {
        const settings = Hooks.useData(this.name, "settings") || this._getDefaultSettings();
        const canStream = this._canUseFsStreaming();
        return UI.buildSettingsPanel({
            settings: [
                {
                    type: "switch", id: "autoSendChunks", name: "Auto-Send Chunks",
                    note: "Automatically send remaining chunks after the first batch. (Recommended)",
                    value: settings.autoSendChunks
                },
                {
                    type: "slider", id: "deletionDelaySeconds", name: "Chunk Deletion Delay",
                    note: "Delay before auto-deleting each chunk message.",
                    min: 2, max: 12, step: 1, value: settings.deletionDelaySeconds,
                    markers: [2, 4, 6, 8, 10, 12], units: "s"
                },
                {
                    type: "slider", id: "autoSendDelaySeconds", name: "Auto-Send Delay",
                    note: "Delay before sending remaining chunks.",
                    min: 2, max: 20, step: 1, value: settings.autoSendDelaySeconds,
                    markers: [2, 5, 10, 15, 20], units: "s", disabled: !settings.autoSendChunks
                },
                {
                    type: "switch", id: "useStreamingMode", name: "Low Memory Mode",
                    note: canStream ? "Saves files directly to disk." : "Not available.",
                    disabled: !canStream, value: canStream && settings.useStreamingMode
                },
                {
                    type: "switch", id: "autoUpdate", name: "Automatic Updates",
                    note: "Check for updates every 24 hours and on Discord startup.",
                    value: settings.autoUpdate
                },
                {
                    type: "button", id: "checkUpdate", name: "Check for Updates",
                    note: "Manually check for plugin updates.",
                    children: "Check Now", onClick: () => this.updateManager.check()
                },
                {
                    type: "button", id: "viewChangelog", name: "View Changelog",
                    note: "View all version changes.",
                    children: "View Changelog", onClick: () => this.updateManager.showFullChangelog()
                }
            ],
            onChange: (_category, id, value) => {
                const next = { ...settings, [id]: value };
                this._settings = next;
                this._saveSettings(next);
                if (id === "autoUpdate") {
                    if (value) this.updateManager.start(true);
                    else this.updateManager.stop();
                }
            }
        });
    };
    getSettingsPanel() {
        return React.createElement(this._SettingsPanel);
    }
    _getDefaultSettings() {
        return {
            autoSendChunks: true,
            deletionDelaySeconds: 2,
            autoSendDelaySeconds: 5,
            useStreamingMode: this._canUseFsStreaming(),
            autoUpdate: true
        };
    }
    _loadSettings() {
        return Data.load(this.name, "settings") || this._getDefaultSettings();
    }
    _saveSettings(data) {
        Data.save(this.name, "settings", data);
    }
    /*---  MODULE INITIALIZATION ---*/
    _getModuleWithFallbacks(method, ...keyGroups) {
        for (const keys of keyGroups) {
            const result = method(...keys, { searchExports: true });
            if (result) return result;
        }
        return null;
    }
    _initModules() {
        for (const name of STORE_NAMES) {
            this._discordModules[name] = Webpack.getStore(name);
        }
        this._discordModules.Dispatcher =
            Webpack.getModule(Filters.combine(
                Filters.byKeys("dispatch", "subscribe", "unsubscribe", "_actionHandlers"),
                Filters.not(Filters.byKeys("addListener", "removeListener"))
            ), { searchExports: true }) ||
            Webpack.getByKeys("_subscriptions", "_waitQueue", { searchExports: true }) ||
            Webpack.getByKeys("actionLogger", "functionCache", { searchExports: true });
        this._discordModules.MessageActions = this._getModuleWithFallbacks(
            Webpack.getByKeys,
            ["deleteMessage", "jumpToMessage"],
            ["sendMessage", "fetchMessages"],
            ["clearChannel", "sendBotMessage"]
        );
        this._discordModules.MessageAttachmentManager = this._getModuleWithFallbacks(
            Webpack.getByKeys,
            ["addFiles", "setUploads"],
            ["popFirstFile", "clearAll"],
            ["removeFiles", "setFile"]
        );
        this._discordModules.UploadAttachmentStore = Webpack.getStore("UploadAttachmentStore");
        this._discordModules.PremiumPerks = this._getModuleWithFallbacks(
            Webpack.getByKeys,
            ["getUserMaxFileSize", "isPremiumAtLeast"],
            ["isPremium", "getPrice"],
            ["getPremiumType", "getInterval"]
        );
        this._discordModules.PermissionsBits = this._getModuleWithFallbacks(
            Webpack.getByKeys,
            ["MANAGE_MESSAGES", "SEND_MESSAGES"],
            ["ADMINISTRATOR", "KICK_MEMBERS"],
            ["BAN_MEMBERS", "MANAGE_CHANNELS"]
        );
        this._discordModules.PermissionStore = Webpack.getStore("PermissionStore");
        this._discordModules.PermissionUtils =
            Webpack.getByKeys("computePermissions", { searchExports: true }) ||
            Webpack.getByKeys("getChannelPermissions", { searchExports: true }) ||
            Webpack.getBySource("computePermissions(", { searchExports: true });
        this._discordModules.FileClasses = this._getModuleWithFallbacks(
            Webpack.getByKeys,
            ["filenameLinkWrapper", "fileNameLink", "fileWrapper", "fileInner"],
            ["icon", "metadata"],
            ["progressContainer", "cancelButton"]
        );
        this._discordModules.MosaicClasses = this._getModuleWithFallbacks(
            Webpack.getByKeys,
            ["mosaicItem", "mosaicItemContent"],
            ["hiddenMosaicItem", "obscured"],
            ["removeMosaicItemButton", "downloadHoverButtonIcon"]
        );
        this._discordModules.ProgressClasses = this._getModuleWithFallbacks(
            Webpack.getByKeys,
            ["progressBar", "progress", "indeterminate"],
            ["animating", "xxsmall"],
            ["indeterminateBar1", "indeterminateBar2"]
        );
        this._discordModules.HoverButtonClasses = this._getModuleWithFallbacks(
            Webpack.getByKeys,
            ["hoverButtonGroup", "hoverButton", "sizer"],
            ["nonMediaMosaicItem"]
        );
        this._discordModules.FileAttachment = this._getModuleWithFallbacks(
            Webpack.getBySource,
            ["renderAdjacentContent", "filenameLinkWrapper"],
            ["fileWrapper", "fileNameLink", "fileSize"]
        );
        this._discordModules.MessageAccessories = this._findMessageAccessories();
        this._discordModules.MessageComponent =
            Webpack.getModule(Filters.combine(Filters.bySource("Message must be a thread starter message"), m => !m.$$typeof), { searchExports: true }) ||
            Webpack.getModule(Filters.combine(Filters.bySource("quotedChatMessage", "bg-flash-"), m => !m.$$typeof), { searchExports: true }) ||
            Webpack.getModule(Filters.combine(Filters.bySource("messageListItem", "hasThread", "isSystemMessage"), m => !m.$$typeof), { searchExports: true });
        const uploadExports = Webpack.getMangled('shouldUploadFailureSendNot', { uploadWithProgress: Filters.byStrings('UPLOAD_START') }
        );
        this._discordModules.uploadWithProgress = uploadExports?.uploadWithProgress;

        const cloudExports = Webpack.getMangled('uploadFileToCloud', { CloudUpload: Filters.byPrototypeKeys('uploadFileToCloud') }
        );
        this._discordModules.CloudUpload = cloudExports?.CloudUpload;
        const failed = Object.keys(this._discordModules).filter(k => !this._discordModules[k]);
        if (failed.length) Logger.warn(this.name, "Modules not found:", failed);
        if (!this._discordModules.MessageAttachmentManager) throw new Error("MessageAttachmentManager not found");
        if (!this._discordModules.Dispatcher) throw new Error("Dispatcher not found");
    }
    _findMessageAccessories() {
        const try1 = Webpack.getByPrototypeKeys("renderAttachments", { searchExports: true });
        if (try1?.prototype?.renderAttachments) return try1;
        if (try1?.default?.prototype?.renderAttachments) return try1.default;
        const try2 = Webpack.getByPrototypeKeys("renderEmbeds", "renderReactions", { searchExports: true });
        if (try2?.prototype?.renderAttachments) return try2;
        if (try2?.default?.prototype?.renderAttachments) return try2.default;
        const try3 = Webpack.getByPrototypeKeys("renderGiftCodes", "shouldComponentUpdate", { searchExports: true });
        if (try3?.prototype?.renderAttachments) return try3;
        if (try3?.default?.prototype?.renderAttachments) return try3.default;
        const withKey = Webpack.getWithKey?.(Filters.byStrings("renderAttachments", "attachments"), {
            searchExports: true
        });
        const mod = Array.isArray(withKey) ? withKey[0] : null;
        const key = Array.isArray(withKey) ? withKey[1] : null;
        const candidate = key ? mod?.[key] : mod;
        if (candidate?.prototype?.renderAttachments) return candidate;
        if (candidate?.default?.prototype?.renderAttachments) return candidate.default;
        return null;
    }
    /*---  UPLOAD LOGIC ---*/
    _patchUploadPipeline() {
        const mgr = this._discordModules.MessageAttachmentManager;
        Patcher.instead(this.name, mgr, "addFiles", async (_that, [args], original) => {
            const files = args?.files ?? [];
            const channelId = args?.channelId;
            if (!Array.isArray(files) || !channelId) return original(args);
            const maxSize = this._realUploadLimit;
            const regular = [];
            const oversized = [];
            for (const container of files) {
                const f = container?.file ?? container;
                if (!f?.size) { regular.push(container); continue; }
                if (f.size <= maxSize - UPLOAD_OVERHEAD) regular.push(container);
                else oversized.push(container);
            }
            if (oversized.length === 0) return original(args);
            try {
                const queue = this._queuedUploads.get(channelId) ?? [];
                for (const c of regular) queue.push({ kind: "container", container: c });
                for (const container of oversized) {
                    const f = container?.file ?? container;
                    const split = this._splitFileIntoChunks(f, maxSize);
                    if (split) queue.push({ kind: "split", split, template: container });
                }
                this._queuedUploads.set(channelId, queue);
                let totalChunks = 0;
                for (const item of queue) {
                    if (item.kind === "split") totalChunks += item.split.totalChunks;
                }
                if (totalChunks > 0) {
                    this._uploadProgress.set(channelId, { total: totalChunks, sent: 0 });
                    UI.showToast(`Splitting file into ${totalChunks} chunks…`, { type: "info" });
                }
                const batch = await this._materializeNextBatch(channelId, this.BATCH_SIZE);
                if (batch.length === 0) return;
                const progress = this._uploadProgress.get(channelId);
                if (progress) {
                    progress.sent += batch.filter(item => this._isChunkFile((item?.file ?? item)?.name)).length;
                }
                return original({ ...args, files: batch, showLargeMessageDialog: false });
            } catch (e) {
                this._logError("Split failed", e);
                UI.showToast("Split failed: " + (e?.message || String(e)), { type: "error" });
                this._uploadProgress.delete(channelId);
                return original(args);
            }
        });
    }
    _generateUploadId() {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
        let id = "";
        for (let i = 0; i < 10; i++) {
            id += chars[Math.floor(Math.random() * chars.length)];
        }
        return id;
    }
    _splitFileIntoChunks(file, maxSize) {
        const HEADER_SIZE = this.HEADER_SIZE;
        const MAGIC0 = this.MAGIC0;
        const MAGIC1 = this.MAGIC1;
        const EXT = this.EXT;
        const maxPayload = maxSize - HEADER_SIZE - UPLOAD_OVERHEAD;
        const effectiveMaxChunks = Math.min(this.MAX_CHUNKS, Math.ceil(this.MAX_RAM_ASSEMBLY_SIZE / maxPayload));
        const totalChunks = Math.ceil(file.size / maxPayload);
        if (totalChunks <= 1) return null;
        if (totalChunks > effectiveMaxChunks) {
            const maxSupportedBytes = maxPayload * effectiveMaxChunks;
            UI.showToast(
                `File "${file.name}" too large: would need ${totalChunks} chunks (max ${effectiveMaxChunks}). ` +
                `Max supported at your current limit is ~${this._formatBytes(maxSupportedBytes)}.`,
                { type: "error" }
            );
            return null;
        }
        const uploadId = this._generateUploadId();
        const totalMinusOne = (totalChunks - 1) & 0xff;
        return {
            kind: "split",
            uploadId,
            originalName: file.name,
            totalChunks,
            maxPayload,
            _nextIdx: 0,
            async getChunk(i) {
                if (!Number.isInteger(i) || i < 0 || i >= totalChunks) {
                    throw new Error(`getChunk(${i}) out of range (0..${totalChunks - 1})`);
                }
                const start = i * maxPayload;
                const end = Math.min(file.size, start + maxPayload);
                const header = new Uint8Array(HEADER_SIZE);
                header[0] = MAGIC0;
                header[1] = MAGIC1;
                header[2] = i & 0xff;
                header[3] = totalMinusOne;
                const bodyBlob = file.slice(start, end);
                const chunkName = `${uploadId}_${i}-${totalMinusOne}_${file.name}${EXT}`;
                return new File([header, bodyBlob], chunkName, { type: "application/octet-stream" });
            },
            async getNextChunk() {
                if (this._nextIdx >= totalChunks) return null;
                const f = await this.getChunk(this._nextIdx);
                this._nextIdx++;
                return f;
            },
            isDone() {
                return this._nextIdx >= totalChunks;
            }
        };
    }
    async _materializeNextBatch(channelId, limit = this.BATCH_SIZE) {
        const queue = this._queuedUploads.get(channelId);
        if (!queue || queue.length === 0) return [];
        const out = [];
        while (out.length < limit && queue.length > 0) {
            const item = queue[0];
            if (item.kind === "container") {
                out.push(item.container);
                queue.shift();
                continue;
            }
            if (item.kind === "split") {
                const split = item.split;
                const template = item.template || {};
                while (out.length < limit && !split.isDone()) {
                    const chunkFile = await split.getNextChunk();
                    if (!chunkFile) break;
                    out.push({ ...template, file: chunkFile });
                }
                if (split.isDone()) {
                    queue.shift();
                }
                continue;
            }
            queue.shift();
        }
        if (queue.length === 0) this._queuedUploads.delete(channelId);
        return out;
    }
    _getMaxFileSize() {
        const user = this._discordModules.UserStore?.getCurrentUser?.();
        return this._discordModules.PremiumPerks?.getUserMaxFileSize?.(user) || DEFAULT_UPLOAD_LIMIT;
    }
    /*---  DOWNLOAD LOGIC ---*/
    _downloadAndReassemble = async (download, opts = {}) => {
        if (!download) return;
        if (!opts.forceRam && this._canUseFsStreaming() && (this._settings.useStreamingMode ?? true)) {
            return this._streamDownloadToDisk(download);
        }
        const channelId = this._getCurrentChannelId();
        let collected = this._collectDownloadFromChannel(channelId, download.uploadId);
        if (!collected) {
            return this._promptBackfillAndRetry(download, channelId, opts);
        }
        return this._executeDownload(download, collected, channelId, opts);
    };
    _promptBackfillAndRetry(download, channelId, opts) {
        UI.showConfirmationModal(
            "Missing Chunks",
            `Some chunks for "${download.filename}" are not loaded. Would you like to fetch older messages to find them? (This will load up to 400 messages from history)`,
            {
                confirmText: "Load Messages",
                cancelText: "Cancel",
                onConfirm: async () => {
                    await this._backfillOlderMessages(channelId, 4, 100);
                    const collected = this._collectDownloadFromChannel(channelId, download.uploadId);
                    if (!collected) {
                        UI.showToast("Still missing chunks. Try scrolling up manually.", { type: "warning" });
                        return;
                    }
                    if (!opts.forceRam && this._canUseFsStreaming() && (this._settings.useStreamingMode ?? true)) {
                        return this._executeStreamDownload(download, collected, channelId);
                    }
                    return this._executeDownload(download, collected, channelId, opts);
                }
            }
        );
    }
    async _executeDownload(download, collected, channelId, opts = {}) {
        const key = `${channelId}:${download.uploadId}`;
        if (this._state.activeDownloads.has(key)) {
            return UI.showToast("Already downloading!", { type: "info" });
        }
        this._state.activeDownloads.set(key, { progress: 0, total: collected.totalBytes });
        this._state.emitChange();
        try {
            const expectedTotalMinusOne = collected.totalChunks - 1;
            const bodySizes = new Array(collected.totalChunks);
            let canPreallocate = true;
            for (const c of collected.chunks) {
                if (!c.size || c.size < this.HEADER_SIZE) {
                    canPreallocate = false;
                    break;
                }
                bodySizes[c.idx] = c.size - this.HEADER_SIZE;
            }
            if (!canPreallocate) {
                const fetchTasks = collected.chunks.map((chunk) => async () => {
                    const buf = await this._fetchBuffer(chunk.url);
                    const dlState = this._state.activeDownloads.get(key);
                    if (dlState) {
                        dlState.progress += buf.length;
                        this._state.emitChange();
                    }
                    return buf;
                });
                const chunkBuffers = await this._fetchWithConcurrencyLimit(fetchTasks, this.DOWNLOAD_CONCURRENCY);
                const parts = new Array(chunkBuffers.length);
                for (let i = 0; i < chunkBuffers.length; i++) {
                    const chunk = collected.chunks[i];
                    const buf = chunkBuffers[i];
                    this._validateChunkHeader(buf, chunk.idx, expectedTotalMinusOne);
                    parts[i] = buf.subarray(this.HEADER_SIZE);
                }
                const combined = this._concatUint8(parts);
                this._saveBytesWithDialog(combined, download.filename);
                UI.showToast("Download complete!", { type: "success" });
                return;
            }
            const offsets = new Array(collected.totalChunks);
            let totalOut = 0;
            for (let i = 0; i < collected.totalChunks; i++) {
                offsets[i] = totalOut;
                totalOut += bodySizes[i];
            }
            if (totalOut > this.MAX_RAM_ASSEMBLY_SIZE) {
                throw new Error(
                    `File too large to reassemble in memory (${this._formatBytes(totalOut)}). Max: ~1.9 GB.`
                );
            }
            let combined;
            try {
                combined = new Uint8Array(totalOut);
            } catch (error_) {
                throw new Error(
                    `Failed to allocate ${this._formatBytes(totalOut)} for reassembly: ${error_?.message || error_}. Try a smaller file.`
                );
            }
            const maxChunkBytes = Math.max(...collected.chunks.map(c => c.size || 0));
            const targetInFlight = 128 * 1024 * 1024; /* Target ~128MB of concurrent downloads to balance speed and memory */
            const effectiveConcurrency = Math.max(
                1,
                Math.min(this.DOWNLOAD_CONCURRENCY, Math.floor(targetInFlight / Math.max(1, maxChunkBytes)))
            );
            const tasks = collected.chunks.map((chunk) => async () => {
                const buf = await this._fetchBuffer(chunk.url);
                const dlState = this._state.activeDownloads.get(key);
                if (dlState) {
                    dlState.progress += buf.length;
                    this._state.emitChange();
                }
                this._validateChunkHeader(buf, chunk.idx, expectedTotalMinusOne);
                const body = buf.subarray(this.HEADER_SIZE);
                const expectedBody = bodySizes[chunk.idx];
                if (expectedBody !== body.length) {
                    throw new Error(
                        `Chunk ${chunk.idx} size mismatch: expected ${expectedBody}, got ${body.length}`
                    );
                }
                combined.set(body, offsets[chunk.idx]);
                return true;
            });
            await this._fetchWithConcurrencyLimit(tasks, effectiveConcurrency);
            this._saveBytesWithDialog(combined, download.filename);
            UI.showToast("Download complete!", { type: "success" });
        } catch (e) {
            if (e?.name !== "AbortError") {
                this._logError("Download failed", e);
                UI.showToast(`Download failed: ${e?.message || String(e)}`, { type: "error" });
            }
        } finally {
            this._state.activeDownloads.delete(key);
            this._state.emitChange();
        }
    }
    _collectDownloadFromChannel(channelId, uploadId) {
        const messages = this._getChannelMessages(channelId);
        if (!messages || messages.length === 0) {
            UI.showToast("No messages loaded. Try scrolling up.", { type: "error" });
            return null;
        }
        const found = [];
        let totalChunks = null;
        let totalBytes = 0;
        for (const msg of messages) {
            for (const att of msg.attachments ?? []) {
                const parsed = this._parseChunkFilename(att?.filename);
                if (!parsed || parsed.uploadId !== uploadId) continue;
                if (totalChunks === null) totalChunks = parsed.total;
                if (totalChunks !== parsed.total) continue;
                const attSize = Number(att.size) || 0;
                found.push({
                    idx: parsed.idx,
                    url: att.url,
                    size: attSize,
                    messageId: msg.id,
                    authorId: msg.author?.id
                });
                totalBytes += attSize;
            }
        }
        if (!totalChunks) {
            UI.showToast("No chunks found for this file.", { type: "error" });
            return null;
        }
        const unique = new Map();
        for (const item of found) {
            if (!unique.has(item.idx)) unique.set(item.idx, item);
        }
        for (let i = 0; i < totalChunks; i++) {
            if (!unique.has(i)) {
                UI.showToast(`Missing chunks! Found ${unique.size}/${totalChunks}. Scroll up to load more.`, {
                    type: "warning"
                });
                return null;
            }
        }
        for (const idx of unique.keys()) {
            if (!Number.isInteger(idx) || idx < 0 || idx >= totalChunks) {
                UI.showToast("Found an invalid chunk index in channel history.", { type: "error" });
                return null;
            }
        }
        const chunks = Array.from(unique.values()).sort((a, b) => a.idx - b.idx);
        return {
            chunks,
            totalChunks,
            totalBytes
        };
    }
    async _fetchBuffer(url) {
        const response = await this._netApi.fetch(url, { timeout: 3000000 });
        if (response.status >= 400) {
            throw new Error(`HTTP ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        return new Uint8Array(buffer);
    }
    async _fetchWithConcurrencyLimit(tasks, concurrency, onProgress) {
        const results = new Array(tasks.length);
        let nextIndex = 0;
        let completed = 0;
        const runNext = async () => {
            while (nextIndex < tasks.length) {
                const idx = nextIndex++;
                const task = tasks[idx];
                results[idx] = await task();
                completed++;
                if (onProgress) onProgress(completed, tasks.length);
            }
        };
        const workers = [];
        for (let i = 0; i < Math.min(concurrency, tasks.length); i++) {
            workers.push(runNext());
        }
        await Promise.all(workers);
        return results;
    }
    async _streamDownloadToDisk(download) {
        const channelId = this._getCurrentChannelId();
        if (!channelId) return UI.showToast("No channel selected.", { type: "error" });
        let collected = this._collectDownloadFromChannel(channelId, download.uploadId);
        if (!collected) {
            return this._promptBackfillAndRetry(download, channelId, {});
        }
        return this._executeStreamDownload(download, collected, channelId);
    }
    async _executeStreamDownload(download, collected, channelId) {
        const key = `${channelId}:${download.uploadId}`;
        if (this._state.activeDownloads.has(key)) return UI.showToast("Already downloading!", { type: "info" });
        const res = await UI.openDialog({
            mode: "save",
            title: "Save file",
            defaultPath: (download?.filename || "downloaded_file.bin")
        });
        if (res?.cancelled || !res?.filePath) return UI.showToast("Save cancelled.", { type: "info" });
        const outPath = res.filePath;
        const fs = require("fs");
        const path = require("path");
        const basePath = process.env.TEMP || process.env.TMP || process.env.TMPDIR || "/tmp";
        const tmpDir = path.join(basePath, `${this.name}_tmp`, download.uploadId);
        try { fs.mkdirSync(tmpDir, { recursive: true }); } catch { }
        const expectedTotalMinusOne = (collected.totalChunks - 1) & 0xff;
        const sortedChunks = [...collected.chunks].sort((a, b) => a.idx - b.idx);
        this._state.activeDownloads.set(key, { progress: 0, total: collected.totalBytes });
        this._state.emitChange();
        let isAborted = false;
        let firstError = null;
        const updateProgress = (n) => {
            const dlState = this._state.activeDownloads.get(key);
            if (dlState) {
                dlState.progress += n;
                this._state.emitChange();
            }
        };
        const writeToStream = (stream, u8) => new Promise((resolve, reject) => {
            if (!(u8 instanceof Uint8Array)) {
                return reject(new TypeError(`writeToStream expected Uint8Array, got ${typeof u8}`));
            }
            const onComplete = err => err ? reject(err) : resolve();
            if (!stream.write(u8, onComplete)) stream.once("drain", resolve);
        });
        const fetchChunkToPartFile = async (chunk) => {
            const partPath = path.join(tmpDir, `${String(chunk.idx).padStart(5, "0")}.part`);
            try { if (fs.existsSync(partPath)) fs.rmSync(partPath); } catch { }
            const response = await this._netApi.fetch(chunk.url, { timeout: 3000000 });
            if (response.status >= 400) throw new Error(`HTTP ${response.status} on chunk ${chunk.idx}`);
            const body = response.body;
            if (!body || typeof body.getReader !== "function") {
                const buf = new Uint8Array(await response.arrayBuffer());
                updateProgress(buf.length);
                this._validateChunkHeader(buf, chunk.idx, expectedTotalMinusOne);
                fs.writeFileSync(partPath, buf.subarray(this.HEADER_SIZE));
                return partPath;
            }
            const reader = body.getReader();
            const ws = fs.createWriteStream(partPath, { flags: "w" });
            let header = new Uint8Array(0);
            let headerDone = false;
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    if (!value || value.length === 0) continue;
                    updateProgress(value.length);
                    let chunkU8 = value;
                    if (!headerDone) {
                        const need = this.HEADER_SIZE - header.length;
                        if (chunkU8.length < need) {
                            const next = new Uint8Array(header.length + chunkU8.length);
                            next.set(header, 0);
                            next.set(chunkU8, header.length);
                            header = next;
                            continue;
                        }
                        const h = new Uint8Array(this.HEADER_SIZE);
                        h.set(header, 0);
                        h.set(chunkU8.subarray(0, need), header.length);
                        headerDone = true;
                        this._validateChunkHeader(h, chunk.idx, expectedTotalMinusOne);
                        chunkU8 = chunkU8.subarray(need);
                        if (chunkU8.length === 0) continue;
                    }
                    await writeToStream(ws, chunkU8);
                }
                await new Promise((resolve, reject) => {
                    ws.end(() => resolve());
                    ws.on("error", reject);
                });
                return partPath;
            } catch (e) {
                try { ws.destroy(); } catch { }
                try { fs.rmSync(partPath); } catch { }
                throw e;
            } finally {
                try { reader.releaseLock(); } catch { }
            }
        };
        const mergeParts = async () => {
            const out = fs.createWriteStream(outPath, { flags: "w" });
            for (let i = 0; i < collected.totalChunks; i++) {
                const partPath = path.join(tmpDir, `${String(i).padStart(5, "0")}.part`);
                const data = fs.readFileSync(partPath, null);
                if (typeof data === "string") {
                    throw new TypeError(`Part ${i} was read as a string (utf8). Ensure readFileSync(partPath, null) is used.`);
                }
                await writeToStream(out, data);
            }
            await new Promise((resolve, reject) => {
                out.on("finish", resolve);
                out.on("error", reject);
                out.end();
            });
        };
        try {
            let qIndex = 0;
            const worker = async () => {
                while (!isAborted && qIndex < sortedChunks.length) {
                    const c = sortedChunks[qIndex++];
                    try { await fetchChunkToPartFile(c); }
                    catch (e) { if (!isAborted) { isAborted = true; firstError = e; } }
                }
            };
            await Promise.all(Array.from({ length: Math.min(this.DOWNLOAD_CONCURRENCY, sortedChunks.length) }, worker));
            if (firstError) throw firstError;
            await mergeParts();
            UI.showToast("Saved successfully.", { type: "success" });
        } catch (e) {
            this._logError("Streaming download failed", e);
            UI.showToast(`Download failed: ${e?.message || String(e)}`, { type: "error" });
        } finally {
            try { require("fs").rmSync(tmpDir, { recursive: true, force: true }); } catch { }
            this._state.activeDownloads.delete(key);
            this._state.emitChange();
        }
    };
    /*---  DOWNLOAD DISCOVERY ---*/
    _lastRefreshChannelId = null;
    _lastRefreshFingerprint = null;
    _scheduleRefresh(delay = 500) {
        if (this._refreshTimer) clearTimeout(this._refreshTimer);
        this._refreshTimer = setTimeout(() => {
            this._refreshTimer = null;
            this._findAvailableDownloads();
        }, delay);
    }
    _getMessageFingerprint(messages) {
        if (!messages || messages.length === 0) return null;
        const SAMPLE_SIZE = 10;
        const first = messages.slice(0, SAMPLE_SIZE);
        const last = messages.length > SAMPLE_SIZE ? messages.slice(-SAMPLE_SIZE) : [];
        let oldestId = first[0].id;
        let newestId = first[0].id;
        for (const msg of first.concat(last)) {
            if (msg.id) {
                if (msg.id < oldestId) oldestId = msg.id;
                if (msg.id > newestId) newestId = msg.id;
            }
        }
        return `${oldestId}:${newestId}:${messages.length}`;
    }
    _findAvailableDownloads() {
        const channelId = this._getCurrentChannelId();
        if (!channelId) return;
        const messages = this._getChannelMessages(channelId);
        const fingerprint = this._getMessageFingerprint(messages);
        if (channelId === this._lastRefreshChannelId && fingerprint === this._lastRefreshFingerprint) {
            return;
        }
        this._lastRefreshChannelId = channelId;
        this._lastRefreshFingerprint = fingerprint;
        const registered = [];
        const incomplete = [];
        const byFirstAttachment = new Map();
        const incompleteByAttachment = new Map();
        if (!messages || messages.length === 0) {
            this._state.downloads = [];
            this._state.incomplete = [];
            this._state.downloadByFirstAttachmentId = new Map();
            this._state.incompleteByAttachmentId = new Map();
            this._state.allCompleteChunkIds = new Set();
            this._state.incompleteRepresentativeMessageIds = new Set();
            this._state.incompleteRepresentativeAttachmentIds = new Set();
            this._state.emitChange();
            return;
        }
        const downloadMap = new Map();
        for (const msg of messages) {
            for (const att of msg.attachments ?? []) {
                const parsed = this._parseChunkFilename(att.filename);
                if (!parsed) continue;
                const key = parsed.uploadId;
                if (!downloadMap.has(key)) {
                    downloadMap.set(key, {
                        uploadId: parsed.uploadId,
                        filename: parsed.originalName,
                        owner: msg.author?.id,
                        urls: [],
                        messages: [],
                        foundParts: new Set(),
                        totalSize: 0,
                        expectedTotal: parsed.total,
                        chunk0AttachmentId: null,
                        allAttachmentIds: [],
                        chunkInfos: []
                    });
                }
                const entry = downloadMap.get(key);
                if (entry.foundParts.has(parsed.idx)) continue;
                if (entry.expectedTotal !== parsed.total) continue;
                entry.urls.push(att.url);
                entry.messages.push({ id: msg.id, date: msg.timestamp, attachmentId: att.id });
                entry.foundParts.add(parsed.idx);
                entry.totalSize += Math.max(0, (att.size || 0) - this.HEADER_SIZE);
                entry.allAttachmentIds.push(att.id);
                entry.chunkInfos.push({ attachmentId: att.id, chunkIdx: parsed.idx, messageId: msg.id, url: att.url });
                if (parsed.idx === 0) entry.chunk0AttachmentId = att.id;
            }
        }
        for (const [, download] of downloadMap) {
            if (download.foundParts.size === download.expectedTotal) {
                download.messages.sort((a, b) => new Date(a.date) - new Date(b.date));
                registered.push(download);
                if (download.chunk0AttachmentId) byFirstAttachment.set(download.chunk0AttachmentId, download);
            } else {
                if (download.chunkInfos.length > 0) {
                    download.chunkInfos.sort((a, b) => a.chunkIdx - b.chunkIdx);
                    download.representativeAttachmentId = download.chunkInfos[0].attachmentId;
                    download.representativeMessageId = download.chunkInfos[0].messageId;
                }
                incomplete.push(download);
                for (const attId of download.allAttachmentIds) {
                    incompleteByAttachment.set(attId, download);
                }
            }
        }
        const allCompleteChunkIds = new Set();
        for (const download of registered) {
            for (const msgInfo of download.messages) {
                allCompleteChunkIds.add(msgInfo.attachmentId);
            }
        }
        const incompleteRepresentativeMessageIds = new Set();
        const incompleteRepresentativeAttachmentIds = new Set();
        for (const download of incomplete) {
            if (download.representativeMessageId) {
                incompleteRepresentativeMessageIds.add(download.representativeMessageId);
            }
            if (download.representativeAttachmentId) {
                incompleteRepresentativeAttachmentIds.add(download.representativeAttachmentId);
            }
        }
        this._state.downloads = registered;
        this._state.incomplete = incomplete;
        this._state.downloadByFirstAttachmentId = byFirstAttachment;
        this._state.incompleteByAttachmentId = incompleteByAttachment;
        this._state.allCompleteChunkIds = allCompleteChunkIds;
        this._state.incompleteRepresentativeMessageIds = incompleteRepresentativeMessageIds;
        this._state.incompleteRepresentativeAttachmentIds = incompleteRepresentativeAttachmentIds;
        this._state.emitChange();
    }
    _parseChunkFilename = (filename) => {
        if (!this._isChunkFile(filename)) return null;
        const base = filename.slice(0, -this.EXT.length);
        const firstUnderscore = base.indexOf("_");
        if (firstUnderscore === -1) return null;
        const uploadId = base.slice(0, firstUnderscore);
        if (uploadId.length !== 10) return null;
        const rest = base.slice(firstUnderscore + 1);
        const secondUnderscore = rest.indexOf("_");
        if (secondUnderscore === -1) return null;
        const indexPart = rest.slice(0, secondUnderscore);
        const parts = indexPart.split("-");
        if (parts.length !== 2) return null;
        const idx = Number.parseInt(parts[0], 10);
        const totalMinusOne = Number.parseInt(parts[1], 10);
        if (Number.isNaN(idx) || Number.isNaN(totalMinusOne)) return null;
        return {
            uploadId,
            idx,
            total: totalMinusOne + 1,
            originalName: rest.slice(secondUnderscore + 1)
        };
    };
    /*---  FILE ATTACHMENT PATCH ---*/
    _patchFileAttachment() {
        const FileAttachment = this._discordModules.FileAttachment;
        if (!FileAttachment?.Z) {
            Logger.warn(this.name, "FileAttachment.Z not found, custom rendering disabled");
            return;
        }
        Patcher.after(this.name, FileAttachment, "Z", (that, [props], ret) => {
            if (!props?._bftr_isCombinedView) return ret;
            try {
                if (!React.isValidElement(ret)) return ret;
                const topChildren = React.Children.toArray(ret.props?.children);
                if (topChildren.length === 0) return ret;
                const fileDiv = topChildren[0];
                if (!React.isValidElement(fileDiv)) return ret;
                const fileDivChildren = React.Children.toArray(fileDiv.props?.children);
                if (fileDivChildren.length < 2) return ret;
                const fileInner = fileDivChildren[1];
                const { _bftr_isBroken, _bftr_isDownloading, _bftr_progress } = props;
                const iconEl = React.createElement("div", {
                    className: this._discordModules.FileClasses?.icon || "",
                    dangerouslySetInnerHTML: {
                        __html: _bftr_isBroken ? this._brokenFileIconSvg() : this._fileIconSvg()
                    }
                });
                let newFileInner = fileInner;
                if (_bftr_isDownloading && Number.isFinite(_bftr_progress) && React.isValidElement(fileInner)) {
                    const innerChildren = React.Children.toArray(fileInner.props?.children);
                    const PC = this._discordModules.ProgressClasses || {};
                    const FC = this._discordModules.FileClasses || {};
                    const progressBar = React.createElement("div",
                        { className: FC.progressContainer || "" },
                        React.createElement("div", {
                            className: `${FC.progress || ""} ${PC.progress || ""} ${PC.small || ""}`.trim(),
                            style: { backgroundColor: "var(--interactive-background-active)" }
                        },
                            React.createElement("div", {
                                className: `${PC.progressBar || ""} ${PC.small || ""}`.trim(),
                                style: {
                                    transform: `translate3d(-${100 - _bftr_progress}%,0,0)`,
                                    backgroundColor: "var(--brand-500)"
                                }
                            })
                        )
                    );
                    const rebuilt = innerChildren.length >= 2
                        ? [innerChildren[0], progressBar, ...innerChildren.slice(2)]
                        : [...innerChildren, progressBar];
                    newFileInner = React.cloneElement(fileInner, {}, rebuilt);
                }
                const newFileDivChildren = [iconEl, newFileInner, ...fileDivChildren.slice(2)];
                const newFileDiv = React.cloneElement(fileDiv, {}, newFileDivChildren);
                const newTopChildren = [newFileDiv, ...topChildren.slice(1)];
                return React.cloneElement(ret, {}, newTopChildren);
            } catch (e) {
                Logger.warn(this.name, "FileAttachment patch failed safely", e);
                return ret;
            }
        });
    }
    _patchMessageAccessories() {
        const MessageAccessories = this._discordModules.MessageAccessories;
        if (!MessageAccessories?.prototype?.renderAttachments) {
            Logger.warn(this.name, "MessageAccessories.prototype.renderAttachments not found, shim disabled");
            return;
        }
        const { _state, _discordModules, _getCurrentChannelId, _downloadAndReassemble, _formatBytes, _canDeleteDownload, _deleteFragments, _parseChunkFilename, _DownloadIcon, _TrashIcon } = this;
        const stateStore = [_state];
        const progressStores = [_state, _discordModules.SelectedChannelStore].filter(Boolean);
        const AttachmentShim = (props) => {
            const { attachmentId, filename, children } = props;
            const parsed = _parseChunkFilename(filename);
            const uploadId = parsed?.uploadId ?? "";
            const enabled = Hooks.useStateFromStores(stateStore, () => _state.enabled, []);
            const completeDownloadData = Hooks.useStateFromStores(
                stateStore,
                () => _state.downloadByFirstAttachmentId.get(attachmentId) || null,
                [attachmentId]
            );
            const incompleteDownloadData = Hooks.useStateFromStores(
                stateStore,
                () => _state.incompleteByAttachmentId.get(attachmentId) || null,
                [attachmentId]
            );
            const progress = Hooks.useStateFromStores(
                progressStores,
                () => {
                    if (!uploadId) return 0;
                    const channelId = _getCurrentChannelId();
                    if (!channelId) return 0;
                    const key = `${channelId}:${uploadId}`;
                    const dlState = _state.activeDownloads.get(key);
                    if (!dlState?.total) return 0;
                    const pct = Math.round((dlState.progress / dlState.total) * 100);
                    if (!Number.isFinite(pct)) return 0;
                    return Math.max(0, Math.min(100, pct));
                },
                [attachmentId, uploadId]
            );
            const isDeleting = Hooks.useStateFromStores(stateStore, () => _state.deletingUploadIds.has(uploadId), [uploadId]);
            if (!parsed || !enabled) return children;
            if (isDeleting) return null;
            const isIncomplete = !!incompleteDownloadData;
            const isFirstChunk = parsed.idx === 0;
            const isRepresentative = _state.incompleteRepresentativeAttachmentIds.has(attachmentId);
            if (isIncomplete) {
                if (!isRepresentative) return null;
            }
            if (!isFirstChunk && !isIncomplete) {
                return null;
            }
            const isBroken = isIncomplete;
            const downloadData = completeDownloadData || incompleteDownloadData;
            const displayData = downloadData || {
                uploadId: parsed.uploadId,
                filename: parsed.originalName,
                totalSize: null,
                owner: null,
                urls: [],
                messages: []
            };
            const hasFullData = !!downloadData;
            const isDownloading = progress > 0 && progress < 100;
            const handleClick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isDownloading && !isBroken) _downloadAndReassemble(displayData);
            };
            const FileAttachment = _discordModules.FileAttachment?.Z;
            if (!FileAttachment) {
                const sizeText = displayData.totalSize ? _formatBytes(displayData.totalSize) : "...";
                if (isBroken) {
                    return React.createElement(
                        "div",
                        { className: "bftr-minimal bftr-broken" },
                        React.createElement("div", { style: { fontWeight: 600, color: "var(--text-warning)" } }, displayData.filename),
                        hasFullData && _canDeleteDownload(displayData) && React.createElement(
                            "button",
                            { style: { marginTop: 8, cursor: "pointer" }, onClick: (e) => { e.stopPropagation(); _deleteFragments(displayData); } },
                            "Delete Fragments"
                        )
                    );
                }
                return React.createElement(
                    "div",
                    { className: "bftr-minimal", onClick: handleClick, style: { cursor: isDownloading ? "default" : "pointer" } },
                    React.createElement("div", { style: { fontWeight: 600 } }, displayData.filename),
                    isDownloading
                        ? React.createElement("div", null, `Downloading… ${progress}%`)
                        : React.createElement("div", { style: { opacity: 0.8 } }, sizeText)
                );
            }
            const HoverButtons = () => {
                const HBC = _discordModules.HoverButtonClasses || {};
                const MC = _discordModules.MosaicClasses || {};
                return React.createElement("div",
                    { className: `${HBC.hoverButtonGroup || ""} ${HBC.nonMediaMosaicItem || ""}`.trim() },
                    hasFullData && _canDeleteDownload(displayData) && React.createElement("div", {
                        className: `${HBC.hoverButton || ""} ${MC.removeMosaicItemHoverButton || ""}`.trim(),
                        "aria-label": "Delete Fragments",
                        role: "button",
                        tabIndex: 0,
                        onClick: (e) => { e.preventDefault(); e.stopPropagation(); _deleteFragments(displayData); }
                    }, React.createElement(_TrashIcon, { width: 20, height: 20, color: "currentColor" })),
                    !isBroken && React.createElement("a", {
                        className: `${HBC.hoverButton || ""}`.trim(),
                        "aria-label": "Download",
                        role: "button",
                        tabIndex: 0,
                        onClick: handleClick
                    }, React.createElement(_DownloadIcon, {
                        className: MC.downloadHoverButtonIcon || "",
                        width: 24, height: 24, color: "currentColor"
                    })),
                    React.createElement("div", { className: HBC.sizer || "" })
                );
            };
            return React.createElement(FileAttachment, {
                fileName: displayData.filename,
                fileSize: displayData.totalSize || 0,
                url: "#",
                onClick: handleClick,
                onContextMenu: (e) => e.preventDefault(),
                _bftr_isCombinedView: true,
                _bftr_isBroken: isBroken,
                _bftr_isDownloading: isDownloading,
                _bftr_progress: progress,
                renderAdjacentContent: HoverButtons
            });
        }
        Patcher.after(this.name, MessageAccessories.prototype, "renderAttachments", (that, args, ret) => {
            if (!ret) return ret;
            const message = args?.[0] || that?.props?.message;
            if (!message?.attachments?.length) return ret;
            const retArray = Array.isArray(ret) ? ret : [ret];
            const newRet = [];
            let modified = false;
            for (let i = 0; i < message.attachments.length; i++) {
                const att = message.attachments[i];
                const child = retArray[i];
                if (!child) continue;
                const parsed = this._parseChunkFilename(att?.filename);
                if (parsed) {
                    newRet.push(
                        React.createElement(AttachmentShim, {
                            key: `bftr-shim-${att.id}`,
                            attachmentId: att.id,
                            filename: att.filename,
                            children: child
                        })
                    );
                    modified = true;
                } else {
                    newRet.push(child);
                }
            }
            return modified ? newRet : ret;
        });
    }
    _patchMessageComponent() {
        const MessageModule = this._discordModules.MessageComponent;
        if (!MessageModule?.ZP?.type) {
            Logger.warn(this.name, "MessageComponent.ZP not found, message hiding disabled");
            return;
        }
        const MessageVisibilityWrapper = (props) => {
            const { children, message } = props;
            const shouldHide = Hooks.useStateFromStores([this._state], () => {
                if (!this._state.enabled) return false;
                const attachments = message?.attachments;
                if (!attachments || attachments.length === 0) return false;
                const stateInitialized = this._state.downloads.length > 0 ||
                    this._state.incomplete.length > 0 ||
                    this._state.allCompleteChunkIds.size > 0;
                let allNonFirstChunks = true;
                let allBelongToComplete = true;
                let allBelongToIncomplete = true;
                let isRepresentativeMessage = false;
                let hasAnyChunk = false;
                let belongsToDeleting = false;
                for (const att of attachments) {
                    const parsed = this._parseChunkFilename(att?.filename);
                    if (!parsed) {
                        allNonFirstChunks = false;
                        allBelongToComplete = false;
                        allBelongToIncomplete = false;
                        break;
                    }
                    hasAnyChunk = true;
                    if (this._state.deletingUploadIds.has(parsed.uploadId)) {
                        belongsToDeleting = true;
                    }
                    if (parsed.idx === 0) allNonFirstChunks = false;
                    if (this._state.allCompleteChunkIds.has(att.id)) {
                        allBelongToIncomplete = false;
                    } else {
                        allBelongToComplete = false;
                    }
                    if (this._state.incompleteRepresentativeAttachmentIds.has(att.id)) {
                        isRepresentativeMessage = true;
                    }
                }
                if (belongsToDeleting) return true;
                if (hasAnyChunk) {
                    if (allNonFirstChunks && (!stateInitialized || allBelongToComplete)) {
                        return true;
                    }
                    if (stateInitialized && allBelongToIncomplete && !isRepresentativeMessage) {
                        return true;
                    }
                }
                return false;
            }, [message?.id]);
            return shouldHide ? null : children;
        };
        Patcher.instead(this.name, MessageModule.ZP, "type", (that, args, original) => {
            const props = args[0];
            const message = props?.message;
            const attachments = message?.attachments;
            if (!attachments || attachments.length === 0) {
                return original(...args);
            }
            let hasAnyChunk = false;
            for (const att of attachments) {
                if (this._parseChunkFilename(att?.filename)) {
                    hasAnyChunk = true;
                    break;
                }
            }
            if (!hasAnyChunk) {
                return original(...args);
            }
            const result = original(...args);
            return React.createElement(MessageVisibilityWrapper, { message, children: result });
        });
    }
    /*---  CONTEXT MENUS ---*/
    _patchContextMenus() {
        const refreshAction = () => {
            this._findAvailableDownloads();
            UI.showToast("Downloadables refreshed", { type: "success" });
        };
        const pushItem = (tree, items) => {
            const menuChildren = tree?.props?.children?.props?.children;
            if (Array.isArray(menuChildren)) {
                menuChildren.push(...(Array.isArray(items) ? items : [items]));
            }
        };
        const refreshItem = [
            ContextMenu.buildItem({ type: "separator" }),
            ContextMenu.buildItem({ label: "Refresh Downloadables", action: refreshAction })
        ];
        const interceptNativeDelete = (tree, download) => {
            if (!download || download.messages.length <= 1) return;
            if (!this._canDeleteDownload(download)) return;
            const findAndPatch = (children) => {
                if (!Array.isArray(children)) return;
                for (const child of children) {
                    if (child?.props?.id === "delete") {
                        child.props.action = () => this._deleteFragments(download, null);
                        return;
                    }
                    if (child?.props?.children) {
                        findAndPatch(Array.isArray(child.props.children) ? child.props.children : [child.props.children]);
                    }
                }
            };
            const menuChildren = tree?.props?.children;
            if (menuChildren) findAndPatch(Array.isArray(menuChildren) ? menuChildren : [menuChildren]);
        };
        this._unpatches.push(
            ContextMenu.patch("message", (tree, props) => {
                const msg = props?.message;
                if (!msg) return;
                let parsed = null;
                const att = (msg.attachments ?? []).find((a) => {
                    const p = this._parseChunkFilename(a.filename);
                    if (p) { parsed = p; return true; }
                    return false;
                });
                if (!att || !parsed) return;
                const registered = this._state.downloads.find((dl) => dl.uploadId === parsed.uploadId);
                const incom = this._state.incomplete.find((dl) => dl.uploadId === parsed.uploadId);
                const download = registered || incom;
                interceptNativeDelete(tree, download);
                const items = [
                    ...refreshItem,
                    download &&
                    ContextMenu.buildItem({
                        label: "Copy Download Links",
                        action: () => {
                            try {
                                const sortedUrls = [...download.chunkInfos].sort((a, b) => a.chunkIdx - b.chunkIdx).map(c => c.url);
                                const text = sortedUrls.join(" ");
                                if (DiscordNative?.clipboard?.copy) {
                                    DiscordNative.clipboard.copy(text);
                                } else if (navigator.clipboard?.writeText) {
                                    navigator.clipboard.writeText(text);
                                } else {
                                    throw new Error("No clipboard API available");
                                }
                                UI.showToast("Links copied to clipboard", { type: "success" });
                            } catch {
                                UI.showToast("Clipboard copy failed", { type: "error" });
                            }
                        }
                    }),
                    registered &&
                    ContextMenu.buildItem({
                        label: `Download: ${parsed.originalName}`,
                        action: () => this._downloadAndReassemble(registered)
                    }),
                    download &&
                    this._canDeleteDownload(download) &&
                    ContextMenu.buildItem({
                        label: "Delete Download Fragments",
                        danger: true,
                        action: () => this._deleteFragments(download, msg.id)
                    })
                ].filter(Boolean);
                pushItem(tree, items);
            }),
            ContextMenu.patch("channel-context", (tree) => {
                const items = [...refreshItem];
                const channelId = this._getCurrentChannelId();
                if (channelId && this._queuedUploads.has(channelId)) {
                    items.unshift(
                        ContextMenu.buildItem({ type: "separator" }),
                        ContextMenu.buildItem({
                            label: "Send queued split upload now",
                            action: async () => {
                                try {
                                    const success = await this._sendStagedUploads(channelId);
                                    if (success) {
                                        UI.showToast("Chunks sent successfully.", { type: "success" });
                                    }
                                } catch (e) {
                                    Logger.error(this.name, "Context menu send failed", e);
                                    UI.showToast("Send failed. Press Enter to send.", { type: "error" });
                                }
                            }
                        })
                    );
                }
                pushItem(tree, items);
            }),
            ContextMenu.patch("user-context", (tree) => pushItem(tree, refreshItem))
        );
    }
    _deleteFragments = (download, excludeMessageId = null) => {
        if (!download || !this._canDeleteDownload(download)) return;
        const channelId = this._getCurrentChannelId();
        if (!channelId) return;
        const delaySeconds = Number(this._settings.deletionDelaySeconds ?? 2);
        const uniqueMessageIds = [...new Set(download.messages.map(m => m.id))];
        const messagesToDelete = excludeMessageId
            ? uniqueMessageIds.filter(id => id !== excludeMessageId)
            : uniqueMessageIds;
        const channel = this._discordModules.ChannelStore?.getChannel(channelId);
        const channelName = channel?.name || "this channel";
        UI.showConfirmationModal(
            "Delete Download Fragments",
            `Are you sure you want to delete ${messagesToDelete.length} message(s) containing chunks of "${download.filename}" from #${channelName}? This cannot be undone.`,
            {
                confirmText: "Delete",
                cancelText: "Cancel",
                danger: true,
                onConfirm: () => {
                    UI.showToast(`Deleting ${messagesToDelete.length} messages (1 per ${delaySeconds}s)...`, { type: "info" });
                    this._state.deletingUploadIds.add(download.uploadId);
                    this._state.emitChange();
                    const lastDeleteDelay = (messagesToDelete.length - 1) * delaySeconds * 1000;
                    const cleanupTimer = setTimeout(() => {
                        this._timers.delete(cleanupTimer);
                        this._state.deletingUploadIds.delete(download.uploadId);
                        this._lastRefreshFingerprint = null;
                        this._findAvailableDownloads();
                    }, lastDeleteDelay + 500);
                    this._timers.add(cleanupTimer);
                    messagesToDelete.forEach((messageId, index) => {
                        const timer = setTimeout(() => {
                            this._timers.delete(timer);
                            try { this._discordModules.MessageActions?.deleteMessage?.(channelId, messageId, false); } catch { }
                        }, index * delaySeconds * 1000);
                        this._timers.add(timer);
                    });
                }
            }
        );
    };
    _invalidateSplit(channelId, uploadId, triggeringUploadId) {
        const queue = this._queuedUploads.get(channelId);
        if (queue) {
            const filtered = queue.filter(item => {
                if (item.kind === 'split') {
                    return item.split.uploadId !== uploadId;
                }
                return true;
            });
            if (filtered.length === 0) {
                this._queuedUploads.delete(channelId);
            } else {
                this._queuedUploads.set(channelId, filtered);
            }
        }
        this._uploadProgress.delete(channelId);
        this._uploadPumpInFlight.delete(channelId);
        const allUploads = this._discordModules.UploadAttachmentStore?.getUploads(channelId, 0) || [];
        const chunksToRemove = allUploads
            .filter(u => {
                if (u.id === triggeringUploadId) return false;
                const parsed = this._parseChunkFilename(u.filename);
                return parsed && parsed.uploadId === uploadId;
            })
            .map(u => u.id);
        if (chunksToRemove.length > 0) {
            chunksToRemove.forEach(id => {
                this._discordModules.MessageAttachmentManager.removeFiles(channelId, [id], 0);
            });
        }
        UI.showToast("Split upload cancelled", { type: "info" });
    }
    _canDeleteDownload = (download) => {
        const currentUser = this._discordModules.UserStore?.getCurrentUser();
        if (!currentUser) return false;
        if (download.owner === currentUser.id) return true;
        const channelId = this._getCurrentChannelId();
        const channel = this._discordModules.ChannelStore?.getChannel(channelId);
        if (!channel || !this._discordModules.PermissionsBits) return false;
        try {
            let perms = null;
            const utils = this._discordModules.PermissionUtils;
            if (typeof utils === "function") perms = utils(channel);
            else if (utils?.computePermissions) perms = utils.computePermissions(channel);
            if (perms == null) perms = this._discordModules.PermissionStore?.getChannelPermissions(channelId);
            if (perms == null) return false;
            const MANAGE_MESSAGES = this._discordModules.PermissionsBits.MANAGE_MESSAGES ?? 8192n;
            if (typeof perms === "bigint") return (perms & MANAGE_MESSAGES) === MANAGE_MESSAGES;
            return (perms & Number(MANAGE_MESSAGES)) !== 0;
        } catch {
            return false;
        }
    };
    /*---  DISPATCHER & EVENTS ---*/
    _wireDispatcher() {
        const dispatcher = this._discordModules.Dispatcher;
        if (!dispatcher.subscribe) return;
        Patcher.instead(this.name, dispatcher, "dispatch", (that, [event], original) => {
            if (event.type === 'UPLOAD_ATTACHMENT_REMOVE_FILE') {
                const upload = this._discordModules.UploadAttachmentStore?.getUpload(
                    event.channelId, event.id, event.draftType
                );
                if (upload?.filename) {
                    const parsed = this._parseChunkFilename(upload.filename);
                    if (parsed) {
                        this._invalidateSplit(event.channelId, parsed.uploadId, event.id);
                    }
                }
            }
            return original(event);
        });
        const sub = (event, fn) => {
            dispatcher.subscribe(event, fn);
            this._dispatcherSubs.push({ dispatcher, event, fn });
        };
        const pump = async (channelId) => {
            if (!this._queuedUploads.has(channelId)) return;
            if (this._uploadPumpInFlight.has(channelId)) return;
            this._uploadPumpInFlight.add(channelId);
            try {
                const batch = await this._materializeNextBatch(channelId, this.BATCH_SIZE);
                if (!batch.length) {
                    this._uploadPumpInFlight.delete(channelId);
                    const hadProgress = this._uploadProgress.has(channelId);
                    this._uploadProgress.delete(channelId);
                    if (hadProgress) {
                        UI.showToast("Upload complete!", { type: "success" });
                    }
                    return;
                }
                const progress = this._uploadProgress.get(channelId);
                const autoSendEnabled = this._settings.autoSendChunks ?? false;
                const autoSendDelay = Number(this._settings.autoSendDelaySeconds ?? 5);
                const canUseNewUpload = !!(this._discordModules.uploadWithProgress && this._discordModules.CloudUpload);
                if (progress) {
                    progress.sent += batch.filter(item => (item?.file ?? item)?.name?.endsWith(this.EXT)).length;
                }
                if (autoSendEnabled && canUseNewUpload) {
                    const timer = setTimeout(async () => {
                        this._timers.delete(timer);
                        this._uploadPumpInFlight.delete(channelId);
                        try { await this._uploadAndSend(channelId, batch); }
                        catch (e) { Logger.error(this.name, "Auto-send failed", e); }
                    }, autoSendDelay * 1000);
                    this._timers.add(timer);
                    return;
                }
                this._discordModules.Dispatcher.dispatch({
                    type: "UPLOAD_ATTACHMENT_ADD_FILES",
                    channelId,
                    files: batch,
                    showLargeMessageDialog: false,
                    draftType: 0
                });
                if (!autoSendEnabled && progress) {
                    UI.showToast(`Chunk ${progress.sent}/${progress.total} queued. Press Enter.`, { type: "info" });
                }
                if (autoSendEnabled) {
                    const timer = setTimeout(async () => {
                        this._timers.delete(timer);
                        this._uploadPumpInFlight.delete(channelId);
                        try { await this._sendStagedUploads(channelId); }
                        catch (e) { Logger.error(this.name, "Auto-send failed", e); }
                    }, autoSendDelay * 1000);
                    this._timers.add(timer);
                    const stallTimer = setTimeout(() => {
                        this._timers.delete(stallTimer);
                        if (!this._queuedUploads.has(channelId) || this._uploadPumpInFlight.has(channelId)) return;
                        if (!this._hasPendingChunkUploads(channelId)) return;
                        UI.showToast("Split upload may be stalled. Press Enter to send, or use Channel Menu -> Send queued split upload now.", { type: "warning" });
                    }, (autoSendDelay + 8) * 1000);
                    this._timers.add(stallTimer);
                } else {
                    const debounceTimer = setTimeout(() => {
                        this._timers.delete(debounceTimer);
                        this._uploadPumpInFlight.delete(channelId);
                    }, 500);
                    this._timers.add(debounceTimer);
                }
            } catch (e) {
                this._logError("Upload pump failed", e);
                UI.showToast(`Upload failed: ${e?.message || String(e)}`, { type: "error" });
                this._queuedUploads.delete(channelId);
                this._uploadPumpInFlight.delete(channelId);
                this._uploadProgress.delete(channelId);
            }
        };
        sub("MESSAGE_CREATE", (payload) => {
            const msg = payload?.message;
            const currentUser = this._discordModules.UserStore?.getCurrentUser();
            if (msg?.author?.id === currentUser?.id && msg.channel_id && this._queuedUploads.has(msg.channel_id)) {
                pump(msg.channel_id).catch(() => { });
            }
            this._lastRefreshFingerprint = null;
            this._scheduleRefresh(500);
        });
        sub("CHANNEL_SELECT", () => {
            this._lastRefreshChannelId = null;
            this._lastRefreshFingerprint = null;
            this._scheduleRefresh(300);
        });
        sub("LOAD_MESSAGES_SUCCESS", () => {
            this._lastRefreshFingerprint = null;
            this._scheduleRefresh(500);
        });
        sub("MESSAGE_DELETE", () => {
            if (this._state.deletingUploadIds.size > 0) return;
            this._lastRefreshFingerprint = null;
            this._scheduleRefresh(500);
        });
    }
    /*---  FILE SIZE LIMIT BYPASS ---*/
    _patchFileSizeLimitLogic() {
        const TWO_GB = 2147483648;
        const candidates = [
            Webpack.getByKeys("AnalyticsObjectTypes", "GuildFeatures"),
            Webpack.getBySource("RESTRICTED_COLLABORATOR", "CONTEXTLESS_ACTIVITY"),
            Webpack.getBySource("QUICKSWITCHER", "COLLECTIBLES_SHOP", "ACTIVITIES_NITRO_UPSELL")
        ].filter(Boolean);
        let constantsModule = null;
        for (const c of candidates) {
            if (c && typeof c === "object") {
                constantsModule = c;
                break;
            }
        }
        if (!constantsModule) return false;
        let targetKey = null;
        for (const [key, val] of Object.entries(constantsModule)) {
            if (val === this._realUploadLimit) {
                const desc = Object.getOwnPropertyDescriptor(constantsModule, key);
                if (desc?.set || desc?.writable) {
                    targetKey = key;
                    break;
                }
            }
        }
        if (!targetKey) return false;
        try {
            const original = constantsModule[targetKey];
            constantsModule[targetKey] = TWO_GB;
            if (constantsModule[targetKey] === TWO_GB) {
                this._fileSizePatch = { module: constantsModule, key: targetKey, original };
                return true;
            }
        } catch (e) {
            Logger.error(this.name, "Limit patch failed", e);
        }
        return false;
    }
    /*---  TOTAL MESSAGE SIZE LIMIT BYPASS ---*/
    _patchTotalMessageSizeLimit() {
        const sizeModule =
            Webpack.getBySource("getUserMaxFileSize", "premiumTier") ||
            Webpack.getBySource("isStaff", "524288") ||
            Webpack.getBySource(".filesize(e)");
        if (!sizeModule) {
            Logger.warn(this.name, "Could not find size validation module");
            return false;
        }
        let targetKey = null;
        for (const [key, val] of Object.entries(sizeModule)) {
            if (typeof val !== "function") continue;
            try {
                if (val([]) !== false) continue;
                if (val([{ size: 600000000 }]) !== true) continue;
                targetKey = key;
                break;
            } catch { }
        }
        if (!targetKey) {
            Logger.warn(this.name, "Could not find total size check function");
            return false;
        }
        this._totalSizePatch = {
            module: sizeModule,
            key: targetKey,
            original: sizeModule[targetKey]
        };
        sizeModule[targetKey] = () => false;
        return true;
    }
    /*---  UTILITIES ---*/
    _canUseFsStreaming() {
        try {
            const fs = require("fs");
            return !!(UI.openDialog && typeof fs.createWriteStream === "function");
        } catch {
            return false;
        }
    }
    _isChunkFile = (filename) => filename?.endsWith(this.EXT) ?? false;
    _validateChunkHeader(buf, expectedChunkIdx, expectedTotalMinusOne) {
        if (buf.length < this.HEADER_SIZE) throw new Error(`Chunk ${expectedChunkIdx} too small`);
        if (buf[0] !== this.MAGIC0 || buf[1] !== this.MAGIC1) throw new Error(`Invalid magic bytes in chunk ${expectedChunkIdx}`);
        if (buf[2] !== (expectedChunkIdx & 0xff)) throw new Error(`Chunk index mismatch: expected ${expectedChunkIdx}, got ${buf[2]}`);
        if (buf[3] !== (expectedTotalMinusOne & 0xff)) throw new Error(`Chunk total mismatch: expected ${expectedTotalMinusOne}, got ${buf[3]}`);
    }
    _logError(message, error) {
        Logger.error(this.name, message, error);
        UI.showToast(`${message}: ${error?.message || error}`, { type: "error" });
    }
    _getCurrentChannelId = () => this._discordModules.SelectedChannelStore?.getChannelId?.() ?? null;
    _hasPendingChunkUploads(channelId) {
        try {
            const uploads = this._discordModules.UploadAttachmentStore?.getUploads?.(channelId, 0) || [];
            return uploads.some(u => this._isChunkFile(u?.filename));
        } catch {
            return false;
        }
    }
    _forceMessageRerender() {
        const channelId = this._getCurrentChannelId();
        if (!channelId || !this._discordModules.Dispatcher) return;
        this._discordModules.Dispatcher.dispatch({
            type: "LOAD_MESSAGES_SUCCESS",
            channelId,
            messages: [],
            isBefore: false,
            isAfter: false,
            hasMoreBefore: true,
            hasMoreAfter: true
        });
    }
    async _sendStagedUploads(channelId) {
        const targetChannelId = channelId || this._getCurrentChannelId();
        if (!targetChannelId) return false;
        for (let attempt = 0; attempt < 20; attempt++) {
            const uploads = this._discordModules.UploadAttachmentStore?.getUploads?.(targetChannelId, 0);
            if (!uploads?.length) return false;
            if (uploads.every(u => u.status === "COMPLETED")) break;
            await this._sleep(500);
            if (attempt === 19) {
                UI.showToast("Uploads taking too long. Press Enter.", { type: "warning" });
                return false;
            }
        }
        const uploads = this._discordModules.UploadAttachmentStore?.getUploads?.(targetChannelId, 0);
        if (!uploads?.length) return false;
        const sendMessage = this._discordModules.MessageActions?.sendMessage;
        if (typeof sendMessage !== "function") {
            UI.showToast("Send failed: API unavailable", { type: "error" });
            return false;
        }
        try {
            const sendPromise = sendMessage(targetChannelId, { content: "" }, undefined, { attachmentsToUpload: uploads });
            this._discordModules.MessageAttachmentManager.clearAll(targetChannelId, 0);
            await sendPromise;
            return true;
        } catch (e) {
            this._logError("Send failed", e);
            UI.showToast(`Send failed: ${e?.message || String(e)}`, { type: "error" });
            return false;
        }
    }
    async _uploadAndSend(channelId, batch) {
        if (!this._discordModules.uploadWithProgress || !this._discordModules.CloudUpload) {
            this._discordModules.Dispatcher.dispatch({
                type: "UPLOAD_ATTACHMENT_ADD_FILES",
                channelId, files: batch, showLargeMessageDialog: false, draftType: 0
            });
            await this._sleep(500);
            return this._sendStagedUploads(channelId);
        }
        try {
            const items = batch.map((item, i) => new this._discordModules.CloudUpload({ file: item?.file ?? item }, channelId, i));
            const result = await this._discordModules.uploadWithProgress({
                channelId,
                message: { content: "", tts: false, invalidEmojis: [], validNonShortcutEmojis: [] },
                items,
                shouldUploadFailureSendNotification: true
            });
            if (!result?.attachments?.length) return false;
            const sendMessage = this._discordModules.MessageActions?.sendMessage;
            if (typeof sendMessage !== "function") return false;
            await sendMessage(channelId, { content: "" }, undefined, { attachmentsToUpload: result.attachments });
            if (result.uploader?._file) {
                this._discordModules.Dispatcher.dispatch({ type: "UPLOAD_COMPLETE", channelId, file: result.uploader._file, aborted: false });
            }
            return true;
        } catch (e) {
            UI.showToast(`Upload failed: ${e?.message || e}`, { type: "error" });
            return false;
        }
    }
    _sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }
    _getOldestLoadedMessageId(channelId) {
        const msgs = this._getChannelMessages(channelId);
        if (!msgs.length) return null;
        let min = null;
        for (const m of msgs) {
            if (!m?.id) continue;
            try {
                const bi = BigInt(m.id);
                if (min === null || bi < min) min = bi;
            } catch { }
        }
        return min?.toString() ?? null;
    }
    async _backfillOlderMessages(channelId, pages = 3, limit = 100) {
        const fetch = this._discordModules.MessageActions?.fetchMessages;
        if (typeof fetch !== "function") return false;
        let didAnything = false;
        for (let i = 0; i < pages; i++) {
            const before = this._getOldestLoadedMessageId(channelId);
            if (!before) break;
            const beforeCount = this._getChannelMessages(channelId).length;
            let ok = false;
            try {
                const r = fetch(channelId, { before, limit });
                if (r?.then) await r;
                ok = true;
            } catch { }
            if (!ok) {
                try {
                    const r = fetch(channelId, limit, before);
                    if (r?.then) await r;
                    ok = true;
                } catch { }
            }
            if (!ok) break;
            didAnything = true;
            await this._sleep(600);
            if (this._getChannelMessages(channelId).length <= beforeCount) break;
        }
        return didAnything;
    }
    _getChannelMessages(channelId) {
        if (!channelId) return [];
        const msgs = this._discordModules.MessageStore?.getMessages?.(channelId);
        if (!msgs) return [];
        if (Array.isArray(msgs)) return msgs;
        if (typeof msgs.toArray === "function") return msgs.toArray();
        if (msgs._array) return msgs._array;
        return [];
    }
    _concatUint8(parts) {
        const total = parts.reduce((sum, a) => sum + a.length, 0);
        const out = new Uint8Array(total);
        let off = 0;
        for (const p of parts) {
            out.set(p, off);
            off += p.length;
        }
        return out;
    }
    _formatBytes = (bytes) => {
        if (!bytes) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };
    _saveBytesWithDialog(data, filename) {
        try {
            if (!data) {
                Logger.error(this.name, "Save failed: data is null/undefined");
                UI.showToast("Save failed: no data received", { type: "error" });
                return;
            }
            const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
            const SIZE_THRESHOLD = 1024 * 1024 * 1024;
            if (bytes.length > SIZE_THRESHOLD || !DiscordNative?.fileManager?.saveWithDialog) {
                const blob = new Blob([bytes], { type: "application/octet-stream" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                const timer = setTimeout(() => {
                    this._timers.delete(timer);
                    URL.revokeObjectURL(url);
                }, 30000);
                this._timers.add(timer);
                UI.showToast("Download started (check your Downloads folder)", { type: "success" });
                return;
            }
            DiscordNative.fileManager.saveWithDialog(bytes, filename);
        } catch (e) {
            Logger.error(this.name, "Save failed", e);
            UI.showToast("Save failed", { type: "error" });
        }
    }
    /*---  CSS & ICONS ---*/
    _css() {
        return `
        .bftr-minimal { color: var(--text-default); align-items: center;background-color: var(--background-surface-high);border: 1px solid transparent;border-color: var(--border-subtle);border-radius: 8px;box-shadow: var(--shadow-low);box-sizing: border-box;letter-spacing: 0;padding: 16px;width: 100%; }
    `;
    }
    _fileIconSvg() {
        return `<svg width="30" height="40" viewBox="0 0 72 96" xmlns="http://www.w3.org/2000/svg">
            <path d="M72,29.3L72,89.6C72,91.84 72,92.96 71.56,93.82C71.18,94.56 70.56,95.18 69.82,95.56C68.96,96 67.84,96 65.6,96L6.4,96C4.16,96 3.04,96 2.18,95.56C1.44,95.18 0.82,94.56 0.44,93.82C0,92.96 0,91.84 0,89.6L0,6.4C0,4.16 0,3.04 0.44,2.18C0.82,1.44 1.44,0.82 2.18,0.44C3.04,0 4.16,0 6.4,0L42.7,0C44.66,0 45.64,0 46.56,0.22C47.06,0.34 47.54,0.5 48,0.72L48,17.6C48,19.84 48,20.96 48.44,21.82C48.82,22.56 49.44,23.18 50.18,23.56C51.04,24 52.16,24 54.4,24L71.28,24C71.5,24.46 71.66,24.94 71.78,25.44C72,26.36 72,27.34 72,29.3Z" style="fill:rgb(211,214,253);"/>
            <path d="M68.26,20.26C69.64,21.64 70.32,22.32 70.82,23.14C71,23.42 71.14,23.7 71.28,24L54.4,24C52.16,24 51.04,24 50.18,23.56C49.44,23.18 48.82,22.56 48.44,21.82C48,20.96 48,19.84 48,17.6L48,0.72C48.3,0.86 48.58,1 48.86,1.18C49.68,1.68 50.36,2.36 51.74,3.74L68.26,20.26Z" style="fill:rgb(147,155,249);"/>
            <rect x="15.5" y="48" width="41" height="28" style="fill:rgb(147,155,249);"/>
            <rect x="19" y="42.5" width="10" height="5" style="fill:rgb(147,155,249);"/>
            <rect x="43" y="42.5" width="10" height="5" style="fill:rgb(147,155,249);"/>
        </svg>`;
    }
    _brokenFileIconSvg() {
        return `<svg width="30" height="40" viewBox="0 0 72 96" xmlns="http://www.w3.org/2000/svg">
            <path d="M72,29.3L72,89.6C72,91.84 72,92.96 71.56,93.82C71.18,94.56 70.56,95.18 69.82,95.56C68.96,96 67.84,96 65.6,96L6.4,96C4.16,96 3.04,96 2.18,95.56C1.44,95.18 0.82,94.56 0.44,93.82C0,92.96 0,91.84 0,89.6L0,6.4C0,4.16 0,3.04 0.44,2.18C0.82,1.44 1.44,0.82 2.18,0.44C3.04,0 4.16,0 6.4,0L42.7,0C44.66,0 45.64,0 46.56,0.22C47.06,0.34 47.54,0.5 48,0.72L48,17.6C48,19.84 48,20.96 48.44,21.82C48.82,22.56 49.44,23.18 50.18,23.56C51.04,24 52.16,24 54.4,24L71.28,24C71.5,24.46 71.66,24.94 71.78,25.44C72,26.36 72,27.34 72,29.3Z" style="fill:rgb(211,214,253);"/>
            <path d="M68.26,20.26C69.64,21.64 70.32,22.32 70.82,23.14C71,23.42 71.14,23.7 71.28,24L54.4,24C52.16,24 51.04,24 50.18,23.56C49.44,23.18 48.82,22.56 48.44,21.82C48,20.96 48,19.84 48,17.6L48,0.72C48.3,0.86 48.58,1 48.86,1.18C49.68,1.68 50.36,2.36 51.74,3.74L68.26,20.26Z" style="fill:rgb(147,155,249);"/>
            <path d="M24,50 L48,80 M48,50 L24,80" style="fill:none;stroke:rgb(220,60,60);stroke-width:6;stroke-linecap:round;"/>
        </svg>`;
    }
};
