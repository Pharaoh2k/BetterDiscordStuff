# AudioToolbox

A comprehensive audio toolkit for Discord voice messages and audio attachments - featuring download capabilities with instant format conversions, EQ presets, playback speed control, advanced looping, queue mode, batch operations, and auto-download.

![Version](https://img.shields.io/badge/version-2.0.1-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![Discord](https://img.shields.io/badge/discord-BetterDiscord-7289DA.svg)

## 📖 Description

AudioToolbox (formerly AudioDownloader) transforms how you interact with audio in Discord. Download voice messages and audio attachments with powerful format conversion, apply professional EQ presets, control playback speed, create precise A/B loops, enable queue mode for continuous listening, and even set up auto-download for specific channels.

## ✨ Features

### 🎵 Audio Download & Conversion
- **Multiple Download Modes**: Direct to folder, save-as dialog, or open in browser
- **Format Conversion**: Convert audio to WAV or M4A/AAC on download
- **Custom Filenames**: Use templates with tokens ({author}, {date}, {time}, {duration}, {channel}, {messageId})
- **Batch Download**: Download all cached audio from a channel at once
- **Auto-Download**: Enable automatic downloads for specific channels
- **Download History**: Track up to 200 downloads with detailed information

### 🎚️ Playback Controls
- **Speed Control**: Adjust playback speed (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x, 3x)
- **EQ Presets**: Professional audio equalization
  - Off (Flat response)
  - Bass Boost (Enhanced low frequencies)
  - Treble Boost (Enhanced high frequencies)
  - Voice Enhance (Optimized for speech clarity)
  - Bass Cut (Reduced low frequencies)
- **Basic Loop**: Loop individual audio messages continuously
- **A/B Loop**: Set two points and loop between them for focused listening
- **Queue Mode**: Auto-play next audio message when current finishes

### 🎯 User Interface
- **Inline Controls**: Loop and menu buttons appear directly on audio messages
- **Context Menu**: Right-click audio messages for full toolbox options
- **Visual Feedback**: Active loop states clearly indicated
- **Theme Integration**: Seamlessly matches Discord's appearance

### 🔄 Auto Updates
- **Update Checking**: Automatic checks every 24 hours
- **Changelog Display**: See what's new after updates
- **Manual Updates**: Check and install updates anytime from settings

## 📦 Installation

1. Download [AudioToolbox.plugin.js](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/AudioToolbox/AudioToolbox.plugin.js)
2. Place the file in your BetterDiscord plugins folder:
   - Windows: `%appdata%\BetterDiscord\plugins`
   - macOS: `~/Library/Application Support/BetterDiscord/plugins`
   - Linux: `~/.config/BetterDiscord/plugins`
3. Enable the plugin in Discord Settings → Plugins

## 🚀 Usage

### Basic Download
1. Find a message with a voice recording or audio attachment
2. Right-click the message or click the three-dot menu button
3. Select "Audio Toolbox" → "Download"
4. Audio is saved according to your settings

### Playback Controls
1. Click the loop button (circular arrow icon) to enable/disable basic looping
2. Click the three-dot menu button for advanced options:
   - **Speed**: Change playback speed from 0.5x to 3x
   - **EQ**: Apply audio equalization presets
   - **A/B Loop**: Set two loop points for precise section repetition
   - **Queue Mode**: Enable continuous playback of multiple audio messages

### Advanced Features
- **Batch Download**: Right-click any message → Audio Toolbox → Download All Audio (Cached)
- **Auto-Download**: Right-click any message → Audio Toolbox → Enable Auto-Download Here
- **Custom Filenames**: Configure filename templates in settings with multiple tokens
- **Format Conversion**: Choose to convert audio to WAV or M4A/AAC automatically

## ⚙️ Settings

Access settings through Discord Settings → Plugins → AudioToolbox ⚙️

### General Settings
- **Automatic Updates**: Check for updates every 24 hours (enabled by default)
- **Download Mode**: Choose how files are saved
  - Direct to folder (saves immediately)
  - Save-as dialog (choose location each time)
  - Open in browser (legacy mode)
- **Download Folder**: Set custom download location (defaults to system Downloads)
- **Show 'Open in Folder' Toast**: Display clickable notification to open download folder

### Filename Customization
- **Filename Template**: Customize output filenames with tokens:
  - `{author}` - Username of message author
  - `{date}` - Date in YYYY-MM-DD format
  - `{time}` - Time in HH-MM-SS format
  - `{duration}` - Audio duration (e.g., "42s")
  - `{channel}` - Channel name
  - `{messageId}` - Unique message identifier
  - Example: `{author}_{date}_{time}` produces `Username_2025-02-09_14-30-45.ogg`

### Audio Conversion
- **Convert Format**: Choose output format
  - Keep original (no conversion)
  - Convert to WAV (uncompressed, high quality)
  - Convert to M4A/AAC (compressed, widely compatible)

### Management Tools
- **Check for Updates**: Manually check for plugin updates
- **View Changelog**: Review all version changes
- **View History**: See last 200 downloads with details
- **Clear History**: Remove all download history entries

## 🎛️ EQ Presets Explained

### Off (Flat)
Unmodified audio with no equalization applied.

### Bass Boost
Enhances low frequencies (200 Hz and below) by +12 dB. Great for music with strong bass lines or when you want more punch.

### Treble Boost
Enhances high frequencies (3000 Hz and above) by +8 dB. Adds clarity and brightness, useful for podcasts or vocal-heavy content.

### Voice Enhance
Optimized for speech clarity:
- Reduces bass (-4 dB at 200 Hz) to minimize rumble
- Boosts mid-range (+6 dB at 2500 Hz) for voice presence
- Enhances treble (+3 dB at 5000 Hz) for consonant clarity

### Bass Cut
Reduces low frequencies (-12 dB at 200 Hz and below). Useful for removing rumble or when listening in bass-heavy environments.

## 🔁 Loop Modes Explained

### Basic Loop
Click the loop button to continuously repeat the current audio. Perfect for music you want to hear on repeat.

### A/B Loop
1. Play the audio to your desired start point
2. Open the menu → A/B Loop → Set Point A
3. Continue playing to your desired end point
4. Open the menu → A/B Loop → Set Point B
5. Audio will now loop between points A and B

Use case: Learning language from voice messages, studying music sections, or focusing on specific parts of recordings.

### Queue Mode
Enable queue mode to automatically play the next audio message when the current one finishes. Works with basic loop disabled and without A/B loop set.

## 📁 Supported Formats

### Input (Download from Discord)
- OGG (voice messages)
- MP3
- WAV
- M4A
- FLAC
- AAC
- WEBM
- Any audio MIME type

### Output (After Conversion)
- Original format (no conversion)
- WAV (uncompressed PCM audio)
- M4A/AAC (compressed audio using browser's MediaRecorder)

## ❓ Troubleshooting

### Download not working?
- Check your download folder permissions
- Verify the download folder exists (or leave empty for system Downloads)
- Try switching to "Save-as dialog" mode
- Check Discord console (Ctrl+Shift+I) for errors

### Audio not playing after EQ applied?
- EQ requires fetching the full audio file
- Ensure you have an active internet connection
- Large files may take a moment to process
- Check browser console for MediaRecorder support errors

### Loop button not appearing?
- Ensure the plugin is enabled
- Try reloading Discord (Ctrl+R or Cmd+R)
- Check if Discord updated and broke compatibility

### Format conversion failed?
- WAV conversion works in all modern browsers
- M4A/AAC requires MediaRecorder support for AAC codec
- Try converting to WAV instead if M4A fails
- Check browser console for specific error messages

### Auto-download not triggering?
- Verify you enabled it for the specific channel
- Plugin must be running when new messages arrive
- Only works for new messages, not existing ones

## 🔒 Privacy & Security

- All audio processing happens locally in your browser
- Download history is stored locally in BetterDiscord's data folder
- No audio data is sent to external servers (except Discord's own CDN)
- EQ processing fetches audio from Discord's CDN for client-side processing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Copyright © 2025-present Pharaoh2k. All rights reserved.
Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.

Contributions are welcome via GitHub pull requests. Please ensure submissions align with the project's guidelines and coding standards.

## 🔗 Links

- [GitHub Repository](https://github.com/Pharaoh2k/BetterDiscordStuff)
- [Plugin Website](https://pharaoh2k.github.io/BetterDiscordStuff/)
- [Download Plugin](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/AudioToolbox/AudioToolbox.plugin.js)
- [Changelog](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/AudioToolbox/CHANGELOG.md)

## 👥 Author

**Pharaoh2k**
- GitHub: [@Pharaoh2k](https://github.com/Pharaoh2k)
- Discord ID: 874825550408089610
- Twitter: [@_Pharaoh2k](https://twitter.com/_Pharaoh2k)
- Website: [pharaoh2k.github.io/BetterDiscordStuff](https://pharaoh2k.github.io/BetterDiscordStuff/)

## 🙏 Acknowledgments

- BetterDiscord community for the plugin API and support
- Web Audio API for enabling real-time audio processing
- MediaRecorder API for audio format conversion
- All users who provided feedback and feature requests

## 📈 Version History

See [CHANGELOG.md](https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/AudioToolbox/CHANGELOG.md) for detailed version history.

---

Made with ❤️ for the BetterDiscord community
