# [BetterPinDMs](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=BetterPinDMs "BetterPinDMs") Changelog

### 2.2.0
- Updated to match Discord changes
- Modernized BdApi integration using new constructor pattern
- Improved changelog system with better error handling
- Enhanced category state management in settings to be fully reactive.
- Fixed modal value handling in category editor and quick picker
- Improved chevron icon loading reliability
- Code cleanup: removed unused constants, properties, and deprecated code
- Simplified error handling and logging

### 2.1.0
- Improved code quality and performance

### 2.0.1
- Fixed DM list auto-scrolling to wrong position when clicking pinned DMs

### 2.0.0
- This is a complete rewrite of BetterPinDMs with significant improvements to stability, performance, and user experience.
- The plugin now integrates directly with Discord's React system instead of manipulating the page after it loads. This means fewer glitches and faster updates!
- Visual indicators now show exactly where your DM will land when dragging
- Added clear highlighting for drop targets (top, bottom, or into a category)
- Improved update checks
- Improved error reporting
- Fixed keyboard shortcuts. They no longer trigger repeatedly when holding keys
- Improved compatibility with Discord's latest updates
- Fixed potential issues with unread message counts
- Added security protections against malicious configuration imports
- Reduced plugin file size
- Improved code organization
- Removed the Windows auto-installer popup


### 1.0.0
- Initial public release
- Added dedicated 📌 PINNED DMs section above Direct Messages
- Added custom categories with customizable names and colors
- Added drag & drop support for reordering DMs between categories
- Added drag & drop support for reordering category headers
- Added unread message count tracking per category
- Added DM count display per category
- Added predefined categories: Friends, Blocked, Bots, Groups
- Added smart categories: Active Today, Muted
- Added collapsible categories
- Added keyboard shortcuts: Toggle pin (Ctrl+P), Quick picker (Ctrl+Shift+P), Jump to category (Ctrl+1-9)
- Added customizable keyboard shortcut bindings
- Added import/export configuration to JSON
- Added PinDMs plugin configuration import compatibility
- Added pin icons on category headers and server list DMs
- Added sort by recent message option
- Added confirmation prompts for drag & drop actions
- Added automatic update checking with changelog display
- Built with modern BdApi (no ZeresPluginLibrary dependency)
- Full Discord theme integration
