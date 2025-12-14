/**
 * @name AudioDownloader
 * @version 1.0.2
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/AudioDownloader/AudioDownloader.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/AudioDownloader/AudioDownloader.plugin.js
 * @authorId 874825550408089610
 * @description Adds "Download audio" to the right-click menu on messages containing voice-notes or audio attachments.
 * @author Pharaoh2k
 */
/*
Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
const TAG = "AudioDownloader";
const { shell } = require("electron");
const DEV = false;
const log = (...a) => DEV && console.log(`[${TAG}]`, ...a);
const CONFIG = {
     info: {
          name: "AudioDownloader",
          github: "Pharaoh2k/BetterDiscordStuff"
     },
     defaultConfig: [{
          type: "switch",
          id: "autoUpdate",
          name: "Automatic Updates",
          note: "Check for updates every 24 hours and on Discord startup",
          value: true
     }]
};
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
		if (typeof this.notification === "function") this.notification();
		else this.notification?.close?.();
		this.notification = null;
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
			BdApi.Logger.error(this.name, "Update check failed:", e);
			if (!silent) BdApi.UI.showToast(`[${this.name}] Update check failed`, { type: 'error' });
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
		handle = BdApi.UI.showNotification?.({
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
		}) ?? BdApi.UI.showNotice(`${this.name} v${version} is available`, {
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
		console.log(`[${this.name}] showChangelog: last=${last}, current=${this.version}`);
		if (last === this.version) { console.log(`[${this.name}] Skipping: versions match`); return; }
		BdApi.Data.save(this.name, 'version', this.version);
		if (!last) { console.log(`[${this.name}] Skipping: fresh install`); return; }
		try {
			const res = await BdApi.Net.fetch(this.urls.changelog);
			console.log(`[${this.name}] Changelog fetch status: ${res.status}`);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			console.log(`[${this.name}] Parsed changes:`, changes);
			if (changes.length === 0) return;
			BdApi.UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes });
		} catch (e) { console.error(`[${this.name}] Changelog error:`, e); }
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
	isNewer(v1, v2 = this.version) {
		return BdApi.Utils.semverCompare(v2, v1) === 1;
	}
}
function getConfigWithCurrentValues(current, defaults = CONFIG.defaultConfig) {
     return defaults.map(opt => ({
          ...opt,
          value: current[opt.id] ?? opt.value
     }));
}
module.exports = class AudioDownloader {
     constructor(meta) {
          this.meta = meta;
          this.updateManager = new UpdateManager(
               this.meta?.name ?? CONFIG.info.name,
               this.meta?.version ?? "1.0.0",
               CONFIG.info.github
          );
          this.settings = this.getSettings();
     }
     getSettings() {
          return {
               ...CONFIG.defaultConfig.reduce((acc, cfg) => ({
                    ...acc,
                    [cfg.id]: cfg.value
               }), {}),
               ...BdApi.Data.load(CONFIG.info.name, "settings")
          };
     }
     saveSettings(newSettings) {
          this.settings = {
               ...this.settings,
               ...newSettings
          };
          BdApi.Data.save(CONFIG.info.name, "settings", this.settings);
          if (Object.hasOwn(newSettings, 'autoUpdate')) {
               if (newSettings.autoUpdate) {
                    this.updateManager.start(true);
               } else {
                    this.updateManager.stop();
               }
          }
     }
     start() {
          BdApi.ContextMenu.patch("message", this.patchMenu);
          log("menu patched");
          this.updateManager.start(this.settings.autoUpdate);
     }
     stop() {
          BdApi.ContextMenu.unpatch("message", this.patchMenu);
          this.updateManager.stop();
     }
     getSettingsPanel() {
          const config = getConfigWithCurrentValues(this.settings);
          config.push(
              {
                  type: "button",
                  id: "checkUpdate",
                  name: "Check for Updates",
                  note: "Manually check for plugin updates",
                  children: "Check Now",
                  onClick: () => this.updateManager.check()
              },
              {
                  type: "button",
                  id: "viewChangelog",
                  name: "View Changelog",
                  note: "View all version changes",
                  children: "View Changelog",
                  onClick: () => this.updateManager.showFullChangelog()
              }
          );
          return BdApi.UI.buildSettingsPanel({
               settings: config,
               onChange: (_, id, value) => this.saveSettings({ [id]: value })
           });
     }
     patchMenu = (menuTree, ctx) => {
          const audio = this.findAudio(ctx.message);
          if (!audio) return;
          const CM = BdApi.ContextMenu;
          const slot = menuTree.props.children.props.children;
          slot.push(
               CM.buildItem({ type: "separator" }),
               CM.buildItem({
                    type: "text",
                    id: "download-audio",
                    label: "Download Audio",
                    action: () => this.openInBrowser(audio.url)
               })
          );
     }
     findAudio(msg = {}) {
          if (msg.voiceMessageSettings?.audioURL)
               return { url: msg.voiceMessageSettings.audioURL };
          const att = msg.attachments?.find(a =>
               ((a.contentType ?? a.content_type) || "")
                    .startsWith("audio") ||
               /\.(mp3|wav|m4a|flac|ogg)$/i.test(a.filename)
          );
          return att && { url: att.url };
     }
     openInBrowser(link) {
          try {
               shell.openExternal(link);
               BdApi.UI.showToast(
                    "Opened in browser — hit save if it doesn't auto-download.",
                    { type: "success" }
               );
          } catch (err) {
               console.error(`[${TAG}]`, err);
               BdApi.UI.showToast("Could not open link", { type: "error" });
          }
     }
};
