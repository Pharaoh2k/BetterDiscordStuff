/**
 * @name BetterMessageUtilities
 * @version 1.1.0
 * @description Adds customizable hotkeys for message actions (delete, edit, pin, reply, etc.)
 * @author Pharaoh2k
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterMessageUtilities/BetterMessageUtilities.plugin.js
 */
/* BdApi based & BDFDB-free. Inspired by mwittrien / Devilbro's "MessageUtilities" */
/* ==========================================
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * * *
 * Contributions are welcome via GitHub pull requests. 
 * Please ensure submissions align with the project's guidelines and coding standards.
============================================= */
const { Data, Hooks, Logger, Net, Plugins, Components, React, ReactUtils, UI, Utils, Webpack } = new BdApi("BetterMessageUtilities");
const { SwitchInput, DropdownInput, KeybindInput, SettingItem, SettingGroup } = Components;
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
        if (!this.notification) return;
        this.notification();
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
            title: this.name,
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
            setTimeout(() => Plugins.reload(this.name), 100);
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
        const remoteName = text.match(/@name\s+([^\n\r]+)/)?.[1].trim();
        if (!remoteName) return { ok: false, reason: "Missing @name" };
        if (remoteName !== this.name) return { ok: false, reason: `Unexpected @name (${remoteName})` };
        const remoteVersion = text.match(/@version\s+([\d.]+)/)?.[1];
        if (!remoteVersion) return { ok: false, reason: "Missing @version" };
        if (!text.includes("module.exports")) return { ok: false, reason: "Missing module.exports" };
        if (!text.includes("@updateUrl")) return { ok: false, reason: "Missing @updateUrl header" };
        return { ok: true, version: remoteVersion };
    }
}
module.exports = class BetterMessageUtilities {
    constructor(meta) {
        this.meta = meta;
        this.KeyCodes = { ESCAPE: 27 };
        this.ClickTypes = { CLICK: 0, DBLCLICK: 1 };
        this.updateManager = new UpdateManager(
            meta.name,
            meta.version,
            "Pharaoh2k/BetterDiscordStuff"
        );
        this.defaultSettings = {
            general: { clearOnEscape: true, autoUpdate: true, confirmDelete: true },
            toasts: { Delete_Message: true, Edit_Message: false, Pin_Unpin_Message: true, Reply_to_Message: true, React_to_Message: false, Copy_Raw: true, Copy_Link: true },
            bindings: {
                Delete_Message: { name: "Delete Message", keycombo: [46], click: 0, enabled: true },
                Edit_Message: { name: "Edit Message", keycombo: [], click: 1, enabled: true },
                Pin_Unpin_Message: { name: "Pin/Unpin Message", keycombo: [17], click: 0, enabled: true },
                Reply_to_Message: { name: "Reply to Message", keycombo: [17, 72], click: 0, enabled: true },
                React_to_Message: { name: "Open Reactions Menu", keycombo: [17, 83], click: 0, enabled: false },
                Copy_Raw: { name: "Copy Raw Message", keycombo: [17, 68], click: 0, enabled: true },
                Copy_Link: { name: "Copy Message Link", keycombo: [17, 81], click: 0, enabled: true }
            }
        };
        this.settings = {};
        this.pressedKeys = new Set();
        this.walkable = ["child", "memoizedProps", "sibling"];
    }
    start() {
        this.loadSettings();
        this.updateManager.start(this.settings.general.autoUpdate);
        this.getDiscordModules();
        this.addEventListeners();
        UI.showToast(`${this.meta.name} started!`, {
            type: "success"
        });
    }
    stop() {
        this.updateManager.stop();
        this.removeEventListeners();
        document.getElementById("bmu-settings-css")?.remove();
        UI.showToast(`${this.meta.name} stopped!`, {
            type: "info"
        });
    }
    getDiscordModules() {
        this.ChannelStore = Webpack.Stores.ChannelStore;
        this.UserStore = Webpack.Stores.UserStore;
        this.PermissionUtils = Webpack.Stores.PermissionStore;
        this.Dispatcher = this.UserStore._dispatcher;
        this.MessageActions = Webpack.getByKeys("deleteMessage", "startEditMessage");
        this.ElectronModule = Webpack.getByKeys("copy", "copyImage");
        this.PinActions = Webpack.getByKeys("pinMessage", "unpinMessage");
        this.DraftActions = Webpack.getByKeys("clearDraft", "saveDraft");
        this.SelectedChannelStore = Webpack.Stores.SelectedChannelStore;
        this.DiscordPermissions = { MANAGE_MESSAGES: 8192n };
        if (!this.ElectronModule) {
            this.ElectronModule = { copy: (text) => navigator.clipboard.writeText(text) };
        }
    }
    loadSettings() {
        const savedSettings = Data.load("settings");
        if (!savedSettings) {
            this.settings = structuredClone(this.defaultSettings);
            return;
        }
        this.settings = savedSettings;
        this.settings.general = this.settings.general || this.defaultSettings.general;
        this.settings.general.autoUpdate = this.settings.general.autoUpdate ?? this.defaultSettings.general.autoUpdate;
        this.settings.general.clearOnEscape = this.settings.general.clearOnEscape ?? this.defaultSettings.general.clearOnEscape;
        this.settings.toasts = this.settings.toasts || this.defaultSettings.toasts;
        for (const key in this.defaultSettings.toasts) {
            this.settings.toasts[key] = this.settings.toasts[key] ?? this.defaultSettings.toasts[key];
        }
        this.settings.bindings = this.settings.bindings || this.defaultSettings.bindings;
        for (const key in this.defaultSettings.bindings) {
            const defaultBinding = this.defaultSettings.bindings[key];
            const currentBinding = this.settings.bindings[key];
            if (!currentBinding) {
                this.settings.bindings[key] = defaultBinding;
                continue;
            }
            const merged = {
                enabled: true,
                keycombo: [],
                click: 0,
                name: defaultBinding.name,
                ...currentBinding
            };
            merged.keycombo = Array.isArray(merged.keycombo) ? merged.keycombo : [];
            merged.click = merged.click === 1 ? 1 : 0;
            this.settings.bindings[key] = merged;
        }
    }
    saveSettings() { Data.save("settings", this.settings); }
    addEventListeners() {
        this.keyDownHandler = (e) => {
            this.pressedKeys.add(e.keyCode);
            if (e.keyCode === this.KeyCodes.ESCAPE && this.settings.general.clearOnEscape) {
                const chatInput = document.querySelector('[role="textbox"][data-slate-editor="true"]');
                if (chatInput && document.activeElement === chatInput && chatInput.textContent.trim()) {
                    const channelId = this.SelectedChannelStore.getChannelId();
                    if (channelId && this.DraftActions) {
                        this.DraftActions.clearDraft(channelId, 0);
                    }
                }
            }
        };
        this.keyUpHandler = (e) => this.pressedKeys.delete(e.keyCode);
        this.blurHandler = () => this.pressedKeys.clear();
        this.clickHandler = (e) => this.handleMessageInteraction(e, "click");
        this.dblClickHandler = (e) => this.handleMessageInteraction(e, "dblclick");
        document.addEventListener("keydown", this.keyDownHandler);
        document.addEventListener("keyup", this.keyUpHandler);
        window.addEventListener("blur", this.blurHandler);
        document.addEventListener("click", this.clickHandler, true);
        document.addEventListener("dblclick", this.dblClickHandler, true);
    }
    removeEventListeners() {
        document.removeEventListener("keydown", this.keyDownHandler);
        document.removeEventListener("keyup", this.keyUpHandler);
        window.removeEventListener("blur", this.blurHandler);
        document.removeEventListener("click", this.clickHandler, true);
        document.removeEventListener("dblclick", this.dblClickHandler, true);
        this.pressedKeys.clear();
    }
    handleMessageInteraction(event, type) {
        if (!(event.target instanceof Element)) return;
        const messageDiv = event.target.closest('[data-list-item-id^="chat-messages___chat-messages-"]');
        if (!messageDiv) return;
        const ignore = ['button', '[role="button"]', 'a', '[class*="toolbar-"]', '[class*="reactions-"]', '[class*="buttonContainer-"]'];
        if (ignore.some(s => event.target.closest(s))) return;
        const clickType = type === "dblclick" ? this.ClickTypes.DBLCLICK : this.ClickTypes.CLICK;
        let bestAction = null;
        let bestLength = -1;
        for (const [action, binding] of Object.entries(this.settings.bindings)) {
            if (!binding.enabled || binding.click !== clickType) continue;
            let allKeysPressed = true;
            for (const key of binding.keycombo) {
                if (!this.pressedKeys.has(key)) { allKeysPressed = false; break; }
            }
            if (!allKeysPressed) continue;
            if (binding.keycombo.length > bestLength) {
                bestAction = action;
                bestLength = binding.keycombo.length;
            }
        }
        if (!bestAction) return;
        const message = this.getMessageFromReact(messageDiv);
        if (!message) return;
        try {
            if (this.executeAction(bestAction, message)) {
                event.stopImmediatePropagation();
            }
        } catch (e) {
            Logger.error(`Action "${bestAction}" failed:`, e);
            UI.showToast("Action failed", { type: "error" });
        }
    }
    _getChannel(channelId) {
        const channel = this.ChannelStore.getChannel(channelId);
        if (!channel) UI.showToast("Unable to get channel", { type: "error" });
        return channel;
    }
    getMessageFromReact(messageDiv) {
        const instance = ReactUtils.getInternalInstance(messageDiv);
        if (!instance) return null;
        const baseMessageContainer = Utils.findInTree(instance, m => m?.baseMessage, { walkable: this.walkable });
        const messageContainer = Utils.findInTree(instance, m => m?.message, { walkable: this.walkable });
        return baseMessageContainer?.baseMessage || messageContainer?.message;
    }
    executeAction(action, message) {
        switch (action) {
            case "Delete_Message": return this.deleteMessage(message);
            case "Edit_Message": return this.editMessage(message);
            case "Pin_Unpin_Message": return this.togglePinMessage(message);
            case "Reply_to_Message": return this.replyToMessage(message);
            case "React_to_Message": return this.openReactMenu(message);
            case "Copy_Raw": return this.copyRawMessage(message);
            case "Copy_Link": return this.copyMessageLink(message);
        }
        return false;
    }
    deleteMessage(message) {
        if (!this.MessageActions) { UI.showToast("Unable to delete message", { type: "error" }); return false; }
        const currentUser = this.UserStore.getCurrentUser();
        if (!currentUser) { UI.showToast("Unable to get current user", { type: "error" }); return false; }
        const isOwnMessage = message.author.id === currentUser.id;
        const channel = this.ChannelStore.getChannel(message.channel_id);
        const hasPermission = channel &&
            this.PermissionUtils.can(this.DiscordPermissions.MANAGE_MESSAGES, channel);
        if (!isOwnMessage && !hasPermission) {
            UI.showToast("No permission to delete this message", { type: "error" });
            return false;
        }
        const doDelete = () => {
            this.MessageActions.deleteMessage(message.channel_id, message.id);
            if (this.settings.toasts.Delete_Message) UI.showToast("Message deleted!", { type: "success" });
        };
        if (isOwnMessage || !this.settings.general.confirmDelete) {
            doDelete();
        } else {
            UI.showConfirmationModal("Delete Message",
                "Are you sure you want to delete this message?", {
                confirmText: "Delete",
                cancelText: "Cancel",
                danger: true,
                onConfirm: doDelete
            });
        }
        return true;
    }
    editMessage(message) {
        if (!this.MessageActions) { UI.showToast("Unable to edit message", { type: "error" }); return false; }
        const currentUser = this.UserStore.getCurrentUser();
        if (!currentUser || message.author.id !== currentUser.id) return false;
        this.MessageActions.startEditMessage(message.channel_id, message.id, message.content);
        if (this.settings.toasts.Edit_Message) UI.showToast("Editing message...", { type: "info" });
        return true;
    }
    togglePinMessage(message) {
        if (!this.PinActions) {
            UI.showToast("Unable to pin/unpin message", { type: "error" });
            return false;
        }
        const channel = this._getChannel(message.channel_id);
        if (!channel) return false;
        if (!this.PermissionUtils.can(this.DiscordPermissions.MANAGE_MESSAGES, channel)) {
            UI.showToast("No permission to pin/unpin messages", { type: "error" });
            return false;
        }
        if (message.pinned) {
            this.PinActions.unpinMessage(channel, message.id);
            if (this.settings.toasts.Pin_Unpin_Message) {
                UI.showToast("Message unpinned!", { type: "warning" });
            }
        } else {
            this.PinActions.pinMessage(channel, message.id);
            if (this.settings.toasts.Pin_Unpin_Message) {
                UI.showToast("Message pinned!", { type: "success" });
            }
        }
        return true;
    }
    replyToMessage(message) {
        const channel = this._getChannel(message.channel_id);
        if (!channel) return false;
        this.Dispatcher.dispatch({ type: "CREATE_PENDING_REPLY", channel: channel, message: message, shouldMention: true });
        if (this.settings.toasts.Reply_to_Message) UI.showToast("Replying to message...", { type: "info" });
        return true;
    }
    openReactMenu(message) {
        const messageEl = document.querySelector(`[id*="${message.id}"]`);
        if (!messageEl) return false;
        messageEl.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        messageEl.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        if (this.settings.toasts.React_to_Message) UI.showToast("Opening reaction menu...", { type: "info" });
        setTimeout(() => {
            const toolbar = messageEl.querySelector('[role="group"]');
            const reactionBtn = toolbar?.querySelector('svg path[d^="M12 23a11"]')?.closest('[role="button"]');
            if (reactionBtn) reactionBtn.click();
            else UI.showToast("Reaction button not found", { type: "warning" });
        }, 150);
        return true;
    }
    copyRawMessage(message) {
        if (!message.content) { UI.showToast("No text to copy", { type: "warning" }); return false; }
        this.ElectronModule.copy(message.content);
        if (this.settings.toasts.Copy_Raw) UI.showToast("Message copied!", { type: "success" });
        return true;
    }
    copyMessageLink(message) {
        const channel = this._getChannel(message.channel_id);
        if (!channel) return false;
        const guildId = channel.guild_id || "@me", link = `https://discord.com/channels/${guildId}/${message.channel_id}/${message.id}`;
        this.ElectronModule.copy(link);
        if (this.settings.toasts.Copy_Link) UI.showToast("Link copied!", { type: "success" });
        return true;
    }
    getSettingsPanel() {
        this.loadSettings();
        const { useCallback } = React;
        const h = React.createElement;        
        const updateManager = this.updateManager;
        const defaultSettings = this.defaultSettings;
        const KC_MAP = { 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 20: "CapsLock", 27: "Escape", 32: " ", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 46: "Delete", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" };
        const KEY_MAP = Object.fromEntries(Object.entries(KC_MAP).map(([k, v]) => [v, Number(k)]));
        const toKeys = (keycodes) => keycodes.map(kc => {
            if (KC_MAP[kc]) return KC_MAP[kc];
            if (kc >= 65 && kc <= 90) return String.fromCodePoint(kc + 32);
            if (kc >= 48 && kc <= 57) return String.fromCodePoint(kc);
            if (kc >= 112 && kc <= 123) return `F${kc - 111}`;
            return "";
        }).filter(Boolean);
        const toKeycodes = (keys) => keys.map(k => {
            if (KEY_MAP[k]) return KEY_MAP[k];
            if (k.length === 1) return k.toUpperCase().codePointAt(0);
            if (/^F(\d{1,2})$/.test(k)) return Number.parseInt(k.slice(1), 10) + 111;
            return 0;
        }).filter(Boolean);
        const cssId = "bmu-settings-css";
        if (!document.getElementById(cssId)) {
            const style = document.createElement("style");
            style.id = cssId;
            style.textContent = `
                .bmu-card{background:var(--background-base-lower,rgba(0,0,0,.2));border-radius:6px;padding:12px 14px;margin-bottom:6px;border:1px solid var(--background-accent,rgba(255,255,255,.05));transition:opacity .15s}
                .bmu-card[data-disabled="true"]{opacity:.5}
                .bmu-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
                .bmu-action-name{color:var(--mobile-text-heading-primary);font-size:15px;font-weight:600;flex:1}
                .bmu-card-toggles{display:flex;align-items:center;gap:10px}
                .bmu-card-controls{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
                .bmu-inline-toggle{display:flex;align-items:center;gap:6px}
                .bmu-itlabel{color:var(--text-muted);font-size:11px;font-weight:500;white-space:nowrap}
            `;
            document.head.appendChild(style);
        }
        const ActionCard = ({ binding, toast, extras, onUpdate }) => {
            return h("div", { className: "bmu-card", "data-disabled": String(!binding.enabled) },
                h("div", { className: "bmu-card-top" },
                    h("span", { className: "bmu-action-name" }, binding.name),
                    h("div", { className: "bmu-card-toggles" },
                        extras,
                        h("div", { className: "bmu-inline-toggle" },
                            h("span", { className: "bmu-itlabel" }, "Toast"),
                            h(SwitchInput, { value: toast, onChange: (v) => onUpdate("toast", v) })
                        ),
                        h("div", { className: "bmu-inline-toggle" },
                            h("span", { className: "bmu-itlabel" }, "Enabled"),
                            h(SwitchInput, { value: binding.enabled, onChange: (v) => onUpdate("enabled", v) })
                        )
                    )
                ),
                h("div", { className: "bmu-card-controls" },
                    h(KeybindInput, {
                        value: toKeys(binding.keycombo),
                        clearable: true,
                        disabled: !binding.enabled,
                        onChange: (keys) => onUpdate("keycombo", toKeycodes(keys)),
                    }),
                    h(DropdownInput, {
                        value: binding.click,
                        options: [{ label: "Click", value: 0 }, { label: "Double Click", value: 1 }],
                        disabled: !binding.enabled,
                        onChange: (v) => onUpdate("click", v),
                    })
                )
            );
        }
        const SettingsPanel = () => {
            const settings = Hooks.useData("settings") ?? defaultSettings;
            const updateGeneral = useCallback((key, value) => {
                this.settings.general[key] = value;
                if (key === "autoUpdate") {
                    value ? updateManager.start(true) : updateManager.stop();
                }
                Data.save("settings", { ...this.settings });
            }, []);
            const updateAction = useCallback((action, field, value) => {
                if (field === "toast") {
                    this.settings.toasts[action] = value;
                } else {
                    this.settings.bindings[action][field] = value;
                }
                Data.save("settings", { ...this.settings });
            }, []);
            return h("div", null,
                h(SettingGroup, { name: "General", shown: true },
                    h(SettingItem, { name: "Clear Input on Escape", note: "Clear message input when pressing Escape", inline: true },
                        h(SwitchInput, { value: settings.general.clearOnEscape, onChange: (v) => updateGeneral("clearOnEscape", v) })
                    ),
                    h(SettingItem, { name: "Auto Update", note: "Check for updates every 24 hours", inline: true },
                        h(SwitchInput, { value: settings.general.autoUpdate, onChange: (v) => updateGeneral("autoUpdate", v) })
                    )
                ),
                h(SettingGroup, { name: "Actions", shown: true },
                    ...Object.entries(settings.bindings).map(([action, binding]) =>
                        h(ActionCard, {
                            key: action,
                            binding,
                            toast: settings.toasts[action] ?? false,
                            extras: action === "Delete_Message" ? h("div", { className: "bmu-inline-toggle" },
                                h("span", { className: "bmu-itlabel" }, "Confirm"),
                                h(SwitchInput, { value: settings.general.confirmDelete, onChange: (v) => updateGeneral("confirmDelete", v) })
                            ) : null,
                            onUpdate: (field, value) => updateAction(action, field, value),
                        })
                    )
                )
            );
        }
        return h(SettingsPanel);
    }
};
