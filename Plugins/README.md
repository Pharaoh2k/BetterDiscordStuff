# QuickMessages-Reborn

A BetterDiscord plugin that allows you to save and quickly reuse messages. Organize your frequently used text with categories and send them instantly with a right-click.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

QuickMessages-Reborn enhances your Discord messaging experience by letting you save frequently used messages for instant access. Whether it's copypastas, greetings, common responses, or formatted text, you can organize and send them with just a right-click.

**Inspired by QWERTxD's original "QuickMessages" plugin.**

## ✨ Features

- **💾 Message Storage**: Save any text to reuse later
- **📁 Category Organization**: Organize messages into custom categories
- **🎯 Smart Selection**: Save selected text or entire messages
- **⚡ Quick Access**: Right-click context menu integration
- **🗑️ Easy Management**: Shift+Click to delete messages or categories
- **📝 Uncategorized Support**: Save messages without categories
- **🔄 Auto Updates**: Automatic update checking with changelog display
- **🎨 Theme Integration**: Seamlessly matches Discord's design
- **🔍 Text Parsing**: Supports Discord formatting and emojis
- **⚙️ Settings Panel**: Manage all saved messages from settings

## 📦 Installation

1. Download [QuickMessages-Reborn.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/QuickMessages-Reborn/QuickMessages-Reborn.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

### Saving Messages

1. **Select text** in the chat input box or elsewhere
2. **Right-click** to open the context menu
3. Choose **"Save as Quick Message"**
4. Select a category or "Uncategorized"
5. Your message is now saved!

### Creating Categories

1. Right-click in the chat input
2. Go to "Save as Quick Message"
3. Click **"Create Category..."**
4. Enter a category name
5. Your new category is ready to use

### Sending Saved Messages

1. **Right-click** in the chat input
2. Select **"Quick Messages"**
3. Choose your saved message
4. It will be inserted into the chat input instantly

### Deleting Messages

- **Delete a message**: Hold **Shift** and click the message
- **Delete a category**: Hold **Shift** and click the category name

## 📋 Quick Tips

- Messages are automatically trimmed of extra whitespace
- Long messages (>50 characters) are truncated in the menu display
- Categories and messages support Discord formatting (bold, italic, etc.)
- Use the settings panel to view total saved items
- All data is stored locally in BetterDiscord's data folder

## ⚙️ Settings

Access settings through Discord Settings → Plugins → QuickMessages-Reborn ⚙️

- **Manage Messages**: View total saved items
- **Delete All**: Clear all saved messages and categories
- **Automatic Updates**: Check for updates every 24 hours (enabled by default)
- **View Changelog**: View complete version history

## 📖 Context Menu Structure

```
Right-click in chat input →
├── Save as Quick Message
│   ├── Uncategorized
│   ├── ───────────
│   ├── [Your Categories]
│   ├── ───────────
│   └── Create Category...
└── Quick Messages
    ├── [Uncategorized Messages]
    ├── ───────────
    └── [Your Categories]
        └── [Category Messages]
```

## 🔧 Troubleshooting

### Message not inserting?
- Ensure you're right-clicking in the chat input area
- Try reloading Discord with Ctrl+R (Cmd+R on Mac)
- Check that the plugin is enabled

### Context menu not appearing?
- Verify the plugin is enabled and running
- Reload Discord completely
- Check Discord console for error messages

### Lost messages after update?
- Messages are stored in BetterDiscord's data folder
- Data persists across updates unless manually deleted
- Check settings panel to verify saved items count

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Copyright © 2025 Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/QuickMessages-Reborn/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- **QWERTxD** for the original "QuickMessages" plugin that inspired this reborn version
- BetterDiscord community for the plugin API
- All contributors and users of this plugin

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/QuickMessages-Reborn/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
