/**
 * @name ShowAllChannelsAuto
 * @version 1.0.0
 * @website https://github.com/Pharaoh2k/BetterDiscordStuff
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/ShowAllChannelsAuto/ShowAllChannelsAuto.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowAllChannelsAuto/ShowAllChannelsAuto.plugin.js
 * @authorId 874825550408089610
 * @description Automatically enables "Show All Channels" for every Discord server by clearing the guild flag that disables it.
 * @author Pharaoh2k
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
/*
Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
"use strict";
const TAG = "ShowAllChannelsAuto";
const DEV = false;
const log = (...a) => DEV && console.log(`[${TAG}]`, ...a);
const SHOW_ALL_OFF_BIT = 1 << 14; // 16384
const CONFIG = {
    github: "Pharaoh2k/BetterDiscordStuff",
    defaultConfig: [
        {
            type: "switch",
            id: "autoUpdate",
            name: "Automatic Updates",
            note: "Check for updates every 24 hours and on Discord startup",
            value: true
        }
    ]
};
class UpdateManager {
    constructor(pluginName, version, github) {
        this.name = pluginName;
        this.version = version;
        const [user, repo] = (github || "").split("/");
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
        } catch { }
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
function getConfigWithCurrentValues(current, defaults = CONFIG.defaultConfig) {
    return defaults.map(opt => ({
        ...opt,
        value: current[opt.id] ?? opt.value
    }));
}
module.exports = class ShowAllChannelsAuto {
    constructor(meta) {
        this.meta = meta;
        const repo = this._repoFromMeta(this.meta) || CONFIG.github;
        this.updateManager = new UpdateManager(this.meta.name, this.meta.version, repo);
        this.settings = this.getSettings();
        this.guildListener = null;
        this.Dispatcher = null;
        this.GuildStore = null;
        this.UserGuildSettingsStore = null;
    }
    _repoFromMeta(meta) {
        const src = meta?.source || meta?.website || meta?.updateUrl || "";
        const m = src.match(/github\.com\/([^/]+)\/([^/]+)/i);
        return m ? `${m[1]}/${m[2].replace(/\.git$/, "")}` : null;
    }
    getSettings() {
        const defaults = CONFIG.defaultConfig.reduce((acc, cfg) => ({ ...acc, [cfg.id]: cfg.value }), {});
        defaults.excludeGuildIds = [];
        return { ...defaults, ...BdApi.Data.load(this.meta.name, "settings") };
    }
    saveSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        BdApi.Data.save(this.meta.name, "settings", this.settings);
        if (Object.prototype.hasOwnProperty.call(newSettings, "autoUpdate")) {
            newSettings.autoUpdate ? this.updateManager.start(true) : this.updateManager.stop();
        }
    }
    start() {
        const W = BdApi.Webpack;
        this.Dispatcher = W.getModule(m => m?.dispatch && m?.subscribe);
        this.GuildStore = W.getStore("GuildStore");
        this.UserGuildSettingsStore = W.getStore("UserGuildSettingsStore");
        if (!this.Dispatcher || !this.GuildStore || !this.UserGuildSettingsStore) {
            BdApi.UI.showToast(`[${TAG}] Missing Discord internals (client update?)`, { type: "error" });
            return;
        }
        this._startTimer = setTimeout(() => this.enableAllGuilds(), 1000);
        this.updateManager.start(this.settings.autoUpdate);
        BdApi.UI.showToast(`[${TAG}] Enabled`, { type: "success" });
    }
    stop() {
        if (this._startTimer) { clearTimeout(this._startTimer); this._startTimer = null; }
        this.updateManager.stop();
        BdApi.UI.showToast(`[${TAG}] Disabled`, { type: "info" });
    }
    enableAllGuilds() {
        const guilds = this.GuildStore?.getGuilds?.() ?? {};
        const excluded = new Set(this.settings?.excludeGuildIds || []);
        for (const guildId of Object.keys(guilds)) {
            if (excluded.has(guildId)) continue;
            this.enableGuild(guildId);
        }
    }
    enableGuild(guildId) {
        try {
            const allSettings = this.UserGuildSettingsStore.getAllSettings();
            const settings = allSettings?.userGuildSettings?.[guildId];
            if (!settings) return;
            const current = settings.flags ?? 0;
            if ((current & SHOW_ALL_OFF_BIT) !== 0) {
                const next = current & ~SHOW_ALL_OFF_BIT;
                this._dispatchUpdate(guildId, next);
                log(`Enabled for guild ${guildId} (${current} -> ${next})`);
            }
        } catch (e) {
            log(`Failed to enable for guild ${guildId}`, e);
        }
    }
    _dispatchUpdate(guildId, flags) {
        try {
            this.Dispatcher.dispatch({
                type: "USER_GUILD_SETTINGS_GUILD_UPDATE",
                guildId,
                settings: { flags }
            });
        } catch (e) {
            log(`Dispatch failed for ${guildId}`, e);
        }
    }
    _debounce(fn, ms) {
        let t = null;
        return (...args) => {
            if (t) clearTimeout(t);
            t = setTimeout(() => fn(...args), ms);
        };
    }
    getSettingsPanel() {
        const config = getConfigWithCurrentValues(this.settings);
        const guilds = this.GuildStore?.getGuilds?.() ?? {};
        const excluded = new Set(this.settings?.excludeGuildIds || []);
        const sortedGuilds = Object.entries(guilds)
            .sort((a, b) => (a[1]?.name || "").localeCompare(b[1]?.name || ""));
        if (sortedGuilds.length > 0) {
            config.push({
                type: "category",
                id: "exclusions",
                name: "Server Exclusions",
                collapsible: true,
                shown: false,
                settings: sortedGuilds.map(([id, guild]) => ({
                    type: "switch",
                    id: `exclude_${id}`,
                    name: guild?.name || id,
                    note: `Exclude this server from auto-enable`,
                    value: excluded.has(id)
                }))
            });
        }
        config.push({
            type: "button",
            id: "applyNow",
            name: "Apply Now",
            note: "Immediately re-enable all non-excluded servers",
            onClick: () => {
                this.enableAllGuilds();
                BdApi.UI.showToast("Applied!", { type: "success" });
            }
        });
        config.push({
            type: "button",
            id: "checkUpdate",
            name: "Check for Updates",
            note: "Manually check for plugin updates",
            onClick: () => this.updateManager.check()
        });
        config.push({
            type: "button",
            id: "viewChangelog",
            name: "View Changelog",
            note: "View all version changes",
            onClick: () => this.updateManager.showFullChangelog()
        });
        const panel = BdApi.UI.buildSettingsPanel({
            settings: config,
            onChange: (_, id, value) => {
                if (id.startsWith('exclude_')) {
                    const guildId = id.substring(8);
                    const excluded = new Set(this.settings?.excludeGuildIds || []);
                    if (value) excluded.add(guildId);
                    else excluded.delete(guildId);
                    this.saveSettings({ excludeGuildIds: Array.from(excluded) });
                } else {
                    this.saveSettings({ [id]: value });
                }
            }
        });
        requestAnimationFrame(() => {
            const applyBtn = document.querySelector("#applyNow .bd-button-content");
            if (applyBtn) applyBtn.textContent = "Apply Now";
            const checkBtn = document.querySelector("#checkUpdate .bd-button-content");
            if (checkBtn) checkBtn.textContent = "Check Now";
            const changelogBtn = document.querySelector("#viewChangelog .bd-button-content");
            if (changelogBtn) changelogBtn.textContent = "View Changelog";
        });
        return panel;
    }
};
/*@end@*/