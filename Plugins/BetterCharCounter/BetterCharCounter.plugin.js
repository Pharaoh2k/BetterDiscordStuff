/**
 * @name BetterCharCounter
 * @author Pharaoh2k
 * @version 1.0.0
 * @description Adds a Character Counter to most Discord inputs
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterCharCounter/BetterCharCounter.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterCharCounter/BetterCharCounter.plugin.js
 */
/* ==========================================
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * * *
 * Contributions are welcome via GitHub pull requests.
 * Please ensure submissions align with the project's guidelines and coding standards.
============================================= */
/* BdApi based, BDFDB-free feature-packed plugin. Inspired by mwittrien / Devilbro's "CharCounter" */
"use strict";
const { Webpack, Patcher, React, ReactUtils, Utils, UI, Logger, Hooks, Data, DOM, Net } = BdApi;
const { Filters } = Webpack;
class UpdateManager {
    constructor(pluginName, version, sourceUrl) {
        this.name = pluginName;
        this.version = version;
        const match = sourceUrl?.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (match) {
            const [, user, repo] = match;
            this.urls = {
                plugin: `https://raw.githubusercontent.com/${user}/${repo}/main/Plugins/${pluginName}/${pluginName}.plugin.js`,
                changelog: `https://raw.githubusercontent.com/${user}/${repo}/main/Plugins/${pluginName}/CHANGELOG.md`
            };
        } else {
            this.urls = null;
        }
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
        if (typeof this.notification === "function") this.notification();
        else this.notification?.close?.();
        this.notification = null;
    }
    async check(silent = false) {
        if (!this.urls) {
            if (!silent) UI.showToast(`[${this.name}] Update check unavailable`, { type: "warning" });
            return;
        }
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
        if (typeof this.notification === "function") this.notification();
        else this.notification?.close?.();
        let handle = null;
        const closeHandle = () => {
            if (typeof handle === "function") handle();
            else handle?.close?.();
        };
        handle = UI.showNotification?.({
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
        }) ?? UI.showNotice(`${this.name} v${version} is available`, {
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
            const validated = this._validateRemotePluginText(text);
            if (!validated.ok) {
                UI.showToast(`Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
                return;
            }
            const nextVersion = validated.version ?? version;
            const nodePath = require("path");
            const updateTarget = nodePath.join(__dirname, nodePath.basename(__filename));
            require("fs").writeFileSync(updateTarget, text);
            UI.showToast(`Updated to v${nextVersion}. Reloading...`, { type: "success" });
            setTimeout(() => {
                try {
                    BdApi.Plugins.reload(this.name);
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
        if (last === this.version) return;
        Data.save(this.name, 'version', this.version);
        if (!last || !this.urls) return;
        try {
            const res = await Net.fetch(this.urls.changelog);
            if (res.status !== 200) return;
            const md = await res.text();
            const changes = this.parseChangelog(md, last, this.version);
            if (changes.length === 0) return;
            UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes });
        } catch (e) {
            Logger.warn(this.name, "Changelog error:", e);
        }
    }
    async showFullChangelog() {
        if (!this.urls) {
            UI.showToast("Changelog unavailable", { type: "warning" });
            return;
        }
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
    isNewer(remoteVersion, localVersion = this.version) {
        return this._compareSemver(remoteVersion, localVersion) > 0;
    }
    _compareSemver(a, b) {
        const pa = String(a ?? "").split(".").map(n => Number.parseInt(n, 10));
        const pb = String(b ?? "").split(".").map(n => Number.parseInt(n, 10));
        const len = Math.max(pa.length, pb.length);
        for (let i = 0; i < len; i++) {
            const va = Number.isFinite(pa[i]) ? pa[i] : 0;
            const vb = Number.isFinite(pb[i]) ? pb[i] : 0;
            if (va > vb) return 1;
            if (va < vb) return -1;
        }
        return 0;
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
const MAX_LENGTHS = Object.freeze({
    customstatus: 128,
    profilenote: 256,
    nick: 32
});
const DEFAULT_SETTINGS = Object.freeze({
    autoUpdate: true,
    showPercentage: 0
});
const CSS = `
.BetterCharCounter-added { position: relative !important; }
.BetterCharCounter-counter { display: block; position: absolute; font-size: 15px; z-index: 10; pointer-events: none; color: var(--text-muted); transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease; font-weight: 500; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); opacity: 0; transform: translateY(5px); }
.BetterCharCounter-counter.visible { opacity: 1; transform: translateY(0); }
.BetterCharCounter-chat { right: 0.15em; bottom: 0.75em; font-size: 12px; color: var(--channels-default); }
.BetterCharCounter-edit { right: 0; bottom: -1.3em; }
.BetterCharCounter-threadcreation { right: 16px; bottom: 0.3em; }
.BetterCharCounter-customstatus { right: 0 !important; top: -1.5em; }
.BetterCharCounter-profilenote { right: 0 !important; bottom: -10px !important; font-size: 12px !important; }
.BetterCharCounter-nick { right: 0 !important; bottom: -1.3em !important; font-size: 12px !important; }
.BetterCharCounter-popoutdm { bottom: -6px;font-size: 11px;position: relative !important;width: 100%;display: flex;flex-direction: row-reverse; }
`;
const ZERO_WIDTH_CHARS = /[\u200B\u200C\uFEFF]|\u200D/g;
const TRAILING_NEWLINE = /\n$/g;
const isAbortError = err => err?.name === "AbortError";
const cleanText = raw => (raw || "").replaceAll(ZERO_WIDTH_CHARS, "").replaceAll(TRAILING_NEWLINE, "");
const getColorForPercentage = percentage => {
    if (percentage >= 90) return "var(--status-danger)";
    if (percentage >= 70) return "var(--status-warning)";
    return "var(--text-muted)";
};
const getCssClassForType = type => {
    if (type === "edit") return "BetterCharCounter-edit";
    if (type === "thread" || type === "threadcreation") return "BetterCharCounter-threadcreation";
    return "BetterCharCounter-chat";
};
const findExportKey = mod => {
    if (!mod) return null;
    for (const key of Object.keys(mod)) {
        const exp = mod[key];
        if (typeof exp === 'function' || exp?.$$typeof === Symbol.for('react.memo') || exp?.$$typeof === Symbol.for('react.forward_ref')) {
            return key;
        }
    }
    return null;
};
const createBottomBarMatcher = bottomBarClass => e => e?.props?.className?.includes?.(bottomBarClass);
const tryFilters = async (filterConfigs, signal) => {
    for (const { filter, options = {} } of filterConfigs) {
        try {
            const module = Webpack.getModule(filter, options);
            if (module) return module;
        } catch { /* try next */ }
    }
    try {
        const { filter, options = {} } = filterConfigs[0];
        return await Webpack.waitForModule(filter, { signal, ...options });
    } catch {
        return null;
    }
};
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        Logger.error(this.props.pluginName ?? "BetterCharCounter", "React Error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}
const BetterCharCounter = meta => {
    const Api = new BdApi(meta.name);
    let abortController = null;
    let modules = {};
    let chatFormMemo = null;
    // Instances of the class the chat box memo renders, for the chat boxes currently on screen
    const getMountedChatForms = () => {
        const instances = new Set();
        for (const editor of document.querySelectorAll("[data-slate-editor='true']")) {
            let fiber = ReactUtils.getInternalInstance(editor);
            while (fiber && fiber.elementType !== chatFormMemo) fiber = fiber.return;
            if (fiber?.child?.stateNode instanceof React.Component) instances.add(fiber.child.stateNode);
        }
        return instances;
    };
    let settings = { ...DEFAULT_SETTINGS, ...Data.load(meta.name, "settings") };
    const updateManager = new UpdateManager(meta.name, meta.version, meta.source);
    const saveSettings = () => Data.save(meta.name, "settings", settings);
    const DraftCounter = React.memo(({ channelId, draftType, maxLength, className }) => {
        const DraftStore = modules.DraftStore;
        const [, forceUpdate] = Hooks.useForceUpdate();
        const counterRef = React.useRef(null);
        const textRef = React.useRef("");
        const draft = Hooks.useStateFromStores(
            [DraftStore],
            () => DraftStore?.getDraft?.(channelId, draftType) || "",
            [channelId, draftType]
        );
        const savedSettings = Api.Hooks.useData("settings");
        const showPercentage = savedSettings?.showPercentage ?? DEFAULT_SETTINGS.showPercentage;
        React.useEffect(() => {
            // Read this chat box's own editor (the first one on the page can be the header search bar).
            // The draft is only a fallback, since Discord cuts saved drafts at 4500 characters.
            const input = counterRef.current?.closest(".BetterCharCounter-added")?.querySelector("[data-slate-editor='true']");
            if (!input) return;
            const updateFromDOM = () => {
                // Slate renders each line as its own block, so join them to count the newlines too
                const lines = input.querySelectorAll(":scope > [data-slate-node='element']");
                const text = cleanText(lines.length ? Array.from(lines, line => line.textContent).join("\n") : input.textContent);
                if (text !== textRef.current) {
                    textRef.current = text;
                    forceUpdate();
                }
            };
            const observer = new MutationObserver(updateFromDOM);
            observer.observe(input, { childList: true, characterData: true, subtree: true });
            updateFromDOM();
            return () => observer.disconnect();
        }, [channelId]);
        const text = draft.length === 0 ? "" : (textRef.current || draft);
        const length = text.length;
        const percentage = (length / maxLength) * 100;
        const color = getColorForPercentage(percentage);
        return React.createElement("div", {
            ref: counterRef,
            className: `BetterCharCounter-counter ${className}${percentage < showPercentage ? "" : " visible"}`,
            style: { color }
        }, `${length}/${maxLength}`);
    });
    const DOMCounter = React.memo(({ selector, maxLength, className, initialValue }) => {
        const [, forceUpdate] = Hooks.useForceUpdate();
        const counterRef = React.useRef(null);
        const textRef = React.useRef(cleanText(initialValue));
        const savedSettings = Api.Hooks.useData("settings");
        const showPercentage = savedSettings?.showPercentage ?? DEFAULT_SETTINGS.showPercentage;
        React.useEffect(() => {
            // Listen on the element the counter was added to, so inputs that are swapped in later (like a note
            // switching from preview to editing) are still counted
            const root = counterRef.current?.closest(".BetterCharCounter-added") ?? document;
            const update = input => {
                const value = cleanText(input.value ?? input.textContent);
                if (value !== textRef.current) {
                    textRef.current = value;
                    forceUpdate();
                }
            };
            const input = root.querySelector(selector);
            if (input) update(input);
            const onInput = e => { if (e.target.matches?.(selector)) update(e.target); };
            root.addEventListener("input", onInput);
            return () => root.removeEventListener("input", onInput);
        }, [selector]);
        const length = textRef.current.length;
        const percentage = (length / maxLength) * 100;
        const color = getColorForPercentage(percentage);
        return React.createElement("div", {
            ref: counterRef,
            className: `BetterCharCounter-counter ${className}${percentage < showPercentage ? "" : " visible"}`,
            style: { color }
        }, `${length}/${maxLength}`);
    });
    // For inputs whose text Discord already passes around as a prop
    const ValueCounter = ({ value, maxLength, className }) => {
        const savedSettings = Api.Hooks.useData("settings");
        const showPercentage = savedSettings?.showPercentage ?? DEFAULT_SETTINGS.showPercentage;
        const length = (value ?? "").length;
        const percentage = (length / maxLength) * 100;
        if (percentage < showPercentage) return null;
        return React.createElement("div", {
            className: `BetterCharCounter-counter ${className} visible`,
            style: { color: getColorForPercentage(percentage) }
        }, `${length}/${maxLength}`);
    };
    const getMaxLength = type => {
        if (MAX_LENGTHS[type]) return MAX_LENGTHS[type];
        const canUseExtended = modules.NitroUtils?.canUseIncreasedMessageLength?.(
            modules.UserStore?.getCurrentUser?.()
        );
        return canUseExtended ? 4000 : 2000;
    };
    const getDraftType = analyticsName => {
        const DraftType = modules.DraftType;
        if (!DraftType) return 0;
        const mapping = {
            "chat": DraftType.ChannelMessage,
            "normal": DraftType.ChannelMessage,
            "edit": DraftType.ChannelMessage,
            "thread": DraftType.FirstThreadMessage,
            "threadcreation": DraftType.FirstThreadMessage,
            "reply": DraftType.ChannelMessage
        };
        return mapping[analyticsName?.toLowerCase()] ?? DraftType.ChannelMessage;
    };
    const injectDraftCounter = (element, channelId, draftType, maxLength, type) => {
        if (!element?.props) return;
        const cssClass = getCssClassForType(type);
        if (!Array.isArray(element.props.children)) {
            element.props.children = [element.props.children];
        }
        element.props.className = Utils.className(element.props.className, "BetterCharCounter-added");
        const counter = React.createElement(ErrorBoundary, { key: "bcc-draft-counter", pluginName: meta.name },
            React.createElement(DraftCounter, { channelId, draftType, maxLength, className: cssClass })
        );
        element.props.children.push(counter);
    };
    const injectDOMCounter = (element, selector, maxLength, type, initialValue) => {
        if (!element?.props) return;
        const cssClass = `BetterCharCounter-${type}`;
        if (!Array.isArray(element.props.children)) {
            element.props.children = [element.props.children];
        }
        element.props.className = Utils.className(element.props.className, "BetterCharCounter-added");
        const counter = React.createElement(ErrorBoundary, { key: `bcc-dom-${type}`, pluginName: meta.name },
            React.createElement(DOMCounter, { selector, maxLength, className: cssClass, initialValue })
        );
        element.props.children.push(counter);
    };
    const loadModules = () => {
        const bulkModules = Webpack.getBulkKeyed({
            DraftType: { filter: Filters.byKeys("ChannelMessage", "ThreadSettings"), searchExports: true },
            NitroUtils: { filter: Filters.byKeys("canUseIncreasedMessageLength") },
            chatClasses: { filter: Filters.byKeys("form", "chatContent", "shaker") }
        });
        modules = {
            DraftStore: Webpack.getStore("DraftStore"),
            UserStore: Webpack.getStore("UserStore"),
            ...bulkModules
        };
        const bottomBarModule = Webpack.getModule(Filters.byKeys("channelBottomBarArea"));
        modules.bottomBarClass = bottomBarModule?.channelBottomBarArea;
        if (!modules.chatClasses) {
            modules.chatClasses = Webpack.getModule(Filters.byKeys("parentChannelName", "linkedLobby"))
                || Webpack.getModule(Filters.byKeys("forumPostSidebarTitle", "gdm"));
        }
        if (!modules.NitroUtils) {
            modules.NitroUtils = Webpack.getModule(Filters.byKeys("canUseIncreasedMessageLength", "getPremiumType"))
                || Webpack.getModule(m => m?.canUseAnimatedEmojis);
        }
    };
    const patchTextAreaModule = (mod, component, exportKey) => {
        const isMemo = component?.$$typeof === Symbol.for('react.memo');
        const isForwardRef = typeof component?.render === 'function';
        if (isMemo) {
            // Patch the memo and the class it renders in place, so unpatchAll undoes both
            let innerPatched = false;
            const patchInnerClass = innerClass => {
                if (innerPatched || !innerClass?.prototype?.render) return;
                innerPatched = true;
                Patcher.after(meta.name, innerClass.prototype, "render", (thisObj, _args, innerRet) => {
                    try {
                        const innerProps = thisObj.props;
                        if (!innerRet?.props || !innerProps?.channel || innerProps.disabled) return;
                        const bottomBarClass = modules.bottomBarClass;
                        if (!bottomBarClass) return;
                        const channelId = innerProps.channel.id;
                        const analyticsName = innerProps.type?.analyticsName || innerProps.chatInputType?.analyticsName || "chat";
                        const draftType = getDraftType(analyticsName);
                        const maxLength = getMaxLength(analyticsName);
                        const bottomBar = Utils.findInTree(innerRet,
                            createBottomBarMatcher(bottomBarClass),
                            { walkable: ["props", "children"] }
                        );
                        if (bottomBar) {
                            injectDraftCounter(bottomBar, channelId, draftType, maxLength, analyticsName);
                        }
                    } catch (e) {
                        Logger.error(meta.name, "Error in inner render patch", e);
                    }
                });
            };
            Patcher.after(meta.name, component, "type", (_, _args, ret) => patchInnerClass(ret?.type));
            // Chat boxes already on screen keep the memo's old render, so patch their class directly and redraw them
            chatFormMemo = component;
            const mounted = getMountedChatForms();
            for (const instance of mounted) patchInnerClass(instance.constructor);
            for (const instance of mounted) instance.forceUpdate();
            Logger.info(meta.name, `Patched ChannelTextAreaForm (React.memo via .${exportKey})`);
            return;
        }
        let target, patchKey;
        if (isForwardRef) {
            target = component;
            patchKey = "render";
        } else if (typeof component === 'function') {
            target = mod;
            patchKey = exportKey;
        } else {
            Logger.warn(meta.name, "Unknown ChannelTextArea structure", component);
            return;
        }
        Patcher.after(meta.name, target, patchKey, (_, args, ret) => {
            try {
                if (!ret?.props) return;
                const props = args[0];
                if (!props?.channel || props.disabled) return;
                const channelId = props.channel.id;
                const analyticsName = props.type?.analyticsName || props.chatInputType?.analyticsName || "chat";
                const draftType = getDraftType(analyticsName);
                const maxLength = getMaxLength(analyticsName);
                injectDraftCounter(ret, channelId, draftType, maxLength, analyticsName);
            } catch (e) {
                Logger.error(meta.name, "Error in ChannelTextArea patch", e);
            }
        });
        Logger.info(meta.name, "Patched ChannelTextAreaForm" + (isForwardRef ? " (forwardRef)" : ""));
    };
    const patchTextArea = async signal => {
        try {
            const mod = await tryFilters([
                { filter: Filters.bySource("contentWarningProps", "draftDidChange") },
                { filter: Filters.bySource("handleEditLastMessage", "handleRecallLastCommand") },
                { filter: Filters.bySource("textAreaFocused", "textAreaHighlighted") }
            ], signal);
            if (signal.aborted) return;
            if (mod) {
                const exportKey = findExportKey(mod);
                const component = exportKey ? mod[exportKey] : null;
                if (component && exportKey) {
                    patchTextAreaModule(mod, component, exportKey);
                } else {
                    Logger.warn(meta.name, "Found module but no valid component export");
                }
            } else {
                Logger.warn(meta.name, "Could not find ChannelTextAreaForm");
            }
        } catch (err) {
            if (isAbortError(err)) return;
            Logger.error(meta.name, "Error patching TextArea", err);
        }
    };
    const patchCustomStatus = async signal => {
        try {
            // The custom status modal is only loaded when it is first opened
            const filter = Filters.bySource("custom-status-input");
            const mod = Webpack.getModule(filter, { defaultExport: false })
                ?? await Webpack.waitForModule(filter, { signal, defaultExport: false });
            if (signal.aborted) return;
            const patchKey = findExportKey(mod);
            if (!patchKey) {
                Logger.warn(meta.name, "Could not find export key for CustomStatusModal");
                return;
            }
            Patcher.after(meta.name, mod, patchKey, (_, _args, ret) => {
                try {
                    // The modal keeps the status text in its own state and passes it to the input as value
                    const isInput = e => e?.props?.id === "custom-status-input";
                    const row = Utils.findInTree(ret,
                        e => Array.isArray(e?.props?.children) && e.props.children.some(isInput),
                        { walkable: ["props", "children", "actionBarInput"] }
                    );
                    if (!row) return;
                    const input = row.props.children.find(isInput);
                    row.props.className = Utils.className(row.props.className, "BetterCharCounter-added");
                    row.props.children.push(React.createElement(ErrorBoundary, { key: "bcc-customstatus-counter", pluginName: meta.name },
                        React.createElement(ValueCounter, { value: input.props.value, maxLength: input.props.maxLength ?? MAX_LENGTHS.customstatus, className: "BetterCharCounter-customstatus" })
                    ));
                } catch (e) {
                    Logger.error(meta.name, "Error in CustomStatus patch", e);
                }
            });
            Logger.info(meta.name, "Patched CustomStatusModal");
        } catch (err) {
            if (isAbortError(err)) return;
            Logger.error(meta.name, "Error patching CustomStatus", err);
        }
    };
    const patchNotes = async signal => {
        try {
            // Notes are drawn by Discord's shared editable text field, which is loaded with profiles
            const filter = Filters.bySource("--custom-editable-text-max-rows");
            const mod = Webpack.getModule(filter, { defaultExport: false })
                ?? await Webpack.waitForModule(filter, { signal, defaultExport: false });
            if (signal.aborted) return;
            const patchKey = findExportKey(mod);
            if (!patchKey) {
                Logger.warn(meta.name, "Could not find export key for Note component");
                return;
            }
            Patcher.after(meta.name, mod, patchKey, (_, [props], ret) => {
                try {
                    // The field is shared with other profile inputs, so only count the multiline 256 character note
                    if (!ret?.props || !props?.multiline || props.maxLength !== MAX_LENGTHS.profilenote) return;
                    injectDOMCounter(ret, "textarea", MAX_LENGTHS.profilenote, "profilenote", props.value);
                } catch (e) {
                    Logger.error(meta.name, "Error in Note patch", e);
                }
            });
            Logger.info(meta.name, "Patched Note");
        } catch (err) {
            if (isAbortError(err)) return;
            Logger.error(meta.name, "Error patching Notes", err);
        }
    };
    const patchNickname = async signal => {
        try {
            let mod = Webpack.getModule(Filters.bySource("pendingNick"));
            if (!mod && !signal.aborted) {
                mod = await Webpack.waitForModule(
                    Filters.bySource("pendingNick"),
                    { signal }
                );
            }
            if (!mod && !signal.aborted) {
                mod = Webpack.getModule(
                    Filters.byComponentType(c =>
                        c?.displayName === "NicknameSection" ||
                        c?.name === "NicknameSection"
                    ),
                    { searchExports: true }
                );
            }
            if (signal.aborted) return;
            if (!mod) {
                Logger.warn(meta.name, "Could not find NicknameSection");
                return;
            }
            const patchKey = findExportKey(mod);
            if (!patchKey) {
                Logger.warn(meta.name, "Could not find export key for NicknameSection");
                return;
            }
            Patcher.after(meta.name, mod, patchKey, (_, _args, ret) => {
                try {
                    if (!ret?.props) return;
                    const input = Utils.findInTree(ret,
                        e => e?.props?.value !== undefined || e?.props?.defaultValue !== undefined,
                        { walkable: ["props", "children"] }
                    );
                    const initialValue = input?.props?.value ?? input?.props?.defaultValue ?? "";
                    const selector = "[class*='nicknameInput'] input, [class*='nickname'] input, input[maxlength='32']";
                    injectDOMCounter(ret, selector, MAX_LENGTHS.nick, "nick", initialValue);
                } catch (e) {
                    Logger.error(meta.name, "Error in Nickname patch", e);
                }
            });
            Logger.info(meta.name, "Patched NicknameSection");
        } catch (err) {
            if (isAbortError(err)) return;
            Logger.error(meta.name, "Error patching Nickname", err);
        }
    };
    const patchPopoutFooter = async signal => {
        try {
            // The "Message @user" box in profile popouts
            const filter = Filters.bySource("SEND_DIRECT_MESSAGE", "disableAutoFocus");
            const mod = Webpack.getModule(filter, { defaultExport: false })
                ?? await Webpack.waitForModule(filter, { signal, defaultExport: false });
            if (signal.aborted) return;
            const patchKey = findExportKey(mod);
            if (!patchKey) {
                Logger.warn(meta.name, "Could not find export key for PopoutFooter");
                return;
            }
            Patcher.after(meta.name, mod, patchKey, (_, _args, ret) => {
                try {
                    // It keeps the typed text in its own state and passes it to the text area as textValue
                    if (typeof ret?.props?.textValue !== "string") return;
                    return React.createElement(React.Fragment, null, ret,
                        React.createElement(ErrorBoundary, { key: "bcc-popout-counter", pluginName: meta.name },
                            React.createElement(ValueCounter, { value: ret.props.textValue, maxLength: getMaxLength("chat"), className: "BetterCharCounter-popoutdm" })
                        )
                    );
                } catch (e) {
                    Logger.error(meta.name, "Error in PopoutFooter patch", e);
                }
            });
            Logger.info(meta.name, "Patched PopoutFooter");
        } catch (err) {
            if (isAbortError(err)) return;
            Logger.error(meta.name, "Error patching PopoutFooter", err);
        }
    };
    const start = async () => {
        Logger.info(meta.name, `Starting plugin v${meta.version}`);
        if (abortController) {
            abortController.abort();
            abortController = null;
        }
        abortController = new AbortController();
        const signal = abortController.signal;
        if (!Data.load(meta.name, "settings")) {
            Data.save(meta.name, "settings", settings);
        }
        loadModules();
        DOM.addStyle(meta.name, CSS);
        patchTextArea(signal);
        patchPopoutFooter(signal);
        patchCustomStatus(signal);
        patchNotes(signal);
        patchNickname(signal);
        updateManager.start(settings.autoUpdate);
        Logger.info(meta.name, "Plugin started successfully");
    };
    const stop = () => {
        Logger.info(meta.name, "Stopping plugin");
        if (abortController) {
            abortController.abort();
            abortController = null;
        }
        Patcher.unpatchAll(meta.name);
        for (const instance of getMountedChatForms()) instance.forceUpdate();
        chatFormMemo = null;
        DOM.removeStyle(meta.name);
        updateManager.stop();
        modules = {};
        Logger.info(meta.name, "Plugin stopped");
    };
    const getSettingsPanel = () => {
        return UI.buildSettingsPanel({
            settings: [
                {
                    type: "slider",
                    id: "showPercentage",
                    name: "Show Percentage Threshold",
                    note: "Only shows counter after reaching this percentage of max length",
                    value: settings.showPercentage,
                    min: 0,
                    max: 100,
                    markers: [0, 25, 50, 75, 100],
                    stickToMarkers: true
                },
                {
                    type: "switch",
                    id: "autoUpdate",
                    name: "Automatic Updates",
                    note: "Automatically check for updates on startup and every 24 hours",
                    value: settings.autoUpdate
                },
                {
                    type: "button",
                    id: "checkUpdate",
                    name: "Check for Updates",
                    note: "Manually check if a new version is available",
                    children: "Check Now",
                    onClick: () => updateManager.check()
                },
                {
                    type: "button",
                    id: "viewChangelog",
                    name: "View Changelog",
                    note: "View the complete changelog for this plugin",
                    children: "View Changelog",
                    onClick: () => updateManager.showFullChangelog()
                }
            ],
            onChange: (_, id, value) => {
                settings[id] = value;
                saveSettings();
                if (id === "autoUpdate") {
                    updateManager.stop();
                    if (value) updateManager.start(true);
                }
            }
        });
    };
    return { start, stop, getSettingsPanel };
};
module.exports = BetterCharCounter;