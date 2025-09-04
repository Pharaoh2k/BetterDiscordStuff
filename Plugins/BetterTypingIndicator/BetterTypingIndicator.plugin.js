/**
 * @name BetterTypingIndicator
 * @version 2.8.2
 * @website https://x.com/_Pharaoh2k
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/edit/main/Plugins/BetterTypingIndicator.plugin.js
 * @authorId 874825550408089610
 * @description Shows an indicator in the channel list (w/tooltip) plus server/folder icons and home icon for DMs when someone is typing there.
 * @author Pharaoh2k
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
Copyright © 2024–2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.
*/
const { Data, DOM, React, ReactDOM, UI, Webpack, Utils } = BdApi;
const TYPES = { CHANNEL: 'channel', GUILD: 'guild', FOLDER: 'folder', HOME: 'home' };
const TYPING_EVENTS = ['TYPING_START', 'TYPING_STOP', 'MESSAGE_CREATE'];
const CONFIG = {
    info: {
        name: "BetterTypingIndicator",
        authors: [{
            name: "Pharaoh2k",
            github_username: "Pharaoh2k",
            twitter_username: "_Pharaoh2k",
            discord_id: "874825550408089610"
        }],
        version: "2.8.2",
        description: "Shows an indicator in the channel list (w/tooltip) plus server/folder icons and home icon for DMs when someone is typing there."
    },
    defaultConfig: [{
        type: "switch",
        id: "channelTypingIndicator",
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
        max: 3.0,
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
        id: "guildTypingIndicator",
        name: "Guild Typing Indicator",
        note: "Show typing indicator on guild icons",
        value: true
    },
    {
        type: "switch",
        id: "folderTypingIndicator",
        name: "Folder Typing Indicator",
        note: "Show typing indicator on folders",
        value: true
    },
    {
        type: "switch",
        id: "homeTypingIndicator",
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
        this.notice = null;
    }
    async start(autoUpdate = true) {
        if (autoUpdate) {
            this.check(true);
            this.timer = setInterval(() => this.check(true), 24 * 60 * 60 * 1000);
        }
        this.showChangelog();
    }
    stop() {
        clearInterval(this.timer);
        this.notice?.();
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
            if (!silent) BdApi.UI.showToast(`[${this.name}] Update check failed`, { type: 'error' });
        }
    }
    showUpdateNotice(version, text) {
        this.notice?.();
        this.notice = BdApi.UI.showNotice(
            `${this.name} v${version} is available`,
            {
                type: 'info',
                buttons: [{
                    label: 'Update',
                    onClick: (close) => {
                        close();
                        this.applyUpdate(text, version);
                    }
                }, {
                    label: 'Dismiss',
                    onClick: (close) => close()
                }]
            }
        );
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
        } catch {
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
            const md = await res.text();
            const changes = this.parseChangelog(md, last, this.version);
            if (changes.length === 0) return;
            BdApi.UI.showChangelogModal({
                title: this.name,
                subtitle: `Version ${this.version}`,
                changes
            });
        } catch {}
    }
    async showFullChangelog() {
        try {
            const res = await BdApi.Net.fetch(this.urls.changelog);
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
            const ver = line.match(/^###?\s+([\d.]+)/)?.[1];
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
                if (lower.includes('fix')) grouped.fixed.push(item);
                else if (lower.includes('add') || lower.includes('new')) grouped.added.push(item);
                else if (lower.includes('improv') || lower.includes('updat')) grouped.improved.push(item);
                else grouped.other.push(item);
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
function getConfigWithCurrentValues(current, defaults = CONFIG.defaultConfig) {
    return defaults.map(opt => ({
        ...opt,
        value: current[opt.id] ?? opt.value
    }));
}
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
.typing-indicator-dots, .guild-typing-dots, .folder-typing-dots, .home-typing-dots,
.channel-typing-dots { transform: scale(0.8); }
.typing-indicator-svg, .guild-typing-svg, .folder-typing-svg, .home-typing-svg { opacity: 1; }
.typing-indicator-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    position: relative !important;
    z-index: 100 !important;
}
/* Keep pointers off the icons so clicks pass through; tooltips are reserved for channel indicators */
.guild-typing-container, .folder-typing-container, .home-typing-container {
    position: absolute !important;
    bottom: 1px !important;
    right: 2px !important;
    z-index: 9999999 !important;
    pointer-events: none !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: var(--indicator-background, #18191c) !important;
    border-radius: 10px !important;
    padding: 1px 1px !important;
    transform: scale(0.9) !important;
    min-width: 32px !important;
    min-height: 7px !important;
    width: auto !important;
}
@keyframes typingBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
}
@keyframes typingPulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.2); opacity: 1; }
}
@keyframes typingWave {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-3px); }
    75% { transform: translateY(3px); }
}
[data-animation="bounce"] { animation: typingBounce var(--animation-duration, 1.4s) infinite ease-in-out; }
[data-animation="pulse"] { animation: typingPulse var(--animation-duration, 1.4s) infinite ease-in-out; }
[data-animation="wave"] { animation: typingWave var(--animation-duration, 1.4s) infinite ease-in-out; }
.typing-count-badge {
    background-color: var(--brand-experiment);
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}
.bti-settings-panel { padding: 16px; }
.bti-settings-panel > * { margin-bottom: 20px; }
.bti-slider-container { display: flex; align-items: center; gap: 8px; }
.bti-slider-container span { color: white; }
.bti-select {
    background-color: var(--background-secondary);
    border: none;
    color: var(--text-normal);
    padding: 8px;
    border-radius: 4px;
    outline: none;
}
.bti-color-picker input[type="color"] {
    -webkit-appearance: none;
    width: 50px;
    height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}
