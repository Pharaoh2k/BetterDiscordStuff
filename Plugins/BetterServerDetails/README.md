# BetterServerDetails

A BetterDiscord plugin that displays detailed server information in a beautiful custom tooltip when hovering over servers in the server list.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

BetterServerDetails enhances your Discord experience by showing comprehensive server information at a glance. Simply hover over any server in your server list to see details like the owner, creation date, member count, and more — all in a sleek, customizable tooltip.

Inspired by ServerDetails by mwittrien/Devilbro, rebuilt from scratch using modern BdApi (no BDFDB dependency).

## ✨ Features

- **👑 Server Owner**: See who owns the server instantly
- **📅 Creation Date**: View when the server was created
- **🚪 Join Date**: See when you joined the server
- **👥 Member Count**: Total number of members
- **💬 Channel Count**: Total number of channels
- **🏷️ Role Count**: Number of roles in the server
- **⚡ Boost Status**: Server boost level and count
- **🌐 Language**: Server's preferred language/locale
- **🖼️ Server Icon**: Large preview of the server icon
- **🎨 Fully Customizable**: Adjust colors, sizes, and what information to display
- **🔄 Auto Updates**: Automatic update checking with changelog display
- **🎯 Theme Integration**: Seamlessly integrates with Discord themes

## 📦 Installation

1. Download [BetterServerDetails.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterServerDetails/BetterServerDetails.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

1. Hover over any server in your server list
2. A detailed tooltip will appear showing server information
3. Optionally hold Shift to show the tooltip (if configured)
4. Customize what information appears in the settings

## ⚙️ Settings

Access settings through Discord Settings → Plugins → BetterServerDetails ⚙️

### General
- **Only show on Shift**: Require holding Shift to display the tooltip

### Tooltip Items
Toggle visibility for each piece of information:
- Server icon
- Owner
- Creation date
- Join date
- Member count
- Channel count
- Role count
- Boosts
- Language

### Styling
- **Accent Color**: Customize borders, icon glow, and visual accents
- **Show Row Icons**: Display emoji icons next to each data field
- **Row Spacing**: Adjust space between rows (0-20px)

### Tooltip Display
- **Tooltip Width**: Adjust width (200-600px)
- **Tooltip Delay**: Set delay before tooltip appears (0-10 seconds)
- **Hide Native Tooltip**: Hide Discord's built-in tooltip while custom tooltip is visible
- **Include Time in Dates**: Add HH:MM to creation and join dates
- **Date Locale Override**: Set custom locale (e.g., en-US, de-DE)
- **Tooltip Background Color**: Custom solid color or default gradient

### Updates
- **Automatic Updates**: Check for updates every 24 hours
- **Check for Updates**: Manually check for plugin updates
- **View Changelog**: View complete version history

## 🔧 Troubleshooting

### Tooltip not appearing?
- Make sure the plugin is enabled
- Check if "Only show on Shift" is enabled in settings
- Reload Discord with Ctrl+R (Cmd+R on Mac)

### Missing information?
- Some data may not be available for all servers
- Ensure you have the necessary permissions in the server
- Try reloading Discord

### Styling issues?
- Reset colors to default in settings
- Check if other plugins are conflicting
- Verify your Discord theme compatibility

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterServerDetails/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- BetterDiscord community for the plugin API
- Inspired by ServerDetails by mwittrien/Devilbro
- Built with modern BdApi (BDFDB-free)

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterServerDetails/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community