/**
 * @name ShowHiddenThings
 * @author Pharaoh2k
 * @authorId 874825550408089610
 * @description Displays various hidden & moderator-only things regardless of permissions. Shows member timeout icons in chat, invites paused tooltip in server list, and mod view context menu item in all servers.
 * @version 1.0.0
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/ShowHiddenThings/ShowHiddenThings.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowHiddenThings/ShowHiddenThings.plugin.js
 */
/* ==========================================
 * Copyright © 2026-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * * *
 * Contributions are welcome via GitHub pull requests. 
 * Please ensure submissions align with the project's guidelines and coding standards.
============================================= */
const { Patcher, Webpack, ContextMenu, Logger, UI, Data, Net, Plugins, Utils } = new BdApi("ShowHiddenThings");
const defaults = { showTimeouts: true, showInvitesPaused: true, showModView: true, autoUpdate: true };
class UpdateManager {
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
        else this.notification?.close?.();
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
        if (last === this.version) return;
        Data.save('version', this.version);
        if (!last) return;
        try {
            const res = await Net.fetch(this.urls.changelog);
            if (res.status !== 200) return;
            const md = await res.text();
            const changes = this.parseChangelog(md, last, this.version);
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
module.exports = class ShowHiddenThings {
    MODERATE_MEMBERS = 1099511627776n;
    contextMenuUnpatchers = [];
    constructor(meta) {
        this.meta = meta;
        this.updateManager = new UpdateManager(
            meta.name,
            meta.version,
            "Pharaoh2k/BetterDiscordStuff"
        );
    }
    loadSettings() {
        return { ...defaults, ...Data.load("settings") };
    }
    saveSettings(updated) {
        Data.save("settings", { ...this.settings, ...updated });
        this.stop();
        this.start();
    }
    getModules() {
        this.PermissionStore = Webpack.Stores.PermissionStore;
        this.MemberSafetyStore = Webpack.Stores.MemberSafetyStore;
        this.GuildMemberStore = Webpack.Stores.GuildMemberStore;
        this.UserStore = Webpack.Stores.UserStore;
        this.GuildStore = Webpack.Stores.GuildStore;
        let invitesCanKey = null;
        let modViewPermKey = null, modViewHookKey = null;
        const { invitesMod, modViewMod, openModViewMod, GuildSections, ModViewPanel } = Webpack.getBulkKeyed({
            invitesMod: {
                filter: m => {
                    if (!m || typeof m !== "object") return false;
                    let hasInvitesDisabled = false;
                    let canKey = null;
                    for (const key of Object.keys(m)) {
                        const val = m[key];
                        if (typeof val === "function") {
                            const src = val.toString();
                            if (src.includes("INVITES_DISABLED")) hasInvitesDisabled = true;
                            if (src.includes(".can(") && src.includes("MANAGE_GUILD")) canKey = key;
                        }
                    }
                    if (hasInvitesDisabled && canKey) {
                        invitesCanKey = canKey;
                        return true;
                    }
                    return false;
                },
                searchExports: false
            },
            modViewMod: {
                filter: m => {
                    if (!m || typeof m !== "object") return false;
                    const keys = Object.keys(m);
                    if (keys.length > 5) return false;
                    let foundPermKey = null, foundHookKey = null;
                    for (const key of keys) {
                        try {
                            const src = m[key]?.toString();
                            if (src?.includes("checkElevated") && src?.includes("getCurrentUser") && !src?.includes("getIncidentsByGuild")) foundPermKey = key;
                            else if (typeof m[key] === "function") foundHookKey = key;
                        } catch { continue; }
                    }
                    if (foundPermKey) {
                        modViewPermKey = foundPermKey;
                        modViewHookKey = foundHookKey;
                        return true;
                    }
                    return false;
                },
                searchExports: false
            },
            openModViewMod: {
                filter: m => {
                    if (!m || typeof m !== "object") return false;
                    const keys = Object.keys(m);
                    if (keys.length !== 1) return false;
                    const fn = m[keys[0]];
                    if (typeof fn !== "function") return false;
                    const src = fn.toString();
                    return src.includes("modViewPanel") && src.includes("MEMBER_SAFETY_PAGE");
                },
                searchExports: false
            },
            GuildSections: {
                filter: m => m?.MEMBER_SAFETY === "member-safety" && m?.GUILD_HOME === "@home",
                searchExports: true
            },
            ModViewPanel: {
                filter: m => m?.INFO === 1 && m?.MESSAGE_HISTORY === 2 && m?.PERMISSIONS === 3 && m?.UNKNOWN === 0,
                searchExports: true
            }
        });
        this.invitesMod = invitesMod;
        this.invitesCanKey = invitesCanKey;
        this.modViewMod = modViewMod;
        this.modViewPermKey = modViewPermKey;
        this.modViewHookKey = modViewHookKey;
        this.openModView = openModViewMod?.[Object.keys(openModViewMod)[0]] ?? null;
        this.GuildSections = GuildSections;
        this.ModViewPanel = ModViewPanel;
    }
    start() {
        this.settings = this.loadSettings();
        this.updateManager.start(this.settings.autoUpdate);
        try {
            this.getModules();
            if (this.settings.showTimeouts) this.patchShowTimeouts();
            if (this.settings.showInvitesPaused) this.patchShowInvitesPaused();
            if (this.settings.showModView) {
                this.patchShowModView();
                this.patchHighestRole();
                if (!this.modViewPermKey) this.patchModViewSelf();
            }
        } catch (e) {
            Logger.error("Failed to initialize patches:", e);
        }
    }
    stop() {
        this.updateManager.stop();
        try {
            Patcher.unpatchAll();
            for (const unpatch of this.contextMenuUnpatchers) unpatch();
            this.contextMenuUnpatchers = [];
        } catch (e) {
            Logger.error("Failed to clean up patches:", e);
        }
    }
    patchShowTimeouts() {
        if (!this.PermissionStore || !this.GuildStore) return Logger.error("PermissionStore or GuildStore not found");
        const proto = Object.getPrototypeOf(this.PermissionStore);
        Patcher.instead(proto, "canManageUser", (thisObj, args, original) => {
            if (args[0] === this.MODERATE_MEMBERS) return true;
            return original.apply(thisObj, args);
        });
        this.contextMenuUnpatchers.push(ContextMenu.patch("user-context", (tree, props) => {
            if (!props.guildId) return;
            const guild = this.GuildStore.getGuild(props.guildId);
            if (this.PermissionStore.can(this.MODERATE_MEMBERS, guild)) return;
            const removeItem = (node) => {
                const children = node?.props?.children;
                if (!Array.isArray(children)) return;
                for (let i = children.length - 1; i >= 0; i--) {
                    if (children[i]?.props?.id === "timeout") children.splice(i, 1);
                    else removeItem(children[i]);
                }
            };
            removeItem(tree);
        }));
    }
    patchShowInvitesPaused() {
        if (!this.invitesMod || !this.invitesCanKey) return Logger.error("Invites paused module not found");
        Patcher.instead(this.invitesMod, this.invitesCanKey, () => true);
    }
    patchShowModView() {
        if (!this.modViewMod || !this.modViewPermKey) return Logger.error("Mod view module not found");
        Patcher.instead(this.modViewMod, this.modViewPermKey, () => true);
        if (this.modViewHookKey) Patcher.after(this.modViewMod, this.modViewHookKey, () => true);
    }
    patchHighestRole() {
        if (!this.MemberSafetyStore || !this.GuildMemberStore) {
            return Logger.error("MemberSafetyStore or GuildMemberStore not found");
        }
        const proto = Object.getPrototypeOf(this.MemberSafetyStore);
        if (!proto.getEnhancedMember) {
            return Logger.error("getEnhancedMember not found");
        }
        Patcher.after(proto, "getEnhancedMember", (_, args, ret) => {
            if (!ret) return ret;
            if (!ret.highestRoleId) {
                const [guildId, userId] = args;
                const member = this.GuildMemberStore.getMember(guildId, userId);
                if (member?.highestRoleId) {
                    ret.highestRoleId = member.highestRoleId;
                }
            }
            return ret;
        });
    }
    patchModViewSelf() {
        if (!this.openModView || !this.GuildSections || !this.ModViewPanel || !this.UserStore) {
            return Logger.error("Could not find mod view navigation utilities");
        }
        this.contextMenuUnpatchers.push(ContextMenu.patch("user-context", (tree, props) => {
            if (!props.user || !props.guildId) return;
            const currentUser = this.UserStore.getCurrentUser();
            if (!currentUser || props.user.id !== currentUser.id) return;
            const hasModView = Utils.findInTree(tree, el => {
                return el?.props?.id === "mod-view-self";
            }, { walkable: ["props", "children"] });
            if (hasModView) return;
            const modViewItem = ContextMenu.buildItem({
                type: "text",
                label: "Open in Mod View",
                id: "mod-view-self",
                action: () => {
                    this.openModView(
                        props.guildId,
                        props.user.id,
                        this.GuildSections.MEMBER_SAFETY,
                        { modViewPanel: this.ModViewPanel.INFO }
                    );
                }
            });
            if (tree.props.children && Array.isArray(tree.props.children)) {
                tree.props.children.splice(-1, 0, modViewItem);
            }
        }));
    }
    getSettingsPanel() {
        return UI.buildSettingsPanel({
            settings: [
                { type: "switch", id: "showTimeouts", name: "Show Timeouts", note: "Shows member timeout icons in chat", value: this.settings.showTimeouts },
                { type: "switch", id: "showInvitesPaused", name: "Show Invites Paused", note: "Shows the invites paused tooltip in the server list", value: this.settings.showInvitesPaused },
                { type: "switch", id: "showModView", name: "Show Mod View", note: "Shows the Mod View context menu item, highest role fix, and self mod view in all servers", value: this.settings.showModView },
                { type: "switch", id: "autoUpdate", name: "Auto Update", note: "Check for updates every 24 hours", value: this.settings.autoUpdate }
            ],
            onChange: (_, id, value) => {
                if (id === "autoUpdate") {
                    value ? this.updateManager.start(true) : this.updateManager.stop();
                }
                this.saveSettings({ [id]: value });
            }
        });
    }
};