/**
 * @name BetterTypingIndicator
 * @version 2.2.2.4.1
 * @website https://x.com/_Pharaoh2k
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterTypingIndicator.js
 * @authorId 874825550408089610
 * @description Shows an indicator in the channel list (w/tooltip) plus server/folder icons and home icon for DMs when someone is typing there.
 * @author Pharaoh2k
 * @Credits: Special thanks to l0c4lh057 for TypingIndicator plugin. This plugin is very loosely derived from his work.
 */

// Constants and Config
const { Data, DOM, React, ReactDOM, Webpack, UI } = BdApi;
const TYPES = { CHANNEL: 'channel', GUILD: 'guild', FOLDER: 'folder', HOME: 'home' };
const TYPING_EVENTS = ['TYPING_START', 'TYPING_STOP', 'MESSAGE_CREATE'];

const CONFIG = {
    info: {
        name: "BetterTypingIndicator",
        authors: [{
            name: "Pharaoh2k",
            github_username: "Pharaoh2k",
            discord_id: "874825550408089610"
        }],
        version: "2.2.2.4.1",
        description: "Shows an indicator in the channel list (w/tooltip) plus server/folder icons and home icon for DMs when someone is typing there."
    },
    defaultConfig: [
        { type: "switch", id: "channelTypingIndicator", name: "Channel Typing Indicator", note: "Show typing indicator on channels", value: true },
        { type: "switch", id: "includeMuted", name: "Include muted channels/guilds", note: "Show typing indicator for muted channels and guilds", value: false },
        { type: "switch", id: "includeBlocked", name: "Include blocked users", note: "Show indicator for blocked users", value: false },
        { type: "switch", id: "showCount", name: "Show Count", note: "Show the number of typing users as a badge (Channel Typing Indicator option must be enabled too)", value: false },
        { type: "color", id: "dotColor", name: "Dot Color", note: "Color of the typing indicator dots", value: "#FFFFFF" },
        { type: "color", id: "indicatorBackground", name: "Indicator Background", note: "Background color for indicators", value: "#18191c" },
        {
            type: "dropdown",
            id: "animationStyle",
            name: "Animation Style",
            note: "Choose animation style",
            value: "pulse",
            options: [{ label: "Bounce", value: "bounce" }, { label: "Pulse", value: "pulse" }, { label: "Wave", value: "wave" }]
        },
        {
            type: "slider",
            id: "animationSpeed",
            name: "Animation Speed",
            note: "Adjust animation speed (seconds)",
            value: 1.4,
            min: 0.5,
            max: 3.0,
            markers: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
            stickToMarkers: false
        },
        { type: "switch", id: "guildTypingIndicator", name: "Guild Typing Indicator", note: "Show typing indicator on guild icons", value: false },
        { type: "switch", id: "folderTypingIndicator", name: "Folder Typing Indicator", note: "Show typing indicator on folders", value: false },
        { type: "switch", id: "homeTypingIndicator", name: "Home/DMs Typing Indicator", note: "Show typing indicator on Home icon", value: false }
    ]
};


const Modules = {
    Dispatcher: Webpack.getByKeys("actionLogger"),
    TypingStore: Webpack.getStore("TypingStore"),
    UserStore: Webpack.getStore("UserStore"),
    RelationshipStore: Webpack.getStore("RelationshipStore"),
    ChannelStore: Webpack.getStore("ChannelStore"),
    MutedStore: Webpack.getStore("UserGuildSettingsStore"),
    FolderStore: Webpack.getStore('SortedGuildStore')

};

// CSS Styles
const STYLES = `
.typing-indicator-dots, .guild-typing-dots, .folder-typing-dots, .home-typing-dots {
    transform: scale(0.8);
}
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

.guild-typing-container, .folder-typing-container, .home-typing-container {
    position: absolute !important;
    bottom: 1px !important;
    right: 1px !important;
    z-index: 9999999 !important;
    pointer-events: none !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: var(--indicator-background, #18191c) !important;
    border-radius: 10px !important;
    padding: 3px 6px !important;
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

svg circle:nth-child(1) { animation-delay: 0s; }
svg circle:nth-child(2) { animation-delay: 0.2s; }
svg circle:nth-child(3) { animation-delay: 0.4s; }

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
}`;

// React Components
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    
    render() { return this.state.hasError ? null : this.props.children; }
}

