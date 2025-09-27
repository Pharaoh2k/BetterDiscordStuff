/**
 * @name BetterMessageUtilities
 * @version 1.0.1
 * @description Adds customizable hotkeys for message actions (delete, edit, pin, reply, etc.)
 * @author Pharaoh2k
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/edit/main/Plugins/BetterMessageUtilities/BetterMessageUtilities.plugin.js
 */
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
/* ==========================================
Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
============================================= */
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
        clearInterval(this.timer);
        this.notice?.();
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
            if (!silent) BdApi.UI.showToast(`[${this.name}] Update check failed`, { type: 'error' });
        }
    }
    showUpdateNotice(version, text) {
        this.notice?.();
        this.notice = BdApi.UI.showNotice(
            `${this.name} v${version} is available`,
            {
                type: 'info',
                buttons: [{
                    label: 'Update',
                    onClick: (close) => {
                        close();
                        this.applyUpdate(text, version);
                    }
                }, {
                    label: 'Dismiss',
                    onClick: (close) => close()
                }]
            }
        );
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
        } catch {
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
            const md = await res.text();
            const changes = this.parseChangelog(md, last, this.version);
            if (changes.length === 0) return;
            BdApi.UI.showChangelogModal({
                title: this.name,
                subtitle: `Version ${this.version}`,
                changes
            });
        } catch {}
    }
    async showFullChangelog() {
        try {
            const res = await BdApi.Net.fetch(this.urls.changelog);
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
const { Webpack,  Data, UI, React, ReactDOM, ReactUtils, Utils } = BdApi;
module.exports = class BetterMessageUtilities {
    constructor() {        
        this.KeyCodes = { DELETE: 46, ESCAPE: 27, ENTER: 13, CTRL: 17, ALT: 18, SHIFT: 16, D: 68, E: 69, P: 80, R: 82, H: 72, Q: 81, S: 83, C: 67, BACKSPACE: 8 };
        this.ClickTypes = { CLICK: 0, DBLCLICK: 1 };
        this.updateManager = new UpdateManager(
            "BetterMessageUtilities",
            "1.0.0",
            "Pharaoh2k/BetterDiscordStuff"
        );
        this.defaultSettings = {
            general: { clearOnEscape: true, autoUpdate: true },
            toasts: { Delete_Message: true, Edit_Message: false, Pin_Unpin_Message: true, Reply_to_Message: true, Copy_Raw: true, Copy_Link: true },
            bindings: {
                Delete_Message: { name: "Delete Message", keycombo: [46], click: 0, enabled: true },
                Edit_Message: { name: "Edit Message", keycombo: [], click: 1, enabled: true },
                Pin_Unpin_Message: { name: "Pin/Unpin Message", keycombo: [17], click: 0, enabled: true },
                Reply_to_Message: { name: "Reply to Message", keycombo: [17, 72], click: 0, enabled: true },
                React_to_Message: { name: "Open React Menu", keycombo: [17, 83], click: 0, enabled: false },
                Copy_Raw: { name: "Copy Raw Message", keycombo: [17, 68], click: 0, enabled: true },
                Copy_Link: { name: "Copy Message Link", keycombo: [17, 81], click: 0, enabled: true }
            }
        };
        this.settings = {}; 
        this.pressedKeys = new Set(); 
        this.walkable = ["child", "memoizedProps", "sibling"];
    }
    load() {
        this.getDiscordModules();
        window.BMU = { plugin: this, getSettings: () => this.settings, getPressedKeys: () => Array.from(this.pressedKeys) };
    }
    start() {
        this.loadSettings();
        this.addEventListeners();
        this.updateManager.start(this.settings.general.autoUpdate);
        UI.showToast("BetterMessageUtilities started!", {
            type: "success"
        });
    }
    stop() {
        this.removeEventListeners();
        this.updateManager.stop();
        if (window.BMU) delete window.BMU;
        UI.showToast("BetterMessageUtilities stopped!", {
            type: "info"
        });
    }
    getDiscordModules() {
        try {
            const hasWebpack = Webpack && typeof Webpack.getByKeys === 'function';
            this.ReactUtils = ReactUtils;
            this.Utils = Utils;
            if (hasWebpack) {
                const { Webpack } = BdApi;
                this.MessageActions = Webpack.getByKeys("deleteMessage", "startEditMessage");
                this.MessageStore = Webpack.getByKeys("getMessage", "getMessages");
                this.ChannelStore = Webpack.getByKeys("getChannel", "getDMFromUserId");
                this.UserStore = Webpack.getByKeys("getCurrentUser", "getUser");
                this.SelectedChannelStore = Webpack.getByKeys("getChannelId", "getVoiceChannelId");
                this.Dispatcher = Webpack.getByKeys("dispatch", "subscribe");
                this.ElectronModule = Webpack.getByKeys("copy", "copyImage");
                this.PinActions = Webpack.getByKeys("pinMessage", "unpinMessage");
                this.PermissionStore = Webpack.getStore("PermissionStore");
                this.PermissionUtils = this.PermissionStore;
                this.DiscordPermissions = {
                    MANAGE_MESSAGES: 8192n,
                    SEND_MESSAGES: 2048n,
                    VIEW_CHANNEL: 1024n,
                    READ_MESSAGE_HISTORY: 65536n,
                    ADMINISTRATOR: 8n
                };
                this.startEditMessage = Webpack.getModule(m => m?.startEditMessage && typeof m.startEditMessage === "function");
            } else {
                console.error("BetterMessageUtilities: Webpack is required but not available");
                UI.showToast("BetterMessageUtilities: Failed to load - outdated BetterDiscord version", { type: "error" });
                return;
            }
            if (!this.ElectronModule) {
                this.ElectronModule = { copy: (text) => navigator.clipboard.writeText(text) };
            }
            this.React = React;
            this.ReactDOM = ReactDOM;
        } catch (error) {
            console.error("BetterMessageUtilities: Error loading Discord modules:", error);
            UI.showToast("BetterMessageUtilities: Some modules failed to load.", { type: "warning" });
        }
    }
    loadSettings() {
        const savedSettings = Data.load("BetterMessageUtilities", "settings");
        if (!savedSettings) {
            this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
            return;
        }
        this.settings = savedSettings;
        this.settings.general = this.settings.general || this.defaultSettings.general;
        this.settings.general.autoUpdate = this.settings.general.autoUpdate ?? this.defaultSettings.general.autoUpdate;
        this.settings.toasts = this.settings.toasts || this.defaultSettings.toasts;
        this.settings.bindings = this.settings.bindings || this.defaultSettings.bindings;
        for (const key in this.defaultSettings.bindings) {
            const defaultBinding = this.defaultSettings.bindings[key];
            const currentBinding = this.settings.bindings[key];
            if (!currentBinding) {
                this.settings.bindings[key] = defaultBinding;
                continue;
            }
            this.settings.bindings[key] = {
                enabled: currentBinding.enabled ?? true,
                keycombo: currentBinding.keycombo ?? [],
                click: currentBinding.click ?? 0,
                name: currentBinding.name ?? defaultBinding.name,
                ...currentBinding 
            };
        }
    }
    saveSettings() { Data.save("BetterMessageUtilities", "settings", this.settings);  }
    addEventListeners() {
        this.keyDownHandler = (e) => { this.pressedKeys.add(e.keyCode); if (e.keyCode === this.KeyCodes.ESCAPE && this.settings.general.clearOnEscape) { const chatInput = document.querySelector('[class*="textArea-"]'); if (chatInput && document.activeElement === chatInput) { chatInput.value = ""; chatInput.dispatchEvent(new Event('input', { bubbles: true })); } } };
        this.keyUpHandler = (e) => this.pressedKeys.delete(e.keyCode);
        this.clickHandler = (e) => this.handleMessageInteraction(e, "click");
        this.dblClickHandler = (e) => this.handleMessageInteraction(e, "dblclick");
        document.addEventListener("keydown", this.keyDownHandler); document.addEventListener("keyup", this.keyUpHandler); document.addEventListener("click", this.clickHandler, true); document.addEventListener("dblclick", this.dblClickHandler, true);
    }
    removeEventListeners() {
        if (this.keyDownHandler) document.removeEventListener("keydown", this.keyDownHandler);
        if (this.keyUpHandler) document.removeEventListener("keyup", this.keyUpHandler);
        if (this.clickHandler) document.removeEventListener("click", this.clickHandler, true);
        if (this.dblClickHandler) document.removeEventListener("dblclick", this.dblClickHandler, true);
    }
    handleMessageInteraction(event, type) {
        const messageDiv = event.target.closest('li > [class^=message]');
        if (!messageDiv) return;
        if (event.target.closest('button') || event.target.closest('[role="button"]') || event.target.closest('a') || event.target.closest('[class*="toolbar-"]') || event.target.closest('[class*="reactions-"]') || event.target.closest('[class*="buttonContainer-"]')) return;
        const message = this.getMessageFromReact(messageDiv);
        if (!message) return;
        const clickType = type === "dblclick" ? this.ClickTypes.DBLCLICK : this.ClickTypes.CLICK;
        for (const [action, binding] of Object.entries(this.settings.bindings)) {
            if (!binding.enabled || binding.click !== clickType) continue;
            let allKeysPressed = true;
            for (const key of binding.keycombo) { if (!this.pressedKeys.has(key)) { allKeysPressed = false; break; } }
            if (!allKeysPressed && binding.keycombo.length > 0) continue;
            event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
            this.executeAction(action, message); return;
        }
    }
    getMessageFromReact(messageDiv) {
        try {
            let instance = ReactUtils.getInternalInstance(messageDiv);
            if (!instance) {
                const key = Object.keys(messageDiv).find(k => k.startsWith("__reactInternalInstance") || k.startsWith("__reactFiber"));
                if (key) instance = messageDiv[key];
                else return null;
            }
            let message = null;
            if (Utils?.findInTree) {
                const findInTree = Utils.findInTree;
                const baseMessageContainer = findInTree(instance, m => m?.baseMessage, { walkable: this.walkable });
                const messageContainer = findInTree(instance, m => m?.message, { walkable: this.walkable });
                message = baseMessageContainer?.baseMessage || messageContainer?.message;
            } else {
                message = this.findMessageInTree(instance);
            }
            return message;
        } catch (error) {
            console.error("BetterMessageUtilities: Error getting message from React:", error);
            return null;
        }
    }
    findMessageInTree(node, depth = 0, maxDepth = 15) {
        if (!node || depth > maxDepth) return null;
        if (node.message?.id) return node.message;
        if (node.baseMessage?.id) return node.baseMessage;
        if (node.memoizedProps) {
            if (node.memoizedProps.message?.id) return node.memoizedProps.message;
            if (node.memoizedProps.baseMessage?.id) return node.memoizedProps.baseMessage;
        }
        if (node.child) {
            const result = this.findMessageInTree(node.child, depth + 1, maxDepth);
            if (result) return result;
        }
        if (node.sibling) {
            const result = this.findMessageInTree(node.sibling, depth + 1, maxDepth);
            if (result) return result;
        }
        return null;
    }
    executeAction(action, message) {
        if (!message) return;
        switch (action) {
            case "Delete_Message": this.deleteMessage(message); break;
            case "Edit_Message": this.editMessage(message); break;
            case "Pin_Unpin_Message": this.togglePinMessage(message); break;
            case "Reply_to_Message": this.replyToMessage(message); break;
            case "React_to_Message": this.openReactMenu(message); break;
            case "Copy_Raw": this.copyRawMessage(message); break;
            case "Copy_Link": this.copyMessageLink(message); break;
        }
    }
    deleteMessage(message) {
        if (!this.MessageActions || !message) { UI.showToast("Unable to delete message", { type: "error" }); return; }
        const currentUser = this.UserStore?.getCurrentUser();
        if (!currentUser) { UI.showToast("Unable to get current user", { type: "error" }); return; }
        const isOwnMessage = message.author.id === currentUser.id, channel = this.ChannelStore?.getChannel(message.channel_id), hasPermission = this.PermissionUtils && channel && this.PermissionUtils.can(this.DiscordPermissions.MANAGE_MESSAGES, channel);
        if (isOwnMessage || hasPermission) { this.MessageActions.deleteMessage(message.channel_id, message.id); if (this.settings.toasts.Delete_Message) UI.showToast("Message deleted!", { type: "success" }); } else { UI.showToast("No permission to delete this message", { type: "error" }); }
    }
    editMessage(message) {
        const currentUser = this.UserStore?.getCurrentUser();
        if (!currentUser || message.author.id !== currentUser.id) {
            if (message.author.id !== currentUser?.id) UI.showToast("You can only edit your own messages", {
                type: "error"
            });
            return;
        }
        if (this.startEditMessage?.startEditMessage) {
            this.startEditMessage.startEditMessage(message.channel_id, message.id, message.content);
        } else if (this.MessageActions?.startEditMessage) {
            this.MessageActions.startEditMessage(message.channel_id, message.id, message.content);
        } else if (this.MessageStore?.startEditMessage) {
            this.MessageStore.startEditMessage(message.channel_id, message.id, message.content);
        } else {
            UI.showToast("Unable to edit message", {
                type: "error"
            });
            return;
        }
        if (this.settings.toasts.Edit_Message) UI.showToast("Editing message...", {
            type: "info"
        });
    }
    togglePinMessage(message) {
        if (!this.PinActions || !message) {
            BdApi.UI.showToast("Unable to pin/unpin message", { type: "error" });
            return;
        }
        const channel = this.ChannelStore?.getChannel(message.channel_id);
        if (!channel) {
            BdApi.UI.showToast("Unable to get channel", { type: "error" });
            return;
        }
        try {
            if (message.pinned) {
                this.PinActions.unpinMessage(channel, message.id);
                if (this.settings.toasts.Pin_Unpin_Message) {
                    BdApi.UI.showToast("Message unpinned!", { type: "warning" });
                }
            } else {
                this.PinActions.pinMessage(channel, message.id);
                if (this.settings.toasts.Pin_Unpin_Message) {
                    BdApi.UI.showToast("Message pinned!", { type: "success" });
                }
            }
        } catch (error) {
            console.error("Pin/unpin failed:", error);
            BdApi.UI.showToast("No permission to pin/unpin message", { type: "error" });
        }
    }
    replyToMessage(message) {
        if (!message) return;
        const channel = this.ChannelStore?.getChannel(message.channel_id);
        if (this.Dispatcher && channel) { this.Dispatcher.dispatch({ type: "CREATE_PENDING_REPLY", channel: channel, message: message, shouldMention: true }); if (this.settings.toasts.Reply_to_Message) UI.showToast("Replying to message...", { type: "info" }); } else { UI.showToast("Unable to reply", { type: "error" }); }
    }
    openReactMenu(message) {
        const messageEl = document.querySelector(`[id*="${message.id}"]`);
        if (messageEl) { const reactButton = messageEl.querySelector('[aria-label*="reaction"]') || messageEl.querySelector('[aria-label*="React"]'); if (reactButton) reactButton.click(); }
    }
    copyRawMessage(message) {
        if (message.content) { if (this.ElectronModule?.copy) { this.ElectronModule.copy(message.content); } else { navigator.clipboard.writeText(message.content).catch(() => UI.showToast("Failed to copy", { type: "error" })); } if (this.settings.toasts.Copy_Raw) UI.showToast("Message copied!", { type: "success" }); } else { UI.showToast("No text to copy", { type: "warning" }); }
    }
    copyMessageLink(message) {
        const channel = this.ChannelStore?.getChannel(message.channel_id);
        if (!channel) { UI.showToast("Unable to get channel", { type: "error" }); return; }
        const guildId = channel.guild_id || "@me", link = `https://discord.com/channels/${guildId}/${message.channel_id}/${message.id}`;
        if (this.ElectronModule?.copy) { this.ElectronModule.copy(link); } else { navigator.clipboard.writeText(link).catch(() => UI.showToast("Failed to copy", { type: "error" })); }
        if (this.settings.toasts.Copy_Link) UI.showToast("Link copied!", { type: "success" });
    }
    getKeyName(keyCode) {
        const keyNames = { 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 20: "CapsLock", 27: "Escape", 32: "Space", 46: "Delete" };
        if (keyNames[keyCode]) return keyNames[keyCode];
        if (keyCode >= 65 && keyCode <= 90) return String.fromCharCode(keyCode);
        if (keyCode >= 48 && keyCode <= 57) return String.fromCharCode(keyCode);
        return `Key${keyCode}`;
    }
    getKeyComboString(keycombo) { return (!keycombo || keycombo.length === 0) ? "None" : keycombo.map(key => this.getKeyName(key)).join(" + "); }
    checkForKeyConflict(keycombo, currentAction) {
        for (const [action, binding] of Object.entries(this.settings.bindings)) {
            if (action === currentAction || !binding.enabled) continue;
            if (binding.keycombo.length === keycombo.length) {
                const matches = binding.keycombo.every(key => keycombo.includes(key)) &&
                               keycombo.every(key => binding.keycombo.includes(key));
                if (matches) {
                    return binding.name;
                }
            }
        }
        return null;
    }
    getSettingsPanel() {
        try {
            const settingsConfig = {
                settings: [
                    {
                        type: "category",
                        id: "general",
                        name: "General Settings",
                        collapsible: true,
                        shown: true,
                        settings: [
                            {
                                type: "switch",
                                id: "clearOnEscape",
                                name: "Clear Input on Escape",
                                note: "Clear the message input box when pressing Escape",
                                value: this.settings.general.clearOnEscape
                            },
                            {
                                type: "switch",
                                id: "autoUpdate",
                                name: "Auto Update",
                                note: "Automatically check for updates every 24 hours",
                                value: this.settings.general.autoUpdate
                            }
                        ]
                    },
                    {
                        type: "category",
                        id: "toasts",
                        name: "Toast Notifications",
                        collapsible: true,
                        shown: false,
                        settings: Object.entries(this.settings.toasts).map(([action, enabled]) => ({
                            type: "switch",
                            id: action,
                            name: this.settings.bindings[action]?.name || action,
                            note: `Show notification when performing this action`,
                            value: enabled
                        }))
                    }
                ],
                onChange: (category, id, value) => {
                    if (category === "general") {
                        this.settings.general[id] = value;
                        if (id === "autoUpdate") {
                            if (value) {
                                this.updateManager.start(true);
                            } else {
                                this.updateManager.stop();
                            }
                        }
                    } else if (category === "toasts") {
                        this.settings.toasts[id] = value;
                    }
                    this.saveSettings();
                }
            };
            Object.entries(this.settings.bindings).forEach(([action, binding]) => {
                settingsConfig.settings.push({
                    type: "category",
                    id: action,
                    name: binding.name,
                    collapsible: true,
                    shown: false,
                    settings: [
                        {
                            type: "switch",
                            id: `${action}_enabled`,
                            name: "Enabled",
                            note: "Enable this keybinding",
                            value: binding.enabled
                        },
                        {
                            type: "keybind",
                            id: `${action}_keys`,
                            name: "Key Combination",
                            note: "Click and press your key combination",
                            value: binding.keycombo.map(k => this.getKeyName(k)),
                            disabled: !binding.enabled,
                            clearable: true
                        },
                        {
                            type: "radio",
                            id: `${action}_click`,
                            name: "Click Type",
                            note: "When to trigger this action",
                            value: binding.click,
                            disabled: !binding.enabled,
                            options: [
                                { name: "Single Click", value: 0 },
                                { name: "Double Click", value: 1 }
                            ]
                        }
                    ]
                });
            });
            const originalOnChange = settingsConfig.onChange;
            settingsConfig.onChange = (category, id, value) => {
                if (category === "general" || category === "toasts") {
                    originalOnChange(category, id, value);
                } 
                else if (this.settings.bindings[category]) {
                    const action = category;
                    if (id.endsWith("_enabled")) {
                        this.settings.bindings[action].enabled = value;
                    } else if (id.endsWith("_keys")) {
                        const keyCodes = (value || []).map(keyName => {
                            const keyCodeMap = {
                                "Backspace": 8, "Tab": 9, "Enter": 13, "Shift": 16,
                                "Ctrl": 17, "Control": 17, "Alt": 18, "CapsLock": 20, 
                                "Escape": 27, "Space": 32, "Delete": 46
                            };
                            if (keyCodeMap[keyName]) return keyCodeMap[keyName];
                            if (keyName.length === 1) {
                                const char = keyName.toUpperCase().charCodeAt(0);
                                if (char >= 65 && char <= 90) return char;
                                if (char >= 48 && char <= 57) return char;
                            }
                            if (keyName.startsWith("Key")) {
                                return parseInt(keyName.substring(3));
                            }
                            return 0;
                        }).filter(k => k > 0);
                        this.settings.bindings[action].keycombo = keyCodes;
                    } else if (id.endsWith("_click")) {
                        this.settings.bindings[action].click = value;
                    }
                    this.saveSettings();
                }
            };
            return BdApi.UI.buildSettingsPanel(settingsConfig);
        } catch (error) {
            console.error("BetterMessageUtilities: Error in getSettingsPanel:", error);
            const errorPanel = document.createElement("div");
            errorPanel.style.padding = "20px";
            errorPanel.style.color = "var(--text-danger)";
            errorPanel.textContent = "Failed to load settings panel: " + error.message;
            return errorPanel;
        }
    }
};
/*@end@*/
