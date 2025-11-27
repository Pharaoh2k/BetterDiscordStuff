/**
 * @name BetterFriendsSince
 * @author Pharaoh2k
 * @description Shows the date of when and a friend became friends
 * @version 1.0.0
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
function formatSinceDate(value, locale) {
	if (value == null || value === "") return null;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return date.toLocaleDateString(locale || "en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
module.exports = function FriendsSince(meta) {
	const { Webpack, Patcher, React, Utils, UI, Logger } = BdApi;
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
		"ko": "친구가 된 날짜"
	});
	function createUseStateFromStores() {
		let mangled = null;
		try {
			if (typeof Webpack.getMangled === "function") {
				mangled = Webpack.getMangled(
					m => m.Store,
					{ useStateFromStores: Webpack.Filters.byStrings("useStateFromStores") },
					{ raw: true }
				);
			}
		} catch {
			mangled = null;
		}
		if (mangled?.useStateFromStores) return mangled.useStateFromStores;
		const useSyncExternalStore = React.useSyncExternalStore;
		return (stores, selector) => {
			if (!Array.isArray(stores) || !stores.length || !useSyncExternalStore) {
				return selector();
			}
			const validStores = stores.filter(
				s => s && s.addChangeListener && s.removeChangeListener
			);
			if (!validStores.length) return selector();
			const subscribe = (onStoreChange) => {
				for (const s of validStores) {
					try {
						s.addChangeListener(onStoreChange);
					} catch {
						/* noop */
					}
				}
				return () => {
					for (const s of validStores) {
						try {
							s.removeChangeListener(onStoreChange);
						} catch {
							/* noop */
						}
					}
				};
			};
			const getSnapshot = () => selector();
			return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
		};
	}
	function findProfileBody(tree) {
		return Utils.findInTree(
			tree,
			n => n && typeof n.className === "string" && n.className.includes("profileBody"),
			{ walkable: ["props", "children"] }
		);
	}
	let abortController = null;
	let RelationshipStore = null;
	let LocaleStore = null;
	let Section = null;
	let Text = null;
	let useStateFromStores = null;
	function FriendsSinceSection({ userId }) {
		if (!useStateFromStores || !RelationshipStore || !LocaleStore || !Section || !Text) {
			return null;
		}
		const since = useStateFromStores([RelationshipStore], () => {
			if (!RelationshipStore?.isFriend?.(userId)) return null;
			return RelationshipStore.getSince?.(userId) ?? null;
		});
		const locale = useStateFromStores([LocaleStore], () => {
			return LocaleStore?.locale ?? "en-US";
		});
		const dateLabel = React.useMemo(
			() => formatSinceDate(since, locale),
			[since, locale]
		);
		if (!since || !dateLabel) return null;
		const heading = HEADING_BY_LOCALE[locale] ?? HEADING_BY_LOCALE["en-US"];
		return React.createElement(
			Section,
			{ heading },
			React.createElement(
				Text,
				{ variant: "text-sm/normal" },
				dateLabel
			)
		);
	}
	async function start() {
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
				UI.showToast(
					`${meta.name}: failed to find required data stores.`,
					{ type: "error" }
				);
				return;
			}
			useStateFromStores = createUseStateFromStores();
			const [sectionModule, textModule] = await Promise.all([
				Webpack.waitForModule(
					Webpack.Filters.byStrings(".section", "text-xs/medium", "headingColor"),
					{ signal }
				),
				Webpack.waitForModule(
					Webpack.Filters.bySource("data-text-variant"),
					{ signal }
				)
			]);
			if (signal.aborted) return;
			Section = sectionModule;
			let TextModule = textModule;
			if (TextModule?.render) {
				Text = TextModule;
			} else if (TextModule && typeof TextModule === "object") {
				Text = Object.values(TextModule).find(v => v && v.render) ?? null;
			} else {
				Text = null;
			}
			if (!Section || !Text) {
				Logger.error(meta.name, "Required UI components not found (Section / Text) after wait.");
				UI.showToast(
					`${meta.name}: failed to find required UI components.`,
					{ type: "error" }
				);
				return;
			}
			const filter = Webpack.Filters.byStrings("UserProfileModalV2", "USER_PROFILE_MODAL_V2", "MODAL_V2");
			const UserProfileModule = await Webpack.waitForModule(filter, {
				defaultExport: false,
				signal
			});
			if (signal.aborted) return;
			if (!UserProfileModule?.Z || typeof UserProfileModule.Z !== "function") {
				Logger.error(meta.name, "UserProfileModal module not in expected shape.", UserProfileModule);
				UI.showToast(
					`${meta.name}: could not hook user profile.`,
					{ type: "error" }
				);
				return;
			}
			Patcher.after(meta.name, UserProfileModule, "Z", (_, [props], returnValue) => {
				try {
					const body = findProfileBody(returnValue);
					if (!body || !Array.isArray(body.children)) return;
					const userId = props?.user?.id;
					if (!userId) return;
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
							child.type === FriendsSinceSection
					);
					if (alreadyInjected) return;
					body.children.splice(
						index + 1,
						0,
						React.createElement(FriendsSinceSection, {
							key: `friends-since-${userId}`,
							userId
						})
					);
				} catch (error) {
					Logger.error(meta.name, "Failed to inject FriendsSince section.", error);
				}
			});
		} catch (err) {
			if (err?.name === "AbortError") return;
			Logger.error(meta.name, "Failed to start plugin.", err);
			UI.showToast(
				`${meta.name}: failed to start. See console for details.`,
				{ type: "error" }
			);
		}
	}
	function stop() {
		try {
			if (abortController) {
				abortController.abort();
				abortController = null;
			}
			Patcher.unpatchAll(meta.name);
		} catch (err) {
			Logger.error(meta.name, "Error while stopping plugin.", err);
		} finally {
			Section = null;
			Text = null;
			RelationshipStore = null;
			LocaleStore = null;
			useStateFromStores = null;
		}
	}
	return { start, stop };
};
/*@end@*/
