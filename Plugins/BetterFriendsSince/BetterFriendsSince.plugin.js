/**
 * @name BetterFriendsSince
 * @author Pharaoh2k
 * @description Shows the date you and a friend became friends in the profile modal and Friends sidebar.
 * @version 1.3.4
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
Pharaoh2k are © 2025-present Pharaoh2k. All rights reserved.
These proprietary portions are licensed separately and may not be copied,
modified, or redistributed without prior written consent from Pharaoh2k.
This restriction applies only to Pharaoh2k's original contributions and does
not affect code covered under the MIT License above.
Contributions are welcome via GitHub pull requests. Please ensure submissions
align with the project's guidelines and coding standards.
*/
"use strict";
const { Webpack, Patcher, React, Utils, UI, Logger, Hooks, Data, Net, Plugins } = BdApi;
const { Filters } = Webpack;
class UpdateManager {
	/* using Net, UI, Logger, Data, Plugins, Utils from BdApi */
	constructor(pluginName, version, github = GITHUB_REPO) {
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
	async start(autoUpdate = true) {
		this.stop();
		if (autoUpdate) {
			this._initialTimeout = setTimeout(() => this.check(true), 15000);
			this.timer = setInterval(() => this.check(true), 24 * 60 * 60 * 1000);
		}
		this.showChangelog();
	}
	stop() {
		if (this._initialTimeout) {
			clearTimeout(this._initialTimeout);
			this._initialTimeout = null;
		}
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
			Logger.error(this.name, "Update check failed:", e);
			if (!silent) UI.showToast(`[${this.name}] Update check failed`, { type: "error" });
		}
	}
	showUpdateNotice(version, text) {
		this._closeNotification();
		const handle = UI.showNotification?.({
			id: `bd-plugin-update:${this.name}`,
			title: `${this.name}`,
			content: `v${version} is available`,
			type: "info",
			duration: 6000000,
			actions: [
				{
					label: "Update",
					onClick: () => {
						this._closeNotification();
						this.applyUpdate(text, version);
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
		}) ?? UI.showNotice(`${this.name} v${version} is available`, {
			type: "info",
			buttons: [
				{
					label: "Update",
					onClick: (closeOrEvent) => {
						if (typeof closeOrEvent === "function") closeOrEvent();
						else this._closeNotification();
						this.applyUpdate(text, version);
					},
				},
				{
					label: "Dismiss",
					onClick: (closeOrEvent) => {
						if (typeof closeOrEvent === "function") closeOrEvent();
						else this._closeNotification();
					},
				},
			],
		});
		this.notification = handle;
	}
	applyUpdate(text, version) {
		try {
			const validated = this._validateRemotePluginText(text);
			if (!validated.ok) {
				UI.showToast(`Update blocked: ${validated.reason}`, { type: "error", timeout: 8000 });
				return;
			}
			const nextVersion = validated.version ?? version;
			require("fs").writeFileSync(__filename, text);
			UI.showToast(`Updated to v${nextVersion}. Reloading...`, { type: "success" });
			setTimeout(() => {
				try {
					Plugins.reload(this.name);
				} catch {
					UI.showToast("Please reload Discord (Ctrl+R)", { type: "info", timeout: 0 });
				}
			}, 100);
		} catch (e) {
			Logger.error(this.name, "Update failed:", e);
			UI.showToast("Update failed", { type: "error" });
		}
	}
	async showChangelog() {
		const last = Data.load(this.name, 'version');
		Logger.info(this.name, `showChangelog: last=${last}, current=${this.version}`);
		if (last === this.version) { Logger.info(this.name, "Skipping: versions match"); return; }
		Data.save(this.name, 'version', this.version);
		if (!last) { Logger.info(this.name, "Skipping: fresh install"); return; }
		try {
			const res = await Net.fetch(this.urls.changelog);
			Logger.info(this.name, `Changelog fetch status: ${res.status}`);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			Logger.info(this.name, "Parsed changes:", changes);
			if (changes.length === 0) return;
			UI.showChangelogModal({ title: this.name, subtitle: `Version ${this.version}`, changes });
		} catch (e) { Logger.error(this.name, "Changelog error:", e); }
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
	Utils.findInTree(tree, n => n && typeof n.className === "string" && n.className.includes("profileBody"), { walkable: ["props", "children"] });
const getCurrentLocale = LocaleStore => LocaleStore?.locale ?? LocaleStore?.systemLocale ?? "en-US";
const getHeadingForLocale = locale => HEADING_BY_LOCALE[locale] ?? HEADING_BY_LOCALE["en-US"];
const isAbortError = err => err?.name === "AbortError";
const findFunctionExportKey = (mod, ...sourceStrings) => {
	if (!mod || typeof mod !== "object") return null;
	for (const key of Object.keys(mod)) {
		const exportValue = mod[key];
		if (typeof exportValue === "function") {
			try {
				const source = exportValue.toString();
				if (sourceStrings.every(str => source.includes(str))) {
					return key;
				}
			} catch { /* toString may fail on some built-ins */ }
		}
	}
	return null;
};
const findSidebarSectionKey = (mod) => {
	if (!mod || typeof mod !== "object") return null;
	return findFunctionExportKey(mod, "introText");
};
const tryFilters = async (filterConfigs, signal) => {
	for (const { filter, options = {} } of filterConfigs) {
		try {
			const module = Webpack.getModule(filter, options);
			if (module) {
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
	const hasGetSince = typeof store.getSince === "function";
	const hasGetSinces = typeof store.getSinces === "function";
	if (!hasGetSince && !hasGetSinces) return () => null;
	return userId => {
		if (!store.isFriend(userId)) return null;
		if (hasGetSince) return store.getSince(userId) ?? null;
		const sinces = store.getSinces();
		return sinces?.[userId] ?? null;
	};
};
const createUseBetterFriendsSince = (RelationshipStore, LocaleStore, getFriendSince) =>
	userId => {
		const since = Hooks.useStateFromStores([RelationshipStore], () => getFriendSince(userId));
		const locale = Hooks.useStateFromStores([LocaleStore], () => getCurrentLocale(LocaleStore));
		const dateLabel = React.useMemo(() => formatSinceDate(since, locale), [since, locale]);
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
		try {
			if (!props || !returnValue) return;
			if (props.__BetterFriendsSinceInjected) return;
			const childProps = props.children?.props;
			const userId = childProps?.userId ?? childProps?.userID ?? null;
			if (!userId) return;
			if (!RelationshipStore?.isFriend(userId)) return;
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
		} catch (err) {
			Logger.warn(meta.name, "Sidebar section patch failed:", err);
		}
	};
	const handleSidebarBodyPatch = (_, [props], returnValue) => {
		try {
			if (!props || !returnValue) return;
			const userId = props.user?.id;
			if (!userId) return;
			if (!RelationshipStore?.isFriend(userId)) return;
			const memberSinceSection = Utils.findInTree(
				returnValue,
				n => React.isValidElement(n) &&
					n.props?.heading &&
					n.props?.children?.props?.userId === userId,
				{ walkable: ['props', 'children'] }
			);
			if (!memberSinceSection) return;
			if (!SidebarSectionComponent) {
				SidebarSectionComponent = memberSinceSection.type;
			}
			const overlay = Utils.findInTree(
				returnValue,
				n => React.isValidElement(n) &&
					Array.isArray(n.props?.children) &&
					n.props.children.includes(memberSinceSection),
				{ walkable: ['props', 'children'] }
			);
			if (!overlay) return;
			const overlayChildren = overlay.props.children;
			const alreadyInjected = overlayChildren.some(
				child =>
					React.isValidElement(child) &&
					child.key?.startsWith?.('friends-since-sidebar-')
			);
			if (alreadyInjected) return;
			const memberSinceIndex = overlayChildren.indexOf(memberSinceSection);
			overlayChildren.splice(
				memberSinceIndex + 1, 0,
				React.createElement(
					SidebarSectionComponent,
					{
						key: `friends-since-sidebar-${userId}`,
						heading: getHeadingForLocale(getCurrentLocale(LocaleStore)),
						headingColor: 'text-strong'
					},
					React.createElement(BetterFriendsSinceSidebarContent, { userId })
				)
			);
		} catch (err) {
			Logger.warn(meta.name, "Sidebar body patch failed:", err);
		}
	};
	const handleProfilePatch = (_, [props], returnValue) => {
		try {
			if (!props || !returnValue) return;
			const body = findProfileBody(returnValue);
			if (!body || !Array.isArray(body.children)) return;
			const userId = props.user?.id;
			if (!userId) return;
			if (!Section) {
				const firstSection = body.children.find(child => React.isValidElement(child) && child.props?.heading && child.props?.children);
				if (firstSection) {
					Section = firstSection.type;
				}
			}
			if (!Section) {
				Logger.warn(meta.name, "Section component not resolved; skipping profile injection.");
				return;
			}
			const index = body.children.findIndex(child => React.isValidElement(child) && child.props?.heading && child.props?.children?.props?.userId);
			if (index === -1) return;
			const alreadyInjected = body.children.some(child => React.isValidElement(child) && child.type === BetterFriendsSinceProfileSection);
			if (alreadyInjected) return;
			body.children.splice(index + 1, 0, React.createElement(BetterFriendsSinceProfileSection, { key: `friends-since-profile-${userId}`, userId }));
		} catch (err) {
			Logger.warn(meta.name, "Profile patch failed:", err);
		}
	};
	const patchSidebar = async (signal) => {
		try {
			const sidebarBodyMod = Webpack.getModule(
				m => findFunctionExportKey(m, 'UserProfileSidebarBody', 'isProvisional') !== null,
				{ first: true }
			);
			if (signal.aborted) return;
			const sidebarBodyKey = sidebarBodyMod && findFunctionExportKey(sidebarBodyMod, 'UserProfileSidebarBody', 'isProvisional');
			if (sidebarBodyKey) {
				Patcher.after(meta.name, sidebarBodyMod, sidebarBodyKey, handleSidebarBodyPatch);
				return;
			}
			const sidebarSectionMod = await tryFilters([
				{ filter: Filters.bySource('introText:', 'headingClassName:') },
				{ filter: Filters.bySource('scrollTargetId:', 'headingIcon:', '"text-xs/semibold"') },
				{ filter: Filters.bySource('scrollTargetId:', 'headingVariant:') }
			], signal);
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
					{ filter: Filters.byStrings('introText', 'headingClassName', 'headingVariant'), options: { searchExports: true } },
					{ filter: Filters.byStrings('introText', 'headingIcon', '"text-xs/semibold"'), options: { searchExports: true } }
				], signal),
				tryFilters([
					{ filter: Filters.bySource('parentComponent:', '"UserProfileModalV2"'), options: { defaultExport: false } },
					{ filter: Filters.bySource('SHAKE_PROFILE_MODAL', 'profileEffect'), options: { defaultExport: false } },
					{ filter: Filters.bySource('profileBody', 'profileHeader', 'profileButtons'), options: { defaultExport: false } }
				], signal)
			]);
			if (signal.aborted) return;
			Section = sectionModule;
			if (!Section) {
				Logger.warn(meta.name, "Section module not found, profile patch will rely on tree fallback.");
			}
			const userProfileKey = userProfileModule && findFunctionExportKey(userProfileModule, 'UserProfileModalV2');
			if (userProfileKey) {
				Patcher.after(meta.name, userProfileModule, userProfileKey, handleProfilePatch);
			} else {
				Logger.warn(meta.name, "UserProfileModal export key not found.");
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
			RelationshipStore = Webpack.Stores.RelationshipStore;
			LocaleStore = Webpack.Stores.LocaleStore;
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
