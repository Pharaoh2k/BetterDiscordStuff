/**
 * @name BetterSplitLargeMessages
 * @author Pharaoh2k
 * @version 1.0.3
 * @description Splits large messages to smaller ones (~2000/4000 chars). No Nitro spoofing. Honors server limits & slowmode, optional chunk cap, hides upsell banners/modals.
 * @authorId 874825550408089610
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterSplitLargeMessages/BetterSplitLargeMessages.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterSplitLargeMessages/BetterSplitLargeMessages.plugin.js
 */
/*
Copyright © 2025-present Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
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
const { Data, Logger, Net, Patcher, Plugins, UI, Utils, Webpack } = new BdApi("BetterSplitLargeMessages");
class UpdateManager {
	constructor(pluginName, version, github = CONFIG.github) {
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
			const nodePath = require("path");
			const updateTarget = nodePath.join(__dirname, nodePath.basename(__filename));
			require("fs").writeFileSync(updateTarget, text);
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
		const remoteName = /@name\s+([^\n\r]+)/.exec(text)?.[1].trim();
		if (!remoteName) return { ok: false, reason: "Missing @name" };
		if (remoteName !== this.name) return { ok: false, reason: `Unexpected @name (${remoteName})` };
		const remoteVersion = /@version\s+([\d.]+)/.exec(text)?.[1];
		if (!remoteVersion) return { ok: false, reason: "Missing @version" };
		if (!text.includes("module.exports")) return { ok: false, reason: "Missing module.exports" };
		if (!text.includes("@updateUrl")) return { ok: false, reason: "Missing @updateUrl header" };
		return { ok: true, version: remoteVersion };
	}
}
module.exports = class BetterSplitLargeMessages {
    constructor(meta) {
        this.meta = meta;
        this.settings = { ...DEFAULT_SETTINGS, ...Data.load("settings") };
        this.maxLength = 2000;
        this.MessageActions = null;
        this.UserStore = null;
        this.ChannelStore = null;
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
        this.updateManager = new UpdateManager(meta.name, meta.version, GITHUB_PATH);
    }
    start() {
        this._initModules();
        if (!this._validateModules()) {
            UI.showToast(`${this.meta.name}: Critical modules failed to load. Check console.`, { type: "warning" });
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
        UI.showToast(`${this.meta.name} started!`, { type: "success" });
        Logger.info({
            serverLimit: this._getServerLimit(),
            effectiveLimit: this.effectiveLimit,
            composeLimit: this.composeLimit
        });
    }
    stop() {
        Patcher.unpatchAll();
        this._restoreUploadLongMessages();
        this._restoreLengthValidation();
        this.updateManager.stop();
        UI.showToast(`${this.meta.name} stopped!`, { type: "info" });
    }
    _saveSettings() {
        Data.save("settings", this.settings);
        this._updateMaxLength();
        this._restoreLengthValidation();
        this._bypassLengthValidation();
    }
    getSettingsPanel() {
        return UI.buildSettingsPanel({
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
                            value: this.settings.maxChunks,
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
    _initModules() {
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
        this._initPermissionsBits();
        this._initLengthConstants();
        this._initChatInputTypes();
        this._initUpsellModule();
        this._initCharCountModule();
    }
    _initPermissionsBits() {
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
            Logger.warn("Permissions bitfield module not found; slowmode manage-perms bypass may be inaccurate.");
        }
    }
    _initLengthConstants() {
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
            const hasSpoilerRegex = values.some(v => v instanceof RegExp && v.source.includes(String.raw`\|\|`));
            return hasLimit && hasSpoilerRegex;
        });
        if (this.LengthConstants) {
            this.lengthConstantKeys = Object.entries(this.LengthConstants)
                .filter(([_, v]) => v === 2000 || v === 4000)
                .map(([k]) => k);
        }
    }
    _initChatInputTypes() {
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
            );
        }
    }
    _initUpsellModule() {
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
    _initCharCountModule() {
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
        Logger.warn(`Could not find module: ${name}`);
        return null;
    }
    _validateModules() {
        if (!this.MessageActions) {
            Logger.error("Required module missing: MessageActions");
            return false;
        }
        return true;
    }
    _getServerLimit() {
        const user = this.UserStore?.getCurrentUser();
        const hasNitro = !!(user?.premiumType && user.premiumType !== 0);
        return hasNitro ? 4000 : 2000;
    }
    _patchCharacterCounterMax() {
        if (!this.charCountModule || !this.charCountExportKey) return;
        Patcher.before(this.charCountModule, this.charCountExportKey, (_, args) => {
            const props = args[0];
            if (!props) return;
            if (props.type?.upsellLongMessages) {
                props.type = { ...props.type, upsellLongMessages: null };
            }
            props.showRemainingCharsAfterCount = Number.MAX_SAFE_INTEGER;
            props.maxCharacterCount = this.composeLimit;
        });
        Logger.info("Patched character counter");
    }
    _patchInlineUpsellComponent() {
        const mod = Webpack.getByStrings("MESSAGE_LENGTH_UPSELL", { searchExports: true });
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
        if (!exportKey) return;
        Patcher.instead(
            moduleObject,
            exportKey,
            (thisObj, args, original) => {
                if (!this.settings.hideUpsell) {
                    return original.apply(thisObj, args);
                }
                Logger.info("Suppressed inline upsell component");
                return null;
            }
        );
        Logger.info("Inline upsell component patch installed");
    }
    _updateMaxLength() {
        const serverLimit = this._getServerLimit();
        const configured = Number(this.settings.maxLength) || 0;
        const configuredOrAuto = configured === 0 ? serverLimit : configured;
        this.effectiveLimit = Math.min(configuredOrAuto, serverLimit);
        this.composeLimit = configured > 0 ? Math.max(this.effectiveLimit, configured) : 1e9;
        this.maxLength = configuredOrAuto;
    }
    _bypassLengthValidation() {
        if (!this.LengthConstants || this.lengthConstantKeys.length === 0) {
            Logger.warn("LengthConstants not found - length bypass skipped");
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
        Logger.info(
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
                Logger.error(`Error sending chunk ${i + 1}:`, err);
                UI.showToast(`${this.meta.name}: Failed to send chunk ${i + 1}`, { type: "error" });
                break;
            }
            if (i < chunks.length - 1) await new Promise(resolve => setTimeout(resolve, finalDelay));
        }
        return { shouldClear: true, shouldRefocus: true };
    }
    _patchSendMessage() {
        if (!this.MessageActions?.sendMessage) {
            Logger.warn("MessageActions not available; send patch skipped");
            return;
        }
        Patcher.instead(this.MessageActions, "sendMessage", async (thisObj, args, original) => {
            const [channelId, message, ...rest] = args;
            if (!message?.content) return original.apply(thisObj, args);
            this._updateMaxLength();
            if (message.content.length <= this.effectiveLimit || !this._canSplitInChannel(channelId)) {
                return original.apply(thisObj, args);
            }
            const chunks = this._splitIntoChunks(message.content, this.effectiveLimit);
            const maxChunksSetting = Number(this.settings.maxChunks) || 0;
            if (maxChunksSetting > 0 && chunks.length > maxChunksSetting) {
                UI.showToast(`${this.meta.name}: Message too long (${chunks.length} chunks). Max allowed is ${maxChunksSetting}.`, { type: "error" });
                throw new Error("Message too long");
            }
            if (chunks.length <= 1) return original.apply(thisObj, args);
            Logger.info(`Splitting message into ${chunks.length} chunks`);
            return this._sendChunks(chunks, channelId, message, rest, original, thisObj);
        });
    }
    _canSplitInChannel(channelId) {
        const channel = this.ChannelStore?.getChannel(channelId);
        if (!channel) return true;
        const slowmode = channel.rateLimitPerUser || 0;
        if (slowmode <= 0) return true;
        if (this.PermissionsBits) {
            const perms = channel.accessPermissions || 0n;
            const canManage =
                (perms & this.PermissionsBits.MANAGE_MESSAGES) === this.PermissionsBits.MANAGE_MESSAGES ||
                (perms & this.PermissionsBits.MANAGE_CHANNELS) === this.PermissionsBits.MANAGE_CHANNELS;
            if (canManage) return true;
        }
        if (!this.settings.splitInSlowmode) return false;
        return slowmode <= this.settings.slowmodeMax;
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
                toggle("codeblock", { lang: (nl >= 0 ? after.slice(0, nl) : after).trim() });
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
        let remaining = text.replaceAll('\r\n', "\n");
        const parser = this._createMarkdownParser();
        let prefixLen = 0;
        const suffixBudget = 20;
        while (remaining.length > limit) {
            const splitIndex = this._findSplitIndex(remaining, limit - suffixBudget);
            parser.scanSegment(remaining.slice(prefixLen, splitIndex));
            chunks.push(remaining.slice(0, splitIndex) + parser.closeSuffix());
            const prefix = parser.openPrefix();
            remaining = prefix + remaining.slice(splitIndex);
            prefixLen = prefix.length;
            if (prefixLen === 0 && remaining.startsWith("\n")) remaining = remaining.slice(1);
        }
        if (remaining.length) chunks.push(remaining);
        return chunks;
    }
    _patchCharacterCounter() {
        if (!this.charCountModule || !this.charCountExportKey) return;
        Patcher.before(this.charCountModule, this.charCountExportKey, (_, args) => {
            if (!this.settings.hideUpsell) return;
            const props = args[0];
            if (props?.type?.upsellLongMessages) {
                props.type = { ...props.type, upsellLongMessages: null };
            }
        });
    }
    _patchModalActions() {
        const ModalActions = Webpack.getByKeys("openModal", "openModalLazy")
            || Webpack.getByKeys("openModal", "closeAllModals")
            || Webpack.getByKeys("closeModal", "hasModalOpen", "useModalsStore")
            || Webpack.getByKeys("openModalLazy", "closeAllModalsInContext");
        if (!ModalActions) return;
        if (ModalActions.openModalLazy) {
            Patcher.instead(ModalActions, "openModalLazy", (thisObj, args, original) => {
                if (!this.settings.hideUpsell) return original.apply(thisObj, args);
                const [factory, options] = args;
                const src = factory?.toString() || "";
                const isUpsell = /jsx\)\(e,_\(\{channel:.*content:/i.test(src) ||
                    /MESSAGE_LENGTH|longMessages|increasedMessageLength/i.test(src);
                if (isUpsell) {
                    ModalActions.closeAllModalsInContext?.();
                    ModalActions.closeAllModals?.();
                    Logger.info("blocked upsell (lazy)");
                    return;
                }
                return original.call(thisObj, factory, options);
            });
        }
        if (ModalActions.openModal) {
            Patcher.instead(ModalActions, "openModal", (thisObj, args, original) => {
                if (!this.settings.hideUpsell) return original.apply(thisObj, args);
                const p = args[0] || {};
                const sig = (p.modalKey || p.children?.toString() || p.toString() || "") + "";
                if (/length|limit|long|nitro|increasedMessageLength/i.test(sig)) {
                    ModalActions.closeAllModalsInContext?.();
                    ModalActions.closeAllModals?.();
                    Logger.info("blocked upsell (direct)");
                    return;
                }
                return original.apply(thisObj, args);
            });
        }
        Logger.info("Modal guards installed");
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
