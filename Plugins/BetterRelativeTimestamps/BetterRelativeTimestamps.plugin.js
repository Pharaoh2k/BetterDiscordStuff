/**
 * @name BetterRelativeTimestamps
 * @version 1.1.0
 * @description Relative timestamps with live tooltip, smart cadence, and seamless toggle of "relative-only".
 * @author  Pharaoh2k
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source  https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterRelativeTimestamps/BetterRelativeTimestamps.plugin.js
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
module.exports = class BetterRelativeTimestamps {
	static CHUNK_MS = 8;
	static BURST_CAP = 150;
	static MIN_UPDATE_INTERVAL = 500;
	static SAFETY_INTERVAL = 1000;
	static DEBOUNCE_DELAY = 50;
	static TIME_UNITS = Object.freeze([
		{ name: 'year',   seconds: 31_536_000, short: 'y' },
		{ name: 'month',  seconds: 2_592_000,  short: 'mo' },
		{ name: 'day',    seconds: 86_400,     short: 'd' },
		{ name: 'hour',   seconds: 3_600,      short: 'h' },
		{ name: 'minute', seconds: 60,         short: 'm' },
		{ name: 'second', seconds: 1,          short: 's' }
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
		}
	];
	load() {
		this.defaultSettings = Object.fromEntries(
			BetterRelativeTimestamps.panelConfig.map(s => [s.id, s.value])
		);
		this.settingsKey = 'BetterRelativeTimestampsSettings';
		this.settings = {
			...this.defaultSettings,
			...(BdApi.Data.load(this.settingsKey) ?? {})
		};
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
			BdApi.DOM.removeStyle('BetterRelativeTimestampsStyles');
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
			const next = this.settings.hideSeconds
			  ? (60 - (absoluteSeconds % 60)) * 1000
			  : BetterRelativeTimestamps.MIN_UPDATE_INTERVAL;
			return { visual: 'Just now', aria: 'just now', next };
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
			if (isNaN(timestamp.getTime())) {
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
			const text = visual === 'Just now'
				? visual
				: (isPast ? `${visual} ago` : `in ${visual}`);
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
				if (!span.isConnected) {
					toDelete.push(span);
				} else {
					try {
						const next = this.refreshOne(span, now);
						soonest = Math.min(soonest, next);
					} catch (error) {
						this.logError('Error updating span', error);
						toDelete.push(span);
					}
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
		BdApi.DOM.addStyle('BetterRelativeTimestampsStyles', `
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
	getSettingsPanel() {
		const schema = BetterRelativeTimestamps.panelConfig.map(
			s => ({ ...s, value: this.settings[s.id] })
		);
		return BdApi.UI.buildSettingsPanel({
			settings: schema,
			onChange: (_, id, val) => {
				this.settings[id] = val;
				BdApi.Data.save(this.settingsKey, this.settings);
				this.removeAllRelatives();
				this.enqueueScan(document.body);
				this.scheduleTick();
			}
		});
	}
	logError(message, error) {
		if (this.settings?.enableLogging) {
			console.error(`[BetterRelativeTimestamps] ${message}:`, error);
		}
	}
	logWarn(message, ...args) {
		if (this.settings?.enableLogging) {
			console.warn(`[BetterRelativeTimestamps] ${message}:`, ...args);
		}
	}
};
/*@end@*/
