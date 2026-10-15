<div align="center">

**I don’t take donations, but if my plugins improve your Discord, dropping a ⭐ on the repo means a lot. It keeps me motivated to update and build more cool stuff.**

# 🧩 BetterDiscord Stuff

### Polished, self-updating plugins for BetterDiscord

**15 plugins** that make Discord faster to use, easier to organize and more informative.<br>
Built on BetterDiscord's own API, with **zero library dependencies**.

[![Website](https://img.shields.io/badge/Website-pharaoh2k.github.io-5865F2?style=for-the-badge&logo=githubpages&logoColor=white)](https://pharaoh2k.github.io/BetterDiscordStuff/)
[![BetterDiscord](https://img.shields.io/badge/BetterDiscord-Plugins-3E82E5?style=for-the-badge&logo=betterdiscord&logoColor=white)](https://betterdiscord.app)
[![Last commit](https://img.shields.io/github/last-commit/Pharaoh2k/BetterDiscordStuff?style=for-the-badge&color=5865F2&label=Last%20update)](https://github.com/Pharaoh2k/BetterDiscordStuff/commits/main)

[**🌐 Website**](https://pharaoh2k.github.io/BetterDiscordStuff/) &nbsp;·&nbsp;
[**🧩 Plugins**](#-plugins) &nbsp;·&nbsp;
[**📦 Installation**](#-installation) &nbsp;·&nbsp;
[**🐛 Report a Bug**](https://github.com/Pharaoh2k/BetterDiscordStuff/issues/new?template=bug-report.md) &nbsp;·&nbsp;
[**💡 Request a Feature**](https://github.com/Pharaoh2k/BetterDiscordStuff/issues/new?template=feature-improvement-request.md)

</div>

---

## ✨ Why These Plugins

<table>
<tr>
<td width="50%" valign="top">

### 🪶 Zero dependencies
Every plugin runs on BetterDiscord's built-in BdApi. No ZeresPluginLibrary, no BDFDB, nothing else to install.

</td>
<td width="50%" valign="top">

### 🔄 Always up to date
Each plugin checks this repository for new versions on its own and shows you what changed after every update.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🔒 Privacy first
No analytics and no tracking. Plugins talk to GitHub for updates and to Discord itself, and BetterFileViewer uses well-known online viewers for its previews. That's the [complete list](SECURITY.md#network-access).

</td>
<td width="50%" valign="top">

### ⚙️ Fully configurable
Every plugin has its own settings panel, so you decide exactly what it shows and does.

</td>
</tr>
</table>

## 🧩 Plugins

> [!TIP]
> Click a plugin's name for its full documentation, features and settings. The version badges always show the latest release.

### 💬 Messaging

| Plugin | What it does | Version | Get it |
| :-- | :-- | :-: | :-: |
| [**BetterMessageUtilities**](Plugins/BetterMessageUtilities) | Customizable hotkeys for message actions: delete, edit, pin, reply, react, copy text and copy link. | ![BetterMessageUtilities version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBetterMessageUtilities%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BetterMessageUtilities](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterMessageUtilities/BetterMessageUtilities.plugin.js) |
| [**BetterSplitLargeMessages**](Plugins/BetterSplitLargeMessages) | Send messages over the character limit as clean, markdown-safe chunks. Honors server limits and slowmode, no Nitro spoofing. | ![BetterSplitLargeMessages version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBetterSplitLargeMessages%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BetterSplitLargeMessages](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterSplitLargeMessages/BetterSplitLargeMessages.plugin.js) |
| [**QuickMessages-Reborn**](Plugins/QuickMessages-Reborn) | Save messages you send often and send them again from the chat bar's context menu, organized into categories. | ![QuickMessages-Reborn version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FQuickMessages-Reborn%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download QuickMessages-Reborn](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/QuickMessages-Reborn/QuickMessages-Reborn.plugin.js) |
| [**BetterRelativeTimestamps**](Plugins/BetterRelativeTimestamps) | Live-updating relative timestamps like "5 minutes ago" or "in 2 hours", shown alone or next to the regular time. | ![BetterRelativeTimestamps version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBetterRelativeTimestamps%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BetterRelativeTimestamps](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterRelativeTimestamps/BetterRelativeTimestamps.plugin.js) |

### 🧭 Navigation & Organization

| Plugin | What it does | Version | Get it |
| :-- | :-- | :-: | :-: |
| [**EnhancedChannelTabs**](Plugins/EnhancedChannelTabs) | Browser-style tabs and bookmarks for channels, with favorite groups, per-tab history, multi-row layouts and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> to reopen closed tabs. | ![EnhancedChannelTabs version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FEnhancedChannelTabs%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download EnhancedChannelTabs](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/EnhancedChannelTabs/EnhancedChannelTabs.plugin.js) |
| [**BetterPinDMs**](Plugins/BetterPinDMs) | Pin DMs into their own section above Direct Messages, with custom colored categories, drag and drop, unread counts and import from similar plugins. | ![BetterPinDMs version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBetterPinDMs%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BetterPinDMs](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterPinDMs/BetterPinDMs.plugin.js) |
| [**ShowAllChannelsAuto**](Plugins/ShowAllChannelsAuto) | Turns on "Show All Channels" automatically in every server, with per-server exclusions. | ![ShowAllChannelsAuto version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FShowAllChannelsAuto%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download ShowAllChannelsAuto](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowAllChannelsAuto/ShowAllChannelsAuto.plugin.js) |

### 📁 Files & Media

| Plugin | What it does | Version | Get it |
| :-- | :-- | :-: | :-: |
| [**AudioToolbox**](Plugins/AudioToolbox) | Download voice messages and audio files as WAV or M4A/AAC, with EQ presets, playback speed, A/B looping, queue mode and batch downloads. | ![AudioToolbox version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FAudioToolbox%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download AudioToolbox](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/AudioToolbox/AudioToolbox.plugin.js) |
| [**BetterFileViewer**](Plugins/BetterFileViewer) | Preview PDFs, Office documents and 3D models (STL, OBJ, 3MF and more) right inside Discord, without downloading them. | ![BetterFileViewer version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBetterFileViewer%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BetterFileViewer](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterFileViewer/BetterFileViewer.plugin.js) |
| [**BigFileTransfers**](Plugins/BigFileTransfers) | Send files up to ~2 GB by splitting them into chunks that are put back together automatically. The receiver needs the plugin too, or the web <a href="https://pharaoh2k.github.io/BetterDiscordStuff/Merger/">Merger</a>. | ![BigFileTransfers version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBigFileTransfers%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BigFileTransfers](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BigFileTransfers/BigFileTransfers.plugin.js) |

### 🛡️ Servers & Moderation

| Plugin | What it does | Version | Get it |
| :-- | :-- | :-: | :-: |
| [**PermissionsToolkit**](Plugins/PermissionsToolkit) | Inspect, compare and audit permissions. See where every permission comes from, compare roles or users side by side and scan for dangerous setups. | ![PermissionsToolkit version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FPermissionsToolkit%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download PermissionsToolkit](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/PermissionsToolkit/PermissionsToolkit.plugin.js) |
| [**BetterServerDetails**](Plugins/BetterServerDetails) | Hover a server icon to see its owner, creation and join dates, member, channel and role counts, boosts and more. | ![BetterServerDetails version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBetterServerDetails%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BetterServerDetails](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterServerDetails/BetterServerDetails.plugin.js) |
| [**ShowHiddenThings**](Plugins/ShowHiddenThings) | Shows moderator-only details regardless of your permissions: timeout icons in chat, the paused invites tooltip and Mod View in every server. | ![ShowHiddenThings version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FShowHiddenThings%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download ShowHiddenThings](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ShowHiddenThings/ShowHiddenThings.plugin.js) |

### 👥 Social

| Plugin | What it does | Version | Get it |
| :-- | :-- | :-: | :-: |
| [**BetterTypingIndicator**](Plugins/BetterTypingIndicator) | See who is typing at a glance, with indicators on channels, servers, folders and the DM home icon, plus avatars and custom animations. | ![BetterTypingIndicator version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBetterTypingIndicator%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BetterTypingIndicator](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterTypingIndicator/BetterTypingIndicator.plugin.js) |
| [**BetterFriendsSince**](Plugins/BetterFriendsSince) | Shows the date you became friends with someone on their profile and in the Friends sidebar, in 24+ languages. | ![BetterFriendsSince version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FPharaoh2k%2FBetterDiscordStuff%2Fmain%2FPlugins%2FBetterFriendsSince%2Fplugin.json&query=%24.version&prefix=v&label=&color=5865F2&style=flat-square) | [![Download BetterFriendsSince](https://img.shields.io/badge/Download-2EA043?style=flat-square)](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterFriendsSince/BetterFriendsSince.plugin.js) |

## 📦 Installation

> [!IMPORTANT]
> You need [BetterDiscord](https://betterdiscord.app) installed. The plugins are made for its latest release.

1. **Download** the `.plugin.js` file of any plugin from the [list above](#-plugins). If your browser shows the code instead of saving it, right-click **Download** and choose **Save link as...**
2. **Open your plugins folder.** In Discord, go to **User Settings → Plugins** and click **Open Plugins Folder**.
3. **Move the file** into that folder.
4. **Enable the plugin** with its toggle in **User Settings → Plugins**.

That's it. From now on the plugin keeps itself up to date.

<details>
<summary><b>Where is the plugins folder?</b></summary>
<br>

| OS | Path |
| :-- | :-- |
| Windows | `%appdata%\BetterDiscord\plugins` |
| macOS | `~/Library/Application Support/BetterDiscord/plugins` |
| Linux | `~/.config/BetterDiscord/plugins` |

</details>

## 💬 Support & Feedback

- 🐛 **Found a bug?** [Open a bug report](https://github.com/Pharaoh2k/BetterDiscordStuff/issues/new?template=bug-report.md) with the plugin name, its version and the steps to reproduce it.
- 💡 **Have an idea?** [Request a feature or improvement](https://github.com/Pharaoh2k/BetterDiscordStuff/issues/new?template=feature-improvement-request.md).
- 🔐 **Found a security issue?** Please report it privately, as described in [SECURITY.md](SECURITY.md).

## 🤝 Contributing

Pull requests are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before you start.

<details>
<summary><b>Repository layout</b></summary>
<br>

```text
Plugins/
└── <PluginName>/
    ├── <PluginName>.plugin.js   The plugin itself
    ├── README.md                Documentation
    ├── CHANGELOG.md             Version history, shown in Discord after updates
    └── plugin.json              Metadata used by the website
docs/                            Notes on Discord internals (CSS variables, module maps)
manifest.json                    Plugin list used by the website
```

</details>

## 📜 License

| Plugins | License |
| :-- | :-- |
| EnhancedChannelTabs | [GNU GPL v3.0](Plugins/EnhancedChannelTabs/LICENSE) |
| All other plugins | All rights reserved, free for personal use ([LICENSE](LICENSE)) |

Some plugins include code by other developers under the MIT license. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for details.

## 🙏 Credits

Thanks to the BetterDiscord team for the plugin API, and to the developers whose work some of these plugins build on: **samfundev**, **l0c4lh057** and **CarJem Generations** (ChannelTabs), **Zerebos** (PermissionsViewer and RoleMembers), **Robert Delaney**, **AGreenPig** (FileViewer), **mwittrien** and **QWERTxD**. Details in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md#credits-for-prior-work).

## ⚠️ Disclaimer

This project is not affiliated with, endorsed by or supported by Discord Inc. or the BetterDiscord team. Client modifications are against [Discord's Terms of Service](https://discord.com/terms), so use them at your own risk.

---

<div align="center">

### Made with ❤️ by [Pharaoh2k](https://github.com/Pharaoh2k)

[![GitHub](https://img.shields.io/badge/Pharaoh2k-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Pharaoh2k)
[![X](https://img.shields.io/badge/%40__Pharaoh2k-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/_Pharaoh2k)

</div>
