/**
 * @name BetterSplitLargeMessages
 * @author Pharaoh2k
 * @version 1.0.0
 * @description Splits large messages to smaller ones (~2000/4000 chars). No Nitro spoofing. Honors server limits & slowmode, optional chunk cap, hides upsell banners/modals.
 * @authorId 874825550408089610
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterSplitLargeMessages/BetterSplitLargeMessages.plugin.js
 */
/*
Copyright © 2025-present Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
const PLUGIN_NAME = "BetterSplitLargeMessages";
const GITHUB_PATH = "Pharaoh2k/BetterDiscordStuff";
const DEFAULT_SETTINGS = {
    maxLength: 0,
    sendDelay: 2,
    hardSplit: false,
    splitInSlowmode: false,
    slowmodeMax: 5,
    hideUpsell: true,
    maxChunks: 0,
    autoUpdate: true
};
/* ================= UpdateManager Class ================= */
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
        this.timer = null;
        if (typeof this.notification === "function") this.notification();
        else this.notification?.close?.();
        this.notification = null;
    }
    async check(silent = false) {
        try {
            const res = await BdApi.Net.fetch(this.urls.plugin);
            if (res.status !== 200) throw new Error("Failed to fetch plugin");
            const text = await res.text();
            const version = text.match(/@version\s+([\d.]+)/)?.[1];
            if (!version) throw new Error("No version found in remote file");
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
        this.notification?.close?.();
        const handle = BdApi.UI.showNotification?.({
            title: `${this.name}`,
            content: `v${version} is available`,
            type: "info",
            duration: 60000,
            actions: [
                {
                    label: "Update",
                    onClick: () => {
                        handle?.close?.();
                        this.applyUpdate(text, version);
                    },
                },
                {
                    label: "Dismiss",
                    onClick: () => handle?.close?.(),
                },
            ],
            onClose: () => {
                if (this.notification === handle) this.notification = null;
            },
        }) ?? BdApi.UI.showNotice(
            `${this.name} v${version} is available`,
            {
                type: 'info',
                buttons: [{
                    label: 'Update',
                    onClick: (closeOrEvent) => {
                        if (typeof closeOrEvent === 'function') {
                            closeOrEvent();
                        } else if (this.notification && typeof this.notification === 'function') {
                            this.notification();
                        }
                        this.applyUpdate(text, version);
                    }
                }, {
                    label: 'Dismiss',
                    onClick: (closeOrEvent) => {
                        if (typeof closeOrEvent === 'function') {
                            closeOrEvent();
                        } else if (this.notification && typeof this.notification === 'function') {
                            this.notification();
                        }
                    }
                }]
            }
        );
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
        if (last === this.version) return;
        BdApi.Data.save(this.name, 'version', this.version);
        if (!last) return;
        try {
            const res = await BdApi.Net.fetch(this.urls.changelog);
            if (res.status !== 200) return;
            const md = await res.text();
            const changes = this.parseChangelog(md, last, this.version);
            if (changes.length === 0) return;
            BdApi.UI.showChangelogModal({
                title: this.name,
                subtitle: `Version ${this.version}`,
                changes
            });
        } catch { /* Changelog fetch failed, ignore */ }
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
        const lines = md.split('\n');
        const versions = [];
        let current = null;
        let items = [];
        for (const line of lines) {
            const ver = line.match(/^###\s+([\d.]+)/)?.[1];
            if (ver) {
                if (current) versions.push({ version: current, items });
                current = ver;
                items = [];
            } else if (line.trim().startsWith('-') && current) {
                const item = line.trim().substring(1).trim();
                if (item) items.push(item);
            }
        }
        if (current) versions.push({ version: current, items });
        const relevant = versions.filter(v =>
            this.isNewer(v.version, from) && !this.isNewer(v.version, to)
        );
        const grouped = { added: [], improved: [], fixed: [], other: [] };
        for (const v of relevant) {
            for (const item of v.items) {
                const lower = item.toLowerCase();
                const tagged = `${item} (v${v.version})`;
                if (lower.includes('fix')) grouped.fixed.push(tagged);
                else if (lower.includes('add') || lower.includes('initial')) grouped.added.push(tagged);
                else if (lower.includes('improv') || lower.includes('updat')) grouped.improved.push(tagged);
                else grouped.other.push(tagged);
            }
        }
        const result = [];
        if (grouped.added.length) result.push({ title: "New Features", type: "added", items: grouped.added });
        if (grouped.improved.length) result.push({ title: "Improvements", type: "improved", items: grouped.improved });
        if (grouped.fixed.length) result.push({ title: "Bug Fixes", type: "fixed", items: grouped.fixed });
        if (grouped.other.length) result.push({ title: "Other Changes", type: "progress", items: grouped.other });
        return result;
    }
    isNewer(v1, v2 = this.version) {
        const [a, b] = [v1, v2].map(v => v.split('.').map(Number));
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if ((a[i] || 0) > (b[i] || 0)) return true;
            if ((a[i] || 0) < (b[i] || 0)) return false;
        }
        return false;
    }
}
/* ================= Main Plugin Class ================= */
module.exports = class BetterSplitLargeMessages {
    constructor(meta) {
        this.meta = meta;
        this.settings = { ...DEFAULT_SETTINGS, ...BdApi.Data.load(PLUGIN_NAME, "settings") };
        this.maxLength = 2000;
        this.MessageActions = null;
        this.UserStore = null;
        this.ChannelStore = null;
        this.Permissions = null;
        this.PermissionsBits = null;
        this.LengthConstants = null;
        this.typeModule = null;
        this.upsellModule = null;
        this.charCountModule = null;
        this.lengthConstantKeys = [];
        this.upsellExportKey = null;
        this.charCountExportKey = null;
        this._typeContainer = null;
        this.originalUploadLongMessages = {};
        this.originalLengthConstants = {};
        this.updateManager = new UpdateManager(PLUGIN_NAME, meta.version, GITHUB_PATH);
    }
    /* ================= Lifecycle ================= */
    start() {
        this._initModules();
        if (!this._validateModules()) {
            BdApi.UI.showToast(`${PLUGIN_NAME}: Critical modules failed to load. Check console.`, { type: "warning" });
        }
        this._patchModalActions();
        this._updateMaxLength();
        this._bypassLengthValidation();
        this._patchCharacterCounterMax();
        this._patchInlineUpsellComponent();
        this._patchSendMessage();
        this._patchCharacterCounter();
        this._disableUploadLongMessages();
        this.updateManager.start(this.settings.autoUpdate !== false);
        BdApi.UI.showToast(`${PLUGIN_NAME} started!`, { type: "success" });
        BdApi.Logger.info(PLUGIN_NAME, {
            serverLimit: this._getServerLimit(),
            effectiveLimit: this.effectiveLimit,
            composeLimit: this.composeLimit
        });
    }
    stop() {
        BdApi.Patcher.unpatchAll(PLUGIN_NAME);
        this._restoreUploadLongMessages();
        this._restoreLengthValidation();
        this.updateManager.stop();
        BdApi.UI.showToast(`${PLUGIN_NAME} stopped!`, { type: "info" });
    }
    _saveSettings() {
        BdApi.Data.save(PLUGIN_NAME, "settings", this.settings);
        this._updateMaxLength();
        this._restoreLengthValidation();
        this._bypassLengthValidation();
    }
    /* ================= Settings Panel ================= */
    getSettingsPanel() {
        return BdApi.UI.buildSettingsPanel({
            settings: [
                {
                    type: "category",
                    id: "message-settings",
                    name: "Message Settings",
                    collapsible: true,
                    shown: true,
                    settings: [
                        {
                            type: "number",
                            id: "maxLength",
                            name: "Max Message Length",
                            note: "0 = auto-detect (2000/4000) send-time limit. The editor limit will be effectively unlimited in this mode.",
                            value: this.settings.maxLength,
                            min: 0,
                            max: 100000
                        },
                        {
                            type: "slider",
                            id: "sendDelay",
                            name: "Delay Between Chunks (seconds)",
                            note: "Minimum 2 seconds required for safety.",
                            value: Math.max(2, this.settings.sendDelay),
                            min: 2,
                            max: 10,
                            markers: [2, 3, 5, 10],
                            units: "s"
                        },
                        {
                            type: "number",
                            id: "maxChunks",
                            name: "Max Chunks Per Message",
                            note: "0 = unlimited. Safety cap for how many chunks a single send can become.",
                            value: this.settings.maxChunks ?? 0,
                            min: 0,
                            max: 1000
                        },
                        {
                            type: "switch",
                            id: "hardSplit",
                            name: "Hard Split",
                            note: "Split exactly at max length (ignores words/markdown). Not recommended.",
                            value: this.settings.hardSplit
                        }
                    ]
                },
                {
                    type: "category",
                    id: "slowmode-settings",
                    name: "Slowmode Settings",
                    collapsible: true,
                    shown: false,
                    settings: [
                        {
                            type: "switch",
                            id: "splitInSlowmode",
                            name: "Split in Slowmode Channels",
                            note: "Allows splitting in slowmode channels. Delay will adjust to match slowmode.",
                            value: this.settings.splitInSlowmode
                        },
                        {
                            type: "number",
                            id: "slowmodeMax",
                            name: "Max Slowmode Threshold (seconds)",
                            note: "Only split if channel slowmode is below this value.",
                            value: this.settings.slowmodeMax,
                            min: 0,
                            max: 120
                        }
                    ]
                },
                {
                    type: "category",
                    id: "ui-settings",
                    name: "UI Settings",
                    collapsible: true,
                    shown: false,
                    settings: [
                        {
                            type: "switch",
                            id: "hideUpsell",
                            name: "Hide Nitro Upsell",
                            note: "Suppress the 'Message too long' upsell popup.",
                            value: this.settings.hideUpsell
                        }
                    ]
                },
                {
                    type: "category",
                    id: "update-settings",
                    name: "Updates",
                    collapsible: true,
                    shown: false,
                    settings: [
                        {
                            type: "switch",
                            id: "autoUpdate",
                            name: "Automatic Update Notifications",
                            note: "Check for updates automatically on startup and every 24 hours.",
                            children: "Automatic Update Notifications",
                            value: this.settings.autoUpdate !== false
                        },
                        {
                            type: "button",
                            id: "checkUpdate",
                            name: "Check for Updates",
                            note: "Manually check for plugin updates.",
                            children: "Check for Updates",
                            onClick: () => this.updateManager.check(false)
                        },
                        {
                            type: "button",
                            id: "viewChangelog",
                            name: "View Changelog",
                            note: "View the full changelog for this plugin.",
                            children: "View Changelog",
                            onClick: () => this.updateManager.showFullChangelog()
                        }
                    ]
                }
            ],
            onChange: (_, id, value) => {
                if (id === "checkUpdate" || id === "viewChangelog") return;
                this.settings[id] = value;
                this.settings.sendDelay = Math.max(2, Number(this.settings.sendDelay) || 2);
                this.settings.maxChunks = Math.max(0, Number(this.settings.maxChunks) || 0);
                this._saveSettings();
                if (id === "autoUpdate") {
                    this.updateManager.stop();
                    if (value) {
                        this.updateManager.start(true);
                    }
                }
            }
        });
    }
    /* ================= Module Discovery ================= */
    _initModules() {
        const { Webpack } = BdApi;
        this.MessageActions = this._findModule("MessageActions", [
            () => Webpack.getByKeys("sendMessage", "editMessage"),
            () => Webpack.getByKeys("sendMessage", "_sendMessage"),
            () => Webpack.getByKeys("_sendMessage", "validateMessage"),
            () => Webpack.getByKeys("sendMessage", "sendStickers", "sendPollMessage"),
            () => Webpack.getModule(m => m?.sendMessage && m?._sendMessage && m?.editMessage),
            () => Webpack.getModule(m => m?.sendMessage && m?.validateMessage && m?.sendBotMessage),
        ]);
        this.UserStore = Webpack.getStore("UserStore");
        this.ChannelStore = Webpack.getStore("ChannelStore");
        this.Permissions = this._findModule("Permissions", [
            () => Webpack.getStore("PermissionStore"),
            () => Webpack.getByKeys("can", "computePermissions"),
            () => Webpack.getModule(m => m?.can && m?.computePermissions),
            () => Webpack.getModule(m => m?.can && m?.getChannelPermissions && m?.getGuildPermissions),
        ]);
        this._initPermissionsBits(Webpack);
        this._initLengthConstants(Webpack);
        this._initChatInputTypes(Webpack);
        this._initUpsellModule(Webpack);
        this._initCharCountModule(Webpack);
    }
    _initPermissionsBits(Webpack) {
        const findBitsContainer = (m) => {
            if (!m || typeof m !== "object") return false;
            if (Object.keys(m).length > 100) return false;
            return Object.values(m).some(v =>
                v && typeof v === "object" && typeof v.MANAGE_MESSAGES === "bigint"
            );
        };
        const findBitsContainerAlt = (m) => {
            if (!m || typeof m !== "object") return false;
            return Object.values(m).some(v =>
                v && typeof v === "object" &&
                typeof v.MANAGE_MESSAGES === "bigint" &&
                typeof v.KICK_MEMBERS === "bigint" &&
                typeof v.BAN_MEMBERS === "bigint"
            );
        };
        const module = Webpack.getModule(findBitsContainer) || Webpack.getModule(findBitsContainerAlt);
        if (module) {
            this.PermissionsBits = Object.values(module).find(v =>
                v && typeof v === "object" && typeof v.MANAGE_MESSAGES === "bigint"
            );
        }
        if (!this.PermissionsBits) {
            BdApi.Logger.warn(PLUGIN_NAME, "Permissions bitfield module not found; slowmode manage-perms bypass may be inaccurate.");
        }
    }
    _initLengthConstants(Webpack) {
        this.LengthConstants = Webpack.getModule(m => {
            if (!m || typeof m !== "object") return false;
            const values = Object.values(m);
            return values.includes(2000) && values.includes(4000);
        }) || Webpack.getModule(m => {
            if (!m || typeof m !== "object") return false;
            const values = Object.values(m);
            return values.includes(2000) && values.includes(4000) && values.includes(8000);
        }) || Webpack.getModule(m => {
            if (!m || typeof m !== "object") return false;
            const values = Object.values(m);
            const hasLimit = values.includes(2000);
            const hasSpoilerRegex = values.some(v => v instanceof RegExp && v.source?.includes(String.raw`\|\|`));
            return hasLimit && hasSpoilerRegex;
        });
        if (this.LengthConstants) {
            this.lengthConstantKeys = Object.entries(this.LengthConstants)
                .filter(([_, v]) => v === 2000 || v === 4000)
                .map(([k]) => k);
        }
    }
    _initChatInputTypes(Webpack) {
        const findTypeModule = (m) => {
            if (!m || typeof m !== "object") return false;
            return Object.values(m).some(v =>
                v && typeof v === "object" &&
                v.NORMAL && typeof v.NORMAL === "object" &&
                Object.hasOwn(v.NORMAL, "uploadLongMessages")
            );
        };
        const findTypeModuleAlt = (m) => {
            if (!m || typeof m !== "object") return false;
            return Object.values(m).some(v =>
                v && typeof v === "object" &&
                v.NORMAL?.analyticsName === "normal" &&
                Object.hasOwn(v.NORMAL, "uploadLongMessages")
            );
        };
        this.typeModule = Webpack.getModule(findTypeModule) || Webpack.getModule(findTypeModuleAlt);
        if (this.typeModule) {
            this._typeContainer = Object.values(this.typeModule).find(v =>
                v && typeof v === "object" &&
                v.NORMAL && typeof v.NORMAL === "object" &&
                Object.hasOwn(v.NORMAL, "uploadLongMessages")
            ) || null;
        }
    }
    _initUpsellModule(Webpack) {
        const mod = Webpack.getByStrings("MESSAGE_LENGTH_UPSELL", { searchExports: true })
            || Webpack.getByStrings("EMPTY_STICKER_PICKER_UPSELL", "headingText", "subscriptionTier", { searchExports: true })
            || Webpack.getByStrings("headingText", "context", "analyticsLocationObject", "trialOffer", "discountOffer", { searchExports: true })
            || Webpack.getByStrings("useReducedMotion", "subscriptionTier", "discountOffer", { searchExports: true });
        if (!mod) return;
        if (typeof mod === "function") {
            this.upsellModule = { __default: mod };
            this.upsellExportKey = "__default";
        } else {
            this.upsellModule = mod;
            this.upsellExportKey = Object.keys(mod).find(k =>
                typeof mod[k] === "function" && (
                    mod[k].toString().includes("MESSAGE_LENGTH_UPSELL") ||
                    mod[k].toString().includes("EMPTY_STICKER_PICKER_UPSELL") ||
                    mod[k].toString().includes("subscriptionTier")
                )
            );
        }
    }
    _initCharCountModule(Webpack) {
        const mod = Webpack.getByStrings("canUseIncreasedMessageLength", { searchExports: true })
            || Webpack.getByStrings("textValue", "maxCharacterCount", "showRemainingCharsAfterCount", "upsellLongMessages", { searchExports: true })
            || Webpack.getByStrings("showRemainingCharsAfterCount", "upsellLongMessages", "className", { searchExports: true });
        if (!mod) return;
        if (typeof mod === "function") {
            this.charCountModule = { __default: mod };
            this.charCountExportKey = "__default";
        } else {
            this.charCountModule = mod;
            this.charCountExportKey = Object.keys(mod).find(k =>
                typeof mod[k] === "function" && (
                    mod[k].toString().includes("canUseIncreasedMessageLength") ||
                    mod[k].toString().includes("showRemainingCharsAfterCount")
                )
            );
        }
    }
    _findModule(name, strategies) {
        for (const strategy of strategies) {
            try {
                const result = strategy();
                if (result) return result;
            } catch { /* Strategy failed, try next */ }
        }
        BdApi.Logger.warn(PLUGIN_NAME, `Could not find module: ${name}`);
        return null;
    }
    _validateModules() {
        if (!this.MessageActions) {
            BdApi.Logger.error(PLUGIN_NAME, "Required module missing: MessageActions");
            return false;
        }
        return true;
    }
    _getServerLimit() {
        const user = this.UserStore?.getCurrentUser?.();
        const hasNitro = !!(user?.premiumType && user.premiumType !== 0);
        return hasNitro ? 4000 : 2000;
    }
    /* ================= Char Counter / Limits ================= */
    _patchCharacterCounterMax() {
        if (!this.charCountModule || !this.charCountExportKey) return;
        BdApi.Patcher.before(PLUGIN_NAME, this.charCountModule, this.charCountExportKey, (_, args) => {
            const props = args?.[0];
            if (!props) return;
            if (props.type?.upsellLongMessages) {
                props.type = { ...props.type, upsellLongMessages: null };
            }
            props.showRemainingCharsAfterCount = Number.MAX_SAFE_INTEGER;
            props.maxCharacterCount = this.composeLimit;
        });
        BdApi.Logger.info(PLUGIN_NAME, "Patched character counter");
    }
    _patchInlineUpsellComponent() {
        const W = BdApi.Webpack;
        const mod = W.getByStrings("MESSAGE_LENGTH_UPSELL", { searchExports: true });
        if (!mod) return;
        let moduleObject, exportKey;
        if (typeof mod === "function") {
            moduleObject = { __default: mod };
            exportKey = "__default";
        } else {
            moduleObject = mod;
            exportKey = Object.keys(mod).find(k =>
                typeof mod[k] === "function" &&
                /MESSAGE_LENGTH_UPSELL/.test(mod[k].toString())
            );
        }
        if (!moduleObject || !exportKey) return;
        BdApi.Patcher.instead(
            PLUGIN_NAME,
            moduleObject,
            exportKey,
            (thisObj, args, original) => {
                if (!this.settings.hideUpsell) {
                    return original.apply(thisObj, args);
                }
                BdApi.Logger.info(PLUGIN_NAME, "Suppressed inline upsell component");
                return null;
            }
        );
        BdApi.Logger.info(PLUGIN_NAME, "Inline upsell component patch installed");
    }
    _updateMaxLength() {
        const serverLimit = this._getServerLimit();
        const configured = Number(this.settings.maxLength) || 0;
        const configuredOrAuto = configured === 0 ? serverLimit : configured;
        this.effectiveLimit = Math.min(configuredOrAuto, serverLimit);
        this.composeLimit = configured > 0 ? Math.max(this.effectiveLimit, configured) : 1e9;
        this.maxLength = configuredOrAuto;
    }
    /* ================= Core Logic: Length Validation ================= */
    _bypassLengthValidation() {
        if (!this.LengthConstants || this.lengthConstantKeys.length === 0) {
            BdApi.Logger.warn(PLUGIN_NAME, "LengthConstants not found - length bypass skipped");
            return;
        }
        for (const key of this.lengthConstantKeys) {
            if (!this.originalLengthConstants[key]) {
                this.originalLengthConstants[key] = this.LengthConstants[key];
            }
            if (this.composeLimit > this.originalLengthConstants[key]) {
                this.LengthConstants[key] = this.composeLimit;
            }
        }
        BdApi.Logger.info(
            PLUGIN_NAME,
            "LengthConstants raised to",
            this.composeLimit,
            "for keys:",
            this.lengthConstantKeys
        );
    }
    _restoreLengthValidation() {
        if (!this.LengthConstants) return;
        for (const [key, value] of Object.entries(this.originalLengthConstants)) {
            this.LengthConstants[key] = value;
        }
        this.originalLengthConstants = {};
    }
    /* ================= Patch: Send Message ================= */
    _createChunkMessage(message, chunk, isFirst) {
        const chunkMessage = { ...message, content: chunk };
        if (!isFirst) {
            delete chunkMessage.stickerIds;
            delete chunkMessage.attachments;
            delete chunkMessage.files;
            delete chunkMessage.file;
            delete chunkMessage.uploads;
            delete chunkMessage.embeds;
            if (chunkMessage.parsedMessage) {
                delete chunkMessage.parsedMessage.attachments;
                delete chunkMessage.parsedMessage.files;
                delete chunkMessage.parsedMessage.embeds;
            }
        }
        return chunkMessage;
    }
    _calculateSendDelay(channelId) {
        const channel = this.ChannelStore?.getChannel(channelId);
        const slowmodeDelay = channel?.rateLimitPerUser ? (channel.rateLimitPerUser * 1000) : 0;
        const settingDelay = Math.max(2, this.settings.sendDelay) * 1000;
        return Math.max(slowmodeDelay + 500, settingDelay);
    }
    async _sendChunks(chunks, channelId, message, rest, original, thisObj) {
        const finalDelay = this._calculateSendDelay(channelId);
        for (let i = 0; i < chunks.length; i++) {
            const chunkMessage = this._createChunkMessage(message, chunks[i], i === 0);
            try {
                await original.call(thisObj, channelId, chunkMessage, ...rest);
            } catch (err) {
                BdApi.Logger.error(PLUGIN_NAME, `Error sending chunk ${i + 1}:`, err);
                BdApi.UI.showToast(`${PLUGIN_NAME}: Failed to send chunk ${i + 1}`, { type: "error" });
                break;
            }
            if (i < chunks.length - 1) await new Promise(resolve => setTimeout(resolve, finalDelay));
        }
        return { shouldClear: true, shouldRefocus: true };
    }
    _patchSendMessage() {
        if (!this.MessageActions?.sendMessage) {
            BdApi.Logger.warn(PLUGIN_NAME, "MessageActions not available; send patch skipped");
            return;
        }
        BdApi.Patcher.instead(PLUGIN_NAME, this.MessageActions, "sendMessage", async (thisObj, args, original) => {
            const [channelId, message, ...rest] = args;
            if (!message?.content) return original.apply(thisObj, args);
            this._updateMaxLength();
            if (message.content.length <= this.effectiveLimit || !this._canSplitInChannel(channelId)) {
                return original.apply(thisObj, args);
            }
            const chunks = this._splitIntoChunks(message.content, this.effectiveLimit);
            const maxChunksSetting = Number(this.settings.maxChunks) || 0;
            if (maxChunksSetting > 0 && chunks.length > maxChunksSetting) {
                BdApi.UI.showToast(`${PLUGIN_NAME}: Message too long (${chunks.length} chunks). Max allowed is ${maxChunksSetting}.`, { type: "error" });
                throw new Error("Message too long");
            }
            if (chunks.length <= 1) return original.apply(thisObj, args);
            BdApi.Logger.info(PLUGIN_NAME, `Splitting message into ${chunks.length} chunks`);
            return this._sendChunks(chunks, channelId, message, rest, original, thisObj);
        });
    }
    /* ================= Helpers: Splitting & Permissions ================= */
    _canSplitInChannel(channelId) {
        const channel = this.ChannelStore?.getChannel?.(channelId);
        if (!channel) return true;
        const slowmode = channel.rateLimitPerUser || 0;
        if (slowmode <= 0) return true;
        if (this.PermissionsBits && this.Permissions) {
            try {
                const perms = channel.accessPermissions || 0n;
                const canManage =
                    (perms & this.PermissionsBits.MANAGE_MESSAGES) === this.PermissionsBits.MANAGE_MESSAGES ||
                    (perms & this.PermissionsBits.MANAGE_CHANNELS) === this.PermissionsBits.MANAGE_CHANNELS;
                if (canManage) return true;
            } catch { /* Permission check failed, continue with slowmode check */ }
        }
        if (!this.settings.splitInSlowmode) return false;
        return slowmode <= (this.settings.slowmodeMax ?? 5);
    }
    _hardSplitChunks(text, limit) {
        const chunks = [];
        let remaining = text;
        while (remaining.length > limit) {
            chunks.push(remaining.slice(0, limit));
            remaining = remaining.slice(limit);
        }
        if (remaining.length) chunks.push(remaining);
        return chunks;
    }
    _createMarkdownParser() {
        const stack = [];
        const top = () => stack.at(-1);
        const toggle = (type, meta = {}) => {
            if (top()?.type === type) stack.pop();
            else stack.push({ type, ...meta });
        };
        const isFence = (a, b, c) => (a === "`" && b === "`" && c === "`") || (a === "~" && b === "~" && c === "~");
        const openMarkers = { spoiler: "||", inlinecode: "`", bold: "**", underline: "__", strike: "~~", "italic*": "*", "italic_": "_" };
        const closeMarkers = { codeblock: "\n```", spoiler: "||", inlinecode: "`", bold: "**", underline: "__", strike: "~~", "italic*": "*", "italic_": "_" };
        const openPrefix = () => stack.map(t => t.type === "codeblock" ? "```" + (t.lang || "") + "\n" : (openMarkers[t.type] || "")).join("");
        const closeSuffix = () => [...stack].reverse().map(t => closeMarkers[t.type] || "").join("");
        const handleToken = (seg, i, a, b, c) => {
            const topType = top()?.type;
            if (topType === "codeblock") {
                if (isFence(a, b, c)) { stack.pop(); return 3; }
                return 1;
            }
            if (topType === "inlinecode") {
                if (a === "`") toggle("inlinecode");
                return 1;
            }
            if (isFence(a, b, c)) {
                const after = seg.slice(i + 3);
                const nl = after.indexOf("\n");
                toggle("codeblock", { lang: nl >= 0 ? after.slice(0, nl).trim() : "" });
                return 3;
            }
            const doubles = { "||": "spoiler", "**": "bold", "__": "underline", "~~": "strike" };
            if (doubles[a + b]) { toggle(doubles[a + b]); return 2; }
            const singles = { "`": "inlinecode", "*": "italic*", "_": "italic_" };
            if (singles[a]) { toggle(singles[a]); return 1; }
            return 1;
        };
        const scanSegment = (seg) => {
            let i = 0;
            while (i < seg.length) {
                i += handleToken(seg, i, seg[i], seg[i + 1], seg[i + 2]);
            }
        };
        return { scanSegment, openPrefix, closeSuffix };
    }
    _findSplitIndex(text, limit) {
        let splitIndex = text.lastIndexOf("\n", limit);
        if (splitIndex < Math.floor(limit * 0.5)) {
            const spaceIdx = text.lastIndexOf(" ", limit);
            if (spaceIdx !== -1) splitIndex = Math.max(splitIndex, spaceIdx);
        }
        if (splitIndex === -1) splitIndex = limit;
        const inLink = (s, idx) => {
            const lb = s.lastIndexOf("[", idx), rb = s.lastIndexOf("]", idx);
            if (lb > rb) return true;
            const lt = s.lastIndexOf("<", idx), gt = s.lastIndexOf(">", idx);
            return lt > gt;
        };
        while (splitIndex > 0 && inLink(text, splitIndex)) {
            const prevSpace = text.lastIndexOf(" ", splitIndex - 1);
            splitIndex = prevSpace > 0 ? prevSpace : splitIndex - 1;
        }
        return splitIndex;
    }
    _splitIntoChunks(text, limit) {
        if (this.settings.hardSplit) return this._hardSplitChunks(text, limit);
        const chunks = [];
        let remaining = (text || "").replaceAll('\r\n', "\n");
        const parser = this._createMarkdownParser();
        while (remaining.length > limit) {
            const splitIndex = this._findSplitIndex(remaining, limit);
            const chunkBody = remaining.slice(0, splitIndex);
            parser.scanSegment(chunkBody);
            chunks.push(chunkBody + parser.closeSuffix());
            remaining = parser.openPrefix() + remaining.slice(splitIndex);
            if (remaining.startsWith("\n")) remaining = remaining.slice(1);
        }
        if (remaining.length) chunks.push(remaining);
        return chunks;
    }
    /* ================= Patches: UI & Upsells ================= */
    _patchCharacterCounter() {
        if (!this.charCountModule || !this.charCountExportKey) return;
        BdApi.Patcher.before(PLUGIN_NAME, this.charCountModule, this.charCountExportKey, (_, args) => {
            if (!this.settings.hideUpsell) return;
            const props = args[0];
            if (props?.type?.upsellLongMessages) {
                props.type = { ...props.type, upsellLongMessages: null };
            }
        });
    }
    _patchModalActions() {
        const ModalActions = BdApi.Webpack.getByKeys("openModal", "openModalLazy")
            || BdApi.Webpack.getByKeys("openModal", "closeAllModals")
            || BdApi.Webpack.getByKeys("closeModal", "hasModalOpen", "useModalsStore")
            || BdApi.Webpack.getByKeys("openModalLazy", "closeAllModalsInContext");
        if (!ModalActions) return;
        try {
            BdApi.Patcher.instead(PLUGIN_NAME, ModalActions, "openModalLazy", (thisObj, args, original) => {
                if (!this.settings.hideUpsell) return original.apply(thisObj, args);
                const [factory, options] = args || [];
                const src = factory?.toString?.() || "";
                const isUpsell = /jsx\)\(e,_\(\{channel:.*content:/i.test(src) ||
                    /MESSAGE_LENGTH|longMessages|increasedMessageLength/i.test(src);
                if (isUpsell) {
                    try { ModalActions.closeAllModalsInContext?.(); } catch { }
                    try { ModalActions.closeAllModals?.(); } catch { }
                    BdApi.Logger.info(PLUGIN_NAME, "blocked upsell (lazy)");
                    return;
                }
                return original.call(thisObj, factory, options);
            });
        } catch { }
        try {
            BdApi.Patcher.instead(PLUGIN_NAME, ModalActions, "openModal", (thisObj, args, original) => {
                if (!this.settings.hideUpsell) return original.apply(thisObj, args);
                const p = args?.[0] || {};
                let sig = ""; try { sig = (p.modalKey || p.children?.toString?.() || p.toString?.() || "") + ""; } catch { }
                if (/length|limit|long|nitro|increasedMessageLength/i.test(sig)) {
                    try { ModalActions.closeAllModalsInContext?.(); } catch { }
                    try { ModalActions.closeAllModals?.(); } catch { }
                    BdApi.Logger.info(PLUGIN_NAME, "blocked upsell (direct)");
                    return;
                }
                return original.apply(thisObj, args);
            });
        } catch { }
        BdApi.Logger.info(PLUGIN_NAME, "Modal guards installed");
    }
    _disableUploadLongMessages() {
        if (!this._typeContainer) return;
        for (const [key, value] of Object.entries(this._typeContainer)) {
            if (value && typeof value === "object" && value.uploadLongMessages === true) {
                this.originalUploadLongMessages[key] = true;
                value.uploadLongMessages = false;
            }
        }
    }
    _restoreUploadLongMessages() {
        if (!this._typeContainer) return;
        for (const [key, value] of Object.entries(this.originalUploadLongMessages)) {
            if (this._typeContainer[key]) {
                this._typeContainer[key].uploadLongMessages = value;
            }
        }
        this.originalUploadLongMessages = {};
    }
};