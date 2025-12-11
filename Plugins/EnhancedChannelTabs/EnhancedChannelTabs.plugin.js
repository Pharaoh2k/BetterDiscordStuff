/**
 * @name EnhancedChannelTabs
 * @author Pharaoh2k, samfundev, l0c4lh057, CarJem Generations
 * @description Allows you to have multiple tabs and bookmark channels.
 * @version 4.1.3
 * @authorId 874825550408089610
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/EnhancedChannelTabs/EnhancedChannelTabs.plugin.js
 */
// SPDX-License-Identifier: GPL-3.0-only AND MIT
/*
  Copyright (C) 2025-present Pharaoh2k
  This file is part of EnhancedChannelTabs and is licensed under the
  GNU General Public License version 3 only.
  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU General Public License as published by the
  Free Software Foundation, version 3.
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License
  along with this program. If not, see <https://www.gnu.org/licenses/>.
*/
/* ---- Upstream MIT notice ----
Copyright (c) 2023-2025 samfundev, 2023 l0c4lh057, 2020-2023 CarJem Generations
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
---- end MIT notice ---- */
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
		this.notification?.close?.();
		const handle = BdApi.UI.showNotification?.({
			title: `${this.name}`,
			content: `v${version} is available`,
			type: "info",
			duration: 60000,
			actions: [
				{
					label: "Update",
					onClick: () => {
						handle?.close?.();
						this.applyUpdate(text, version);
					},
				},
				{
					label: "Dismiss",
					onClick: () => handle?.close?.(),
				},
			],
			onClose: () => {
				if (this.notification === handle) this.notification = null;
			},
		}) ?? BdApi.UI.showNotice(
			`${this.name} v${version} is available`,
			{
				type: 'info',
				buttons: [{
					label: 'Update',
					onClick: (closeOrEvent) => {
						if (typeof closeOrEvent === 'function') {
							closeOrEvent();
						} else if (this.notification && typeof this.notification === 'function') {
							this.notification();
						}
						this.applyUpdate(text, version);
					}
				}, {
					label: 'Dismiss',
					onClick: (closeOrEvent) => {
						if (typeof closeOrEvent === 'function') {
							closeOrEvent();
						} else if (this.notification && typeof this.notification === 'function') {
							this.notification();
						}
					}
				}]
			}
		);
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
		if (last === this.version) return;
		BdApi.Data.save(this.name, 'version', this.version);
		if (!last) return;
		try {
			const res = await BdApi.Net.fetch(this.urls.changelog);
            if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			if (changes.length === 0) return;
			BdApi.UI.showChangelogModal({
				title: this.name,
				subtitle: `Version ${this.version}`,
				changes
			});
        } catch { /* Changelog fetch failed, ignore */ }
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
class StyleManager {
	static getCompactVariables() {
		return `
			:root { --channelTabs-tabHeight: 22px; --channelTabs-favHeight: 22px; --channelTabs-tabNameFontSize: 12px; --channelTabs-openTabSize: 18px; }
		`;
	}
	static getCozyVariables() {
		return `
			:root { --channelTabs-tabHeight: 32px; --channelTabs-favHeight: 28px; --channelTabs-tabNameFontSize: 13px; --channelTabs-openTabSize: 24px; }
		`;
	}
	static getConstantVariables(tabWidthMin) {
		return `
			:root { --channelTabs-tabWidth: 220px; --channelTabs-tabWidthMin: ${tabWidthMin}px; }
		`;
	}
	static getPrivacyStyle() {
		return `
			#app-mount .channelTabs-favGroupBtn { color: transparent !important; }
			#app-mount .channelTabs-tabName { color: transparent; background-color: var(--interactive-text-default); opacity: 0.5; }
			#app-mount .channelTabs-selected .channelTabs-tabName { background-color: var(--interactive-text-active); }
			#app-mount .channelTabs-favName { color: transparent; background-color: var(--interactive-text-default); opacity: 0.5; }
		`;
	}
	static getRadialStatusStyle() {
		return `
			.channelTabs-tabIconWrapper,
			.channelTabs-favIconWrapper { overflow: visible; }
			.channelTabs-tabIconWrapper img[src*="com/avatars/"],
			.channelTabs-favIconWrapper img[src*="com/avatars/"] { -webkit-clip-path: inset(1px round 50%); clip-path: inset(2px round 50%); }
			.channelTabs-tabIconWrapper rect,
			.channelTabs-favIconWrapper rect { x: 0; y: 0; rx: 50%; ry: 50%; -webkit-mask: none; mask: none; fill: none; height: 20px; width: 20px; stroke-width: 2px; }
			.channelTabs-onlineIcon { stroke: var(--status-online); }
			.channelTabs-idleIcon { stroke: var(--status-idle); }
			.channelTabs-doNotDisturbIcon { stroke: var(--status-danger); }
			.channelTabs-offlineIcon { stroke: var(--status-offline); }
		`;
	}
	static getTabNavStyle() {
		return `
			.channelTabs-tabContainer .channelTabs-tabNav { display: flex; margin: 0 var(--space-6) 3px 0; gap: var(--space-4); }
			.channelTabs-tabNavClose svg { transform: scale(0.75); }
			.channelTabs-tabNavLeft svg,
			.channelTabs-tabNavRight svg { transform: scale(0.6); }
			.channelTabs-tabContainer .channelTabs-tabNav>div:hover { color: var(--interactive-text-hover); background-color: var(--background-modifier-hover); }
			.channelTabs-tabContainer .channelTabs-tabNav>div:active { color: var(--interactive-text-active); background-color: var(--background-modifier-active); }
			.channelTabs-tabContainer[data-tab-count="1"] .channelTabs-tabNav>.channelTabs-tabNavClose { color: var(--interactive-muted); background: none; }
			.channelTabs-tabNav>div { display: flex; align-items: center; justify-content: center; height: var(--channelTabs-tabHeight); width: 32px; border-radius: var(--radius-xs); color: var(--interactive-text-default); }
		`;
	}
	static getBaseStyle(noDragClasses, systemBarClasses) {
		return `
			.channelTabs-input .bd-text-input { border: 1px solid var(--input-border); width: 100%; }
			.channelTabs-tabNav { display:none; }
			div:has(> div > #channelTabs-container) { grid-template-rows: [top] auto [titleBarEnd] min-content [noticeEnd] 1fr [end]; }
			${noDragClasses.map((x) => `.${x}`).join(", ")} { -webkit-app-region: no-drag; }
			.${systemBarClasses.systemBar}, .channelTabs-trailing { --custom-app-top-bar-height: 32px; }
			#channelTabs-container { z-index: 1000; background: none; flex: 1; max-width: 100vw; }
			.channelTabs-tabContainer { display: flex; align-items: center; }
			.channelTabs-trailing { display: flex; align-items: center; gap: var(--space-12); margin-left: auto; }
			.channelTabs-tabContainer > *, .channelTabs-favContainer > * { -webkit-app-region: no-drag; }
			#channelTabs-container>:not(#channelTabs-settingsMenu)+div { padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); }
			/* Tabs */
			.channelTabs-tab { position: relative; display: flex; align-items: center; height: var(--channelTabs-tabHeight); background: none; border-radius: var(--radius-xs); max-width: var(--channelTabs-tabWidth); min-width: var(--channelTabs-tabWidthMin); flex: 1 1 var(--channelTabs-tabWidthMin); margin-bottom: 3px; }
			.channelTabs-tab:focus-visible { box-shadow: 0 0 0 2px var(--focus-primary); outline: none; }
			.channelTabs-tab>div:first-child { display: flex; width: calc(100% - 16px); align-items: center; }
			.channelTabs-tab:not(.channelTabs-selected):hover { background: var(--background-modifier-hover); }
			.channelTabs-tab:not(.channelTabs-selected):active { background: var(--background-modifier-active); }
			.channelTabs-tab.channelTabs-selected { background: var(--background-modifier-selected); }
			.channelTabs-tab.channelTabs-unread:not(.channelTabs-selected),
			.channelTabs-tab.channelTabs-mention:not(.channelTabs-selected) { color: var(--interactive-text-hover); }
			.channelTabs-tab.channelTabs-unread:not(.channelTabs-selected):hover,
			.channelTabs-tab.channelTabs-mention:not(.channelTabs-selected):hover { color: var(--interactive-text-active); }
			.channelTabs-dragging { opacity: 0.5; }
			.channelTabs-drop-before::before,
			.channelTabs-drop-after::before { content: ""; position: absolute; top: 0; bottom: 0; width: 2px; background-color: var(--brand-500); z-index: 10; }
			.channelTabs-drop-before::before { left: 0; }
			.channelTabs-drop-after::before { right: 0; }
			html:not(.platform-win) #channelTabs-settingsMenu { margin-right: 0; }
			#channelTabs-settingsMenu { display: flex; justify-content: center; align-items: center; width: 32px; height: 32px; z-index: 1000; cursor: pointer; border-radius: var(--radius-xs); }
			#channelTabs-settingsMenu:hover { background: var(--background-modifier-hover); }
			.channelTabs-settingsIcon { width: 20px; height: 20px; }
			.channelTabs-tab .channelTabs-tabName { margin-right: var(--space-6); font-size: var(--channelTabs-tabNameFontSize); line-height: normal; color: var(--interactive-text-default); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
			.channelTabs-tab:not(.channelTabs-selected):hover .channelTabs-tabName { color: var(--interactive-text-hover); }
			.channelTabs-tab:not(.channelTabs-selected):active .channelTabs-tabName,
			.channelTabs-tab.channelTabs-selected .channelTabs-tabName { color: var(--interactive-text-active); }
			/* Icons */
			.channelTabs-tabIcon { height: 20px; border-radius: 50%; -webkit-user-drag: none; }
			.channelTabs-tabIconWrapper { margin: 0 var(--space-6); flex-shrink: 0; }
			.channelTabs-onlineIcon { fill: var(--status-online); mask: url(#svg-mask-status-online); }
			.channelTabs-idleIcon { fill: var(--status-idle); mask: url(#svg-mask-status-idle); }
			.channelTabs-doNotDisturbIcon { fill: var(--status-danger); mask: url(#svg-mask-status-dnd); }
			.channelTabs-offlineIcon { fill: var(--status-offline); mask: url(#svg-mask-status-offline); }
			.channelTabs-closeTab { position: relative; height: 16px; width: 16px; flex-shrink: 0; right: 6px; border-radius: var(--radius-xs); color: var(--interactive-text-default); cursor: pointer; display: flex; align-items: center; justify-content: center; }
			.channelTabs-closeTab svg { height: 100%; width: 100%; transform: scale(0.85); }
			.channelTabs-closeTab:hover { background: var(--status-danger); color: var(--white-100); }
			.channelTabs-newTab { display: flex; align-items: center; justify-content: center; flex-shrink: 0; height: var(--channelTabs-openTabSize); width: 24px; margin: 0 var(--space-6) 3px var(--space-6); border-radius: var(--radius-xs); cursor: pointer; color: var(--interactive-text-default); margin-right: var(--space-6); }
			.channelTabs-newTab:hover { background: var(--background-modifier-hover); color: var(--interactive-text-hover); }
			.channelTabs-newTab:active { background: var(--background-modifier-active); color: var(--interactive-text-active); }
			.channelTabs-tabListDropdown { display: flex; align-items: center; justify-content: center; flex-shrink: 0; height: var(--channelTabs-openTabSize); width: 24px; margin: 0 64px 3px 0; border-radius: var(--radius-xs); cursor: pointer; color: var(--interactive-text-default); }
			.channelTabs-tabListDropdown:hover { background: var(--background-modifier-hover); color: var(--interactive-text-hover); }
			.channelTabs-tabListDropdown:active { background: var(--background-modifier-active); color: var(--interactive-text-active); }
			.channelTabs-tabListDropdown svg { width: 16px; height: 16px; }
			/* Badges */
			.channelTabs-gridContainer { display: flex; margin-right: var(--space-6); gap: var(--space-4); align-items: center; }
			.channelTabs-mentionBadge,
			.channelTabs-unreadBadge { border-radius: var(--radius-sm); padding: 0 4px; min-width: 8px; width: fit-content; height: 16px; font-size: 12px; line-height: 16px; font-weight: 600; text-align: center; color: var(--white-100); }
			.channelTabs-typingBadge { border-radius: var(--radius-sm); padding-left: 4px; padding-right: 4px; min-width: 8px; width: fit-content; height: 16px; font-size: 12px; line-height: 16px; font-weight: 600; text-align: center; color: var(--white-100); }
			.channelTabs-mentionBadge { background-color: var(--status-danger); }
			.channelTabs-unreadBadge { background-color: var(--badge-brand-bg); color: var(--badge-brand-text); }
			/* Legacy alignment classes - now flex order */
			.channelTabs-classicBadgeAlignment { margin-right: var(--space-6); }
			.channelTabs-badgeAlignLeft { order: -1; }
			.channelTabs-badgeAlignRight { order: 1; }
			.channelTabs-tab .channelTabs-mentionBadge,
			.channelTabs-tab .channelTabs-unreadBadge,
			.channelTabs-tab .channelTabs-typingBadge { height: 16px; }
			/* Empty State Badges */
			.channelTabs-tab .channelTabs-noMention,
			.channelTabs-tab .channelTabs-noUnread,
			.channelTabs-fav .channelTabs-noMention,
			.channelTabs-fav .channelTabs-noUnread,
			.channelTabs-favGroupBtn .channelTabs-noMention,
			.channelTabs-favGroupBtn .channelTabs-noUnread { background-color: var(--bg-surface-raised, var(--background-secondary)); color: var(--text-muted); }
			.channelTabs-fav .channelTabs-mentionBadge,
			.channelTabs-fav .channelTabs-unreadBadge,
			.channelTabs-favGroupBtn .channelTabs-mentionBadge,
			.channelTabs-favGroupBtn .channelTabs-unreadBadge { display: inline-block; vertical-align: bottom; margin-left: 5px; }
			.channelTabs-fav .channelTabs-typingBadge,
			.channelTabs-favGroupBtn .channelTabs-typingBadge { display: inline-flex; vertical-align: bottom; margin-left: 5px; }
			.channelTabs-fav .channelTabs-noTyping,
			.channelTabs-favGroupBtn .channelTabs-noTyping { display: none; }
			/* Favorites */
			.channelTabs-fav .channelTabs-favName + div { margin-left: var(--space-6); }
			.channelTabs-favStar { display: flex; align-items: center; justify-content: flex-end; width: 28px; height: var(--channelTabs-favHeight); flex-shrink: 0; color: var(--interactive-text-default); }
			.channelTabs-favStarIcon { width: 20px; height: 20px; opacity: 0.9; }
			.channelTabs-favContainer { display: flex; align-items: center; flex-wrap: wrap; -webkit-app-region: drag; }
			.channelTabs-fav { position: relative; display: flex; align-items: center; min-width: 0; border-radius: var(--radius-xs); height: var(--channelTabs-favHeight); background: none; flex: 0 0 1; max-width: var(--channelTabs-tabWidth); margin-bottom: 3px; padding-left: var(--space-6); padding-right: var(--space-6); }
			.channelTabs-fav:hover { background: var(--background-modifier-hover); }
			.channelTabs-fav:active { background: var(--background-modifier-active); }
			.channelTabs-favIcon { height: 20px; border-radius: 50%; -webkit-user-drag: none; }
			.channelTabs-favName { margin-left: var(--space-6); font-size: var(--channelTabs-tabNameFontSize); line-height: normal; color: var(--interactive-text-default); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
			.channelTabs-fav:hover .channelTabs-favName { color: var(--interactive-text-hover); }
			.channelTabs-fav:active .channelTabs-favName { color: var(--interactive-text-active); }
			.channelTabs-noFavNotice { color: var(--text-muted); font-size: 14px; padding: 3px; }
			.channelTabs-favGroupBtn { display: flex; align-items: center; min-width: 0; border-radius: var(--radius-xs); height: var(--channelTabs-favHeight); flex: 0 1 1; max-width: var(--channelTabs-tabWidth); padding: 0 var(--space-6); font-size: 12px; color: var(--interactive-text-default); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; margin-bottom: 3px; }
			.channelTabs-favGroupBtn>:first-child { margin-left: var(--space-6); }
			.channelTabs-favGroup { position: relative; }
			.channelTabs-favGroup:hover .channelTabs-favGroupBtn { background: var(--background-modifier-hover); }
			.channelTabs-favGroup-content { z-index: 1001; display: none; position: absolute; min-width: max-content; background-color: var(--background-surface-high); box-shadow: var(--shadow-high); border-radius: var(--radius-xs); padding: var(--space-4); left: calc(100% + 6px); top: 0; }
			.channelTabs-favGroup-content>:last-child { margin-bottom: 0; }
			.channelTabs-favGroupShow { display: block; }
			/* Drop Styles */
			.channelTabs-favGroup.channelTabs-drop-inside.channelTabs-dropStyle-accentGlow { box-shadow: 0 0 0 2px var(--brand-500); transform: translateY(-2px) scale(1.02); transition: transform 120ms ease, box-shadow 120ms ease; }
			.channelTabs-favGroup.channelTabs-drop-inside.channelTabs-dropStyle-accentGlow .channelTabs-favGroupBtn svg { color: var(--brand-500); filter: drop-shadow(0 0 4px rgba(88,101,242,0.35)); }
			.channelTabs-favGroup.channelTabs-drop-inside.channelTabs-dropStyle-underlineSweep::after { content: ""; position: absolute; left: 8px; right: 8px; bottom: 2px; height: 2px; background: var(--brand-500); transform-origin: left; transform: scaleX(1); transition: transform 120ms ease; }
			.channelTabs-favGroup.channelTabs-drop-inside.channelTabs-dropStyle-slotHighlight { box-shadow: inset 0 0 0 1px var(--brand-500); background: linear-gradient(120deg, rgba(88,101,242,0.08), rgba(88,101,242,0.04)); }
			.channelTabs-favGroup.channelTabs-drop-inside.channelTabs-dropStyle-iconPulse .channelTabs-favGroupBtn svg { color: var(--brand-500); animation: channelTabs-pulse 0.8s ease-in-out infinite alternate; }
			.channelTabs-favGroup.channelTabs-drop-inside.channelTabs-dropStyle-gradientEdge::before { content: ""; position: absolute; inset: 0; border-radius: 6px; background: linear-gradient(90deg, transparent, rgba(88,101,242,0.25), transparent); opacity: 0.9; pointer-events: none; }
			@media (prefers-reduced-motion: no-preference) {
				@keyframes channelTabs-pulse { from { filter: drop-shadow(0 0 0 rgba(88,101,242,0)); opacity: 0.9; } to { filter: drop-shadow(0 0 6px rgba(88,101,242,0.45)); opacity: 1; } }
			}
			.channelTabs-sliderContainer { display: flex; justify-content: center; padding: 4px 8px; margin: 2px 6px 12px 6px; border-radius: var(--radius-sm); }
			.channelTabs-slider { position: relative; top: -14px; }
			.channelTabs-minimized { --channelTabs-tabWidth: fit-content; --channelTabs-tabWidthMin: fit-content; }
			.channelTabs-tab.channelTabs-minimized>div>:first-child~*,
			.channelTabs-fav.channelTabs-minimized>svg:first-child~*,
			.channelTabs-tab.channelTabs-minimized>.channelTabs-closeTab { display: none; }
			[aria-label="Open Quick Switcher"] { pointer-events: none !important; position: absolute !important; z-index: -1 !important; }
			/* Tab List Menu Items (De-inlined) */
			.channelTabs-tabListMenuItem { display: flex; align-items: center; width: 100%; min-height: 26px; cursor: pointer; position: relative; z-index: 1000; border-radius: var(--radius-xs); padding: var(--space-4); }
			.channelTabs-tabListMenuItem:hover { background-color: var(--background-modifier-hover); }
			.channelTabs-tabListMenuIcon { width: 18px; height: 18px; margin-right: 10px; border-radius: 50%; flex-shrink: 0; }
			.channelTabs-tabListMenuName { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; padding-right: 8px; }
			.channelTabs-tabListBadgeContainer { display: flex; gap: var(--space-4); flex-shrink: 0; margin-right: 4px; }
			/* Closed Tabs Modal (De-inlined) */
			.channelTabs-closedTabsContainer { max-height: 400px; overflow-y: auto; padding: var(--space-10); }
			.channelTabs-closedTabsEmpty { text-align: center; color: var(--text-muted); padding: 20px; }
			.channelTabs-closedTabItem { padding: var(--space-10); border-bottom: 1px solid var(--border-subtle); cursor: pointer; display: flex; align-items: center; gap: 10px; border-radius: var(--radius-xs); }
			.channelTabs-closedTabItem:hover { background-color: var(--background-modifier-hover); }
			.channelTabs-closedTabIcon { width: 20px; height: 20px; border-radius: 50%; }
			.channelTabs-closedTabInfo { flex: 1; }
			.channelTabs-closedTabName { font-weight: 500; }
			.channelTabs-closedTabMeta { font-size: 12px; color: var(--text-muted); }
			.channelTabs-closedTabButton { padding: 4px 12px; border-radius: var(--radius-xs); border: none; background: var(--button-filled-brand-background); color: var(--white-100); cursor: pointer; font-size: 13px; }
			/* Utility Classes */
			.channelTabs-shortcutLabelKeys { color: var(--text-muted); padding: 8px; font-size: 12px; white-space: pre-wrap; }
			.channelTabs-minimumTabWidthLabel { pointer-events: none; }
			.channelTabs-menuSeparator { margin: 2px 0; height: 1px; background-color: var(--background-accent); }
			.channelTabs-typingBadgeAlignment { opacity: 0.7; }
		`;
	}
	static getMultiRowStyles() {
		return `
			.channelTabs-tabContainer[data-multiline="true"] .channelTabs-tabWrap { display: flex !important; flex-wrap: wrap !important; align-content: flex-start; row-gap: var(--channelTabs-rowGap, 3px); column-gap: 0; overflow: visible !important; transition: height 0.3s ease, opacity 0.3s ease; contain: layout paint; }
			.channelTabs-tabContainer[data-multiline="true"] .channelTabs-tabWrapper { flex-shrink: 1 !important; }
			.channelTabs-tabContainer[data-multiline="true"] .channelTabs-tab { flex: 1 1 clamp(var(--channelTabs-tabWidthMin, 100px), 20vw, var(--channelTabs-tabWidth, 220px)); min-width: var(--channelTabs-tabWidthMin, 100px); }
			.channelTabs-tabContainer:not([data-multiline="true"]) .channelTabs-tabWrap { flex-wrap: nowrap !important; overflow-x: auto !important; overflow-y: hidden !important; scrollbar-width: none; }
			.channelTabs-tabContainer:not([data-multiline="true"]) .channelTabs-tabWrap::-webkit-scrollbar { display: none; }
			.channelTabs-tabContainer { transition: margin 0.3s ease, padding 0.3s ease; }
		`;
	}
	static getTabListMenuStyle() {
		return `
			[id^="popout_"] [role="menu"] { min-width: 300px !important; max-width: 420px !important; }
			[id^="popout_"] [role="separator"] { margin: 2px 0; height: 1px; }
			[id^="popout_"] [role="menuitem"] { pointer-events: auto; position: relative; z-index: 1; }
		`;
	}
	static getTabListMenuNameStyle(isSelected) {
		return {
			fontWeight: isSelected ? "700" : "normal"
		};
	}
	static getDropdownMenuPosition(buttonRect) {
		return {
			zIndex: "9999",
			pointerEvents: "auto",
			position: "fixed",
			top: (buttonRect.bottom + 8) + "px",
			right: (window.innerWidth - buttonRect.right) + "px",
			left: "auto"
		};
	}
}
let pluginMeta;
const { ContextMenu, Patcher, Webpack, React, DOM, ReactUtils, UI, Hooks, Utils } = new BdApi(
	"ChannelTabs",
);
const Store = Utils?.Store ?? class {
	constructor() {
		this.listeners = new Set();
		this._state = {};
	}
	get state() {
		return this._state;
	}
	set state(s) {
		this._state = s;
		this.emitChange();
	}
	getState() {
		return this.state;
	}
	setState(s) {
		this.state = {
			...this.state,
			...(typeof s === "function" ? s(this.state) : s),
		};
	}
	emitChange() {
		for (const listener of this.listeners) {
			listener();
		}
	}
	addChangeListener(listener) {
		this.listeners.add(listener);
	}
	removeChangeListener(listener) {
		this.listeners.delete(listener);
	}
};
const { Data } = BdApi;
const TabStateStore = new Store();
TabStateStore.state = {
	tabs: [],
	favs: [],
	favGroups: [],
	closedTabs: [],
	selectedTabIndex: 0,
	tabLayoutMode: "single",
	showTabBar: true,
	showFavBar: true,
	showFavUnreadBadges: true,
	showFavMentionBadges: true,
	showFavTypingBadge: true,
	showEmptyFavBadges: false,
	showTabUnreadBadges: true,
	showTabMentionBadges: true,
	showTabTypingBadge: true,
	showEmptyTabBadges: false,
	showActiveTabUnreadBadges: false,
	showActiveTabMentionBadges: false,
	showActiveTabTypingBadge: false,
	showEmptyActiveTabBadges: false,
	showFavGroupUnreadBadges: true,
	showFavGroupMentionBadges: true,
	showFavGroupTypingBadge: true,
	showEmptyFavGroupBadges: false,
	compactStyle: false,
	privacyMode: false,
	radialStatusMode: false,
	tabWidthMin: 100,
	showQuickSettings: true,
	showNavButtons: true,
	alwaysFocusNewTabs: false,
	useStandardNav: false,
	reopenLastChannel: false,
	folderDropStyle: "accentGlow",
};
TabStateStore.getState = () => TabStateStore.state;
TabStateStore.setState = (partial) => {
	const patch = typeof partial === "function" ? partial(TabStateStore.state) : partial;
	TabStateStore.state = { ...TabStateStore.state, ...patch };
	TabStateStore.emitChange();
};
const clampIndex = (index, max) => Math.min(Math.max(index, 0), Math.max(max, 0));
const resolveSelectedIndex = (tabs, fallbackIndex = 0) => {
	const selectedIndex = tabs.findIndex((tab) => tab?.selected);
	if (selectedIndex !== -1) return selectedIndex;
	return clampIndex(fallbackIndex ?? 0, tabs.length - 1);
};
const generateTabId = () => `tab-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const ensureTabId = (tab) => tab.id ? tab : { ...tab, id: generateTabId() };
const updateTabs = (updater) => {
	TabStateStore.setState((state) => {
		const result = updater(state.tabs, state);
		const tabs = Array.isArray(result) ? result : result?.tabs;
		if (!Array.isArray(tabs)) return {};
		const explicitIndex = (result && typeof result === "object" && "selectedTabIndex" in result)
			? result.selectedTabIndex
			: null;
		let selectedTabIndex = explicitIndex;
		if (!Number.isInteger(selectedTabIndex) || selectedTabIndex < 0 || selectedTabIndex >= tabs.length) {
			selectedTabIndex = resolveSelectedIndex(tabs, state.selectedTabIndex);
		}
		return { ...result, tabs, selectedTabIndex };
	});
};
const updateFavs = (updater) => {
	TabStateStore.setState((state) => ({ favs: updater(state.favs, state) }));
};
const updateFavGroups = (updater) => {
	TabStateStore.setState((state) => ({ favGroups: updater(state.favGroups, state) }));
};
const updateClosedTabs = (updater) => {
	TabStateStore.setState((state) => ({ closedTabs: updater(state.closedTabs || [], state) }));
};
const updateStoreValues = (patch) => TabStateStore.setState(patch);
const STORE_SETTING_KEYS = [
	"showTabBar",
	"showFavBar",
	"tabLayoutMode",
	"folderDropStyle",
	"showFavUnreadBadges",
	"showFavMentionBadges",
	"showFavTypingBadge",
	"showEmptyFavBadges",
	"showTabUnreadBadges",
	"showTabMentionBadges",
	"showTabTypingBadge",
	"showEmptyTabBadges",
	"showActiveTabUnreadBadges",
	"showActiveTabMentionBadges",
	"showActiveTabTypingBadge",
	"showEmptyActiveTabBadges",
	"showFavGroupUnreadBadges",
	"showFavGroupMentionBadges",
	"showFavGroupTypingBadge",
	"showEmptyFavGroupBadges",
	"compactStyle",
	"privacyMode",
	"radialStatusMode",
	"tabWidthMin",
	"showQuickSettings",
	"showNavButtons",
	"alwaysFocusNewTabs",
	"useStandardNav",
	"reopenLastChannel",
];
const debounce = (fn, wait = 250) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), wait);
	};
};
const DEFAULT_PARENT_ID = -1;
const ensureGroupParent = (group) => ({
	...group,
	parentId: group.parentId ?? DEFAULT_PARENT_ID,
});
const normalizeParentId = (parentId) => parentId ?? DEFAULT_PARENT_ID;
const entryIsGroup = (entry) => entry?.type === "group";
const entriesMatch = (a, b) => {
	if (!a || !b || a.type !== b.type) return false;
	if (entryIsGroup(a)) return a.groupId === b.groupId || a.groupIndex === b.groupIndex;
	return a.favIndex === b.favIndex || a.url === b.url;
};
const buildParentEntries = (favs, favGroups, parentId = DEFAULT_PARENT_ID) => {
	let fallback = 0;
	const normalizedParent = normalizeParentId(parentId);
	const entries = [];
	for (let groupIndex = 0; groupIndex < favGroups.length; groupIndex++) {
		const group = favGroups[groupIndex];
		if (normalizeParentId(group?.parentId) !== normalizedParent) continue;
		entries.push({
			type: "group",
			groupId: group?.groupId,
			groupIndex,
			sortOrder: Number.isFinite(group?.sortOrder) ? group.sortOrder : null,
			fallback: fallback++,
		});
	}
	for (let favIndex = 0; favIndex < favs.length; favIndex++) {
		const fav = favs[favIndex];
		if (normalizeParentId(fav?.groupId) !== normalizedParent) continue;
		entries.push({
			type: "fav",
			favIndex,
			url: fav?.url,
			sortOrder: Number.isFinite(fav?.sortOrder) ? fav.sortOrder : null,
			fallback: fallback++,
		});
	}
	entries.sort((a, b) => {
		const aOrder = Number.isFinite(a.sortOrder) ? a.sortOrder : a.fallback;
		const bOrder = Number.isFinite(b.sortOrder) ? b.sortOrder : b.fallback;
		if (aOrder !== bOrder) return aOrder - bOrder;
		return a.fallback - b.fallback;
	});
	return entries;
};
const applyEntryOrder = (parentId, entries, favs, favGroups) => {
	for (let index = 0; index < entries.length; index++) {
		const entry = entries[index];
		if (entryIsGroup(entry)) {
			const current = favGroups[entry.groupIndex];
			if (current) favGroups[entry.groupIndex] = { ...current, parentId, sortOrder: index };
		} else {
			const current = favs[entry.favIndex];
			if (current) favs[entry.favIndex] = { ...current, groupId: parentId, sortOrder: index };
		}
	}
};
const normalizeEntryOrders = (favs, favGroups) => {
	const normalizedFavs = favs.map((fav) => ({ ...fav, groupId: normalizeParentId(fav?.groupId) }));
	const normalizedGroups = favGroups.map((group) => ({ ...group, parentId: normalizeParentId(group?.parentId) }));
	const parents = new Set([DEFAULT_PARENT_ID]);
	for (const fav of normalizedFavs) parents.add(normalizeParentId(fav?.groupId));
	for (const group of normalizedGroups) parents.add(normalizeParentId(group?.parentId));
	for (const parentId of parents) {
		const entries = buildParentEntries(normalizedFavs, normalizedGroups, parentId);
		applyEntryOrder(parentId, entries, normalizedFavs, normalizedGroups);
	}
	return { favs: normalizedFavs, favGroups: normalizedGroups };
};
const moveEntryToParentIndex = (entry, targetParentId, targetIndex, favs, favGroups) => {
	const parentId = normalizeParentId(targetParentId);
	const normalizedFavs = [...favs];
	const normalizedGroups = [...favGroups].map(ensureGroupParent);
	const sourceParentId = entryIsGroup(entry)
		? normalizeParentId(normalizedGroups[entry.groupIndex]?.parentId)
		: normalizeParentId(normalizedFavs[entry.favIndex]?.groupId);
	const filteredTarget = buildParentEntries(normalizedFavs, normalizedGroups, parentId)
		.filter((candidate) => !entriesMatch(candidate, entry));
	const insertAt = clampIndex(targetIndex, filteredTarget.length);
	if (entryIsGroup(entry)) {
		const current = normalizedGroups[entry.groupIndex];
		if (current) normalizedGroups[entry.groupIndex] = { ...current, parentId };
	} else {
		const current = normalizedFavs[entry.favIndex];
		if (current) normalizedFavs[entry.favIndex] = { ...current, groupId: parentId };
	}
	filteredTarget.splice(insertAt, 0, entry);
	applyEntryOrder(parentId, filteredTarget, normalizedFavs, normalizedGroups);
	if (sourceParentId !== parentId) {
		const sourceEntries = buildParentEntries(normalizedFavs, normalizedGroups, sourceParentId);
		applyEntryOrder(sourceParentId, sourceEntries, normalizedFavs, normalizedGroups);
	}
	return { favs: normalizedFavs, favGroups: normalizedGroups };
};
const TabActions = (() => {
	const pluginRef = { current: null };
	let historyNavigation = false;
	const resolveFavIndex = (favKey) => {
		const favs = TabStateStore.getState().favs || [];
		return favs.findIndex((fav) => fav && (fav.id === favKey || fav.url === favKey));
	};
	const persistState = () => {
		pluginRef.current?.saveSettings?.();
	};
	const resolveEntryForState = (entry, state) => {
		if (entryIsGroup(entry)) {
			const resolvedIndex = entry.groupIndex ?? state.favGroups.findIndex((g) => g?.groupId === entry.groupId);
			const resolvedGroup = state.favGroups[resolvedIndex];
			return {
				...entry,
				groupIndex: resolvedIndex,
				groupId: entry.groupId ?? resolvedGroup?.groupId,
			};
		}
		const resolvedIndex = entry.favIndex ?? state.favs.findIndex((f) => f?.url === entry.url);
		const resolvedFav = state.favs[resolvedIndex];
		return {
			...entry,
			favIndex: resolvedIndex,
			url: entry.url ?? resolvedFav?.url,
		};
	};
	const moveEntryOrdered = (entry, targetParentId, targetIndex) => {
		TabStateStore.setState((state) => {
			const resolved = resolveEntryForState(entry, state);
			if (entryIsGroup(resolved)) {
				if (resolved.groupIndex == null || resolved.groupIndex < 0) return {};
			} else if (resolved.favIndex == null || resolved.favIndex < 0) {
				return {};
			}
			const { favs, favGroups } = moveEntryToParentIndex(
				resolved,
				targetParentId,
				targetIndex,
				state.favs,
				state.favGroups
			);
			return { favs, favGroups };
		});
		persistState();
	};
	const ensureHistory = (tab) => {
		if (tab.history && Array.isArray(tab.history)) {
			if (tab.historyIndex == null) return { ...tab, historyIndex: tab.history.length - 1 };
			return tab;
		}
		return { ...tab, history: [tab.url], historyIndex: 0 };
	};
	const applySelection = (nextTabs, targetIndex) => {
		const clampedIndex = clampIndex(targetIndex, nextTabs.length - 1);
		const normalized = nextTabs.map((tab, index) => {
			const withHistory = ensureHistory(tab);
			const shouldSelect = index === clampedIndex;
			if (withHistory.selected === shouldSelect) return withHistory;
			return { ...withHistory, selected: shouldSelect };
		});
		return { normalized, clampedIndex };
	};
	const setTabsWithSelection = (nextTabs, targetIndex, navigate = false) => {
		if (nextTabs.length === 0) return {};
		const { normalized, clampedIndex } = applySelection(nextTabs, targetIndex);
		updateTabs(() => ({
			tabs: normalized,
			selectedTabIndex: clampedIndex,
		}));
		if (navigate && normalized[clampedIndex]) {
			switching = true;
			NavigationUtils.transitionTo(normalized[clampedIndex].url);
			switching = false;
		}
		persistState();
		return { normalized, clampedIndex };
	};
	const addToClosedTabs = (closedTab) => {
		const { maxClosedTabsDays = 30, maxClosedTabsCount = 100 } = pluginRef.current?.settings ?? {};
		updateClosedTabs((existing) => {
			let next = [closedTab, ...(existing || [])];
			const cutoffTime = Date.now() - maxClosedTabsDays * 24 * 60 * 60 * 1000;
			next = next.filter((tab) => tab.closedAt > cutoffTime);
			if (next.length > maxClosedTabsCount) next = next.slice(0, maxClosedTabsCount);
			return next;
		});
	};
	const minimizeTab = (tabIndex) => {
		updateTabs((prevTabs) => ({
			tabs: prevTabs.map((tab, index) => (index === tabIndex ? { ...tab, minimized: !tab.minimized } : tab)),
		}));
		persistState();
	};
	const switchToTab = (tabIndex) => {
		const state = TabStateStore.getState();
		const nextTabs = state.tabs.map(ensureHistory);
		setTabsWithSelection(nextTabs, tabIndex, true);
		historyNavigation = false;
	};
	const closeTab = (tabIndex, mode) => {
		const state = TabStateStore.getState();
		if (state.tabs.length === 1) return;
		if (mode === "single" || mode == null) {
			const closingTab = state.tabs[tabIndex];
			const closedTabEntry = {
				...closingTab,
				closedAt: Date.now(),
				id: `closed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
			};
			addToClosedTabs(closedTabEntry);
		}
		historyNavigation = false;
		let nextTabs = state.tabs;
		let targetIndex = resolveSelectedIndex(state.tabs, state.selectedTabIndex);
		if (mode === "other") {
			nextTabs = [state.tabs[tabIndex]];
			targetIndex = 0;
		} else if (mode === "left") {
			nextTabs = state.tabs.filter((_, index) => index >= tabIndex);
			targetIndex = 0;
		} else if (mode === "right") {
			nextTabs = state.tabs.filter((_, index) => index <= tabIndex);
			targetIndex = clampIndex(tabIndex, nextTabs.length - 1);
		} else {
			nextTabs = state.tabs.filter((_, index) => index !== tabIndex);
			if (targetIndex >= tabIndex) targetIndex -= 1;
			targetIndex = clampIndex(targetIndex, nextTabs.length - 1);
		}
		setTabsWithSelection(nextTabs, targetIndex, true);
	};
	const reopenClosedTab = (closedTabId) => {
		const state = TabStateStore.getState();
		const closedTab = state.closedTabs?.find((tab) => tab.id === closedTabId);
		if (!closedTab) return;
		const closedTabsNext = state.closedTabs.filter((tab) => tab.id !== closedTabId);
		const newTab = {
			id: generateTabId(),
			url: closedTab.url,
			name: closedTab.name,
			iconUrl: closedTab.iconUrl,
			channelId: closedTab.channelId,
			selected: false,
			minimized: false,
			history: closedTab.history || [closedTab.url],
			historyIndex: closedTab.historyIndex || 0,
		};
		const newTabIndex = state.tabs.length;
		updateClosedTabs(() => closedTabsNext);
		updateTabs((tabs) => ({
			tabs: [...tabs, newTab],
			selectedTabIndex: state.alwaysFocusNewTabs
				? newTabIndex
				: resolveSelectedIndex(tabs, state.selectedTabIndex),
		}));
		persistState();
		if (TabStateStore.getState().alwaysFocusNewTabs) {
			switchToTab(newTabIndex);
		}
	};
	const reopenLastClosedTab = () => {
		const state = TabStateStore.getState();
		if (state.closedTabs && state.closedTabs.length > 0) {
			reopenClosedTab(state.closedTabs[0].id);
		}
	};
	const moveTab = (fromIndex, toIndex) => {
		if (fromIndex === toIndex) return;
		updateTabs((tabs) => {
			const without = tabs.filter((_, index) => index !== fromIndex);
			without.splice(toIndex, 0, tabs[fromIndex]);
			return {
				tabs: without,
				selectedTabIndex: resolveSelectedIndex(without, TabStateStore.getState().selectedTabIndex),
			};
		});
		persistState();
	};
	const canGoBack = () => {
		const state = TabStateStore.getState();
		const currentTab = state.tabs[state.selectedTabIndex];
		return currentTab?.historyIndex > 0;
	};
	const canGoForward = () => {
		const state = TabStateStore.getState();
		const currentTab = state.tabs[state.selectedTabIndex];
		return currentTab?.history && currentTab.historyIndex < currentTab.history.length - 1;
	};
	const createHistoryTabUpdater = (targetUrl, newHistoryIndex, channelId) => (tab) => ({
		...ensureHistory(tab),
		name: getCurrentName(targetUrl),
		url: targetUrl,
		channelId,
		currentStatus: getCurrentUserStatus(targetUrl),
		historyIndex: newHistoryIndex,
	});
	const updateTabAtSelectedIndex = (tabUpdater) => {
		const selectedIndex = TabStateStore.getState().selectedTabIndex;
		const updatedTabs = TabStateStore.getState().tabs.map((tab, index) =>
			index === selectedIndex ? tabUpdater(tab) : tab
		);
		updateTabs(() => ({ tabs: updatedTabs }));
	};
	const navigateHistory = (targetUrl, newHistoryIndex) => {
		historyNavigation = true;
		switching = true;
		NavigationUtils.transitionTo(targetUrl);
		setTimeout(() => {
			const channelId = SelectedChannelStore.getChannelId();
			const tabUpdater = createHistoryTabUpdater(targetUrl, newHistoryIndex, channelId);
			updateTabAtSelectedIndex(tabUpdater);
			historyNavigation = false;
			persistState();
			switching = false;
		}, 0);
	};
	const goBack = () => {
		if (!canGoBack()) return;
		const state = TabStateStore.getState();
		const currentTab = state.tabs[state.selectedTabIndex];
		const newHistoryIndex = currentTab.historyIndex - 1;
		const targetUrl = currentTab.history[newHistoryIndex];
		navigateHistory(targetUrl, newHistoryIndex);
	};
	const goForward = () => {
		if (!canGoForward()) return;
		const state = TabStateStore.getState();
		const currentTab = state.tabs[state.selectedTabIndex];
		const newHistoryIndex = currentTab.historyIndex + 1;
		const targetUrl = currentTab.history[newHistoryIndex];
		navigateHistory(targetUrl, newHistoryIndex);
	};
	const hideFavBar = () => {
		pluginRef.current?.updateSettings?.({ showFavBar: false });
	};
	const renameFav = (currentName, favIndex) => {
		let name = currentName;
		BdApi.UI.showConfirmationModal(
			"What should the new name be?",
			/* @__PURE__ */ React.createElement(RenameInput, {
				defaultValue: currentName,
				onValueChange: (newContent) => (name = newContent.trim()),
			}),
			{
				onConfirm: () => {
					if (!name) return;
					updateFavs((favsState) =>
						favsState.map((fav, index) => {
							if (index === favIndex) return { ...fav, name };
							else return fav;
						}),
					);
					persistState();
				},
			},
		);
	};
	const minimizeFav = (favIndex) => {
		updateFavs((favsState) =>
			favsState.map((fav, index) =>
				index == favIndex ? { ...fav, minimized: !fav.minimized } : fav
			),
		);
		persistState();
	};
	const deleteFav = (favIndex) => {
		updateFavs((favsState) => favsState.filter((_, index) => index !== favIndex));
		persistState();
	};
	const addToFavs = (name, url, channelId, guildId) => {
		const parentId = DEFAULT_PARENT_ID;
		const newFullUrl = url + (guildId ? `/${guildId}` : "");
		const existingFav = TabStateStore.getState().favs.find((fav) => {
			if (!fav) return false;
			const favFullUrl = fav.url + (fav.guildId ? `/${fav.guildId}` : "");
			return favFullUrl === newFullUrl;
		});
		if (existingFav) return;
		TabStateStore.setState((state) => {
			const favsNext = [...state.favs, { name, url, channelId, guildId, groupId: parentId }];
			const favGroupsNext = [...state.favGroups];
			const targetIndex = buildParentEntries(favsNext, favGroupsNext, parentId).length;
			const { favs, favGroups } = moveEntryToParentIndex(
				{ type: "fav", favIndex: favsNext.length - 1, url },
				parentId,
				targetIndex,
				favsNext,
				favGroupsNext
			);
			return { favs, favGroups };
		});
		persistState();
	};
	const moveFav = (fromIndex, toIndex, targetParentId = null) => {
		const state = TabStateStore.getState();
		const fav = state.favs[fromIndex];
		if (!fav) return;
		const parentId = targetParentId == null ? normalizeParentId(fav.groupId) : normalizeParentId(targetParentId);
		const entries = buildParentEntries(state.favs, state.favGroups, parentId);
		const currentEntryIndex = entries.findIndex((entry) => !entryIsGroup(entry) && entry.favIndex === fromIndex);
		const currentEntry = currentEntryIndex === -1
			? { type: "fav", favIndex: fromIndex, url: fav.url }
			: entries[currentEntryIndex];
		const sameParent = normalizeParentId(fav.groupId) === parentId;
		let targetIndex = clampIndex(toIndex, entries.length - (sameParent ? 1 : 0));
		if (sameParent && currentEntryIndex !== -1 && currentEntryIndex < targetIndex) {
			targetIndex += 1;
		}
		targetIndex = clampIndex(targetIndex, entries.length);
		if (currentEntryIndex === targetIndex) return;
		if (!currentEntry) return;
		moveEntryOrdered(currentEntry, parentId, targetIndex);
	};
	const addTabAsFavAt = (tab, toIndex) => {
		const urlParts = tab.url.split("/");
		const guildId = urlParts.length > 2 ? urlParts[2] : null;
		let tabBaseUrl = tab.url;
		if (guildId && tab.url.endsWith(`/${guildId}`)) {
			tabBaseUrl = tab.url.slice(0, -(guildId.length + 1));
		}
		const existingFav = TabStateStore.getState().favs.find((fav) => fav && fav.url === tabBaseUrl);
		if (existingFav) {
			return;
		}
		const newFav = {
			name: tab.name,
			url: tabBaseUrl,
			channelId: tab.channelId,
			guildId: guildId,
			groupId: normalizeParentId(tab.groupId),
		};
		const parentId = normalizeParentId(newFav.groupId);
		const state = TabStateStore.getState();
		const favsNext = [...state.favs, newFav];
		const favGroupsNext = [...state.favGroups];
		const targetIndex = clampIndex(toIndex, buildParentEntries(favsNext, favGroupsNext, parentId).length);
		const { favs, favGroups } = moveEntryToParentIndex(
			{ type: "fav", favIndex: favsNext.length - 1, url: newFav.url },
			parentId,
			targetIndex,
			favsNext,
			favGroupsNext
		);
		TabStateStore.setState({ favs, favGroups });
		persistState();
	};
	const createFavGroupId = () => {
		const currentGroups = TabStateStore.getState().favGroups;
		let generatedId = currentGroups.length;
		let isUnique = false;
		let duplicateFound = false;
		while (!isUnique) {
			for (const group of currentGroups) {
				if (generatedId === group.groupId) duplicateFound = true;
			}
			if (duplicateFound) {
				generatedId++;
				duplicateFound = false;
			} else {
				isUnique = true;
			}
		}
		return generatedId;
	};
	const addFavGroup = () => {
		let name = "New Group";
		BdApi.UI.showConfirmationModal(
			"What should the new name be?",
			/* @__PURE__ */ React.createElement(RenameInput, {
				defaultValue: "New Group",
				onValueChange: (newContent) => (name = newContent.trim()),
			}),
			{
				onConfirm: () => {
					if (!name) return;
					const id = createFavGroupId();
					updateFavGroups((groups) => [...groups, { name, groupId: id, parentId: -1 }]);
					persistState();
				},
			},
		);
	};
	const renameFavGroup = (currentName, groupId) => {
		let name = currentName;
		BdApi.UI.showConfirmationModal(
			"What should the new name be?",
			/* @__PURE__ */ React.createElement(RenameInput, {
				defaultValue: currentName,
				onValueChange: (newContent) => (name = newContent.trim()),
			}),
			{
				onConfirm: () => {
					if (!name) return;
					updateFavGroups((groups) =>
						groups.map((group) => {
							if (group.groupId === groupId) return { ...group, name };
							else return group;
						}),
					);
					persistState();
				},
			},
		);
	};
	const removeFavGroup = (groupId) => {
		updateFavGroups((groups) =>
			groups
				.filter((group) => group.groupId !== groupId)
				.map((group) =>
					group.parentId === groupId ? { ...group, parentId: DEFAULT_PARENT_ID } : group
				),
		);
		updateFavs((favsState) =>
			favsState.map((fav) =>
				fav.groupId === groupId ? { ...fav, groupId: DEFAULT_PARENT_ID } : fav
			),
		);
		persistState();
	};
	const moveToFavGroup = (favIndex, groupId) => {
		const state = TabStateStore.getState();
		const fav = state.favs[favIndex];
		if (!fav) return;
		const targetParentId = normalizeParentId(groupId);
		const targetIndex = buildParentEntries(state.favs, state.favGroups, targetParentId).length;
		moveEntryOrdered({ type: "fav", favIndex, url: fav.url }, targetParentId, targetIndex);
	};
	const moveToFavGroupByKey = (favKey, groupId) => {
		const idx = resolveFavIndex(favKey);
		if (idx === -1) return;
		moveToFavGroup(idx, groupId);
	};
	const addTabAsFavInGroup = (tab, groupId) => {
		const parentId = normalizeParentId(groupId);
		const state = TabStateStore.getState();
		const favsNext = [...state.favs, {
			name: tab.name,
			url: tab.url,
			channelId: tab.channelId,
			guildId: tab.guildId,
			groupId: parentId,
		}];
		const favGroupsNext = [...state.favGroups];
		const targetIndex = buildParentEntries(favsNext, favGroupsNext, parentId).length;
		const { favs, favGroups } = moveEntryToParentIndex(
			{ type: "fav", favIndex: favsNext.length - 1, url: tab.url },
			parentId,
			targetIndex,
			favsNext,
			favGroupsNext
		);
		TabStateStore.setState({ favs, favGroups });
		persistState();
	};
	const moveFavGroup = (fromIndex, toIndex, targetParentId = null) => {
		const state = TabStateStore.getState();
		const group = state.favGroups[fromIndex];
		if (!group) return;
		const parentId = targetParentId == null ? normalizeParentId(group.parentId) : normalizeParentId(targetParentId);
		const currentParentId = normalizeParentId(group.parentId);
		if (group.groupId === parentId || isDescendantGroup(state.favGroups, group.groupId, parentId)) {
			return;
		}
		const entries = buildParentEntries(state.favs, state.favGroups, parentId);
		const currentEntryIndex = entries.findIndex((entry) => entryIsGroup(entry) && entry.groupIndex === fromIndex);
		const currentEntry = currentEntryIndex === -1
			? { type: "group", groupId: group.groupId, groupIndex: fromIndex }
			: entries[currentEntryIndex];
		const sameParent = currentParentId === parentId;
		let targetIndex = clampIndex(toIndex, entries.length - (sameParent ? 1 : 0));
		if (sameParent && currentEntryIndex !== -1 && currentEntryIndex < targetIndex) {
			targetIndex += 1;
		}
		targetIndex = clampIndex(targetIndex, entries.length);
		if (currentEntryIndex === targetIndex) return;
		if (!currentEntry) return;
		moveEntryOrdered(currentEntry, parentId, targetIndex);
	};
	const reparentFavGroup = (groupId, newParentId) => {
		TabStateStore.setState((state) => {
			if (isDescendantGroup(state.favGroups, groupId, newParentId) || groupId === newParentId) {
				return {};
			}
			const groupIndex = state.favGroups.findIndex((group) => group.groupId === groupId);
			if (groupIndex === -1) return {};
			const parentId = normalizeParentId(newParentId);
			const targetIndex = buildParentEntries(state.favs, state.favGroups, parentId).length;
			const { favs, favGroups } = moveEntryToParentIndex(
				{ type: "group", groupIndex, groupId },
				parentId,
				targetIndex,
				state.favs,
				state.favGroups
			);
			return { favs, favGroups };
		});
		persistState();
	};
	const saveChannel = (guildId, channelId, name) => {
		const newUrl = `/channels/${guildId || "@me"}/${channelId}`;
		const state = TabStateStore.getState();
		if (state.alwaysFocusNewTabs) {
			const newTabIndex = state.tabs.length;
			const newTabs = [
				...state.tabs.map((tab) => ({ ...tab, selected: false })),
				{
					id: generateTabId(),
					url: newUrl,
					name,
					channelId,
					minimized: false,
					groupId: -1,
					history: [newUrl],
					historyIndex: 0,
				},
			];
			setTabsWithSelection(newTabs, newTabIndex, true);
		} else {
			updateTabs((tabs) => ({
				tabs: [
					...tabs,
					{
						id: generateTabId(),
						url: newUrl,
						name,
						channelId,
						minimized: false,
						groupId: -1,
						history: [newUrl],
						historyIndex: 0,
					},
				],
			}));
			persistState();
		}
	};
	const openNewTab = () => {
		const state = TabStateStore.getState();
		const newTabIndex = state.tabs.length;
		const newTabs = [
			...state.tabs.map((tab) => ({ ...tab, selected: false })),
			{
				id: generateTabId(),
				url: "/channels/@me",
				name: "Friends",
				selected: true,
				channelId: void 0,
				history: ["/channels/@me"],
				historyIndex: 0,
			},
		];
		setTabsWithSelection(newTabs, newTabIndex, true);
	};
	const openTabInNewTab = (tab) => {
		updateTabs((tabs) => ({
			tabs: [...tabs, {
				id: generateTabId(),
				...tab,
				selected: false,
				history: tab.history ? [...tab.history] : [tab.url],
				historyIndex: tab.historyIndex || 0
			}],
		}));
		persistState();
	};
	const openFavInNewTab = (fav) => {
		const favList = Array.isArray(fav) ? fav : [fav];
		const state = TabStateStore.getState();
		const newTabIndex = state.tabs.length + favList.length - 1;
		updateTabs((tabs) => ({
			tabs: [
				...tabs,
				...favList.map((fav2) => {
					const url = fav2.url + (fav2.guildId ? `/${fav2.guildId}` : "");
					return {
						id: generateTabId(),
						url,
						selected: false,
						name: getCurrentName(url),
						currentStatus: getCurrentUserStatus(url),
						channelId:
							fav2.channelId ||
							SelectedChannelStore.getChannelId(fav2.guildId),
						history: [url],
						historyIndex: 0
					};
				}),
			],
		}));
		persistState();
		if (TabStateStore.getState().alwaysFocusNewTabs) switchToTab(newTabIndex);
	};
	const openFavGroupInNewTab = (groupId) => {
		openFavInNewTab(
			TabStateStore.getState().favs.filter((fav) => fav && fav.groupId === groupId),
		);
	};
	const openFavAsTabAt = (fav, toIndex) => {
		const url = fav.url + (fav.guildId ? `/${fav.guildId}` : "");
		const newTab = {
			id: generateTabId(),
			url,
			selected: false,
			name: getCurrentName(url),
			currentStatus: getCurrentUserStatus(url),
			channelId: fav.channelId || SelectedChannelStore.getChannelId(fav.guildId),
			history: [url],
			historyIndex: 0
		};
		updateTabs((tabs) => {
			const tabsNext = [...tabs];
			tabsNext.splice(toIndex, 0, newTab);
			return { tabs: tabsNext };
		});
		persistState();
		if (TabStateStore.getState().alwaysFocusNewTabs) switchToTab(toIndex);
	};
	const toggleTabLayoutMode = ({ tabBarRef } = {}) => {
		const currentMode = TabStateStore.getState().tabLayoutMode || "single";
		const newMode = currentMode === "single" ? "multi" : "single";
		pluginRef.current?.updateSettings?.(
			{ tabLayoutMode: newMode },
			() => {
				BdApi.UI.showToast(
					`?? ${newMode === "single" ? "Single row mode" : "Multi-row mode"}`,
					{ type: "info", timeout: 2000 }
				);
			},
		);
		const announcement = document.createElement("div");
		announcement.setAttribute("aria-live", "polite");
		announcement.setAttribute("aria-atomic", "true");
		announcement.style.position = "absolute";
		announcement.style.left = "-10000px";
		announcement.textContent = `Tab layout changed to ${newMode === "single" ? "single row" : "multi-row"} mode`;
		document.body.appendChild(announcement);
		setTimeout(() => announcement.remove(), 1000);
		requestAnimationFrame(() => {
			const selectedIndex = TabStateStore.getState().selectedTabIndex ?? 0;
			tabBarRef?.scrollToTab?.(selectedIndex);
		});
	};
	return {
		setPlugin: (plugin) => {
			pluginRef.current = plugin;
		},
		clearPlugin: (plugin) => {
			if (pluginRef.current === plugin) {
				pluginRef.current = null;
			}
		},
		get plugin() {
			return pluginRef.current;
		},
		get isHistoryNavigation() {
			return historyNavigation;
		},
		setHistoryNavigation: (value) => {
			historyNavigation = value;
		},
		persistState,
		ensureHistory,
		applySelection,
		setTabsWithSelection,
		addToClosedTabs,
		minimizeTab,
		switchToTab,
		closeTab,
		reopenClosedTab,
		reopenLastClosedTab,
		moveTab,
		canGoBack,
		canGoForward,
		goBack,
		goForward,
		hideFavBar,
		renameFav,
		minimizeFav,
		deleteFav,
		addToFavs,
		moveFav,
		addTabAsFavAt,
		addTabAsFavInGroup,
		createFavGroupId,
		addFavGroup,
		renameFavGroup,
		removeFavGroup,
		moveToFavGroup,
		moveFavGroup,
		moveToFavGroupByKey,
		reparentFavGroup,
		saveChannel,
		openNewTab,
		openTabInNewTab,
		openFavInNewTab,
		openFavGroupInNewTab,
		openFavAsTabAt,
		toggleTabLayoutMode,
	};
})();
function getModule(filter, options = {}) {
	const foundModule = options.fail
		? void 0
		: Webpack.getModule(filter, options);
	if (!foundModule) {
		options.name ??= filter?.__filter;
		missingModule(options);
		if (options.onFail) options.onFail(options);
	}
	return foundModule;
}
function getStack() {
	const original = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stackTraces) => stackTraces;
	const stack = new Error("Stack trace").stack.slice(1);
	Error.prepareStackTrace = original;
	return stack;
}
if (exports.dismissWarning) exports.dismissWarning();
exports.dismissWarning = null;
let missingFeatures = [];
let dismissWarning = null;
function missingModule({ name = "<unnamed>", feature, fatal = false }) {
	const stack = getStack();
	const index = stack.findIndex(
		(site) => site.getFunctionName() === "getModule",
	);
	const trace = stack.filter((_, i) => i > index).join("\n");
	console.warn(`Could not find '${name}' module.
${trace}`);
	if (fatal) throw new Error(`Could not find '${name}' module.`);
	if (feature != null) {
		missingFeatures.push(feature);
		if (dismissWarning) dismissWarning();
		const content = BdApi.DOM.parseHTML(
			`<span style="background: white; color: var(--text-strong); padding: 1px 3px; margin-right: 3px; border-radius: 5px;">ChannelTabs</span> These features are unavailable: ${missingFeatures.join(", ")}`,
			true,
		);
		dismissWarning = BdApi.UI.showNotice(content, {
			type: "warning",
		});
	}
}
const FakeUnreadStateStore = class extends Store {
	getUnreadCount() { return 0; }
	getMentionCount() { return 0; }
	isEstimated() { return false; }
	hasUnread() { return false; }
};
const Filters = {};
for (const [key, value] of Object.entries(Webpack.Filters)) {
	Filters[key] = function (...args) {
		const result = value(...args);
		result.__filter = `${key}(${args.map((a) => JSON.stringify(a)).join(", ")})`;
		return result;
	};
}
const { byKeys, byStrings, byStoreName } = Filters;
const bulkModules = Webpack.getBulkKeyed({
	transitionToGuild: { filter: byKeys("transitionToGuildSync") },
	transitionTo: {
		filter: byStrings(`"transitionTo - Transitioning to "`),
		searchExports: true,
	},
	Permissions: { filter: byKeys("computePermissions") },
	SelectedChannelStore: { filter: byStoreName("SelectedChannelStore") },
	SelectedGuildStore: { filter: byStoreName("SelectedGuildStore") },
	ChannelStore: { filter: byStoreName("ChannelStore") },
	UserStore: { filter: byStoreName("UserStore") },
	UserTypingStore: { filter: byStoreName("TypingStore") },
	RelationshipStore: { filter: byStoreName("RelationshipStore") },
	GuildStore: { filter: byStoreName("GuildStore") },
	DiscordChannelTypes: {
		filter: byKeys("GUILD_TEXT"),
		searchExports: true,
	},
	MutedStore: { filter: byKeys("isMuted", "isChannelMuted") },
	PermissionUtils: { filter: byKeys("can", "canManageUser") },
	UserStatusStore: { filter: byStoreName("PresenceStore") },
	Spinner: {
		filter: (m) => m.Type?.SPINNING_CIRCLE,
		searchExports: true,
	},
	Slider: {
		filter: byStrings(
			`"[UIKit]Slider.handleMouseDown(): assert failed: domNode nodeType !== Element"`,
		),
		searchExports: true,
	},
	NavShortcuts: { filter: byKeys("NAVIGATE_BACK", "NAVIGATE_FORWARD") },
	IconUtilities: { filter: byKeys("getChannelIconURL") },
	systemBarClasses: { filter: byKeys("systemBar") },
	backdropClasses: { filter: byKeys("backdrop", "withLayer") },
	scrimClasses: { filter: byKeys("scrim") },
	PlusIcon: { filter: (m) => m.toString?.().includes("M13 6a1 1") },
	ChevronDownIcon: { filter: (m) => m.toString?.().includes("M5.3 9.3a1") },
});
const warnModule = (value, name, options = {}) => {
	if (value) return value;
	missingModule({ name, ...options });
	return options.fallback ?? null;
};
const isDescendantGroup = (groups, childId, targetParentId) => {
	let currentParent = targetParentId;
	while (currentParent !== undefined && currentParent !== null && currentParent !== -1) {
		if (currentParent === childId) return true;
		currentParent = groups.find((g) => g.groupId === currentParent)?.parentId;
	}
	return false;
};
const NavigationUtils = {
	transitionToGuild: bulkModules.transitionToGuild?.transitionToGuildSync,
	transitionTo:
		bulkModules.transitionTo?.transitionTo ??
		warnModule(bulkModules.transitionTo, "NavigationUtils.transitionTo"),
};
const Permissions = warnModule(bulkModules.Permissions, "Permissions");
const SelectedChannelStore = warnModule(
	bulkModules.SelectedChannelStore,
	"SelectedChannelStore",
);
const SelectedGuildStore = warnModule(
	bulkModules.SelectedGuildStore,
	"SelectedGuildStore",
);
const ChannelStore = warnModule(bulkModules.ChannelStore, "ChannelStore");
const UserStore = warnModule(bulkModules.UserStore, "UserStore");
const UserTypingStore = warnModule(
	bulkModules.UserTypingStore,
	"UserTypingStore",
);
const RelationshipStore = warnModule(
	bulkModules.RelationshipStore,
	"RelationshipStore",
);
const GuildStore = warnModule(bulkModules.GuildStore, "GuildStore");
const DiscordConstants = {
	ChannelTypes: warnModule(
		bulkModules.DiscordChannelTypes,
		"DiscordConstants.ChannelTypes",
	),
};
const DragSource = getModule(m => typeof m === "function" && m.toString().includes("react-dnd.github.io/react-dnd/docs/api/drag-source"), {
	searchExports: true
}) ?? getModule(m => typeof m === "function" && m.toString().includes("type, spec, collect[, options]"), {
	searchExports: true
}) ?? getModule(Filters.byStrings("DecoratedComponent", "createHandler", "registerHandler"), {
	searchExports: true
}) ?? getModule(m => typeof m === "function" && m.toString().includes("DragSource") && m.toString().includes("containerDisplayName"), {
	searchExports: true
});
const DropTarget = getModule(m => typeof m === "function" && m.toString().includes("react-dnd.github.io/react-dnd/docs/api/drop-target"), {
	searchExports: true
}) ?? getModule(m => typeof m === "function" && m.toString().includes("an array of strings, or a function that returns either"), {
	searchExports: true
}) ?? getModule(m => typeof m === "function" && m.toString().includes("DropTarget") && m.toString().includes("containerDisplayName"), {
	searchExports: true
}) ?? getModule(m => typeof m === "function" && m.toString().includes("type, spec, collect[, options]") && m.toString().includes("DropTarget"), {
	searchExports: true
}) ?? getModule(Filters.byStrings("createMonitor", "createConnector", "DropTarget"), {
	searchExports: true
});
if (!DragSource) console.error("[ChannelTabs] DragSource module not found! Drag and drop will not work.");
if (!DropTarget) console.error("[ChannelTabs] DropTarget module not found! Drag and drop will not work.");
const Textbox = (props) =>
	/* @__PURE__ */ React.createElement(
	"div",
	{ className: "channelTabs-input" },
		/* @__PURE__ */ React.createElement(BdApi.Components.TextInput, {
		...props,
	}),
);
const RenameInput = ({ defaultValue, onValueChange }) => {
	const [value, setValue] = React.useState(defaultValue || "");
	React.useEffect(() => {
		onValueChange?.(value);
	}, [value, onValueChange]);
	return /* @__PURE__ */ React.createElement(Textbox, {
		value,
		onChange: (newValue) => setValue(newValue),
	});
};
const UnreadStateStore =
	getModule((m) => m.isEstimated, {
		feature: "Unread/Mention Indicators",
	}) ?? new FakeUnreadStateStore();
