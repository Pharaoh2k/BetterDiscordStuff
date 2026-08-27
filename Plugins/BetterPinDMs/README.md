# BetterPinDMs

A BetterDiscord plugin that enhances DM pinning with category organization, drag & drop, unread tracking, keyboard shortcuts, and import/export functionality.

![Version](https://img.shields.io/badge/version-3.0.1-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

BetterPinDMs transforms how you manage your Discord Direct Messages by adding a dedicated **📌 PINNED DMs** section above your regular DM list. Organize your important conversations into color-coded categories, drag and drop to reorder, and never lose track of unread messages again.

*Inspired by mwittrien/Devilbro's "PinDMs" — rebuilt from scratch using modern BdApi (no BDFDB dependency).*

## ✨ Features

- **📌 Pinned DM Section**: Dedicated section above "Direct Messages" for your pinned conversations
- **🏷️ Custom Categories**: Create unlimited categories with custom names and colors
- **🎨 Color Coding**: Assign unique colors to each category for visual organization
- **🔄 Drag & Drop**: Reorder DMs and categories with intuitive drag and drop
- **🔢 Unread Tracking**: See unread message counts per category at a glance
- **⌨️ Keyboard Shortcuts**: Quick actions with customizable hotkeys
- **📁 Smart Categories**: Auto-organize DMs by Friends, Blocked, Bots, Groups, Active Today, and Muted
- **📤 Import/Export**: Backup your configuration or migrate from PinDMs plugin
- **🔄 Auto Updates**: Automatic update checking with changelog display
- **🎯 Discord Integration**: Seamlessly matches Discord's native theme and design
- **📊 Channel Counts**: Optional DM count display per category
- **🔕 Collapsible**: Collapse categories to keep your DM list tidy

## 📦 Installation

1. Download [BetterPinDMs.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterPinDMs/BetterPinDMs.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

### Pinning a DM
1. Right-click on any DM conversation
2. Select "Pin to..." from the context menu
3. Choose an existing category or create a new one
Alternatively - use Drag & Drop of any DM on an existing category (very convenient).

### Managing Categories
1. Go to Settings → Plugins → BetterPinDMs ⚙️
2. Scroll to "Custom Categories" section
3. Add, rename, recolor, or reorder your categories

### Drag & Drop
- Drag DMs between categories to reorganize
- Drag category headers to reorder entire categories
- Confirmation prompts can be enabled/disabled in settings

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + P` | Toggle pin/unpin current DM |
| `Ctrl + Shift + P` | Open quick category picker |
| `Ctrl + 1-9` | Jump to category 1-9 |

*All shortcuts are customizable in settings.*

## ⚙️ Settings

Access settings through Discord Settings → Plugins → BetterPinDMs ⚙️

### General
- **Show pin icons on categories**: Display 📌 icon on pinned category headers
- **Show pin icons on server list DMs**: Display pin indicator on DM avatars in server list
- **Show unread count per category**: Display total unread messages in category header
- **Show DM count per category**: Display number of DMs in each category
- **Confirm drag & drop changes**: Ask for confirmation before moving DMs

### Sort by Recent Message
- **DM list**: Sort pinned DMs by most recent message
- **Server-list Recents**: Sort server list recent DMs by activity

### Keyboard Shortcuts
- Enable/disable and customize key combinations for all shortcuts

### Predefined Categories
- **Friends**: Auto-category for friend DMs
- **Blocked**: Auto-category for blocked users
- **Bots**: Auto-category for bot DMs
- **Groups**: Auto-category for group DMs

### Smart Categories
- **Active Today**: Auto-category for DMs with activity today
- **Muted**: Auto-category for muted conversations

### Updates
- **Automatic Updates**: Check for updates every 24 hours
- **Check for Updates**: Manually check for new versions
- **View Changelog**: View complete version history

## 🔄 Import/Export

### Exporting Configuration
1. Open plugin settings
2. Click "Export Configuration"
3. Save the JSON file

### Importing Configuration
1. Open plugin settings
2. Click "Import Configuration"
3. Select a previously exported JSON file

### PinDMs Compatibility
BetterPinDMs can import configurations from the original PinDMs plugin by mwittrien/Devilbro, making migration seamless.

## ⚠️ Known Limitations

- Categories are stored per-user, not synced across devices (import/export feature is available).
- Some Discord updates may temporarily break functionality until plugin is updated

## 🔧 Troubleshooting

### Pinned section not appearing?
- Reload Discord with `Ctrl+R` (Cmd+R on Mac)
- Ensure the plugin is enabled in settings
- Check Discord console for error messages

### Categories not saving?
- Verify BetterDiscord has write permissions
- Try exporting and re-importing your configuration

### Drag & drop not working?
- Ensure "Confirm drag & drop changes" is configured as desired
- Check if another plugin is interfering

### After Discord update?
- Check for plugin updates in settings
- Re-enable the plugin if it was disabled
- Reload Discord

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterPinDMs/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- BetterDiscord community for the plugin API
- mwittrien/Devilbro for the original PinDMs concept and inspiration

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterPinDMs/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
