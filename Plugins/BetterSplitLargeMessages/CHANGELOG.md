# [BetterSplitLargeMessages](https://pharaoh2k.github.io/BetterDiscordStuff/?plugin=BetterSplitLargeMessages "BetterSplitLargeMessages") Changelog

### 1.0.0
- Initial public release
- Automatic message splitting for messages exceeding Discord's character limit
- Smart splitting algorithm (newlines, spaces, avoiding word breaks)
- Full markdown preservation across chunks (bold, italic, code blocks, spoilers, etc.)
- Auto-detection of server limits (2000 for regular users, 4000 for Nitro users)
- Configurable delay between chunks (2-10 seconds)
- Optional maximum chunks per message safety cap
- Slowmode support with configurable threshold
- Permission-aware slowmode bypass for users with MANAGE_MESSAGES or MANAGE_CHANNELS
- Hide Nitro upsell banners and modals
- Hard split mode option for exact character splitting
- Protection against splitting inside markdown links
- Rate limiting protection
- Comprehensive settings panel with live updates
- Built with modern BdApi (no deprecated dependencies)
