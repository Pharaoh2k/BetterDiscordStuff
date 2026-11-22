# BoosterContextMenu

A BetterDiscord plugin that lets you right-click the boosters on a server's Server Boosts page to open their user menu, just like in chat.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)
[![GitHub stars](https://img.shields.io/github/stars/Pharaoh2k/BetterDiscordStuff?style=social)](https://github.com/Pharaoh2k/BetterDiscordStuff)

### If you use BoosterContextMenu, please star ⭐ the repo. It's free of charge and only takes a moment. :)

## 📖 Description

The "Recent Activity" list on a server's Server Boosts page shows who boosted the server, but Discord gives you no way to do anything with those names. Right-clicking a booster does nothing, so finding out who someone is means hunting for them in the member list or in chat.

BoosterContextMenu makes those names behave like everywhere else in Discord. Right-click a booster and you get Discord's own user menu, the same one you get by right-clicking their name in chat.

## ✨ Features

- **🖱️ Right-Click Boosters**: Opens the user menu for anyone in the Server Boosts "Recent Activity" list
- **👤 Discord's Own Menu**: Profile, message, mention, notes, roles, moderation actions and Copy User ID, exactly as in chat
- **🧩 Plays Well With Others**: Menu items added by other plugins show up too
- **💎 Every Boost**: Works on boosts that were given, are expiring or have expired
- **🪶 Lightweight**: No patches to Discord's components, it only listens for right-clicks
- **🔄 Auto Updates**: Automatic update checking with changelog display every 24 hours

## 📦 Installation

1. Download [BoosterContextMenu.plugin.js](https://github.com/Pharaoh2k/BetterDiscordStuff/releases/download/plugins/BoosterContextMenu.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

1. Open a server's Server Boosts page from the channel list
2. Right-click any booster in the "Recent Activity" list
3. Pick an option from the menu, for example **Profile** to see who they are

## ⚙️ Settings

Access settings through Discord Settings → Plugins → BoosterContextMenu ⚙️

- **Automatic Updates**: Checks for updates on startup and every 24 hours (enabled by default)
- **Check for Updates**: Manually check if a new version is available
- **View Changelog**: View the complete changelog for this plugin

## ⚠️ Important Notes

- The menu shows the same options Discord would show you anywhere else, so moderation actions only appear if you have the permissions for them
- Options that act on a channel, like **Mention**, use the channel you last had open in that server
- Some features may not work correctly if Discord updates their internal structure

## 🔧 Troubleshooting

### Nothing happens on right-click?
- Make sure the plugin is enabled in Discord Settings → Plugins
- Reload Discord (Ctrl+R) and check the Discord console (Ctrl+Shift+I) for error messages

### Update issues?
- Manually check for updates from the settings panel
- Re-download and replace the plugin file if automatic updates fail
- Check the Discord console (Ctrl+Shift+I) for error messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Ensure submissions align with the project's guidelines and coding standards.

## 📝 License

Copyright © 2025-present Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BoosterContextMenu/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- BetterDiscord community for the plugin API

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BoosterContextMenu/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
