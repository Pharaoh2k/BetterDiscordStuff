# BetterTypingIndicator
A BetterDiscord plugin that enhances Discord's typing indicators with visual indicators in channel lists, server icons, folders, and DMs.

![Version](https://img.shields.io/badge/version-2.9.2-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

BetterTypingIndicator revolutionizes how you see typing activity across Discord. Get instant visual feedback when someone is typing in any channel, DM, or server - even when you're not actively viewing that conversation. With customizable animations, colors, and avatar displays, you'll never miss when someone is about to send a message. Perfect for staying aware of conversations across multiple servers and channels.

## ✨ Features

### Core Indicators
- **📝 Channel Indicators**: See typing activity directly in the channel list
- **🏠 Home/DM Indicators**: Visual feedback on the Home icon for DM typing
- **🏢 Server Indicators**: Know when someone's typing in any server
- **📁 Folder Indicators**: Typing indicators on server folders
- **🔢 User Count Badge**: Display number of typing users

### Visual Customization
- **🎨 Custom Colors**: Set your own dot and background colors
- **✨ Animation Styles**: Choose from Bounce, Pulse, or Wave animations
- **⚡ Animation Speed**: Adjust speed from 0.5s to 3.0s
- **👤 Avatar Display**: Show user avatars alongside typing dots
- **🔷 Avatar Styles**: Circle, Square, or Hexagon avatar shapes
- **📏 Avatar Size**: Adjustable from 12px to 24px
- **🟢 Status Indicators**: Show online/idle/DND status on avatars

### Smart Features
- **💬 Rich Tooltips**: Hover to see who's typing with names and/or avatars
- **🔇 Muted Channel Support**: Optionally show/hide indicators for muted channels
- **🚫 Blocked User Filtering**: Choose to include or exclude blocked users
- **🔄 Auto-Updates**: Stay current with automatic update checking
- **⚡ Performance Optimized**: Efficient rendering with React components

## 📦 Installation

1. Download [BetterTypingIndicator.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/BetterTypingIndicator/BetterTypingIndicator.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

### Quick Start
The plugin works automatically once enabled! Simply:
1. Enable the plugin in your BetterDiscord settings
2. Configure your visual preferences in the plugin settings
3. See typing indicators appear wherever someone is typing

### Visual Indicators Appear In:
- **Channel List**: Next to channel names when someone is typing
- **Server Icons**: On the server icon in your server list
- **Folder Icons**: On folder icons containing servers with typing activity
- **Home Button**: On the Discord home button when someone types in DMs

## ⚙️ Settings

### Indicator Settings

#### Channel Settings
- **Channel Typing Indicator**: Enable/disable channel list indicators
- **Include Muted Channels/Guilds**: Show indicators for muted channels
- **Include Blocked Users**: Show indicators for blocked users
- **Show Count**: Display number of typing users as a badge

#### Server & Navigation
- **Guild Typing Indicator**: Show indicators on server icons
- **Folder Typing Indicator**: Show indicators on folder icons
- **Home/DMs Typing Indicator**: Show indicators on Home icon for DMs

### Visual Customization

#### Colors & Animations
- **Dot Color**: Color of the typing indicator dots
- **Indicator Background**: Background color for all indicators
- **Animation Style**: Choose between Bounce, Pulse, or Wave
- **Animation Speed**: Adjust speed from 0.5 to 3.0 seconds

#### Avatar Settings
- **Show Avatars in Indicator**: Display user avatars with dots
- **Avatar Style**: Circle, Square, or Hexagon shapes
- **Avatar Size**: Size from 12px to 24px
- **Show Status Indicator**: Display online status on avatars

#### Tooltip Settings
- **Tooltip Style**: Configure how user info appears on hover
  - Show Names and Avatars
  - Show Names Only
  - Show Avatars Only
  - No Tooltips

### System Settings
- **Automatic Updates**: Check for updates every 24 hours

## 🎮 Tips & Tricks

### Optimal Configurations

**For Maximum Awareness:**
- Enable all indicator types
- Include muted channels
- Use bright dot colors
- Enable user count badges

**For Minimal Distraction:**
- Disable folder and guild indicators
- Exclude muted channels
- Use subtle colors matching your theme
- Disable animations (set to "none")

**For Quick Identification:**
- Enable avatar display
- Use "Names and Avatars" tooltip style
- Show status indicators
- Use larger avatar sizes

### Performance Tips
- Disable animations on slower computers
- Reduce avatar size for better performance
- Consider disabling tooltips if not needed

## 🎨 Styling Guide

### Color Recommendations
- **Dark Theme**: White dots (#FFFFFF) with dark background (#18191c)
- **Light Theme**: Dark dots (#000000) with light background (#F2F3F5)
- **High Contrast**: Bright colors (#FF0000, #00FF00) for visibility
- **Subtle**: Match your Discord theme's accent colors

### Animation Styles
- **Bounce**: Classic typing indicator animation
- **Pulse**: Smooth scaling effect, great for minimal setups
- **Wave**: Flowing motion, adds dynamic feel

## 🔧 Troubleshooting

### Indicators not showing?
- Ensure the plugin is enabled in Settings → Plugins
- Check that specific indicator types are enabled
- Verify someone is actually typing in those locations
- Try reloading Discord with Ctrl+R (Cmd+R on Mac)

### Performance issues?
- Reduce animation speed or disable animations
- Decrease avatar size
- Disable avatar display entirely
- Disable tooltips if not needed

### Tooltips not appearing?
- Ensure tooltip style is not set to "No Tooltips"
- Hover over the channel name, not the indicator itself
- Check that JavaScript errors aren't occurring (Ctrl+Shift+I)

### Wrong user count?
- The count includes all typing users (unless filtered)
- Blocked users may be excluded based on settings
- Count updates in real-time as users start/stop typing

## 📊 Feature Details

### Typing Detection
- Detects typing in all channel types (text, voice text, threads)
- Works with DMs and group DMs
- Supports forum channels and threads
- Updates in real-time without delay

### Smart Filtering
- Automatically excludes your own typing
- Optional blocking of muted channels
- Optional filtering of blocked users
- Respects Discord's privacy settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Clone the repository
2. Make your changes
3. Test thoroughly in Discord
4. Submit a pull request with a clear description

## 👤 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 📝 License

Copyright © 2024–2025 Pharaoh2k. All rights reserved.

Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Bug Reports](https://github.com/Pharaoh2k/BetterDiscordStuff/issues)
- [Plugin Source](https://github.com/Pharaoh2k/BetterDiscordStuff/tree/main/Plugins/BetterTypingIndicator)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/BetterTypingIndicator/CHANGELOG.md)
- [Support Discord](https://discord.gg/betterdiscord)

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/BetterTypingIndicator/CHANGELOG.md) for detailed version history.

## 🏆 Acknowledgments

- BetterDiscord community for continuous support
- Discord for providing the platform
- All contributors and users providing feedback

---
Made with ❤️ for the BetterDiscord community
