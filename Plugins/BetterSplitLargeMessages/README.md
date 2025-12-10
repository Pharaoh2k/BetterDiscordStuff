# BetterSplitLargeMessages

A BetterDiscord plugin that allows you to send longer messages by automatically splitting them into multiple chunks. No Nitro spoofing, respects server limits and slowmode.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

BetterSplitLargeMessages enhances your Discord experience by intelligently splitting long messages into multiple chunks that respect Discord's character limits. Unlike Nitro spoofing, this plugin works entirely client-side and honors all server restrictions including slowmode, making it safe and compliant.

## ✨ Features

- **🔄 Smart Message Splitting**: Automatically splits messages that exceed Discord's character limit
- **🎯 Intelligent Split Points**: Splits at natural boundaries (newlines, spaces) to preserve readability
- **📝 Markdown Preservation**: Maintains markdown formatting across message chunks (bold, italic, code blocks, etc.)
- **⏱️ Slowmode Respect**: Honors channel slowmode settings with configurable thresholds
- **🚫 Hide Nitro Upsells**: Suppresses annoying "Message too long" upsell popups and modals
- **⚙️ Flexible Configuration**: Customizable chunk delays, size limits, and split behavior
- **🔐 Permission Aware**: Automatically bypasses slowmode for users with manage permissions
- **📊 Auto-Detection**: Automatically detects server limits (2000 for regular users, 4000 for Nitro)
- **🛡️ Safety Cap**: Optional maximum chunks per message to prevent accidental spam
- **🎨 Theme Support**: Seamlessly integrates with Discord's interface

## 📦 Installation

1. Download [BetterSplitLargeMessages.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/BetterSplitLargeMessages/BetterSplitLargeMessages.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

1. Simply type or paste a message longer than Discord's character limit
2. Press Enter to send - the plugin automatically handles the splitting
3. Messages are sent sequentially with your configured delay between chunks
4. Markdown formatting is preserved across all chunks

### Example

**Input:**
```
[A very long message exceeding 2000 characters with **bold text**, *italics*, 
code blocks, and other markdown formatting...]
```

**Output:**
```
Chunk 1: [First part with markdown preserved...]
Chunk 2: [Second part with markdown continued...]
Chunk 3: [Final part with markdown completed...]
```

## ⚙️ Settings

Access settings through Discord Settings → Plugins → BetterSplitLargeMessages ⚙️

### Max Message Length
- **Default**: `0` (auto-detect)
- **Range**: 0 - 100,000 characters
- **Description**: Set to 0 to automatically detect Discord's limit (2000/4000). The editor limit becomes effectively unlimited when set to 0.

### Delay Between Chunks
- **Default**: `2` seconds
- **Range**: 2 - 10 seconds
- **Description**: Time delay between sending each chunk. Minimum 2 seconds required for safety and to avoid rate limiting.

### Max Chunks Per Message
- **Default**: `0` (unlimited)
- **Range**: 0 - 1,000 chunks
- **Description**: Safety cap for maximum number of chunks a single message can be split into. Set to 0 for unlimited.

### Hide Nitro Upsell
- **Default**: `Enabled`
- **Description**: Suppresses the "Message too long" upsell popup that prompts you to upgrade to Nitro.

### Hard Split
- **Default**: `Disabled`
- **Description**: When enabled, splits exactly at max length ignoring word boundaries and markdown. Not recommended as it can break words and formatting.

### Split in Slowmode Channels
- **Default**: `Disabled`
- **Description**: Allows message splitting in channels with slowmode enabled. Delay automatically adjusts to match slowmode duration.

### Max Slowmode Threshold
- **Default**: `5` seconds
- **Range**: 0 - 120 seconds
- **Description**: Only split messages in slowmode channels if the slowmode is below this threshold.

## 🎯 How It Works

### Smart Splitting Algorithm
The plugin uses an intelligent splitting algorithm that:
1. Prioritizes splitting at newline characters
2. Falls back to splitting at spaces if no newlines are available
3. Avoids splitting inside markdown links `[text](url)` or angle brackets `<text>`
4. Maintains at least 50% chunk utilization to avoid tiny fragments

### Markdown Preservation
The plugin includes a sophisticated markdown parser that:
- Tracks open markdown tags (bold, italic, code, spoilers, etc.)
- Automatically closes tags at chunk boundaries
- Reopens tags at the start of the next chunk
- Handles nested markdown correctly
- Preserves code block language specifiers

### Slowmode Handling
- Automatically detects channel slowmode settings
- Checks user permissions (MANAGE_MESSAGES, MANAGE_CHANNELS)
- Adjusts delay to match slowmode if splitting is enabled
- Prevents splitting if slowmode exceeds configured threshold

## ⚠️ Known Limitations

- Messages are sent sequentially, not simultaneously
- Very long messages (thousands of chunks) may take considerable time to send
- Discord's rate limiting still applies
- Complex nested markdown may occasionally have minor formatting issues
- Cannot bypass Discord's actual server-side character limits (uses client-side splitting)

## 🔧 Troubleshooting

### Messages aren't splitting?
- Check that the plugin is enabled in Settings → Plugins
- Verify your message exceeds the character limit (2000 by default)
- Ensure Max Chunks setting isn't set too low
- Check console (Ctrl+Shift+I) for error messages

### Slowmode preventing splits?
- Enable "Split in Slowmode Channels" in settings
- Increase "Max Slowmode Threshold" if needed
- Note: You need appropriate permissions to bypass slowmode entirely

### Markdown formatting broken?
- Disable "Hard Split" mode - it should always be off unless you specifically need character-exact splitting
- Check that your markdown is properly formatted in the original message
- Some very complex nested markdown may have limitations

### Plugin not working after Discord update?
- Re-download the latest version of the plugin
- Restart Discord completely (Ctrl+R to reload)
- Check BetterDiscord is up to date

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/BetterSplitLargeMessages/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- BetterDiscord community for the plugin API
- Discord for the platform
- All users who provide feedback and suggestions

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/BetterSplitLargeMessages/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
