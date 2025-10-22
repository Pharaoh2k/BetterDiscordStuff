# EnhancedChannelTabs
A BetterDiscord plugin that brings browser-style tabs and bookmarks to Discord.

![Version](https://img.shields.io/badge/version-3.0.8-blue.svg)
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
- **🎯 Smart Context Menus**: Right-click channels to open in new tab or bookmark
- **📑 Multi-Row Tabs**: Tabs wrap to multiple rows when space is limited

### Visual Enhancements
- **🎨 Compact Mode**: Smaller tabs for more screen space
- **🔒 Privacy Mode**: Obscures sensitive text in tabs
- **⭕ Radial Status Indicators**: Modern circular status borders
- **📊 Badge System**: Unread counts, mentions, and typing indicators
- **🖱️ Drag & Drop**: Reorder tabs and favorites by dragging
- **🔄 Dynamic Layout**: Toggle between single-row scrolling and multi-row wrapping

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
- **Open in New Tab**: Right-click any channel/DM/server → ChannelTabs → Open in new tab
- **Add Bookmark**: Right-click → ChannelTabs → Save as bookmark
- **Close Tab**: Click the × on the tab or press Ctrl+W
- **Switch Tabs**: Click on any tab or use Ctrl+PgUp/PgDn
- **Toggle Tab Layout**: Ctrl+Mouse Wheel on tab bar (single-row ↔ multi-row)

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + T` | Open new tab |
| `Ctrl + W` | Close current tab |
| `Ctrl + Shift + T` | Reopen closed tab |
| `Ctrl + PgUp` | Previous tab |
| `Ctrl + PgDn` | Next tab |
| `Ctrl + Mouse Wheel` | Toggle tab layout mode |

### Context Menu Options
- **Tab Menu**: Right-click tab for duplicate, minimize, move, or close options
- **Favorite Menu**: Right-click bookmark to rename, move to group, or delete
- **Group Menu**: Right-click group to open all, rename, or delete

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

### Behavior
- **Always Focus New Tabs**: Auto-switch to newly created tabs
- **Primary Forward/Back Navigation**: Use standard browser navigation

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

## 👥 Credits

- **Pharaoh2k** - Current maintainer & developer
- **samfundev** - Developer
- **l0c4lh057** - Developer
- **CarJem Generations** - Developer

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Bug Reports](https://github.com/Pharaoh2k/BetterDiscordStuff/issues)
- [Plugin Source](https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/EnhancedChannelTabs.plugin.js)

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/EnhancedChannelTabs/CHANGELOG.md) for detailed version history.

---
Made with ❤️ for the BetterDiscord community
