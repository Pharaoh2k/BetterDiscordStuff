/**
 * @name BetterFriendsSince
 * @author Pharaoh2k
 * @description Shows the date you and a friend became friends in the profile modal and Friends sidebar.
 * @version 1.1.1
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/BetterFriendsSince/BetterFriendsSince.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/BetterFriendsSince/BetterFriendsSince.plugin.js
 */
/*@cc_on
@if (@_jscript)
	var shell = WScript.CreateObject('WScript.Shell');
	var fs = new ActiveXObject('Scripting.FileSystemObject');
	var pathPlugins = shell.ExpandEnvironmentStrings('%APPDATA%\\BetterDiscord\\plugins');
	var pathSelf = WScript.ScriptFullName;
	shell.Popup('It looks like you\'ve mistakenly tried to run me directly. \n(Don\'t do that!)', 0, 'I\'m a plugin for BetterDiscord', 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup('I\'m in the correct folder already.\nJust reload Discord with Ctrl+R.', 0, 'I\'m already installed', 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup('I can\'t find the BetterDiscord plugins folder.\nAre you sure it\'s even installed?', 0, 'Can\'t install myself', 0x10);
	} else if (shell.Popup('Should I copy myself to BetterDiscord\'s plugins folder for you?', 0, 'Do you need some help?', 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		shell.Exec('explorer ' + pathPlugins);
		shell.Popup('I\'m installed!\nJust reload Discord with Ctrl+R.', 0, 'Successfully installed', 0x40);
	}
	WScript.Quit();
@else@*/
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
This restriction applies only to Pharaoh2k’s original contributions and does
not affect code covered under the MIT License above.
Contributions are welcome via GitHub pull requests. Please ensure submissions
align with the project's guidelines and coding standards.
*/
"use strict";
const { Webpack, Patcher, React, Utils, UI, Logger, Hooks } = BdApi;
const HEADING_BY_LOCALE = Object.freeze({
	"da": "Venner siden",
	"de": "Freunde seit",
	"en-GB": "Friends since",
	"en-US": "Friends since",
	"es-ES": "Amigos desde",
	"es-419": "Amigos desde",
	"fr": "Amis depuis",
	"hr": "Prijatelji od",
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
	"sk": "Priatelia od",
	"he": "חברים מאז",
	"ar": "أصدقاء منذ",
	"id": "Berteman sejak"
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
const getCurrentLocale = LocaleStore =>
	LocaleStore?.locale ??
	LocaleStore?.systemLocale ??
	"en-US";
const getHeadingForLocale = locale => HEADING_BY_LOCALE[locale] ?? HEADING_BY_LOCALE["en-US"];
const isAbortError = err => err?.name === "AbortError";
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
const createUseFriendsSince = (RelationshipStore, LocaleStore, getFriendSince) =>
	userId => {
		const since = Hooks.useStateFromStores(
			RelationshipStore,
			() => getFriendSince(userId)
		);
		const locale = Hooks.useStateFromStores(
			LocaleStore,
			() => getCurrentLocale(LocaleStore)
		);
		const dateLabel = React.useMemo(
			() => formatSinceDate(since, locale),
			[since, locale]
		);
		return { since, locale, dateLabel };
	};
const FriendsSince = meta => {
	let abortController = null;
	let RelationshipStore = null;
	let LocaleStore = null;
	let Section = null;
	let Text = null;
	let SidebarSectionComponent = null;
	let useFriendsSince = null;
	let getFriendSince = null;
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
			Webpack.Filters.bySource("data-text-variant"),
			Webpack.Filters.bySource("lineClamp", "selectable")
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
	const createFriendsSinceComponent = (render, requiresSection) =>
		React.memo(({ userId }) => {
			if (!useFriendsSince || !RelationshipStore || !LocaleStore || !Text) return null;
			if (requiresSection && !Section) return null;
			const data = useFriendsSince(userId);
			if (!data?.since || !data.dateLabel) return null;
			return render(data, userId);
		});
	const FriendsSinceProfileSection = createFriendsSinceComponent(
		({ locale, dateLabel }) =>
			React.createElement(
				Section,
				{ heading: getHeadingForLocale(locale) },
				React.createElement(Text, { variant: "text-sm/normal" }, dateLabel)
			),
		true
	);
	const FriendsSinceSidebarContent = createFriendsSinceComponent(
		({ dateLabel }) =>
			React.createElement(
				Text,
				{
					variant: "text-sm/normal",
					color: "header-primary"
				},
				dateLabel
			)
	);
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
			useFriendsSince = createUseFriendsSince(RelationshipStore, LocaleStore, getFriendSince);
			Text = await resolveTextComponent(signal);
			if (signal.aborted) return;
			if (!Text) {
				Logger.error(meta.name, "Text component not found (even with fallbacks).");
				return;
			}
			const patchSidebar = async () => {
				try {
					const sidebarSectionMod = await Webpack.waitForModule(
						Webpack.Filters.bySource(
							'headingVariant:m="text-xs/semibold"',
							'headingColor:g="header-secondary"'
						),
						{ signal }
					);
					if (signal.aborted) return;
					let sidebarKey = null;
					if (typeof sidebarSectionMod === "function") {
						SidebarSectionComponent = sidebarSectionMod;
						sidebarKey = "default";
					} else if (typeof sidebarSectionMod === "object") {
						const key = Object.keys(sidebarSectionMod).find(k => {
							try {
								const value = sidebarSectionMod[k];
								return typeof value === "function" &&
									value.toString().includes('headingVariant:m="text-xs/semibold"');
							} catch {
								return false;
							}
						});
						if (key) {
							SidebarSectionComponent = sidebarSectionMod[key];
							sidebarKey = key;
						}
					}
					if (SidebarSectionComponent && sidebarSectionMod && sidebarKey) {
						const targetModule = typeof sidebarSectionMod === "function"
							? { [sidebarKey]: sidebarSectionMod }
							: sidebarSectionMod;
						Patcher.after(meta.name, targetModule, sidebarKey, (_, [props], returnValue) => {
							try {
								if (!props || !returnValue) return;
								if (props.headingColor !== "header-primary") return;
								if (props.__betterFriendsSinceInjected) return;
								const userId = props.children?.props?.userId ?? props.children?.props?.userID ?? null;
								if (!userId) return;
								const BaseSection =
									SidebarSectionComponent ||
									(React.isValidElement(returnValue) ? returnValue.type : null);
								if (!BaseSection) return;
								const friendsSinceSection = React.createElement(
									BaseSection,
									{
										key: `friends-since-sidebar-${userId}`,
										heading: getHeadingForLocale(getCurrentLocale(LocaleStore)),
										__betterFriendsSinceInjected: true
									},
									React.createElement(FriendsSinceSidebarContent, { userId })
								);
								return React.createElement(React.Fragment, null, returnValue, friendsSinceSection);
							} catch (error) {
								Logger.error(meta.name, "Failed to inject FriendsSince section into sidebar.", error);
							}
						});
					}
				} catch (err) {
					if (isAbortError(err)) return;
					Logger.warn(meta.name, "Sidebar patching failed or timed out", err);
				}
			};
			const patchProfile = async () => {
				try {
					const [sectionModule, userProfileModule] = await Promise.all([
						Webpack.waitForModule(
							Webpack.Filters.byStrings(".section", "text-xs/medium", "headingColor"),
							{ signal }
						),
						Webpack.waitForModule(
							Webpack.Filters.byStrings("UserProfileModalV2", "USER_PROFILE_MODAL_V2", "MODAL_V2"),
							{ defaultExport: false, signal }
						)
					]);
					if (signal.aborted) return;
					Section = sectionModule;
					if (!Section) {
						Logger.warn(meta.name, "Section module not found, profile patch will rely on tree fallback.");
					}
					if (!userProfileModule?.Z || typeof userProfileModule.Z !== "function") {
						Logger.warn(meta.name, "UserProfileModal module not in expected shape.");
					} else {
						Patcher.after(meta.name, userProfileModule, "Z", (_, [props], returnValue) => {
							try {
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
										child.type === FriendsSinceProfileSection
								);
								if (alreadyInjected) return;
								body.children.splice(
									index + 1,
									0,
									React.createElement(FriendsSinceProfileSection, {
										key: `friends-since-profile-${userId}`,
										userId
									})
								);
							} catch (error) {
								Logger.error(meta.name, "Failed to inject FriendsSince section into profile.", error);
							}
						});
					}
				} catch (err) {
					if (isAbortError(err)) return;
					Logger.warn(meta.name, "Profile patching failed (likely waiting for modal open)", err);
				}
			};
			patchSidebar();
			patchProfile();
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
		} catch (err) {
			Logger.error(meta.name, "Error while stopping plugin.", err);
		} finally {
			RelationshipStore = null;
			LocaleStore = null;
			Section = null;
			Text = null;
			SidebarSectionComponent = null;
			useFriendsSince = null;
			getFriendSince = null;
		}
	};
	return { start, stop };
};
module.exports = FriendsSince;
/*@end@*/
