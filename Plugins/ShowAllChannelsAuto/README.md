# ShowAllChannelsAuto
A BetterDiscord plugin that automatically enables "Show All Channels" for every Discord server.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

ShowAllChannelsAuto eliminates the hassle of manually enabling "Show All Channels" in every Discord server. This plugin automatically clears the guild flag that hides opt-in channels, ensuring you never miss out on channels you have access to but aren't aware of.

## ✨ Features

- **🔄 Automatic Enabling**: Automatically shows all available channels on startup
- **⚡ Real-Time Detection**: Enables channels immediately when switching servers
- **🚫 Server Exclusions**: Exclude specific servers from automatic enabling
- **🎯 Smart Detection**: Only acts when channels are actually hidden
- **🔄 Auto-Updates**: Stay current with automatic update checking
- **📜 Changelog Support**: View version history and updates
- **⚙️ Easy Configuration**: Simple settings panel with per-server controls

## 📦 Installation

1. Download [ShowAllChannelsAuto.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowAllChannelsAuto/ShowAllChannelsAuto.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

### Automatic Operation
Once enabled, the plugin works silently in the background:
1. **On Startup**: Checks all servers and enables hidden channels
2. **On Server Switch**: Immediately enables channels when you switch servers
3. **On Join**: Automatically enables channels when joining new servers

### Manual Control
- Click "Apply Now" in settings to immediately re-enable all servers
- Use server exclusions to prevent auto-enabling on specific servers

### Understanding "Show All Channels"
Discord's "Show All Channels" toggle lets you see opt-in channels you have access to but haven't manually joined. Many users don't know this toggle exists, missing out on channels they could access. This plugin ensures you always see what's available.

## ⚙️ Settings

### Server Exclusions
- **Collapsible Category**: View and manage excluded servers
- **Per-Server Toggles**: Check servers where you DON'T want auto-enabling
- **Sorted List**: Servers displayed alphabetically for easy navigation

### Updates
- **Automatic Updates**: Check for updates daily and on Discord startup
- **Manual Check**: Click "Check Now" to search for updates immediately
- **View Changelog**: Review all version changes and updates

### Quick Actions
- **Apply Now**: Manually trigger re-enabling for all non-excluded servers

## 🔧 Troubleshooting

### Plugin not working?
- Ensure the plugin is enabled in Settings → Plugins
- Try clicking "Apply Now" in plugin settings
- Reload Discord with Ctrl+R (Cmd+R on Mac)

### Channels not appearing?
- Check if the server is in your exclusion list
- Verify you actually have access to opt-in channels (check server settings manually)
- Some servers may not have any opt-in channels

### Settings panel won't open?
- Reload the plugin (disable and re-enable)
- Check console (Ctrl+Shift+I) for error messages
- Ensure you're on the latest version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👤 Author

**Pharaohk**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord: 874825550408089610

## 📝 License

Copyright © 2025 Pharaoh2k. All rights reserved.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Bug Reports](https://github.com/Pharaoh2k/BetterDiscordStuff/issues)
- [Plugin Source](https://github.com/Pharaoh2k/BetterDiscordStuff/tree/main/Plugins/ShowAllChannelsAuto)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowAllChannelsAuto/CHANGELOG.md)

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowAllChannelsAuto/CHANGELOG.md) for detailed version history.

---
Made with ❤️ for the BetterDiscord community
