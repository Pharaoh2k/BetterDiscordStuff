# EnhancedChannelTabs
A BetterDiscord plugin that brings browser-style tabs and bookmarks to Discord.

![Version](https://img.shields.io/badge/version-5.1.1-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

EnhancedChannelTabs transforms your Discord experience with a powerful tab system similar to web browsers. Open multiple channels in tabs, bookmark your favorites, and navigate with ease using keyboard shortcuts. Never lose track of important conversations again.

## ✨ Features

### Core Features
- **🔖 Browser-Style Tabs**: Open multiple channels/servers in separate tabs
- **⭐ Bookmarks Bar**: Save frequently visited channels as favorites
- **📁 Favorite Groups**: Organize bookmarks into collapsible groups
- **🔄 Tab History**: Each tab maintains its own navigation history
- **↩️ Restore Closed Tabs**: Undo tab closures with Ctrl+Shift+T
- **🎯 Smart Context Menus**: Right-click channels to open in new tab or bookmark, straight into any folder
- **📑 Multi-Row Tabs**: Tabs wrap to multiple rows when space is limited
- **🧲 Drag Anything In**: Drag server icons, channels, DMs and channel links onto the tab bar, the favorites bar or a folder
- **✅ Mark as Read**: Mark a tab, a favorite or a whole folder as read
- **🔗 Copy Links and IDs**: Copy a tab's or favorite's link, plus its server, channel and user IDs in developer mode
- **👥 Multiple Accounts**: Each Discord account keeps its own tabs and favorites, and switching accounts reopens that account's last tab

### Visual Enhancements
- **🎨 Compact Mode**: Smaller tabs for more screen space
- **🔒 Privacy Mode**: Obscures sensitive text in tabs
- **⭕ Radial Status Indicators**: Modern circular status borders
- **📊 Badge System**: Unread counts, mentions, and typing indicators
- **🖱️ Drag & Drop**: Reorder tabs and favorites by dragging
- **🔄 Dynamic Layout**: Toggle between single-row scrolling, multi-row wrapping or stacked (Toolbar Top, Tabs Bottom)
- **🧭 Page Icons**: Friends, Nitro, Shop, Quests and Discover tabs use Discord's own icons and names
- **📏 Sizing**: Set the minimum and maximum tab width and scale the whole bar
- **⭐ One-Row Favorites**: Keep favorites on one row and reach the rest from an overflow menu
- **🪟 Discord Title Bar**: Optionally keep Discord's own title row above the tabs

### Navigation
- **⌨️ Keyboard Shortcuts**: Full keyboard navigation support
- **⏮️ Navigation Buttons**: Forward/back buttons for each tab
- **📜 Dropdown Menu**: Quick access to all open tabs
- **🔍 Per-Tab History**: Browser-like back/forward navigation
- **🖱️ Mouse Wheel Control**: Ctrl+Wheel to switch tab layout modes

## 📦 Installation

1. Download [EnhancedChannelTabs.plugin.js](https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/EnhancedChannelTabs.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

### Basic Operations
- **Open in New Tab**: Right-click any channel/DM/server → EnhancedChannelTabs → Open in new tab, use the Open in New Tab Shortcut (Ctrl+Click or Middle Click), or drag it onto the tab bar
- **Add Bookmark**: Right-click → EnhancedChannelTabs → Save as bookmark (pick a folder from its submenu), or drag it onto the favorites bar or a folder
- **Replace a Tab**: Drag a channel, DM or favorite onto the middle of a tab
- **Close Tab**: Click the × on the tab or press Ctrl+W
- **Switch Tabs**: Click on any tab or use Ctrl+Tab/Ctrl+Shift+Tab or Ctrl+PgUp/PgDn
- **Toggle Tab Layout**: Ctrl+Mouse Wheel on tab bar (single-row ↔ multi-row)

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + T` | Open new tab |
| `Ctrl + W` | Close current tab |
| `Ctrl + Shift + T` | Reopen closed tab |
| `Ctrl + Tab` / `Ctrl + PgDn` | Next tab |
| `Ctrl + Shift + Tab` / `Ctrl + PgUp` | Previous tab |
| `Ctrl + Mouse Wheel` | Toggle tab layout mode |

### Context Menu Options
- **Tab Menu**: Right-click a tab to mark it as read, open a new tab next to it, duplicate, add to favorites, minimize, move, copy its link, or close tabs
- **Favorite Menu**: Right-click a bookmark to open it in a new tab, mark it as read, rename, move it to a folder, copy its link, or delete it
- **Group Menu**: Right-click a group to open all, mark all as read, move it into another group, rename, or delete

## ⚙️ Settings

### Startup
- **Reopen Last Channel**: Restore your last active channel on startup

### Appearance
- **Show Tab Bar**: Toggle the main tab bar visibility
- **Show Fav Bar**: Toggle the bookmarks bar
- **Show Quick Settings**: Access settings via hamburger menu
- **Show Navigation Buttons**: Display forward/back buttons
- **Compact Mode**: Use smaller tabs and UI elements
- **Privacy Mode**: Obscure text in tabs for streaming
- **Radial Status**: Use circular status indicators
- **Minimum Tab Width**: Adjust tab size (50-220px)
- **Maximum Tab Width**: How wide a tab can grow in flexible mode (100-400px)
- **Bar Size**: Scale the tab and favorites bars (80-120%)
- **Favorites That Don't Fit**: Wrap them onto more rows, or keep one row and list the rest in a menu
- **Show Discord's Title Bar**: Keep Discord's own title row above the tabs

### Behavior
- **Always Focus New Tabs**: Auto-switch to newly created tabs
- **Primary Forward/Back Navigation**: Use standard browser navigation
- **Open in New Tab Shortcut**: Ctrl+Click, Middle Click or disabled, for servers, channels and DMs

### Badge Visibility
Configure which indicators to show:
- **Mentions**: Red notification badges
- **Unreads**: Blue unread counts
- **Typing**: Animated typing indicators
- **Empty Badges**: Show badges even when zero

### Closed Tabs History
- **Days to Keep**: 1-90 days retention
- **Maximum Count**: 10-500 tabs stored
- **Clear History**: Remove all closed tabs

## 🎨 Visual Modes

### Tab Layout Modes
**Single-Row Mode** (Default)
- Tabs scroll horizontally when space is limited
- Clean, traditional browser-like appearance
- Best for fewer tabs

**Multi-Row Mode**
- Tabs wrap to multiple rows automatically
- All tabs visible without scrolling
- Ideal for power users with many tabs
- Quick toggle with Ctrl+Mouse Wheel

### Compact Style
Reduces UI element sizes for more efficient screen usage:
- Tab height: 22px (vs 32px)
- Smaller fonts and icons
- Tighter spacing

### Privacy Mode
Obscures sensitive information:
- Tab names become color blocks
- Favorite names are hidden
- Perfect for streaming or screenshots

### Radial Status Mode
Modern circular status indicators:
- Status shown as colored ring around avatar
- Cleaner, more modern appearance
- Works with both tabs and favorites

## 🔧 Troubleshooting

### Tabs not saving after restart?
- Ensure the plugin has proper write permissions
- Check if settings are being saved per-user account

### Missing context menu options?
- Make sure both Tab Bar and Fav Bar aren't disabled
- Right-click directly on the channel name

### Settings not updating visually?
- The plugin now updates settings in real-time
- If issues persist, reload Discord with Ctrl+R (Cmd+R on Mac)

### Performance issues with many tabs?
- Enable Compact Mode to reduce memory usage
- Use Multi-Row Mode to see all tabs at once
- Close unused tabs regularly
- Use tab minimization for less active channels

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

EnhancedChannelTabs is free software, licensed under the [GNU General Public License v3.0 only](LICENSE).

It is based on ChannelTabs, which is licensed under the MIT License (Copyright © 2023-2025 samfundev, 2023 l0c4lh057, 2020-2023 CarJem Generations). See [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md) for the full notice.

## 👥 Credits

- **Pharaoh2k** - EnhancedChannelTabs maintainer & developer (GPL-3 license)
- **samfundev** - Developer & upstream ChannelTabs maintainer (MIT license)
- **l0c4lh057** - Developer (MIT license)
- **CarJem Generations** - Developer (MIT license)

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Bug Reports](https://github.com/Pharaoh2k/BetterDiscordStuff/issues)
- [Plugin Source](https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/EnhancedChannelTabs/EnhancedChannelTabs.plugin.js)

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/EnhancedChannelTabs/CHANGELOG.md) for detailed version history.

---
Made with ❤️ for the BetterDiscord community
