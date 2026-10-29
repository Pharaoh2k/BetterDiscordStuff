# BetterCharCounter

A BetterDiscord plugin that adds live character counters to the message box and other Discord inputs, so you always know how close you are to the limit.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

BetterCharCounter shows how many characters you have typed next to your limit, right in the corner of the message box. It knows whether your limit is 2,000 or 4,000 characters, counts long and multi-line messages exactly, and changes color as you get close, so you are never surprised by a "message too long" error. Profile notes, your custom status and the "Message @user" box in profile popouts get a counter too.

*Inspired by mwittrien/Devilbro's "CharCounter", rebuilt from scratch using modern BdApi (no BDFDB dependency).*

## ✨ Features

- **🔢 Live Counter**: Shows your character count and limit (for example `1250/2000`) as you type
- **💎 Nitro Aware**: Uses your real limit, 2,000 characters or 4,000 with Nitro
- **📏 Exact Counts**: Counts newlines in multi-line messages and long pastes past Discord's 4,500 character draft limit
- **📝 Notes & Status**: Counters on profile notes (256 characters), your custom status (128) and the "Message @user" box in profile popouts
- **🎨 Color Warnings**: Turns yellow at 70% and red at 90% of the limit
- **🎚️ Show Threshold**: Optionally hide the counter until you reach a percentage of the limit
- **🔄 Auto Updates**: Automatic update checking with changelog display every 24 hours

## 📦 Installation

1. Download [BetterCharCounter.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterCharCounter/BetterCharCounter.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

1. Start typing or paste text into the message box of any channel or DM
2. The counter appears in the bottom right corner of the message box as `count/limit`
3. Watch the color: it turns yellow at 70% of the limit and red at 90%
4. Once the count goes past the limit, Discord will refuse to send the message, so shorten it or split it with a plugin like [BetterSplitLargeMessages](../BetterSplitLargeMessages)

The same counter appears in the corner of a note in someone's full profile, above your custom status when you edit it, and below the "Message @user" box in profile popouts.

## ⚙️ Settings

Access settings through Discord Settings → Plugins → BetterCharCounter ⚙️

- **Show Percentage Threshold**: Only show the counter after reaching this percentage of the limit (0 by default, so it always shows)
- **Automatic Updates**: Checks for updates on startup and every 24 hours (enabled by default)
- **Check for Updates**: Manually check if a new version is available
- **View Changelog**: View the complete changelog for this plugin

## ⚠️ Important Notes

- The limit shown is Discord's own: 2,000 characters, or 4,000 with Nitro
- Custom emoji and mentions are counted as they appear in the message box, but Discord converts them before sending, so near the limit the count is a close guide rather than an exact match
- Some features may not work correctly if Discord updates their internal structure

## 🔧 Troubleshooting

### Counter not showing?
- Check that **Show Percentage Threshold** is not set higher than you expect
- The custom status counter appears from the second time you open the custom status window after starting Discord

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
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterCharCounter/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- BetterDiscord community for the plugin API
- mwittrien/Devilbro for the original CharCounter concept and inspiration

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterCharCounter/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
