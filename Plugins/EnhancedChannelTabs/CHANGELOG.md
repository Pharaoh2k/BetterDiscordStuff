# [EnhancedChannelTabs](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=EnhancedChannelTabs "EnhancedChannelTabs") Changelog

## 4.0.0
- Architecture & Persistence
  - Rebuilt around `TabStateStore` + `TabActions` (hook-driven `HookedTopBar`/`useStateFromStores`) instead of `TopBarRef`/Flux.
  - Tabs/favs/groups now get stable IDs (`generateTabId`/`ensureTabId`) and enforced history indices; sync helpers (`syncStoreFromSettings`/`syncSettingsFromStore`) keep store/config aligned.
  - Settings writes are debounced; legacy WScript self-installer removed.
- Drag & Drop / Organization
  - Added React-DnD for tabs/favs/groups with before/after/inside drop targets, hover detection, and drag opacity states.
  - Nested favorite groups: move favs between groups, reorder groups, reparent with cycle protection (`isDescendantGroup`).
  - New tab→fav flows (`addTabAsFavAt`, `addTabAsFavInGroup`) to drop tabs directly into bar or groups.
- Visuals & UX
  - New “Folder Drop Feedback” setting (`folderDropStyle`) with Accent Glow, Underline Sweep, Slot Highlight, Icon Pulse, Gradient Edge and matching CSS/drop indicators (`channelTabs-drop-before/after/inside`, `channelTabs-dragging`).
  - Tab list dropdown rebuilt with real tab items (live badges, minimize, middle-click close) and full tab context menus.
  - Badges now come from hooks (`useTabIndicators`, `useFavIndicators`, `useFavGroupIndicators`) using unread/mention/typing/presence stores; added closed-tab list styling, app-region no-drag fixes, system bar height support, improved badge alignment.
- Context Menus & Controls
  - All tab/fav/group/tab-list menus route through `TabActions` (switch/move/minimize/open-in-new-tab/move-to-group, etc.).
  - Navigation buttons, quick settings, layout toggles now operate via the store to keep selection/history consistent.
- Closed Tabs & History
  - Closed tabs get unique IDs/timestamps; reopen honors “always focus new tabs”.
  - History navigation uses stored `historyIndex` with clamping and `TabActions.isHistoryNavigation` guards to avoid duplicate pushes.
- Settings Changes
  - New `folderDropStyle` setting; favorite group empty-badge toggle normalized to `showEmptyFavGroupBadges` (replaces `showEmptyGroupFavBadges`).
  - All switches/sliders are synced via `STORE_SETTING_KEYS` into `TabStateStore` to keep UI and persisted settings aligned.
- Update Flow
  - Updater now prefers `BdApi.UI.showNotification` (with actions) and falls back to `showNotice`; stop closes notifications cleanly.
- Safety & Fallbacks
  - `warnModule` lookups for NavigationUtils, PermissionUtils, IconUtilities, UserStatusStore, UserTypingStore, Spinner, DragSource/DropTarget to avoid hard crashes on Discord changes.
  - `ensureGroupParent` normalizes parent IDs to prevent orphan/cyclic favorite groups.

## 3.1.3
- A minor adjustment

## 3.1.2
- Fixed plugin compatibility with latest Discord update (add a robust TitleBar detection)

## 3.1.1
- Fixed TopBar reference handling to resolve initialization timing issues caused by Discord update.

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
