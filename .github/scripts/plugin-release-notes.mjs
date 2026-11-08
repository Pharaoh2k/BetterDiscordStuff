// Prints the description of the "plugins" release: install steps and a table of every plugin, read from plugin.json
import fs from "node:fs";

const repo = process.env.GITHUB_REPOSITORY || "Pharaoh2k/BetterDiscordStuff";
const cell = (text) => String(text ?? "").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();

const plugins = fs.readdirSync("Plugins", { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name)
	.filter((name) => fs.existsSync(`Plugins/${name}/plugin.json`) && fs.existsSync(`Plugins/${name}/${name}.plugin.js`))
	.map((name) => ({ folder: name, ...JSON.parse(fs.readFileSync(`Plugins/${name}/plugin.json`, "utf8")) }))
	.sort((a, b) => a.folder.localeCompare(b.folder));

const rows = plugins.map((p) => `| [${cell(p.name || p.folder)}](https://github.com/${repo}/tree/main/Plugins/${p.folder}) | ${cell(p.version)} | ${cell(p.description)} |`);

process.stdout.write(`## If you use these plugins, please star ⭐ the repo. It's free of charge and only takes a moment. :)

Every BetterDiscordStuff plugin in one place, always at its newest version. This release updates itself automatically whenever a plugin changes.

---

### 📦 Installation

1. Download the \`.plugin.js\` file of the plugin you want from **Assets** below.
2. Put it in your BetterDiscord plugins folder:
   - Windows: \`%appdata%\\BetterDiscord\\plugins\`
   - macOS: \`~/Library/Application Support/BetterDiscord/plugins\`
   - Linux: \`~/.config/BetterDiscord/plugins\`
3. Enable it in **Discord Settings → Plugins**.

Installed plugins update themselves, so you only need to download each one once.

---

### 🧩 Plugins

| Plugin | Version | Description |
|---|---|---|
${rows.join("\n")}

---

### 📜 Changelogs

What changed in each version is in each plugin's \`CHANGELOG.md\`, in its folder linked above.
`);