const MutedStore = warnModule(bulkModules.MutedStore, "MutedStore");
const PermissionUtils = warnModule(
	bulkModules.PermissionUtils,
	"PermissionUtils",
);
const UserStatusStore = warnModule(
	bulkModules.UserStatusStore,
	"UserStatusStore",
);
const Spinner =
	warnModule(bulkModules.Spinner, "Spinner", {
		feature: "Typing Indicators",
	}) ??
	getModule((m) => m.Type?.SPINNING_CIRCLE, {
		searchExports: true,
		feature: "Typing Indicators",
	});
const Tooltip = BdApi.Components.Tooltip;
const Slider =
	warnModule(bulkModules.Slider, "Slider") ??
	getModule(
		byStrings(
			`"[UIKit]Slider.handleMouseDown(): assert failed: domNode nodeType !== Element"`,
		),
		{ searchExports: true },
	);
const NavShortcuts = warnModule(bulkModules.NavShortcuts, "NavShortcuts");
const [TitleBar, TitleBarKey] =
	Webpack.getWithKey(byStrings("PlatformTypes", "leading", "trailing")) ||
	Webpack.getWithKey(byStrings("getPlatform", "leading", "trailing")) ||
	Webpack.getWithKey(byStrings("leading", "trailing", "windowKey")) ||
	Webpack.getWithKey(byStrings("windowKey", "onDoubleClick", "leading")) ||
	[null, null];
