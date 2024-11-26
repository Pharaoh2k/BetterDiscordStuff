/**
 * @name BetterTypingIndicator
 * @displayName BetterTypingIndicator
 * @website https://x.com/_Pharaoh2k
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterTypingIndicator.js
 * @authorId 874825550408089610
 * @author Pharaoh2k
 */

module.exports = (() => {
    // Constants for indicator types
    const INDICATOR_TYPES = {
        CHANNEL: 'channel',
        GUILD: 'guild',
        FOLDER: 'folder',
        HOME: 'home'
    };

    const config = {
        info: {
            name: "BetterTypingIndicator",
            authors: [{
                name: "Pharaoh2k",
                github_username: "Pharaoh2k",
                twitter_username: "_Pharaoh2k",
                discord_id: "874825550408089610"
            }],
            version: "1.0.0",
            description: "Shows an indicator in the channel list when someone is typing there. Includes customizable animations and settings."
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
                note: "Show the number of typing users as a badge instead of dots",
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
                note: "Background color for guild, folder and home typing indicators",
                value: "#18191c"
            },
            {
                type: "dropdown",
                id: "animationStyle",
                name: "Animation Style",
                note: "Choose the animation style for the typing indicator",
                value: "pulse",
                options: [{
                        label: "Bounce",
                        value: "bounce"
                    },
                    {
                        label: "Pulse",
                        value: "pulse"
                    },
                    {
                        label: "Wave",
                        value: "wave"
                    }
                ]
            },
            {
                type: "slider",
                id: "animationSpeed",
                name: "Animation Speed",
                note: "Adjust the speed of the typing animation (in seconds)",
                value: 1.4,
                min: 0.5,
                max: 3.0,
                markers: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
                stickToMarkers: false
            },
            {
                type: "switch",
                id: "guildTypingIndicator",
                name: "Guild Typing Indicator",
                note: "Show typing indicator on guild icons",
                value: false
            },
            {
                type: "switch",
                id: "folderTypingIndicator",
                name: "Folder Typing Indicator",
                note: "Show typing indicator on folders",
                value: false
            },
            {
                type: "switch",
                id: "homeTypingIndicator",
                name: "Home/DMs Typing Indicator",
                note: "Show typing indicator on Home icon/DMs",
                value: false
            }
        ]
    };

    // Library check class
    class LibraryMissingPlugin {
        constructor() {
            this._config = config;
        }
        getName() {
            return config.info.name;
        }
        getAuthor() {
            return config.info.authors.map(a => a.name).join(", ");
        }
        getDescription() {
            return config.info.description;
        }
        getVersion() {
            return config.info.version;
        }
        load() {
            BdApi.showConfirmationModal("Library Missing",
                `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",
                            async (error, response, body) => {
                                if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                                await new Promise(r => require("fs").writeFile(
                                    require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                            });
                    }
                });
        }
        start() {}
        stop() {}
    }

    // Return LibraryMissingPlugin if ZeresPluginLibrary is not available
    if (!global.ZeresPluginLibrary) return LibraryMissingPlugin;

    // Continue with the main plugin if library is available
    return (([Plugin, Library]) => {
        const {
            Patcher,
            ReactTools,
            Settings
        } = Library;
        const {
            React
        } = BdApi;

        // Utility class for handling typing states
        class TypingStateManager {
            constructor() {
                this.states = new Map();
            }

            addTyping(type, id, userId, channelId) {
                if (!this.states.has(type)) {
                    this.states.set(type, new Map());
                }

                const typeState = this.states.get(type);
                if (!typeState.has(id)) {
                    typeState.set(id, new Set());
                }

                const key = `${channelId}-${userId}`;
                typeState.get(id).add(key);

                if (type === INDICATOR_TYPES.FOLDER) {
                    console.log('TypingStateManager - Added:', {
                        type,
                        id,
                        key,
                        stateSize: typeState.get(id).size
                    });
                }

                typeState.get(id).add(`${channelId}-${userId}`);
            }

            removeTyping(type, id, userId, channelId) {
                const typeState = this.states.get(type);
                if (!typeState?.has(id)) return;

                const state = typeState.get(id);
                const key = `${channelId}-${userId}`;
                state.delete(key);

                if (type === INDICATOR_TYPES.FOLDER) {
                    console.log('TypingStateManager - Removed:', {
                        type,
                        id,
                        key,
                        stateSize: state.size
                    });
                }

                if (state.size === 0) {
                    typeState.delete(id);
                    if (type === INDICATOR_TYPES.FOLDER) {
                        console.log('TypingStateManager - Cleared folder state:', {
                            id
                        });
                    }
                }
            }

            hasTyping(type, id) {
                return this.states.get(type)?.get(id)?.size > 0 || false;
            }

            clear() {
                this.states.clear();
            }
        }

        // Debounce function definition
        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }

        // Typing Utilities
        class TypingUtils {
            static getTooltipText(typingUsers) {
                try {
                    if (!typingUsers || Object.keys(typingUsers).length === 0) {
                        return 'Someone is typing...';
                    }

                    const usernames = Object.values(typingUsers)
                        .map(user => user.username)
                        .filter(Boolean);

                    if (usernames.length === 1) {
                        return `${usernames[0]} is typing...`;
                    } else if (usernames.length === 2) {
                        return `${usernames.join(' and ')} are typing...`;
                    } else if (usernames.length === 3) {
                        return `${usernames[0]}, ${usernames[1]}, and ${usernames[2]} are typing...`;
                    } else {
                        return `${usernames.length} people are typing...`;
                    }
                } catch (err) {
                    console.error('Error generating tooltip text:', err);
                    return 'Someone is typing...';
                }
            }

            static filterTypingUsers(typingUsers, settings) {
                const currentUser = Modules.UserStore.getCurrentUser();
                return Object.entries(typingUsers || {})
                    .filter(([userId]) => {
                        if (userId === currentUser?.id) return false;
                        if (!settings.includeBlocked && Modules.RelationshipStore.isBlocked(userId)) return false;
                        return true;
                    })
                    .reduce((acc, [id]) => {
                        // Get full user data
                        const user = Modules.UserStore.getUser(id);
                        if (user) acc[id] = user;
                        return acc;
                    }, {});
            }
        }

        // Utility class for creating indicators
        class IndicatorCreator {
            static createTypingIndicator(type, settings, id) {
                const indicator = document.createElement('div');
                indicator.className = `${type}-typing-container`;

                // Apply background color for non-channel indicators
                if (type !== 'channel' && settings.indicatorBackground) {
                    indicator.style.setProperty('--indicator-background', settings.indicatorBackground);
                }

                // Get typing users and create tooltip
                try {
                    if (id) {
                        const rawTypingUsers = Modules.TypingModule.getTypingUsers(id);
                        const filteredUsers = TypingUtils.filterTypingUsers(rawTypingUsers, settings);
                        const tooltipText = TypingUtils.getTooltipText(filteredUsers);

                        indicator.setAttribute('aria-label', tooltipText);
                        indicator.classList.add('has-tooltip');
                    }
                } catch (err) {
                    console.error('Error creating typing indicator:', err);
                    return indicator;
                }

                const dotsContainer = document.createElement('div');
                dotsContainer.className = `${type}-typing-dots`;

                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "24.5");
                svg.setAttribute("height", "7");
                svg.classList.add(`${type}-typing-svg`);
                svg.style.marginRight = "0";

                const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

                [1, 2, 3].forEach((i, index) => {
                    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    circle.setAttribute("cx", i === 1 ? '3.5' : i === 2 ? '12.25' : '19'); // Adjusted to match old version
                    circle.setAttribute("cy", "3.5");
                    circle.setAttribute("r", "3");
                    circle.setAttribute("fill", settings.dotColor);
                    circle.style.animationDuration = `${settings.animationSpeed}s`;
                    circle.style.animationDelay = `${(i - 1) * 0.2}s`;
                    circle.dataset.animation = settings.animationStyle;
                    g.appendChild(circle);
                });

                svg.appendChild(g);
                dotsContainer.appendChild(svg);
                indicator.appendChild(dotsContainer);

                return indicator;
            }

            static findContainer(element, type) {
                const selectors = {
                    [INDICATOR_TYPES.CHANNEL]: '[class*="iconVisibility_"]',
                    [INDICATOR_TYPES.GUILD]: 'div[class*="wrapper_"]',
                    [INDICATOR_TYPES.FOLDER]: '[class*="expandedFolderBackground_"], [class*="folder-"], [class*="folderIconWrapper"]',
                    [INDICATOR_TYPES.HOME]: '[class*="wrapper-"], [class*="childWrapper-"], [class*="homeIcon-"]'
                };

                const selector = selectors[type];
                let container = null;

                if (selector.includes(',')) {
                    const selectorList = selector.split(',').map(s => s.trim());
                    for (const s of selectorList) {
                        container = element.querySelector(s);
                        if (container) break;
                    }
                } else {
                    container = element.querySelector(selector);
                }

                return container || element;
            }
        }

        // Error Boundary Component
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

            componentDidCatch(error, errorInfo) {
                console.error('TypingIndicator Error:', error, errorInfo);
            }

            render() {
                if (this.state.hasError) return null;
                return this.props.children;
            }
        }

        // React Components
        const TypingDots = React.memo(({
            typingUsers,
            settings
        }) => {
            const tooltipRef = React.useRef(null);
            const containerRef = React.useRef(null);

            const formatTypingText = () => {
                const users = Object.values(typingUsers || {}).filter(Boolean);
                if (!users.length) return '';

                if (users.length === 1) {
                    return `${users[0].username} is typing...`;
                } else if (users.length === 2) {
                    return `${users[0].username} and ${users[1].username} are typing...`;
                } else if (users.length === 3) {
                    return `${users[0].username}, ${users[1].username}, and ${users[2].username} are typing...`;
                } else {
                    return `${users.length} people are typing...`;
                }
            };

            const updateTooltipPosition = React.useCallback(() => {
                if (!containerRef.current || !tooltipRef.current) return;

                const containerRect = containerRef.current.getBoundingClientRect();
                const tooltipRect = tooltipRef.current.getBoundingClientRect();

                const top = containerRect.top - tooltipRect.height - 10; // 10px above
                const left = containerRect.left + (containerRect.width / 2) - (tooltipRect.width / 2);

                const boundedLeft = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));

                tooltipRef.current.style.top = `${top}px`;
                tooltipRef.current.style.left = `${boundedLeft}px`;
            }, []);

            const debouncedUpdatePosition = React.useMemo(
                () => debounce(updateTooltipPosition, 16),
                [updateTooltipPosition]
            );

            React.useEffect(() => {
                const container = containerRef.current;
                const tooltip = tooltipRef.current;

                if (!container || !tooltip) return;

                const handleMouseEnter = () => {
                    if (settings.smartTooltips && Object.keys(typingUsers).length <= 1) return;
                    tooltip.style.opacity = '1';
                    updateTooltipPosition();
                };

                const handleMouseLeave = () => {
                    tooltip.style.opacity = '0';
                };

                container.addEventListener('mouseenter', handleMouseEnter);
                container.addEventListener('mouseleave', handleMouseLeave);
                window.addEventListener('scroll', debouncedUpdatePosition, true);
                window.addEventListener('resize', debouncedUpdatePosition);

                return () => {
                    container.removeEventListener('mouseenter', handleMouseEnter);
                    container.removeEventListener('mouseleave', handleMouseLeave);
                    window.removeEventListener('scroll', debouncedUpdatePosition, true);
                    window.removeEventListener('resize', debouncedUpdatePosition);
                };
            }, [debouncedUpdatePosition, settings.smartTooltips, typingUsers]);

            const userCount = Object.keys(typingUsers).length;
            const ariaLabel = formatTypingText();

            return React.createElement('div', {
                className: 'typing-indicator-container typing-indicator-channel', // Ensure channel-specific class
                ref: containerRef,
                role: 'status',
                'aria-live': 'polite',
                'aria-label': ariaLabel
            }, [
                settings.showCount ?
                React.createElement('div', {
                    className: 'typing-count-badge',
                    key: 'count'
                }, userCount) :
                React.createElement('div', {
                        className: 'typing-indicator-dots',
                        key: 'dots'
                    },
                    React.createElement('svg', {
                            width: '24.5',
                            height: '7',
                            className: 'typing-indicator-svg',
                            style: {
                                marginRight: 0
                            }
                        },
                        React.createElement('g', null, [1, 2, 3].map(i =>
                            React.createElement('circle', {
                                key: i,
                                cx: i === 1 ? '3.5' : i === 2 ? '12.25' : '21', // Ensure cx matches old version
                                cy: '3.5',
                                r: '3.5',
                                fill: settings.dotColor,
                                'data-animation': settings.animationStyle,
                                style: {
                                    animationDuration: `${settings.animationSpeed}s`
                                }
                            })
                        ))
                    )
                ),
                // Add Tooltip Element
                React.createElement('div', {
                    className: 'typing-tooltip',
                    key: 'tooltip',
                    ref: tooltipRef
                }, formatTypingText())
            ]);
        });

        const TypingIndicatorComponent = React.memo(({
            type,
            typingUsers,
            settings,
            id
        }) => {
            const userCount = Object.keys(typingUsers || {}).length;
            const tooltipText = TypingUtils.getTooltipText(typingUsers);

            return React.createElement('div', {
                    className: `typing-indicator-${type} has-tooltip`,
                    'aria-label': tooltipText,
                    style: {
                        position: 'absolute',
                        bottom: '2px',
                        right: '2px',
                        zIndex: 9999,
                        '--indicator-background': settings.indicatorBackground
                    }
                },
                React.createElement('div', {
                        className: 'typing-indicator-dots',
                        key: 'dots'
                    },
                    React.createElement('svg', {
                            width: '24.5',
                            height: '7',
                            className: 'typing-indicator-svg',
                            style: {
                                marginRight: 0
                            }
                        },
                        React.createElement('g', null, [1, 2, 3].map(i =>
                            React.createElement('circle', {
                                key: i,
                                cx: i === 1 ? '3.5' : i === 2 ? '12.25' : '19',
                                cy: '3.5',
                                r: '3',
                                fill: settings.dotColor,
                                'data-animation': settings.animationStyle,
                                style: {
                                    animationDuration: `${settings.animationSpeed}s`
                                }
                            })
                        ))
                    )
                )
            );
        });

        // Webpack Modules
        const Modules = {
            get ChannelComponents() {
                return BdApi.Webpack.getModule(m => m?.Z?.toString?.()?.includes('hasActiveThreads:c')) ||
                    BdApi.Webpack.getModule(m => m?.default?.displayName === 'ChannelItem');
            },

            get GuildComponents() {
                return BdApi.Webpack.getModule(m => m?.Z?.type?.toString?.().includes('blobContainer'));
            },

            get FolderComponents() {
                return BdApi.Webpack.getModule(m => m?.default?.displayName === 'Folder') ||
                    BdApi.Webpack.getModule(m => m?.FolderComponent);
            },

            get HomeComponent() {
                return BdApi.Webpack.getModule(m => m?.default?.displayName === 'HomeIcon');
            },

            get TypingModule() {
                return BdApi.Webpack.getModule(m => m?.getTypingUsers && m?.isTyping && m?._dispatcher);
            },

            get UserStore() {
                return BdApi.Webpack.getModule(m => m?.getName?.() === "UserStore");
            },

            get MutedStore() {
                return BdApi.Webpack.getModule(m => m?.isChannelMuted && m?.isMuted);
            },

            get RelationshipStore() {
                return BdApi.Webpack.getModule(m => m?.isBlocked && m?.getFriendIDs);
            },

            get SelectedGuildStore() {
                return BdApi.Webpack.getModule(m => m?.getGuildId && m?.getLastSelectedGuildId);
            },

            get ChannelStore() {
                return BdApi.Webpack.getModule(m => m?.getName?.() === "ChannelStore" ||
                    m?.getChannel && m?.getDMFromUserId);
            }
        };

        // Unified CSS for all indicator types
        const css = `
    /* Base indicator styles */
            .typing-indicator-dots,
            .guild-typing-dots,
            .folder-typing-dots,
            .home-typing-dots {
                transform: scale(0.8);
            }
    
            .typing-indicator-svg,
            guild-typing-svg,
            .folder-typing-svg,
             .home-typing-svg {
                opacity: 0.7;
            }
            
            /* Shared container styles */
            .typing-indicator-container {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 4px;
                position: relative !important; /* Ensure relative positioning */
                z-index: 100 !important; /* Moderate z-index */
            }
            
            /* Remove absolute positioning from channel indicator */
            .typing-indicator-channel {
                position: relative !important; /* Change to relative */
                right: 0 !important; /* Remove right offset */
                top: 0 !important; /* Remove top offset */
                transform: none !important; /* Remove transform */
                z-index: 100 !important; /* Moderate z-index */
             }
            .guild-typing-container,
            .folder-typing-container,
            .home-typing-container {
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
            
            /* Animations */
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
            
            /* Animation applications */
            [data-animation="bounce"] {
                animation: typingBounce var(--animation-duration, 1.4s) infinite ease-in-out;
            }
            
            [data-animation="pulse"] {
                animation: typingPulse var(--animation-duration, 1.4s) infinite ease-in-out;
            }
            
            [data-animation="wave"] {
                animation: typingWave var(--animation-duration, 1.4s) infinite ease-in-out;
            }
            
            /* Animation delays */
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
            /* Tooltip styles */
            .typing-tooltip {
                position: fixed;
                background: var(--background-floating);
                color: var(--text-normal);
                padding: 8px 12px;
                border-radius: 5px;
                font-size: 14px;
                font-weight: 500;
                pointer-events: none;
                white-space: nowrap;
                box-shadow: var(--elevation-high);
                z-index: 99999;
                opacity: 0;
                transition: opacity 150ms ease;
            }
            
            .typing-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 6px solid transparent;
                border-top-color: var(--background-floating);
            }
            
            /* Disable CSS-based tooltips for channels */
            .typing-indicator-container.has-tooltip:hover::after {
                display: none; /* Tooltip is now handled by JavaScript */
            }
            
            /* Channel indicator positioning */
            .typing-indicator-channel {
                /* Position already handled by relative positioning */
            }
            
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
        `;

        // Main Plugin Class
        return class TypingIndicator extends Plugin {
            constructor() {
                super();
                this.onTypingUpdate = this.onTypingUpdate.bind(this);
                this.handlePatch = this.handlePatch.bind(this);
                this.settings = this.getSettings();
                this.typingStateManager = new TypingStateManager();
                this.dispatchers = new Map();
            }

            getSettings() {
                const loadedSettings = BdApi.Data.load(config.info.name, "settings");
                const defaultSettings = config.defaultConfig.reduce((acc, cfg) => {
                    acc[cfg.id] = cfg.value;
                    return acc;
                }, {});
                return {
                    ...defaultSettings,
                    ...loadedSettings
                };
            }

            saveSettings() {
                BdApi.Data.save(config.info.name, "settings", this.settings);

                // Clear typing states
                this.typingStateManager.clear();

                // Remove all existing indicators
                const selectors = [
                    '.typing-indicator-container',
                    '.guild-typing-container',
                    '.folder-typing-container',
                    '.home-typing-container'
                ];

                selectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => {
                        const ReactDOM = BdApi.ReactDOM || window.ReactDOM;
                        if (ReactDOM.unmountComponentAtNode) {
                            ReactDOM.unmountComponentAtNode(el);
                        }
                        el.remove();
                    });
                });

                // Re-patch components based on new settings
                Patcher.unpatchAll();

                // Re-initialize patches based on new settings
                if (this.settings.channelTypingIndicator) {
                    this.patchChannelItem(Modules.ChannelComponents);
                }
                if (this.settings.guildTypingIndicator) {
                    this.patchGuilds(Modules.GuildComponents);
                }
                if (this.settings.folderTypingIndicator) {
                    this.patchFolders(Modules.FolderComponents);
                }
                if (this.settings.homeTypingIndicator) {
                    this.patchHome(Modules.HomeComponent);
                }

                // Force updates
                this.forceUpdateElements();

                // Update CSS variables for any remaining or new indicators
                document.querySelectorAll('[data-animation]').forEach(element => {
                    element.style.setProperty('--animation-duration', `${this.settings.animationSpeed}s`);
                    if (element.getAttribute('fill')) {
                        element.setAttribute('fill', this.settings.dotColor);
                    }
                });

                // Trigger typing update to refresh all indicators
                this.onTypingUpdate();
            }

            getSettingsPanel() {
                const panel = new Library.Settings.SettingPanel();

                panel.append(
                    new Library.Settings.Switch(
                        "Channel Typing Indicator",
                        "Show typing indicator on channels",
                        this.settings.channelTypingIndicator,
                        (value) => {
                            this.settings.channelTypingIndicator = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.Switch(
                        "Include Muted",
                        "Show typing indicator for muted channels and guilds",
                        this.settings.includeMuted,
                        (value) => {
                            this.settings.includeMuted = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.Switch(
                        "Include Blocked Users",
                        "Show indicator for blocked users",
                        this.settings.includeBlocked,
                        (value) => {
                            this.settings.includeBlocked = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.Switch(
                        "Show Count",
                        "Show the number of typing users as a badge instead of dots",
                        this.settings.showCount,
                        (value) => {
                            this.settings.showCount = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.ColorPicker(
                        "Dot Color",
                        "Color of the typing indicator dots",
                        this.settings.dotColor,
                        (value) => {
                            this.settings.dotColor = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.ColorPicker(
                        "Indicator Background",
                        "Background color for guild, folder and home typing indicators",
                        this.settings.indicatorBackground,
                        (value) => {
                            this.settings.indicatorBackground = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.Dropdown(
                        "Animation Style",
                        "Choose the animation style for the typing indicator",
                        this.settings.animationStyle,
                        [{
                                label: "Bounce",
                                value: "bounce"
                            },
                            {
                                label: "Pulse",
                                value: "pulse"
                            },
                            {
                                label: "Wave",
                                value: "wave"
                            }
                        ],
                        (value) => {
                            this.settings.animationStyle = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.Slider(
                        "Animation Speed",
                        "Adjust the speed of the typing animation (in seconds)",
                        0.5,
                        3.0,
                        this.settings.animationSpeed,
                        (value) => {
                            this.settings.animationSpeed = value;
                            this.saveSettings();
                        }, {
                            markers: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0],
                            stickToMarkers: false
                        }
                    ),
                    new Library.Settings.Switch(
                        "Guild Typing Indicator",
                        "Show typing indicator on guild icons",
                        this.settings.guildTypingIndicator,
                        (value) => {
                            this.settings.guildTypingIndicator = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.Switch(
                        "Folder Typing Indicator",
                        "Show typing indicator on folders",
                        this.settings.folderTypingIndicator,
                        (value) => {
                            this.settings.folderTypingIndicator = value;
                            this.saveSettings();
                        }
                    ),
                    new Library.Settings.Switch(
                        "Home/DMs Typing Indicator",
                        "Show typing indicator on Home icon/DMs",
                        this.settings.homeTypingIndicator,
                        (value) => {
                            this.settings.homeTypingIndicator = value;
                            this.saveSettings();
                        }
                    )
                );

                return panel.getElement();
            }

            reload() {
                this.stop();
                this.start();
            }

            async onStart() {
                BdApi.injectCSS('typing-indicator-css', css);

                const modules = await this.initializeModules();

                if (!Object.values(modules).some(Boolean)) {
                    console.warn("TypingIndicator: No components found to patch.");
                    return;
                }

                const {
                    channelComponents,
                    guildComponents,
                    folderComponents,
                    homeComponent
                } = modules;
                const typingStore = Modules.TypingModule;

                if (!typingStore?.getTypingUsers) {
                    console.error("TypingStore missing getTypingUsers method");
                    return;
                }

                typingStore.addChangeListener(this.onTypingUpdate);

                if (channelComponents && this.settings.channelTypingIndicator) {
                    this.patchChannelItem(channelComponents);
                }
                if (guildComponents && this.settings.guildTypingIndicator) {
                    this.patchGuilds(guildComponents);
                }
                if (folderComponents && this.settings.folderTypingIndicator) {
                    this.patchFolders(folderComponents);
                }
                if (homeComponent && this.settings.homeTypingIndicator) {
                    this.patchHome(homeComponent);
                }
            }

            async initializeModules() {
                return {
                    channelComponents: Modules.ChannelComponents,
                    guildComponents: Modules.GuildComponents,
                    folderComponents: Modules.FolderComponents,
                    homeComponent: Modules.HomeComponent
                };
            }

            onStop() {
                BdApi.clearCSS('typing-indicator-css');
                Modules.TypingModule.removeChangeListener(this.onTypingUpdate);
                Patcher.unpatchAll();

                this.typingStateManager.clear();
                this.dispatchers.clear();

                const selectors = [
                    '.typing-indicator-container',
                    '.guild-typing-container',
                    '.folder-typing-container',
                    '.home-typing-container'
                ];

                selectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => el.remove());
                });
            }

            onTypingUpdate() {
                const channelList = document.querySelector('.content_eed6a8') ||
                    document.querySelector('[class*="content-"][class*="scroller-"]') ||
                    document.querySelector('ul[role="list"]');

                if (channelList) {
                    const instance = ReactTools.getOwnerInstance(channelList);
                    instance?.forceUpdate?.();
                }
            }

            forceUpdateElements() {
                // This triggers channel list updates
                this.onTypingUpdate();

                // This triggers guild list updates
                this.forceUpdateGuilds();
            }

            async forceUpdateGuilds(promiseState) {
                // This forces the guild list to refresh
                document.getElementsByClassName("scroller-1Bvpku none-2Eo-qx scrollerBase-289Jih")[0]?.dispatchEvent(new CustomEvent("scroll"));
            }

            handlePatch(_, args, ret, type) {
                try {
                    const settingsMap = {
                        [INDICATOR_TYPES.CHANNEL]: 'channelTypingIndicator',
                        [INDICATOR_TYPES.GUILD]: 'guildTypingIndicator',
                        [INDICATOR_TYPES.FOLDER]: 'folderTypingIndicator',
                        [INDICATOR_TYPES.HOME]: 'homeTypingIndicator'
                    };

                    if (!this.settings[settingsMap[type]]) return ret;


                    const idMappings = {
                        [INDICATOR_TYPES.CHANNEL]: args[0]?.channel?.id,
                        [INDICATOR_TYPES.GUILD]: args[0]?.guild?.id,
                        [INDICATOR_TYPES.FOLDER]: args[0]?.folder?.id,
                        [INDICATOR_TYPES.HOME]: 'guildsnav___home'
                    };

                    const id = idMappings[type];
                    if (!id) return ret;

                    if (type === INDICATOR_TYPES.CHANNEL && !this.settings.channelTypingIndicator) {
                        return ret;
                    }

                    const typingUsers = Modules.TypingModule.getTypingUsers(id);
                    const userIds = Object.keys(typingUsers || {})
                        .filter(id => id !== Modules.UserStore.getCurrentUser()?.id);

                    if (!userIds.length) return ret;

                    const typingUserObjects = userIds.reduce((acc, id) => {
                        const user = Modules.UserStore.getUser(id);
                        if (user) acc[id] = user;
                        return acc;
                    }, {});

                    if (!ret.type.patched) {
                        const OriginalComponent = ret.type;
                        const ReactDOM = BdApi.ReactDOM || window.ReactDOM;

                        ret.type = this.createWrappedComponent(
                            OriginalComponent,
                            type,
                            typingUserObjects,
                            ReactDOM
                        );
                        ret.type.patched = true;
                    }

                    return ret;
                } catch (e) {
                    console.error(`TypingIndicator ${type} patch error:`, e);
                    return ret;
                }
            }

            createWrappedComponent(OriginalComponent, type, typingUserObjects, ReactDOM) {
                if (type !== INDICATOR_TYPES.CHANNEL) return OriginalComponent;
                const plugin = this;

                return React.memo(props => {
                    const originalElement = React.createElement(
                        OriginalComponent.DecoratedComponent || OriginalComponent,
                        props
                    );
                    const ref = React.useRef();

                    React.useEffect(() => {
                        if (!ref.current) return;

                        const container = ref.current;
                        const iconVisibilityContainer = container.querySelector('[class*="iconVisibility_"]');
                        if (!iconVisibilityContainer) return;

                        const childrenContainer = iconVisibilityContainer.querySelector('[class*="children_"]');
                        if (!childrenContainer) return;

                        // Remove existing indicator if present
                        const existingIndicator = container.querySelector('.typing-indicator-container');
                        if (existingIndicator) {
                            ReactDOM.unmountComponentAtNode(existingIndicator);
                            existingIndicator.remove();
                        }

                        // Create new indicator with typing users
                        const indicator = document.createElement('div');
                        indicator.className = 'typing-indicator-container typing-indicator-channel'; // Ensure channel-specific class

                        ReactDOM.render(
                            React.createElement(ErrorBoundary, null,
                                React.createElement(TypingDots, {
                                    typingUsers: typingUserObjects,
                                    settings: plugin.settings
                                })
                            ),
                            indicator
                        );

                        childrenContainer.appendChild(indicator);

                        return () => {
                            if (indicator) {
                                ReactDOM.unmountComponentAtNode(indicator);
                                indicator.remove();
                            }
                        };
                    }, [JSON.stringify(typingUserObjects), JSON.stringify(plugin.settings)]);

                    return React.createElement('div', {
                        ref
                    }, originalElement);
                });
            }

            patchChannelItem(channelComponents) {
                if (!channelComponents) return;

                ['Z', 'default', ...Object.keys(channelComponents)]
                .filter(key => typeof channelComponents[key] === 'function')
                    .forEach(key => {
                        Patcher.after(
                            channelComponents,
                            key,
                            (_, [props], ret) => {
                                if (props.selected) return;
                                // Add muted check
                                if (!this.settings.includeMuted && (
                                        Modules.MutedStore.isChannelMuted(props.channel?.guild_id, props.channel?.id) ||
                                        (props.channel.guild_id && Modules.MutedStore.isMuted(props.channel.guild_id))
                                    )) return;

                                // Changed this line from args to [props]
                                return this.handlePatch(_, [props], ret, INDICATOR_TYPES.CHANNEL);
                            }
                        );
                    });
            }

            setupTypingHandler(type, dispatcher) {
                if (!dispatcher?.dispatch) {
                    console.log(`No dispatcher found for ${type}`);
                    return;
                }

                if (!this.dispatchers.has(dispatcher)) {
                    this.dispatchers.set(dispatcher, dispatcher.dispatch);

                    const plugin = this;
                    const originalDispatch = this.dispatchers.get(dispatcher);

                    dispatcher.dispatch = function(event) {
                        if (event.type === 'TYPING_START' || event.type === 'TYPING_STOP') {
                            plugin.processTypingEvent(INDICATOR_TYPES.FOLDER, event);
                            plugin.processTypingEvent(INDICATOR_TYPES.HOME, event);
                            plugin.processTypingEvent(INDICATOR_TYPES.GUILD, event);
                        } else if (event.type === 'MESSAGE_CREATE') {
                            const channel = Modules.ChannelStore.getChannel(event.message.channel_id);
                            if (channel) {
                                const cleanupEvent = {
                                    type: 'TYPING_STOP',
                                    channelId: event.message.channel_id,
                                    userId: event.message.author.id
                                };
                                plugin.processTypingEvent(INDICATOR_TYPES.FOLDER, cleanupEvent);
                                plugin.processTypingEvent(INDICATOR_TYPES.HOME, cleanupEvent);
                                plugin.processTypingEvent(INDICATOR_TYPES.GUILD, cleanupEvent);
                            }
                        }

                        return originalDispatch.call(dispatcher, event);
                    };
                }
            }

            processTypingEvent(type, event) {
                try {
                    if (!event?.type || !event?.channelId) return;

                    const settingsMap = {
                        [INDICATOR_TYPES.CHANNEL]: 'channelTypingIndicator',
                        [INDICATOR_TYPES.GUILD]: 'guildTypingIndicator',
                        [INDICATOR_TYPES.FOLDER]: 'folderTypingIndicator',
                        [INDICATOR_TYPES.HOME]: 'homeTypingIndicator'
                    };

                    if (!this.settings[settingsMap[type]]) return;

                    let targetId = null;
                    const channel = Modules.ChannelStore.getChannel(event.channelId);

                    if (!channel) return;

                    if (!this.settings.includeMuted) {
                        if (channel?.guild_id && Modules.MutedStore.isMuted(channel.guild_id)) return;
                        if (Modules.MutedStore.isChannelMuted(channel?.guild_id, event.channelId)) return;
                    }

                    if (!this.settings.includeBlocked && Modules.RelationshipStore.isBlocked(event.userId)) return;

                    switch (type) {
                        case INDICATOR_TYPES.FOLDER:
                            if (channel?.guild_id) {
                                const FolderStore = BdApi.Webpack.getModule(m => m?.getGuildFolders);
                                const folders = FolderStore?.getGuildFolders() || [];
                                const folder = folders.find(f => f.guildIds?.includes(channel.guild_id));
                                targetId = folder?.folderId || folder?.id;
                            }
                            break;
                        case INDICATOR_TYPES.HOME:
                            if (channel && (channel.type === 1 || channel.type === 3)) {
                                targetId = 'guildsnav___home';
                            }
                            break;
                        case INDICATOR_TYPES.GUILD:
                            targetId = channel?.guild_id;
                            break;
                        case INDICATOR_TYPES.CHANNEL:
                            targetId = channel?.id;
                            break;
                    }

                    if (!targetId) return;

                    if (event.type === 'TYPING_START') {
                        this.typingStateManager.addTyping(type, targetId, event.userId, event.channelId);
                    } else {
                        this.typingStateManager.removeTyping(type, targetId, event.userId, event.channelId);
                    }

                    const shouldShow = this.typingStateManager.hasTyping(type, targetId);

                    requestAnimationFrame(() => {
                        let element;
                        let containerSelector;

                        switch (type) {
                            case INDICATOR_TYPES.FOLDER:
                                element = document.querySelector(`[data-folder-id="${targetId}"]`) ||
                                    document.querySelector(`[aria-owns="folder-items-${targetId}"]`);
                                containerSelector = '[class*="folderIconWrapper"], [class*="folder-"]';
                                break;
                            case INDICATOR_TYPES.HOME:
                                element = document.querySelector('[data-list-item-id="guildsnav___home"]');
                                containerSelector = '[class*="childWrapper-"], [class*="homeIcon-"]';
                                break;
                            case INDICATOR_TYPES.GUILD:
                                element = document.querySelector(`[data-list-item-id="guildsnav___${targetId}"]`);
                                containerSelector = '[class*="wrapper_"]';
                                break;
                        }

                        if (!element) return;

                        const container = type === INDICATOR_TYPES.FOLDER ?
                            (element.querySelector(containerSelector) || element) :
                            IndicatorCreator.findContainer(element, type);

                        if (container) {
                            const existingIndicator = container.querySelector(`.${type}-typing-container`);
                            if (existingIndicator) {
                                existingIndicator.remove();
                            }

                            if (shouldShow) {
                                const indicator = IndicatorCreator.createTypingIndicator(type, this.settings, targetId);
                                container.style.position = 'relative';
                                container.appendChild(indicator);
                            }
                        }
                    });
                } catch (err) {
                    console.error(`Error processing ${type} typing event:`, err);
                }
            }

            patchFolders(folderComponents) {
                if (!folderComponents) return;
                this.setupTypingHandler(INDICATOR_TYPES.FOLDER, Modules.TypingModule._dispatcher);
            }

            patchHome(homeComponent) {
                if (!homeComponent) return;
                this.setupTypingHandler(INDICATOR_TYPES.HOME, Modules.TypingModule._dispatcher);
            }

            patchGuilds(guildComponents) {
                if (!guildComponents?.Z) return;
                this.setupTypingHandler(INDICATOR_TYPES.GUILD, Modules.TypingModule._dispatcher);
            }
        };
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
