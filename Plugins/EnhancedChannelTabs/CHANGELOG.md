# [EnhancedChannelTabs](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=EnhancedChannelTabs "EnhancedChannelTabs") Changelog

## 5.0.2
- Fixed crash when previewing tabs in threads that contain the thread starter message

### 5.0.1
- Fixed middle-click to open guilds/channels in new tabs now working reliably

### 5.0.0
- Added Open in New Tab shortcut setting: Ctrl + Click, Middle Click, or Disabled
- Added full settings modal accessible from quick settings menu
- Added Tab Peek feature - hover over inactive tabs to preview channel messages without switching
- Added Tab Peek trigger options: Hover, Shift + Hover, or Middle Click
- Added configurable hover delay for Tab Peek (0.1s to 2s)
- Added adjustable Tab Peek preview height (10% to 60% of screen)
- Added configurable message count for Tab Peek (10 to 100 messages)
- Added typing indicator display option in Tab Peek previews
- Added NSFW channel handling for Tab Peek: Show, Obscure media, or Hide preview
- Added Tab Peek message display mode: Cozy or Compact
- Added Tab Peek group spacing sync with Discord's settings
- Added custom group spacing option when sync is disabled
- Added backdrop dimming control for Tab Peek (10% to 100%)
- Added Tab Peek scroll behavior options: Default scroll or Shift + Scroll
- Added TabPreviewStore for managing tab preview state
- Added TabPeekContext for NSFW media handling in previews
- Added TabPeekPortal component for rendering previews
- Added TabPeekPopout component with message rendering
- Improved CSS units from px to rem for better accessibility and scaling
- Improved settings modal styling with proper width constraints
- Improved slider units display (removed redundant text)

### 4.3.1
- Updated icons to match Discord changes

### 4.3.0
- Added Fixed Tab Width Mode
- Fixed "Reopen Last Channel on Startup"

### 4.2.1
- Improved updates manager reliability

### 4.2.0
- Added "Stacked" layout (Toolbar Top, Tabs Bottom)
- Added mouse-hover tooltips to tabs

### 4.1.9
- Updated a style to match Discord changes

### 4.1.8
- Fixed Tab Layout radio buttons to visually update immediately when clicked

### 4.1.7
- Updated a style to match Discord changes

### 4.1.6
- Rebranded all internal identifiers from `channelTabs` to `enhancedChannelTabs`
- Fixed click detection on favorite group buttons
- Updated all user-facing text to reference "EnhancedChannelTabs"
  
### 4.1.5
- Several more fixes to match Discord changes
- Fixed a couple of folder drag-and-drop issues
- A few other minor changes

### 4.1.4
- Updated (once more) to match Discord changes

### 4.1.3
- Updated to match Discord changes

### 4.1.2
- Improved empty and filled folders SVGs

### 4.1.1
- Fixed/Restored missing FolderIcon

### 4.1.0
- Implemented multiple UI/UX improvements and fixes

### 4.0.1
- Title bar now refreshes without reloading Discord

### 4.0.0
- Completely rebuilt how tabs are saved and managed for better stability
- Tabs, favorites, and groups now have unique IDs so they won't get mixed up
- Settings save more efficiently and won't slow things down
- You can now drag and drop tabs, favorites, and groups to rearrange them
- Favorites can be organized into nested folders with drag and drop
- Drop tabs directly into the favorites bar or into specific groups
- New "Folder Drop Style" setting with 5 visual styles: Accent Glow, Underline Sweep, Slot Highlight, Icon Pulse, and Gradient Edge
- Tab list dropdown now shows live badges and supports middle-click to close
- Improved badges for unread messages, mentions, typing indicators, and online status
- Right-click menus now work consistently across all tabs, favorites, and groups
- Navigation buttons and quick settings are more reliable
- Reopening closed tabs now respects your "always focus new tabs" preference
- Back/forward navigation works more predictably
- Renamed "Show Empty Group Badges" setting for clarity
- All settings now stay properly synced
- Added fallbacks to prevent crashes when Discord updates
- Fixed issues with orphaned or broken favorite groups

### 3.1.3
- A minor adjustment

### 3.1.2
- Fixed plugin compatibility with latest Discord update (add a robust TitleBar detection)

### 3.1.1
- Fixed TopBar reference handling to resolve initialization timing issues caused by Discord update.

### 3.1.0
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
 
### 3.0.8
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