if (!TitleBar) missingModule({ name: "TitleBar", fatal: true });
const TitleBarStyles =
	Webpack.getModule(byKeys("sidebarResizeHandle", "panels")) ??
	Webpack.getModule(byKeys("sidebarList", "channelListHidden")) ??
	Webpack.getModule(byKeys("guilds", "sidebar", "base")) ??
	Webpack.getModule(byKeys("base", "activityPanel")) ??
	Webpack.getModule(byKeys("draggingMax", "draggingMin")) ??
	Webpack.getModule((m) => m?.sidebarResizeHandle && m?.activityPanel && m?.guilds);
if (!TitleBarStyles) console.warn("TitleBarStyles module not found - Discord may have updated");
const TitleBarComponent = TitleBar?.[TitleBarKey];
if (TitleBarComponent?.compare) TitleBarComponent.compare = () => false;
const IconUtilities = warnModule(
	bulkModules.IconUtilities,
	"IconUtilities",
);
const standardSidebarView =
	BdApi.Webpack.getByKeys("standardSidebarView")?.standardSidebarView ?? "";
const backdropClasses = warnModule(
	bulkModules.backdropClasses,
	"backdropClasses",
);
const scrimClasses = warnModule(bulkModules.scrimClasses, "scrimClasses");
const noDragClasses = [
	standardSidebarView,
	backdropClasses?.backdrop,
	scrimClasses?.scrim,
].filter(Boolean);
const systemBarClasses = warnModule(
	bulkModules.systemBarClasses,
	"systemBarClasses",
);
const Icons = {
	Close: () =>
		/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z",
		})),
	PlusAlt: bulkModules.PlusIcon ?? (() =>
		/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6Z",
		}))),
	LeftCaret: () =>
			/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
				/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
		})),
	RightCaret: () =>
			/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
				/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
		})),
	ChevronDown: bulkModules.ChevronDownIcon ?? (() =>
		/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z",
		}))),
	Trash: () =>
		/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M15 3.9a1.2 1.2 0 0 1 1.4 1.2h2.9c.3 0 .6.3.6.5v.5c0 .3-.3.5-.6.5h-15c-.3 0-.6-.2-.6-.5v-.5c0-.2.3-.5.6-.5h2.9a1.2 1.2 0 0 1 1.4-1.2h6.4Z",
		}),
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M6 8h12v11.1c0 .7-.5 1.3-1.2 1.3H7.2c-.7 0-1.2-.6-1.2-1.3V8Z",
		})),
	Pencil: () =>
		/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64687 16.2311 2.64687 14.818 4.05892L14.1699 4.70694L19.2929 9.8299Z",
		}),
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M17.5 11.6L12.4 6.5L4 14.9V20H9.1L17.5 11.6Z",
		})),
	WindowLaunch: () =>
		/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M10 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V6.41l-6.29 6.3a1 1 0 1 1-1.42-1.42L16.59 5H11a1 1 0 0 1-1-1Z",
		}),
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M4 6a2 2 0 0 1 2-2h2a1 1 0 0 1 0 2H6v12h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z",
		})),
	FolderIcon: () =>
		/* @__PURE__ */ React.createElement(
		"svg",
		{ width: "24", height: "24", viewBox: "0 0 24 24" },
			/* @__PURE__ */ React.createElement("path", {
			fill: "currentColor",
			d: "M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z",
		})),
};
const Close = Icons.Close;
const PlusAlt = Icons.PlusAlt;
const FolderIcon = Icons.FolderIcon;
const FilledFolderIcon = (props) =>
	/* @__PURE__ */ React.createElement(
	"svg",
	{
		width: 20,
		height: 20,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		...props,
	},
		/* @__PURE__ */ React.createElement("path", {
		d: "M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"
	})
);
const LeftCaret =
	Icons?.ChevronLargeLeftIcon ??
	(() => /* @__PURE__ */ React.createElement("b", null, "<"));
const RightCaret =
	Icons?.ChevronLargeRightIcon ??
	(() => /* @__PURE__ */ React.createElement("b", null, ">"));
const ChevronDown =
	Icons?.ChevronDownIcon ??
	(() => /* @__PURE__ */ React.createElement("b", null, "\u25BC"));