const TypingIndicatorComponent = React.memo(function TypingIndicator({ type, users, settings }) {
    const containerRef = React.useRef();
    const tooltipText = getTooltipText(users);
    const userCount = Object.keys(users || {}).length;
    
    React.useEffect(() => {
        if (containerRef.current) {
            UI.createTooltip(containerRef.current, tooltipText, {
                style: 'primary',
                side: 'top',
                preventFlip: true
            });
        }
    }, [tooltipText]);
    
    if (settings.showCount && userCount > 0) {
        return React.createElement('div', {
            ref: containerRef,
            className: `${type}-typing-container typing-count-badge has-tooltip`,
            'aria-label': tooltipText,
            style: {
                backgroundColor: settings.indicatorBackground,
                color: settings.dotColor
            }
        }, userCount);
    }
    
    return React.createElement('div', {
            ref: containerRef,
            className: `${type}-typing-dots has-tooltip`,
            'aria-label': tooltipText,
            style: {
                '--indicator-background': settings.indicatorBackground
            }
        },
        React.createElement('svg', {
                width: 24.5,
                height: 7,
                className: `${type}-typing-svg`,
                style: { marginRight: 0 }
            },
            React.createElement('g', null,
                [3.5, 12.25, 19].map((cx, i) =>
                    React.createElement('circle', {
                        key: i,
                        cx: cx,
                        cy: 3.5,
                        r: 3.5,
                        fill: settings.dotColor,
                        'data-animation': settings.animationStyle,
                        style: { animationDuration: `${settings.animationSpeed}s` }
                    })
                )
            )
        )
    );
});

