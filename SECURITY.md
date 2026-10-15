# Security Policy

BetterDiscord plugins run inside your Discord client with the same access Discord itself has, so security reports are taken seriously and handled with priority.

## Supported Versions

Only the **latest version** of each plugin is supported. Every plugin checks for updates on its own, so please update to the latest version and confirm the problem still exists before reporting. You can find the current version of each plugin in the [README](README.md#-plugins).

## Reporting a Vulnerability

**Please do not report security problems in public issues, pull requests or Discord messages.**

Report them privately through GitHub instead:

1. Open the [Security tab](https://github.com/Pharaoh2k/BetterDiscordStuff/security) of this repository.
2. Click **Report a vulnerability**.
3. Describe the problem, which plugin and version is affected, and the steps to reproduce it. A proof of concept helps a lot.

Once the problem is confirmed, the fix ships as a regular plugin update, and you can be credited in the changelog if you like. Please allow a reasonable amount of time for that fix before disclosing anything publicly.

## Scope

**In scope**, for any plugin in this repository:

- Leaking your account token, messages, files or other private data
- Running code or loading content that comes from untrusted input (for example message content, file names or embeds)
- Sending data anywhere other than the services listed below
- Abusing the built-in update mechanism to deliver code from anywhere other than this repository

**Out of scope:**

- Bugs in Discord or BetterDiscord themselves. Please report those to [Discord](https://discord.com/security) or [BetterDiscord](https://github.com/BetterDiscord/BetterDiscord) directly.
- Attacks that need an already compromised computer or Discord account
- The fact that client mods are against Discord's Terms of Service
- Regular bugs and crashes with no security impact. Please use the [issue tracker](https://github.com/Pharaoh2k/BetterDiscordStuff/issues) for those.

## Network Access

For transparency, this is every place the plugins connect to:

| Destination | Used by | Why |
| --- | --- | --- |
| `raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff` | All plugins | Update checks and changelogs |
| Discord's CDN (`cdn.discordapp.com`) | Several plugins | Avatars, server icons and role icons |
| `drive.google.com`, `view.officeapps.live.com`, `www.viewstl.com` | BetterFileViewer | Previewing PDF, Office and STL attachments. The attachment's link is sent to that viewer when you open a preview. |

Everything else goes through Discord's own client, exactly as if you did it yourself. No plugin collects analytics or sends data to any other server.
