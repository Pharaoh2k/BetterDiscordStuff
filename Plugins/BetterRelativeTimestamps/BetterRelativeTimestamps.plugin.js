/**
 * @name BetterRelativeTimestamps
 * @version 1.1.5
 * @description Relative timestamps with live tooltip, seamless toggle of "relative-only".
 * @author  Pharaoh2k
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source  https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterRelativeTimestamps/BetterRelativeTimestamps.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterRelativeTimestamps/BetterRelativeTimestamps.plugin.js
 */
/*
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * * *
 * Contributions are welcome via GitHub pull requests.
 * Please ensure submissions align with the project's guidelines and coding standards.
 * By contributing, you agree that your work will be licensed under the same terms as this project.
*/
const { Data, DOM, Logger, Net, Plugins, UI, Utils } = new BdApi("BetterRelativeTimestamps");
const GITHUB = 'Pharaoh2k/BetterDiscordStuff';
const CHUNK_MS = 8;
const BURST_CAP = 150;
const MIN_UPDATE_INTERVAL = 500;
const SAFETY_INTERVAL = 1000;
const DEBOUNCE_DELAY = 50;
const TIME_UNITS = Object.freeze([
	{ name: 'year', seconds: 31_536_000, short: 'y' },
	{ name: 'month', seconds: 2_592_000, short: 'mo' },
	{ name: 'day', seconds: 86_400, short: 'd' },
	{ name: 'hour', seconds: 3_600, short: 'h' },
	{ name: 'minute', seconds: 60, short: 'm' },
	{ name: 'second', seconds: 1, short: 's' }
]);
const panelConfig = [
	{
		type: 'switch',
		id: 'showInTimestamp',
		name: 'Show alongside absolute time',
		note: 'Appends "- 5 m ago" next to Discord\'s default timestamp.',
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
		const last = Data.load('version');
		Logger.info(`showChangelog: last=${last}, current=${this.version}`);
		if (last === this.version) { Logger.info("Skipping: versions match"); return; }
		Data.save('version', this.version);
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
const hostTimeMap = new WeakMap();
module.exports = class BetterRelativeTimestamps {
	constructor(meta) {
		this.meta = meta;
		this.updateManager = new UpdateManager(
			meta.name,
			meta.version,
			GITHUB
		);
	}
	load() {
		this.defaultSettings = Object.fromEntries(
			panelConfig.map(s => [s.id, s.value])
		);
		const savedSettings = Data.load('settings') || {};
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
		this.updateManager.start(this.settings.autoUpdate);
		try {
			this.injectStyle();
			this.observeMutations();
			this.enqueueScan(document.body);
			this.scheduleTick();
		} catch (e) {
			Logger.error('Failed to start timestamp features:', e);
		}
	}
	stop() {
		this.updateManager.stop();
		this.unobserveAll();
		this.removeAllRelatives();
		this.scanQueue = [];
		DOM.removeStyle();
	}	
	observeMutations() {
		this.iObserver = new IntersectionObserver(this.onIntersect, {
			threshold: 0
		});
		const pendingRoots = new Set();
		const flush = Utils.debounce(() => {
			for (const root of pendingRoots) {
				if (root.isConnected) this.enqueueScan(root);
			}
			pendingRoots.clear();
		}, DEBOUNCE_DELAY);
		const chat = document.querySelector('[aria-label="Messages"]') || document.body;
		this.mObserver = new MutationObserver(mutations => {
			for (const m of mutations) {
				for (const node of m.addedNodes) {
					if (node.nodeType === 1) pendingRoots.add(node);
				}
			}
			if (pendingRoots.size) flush();
		});
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
				if (!entry.target.isConnected) {
					this.iObserver.unobserve(entry.target);
					hostTimeMap.delete(entry.target);
				}
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
		const nodes = root.querySelectorAll('time[datetime]:not(.brt-handled)');
		nodes.forEach(node => {
			if (!this.processedElements.has(node)) {
				this.processedElements.add(node);
				this.scanQueue.push(node);
			}
		});
		if (this.scanQueue.length > 0) {
			this.drainQueue();
		}
	}
	drainQueue() {
		if (this.queueBusy) return;
		this.queueBusy = true;
		const work = () => {
			const start = performance.now();
			let processedInChunk = 0;
			while (this.scanQueue.length &&
				processedInChunk < BURST_CAP &&
				performance.now() - start < CHUNK_MS) {
				const element = this.scanQueue.shift();
				if (element.isConnected) {
					this.attachRelative(element);
				}
				processedInChunk++;
			}
			if (this.scanQueue.length) {
				setTimeout(work, 0);
			} else {
				this.queueBusy = false;
				this.processedElements = new WeakSet();
			}
		};
		work();
	}
	getJustNowResult(absoluteSeconds) {
		const next = this.settings.hideSeconds
			? (60 - (absoluteSeconds % 60)) * 1000
			: MIN_UPDATE_INTERVAL;
		return { visual: 'Just now', aria: 'just now', next };
	}
	breakDown(absoluteSeconds, isPast) {
		const visible = [];
		const aria = [];
		let remaining = absoluteSeconds;
		let firstUnit = null;
		for (const unit of TIME_UNITS) {
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
			next: Math.max(MIN_UPDATE_INTERVAL, next)
		};
	}
	attachRelative(timeEl) {
		if (!this.settings.showInTimestamp && !this.settings.relativeOnly) return;
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
		hostTimeMap.set(span, timeEl);
		this.refreshOne(span);
		timeEl.after(span);
		this.iObserver.observe(span);
	}
	refreshOne(span, now = Date.now()) {
		const ts = Number(span.dataset.tsValue);
		if (Number.isNaN(ts)) return SAFETY_INTERVAL;
		const elapsedMs = now - ts;
		const isPast = elapsedMs >= 0;
		const absoluteSeconds = Math.floor(Math.abs(elapsedMs) / 1000);
		const { visual, aria, next } = this.breakDown(absoluteSeconds, isPast);
		const prefix = this.settings.relativeOnly ? '' : ' - ';
		const suffix = isPast ? `${visual} ago` : `in ${visual}`;
		const text = visual === 'Just now' ? visual : suffix;
		span.textContent = prefix + text;
		span.setAttribute('aria-label', aria);
		hostTimeMap.get(span).title = aria;
		return next;
	}
	scheduleTick() {
		const now = Date.now();
		let soonest = SAFETY_INTERVAL;
		let hasVisible = false;
		this.visibleSpans.forEach(span => {
			if (!span.isConnected) {
				this.visibleSpans.delete(span);
				return;
			}
			hasVisible = true;
			const next = this.refreshOne(span, now);
			soonest = Math.min(soonest, next);
		});
		if (!hasVisible) {
			if (this.timerHandle === null) {
				this._scheduleNext(SAFETY_INTERVAL);
			}
			return;
		}
		if (this.timerHandle !== null) return;
		this._scheduleNext(soonest);
	}
	_scheduleNext(delay) {
		this.timerHandle = setTimeout(() => {
			this.timerHandle = null;
			this.scheduleTick();
		}, delay);
	}
	injectStyle() {
		DOM.addStyle(`
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
		Data.save('settings', this.settings);
		if (Object.hasOwn(newSettings, 'autoUpdate')) {
			if (newSettings.autoUpdate) {
				this.updateManager.start(true);
			} else {
				this.updateManager.stop();
			}
		}
	}
	getSettingsPanel() {
		const config = panelConfig.map(
			s => ({ ...s, value: this.settings[s.id] })
		);
		config.push({
			type: 'button',
			id: 'checkUpdate',
			name: 'Check for Updates',
			note: 'Manually check for plugin updates',
			onClick: () => this.updateManager.check()
		});
		const panel = UI.buildSettingsPanel({
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
		});
		return panel;
	}
	logWarn(message, ...args) {
		if (this.settings.enableLogging) {
			Logger.warn(`${message}:`, ...args);
		}
	}
};