const DefaultUserIconGrey = "https://cdn.discordapp.com/embed/avatars/0.png";
const SettingsMenuIcon = /* @__PURE__ */ React.createElement(
	"svg",
	{
		class: "channelTabs-settingsIcon",
		"aria-hidden": "false",
		viewBox: "0 0 80 80",
	},
	/* @__PURE__ */ React.createElement("rect", {
		fill: "var(--interactive-text-default)",
		x: "20",
		y: "15",
		width: "50",
		height: "10",
	}),
	/* @__PURE__ */ React.createElement("rect", {
		fill: "var(--interactive-text-default)",
		x: "20",
		y: "35",
		width: "50",
		height: "10",
	}),
	/* @__PURE__ */ React.createElement("rect", {
		fill: "var(--interactive-text-default)",
		x: "20",
		y: "55",
		width: "50",
		height: "10",
	}),
);
const FavStarIcon = /* @__PURE__ */ React.createElement(
	"svg",
	{
		className: "channelTabs-favStarIcon",
		"aria-hidden": "true",
		viewBox: "0 0 24 24",
	},
	/* @__PURE__ */ React.createElement("path", {
		fill: "currentColor",
		d: "M12 3l2.472 5.305 5.85.535-4.44 3.98 1.333 5.75L12 15.9l-5.215 2.67 1.333-5.75-4.44-3.98 5.85-.535z",
	})
);
let switching = false;
let patches = [];
const guildChannelCache = new Map();
let lastCacheClean = Date.now();
const DNDTypes = {
	TAB: "channelTabs-tab",
	FAVORITE: "channelTabs-favorite",
	GROUP: "channelTabs-group"
};
const tabNodeRefs = new Map();
const favNodeRefs = new Map();
const groupNodeRefs = new Map();
function collect(connect, monitor, props) {
	const item = monitor.getItem();
	return {
		dragInProgress: !!item,
		isOver: monitor.isOver({ shallow: true }),
		canDrop: monitor.canDrop(),
		draggedIsMe: item?.id === props.id,
		dropRef: connect.dropTarget()
	};
}
function makeDraggable(type) {
	return DragSource(type, { beginDrag: (a) => a }, (connect, monitor) => ({
		isDragging: !!monitor.isDragging(),
		dragRef: connect.dragSource()
	}));
}
function makeDroppable(types, drop, hover) {
	return DropTarget(types, { drop, hover }, collect);
}
const DragContext = React.createContext({
	openPath: [],
	toggleGroup: () => { },
	openGroup: () => { },
	closeAll: () => { }
});
const buildGroupPath = (favGroups, groupId) => {
	if (!Array.isArray(favGroups)) return [];
	const byId = new Map(favGroups.map((g) => [g.groupId, ensureGroupParent(g)]));
	const path = [];
	let current = byId.get(groupId);
	let safety = 0;
	while (current && safety < favGroups.length + 5) {
		path.unshift(current.groupId);
		const parentId = current.parentId ?? -1;
		if (parentId === -1) break;
		current = byId.get(parentId);
		safety++;
	}
	return path;
};
function DragProvider({ children }) {
	const [openPath, setOpenPath] = React.useState([]);
	const closeAll = React.useCallback(() => {
		setOpenPath([]);
	}, []);
	const toggleGroup = React.useCallback((groupId) => {
		setOpenPath((prev) => {
			const groups = (TabStateStore.getState().favGroups || []).map(ensureGroupParent);
			const path = buildGroupPath(groups, groupId);
			if (!path.length) return prev;
			const existingIndex = prev.indexOf(groupId);
			if (existingIndex !== -1) {
				return prev.slice(0, existingIndex);
			}
			return path;
		});
	}, []);
	const openGroup = React.useCallback((groupId) => {
		const groups = (TabStateStore.getState().favGroups || []).map(ensureGroupParent);
		const path = buildGroupPath(groups, groupId);
		if (path.length) setOpenPath(path);
	}, []);
	React.useEffect(() => {
		closeAllDropdownsRef = closeAll;
		return () => {
			closeAllDropdownsRef = null;
		};
	}, [closeAll]);
	const value = React.useMemo(() => ({
		openPath,
		toggleGroup,
		openGroup,
		closeAll
	}), [openPath, toggleGroup, openGroup, closeAll]);
	return React.createElement(DragContext.Provider, { value }, children);
}
function CreateGuildContextMenuChildren(instance, props, channel) {
	return ContextMenu.buildMenuChildren([
		{
			type: "group",
			items: [
				{
					type: "submenu",
					label: "ChannelTabs",
					items: instance.mergeItems(
						[
							{
								label: "Open channel in new tab",
								action: () =>
									TabActions.saveChannel(
										props.guild.id,
										channel.id,
										"#" + channel.name,
									),
								icon: Icons.WindowLaunch
							},
							{
								label: "Save channel as bookmark",
								action: () =>
									TabActions.addToFavs(
										"#" + channel.name,
										`/channels/${props.guild.id}/${channel.id}`,
										channel.id,
									),
								icon: () => FavStarIcon
							},
						],
						[
							{
								label: "Save guild as bookmark",
								action: () =>
									TabActions.addToFavs(
										props.guild.name,
										`/channels/${props.guild.id}`,
										void 0,
										props.guild.id,
									),
								icon: () => FavStarIcon
							},
						],
					),
				},
			],
		},
	]);
}
function CreateTextChannelContextMenuChildren(instance, props) {
	return ContextMenu.buildMenuChildren([
		{
			type: "group",
			items: [
				{
					type: "submenu",
					label: "ChannelTabs",
					items: instance.mergeItems(
						[
							{
								label: "Open in new tab",
								action: () =>
									TabActions.saveChannel(
										props.guild.id,
										props.channel.id,
										"#" + props.channel.name,
									),
								icon: Icons.WindowLaunch
							},
						],
						[
							{
								label: "Save channel as bookmark",
								action: () =>
									TabActions.addToFavs(
										"#" + props.channel.name,
										`/channels/${props.guild.id}/${props.channel.id}`,
										props.channel.id,
									),
								icon: () => FavStarIcon
							},
						],
					),
				},
			],
		},
	]);
}
function CreateThreadChannelContextMenuChildren(instance, props) {
	return ContextMenu.buildMenuChildren([
		{
			type: "group",
			items: [
				{
					type: "submenu",
					label: "ChannelTabs",
					items: instance.mergeItems(
						[
							{
								label: "Open in new tab",
								action: () =>
									TabActions.saveChannel(
										props.channel.guild_id,
										props.channel.id,
										"#" + props.channel.name,
									),
								icon: Icons.WindowLaunch
							},
						],
						[
							{
								label: "Save thread as bookmark",
								action: () =>
									TabActions.addToFavs(
										"#" + props.channel.name,
										`/channels/${props.channel.guild_id}/${props.channel.id}`,
										props.channel.id,
									),
								icon: () => FavStarIcon
							},
						],
					),
				},
			],
		},
	]);
}
function CreateDMContextMenuChildren(instance, props) {
	return ContextMenu.buildMenuChildren([
		{
			type: "group",
			items: [
				{
					type: "submenu",
					label: "ChannelTabs",
					items: instance.mergeItems(
						[
							{
								label: "Open in new tab",
								action: () =>
									TabActions.saveChannel(
										props.channel.guild_id,
										props.channel.id,
										props.channel.name ||
										RelationshipStore.getNickname(props.user.id) ||
										props.user.globalName,
									),
								icon: Icons.WindowLaunch
							},
						],
						[
							{
								label: "Save DM as bookmark",
								action: () =>
									TabActions.addToFavs(
										props.channel.name ||
										RelationshipStore.getNickname(props.user.id) ||
										props.user.globalName,
										`/channels/@me/${props.channel.id}`,
										props.channel.id,
									),
								icon: () => FavStarIcon
							},
						],
					),
				},
			],
		},
	]);
}
function CreateGroupContextMenuChildren(instance, props) {
	return ContextMenu.buildMenuChildren([
		{
			type: "group",
			items: [
				{
					type: "submenu",
					label: "ChannelTabs",
					items: instance.mergeItems(
						[
							{
								label: "Open in new tab",
								action: () =>
									TabActions.saveChannel(
										props.channel.guild_id,
										props.channel.id,
										props.channel.name ||
										props.channel.rawRecipients
											.map(
												(u) =>
													RelationshipStore.getNickname(u.id) || u.globalName,
											)
											.join(", "),
									),
								icon: Icons.WindowLaunch
							},
						],
						[
							{
								label: "Save bookmark",
								action: () =>
									TabActions.addToFavs(
										props.channel.name ||
										props.channel.rawRecipients
											.map(
												(u) =>
													RelationshipStore.getNickname(u.id) || u.globalName,
											)
											.join(", "),
										`/channels/@me/${props.channel.id}`,
										props.channel.id,
									),
								icon: () => FavStarIcon
							},
						],
					),
				},
			],
		},
	]);
}
function CreateTabContextMenu(props, e) {
	ContextMenu.open(
		e,
		ContextMenu.buildMenu([
			{
				type: "group",
				items: mergeLists(
					{
						values: [
							{
								label: "Duplicate",
								action: props.openInNewTab,
								icon: Icons.WindowLaunch
							},
							{
								label: "Add to favourites",
								action: () =>
									props.addToFavs(props.name, props.url, props.channelId),
								icon: FavStarIcon
							},
							{
								label: "Minimize tab",
								type: "toggle",
								checked: () => props.minimized,
								action: () => props.minimizeTab(props.tabIndex),
							},
						],
					},
					{
						include: props.tabCount > 1,
						values: [
							{
								type: "separator",
							},
							{
								label: "Move left",
								action: props.moveLeft,
								icon: Icons.LeftCaret
							},
							{
								label: "Move right",
								action: props.moveRight,
								icon: Icons.RightCaret
							},
						],
					},
					{
						include: props.tabCount > 1,
						values: [
							{
								type: "separator",
							},
							{
								type: "submenu",
								label: "Close...",
								id: "closeMenu",
								color: "danger",
								action: () => props.closeTab(props.tabIndex, "single"),
								items: mergeLists(
									{
										values: [
											{
												label: "Close tab",
												action: () => props.closeTab(props.tabIndex, "single"),
												color: "danger",
												icon: Icons.Trash
											},
											{
												label: "Close all other tabs",
												action: () => props.closeTab(props.tabIndex, "other"),
												color: "danger",
												icon: Icons.Trash
											},
										],
									},
									{
										include: props.tabIndex != props.tabCount - 1,
										values: [
											{
												label: "Close all tabs to right",
												action: () => props.closeTab(props.tabIndex, "right"),
												color: "danger",
												icon: Icons.RightCaret
											},
										],
									},
									{
										include: props.tabIndex != 0,
										values: [
											{
												label: "Close all tabs to left",
												action: () => props.closeTab(props.tabIndex, "left"),
												color: "danger",
												icon: Icons.LeftCaret
											},
										],
									},
								),
							},
						],
					},
				),
			},
		]),
		{
			position: "right",
			align: "top",
		},
	);
}
function CreateFavContextMenu(props, e) {
	ContextMenu.open(
		e,
		ContextMenu.buildMenu([
			{
				type: "group",
				items: mergeLists(
					{
						values: [
							{
								label: "Open in new tab",
								action: props.openInNewTab,
								icon: Icons.WindowLaunch
							},
							{
								label: "Rename",
								action: props.rename,
								icon: Icons.Pencil
							},
							{
								label: "Minimize favourite",
								type: "toggle",
								checked: () => props.minimized,
								action: () => props.minimizeFav(props.favIndex),
							},
							{
								type: "separator",
							},
						],
					},
					{
						include: props.favCount > 1,
						values: [
							{
								label: "Move left",
								action: props.moveLeft,
								icon: Icons.LeftCaret
							},
							{
								label: "Move right",
								action: props.moveRight,
								icon: Icons.RightCaret
							},
							{
								type: "separator",
							},
						],
					},
					{
						values: [
							{
								label: "Move To...",
								id: "groupMoveTo",
								type: "submenu",
								items: mergeLists(
									{
										values: [
											{
												label: "Favorites Bar",
												id: "entryNone",
												color: "danger",
												action: () => props.moveToFavGroup(props.favIndex, -1),
											},
											{
												type: "separator",
											},
										],
									},
									{
										values: FavMoveToGroupList({
											favIndex: props.favIndex,
											...props,
										}),
									},
								),
							},
							{
								type: "separator",
							},
						],
					},
					{
						values: [
							{
								label: "Delete",
								action: props.delete,
								color: "danger",
								icon: Icons.Trash
							},
						],
					},
				),
			},
		]),
		{
			position: "right",
			align: "top",
		},
	);
}
function CreateFavGroupContextMenu(props, e) {
	ContextMenu.open(
		e,
		ContextMenu.buildMenu([
			{
				type: "group",
				items: mergeLists(
					{
						values: [
							{
								label: "Open all",
								action: () =>
									props.openFavGroupInNewTab(props.favGroup.groupId),
								icon: Icons.WindowLaunch
							},
							{
								type: "separator",
							},
						],
					},
					{
						include: props.groupCount > 1,
						values: [
							{
								label: "Move left",
								action: () =>
									props.moveFavGroup(
										props.groupIndex,
										(props.groupIndex + props.groupCount - 1) %
										props.groupCount,
									),
								icon: Icons.LeftCaret
							},
							{
								label: "Move right",
								action: () =>
									props.moveFavGroup(
										props.groupIndex,
										(props.groupIndex + 1) % props.groupCount,
									),
								icon: Icons.RightCaret
							},
							{
								type: "separator",
							},
						],
					},
					{
						values: [
							{
								label: "Rename",
								id: "renameGroup",
								action: () =>
									props.renameFavGroup(
										props.favGroup.name,
										props.favGroup.groupId,
									),
								icon: Icons.Pencil
							},
							{
								type: "separator",
							},
							{
								label: "Delete",
								id: "deleteGroup",
								action: () => props.removeFavGroup(props.favGroup.groupId),
								color: "danger",
								icon: Icons.Trash
							},
						],
					},
				),
			},
		]),
		{
			position: "right",
			align: "top",
		},
	);
}
function CreateFavBarContextMenu(props, e) {
	ContextMenu.open(
		e,
		ContextMenu.buildMenu([
			{
				type: "group",
				items: [
					{
						label: "Add current tab as favourite",
						action: () =>
							props.addToFavs(
								getCurrentName(),
								location.pathname,
								SelectedChannelStore.getChannelId(),
							),
						icon: () => FavStarIcon
					},
					{
						label: "Create a new group...",
						action: props.addFavGroup,
						icon: Icons.PlusAlt
					},
					{
						type: "separator",
					},
					{
						label: "Hide Favorites",
						action: props.hideFavBar,
						color: "danger",
						icon: Icons.Close
					},
				],
			},
		]),
		{
			position: "right",
			align: "top",
		},
	);
}
function CreateTabListContextMenu(props, e) {
	const closeMenu = () => ContextMenu.close();
	const menuItems = props.tabs.map((tab, index) => {
		const tabCount = props.tabs.length;
		return {
			id: `tab-${index}`,
			render: () =>
				/* @__PURE__ */ React.createElement(TabListMenuItem, {
				...tab,
				tabIndex: index,
				tabCount,
				switchToTab: props.switchToTab,
				scrollToTab: props.scrollToTab,
				closeTab: props.closeTab,
				moveLeft: () =>
					props.move(index, (index + tabCount - 1) % tabCount),
				moveRight: () => props.move(index, (index + 1) % tabCount),
				moveTab: props.move,
				addToFavs: props.addToFavs,
				minimizeTab: props.minimizeTab,
				openInNewTab: () => props.openInNewTab(tab),
				openFavAsTabAt: props.openFavAsTabAt,
				showTabUnreadBadges: props.showTabUnreadBadges,
				showTabMentionBadges: props.showTabMentionBadges,
				showTabTypingBadge: props.showTabTypingBadge,
				showEmptyTabBadges: props.showEmptyTabBadges,
				showActiveTabUnreadBadges: props.showActiveTabUnreadBadges,
				showActiveTabMentionBadges: props.showActiveTabMentionBadges,
				showActiveTabTypingBadge: props.showActiveTabTypingBadge,
				showEmptyActiveTabBadges: props.showEmptyActiveTabBadges,
				compactStyle: props.compactStyle,
				closeMenu,
			}),
		};
	});
	const buttonRect = e.currentTarget.getBoundingClientRect();
	const favContainer = document.querySelector('.channelTabs-favContainer');
	const originalAppRegion = favContainer ? favContainer.style.webkitAppRegion : null;
	if (favContainer) {
		favContainer.style.webkitAppRegion = 'no-drag';
	}
	const styleId = "channelTabs-menuStyle";
	let styleEl = document.getElementById(styleId);
	if (!styleEl) {
		styleEl = document.createElement("style");
		styleEl.id = styleId;
		document.head.appendChild(styleEl);
	}
	styleEl.textContent = StyleManager.getTabListMenuStyle();
	ContextMenu.open(
		e,
		ContextMenu.buildMenu([
			{
				type: "group",
				items: menuItems
			}
		]),
		{
			position: "bottom",
			align: "right",
			onClose: () => {
				if (favContainer) {
					if (originalAppRegion === null) {
						favContainer.style.removeProperty('-webkit-app-region');
					} else {
						favContainer.style.webkitAppRegion = originalAppRegion;
					}
				}
				setTimeout(() => {
					const style = document.getElementById(styleId);
					if (style) style.remove();
				}, 100);
			}
		}
	);
	requestAnimationFrame(() => {
		const menu = document.querySelector('[role="menu"]');
		if (menu && menu.style) {
			Object.assign(menu.style, StyleManager.getDropdownMenuPosition(buttonRect));
		}
	});
}
function CreateSettingsContextMenu(instance, e) {
	ContextMenu.open(
		e,
		(props) => {
			const pluginName = instance.props.plugin.getSettingsPath();
			const settings =
				BdApi.Hooks.useData(pluginName, "settings") ||
				instance.props.plugin.settings ||
				{};
			const getSetting = (key, fallback) =>
				settings?.[key] ?? instance.props.plugin.settings?.[key] ?? fallback;
			const setSetting = (key, value, afterSave) =>
				instance.props.plugin.updateSettings({ [key]: value }, afterSave);
			const toggleSetting = (key, afterSave) =>
				setSetting(key, !getSetting(key), afterSave);
			const getMode = () =>
				getSetting("tabLayoutMode", TabStateStore.getState().tabLayoutMode);
			const handleTabWidthChange = (value) => {
				const roundedValue = Math.floor(value / 10) * 10;
				const applyConstants = instance.props.plugin.applyStyle.bind(
					instance.props.plugin,
					"channelTabs-style-constants",
				);
				setSetting("tabWidthMin", roundedValue, applyConstants);
			};
			return ContextMenu.buildMenu([
				{
					type: "group",
					items: mergeLists({
						values: [
							{
								label: pluginMeta.name,
								subtext: "Version " + pluginMeta.version,
							},
							{
								type: "separator",
							},
							{
								id: "shortcutLabel",
								disabled: true,
								label: "Shortcuts:",
							},
							{
								id: "shortcutLabelKeys",
								disabled: true,
								render: () => {
									return /* @__PURE__ */ React.createElement(
										"div",
										{ className: "channelTabs-shortcutLabelKeys" },
										`Ctrl + W - Close Current Tab
Ctrl + PgUp - Navigate to Left Tab
Ctrl + PgDn - Navigate to Right Tab
Ctrl + Shift + T - Reopen Last Closed Tab
CTRL + Mouse Scroll - Switch Tab Layout
									`,
									);
								},
							},
							{
								type: "submenu",
								id: "tabLayout",
								label: "Tab Layout",
								items: [
									{
										type: "radio",
										id: "tabLayout_single",
										group: "tabLayout",
										label: "Single Row",
										checked: getMode() === "single",
										action: () => {
											if (getMode() !== "single") {
												setSetting("tabLayoutMode", "single");
											}
										},
									},
									{
										type: "radio",
										id: "tabLayout_multi",
										group: "tabLayout",
										label: "Multi-Row",
										checked: getMode() === "multi",
										action: () => {
											if (getMode() !== "multi") {
												setSetting("tabLayoutMode", "multi");
											}
										},
									},
								],
							},
							{
								type: "separator",
							},
							{
								label: "Updates",
								type: "submenu",
								items: [
									{
										label: "Update Notifications",
										type: "toggle",
										checked: () => getSetting("autoUpdate", true) !== false,
										action: () => {
											const newValue = getSetting("autoUpdate", true) === false;
											setSetting("autoUpdate", newValue);
											if (newValue) {
												instance.props.plugin.updateManager.start(true);
											} else {
												instance.props.plugin.updateManager.stop();
											}
										}
									},
									{
										type: "separator"
									},
									{
										label: "Check for Updates",
										action: () => {
											instance.props.plugin.updateManager.check(false);
										}
									},
									{
										label: "View Full Changelog",
										action: () => {
											instance.props.plugin.updateManager.showFullChangelog();
										}
									}
								]
							},
							{
								type: "separator",
							},
							{
								type: "submenu",
								label: "Recently Closed Tabs",
								items: getClosedTabsMenuItems(),
							},
							{
								type: "separator",
							},
							{
								label: "Settings:",
								id: "settingHeader",
								disabled: true,
							},
							{
								type: "separator",
							},
							{
								type: "submenu",
								label: "Startup",
								items: [
									{
										label: "Reopen Last Channel on Startup",
										type: "toggle",
										id: "reopenLastChannel",
										checked: () => !!getSetting("reopenLastChannel", false),
										action: () => toggleSetting("reopenLastChannel"),
									},
								],
							},
							{
								type: "submenu",
								label: "Appearance",
								items: [
									{
										label: "Use Compact Appearance",
										type: "toggle",
										id: "useCompactLook",
										checked: () => !!getSetting("compactStyle", false),
										action: () =>
											toggleSetting("compactStyle", () => {
												instance.props.plugin.removeStyle();
												instance.props.plugin.applyStyle();
											}),
									},
									{
										label: "Privacy Mode",
										type: "toggle",
										id: "privacyMode",
										checked: () => !!getSetting("privacyMode", false),
										action: () =>
											toggleSetting("privacyMode", () => {
												instance.props.plugin.removeStyle();
												instance.props.plugin.applyStyle();
											}),
									},
									{
										label: "Radial Status Indicators",
										type: "toggle",
										id: "radialStatusMode",
										checked: () => !!getSetting("radialStatusMode", false),
										action: () =>
											toggleSetting("radialStatusMode", () => {
												instance.props.plugin.removeStyle();
												instance.props.plugin.applyStyle();
											}),
									},
									{
										type: "separator",
									},
									{
										label: "Minimum Tab Width",
										style: { pointerEvents: "none" },
									},
									{
										id: "tabWidthMin",
										render: () => {
											return /* @__PURE__ */ React.createElement(
												"div",
												{ className: "channelTabs-sliderContainer" },
												/* @__PURE__ */ React.createElement(Slider, {
													"aria-label": "Minimum Tab Width",
													className: "channelTabs-slider",
													mini: true,
													orientation: "horizontal",
													disabled: false,
													initialValue:
														getSetting("tabWidthMin", instance.props.plugin.settings.tabWidthMin),
													minValue: 50,
													maxValue: 220,
													onValueRender: (value) =>
														Math.floor(value / 10) * 10 + "px",
													onValueChange: handleTabWidthChange,
												}),
											);
										},
									},
									{
										type: "separator",
									},
									{
										label: "Show Tab Bar",
										type: "toggle",
										id: "showTabBar",
										color: "danger",
										checked: () => !!getSetting("showTabBar", true),
										action: () => toggleSetting("showTabBar"),
									},
									{
										label: "Show Fav Bar",
										type: "toggle",
										id: "showFavBar",
										color: "danger",
										checked: () => !!getSetting("showFavBar", true),
										action: () => toggleSetting("showFavBar"),
									},
									{
										label: "Show Quick Settings",
										type: "toggle",
										id: "showQuickSettings",
										color: "danger",
										checked: () => !!getSetting("showQuickSettings", true),
										action: () => toggleSetting("showQuickSettings"),
									},
									{
										label: "Show Navigation Buttons",
										type: "toggle",
										id: "showNavButtons",
										checked: () => !!getSetting("showNavButtons", true),
										action: () =>
											toggleSetting("showNavButtons", () => {
												instance.props.plugin.removeStyle();
												instance.props.plugin.applyStyle();
											}),
									},
								],
							},
							{
								type: "submenu",
								label: "Behavior",
								items: [
									{
										label: "Always Focus New Tabs",
										type: "toggle",
										id: "alwaysFocusNewTabs",
										checked: () => !!getSetting("alwaysFocusNewTabs", false),
										action: () => toggleSetting("alwaysFocusNewTabs"),
									},
									{
										label: "Primary Forward/Back Navigation",
										type: "toggle",
										id: "useStandardNav",
										checked: () => !!getSetting("useStandardNav", false),
										action: () => toggleSetting("useStandardNav"),
									},
								],
							},
							{
								type: "submenu",
								label: "Badge Visibility",
								items: [
									{
										type: "separator",
										id: "header1_1",
									},
									{
										label: "Favs:",
										id: "header1_2",
										disabled: true,
									},
									{
										type: "separator",
										id: "header1_3",
									},
									{
										label: "Show Mentions",
										type: "toggle",
										id: "favs_Mentions",
										checked: () => !!getSetting("showFavMentionBadges", true),
										action: () => toggleSetting("showFavMentionBadges"),
									},
									{
										label: "Show Unreads",
										type: "toggle",
										id: "favs_Unreads",
										checked: () => !!getSetting("showFavUnreadBadges", true),
										action: () => toggleSetting("showFavUnreadBadges"),
									},
									{
										label: "Show Typing",
										type: "toggle",
										id: "favs_Typing",
										checked: () => !!getSetting("showFavTypingBadge", true),
										action: () => toggleSetting("showFavTypingBadge"),
									},
									{
										label: "Show Empty Mentions/Unreads",
										type: "toggle",
										id: "favs_Empty",
										checked: () => !!getSetting("showEmptyFavBadges", false),
										action: () => toggleSetting("showEmptyFavBadges"),
									},
									{
										type: "separator",
										id: "header4_1",
									},
									{
										label: "Fav Groups:",
										id: "header4_2",
										disabled: true,
									},
									{
										type: "separator",
										id: "header4_3",
									},
									{
										label: "Show Mentions",
										type: "toggle",
										id: "favGroups_Mentions",
										checked: () =>
											!!getSetting("showFavGroupMentionBadges", true),
										action: () => toggleSetting("showFavGroupMentionBadges"),
									},
									{
										label: "Show Unreads",
										type: "toggle",
										id: "favGroups_Unreads",
										checked: () =>
											!!getSetting("showFavGroupUnreadBadges", true),
										action: () => toggleSetting("showFavGroupUnreadBadges"),
									},
									{
										label: "Show Typing",
										type: "toggle",
										id: "favGroups_Typing",
										checked: () =>
											!!getSetting("showFavGroupTypingBadge", true),
										action: () => toggleSetting("showFavGroupTypingBadge"),
									},
									{
										label: "Show Empty Mentions/Unreads",
										type: "toggle",
										id: "favGroups_Empty",
										checked: () =>
											!!getSetting("showEmptyFavGroupBadges", false),
										action: () => toggleSetting("showEmptyFavGroupBadges"),
									},
									{
										type: "separator",
										id: "header2_1",
									},
									{
										label: "Tabs:",
										id: "header2_2",
										disabled: true,
									},
									{
										type: "separator",
										id: "header2_3",
									},
									{
										label: "Show Mentions",
										type: "toggle",
										id: "tabs_Mentions",
										checked: () => !!getSetting("showTabMentionBadges", true),
										action: () => toggleSetting("showTabMentionBadges"),
									},
									{
										label: "Show Unreads",
										type: "toggle",
										id: "tabs_Unreads",
										checked: () => !!getSetting("showTabUnreadBadges", true),
										action: () => toggleSetting("showTabUnreadBadges"),
									},
									{
										label: "Show Typing",
										type: "toggle",
										id: "tabs_Typing",
										checked: () => !!getSetting("showTabTypingBadge", true),
										action: () => toggleSetting("showTabTypingBadge"),
									},
									{
										label: "Show Empty Mentions/Unreads",
										type: "toggle",
										id: "tabs_Empty",
										checked: () => !!getSetting("showEmptyTabBadges", false),
										action: () => toggleSetting("showEmptyTabBadges"),
									},
									{
										type: "separator",
										id: "header3_1",
									},
									{
										label: "Active Tabs:",
										id: "header3_2",
										disabled: true,
									},
									{
										type: "separator",
										id: "header3_3",
									},
									{
										label: "Show Mentions",
										type: "toggle",
										id: "activeTabs_Mentions",
										checked: () =>
											!!getSetting("showActiveTabMentionBadges", false),
										action: () => toggleSetting("showActiveTabMentionBadges"),
									},
									{
										label: "Show Unreads",
										type: "toggle",
										id: "activeTabs_Unreads",
										checked: () =>
											!!getSetting("showActiveTabUnreadBadges", false),
										action: () => toggleSetting("showActiveTabUnreadBadges"),
									},
									{
										label: "Show Typing",
										type: "toggle",
										id: "activeTabs_Typing",
										checked: () =>
											!!getSetting("showActiveTabTypingBadge", false),
										action: () => toggleSetting("showActiveTabTypingBadge"),
									},
									{
										label: "Show Empty Mentions/Unreads",
										type: "toggle",
										id: "activeTabs_Empty",
										checked: () =>
											!!getSetting("showEmptyActiveTabBadges", false),
										action: () => toggleSetting("showEmptyActiveTabBadges"),
									},
								],
							},
						],
					}),
				},
			])(props);
		},
		{
			position: "right",
			align: "top",
		},
	);
}
function getClosedTabsMenuItems() {
	const closedTabs = TabStateStore.getState().closedTabs || [];
	if (closedTabs.length === 0) {
		return [{
			label: "No recently closed tabs",
			disabled: true
		}];
	}
	const items = closedTabs.slice(0, 10).map(tab => ({
		label: tab.name,
		subtext: formatTimeAgo(tab.closedAt),
		action: () => TabActions.reopenClosedTab(tab.id)
	}));
	if (closedTabs.length > 10) {
		items.push({
			type: "separator"
		}, {
			label: `View all ${closedTabs.length} closed tabs...`,
			action: () => showClosedTabsModal()
		});
	}
	items.push({
		type: "separator"
	}, {
		label: "Clear all closed tabs",
		color: "danger",
		action: () => {
			updateClosedTabs(() => []);
			TabActions.persistState();
		}
	});
	return items;
}
function formatTimeAgo(timestamp) {
	const seconds = Math.floor((Date.now() - timestamp) / 1000);
	if (seconds < 60) return "Just now";
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
	return new Date(timestamp).toLocaleDateString();
}
function showClosedTabsModal() {
	const closedTabs = TabStateStore.getState().closedTabs || [];
	BdApi.UI.showConfirmationModal(
		"Closed Tabs History",
		React.createElement("div", { className: "channelTabs-closedTabsContainer" },
			closedTabs.length === 0
				? React.createElement("div", { className: "channelTabs-closedTabsEmpty" },
					"No closed tabs in history")
				: closedTabs.map(tab =>
					React.createElement("div", {
						key: tab.id,
						className: "channelTabs-closedTabItem",
						onClick: () => {
							TabActions.reopenClosedTab(tab.id);
						}
					},
						React.createElement("img", {
							src: tab.iconUrl || DefaultUserIconGrey,
							className: "channelTabs-closedTabIcon"
						}),
						React.createElement("div", { className: "channelTabs-closedTabInfo" },
							React.createElement("div", { className: "channelTabs-closedTabName" },
								tab.name),
							React.createElement("div", { className: "channelTabs-closedTabMeta" },
								formatTimeAgo(tab.closedAt) +
								(tab.history && tab.history.length > 1
									? ` - ${tab.history.length} pages in history`
									: "")
							)
						),
						React.createElement("button", {
							className: "channelTabs-closedTabButton",
							onClick: (e) => {
								e.stopPropagation();
								TabActions.reopenClosedTab(tab.id);
							}
						}, "Reopen")
					)
				)
		),
		{
			confirmText: "Close",
			cancelText: "Clear All",
			onCancel: () => {
				updateClosedTabs(() => []);
				TabActions.persistState();
			}
		}
	);
}
let closeAllDropdownsRef = null;
const closeAllDropdowns = () => {
	if (closeAllDropdownsRef) {
		closeAllDropdownsRef();
	}
};
const useDragOverPosition = (getNode, deps, setLocalDropPosition) =>
	React.useEffect(() => {
		const node = getNode();
		if (!node) return;
		const handleDragOver = (e) => {
			e.preventDefault();
			const rect = node.getBoundingClientRect();
			const elementWidth = rect.width ?? rect.right - rect.left;
			const mouseX = e.clientX - rect.left;
			const ratio = mouseX / elementWidth;
			let newPosition = "inside";
			if (ratio < 0.25) newPosition = "before";
			else if (ratio > 0.75) newPosition = "after";
			setLocalDropPosition(newPosition);
		};
		node.addEventListener("dragover", handleDragOver);
		return () => node.removeEventListener("dragover", handleDragOver);
	}, deps);
