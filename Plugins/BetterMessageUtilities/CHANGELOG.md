# [BetterMessageUtilities](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=BetterMessageUtilities "BetterMessageUtilities") Changelog

### 1.1.0
- Added a confirmation dialog when deleting other users' messages, with a toggle in settings
- Added a toast notification option for the Open Reactions Menu action
- Completely redesigned the settings panel with a modern card-based layout — each action now has its own card with inline controls for keybind, click type, toast, and enable/disable
- Settings now update in real-time without needing to close and reopen the panel
- Improved "Clear on Escape" to properly clear Discord drafts instead of manipulating the input field directly
- Improved the Open Reactions Menu to more reliably detect and click the reaction button
- Smarter keybind matching — when multiple bindings match, the most specific (longest) key combination is now preferred
- Added a window blur handler to prevent modifier keys from getting stuck when switching windows
- Pin/Unpin now checks for Manage Messages permission before attempting the action
- Updated the changelog modal to display changes grouped by version for better readability
- Fixed pressed keys getting stuck when Alt-Tabbing or switching windows
- Fixed a potential error when clicking on non-Element targets in the message list
- Migrated to a scoped BdApi instance for better plugin isolation
- Updated Discord module loading to use native store references
- Replaced custom version comparison with BetterDiscord's built-in utility
- Switched to BdApi.Logger for cleaner console output
- Removed legacy fallbacks and debug globals
- Simplified and cleaned up the UpdateManager

### 1.0.5
- Improved updates manager reliability

### 1.0.4
- Improved class selector

### 1.0.3
- Updated to match Discord changes (class selector)

### 1.0.2
- Updated to match Discord changes
- Improved update-checker

### 1.0.1
- Switched to BetterDiscord's buildSettingsPanel API
- Added radio buttons for click type selection
- Improved settings organization with categories
- Code cleanup and optimization

### 1.0.0
- Initial release
- Added customizable hotkeys for message actions
- Added delete message functionality
- Added edit message functionality  
- Added pin/unpin message functionality
- Added reply to message functionality
- Added copy raw message functionality
- Added copy message link functionality
- Added configurable toast notifications
- Added clear input on escape option

### 0.9.0
- Beta testing version
- Core functionality implementation
