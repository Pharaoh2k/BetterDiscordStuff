# [BigFileTransfers](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=BigFileTransfers "BigFileTransfers") Changelog

### 1.0.8
- Fixed large files being blocked by Discord's "file exceeds the size limit" error on accounts without Nitro
- Chunk sizes and chunks per message now follow the upload limits Discord reports for your account, so Nitro accounts send much bigger chunks in fewer messages
- Files within your upload limit are sent normally instead of being split
- Removed the ~2GB file size cap: a file can now span 200 chunks (~4GB without Nitro, ~20GB with Nitro), and files over ~2GB always download straight to disk
- Added a note at the end of each split upload that tells receivers without the plugin to install it or use the online BFTR Merger (can be turned off in settings)
- Remaining chunks are uploaded directly again instead of going through the message box
- Fixed the "Upload complete!" message never showing

### 1.0.7
- Fixed file uploads breaking on BetterDiscord 1.14

### 1.0.6
- Fixed the auto-updater installing updates to the wrong location

### 1.0.5
- Improved compatibility with other plugins
- Adjusted to match Discord changes

### 1.0.4
- Adjusted to match Discord changes

### 1.0.3
- Adjusted to match Discord changes
- Improved Nitro accounts compatibility

### 1.0.2
- Improved compatibility with other plugins

### 1.0.1
- Improved code quality (minor change)

### 1.0.0
- Initial public release
- Added automatic file splitting for large uploads (up to ~2GB)
- Added seamless chunk reassembly on download
- Added automatic chunk sending with configurable delays
- Added low memory mode for streaming downloads directly to disk
- Added real-time progress tracking for uploads and downloads
- Added context menu integration for download management
- Added fragment deletion with customizable delays
- Added smart chunk detection and hiding
- Added support for up to 200 chunks per file
- Added automatic message backfill for missing chunks
- Added copy chunk URLs to clipboard feature
- Added comprehensive settings panel
- Added automatic update checking with changelog display
- Added Discord theme integration
- Added support for all Discord upload limits (Non-Nitro, Nitro Basic, Nitro)
