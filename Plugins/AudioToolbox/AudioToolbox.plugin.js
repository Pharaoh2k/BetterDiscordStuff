/**
 * @name AudioToolbox (formerly AudioDownloader)
 * @version 2.0.0
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/AudioToolbox/AudioToolbox.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/AudioToolbox/AudioToolbox.plugin.js
 * @authorId 874825550408089610
 * @description A complete audio toolkit for voice messages and audio attachments - download with instant format conversions (WAV, M4A/AAC), EQ presets, playback speed, basic and A/B looping, queue mode, batch and auto-download, and custom filenames.
 * @author Pharaoh2k
 */
/*
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code
 * is prohibited without prior written consent from the author.
 * ***
 * Contributions are welcome via GitHub pull requests. 
 * Please ensure submissions align with the project's guidelines and coding standards.
*/
const { shell, clipboard } = require("electron");
const fs = require("fs");
const path = require("path");
const HISTORY_MAX = 200;
const { DOM, UI, Patcher, Data, Webpack, ContextMenu, Logger, React, Net, Plugins, Utils } = new BdApi("AudioToolbox");
const { Filters } = Webpack;
const { createElement, useRef, useState, useCallback, useEffect } = React;
const DEV = false;
const log = (...a) => DEV && Logger.log(...a);
const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];
const EQ_PRESETS = {
     off: [
          { type: "lowshelf", frequency: 200, gain: 0 },
          { type: "peaking", frequency: 1500, gain: 0, Q: 1 },
          { type: "highshelf", frequency: 3000, gain: 0 }
     ],
     bassBoost: [
          { type: "lowshelf", frequency: 200, gain: 12 },
          { type: "peaking", frequency: 1500, gain: 0, Q: 1 },
          { type: "highshelf", frequency: 3000, gain: 0 }
     ],
     trebleBoost: [
          { type: "lowshelf", frequency: 200, gain: 0 },
          { type: "peaking", frequency: 1500, gain: 0, Q: 1 },
          { type: "highshelf", frequency: 3000, gain: 8 }
     ],
     voiceEnhance: [
          { type: "lowshelf", frequency: 200, gain: -4 },
          { type: "peaking", frequency: 2500, gain: 6, Q: 1.5 },
          { type: "highshelf", frequency: 5000, gain: 3 }
     ],
     bassCut: [
          { type: "lowshelf", frequency: 200, gain: -12 },
          { type: "peaking", frequency: 1500, gain: 0, Q: 1 },
          { type: "highshelf", frequency: 3000, gain: 0 }
     ]
};
const EQ_PRESET_LABELS = {
     off: "Off", bassBoost: "Bass Boost", trebleBoost: "Treble Boost", voiceEnhance: "Voice Enhance", bassCut: "Bass Cut"
};
const applyFilterConfig = (filter, cfg) => {
     filter.type = cfg.type;
     filter.frequency.value = cfg.frequency;
     filter.gain.value = cfg.gain;
     if (cfg.Q) filter.Q.value = cfg.Q;
};
const stopSourceNode = (eq) => {
     if (!eq.sourceNode) return;
     try { eq.sourceNode.stop(); } catch (e) { Logger.debug("sourceNode already stopped", e); }
     eq.sourceNode = null;
};
const DOWNLOAD_BTN_CSS = `
.ad-audio-wrap {display: flex;align-items: center;gap: 6px;}
.ad-audio-wrap > :first-child {flex: 1;min-width: 0;}
.ad-download-btn {flex-shrink: 0;width: 32px;height: 32px;border-radius: 50%;background: var(--background-mod-subtle, rgba(0,0,0,0.4));border: 1px solid var(--border-subtle);cursor: pointer;display: flex;align-items: center;justify-content: center;padding: 0;color: var(--interactive-icon-default);transition: background 0.15s ease, color 0.15s ease;z-index: 5;}
.ad-download-btn:hover {background: var(--background-modifier-hover, rgba(0,0,0,0.6));color: var(--interactive-icon-hover);}
.ad-download-btn svg { pointer-events: none; }
.ad-loop-active { color: var(--brand-500, #5865f2) !important; background: hsl(var(--brand-500-hsl) / 0.2) !important; }
`;
const GITHUB_REPO = "Pharaoh2k/BetterDiscordStuff";
const CONFIG = {
     defaultConfig: [
          {
               type: "switch",
               id: "autoUpdate",
               name: "Automatic Updates",
               note: "Check for updates every 24 hours and on Discord startup",
               value: true
          },
          {
               type: "dropdown",
               id: "downloadMode",
               name: "Download Mode",
               note: "How audio files are saved",
               value: "direct",
               options: [
                    { label: "Direct to folder", value: "direct" },
                    { label: "Save-as dialog", value: "saveAs" },
                    { label: "Open in browser (legacy)", value: "browser" }
               ]
          },
          {
               type: "text",
               id: "downloadFolder",
               name: "Download Folder",
               note: "Where to save files in 'Direct to folder' mode (leave empty for Downloads)",
               value: ""
          },
          {
               type: "text",
               id: "filenameTemplate",
               name: "Filename Template",
               note: "Tokens: {author}, {date}, {time}, {duration}, {channel}, {messageId}",
               value: "{author}_{date}_{time}"
          },
          {
               type: "switch",
               id: "showOpenFolder",
               name: "Show 'Open in Folder' Toast",
               note: "After downloading, show a toast with a clickable link to open the folder",
               value: true
          },
          {
               type: "dropdown",
               id: "convertFormat",
               name: "Convert Format",
               note: "Convert audio to a different format on download",
               value: "original",
               options: [
                    { label: "Keep original", value: "original" },
                    { label: "Convert to WAV", value: "wav" },
                    { label: "Convert to M4A/AAC", value: "m4a" }
               ]
          }
     ]
};
class UpdateManager {
     /* using Net, UI, Logger, Data, Plugins, Utils from BdApi */
     constructor(pluginName, version, github = GITHUB_REPO) {
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
          this.notification.close();
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
                    UI.showToast(`Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
                    return;
               }
               const nextVersion = validated.version;
               fs.writeFileSync(__filename, text);
               UI.showToast(`Updated to v${nextVersion}. Reloading...`, { type: "success" });
               setTimeout(() => {
                    try {
                         Plugins.reload(this.name);
                    } catch {
                         UI.showToast("Please reload Discord (Ctrl+R)", { type: "info", timeout: 0 });
                    }
               }, 100);
          } catch (e) {
               Logger.error("Update failed:", e);
               UI.showToast("Update failed", { type: "error" });
          }
     }
     async showChangelog() {
          const last = Data.load('version');
          Logger.info(`showChangelog: last=${last}, current=${this.version}`);
          if (last === this.version) { Logger.info("Skipping: versions match"); return; }
          Data.save('version', this.version);
          if (!last) { Logger.info("Skipping: fresh install"); return; }
          await this._fetchAndShowChangelog(last, `Version ${this.version}`, true);
     }
     async showFullChangelog() {
          await this._fetchAndShowChangelog("0.0.0", "All Changes", false);
     }
     async _fetchAndShowChangelog(fromVersion, subtitle, silent) {
          try {
               const res = await Net.fetch(this.urls.changelog);
               Logger.info(`Changelog fetch status: ${res.status}`);
               if (res.status !== 200) {
                    if (!silent) UI.showToast("Could not fetch changelog", { type: "error" });
                    return;
               }
               const md = await res.text();
               const changes = this.parseChangelog(md, fromVersion, this.version);
               Logger.info("Parsed changes:", changes);
               if (changes.length === 0 && silent) return;
               UI.showChangelogModal({
                    title: this.name,
                    subtitle,
                    changes: changes.length ? changes : [{ title: "No changes found", items: [] }]
               });
          } catch (e) {
               Logger.error("Changelog error:", e);
               if (!silent) UI.showToast("Could not fetch changelog", { type: "error" });
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
const getConfigWithCurrentValues = (current, defaults = CONFIG.defaultConfig) => {
     return defaults.map(opt => ({
          ...opt,
          value: current[opt.id] ?? opt.value
     }));
}
module.exports = class AudioToolbox {
     constructor(meta) {
          this.meta = meta;
          this.updateManager = new UpdateManager(
               meta.name,
               meta.version,
               GITHUB_REPO
          );
     }
     getSettings() {
          return {
               ...CONFIG.defaultConfig.reduce((acc, cfg) => ({
                    ...acc,
                    [cfg.id]: cfg.value
               }), {}),
               ...Data.load("settings")
          };
     }
     saveSettings(newSettings) {
          this.settings = {
               ...this.settings,
               ...newSettings
          };
          Data.save("settings", this.settings);
          if (Object.hasOwn(newSettings, 'autoUpdate')) {
               if (newSettings.autoUpdate) {
                    this.updateManager.start(true);
               } else {
                    this.updateManager.stop();
               }
          }
     }
     start() {
          this.settings = this.getSettings();
          this.updateManager.start(this.settings.autoUpdate);
          try {
               log("started");
               this._queueMode = false;
               document.getElementById("audiotoolbox-cleanup")?.remove();
               ContextMenu.patch("message", this.patchMenu);
               DOM.addStyle(DOWNLOAD_BTN_CSS);
               this._patchAudioRenderers();
               this._startAutoDownload();
          } catch (err) {
               Logger.error("Failed to start", err);
               UI.showToast("AudioToolbox: Failed to start", { type: "error" });
          }
     }
     stop() {
          ContextMenu.unpatch("message", this.patchMenu);
          Patcher.unpatchAll();
          DOM.removeStyle();
          this._removeOrphanedControls();
          this._stopAutoDownload();
          this.updateManager.stop();
          log("stopped");
     }
     _removeOrphanedControls() {
          const style = document.createElement("style");
          style.id = "audiotoolbox-cleanup";
          style.textContent = ".ad-download-btn{display:none!important}.ad-audio-wrap{display:contents!important}";
          document.head.appendChild(style);
     }
     getSettingsPanel() {
          const config = getConfigWithCurrentValues(this.settings);
          config.push(
               {
                    type: "button",
                    id: "chooseFolder",
                    name: "Choose Download Folder",
                    note: this.settings.downloadFolder || "(using system Downloads folder)",
                    children: "Browse\u2026",
                    onClick: async () => {
                         const result = await UI.openDialog({
                              mode: "open",
                              properties: ["openDirectory"],
                              title: "Choose download folder"
                         });
                         if (!result.canceled && result.filePaths[0]) {
                              this.saveSettings({ downloadFolder: result.filePaths[0] });
                              UI.showToast(`Download folder set to: ${result.filePaths[0]}`, { type: "success" });
                         }
                    }
               },
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
               },
               {
                    type: "button",
                    id: "viewHistory",
                    name: "Download History",
                    note: `${(Data.load("history") || []).length} downloads logged`,
                    children: "View History",
                    onClick: () => {
                         UI.alert("Download History", this._formatHistoryForModal());
                    }
               },
               {
                    type: "button",
                    id: "clearHistory",
                    name: "Clear Download History",
                    note: "Remove all download history entries",
                    children: "Clear",
                    onClick: () => {
                         Data.save("history", []);
                         UI.showToast("Download history cleared", { type: "success" });
                    }
               }
          );
          return UI.buildSettingsPanel({
               settings: config,
               onChange: (_, id, value) => this.saveSettings({ [id]: value })
          });
     }
     patchMenu = (menuTree, ctx) => {
          const audio = this.findAudio(ctx.message);
          if (!audio) return;
          const slot = menuTree.props.children.props.children;
          slot.push(
               ContextMenu.buildItem({ type: "separator" }),
               ContextMenu.buildItem({
                    type: "submenu",
                    id: "audio-toolbox",
                    label: "Audio toolbox",
                    items: [
                         ...this._coreAudioMenuItems(audio, ctx.message),
                         { type: "separator" },
                         {
                              type: "text",
                              id: "ad-batch-download",
                              label: "Download All Audio (Cached)",
                              action: () => this.batchDownload(ctx.message.channel_id)
                         },
                         {
                              type: "text",
                              id: "ad-auto-download",
                              label: this._isAutoDownloadChannel(ctx.message.channel_id) ? "Disable Auto-Download Here" : "Enable Auto-Download Here",
                              action: () => this._toggleAutoDownloadChannel(ctx.message.channel_id)
                         }
                    ]
               })
          );
     }
     _downloadLabel() {
          const mode = this.settings.downloadMode;
          if (mode === "saveAs") return "Download (Save As\u2026)";
          if (mode === "browser") return "Download (Browser)";
          return "Download";
     }
     _coreAudioMenuItems(audio, message) {
          return [
               { type: "text", id: "ad-download", label: this._downloadLabel(), action: () => this.downloadAudio(audio, message) },
               { type: "text", id: "ad-save-as", label: "Save As\u2026", action: () => this.downloadAudio(audio, message, "saveAs") },
               { type: "text", id: "ad-copy-url", label: "Copy Audio URL", action: () => this.copyAudioURL(audio.url) },
               { type: "text", id: "ad-open-browser", label: "Open in Browser", action: () => this.openInBrowser(audio.url) }
          ];
     }
     findAudio(msg) {
          const att = msg.attachments.find(a =>
               ((a.contentType ?? a.content_type) || "")
                    .startsWith("audio") ||
               /\.(mp3|wav|m4a|flac|ogg)$/i.test(a.filename)
          );
          if (att) return {
               url: att.url,
               filename: att.filename,
               duration: att.duration_secs,
               size: att.size,
               contentType: att.contentType ?? att.content_type
          };
          if (msg.voiceMessageSettings?.audioURL)
               return { url: msg.voiceMessageSettings.audioURL, filename: "voice-message.ogg" };
          return null;
     }
     async downloadAudio(audio, message, modeOverride) {
          const mode = modeOverride || this.settings.downloadMode;
          if (mode === "browser") return this.openInBrowser(audio.url);
          try {
               if (mode === "saveAs") {
                    const ext = this._getExtension(audio.filename, audio.contentType);
                    const filename = this._buildFilename(audio, message, ext);
                    const result = await UI.openDialog({
                         mode: "save",
                         title: "Save Audio",
                         defaultPath: filename,
                         filters: [
                              { name: "Audio Files", extensions: [ext.replace(".", "")] },
                              { name: "All Files", extensions: ["*"] }
                         ]
                    });
                    if (result.canceled || !result.filePath) return;
                    await this._fetchAndSave(audio.url, result.filePath, audio, message);
               } else {
                    await this._downloadDirect(audio, message);
               }
          } catch (err) {
               Logger.error(err);
               UI.showToast("Download failed: " + err.message, { type: "error" });
          }
     }
     async _fetchAndSave(url, filePath, audio, message) {
          UI.showToast("Downloading\u2026", { type: "info", timeout: 2000 });
          const res = await Net.fetch(url);
          if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
          const contentLength = Number.parseInt(res.headers.get('content-length') || '0', 10);
          let buf;
          if (contentLength > 0 && res.body?.getReader) {
               const reader = res.body.getReader();
               const chunks = [];
               let received = 0;
               let lastPct = 0;
               while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                    received += value.length;
                    const pct = Math.round((received / contentLength) * 100);
                    if (pct >= lastPct + 25) {
                         log(`Download progress: ${pct}%`);
                         lastPct = pct;
                    }
               }
               buf = Buffer.concat(chunks.map(c => Buffer.from(c)));
          } else {
               buf = Buffer.from(await res.arrayBuffer());
          }
          let finalPath = filePath;
          const fmt = this.settings.convertFormat;
          if (fmt !== "original") {
               const raw = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
               if (fmt === "wav" && !filePath.endsWith(".wav")) {
                    finalPath = filePath.replace(/\.[^.]+$/, ".wav");
                    buf = await this._convertToWav(raw);
               } else if (fmt === "m4a" && !filePath.endsWith(".m4a")) {
                    finalPath = filePath.replace(/\.[^.]+$/, ".m4a");
                    buf = await this._convertToM4a(raw);
               }
          }
          if (finalPath !== filePath) finalPath = this._deduplicatePath(finalPath);
          fs.writeFileSync(finalPath, buf);
          const basename = path.basename(finalPath);
          log("Saved:", finalPath, "size:", buf.length);
          this._addToHistory(audio, message, finalPath, buf.length);
          if (this.settings.showOpenFolder) {
               UI.showToast(`Saved: ${basename}`, {
                    type: "success",
                    timeout: 5000,
                    onClick: () => shell.showItemInFolder(finalPath)
               });
          } else {
               UI.showToast(`Saved: ${basename}`, { type: "success" });
          }
     }
     async _downloadDirect(audio, message) {
          const ext = this._getExtension(audio.filename, audio.contentType);
          const filename = this._buildFilename(audio, message, ext);
          const folder = this._getDownloadFolder();
          const filePath = path.join(folder, filename);
          const safePath = this._deduplicatePath(filePath);
          await this._fetchAndSave(audio.url, safePath, audio, message);
     }
     _buildFilename(audio, message, ext) {
          const template = this.settings.filenameTemplate || "{author}_{date}_{time}";
          const ts = message.timestamp ? new Date(message.timestamp) : new Date();
          const dateStr = ts.toISOString().slice(0, 10);
          const timeStr = ts.toISOString().slice(11, 19).replaceAll(":", "-");
          const author = this._sanitize(message.author.username);
          const duration = audio.duration == null ? "0s" : Math.round(audio.duration) + "s";
          const channelStore = Webpack.Stores.ChannelStore;
          const channel = channelStore.getChannel(message.channel_id);
          const channelName = this._sanitize(channel?.name ?? message.channel_id);
          const result = template
               .replaceAll("{author}", author)
               .replaceAll("{date}", dateStr)
               .replaceAll("{time}", timeStr)
               .replaceAll("{duration}", duration)
               .replaceAll("{channel}", channelName)
               .replaceAll("{messageId}", message.id);
          return result + ext;
     }
     _getExtension(filename, contentType) {
          if (filename) {
               const m = filename.match(/(\.[a-z0-9]+)$/i);
               if (m) return m[1];
          }
          if (contentType) {
               const map = { "audio/ogg": ".ogg", "audio/mpeg": ".mp3", "audio/wav": ".wav", "audio/flac": ".flac", "audio/mp4": ".m4a", "audio/aac": ".aac", "audio/webm": ".webm" };
               for (const [mime, ext] of Object.entries(map)) {
                    if (contentType.startsWith(mime)) return ext;
               }
          }
          return ".ogg";
     }
     _sanitize(str) {
          return Array.from(str, c => {
               const code = c.codePointAt(0);
               return code < 0x20 || String.raw`<>:"/\|?*`.includes(c) ? "_" : c;
          }).join("").slice(0, 80);
     }
     _getDownloadFolder() {
          if (this.settings.downloadFolder) {
               try {
                    fs.accessSync(this.settings.downloadFolder, fs.constants.W_OK);
                    return this.settings.downloadFolder;
               } catch {
                    UI.showToast("Configured folder not writable, using Downloads", { type: "warning" });
               }
          }
          const home = require("process").env.USERPROFILE || require("process").env.HOME || ".";
          return path.join(home, "Downloads");
     }
     _deduplicatePath(filePath) {
          if (!fs.existsSync(filePath)) return filePath;
          const dir = path.dirname(filePath);
          const ext = path.extname(filePath);
          const base = path.basename(filePath, ext);
          let i = 1;
          while (fs.existsSync(path.join(dir, `${base} (${i})${ext}`))) i++;
          return path.join(dir, `${base} (${i})${ext}`);
     }
     copyAudioURL(url) {
          clipboard.writeText(url);
          UI.showToast("Audio URL copied to clipboard", { type: "success" });
     }
     openInBrowser(link) {
          shell.openExternal(link);
          UI.showToast(
               "Opened in browser - hit save if it doesn't auto-download.",
               { type: "success" }
          );
     }
     _encodeWav(audioBuffer) {
          const numChannels = audioBuffer.numberOfChannels;
          const sampleRate = audioBuffer.sampleRate;
          const bitDepth = 16;
          const bytesPerSample = bitDepth / 8;
          const blockAlign = numChannels * bytesPerSample;
          const samples = audioBuffer.length;
          const dataSize = samples * blockAlign;
          const bufferSize = 44 + dataSize;
          const buffer = new ArrayBuffer(bufferSize);
          const view = new DataView(buffer);
          const writeString = (offset, str) => { for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.codePointAt(i)); };
          writeString(0, 'RIFF');
          view.setUint32(4, 36 + dataSize, true);
          writeString(8, 'WAVE');
          writeString(12, 'fmt ');
          view.setUint32(16, 16, true);
          view.setUint16(20, 1, true);
          view.setUint16(22, numChannels, true);
          view.setUint32(24, sampleRate, true);
          view.setUint32(28, sampleRate * blockAlign, true);
          view.setUint16(32, blockAlign, true);
          view.setUint16(34, bitDepth, true);
          writeString(36, 'data');
          view.setUint32(40, dataSize, true);
          let offset = 44;
          for (let i = 0; i < samples; i++) {
               for (let ch = 0; ch < numChannels; ch++) {
                    const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(ch)[i]));
                    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
                    offset += 2;
               }
          }
          return Buffer.from(buffer);
     }
     async _decodeAudio(arrayBuffer) {
          const actx = new OfflineAudioContext(1, 1, 48000);
          return actx.decodeAudioData(arrayBuffer.slice(0));
     }
     async _convertToWav(arrayBuffer) {
          return this._encodeWav(await this._decodeAudio(arrayBuffer));
     }
     async _convertToM4a(arrayBuffer) {
          const audioBuffer = await this._decodeAudio(arrayBuffer);
          const ctx = new AudioContext();
          try {
               const dest = ctx.createMediaStreamDestination();
               const src = ctx.createBufferSource();
               src.buffer = audioBuffer;
               src.connect(dest);
               let mimeType = null;
               if (MediaRecorder.isTypeSupported("audio/mp4;codecs=aac")) mimeType = "audio/mp4;codecs=aac";
               else if (MediaRecorder.isTypeSupported("audio/mp4")) mimeType = "audio/mp4";
               if (!mimeType) throw new Error("M4A/AAC not supported by this browser's MediaRecorder");
               const recorder = new MediaRecorder(dest.stream, { mimeType });
               const chunks = [];
               recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
               const done = new Promise((resolve, reject) => {
                    recorder.onstop = resolve;
                    recorder.onerror = (e) => reject(e.error || new Error("MediaRecorder error"));
               });
               recorder.start();
               src.start(0);
               await new Promise(resolve => { src.onended = resolve; });
               recorder.stop();
               await done;
               const blob = new Blob(chunks, { type: mimeType });
               return Buffer.from(await blob.arrayBuffer());
          } finally {
               ctx.close();
          }
     }
     async batchDownload(channelId) {
          const MessageStore = Webpack.Stores.MessageStore;
          const msgs = MessageStore.getMessages(channelId)?._array || [];
          const audioMsgs = msgs.filter(m => this.findAudio(m));
          if (audioMsgs.length === 0) {
               UI.showToast("No audio messages found in cached messages", { type: "info" });
               return;
          }
          UI.showToast(`Downloading ${audioMsgs.length} audio file(s)\u2026`, { type: "info" });
          let success = 0;
          for (const msg of audioMsgs) {
               try {
                    const audio = this.findAudio(msg);
                    await this._downloadDirect(audio, msg);
                    success++;
               } catch (e) { Logger.error("Batch download error:", e); }
          }
          UI.showToast(`Downloaded ${success}/${audioMsgs.length} audio files`, { type: "success" });
     }
     _addToHistory(audio, message, filePath, size) {
          const history = Data.load("history") || [];
          history.unshift({
               filename: path.basename(filePath),
               filePath,
               url: audio.url,
               author: message.author.username,
               channelId: message.channel_id,
               timestamp: Date.now(),
               size
          });
          if (history.length > HISTORY_MAX) history.length = HISTORY_MAX;
          Data.save("history", history);
     }
     _formatHistoryForModal() {
          const history = Data.load("history") || [];
          if (history.length === 0) return "No downloads yet.";
          return history.slice(0, 50).map((h, i) => {
               const date = new Date(h.timestamp).toLocaleString();
               const size = h.size ? `(${(h.size / 1024).toFixed(1)} KB)` : "";
               return `${i + 1}. **${h.filename}** ${size}\n   by ${h.author || "unknown"} - ${date}`;
          }).join("\n");
     }
     _startAutoDownload() {
          this._dispatcher = Webpack.Stores.UserStore._dispatcher;
          if (!this._dispatcher) {
               Logger.warn("Dispatcher not found, auto-download unavailable");
               return;
          }
          this._onMessage = (event) => {
               const msg = event.message;
               if (!this._getAutoDownloadChannels().includes(msg.channel_id)) return;
               const audio = this.findAudio(msg);
               if (!audio) return;
               this._downloadDirect(audio, msg).catch(e => Logger.error("Auto-download failed:", e));
          };
          this._dispatcher.subscribe("MESSAGE_CREATE", this._onMessage);
     }
     _stopAutoDownload() {
          if (this._dispatcher && this._onMessage) {
               this._dispatcher.unsubscribe("MESSAGE_CREATE", this._onMessage);
               this._onMessage = null;
          }
     }
     _getAutoDownloadChannels() {
          return Data.load("autoDownloadChannels") || [];
     }
     _isAutoDownloadChannel(channelId) {
          return this._getAutoDownloadChannels().includes(channelId);
     }
     _toggleAutoDownloadChannel(channelId) {
          const channels = this._getAutoDownloadChannels();
          const idx = channels.indexOf(channelId);
          if (idx >= 0) {
               channels.splice(idx, 1);
               UI.showToast("Auto-download disabled for this channel", { type: "info" });
          } else {
               channels.push(channelId);
               UI.showToast("Auto-download enabled for this channel", { type: "success" });
          }
          Data.save("autoDownloadChannels", channels);
     }
     _playNextAudio(currentWrap) {
          if (!currentWrap) return;
          const allWraps = [...document.querySelectorAll(".ad-audio-wrap")];
          const idx = allWraps.indexOf(currentWrap);
          if (idx < 0 || idx >= allWraps.length - 1) {
               UI.showToast("Queue: No more audio messages", { type: "info", timeout: 2000 });
               this._queueMode = false;
               return;
          }
          const next = allWraps[idx + 1];
          const playBtn = next.querySelector('[class*="playButtonContainer_"]');
          if (playBtn) {
               playBtn.click();
               UI.showToast("Queue: Playing next", { type: "info", timeout: 1500 });
          } else {
               UI.showToast("Queue: Could not find play button", { type: "warning" });
          }
     }
     _patchAudioRenderers() {
          const audioMod = Webpack.getMangled(
               Filters.bySource("duration_secs", "originalItem", "waveform"),
               {
                    voiceRenderer: Filters.byStrings("durationSecs", "waveform", "playbackCacheKey"),
                    audioRenderer: Filters.combine(
                         Filters.byStrings("fileSize", "fileName", "src"),
                         Filters.not(Filters.byStrings("poster")),
                         Filters.not(Filters.byStrings("durationSecs"))
                    )
               }
          );
          if (!audioMod) {
               Logger.warn("Audio renderer module not found, inline button disabled");
               return;
          }
          const AudioToolboxControls = (props) => {
               const { children, audio, message } = props;
               const wrapRef = useRef(null);
               const [looping, setLooping] = useState(false);
               const [speed, setSpeed] = useState(1);
               const [eqPreset, setEqPreset] = useState("off");
               const [abA, setAbA] = useState(null);
               const [abB, setAbB] = useState(null);
               const getAudioEl = useCallback(() => wrapRef.current?.querySelector("audio"), []);
               useEffect(() => {
                    const el = getAudioEl();
                    if (el) el.loop = looping && abA == null;
               }, [getAudioEl, looping, abA]);
               useEffect(() => {
                    const el = getAudioEl();
                    if (!el) return;
                    const handler = () => {
                         if (speed !== 1 && el.playbackRate !== speed) el.playbackRate = speed;
                         if (looping && abA == null) el.loop = true;
                    };
                    el.addEventListener("play", handler);
                    return () => el.removeEventListener("play", handler);
               }, [getAudioEl, speed, looping, abA]);
               useEffect(() => {
                    const el = getAudioEl();
                    if (!el || abA == null || abB == null) return;
                    el.loop = false;
                    const handler = () => {
                         if (el.currentTime >= abB) {
                              el.currentTime = abA;
                              if (el.paused) el.play();
                         }
                    };
                    el.addEventListener("timeupdate", handler);
                    return () => el.removeEventListener("timeupdate", handler);
               }, [getAudioEl, abA, abB]);
               useEffect(() => {
                    const el = getAudioEl();
                    if (!el) return;
                    const handler = () => {
                         if (!this._queueMode || looping || (abA != null && abB != null)) return;
                         this._playNextAudio(wrapRef.current);
                    };
                    el.addEventListener("ended", handler);
                    return () => el.removeEventListener("ended", handler);
               }, [getAudioEl, looping, abA, abB]);
               const eqStateRef = useRef(null);
               useEffect(() => {
                    return () => {
                         const eq = eqStateRef.current;
                         if (eq) {
                              stopSourceNode(eq);
                              eq.ctx.close();
                              eqStateRef.current = null;
                         }
                    };
               }, []);
               const ensureEqContext = useCallback(async () => {
                    if (eqStateRef.current) return eqStateRef.current;
                    const res = await Net.fetch(audio.url);
                    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
                    const arrayBuf = await res.arrayBuffer();
                    const ctx = new AudioContext();
                    const buffer = await ctx.decodeAudioData(arrayBuf);
                    const filters = EQ_PRESETS.off.map(cfg => {
                         const f = ctx.createBiquadFilter();
                         applyFilterConfig(f, cfg);
                         return f;
                    });
                    const gainNode = ctx.createGain();
                    gainNode.gain.value = 1;
                    const eq = { ctx, filters, gainNode, buffer, sourceNode: null };
                    eqStateRef.current = eq;
                    return eq;
               }, [audio.url]);
               const startEqPlayback = useCallback((eq, el) => {
                    stopSourceNode(eq);
                    const src = eq.ctx.createBufferSource();
                    src.buffer = eq.buffer;
                    let chain = src;
                    for (const f of eq.filters) { chain.connect(f); chain = f; }
                    chain.connect(eq.gainNode);
                    eq.gainNode.connect(eq.ctx.destination);
                    eq.sourceNode = src;
                    const offset = el.currentTime || 0;
                    src.start(0, offset);
                    el.volume = 0;
                    src.onended = () => {
                         eq.sourceNode = null;
                    };
               }, []);
               useEffect(() => {
                    const el = getAudioEl();
                    if (!el) return;
                    const onPause = () => {
                         const eq = eqStateRef.current;
                         if (!eq || !eq.sourceNode || eqPreset === "off") return;
                         eq.ctx.suspend();
                    };
                    const onPlay = () => {
                         const eq = eqStateRef.current;
                         if (!eq || eqPreset === "off") return;
                         eq.ctx.resume();
                         startEqPlayback(eq, el);
                    };
                    const onSeeked = () => {
                         const eq = eqStateRef.current;
                         if (!eq || !eq.sourceNode || eqPreset === "off" || el.paused) return;
                         startEqPlayback(eq, el);
                    };
                    el.addEventListener("pause", onPause);
                    el.addEventListener("play", onPlay);
                    el.addEventListener("seeked", onSeeked);
                    return () => {
                         el.removeEventListener("pause", onPause);
                         el.removeEventListener("play", onPlay);
                         el.removeEventListener("seeked", onSeeked);
                    };
               }, [getAudioEl, eqPreset, startEqPlayback]);
               const applyEq = useCallback(async (preset) => {
                    const el = getAudioEl();
                    if (!el) return;
                    try {
                         if (preset === "off") {
                              const eq = eqStateRef.current;
                              if (eq) {
                                   stopSourceNode(eq);
                                   eq.ctx.suspend();
                              }
                              el.volume = 1;
                              setEqPreset("off");
                              return;
                         }
                         const eq = await ensureEqContext();
                         const cfg = EQ_PRESETS[preset] || EQ_PRESETS.off;
                         eq.filters.forEach((f, i) => applyFilterConfig(f, cfg[i]));
                         if (!el.paused) {
                              startEqPlayback(eq, el);
                         }
                         el.volume = 0;
                         setEqPreset(preset);
                    } catch (err) {
                         Logger.error("EQ error:", err);
                         UI.showToast("EQ failed: " + err.message, { type: "error" });
                    }
               }, [getAudioEl, ensureEqContext, startEqPlayback]);
               const toggleLoop = (e) => {
                    e.stopPropagation();
                    setLooping(prev => !prev);
               };
               const makeSpeedAction = (s) => { setSpeed(s); const a = getAudioEl(); if (a) a.playbackRate = s; };
               const openMenu = (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const el = getAudioEl();
                    const channelId = message.channel_id;
                    const speedItems = SPEED_OPTIONS.map(s => ({
                         type: "text", id: `ad-speed-${s}`,
                         label: `${s}x${s === speed ? " \u2713" : ""}`,
                         action: makeSpeedAction.bind(null, s)
                    }));
                    const eqItems = Object.keys(EQ_PRESETS).map(key => ({
                         type: "text", id: `ad-eq-${key}`,
                         label: `${EQ_PRESET_LABELS[key]}${key === eqPreset ? " \u2713" : ""}`,
                         action: applyEq.bind(null, key)
                    }));
                    const abItems = [
                         { type: "text", id: "ad-ab-a", label: abA == null ? "Set Point A" : `Point A: ${abA.toFixed(1)}s \u2713`, action: () => { if (el) setAbA(el.currentTime); } },
                         { type: "text", id: "ad-ab-b", label: abB == null ? "Set Point B" : `Point B: ${abB.toFixed(1)}s \u2713`, action: () => { if (el) setAbB(el.currentTime); } },
                         { type: "separator" },
                         { type: "text", id: "ad-ab-clear", label: "Clear A/B Loop", action: () => { setAbA(null); setAbB(null); } }
                    ];
                    const menu = ContextMenu.buildMenu([
                         ...this._coreAudioMenuItems(audio, message),
                         { type: "separator" },
                         { type: "submenu", id: "ad-speed", label: `Speed (${speed}x)`, items: speedItems },
                         { type: "submenu", id: "ad-eq", label: `EQ (${EQ_PRESET_LABELS[eqPreset]})`, items: eqItems },
                         { type: "submenu", id: "ad-ab", label: "A/B Loop", items: abItems },
                         { type: "separator" },
                         { type: "text", id: "ad-queue", label: this._queueMode ? "\u2713 Queue Mode" : "Queue Mode", action: () => { this._queueMode = !this._queueMode; UI.showToast(this._queueMode ? "Queue mode enabled" : "Queue mode disabled", { type: "info" }); } },
                         { type: "separator" },
                         { type: "text", id: "ad-batch", label: "Download All Audio (Cached)", action: () => this.batchDownload(channelId) },
                         { type: "text", id: "ad-auto", label: this._isAutoDownloadChannel(channelId) ? "Disable Auto-Download Here" : "Enable Auto-Download Here", action: () => this._toggleAutoDownloadChannel(channelId) }
                    ]);
                    ContextMenu.open(e, menu);
               };
               const loopSvg = createElement("svg", {
                    width: 18, height: 18, viewBox: "0 0 24 24", fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
               },
                    createElement("path", { d: "M17 2l4 4-4 4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                    createElement("path", { d: "M3 11v-1a4 4 0 014-4h14", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                    createElement("path", { d: "M7 22l-4-4 4-4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                    createElement("path", { d: "M21 13v1a4 4 0 01-4 4H3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
               );
               const threeDotSvg = createElement("svg", {
                    width: 18, height: 18, viewBox: "0 0 24 24", fill: "none",
                    xmlns: "http://www.w3.org/2000/svg"
               },
                    createElement("path", {
                         d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z",
                         fill: "currentColor"
                    })
               );
               const loopBtn = createElement("button", {
                    className: "ad-download-btn" + (looping ? " ad-loop-active" : ""),
                    "aria-label": looping ? "Loop: On" : "Loop: Off",
                    title: looping ? "Loop: On" : "Loop: Off",
                    onClick: toggleLoop
               }, loopSvg);
               const menuBtn = createElement("button", {
                    className: "ad-download-btn",
                    "aria-label": "Audio Toolbox options",
                    onClick: openMenu
               }, threeDotSvg);
               return createElement("div", { ref: wrapRef, className: "ad-audio-wrap" }, children, loopBtn, menuBtn);
          }
          const wrapWithButton = (returnValue, props) => {
               if (!returnValue || !props.item?.originalItem) return returnValue;
               const att = props.item.originalItem;
               const message = props.message;
               const audio = {
                    url: att.url,
                    filename: att.filename ?? "voice-message.ogg",
                    duration: att.duration_secs,
                    size: att.size,
                    contentType: att.content_type
               };
               return createElement(AudioToolboxControls, { audio, message }, returnValue);
          };
          if (audioMod.voiceRenderer) {
               Patcher.after(audioMod, "voiceRenderer", (_, args, returnValue) => {
                    return wrapWithButton(returnValue, args[0]);
               });
               log("Patched voice message renderer");
          }
          if (audioMod.audioRenderer) {
               Patcher.after(audioMod, "audioRenderer", (_, args, returnValue) => {
                    return wrapWithButton(returnValue, args[0]);
               });
               log("Patched audio renderer");
          }
     }
};