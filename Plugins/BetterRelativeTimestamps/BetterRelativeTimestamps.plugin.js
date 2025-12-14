/**
 * @name BetterRelativeTimestamps
 * @version 1.1.2
 * @description Relative timestamps with live tooltip, smart cadence, seamless toggle of "relative-only".
 * @author  Pharaoh2k
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source  https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterRelativeTimestamps/BetterRelativeTimestamps.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterRelativeTimestamps/BetterRelativeTimestamps.plugin.js
 */
/*
Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
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
module.exports = class BetterRelativeTimestamps {
	static GITHUB = 'Pharaoh2k/BetterDiscordStuff';
	static CHUNK_MS = 8;
	static BURST_CAP = 150;
	static MIN_UPDATE_INTERVAL = 500;
	static SAFETY_INTERVAL = 1000;
	static DEBOUNCE_DELAY = 50;
	static TIME_UNITS = Object.freeze([
		{ name: 'year', seconds: 31_536_000, short: 'y' },
		{ name: 'month', seconds: 2_592_000, short: 'mo' },
		{ name: 'day', seconds: 86_400, short: 'd' },
		{ name: 'hour', seconds: 3_600, short: 'h' },
		{ name: 'minute', seconds: 60, short: 'm' },
		{ name: 'second', seconds: 1, short: 's' }
	]);
	static panelConfig = [
		{
			type: 'switch',
			id: 'showInTimestamp',
			name: 'Show alongside absolute time',
			note: 'Appends "— 5 m ago" next to Discord\'s default timestamp.',
			value: true
		},
		{
			type: 'switch',
			id: 'relativeOnly',
			name: 'Show relative time only',
			note: 'Hide Discord\'s built-in absolute time completely.',
			value: false
		},
		{
			type: 'switch',
			id: 'hideSeconds',
			name: 'Hide seconds',
			note: 'Skip the seconds unit in the relative string.',
			value: false
		},
		{
			type: 'switch',
			id: 'enableLogging',
			name: 'Enable debug logging',
			note: 'Log errors and warnings to console for debugging.',
			value: false
		},
		{
			type: 'switch',
			id: 'autoUpdate',
			name: 'Automatic Updates Checker',
			note: 'Check for updates every 24 hours and on Discord startup',
			value: true
		}
	];
	constructor(meta) {
		this.meta = meta;
		this.updateManager = new UpdateManager(
			meta.name,
			meta.version,
			BetterRelativeTimestamps.GITHUB
		);
	}
	load() {
		this.defaultSettings = Object.fromEntries(
			BetterRelativeTimestamps.panelConfig.map(s => [s.id, s.value])
		);
		this.settingsKey = this.meta.name;
		const savedSettings = BdApi.Data.load(this.settingsKey) || {};
		this.settings = { ...this.defaultSettings, ...savedSettings };
		this.visibleSpans = new Set();
		this.processedElements = new WeakSet();
		this.timerHandle = null;
		this.mObserver = null;
		this.iObserver = null;
		this.scanQueue = [];
		this.queueBusy = false;
		this.rtfLong = new Intl.RelativeTimeFormat(undefined, {
			numeric: 'auto',
			style: 'long'
		});
	}
	start() {
		try {
			this.injectStyle();
			this.observeMutations();
			this.enqueueScan(document.body);
			this.scheduleTick();
			this.updateManager.start(this.settings.autoUpdate);
		} catch (error) {
			this.logError('Failed to start plugin', error);
		}
	}
	stop() {
		try {
			this.unobserveAll();
			this.removeAllRelatives();
			this.scanQueue = [];
			this.visibleSpans.clear();
			BdApi.DOM.removeStyle(this.meta.name);
			this.updateManager.stop();
		} catch (error) {
			this.logError('Error during plugin stop', error);
		}
	}
	observeMutations() {
		this.iObserver = new IntersectionObserver(this.onIntersect, {
			threshold: 0
		});
		const debounced = BdApi.Utils.debounce(mutations => {
			if (mutations.some(m => m.addedNodes.length)) {
				this.enqueueScan(document.body);
			}
		}, BetterRelativeTimestamps.DEBOUNCE_DELAY);
		const chat = document.querySelector('[aria-label="Messages"]') || document.body;
		this.mObserver = new MutationObserver(debounced);
		this.mObserver.observe(chat, {
			childList: true,
			subtree: true
		});
	}
	onIntersect = (entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				this.visibleSpans.add(entry.target);
			} else {
				this.visibleSpans.delete(entry.target);
			}
		}
		this.scheduleTick();
	};
	unobserveAll() {
		this.mObserver?.disconnect();
		this.iObserver?.disconnect();
		if (this.timerHandle !== null) {
			clearTimeout(this.timerHandle);
			this.timerHandle = null;
		}
	}
	enqueueScan(root) {
		if (!root) return;
		try {
			const nodes = [];
			if (root.matches?.('time[datetime]:not(.brt-handled)')) {
				nodes.push(root);
			}
			const descendants = root.querySelectorAll('time[datetime]:not(.brt-handled)');
			descendants.forEach(node => nodes.push(node));
			nodes.forEach(node => {
				if (!this.processedElements.has(node)) {
					this.processedElements.add(node);
					this.scanQueue.push(node);
				}
			});
			if (this.scanQueue.length > 0) {
				this.drainQueue(true);
			}
		} catch (error) {
			this.logError('Error during scan enqueue', error);
		}
	}
	drainQueue(burstFirst = false) {
		if (this.queueBusy) return;
		this.queueBusy = true;
		let processedInBurst = 0;
		const work = () => {
			const start = performance.now();
			try {
				while (this.scanQueue.length &&
					(processedInBurst < BetterRelativeTimestamps.BURST_CAP ||
						performance.now() - start < BetterRelativeTimestamps.CHUNK_MS)) {
					const element = this.scanQueue.shift();
					if (element && element.isConnected) {
						this.attachRelative(element);
					}
					processedInBurst++;
				}
			} catch (error) {
				this.logError('Error processing queue', error);
			}
			if (this.scanQueue.length) {
				setTimeout(work, 0);
			} else {
				this.queueBusy = false;
				this.processedElements = new WeakSet();
			}
		};
		if (burstFirst) {
			work();
		} else {
			setTimeout(work, 0);
		}
	}
	getJustNowResult(absoluteSeconds) {
		const next = this.settings.hideSeconds
			? (60 - (absoluteSeconds % 60)) * 1000
			: BetterRelativeTimestamps.MIN_UPDATE_INTERVAL;
		return { visual: 'Just now', aria: 'just now', next };
	}
	breakDown(absoluteSeconds, isPast) {
		const visible = [];
		const aria = [];
		let remaining = absoluteSeconds;
		let firstUnit = null;
		for (const unit of BetterRelativeTimestamps.TIME_UNITS) {
			if (this.settings.hideSeconds && unit.name === 'second') break;
			const value = Math.floor(remaining / unit.seconds);
			if (value > 0) {
				if (!firstUnit) firstUnit = unit;
				visible.push(`${value}${unit.short}`);
				aria.push(this.rtfLong.format(isPast ? -value : value, unit.name));
				remaining -= value * unit.seconds;
			}
		}
		if (visible.length === 0) {
			return this.getJustNowResult(absoluteSeconds);
		}
		const unitMs = firstUnit.seconds * 1000;
		const remainingMs = (absoluteSeconds * 1000) % unitMs;
		const next = remainingMs === 0 ? unitMs : unitMs - remainingMs;
		return {
			visual: visible.join(' '),
			aria: aria.join(', '),
			next: Math.max(BetterRelativeTimestamps.MIN_UPDATE_INTERVAL, next)
		};
	}
	attachRelative(timeEl) {
		if (!this.settings.showInTimestamp && !this.settings.relativeOnly) return;
		if (!timeEl || timeEl.classList.contains('brt-handled')) return;
		try {
			const timestamp = new Date(timeEl.getAttribute('datetime'));
			if (Number.isNaN(timestamp.getTime())) {
				this.logWarn('Invalid datetime attribute', timeEl);
				return;
			}
			timeEl.classList.add('brt-handled');
			if (timeEl.dataset.brtOriginal == null) {
				timeEl.dataset.brtOriginal = timeEl.textContent;
			}
			if (this.settings.relativeOnly) {
				timeEl.textContent = '';
			}
			const span = document.createElement('span');
			span.className = 'brt-span';
			span.dataset.tsValue = timestamp.getTime();
			span._hostTimeEl = timeEl;
			this.refreshOne(span);
			timeEl.after(span);
			this.iObserver?.observe(span);
		} catch (error) {
			this.logError('Error attaching relative timestamp', error);
		}
	}
	refreshOne(span, now = Date.now()) {
		try {
			const elapsedMs = now - Number(span.dataset.tsValue);
			const isPast = elapsedMs >= 0;
			const absoluteSeconds = Math.floor(Math.abs(elapsedMs) / 1000);
			const { visual, aria, next } = this.breakDown(absoluteSeconds, isPast);
			const prefix = this.settings.relativeOnly ? '' : ' — ';
			const suffix = isPast ? `${visual} ago` : `in ${visual}`;
			const text = visual === 'Just now' ? visual : suffix;
			span.textContent = prefix + text;
			span.setAttribute('aria-label', aria);
			const hostTimeEl = span._hostTimeEl;
			if (hostTimeEl && hostTimeEl.classList.contains('brt-handled')) {
				hostTimeEl.title = aria;
			}
			return next;
		} catch (error) {
			this.logError('Error refreshing timestamp', error);
			return BetterRelativeTimestamps.SAFETY_INTERVAL;
		}
	}
	scheduleTick() {
		this.visibleSpans.forEach(span => {
			if (!span.isConnected) {
				this.visibleSpans.delete(span);
			}
		});
		if (!this.visibleSpans.size) {
			if (this.timerHandle === null) {
				this.timerHandle = setTimeout(() => {
					this.timerHandle = null;
					this.scheduleTick();
				}, BetterRelativeTimestamps.SAFETY_INTERVAL);
			}
			return;
		}
		if (this.timerHandle !== null) return;
		const run = () => {
			const now = Date.now();
			let soonest = BetterRelativeTimestamps.SAFETY_INTERVAL;
			const toDelete = [];
			this.visibleSpans.forEach(span => {
				if (span.isConnected) {
					try {
						const next = this.refreshOne(span, now);
						soonest = Math.min(soonest, next);
					} catch (error) {
						this.logError('Error updating span', error);
						toDelete.push(span);
					}
				} else {
					toDelete.push(span);
				}
			});
			toDelete.forEach(span => this.visibleSpans.delete(span));
			this.timerHandle = setTimeout(() => {
				this.timerHandle = null;
				this.scheduleTick();
			}, soonest);
		};
		run();
	}
	injectStyle() {
		BdApi.DOM.addStyle(this.meta.name, `
			.brt-span {
				display: inline;
				margin-left: 4px;
				color: var(--text-muted);
				font-size: inherit;
				white-space: nowrap;
				user-select: text;
			}
		`);
	}
	removeAllRelatives() {
		document.querySelectorAll('.brt-span').forEach(el => el.remove());
		document.querySelectorAll('.brt-handled').forEach(el => {
			el.classList.remove('brt-handled');
			if (el.dataset.brtOriginal != null) {
				el.textContent = el.dataset.brtOriginal;
				delete el.dataset.brtOriginal;
			}
		});
		this.visibleSpans.clear();
		this.processedElements = new WeakSet();
	}
	saveSettings(newSettings) {
		this.settings = {
			...this.settings,
			...newSettings
		};
		BdApi.Data.save(this.settingsKey, this.settings);
		if (Object.hasOwn(newSettings, 'autoUpdate')) {
			if (newSettings.autoUpdate) {
				this.updateManager.start(true);
			} else {
				this.updateManager.stop();
			}
		}
	}
	getSettingsPanel() {
		const config = BetterRelativeTimestamps.panelConfig.map(
			s => ({ ...s, value: this.settings[s.id] })
		);
		config.push(
			{
				type: 'button',
				id: 'checkUpdate',
				name: 'Check for Updates',
				note: 'Manually check for plugin updates',
				onClick: () => this.updateManager.check()
			},
			{
				type: 'button',
				id: 'viewChangelog',
				name: 'View Changelog',
				note: 'View all version changes',
				onClick: () => this.updateManager.showFullChangelog()
			}
		);
		const panel = BdApi.UI.buildSettingsPanel({
			settings: config,
			onChange: (_, id, val) => {
				this.saveSettings({ [id]: val });
				if (['showInTimestamp', 'relativeOnly', 'hideSeconds'].includes(id)) {
					this.removeAllRelatives();
					this.enqueueScan(document.body);
					this.scheduleTick();
				}
			}
		});
		requestAnimationFrame(() => {
			const checkBtn = document.querySelector("#checkUpdate .bd-button-content");
			if (checkBtn) checkBtn.textContent = "Check Now";
			const changelogBtn = document.querySelector("#viewChangelog .bd-button-content");
			if (changelogBtn) changelogBtn.textContent = "View Changelog";
		});
		return panel;
	}
	logError(message, error) {
		if (this.settings?.enableLogging) {
			console.error(`[${this.meta.name}] ${message}:`, error);
		}
	}
	logWarn(message, ...args) {
		if (this.settings?.enableLogging) {
			console.warn(`[${this.meta.name}] ${message}:`, ...args);
		}
	}
};
