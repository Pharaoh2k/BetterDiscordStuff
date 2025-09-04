/**
 * @name BetterMessageUtilities
 * @version 1.0.0
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
            plugin: `https://raw.githubusercontent.com/${user}/${repo}/refs/heads/main/Plugins/${pluginName}/${pluginName}/${pluginName}.plugin.js`,
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
        this.settings = {}; this.pressedKeys = new Set(); this.walkable = ["child", "memoizedProps", "sibling"];
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
                const { Webpack, Webpack: { Filters } } = BdApi;
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
                this.FormSwitch = Webpack.getModule(Filters.byStrings('labelRow', 'checked'), { searchExports: true });
                this.RadioGroup = Webpack.getModule(m => Filters.byKeys('NOT_SET', 'NONE')(m?.Sizes), { searchExports: true });
                this.FormItem = Webpack.getModule(m => Filters.byStrings('titleId', 'errorId', 'setIsFocused')(m?.render), 
                                                 { searchExports: true });
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
        const savedSettings = Data.load(this.getName(), "settings");
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
    saveSettings() { Data.save(this.getName(), "settings", this.settings);  }
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
        return () => {
            const React = this.React,
                [settings, setSettings] = React.useState(this.settings),
                [recordingKey, setRecordingKey] = React.useState(null);
            const updateSetting = (path, value) => {
                const keys = path.split('.');
                let obj = this.settings;
                for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
                obj[keys[keys.length - 1]] = value;
                this.saveSettings();
                setSettings({
                    ...this.settings
                });
            };
            const processKeys = (currentKeys) => {
                const keys = [];
                if (currentKeys.has(this.KeyCodes.CTRL)) keys.push(this.KeyCodes.CTRL);
                if (currentKeys.has(this.KeyCodes.ALT)) keys.push(this.KeyCodes.ALT);
                if (currentKeys.has(this.KeyCodes.SHIFT)) keys.push(this.KeyCodes.SHIFT);
                currentKeys.forEach(key => {
                    if (![this.KeyCodes.CTRL, this.KeyCodes.ALT, this.KeyCodes.SHIFT].includes(key)) {
                        keys.push(key);
                    }
                });
                return keys;
            };
            const saveKeyCombo = (action, keys, input) => {
                const conflict = this.checkForKeyConflict(keys, action);
                if (conflict) {
                    input.value = "Conflict with " + conflict;
                    setTimeout(() => {
                        input.value = this.getKeyComboString(this.settings.bindings[action].keycombo);
                    }, 2000);
                    return false;
                }
                this.settings.bindings[action].keycombo = keys;
                input.value = this.getKeyComboString(keys);
                this.saveSettings();
                setSettings({ ...this.settings });
                return true;
            };
            const handleKeyRecord = (action, e) => {
                const input = e.target;
                input.value = "Press keys... (ESC to clear, Enter to confirm)";
                setRecordingKey(action);
                let currentKeys = new Set();
                let keyDownHandler, keyUpHandler;
                const cleanup = () => {
                    document.removeEventListener("keydown", keyDownHandler);
                    document.removeEventListener("keyup", keyUpHandler);
                    setRecordingKey(null);
                };
                keyDownHandler = (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (event.keyCode === this.KeyCodes.ESCAPE) {
                        this.settings.bindings[action].keycombo = [];
                        input.value = "None";
                        cleanup();
                        return;
                    }
                    if (event.keyCode === this.KeyCodes.ENTER) {
                        if (currentKeys.size === 0) {
                            cleanup();
                            return;
                        }
                        const keys = processKeys(currentKeys);
                        saveKeyCombo(action, keys, input);
                        cleanup();
                        return;
                    }
                    currentKeys.add(event.keyCode);
                    const keys = processKeys(currentKeys);
                    input.value = this.getKeyComboString(keys) + " (Press Enter to confirm)";
                };
                keyUpHandler = (event) => {
                    currentKeys.delete(event.keyCode);
                    if (currentKeys.size === 0) {
                        input.value = "Press keys... (ESC to clear, Enter to confirm)";
                    }
                };
                document.addEventListener("keydown", keyDownHandler);
                document.addEventListener("keyup", keyUpHandler);
            };
            const Divider = () => React.createElement("div", {
                style: {
                    height: 1,
                    margin: "20px 0",
                    backgroundColor: "var(--background-accent)"
                }
            });
            const BindingDivider = () => React.createElement("div", {
                style: {
                    height: 1,
                    margin: "15px 0",
                    backgroundColor: "var(--background-accent)",
                    opacity: 0.5
                }
            });
            const elements = [];
            elements.push(React.createElement("div", {
                style: {
                    marginBottom: 20,
                    padding: 12,
                    backgroundColor: "var(--background-secondary-alt)",
                    borderRadius: 8,
                    color: "var(--text-muted)"
                }
            }, React.createElement("div", null, React.createElement("strong", null, "How to use:"), React.createElement("br"), "1. Configure your keybindings below", React.createElement("br"), "2. Hold the keys and click/double-click on a message", React.createElement("br"), "3. The configured action will be performed", React.createElement("br"), React.createElement("br"), React.createElement("strong", null, "Setting keybindings:"), React.createElement("br"), "• Press and hold your key combination", React.createElement("br"), "• Press Enter to confirm", React.createElement("br"), "• Press ESC to clear")));
            elements.push(React.createElement(Divider));
            elements.push(React.createElement("div", {
                style: {
                    marginBottom: 20,
                    padding: 15,
                    backgroundColor: "var(--background-secondary)",
                    borderRadius: 8
                }
            }, React.createElement("h3", {
                className: "bd-settings-title bd-settings-group-title",
                style: {
                    marginBottom: 15,
                    color: "var(--header-primary)",
                    fontSize: 16,
                    fontWeight: 600,
                    borderBottom: "1px solid var(--background-accent)",
                    paddingBottom: 8
                }
            }, "General Settings"), React.createElement(this.FormSwitch, {
                value: settings.general.clearOnEscape,
                note: "Clear the message input box when pressing Escape",
                onChange: (v) => updateSetting('general.clearOnEscape', v)
            }, "Clear Input on Escape"), React.createElement(this.FormSwitch, {
                value: settings.general.autoUpdate,
                note: "Automatically check for updates every 24 hours",
                onChange: (v) => {
                    updateSetting('general.autoUpdate', v);
                    if (v) {
                        this.updateManager.start(true);
                    } else {
                        this.updateManager.stop();
                    }
                }
            }, "Auto Update")));
            elements.push(React.createElement(Divider));
            elements.push(React.createElement("div", {
                style: {
                    marginBottom: 20,
                    padding: 15,
                    backgroundColor: "var(--background-secondary)",
                    borderRadius: 8
                }
            }, React.createElement("h3", {
                className: "bd-settings-title bd-settings-group-title",
                style: {
                    marginBottom: 15,
                    color: "var(--header-primary)",
                    fontSize: 16,
                    fontWeight: 600,
                    borderBottom: "1px solid var(--background-accent)",
                    paddingBottom: 8
                }
            }, "Toast Notifications"), ...Object.entries(settings.toasts).map(([action, enabled]) => React.createElement(this.FormSwitch, {
                value: enabled,
                note: `Show notification when performing ${settings.bindings[action]?.name?.toLowerCase()}`,
                onChange: (v) => updateSetting(`toasts.${action}`, v)
            }, settings.bindings[action]?.name || action))));
            elements.push(React.createElement("div", {
                style: {
                    marginBottom: 20,
                    padding: 15,
                    backgroundColor: "var(--background-secondary)",
                    borderRadius: 8
                }
            }, React.createElement("h3", {
                className: "bd-settings-title bd-settings-group-title",
                style: {
                    marginBottom: 15,
                    color: "var(--header-primary)",
                    fontSize: 16,
                    fontWeight: 600,
                    borderBottom: "1px solid var(--background-accent)",
                    paddingBottom: 8
                }
            }, "Keybindings"), ...Object.entries(settings.bindings).flatMap(([action, binding], index, array) => {
                const bindingElement = React.createElement("div", {
                    key: action,
                    style: {
                        padding: 12,
                        backgroundColor: "var(--background-primary)",
                        borderRadius: 6
                    }
                }, React.createElement("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 10
                    }
                }, React.createElement("span", {
                    style: {
                        flex: 1,
                        fontWeight: 600,
                        color: "var(--header-secondary)"
                    }
                }, binding.name), React.createElement(this.FormSwitch, {
                    value: binding.enabled,
                    hideBorder: true,
                    onChange: (v) => updateSetting(`bindings.${action}.enabled`, v)
                })), React.createElement("div", {
                    style: {
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        opacity: binding.enabled ? 1 : 0.5
                    }
                }, React.createElement("input", {
                    type: "text",
                    readOnly: true,
                    value: recordingKey === action ? "Press keys... (ESC to clear, Enter to confirm)" : this.getKeyComboString(binding.keycombo),
                    placeholder: "Click to set keys...",
                    onClick: binding.enabled ? (e) => handleKeyRecord(action, e) : null,
                    disabled: !binding.enabled,
                    style: {
                        flex: 1,
                        padding: "6px 10px",
                        borderRadius: 4,
                        border: recordingKey === action ? "1px solid var(--status-danger)" : "1px solid var(--background-tertiary)",
                        backgroundColor: recordingKey === action ? "var(--background-modifier-active)" : "var(--input-background)",
                        color: "var(--text-default)",
                        cursor: binding.enabled ? "pointer" : "not-allowed",
                        minWidth: 150
                    }
                }), this.RadioGroup && React.createElement(this.RadioGroup, {
                    value: binding.click,
                    disabled: !binding.enabled,
                    options: [{
                        name: "Single Click",
                        value: 0
                    }, {
                        name: "Double Click",
                        value: 1
                    }],
                    onChange: (o) => updateSetting(`bindings.${action}.click`, o.value)
                })));
                return index < array.length - 1 ? [bindingElement, React.createElement(BindingDivider)] : bindingElement;
            })));
            elements.push(React.createElement(Divider));
            elements.push(React.createElement("button", {
                onClick: () => {
                    if (confirm("Reset all settings to default?")) {
                        this.settings = JSON.parse(JSON.stringify(this.defaultSettings));
                        this.saveSettings();
                        setSettings({
                            ...this.settings
                        });
                        UI.showToast("Settings reset!", {
                            type: "success"
                        });
                    }
                },
                style: {
                    width: "100%",
                    padding: "10px 16px",
                    borderRadius: 4,
                    border: "none",
                    backgroundColor: "var(--button-danger-background)",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 600,
                    transition: "background-color 0.15s"
                },
                onMouseEnter: (e) => e.target.style.backgroundColor = "var(--button-danger-background-hover)",
                onMouseLeave: (e) => e.target.style.backgroundColor = "var(--button-danger-background)"
            }, "Reset All Settings"));
            return elements;
        };
    }
};
/*@end@*/