const mergeLists = (...items) => {
	return items
		.filter((item) => item.include === void 0 || item.include)
		.flatMap((item) => item.values);
};
const getGuildChannels = (...guildIds) => {
	let channels;
	if (ChannelStore.getGuildChannels) {
		channels = Object.values(ChannelStore.getGuildChannels());
	} else if (ChannelStore.getMutableGuildChannels) {
		channels = Object.values(ChannelStore.getMutableGuildChannels());
	} else {
		channels = [];
	}
	return channels.filter(
		(c) =>
			guildIds.includes(c.guild_id) &&
			c.type !== DiscordConstants.ChannelTypes.GUILD_VOICE &&
			c.type !== DiscordConstants.ChannelTypes.GUILD_CATEGORY,
	);
};
const updateFavEntry = (fav) => {
	if (fav.guildId) {
		if (Date.now() - lastCacheClean > 30000) {
			guildChannelCache.clear();
			lastCacheClean = Date.now();
		}
		let channels = guildChannelCache.get(fav.guildId);
		if (!channels) {
			channels = getGuildChannels(fav.guildId);
			guildChannelCache.set(fav.guildId, channels);
		}
		const channelIds = channels
			.filter(
				(channel) =>
					PermissionUtils.can(Permissions.VIEW_CHANNEL, channel) &&
					!MutedStore.isChannelMuted(channel.guild_id, channel.id),
			)
			.map((channel) => channel.id);
		return {
			unreadCount: channelIds
				.map(
					(id) =>
						UnreadStateStore.getUnreadCount(id) ||
						UnreadStateStore.getMentionCount(id) ||
						(UnreadStateStore.hasUnread(id) ? 1 : 0),
				)
				.reduce((a, b) => a + b, 0),
			unreadEstimated:
				channelIds.some((id) => UnreadStateStore.isEstimated(id)) ||
				channelIds.some(
					(id) =>
						UnreadStateStore.getUnreadCount(id) === 0 &&
						UnreadStateStore.hasUnread(id),
				),
			hasUnread: channelIds.some((id) => UnreadStateStore.hasUnread(id)),
			mentionCount: channelIds
				.map((id) => UnreadStateStore.getMentionCount(id) || 0)
				.reduce((a, b) => a + b, 0),
			selected: SelectedGuildStore.getGuildId() === fav.guildId,
			isTyping: isChannelTyping(fav.channelId),
			currentStatus: getCurrentUserStatus(fav.url),
		};
	} else {
		return {
			unreadCount:
				UnreadStateStore.getUnreadCount(fav.channelId) ||
				UnreadStateStore.getMentionCount(fav.channelId) ||
				(UnreadStateStore.hasUnread(fav.channelId) ? 1 : 0),
			unreadEstimated:
				UnreadStateStore.isEstimated(fav.channelId) ||
				(UnreadStateStore.hasUnread(fav.channelId) &&
					UnreadStateStore.getUnreadCount(fav.channelId) === 0),
			hasUnread: UnreadStateStore.hasUnread(fav.channelId),
			mentionCount: UnreadStateStore.getMentionCount(fav.channelId),
			selected: SelectedChannelStore.getChannelId() === fav.channelId,
			isTyping: isChannelTyping(fav.channelId),
			currentStatus: getCurrentUserStatus(fav.url),
		};
	}
};
const useTabIndicators = (channelId, url) =>
	Hooks.useStateFromStores(
		[UnreadStateStore, UserTypingStore, UserStatusStore],
		() => ({
			unreadCount: UnreadStateStore.getUnreadCount(channelId),
			unreadEstimated: UnreadStateStore.isEstimated(channelId),
			hasUnread: UnreadStateStore.hasUnread(channelId),
			mentionCount: UnreadStateStore.getMentionCount(channelId),
			hasUsersTyping: isChannelTyping(channelId),
			currentStatus: getCurrentUserStatus(url),
		}),
		[channelId, url],
		(prev, next) =>
			prev.unreadCount === next.unreadCount &&
			prev.unreadEstimated === next.unreadEstimated &&
			prev.hasUnread === next.hasUnread &&
			prev.mentionCount === next.mentionCount &&
			prev.hasUsersTyping === next.hasUsersTyping &&
			prev.currentStatus === next.currentStatus
	);
const useFavIndicators = (fav) =>
	Hooks.useStateFromStores(
		[
			UnreadStateStore,
			UserTypingStore,
			SelectedChannelStore,
			SelectedGuildStore,
		],
		() => updateFavEntry(fav),
		[fav?.channelId, fav?.guildId, fav?.url],
		(prev, next) =>
			prev.unreadCount === next.unreadCount &&
			prev.unreadEstimated === next.unreadEstimated &&
			prev.hasUnread === next.hasUnread &&
			prev.mentionCount === next.mentionCount &&
			prev.selected === next.selected &&
			prev.isTyping === next.isTyping &&
			prev.currentStatus === next.currentStatus
	);
const useFavGroupIndicators = (favGroup, favs) =>
	Hooks.useStateFromStores(
		[
			UnreadStateStore,
			UserTypingStore,
			SelectedChannelStore,
			SelectedGuildStore,
		],
		() => {
			let unreadCount = 0;
			let unreadEstimated = 0;
			let hasUnread = false;
			let mentionCount = 0;
			let isTyping = false;
			for (const fav of favs) {
				if (fav && fav.groupId === favGroup.groupId) {
					const hasUnreads = isChannelDM(fav.channelId);
					const result = updateFavEntry(fav);
					if (!hasUnreads) unreadCount += result.unreadCount;
					mentionCount += result.mentionCount;
					if (!hasUnreads) unreadEstimated += result.unreadEstimated;
					if (!hasUnreads) hasUnread = result.hasUnread ? true : hasUnread;
					isTyping = result.isTyping ? true : isTyping;
				}
			}
			return {
				unreadCount,
				mentionCount,
				unreadEstimated,
				hasUnread,
				isTyping,
			};
		},
		[favGroup?.groupId, favs],
		(prev, next) =>
			prev.unreadCount === next.unreadCount &&
			prev.mentionCount === next.mentionCount &&
			prev.unreadEstimated === next.unreadEstimated &&
			prev.hasUnread === next.hasUnread &&
			prev.isTyping === next.isTyping
	);
const getCurrentUserStatus = (pathname = location.pathname) => {
	const cId = (pathname.match(/^\/channels\/(\d+|@me|@favorites)\/(\d+)/) ||
		[])[2];
	if (cId) {
		const channel = ChannelStore.getChannel(cId);
		if (channel?.guild_id) {
			return "none";
		} else if (channel?.isDM()) {
			const user = UserStore.getUser(channel.getRecipientId());
			if (!user) return "none";
			const status = UserStatusStore.getStatus(user.id);
			return status;
		} else if (channel?.isGroupDM()) {
			return "none";
		}
	}
	return "none";
};
const getChannelTypingTooltipText = (userIds) => {
	if (userIds) {
		const usernames = userIds
			.map((userId) => UserStore.getUser(userId))
			.filter(Boolean)
			.map((user) => user.tag);
		const remainingUserCount = userIds.length - usernames.length;
		const text = (() => {
			if (usernames.length === 0) {
				return `${remainingUserCount} user${remainingUserCount > 1 ? "s" : ""}`;
			} else if (userIds.length > 2) {
				const otherCount = usernames.length - 1 + remainingUserCount;
				return `${usernames[0]} and ${otherCount} other${otherCount > 1 ? "s" : ""}`;
			} else if (remainingUserCount === 0) {
				return usernames.join(", ");
			} else {
				return `${usernames.join(", ")} and ${remainingUserCount} other${remainingUserCount > 1 ? "s" : ""}`;
			}
		})();
		return text;
	}
	return "Someone is Typing...";
};
const getChannelTypingUsers = (channel_id) => {
	const channel = ChannelStore.getChannel(channel_id);
	const selfId = UserStore.getCurrentUser()?.id;
	if (channel) {
		const typingData = UserTypingStore.getTypingUsers(channel_id) || {};
		const userIds = Object.keys(typingData).filter((uId) => uId !== selfId);
		const typingUsers = [...new Set(userIds)];
		return typingUsers;
	}
	return null;
};
const isChannelTyping = (channel_id) => {
	const channel = ChannelStore.getChannel(channel_id);
	const selfId = UserStore.getCurrentUser()?.id;
	if (channel) {
		const typingData = UserTypingStore.getTypingUsers(channel_id) || {};
		const userIds = Object.keys(typingData).filter((uId) => uId !== selfId);
		const typingUsers = [...new Set(userIds)];
		return typingUsers && typingUsers.length > 0;
	}
	return false;
};
const isChannelDM = (channel_id) => {
	return (() => {
		const c = ChannelStore.getChannel(channel_id);
		return c && (c.isDM() || c.isGroupDM());
	})();
};
const getCurrentName = (pathname = location.pathname) => {
	const [, gId, cId] =
		pathname.match(/^\/channels\/(\d+|@me|@favorites)\/\b(\d+|\w+(-\w+)*)\b/) ||
		[];
	if (cId) {
		const channel = ChannelStore.getChannel(cId);
		const guild = GuildStore.getGuild(gId);
		if (channel?.name) return (channel.guildId ? "@" : "#") + channel.name;
		else if (guild?.name) return guild.name;
		else if (channel?.rawRecipients)
			return (
				channel.rawRecipients
					.map((u) =>
						!u.display_name && !u.global_name && u.bot
							? `BOT (@${u.username})`
							: RelationshipStore.getNickname(u.id) ||
							u.display_name ||
							u.global_name ||
							u.username,
					)
					.join(", ") ||
				`${channel.rawRecipients[0].display_name || channel.rawRecipients[0].global_name || channel.rawRecipients[0].username} (@${channel.rawRecipients[0].username})`
			);
		else return pathname;
	} else {
		if (pathname === "/channels/@me") return "Friends";
		if (pathname.match(/^\/[a-z-]+$/))
			return pathname
				.substr(1)
				.split("-")
				.map((part) => part.substr(0, 1).toUpperCase() + part.substr(1))
				.join(" ");
		return pathname;
	}
};
const getCurrentIconUrl = (pathname = location.pathname) => {
	try {
		const [, gId, cId] =
			pathname.match(
				/^\/channels\/(\d+|@me|@favorites)(?:\/\b(\d+|\w+(-\w+)*)\b)?/,
			) || [];
		if (gId) {
			if (cId && gId.startsWith("@")) {
				const channel = ChannelStore.getChannel(cId);
				if (!channel) {
					return DefaultUserIconGrey;
				}
				if (channel.isDM()) {
					const user = UserStore.getUser(channel.getRecipientId());
					return user ? user.getAvatarURL() : DefaultUserIconGrey;
				}
				return IconUtilities.getChannelIconURL(channel);
			} else if (!gId.startsWith("@")) {
				const guild = GuildStore.getGuild(gId);
				return guild
					? (IconUtilities.getGuildIconURL(guild) ?? DefaultUserIconGrey)
					: DefaultUserIconGrey;
			}
		}
	} catch (error) {
		console.error("Error in getCurrentIconUrl:", error);
	}
	return DefaultUserIconGrey;
};
const GetTabStyles = (viewMode, item) => {
	if (item === "unreadBadge") {
		if (viewMode === "classic") return " channelTabs-classicBadgeAlignment";
		else if (viewMode === "alt") return " channelTabs-badgeAlignLeft";
	} else if (item === "mentionBadge") {
		if (viewMode === "classic") return " channelTabs-classicBadgeAlignment";
		else if (viewMode === "alt") return " channelTabs-badgeAlignRight";
	} else if (item === "typingBadge") {
		if (viewMode === "classic") return " channelTabs-classicBadgeAlignment";
		else if (viewMode === "alt") return " channelTabs-typingBadgeAlignment";
	}
	return "";
};
const TabIcon = (props) =>
	/* @__PURE__ */ React.createElement("img", {
	className: "channelTabs-tabIcon",
	src: getCurrentIconUrl(props.url),
});
const TabStatus = (props) =>
	/* @__PURE__ */ React.createElement("rect", {
	width: 6,
	height: 6,
	x: 14,
	y: 14,
	className:
		"channelTabs-tabStatus" +
		(props.currentStatus == "online" ? " channelTabs-onlineIcon" : "") +
		(props.currentStatus == "idle" ? " channelTabs-idleIcon" : "") +
		(props.currentStatus == "dnd" ? " channelTabs-doNotDisturbIcon" : "") +
		(props.currentStatus == "offline" ? " channelTabs-offlineIcon" : "") +
		(props.currentStatus == "none" ? " channelTabs-noneIcon" : ""),
});
const TabName = (props) =>
	/* @__PURE__ */ React.createElement(
	"span",
	{ className: "channelTabs-tabName" },
	props.name,
);
const TabClose = (props) =>
	props.tabCount < 2
		? null
		: /* @__PURE__ */ React.createElement(
			"div",
			{
				className: "channelTabs-closeTab",
				onClick: (e) => {
					e.stopPropagation();
					props.closeTab();
				},
			},
				/* @__PURE__ */ React.createElement(Close, null),
		);
const TabUnreadBadge = (props) =>
	/* @__PURE__ */ React.createElement(
	"div",
	{
		className:
			"channelTabs-unreadBadge" +
			(props.hasUnread ? "" : " channelTabs-noUnread") +
			GetTabStyles(props.viewMode, "unreadBadge"),
	},
	props.unreadCount + (props.unreadEstimated ? "+" : ""),
);
const TabMentionBadge = (props) =>
	/* @__PURE__ */ React.createElement(
	"div",
	{
		className:
			"channelTabs-mentionBadge" +
			(props.mentionCount === 0 ? " channelTabs-noMention" : "") +
			GetTabStyles(props.viewMode, "mentionBadge"),
	},
	props.mentionCount,
);
const TabTypingBadge = ({ viewMode, isTyping, userIds }) => {
	if (isTyping === false || !Spinner) return null;
	const text = getChannelTypingTooltipText(userIds);
	return /* @__PURE__ */ React.createElement(
		"div",
		{
			className:
				"channelTabs-TypingContainer" + GetTabStyles(viewMode, "typingBadge"),
		},
		/* @__PURE__ */ React.createElement(
			Tooltip,
			{ text, position: "bottom" },
			(tooltipProps) =>
				/* @__PURE__ */ React.createElement(Spinner, {
				...tooltipProps,
				type: "pulsingEllipsis",
				className: `channelTabs-typingBadge`,
				animated: isTyping,
			}),
		),
	);
};
function renderTabTypingBadge(props, viewMode) {
	const showTypingBadge = props.selected
		? props.showActiveTabTypingBadge
		: props.showTabTypingBadge;
	if (!showTypingBadge) return null;
	return /* @__PURE__ */ React.createElement(TabTypingBadge, {
		viewMode,
		isTyping: props.hasUsersTyping,
		userIds: getChannelTypingUsers(props.channelId),
	});
}
function renderTabUnreadBadge(props, viewMode) {
	const showUnreadBadges = props.selected
		? props.showActiveTabUnreadBadges
		: props.showTabUnreadBadges;
	if (!showUnreadBadges) return null;
	if (!props.channelId || (ChannelStore.getChannel(props.channelId)?.isPrivate() ?? true)) {
		return null;
	}
	const showEmpty = props.selected
		? props.showEmptyActiveTabBadges
		: props.showEmptyTabBadges;
	if (!showEmpty && !props.hasUnread) return null;
	return /* @__PURE__ */ React.createElement(TabUnreadBadge, {
		viewMode,
		unreadCount: props.unreadCount,
		unreadEstimated: props.unreadEstimated,
		hasUnread: props.hasUnread,
		mentionCount: props.mentionCount,
	});
}
function renderTabMentionBadge(props, viewMode) {
	const showMentionBadges = props.selected
		? props.showActiveTabMentionBadges
		: props.showTabMentionBadges;
	if (!showMentionBadges) return null;
	const showEmpty = props.selected
		? props.showEmptyActiveTabBadges
		: props.showEmptyTabBadges;
	if (!showEmpty && props.mentionCount === 0) return null;
	return /* @__PURE__ */ React.createElement(TabMentionBadge, {
		viewMode,
		mentionCount: props.mentionCount,
	});
}
const CozyTab = (props) => {
	return /* @__PURE__ */ React.createElement(
		"div",
		null,
		/* @__PURE__ */ React.createElement(
			"svg",
			{
				className: "channelTabs-tabIconWrapper",
				width: "20",
				height: "20",
				viewBox: "0 0 20 20",
			},
			/* @__PURE__ */ React.createElement(
				"foreignObject",
				{ x: 0, y: 0, width: 20, height: 20 },
				/* @__PURE__ */ React.createElement(TabIcon, { url: props.url }),
			),
			props.currentStatus === "none"
				? null
				: /* @__PURE__ */ React.createElement(TabStatus, {
					currentStatus: props.currentStatus,
				}),
		),
		/* @__PURE__ */ React.createElement(TabName, { name: props.name }),
		/* @__PURE__ */ React.createElement(
			"div",
			{ className: "channelTabs-gridContainer" },
			/* @__PURE__ */ React.createElement(
				"div",
				{ className: "channelTabs-gridItemBR" },
				renderTabTypingBadge(props, "classic"),
			),
			/* @__PURE__ */ React.createElement(
				"div",
				{ className: "channelTabs-gridItemTL" },
				renderTabUnreadBadge(props, "alt"),
			),
			/* @__PURE__ */ React.createElement(
				"div",
				{ className: "channelTabs-gridItemTR" },
				renderTabMentionBadge(props, "alt"),
			),
			/* @__PURE__ */ React.createElement("div", {
				className: "channelTabs-gridItemBL",
			}),
		),
	);
};
const CompactTab = (props) => {
	return /* @__PURE__ */ React.createElement(
		"div",
		null,
		/* @__PURE__ */ React.createElement(
			"svg",
			{
				className: "channelTabs-tabIconWrapper",
				width: "20",
				height: "20",
				viewBox: "0 0 20 20",
			},
			/* @__PURE__ */ React.createElement(
				"foreignObject",
				{ x: 0, y: 0, width: 20, height: 20 },
				/* @__PURE__ */ React.createElement(TabIcon, { url: props.url }),
			),
			props.currentStatus === "none"
				? null
				: /* @__PURE__ */ React.createElement(TabStatus, {
					currentStatus: props.currentStatus,
				}),
		),
		/* @__PURE__ */ React.createElement(TabName, { name: props.name }),
		renderTabTypingBadge(props, "classic"),
		renderTabUnreadBadge(props, "classic"),
		renderTabMentionBadge(props, "classic"),
	);
};
const BaseTab = (props) => {
	const { isDragging, dragRef, isOver, canDrop, dropRef, draggedIsMe } = props;
	const [localDropPosition, setLocalDropPosition] = React.useState(null);
	useDragOverPosition(
		() => tabNodeRefs.get(props.url),
		[props.url],
		setLocalDropPosition,
	);
	const combinedRef = React.useCallback((node) => {
		dragRef(node);
		dropRef(node);
		if (node) {
			tabNodeRefs.set(props.url, node);
		} else {
			tabNodeRefs.delete(props.url);
		}
	}, [dragRef, dropRef, props.url]);
	return /* @__PURE__ */ React.createElement(
		"div",
		{
			ref: combinedRef,
			role: "tab",
			"aria-selected": props.selected,
			tabIndex: props.selected ? 0 : -1,
			className:
				"channelTabs-tab" +
				(props.selected ? " channelTabs-selected" : "") +
				(props.minimized ? " channelTabs-minimized" : "") +
				(props.hasUnread ? " channelTabs-unread" : "") +
				(props.mentionCount > 0 ? " channelTabs-mention" : "") +
				(isDragging ? " channelTabs-dragging" : "") +
				(isOver && canDrop && !draggedIsMe && localDropPosition === 'before' ? " channelTabs-drop-before" : "") +
				(isOver && canDrop && !draggedIsMe && localDropPosition === 'after' ? " channelTabs-drop-after" : ""),
			"data-mention-count": props.mentionCount,
			"data-unread-count": props.unreadCount,
			"data-unread-estimated": props.unreadEstimated,
			onClick: () => {
				if (!props.selected) props.switchToTab(props.tabIndex);
			},
			onKeyDown: (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					if (!props.selected) props.switchToTab(props.tabIndex);
				} else if (e.key === 'ArrowLeft' && props.tabIndex > 0) {
					e.preventDefault();
					const nextIndex = props.tabIndex - 1;
					props.switchToTab(nextIndex);
					props.focusTab?.(nextIndex);
				} else if (e.key === 'ArrowRight' && props.tabIndex < props.tabCount - 1) {
					e.preventDefault();
					const nextIndex = props.tabIndex + 1;
					props.switchToTab(nextIndex);
					props.focusTab?.(nextIndex);
				}
			},
			onMouseUp: (e) => {
				if (e.button !== 1) return;
				e.preventDefault();
				props.closeTab(props.tabIndex);
			},
			onContextMenu: (e) => {
				CreateTabContextMenu(props, e);
			},
			onDoubleClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		props.compactStyle ? CompactTab(props) : CozyTab(props),
		/* @__PURE__ */ React.createElement(TabClose, {
			tabCount: props.tabCount,
			closeTab: () => props.closeTab(props.tabIndex),
		}),
	);
};
const DroppableTab = makeDroppable(
	[DNDTypes.TAB, DNDTypes.FAVORITE],
	(props, monitor) => {
		const dropped = monitor.getItem();
		const itemType = monitor.getItemType();
		if (props.url === dropped.url) {
			return;
		}
		const hoverBoundingRect = monitor.getClientOffset();
		const targetNode = tabNodeRefs.get(props.url);
		const componentRect = targetNode ? targetNode.getBoundingClientRect() : null;
		let insertBefore = false;
		if (hoverBoundingRect && componentRect) {
			const hoverMiddleX = (componentRect.right - componentRect.left) / 2;
			const hoverClientX = hoverBoundingRect.x - componentRect.left;
			insertBefore = hoverClientX < hoverMiddleX;
		}
		let toIndex = insertBefore ? props.tabIndex : props.tabIndex + 1;
		if (itemType === DNDTypes.TAB) {
			if (!hoverBoundingRect || !componentRect) {
				toIndex = props.tabIndex + 1;
				if (dropped.tabIndex < toIndex) toIndex -= 1;
				props.moveTab(dropped.tabIndex, toIndex);
				return;
			}
			if (dropped.tabIndex < toIndex) {
				toIndex -= 1;
			}
			props.moveTab(dropped.tabIndex, toIndex);
		} else if (itemType === DNDTypes.FAVORITE) {
			props.openFavAsTabAt(dropped, toIndex);
		}
	},
	() => { }
)(BaseTab);
const DraggableDroppableTab = makeDraggable(DNDTypes.TAB)(DroppableTab);
const Tab = (props) =>
	/* @__PURE__ */ React.createElement(DraggableDroppableTab, {
	...props,
	id: props.url,
	url: props.url,
	tabIndex: props.tabIndex
});
const TabItem = React.memo((props) => {
	const { tab, tabIndex, tabCount, registerRef, isMultiRow, focusTab, ...rest } =
		props;
	const indicators = useTabIndicators(tab.channelId, tab.url);
	return React.createElement(
		"div",
		{
			ref: (el) => registerRef(el),
			className: "channelTabs-tabWrapper",
			style: isMultiRow ? {} : { flexShrink: 0 },
		},
		React.createElement(Tab, {
			...rest,
			focusTab,
			tabCount,
			tabIndex,
			name: tab.name,
			url: tab.url,
			selected: tab.selected,
			minimized: tab.minimized,
			channelId: tab.channelId,
			...indicators,
		}),
	);
});
const FavMoveToGroupList = (props) => {
	const groups = props.favGroups.map((group, index) => {
		const entry = {
			label: group.name,
			id: "entry" + index,
			action: () => props.moveToFavGroup(props.favIndex, group.groupId),
		};
		return entry;
	});
	if (groups.length === 0) {
		return [
			{
				label: "No groups",
				disabled: true,
			},
		];
	}
	return groups;
};
const FavIcon = (props) =>
	/* @__PURE__ */ React.createElement("img", {
	className: "channelTabs-favIcon",
	src: getCurrentIconUrl(props.url),
});
const FavStatus = (props) =>
	/* @__PURE__ */ React.createElement("rect", {
	width: 6,
	height: 6,
	x: 14,
	y: 14,
	className:
		"channelTabs-favStatus" +
		(props.currentStatus == "online" ? " channelTabs-onlineIcon" : "") +
		(props.currentStatus == "idle" ? " channelTabs-idleIcon" : "") +
		(props.currentStatus == "dnd" ? " channelTabs-doNotDisturbIcon" : "") +
		(props.currentStatus == "offline" ? " channelTabs-offlineIcon" : "") +
		(props.currentStatus == "none" ? " channelTabs-noneIcon" : ""),
});
const FavName = (props) =>
	/* @__PURE__ */ React.createElement(
	"span",
	{ className: "channelTabs-favName" },
	props.name,
);
const FavUnreadBadge = (props) =>
	/* @__PURE__ */ React.createElement(
	"div",
	{
		className:
			"channelTabs-unreadBadge" +
			(props.hasUnread ? "" : " channelTabs-noUnread"),
		onClick: props.onClick
			? (e) => {
				e.stopPropagation();
				props.onClick(e);
			}
			: void 0,
	},
	props.unreadCount + (props.unreadEstimated ? "+" : ""),
);
const FavMentionBadge = (props) =>
	/* @__PURE__ */ React.createElement(
	"div",
	{
		className:
			"channelTabs-mentionBadge" +
			(props.mentionCount === 0 ? " channelTabs-noMention" : ""),
	},
	props.mentionCount,
);
const FavTypingBadge = ({ isTyping, userIds }) => {
	if (!Spinner) return null;
	const text = getChannelTypingTooltipText(userIds);
	return /* @__PURE__ */ React.createElement(
		Tooltip,
		{ text, position: "bottom" },
		(tooltipProps) =>
			/* @__PURE__ */ React.createElement(
			"div",
			{
				...tooltipProps,
				className:
					"channelTabs-typingBadge" +
					(isTyping ? "" : " channelTabs-noTyping"),
			},
				/* @__PURE__ */ React.createElement(Spinner, {
				type: "pulsingEllipsis",
				animated: isTyping,
			}),
		),
	);
};
function renderFavUnreadBadge(props) {
	if (!props.showFavUnreadBadges || (!props.channelId && !props.guildId)) return null;
	if (isChannelDM(props.channelId)) return null;
	if (!props.showEmptyFavBadges && props.unreadCount === 0) return null;
	return /* @__PURE__ */ React.createElement(FavUnreadBadge, {
		unreadCount: props.unreadCount,
		unreadEstimated: props.unreadEstimated,
		hasUnread: props.hasUnread,
	});
}
function renderFavMentionBadge(props) {
	if (!props.showFavMentionBadges || (!props.channelId && !props.guildId)) return null;
	if (!props.showEmptyFavBadges && props.mentionCount === 0) return null;
	return /* @__PURE__ */ React.createElement(FavMentionBadge, {
		mentionCount: props.mentionCount,
	});
}
function renderFavTypingBadge(props) {
	if (!props.showFavTypingBadge) return null;
	return /* @__PURE__ */ React.createElement(FavTypingBadge, {
		isTyping: props.isTyping,
		userIds: getChannelTypingUsers(props.channelId),
	});
}
const BaseFav = (props) => {
	const { isDragging, dragRef, isOver, canDrop, dropRef, draggedIsMe } = props;
	const [localDropPosition, setLocalDropPosition] = React.useState(null);
	useDragOverPosition(
		() => favNodeRefs.get(props.url),
		[props.url],
		setLocalDropPosition,
	);
	const combinedRef = React.useCallback((node) => {
		dragRef(node);
		dropRef(node);
		if (node) {
			favNodeRefs.set(props.url, node);
		} else {
			favNodeRefs.delete(props.url);
		}
	}, [dragRef, dropRef, props.url]);
	return /* @__PURE__ */ React.createElement(
		"div",
		{
			ref: combinedRef,
			role: "button",
			"aria-label": props.name,
			tabIndex: 0,
			className:
				"channelTabs-fav" +
				(() => {
					if (props.channelId) return " channelTabs-channel";
					if (props.guildId) return " channelTabs-guild";
					return "";
				})() +
				(props.selected ? " channelTabs-selected" : "") +
				(props.minimized ? " channelTabs-minimized" : "") +
				(props.hasUnread ? " channelTabs-unread" : "") +
				(props.mentionCount > 0 ? " channelTabs-mention" : "") +
				(isDragging ? " channelTabs-dragging" : "") +
				(isOver && canDrop && !draggedIsMe && localDropPosition === 'before' ? " channelTabs-drop-before" : "") +
				(isOver && canDrop && !draggedIsMe && localDropPosition === 'after' ? " channelTabs-drop-after" : ""),
			"data-mention-count": props.mentionCount,
			"data-unread-count": props.unreadCount,
			"data-unread-estimated": props.unreadEstimated,
			onClick: () =>
				props.guildId
					? NavigationUtils.transitionToGuild(
						props.guildId,
						SelectedChannelStore.getChannelId(props.guildId),
					)
					: NavigationUtils.transitionTo(props.url),
			onKeyDown: (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					if (props.guildId) {
						NavigationUtils.transitionToGuild(
							props.guildId,
							SelectedChannelStore.getChannelId(props.guildId),
						);
					} else {
						NavigationUtils.transitionTo(props.url);
					}
				}
			},
			onMouseUp: (e) => {
				if (e.button !== 1) return;
				e.preventDefault();
				props.openInNewTab();
			},
			onContextMenu: (e) => {
				CreateFavContextMenu(props, e);
			},
			onDoubleClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		/* @__PURE__ */ React.createElement(
			"svg",
			{
				className: "channelTabs-favIconWrapper",
				width: "20",
				height: "20",
				viewBox: "0 0 20 20",
			},
		/* @__PURE__ */ React.createElement(
				"foreignObject",
				{ x: 0, y: 0, width: 20, height: 20 },
			/* @__PURE__ */ React.createElement(FavIcon, { url: props.url }),
			),
			props.currentStatus === "none"
				? null
				: /* @__PURE__ */ React.createElement(FavStatus, {
					currentStatus: props.currentStatus,
				}),
		),
		/* @__PURE__ */ React.createElement(FavName, { name: props.name }),
		renderFavUnreadBadge(props),
		renderFavMentionBadge(props),
		renderFavTypingBadge(props),
	);
};
const DroppableFav = makeDroppable(
	[DNDTypes.FAVORITE, DNDTypes.TAB, DNDTypes.GROUP],
	(props, monitor) => {
		const dropped = monitor.getItem();
		const itemType = monitor.getItemType();
		if (props.url === dropped.url && itemType === DNDTypes.FAVORITE) return;
		const hoverBoundingRect = monitor.getClientOffset();
		const targetNode = favNodeRefs.get(props.url);
		const componentRect = targetNode ? targetNode.getBoundingClientRect() : null;
		let insertBefore = false;
		if (hoverBoundingRect && componentRect) {
			const hoverMiddleX = (componentRect.right - componentRect.left) / 2;
			const hoverClientX = hoverBoundingRect.x - componentRect.left;
			insertBefore = hoverClientX < hoverMiddleX;
		}
		const parentId = normalizeParentId(props.groupId);
		const entries = buildParentEntries(TabStateStore.getState().favs, TabStateStore.getState().favGroups, parentId);
		const targetEntryIndex = entries.findIndex((entry) => !entryIsGroup(entry) && entry.favIndex === props.favIndex);
		if (targetEntryIndex === -1) return;
		let insertIndex = insertBefore ? targetEntryIndex : targetEntryIndex + 1;
		let dropEntry = null;
		if (itemType === DNDTypes.GROUP) {
			dropEntry = { type: "group", groupId: dropped.groupId, groupIndex: dropped.groupIndex };
		} else if (itemType === DNDTypes.FAVORITE) {
			dropEntry = { type: "fav", favIndex: dropped.favIndex, url: dropped.url };
		}
		if (dropEntry && (itemType === DNDTypes.FAVORITE || itemType === DNDTypes.GROUP)) {
			const sourceParentId = itemType === DNDTypes.GROUP
				? normalizeParentId(TabStateStore.getState().favGroups[dropped.groupIndex]?.parentId)
				: normalizeParentId(TabStateStore.getState().favs[dropped.favIndex]?.groupId);
			if (sourceParentId === parentId) {
				const sourceIndex = entries.findIndex((entry) => entriesMatch(entry, dropEntry));
				if (sourceIndex !== -1 && sourceIndex < insertIndex) insertIndex -= 1;
			}
		}
		if (itemType === DNDTypes.FAVORITE) {
			props.moveFav(dropped.favIndex, insertIndex, parentId);
		} else if (itemType === DNDTypes.GROUP) {
			props.moveFavGroup(dropped.groupIndex, insertIndex, parentId);
		} else if (itemType === DNDTypes.TAB) {
			props.addTabAsFavAt({ ...dropped, groupId: parentId }, insertIndex);
		}
		return { handledBy: "fav" };
	},
	() => { }
)(BaseFav);
const DraggableDroppableFav = makeDraggable(DNDTypes.FAVORITE)(DroppableFav);
const Fav = (props) =>
	/* @__PURE__ */ React.createElement(DraggableDroppableFav, {
	...props,
	id: props.url,
	url: props.url,
	favIndex: props.favIndex
});
const FavItem = React.memo((props) => {
	const { fav, favIndex, favCount, favGroups, ...rest } = props;
	const indicators = useFavIndicators(fav);
	return React.createElement(Fav, {
		...rest,
		...indicators,
		name: fav.name,
		url: fav.url,
		favCount,
		favGroups,
		favIndex,
		channelId: fav.channelId,
		guildId: fav.guildId,
		groupId: fav.groupId,
		minimized: fav.minimized,
		currentStatus: indicators.currentStatus,
	});
});
const FavFolderWithStores = React.memo((props) => {
	const indicators = useFavGroupIndicators(props.favGroup, props.favs);
	return React.createElement(FavFolder, {
		...props,
		unreadCountGroup: indicators.unreadCount,
		unreadEstimatedGroup: indicators.unreadEstimated,
		mentionCountGroup: indicators.mentionCount,
		hasUnreadGroup: indicators.hasUnread,
		isTypingGroup: indicators.isTyping,
	});
});
const BaseFavRootDrop = (props) =>
	React.createElement("div", { ref: props.dropRef, className: "channelTabs-favRootDrop" }, props.children);