.bti-tooltip-container {
    display: flex;
    flex-direction: column;
}
.bti-tooltip-container.avatars-only {
    flex-direction: row;
    align-items: center;
    gap: 2px;
}
.bti-user-row {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    font-size: 12px;
}
.bti-user-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
}
.bti-typing-text {
    margin-top: 4px;
    height: 20px;
    line-height: 10px;
}
.bti-custom-tooltip {
    position: absolute;
    background-color: var(--tooltip-background, #2f3136) !important;
    color: var(--text-normal, #dcddde) !important;
    white-space: nowrap;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    max-width: 300px;
    word-wrap: break-word;
    transform: translateX(-50%) translateY(-100%);
    margin-bottom: 10px;
    line-height: 1.4;
    padding: 6px 8px;
    border-radius: 4px;
}
.bti-custom-tooltip * {
    color: var(--text-normal);
    font-family: var(--font-display);
    font-weight: 500;
    font-size: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    pointer-events: none;
    user-select: none !important;
}
.bti-custom-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: var(--tooltip-background, #2f3136) transparent transparent transparent;
}
.bti-custom-tooltip.visible { 
    opacity: 1; 
}
.typing-avatar-container {
    transition: transform 0.2s ease;
}
.typing-avatar-container:hover {
    transform: scale(1.1);
    z-index: 1;
}
.typing-avatar-container + .typing-avatar-container {
    margin-left: -4px;
}
.typing-status-dot {
    box-shadow: 0 0 0 2px var(--background-primary);
}
.bti-tooltip-container img {
    border-radius: inherit !important;
    clip-path: inherit !important;
}
/* Respect motion-sensitive users */
@media (prefers-reduced-motion: reduce) {
  [data-animation] { animation: none !important; }
}
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
            el?.parentNode?.removeChild(el);
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
function getDefaultAvatarIndex(user) {
    if (!user.discriminator || user.discriminator === "0") {
        return Number(BigInt(user.id) >> 22n) % 6;
    }
    return Number(user.discriminator) % 5;
}
function getAvatarURL(user, size = 32) {
    if (user?.avatar) {
        const ext = user.avatar.startsWith("a_") ? "gif" : "webp";
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=${size}`;
    }
    return `https://cdn.discordapp.com/embed/avatars/${getDefaultAvatarIndex(user)}.png?size=${size}`;
}
const TypingIndicatorComponent = React.memo(function TypingIndicator(props) {
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
        backgroundColor: type !== TYPES.CHANNEL ? settings.indicatorBackground : 'transparent',
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
function getTooltipContent(users, settings) {
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
}
const SettingsPanel = React.memo(function SettingsPanel({
    settings,
    onChange,
    modules
}) {
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
                    color: parseInt(colorValue.replace('#', ''), 16),
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
                                const newValue = parseFloat(e.target.value);
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
function getTooltipText(users) {
    if (!users || !Object.keys(users).length) return 'Someone is typing...';
    const names = Object.values(users).map(u => u.globalName || u.username).filter(Boolean);
    if (names.length === 1) return `${names[0]} is typing...`;
    if (names.length === 2) return `${names.join(' and ')} are typing...`;
    if (names.length === 3) return `${names[0]}, ${names[1]}, and ${names[2]} are typing...`;
    return `${names.length} people are typing...`;
}
function filterTypingUsers(users, settings, modules) {
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
}
function isChannelMuted(guildId, channelId) {
    const M = Modules.MutedStore;
    try {
        if (typeof M?.isChannelMuted === 'function') {
            return M.isChannelMuted.length >= 2
                ? M.isChannelMuted(guildId, channelId)
                : M.isChannelMuted(channelId);
        }
    } catch { }
    return false;
}
class TypingIndicator {
    constructor() {
        this.states = new Map();
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
            CONFIG.info.name,
            CONFIG.info.version,
            "Pharaoh2k/BetterDiscordStuff"
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
                    const id = node.getAttribute('data-list-item-id') || '';
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
        this._elCache.forEach((el, key) => {
            if (!el || !document.contains(el)) {
                this._elCache.delete(key);
            }
        });
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
            ...CONFIG.defaultConfig.reduce((acc, cfg) => ({
                ...acc,
                [cfg.id]: cfg.value
            }), {}),
            ...Data.load(CONFIG.info.name, "settings")
        };
    }
    saveSettings(newSettings) {
        this.settings = {
            ...this.settings,
            ...newSettings
        };
        Data.save(CONFIG.info.name, "settings", this.settings);
        if (Object.hasOwn(newSettings, 'autoUpdate')) {
            if (newSettings.autoUpdate) {
                this.updateManager.start(true);
            } else {
                this.updateManager.stop();
            }
        }
        const visualKeys = [
            'dotColor', 'indicatorBackground', 'animationStyle', 'animationSpeed',
            'showAvatarsInIndicator', 'avatarStyle', 'avatarSize', 'showAvatarStatus',
            'showCount', 'tooltipStyle'
        ];
        const visualSettingsChanged = Object.keys(newSettings).some(key => visualKeys.includes(key));
        if (visualSettingsChanged) {
            this._debouncedReload();
        }
    }
    async start() {
        console.log("BetterTypingIndicator Plugin started");
        DOM.addStyle('typing-indicator-css', STYLES);
        DOM.addStyle('bti-settings-text',
            `.bti-settings-panel, .bti-settings-panel *{
            color:var(--text-normal,#dcddde)!important;
        }
        .bti-settings-panel h1, .bti-settings-panel h2, .bti-settings-panel h3{
            color:var(--header-primary,#ffffff)!important;
        }`
        );
        this.initializeSettingsModules();
        this.validateModulesOnce();
        this._roots = this._roots || new Map();
        await this.updateManager.start(this.settings.autoUpdate);
        this.states = this.states || new Map();
        TYPING_EVENTS.forEach(e => Modules.Dispatcher.subscribe(e, this.handleTyping));
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
            if (channel.parent_id) {
                const parentChannel = Modules.ChannelStore.getChannel(channel.parent_id);
                if (parentChannel?.type === 15) {
                    if (
                        !this.settings.includeMuted && (
                            Modules.MutedStore.isMuted(channel.guild_id) ||
                            isChannelMuted(channel.guild_id, channel.id)
                        )
                    ) return;
                    Object.values(TYPES).forEach(type => {
                        const parentTargetId = this.getTargetId(type, parentChannel);
                        if (!parentTargetId || !this.settings[`${type}TypingIndicator`]) return;
                        if (event.type === 'TYPING_START') {
                            this.addTyping(type, parentTargetId, event.userId);
                        } else {
                            this.removeTyping(type, parentTargetId, event.userId);
                        }
                        requestAnimationFrame(() => this.updateIndicator(type, parentTargetId));
                    });
                }
            }
            if (
                !this.settings.includeMuted &&
                (
                    Modules.MutedStore.isMuted(channel.guild_id) ||
                    isChannelMuted(channel.guild_id, channel.id)
                )
            ) return;
            Object.values(TYPES).forEach(type => {
                if (!this.settings[`${type}TypingIndicator`]) return;
                const targetId = this.getTargetId(type, channel);
                if (!targetId) return;
                if (event.type === 'TYPING_START') {
                    this.addTyping(type, targetId, event.userId);
                } else {
                    this.removeTyping(type, targetId, event.userId);
                }
                requestAnimationFrame(() => this.updateIndicator(type, targetId));
            });
        } catch (error) {
            console.error('Error processing typing event:', error);
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
        if (!this.states.has(type)) {
            this.states.set(type, new Map());
        }
        const typeState = this.states.get(type);
        if (!typeState.has(targetId)) {
            typeState.set(targetId, new Set());
        }
        typeState.get(targetId).add(userId);
    }
    removeTyping(type, targetId, userId) {
        const typeState = this.states.get(type);
        if (!typeState) return;
        const targetSet = typeState.get(targetId);
        if (!targetSet) return;
        targetSet.delete(userId);
        if (targetSet.size === 0) {
            typeState.delete(targetId);
        }
    }
    renderOrCleanupIndicator(type, targetId, containerEl) {
        const rootKey = `${type}:${targetId}`;
        const hasTyping = this.states.get(type)?.get(targetId)?.size > 0;
        if (!hasTyping) {
            const root = this._roots.get(rootKey);
            if (root) {
                root.unmount();
                this._roots.delete(rootKey);
            }
            containerEl
                .querySelectorAll(`.${type}-typing-container`)
                .forEach(el => el.remove());
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
        const users = Modules.TypingStore.getTypingUsers(targetId);
        const filteredUsers = filterTypingUsers(users, this.settings, Modules);
        root.render(
            React.createElement(ErrorBoundary, null,
                React.createElement(TypingIndicatorComponent, {
                    type,
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
        if (!this.states || !this._roots) return;
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
        channelItems.forEach(item => {
            const channelId = item.getAttribute('data-list-item-id').replace('channels___', '');
            if (channelId) this.updateIndicator(TYPES.CHANNEL, channelId);
        });
        const isSelfGuild = channelAttr?.startsWith('guildsnav___');
        const guildItems = isSelfGuild ? [node] : (node.querySelectorAll?.('[data-list-item-id^="guildsnav___"]') || []);
        guildItems.forEach(item => {
            const guildId = item.getAttribute('data-list-item-id').replace('guildsnav___', '');
            if (guildId) {
                this.updateIndicator(TYPES.GUILD, guildId);
                this.updateIndicator(TYPES.FOLDER, guildId);
            }
        });
    }
    cleanup() {
        TYPING_EVENTS.forEach(e => Modules.Dispatcher.unsubscribe(e, this.handleTyping));
        this.states.clear();
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
        ['typing-indicator-container', 'bti-custom-tooltip'].forEach(className => {
            document.querySelectorAll(`.${className}`).forEach(el => {
                el?.parentNode?.removeChild(el);
            });
        });
    }
    getSettingsPanel() {
        if (typeof UI.buildSettingsPanel === "function") {
            return UI.buildSettingsPanel({
                settings: getConfigWithCurrentValues(this.settings),
                onChange: (_, id, value) => this.saveSettings({
                    [id]: value
                })
            });
        }
        return React.createElement(SettingsPanel, {
            settings: this.settings,
            onChange: patch => this.saveSettings(patch),
            modules: this.cachedModules
        });
    }
}
module.exports = TypingIndicator;
/*@end@*/
