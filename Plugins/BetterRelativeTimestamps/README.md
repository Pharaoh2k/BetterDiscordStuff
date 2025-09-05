# BetterRelativeTimestamps

A BetterDiscord plugin that adds live-updating relative timestamps to Discord messages.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

BetterRelativeTimestamps enhances Discord's timestamp display by adding dynamic relative time indicators that update in real-time. See at a glance how long ago messages were sent with smart update intervals that optimize performance.

## ✨ Features

- **⏱️ Live Updates**: Timestamps update automatically while you chat
- **🎯 Smart Cadence**: Updates every 500ms for seconds, less frequently for larger units
- **👁️ Visibility Tracking**: Only updates timestamps you can actually see
- **📅 Future Support**: Correctly handles scheduled messages with "in X time" format
- **🔄 Seamless Toggle**: Switch between relative-only or alongside absolute timestamps
- **⚡ Performance Optimized**: Chunked processing prevents UI freezing
- **🎨 Theme Compatible**: Inherits Discord's color scheme automatically
- **⚙️ Customizable**: Hide seconds for cleaner display

## 📦 Installation

1. Download [BetterRelativeTimestamps.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/BetterRelativeTimestamps/BetterRelativeTimestamps.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

Once enabled, the plugin works automatically:
- Relative timestamps appear next to or replace Discord's default timestamps
- Hover over any timestamp to see the full relative time in a tooltip
- Timestamps update live as you view the chat

## ⚙️ Settings

Access settings through Discord Settings → Plugins → BetterRelativeTimestamps ⚙️

- **Show alongside absolute time**: Display "— 5m ago" next to Discord's timestamp (default: on)
- **Show relative time only**: Replace Discord's timestamp entirely (default: off)
- **Hide seconds**: Skip seconds for cleaner display (default: off)
- **Enable debug logging**: Log errors to console for troubleshooting (default: off)

## 📋 Timestamp Format

- **Just now**: 0-59 seconds (or 0 seconds with hide seconds)
- **Xm ago**: Minutes
- **Xh Ym ago**: Hours and minutes
- **Xd Yh ago**: Days and hours
- **Xmo Yd ago**: Months and days
- **Xy Zmo ago**: Years and months
- **in X**: Future timestamps

## 🔧 Troubleshooting

### Timestamps not showing after channel switch?
- The plugin should detect channel changes automatically
- If issues persist, reload Discord with Ctrl+R (Cmd+R on Mac)

### Performance issues?
- The plugin uses intelligent update scheduling
- Enable debug logging to check for errors
- Try enabling "Hide seconds" to reduce update frequency

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

Copyright © 2025 Pharaoh2k. All rights reserved.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 👤 Author

- **Pharaoh2k** - *Developer*

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/BetterRelativeTimestamps/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
