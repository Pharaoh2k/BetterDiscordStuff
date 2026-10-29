/**
 * @name ServerSearch
 * @version 1.0.0
 * @description Adds a search button to the server list that finds your servers by name and jumps straight to them.
 * @author Pharaoh2k
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/ServerSearch/ServerSearch.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/ServerSearch/ServerSearch.plugin.js
 */
/*
 * Copyright © 2025-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * * *
 * Contributions are welcome via GitHub pull requests.
 * Please ensure submissions align with the project's guidelines and coding standards.
 * By contributing, you agree that your work will be licensed under the same terms as this project.
*/
"use strict";
const { Components, Data, DOM, Hooks, Logger, Net, Patcher, Plugins, React, ReactUtils, UI, Utils, Webpack } = new BdApi("ServerSearch");
const { Filters } = Webpack;
const { GuildStore, SortedGuildStore, GuildReadStateStore } = Webpack.Stores;
const GITHUB = "Pharaoh2k/BetterDiscordStuff";
const panelConfig = [
	{
		type: "switch",
		id: "autoUpdate",
		name: "Automatic Updates",
		note: "Check for updates on startup and every 24 hours",
		value: true
	}
];
class UpdateManager {
	/* using Net, UI, Logger, Data, Plugins, Utils from BdApi */
	constructor(pluginName, version, github) {
		this.name = pluginName;
		this.version = version;
		const [user, repo] = github.split('/');
		this.urls = {
			plugin: `https://raw.githubusercontent.com/${user}/${repo}/main/Plugins/${pluginName}/${pluginName}.plugin.js`,
			changelog: `https://raw.githubusercontent.com/${user}/${repo}/main/Plugins/${pluginName}/CHANGELOG.md`
		};
		this.timer = null;
		this.notification = null;
		this._initialTimeout = null;
	}
	start(autoUpdate = true) {
		this.stop();
		if (autoUpdate) {
			this._initialTimeout = setTimeout(() => this.check(true), 15000);
			this.timer = setInterval(() => this.check(true), 24 * 60 * 60 * 1000);
		}
		this.showChangelog();
	}
	stop() {
		clearTimeout(this._initialTimeout);
		this._initialTimeout = null;
		clearInterval(this.timer);
		this.timer = null;
		this._closeNotification();
	}
	_closeNotification() {
		if (!this.notification) return;
		if (typeof this.notification === "function") this.notification();
		else if (this.notification.close) this.notification.close();
		this.notification = null;
	}
	async check(silent = false) {
		try {
			const res = await Net.fetch(this.urls.plugin);
			if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
			const text = await res.text();
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) throw new Error(`Remote plugin validation failed: ${validated.reason}`);
			const version = validated.version;
			if (this.isNewer(version)) {
				this.showUpdateNotice(version, text);
			} else if (!silent) {
				UI.showToast(`[${this.name}] You're up to date.`, { type: "info" });
			}
		} catch (e) {
			Logger.error("Update check failed:", e);
			if (!silent) UI.showToast(`[${this.name}] Update check failed`, { type: "error" });
		}
	}
	showUpdateNotice(version, text) {
		this._closeNotification();
		const handle = UI.showNotification({
			id: `bd-plugin-update:${this.name}`,
			title: this.name,
			content: `v${version} is available`,
			type: "info",
			duration: 6000000,
			actions: [
				{
					label: "Update",
					onClick: () => {
						this._closeNotification();
						this.applyUpdate(text);
					},
				},
				{
					label: "Dismiss",
					onClick: () => this._closeNotification(),
				},
			],
			onClose: () => {
				if (this.notification === handle) this.notification = null;
			},
		});
		this.notification = handle;
	}
	applyUpdate(text) {
		try {
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) {
				UI.showToast(`[${this.name}] Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
				return;
			}
			const nextVersion = validated.version;
			const path = require("path");
			const target = path.join(__dirname, path.basename(__filename));
			require("fs").writeFileSync(target, text);
			UI.showToast(`[${this.name}] Updated to v${nextVersion}. Reloading...`, { type: "success" });
			setTimeout(() => {
				try {
					Plugins.reload(this.name);
				} catch {
					UI.showToast(`[${this.name}] Please reload Discord (Ctrl+R)`, { type: "info", timeout: 0 });
				}
			}, 100);
		} catch (e) {
			Logger.error("Update failed:", e);
			UI.showToast(`[${this.name}] Update failed`, { type: "error" });
		}
	}
	async showChangelog() {
		const last = Data.load('version');
		if (last === this.version) return;
		Data.save('version', this.version);
		if (!last) return;
		try {
			const res = await Net.fetch(this.urls.changelog);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			if (changes.length === 0) return;
			UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes });
		} catch (e) { Logger.error("Changelog error:", e); }
	}
	async showFullChangelog() {
		try {
			const res = await Net.fetch(this.urls.changelog);
			if (res.status !== 200) throw new Error("Failed to fetch changelog");
			const md = await res.text();
			const changes = this.parseChangelog(md, "0.0.0", this.version);
			UI.showChangelogModal({
				title: this.name,
				subtitle: `All Changes`,
				changes: changes.length ? changes : [{ title: "No changes found", items: [] }]
			});
		} catch {
			UI.showToast("Could not fetch changelog", { type: "error" });
		}
	}
	parseChangelog(md, from, to) {
		const versions = this._parseChangelogVersions(md);
		const relevant = versions.filter(
			v => this.isNewer(v.version, from) && !this.isNewer(v.version, to)
		);
		const getType = (lower) => {
			if (lower.includes("fix")) return "fixed";
			if (lower.includes("add") || lower.includes("initial")) return "added";
			if (lower.includes("improv") || lower.includes("updat")) return "improved";
			return "other";
		};
		const sections = [
			["New Features", "added", "added"],
			["Improvements", "improved", "improved"],
			["Bug Fixes", "fixed", "fixed"],
			["Other Changes", "other", "progress"]
		];
		const result = [];
		for (const v of relevant) {
			const grouped = { added: [], improved: [], fixed: [], other: [] };
			for (const item of v.items) {
				grouped[getType(item.toLowerCase())].push(item);
			}
			result.push({ title: `Version ${v.version}`, type: "", items: [] });
			for (const [title, key, type] of sections) {
				if (grouped[key].length) {
					result.push({ title, type, items: grouped[key] });
				}
			}
		}
		return result;
	}
	_parseChangelogVersions(md) {
		const lines = md.split("\n");
		const versions = [];
		let current = null;
		let items = [];
		const push = () => {
			if (!current) return;
			versions.push({ version: current, items });
			items = [];
		};
		for (const line of lines) {
			const ver = line.match(/^###\s+([\d.]+)/)?.[1];
			if (ver) {
				push();
				current = ver;
				continue;
			}
			if (!current) continue;
			const trimmed = line.trim();
			if (!trimmed.startsWith("-")) continue;
			const item = trimmed.substring(1).trim();
			if (item) items.push(item);
		}
		push();
		return versions;
	}
	isNewer(remoteVersion, localVersion = this.version) {
		return Utils.semverCompare(localVersion, remoteVersion) > 0;
	}
	_validateRemotePluginText(text) {
		if (typeof text !== "string") return { ok: false, reason: "Not a string" };
		if (text.length < 800) return { ok: false, reason: "File too small" };
		const remoteName = text.match(/@name\s+([^\n\r]+)/)?.[1]?.trim();
		if (!remoteName) return { ok: false, reason: "Missing @name" };
		if (remoteName !== this.name) return { ok: false, reason: `Unexpected @name (${remoteName})` };
		const remoteVersion = text.match(/@version\s+([\d.]+)/)?.[1];
		if (!remoteVersion) return { ok: false, reason: "Missing @version" };
		if (!text.includes("module.exports")) return { ok: false, reason: "Missing module.exports" };
		if (!text.includes("@updateUrl")) return { ok: false, reason: "Missing @updateUrl header" };
		return { ok: true, version: remoteVersion };
	}
}
const { GuildsBar, Popout, GuildActions, IconUtils, buttonClasses, separatorClasses, scrollerClasses } = Webpack.getBulkKeyed({
	GuildsBar: { filter: Filters.byComponentType(Filters.byStrings("guildsnav")), searchExports: true },
	Popout: { filter: Filters.byStrings("Unsupported animation config:"), searchExports: true },
	GuildActions: { filter: Filters.byKeys("transitionToGuildSync") },
	IconUtils: { filter: Filters.byKeys("getGuildIconURL") },
	buttonClasses: { filter: Filters.byKeys("circleIconButton", "circleIcon") },
	separatorClasses: { filter: Filters.byKeys("guildSeparator") },
	scrollerClasses: { filter: Filters.byKeys("thin", "fade", "scrollbarGutterStable") }
});
const CSS = `
.ServerSearch-dock { display: flex; flex: none; flex-direction: column; align-items: center; gap: var(--space-xs, 8px); padding-bottom: calc(var(--space-xs, 8px) + 16px); }
.ServerSearch-button { border: none; border-radius: var(--radius-md); padding: 0; }
.ServerSearch-popout { display: flex; flex-direction: column; gap: 8px; box-sizing: border-box; width: 320px; height: min(480px, calc(100vh - 32px)); padding: 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--background-surface-higher); box-shadow: var(--shadow-high); color: var(--text-default); }
.ServerSearch-list { overflow-y: auto; margin-right: -8px; }
.ServerSearch-row { display: flex; align-items: center; gap: 10px; padding: 6px 8px; border-radius: var(--radius-sm); cursor: pointer; }
.ServerSearch-row.active { background: var(--background-mod-normal); }
.ServerSearch-icon { display: grid; flex: none; place-items: center; width: 32px; height: 32px; overflow: hidden; border-radius: 10px; background: var(--background-mod-strong); font-size: 12px; font-weight: 600; white-space: nowrap; object-fit: cover; }
.ServerSearch-text { flex: 1; min-width: 0; }
.ServerSearch-name, .ServerSearch-folder { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ServerSearch-name { font-size: 14px; font-weight: 500; line-height: 18px; }
.ServerSearch-folder { color: var(--text-muted); font-size: 12px; line-height: 16px; }
.ServerSearch-text mark { background: none; color: var(--text-brand); font-weight: 700; }
.ServerSearch-badge { flex: none; min-width: 16px; height: 16px; padding: 0 4px; box-sizing: border-box; border-radius: 8px; background: var(--status-danger); color: var(--white); font-size: 12px; font-weight: 700; line-height: 16px; text-align: center; }
.ServerSearch-unread { flex: none; width: 8px; height: 8px; border-radius: 50%; background: var(--text-default); }
.ServerSearch-empty { flex: 1; display: grid; place-items: center; padding: 0 16px; color: var(--text-muted); font-size: 14px; text-align: center; overflow-wrap: anywhere; }
.ServerSearch-hint { display: flex; justify-content: center; gap: 12px; color: var(--text-muted); font-size: 12px; }
.ServerSearch-hint kbd { margin-right: 4px; padding: 0 4px; border-radius: 4px; background: var(--background-mod-normal); font-family: inherit; font-weight: 600; }
`;
const WORD_CHAR = /[\p{L}\p{N}]/u;
// Folds case, accents and styled letters, so "cafe" also finds "Café" and "𝐂𝐚𝐟𝐞", and keeps which original
// characters each folded one came from so the match can be highlighted in the real name
const fold = text => {
	let value = "", index = 0;
	const starts = [], ends = [];
	for (const char of text) {
		const folded = char.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
		for (let i = 0; i < folded.length; i++) {
			starts.push(index);
			ends.push(index + char.length);
		}
		value += folded;
		index += char.length;
	}
	return { text, value, starts, ends };
};
// Ranks the best occurrence: 0 at the start, 1 at the start of a word, 2 anywhere else
const findMatch = (folded, query) => {
	let index = folded.value.indexOf(query), rank = 2;
	if (index === -1) return null;
	if (index === 0) rank = 0;
	else for (let i = index; i !== -1; i = folded.value.indexOf(query, i + 1)) {
		if (!WORD_CHAR.test(folded.value[i - 1])) {
			index = i;
			rank = 1;
			break;
		}
	}
	return { rank, start: folded.starts[index], end: folded.ends[index + query.length - 1] };
};
// The initials Discord shows for servers without an icon
const acronym = name => name.replace(/'s /g, " ").replace(/\w+/g, word => word[0]).replace(/\s/g, "");
// Servers in sidebar order, with the name of the folder they are in
const getEntries = () => SortedGuildStore.getGuildFolders().flatMap(folder => folder.guildIds
	.map(id => GuildStore.getGuild(id))
	.filter(Boolean)
	.map(guild => ({ guild, name: fold(guild.name), initials: fold(acronym(guild.name)).value, folder: folder.folderName ? fold(folder.folderName) : null })));
// Ranks name start, word start, initials, anywhere in the name, then folder name; the sort is stable, so ties keep sidebar order
const search = (entries, query) => {
	if (!query) return entries.map(entry => ({ entry }));
	const results = [];
	for (const entry of entries) {
		const name = findMatch(entry.name, query);
		const rank = name?.rank < 2 ? name.rank : entry.initials.startsWith(query) ? 2 : name ? 3 : 4;
		const folder = rank === 4 && entry.folder ? findMatch(entry.folder, query) : null;
		if (rank < 4 || folder) results.push({ entry, name, folder, rank });
	}
	return results.sort((a, b) => a.rank - b.rank);
};
const highlight = (folded, match) => match
	? React.createElement(React.Fragment, null, folded.text.slice(0, match.start), React.createElement("mark", null, folded.text.slice(match.start, match.end)), folded.text.slice(match.end))
	: folded.text;
const SearchIcon = ({ className }) => React.createElement("svg", { className, width: 24, height: 24, viewBox: "0 0 24 24", "aria-hidden": true },
	React.createElement("path", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", d: "M15.62 17.03a9 9 0 1 1 1.41-1.41l4.68 4.67a1 1 0 0 1-1.42 1.42l-4.67-4.68ZM17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" }));
const ResultRow = ({ result, active, onHover, onSelect }) => {
	const { guild, name, folder } = result.entry;
	const mentions = Hooks.useStateFromStores([GuildReadStateStore], () => GuildReadStateStore.getMentionCount(guild.id));
	const unread = Hooks.useStateFromStores([GuildReadStateStore], () => GuildReadStateStore.hasUnread(guild.id));
	const icon = IconUtils.getGuildIconURL({ id: guild.id, icon: guild.icon, size: 64 });
	return React.createElement("div", { role: "option", "aria-selected": active, className: Utils.className("ServerSearch-row", active && "active"), onMouseMove: onHover, onClick: onSelect },
		icon
			? React.createElement("img", { className: "ServerSearch-icon", src: icon, alt: "" })
			: React.createElement("div", { className: "ServerSearch-icon" }, acronym(guild.name)),
		React.createElement("div", { className: "ServerSearch-text" },
			React.createElement("div", { className: "ServerSearch-name" }, highlight(name, result.name)),
			folder && React.createElement("div", { className: "ServerSearch-folder" }, highlight(folder, result.folder))),
		mentions > 0
			? React.createElement("span", { className: "ServerSearch-badge" }, mentions)
			: unread && React.createElement("span", { className: "ServerSearch-unread" }));
};
const SearchPopout = ({ closePopout }) => {
	const [entries] = React.useState(getEntries);
	const [query, setQuery] = React.useState("");
	const [active, setActive] = React.useState(0);
	const listRef = React.useRef(null);
	const results = React.useMemo(() => search(entries, fold(query.trim()).value), [entries, query]);
	React.useEffect(() => listRef.current?.children[active]?.scrollIntoView({ block: "nearest" }), [active, results]);
	const open = result => {
		if (!result) return;
		closePopout();
		GuildActions.transitionToGuildSync(result.entry.guild.id);
	};
	const onKeyDown = event => {
		const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
		if (step && results.length) setActive(index => (index + step + results.length) % results.length);
		else if (event.key === "Enter") open(results[active]);
		else return;
		event.preventDefault();
	};
	return React.createElement("div", { className: "ServerSearch-popout" },
		React.createElement(Components.SearchInput, {
			placeholder: `Search ${entries.length} servers`,
			onKeyDown,
			onChange: value => {
				setQuery(value);
				setActive(0);
			}
		}),
		results.length
			? React.createElement("div", { ref: listRef, role: "listbox", className: Utils.className(scrollerClasses.thin, scrollerClasses.fade, scrollerClasses.scrollbarGutterStable, "ServerSearch-list") }, results.map((result, index) => React.createElement(ResultRow, {
				key: result.entry.guild.id,
				result,
				active: index === active,
				onHover: () => setActive(index),
				onSelect: () => open(result)
			})))
			: React.createElement("div", { className: "ServerSearch-empty" }, `No servers match "${query.trim()}"`),
		React.createElement("div", { className: "ServerSearch-hint" },
			React.createElement("span", null, React.createElement("kbd", null, "↑↓"), "Select"),
			React.createElement("span", null, React.createElement("kbd", null, "Enter"), "Open"),
			React.createElement("span", null, React.createElement("kbd", null, "Esc"), "Close")));
};
const SearchButton = () => {
	const ref = React.useRef(null);
	return React.createElement(Popout, {
		targetElementRef: ref,
		position: "right",
		align: "bottom",
		spacing: 16,
		renderPopout: props => React.createElement(SearchPopout, props)
	}, (popoutProps, { isShown }) => React.createElement(Components.Tooltip, { text: "Search Servers", position: "right", shouldShow: !isShown }, tooltipProps => React.createElement("button", {
		...tooltipProps,
		...popoutProps,
		ref,
		type: "button",
		"aria-label": "Search Servers",
		className: Utils.className(buttonClasses.circleIconButton, isShown && buttonClasses.selected, "ServerSearch-button")
	}, React.createElement(SearchIcon, { className: buttonClasses.circleIcon }))));
};
const Dock = () => React.createElement(Components.ErrorBoundary, { id: "dock", name: "ServerSearch", hideError: true },
	React.createElement("div", { className: "ServerSearch-dock" },
		React.createElement("div", { className: separatorClasses.guildSeparator }),
		React.createElement(SearchButton)));
// Pins the dock below the scrolling server list, where Discord pins its own buttons
const injectDock = (_, res) => {
	const themed = Utils.findInTree(res, node => typeof node?.props?.children === "function", { walkable: ["props", "children"] });
	if (!themed) return;
	const render = themed.props.children;
	themed.props.children = (...args) => {
		const nav = render(...args);
		const tree = Utils.findInTree(nav, node => node?.props?.role === "tree", { walkable: ["props", "children"] });
		if (Array.isArray(tree?.props.children)) tree.props.children.push(React.createElement(Dock, { key: "ServerSearch" }));
		return nav;
	};
};
const setType = (fiber, type) => {
	for (const node of [fiber, fiber.alternate]) if (node) node.type = node.elementType = type;
};
module.exports = class ServerSearch {
	constructor(meta) {
		this.updateManager = new UpdateManager(meta.name, meta.version, GITHUB);
		this.settings = { ...Object.fromEntries(panelConfig.map(s => [s.id, s.value])), ...Data.load("settings") };
	}
	start() {
		DOM.addStyle(CSS);
		this.nodePatcher = ReactUtils.createNodePatcher();
		// The memo renders the server list body, which holds the list itself
		Patcher.after(GuildsBar, "type", (_, __, res) => {
			const body = res?.props?.children;
			if (typeof body?.type !== "function") return;
			this.bodyType ??= body.type;
			this.nodePatcher.patch(body, injectDock);
		});
		this.redraw(true);
		this.updateManager.start(this.settings.autoUpdate);
	}
	stop() {
		this.updateManager.stop();
		this.nodePatcher.destroy();
		Patcher.unpatchAll();
		this.redraw(false);
		DOM.removeStyle();
	}
	// Discord mounts the server list once, so point its mounted components at the (un)patched ones and let it redraw
	redraw(patched) {
		const tree = document.querySelector('[data-list-id="guildsnav"]');
		if (!tree) return;
		let fiber = ReactUtils.getInternalInstance(tree);
		while (fiber && fiber.elementType !== GuildsBar) fiber = fiber.return;
		const inner = fiber?.child;
		// The body is the first component below the list navigation provider the memo renders around it
		let body = inner?.child?.child;
		while (body && typeof body.type !== "function") body = body.child;
		if (!body) return;
		this.bodyType ??= body.type;
		const element = { type: this.bodyType };
		if (patched) this.nodePatcher.patch(element, injectDock);
		setType(inner, GuildsBar.type);
		setType(body, element.type);
		// A scroll makes the list update its own state and render again
		tree.firstElementChild?.dispatchEvent(new Event("scroll"));
	}
	getSettingsPanel() {
		return UI.buildSettingsPanel({
			settings: [
				...panelConfig.map(s => ({ ...s, value: this.settings[s.id] })),
				{
					type: "button",
					id: "checkUpdate",
					name: "Check for Updates",
					note: "Manually check if a new version is available",
					children: "Check Now",
					onClick: () => this.updateManager.check()
				},
				{
					type: "button",
					id: "viewChangelog",
					name: "View Changelog",
					note: "View the complete changelog for this plugin",
					children: "View Changelog",
					onClick: () => this.updateManager.showFullChangelog()
				}
			],
			onChange: (_, id, value) => {
				this.settings[id] = value;
				Data.save("settings", this.settings);
				if (id === "autoUpdate") {
					if (value) this.updateManager.start(true);
					else this.updateManager.stop();
				}
			}
		});
	}
};
