/**
 * @name BetterRelativeTimestamps
 * @version 1.0.2
 * @description Relative timestamps with live tooltip, smart cadence, and seamless toggle of “relative-only”.
 * @author  Pharaoh2k
 * @website https://x.com/_Pharaoh2k
 * @source  https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterRelativeTimestamps.plugin.js
 * @credits Based on the idea by BrandonXLF (“RelativeTimestamps”)
 */

module.exports = class BetterRelativeTimestamps {

	static panelConfig = [
		{type:'switch', id:'showInTimestamp',
		name:'Show alongside absolute time',
		note:'Appends “– 5 m ago” next to Discord’s default timestamp.', value:true},
		{type:'switch', id:'relativeOnly',
		name:'Show relative time only',
		note:'Hide Discord’s built‑in absolute time completely.', value:false},
		{type:'switch', id:'hideSeconds',
		name:'Hide seconds',
		note:'Skip the seconds unit in the relative string.', value:false}
	];

	load () {
		this.defaultSettings =
			Object.fromEntries(BetterRelativeTimestamps.panelConfig.map(s => [s.id, s.value]));

		this.settingsKey  = 'BetterRelativeTimestampsSettings';
		this.settings     = { ...this.defaultSettings,
			...(BdApi.Data.load(this.settingsKey) ?? {}) };

		this.visibleSpans = new Set();
		this.timerHandle  = null;
		this.mObserver    = null;
		this.iObserver    = null;
		this.scanQueue    = [];       // ★ queued <time> nodes
		this.queueBusy    = false;    // ★ worker flag
		this.rtfLong      = new Intl.RelativeTimeFormat(undefined,
			{ numeric:'auto', style:'long' });
	}

	start () {
		this.injectStyle();
		this.observeMutations();
		this.enqueueScan(document.body);   // initial scan
		this.scheduleTick();
	}

	stop () {
		this.unobserveAll();
		this.removeAllRelatives();
		BdApi.DOM.removeStyle('BetterRelativeTimestampsStyles');
	}


	observeMutations () {
		this.iObserver = new IntersectionObserver(this.onIntersect, { threshold:0 });

		const debounced = BdApi.Utils.debounce(muts=>{
			if (muts.some(m=>m.addedNodes.length))
				this.enqueueScan(document.body);
		}, 50);                                       // ↓ faster debounce

		const chat = document.querySelector('[aria-label="Messages"]') || document.body;
		this.mObserver = new MutationObserver(debounced);
		this.mObserver.observe(chat, { childList:true, subtree:true });
	}

	onIntersect = entries=>{
		for (const e of entries)
			e.isIntersecting ? this.visibleSpans.add(e.target)
			                 : this.visibleSpans.delete(e.target);
		this.scheduleTick();
	};

	unobserveAll () {
		this.mObserver?.disconnect();
		this.iObserver?.disconnect();
		clearTimeout(this.timerHandle);
		this.timerHandle = null;
	}
	enqueueScan (root) {
		const nodes = root.querySelectorAll('time[datetime]:not(.brt-handled)');
		if (nodes.length) {
			nodes.forEach(n => this.scanQueue.push(n));
			this.drainQueue(true);          // true = do immediate burst
		}
	}

	drainQueue (burstFirst = false) {
		if (this.queueBusy) return;
		this.queueBusy = true;

		const CHUNK_MS   = 8;              // slice length
		const BURST_CAP  = 150;            // upfront nodes (≈ viewport)

		let processedInBurst = 0;

		const work = () => {
			const start = performance.now();

			while (this.scanQueue.length &&
			       (processedInBurst < BURST_CAP || performance.now() - start < CHUNK_MS))
			{
				this.attachRelative(this.scanQueue.shift());
				processedInBurst++;
			}

			if (this.scanQueue.length)
				setTimeout(work, 0);
			else
				this.queueBusy = false;
		};

		if (burstFirst)
			work();
		else
			setTimeout(work, 0);
	}

	breakDown (sec) {
		const tbl = [
			{name:'year',   s:31_536_000, short:'y'},
			{name:'month',  s:2_592_000,  short:'mo'},
			{name:'day',    s:86_400,     short:'d'},
			{name:'hour',   s:3_600,      short:'h'},
			{name:'minute', s:60,         short:'m'},
			{name:'second', s:1,          short:'s'}
		];

		const vis=[], aria=[]; let rem = sec, firstUnit=null;
		for (const {name,s,short} of tbl) {
			if (this.settings.hideSeconds && name==='second') break;
			const v = Math.floor(rem/s);
			if (v) {
				if (!firstUnit) firstUnit = {name, s};
				vis .push(`${v}${short}`);
				aria.push(this.rtfLong.format(-v, name));
				rem -= v*s;
			}
		}

		if (!vis.length)
			return { visual:'Just now', aria:'just now', next:500 };

		const next = firstUnit.name === 'second'
		             ? 500
		             : (firstUnit.s - (sec % firstUnit.s)) * 1_000;

		return { visual:`${vis.join(' ')} ago`, aria:aria.join(', '), next };
	}


	attachRelative (timeEl) {
		if (!this.settings.showInTimestamp && !this.settings.relativeOnly) return;
		if (!timeEl || timeEl.classList.contains('brt-handled'))      return;

		const ts = new Date(timeEl.getAttribute('datetime'));
		if (isNaN(ts)) return;

		timeEl.classList.add('brt-handled');

		if (timeEl.dataset.brtOriginal == null)
			timeEl.dataset.brtOriginal = timeEl.textContent;

		if (this.settings.relativeOnly) timeEl.textContent = '';

		const span = document.createElement('span');
		span.className       = 'brt-span';
		span.dataset.tsValue = ts.getTime();
		span._hostTimeEl     = timeEl;

		this.refreshOne(span);
		timeEl.after(span);
		this.iObserver.observe?.(span);
	}

	refreshOne (span, now = Date.now()) {
		const secs = Math.round((now - +span.dataset.tsValue) / 1_000);
		const {visual, aria, next} = this.breakDown(secs);

		span.textContent = (this.settings.relativeOnly ? '' : ' – ') + visual;
		span.setAttribute('aria-label', aria);
		if (span._hostTimeEl) span._hostTimeEl.title = aria;

		return next;
	}

	scheduleTick () {
		const SAFETY = 1_000;

		if (!this.visibleSpans.size) {
			if (this.timerHandle === null)
				this.timerHandle = setTimeout(()=>{ this.timerHandle=null; this.scheduleTick(); }, SAFETY);
			return;
		}
		if (this.timerHandle !== null) return;

		const run = () => {
			const now = Date.now();
			let soonest = SAFETY;
			this.visibleSpans.forEach(sp => {
				const next = this.refreshOne(sp, now);
				soonest = Math.min(soonest, next);
			});
			this.timerHandle = setTimeout(() => {
				this.timerHandle = null;
				this.scheduleTick();
			}, soonest);
		};
		run();
	}

	injectStyle () {
		BdApi.DOM.addStyle('BetterRelativeTimestampsStyles', `
			.brt-span{
				display:inline;
				margin-left:4px;
				color:var(--text-muted);
				font-size:inherit;
				white-space:nowrap;
			}`);
	}

	removeAllRelatives () {
		document.querySelectorAll('.brt-span').forEach(e => e.remove());

		document.querySelectorAll('.brt-handled').forEach(el => {
			el.classList.remove('brt-handled');
			if (el.dataset.brtOriginal != null) {
				el.textContent = el.dataset.brtOriginal;
				delete el.dataset.brtOriginal;
			}
		});

		this.visibleSpans.clear();
	}

	getSettingsPanel () {
		const schema = BetterRelativeTimestamps.panelConfig.map(
			s => ({ ...s, value:this.settings[s.id] })
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
};
