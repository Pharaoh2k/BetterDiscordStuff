# PluginHub

A plugin store inside BetterDiscord's settings. Browse, install, update and remove unofficial
plugins from Pharaoh2k's hub (and other sources you add) without leaving Discord.

![Version](https://img.shields.io/badge/version-1.0.0-blue) ![BetterDiscord](https://img.shields.io/badge/BetterDiscord-1.14%2B-5865F2)

## What it does

PluginHub adds a **Plugin Hub** entry under the BetterDiscord header in Discord's settings, next to
Plugins and Themes. The page lists every plugin in the hub index with its author, version, size,
tags and description, and shows which ones you already have installed.

- **Browse**: search, sort (recently updated, name, recently added, author) and filter by tag.
- **Installed**: the hub plugins you have, with enable/disable switches and a list of other
  installed plugins the hub does not know about.
- **Updates**: everything with a newer version in the index, with per-plugin and Update all
  buttons, "What's new" changelogs and snoozing.

Each card has a menu with the changelog, source code, website, the plugin's own settings, backups
to restore and uninstall.

## Safety

Nothing is written to your plugins folder until the downloaded file passes every check:

1. The download URL is pinned to a specific commit on an allowed host (GitHub raw or jsDelivr).
2. The byte size and SHA-256 hash must match the index exactly.
3. The file must be valid UTF-8, carry a BetterDiscord meta header whose `@name` and `@version`
   match the index, and export a plugin.

If any check fails the hub explains why and installs nothing. Replaced files are backed up under
`plugins/.pluginhub/backups/<Name>/` and can be restored from the card menu. Each card shows who
published the plugin and, when the index carries a `review` entry, the result of the security
review it went through before being listed.

## Installation

1. Download `PluginHub.plugin.js` and put it in your BetterDiscord plugins folder
   (Settings > BetterDiscord > Plugins > Open Plugins Folder).
2. Enable it. **Plugin Hub** appears under the BetterDiscord header in settings.

## Settings

- **Updates**: automatic checks (on by default, every 4 hours), notifications, whether to notify
  about every known plugin or only ones installed through the hub, and auto-update for
  first-party plugins.
- **Installing**: enable plugins right after installing them; how many backups to keep.
- **Display**: NEW/UPDATED badges, deprecated plugins, and whether the hub sits under the
  BetterDiscord header or in its own section.
- **Sources**: extra index URLs (always shown as third-party), refresh and cache controls, and a
  button that opens the hub page.

## For plugin authors

The index is generated from this repository by `store/build-index.mjs`; see
[store/README.md](../../store/README.md) for the schema and how to add a plugin or a
third-party source.

## License

Copyright © 2026-present Pharaoh2k. All rights reserved. Free for personal use; see the
repository [LICENSE](../../LICENSE).
