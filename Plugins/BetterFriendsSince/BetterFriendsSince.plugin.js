/**
 * @name BetterFriendsSince
 * @author Pharaoh2k
 * @description Shows the date you and a friend became friends in the profile modal and Friends sidebar.
 * @version 1.2.1
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterFriendsSince/BetterFriendsSince.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterFriendsSince/BetterFriendsSince.plugin.js
 */
/*
This project includes code originally licensed under the MIT License:
Copyright (c) 2021 Robert Delaney
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/*
Substantial modifications, additions, and refactored components created by
Pharaoh2k are © 2025 Pharaoh2k. All rights reserved.
These proprietary portions are licensed separately and may not be copied,
modified, or redistributed without prior written consent from Pharaoh2k.
This restriction applies only to Pharaoh2k's original contributions and does
not affect code covered under the MIT License above.
Contributions are welcome via GitHub pull requests. Please ensure submissions
align with the project's guidelines and coding standards.
*/
"use strict";
const { Webpack, Patcher, React, Utils, UI, Logger, Hooks, Data, Net } = BdApi;
const { Filters } = Webpack;
class UpdateManager {
	constructor(pluginName, version, github = "Pharaoh2k/BetterFriendsSince") {
		this.name = pluginName;
		this.version = version;
		const [user, repo] = github.split('/');
		this.urls = {
			plugin: `https://raw.githubusercontent.com/${user}/${repo}/refs/heads/main/Plugins/${pluginName}/${pluginName}.plugin.js`,
			changelog: `https://raw.githubusercontent.com/${user}/${repo}/refs/heads/main/Plugins/${pluginName}/CHANGELOG.md`
		};
		this.timer = null;
		this.notification = null;
	}
	async start(autoUpdate = true) {
		if (autoUpdate) {
			setTimeout(() => this.check(true), 15000);
			this.timer = setInterval(() => this.check(true), 24 * 60 * 60 * 1000);
		}
		this.showChangelog();
	}
	stop() {
		clearInterval(this.timer);
		if (typeof this.notification === "function") this.notification();
		else this.notification?.close?.();
		this.notification = null;
	}
	async check(silent = false) {
		try {
			const res = await Net.fetch(this.urls.plugin);
			if (res.status !== 200) throw new Error("Failed to fetch plugin");
			const text = await res.text();
			const version = text.match(/@version\s+([\d.]+)/)?.[1];
			if (!version) throw new Error("No version found in remote file");
			if (this.isNewer(version)) {
				this.showUpdateNotice(version, text);
			} else if (!silent) {
				UI.showToast(`[${this.name}] You're up to date.`, { type: 'info' });
			}
		} catch (e) {
			Logger.error(this.name, "Update check failed:", e);
			if (!silent) UI.showToast(`[${this.name}] Update check failed`, { type: 'error' });
		}
	}
	showUpdateNotice(version, text) {
		if (typeof this.notification === "function") this.notification();
		else this.notification?.close?.();
		let handle = null;
		const closeHandle = () => {
			if (typeof handle === "function") handle();
			else handle?.close?.();
		};
		handle = UI.showNotification?.({
			id: `bd-plugin-update:${this.name}`,
			title: `${this.name}`,
			content: `v${version} is available`,
			type: "info",
			duration: 6000000,
			actions: [
				{
					label: "Update",
					onClick: () => {
						closeHandle();
						this.applyUpdate(text, version);
					},
				},
				{
					label: "Dismiss",
					onClick: closeHandle,
				},
			],
			onClose: () => {
				if (this.notification === handle) this.notification = null;
			},
		}) ?? UI.showNotice(`${this.name} v${version} is available`, {
			type: "info",
			buttons: [
				{
					label: "Update",
					onClick: (closeOrEvent) => {
						if (typeof closeOrEvent === "function") closeOrEvent();
						else closeHandle();
						this.applyUpdate(text, version);
					},
				},
				{
					label: "Dismiss",
					onClick: (closeOrEvent) => {
						if (typeof closeOrEvent === "function") closeOrEvent();
						else closeHandle();
					},
				},
			],
		});
		this.notification = handle;
	}
	applyUpdate(text, version) {
		try {
			require('fs').writeFileSync(__filename, text);
			UI.showToast(`Updated to v${version}. Reloading...`, { type: 'success' });
			setTimeout(() => {
				try {
					BdApi.Plugins.reload(this.name);
				} catch {
					UI.showToast('Please reload Discord (Ctrl+R)', { type: 'info', timeout: 0 });
				}
			}, 100);
		} catch (e) {
			Logger.error(this.name, "Update failed:", e);
			UI.showToast('Update failed', { type: 'error' });
		}
	}
	async showChangelog() {
		const last = Data.load(this.name, 'version');
		if (last === this.version) return;
		Data.save(this.name, 'version', this.version);
		if (!last) return;
		try {
			const res = await Net.fetch(this.urls.changelog);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			if (changes.length === 0) return;
			UI.showChangelogModal({
				title: this.name,
				subtitle: `Version ${this.version}`,
				changes
			});
		} catch (e) {
			Logger.warn(this.name, "Changelog fetch failed:", e);
		}
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
		const grouped = { added: [], improved: [], fixed: [], other: [] };
		const getType = (lower) => {
			if (lower.includes("fix")) return "fixed";
			if (lower.includes("add") || lower.includes("initial")) return "added";
			if (lower.includes("improv") || lower.includes("updat")) return "improved";
			return "other";
		};
		for (const v of relevant) {
			for (const item of v.items) {
				const lower = item.toLowerCase();
				const tagged = `${item} (v${v.version})`;
				grouped[getType(lower)].push(tagged);
			}
		}
		const sections = [
			["New Features", "added", "added"],
			["Improvements", "improved", "improved"],
			["Bug Fixes", "fixed", "fixed"],
			["Other Changes", "other", "progress"]
		];
		const result = [];
		for (const [title, key, type] of sections) {
			if (grouped[key].length) {
				result.push({ title, type, items: grouped[key] });
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
	isNewer(v1, v2 = this.version) {
		return Utils.semverCompare(v2, v1) === 1;
	}
}
const HEADING_BY_LOCALE = Object.freeze({
	"ar": "أصدقاء منذ",
	"da": "Venner siden",
	"de": "Freunde seit",
	"en-GB": "Friends since",
	"en-US": "Friends since",
	"es-ES": "Amigos desde",
	"es-419": "Amigos desde",
	"fr": "Amis depuis",
	"he": "חברים מאז",
	"hr": "Prijatelji od",
	"id": "Berteman sejak",
	"it": "Amici dal",
	"lt": "Draugai nuo",
	"hu": "Barátok amióta",
	"nl": "Vrienden sinds",
	"no": "Venner siden",
	"pl": "Znajomi od",
	"pt-BR": "Amigos desde",
	"pt-PT": "Amigos desde",
	"ro": "Prieteni din",
	"fi": "Ystäviä alkaen",
	"sv-SE": "Vänner sedan",
	"vi": "Bạn bè từ",
	"tr": "Arkadaşlar desde",
	"cs": "Přátelé od",
	"el": "Φίλοι από",
	"bg": "Приятели от",
	"ru": "Друзья с",
	"uk": "Друзі з",
	"hi": "दोस्त तब से",
	"th": "เป็นเพื่อนกันตั้งแต่",
	"zh-CN": "成为好友自",
	"ja": "友達になった日",
	"zh-TW": "成為好友自",
	"ko": "친구가 된 날짜",
	"sk": "Priatelia od"
});
const DEFAULT_SETTINGS = Object.freeze({
	autoUpdate: true
});
const formatSinceDate = (value, locale) => {
	if (value == null || value === "") return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return date.toLocaleDateString(locale || "en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
};
const findProfileBody = tree =>
	Utils.findInTree(
		tree,
		n => n && typeof n.className === "string" && n.className.includes("profileBody"),
		{ walkable: ["props", "children"] }
	);
const getCurrentLocale = LocaleStore => LocaleStore?.locale ?? LocaleStore?.systemLocale ?? "en-US";
const getHeadingForLocale = locale => HEADING_BY_LOCALE[locale] ?? HEADING_BY_LOCALE["en-US"];
const isAbortError = err => err?.name === "AbortError";
const findSidebarSectionKey = (mod) => {
	if (typeof mod !== "object" || mod === null) return null;
	return Object.keys(mod).find(k => {
		try {
			const value = mod[k];
			return typeof value === "function" &&
				value.toString().includes('introText:') &&
				value.toString().includes('scrollIntoView:');
		} catch {
			return false;
		}
	}) ?? null;
};
const tryFilters = async (filterConfigs, signal, pluginName) => {
	for (let i = 0; i < filterConfigs.length; i++) {
		const { filter, options = {} } = filterConfigs[i];
		try {
			const module = Webpack.getModule(filter, options);
			if (module) {
				if (i > 0) Logger.info(pluginName, `Found using fallback filter ${i + 1}`);
				return module;
			}
		} catch { /* try next */ }
	}
	try {
		const { filter, options = {} } = filterConfigs[0];
		return await Webpack.waitForModule(filter, { signal, ...options });
	} catch { return null; }
};
const createGetFriendSince = store => {
	const hasGetSince = typeof store?.getSince === "function";
	const hasGetSinces = typeof store?.getSinces === "function";
	if (!hasGetSince && !hasGetSinces) return () => null;
	return userId => {
		if (!store?.isFriend?.(userId)) return null;
		if (hasGetSince) return store.getSince(userId) ?? null;
		const sinces = store.getSinces();
		return sinces?.[userId] ?? null;
	};
};
const createUseBetterFriendsSince = (RelationshipStore, LocaleStore, getFriendSince) =>
	userId => {
		const since = Hooks.useStateFromStores(
			[RelationshipStore],
			() => getFriendSince(userId)
		);
		const locale = Hooks.useStateFromStores(
			[LocaleStore],
			() => getCurrentLocale(LocaleStore)
		);
		const dateLabel = React.useMemo(
			() => formatSinceDate(since, locale),
			[since, locale]
		);
		return { since, locale, dateLabel };
	};
const BetterFriendsSince = meta => {
	let abortController = null;
	let RelationshipStore = null;
	let LocaleStore = null;
	let Section = null;
	let Text = null;
	let SidebarSectionComponent = null;
	let useBetterFriendsSince = null;
	let getFriendSince = null;
	let settings = { ...DEFAULT_SETTINGS, ...Data.load(meta.name, "settings") };
	const updateManager = new UpdateManager(meta.name, meta.version, "Pharaoh2k/BetterDiscordStuff");
	const saveSettings = () => Data.save(meta.name, "settings", settings);
	const extractTextComponent = module => {
		if (!module) return null;
		if (module.render) return module;
		if (typeof module === "object") {
			const candidate = Object.values(module).find(v => v && v.render);
			if (candidate) return candidate;
		}
		return null;
	};
	const resolveTextComponent = async signal => {
		const filters = [
			Filters.bySource("data-text-variant"),
			Filters.bySource("lineClamp", "selectable")
		];
		for (const filter of filters) {
			try {
				const textModule = await Webpack.waitForModule(filter, { signal });
				if (signal.aborted) return null;
				const component = extractTextComponent(textModule);
				if (component) return component;
			} catch (e) {
				Logger.warn(meta.name, "Text resolution attempt failed.", e);
			}
		}
		return null;
	};
	const createBetterFriendsSinceComponent = (render, requiresSection) =>
		React.memo(({ userId }) => {
			if (!useBetterFriendsSince || !RelationshipStore || !LocaleStore || !Text) return null;
			if (requiresSection && !Section) return null;
			const data = useBetterFriendsSince(userId);
			if (!data?.since || !data.dateLabel) return null;
			return render(data, userId);
		});
	const BetterFriendsSinceProfileSection = createBetterFriendsSinceComponent(
		({ locale, dateLabel }) =>
			React.createElement(
				Section,
				{ heading: getHeadingForLocale(locale) },
				React.createElement(Text, { variant: "text-sm/normal" }, dateLabel)
			),
		true
	);
	const BetterFriendsSinceSidebarContent = createBetterFriendsSinceComponent(
		({ dateLabel }) =>
			React.createElement(
				Text,
				{
					variant: "text-sm/normal"
				},
				dateLabel
			)
	);
	const handleSidebarPatch = (_, [props], returnValue) => {
		if (!props || !returnValue) return;
		if (props.__BetterFriendsSinceInjected) return;
		const childProps = props.children?.props;
		const userId = childProps?.userId ?? childProps?.userID ?? null;
		if (!userId) return;
		if (!RelationshipStore?.isFriend?.(userId)) return;
		if (Object.keys(childProps).length !== 1) return;
		const BaseSection =
			SidebarSectionComponent ||
			(React.isValidElement(returnValue) ? returnValue.type : null);
		if (!BaseSection) return;
		const BetterFriendsSinceSection = React.createElement(
			BaseSection,
			{
				key: `friends-since-sidebar-${userId}`,
				heading: getHeadingForLocale(getCurrentLocale(LocaleStore)),
				headingColor: props.headingColor,
				__BetterFriendsSinceInjected: true
			},
			React.createElement(BetterFriendsSinceSidebarContent, { userId })
		);
		return React.createElement(React.Fragment, null, returnValue, BetterFriendsSinceSection);
	};
	const handleProfilePatch = (_, [props], returnValue) => {
		if (!props || !returnValue) return;
		const body = findProfileBody(returnValue);
		if (!body || !Array.isArray(body.children)) return;
		const userId = props?.user?.id;
		if (!userId) return;
		if (!Section) {
			const firstSection = body.children.find(
				child =>
					React.isValidElement(child) &&
					child.props?.heading &&
					child.props?.children
			);
			if (firstSection) {
				Section = firstSection.type;
			}
		}
		if (!Section) {
			Logger.warn(meta.name, "Section component not resolved; skipping profile injection.");
			return;
		}
		const index = body.children.findIndex(
			child =>
				React.isValidElement(child) &&
				child.props?.heading &&
				child.props?.children?.props?.userId
		);
		if (index === -1) return;
		const alreadyInjected = body.children.some(
			child =>
				React.isValidElement(child) &&
				child.type === BetterFriendsSinceProfileSection
		);
		if (alreadyInjected) return;
		body.children.splice(
			index + 1, 0,
			React.createElement(BetterFriendsSinceProfileSection, {
				key: `friends-since-profile-${userId}`,
				userId
			})
		);
	};
	const patchSidebar = async (signal) => {
		try {
			const sidebarSectionMod = await tryFilters([
				{ filter: Filters.bySource('introText:', 'headingClassName:') },
				{ filter: Filters.bySource('introText:', '"text-default"') },
				{ filter: Filters.bySource('headingClassName:', '"text-xs/semibold"') }
			], signal, meta.name);
			if (signal.aborted) return;
			if (!sidebarSectionMod) {
				Logger.warn(meta.name, "sidebarSectionMod not found by any filter");
				return;
			}
			let sidebarKey = null;
			if (typeof sidebarSectionMod === "function") {
				SidebarSectionComponent = sidebarSectionMod;
				sidebarKey = "default";
			} else if (typeof sidebarSectionMod === "object") {
				const key = findSidebarSectionKey(sidebarSectionMod);
				if (key) {
					SidebarSectionComponent = sidebarSectionMod[key];
					sidebarKey = key;
				}
			}
			if (!sidebarKey || !SidebarSectionComponent) {
				Logger.warn(meta.name, "sidebarKey not found. Module type:", typeof sidebarSectionMod, "Keys:", Object.keys(sidebarSectionMod || {}));
				return;
			}
			if (SidebarSectionComponent && sidebarSectionMod && sidebarKey) {
				const targetModule = typeof sidebarSectionMod === "function"
					? { [sidebarKey]: sidebarSectionMod }
					: sidebarSectionMod;
				Patcher.after(meta.name, targetModule, sidebarKey, handleSidebarPatch);
			}
		} catch (err) {
			if (isAbortError(err)) return;
			Logger.warn(meta.name, "Sidebar patching failed or timed out", err);
		}
	};
	const patchProfile = async (signal) => {
		try {
			const [sectionModule, userProfileModule] = await Promise.all([
				tryFilters([
					{ filter: Filters.byStrings('.section', 'text-xs/medium', 'headingColor'), options: { searchExports: true } },
					{ filter: Filters.byStrings('.section', '"currentColor"', 'headingVariant'), options: { searchExports: true } }
				], signal, meta.name),
				tryFilters([
					{ filter: Filters.bySource('parentComponent:', '"UserProfileModalV2"'), options: { defaultExport: false } },
					{ filter: Filters.bySource('SHAKE_PROFILE_MODAL', 'profileEffect'), options: { defaultExport: false } },
					{ filter: Filters.bySource('profileBody', 'profileHeader', 'profileButtons'), options: { defaultExport: false } }
				], signal, meta.name)
			]);
			if (signal.aborted) return;
			Section = sectionModule;
			if (!Section) {
				Logger.warn(meta.name, "Section module not found, profile patch will rely on tree fallback.");
			}
			if (!userProfileModule?.Z || typeof userProfileModule.Z !== "function") {
				Logger.warn(meta.name, "UserProfileModal module not in expected shape.");
			} else {
				Patcher.after(meta.name, userProfileModule, "Z", handleProfilePatch);
			}
		} catch (err) {
			if (isAbortError(err)) return;
			Logger.warn(meta.name, "Profile patching failed (likely waiting for modal open)", err);
		}
	};
	const start = async () => {
		if (abortController) {
			abortController.abort();
			abortController = null;
		}
		abortController = new AbortController();
		const signal = abortController.signal;
		try {
			RelationshipStore = Webpack.getStore("RelationshipStore");
			LocaleStore = Webpack.getStore("LocaleStore");
			if (!RelationshipStore || !LocaleStore) {
				Logger.error(meta.name, "Required stores not found (RelationshipStore / LocaleStore).");
				return;
			}
			getFriendSince = createGetFriendSince(RelationshipStore);
			useBetterFriendsSince = createUseBetterFriendsSince(RelationshipStore, LocaleStore, getFriendSince);
			Text = await resolveTextComponent(signal);
			if (signal.aborted) return;
			if (!Text) {
				Logger.error(meta.name, "Text component not found (even with fallbacks).");
				return;
			}
			patchSidebar(signal);
			patchProfile(signal);
			updateManager.start(settings.autoUpdate);
		} catch (err) {
			if (isAbortError(err)) return;
			Logger.error(meta.name, "Failed to start plugin.", err);
			UI.showToast(
				`${meta.name}: failed to start. See console for details.`,
				{ type: "error" }
			);
		}
	};
	const stop = () => {
		try {
			if (abortController) {
				abortController.abort();
				abortController = null;
			}
			Patcher.unpatchAll(meta.name);
			updateManager.stop();
		} catch (err) {
			Logger.error(meta.name, "Error while stopping plugin.", err);
		} finally {
			RelationshipStore = null;
			LocaleStore = null;
			Section = null;
			Text = null;
			SidebarSectionComponent = null;
			useBetterFriendsSince = null;
			getFriendSince = null;
		}
	};
	const getSettingsPanel = () => {
		return UI.buildSettingsPanel({
			settings: [
				{
					type: "switch",
					id: "autoUpdate",
					name: "Automatic Updates",
					note: "Automatically check for updates on startup and every 24 hours",
					value: settings.autoUpdate
				},
				{
					type: "button",
					id: "checkUpdate",
					name: "Check for Updates",
					note: "Manually check if a new version is available",
					children: "Check Now",
					onClick: () => updateManager.check()
				},
				{
					type: "button",
					id: "viewChangelog",
					name: "View Changelog",
					note: "View the complete changelog for this plugin",
					children: "View Changelog",
					onClick: () => updateManager.showFullChangelog()
				}
			],
			onChange: (_, id, value) => {
				settings[id] = value;
				saveSettings();
				if (id === "autoUpdate") {
					updateManager.stop();
					if (value) updateManager.start(true);
				}
			}
		});
	};
	return { start, stop, getSettingsPanel };
};
module.exports = BetterFriendsSince;