const SettingsPanel = React.memo(function SettingsPanel({ settings, onChange, modules }) {
    const { FormItem, FormSwitch, ColorPicker } = modules;
    
    if (!FormItem || !FormSwitch) return null;
    
    const components = {
        switch: ({ id, name, note }) => {
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
        color: ({ id, name, note }) => {
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
        dropdown: ({ id, name, note, options }) => {
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
        slider: ({ id, name, note, min, max }) => {
            const [sliderValue, setSliderValue] = React.useState(settings[id]);
            
            return React.createElement(FormItem, {
                title: name,
                note: note,
                children: React.createElement('div', {
                    className: 'bti-slider-container'
                }, [
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
                ])
            });
        }
    };
    
    return React.createElement('div', {
        className: 'bti-settings-panel'
    }, CONFIG.defaultConfig.map(config =>
        React.createElement('div', { key: config.id },
            components[config.type]?.(config)
        )
    ));
});

// Utility Functions
function getTooltipText(users) {
    if (!users || !Object.keys(users).length) return 'Someone is typing...';
    const names = Object.values(users).map(u => u.username).filter(Boolean);
    if (names.length <= 2) return `${names.join(' and ')} ${names.length === 1 ? 'is' : 'are'} typing...`;
    return names.length === 3 ?
        `${names[0]}, ${names[1]}, and ${names[2]} are typing...` :
        `${names.length} people are typing...`;
}

function filterTypingUsers(users, settings, modules) {
    const currentUser = modules.UserStore.getCurrentUser();
    return Object.entries(users || {})
        .filter(([id]) => {
            if (id === currentUser?.id) return false;
            if (!settings.includeBlocked && modules.RelationshipStore.isBlocked(id)) return false;
            return true;
        })
        .reduce((acc, [id]) => {
            const user = modules.UserStore.getUser(id);
            if (user) acc[id] = user;
            return acc;
        }, {});
}

// Main Plugin Class
class TypingIndicator {
    constructor() {
        this.states = new Map();
        this.settings = this.getSettings();
        this.handleTyping = this.handleTyping.bind(this);
        this.cachedModules = {
            FormItem: null,
            FormSwitch: null,
            ColorPicker: null
        };
    }
    
    getSettings() {
        return {
            ...CONFIG.defaultConfig.reduce((acc, cfg) => ({ ...acc, [cfg.id]: cfg.value }), {}),
            ...Data.load(CONFIG.info.name, "settings")
        };
    }
    
    saveSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        Data.save(CONFIG.info.name, "settings", this.settings);
        this.reload();
    }
    
    observer(mutation) {
        const { addedNodes } = mutation;
        for (const node of addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                // Check for new channels
                if (node.getAttribute('data-list-item-id')?.startsWith('channels___')) {
                    const channelId = node.getAttribute('data-list-item-id').replace('channels___', '');
                    this.updateIndicator(TYPES.CHANNEL, channelId);
                }
                // Check for new guilds (and possibly folders, since they share list items)
                else if (node.getAttribute('data-list-item-id')?.startsWith('guildsnav___')) {
                    const guildOrFolderId = node.getAttribute('data-list-item-id').replace('guildsnav___', '');
                    this.updateIndicator(TYPES.GUILD, guildOrFolderId);
                    this.updateIndicator(TYPES.FOLDER, guildOrFolderId);
                }
                // Check children for dynamically loaded content
                const channelItems = node.querySelectorAll('[data-list-item-id^="channels___"]');
                channelItems.forEach(item => {
                    const channelId = item.getAttribute('data-list-item-id').replace('channels___', '');
                    this.updateIndicator(TYPES.CHANNEL, channelId);
                });
                
                const guildItems = node.querySelectorAll('[data-list-item-id^="guildsnav___"]');
                guildItems.forEach(item => {
                    const guildOrFolderId = item.getAttribute('data-list-item-id').replace('guildsnav___', '');
                    this.updateIndicator(TYPES.GUILD, guildOrFolderId);
                    this.updateIndicator(TYPES.FOLDER, guildOrFolderId);
                });
            }
        }
    }
    
    start() {
        DOM.addStyle('typing-indicator-css', STYLES);
        this.initializeModules();
        this.setupEventHandlers();
    }
    
    stop() {
        DOM.removeStyle('typing-indicator-css');
        this.cleanup();
    }
    
    reload() {
        this.stop();
        this.start();
    }
    

    initializeModules() {
        this.cachedModules.FormItem = Webpack.getByKeys("FormItem")?.FormItem;
        this.cachedModules.FormSwitch = Webpack.getByKeys("FormSwitch")?.FormSwitch;
        this.cachedModules.ColorPicker = Webpack.getModule(m => m?.toString?.().includes('ColorPicker'));
    }
    
    handleEvents(action, dispatcher = Modules.Dispatcher) {
        if (!dispatcher?.subscribe) {
            console.error("Dispatcher not found");
            return;
        }
        
        TYPING_EVENTS.forEach(event => {
            switch (action) {
                case 'subscribe':
                    dispatcher.subscribe(event, this.handleTyping);
                    break;
                case 'unsubscribe':
                    dispatcher.unsubscribe(event, this.handleTyping);
                    break;
                default:
                    console.error(`Unknown event action: ${action}`);
            }
        });
    }
    
    setupEventHandlers() {
        this.handleEvents('subscribe');
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
        if (!event?.channelId || !event?.userId) return;
        
        const channel = Modules.ChannelStore.getChannel(event.channelId);
        if (!channel) return;
        
        if (
            !this.settings.includeMuted && 
            (
                Modules.MutedStore.isMuted(channel.guild_id) ||
                Modules.MutedStore.isChannelMuted(channel.guild_id, channel.id)
            )
        ) {
            return;
        }


        Object.values(TYPES).forEach(type => {
            const targetId = this.getTargetId(type, channel);
            if (!targetId || !this.settings[`${type}TypingIndicator`]) return;
            
            if (event.type === 'TYPING_START') {
                this.addTyping(type, targetId, event.userId);
            } else {
                this.removeTyping(type, targetId, event.userId);
            }
            
            requestAnimationFrame(() => this.updateIndicator(type, targetId));
        });
    }
    
    getTargetId(type, channel) {
        switch (type) {
            case TYPES.CHANNEL:
                return channel.id;
            case TYPES.GUILD:
                return channel.guild_id;
            case TYPES.FOLDER:

                if (!channel.guild_id) return null;
                const folder = Modules.FolderStore.getGuildFolders()
                    .find(f => f.guildIds.includes(channel.guild_id));
                return folder?.folderId || folder?.id;
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
        const targetState = typeState.get(targetId);
        if (!targetState) return;
        targetState.delete(userId);
        if (targetState.size === 0) {
            typeState.delete(targetId);
        }
    }
    
    updateIndicator(type, targetId) {
        // Determine the element in the DOM
        const selector =
            (type === TYPES.CHANNEL)
                ? `[data-list-item-id="channels___${targetId}"]`
                : (type === TYPES.HOME)
                    ? `[data-list-item-id="${targetId}"]`
                    : `[data-list-item-id="guildsnav___${targetId}"]`;
        
        const element = document.querySelector(selector);
        if (!element) return;
        
        const container =
            (type === TYPES.CHANNEL)
                ? element.querySelector('div[class*="children"]')
                : element;
        
        if (!container) return;
        
        const existing = container.querySelector(`.${type}-typing-container`);
        if (existing) {
            if (ReactDOM.unmountComponentAtNode) {
                ReactDOM.unmountComponentAtNode(existing);
            }
            existing.remove();
        }
        
        const hasTyping = this.states.get(type)?.get(targetId)?.size > 0;
        if (hasTyping) {
            const indicator = document.createElement('div');
            indicator.className = `${type}-typing-container typing-indicator-container has-tooltip`;
            indicator.style.setProperty('--indicator-background', this.settings.indicatorBackground);
            
            const users = Modules.TypingStore.getTypingUsers(targetId);
            const filteredUsers = filterTypingUsers(users, this.settings, Modules);
            
            // Try React 18 method first
            if (ReactDOM.createRoot) {
                const root = ReactDOM.createRoot(indicator);
                root.render(
                    React.createElement(ErrorBoundary, null,
                        React.createElement(TypingIndicatorComponent, {
                            type: type,
                            users: filteredUsers,
                            settings: this.settings
                        })
                    )
                );
            }
            
            container.style.position = 'relative';
            container.appendChild(indicator);
        }
    }
    
    cleanup() {
        this.handleEvents('unsubscribe');
        this.states.clear();
        document.querySelectorAll('.typing-indicator-container').forEach(el => {
            if (ReactDOM.unmountComponentAtNode) {
                ReactDOM.unmountComponentAtNode(el);
            }
            el.remove();
        });
    }
    
    getSettingsPanel() {
        return React.createElement(ErrorBoundary, null,
            React.createElement(SettingsPanel, {
                settings: this.settings,
                onChange: this.saveSettings.bind(this),
                modules: this.cachedModules
            })
        );
    }
}

module.exports = TypingIndicator;
