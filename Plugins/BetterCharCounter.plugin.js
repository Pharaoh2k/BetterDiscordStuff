/**
 * @name BetterCharCounter
 * @version 1.0.1
 * @website https://x.com/_Pharaoh2k
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterCharCounter/BetterCharCounter.plugin.js
 * @authorId 874825550408089610
 * @description Adds a character counter to most Discord inputs with real-time updates and customizable display threshold.
 * @author Pharaoh2k
 */

module.exports = (() => {
    const CONFIG = {
        info: {
            name: "BetterCharCounter",
            authors: [{
                name: "Pharaoh2k",
                github_username: "Pharaoh2k",
                twitter_username: "_Pharaoh2k",
                discord_id: "874825550408089610"
            }],
            version: "1.0.1",
            description: "Adds a character counter to most Discord inputs with real-time updates and customizable display threshold."
        },
        defaultConfig: [
            {
                type: "slider",
                id: "showPercentage",
                name: "Show Percentage Threshold",
                note: "Only shows counter after reaching this percentage of max length",
                value: 0,
                min: 0,
                max: 100,
                markers: [0, 25, 50, 75, 100],
                stickToMarkers: true
            }
        ],
        changelog: {
            "1.0.1": {
                added: [
                    "Real-time character counting with 60fps throttling",
                    "Support for all Discord input types (chat, status, notes, nicknames)",
                    "Smooth fade-in animations",
                    "Percentage-based visibility threshold",
                    "Professional error handling and logging",
                    "Automatic cleanup when elements are removed"
                ],
                improved: [
                    "Performance with throttled updates and cached React roots",
                    "Module finding with multiple fallback methods",
                    "Memory management with WeakMap cleanup tracking",
                    "Nitro-aware message length detection"
                ],
                fixed: [
                    "Removed unused code for cleaner implementation",
                    "Improved zero-width character detection (now includes U+2060, U+180E)",
                    "Increased setup timeout for better reliability on slower connections",
                    "Improved handling of Discord's zero-width characters in empty inputs"
                ]
            },
            "1.0.0": {
                added: ["Initial Release"]
            },
        }
    };

    const maxLengths = {
        customstatus: 128,
        popoutnote: 256,
        profilenote: 256,
        nick: 32
    };

    const css = `
        .charCounter-added {
            position: relative !important;
            width: 100%;
        }
        .charCounter-counter {
            display: block;
            position: absolute;
            font-size: 15px;
            z-index: 10;
            pointer-events: none;
            color: var(--text-muted);
            transition: color 0.2s ease;
            font-weight: 500;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateY(5px);
        }
        .charCounter-counter.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .charCounter-chat {
            right: 16px;
            bottom: 0.3em;
        }
        .charCounter-edit {
            right: 0;
            bottom: -1.3em;
        }
        .charCounter-threadcreation {
            right: 16px;
            bottom: 0.3em;
        }
        .charCounter-userprofile {
            right: 0;
            bottom: -1.3em;
            font-size: 12px;
        }
        .charCounter-customstatus {
            right: 0 !important;
            top: -1.5em;
        }
        .charCounter-popoutnote {
            right: 3px !important;
            bottom: -8px !important;
            font-size: 10px !important;
        }
        .charCounter-profilenote {
            right: 0 !important;
            bottom: -10px !important;
            font-size: 12px !important;
        }
        .charCounter-nick {
            right: 0 !important;
            bottom: -1.3em !important;
            font-size: 12px !important;
        }
        .typing-2J1mf9 ~ .charCounter-counter {
            bottom: 1.8em;
        }
    `;

    class ErrorBoundary extends BdApi.React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false };
        }
        
        static getDerivedStateFromError() {
            return { hasError: true };
        }
        
        componentDidCatch(error, errorInfo) {
            BdApi.Logger.error("BetterCharCounter", "React Error:", error, errorInfo);
        }
        
        render() {
            if (this.state.hasError) {
                return null;
            }
            return this.props.children;
        }
    }

    function getConfigWithCurrentValues(current) {
        return CONFIG.defaultConfig.map(opt => ({
            ...opt,
            value: current[opt.id] ?? opt.value
        }));
    }

    return class BetterCharCounter {
        constructor() {
            this.settings = this.loadSettings();
            this.patches = [];
            this.cleanups = new WeakMap();
            this._debouncedReload = BdApi.Utils.debounce(() => this.reload(), 300);
            this.focusHandler = null;
        }

        getName() { return CONFIG.info.name; }
        getAuthor() { return CONFIG.info.authors[0].name; }
        getVersion() { return CONFIG.info.version; }
        getDescription() { return CONFIG.info.description; }

        loadSettings() {
            return {
                ...CONFIG.defaultConfig.reduce((acc, cfg) => ({
                    ...acc,
                    [cfg.id]: cfg.value
                }), {}),
                ...BdApi.Data.load("BetterCharCounter", "settings")
            };
        }

        saveSettings(newSettings) {
            this.settings = {
                ...this.settings,
                ...newSettings
            };
            BdApi.Data.save("BetterCharCounter", "settings", this.settings);
            
            if (Object.keys(newSettings).some(key => ['showPercentage'].includes(key))) {
                this._debouncedReload();
            }
        }

        showChangelog() {
            const lastVersion = BdApi.Data.load("BetterCharCounter", "lastVersion");
            
            if (!lastVersion) {
                BdApi.Data.save("BetterCharCounter", "lastVersion", CONFIG.info.version);
                return;
            }
            
            if (lastVersion === CONFIG.info.version) {
                return;
            }
            
            const changes = [];
            const titles = {
                fixed: "Fixes",
                added: "Features",
                improved: "Improvements"
            };
            
            for (const [version, changelog] of Object.entries(CONFIG.changelog)) {
                if (version === lastVersion) break;
                
                for (const [type, messages] of Object.entries(changelog)) {
                    let change = changes.find(x => x.type === type);
                    if (!change) {
                        change = {
                            title: titles[type],
                            type,
                            items: []
                        };
                        changes.push(change);
                    }
                    change.items.push(...messages);
                }
            }
            
            BdApi.Data.save("BetterCharCounter", "lastVersion", CONFIG.info.version);
            
            if (changes.length > 0) {
                BdApi.UI.showChangelogModal({
                    title: CONFIG.info.name,
                    subtitle: `Version ${CONFIG.info.version}`,
                    changes
                });
            }
        }

        getSettingsPanel() {
            if (typeof BdApi.UI.buildSettingsPanel === "function") {
                return BdApi.UI.buildSettingsPanel({
                    settings: getConfigWithCurrentValues(this.settings),
                    onChange: (_, id, value) => this.saveSettings({ [id]: value })
                });
            }
            
            const panel = document.createElement("div");
            panel.style.padding = "10px";

            const title = document.createElement("h2");
            title.textContent = "BetterCharCounter Settings";
            title.style.marginBottom = "20px";
            panel.appendChild(title);

            const sliderContainer = document.createElement("div");
            sliderContainer.style.marginBottom = "10px";
            
            const label = document.createElement("div");
            label.textContent = `Show counter after ${this.settings.showPercentage}% of max length`;
            label.style.marginBottom = "5px";
            sliderContainer.appendChild(label);

            const slider = document.createElement("input");
            slider.type = "range";
            slider.min = "0";
            slider.max = "100";
            slider.value = this.settings.showPercentage;
            slider.style.width = "100%";
            
            slider.addEventListener("input", (e) => {
                const value = parseInt(e.target.value);
                label.textContent = `Show counter after ${value}% of max length`;
                this.saveSettings({ showPercentage: value });
            });

            sliderContainer.appendChild(slider);
            panel.appendChild(sliderContainer);

            return panel;
        }

        start() {
            BdApi.DOM.addStyle("BetterCharCounter", css);
            this.getModules();
            this.patchTextArea();
            this.patchCustomStatus();
            this.patchNotes();
            this.patchNickname();
            
            setTimeout(() => this.addCountersToExistingInputs(), 500);
            
            this.focusHandler = (e) => {
                const input = e.target;
                if ((input.matches("[role='textbox']") || input.matches("textarea") || input.matches("[contenteditable='true']")) 
                    && !input.closest(".charCounter-added")) {
                    this.addCounterToElement(input);
                }
            };
            document.addEventListener("focusin", this.focusHandler, true);
            
            this.showChangelog();
        }

        stop() {
            BdApi.DOM.removeStyle("BetterCharCounter");
            this.patches.forEach(unpatch => {
                try { unpatch(); } catch (e) { }
            });
            this.patches = [];
            
            if (this.focusHandler) {
                document.removeEventListener("focusin", this.focusHandler, true);
                this.focusHandler = null;
            }

            document.querySelectorAll(".charCounter-counter").forEach(el => el.remove());
        }

        reload() {
            this.stop();
            this.start();
        }

        getModules() {
            const { Filters, getStore, getModule } = BdApi.Webpack;
            
            this.modules = {
                React: BdApi.React,
                ReactDOM: BdApi.ReactDOM,
                UserStore: getStore("UserStore"),
                Constants: getModule(Filters.byKeys("MAX_MESSAGE_LENGTH"))
            };

            this.modules.NitroUtils = getModule(m => m?.canUseIncreasedMessageLength) ||
                                      getModule(m => m?.default?.canUseIncreasedMessageLength) ||
                                      getModule(Filters.byKeys("canUseIncreasedMessageLength"));
        }

        patchTextArea() {
            const ChannelTextArea = BdApi.Webpack.getModule(m => 
                m?.type?.displayName === "ChannelTextAreaContainer",
                { searchExports: true }
            );
            
            if (!ChannelTextArea) {
                BdApi.Webpack.waitForModule(m => 
                    m?.type?.displayName === "ChannelTextAreaContainer",
                    { signal: new AbortController().signal }
                ).then(module => {
                    if (module) this.patchTextAreaModule(module);
                });
                return;
            }

            this.patchTextAreaModule(ChannelTextArea);
        }

        patchTextAreaModule(ChannelTextArea) {
            const unpatch = BdApi.Patcher.after("BetterCharCounter", ChannelTextArea, "type", (_, args, ret) => {
                try {
                    if (!ret || !ret.props || ret.props.disabled) return;
                    
                    const editor = BdApi.Utils.findInTree(ret, 
                        e => e?.props?.type?.analyticsName || e?.props?.type,
                        { walkable: ["props", "children"] }
                    );
                    
                    if (!editor) return;
                    
                    const type = editor.props.type.analyticsName || editor.props.type || "chat";
                    this.injectCounter(ret, type);
                } catch (e) {
                    BdApi.Logger.error("BetterCharCounter", "Error in ChannelTextArea patch", e);
                }
            });
            
            this.patches.push(unpatch);
        }

        patchCustomStatus() {
            const [CustomStatusModal, key] = BdApi.Webpack.getWithKey(
                m => m?.displayName === "CustomStatusModal" || m?.default?.displayName === "CustomStatusModal"
            );
            
            if (!CustomStatusModal) return;

            const target = CustomStatusModal[key] || CustomStatusModal.default || CustomStatusModal;
            const unpatch = BdApi.Patcher.after("BetterCharCounter", target, "default", (_, args, ret) => {
                try {
                    if (!ret) return;
                    
                    const inputContainer = BdApi.Utils.findInTree(ret, 
                        e => e?.props?.className?.includes?.("emojiInputContainer"),
                        { walkable: ["props", "children"] }
                    );
                    
                    if (inputContainer) {
                        this.injectCounter(inputContainer, "customstatus");
                    }
                } catch (e) {
                    BdApi.Logger.error("BetterCharCounter", "Error in CustomStatus patch", e);
                }
            });
            
            this.patches.push(unpatch);
        }

        patchNotes() {
            const Note = BdApi.Webpack.getModule(m => m?.default?.displayName === "Note");
            if (!Note) return;

            const unpatch = BdApi.Patcher.after("BetterCharCounter", Note, "default", (_, args, ret) => {
                try {
                    if (!ret) return;
                    
                    const isPopout = args[0]?.className?.includes?.("popout");
                    const type = isPopout ? "popoutnote" : "profilenote";
                    
                    this.injectCounter(ret, type);
                } catch (e) {
                    BdApi.Logger.error("BetterCharCounter", "Error in Note patch", e);
                }
            });
            
            this.patches.push(unpatch);
        }

        patchNickname() {
            const NicknameSection = BdApi.Webpack.getModule(m => 
                m?.default?.displayName === "NicknameSection" ||
                m?.displayName === "NicknameSection"
            );
            
            if (!NicknameSection) return;

            const target = NicknameSection.default || NicknameSection;
            const unpatch = BdApi.Patcher.after("BetterCharCounter", target, "default", (_, args, ret) => {
                try {
                    if (!ret || !ret.props) return;
                    
                    if (ret.props.pendingNick !== undefined) {
                        this.injectCounter(ret, "nick");
                    }
                } catch (e) {
                    BdApi.Logger.error("BetterCharCounter", "Error in Nickname patch", e);
                }
            });
            
            this.patches.push(unpatch);
        }

        injectCounter(element, type) {
            if (!element) return;

            const originalRender = element.type || element;
            element.type = function(...args) {
                const result = originalRender.apply(this, args);
                
                if (result && result.props) {
                    if (!Array.isArray(result.props.children)) {
                        result.props.children = [result.props.children];
                    }
                    
                    result.props.className = BdApi.Utils.className(
                        result.props.className,
                        "charCounter-added"
                    );
                    
                    const counter = BdApi.React.createElement(ErrorBoundary, null,
                        BdApi.React.createElement("div", {
                            className: `charCounter-counter charCounter-${type}`,
                            ref: (el) => {
                                if (el && !this.cleanups.has(el)) {
                                    this.setupCounter(el, type);
                                }
                            }
                        })
                    );
                    
                    result.props.children.push(counter);
                }
                
                return result;
            }.bind(this);
            
            Object.assign(element.type, originalRender);
        }

        setupCounter(counterEl, type) {
            BdApi.DOM.onRemoved(counterEl, () => {
                this.cleanupCounter(counterEl);
            });

            setTimeout(() => {
                const input = this.findInputElement(counterEl.parentElement);
                if (!input) return;

                counterEl._input = input;
                counterEl._type = type;
                counterEl._lastLength = -1; // Track last length to avoid redundant updates
                
                this.updateCounter(counterEl, type);
                
                requestAnimationFrame(() => {
                    counterEl.classList.add("visible");
                });
                
                const updateFunc = this.createThrottledUpdate(counterEl, type);
                
                const events = ['keydown', 'keyup', 'paste', 'cut', 'compositionupdate'];
                events.forEach(event => {
                    input.addEventListener(event, updateFunc);
                });
                
                this.cleanups.set(counterEl, {
                    updateFunc,
                    events,
                    input
                });
            }, 200);
        }

        cleanupCounter(counterEl) {
            const cleanup = this.cleanups.get(counterEl);
            if (!cleanup) return;
            
            // Remove event listeners
            if (cleanup.input && cleanup.updateFunc && cleanup.events && cleanup.events.length > 0) {
                cleanup.events.forEach(event => {
                    cleanup.input.removeEventListener(event, cleanup.updateFunc);
                });
            }
            
            this.cleanups.delete(counterEl);
        }

        updateCounter(counterEl, type) {
            if (!counterEl || !counterEl.parentElement) return;
            
            const input = counterEl._input || this.findInputElement(counterEl.parentElement);
            if (!input) return;
            
            if (!counterEl._input) {
                counterEl._input = input;
            }
            
            const text = this.getInputText(input);
            const length = text.length;
            
            if (counterEl._lastLength === length) return;
            counterEl._lastLength = length;
            
            const maxLength = this.getMaxLength(type);
            const percentage = (length / maxLength) * 100;
            
            if (percentage < this.settings.showPercentage && length === 0) {
                counterEl.style.display = "none";
                return;
            }
            
            counterEl.style.display = "block";
            counterEl.textContent = `${length}/${maxLength}`;
            
            if (percentage >= 90) {
                counterEl.style.color = "var(--status-danger)";
            } else if (percentage >= 70) {
                counterEl.style.color = "var(--status-warning)";
            } else {
                counterEl.style.color = "var(--text-muted)";
            }
        }

        createThrottledUpdate(el, type) {
            let timeout;
            let lastUpdate = 0;
            const delay = 25; 
            
            return () => {
                const now = Date.now();
                const timeSinceLastUpdate = now - lastUpdate;
                
                if (timeSinceLastUpdate >= delay) {
                    this.updateCounter(el, type);
                    lastUpdate = now;
                } else {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        this.updateCounter(el, type);
                        lastUpdate = Date.now();
                    }, delay - timeSinceLastUpdate);
                }
            };
        }

        getMaxLength(type) {
            if (maxLengths[type]) return maxLengths[type];
            
            const canUseExtended = this.modules.NitroUtils?.canUseIncreasedMessageLength?.(
                this.modules.UserStore?.getCurrentUser?.()
            );
            
            const constants = this.modules.Constants;
            if (constants) {
                return canUseExtended ? 
                    (constants.MAX_MESSAGE_LENGTH_PREMIUM || 4000) : 
                    (constants.MAX_MESSAGE_LENGTH || 2000);
            }
            
            return canUseExtended ? 4000 : 2000;
        }

        findInputElement(container) {
            if (!container) return null;
            
            const selectors = [
                "[role='textbox'][data-slate-editor='true']",
                "[role='textbox']",
                "textarea",
                "input[type='text']",
                "[contenteditable='true']",
                ".slateTextArea-27tjG0",
                ".slateTextArea_ec4baf"
            ];
            
            for (const selector of selectors) {
                const input = container.querySelector(selector);
                if (input) return input;
            }
            
            return null;
        }

        getInputText(input) {
            if (!input) return "";
            
            if (input.hasAttribute("contenteditable") || input.classList.contains("slateTextArea-27tjG0")) {
                const text = input.textContent || "";
                return text
                    .replace(/[\u200B\u200C\u200D\uFEFF\u2060\u180E]/g, "")
                    .trim();
            }
            
            return input.value || "";
        }

        addCountersToExistingInputs() {
            const inputs = document.querySelectorAll("[role='textbox'][data-slate-editor='true'], [role='textbox'], textarea, [contenteditable='true']");
            inputs.forEach(input => {
                const parent = input.parentElement;
                if (parent && !parent.querySelector(".charCounter-counter") && !input.closest(".charCounter-added")) {
                    this.addCounterToElement(input);
                }
            });
        }

        addCounterToElement(input) {
            const parent = input.parentElement;
            if (!parent || parent.querySelector(".charCounter-counter")) return;
            
            parent.classList.add("charCounter-added");
            
            const counter = document.createElement("div");
            counter.className = "charCounter-counter charCounter-chat";
            parent.appendChild(counter);
            
            this.setupCounter(counter, "chat");
        }
    };
})();
