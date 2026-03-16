/**
 * @name QuickMessages-Reborn
 * @version 1.0.1
 * @description Save messages to quickly send them later. Right-click the chat bar to save or send messages. Hold Shift while clicking a message to delete it.
 * @author Pharaoh2k
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/QuickMessages-Reborn/QuickMessages-Reborn.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/QuickMessages-Reborn/QuickMessages-Reborn.plugin.js
 */
/* Inspired by QWERTxD "QuickMessages" */
/*
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * **
 * Contributions are welcome via GitHub pull requests. 
 * Please ensure submissions align with the project's guidelines and coding standards.
*/
'use strict';
const { ContextMenu, Data, UI, Webpack, React, Hooks, Components, Net, Logger, Plugins, Utils } = new BdApi("QuickMessages-Reborn");
const { Button, TextInput } = Components;
const truncate = (str, max) => str.length > max ? str.substring(0, max) + "..." : str;
const Modules = Webpack.getBulkKeyed({
    ComponentDispatch: {
        searchExports: true,
        filter: Webpack.Filters.byKeys("dispatchToLastSubscribed", "emitter")
    },
    MessageParser: {
        searchExports: true,
        filter: Webpack.Filters.byKeys("parse", "parseTopic")
    }
});
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
        const last = Data.load("version");
        Logger.info(`showChangelog: last=${last}, current=${this.version}`);
        if (last === this.version) { Logger.info("Skipping: versions match"); return; }
        Data.save("version", this.version);
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
        const remoteName = /@name\s+([^\n\r]+)/.exec(text)?.[1]?.trim();
        if (!remoteName) return { ok: false, reason: "Missing @name" };
        if (remoteName !== this.name) return { ok: false, reason: `Unexpected @name (${remoteName})` };
        const remoteVersion = /@version\s+([\d.]+)/.exec(text)?.[1];
        if (!remoteVersion) return { ok: false, reason: "Missing @version" };
        if (!text.includes("module.exports")) return { ok: false, reason: "Missing module.exports" };
        if (!text.includes("@updateUrl")) return { ok: false, reason: "Missing @updateUrl header" };
        return { ok: true, version: remoteVersion };
    }
}
//#endregion Updater
class QuickMessagesReborn {
    constructor(meta) {
        this.pluginName = meta?.name ?? "QuickMessages-Reborn";
        this.updateManager = new UpdateManager(
            this.pluginName,
            meta?.version ?? "1.0.0",
            "Pharaoh2k/BetterDiscordStuff"
        );
        const loadedMessages = Data.load("messages");
        const loadedCategories = Data.load("categories");
        this.messages = Array.isArray(loadedMessages) ? [...loadedMessages] : [];
        this.categories = Array.isArray(loadedCategories)
            ? loadedCategories.map(c => ({
                name: c.name,
                items: Array.isArray(c.items) ? [...c.items] : []
            }))
            : [];
    }
    start() {
        this.updateManager?.start(true);
        this.patchContextMenu();
    }
    stop() {
        this.updateManager?.stop();
        this.unpatchContextMenu?.();
    }
    saveState() {
        Data.save("messages", this.messages);
        Data.save("categories", this.categories);
    }
    addMessage(text, categoryName = null) {
        text = (text ?? "").trim();
        if (!text) return UI.showToast("Cannot save empty message", { type: "error" });
        if (categoryName) {
            const cat = this.categories.find(c => c.name === categoryName);
            if (!cat) return UI.showToast("Category not found", { type: "error" });
            if (cat.items.includes(text)) {
                return UI.showToast("Message already in category", { type: "warning" });
            }
            cat.items.push(text);
        } else {
            if (this.messages.includes(text)) return UI.showToast("Message already saved", { type: "warning" });
            this.messages.push(text);
        }
        this.saveState();
        UI.showToast("Message Saved", { type: "success" });
    }
    removeMessage(text, categoryName = null) {
        const prevMessages = [...this.messages];
        const prevCategories = structuredClone(this.categories);
        if (categoryName) {
            const cat = this.categories.find(c => c.name === categoryName);
            if (cat) {
                cat.items = cat.items.filter(m => m !== text);
            }
        } else {
            this.messages = this.messages.filter(m => m !== text);
        }
        this.saveState();
        const displayText = truncate(text, 30);
        UI.showNotification({
            title: "Message Deleted",
            content: React.createElement("span", {}, ['"', this.parseLabel(displayText), '" removed.']),
            type: "info",
            timeout: 5000,
            actions: [{
                label: "Undo",
                onClick: () => {
                    this.messages = prevMessages;
                    this.categories = prevCategories;
                    this.saveState();
                    UI.showToast("Restored", { type: "success" });
                }
            }]
        });
    }
    addCategory(name) {
        if (this.categories.some(c => c.name === name)) return UI.showToast("Category exists", { type: "error" });
        this.categories.push({ name, items: [] });
        this.saveState();
        UI.showToast(`Category "${name}" created`, { type: "success" });
    }
    removeCategory(name) {
        const prevCategories = structuredClone(this.categories);
        this.categories = this.categories.filter(c => c.name !== name);
        this.saveState();
        UI.showNotification({
            title: "Category Deleted",
            content: `Category "${name}" and all its messages were removed.`,
            type: "warning",
            timeout: 5000,
            actions: [{
                label: "Undo",
                onClick: () => {
                    this.categories = prevCategories;
                    this.saveState();
                    UI.showToast("Restored", { type: "success" });
                }
            }]
        });
    }
    handleMessageAction(e, msg, categoryName = null) {
        if (e.shiftKey) {
            this.removeMessage(msg, categoryName);
        } else {
            this.insertText(msg);
        }
    }
    confirmDeleteCategory(catName) {
        UI.showConfirmationModal(
            "Delete Category",
            `Are you sure you want to delete "${catName}" and all its messages?`,
            { danger: true, confirmText: "Delete", onConfirm: () => this.removeCategory(catName) }
        );
    }
    parseLabel(text) {
        if (!Modules.MessageParser?.parseTopic) return text;
        return Modules.MessageParser.parseTopic(text);
    }
    buildMessageItem(msg, categoryName = null) {
        const labelText = truncate(msg, 50);
        const item = ContextMenu.buildItem({
            label: labelText,
            action: (e) => this.handleMessageAction(e, msg, categoryName),
            subtext: "Shift+Click to Delete"
        });
        if (item?.props) {
            item.props.label = this.parseLabel(labelText);
        }
        return item;
    }
    buildCategoryItems(cat) {
        const items = cat.items.map(msg => this.buildMessageItem(msg, cat.name));
        if (items.length === 0) {
            items.push(ContextMenu.buildItem({ label: "(Empty)", disabled: true }));
        }
        return items;
    }
    insertText(text) {
        const CD = Modules.ComponentDispatch;
        const payload = { content: text, plainText: text };
        try {
            if (CD?.dispatchToLastSubscribed) {
                CD.dispatchToLastSubscribed("INSERT_TEXT", payload);
                return;
            }
        } catch (err) {
            Logger.error("Dispatch failed", err);
        }
        const editor = document.querySelector('[role="textbox"][contenteditable="true"], [data-slate-editor="true"]');
        if (editor) {
            editor.focus();
            const dataTransfer = new DataTransfer();
            dataTransfer.setData("text/plain", text);
            editor.dispatchEvent(new InputEvent("beforeinput", {
                inputType: "insertText",
                data: text,
                dataTransfer,
                bubbles: true,
                cancelable: true
            }));
        } else {
            UI.showToast("Could not insert text: Editor not found", { type: "error" });
        }
    }
    openCreateCategoryModal(pendingText = null) {
        let value = "";
        const Content = () => React.createElement("div", {}, [
            React.createElement("span", { style: { color: "var(--text-muted)", marginBottom: "8px", display: "block" } }, "Enter a name for your new category:"),
            React.createElement(TextInput, {
                placeholder: "Category Name",
                autoFocus: true,
                onChange: (val) => value = val
            })
        ]);
        UI.showConfirmationModal(
            "Create Category",
            React.createElement(Content),
            {
                confirmText: "Create",
                onConfirm: () => {
                    const trimmed = value.trim();
                    if (!trimmed) return UI.showToast("Category name cannot be empty", { type: "error" });
                    this.addCategory(trimmed);
                    if (pendingText) this.addMessage(pendingText, trimmed);
                }
            }
        );
    }
    patchContextMenu() {
        this.unpatchContextMenu = ContextMenu.patch("textarea-context", (menu, props) => {
            const selectedText = globalThis.getSelection().toString();
            const targetText = props.target?.textContent || "";
            const textToSave = (selectedText.length > 0 ? selectedText : targetText).trim();
            const hasContent = textToSave.length > 0;
            const saveChildren = [
                ContextMenu.buildItem({
                    label: "Uncategorized",
                    action: () => this.addMessage(textToSave)
                }),
                ContextMenu.buildItem({ type: "separator" })
            ];
            this.categories.forEach(cat => {
                saveChildren.push(ContextMenu.buildItem({
                    label: cat.name,
                    action: () => this.addMessage(textToSave, cat.name)
                }));
            });
            saveChildren.push(
                ContextMenu.buildItem({ type: "separator" }),
                ContextMenu.buildItem({
                    label: "Create Category...",
                    action: () => this.openCreateCategoryModal(textToSave)
                })
            );
            const listChildren = [];
            if (this.messages.length > 0) {
                this.messages.forEach(msg => listChildren.push(this.buildMessageItem(msg)));
            } else if (this.categories.length === 0) {
                listChildren.push(ContextMenu.buildItem({ label: "No messages saved", disabled: true }));
            }
            if (this.categories.length > 0) {
                if (this.messages.length > 0) listChildren.push(ContextMenu.buildItem({ type: "separator" }));
                this.categories.forEach(cat => {
                    listChildren.push(ContextMenu.buildItem({
                        label: cat.name,
                        subtext: "Shift+Click to Delete Category",
                        children: this.buildCategoryItems(cat),
                        action: (e) => e.shiftKey && this.confirmDeleteCategory(cat.name)
                    }));
                });
            }
            const mainItems = [
                ContextMenu.buildItem({ type: "separator" }),
                ContextMenu.buildItem({
                    label: "Save as Quick Message",
                    disabled: !hasContent,
                    children: saveChildren
                }),
                ContextMenu.buildItem({
                    label: "Quick Messages",
                    children: listChildren
                }),
            ];
            const children = menu?.props?.children;
            if (Array.isArray(children)) {
                children.push(...mainItems);
            } else {
                menu.props.children = [children, ...mainItems].filter(Boolean);
            }
        });
    }
    getSettingsPanel() {
        const SettingsPanel = () => {
            const messages = Hooks.useData("messages") || [];
            const categories = Hooks.useData("categories") || [];
            const totalItems = messages.length + categories.reduce((acc, cat) => acc + cat.items.length, 0);
            return UI.buildSettingsPanel({
                settings: [
                    {
                        type: "custom",
                        id: "deleteAll",
                        name: `Saved Items (${totalItems})`,
                        note: "Use Shift+Click on messages or categories in the chat context menu to delete individual items.",
                        children: React.createElement(Button, {
                            color: Button.Colors.RED,
                            look: Button.Looks.FILLED,
                            size: Button.Sizes.MEDIUM,
                            disabled: totalItems === 0,
                            onClick: () => {
                                UI.showConfirmationModal(
                                    "Delete All Data",
                                    "Are you sure you want to delete all saved messages and categories? This cannot be undone.",
                                    {
                                        danger: true,
                                        confirmText: "Delete All",
                                        onConfirm: () => {
                                            this.messages = [];
                                            this.categories = [];
                                            this.saveState();
                                            UI.showToast("All data cleared", { type: "success" });
                                        }
                                    }
                                );
                            }
                        }, "Delete All Messages")
                    }
                ],
                onChange: () => { }
            });
        };
        return React.createElement(SettingsPanel);
    }
}
module.exports = QuickMessagesReborn;
