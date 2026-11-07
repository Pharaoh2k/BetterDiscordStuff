# [PluginHub](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=PluginHub "PluginHub") Changelog

### 1.0.1
- The update notification now matches BetterDiscord's own: a count line, the list of plugins with versions, the hub icon, View updates and Update all buttons, and it stays until closed
- Update notifications now cover every installed plugin the hub knows by default, since Pharaoh2k's plugins hand their updates to the hub while it runs
- Added a public manages(name) method so other plugins' updaters can ask whether the hub handles them

### 1.0.0
- Initial public release
- Added a Plugin Hub page under the BetterDiscord header in Discord's settings, built on BetterDiscord's own settings-layout integration
- Added Browse, Installed and Updates tabs with search, sorting and tag filters
- Added install, update, enable, disable and uninstall actions, with a confirmation that shows author, file, source and integrity information
- Added download verification: byte size, SHA-256, @name and @version must match the index before a file is written
- Added commit-pinned downloads with a jsDelivr mirror fallback
- Added backups of replaced plugin files with restore from the card menu
- Added update checks on startup and on an interval, with a notification offering Update all, View and Later
- Added optional auto-update for first-party plugins or individual plugins
- Added NEW and UPDATED badges and a "mark everything as seen" button
- Added a changelog viewer using BetterDiscord's changelog modal
- Added support for additional index sources, shown as community sources, and local paths for development
- Added display of per-plugin security review results when the index provides them
