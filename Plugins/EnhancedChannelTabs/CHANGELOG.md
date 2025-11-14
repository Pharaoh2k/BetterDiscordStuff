# [EnhancedChannelTabs](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=EnhancedChannelTabs "EnhancedChannelTabs") Changelog

## 3.1.0
- Replaced incorrect and obsolete Discord CSS vars with current ones
- Replaced var with const/let for modern JavaScript practices
- Simplified complex nested ternaries into readable if-statements
- Replaced Object.assign with object spread syntax {...obj}
- Changed .forEach() to for...of loops for better performance
- Fixed negated conditions for better readability
- Removed redundant code and self-assignments
- Applied consistent filtering with Boolean helper
- Removed unused function parameters (favIndex)
- Used childNode.remove() instead of parentNode.removeChild()
- Moved pure functions (expDecay) to outer scope to prevent recreation on render
- Removed duplicate method implementations (made methods call standalone functions)
- Fixed comma operator misuse in arrow functions (converted to block body)
- Centralized all styles into a dedicated StyleManager class for better maintainability
- Moved all CSS strings from applyStyle() into StyleManager static methods
- Extracted all inline React styles into StyleManager.inlineStyles object
- Created reusable style helper methods (applyHoverEffect, removeHoverEffect)
- Separated dynamic styles into dedicated methods (getTabListMenuNameStyle, getDropdownMenuPosition)
- Refactored applyStyle() to use centralized StyleManager for all style operations
- Improved style organization with clear separation between CSS strings and JS style objects
- Fixed a few minor non-breaking code issues
- Fixed Ctrl+Shift+T keybind throwing error due to undefined variables
- Fixed click handler overwriting global onclick instead of using addEventListener
- Fixed potential crash when user data unavailable in DM status detection
- Fixed potential crash when fetching avatar URL for DM channels
- Fixed potential crash when typing store returns null/undefined
- Improved performance by caching guild channel lookups while keeping permission/mute checks live
- Added ARIA roles, labels, and keyboard navigation for tabs (Arrow keys, Enter, Space)
- Added keyboard support for favorite buttons (Enter, Space)
- Improved focus management for keyboard tab navigation
- Reduced imperative DOM manipulation in context menus by moving styles to CSS
 
## 3.0.8
- Merged the following upstream changes:
- Fixed the topbar preventing interaction with image viewer controls
- Fixed compatiblity with CollapsibleUI

### 3.0.7
- Added BetterVencord compatibility to the updater

### 3.0.6
- Fixed tabs not updating when navigating to channels/pages open in other tabs
- Fixed multiple tabs on the same channel not syncing properly
  
### 3.0.5
- Fixed Discord window resizing when double-clicking the new tab (+) button

### 3.0.4
- Added multi-row tab layout - tabs now wrap to multiple rows instead of scrolling
- Added quick toggle between single/multi-row modes using Ctrl+Mouse Wheel on tabs
- Fixed settings menu toggles and radio buttons not updating visually in real-time
- Improved performance when handling many tabs with CSS optimizations
- Added accessibility improvements with screen reader announcements
- Fixed browser warning about passive event listeners
- Improved scroll animations and responsiveness
- Added protection against accidental mode switches on sensitive trackpads
- Added auto-update-checker

### 3.0.3
- Fixed hiding the title bar for Discord stable changes
- Improved compatibility with latest Discord update

### 3.0.2
- Fixed Tab-Bar scrolling issues
- Improved scroll performance

### 3.0.1
- Fixed Hamburger menu checkboxes real-time update
- Improved checkbox state management

### 3.0.0
- Added Vertical tabs menu similar to Visual Studio
- Added per-tab history implementation
- Added Undo/Reopen Closed Tabs feature
- Fixed Hamburger menu checkboxes real-time update
