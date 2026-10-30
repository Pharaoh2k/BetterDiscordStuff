# [BetterRelativeTimestamps](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=BetterRelativeTimestamps "BetterRelativeTimestamps") Changelog

### 1.1.8
- Fixed the relative time showing up in the wrong place (or next to the wrong timestamp) after Discord or another plugin re-renders a message, for example MessageLoggerV2 edit history
- Fixed the relative time not updating to the newest edit time when a message is edited again
- Fixed turning a setting on or off rewriting every timestamp on screen

### 1.1.7
- Fixed the plugin failing to start on BetterDiscord 1.14
- Added a "View Changelog" button to the settings

### 1.1.6
- Improved copy behavior: relative timestamps are no longer selectable or copied along with message text

### 1.1.5
- Refactored and improved code

### 1.1.4
- Improved updates manager reliability

### 1.1.3
- Fixes settings save/load (persistence)

### 1.1.2
- Improved updates manager
- Improved code quality

### 1.1.1
- Added updates manager
- Added auto-update-checker

### 1.1.0
- Fixed future timestamps showing incorrectly (e.g., "-5m ago" instead of "in 5m")
- Fixed "Just now ago" bug for zero-second timestamps
- Added memory leak prevention for disconnected DOM elements
- Improved performance with targeted DOM scanning
- Added comprehensive error handling with optional debug logging
- Fixed scheduling issues with negative modulo operations
- Simplified host element tracking with direct references
- Added support for root element scanning
- Improved timer precision using milliseconds
- Added smart "Just now" scheduling when hiding seconds

### 1.0.2
- Fixed settings panel real-time updates
- Improved relative timestamp formatting

### 1.0.1
- Fixed timestamp visibility tracking
- Improved performance with IntersectionObserver

### 1.0.0
- Initial release
- Live-updating relative timestamps
- Smart update intervals based on time units
- Settings for display customization
