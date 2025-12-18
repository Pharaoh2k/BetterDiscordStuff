/**
 * @name BetterTypingIndicator
 * @version 2.9.3
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/edit/main/Plugins/BetterTypingIndicator/BetterTypingIndicator.plugin.js
 * @authorId 874825550408089610
 * @description Shows an indicator in the channel list (w/tooltip) plus server/folder icons and home icon for DMs when someone is typing there.
 * @author Pharaoh2k
 */
/*
Copyright © 2024–2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
const PLUGIN_NAME = "BetterTypingIndicator";
const { Data, DOM, React, ReactDOM, UI, Webpack, Utils, Hooks } = BdApi;
const TYPES = { CHANNEL: 'channel', GUILD: 'guild', FOLDER: 'folder', HOME: 'home' };
const TYPING_EVENTS = ['TYPING_START', 'TYPING_STOP', 'MESSAGE_CREATE'];
const CONFIG = {
    github: "Pharaoh2k/BetterDiscordStuff",
    defaultConfig: [{
        type: "switch",
        id: "channelBetterTypingIndicator",
        name: "Channel Typing Indicator",
        note: "Show typing indicator on channels",
        value: true
    },
    {
        type: "switch",
        id: "includeMuted",
        name: "Include muted channels/guilds",
        note: "Show typing indicator for muted channels and guilds",
        value: false
    },
    {
        type: "switch",
        id: "includeBlocked",
        name: "Include blocked users",
        note: "Show indicator for blocked users",
        value: false
    },
    {
        type: "switch",
        id: "showCount",
        name: "Show Count",
        note: "Show the number of typing users as a badge (Channel Typing Indicator option must be enabled too)",
        value: false
    },
    {
        type: "color",
        id: "dotColor",
        name: "Dot Color",
        note: "Color of the typing indicator dots",
        value: "#FFFFFF"
    },
    {
        type: "color",
        id: "indicatorBackground",
        name: "Indicator Background",
        note: "Background color for indicators",
        value: "#18191c"
    },
    {
        type: "dropdown",
        id: "animationStyle",
        name: "Animation Style",
        note: "Choose animation style",
        value: "pulse",
        options: [{
            label: "Bounce",
            value: "bounce"
        }, {
            label: "Pulse",
            value: "pulse"
        }, {
            label: "Wave",
            value: "wave"
        }]
    },
    {
        type: "slider",
        id: "animationSpeed",
        name: "Animation Speed",
        note: "Adjust animation speed (seconds)",
        value: 1.4,
        min: 0.5,
        max: 3,
        step: 0.1
    },
    {
        type: "dropdown",
        id: "tooltipStyle",
        name: "Tooltip Style",
        note: "Choose how user information is displayed in tooltips",
        value: "both",
        options: [{
            label: "Show Names and Avatars",
            value: "both"
        },
        {
            label: "Show Names Only",
            value: "names"
        },
        {
            label: "Show Avatars Only",
            value: "avatars"
        },
        {
            label: "No Tooltips",
            value: "none"
        }
        ]
    },
    {
        type: "switch",
        id: "guildBetterTypingIndicator",
        name: "Guild Typing Indicator",
        note: "Show typing indicator on guild icons",
        value: true
    },
    {
        type: "switch",
        id: "folderBetterTypingIndicator",
        name: "Folder Typing Indicator",
        note: "Show typing indicator on folders",
        value: true
    },
    {
        type: "switch",
        id: "homeBetterTypingIndicator",
        name: "Home/DMs Typing Indicator",
        note: "Show typing indicator on Home icon when someone types a DM",
        value: true
    },
    {
        type: "switch",
        id: "showAvatarsInIndicator",
        name: "Show Avatars in Typing Indicator",
        note: "Display user avatars alongside typing dots",
        value: true
    },
    {
        type: "dropdown",
        id: "avatarStyle",
        name: "Avatar Style",
        note: "Choose how avatars are displayed",
        value: "circle",
        options: [{
            label: "Circle",
            value: "circle"
        },
        {
            label: "Square",
            value: "square"
        },
        {
            label: "Hexagon",
            value: "hexagon"
        }
        ]
    },
    {
        type: "slider",
        id: "avatarSize",
        name: "Avatar Size",
        note: "Size of avatars in typing indicator (pixels)",
        value: 24,
        min: 12,
        max: 24,
        markers: [12, 16, 20, 24],
        stickToMarkers: true
    },
    {
        type: "switch",
        id: "showAvatarStatus",
        name: "Show Status Indicator",
        note: "Display user's online status on their avatar",
        value: true
    },
    {
        type: "switch",
        id: "autoUpdate",
        name: "Automatic Updates",
        note: "Check for updates every 24 hours and on Discord startup (recommended)",
        value: true
    }
    ]
};
const DEFAULT_SETTINGS_MAP = CONFIG.defaultConfig.reduce((acc, cfg) => ({
    ...acc,
    [cfg.id]: cfg.value
}), {});
const mergeSettings = (...sources) => Object.assign({}, DEFAULT_SETTINGS_MAP, ...sources.filter(Boolean));
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
const getConfigWithCurrentValues = (current, defaults = CONFIG.defaultConfig) => {
    return defaults.map(opt => ({
        ...opt,
        value: current[opt.id] ?? opt.value
    }));
};
const Modules = {
    Dispatcher: Webpack.getByKeys("actionLogger"),
    TypingStore: Webpack.getStore("TypingStore"),
    UserStore: Webpack.getStore("UserStore"),
    RelationshipStore: Webpack.getStore("RelationshipStore"),
    ChannelStore: Webpack.getStore("ChannelStore"),
    MutedStore: Webpack.getStore("UserGuildSettingsStore"),
    FolderStore: Webpack.getStore("SortedGuildStore"),
    PresenceStore: Webpack.getStore("PresenceStore"),
    SelectedChannelStore: Webpack.getStore("SelectedChannelStore"),
    GuildChannelStore: Webpack.getStore("GuildChannelStore"),
};
const STYLES = `
.typing-indicator-dots, .guild-typing-dots, .folder-typing-dots, .home-typing-dots, .channel-typing-dots { transform: scale(0.8); }
.typing-indicator-svg, .guild-typing-svg, .folder-typing-svg, .home-typing-svg { opacity: 1; }
.typing-indicator-container { display: flex; align-items: center; justify-content: center; margin-left: 4px; position: relative !important; z-index: 100 !important; }
/* Keep pointers off the icons so clicks pass through; tooltips are reserved for channel indicators */
.guild-typing-container, .folder-typing-container, .home-typing-container { position: absolute !important; bottom: 1px !important; right: 2px !important; z-index: 9999999 !important; pointer-events: none !important; display: flex !important; align-items: center !important; justify-content: center !important; background: var(--indicator-background, #18191c) !important; border-radius: 10px !important; padding: 1px 1px !important; transform: scale(0.9) !important; min-width: 32px !important; min-height: 7px !important; width: auto !important; }
@keyframes typingBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes typingPulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.2); opacity: 1; } }
@keyframes typingWave { 0%, 100% { transform: translateY(0); } 25% { transform: translateY(-3px); } 75% { transform: translateY(3px); } }
[data-animation="bounce"] { animation: typingBounce var(--animation-duration, 1.4s) infinite ease-in-out; }
[data-animation="pulse"] { animation: typingPulse var(--animation-duration, 1.4s) infinite ease-in-out; }
[data-animation="wave"] { animation: typingWave var(--animation-duration, 1.4s) infinite ease-in-out; }
.typing-count-badge { background-color: black; color: white; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }
.bti-settings-panel { padding: 16px; }
.bti-settings-panel > * { margin-bottom: 20px; }
.bti-slider-container { display: flex; align-items: center; gap: 8px; }
.bti-slider-container span { color: white; }
.bti-select { background-color: var(--background-mod-subtle); border: none; color: var(--text-default); padding: 8px; border-radius: 4px; outline: none; }
.bti-color-picker input[type="color"] { -webkit-appearance: none; width: 50px; height: 30px; background: none; border: none; cursor: pointer; border-radius: 4px; }
.bti-tooltip-container { display: flex; flex-direction: column; }
.bti-tooltip-container.avatars-only { flex-direction: row; align-items: center; gap: 2px; }
.bti-user-row { display: flex; align-items: center; margin-bottom: 4px; font-size: 12px; }
.bti-user-avatar { width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; }
.bti-typing-text { margin-top: 4px; height: 20px; line-height: 10px; }
.bti-custom-tooltip { position: absolute; background-color: var(--tooltip-background, #2f3136) !important; color: var(--text-default, #dcddde) !important; white-space: nowrap; z-index: 1000; pointer-events: none; opacity: 0; transition: opacity 0.2s ease-in-out; max-width: 300px; word-wrap: break-word; transform: translateX(-50%) translateY(-100%); margin-bottom: 10px; line-height: 1.4; padding: 6px 8px; border-radius: 4px; }
.bti-custom-tooltip * { color: var(--text-default); font-family: var(--font-display); font-weight: 500; font-size: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); pointer-events: none; user-select: none !important; }
.bti-custom-tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-width: 5px; border-style: solid; border-color: var(--tooltip-background, #2f3136) transparent transparent transparent; }
.bti-custom-tooltip.visible { opacity: 1; }
.typing-avatar-container { transition: transform 0.2s ease; }
.typing-avatar-container:hover { transform: scale(1.1); z-index: 1; }
.typing-avatar-container + .typing-avatar-container { margin-left: -4px; }
.typing-status-dot { box-shadow: 0 0 0 2px var(--modal-background); }
.bti-tooltip-container img { border-radius: inherit !important; clip-path: inherit !important; }
/* Respect motion-sensitive users */
@media (prefers-reduced-motion: reduce) { [data-animation] { animation: none !important; } }
`;
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }
    render() {
        return this.state.hasError ? null : this.props.children;
    }
}
const Tooltip = ({
    id,
    children,
    position,
    backgroundColor
}) => {
    const tooltipRef = React.useRef(null);
    React.useEffect(() => {
        const el = tooltipRef.current;
        return () => {
            el?.remove();
        };
    }, []);
    React.useEffect(() => {
        if (tooltipRef.current && position) {
            tooltipRef.current.style.top = `${position.top}px`;
            tooltipRef.current.style.left = `${position.left}px`;
        }
    }, [position]);
    return ReactDOM.createPortal(
        React.createElement('div', {
            className: 'bti-custom-tooltip visible',
            ref: tooltipRef,
            'data-bti-tooltip': id,
            style: {
                '--tooltip-background': backgroundColor || 'var(--tooltip-background, #2f3136)'
            }
        }, children),
        document.body
    );
};
const getDefaultAvatarIndex = (user) => {
    if (!user.discriminator || user.discriminator === "0") {
        return Number(BigInt(user.id) >> 22n) % 6;
    }
    return Number(user.discriminator) % 5;
};
const getAvatarURL = (user, size = 32) => {
    if (user?.avatar) {
        const ext = user.avatar.startsWith("a_") ? "gif" : "webp";
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=${size}`;
    }
    return `https://cdn.discordapp.com/embed/avatars/${getDefaultAvatarIndex(user)}.png?size=${size}`;
};
const BetterTypingIndicatorComponent = React.memo((props) => {
    const {
        type,
        users,
        settings,
        tooltipId
    } = props;
    const [isHovered, setIsHovered] = React.useState(false);
    const [tooltipPosition, setTooltipPosition] = React.useState(null);
    const indicatorRef = React.useRef(null);
    const hideTimeout = React.useRef(null);
    const userCount = React.useMemo(() => Object.keys(users || {}).length, [users]);
    const tooltipText = React.useMemo(() => getTooltipText(users), [users]);
    const tooltipContent = React.useMemo(() => getTooltipContent(users, settings), [users, settings]);
    const createAvatarElement = (user) => {
        if (!settings.showAvatarsInIndicator) return null;
        const size = settings.avatarSize || 16;
        let borderRadius;
        if (settings.avatarStyle === "circle") {
            borderRadius = "50%";
        } else if (settings.avatarStyle === "square") {
            borderRadius = "4px";
        } else {
            borderRadius = undefined;
        }
        const avatarStyle = {
            width: `${size}px`,
            height: `${size}px`,
            objectFit: "cover",
            border: `2px solid ${settings.indicatorBackground}`,
            borderRadius: borderRadius,
            clipPath: settings.avatarStyle === "hexagon" ?
                "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)" :
                undefined
        };
        const userStatus = Modules.PresenceStore?.getStatus(user.id) || "offline";
        return React.createElement("div", {
            key: user.id,
            className: "typing-avatar-container",
            style: {
                position: "relative",
                marginRight: "4px"
            }
        },
            [
                React.createElement("img", {
                    src: getAvatarURL(user, size),
                    alt: `${user.globalName || user.username}'s avatar`,
                    style: avatarStyle
                }),
                settings.showAvatarStatus && React.createElement("div", {
                    className: "typing-status-dot",
                    style: {
                        position: "absolute",
                        bottom: "-2px",
                        right: "-2px",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        border: `2px solid ${settings.indicatorBackground}`,
                        backgroundColor: getStatusColor(userStatus)
                    }
                })
            ]
        );
    };
    const getStatusColor = (status) => {
        const statusColors = {
            online: '#43b581',
            idle: '#faa61a',
            dnd: '#f04747',
            offline: '#747f8d',
            streaming: '#593695',
            invisible: '#747f8d'
        };
        return statusColors[status] || statusColors.offline;
    };
    let indicatorElement;
    if (settings.showCount && userCount > 0) {
        indicatorElement = React.createElement('div', {
            className: 'typing-count-badge',
            style: {
                backgroundColor: settings.indicatorBackground,
                color: settings.dotColor
            }
        }, userCount);
    } else {
        const containerContent = [];
        if (settings.showAvatarsInIndicator && type === TYPES.CHANNEL) {
            containerContent.push(
                React.createElement('div', {
                    key: 'avatars',
                    className: 'typing-avatars-container',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '4px'
                    }
                },
                    Object.values(users || {}).map(user => createAvatarElement(user))
                )
            );
        }
        containerContent.push(
            React.createElement('div', {
                key: 'dots',
                className: `${type}-typing-dots`,
                style: {
                    '--indicator-background': settings.indicatorBackground
                }
            },
                React.createElement('svg', {
                    width: 24.5,
                    height: 7,
                    className: `${type}-typing-svg`,
                    style: {
                        marginRight: '0px'
                    }
                },
                    [3.5, 12.25, 19].map((cx, i) => {
                        let animationName;
                        if (settings.animationStyle === 'bounce') {
                            animationName = 'typingBounce';
                        } else if (settings.animationStyle === 'pulse') {
                            animationName = 'typingPulse';
                        } else if (settings.animationStyle === 'wave') {
                            animationName = 'typingWave';
                        } else {
                            animationName = 'none';
                        }
                        return React.createElement('circle', {
                            key: `dot-${cx}`,
                            cx: cx,
                            cy: "3.5",
                            r: "3.5",
                            fill: settings.dotColor,
                            'data-animation': settings.animationStyle,
                            style: {
                                animationDuration: `${settings.animationSpeed}s`,
                                animationDelay: `${i * 0.2}s`,
                                animationName: animationName,
                                animationIterationCount: 'infinite',
                                animationTimingFunction: 'ease-in-out'
                            }
                        });
                    })
                )
            )
        );
        indicatorElement = React.createElement('div', {
            style: {
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
            }
        }, containerContent);
    }
    const handleMouseEnter = React.useCallback(() => {
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
            hideTimeout.current = null;
        }
        if (indicatorRef.current) {
            const rect = indicatorRef.current.getBoundingClientRect();
            setTooltipPosition({
                top: rect.top - 10,
                left: rect.left + rect.width / 2
            });
        }
        setIsHovered(true);
    }, []);
    const mountedRef = React.useRef(true);
    React.useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const handleMouseLeave = React.useCallback(() => {
        hideTimeout.current = setTimeout(() => {
            if (mountedRef.current) {
                setIsHovered(false);
                setTooltipPosition(null);
            }
        }, 100);
    }, []);
    React.useEffect(() => {
        return () => {
            if (hideTimeout.current) {
                clearTimeout(hideTimeout.current);
                setIsHovered(false);
                setTooltipPosition(null);
            }
        };
    }, []);
    const containerStyle = {
        backgroundColor: type === TYPES.CHANNEL ? 'transparent' : settings.indicatorBackground,
        color: settings.dotColor,
        position: 'relative',
        cursor: 'pointer'
    };
    return React.createElement('div', {
        className: `${type}-typing-container`,
        style: containerStyle,
        'aria-label': tooltipText,
        onMouseEnter: (type === TYPES.CHANNEL && settings.tooltipStyle !== 'none') ? handleMouseEnter : null,
        onMouseLeave: (type === TYPES.CHANNEL && settings.tooltipStyle !== 'none') ? handleMouseLeave : null,
        ref: indicatorRef
    }, indicatorElement,
        (type === TYPES.CHANNEL) && isHovered && tooltipPosition && settings.tooltipStyle !== 'none' ?
            React.createElement(Tooltip, {
                id: tooltipId,
                position: tooltipPosition,
                backgroundColor: settings.indicatorBackground
            }, tooltipContent) :
            null
    );
});
const useMergedSettings = (baseSettings) => {
    const storedSettings = Hooks?.useData ? Hooks.useData(PLUGIN_NAME, "settings") : null;
    return React.useMemo(() => mergeSettings(baseSettings, storedSettings), [baseSettings, storedSettings]);
};
const BetterTypingIndicatorWrapper = ({
    type,
    targetId,
    settings,
    users,
    tooltipId
}) => {
    const mergedSettings = useMergedSettings(settings);
    const channelUsers = (type === TYPES.CHANNEL && Hooks?.useStateFromStores)
        ? Hooks.useStateFromStores(
            [Modules.TypingStore, Modules.UserStore, Modules.RelationshipStore],
            () => {
                const current = Modules.TypingStore.getTypingUsers(targetId);
                return filterTypingUsers(current, mergedSettings, Modules);
            },
            [targetId, mergedSettings.includeBlocked]
        )
        : null;
    const effectiveUsers = type === TYPES.CHANNEL
        ? (channelUsers ?? users)
        : users;
    if (!effectiveUsers) return null;
    return React.createElement(BetterTypingIndicatorComponent, {
        type,
        users: effectiveUsers,
        settings: mergedSettings,
        tooltipId
    });
};
const getTooltipContent = (users, settings) => {
    if (!users || !Object.keys(users).length) {
        return React.createElement('div', null, 'Someone is typing...');
    }
    if (settings.tooltipStyle === 'none') return null;
    if (settings.tooltipStyle === "avatars") {
        const size = settings.avatarSize || 24;
        let radius;
        if (settings.avatarStyle === "circle") {
            radius = "50%";
        } else if (settings.avatarStyle === "square") {
            radius = "4px";
        } else {
            radius = undefined;
        }
        return React.createElement(
            "div", {
            className: "bti-tooltip-container avatars-only"
        },
            [
                React.createElement(
                    "div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "2px"
                    }
                },
                    Object.values(users).map(user =>
                        React.createElement("img", {
                            key: user.id,
                            src: getAvatarURL(user, size),
                            alt: `${user.globalName || user.username}'s avatar`,
                            style: {
                                width: `${size}px`,
                                height: `${size}px`,
                                objectFit: "cover",
                                borderRadius: radius,
                                clipPath: settings.avatarStyle === "hexagon" ?
                                    "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)" :
                                    undefined
                            }
                        })
                    )
                ),
                React.createElement(
                    "span", {
                    style: {
                        marginLeft: "2px",
                        whiteSpace: "nowrap"
                    }
                },
                    Object.keys(users).length > 1 ? "are typing…" : "is typing…"
                )
            ]
        );
    }
    const singleUserTypingText = Object.keys(users).length === 1 ? ' is typing...' : null;
    return React.createElement('div', {
        className: 'bti-tooltip-container'
    },
        Object.values(users).map(user =>
            React.createElement('div', {
                className: 'bti-user-row',
                key: user.id,
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }
            },
                settings.tooltipStyle === 'both' ?
                    React.createElement('img', {
                        className: 'bti-user-avatar',
                        src: getAvatarURL(user, 24),
                        alt: `${user.globalName || user.username}'s avatar`,
                        style: {
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%'
                        }
                    }) :
                    null,
                (settings.tooltipStyle === 'both' || settings.tooltipStyle === 'names') ?
                    React.createElement('span', null,
                        user.globalName || user.username,
                        singleUserTypingText
                    ) :
                    null
            )
        ),
        (settings.tooltipStyle === 'both' || settings.tooltipStyle === 'names') &&
            Object.keys(users).length > 1 ?
            React.createElement('div', {
                className: 'bti-typing-text',
                style: {
                    marginTop: '4px'
                }
            }, ' are typing...') :
            null
    );
};
const SettingsPanel = React.memo(({
    settings,
    onChange,
    modules
}) => {
    const {
        FormItem,
        FormSwitch,
        ColorPicker
    } = modules;
    if (!FormItem || !FormSwitch) return null;
    const components = {
        switch: ({
            id,
            name,
            note
        }) => {
            const [isEnabled, setIsEnabled] = React.useState(settings[id]);
            return React.createElement(FormSwitch, {
                value: isEnabled,
                checked: isEnabled,
                note: note,
                children: name,
                onChange: val => {
                    setIsEnabled(val);
                    onChange({
                        [id]: val
                    });
                }
            });
        },
        color: ({
            id,
            name,
            note
        }) => {
            const [colorValue, setColorValue] = React.useState(settings[id] || '#ffffff');
            if (!ColorPicker) {
                return React.createElement(FormItem, {
                    title: name,
                    note: note,
                    children: React.createElement('input', {
                        type: 'color',
                        value: colorValue,
                        onChange: e => {
                            const newColor = e.target.value;
                            setColorValue(newColor);
                            onChange({
                                [id]: newColor
                            });
                        }
                    })
                });
            }
            return React.createElement(FormItem, {
                title: name,
                note: note,
                children: React.createElement(ColorPicker, {
                    color: Number.parseInt(colorValue.replace('#', ''), 16),
                    onChange: color => {
                        const hex = '#' + color.toString(16).padStart(6, '0');
                        setColorValue(hex);
                        onChange({
                            [id]: hex
                        });
                    },
                    suggestedColors: [],
                    disabled: false,
                    showEyeDropper: true
                })
            });
        },
        dropdown: ({
            id,
            name,
            note,
            options
        }) => {
            const [selectedValue, setSelectedValue] = React.useState(settings[id]);
            return React.createElement(FormItem, {
                title: name,
                note: note,
                children: React.createElement('select', {
                    value: selectedValue,
                    onChange: e => {
                        const newValue = e.target.value;
                        setSelectedValue(newValue);
                        onChange({
                            [id]: newValue
                        });
                    },
                    className: 'bti-select'
                }, options.map(opt =>
                    React.createElement('option', {
                        key: opt.value,
                        value: opt.value
                    }, opt.label)
                ))
            });
        },
        slider: ({
            id,
            name,
            note,
            min,
            max
        }) => {
            const [sliderValue, setSliderValue] = React.useState(settings[id]);
            return React.createElement(FormItem, {
                title: name,
                note: note,
                children: React.createElement('div', {
                    className: 'bti-slider-container'
                },
                    [
                        React.createElement('input', {
                            type: 'range',
                            min: min,
                            max: max,
                            step: 0.1,
                            value: sliderValue,
                            onChange: e => {
                                const newValue = Number.parseFloat(e.target.value);
                                setSliderValue(newValue);
                                onChange({
                                    [id]: newValue
                                });
                            }
                        }),
                        React.createElement('span', null, sliderValue)
                    ]
                )
            });
        }
    };
    return React.createElement('div', {
        className: 'bti-settings-panel'
    },
        CONFIG.defaultConfig.map(cfg =>
            React.createElement('div', {
                key: cfg.id
            },
                components[cfg.type]?.(cfg)
            )
        )
    );
});
const SettingsPanelContainer = ({
    plugin,
    modules
}) => {
    const settingsFromData = Hooks?.useData ? Hooks.useData(PLUGIN_NAME, "settings") : null;
    const mergedSettings = React.useMemo(
        () => mergeSettings(plugin?.settings, settingsFromData),
        [plugin, settingsFromData]
    );
    const handleChange = React.useCallback(patch => plugin.saveSettings(patch), [plugin]);
    return React.createElement(SettingsPanel, {
        settings: mergedSettings,
        onChange: handleChange,
        modules
    });
};
const getTooltipText = (users) => {
    if (!users || !Object.keys(users).length) return 'Someone is typing...';
    const names = Object.values(users).map(u => u.globalName || u.username).filter(Boolean);
    if (names.length === 1) return `${names[0]} is typing...`;
    if (names.length === 2) return `${names.join(' and ')} are typing...`;
    if (names.length === 3) return `${names[0]}, ${names[1]}, and ${names[2]} are typing...`;
    return `${names.length} people are typing...`;
};
const filterTypingUsers = (users, settings, modules) => {
    try {
        const currentUser = modules.UserStore.getCurrentUser();
        return Object.entries(users || {})
            .filter(([id]) => {
                if (!currentUser) return false;
                if (id === currentUser.id) return false;
                if (!settings.includeBlocked && modules.RelationshipStore.isBlocked(id)) return false;
                return true;
            })
            .reduce((acc, [id]) => {
                const user = modules.UserStore.getUser(id);
                if (user) acc[id] = user;
                return acc;
            }, {});
    } catch (error) {
        console.error('Error filtering typing users:', error);
        return {};
    }
};
const isChannelMuted = (guildId, channelId) => {
    const M = Modules.MutedStore;
    try {
        if (typeof M?.isChannelMuted === 'function') {
            return M.isChannelMuted.length >= 2
                ? M.isChannelMuted(guildId, channelId)
                : M.isChannelMuted(channelId);
        }
    } catch { }
    return false;
};
class BetterTypingIndicator {
    constructor(meta) {
        this.meta = meta;
        this.typingState = new Map();
        this._roots = new Map();
        this.settings = this.getSettings();
        this.handleTyping = this.handleTyping.bind(this);
        this.cachedModules = {
            FormItem: null,
            FormSwitch: null,
            ColorPicker: null
        };
        this._debouncedReload = (Utils && typeof Utils.debounce === "function")
            ? Utils.debounce(() => this.reload(), 300)
            : () => this.reload();
        this._elCache = new Map();
        this._warnedSelectorMiss = new Set();
        this._didValidateModules = false;
        this.updateManager = new UpdateManager(
            meta.name,
            meta.version,
            CONFIG.github
        );
    }
    _ensureDomAdapter() {
        if (!this._elCache) this._elCache = new Map();
        if (!this._warnedSelectorMiss) this._warnedSelectorMiss = new Set();
    }
    getListItemElement(type, targetId) {
        this._ensureDomAdapter();
        const key = type + ":" + targetId;
        let el = this._elCache.get(key);
        if (el && document.contains(el)) return el;
        let selector;
        if (type === TYPES.CHANNEL) {
            selector = `[data-list-item-id="channels___${targetId}"]`;
        } else if (type === TYPES.HOME) {
            selector = `[data-list-item-id="${targetId}"]`;
        } else {
            selector = `[data-list-item-id="guildsnav___${targetId}"]`;
        }
        try {
            el = document.querySelector(selector);
            if (!el) {
                const nodes = document.querySelectorAll('[data-list-item-id]');
                for (const node of nodes) {
                    const id = node.dataset.listItemId || '';
                    if (id === `channels___${targetId}` ||
                        id === `guildsnav___${targetId}` ||
                        id === String(targetId)) {
                        el = node;
                        break;
                    }
                }
            }
        } catch (e) {
            console.debug('[BetterTypingIndicator] Selector error:', e.message);
        }
        if (el) {
            this._elCache.set(key, el);
        } else if (!this._warnedSelectorMiss.has(key)) {
            console.warn('[BetterTypingIndicator] Could not locate list item for', type, targetId);
            this._warnedSelectorMiss.add(key);
        }
        return el;
    }
    getIndicatorMountContainer(listItemEl) {
        if (!listItemEl) return null;
        return listItemEl.querySelector('div[class*="children"]') ||
            listItemEl.querySelector('div[class*="content"]') ||
            listItemEl;
    }
    gcElementCache() {
        if (!this._elCache) return;
        for (const [key, el] of this._elCache) {
            if (!el || !document.contains(el)) {
                this._elCache.delete(key);
            }
        }
    }
    validateModulesOnce() {
        if (this._didValidateModules) return;
        this._didValidateModules = true;
        try {
            const missing = [];
            for (const k in Modules) {
                if (!Modules[k]) missing.push(k);
            }
            if (missing.length) {
                console.warn('[BetterTypingIndicator] Some modules are missing or changed:', missing.join(', '));
            }
        } catch (e) {
            console.debug('[BetterTypingIndicator] Error validating modules:', e.message);
        }
    }
    getSettings() {
        return {
            ...DEFAULT_SETTINGS_MAP,
            ...Data.load(this.meta.name, "settings")
        };
    }
    saveSettings(newSettings) {
        this.settings = {
            ...this.settings,
            ...newSettings
        };
        Data.save(this.meta.name, "settings", this.settings);
        if (Object.hasOwn(newSettings, 'autoUpdate')) {
            if (newSettings.autoUpdate) {
                this.updateManager.start(true);
            } else {
                this.updateManager.stop();
            }
        }
        const visualKeys = new Set([
            'dotColor', 'indicatorBackground', 'animationStyle', 'animationSpeed',
            'showAvatarsInIndicator', 'avatarStyle', 'avatarSize', 'showAvatarStatus',
            'showCount', 'tooltipStyle'
        ]);
        const visualSettingsChanged = Object.keys(newSettings).some(key => visualKeys.has(key));
        if (visualSettingsChanged) {
            this._debouncedReload();
        }
    }
    async start() {
        console.log("BetterTypingIndicator Plugin started");
        DOM.addStyle('typing-indicator-css', STYLES);
        DOM.addStyle('bti-settings-text',
            `.bti-settings-panel, .bti-settings-panel *{
            color:var(--text-default,#dcddde)!important;
        }
        .bti-settings-panel h1, .bti-settings-panel h2, .bti-settings-panel h3{
            color:var(--mobile-text-heading-primary,#ffffff)!important;
        }`
        );
        this.initializeSettingsModules();
        this.validateModulesOnce();
        this._roots = this._roots || new Map();
        await this.updateManager.start(this.settings.autoUpdate);
        for (const e of TYPING_EVENTS) {
            Modules.Dispatcher.subscribe(e, this.handleTyping);
        }
    }
    stop() {
        DOM.removeStyle('typing-indicator-css');
        DOM.removeStyle('bti-settings-text');
        this.updateManager.stop();
        this.cleanup();
    }
    reload() {
        this.stop();
        this.start();
    }
    initializeSettingsModules() {
        const formItems = Webpack.getByKeys("FormItem");
        const formSwitches = Webpack.getByKeys("FormSwitch");
        this.cachedModules.FormItem = formItems?.FormItem;
        this.cachedModules.FormSwitch = formSwitches?.FormSwitch;
        this.cachedModules.ColorPicker = Webpack.getModule(m => m?.toString?.().includes('ColorPicker'));
    }
    handleTyping(event) {
        if (event.type === 'MESSAGE_CREATE') {
            this.processTypingEvent({
                type: 'TYPING_STOP',
                channelId: event.message.channel_id,
                userId: event.message.author.id
            });
        } else {
            this.processTypingEvent(event);
        }
    }
    processTypingEvent(event) {
        try {
            if (!event?.channelId || !event?.userId) return;
            const channel = Modules.ChannelStore.getChannel(event.channelId);
            if (!channel) return;
            const isMutedChannel = !this.settings.includeMuted &&
                (
                    Modules.MutedStore.isMuted(channel.guild_id) ||
                    isChannelMuted(channel.guild_id, channel.id)
                );
            if (channel.parent_id) {
                const parentChannel = Modules.ChannelStore.getChannel(channel.parent_id);
                if (parentChannel?.type === 15) {
                    if (isMutedChannel) return;
                    this.applyTypingForTypes(parentChannel, event);
                }
            }
            if (isMutedChannel) return;
            this.applyTypingForTypes(channel, event);
        } catch (error) {
            console.error('Error processing typing event:', error);
        }
    }
    applyTypingForTypes(channel, event) {
        for (const type of Object.values(TYPES)) {
            if (!this.settings[`${type}BetterTypingIndicator`]) continue;
            const targetId = this.getTargetId(type, channel);
            if (!targetId) continue;
            if (event.type === 'TYPING_START') {
                this.addTyping(type, targetId, event.userId);
            } else {
                this.removeTyping(type, targetId, event.userId);
            }
            requestAnimationFrame(() => this.updateIndicator(type, targetId));
        }
    }
    getTargetId(type, channel) {
        switch (type) {
            case TYPES.CHANNEL:
                return channel.id;
            case TYPES.GUILD:
                return channel.guild_id;
            case TYPES.FOLDER: {
                if (!channel.guild_id) return null;
                const folder = Modules.FolderStore.getGuildFolders()
                    .find(f => f.guildIds.includes(channel.guild_id));
                return folder?.folderId || folder?.id;
            }
            case TYPES.HOME:
                return (channel.type === 1 || channel.type === 3) ? 'guildsnav___home' : null;
            default:
                return null;
        }
    }
    addTyping(type, targetId, userId) {
        if (type === TYPES.CHANNEL) return;
        if (!this.typingState.has(type)) {
            this.typingState.set(type, new Map());
        }
        const typeState = this.typingState.get(type);
        if (!typeState.has(targetId)) {
            typeState.set(targetId, new Set());
        }
        typeState.get(targetId).add(userId);
    }
    removeTyping(type, targetId, userId) {
        if (type === TYPES.CHANNEL) return;
        const typeState = this.typingState.get(type);
        if (!typeState) return;
        const targetSet = typeState.get(targetId);
        if (!targetSet) return;
        targetSet.delete(userId);
        if (targetSet.size === 0) {
            typeState.delete(targetId);
        }
    }
    hasTyping(type, targetId) {
        if (type === TYPES.CHANNEL) {
            const users = Modules.TypingStore.getTypingUsers(targetId);
            return !!users && Object.keys(users).length > 0;
        }
        return (this.typingState.get(type)?.get(targetId)?.size || 0) > 0;
    }
    getTypingUsersFor(type, targetId) {
        if (type === TYPES.CHANNEL) {
            return Modules.TypingStore.getTypingUsers(targetId);
        }
        const ids = this.typingState.get(type)?.get(targetId);
        if (!ids || ids.size === 0) return {};
        const result = {};
        for (const id of ids) {
            const user = Modules.UserStore.getUser(id);
            if (user) result[id] = user;
        }
        return result;
    }
    renderOrCleanupIndicator(type, targetId, containerEl) {
        const rootKey = `${type}:${targetId}`;
        const hasTyping = this.hasTyping(type, targetId);
        if (!hasTyping) {
            const root = this._roots.get(rootKey);
            if (root) {
                root.unmount();
                this._roots.delete(rootKey);
            }
            for (const el of containerEl.querySelectorAll(`.${type}-typing-container`)) {
                el.remove();
            }
            return;
        }
        let indicator = containerEl.querySelector(`.${type}-typing-container`);
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = `${type}-typing-container typing-indicator-container`;
            indicator.style.setProperty('--indicator-background', this.settings.indicatorBackground);
            if (!containerEl.style.position) {
                containerEl.style.position = 'relative';
            }
            containerEl.appendChild(indicator);
        }
        let root = this._roots.get(rootKey);
        if (!root) {
            root = ReactDOM.createRoot(indicator);
            this._roots.set(rootKey, root);
        }
        const users = this.getTypingUsersFor(type, targetId);
        const filteredUsers = filterTypingUsers(users, this.settings, Modules);
        root.render(
            React.createElement(ErrorBoundary, null,
                React.createElement(BetterTypingIndicatorWrapper, {
                    type,
                    targetId,
                    users: filteredUsers,
                    settings: this.settings,
                    tooltipId: rootKey
                })
            )
        );
    }
    updateIndicator(type, targetId) {
        if (type === TYPES.CHANNEL) {
            const channelElement = document.querySelector(`[data-list-item-id="channels___${targetId}"]`);
            if (!channelElement) return;
            const container = channelElement.querySelector('div[class*="children"]') ||
                channelElement.querySelector('div[class*="content"]') ||
                channelElement;
            this.renderOrCleanupIndicator(type, targetId, container);
        } else if (type === TYPES.HOME) {
            const homeElement = document.querySelector(`[data-list-item-id="${targetId}"]`);
            if (!homeElement) return;
            this.renderOrCleanupIndicator(type, targetId, homeElement);
        } else {
            const guildElement = document.querySelector(`[data-list-item-id="guildsnav___${targetId}"]`);
            if (!guildElement) return;
            this.renderOrCleanupIndicator(type, targetId, guildElement);
        }
    }
    observer(arg) {
        if (!this._roots) return;
        const mutations = Array.isArray(arg) ? arg : [arg];
        for (const m of mutations) {
            const addedNodes = m?.addedNodes || [];
            for (const node of addedNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) continue;
                this._processNodeForIndicators(node);
            }
        }
    }
    _processNodeForIndicators(node) {
        const channelAttr = node.getAttribute?.('data-list-item-id');
        const isSelfChannel = channelAttr?.startsWith('channels___');
        const channelItems = isSelfChannel ? [node] : (node.querySelectorAll?.('[data-list-item-id^="channels___"]') || []);
        for (const item of channelItems) {
            const channelId = item.dataset.listItemId.replace('channels___', '');
            if (channelId) this.updateIndicator(TYPES.CHANNEL, channelId);
        }
        const isSelfGuild = channelAttr?.startsWith('guildsnav___');
        const guildItems = isSelfGuild ? [node] : (node.querySelectorAll?.('[data-list-item-id^="guildsnav___"]') || []);
        for (const item of guildItems) {
            const guildId = item.dataset.listItemId.replace('guildsnav___', '');
            if (guildId) {
                this.updateIndicator(TYPES.GUILD, guildId);
                this.updateIndicator(TYPES.FOLDER, guildId);
            }
        }
    }
    cleanup() {
        for (const e of TYPING_EVENTS) {
            Modules.Dispatcher.unsubscribe(e, this.handleTyping);
        }
        this.typingState.clear();
        if (this._roots) {
            for (const root of this._roots.values()) {
                try {
                    root.unmount();
                } catch (err) {
                    console.error('Error unmounting React root:', err);
                }
            }
            this._roots.clear();
        }
        for (const className of ['typing-indicator-container', 'bti-custom-tooltip']) {
            for (const el of document.querySelectorAll(`.${className}`)) {
                el.remove();
            }
        }
    }
    getSettingsPanel() {
        if (typeof UI.buildSettingsPanel === "function") {
            return UI.buildSettingsPanel({
                settings: getConfigWithCurrentValues({
                    ...DEFAULT_SETTINGS_MAP,
                    ...this.settings
                }),
                onChange: (_, id, value) => this.saveSettings({
                    [id]: value
                })
            });
        }
        return React.createElement(SettingsPanelContainer, {
            plugin: this,
            modules: this.cachedModules
        });
    }
}
module.exports = BetterTypingIndicator;
