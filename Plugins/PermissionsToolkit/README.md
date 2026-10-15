# PermissionsToolkit

A BetterDiscord plugin to inspect user and role permissions, compare roles or users side by side, look up who has specific permissions, and scan for dangerous configurations.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

PermissionsToolkit gives you a complete picture of how permissions are set up in a server. See exactly what a member can do, which roles and channel overrides grant it, how two roles or two users differ, and whether the server has risky permission settings, all from one window.

*Based on the MIT licensed PermissionsViewer and RoleMembers plugins by Zerebos, almost completely rewritten and expanded using modern BdApi (no BDFDB dependency).*

## ✨ Features

- **👤 Member Permissions**: See a user's total server permissions right in their popout and profile, below their roles
- **#️⃣ Channel Overrides**: Inspect a channel's permission overrides for every role and member
- **🛡️ By Role**: Browse permissions role by role, including the members of each role
- **⇄ Compare Roles**: Put two roles side by side and see every permission they differ on
- **👥 Compare Users**: Compare the permissions of two members
- **🔍 Permission Lookup**: Pick any permission to see every role and member that has it
- **🧭 Permission Trace**: See where a permission comes from: a role, a channel override or server ownership
- **🚨 Security Audit**: Find dangerous @everyone permissions, too many admin roles, high-privilege roles with many members and risky @everyone channel overwrites
- **🎚️ Filters & Search**: Filter by allowed, denied or neutral, and search roles, permissions and members
- **📋 Context Menus**: Open the toolkit from server, channel and user context menus
- **🌐 Localized**: English, Spanish, Portuguese, German, Russian, French and Dutch
- **🔄 Auto Updates**: Automatic update checking with changelog display every 24 hours

## 📦 Installation

1. Download [PermissionsToolkit.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/PermissionsToolkit/PermissionsToolkit.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

### Opening the Toolkit
- **Server**: Right-click a server icon → **Permissions** to see the whole server's permission setup
- **Channel**: Right-click a channel → **Permissions** to see its permission overrides (channels without overrides show a notice instead)
- **User**: Right-click a member in a server → **Permissions** to see that member's permissions

### In Popouts and Profiles
- Open a member's popout or full profile in a server
- Their total permissions are listed below their roles

### Views
- **Overrides** / **Permissions**: The channel or member you opened the toolkit for
- **By Role**: Pick a role to see its permissions, or switch to its **Members** tab
- **Compare Roles** / **Compare Users**: Pick two and review the differences, or swap them around
- **Permission Lookup**: Pick a permission to see every role and member that has it
- **Security Audit**: Review findings grouped by severity (Critical, Warning and Info)

### Tips
- Right-click a member in the toolkit to get Discord's usual user menu
- Right-click a role in the toolkit to copy its ID

## ⚙️ Settings

Access settings through Discord Settings → Plugins → PermissionsToolkit ⚙️

- **Context Menus**: Adds a Permissions entry to server, channel and user context menus (enabled by default)
- **Popouts**: Shows a user's total permissions in their popout and profile, similar to roles (enabled by default)
- **Remember Filter**: Remembers your last selected permission filter across sessions (disabled by default)
- **Auto Update-Check**: Checks for updates on startup and every 24 hours (enabled by default)
- **Check for Updates**: Manually check if a new version is available
- **View Changelog**: View the complete changelog for this plugin

## ⚠️ Important Notes

- The toolkit is **read-only**: it never changes roles, permissions or channel overrides
- Permissions are calculated in your client from the server's roles and channel overrides
- Member lists only include members Discord has cached, so not every member may appear in large servers
- Some features may not work correctly if Discord updates their internal structure

## 🔧 Troubleshooting

### Permissions entry missing from a context menu?
- Check that **Context Menus** is enabled in the plugin settings
- The user entry only appears when you right-click a member inside a server

### Permissions not showing in popouts or profiles?
- Check that **Popouts** is enabled in the plugin settings
- Permissions only appear for members of a server, not in DMs

### Update issues?
- Manually check for updates from the settings panel
- Re-download and replace the plugin file if automatic updates fail
- Check the Discord console (Ctrl+Shift+I) for error messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Ensure submissions align with the project's guidelines and coding standards.

## 📝 License

This project includes code originally licensed under the MIT License (PermissionsViewer and RoleMembers by Zerebos).

Substantial modifications, additions, and refactored components created by Pharaoh2k are © 2026 Pharaoh2k. All rights reserved. These proprietary portions may not be copied, modified, or redistributed without prior written consent from Pharaoh2k.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/PermissionsToolkit/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- BetterDiscord community for the plugin API
- Original MIT licensed PermissionsViewer and RoleMembers plugins by Zerebos

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/PermissionsToolkit/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
