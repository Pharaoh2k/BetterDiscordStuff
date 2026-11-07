# [ServerSearch](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=ServerSearch "ServerSearch") Changelog

### 1.0.5
- Update notices from Pharaoh2k's plugins are now combined into one "Plugin Updater" notification with an Update All button, like BetterDiscord's own addon updater, instead of one popup per plugin
- The built-in updater steps aside while Plugin Hub is enabled and manages the plugin, so updates arrive reviewed through the hub

### 1.0.4
- Fixed Discord crashing on startup after a Discord update, when the plugin could no longer find the server list styles

### 1.0.3
- Fixed the update notification staying stuck on screen after clicking Update, Dismiss or its close button, working around a BetterDiscord bug

### 1.0.2
- Fixed a slowdown across Discord introduced in 1.0.1, where the rule that moves the "NEW" indicator made Discord restyle the whole app whenever anything was added to the page

### 1.0.1
- Fixed Discord crashing when hovering a server in the search list or moving through it with the arrow keys after a Discord update
- Fixed Discord's "NEW" unread servers indicator covering the search button; it now sits just above it

### 1.0.0
- Initial public release
- Search button pinned below the server list that opens a list of all your servers
- Filters your servers as you type, with the best matches first and the matching text highlighted
- Ignores case, accents and styled letters, and also finds servers by the initials shown on servers without an icon
- Shows the folder each server is in and finds servers by their folder's name
- Shows mention counts and unread dots for each server
- Keyboard controls: arrow keys to select, Enter to open, Esc to close
- Automatic update checking with changelog display
