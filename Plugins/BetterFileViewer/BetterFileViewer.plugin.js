/**
 * @name BetterFileViewer
 * @author Pharaoh2k, AGreenPig
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @authorLink https://github.com/Pharaoh2k
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/BetterFileViewer/BetterFileViewer.plugin.js
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterFileViewer/BetterFileViewer.plugin.js
 * @invite ComingSoon
 * @version 3.0.3
 * @description View PDF, office files and other files (stl) directly in Discord.
 */
const TAG = "BetterFileViewer";
const DEV = false;
const log = (...a) => DEV && console.log(`[${TAG}]`, ...a);
const CONFIG = {
    github: "Pharaoh2k/BetterDiscordStuff",
    defaultConfig: [{
        type: "switch",
        id: "autoUpdate",
        name: "Automatic Updates",
        note: "Check for updates every 24 hours and on Discord startup",
        value: true
    }]
};
const CSS = `
    .BetterFileViewerEmbed {
        resize: both; 
        overflow: auto;
        padding: 10px;
        max-width: 100%;
        min-width: 300px;
        max-height: 80vh;
        min-height: 100px;
        border: 1px solid var(--background-surface-high);
        border-radius: 4px;
        margin-top: 8px;
        background: var(--background-mobile-secondary);
    }
    .BetterFileViewerButton {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--interactive-icon-default);
        transition: color 0.15s ease;
        background: none;
        border: none;
        padding: 4px;
        margin: 0 4px;
        border-radius: 4px;
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        position: relative;
    }
    .BetterFileViewerButton:hover {
        color: var(--interactive-icon-hover);
        background-color: var(--background-mod-subtle);
    }
    .BetterFileViewerButton:active {
        color: var(--interactive-icon-active);
        background-color: var(--background-mod-normal);
    }
    .BetterFileViewerButton svg {
        width: 20px;
        height: 20px;
        display: block;
    }
    .BetterFileViewerWarning {
        color: var(--status-danger);
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        padding: 4px;
        margin: 0 4px;
        cursor: help;
    }
    .BetterFileViewerWarning svg {
        width: 20px;
        height: 20px;
        display: block;
    }
    /* Ensure our buttons appear on hover like Discord's */
    [data-file-viewer-processed="true"]:not(:hover) .BetterFileViewerButton,
    [data-file-viewer-processed="true"]:not(:hover) .BetterFileViewerWarning {
        opacity: 0;
        transition: opacity 0.15s ease;
    }
    [data-file-viewer-processed="true"]:hover .BetterFileViewerButton,
    [data-file-viewer-processed="true"]:hover .BetterFileViewerWarning {
        opacity: 1;
    }
`;
const OFFICE_EXTENSIONS = ["ppt", "pptx", "doc", "docx", "xls", "xlsx", "odt"];
const GOOGLE_EXTENSIONS = ["pdf"];
const OBJECT_EXTENSIONS = ["stl", "obj", "vf", "vsj", "vsb", "3mf"];
const ALL_EXTENSIONS = [...OFFICE_EXTENSIONS, ...GOOGLE_EXTENSIONS, ...OBJECT_EXTENSIONS];
const ICONS = {
    show: `<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>`,
    hide: `<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
    </svg>`,
    warning: `<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>`
};
class UpdateManager {
	constructor(pluginName, version, github = "Pharaoh2k/BetterDiscordStuff") {
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
		if (typeof this.notification === "function") this.notification();
		else this.notification?.close?.();
		this.notification = null;
	}
	async check(silent = false) {
		try {
			const res = await BdApi.Net.fetch(this.urls.plugin);
			if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
			const text = await res.text();
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) throw new Error(`Remote plugin validation failed: ${validated.reason}`);
			const version = validated.version;
			if (this.isNewer(version)) {
				this.showUpdateNotice(version, text);
			} else if (!silent) {
				BdApi.UI.showToast(`[${this.name}] You're up to date.`, { type: "info" });
			}
		} catch (e) {
			BdApi.Logger.error(this.name, "Update check failed:", e);
			if (!silent) BdApi.UI.showToast(`[${this.name}] Update check failed`, { type: "error" });
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
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) {
				BdApi.UI.showToast(`Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
				return;
			}
			const nextVersion = validated.version ?? version;
			require("fs").writeFileSync(__filename, text);
			BdApi.UI.showToast(`Updated to v${nextVersion}. Reloading...`, { type: "success" });
			setTimeout(() => {
				try {
					BdApi.Plugins.reload(this.name);
				} catch {
					BdApi.UI.showToast("Please reload Discord (Ctrl+R)", { type: "info", timeout: 0 });
				}
			}, 100);
		} catch (e) {
			BdApi.Logger.error(this.name, "Update failed:", e);
			BdApi.UI.showToast("Update failed", { type: "error" });
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
	isNewer(remoteVersion, localVersion = this.version) {
		return this._compareSemver(remoteVersion, localVersion) > 0;
	}
	_compareSemver(a, b) {
		const pa = String(a ?? "").split(".").map(n => Number.parseInt(n, 10));
		const pb = String(b ?? "").split(".").map(n => Number.parseInt(n, 10));
		const len = Math.max(pa.length, pb.length);
		for (let i = 0; i < len; i++) {
			const va = Number.isFinite(pa[i]) ? pa[i] : 0;
			const vb = Number.isFinite(pb[i]) ? pb[i] : 0;
			if (va > vb) return 1;
			if (va < vb) return -1;
		}
		return 0;
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
class BetterFileViewerButton {
    constructor(fileData) {
        this.fileData = fileData;
        this.open = false;
        this.button = null;
        this.embed = null;
        this.tooltipNode = null;
    }
    getViewerUrl() {
        const url = this.fileData.url;
        const filename = this.fileData.filename.toLowerCase();
        if (GOOGLE_EXTENSIONS.some(ext => filename.endsWith(`.${ext}`))) {
            return `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(url)}`;
        }
        if (OFFICE_EXTENSIONS.some(ext => filename.endsWith(`.${ext}`))) {
            return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;
        }
        if (OBJECT_EXTENSIONS.some(ext => filename.endsWith(`.${ext}`))) {
            return `https://www.viewstl.com/?embedded&url=${encodeURIComponent(url)}`;
        }
        return null;
    }
    create() {
        const viewerUrl = this.getViewerUrl();
        if (!viewerUrl) return null;
        const button = document.createElement('button');
        button.className = 'BetterFileViewerButton';
        button.setAttribute('aria-label', this.open ? 'Hide File Preview' : 'Show File Preview');
        button.setAttribute('type', 'button');
        button.innerHTML = this.open ? ICONS.hide : ICONS.show;
        button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        };
        this.addTooltip(button, this.open ? 'Hide File Preview' : 'Show File Preview');
        this.button = button;
        return button;
    }
    toggle() {
        this.open = !this.open;
        if (this.button) {
            this.button.innerHTML = this.open ? ICONS.hide : ICONS.show;
            this.button.setAttribute('aria-label', this.open ? 'Hide File Preview' : 'Show File Preview');
            this.updateTooltip(this.open ? 'Hide File Preview' : 'Show File Preview');
        }
        if (this.open) {
            this.showEmbed();
        } else {
            this.hideEmbed();
        }
    }
    showEmbed() {
        if (this.embed) return;
        const viewerUrl = this.getViewerUrl();
        if (!viewerUrl) return;
        this.embed = document.createElement('iframe');
        this.embed.className = 'BetterFileViewerEmbed';
        this.embed.src = viewerUrl;
        this.embed.width = '450';
        this.embed.height = '500';
        this.embed.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
        const fileContainer = this.button?.closest('[data-file-viewer-processed="true"]');
        if (fileContainer) {
            let insertTarget = fileContainer.parentElement;
            while (insertTarget?.parentElement) {
                const parent = insertTarget.parentElement;
                if (parent.id?.includes('message')) {
                    insertTarget = parent;
                    break;
                }
                if (insertTarget.parentElement === document.body) break;
                insertTarget = insertTarget.parentElement;
            }
            insertTarget.appendChild(this.embed);
        }
    }
    hideEmbed() {
        if (this.embed) {
            this.embed.remove();
            this.embed = null;
        }
    }
    addTooltip(element, text) {
        element.addEventListener('mouseenter', () => {
            this.tooltipNode = BdApi.UI.createTooltip(element, text, { style: 'primary', side: 'top' });
        });
        element.addEventListener('mouseleave', () => {
            if (this.tooltipNode) {
                this.tooltipNode.hide();
                this.tooltipNode = null;
            }
        });
    }
    updateTooltip(text) {
        if (this.button) {
            const newButton = this.button.cloneNode(true);
            newButton.onclick = this.button.onclick;
            this.button.parentNode?.replaceChild(newButton, this.button);
            this.button = newButton;
            this.addTooltip(this.button, text);
        }
    }
    destroy() {
        this.hideEmbed();
        if (this.button) {
            this.button.remove();
            this.button = null;
        }
        if (this.tooltipNode) {
            this.tooltipNode.hide();
            this.tooltipNode = null;
        }
    }
}
function getConfigWithCurrentValues(current, defaults = CONFIG.defaultConfig) {
    return defaults.map(opt => ({
        ...opt,
        value: current[opt.id] ?? opt.value
    }));
}
module.exports = class BetterFileViewer {
    constructor(meta) {
        this.meta = meta;
        this.updateManager = new UpdateManager(
            meta.name,
            meta.version,
            CONFIG.github
        );
        this.settings = this.getSettings();
        this.buttons = new Map();
    }
    getSettings() {
        return {
            ...CONFIG.defaultConfig.reduce((acc, cfg) => ({
                ...acc,
                [cfg.id]: cfg.value
            }), {}),
            ...BdApi.Data.load(this.meta.name, "settings")
        };
    }
    saveSettings(newSettings) {
        this.settings = {
            ...this.settings,
            ...newSettings
        };
        BdApi.Data.save(this.meta.name, "settings", this.settings);
        if (Object.hasOwn(newSettings, 'autoUpdate')) {
            if (newSettings.autoUpdate) {
                this.updateManager.start(true);
            } else {
                this.updateManager.stop();
            }
        }
    }
    start() {
        BdApi.DOM.addStyle(this.meta.name, CSS);
        this.updateManager.start(this.settings.autoUpdate);
        log("Plugin started");
    }
    stop() {
        BdApi.DOM.removeStyle(this.meta.name);
        this.updateManager.stop();
        for (const button of this.buttons.values()) {
            button.destroy();
        }
        this.buttons.clear();
        document.querySelectorAll('[data-file-viewer-processed]').forEach(el => {
            delete el.dataset.fileViewerProcessed;
        });
        log("Plugin stopped");
    }
    observer(changes) {
        for (const change of changes.addedNodes) {
            if (change.nodeType === Node.TEXT_NODE) continue;
            const cdnLinks = this.findCDNLinks(change);
            cdnLinks.forEach(link => this.processFileLink(link));
        }
        for (const change of changes.removedNodes) {
            if (change.nodeType === Node.TEXT_NODE) continue;
            const processed = change.querySelectorAll?.('[data-file-viewer-processed="true"]') || [];
            processed.forEach(el => {
                const button = this.buttons.get(el);
                if (button) {
                    button.destroy();
                    this.buttons.delete(el);
                }
            });
        }
    }
    findCDNLinks(element) {
        const links = [];
        if (element.nodeName === 'A' && element.href?.includes('/attachments/')) {
            links.push(element);
        }
        const found = element.querySelectorAll?.('a[href*="/attachments/"]') || [];
        links.push(...found);
        return links;
    }
    processFileLink(link) {
        let fileContainer = link.closest('div');
        let depth = 0;
        const maxDepth = 10;
        while (fileContainer && depth < maxDepth) {
            const hasFileStructure =
                fileContainer.querySelector('a[href*="/attachments/"]') &&
                (fileContainer.querySelector('[aria-label="Download"]') ||
                    fileContainer.querySelector('svg') ||
                    depth > 2);
            if (hasFileStructure) {
                break;
            }
            fileContainer = fileContainer.parentElement;
            depth++;
        }
        if (!fileContainer) return;
        if (Object.hasOwn(fileContainer.dataset, 'fileViewerProcessed')) return;
        const url = link.href;
        const filename = link.textContent || link.innerText || '';
        const isSupported = ALL_EXTENSIONS.some(ext =>
            filename.toLowerCase().endsWith(`.${ext}`) ||
            url.toLowerCase().includes(`.${ext}`)
        );
        if (!isSupported) return;
        fileContainer.dataset.fileViewerProcessed = 'true';
        let size = 0;
        const sizePattern = /(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)/i;
        const textNodes = fileContainer.querySelectorAll('*');
        for (const node of textNodes) {
            const text = node.textContent;
            if (text && sizePattern.test(text)) {
                const match = text.match(sizePattern);
                if (match) {
                    const [, num, unit] = match;
                    const multipliers = { B: 1, KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024 };
                    size = Number.parseFloat(num) * (multipliers[unit.toUpperCase()] || 0);
                    break;
                }
            }
        }
        const fileData = {
            url: url,
            filename: filename,
            size: size
        };
        const button = new BetterFileViewerButton(fileData);
        const buttonElement = button.create();
        if (!buttonElement) return;
        let buttonContainer = null;
        const downloadButton = fileContainer.querySelector('[aria-label="Download"]');
        if (downloadButton) {
            buttonContainer = downloadButton.parentElement;
        }
        if (!buttonContainer) {
            const svgs = fileContainer.querySelectorAll('svg');
            for (const svg of svgs) {
                const parent = svg.parentElement;
                if (parent?.parentElement) {
                    if (parent.tagName === 'A' || parent.tagName === 'BUTTON' ||
                        parent.getAttribute('role') === 'button') {
                        buttonContainer = parent.parentElement;
                        break;
                    }
                }
            }
        }
        if (!buttonContainer) {
            buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'inline-flex';
            buttonContainer.style.alignItems = 'center';
            buttonContainer.style.marginLeft = '8px';
            const fileInfo = link.parentElement?.parentElement;
            if (fileInfo) {
                fileInfo.appendChild(buttonContainer);
            } else {
                fileContainer.appendChild(buttonContainer);
            }
        }
        buttonContainer.appendChild(buttonElement);
        this.buttons.set(fileContainer, button);
        if (size > 10485760) {
            const warningElement = document.createElement('span');
            warningElement.className = 'BetterFileViewerWarning';
            warningElement.innerHTML = ICONS.warning;
            warningElement.title = 'Large file - preview might not work';
            warningElement.addEventListener('mouseenter', () => {
                BdApi.UI.createTooltip(
                    warningElement,
                    'This file is over 10MB! BetterFileViewer might not be able to preview this file.',
                    { style: 'danger', side: 'top' }
                );
            });
            buttonContainer.appendChild(warningElement);
        }
    }
    getSettingsPanel() {
        const config = getConfigWithCurrentValues(this.settings);
        config.push({
            type: "button",
            id: "checkUpdate",
            name: "Check for Updates",
            note: "Manually check for plugin updates",
            onClick: () => this.updateManager.check()
        });
        const panel = BdApi.UI.buildSettingsPanel({
            settings: config,
            onChange: (_, id, value) => this.saveSettings({ [id]: value })
        });
        requestAnimationFrame(() => {
            const checkBtn = document.querySelector("#checkUpdate .bd-button-content");
            if (checkBtn) checkBtn.textContent = "Check Now";
        });
        return panel;
    }
};