const FavRootDrop = makeDroppable(
	[DNDTypes.FAVORITE, DNDTypes.GROUP, DNDTypes.TAB],
	(props, monitor) => {
		const dropped = monitor.getItem();
		if (monitor.didDrop()) {
			const result = monitor.getDropResult?.();
			if (result?.handledBy) {
				return;
			}
		}
		if (monitor.getItemType() === DNDTypes.FAVORITE) {
			const favKey = dropped.url || dropped.id || dropped.favIndex;
			props.moveToFavGroupByKey(favKey, -1);
		} else if (monitor.getItemType() === DNDTypes.GROUP && dropped.groupId != null) {
			props.reparentFavGroup(dropped.groupId, -1);
		} else if (monitor.getItemType() === DNDTypes.TAB) {
			const parentEntries = buildParentEntries(
				TabStateStore.getState().favs,
				TabStateStore.getState().favGroups,
				DEFAULT_PARENT_ID
			);
			props.addTabAsFavAt({ ...dropped, groupId: DEFAULT_PARENT_ID }, parentEntries.length);
		}
	},
	() => { }
)(BaseFavRootDrop);
function renderFavGroupUnreadBadge(props) {
	if (!props.showFavGroupUnreadBadges) return null;
	if (props.unreadCountGroup === 0 && !props.showEmptyFavGroupBadges) return null;
	return /* @__PURE__ */ React.createElement(FavUnreadBadge, {
		unreadCount: props.unreadCountGroup,
		unreadEstimated: props.unreadEstimatedGroup,
		hasUnread: props.hasUnreadGroup,
		onClick: props.onGroupBadgeClick,
	});
}
function renderFavGroupMentionBadge(props) {
	if (!props.showFavGroupMentionBadges) return null;
	if (props.mentionCountGroup === 0 && !props.showEmptyFavGroupBadges) return null;
	return /* @__PURE__ */ React.createElement(FavMentionBadge, {
		mentionCount: props.mentionCountGroup,
	});
}
function renderFavGroupTypingBadge(props) {
	if (!props.showFavGroupTypingBadge || !props.isTypingGroup) return null;
	return /* @__PURE__ */ React.createElement(FavTypingBadge, {
		isTyping: props.isTypingGroup,
		userIds: null,
	});
}
const NewTab = (props) =>
	/* @__PURE__ */ React.createElement(
	"div",
	{
		className: "channelTabs-newTab",
		onClick: props.openNewTab,
		onDoubleClick: (e) => {
			e.preventDefault();
			e.stopPropagation();
			props.openNewTab();
		}
	},
		/* @__PURE__ */ React.createElement(PlusAlt, null),
);
const TabListMenuItem = (props) => {
	const indicators = useTabIndicators(props.channelId, props.url);
	const combinedProps = {
		...props,
		...indicators,
	};
	const closeMenu = () => {
		if (props.closeMenu) props.closeMenu();
		else ContextMenu.close();
	};
	const handleSwitch = () => {
		props.switchToTab(props.tabIndex);
		if (props.scrollToTab) {
			setTimeout(() => props.scrollToTab(props.tabIndex), 50);
		}
		closeMenu();
	};
	const handleClose = (mode = "single") => {
		props.closeTab(props.tabIndex, mode);
		closeMenu();
	};
	const handleMouseUp = (e) => {
		if (e.button !== 1) return;
		e.preventDefault();
		e.stopPropagation();
		handleClose("single");
	};
	const handleContextMenu = (e) => {
		closeMenu();
		CreateTabContextMenu(
			{
				...combinedProps,
				tabIndex: props.tabIndex,
				tabCount: props.tabCount,
				moveLeft: props.moveLeft,
				moveRight: props.moveRight,
				moveTab: props.moveTab,
				openInNewTab: props.openInNewTab,
				addToFavs: props.addToFavs,
				minimizeTab: props.minimizeTab,
				openFavAsTabAt: props.openFavAsTabAt,
				closeTab: (index, mode) => props.closeTab(index, mode),
			},
			e,
		);
	};
	const className =
		"channelTabs-tab channelTabs-tabListMenuItem" +
		(props.selected ? " channelTabs-selected" : "") +
		(props.minimized ? " channelTabs-minimized" : "") +
		(indicators.hasUnread ? " channelTabs-unread" : "") +
		(indicators.mentionCount > 0 ? " channelTabs-mention" : "");
	// Create simplified badges using classes
	const renderMenuBadges = () => {
		if (props.compactStyle) return null;
		return React.createElement("div", { className: "channelTabs-tabListBadgeContainer" },
			(indicators.mentionCount > 0 || (props.showEmptyActiveTabBadges && props.selected) || (props.showEmptyTabBadges && !props.selected)) &&
			React.createElement("div", { className: "channelTabs-mentionBadge" }, indicators.mentionCount),
			(indicators.hasUnread || (props.showEmptyActiveTabBadges && props.selected) || (props.showEmptyTabBadges && !props.selected)) &&
			React.createElement("div", { className: "channelTabs-unreadBadge" }, indicators.unreadCount)
		);
	};
	return /* @__PURE__ */ React.createElement(
		"div",
		{
			className,
			role: "menuitem",
			"data-mention-count": indicators.mentionCount,
			"data-unread-count": indicators.unreadCount,
			"data-unread-estimated": indicators.unreadEstimated,
			onClick: handleSwitch,
			onMouseUp: handleMouseUp,
			onContextMenu: handleContextMenu,
			tabIndex: props.selected ? 0 : -1,
		},
		React.createElement("img", {
			className: "channelTabs-tabListMenuIcon",
			src: getCurrentIconUrl(props.url)
		}),
		React.createElement("div", {
			className: "channelTabs-tabListMenuName",
			style: StyleManager.getTabListMenuNameStyle(props.selected)
		}, props.name),
		renderMenuBadges(),
		/* @__PURE__ */ React.createElement(TabClose, {
			tabCount: props.tabCount,
			closeTab: () => handleClose("single"),
		}),
	);
};
const TabListDropdown = (props) =>
	/* @__PURE__ */ React.createElement(
	"div",
	{
		className: "channelTabs-tabListDropdown",
		onClick: (e) => CreateTabListContextMenu(props, e),
		title: "Show all tabs"
	},
		/* @__PURE__ */ React.createElement(ChevronDown, null)
);
const NoFavItemsPlaceholder = (props) =>
	/* @__PURE__ */ React.createElement(
	"span",
	{ className: "channelTabs-noFavNotice" },
	"You don't have any favs yet. Right click a tab to mark it as favourite. You can disable this bar in the settings.",
);
const groupHasAnyContent = (groupId, favs, favGroups, visited = new Set()) => {
	if (visited.has(groupId)) return false;
	visited.add(groupId);
	const entries = buildParentEntries(favs, favGroups, groupId);
	for (const entry of entries) {
		if (!entryIsGroup(entry)) return true;
		const child = favGroups[entry.groupIndex];
		if (child && groupHasAnyContent(child.groupId, favs, favGroups, visited)) {
			return true;
		}
	}
	return false;
};
function BaseFavFolder(props) {
	const context = React.useContext(DragContext);
	const { isDragging, dragRef, isOver, canDrop, dropRef, draggedIsMe } = props;
	const isOpen = context.openPath?.includes(props.favGroup.groupId);
	const isRootGroup = (props.favGroup.parentId ?? DEFAULT_PARENT_ID) === DEFAULT_PARENT_ID;
	const menuStyle = isRootGroup ? { left: 0, top: "calc(100% + 6px)" } : undefined;
	const [localDropPosition, setLocalDropPosition] = React.useState(null);
	useDragOverPosition(
		() => groupNodeRefs.get(props.groupId),
		[props.groupId],
		setLocalDropPosition,
	);
	const handleToggleGroup = React.useCallback(() => {
		context.toggleGroup?.(props.favGroup.groupId);
	}, [context, props.favGroup.groupId]);
	const combinedRef = React.useCallback((node) => {
		dragRef(node);
		dropRef(node);
		if (node) {
			groupNodeRefs.set(props.groupId, node);
		} else {
			groupNodeRefs.delete(props.groupId);
		}
	}, [dragRef, dropRef, props.groupId]);
	return /* @__PURE__ */ React.createElement(
		"div",
		{
			ref: combinedRef,
			className: "channelTabs-favGroup" +
				" channelTabs-dropStyle-" + (props.folderDropStyle || "accentGlow") +
				(isDragging ? " channelTabs-dragging" : "") +
				(isOver && canDrop && !draggedIsMe && localDropPosition === 'before' ? " channelTabs-drop-before" : "") +
				(isOver && canDrop && !draggedIsMe && localDropPosition === 'after' ? " channelTabs-drop-after" : "") +
				(isOver && canDrop && !draggedIsMe && localDropPosition === 'inside' ? " channelTabs-drop-inside" : ""),
			onContextMenu: (e) => {
				CreateFavGroupContextMenu(props, e);
			},
			onDoubleClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
			}
		},
		/* @__PURE__ */ React.createElement(
			"div",
			{
				className: "channelTabs-favGroupBtn",
				onClick: handleToggleGroup,
				onMouseEnter: () => {
					if (!isRootGroup) {
						context.openGroup?.(props.favGroup.groupId);
					}
				},
				onDoubleClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
				},
			},
		/* @__PURE__ */ React.createElement(
				groupHasAnyContent(props.favGroup.groupId, props.favs, props.favGroups)
					? FilledFolderIcon
					: FolderIcon,
				{ style: { marginRight: 6 } }
			),
			props.favGroup.name,
			renderFavGroupMentionBadge(props),
			renderFavGroupUnreadBadge({
				...props,
				onGroupBadgeClick: handleToggleGroup,
			}),
			renderFavGroupTypingBadge(props),
		),
		/* @__PURE__ */ React.createElement(
			"div",
			{
				className:
					"channelTabs-favGroup-content" +
					(isOpen
						? " channelTabs-favGroupShow"
						: ""),
				id: "favGroup-content-" + props.groupIndex,
				style: menuStyle,
			},
			props.renderEntries
				? React.createElement("div", { className: "channelTabs-favGroupChildren" },
					props.renderEntries(props.favGroup.groupId))
				: null
		),
	);
};
const DroppableGroup = makeDroppable(
	[DNDTypes.GROUP, DNDTypes.FAVORITE, DNDTypes.TAB],
	(props, monitor) => {
		const dropped = monitor.getItem();
		const itemType = monitor.getItemType();
		if (props.groupId === dropped.groupId) return;
		const hoverBoundingRect = monitor.getClientOffset();
		const targetNode = groupNodeRefs.get(props.groupId);
		const componentRect = targetNode ? targetNode.getBoundingClientRect() : null;
		const hoverClientX = hoverBoundingRect && componentRect
			? hoverBoundingRect.x - componentRect.left
			: null;
		const ratio = hoverClientX == null ? null : (hoverClientX / (componentRect.right - componentRect.left));
		const insertBefore = ratio == null ? false : ratio < 0.25;
		const insertAfter = ratio == null ? false : ratio > 0.75;
		let dropPosition = "inside";
		if (insertBefore) dropPosition = "before";
		else if (insertAfter) dropPosition = "after";
		const parentId = normalizeParentId(props.favGroup.parentId);
		const state = TabStateStore.getState();
		const entries = buildParentEntries(state.favs, state.favGroups, parentId);
		const targetEntryIndex = entries.findIndex((entry) => entryIsGroup(entry) && entry.groupIndex === props.groupIndex);
		if (targetEntryIndex === -1) return;
		let dropEntry = null;
		if (itemType === DNDTypes.GROUP) {
			dropEntry = { type: "group", groupId: dropped.groupId, groupIndex: dropped.groupIndex };
		} else if (itemType === DNDTypes.FAVORITE) {
			dropEntry = { type: "fav", favIndex: dropped.favIndex, url: dropped.url };
		}
		let sourceParentId = null;
		if (itemType === DNDTypes.GROUP) {
			sourceParentId = normalizeParentId(state.favGroups[dropped.groupIndex]?.parentId);
		} else if (itemType === DNDTypes.FAVORITE) {
			sourceParentId = normalizeParentId(state.favs[dropped.favIndex]?.groupId);
		}
		if (itemType === DNDTypes.GROUP && dropPosition === "inside" && sourceParentId !== parentId) {
			dropPosition = ratio != null && ratio >= 0.5 ? "after" : "before";
		}
		const sameParent = sourceParentId === parentId;
		if (dropPosition === "inside") {
			if (itemType === DNDTypes.FAVORITE) {
				const favKey = dropped.url || dropped.id;
				props.moveToFavGroupByKey(favKey ?? dropped.favIndex, props.groupId);
			} else if (itemType === DNDTypes.TAB) {
				props.addTabAsFavInGroup({ ...dropped, groupId: props.groupId }, props.groupId);
			} else if (itemType === DNDTypes.GROUP) {
				props.reparentFavGroup(dropped.groupId, props.groupId);
			}
			return { handledBy: "group" };
		}
		let insertIndex = dropPosition === "before" ? targetEntryIndex : targetEntryIndex + 1;
		if (sameParent && dropEntry) {
			const filtered = entries.filter((entry) => !entriesMatch(entry, dropEntry));
			const targetFilteredIndex = filtered.findIndex((entry) => entryIsGroup(entry) && entry.groupId === props.groupId);
			if (targetFilteredIndex !== -1) {
				insertIndex = dropPosition === "before" ? targetFilteredIndex : targetFilteredIndex + 1;
			}
		}
		if (itemType === DNDTypes.FAVORITE) {
			props.moveFav(dropped.favIndex, insertIndex, parentId);
		} else if (itemType === DNDTypes.GROUP) {
			const filteredEntries = dropEntry ? entries.filter((entry) => !entriesMatch(entry, dropEntry)) : entries;
			let targetIndex = insertIndex;
			const sourceIndex = dropEntry ? entries.findIndex((entry) => entriesMatch(entry, dropEntry)) : -1;
			if (sourceParentId === parentId && sourceIndex !== -1 && sourceIndex < targetIndex) {
				targetIndex -= 1;
			}
			targetIndex = clampIndex(targetIndex, filteredEntries.length);
			props.moveFavGroup(dropped.groupIndex, targetIndex, parentId);
		} else if (itemType === DNDTypes.TAB) {
			props.addTabAsFavAt({ ...dropped, groupId: parentId }, insertIndex);
		}
		return { handledBy: "group" };
	},
	() => { }
)(BaseFavFolder);
const DraggableDroppableGroup = makeDraggable(DNDTypes.GROUP)(DroppableGroup);
const FavFolder = (props) =>
	/* @__PURE__ */ React.createElement(DraggableDroppableGroup, {
	...props,
	id: props.favGroup.groupId,
	groupId: props.favGroup.groupId,
	groupIndex: props.groupIndex
});
const FavFolders = (props) => {
	const favGroups = props.favGroups.map(ensureGroupParent);
	const favs = props.favs.map((fav) => ({ ...fav, groupId: normalizeParentId(fav.groupId) }));
	const renderEntries = (parentId = DEFAULT_PARENT_ID) => {
		const entries = buildParentEntries(favs, favGroups, parentId);
		return entries
			.map((entry, entryIndex) => {
				if (entryIsGroup(entry)) {
					const group = favGroups[entry.groupIndex];
					if (!group) return null;
					return React.createElement(FavFolderWithStores, {
						key: group.groupId,
						groupIndex: entry.groupIndex,
						groupCount: favGroups.length,
						favGroup: group,
						moveFavGroup: props.moveFavGroup,
						moveFav: props.moveFav ?? props.move,
						renderEntries,
						showFavGroupUnreadBadges: props.showFavGroupUnreadBadges,
						showFavGroupMentionBadges: props.showFavGroupMentionBadges,
						showFavGroupTypingBadge: props.showFavGroupTypingBadge,
						showEmptyFavGroupBadges: props.showEmptyFavGroupBadges,
						moveToFavGroupByKey: props.moveToFavGroupByKey,
						addTabAsFavInGroup: props.addTabAsFavInGroup,
						folderDropStyle: props.folderDropStyle,
						...props,
						favGroups,
						favs,
					});
				}
				const fav = favs[entry.favIndex];
				if (!fav) return null;
				return React.createElement(FavItem, {
					key: `${fav.url}-${entry.favIndex}`,
					fav,
					favIndex: entry.favIndex,
					favCount: favs.length,
					favGroups,
					rename: () => props.rename(fav.name, entry.favIndex),
					delete: () => props.delete(entry.favIndex),
					openInNewTab: () => props.openInNewTab(fav),
					moveLeft: () =>
						props.move(
							entry.favIndex,
							(entryIndex + entries.length - 1) % entries.length,
							fav.groupId
						),
					moveRight: () =>
						props.move(
							entry.favIndex,
							(entryIndex + 1) % entries.length,
							fav.groupId
						),
					minimizeFav: props.minimizeFav,
					moveToFavGroup: props.moveToFavGroup,
					moveFav: props.moveFav ?? props.move,
					moveFavGroup: props.moveFavGroup,
					addTabAsFavAt: props.addTabAsFavAt,
					showFavUnreadBadges: props.showFavUnreadBadges,
					showFavMentionBadges: props.showFavMentionBadges,
					showFavTypingBadge: props.showFavTypingBadge,
					showEmptyFavBadges: props.showEmptyFavBadges,
					groupId: fav.groupId,
				});
			})
			.filter(Boolean);
	};
	return renderEntries(DEFAULT_PARENT_ID);
};
function nextTab() {
	const state = TabStateStore.getState();
	if (!state.tabs.length) return;
	TabActions.switchToTab(
		(state.selectedTabIndex + 1) % state.tabs.length,
	);
}
function previousTab() {
	const state = TabStateStore.getState();
	if (!state.tabs.length) return;
	TabActions.switchToTab(
		(state.selectedTabIndex - 1 + state.tabs.length) %
		state.tabs.length,
	);
}
function expDecay(a, b, decay, dt) {
	return b + (a - b) * Math.exp((-decay * dt) / 1e3);
}
function HorizontalScroll(props) {
	const {
		innerRef,
		onToggleLayout,
		disableScroll,
		children,
		className,
		style,
		...domProps
	} = props;
	const container = React.useRef(null);
	const lastToggleRef = React.useRef(0);
	const TOGGLE_COOLDOWN = 350;
	const TOGGLE_THRESHOLD = 30;
	const currentRef = React.useRef(0);
	const targetRef = React.useRef(0);
	const lastRef = React.useRef(performance.now());
	const resetLastRef = React.useRef(false);
	function update() {
		if (!container.current) return;
		const now = performance.now();
		currentRef.current = expDecay(currentRef.current, targetRef.current, 10, now - lastRef.current);
		container.current.scrollLeft = currentRef.current;
		lastRef.current = now;
		if (Math.abs(container.current.scrollLeft - targetRef.current) > 0.5) {
			requestAnimationFrame(update);
		} else {
			resetLastRef.current = true;
		}
	}
	const scrollToElement = React.useCallback((element) => {
		if (disableScroll || !container.current || !element) return;
		const containerRect = container.current.getBoundingClientRect();
		const elementRect = element.getBoundingClientRect();
		const scrollLeft = container.current.scrollLeft;
		const elementLeft = elementRect.left - containerRect.left + scrollLeft;
		const elementRight = elementLeft + elementRect.width;
		const containerWidth = containerRect.width;
		if (elementLeft < scrollLeft || elementRight > scrollLeft + containerWidth) {
			targetRef.current = Math.max(0, Math.min(
				elementLeft - (containerWidth - elementRect.width) / 2,
				container.current.scrollWidth - containerWidth
			));
			if (resetLastRef.current) lastRef.current = performance.now();
			resetLastRef.current = false;
			update();
		}
	}, [disableScroll]);
	React.useEffect(() => {
		const element = container.current;
		if (!element) return;
		const handleWheel = (event) => {
			if ((event.ctrlKey || event.metaKey) && onToggleLayout) {
				if (Math.abs(event.deltaY) > TOGGLE_THRESHOLD) {
					const now = performance.now();
					if (now - lastToggleRef.current > TOGGLE_COOLDOWN) {
						lastToggleRef.current = now;
						event.preventDefault();
						event.stopPropagation();
						onToggleLayout();
					}
				} else {
					event.preventDefault();
					event.stopPropagation();
				}
				return;
			}
			if (!disableScroll) {
				const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
				targetRef.current += delta;
				targetRef.current = Math.max(
					0,
					Math.min(
						targetRef.current,
						element.scrollWidth - element.clientWidth,
					),
				);
				if (resetLastRef.current) lastRef.current = performance.now();
				update();
			}
		};
		element.addEventListener('wheel', handleWheel, { passive: false });
		return () => {
			element.removeEventListener('wheel', handleWheel);
		};
	}, [onToggleLayout, disableScroll]);
	React.useImperativeHandle(innerRef, () => ({
		scrollToElement
	}), [scrollToElement]);
	return /* @__PURE__ */ React.createElement(
		"div",
		{
			ref: container,
			className,
			style,
			...domProps
		},
		children
	);
}
const TabBar = React.forwardRef((props, ref) => {
	const scrollRef = React.useRef(null);
	const tabRefs = React.useRef(new Map());
	const isMultiRow = props.tabLayoutMode === "multi";
	const scrollToTab = React.useCallback((index) => {
		const tab = props.tabs[index];
		if (!tab) return;
		const key = tab.id ?? tab.channelId ?? tab.url ?? `tab-${index}`;
		const element = tabRefs.current.get(key);
		if (scrollRef.current && element && !isMultiRow) {
			scrollRef.current.scrollToElement(element);
		}
	}, [props.tabs, isMultiRow]);
	const focusTab = React.useCallback((index) => {
		const tab = props.tabs[index];
		if (!tab) return;
		const key = tab.id ?? tab.channelId ?? tab.url ?? `tab-${index}`;
		const element = tabRefs.current.get(key);
		element?.focus();
	}, [props.tabs]);
	React.useImperativeHandle(ref, () => ({
		scrollToTab,
		focusTab
	}), [scrollToTab, focusTab]);
	const renderTabs = () => props.tabs.map((tab, tabIndex) => {
		const stableKey = tab.id ?? tab.channelId ?? tab.url ?? `tab-${tabIndex}`;
		return React.createElement(TabItem, {
			key: stableKey,
			tab,
			tabIndex,
			tabCount: props.tabs.length,
			isMultiRow,
			registerRef: (el) => {
				if (el) {
					tabRefs.current.set(stableKey, el);
				} else {
					tabRefs.current.delete(stableKey);
				}
			},
			switchToTab: props.switchToTab,
			focusTab: focusTab,
			closeTab: props.closeTab,
			addToFavs: props.addToFavs,
			minimizeTab: props.minimizeTab,
			moveLeft: () =>
				props.move(
					tabIndex,
					(tabIndex + props.tabs.length - 1) % props.tabs.length,
				),
			moveRight: () =>
				props.move(tabIndex, (tabIndex + 1) % props.tabs.length),
			openInNewTab: () => props.openInNewTab(tab),
			moveTab: props.move,
			openFavAsTabAt: props.openFavAsTabAt,
			showTabUnreadBadges: props.showTabUnreadBadges,
			showTabMentionBadges: props.showTabMentionBadges,
			showTabTypingBadge: props.showTabTypingBadge,
			showEmptyTabBadges: props.showEmptyTabBadges,
			showActiveTabUnreadBadges: props.showActiveTabUnreadBadges,
			showActiveTabMentionBadges: props.showActiveTabMentionBadges,
			showActiveTabTypingBadge: props.showActiveTabTypingBadge,
			showEmptyActiveTabBadges: props.showEmptyActiveTabBadges,
			compactStyle: props.compactStyle,
		});
	});
	const dropdownProps = {
		...props,
		scrollToTab,
		tabs: props.tabs
	};
	const tabWrapStyle = isMultiRow ? {
		display: "flex",
		flexWrap: "wrap",
		overflowX: "hidden",
		scrollbarWidth: "none",
	} : {
		display: "flex",
		flexWrap: "nowrap",
		overflowX: "auto",
		scrollbarWidth: "none",
	};
	return /* @__PURE__ */ React.createElement(
		"div",
		{
			role: "tablist",
			"aria-label": "Channel tabs",
			className: "channelTabs-tabContainer",
			"data-tab-count": props.tabs.length,
			"data-multiline": isMultiRow,
			onDoubleClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
			},
		},
		props.leading,
		/* @__PURE__ */ React.createElement(
			"div",
			{ className: "channelTabs-tabNav" },
			/* @__PURE__ */ React.createElement(
				"div",
				{
					className: "channelTabs-tabNavLeft",
					onClick: () => {
						if (props.useStandardNav) {
							NavShortcuts.NAVIGATE_BACK.action();
						} else {
							props.goBack();
						}
					},
					style: {
						opacity: !props.useStandardNav &&
							!props.canGoBack() ? 0.5 : 1
					},
					onContextMenu: () => {
						props.useStandardNav
							? props.previousTab()
							: NavShortcuts.NAVIGATE_BACK.action();
					},
					onDoubleClick: (e) => {
						e.preventDefault();
						e.stopPropagation();
					},
				},
				/* @__PURE__ */ React.createElement(LeftCaret, null),
			),
			/* @__PURE__ */ React.createElement(
				"div",
				{
					className: "channelTabs-tabNavRight",
					onClick: () => {
						if (props.useStandardNav) {
							NavShortcuts.NAVIGATE_FORWARD.action();
						} else {
							props.goForward();
						}
					},
					style: {
						opacity: !props.useStandardNav &&
							!props.canGoForward() ? 0.5 : 1
					},
					onContextMenu: () => {
						props.useStandardNav
							? props.nextTab()
							: NavShortcuts.NAVIGATE_FORWARD.action();
					},
					onDoubleClick: (e) => {
						e.preventDefault();
						e.stopPropagation();
					},
				},
				/* @__PURE__ */ React.createElement(RightCaret, null),
			),
			/* @__PURE__ */ React.createElement(
				"div",
				{
					className: "channelTabs-tabNavClose",
					onClick: () => {
						props.closeCurrentTab();
					},
					onDoubleClick: (e) => {
						e.preventDefault();
						e.stopPropagation();
					},
					onContextMenu: props.openNewTab,
				},
				/* @__PURE__ */ React.createElement(Close, null),
			),
		),
		/* @__PURE__ */ React.createElement(
			HorizontalScroll,
			{
				innerRef: scrollRef,
				className: "channelTabs-tabWrap",
				onToggleLayout: props.toggleTabLayoutMode,
				disableScroll: isMultiRow,
				style: tabWrapStyle,
			},
			renderTabs()
		),
		/* @__PURE__ */ React.createElement(NewTab, {
			openNewTab: props.openNewTab,
		}),
		/* @__PURE__ */ React.createElement(TabListDropdown, dropdownProps),
		props.trailing,
	);
});
/* Set display name for debugging */
TabBar.displayName = 'TabBar';
const FavBar = (props) =>
	/* @__PURE__ */ React.createElement(
	FavRootDrop,
	{ ...props },
	(() => {
		const hasEntries = (props.favs?.filter(Boolean).length ?? 0) + (props.favGroups?.length ?? 0) > 0;
		return React.createElement(
			"div",
			{
				className:
					"channelTabs-favContainer" +
					(hasEntries ? "" : " channelTabs-noFavs"),
				"data-fav-count": props.favs.length,
				onContextMenu: (e) => {
					CreateFavBarContextMenu(props, e);
				},
				onDoubleClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
				},
			},
				/* @__PURE__ */ React.createElement("div", { className: "channelTabs-favStar" }, FavStarIcon),
			props.leading,
				/* @__PURE__ */ React.createElement(FavFolders, { ...props }),
			hasEntries
				? null
				: /* @__PURE__ */ React.createElement(NoFavItemsPlaceholder, null),
				/* @__PURE__ */ React.createElement(
					"div",
					{
						className: "channelTabs-newTab",
						onClick: () => props.addFavGroup(),
						onDoubleClick: (e) => {
							e.preventDefault();
							e.stopPropagation();
						},
					},
					/* @__PURE__ */ React.createElement(PlusAlt, null),
				),
			props.trailing,
		);
	})(),
);
const TopBar = (props) => {
	const tabBarRef = React.useRef();
	const containerRef = React.useRef();
	const storeState = Hooks.useStateFromStores([TabStateStore], () => TabStateStore.getState());
	const {
		tabs = props.tabs,
		favs = props.favs,
		favGroups = props.favGroups,
		selectedTabIndex = Math.max((props.tabs || []).findIndex((tab) => tab.selected), 0),
		tabLayoutMode = props.tabLayoutMode || "single",
		showTabBar = props.showTabBar,
		showFavBar = props.showFavBar,
		showFavUnreadBadges = props.showFavUnreadBadges,
		showFavMentionBadges = props.showFavMentionBadges,
		showFavTypingBadge = props.showFavTypingBadge,
		showEmptyFavBadges = props.showEmptyFavBadges,
		showTabUnreadBadges = props.showTabUnreadBadges,
		showTabMentionBadges = props.showTabMentionBadges,
		showTabTypingBadge = props.showTabTypingBadge,
		showEmptyTabBadges = props.showEmptyTabBadges,
		showActiveTabUnreadBadges = props.showActiveTabUnreadBadges,
		showActiveTabMentionBadges = props.showActiveTabMentionBadges,
		showActiveTabTypingBadge = props.showActiveTabTypingBadge,
		showEmptyActiveTabBadges = props.showEmptyActiveTabBadges,
		showFavGroupUnreadBadges = props.showFavGroupUnreadBadges,
		showFavGroupMentionBadges = props.showFavGroupMentionBadges,
		showFavGroupTypingBadge = props.showFavGroupTypingBadge,
		showEmptyFavGroupBadges = props.showEmptyFavGroupBadges,
		folderDropStyle = props.folderDropStyle,
		compactStyle = props.compactStyle,
		privacyMode = props.privacyMode,
		radialStatusMode = props.radialStatusMode,
		tabWidthMin = props.tabWidthMin,
		showQuickSettings = props.showQuickSettings,
		useStandardNav = props.useStandardNav,
	} = storeState;
	const toggleTabLayoutMode = React.useCallback(() => {
		TabActions.toggleTabLayoutMode({ tabBarRef: tabBarRef.current });
	}, []);
	const trailing = /* @__PURE__ */ React.createElement(
		"div",
		{ className: "channelTabs-trailing" },
		showQuickSettings &&
			/* @__PURE__ */ React.createElement(
			"div",
			{
				id: "channelTabs-settingsMenu",
				onClick: (e) => {
					CreateSettingsContextMenu(
						{ props: { plugin: props.plugin }, state: { tabLayoutMode } },
						e,
					);
				},
			},
			SettingsMenuIcon,
		),
		props.trailing,
	);
	React.useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const update = () => {
			document.body.style.setProperty(
				"--custom-app-top-bar-height",
				`${container.clientHeight}px`,
			);
		};
		const observer = new ResizeObserver(update);
		observer.observe(container);
		update();
		return () => {
			observer.disconnect();
			document.body.style.removeProperty("--custom-app-top-bar-height");
		};
	}, []);
	const safeSwitchToTab = React.useCallback((index) => {
		if (!tabs.length) return;
		TabActions.switchToTab(index);
	}, [tabs.length]);
	return /* @__PURE__ */ React.createElement(
		"div",
		{ id: "channelTabs-container", ref: containerRef },
		showTabBar
			? /* @__PURE__ */ React.createElement(TabBar, {
				leading: props.leading,
				trailing,
				tabs,
				tabLayoutMode,
				toggleTabLayoutMode,
				closeCurrentTab: () => tabs.length ? TabActions.closeTab(selectedTabIndex) : null,
				nextTab: () => tabs.length ? TabActions.switchToTab((selectedTabIndex + 1) % tabs.length) : null,
				previousTab: () => tabs.length ? TabActions.switchToTab((selectedTabIndex - 1 + tabs.length) % tabs.length) : null,
				showTabUnreadBadges,
				showTabMentionBadges,
				showTabTypingBadge,
				showEmptyTabBadges,
				showActiveTabUnreadBadges,
				showActiveTabMentionBadges,
				showActiveTabTypingBadge,
				showEmptyActiveTabBadges,
				compactStyle,
				privacyMode,
				radialStatusMode,
				tabWidthMin,
				closeTab: (index, mode) => TabActions.closeTab(index, mode),
				switchToTab: safeSwitchToTab,
				openNewTab: () => TabActions.openNewTab(),
				openInNewTab: TabActions.openTabInNewTab,
				addToFavs: TabActions.addToFavs,
				minimizeTab: (index) => TabActions.minimizeTab(index),
				move: (from, to) => TabActions.moveTab(from, to),
				openFavAsTabAt: (fav, toIndex) => TabActions.openFavAsTabAt(fav, toIndex),
				useStandardNav,
				canGoBack: TabActions.canGoBack,
				canGoForward: TabActions.canGoForward,
				goBack: TabActions.goBack,
				goForward: TabActions.goForward
			})
			: null,
		showFavBar
			? /* @__PURE__ */ React.createElement(FavBar, {
				leading: showTabBar ? null : props.leading,
				trailing: showTabBar ? null : trailing,
				favs,
				favGroups,
				folderDropStyle,
				showFavUnreadBadges,
				showFavMentionBadges,
				showFavTypingBadge,
				showEmptyFavBadges,
				privacyMode,
				radialStatusMode,
				showFavGroupUnreadBadges,
				showFavGroupMentionBadges,
				showFavGroupTypingBadge,
				showEmptyFavGroupBadges,
				rename: (name, index) => TabActions.renameFav(name, index),
				delete: (index) => TabActions.deleteFav(index),
				addToFavs: TabActions.addToFavs,
				minimizeFav: (index) => TabActions.minimizeFav(index),
				openInNewTab: TabActions.openFavInNewTab,
				move: (...args) => TabActions.moveFav(...args),
				addTabAsFavAt: (tab, toIndex) => TabActions.addTabAsFavAt(tab, toIndex),
				addTabAsFavInGroup: (tab, groupId) => TabActions.addTabAsFavInGroup(tab, groupId),
				moveFavGroup: (...args) => TabActions.moveFavGroup(...args),
				moveToFavGroupByKey: (favKey, groupId) => TabActions.moveToFavGroupByKey(favKey, groupId),
				reparentFavGroup: (groupId, parentId) => TabActions.reparentFavGroup(groupId, parentId),
				addFavGroup: () => TabActions.addFavGroup(),
				moveToFavGroup: (favIndex, groupId) => TabActions.moveToFavGroup(favIndex, groupId),
				removeFavGroup: (groupId) => TabActions.removeFavGroup(groupId),
				renameFavGroup: (name, groupId) => TabActions.renameFavGroup(name, groupId),
				openFavGroupInNewTab: TabActions.openFavGroupInNewTab,
				hideFavBar: () => TabActions.hideFavBar(),
			})
			: null,
	);
};
const HookedTopBar = ReactUtils.wrapInHooks((props) =>
	React.createElement(TopBar, props),
);
module.exports = class ChannelTabs {
	//#region Start/Stop Functions
	constructor(meta) {
		this.meta = meta;
		pluginMeta = meta;
		this.updateManager = new UpdateManager(
			"EnhancedChannelTabs",
			meta.version,
			"Pharaoh2k/BetterDiscordStuff"
		);
		this.persistSettings = debounce(() => {
			try {
				Data.save(this.getSettingsPath(), "settings", this.settings);
			} catch (error) {
				console.error("Error saving settings:", error);
			}
		}, 250);
	}
	start(isRetry = false) {
		if (isRetry && !BdApi.Plugins.isEnabled(config.info.name)) return;
		if (!UserStore.getCurrentUser())
			return setTimeout(() => this.start(true), 1e3);
		patches = [];
		this.loadSettings();
		TabActions.setPlugin(this);
		this.applyStyle();
		this.ifNoTabsExist();
		this.updateManager.start(this.settings.autoUpdate !== false);
		this.promises = {
			state: { cancelled: false },
			cancel() {
				this.state.cancelled = true;
			},
		};
		this.saveSettings = this.saveSettings.bind(this);
		this.keybindHandler = this.keybindHandler.bind(this);
		this.onSwitch();
		this.patchTitleBar(this.promises.state);
		this.patchContextMenus();
		this.ifReopenLastChannelDefault();
		document.addEventListener("keydown", this.keybindHandler);
		document.addEventListener("click", this.clickHandler);
	}
	stop() {
		this.removeStyle();
		document.removeEventListener("keydown", this.keybindHandler);
		document.removeEventListener("click", this.clickHandler);
		Patcher.unpatchAll();
		this.promises.cancel();
		TabActions.clearPlugin(this);
		for (const patch of patches) {
			patch();
		}
		this.updateManager.stop();
		guildChannelCache.clear();
	}
	//#endregion
	applyStyle(styleId = null) {
		if (!styleId || styleId === "channelTabs-style-compact") {
			if (this.settings.compactStyle === true)
				DOM.addStyle("channelTabs-style-compact", StyleManager.getCompactVariables());
		}
		if (!styleId || styleId === "channelTabs-style-cozy") {
			if (this.settings.compactStyle === false)
				DOM.addStyle("channelTabs-style-cozy", StyleManager.getCozyVariables());
		}
		if (!styleId || styleId === "channelTabs-style-private") {
			if (this.settings.privacyMode === true)
				DOM.addStyle("channelTabs-style-private", StyleManager.getPrivacyStyle());
		}
		if (!styleId || styleId === "channelTabs-style-radialstatus") {
			if (this.settings.radialStatusMode === true)
				DOM.addStyle("channelTabs-style-radialstatus", StyleManager.getRadialStatusStyle());
		}
		if (!styleId || styleId === "channelTabs-style-tabnav") {
			if (this.settings.showNavButtons === true)
				DOM.addStyle("channelTabs-style-tabnav", StyleManager.getTabNavStyle());
		}
		if (!styleId || styleId === "channelTabs-style-constants") {
			DOM.addStyle("channelTabs-style-constants", StyleManager.getConstantVariables(this.settings.tabWidthMin));
		}
		if (!styleId || styleId === "channelTabs-style") {
			DOM.addStyle("channelTabs-style", StyleManager.getBaseStyle(noDragClasses, systemBarClasses));
		}
		if (!styleId || styleId === "channelTabs-style-multirow") {
			DOM.addStyle("channelTabs-style-multirow", StyleManager.getMultiRowStyles());
		}
	}
	removeStyle() {
		DOM.removeStyle("channelTabs-style-compact");
		DOM.removeStyle("channelTabs-style-cozy");
		DOM.removeStyle("channelTabs-style-private");
		DOM.removeStyle("channelTabs-style-radialstatus");
		DOM.removeStyle("channelTabs-style-tabnav");
		DOM.removeStyle("channelTabs-style-constants");
		DOM.removeStyle("channelTabs-style");
		DOM.removeStyle("channelTabs-style-multirow");
	}
	//#region Init/Default Functions
	ifNoTabsExist() {
		if (this.settings.tabs.length == 0)
			this.settings.tabs = [
				{
					id: generateTabId(),
					name: getCurrentName(),
					url: location.pathname,
					selected: true,
					history: [location.pathname],
					historyIndex: 0
				},
			];
		TabStateStore.setState({
			tabs: this.settings.tabs,
			favs: this.settings.favs,
			favGroups: this.settings.favGroups,
			closedTabs: this.settings.closedTabs || [],
			selectedTabIndex: resolveSelectedIndex(
				this.settings.tabs,
				this.settings.tabs.findIndex((tab) => tab?.selected),
			),
			tabLayoutMode: this.settings.tabLayoutMode || "single",
		});
	}
	ifReopenLastChannelDefault() {
		if (this.settings.reopenLastChannel) {
			switching = true;
			NavigationUtils.transitionTo(
				(
					this.settings.tabs.find((tab) => tab.selected) ||
					this.settings.tabs[0]
				).url,
			);
			switching = false;
		}
	}
	//#endregion
	//#region Patches
	patchTitleBar(promiseState) {
		if (promiseState.cancelled) return;
		Patcher.after(TitleBar, TitleBarKey, (thisObject, [props], returnValue) => {
			if (props.windowKey !== void 0) return;
			const trailing = React.Children.toArray(returnValue?.props?.children).find(
				child =>
					child?.props?.className?.includes("winButton") ||
					child?.props?.className?.includes("trailing")
			);
			const injected = React.createElement(
				DragProvider,
				null,
				React.createElement(HookedTopBar, {
					leading: null,
					trailing: trailing,
					reopenLastChannel: this.settings.reopenLastChannel,
					showTabBar: this.settings.showTabBar,
					showFavBar: this.settings.showFavBar,
					tabLayoutMode: this.settings.tabLayoutMode || "single",
					showFavUnreadBadges: this.settings.showFavUnreadBadges,
					showFavMentionBadges: this.settings.showFavMentionBadges,
					showFavTypingBadge: this.settings.showFavTypingBadge,
					showEmptyFavBadges: this.settings.showEmptyFavBadges,
					showTabUnreadBadges: this.settings.showTabUnreadBadges,
					showTabMentionBadges: this.settings.showTabMentionBadges,
					showTabTypingBadge: this.settings.showTabTypingBadge,
					showEmptyTabBadges: this.settings.showEmptyTabBadges,
					showActiveTabUnreadBadges: this.settings.showActiveTabUnreadBadges,
					showActiveTabMentionBadges: this.settings.showActiveTabMentionBadges,
					showActiveTabTypingBadge: this.settings.showActiveTabTypingBadge,
					showEmptyActiveTabBadges: this.settings.showEmptyActiveTabBadges,
					showFavGroupUnreadBadges: this.settings.showFavGroupUnreadBadges,
					showFavGroupMentionBadges: this.settings.showFavGroupMentionBadges,
					showFavGroupTypingBadge: this.settings.showFavGroupTypingBadge,
					showEmptyFavGroupBadges: this.settings.showEmptyFavGroupBadges,
					compactStyle: this.settings.compactStyle,
					privacyMode: this.settings.privacyMode,
					radialStatusMode: this.settings.radialStatusMode,
					tabWidthMin: this.settings.tabWidthMin,
					showQuickSettings: this.settings.showQuickSettings,
					showNavButtons: this.settings.showNavButtons,
					alwaysFocusNewTabs: this.settings.alwaysFocusNewTabs,
					useStandardNav: this.settings.useStandardNav,
					closedTabs: this.settings.closedTabs || [],
					tabs: [...this.settings.tabs],
					favs: [...this.settings.favs],
					favGroups: [...this.settings.favGroups],
					plugin: this,
				})
			);
			return returnValue
				? React.cloneElement(returnValue, returnValue.props, injected)
				: injected;
		});
		const rerenderTitleBar = (phase = "start") => {
			const log = (...args) => console.log("[ECT TitleBarRefresh]", phase, ...args);
			const selector = TitleBarStyles?.base ? `.${TitleBarStyles.base}` : "[class*='titleBar']";
			const targetEl =
				document.querySelector(selector)?.parentElement ?? document.querySelector(selector);
			log("selector", selector, "found", !!targetEl);
			if (!targetEl) return;
			const instance = ReactUtils.getOwnerInstance?.(targetEl);
			if (!instance || typeof instance.forceUpdate !== "function") {
				log("ownerNotFound");
				return;
			}
			const unpatch = Patcher.instead(instance, "render", () => unpatch());
			try {
				log("forceUpdate ownerInstance");
				instance.forceUpdate(() => instance.forceUpdate());
			} catch (e) {
				console.warn("[ECT TitleBarRefresh] forceUpdate failed", e);
			}
		};
		rerenderTitleBar("start");
		setTimeout(() => rerenderTitleBar("start-late"), 50);
		patches.push(() => {
			rerenderTitleBar("stop");
			setTimeout(() => rerenderTitleBar("stop-late"), 50);
		});
	}
	patchContextMenus() {
		patches.push(
			ContextMenu.patch("channel-context", (returnValue, props) => {
				if (!this.settings.showTabBar && !this.settings.showFavBar) return;
				returnValue.props.children.push(
					CreateTextChannelContextMenuChildren(this, props),
				);
			}),
			ContextMenu.patch("thread-context", (returnValue, props) => {
				if (!this.settings.showTabBar && !this.settings.showFavBar) return;
				returnValue.props.children.push(
					CreateThreadChannelContextMenuChildren(this, props),
				);
			}),
			ContextMenu.patch("user-context", (returnValue, props) => {
				if (!this.settings.showTabBar && !this.settings.showFavBar) return;
				if (!returnValue) return;
				if (
					!props.channel ||
					props.channel.recipients?.length !== 1 ||
					props.channel.recipients[0] !== props.user.id
				)
					return;
				returnValue.props.children.push(
					CreateDMContextMenuChildren(this, props),
				);
			}),
			ContextMenu.patch("gdm-context", (returnValue, props) => {
				if (!this.settings.showTabBar && !this.settings.showFavBar) return;
				if (!returnValue) return;
				returnValue.props.children.push(
					CreateGroupContextMenuChildren(this, props),
				);
			}),
			ContextMenu.patch("guild-context", (returnValue, props) => {
				if (
					(!this.settings.showTabBar && !this.settings.showFavBar) ||
					!props.guild
				)
					return;
				const channel = ChannelStore.getChannel(
					SelectedChannelStore.getChannelId(props.guild.id),
				);
				returnValue.props.children.push(
					CreateGuildContextMenuChildren(this, props, channel),
				);
			}),
		);
	}
	//#endregion
	//#region Handlers
	clickHandler(e) {
		if (!e.target.matches(".channelTabs-favGroupBtn")) {
			closeAllDropdowns();
		}
	}
	keybindHandler(e) {
		const keybinds = [
			{
				ctrlKey: true,
				keyCode: 87,
				action: this.closeCurrentTab,
			},
			{
				ctrlKey: true,
				keyCode: 33,
				action: this.previousTab,
			},
			{
				ctrlKey: true,
				keyCode: 34,
				action: this.nextTab,
			},
			{
				ctrlKey: true,
				keyCode: 84,
				action: this.openNewTab,
			},
			{
				ctrlKey: true,
				shiftKey: true,
				keyCode: 84,
				action: () => {
					TabActions.reopenLastClosedTab();
				}
			},
		];
		for (const keybind of keybinds) {
			if (
				e.altKey === (keybind.altKey ?? false) &&
				e.ctrlKey === (keybind.ctrlKey ?? false) &&
				e.shiftKey === (keybind.shiftKey ?? false) &&
				e.keyCode === keybind.keyCode
			) {
				e.stopPropagation();
				keybind.action();
			}
		}
	}
	//#endregion
	//#region General Functions
	onSwitch() {
		if (switching) return;
		const state = TabStateStore.getState();
		if (state.tabs.length > 0) {
			const currentSelectedIndex = resolveSelectedIndex(state.tabs, state.selectedTabIndex);
			const currentTab = state.tabs[currentSelectedIndex];
			const currentUrl = location.pathname;
			if (currentTab && !TabActions.isHistoryNavigation && currentTab.url === currentUrl) {
				return;
			}
			const newUrl = location.pathname;
			const channelId = SelectedChannelStore.getChannelId();
			const updatedTabs = state.tabs.map((tab, index) => {
				if (index === currentSelectedIndex) {
					let newHistory = tab.history ? [...tab.history] : [tab.url];
					let newHistoryIndex = tab.historyIndex || 0;
					if (!TabActions.isHistoryNavigation && tab.url !== newUrl) {
						newHistory = newHistory.slice(0, newHistoryIndex + 1);
						newHistory.push(newUrl);
						newHistoryIndex++;
						if (newHistory.length > 50) {
							newHistory.shift();
							newHistoryIndex--;
						}
					}
					TabActions.setHistoryNavigation(false);
					const minimizedTab = state.tabs.find((tab2) => tab2.selected)?.minimized;
					return {
						...tab,
						name: getCurrentName(),
						url: newUrl,
						selected: true,
						currentStatus: getCurrentUserStatus(newUrl),
						channelId,
						minimized: minimizedTab,
						history: newHistory,
						historyIndex: newHistoryIndex
					};
				}
				else if (tab.url === currentUrl) {
					return {
						...tab,
						name: getCurrentName(),
						channelId,
						currentStatus: getCurrentUserStatus(newUrl),
					};
				}
				else {
					return tab;
				}
			});
			const nextSelected = resolveSelectedIndex(updatedTabs, currentSelectedIndex);
			updateTabs(() => ({
				tabs: updatedTabs,
				selectedTabIndex: nextSelected,
			}));
			this.saveSettings();
		} else if (!this.settings.reopenLastChannel) {
			const channelId = SelectedChannelStore.getChannelId();
			this.settings.tabs[this.settings.tabs.findIndex((tab) => tab.selected)] = {
				name: getCurrentName(),
				url: location.pathname,
				selected: true,
				currentStatus: getCurrentUserStatus(location.pathname),
				channelId,
				minimized:
					this.settings.tabs[
						this.settings.tabs.findIndex((tab) => tab.selected)
					].minimized,
			};
		}
	}
	mergeItems(itemsTab, itemsFav) {
		const out = [];
		if (this.settings.showTabBar) out.push(...itemsTab);
		if (this.settings.showFavBar) out.push(...itemsFav);
		return out;
	}
	//#endregion
	//#region Hotkey Functions
	nextTab() {
		nextTab();
	}
	previousTab() {
		previousTab();
	}
	closeCurrentTab() {
		TabActions.closeTab(TabStateStore.getState().selectedTabIndex);
	}
	openNewTab() {
		TabActions.openNewTab();
	}
	//#endregion
	//#region Settings
	get defaultVariables() {
		return {
			tabs: [],
			favs: [],
			favGroups: [],
			showTabBar: true,
			showFavBar: true,
			reopenLastChannel: false,
			showFavUnreadBadges: true,
			showFavMentionBadges: true,
			showFavTypingBadge: true,
			showEmptyFavBadges: false,
			showTabUnreadBadges: true,
			showTabMentionBadges: true,
			showTabTypingBadge: true,
			showEmptyTabBadges: false,
			showActiveTabUnreadBadges: false,
			showActiveTabMentionBadges: false,
			showActiveTabTypingBadge: false,
			showEmptyActiveTabBadges: false,
			compactStyle: false,
			privacyMode: false,
			radialStatusMode: false,
			tabWidthMin: 100,
			showFavGroupUnreadBadges: true,
			showFavGroupMentionBadges: true,
			showFavGroupTypingBadge: true,
			showEmptyFavGroupBadges: false,
			showQuickSettings: true,
			showNavButtons: true,
			alwaysFocusNewTabs: false,
			useStandardNav: false,
			tabLayoutMode: "single",
			autoUpdate: true,
			closedTabs: [],
			maxClosedTabsDays: 30,
			maxClosedTabsCount: 100,
		};
	}
	getSettingsPath(useOldLocation) {
		if (useOldLocation === true) {
			return this.meta.name;
		} else {
			const user_id = UserStore.getCurrentUser()?.id;
			return this.meta.name + "_new" + (user_id === null ? "" : "_" + user_id);
		}
	}
	syncStoreFromSettings() {
		const storePatch = Object.fromEntries(
			STORE_SETTING_KEYS.map((key) => [key, this.settings[key]]),
		);
		TabStateStore.setState({
			...storePatch,
			tabs: this.settings.tabs,
			favs: this.settings.favs,
			favGroups: this.settings.favGroups,
			closedTabs: this.settings.closedTabs || [],
			selectedTabIndex: resolveSelectedIndex(
				this.settings.tabs,
				this.settings.tabs.findIndex((tab) => tab?.selected),
			),
			tabLayoutMode: this.settings.tabLayoutMode || "single",
		});
	}
	syncSettingsFromStore() {
		const state = TabStateStore.getState();
		this.settings.tabs = state.tabs.map((tab) => ({
			...tab,
			history: tab.history ? [...tab.history] : undefined,
		}));
		this.settings.favs = state.favs;
		this.settings.favGroups = state.favGroups;
		this.settings.closedTabs = state.closedTabs || [];
		for (const key of STORE_SETTING_KEYS) {
			if (key in state) this.settings[key] = state[key];
		}
		const normalized = normalizeEntryOrders(this.settings.favs, this.settings.favGroups);
		this.settings.favs = normalized.favs;
		this.settings.favGroups = normalized.favGroups;
	}
	updateSettings(patch, afterSave) {
		Object.assign(this.settings, patch);
		const storePatch = {};
		for (const key of STORE_SETTING_KEYS) {
			if (key in patch) storePatch[key] = patch[key];
		}
		if (Object.keys(storePatch).length) {
			updateStoreValues(storePatch);
		}
		this.persistSettings();
		afterSave?.();
	}
	loadSettings() {
		if (
			Object.keys(Data.load(this.getSettingsPath(), "settings") ?? {})
				.length === 0
		) {
			this.settings =
				Data.load(this.getSettingsPath(true), "settings") ??
				this.defaultVariables;
		} else {
			this.settings =
				Data.load(this.getSettingsPath(), "settings") ?? this.defaultVariables;
		}
		this.settings.favs = this.settings.favs.map((fav) => {
			if (fav.channelId === void 0) {
				const match = fav.url.match(/^\/channels\/[^/]+\/(\d+)$/);
				if (match) return Object.assign(fav, { channelId: match[1] });
			}
			if (fav.groupId === void 0) {
				return Object.assign(fav, { groupId: DEFAULT_PARENT_ID });
			}
			return fav;
		});
		const normalized = normalizeEntryOrders(
			this.settings.favs,
			(this.settings.favGroups || []).map(ensureGroupParent)
		);
		this.settings.favs = normalized.favs;
		this.settings.favGroups = normalized.favGroups;
		this.settings.folderDropStyle = this.settings.folderDropStyle || "accentGlow";
		this.settings.tabs = this.settings.tabs.map((tab) => {
			if (tab.history && Array.isArray(tab.history)) {
				return ensureTabId({ ...tab, history: [...tab.history] });
			} else {
				return ensureTabId({ ...tab, history: [tab.url], historyIndex: 0 });
			}
		});
		this.syncStoreFromSettings();
		this.persistSettings();
	}
	saveSettings() {
		this.syncSettingsFromStore();
		this.persistSettings();
	}
	getSettingsPanel() {
		return UI.buildSettingsPanel({
			settings: [
				//#region Startup Settings
				{
					id: "startupSettings",
					type: "category",
					name: "Startup Settings",
					settings: [
						{
							id: "reopenLastChannel",
							type: "switch",
							name: "Reopen last channel",
							note: "When starting the plugin (or discord) the channel will be selected again instead of the friends page",
							value: this.settings.reopenLastChannel,
							onChange: (checked) =>
								this.updateSettings({ reopenLastChannel: checked }),
						},
					],
				},
				//#endregion
				//#region General Appearance
				{
					id: "generalAppearance",
					type: "category",
					name: "General Appearance",
					settings: [
						{
							id: "showTabBar",
							type: "switch",
							name: "Show Tab Bar",
							note: "Allows you to have multiple tabs like in a web browser",
							value: this.settings.showTabBar,
							onChange: (checked) =>
								this.updateSettings({ showTabBar: checked }),
						},
						{
							id: "showFavBar",
							type: "switch",
							name: "Show Fav Bar",
							note: "Allows you to add favorites by right clicking a tab or the fav bar",
							value: this.settings.showFavBar,
							onChange: (checked) =>
								this.updateSettings({ showFavBar: checked }),
						},
						{
							id: "tabLayoutMode",
							type: "radio",
							name: "Tab Layout Mode",
							note: "Choose how tabs are displayed. Use Ctrl+Mouse Wheel on tabs to toggle quickly.",
							value: this.settings.tabLayoutMode || "single",
							options: [
								{ label: "Single row (horizontal scroll)", name: "Single row (horizontal scroll)", value: "single" },
								{ label: "Multi-row (unlimited rows)", name: "Multi-row (unlimited rows)", value: "multi" }
							],
							onChange: (value) => {
								this.updateSettings(
									{ tabLayoutMode: value },
									() =>
										BdApi.UI.showToast(
											`📑 ${value === "single" ? "Single row mode" : "Multi-row mode"}`,
											{ type: "info", timeout: 2000 }
										),
								);
							},
						},
						{
							id: "showQuickSettings",
							type: "switch",
							name: "Show Quick Settings",
							note: "Allows you to quickly change major settings from a context menu",
							value: this.settings.showQuickSettings,
							onChange: (checked) => {
								this.updateSettings({ showQuickSettings: checked });
							},
						},
						{
							id: "showNavButtons",
							type: "switch",
							name: "Show Navigation Buttons",
							note: "Click to go the left or right tab, this behavior can be changed in Behavior settings",
							value: this.settings.showNavButtons,
							onChange: (checked) => {
								this.updateSettings({ showNavButtons: checked }, () => {
									this.removeStyle();
									this.applyStyle();
								});
							},
						},
						{
							id: "compactStyle",
							type: "switch",
							name: "Use Compact Look",
							note: "",
							value: this.settings.compactStyle,
							onChange: (checked) => {
								this.updateSettings({ compactStyle: checked }, () => {
									this.removeStyle();
									this.applyStyle();
								});
							},
						},
						{
							id: "privacyMode",
							type: "switch",
							name: "Enable Privacy Mode",
							note: "Obfusicates all the Sensitive Text in ChannelTabs",
							value: this.settings.privacyMode,
							onChange: (checked) => {
								this.updateSettings({ privacyMode: checked }, () => {
									this.removeStyle();
									this.applyStyle();
								});
							},
						},
						{
							id: "radialStatusMode",
							type: "switch",
							name: "Use Radial Status Indicators",
							note: "Changes the status indicator into a circular border",
							value: this.settings.radialStatusMode,
							onChange: (checked) => {
								this.updateSettings({ radialStatusMode: checked }, () => {
									this.removeStyle();
									this.applyStyle();
								});
							},
						},
						{
							id: "tabWidthMin",
							type: "slider",
							name: "Minimum Tab Width",
							note: "Set the limit on how small a tab can be before overflowing to a new row",
							min: 58,
							max: 220,
							value: this.settings.tabWidthMin,
							onChange: (value) => {
								const tabWidthMin = Math.round(value);
								this.updateSettings({ tabWidthMin }, () =>
									document.documentElement.style.setProperty(
										"--channelTabs-tabWidthMin",
										tabWidthMin + "px",
									),
								);
							},
							defaultValue: 100,
							markers: [60, 85, 100, 125, 150, 175, 200, 220],
							units: "px",
						},
						{
							id: "folderDropStyle",
							type: "radio",
							name: "Folder Drop Feedback",
							note: "Choose how folder drop targets animate when dragging over them",
							value: this.settings.folderDropStyle || "accentGlow",
							options: [
								{ label: "Accent Glow + Lift", name: "Accent Glow + Lift", value: "accentGlow" },
								{ label: "Underline Sweep", name: "Underline Sweep", value: "underlineSweep" },
								{ label: "Slot Highlight", name: "Slot Highlight", value: "slotHighlight" },
								{ label: "Icon Pulse", name: "Icon Pulse", value: "iconPulse" },
								{ label: "Gradient Edge", name: "Gradient Edge", value: "gradientEdge" },
							],
							onChange: (value) => this.updateSettings({ folderDropStyle: value }),
						},
					],
				},
				//#endregion
				//#region Behavior Settings
				{
					id: "behavior",
					type: "category",
					name: "Behavior",
					settings: [
						{
							id: "alwaysFocusNewTabs",
							type: "switch",
							name: "Always Auto Focus New Tabs",
							note: "Forces all newly created tabs to bring themselves to focus",
							value: this.settings.alwaysFocusNewTabs,
							onChange: (checked) => {
								this.updateSettings({ alwaysFocusNewTabs: checked });
							},
						},
						{
							id: "useStandardNav",
							type: "switch",
							name: "Primary Forward/Back Navigation",
							note: "Instead of scrolling down the row, use the previous and next buttons to navigate between pages",
							value: this.settings.useStandardNav,
							onChange: (checked) => {
								this.updateSettings({ useStandardNav: checked });
							},
						},
					],
				},
				//#endregion
				//#region Badge Visibility - Favs
				{
					id: "badgeVisibilityFavorites",
					type: "category",
					name: "Badge Visibility - Favorites",
					settings: [
						{
							id: "showFavUnreadBadges",
							type: "switch",
							name: "Show Unread",
							note: "",
							value: this.settings.showFavUnreadBadges,
							onChange: (checked) => {
								this.updateSettings({ showFavUnreadBadges: checked });
							},
						},
						{
							id: "showFavMentionBadges",
							type: "switch",
							name: "Show Mentions",
							note: "",
							value: this.settings.showFavMentionBadges,
							onChange: (checked) => {
								this.updateSettings({ showFavMentionBadges: checked });
							},
						},
						{
							id: "showFavTypingBadge",
							type: "switch",
							name: "Show Typing",
							note: "",
							value: this.settings.showFavTypingBadge,
							onChange: (checked) => {
								this.updateSettings({ showFavTypingBadge: checked });
							},
						},
						{
							id: "showEmptyFavBadges",
							type: "switch",
							name: "Show Empty",
							note: "",
							value: this.settings.showEmptyFavBadges,
							onChange: (checked) => {
								this.updateSettings({ showEmptyFavBadges: checked });
							},
						},
					],
				},
				//#endregion
				//#region Badge Visibility - Fav Groups
				{
					id: "badgeVisibilityFavoriteGroups",
					type: "category",
					name: "Badge Visibility - Favorite Groups",
					settings: [
						{
							id: "showFavGroupUnreadBadges",
							type: "switch",
							name: "Show Unread",
							note: "",
							value: this.settings.showFavGroupUnreadBadges,
							onChange: (checked) => {
								this.updateSettings({ showFavGroupUnreadBadges: checked });
							},
						},
						{
							id: "showFavGroupMentionBadges",
							type: "switch",
							name: "Show Mentions",
							note: "",
							value: this.settings.showFavGroupMentionBadges,
							onChange: (checked) => {
								this.updateSettings({ showFavGroupMentionBadges: checked });
							},
						},
						{
							id: "showFavGroupTypingBadge",
							type: "switch",
							name: "Show Typing",
							note: "",
							value: this.settings.showFavGroupTypingBadge,
							onChange: (checked) => {
								this.updateSettings({ showFavGroupTypingBadge: checked });
							},
						},
						{
							id: "showEmptyFavGroupBadges",
							type: "switch",
							name: "Show Empty",
							note: "",
							value: this.settings.showEmptyFavGroupBadges,
							onChange: (checked) => {
								this.updateSettings({ showEmptyFavGroupBadges: checked });
							},
						},
					],
				},
				//#endregion
				//#region Badge Visibility - Tabs
				{
					id: "badgeVisibilityTabs",
					type: "category",
					name: "Badge Visibility - Tabs",
					settings: [
						{
							id: "showTabUnreadBadges",
							type: "switch",
							name: "Show Unread",
							note: "",
							value: this.settings.showTabUnreadBadges,
							onChange: (checked) => {
								this.updateSettings({ showTabUnreadBadges: checked });
							},
						},
						{
							id: "showTabMentionBadges",
							type: "switch",
							name: "Show Mentions",
							note: "",
							value: this.settings.showTabMentionBadges,
							onChange: (checked) => {
								this.updateSettings({ showTabMentionBadges: checked });
							},
						},
						{
							id: "showTabTypingBadge",
							type: "switch",
							name: "Show Typing",
							note: "",
							value: this.settings.showTabTypingBadge,
							onChange: (checked) => {
								this.updateSettings({ showTabTypingBadge: checked });
							},
						},
						{
							id: "showEmptyTabBadges",
							type: "switch",
							name: "Show Empty",
							note: "",
							value: this.settings.showEmptyTabBadges,
							onChange: (checked) => {
								this.updateSettings({ showEmptyTabBadges: checked });
							},
						},
					],
				},
				//#endregion
				//#region Badge Visibility - Active Tabs
				{
					id: "badgeVisibilityActiveTabs",
					type: "category",
					name: "Badge Visibility - Active Tabs",
					settings: [
						{
							id: "showActiveTabUnreadBadges",
							type: "switch",
							name: "Show Unread",
							note: "",
							value: this.settings.showActiveTabUnreadBadges,
							onChange: (checked) => {
								this.updateSettings({ showActiveTabUnreadBadges: checked });
							},
						},
						{
							id: "showActiveTabMentionBadges",
							type: "switch",
							name: "Show Mentions",
							note: "",
							value: this.settings.showActiveTabMentionBadges,
							onChange: (checked) => {
								this.updateSettings({ showActiveTabMentionBadges: checked });
							},
						},
						{
							id: "showActiveTabTypingBadge",
							type: "switch",
							name: "Show Typing",
							note: "",
							value: this.settings.showActiveTabTypingBadge,
							onChange: (checked) => {
								this.updateSettings({ showActiveTabTypingBadge: checked });
							},
						},
						{
							id: "showEmptyActiveTabBadges",
							type: "switch",
							name: "Show Empty",
							note: "",
							value: this.settings.showEmptyActiveTabBadges,
							onChange: (checked) => {
								this.updateSettings({ showEmptyActiveTabBadges: checked });
							},
						},
					],
				},
				//#endregion
				{
					id: "closedTabsSettings",
					type: "category",
					name: "Closed Tabs History",
					settings: [
						{
							id: "maxClosedTabsDays",
							type: "slider",
							name: "Days to keep closed tabs",
							note: "How many days to remember closed tabs in history",
							min: 1,
							max: 90,
							value: this.settings.maxClosedTabsDays || 30,
							onChange: (value) => {
								this.settings.maxClosedTabsDays = value;
								this.saveSettings();
							},
							markers: [1, 7, 14, 30, 60, 90],
							units: " days"
						},
						{
							id: "maxClosedTabsCount",
							type: "slider",
							name: "Maximum closed tabs to store",
							note: "Limit the number of closed tabs in history",
							min: 10,
							max: 500,
							value: this.settings.maxClosedTabsCount || 100,
							onChange: (value) => {
								this.settings.maxClosedTabsCount = value;
								this.saveSettings();
							},
							markers: [10, 50, 100, 200, 500],
							units: " tabs"
						},
						{
							id: "clearClosedTabs",
							type: "button",
							name: "Clear Closed Tabs History",
							note: "Remove all closed tabs from history",
							onClick: () => {
								updateClosedTabs(() => []);
								this.saveSettings();
								BdApi.UI.showToast("Closed tabs history cleared", { type: "success" });
							},
							color: "red",
							text: "Clear History"
						}
					]
				},
			],
		});
	}
	//#endregion
};
