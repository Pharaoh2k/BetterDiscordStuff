/**
 * @name ShowAllChannelsAuto
 * @version 1.0.3
 * @website https://github.com/Pharaoh2k/BetterDiscordStuff
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/ShowAllChannelsAuto/ShowAllChannelsAuto.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowAllChannelsAuto/ShowAllChannelsAuto.plugin.js
 * @authorId 874825550408089610
 * @description Automatically enables "Show All Channels" for every Discord server.
 * @author Pharaoh2k
 */
/*
 * Copyright © 2025-present, Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 ***
 * Contributions are welcome via GitHub pull requests. 
 * Please ensure submissions align with the project's guidelines and coding standards.
 * By contributing, you agree that your work will be licensed under the same terms as this project.
*/
"use strict";
const { React, Hooks, Data, UI, Webpack, Logger, Net, Utils, Plugins } = new BdApi("ShowAllChannelsAuto");
const DEV = false;
const log = (...a) => DEV && Logger.log(...a);
const SHOW_ALL_OFF_BIT = 1 << 14; // 16384
const CONFIG = {
    github: "Pharaoh2k/BetterDiscordStuff",
    defaultSettings: {
        autoUpdate: true,
        excludeGuildIds: []
    }
};
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
		});
		this.notification = handle;
	}
	applyUpdate(text, nextVersion) {
		try {
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
		const last = Data.load('version');
		Logger.info(`showChangelog: last=${last}, current=${this.version}`);
		if (last === this.version) { Logger.info("Skipping: versions match"); return; }
		if (!last) {
			Data.save('version', this.version);
			Logger.info("Skipping: fresh install");
			return;
		}
		try {
			const res = await Net.fetch(this.urls.changelog);
			Logger.info(`Changelog fetch status: ${res.status}`);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			Logger.info("Parsed changes:", changes);
			if (changes.length === 0) { Data.save('version', this.version); return; }
			UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes });
			Data.save('version', this.version);
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
module.exports = class ShowAllChannelsAuto {
    constructor(meta) {
        this.meta = meta;
        const repo = this._repoFromMeta(this.meta) || CONFIG.github;
        this.updateManager = new UpdateManager(this.meta.name, this.meta.version, repo);
        this.settings = this.getSettings();
        this.Dispatcher = null;
        this.GuildStore = null;
        this.UserGuildSettingsStore = null;
    }
    _repoFromMeta(meta) {
        const src = meta.source || meta.website || meta.updateUrl || "";
        const m = src.match(/github\.com\/([^/]+)\/([^/]+)/i);
        return m ? `${m[1]}/${m[2].replace(/\.git$/, "")}` : null;
    }
    getSettings() {
        return { ...CONFIG.defaultSettings, ...Data.load("settings") };
    }
    saveSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        Data.save("settings", this.settings);
        if (Object.hasOwn(newSettings, "autoUpdate")) {
            newSettings.autoUpdate ? this.updateManager.start(true) : this.updateManager.stop();
        }
    }
    start() {
        this.updateManager.start(this.settings.autoUpdate);
        try {
            this.Dispatcher = Webpack.Stores.UserStore._dispatcher;
            this.GuildStore = Webpack.Stores.GuildStore;
            this.UserGuildSettingsStore = Webpack.Stores.UserGuildSettingsStore;
            this.originalFlags = new Map();
            this._startTimer = setTimeout(() => this.enableAllGuilds(), 1000);
        } catch (e) {
            Logger.error("Failed to initialize Discord stores:", e);
        }
    }
    stop() {
        this.updateManager.stop();
        clearTimeout(this._startTimer);
        this._startTimer = null;
        try {
            if (this.originalFlags) {
                for (const [guildId, flags] of this.originalFlags) {
                    this._dispatchUpdate(guildId, flags);
                }
                this.originalFlags.clear();
            }
        } catch (e) {
            Logger.error("Failed to restore guild settings:", e);
        }
    }
    enableAllGuilds() {
        const guilds = this.GuildStore?.getGuilds();
        if (!guilds) return;
        const excluded = new Set(this.settings.excludeGuildIds);
        for (const guildId of Object.keys(guilds)) {
            if (excluded.has(guildId)) continue;
            try {
                this.enableGuild(guildId);
            } catch (e) {
                Logger.error(`Failed to enable guild ${guildId}:`, e);
            }
        }
    }
    enableGuild(guildId) {
        const allSettings = this.UserGuildSettingsStore?.getAllSettings();
        const settings = allSettings?.userGuildSettings?.[guildId];
        if (!settings) return;
        const current = settings.flags ?? 0;
        if ((current & SHOW_ALL_OFF_BIT) !== 0) {
            if (!this.originalFlags.has(guildId)) {
                this.originalFlags.set(guildId, current);
            }
            const next = current & ~SHOW_ALL_OFF_BIT;
            this._dispatchUpdate(guildId, next);
            log(`Enabled for guild ${guildId} (${current} -> ${next})`);
        }
    }
    _dispatchUpdate(guildId, flags) {
        this.Dispatcher.dispatch({
            type: "USER_GUILD_SETTINGS_GUILD_UPDATE",
            guildId,
            settings: { flags }
        });
    }
    getSettingsPanel() {
        const SettingsPanel = () => {
            const settings = { ...CONFIG.defaultSettings, ...Hooks.useData("settings") };
            const excluded = new Set(settings.excludeGuildIds);
            const guilds = this.GuildStore?.getGuilds() ?? {};
            const sortedGuilds = Object.entries(guilds)
                .sort((a, b) => a[1].name.localeCompare(b[1].name));

            const settingsConfig = [
                {
                    type: "switch",
                    id: "autoUpdate",
                    name: "Automatic Updates",
                    note: "Check for updates every 24 hours and on Discord startup",
                    value: settings.autoUpdate
                }
            ];

            if (sortedGuilds.length > 0) {
                settingsConfig.push({
                    type: "category",
                    id: "exclusions",
                    name: "Server Exclusions",
                    collapsible: true,
                    shown: false,
                    settings: sortedGuilds.map(([id, guild]) => ({
                        type: "switch",
                        id: `exclude_${id}`,
                        name: guild.name || id,
                        note: "Exclude this server from auto-enable",
                        value: excluded.has(id)
                    }))
                });
            }

            settingsConfig.push(
                {
                    type: "button",
                    id: "applyNow",
                    name: "Apply Now",
                    note: "Immediately re-enable all non-excluded servers",
					children: "Apply Now",
                    onClick: () => {
                        this.enableAllGuilds();
                        UI.showToast("Applied!", { type: "success" });
                    }
                },
                {
                    type: "button",
                    id: "checkUpdate",
                    name: "Check for Updates",
					children: "Check Now",
                    note: "Manually check for plugin updates",
                    onClick: () => this.updateManager.check()
                }
            );

            return UI.buildSettingsPanel({
                settings: settingsConfig,
                onChange: (_, id, value) => {
                    if (id.startsWith('exclude_')) {
                        const guildId = id.substring(8);
                        const newExcluded = new Set(settings.excludeGuildIds);
                        if (value) newExcluded.add(guildId);
                        else newExcluded.delete(guildId);
                        this.saveSettings({ excludeGuildIds: [...newExcluded] });
                    } else {
                        this.saveSettings({ [id]: value });
                    }
                }
            });
        };
        return React.createElement(SettingsPanel);
    }
};
