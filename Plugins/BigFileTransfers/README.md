# BigFileTransfers

![BigFileTransfers](https://github.com/user-attachments/assets/bc07fef3-ea41-4e98-9bc9-e7b39eaf933d)

A BetterDiscord plugin that allows you to upload and download very large files (~4GB without Nitro, ~20GB with Nitro) by seamlessly splitting them into smaller chunks and merging them back together.

![Version](https://img.shields.io/badge/version-1.0.8-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

BigFileTransfers enhances your Discord experience by enabling the transfer of very large files that exceed Discord's normal upload limits. The plugin intelligently splits large files into smaller chunks that fit within your upload limit, then automatically reassembles them on download. A file can span up to 200 chunks, so about 4GB without Nitro and 20GB with Nitro.

**⚠️ IMPORTANT:** The plugin works best when both the sender and receiver use it.
If you are unable to install BetterDiscord or this BigFileTransfers plugin and you want to merge a set of `.bftr` chunk files someone sent you, you can easily do that here:
https://pharaoh2k.github.io/BetterDiscordStuff/Merger/

## ✨ Features

- **📦 Large File Support**: Upload files far beyond your upload limit (~4GB without Nitro, ~20GB with Nitro) by automatically splitting them into chunks
- **🤖 Auto-Send Chunks**: Automatically sends remaining chunks after the first batch
- **💬 Receiver Note**: Ends each split upload with a short message telling receivers without the plugin how to get the file
- **⚡ Smart Assembly**: Seamlessly reassembles chunks on download
- **💾 Low Memory Mode**: Stream downloads directly to disk to save RAM
- **📊 Progress Tracking**: Real-time progress indicators for uploads and downloads
- **🔄 Auto Updates**: Automatic update checking with changelog display
- **🗑️ Fragment Management**: Delete chunk messages with customizable delays
- **🎯 Context Menu Integration**: Right-click options for downloads and fragment management
- **🔍 Smart Detection**: Automatically detects and manages chunk files
- **📋 Link Copying**: Copy all chunk URLs to clipboard for manual transfers

## 📦 Installation

1. Download [BigFileTransfers.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BigFileTransfers/BigFileTransfers.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

### Uploading Large Files

1. Drag and drop or select a file larger than your upload limit
2. The plugin automatically splits the file into chunks
3. The first batch of chunks is queued for upload
4. With Auto-Send enabled, remaining chunks are sent automatically after a delay, even in the background
5. Without Auto-Send, press Enter after each batch to send the next set of chunks
6. Once every chunk is sent, a short note tells the receiver to install BigFileTransfers or use the online [BFTR Merger](https://pharaoh2k.github.io/BetterDiscordStuff/Merger/) to get the file

### Downloading Large Files

1. Locate a message with chunk files (identified by the `.bftr` extension)
2. The plugin automatically detects complete downloads and displays them as a single file
3. Hover over the file attachment to reveal the download button (eye icon)
4. Click the download icon to reassemble and save the file
5. If chunks are missing, the plugin will automatically load older messages to find them
6. Progress is shown during the download process

### Context Menu Options

Right-click on messages containing chunks to access:
- **Download**: Reassemble and download the complete file
- **Copy Download Links**: Copy all chunk URLs to clipboard
- **Delete Download Fragments**: Remove all chunk messages (if you have permission)
- **Refresh Downloadables**: Manually refresh the list of available downloads

## ⚙️ Settings

Access settings through Discord Settings → Plugins → BigFileTransfers ⚙️

- **Auto-Send Chunks**: Automatically send remaining chunks after the first batch (Recommended: Enabled)
- **Chunk Deletion Delay**: Delay in seconds before auto-deleting each chunk message (Default: 2s)
- **Auto-Send Delay**: Delay in seconds before sending remaining chunks (Default: 5s)
- **Send Receiver Note**: After a split upload, send a message telling receivers without the plugin how to get the file (Enabled by default)
- **Low Memory Mode**: Save files directly to disk instead of assembling in RAM (Recommended for large files)
- **Automatic Updates**: Check for updates every 24 hours (Enabled by default)
- **Check for Updates**: Manually check for plugin updates
- **View Changelog**: View complete version history

## 📋 Technical Details

### How It Works

1. **Splitting**: Large files are split into chunks sized from the upload limits Discord reports for your account and channel, so every chunk fits the per-file limit and a full message of chunks fits the per-message limit
2. **Naming**: Each chunk is named with a special format: `{uploadId}_{chunkIndex}-{totalChunks}_{originalFilename}.bftr`
3. **Headers**: Each chunk has a 4-byte header containing magic bytes and chunk metadata
4. **Assembly**: On download, chunks are fetched, validated, and reassembled in the correct order

### Limitations

- Maximum 200 chunks per file
- Maximum file size: 200 chunks, so it grows with your upload limit
  - Larger upload limits mean bigger chunks, so fewer chunks and messages
  - At the time of writing: 20MB chunks without Nitro (up to ~4GB), 50MB with Nitro Basic (~10GB), ~100MB with Nitro (~20GB)
- Both sender and receiver must have the plugin installed
- Files over ~2GB are too big to reassemble in RAM, so they always download straight to disk, as in Low Memory Mode

### File Extensions

- `.bftr` - BigFileTransfers chunk file extension

## ⚠️ Known Limitations

- **Both users need the plugin**: The sender and receiver must both have BigFileTransfers installed
- **Message deletion**: Deleting chunk messages will make the file unrecoverable
- **Rate limits**: Very large files with many chunks may take time to upload due to Discord's rate limits
- **Maximum file size**: 200 chunks, about 4GB without Nitro and 20GB with Nitro

## 🔧 Troubleshooting

### Chunks not appearing?
- Ensure the plugin is enabled
- Reload Discord with Ctrl+R (Cmd+R on Mac)
- Check that the file is actually larger than your upload limit

### Download showing "Missing Chunks"?
- The plugin will automatically offer to load older messages
- Select "Load Messages" when prompted to fetch message history
- Verify that all chunk messages haven't been deleted

### Upload stuck or stalled?
- Press Enter to manually send the next batch
- Use Channel Context Menu → "Send queued split upload now"
- Check Discord console (Ctrl+Shift+I) for errors

### Low Memory Mode not available?
- Ensure you're using Discord Desktop (not browser)
- This feature requires native file system access

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Copyright © 2025-present Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BigFileTransfers/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- BetterDiscord community for the plugin API
- Discord for providing the platform
- All users who test and provide feedback

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BigFileTransfers/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
