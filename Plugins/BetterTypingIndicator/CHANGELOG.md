# [BetterTypingIndicator](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=BetterTypingIndicator "BetterTypingIndicator") Changelog

### 2.9.2
- Updated to match Discord changes
- 
### 2.9.1
- Updated to match Discord changes
- Improved update-checker

### 2.9.0
- Made plugin version single-source: added PLUGIN_NAME/META_VERSION and wired CONFIG.info.version to BdApi meta.
- Migrated helper functions to arrow style and split parseChangelog into smaller helpers for lower complexity.
- Converted manual visualKeys array checks to a Set and replaced .forEach loops with for…of for lint compliance.
- Added BetterDiscord Hooks (useStateFromStores, useData) for channel typing indicators and settings merge, plus a wrapper component to consume them.
- Introduced unified settings merge (mergeSettings/useMergedSettings/SettingsPanelContainer) using defaults + stored values.
- Refactored typing flow to reduce custom state: replaced states map with streamlined typingState helpers (hasTyping, getTypingUsersFor) and integrated TypingStore directly for channels.
- Cleaned up redundant logic (duplicate wrapper, unused empty objects) and kept dispatcher-driven updates for performance.

### 2.8.2
- Replaced update system with streamlined UpdateManager class
- Updates now fetch changelog directly from GitHub
- Improved plugin load time and overall stability

### 2.8.1
- Improved code cleaned up and refactored
- Improved changelog popup
- Improved update system

### 2.6.2
- Added non-intrusive update banner at top of Discord when updates are available
- Improved update checks now run every 24 hours instead of hourly (plus on Discord startup)
- Improved per-mirror cache validators (ETag/Last-Modified) are saved and reused to avoid unnecessary downloads
- Improved update flow now uses native BetterDiscord notice system for consistency

### 2.6.0
- Added auto-update system with user toggle (hourly checks; immediate check on enable)
- Added primary + fallback fetch strategies; non-blocking checks; reload on success
- Added DOM selector adapter layer for channel/guild/folder/home with multiple fallbacks and caching
- Improved safer indicator mounting; robust cleanup for cached elements when DOM nodes are detached (runs element-cache GC on mutation batches)
- Improved selector adapter: faster cache invalidation and smarter fallback scan to reduce false positives
- Improved diagnostics: single consolidated warning for missing/changed modules with per-key dedupe

### 2.5.1
- Fixed critical settings panel crash when BD UI utilities unavailable
- Fixed CSS animation delays affecting all Discord SVGs without breaking animations
- Fixed tooltip cleanup removing tooltips from other components
- Fixed inconsistent muted channel detection across channel types
- Fixed memory leak from missing style cleanup on plugin stop
- Fixed MutationObserver compatibility with different BD hosts
- Fixed incorrect tooltip background color inheritance
- Improved better tooltip lifecycle management with scoped cleanup
- Improved more reliable React root caching and validation
- Improved normalized muted channel checks for forums and threads
- Added visual settings detection for showCount and tooltipStyle options
- Added accessibility support for users who prefer reduced motion
- Added fallback settings panel for older BetterDiscord versions

### 2.5.0
- Fixed indicator background cleanup issues
- Fixed tooltip persistence and positioning problems
- Fixed React component unmounting warnings
- Fixed crashes with undefined users
- Added user avatars in typing indicators with customizable styles (circle, square, hexagon)
- Added avatar size adjustment (12-24px)
- Added online status indicators on avatars
- Added enhanced tooltip system with multiple display modes (names, avatars, both, none)
- Added support for forum channel thread typing indicators
- Added React 18 compatibility with createRoot API
- Improved performance with debounced reloads and cached React roots
- Improved memory management and cleanup procedures
- Improved support for new Discord username system
