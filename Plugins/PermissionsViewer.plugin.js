/**
 * @name PermissionsViewer
 * @description Allows you to view a user's permissions. Thanks to Noodlebox for the idea!
 * @version 0.3.0.1
 * @author Zerebos
 * @authorId 249746236008169473
 * @website https://github.com/zerebos/BetterDiscordAddons/tree/master/Plugins/PermissionsViewer
 * @source https://raw.githubusercontent.com/zerebos/BetterDiscordAddons/master/Plugins/PermissionsViewer/PermissionsViewer.plugin.js
 */

/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();

@else@*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugins/PermissionsViewer/index.ts
var PermissionsViewer_exports = {};
__export(PermissionsViewer_exports, {
  default: () => PermissionsViewer
});
module.exports = __toCommonJS(PermissionsViewer_exports);

// src/common/plugin.ts
var Plugin = class {
  meta;
  manifest;
  settings;
  defaultSettings;
  LocaleManager;
  get strings() {
    if (!this.manifest.strings) return {};
    const locale = this.LocaleManager?.locale.split("-")[0] ?? "en";
    if (this.manifest.strings.hasOwnProperty(locale)) return this.manifest.strings[locale];
    if (this.manifest.strings.hasOwnProperty("en")) return this.manifest.strings.en;
    return this.manifest.strings;
  }
  constructor(meta, zplConfig) {
    this.meta = meta;
    this.manifest = zplConfig;
    if (typeof this.manifest.config !== "undefined") {
      this.defaultSettings = {};
      for (let s = 0; s < this.manifest.config.length; s++) {
        const current = this.manifest.config[s];
        if (current.type != "category") {
          this.defaultSettings[current.id] = current.value;
        } else {
          for (let si = 0; si < current.settings.length; si++) {
            const subCurrent = current.settings[si];
            this.defaultSettings[subCurrent.id] = subCurrent.value;
          }
        }
      }
      this.settings = BdApi.Utils.extend({}, this.defaultSettings);
    }
    const currentVersionInfo = BdApi.Data.load(this.meta.name, "version");
    if (currentVersionInfo !== this.meta.version) {
      this.#showChangelog();
      BdApi.Data.save(this.meta.name, "version", this.meta.version);
    }
    if (this.manifest.strings) this.LocaleManager = BdApi.Webpack.getByKeys("locale", "initialize");
    if (this.manifest.config && !this.getSettingsPanel) {
      this.getSettingsPanel = () => {
        this.#updateConfig();
        return BdApi.UI.buildSettingsPanel({
          onChange: (_, id, value) => {
            this.settings[id] = value;
            this.saveSettings();
          },
          settings: this.manifest.config
        });
      };
    }
  }
  async start() {
    BdApi.Logger.info(this.meta.name, `version ${this.meta.version} has started.`);
    if (this.defaultSettings) this.settings = this.loadSettings();
    if (typeof this.onStart == "function") this.onStart();
  }
  stop() {
    BdApi.Logger.info(this.meta.name, `version ${this.meta.version} has stopped.`);
    if (typeof this.onStop == "function") this.onStop();
  }
  #showChangelog() {
    if (typeof this.manifest.changelog == "undefined") return;
    const changelog = {
      title: this.meta.name + " Changelog",
      subtitle: `v${this.meta.version}`,
      changes: []
    };
    if (!Array.isArray(this.manifest.changelog)) Object.assign(changelog, this.manifest.changelog);
    else changelog.changes = this.manifest.changelog;
    BdApi.UI.showChangelogModal(changelog);
  }
  saveSettings() {
    BdApi.Data.save(this.meta.name, "settings", this.settings);
  }
  loadSettings() {
    return BdApi.Utils.extend({}, this.defaultSettings ?? {}, BdApi.Data.load(this.meta.name, "settings"));
  }
  #updateConfig() {
    if (!this.manifest.config) return;
    for (const setting of this.manifest.config) {
      if (setting.type !== "category") {
        setting.value = this.settings[setting.id] ?? setting.value;
      } else {
        for (const subsetting of setting.settings) {
          subsetting.value = this.settings[subsetting.id] ?? subsetting.value;
        }
      }
    }
  }
  buildSettingsPanel(onChange) {
    this.#updateConfig();
    return BdApi.UI.buildSettingsPanel({
      onChange: (groupId, id, value) => {
        this.settings[id] = value;
        onChange?.(groupId, id, value);
        this.saveSettings();
      },
      settings: this.manifest.config
    });
  }
};

// src/common/formatstring.ts
function formatString(stringToFormat, ...replacements) {
  for (let v = 0; v < replacements.length; v++) {
    const values = replacements[v];
    for (const val in values) {
      let replacement = values[val];
      if (Array.isArray(replacement)) replacement = JSON.stringify(replacement);
      if (typeof replacement === "object" && replacement !== null) replacement = replacement.toString();
      stringToFormat = stringToFormat.replace(new RegExp(`{{${val}}}`, "g"), replacement.toString());
    }
  }
  return stringToFormat;
}

// src/plugins/PermissionsViewer/config.ts
var manifest = {
  info: {
    name: "PermissionsViewer",
    authors: [{
      name: "Zerebos",
      discord_id: "249746236008169473",
      github_username: "zerebos",
      twitter_username: "IAmZerebos"
    }],
    version: "0.3.0",
    description: "Allows you to view a user's permissions. Thanks to Noodlebox for the idea!",
    github: "https://github.com/zerebos/BetterDiscordAddons/tree/master/Plugins/PermissionsViewer",
    github_raw: "https://raw.githubusercontent.com/zerebos/BetterDiscordAddons/master/Plugins/PermissionsViewer/PermissionsViewer.plugin.js"
  },
  changelog: [
    {
      title: "What's New?",
      type: "added",
      items: [
        "Plugin no longer depends on ZeresPluginLibrary!",
        "Popout permissions updated to match Discord's new style."
      ]
    },
    {
      title: "Fixes",
      type: "fixed",
      items: [
        "The main startup error has finally been fixed!",
        "Fixed an issue where localization wouldn't process correctly.",
        "Permissions should now show properly on the new user popouts.",
        "Modals should now close when pressing Escape."
      ]
    }
  ],
  config: [
    {
      type: "switch",
      id: "contextMenus",
      name: "Context Menus",
      value: true
    },
    {
      type: "switch",
      id: "popouts",
      name: "Popouts",
      value: true
    },
    {
      type: "radio",
      id: "displayMode",
      name: "Modal Display Mode",
      value: "compact",
      options: [
        { name: "Cozy", value: "cozy" },
        { name: "Compact", value: "compact" }
      ]
    }
  ],
  strings: {
    es: {
      contextMenuLabel: "Permisos",
      popoutLabel: "Permisos",
      modal: {
        header: "Permisos de {{name}}",
        rolesLabel: "Roles",
        permissionsLabel: "Permisos",
        owner: "@propietario"
      },
      settings: {
        popouts: {
          name: "Mostrar en Popouts",
          note: "Mostrar los permisos de usuario en popouts como los roles."
        },
        contextMenus: {
          name: "Bot\xF3n de men\xFA contextual",
          note: "A\xF1adir un bot\xF3n para ver permisos en los men\xFAs contextuales."
        }
      }
    },
    pt: {
      contextMenuLabel: "Permiss\xF5es",
      popoutLabel: "Permiss\xF5es",
      modal: {
        header: "Permiss\xF5es de {{name}}",
        rolesLabel: "Cargos",
        permissionsLabel: "Permiss\xF5es",
        owner: "@dono"
      },
      settings: {
        popouts: {
          name: "Mostrar em Popouts",
          note: "Mostrar as permiss\xF5es em popouts como os cargos."
        },
        contextMenus: {
          name: "Bot\xE3o do menu de contexto",
          note: "Adicionar um bot\xE3o parar ver permiss\xF5es ao menu de contexto."
        }
      }
    },
    de: {
      contextMenuLabel: "Berechtigungen",
      popoutLabel: "Berechtigungen",
      modal: {
        header: "{{name}}s Berechtigungen",
        rolesLabel: "Rollen",
        permissionsLabel: "Berechtigungen",
        owner: "@eigent\xFCmer"
      },
      settings: {
        popouts: {
          name: "In Popouts anzeigen",
          note: "Zeigt die Gesamtberechtigungen eines Benutzers in seinem Popup \xE4hnlich den Rollen an."
        },
        contextMenus: {
          name: "Kontextmen\xFC-Schaltfl\xE4che",
          note: "F\xFCgt eine Schaltfl\xE4che hinzu, um die Berechtigungen mithilfe von Kontextmen\xFCs anzuzeigen."
        }
      }
    },
    en: {
      contextMenuLabel: "Permissions",
      popoutLabel: "Permissions",
      modal: {
        header: "{{name}}'s Permissions",
        rolesLabel: "Roles",
        permissionsLabel: "Permissions",
        owner: "@owner"
      },
      settings: {
        popouts: {
          name: "Show In Popouts",
          note: "Shows a user's total permissions in their popout similar to roles."
        },
        contextMenus: {
          name: "Context Menu Button",
          note: "Adds a button to view the permissions modal to select context menus."
        },
        displayMode: {
          name: "Modal Display Mode"
        }
      }
    },
    ru: {
      contextMenuLabel: "\u041F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0438\u044F",
      popoutLabel: "\u041F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0438\u044F",
      modal: {
        header: "\u041F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0438\u044F {{name}}",
        rolesLabel: "\u0420\u043E\u043B\u0438",
        permissionsLabel: "\u041F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0438\u044F",
        owner: "\u0412\u043B\u0430\u0434\u0435\u043B\u0435\u0446"
      },
      settings: {
        popouts: {
          name: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u043E \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0438\u0445 \u043E\u043A\u043D\u0430\u0445",
          note: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u0442 \u043F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0432 \u0438\u0445 \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u043C \u043E\u043A\u043D\u0435, \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u043E\u043C \u0440\u043E\u043B\u044F\u043C."
        },
        contextMenus: {
          name: "\u041A\u043D\u043E\u043F\u043A\u0430 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u043E\u0433\u043E \u043C\u0435\u043D\u044E",
          note: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u043D\u043E\u043C\u043E\u0447\u0438\u0439 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u044B\u0445 \u043C\u0435\u043D\u044E."
        }
      }
    }
  },
  main: "index.ts"
};
var config_default = manifest;

// src/plugins/PermissionsViewer/styles.css
var styles_default = ".perm-user-avatar {\n    border-radius: 50%;\n    width: 16px;\n    height: 16px;\n    margin-right: 3px;\n}\n\n.member-perms-header {\n    color: var(--header-secondary);\n    display: flex;\n    justify-content: space-between;\n}\n\n.member-perms {\n    display: flex;\n    flex-wrap: wrap;\n    margin-top: 2px;\n    max-height: 160px;\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n\n.member-perms .member-perm .perm-circle {\n    border-radius: 50%;\n    height: 12px;\n    margin: 0 8px 0 5px;\n    width: 12px;\n}\n\n.member-perms .member-perm .name {\n    margin-right: 4px;\n    max-width: 200px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.perm-details-button {\n    cursor: pointer;\n    height: 12px;\n}\n\n.perm-details {\n    display: flex;\n    justify-content: flex-end;\n}\n\n.member-perm-details {\n    cursor: pointer;\n}\n\n.member-perm-details-button {\n    fill: #72767d;\n    height: 10px;\n}\n\n/* Modal */\n\n@keyframes permissions-backdrop {\n    to { opacity: 0.85; }\n}\n\n@keyframes permissions-modal-wrapper {\n    to { transform: scale(1); opacity: 1; }\n}\n\n@keyframes permissions-backdrop-closing {\n    to { opacity: 0; }\n}\n\n@keyframes permissions-modal-wrapper-closing {\n    to { transform: scale(0.7); opacity: 0; }\n}\n\n#permissions-modal-wrapper {\n    z-index: 100;\n}\n\n#permissions-modal-wrapper .callout-backdrop {\n    animation: permissions-backdrop 250ms ease;\n    animation-fill-mode: forwards;\n    opacity: 0;\n    background-color: rgb(0, 0, 0);\n    transform: translateZ(0px);\n}\n\n#permissions-modal-wrapper.closing .callout-backdrop {\n    animation: permissions-backdrop-closing 200ms linear;\n    animation-fill-mode: forwards;\n    animation-delay: 50ms;\n    opacity: 0.85;\n}\n\n#permissions-modal-wrapper.closing .modal-wrapper {\n    animation: permissions-modal-wrapper-closing 250ms cubic-bezier(0.19, 1, 0.22, 1);\n    animation-fill-mode: forwards;\n    opacity: 1;\n    transform: scale(1);\n}\n\n#permissions-modal-wrapper .modal-wrapper {\n    animation: permissions-modal-wrapper 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    animation-fill-mode: forwards;\n    transform: scale(0.7);\n    transform-origin: 50% 50%;\n    display: flex;\n    align-items: center;\n    box-sizing: border-box;\n    contain: content;\n    justify-content: center;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    opacity: 0;\n    pointer-events: none;\n    position: absolute;\n    user-select: none;\n    z-index: 1000;\n}\n\n#permissions-modal-wrapper .modal-body {\n    background-color: #36393f;\n    height: 440px;\n    width: auto;\n    /*box-shadow: 0 0 0 1px rgba(32,34,37,.6), 0 2px 10px 0 rgba(0,0,0,.2);*/\n    flex-direction: row;\n    overflow: hidden;\n    display: flex;\n    flex: 1;\n    contain: layout;\n    position: relative;\n}\n\n#permissions-modal-wrapper #permissions-modal {\n    contain: layout;\n    flex-direction: column;\n    pointer-events: auto;\n    border: 1px solid rgba(28,36,43,.6);\n    border-radius: 5px;\n    box-shadow: 0 2px 10px 0 rgba(0,0,0,.2);\n    overflow: hidden;\n}\n\n#permissions-modal-wrapper .header {\n    background-color: #35393e;\n    box-shadow: 0 2px 3px 0 rgba(0,0,0,.2);\n    padding: 12px 20px;\n    z-index: 1;\n    color: #fff;\n    font-size: 16px;\n    font-weight: 700;\n    line-height: 19px;\n}\n\n.role-side, .perm-side {\n    flex-direction: column;\n    padding-left: 6px;\n}\n\n.role-scroller, .perm-scroller {\n    contain: layout;\n    flex: 1;\n    min-height: 1px;\n    overflow-y: scroll;\n}\n\n#permissions-modal-wrapper .scroller-title {\n    color: #fff;\n    padding: 8px 0 4px 4px;\n    margin-right: 8px;\n    border-bottom: 1px solid rgba(0,0,0,0.3);\n    display: none;\n}\n\n#permissions-modal-wrapper .role-side {\n    width: auto;\n    min-width: 150px;\n    background: #2f3136;\n    flex: 0 0 auto;\n    overflow: hidden;\n    display: flex;\n    min-height: 1px;\n    position: relative;\n}\n\n#permissions-modal-wrapper .role-scroller {\n    contain: layout;\n    flex: 1;\n    min-height: 1px;\n    overflow-y: scroll;\n    padding-top: 8px;\n}\n\n#permissions-modal-wrapper .role-item {\n    display: flex;\n    border-radius: 2px;\n    padding: 6px;\n    margin-bottom: 5px;\n    cursor: pointer;\n    color: #dcddde;\n}\n\n#permissions-modal-wrapper .role-item:hover {\n    background-color: rgba(0,0,0,0.1);\n}\n\n#permissions-modal-wrapper .role-item.selected {\n    background-color: rgba(0,0,0,0.2);\n}\n\n#permissions-modal-wrapper .perm-side {\n    width: 273px;\n    background-color: #36393f;\n    flex: 0 0 auto;\n    display: flex;\n    min-height: 1px;\n    position: relative;\n    padding-left: 10px;\n}\n\n#permissions-modal-wrapper .perm-item {\n    box-shadow: inset 0 -1px 0 rgba(79,84,92,.3);\n    box-sizing: border-box;\n    height: 44px;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n    display: flex;\n}\n\n#permissions-modal-wrapper .perm-item.allowed svg {\n    fill: #43B581;\n}\n\n#permissions-modal-wrapper .perm-item.denied svg {\n    fill: #F04747;\n}\n\n#permissions-modal-wrapper .perm-name {\n    display: inline;\n    flex: 1;\n    font-size: 16px;\n    font-weight: 400;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    user-select: text;\n    color: #dcddde;\n    margin-left: 10px;\n}\n\n\n.member-perms::-webkit-scrollbar-thumb, .member-perms::-webkit-scrollbar-track,\n#permissions-modal-wrapper *::-webkit-scrollbar-thumb, #permissions-modal-wrapper *::-webkit-scrollbar-track {\n    background-clip: padding-box;\n    border-radius: 7.5px;\n    border-style: solid;\n    border-width: 3px;\n    visibility: hidden;\n}\n\n.member-perms:hover::-webkit-scrollbar-thumb, .member-perms:hover::-webkit-scrollbar-track,\n#permissions-modal-wrapper *:hover::-webkit-scrollbar-thumb, #permissions-modal-wrapper *:hover::-webkit-scrollbar-track {\n    visibility: visible;\n}\n\n.member-perms::-webkit-scrollbar-track,\n#permissions-modal-wrapper *::-webkit-scrollbar-track {\n    border-width: initial;\n    background-color: transparent;\n    border: 2px solid transparent;\n}\n\n.member-perms::-webkit-scrollbar-thumb,\n#permissions-modal-wrapper *::-webkit-scrollbar-thumb {\n    border: 2px solid transparent;\n    border-radius: 4px;\n    cursor: move;\n    background-color: rgba(32,34,37,.6);\n}\n\n.member-perms::-webkit-scrollbar,\n#permissions-modal-wrapper *::-webkit-scrollbar {\n    height: 8px;\n    width: 8px;\n}\n\n\n\n.theme-light #permissions-modal-wrapper #permissions-modal {\n    background: #fff;\n}\n\n.theme-light #permissions-modal-wrapper .modal-body {\n    background: transparent;\n}\n\n.theme-light #permissions-modal-wrapper .header {\n    background: transparent;\n    color: #000;\n}\n\n.theme-light #permissions-modal-wrapper .role-side {\n    background: rgba(0,0,0,.2);\n}\n\n.theme-light #permissions-modal-wrapper .perm-side {\n    background: rgba(0,0,0,.1);\n}\n\n.theme-light #permissions-modal-wrapper .role-item,\n.theme-light #permissions-modal-wrapper .perm-name {\n    color: #000;\n}\n\n#permissions-modal-wrapper #permissions-modal {\n    width: auto;\n}";

// src/plugins/PermissionsViewer/jumbo.css
var jumbo_default = "#permissions-modal-wrapper #permissions-modal {\n    height: 840px;\n}\n\n#permissions-modal-wrapper #permissions-modal .perm-side {\n    width: 500px;\n}\n\n#permissions-modal .perm-scroller {\n    display: flex;\n    flex-wrap: wrap;\n    align-content: flex-start;\n}\n\n#permissions-modal .perm-item {\n    width: 50%;\n}";

// src/plugins/PermissionsViewer/list.html
var list_default = '<div class="{{section}}" id="permissions-popout">\n    <h1 class="member-perms-header {{text-xs/semibold}} {{defaultColor_e9e35f}} {{heading}}" data-text-variant="text-xs/semibold" style="color: var(--header-secondary);">\n        <div class="member-perms-title">{{sectionTitle}}</div>\n        <span class="perm-details">\n            <svg name="Details" viewBox="0 0 24 24" class="perm-details-button" fill="currentColor">\n                <path d="M0 0h24v24H0z" fill="none"/>\n                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>\n            </svg>\n        </span>\n    </h1>\n    <div class="member-perms {{root}}"></div>\n</div>';

// src/plugins/PermissionsViewer/item.html
var item_default = '<div class="member-perm {{role}}">\n    <div class="perm-circle {{roleCircle}}"></div>\n    <div class="name {{roleName}} {{defaultColor}}"></div>\n</div>';

// src/plugins/PermissionsViewer/modal.html
var modal_default = '<div id="permissions-modal-wrapper">\n        <div class="callout-backdrop {{backdrop}}"></div>\n        <div class="modal-wrapper">\n            <div id="permissions-modal" class="{{root}} {{small}}">\n                <div class="header"><div class="title">{{header}}</div></div>\n                <div class="modal-body">\n                    <div class="role-side">\n                        <span class="scroller-title role-list-title">{{rolesLabel}}</span>\n                        <div class="role-scroller">\n        \n                        </div>\n                    </div>\n                    <div class="perm-side">\n                        <span class="scroller-title perm-list-title">{{permissionsLabel}}</span>\n                        <div class="perm-scroller">\n        \n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>';

// src/plugins/PermissionsViewer/modalitem.html
var modalitem_default = '<div class="perm-item"><span class="perm-name"></span></div>';

// src/plugins/PermissionsViewer/modalbutton.html
var modalbutton_default = '<div class="role-item"><span class="role-name"></span></div>';

// src/plugins/PermissionsViewer/modalbuttonuser.html
var modalbuttonuser_default = `<div class="role-item"><div class="wrapper_de5239 xsmall_d82b57"><div class="image__25781 xsmall_d82b57 perm-user-avatar" style="background-image: url('\\{{avatarUrl}}');"></div></div><span class="role-name marginLeft8_ff311d"></span></div>`;

// src/plugins/PermissionsViewer/permallowed.svg
var permallowed_default = '<svg height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';

// src/plugins/PermissionsViewer/permdenied.svg
var permdenied_default = '<svg height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg>';

// src/common/colors.ts
function getRGB(color) {
  let result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color);
  if (result) return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
  result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*\)/.exec(color);
  if (result) return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
  result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color);
  if (result) return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
  result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color);
  if (result) return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
}
function rgbToAlpha(color, alpha) {
  const rgb = getRGB(color);
  if (!rgb) return color;
  return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
}

// src/plugins/PermissionsViewer/index.ts
var { ContextMenu, DOM, Utils, Webpack, UI, ReactUtils } = BdApi;
var GuildStore = Webpack.getStore("GuildStore");
var GuildRoleStore = Webpack.getStore("GuildRoleStore");
var SelectedGuildStore = Webpack.getStore("SelectedGuildStore");
var MemberStore = Webpack.getStore("GuildMemberStore");
var UserStore = Webpack.getStore("UserStore");
var DiscordPermissions = Webpack.getModule((m) => m.ADD_REACTIONS, { searchExports: true });
var AvatarDefaults = Webpack.getByKeys("DEFAULT_AVATARS") ?? { DEFAULT_AVATARS: ["/assets/a0180771ce23344c2a95.png", "/assets/ca24969f2fd7a9fb03d5.png", "/assets/974be2a933143742e8b1.png", "/assets/999edf6459b7dacdcadf.png", "/assets/887bc8fac6c9878f058a.png", "/assets/1256b1e634d7274dd430.png"] };
var ElectronModule = BdApi.Webpack.getByKeys("setBadge");
var intlModule = BdApi.Webpack.getByKeys("intl");
var getRoles = (guild) => guild?.roles ?? GuildRoleStore?.getRolesSnapshot(guild?.id);
var getHashString = (hash) => intlModule?.intl.string(hash);
var getPermString = (perm) => intlModule?.intl.string(intlModule.t[PermissionStringMap[perm]]) ?? perm.toString();
var PermissionStringMap = {
  ADD_REACTIONS: "yEoJAg",
  ADMINISTRATOR: "dwlcc3",
  ATTACH_FILES: "3AS4UF",
  BAN_MEMBERS: "2a50fH",
  CHANGE_NICKNAME: "ieWVpK",
  CONNECT: "S0W8Z2",
  CREATE_EVENTS: "qyjZub",
  CREATE_GUILD_EXPRESSIONS: "HarVuL",
  CREATE_INSTANT_INVITE: "0BNJdX",
  CREATE_PRIVATE_THREADS: "QwbTSU",
  CREATE_PUBLIC_THREADS: "25rKnZ",
  DEAFEN_MEMBERS: "9L47Fh",
  EMBED_LINKS: "969dEB",
  KICK_MEMBERS: "pBNv6u",
  MANAGE_CHANNELS: "9qLtWl",
  MANAGE_EVENTS: "HIgA5e",
  MANAGE_GUILD_EXPRESSIONS: "bbuXIi",
  MANAGE_MESSAGES: "ZGbTc3",
  MANAGE_NICKNAMES: "t+Ct5+",
  MANAGE_ROLES: "C8d+oK",
  MANAGE_GUILD: "QZRcfH",
  MANAGE_THREADS: "kEqgr6",
  MANAGE_WEBHOOKS: "/ADKmJ",
  MENTION_EVERYONE: "Y78KGB",
  MODERATE_MEMBERS: "7DgVBg",
  MOVE_MEMBERS: "YtjJPT",
  MUTE_MEMBERS: "8EI309",
  PRIORITY_SPEAKER: "BVK71t",
  READ_MESSAGE_HISTORY: "l9ufaW",
  REQUEST_TO_SPEAK: "hLbG5O",
  SEND_MESSAGES: "T32rkJ",
  SEND_MESSAGES_IN_THREADS: "fTE74u",
  SEND_POLLS: "UMQ7W1",
  SEND_TTS_MESSAGES: "Mg7bkp",
  SEND_VOICE_MESSAGES: "WlWSBQ",
  SET_VOICE_CHANNEL_STATUS: "VBwkUV",
  SPEAK: "8w1tIS",
  STREAM: "UPvOiY",
  USE_APPLICATION_COMMANDS: "shbR1d",
  USE_CLYDE_AI: "8eeEZm",
  USE_EMBEDDED_ACTIVITIES: "rLSGen",
  USE_EXTERNAL_APPS: "TtA5rK",
  USE_EXTERNAL_EMOJIS: "BpBGZW",
  USE_EXTERNAL_SOUNDS: "pwaVJy",
  USE_EXTERNAL_STICKERS: "ERNhYW",
  USE_SOUNDBOARD: "Bco7ND",
  USE_VAD: "08zAV1",
  VIEW_AUDIT_LOG: "fZgLpK",
  VIEW_CHANNEL: "W/A4Qk",
  VIEW_CREATOR_MONETIZATION_ANALYTICS: "0lTLTk",
  VIEW_GUILD_ANALYTICS: "rQJBEx"
};
var PermissionsViewer = class extends Plugin {
  constructor(meta) {
    super(meta, config_default);
  }
  sectionHTML;
  itemHTML;
  modalHTML;
  contextMenuPatches = [];
  onStart() {
    DOM.addStyle(this.meta.name, styles_default);
    const ModalClasses = Webpack.getByKeys("root", "header", "small");
    const PopoutRoleClasses = Webpack.getByKeys("roleCircle");
    const EyebrowClasses = Webpack.getByKeys("defaultColor", "eyebrow");
    const UserPopoutClasses = Object.assign(
      { section: "section_ba4d80", heading: "heading_ba4d80", root: "root_c83b44" },
      Webpack.getByKeys("userPopoutOuter"),
      EyebrowClasses,
      PopoutRoleClasses,
      Webpack.getByKeys("root", "expandButton"),
      Webpack.getModule((m) => m?.heading && m?.section && Object.keys(m)?.length === 2)
    );
    const RoleClasses = Object.assign({}, PopoutRoleClasses, EyebrowClasses, Webpack.getByKeys("role", "roleName", "roleCircle"));
    const BackdropClasses = Webpack.getByKeys("backdrop");
    this.sectionHTML = formatString(list_default, RoleClasses, UserPopoutClasses);
    this.itemHTML = formatString(item_default, RoleClasses);
    this.modalHTML = formatString(modal_default, { backdrop: BackdropClasses?.backdrop ?? "" }, { root: ModalClasses?.root ?? "root_f9a4c9", small: ModalClasses?.small ?? "small_f9a4c9" });
    if (this.settings.popouts) this.bindPopouts();
    if (this.settings.contextMenus) this.bindContextMenus();
    this.setDisplayMode(this.settings.displayMode);
  }
  onStop() {
    DOM.removeStyle(this.meta.name);
    this.unbindPopouts();
    this.unbindContextMenus();
  }
  setDisplayMode(mode) {
    if (mode === "cozy") DOM.addStyle(this.meta.name + "-jumbo", jumbo_default);
    else DOM.removeStyle(this.meta.name + "-jumbo");
  }
  patchPopouts(e) {
    const popoutMount = (props2) => {
      const popout2 = document.querySelector(`[class*="userPopout_"], [class*="outer_"]`);
      if (!popout2 || popout2.querySelector("#permissions-popout")) return;
      const user = MemberStore?.getMember(props2.displayProfile.guildId, props2.user.id);
      const guild = GuildStore?.getGuild(props2.displayProfile.guildId);
      const name = MemberStore?.getNick(props2.displayProfile.guildId, props2.user.id) ?? props2.user.username;
      if (!user || !guild || !name) return;
      const userRoles = user.roles.slice(0);
      userRoles.push(guild.id);
      userRoles.reverse();
      let perms = 0n;
      const permBlock = DOM.parseHTML(formatString(this.sectionHTML, { sectionTitle: this.strings.popoutLabel }));
      const memberPerms = permBlock.querySelector(".member-perms");
      const referenceRoles = getRoles(guild);
      if (!referenceRoles) return;
      for (let r = 0; r < userRoles.length; r++) {
        const role = userRoles[r];
        if (!referenceRoles[role]) continue;
        perms = perms | referenceRoles[role].permissions;
        for (const perm in DiscordPermissions) {
          const permName = getPermString(perm) || perm.split("_").map((n) => n[0].toUpperCase() + n.slice(1).toLowerCase()).join(" ");
          const hasPerm = (perms & DiscordPermissions[perm]) == DiscordPermissions[perm];
          if (hasPerm && !memberPerms.querySelector(`[data-name="${permName}"]`)) {
            const element2 = DOM.parseHTML(this.itemHTML);
            let roleColor = referenceRoles[role].colorString;
            element2.querySelector(".name").textContent = permName;
            element2.setAttribute("data-name", permName);
            if (!roleColor) roleColor = "#B9BBBE";
            element2.querySelector(".perm-circle").style.backgroundColor = rgbToAlpha(roleColor, 1);
            memberPerms.prepend(element2);
          }
        }
      }
      permBlock.querySelector(".perm-details")?.addEventListener("click", () => {
        this.showModal(this.createModalUser(name, user, guild));
      });
      const roleList = popout2.querySelector(`[class*="section_"]`);
      roleList?.parentElement?.parentNode?.append(permBlock);
      const popoutInstance = ReactUtils.getOwnerInstance(popout2, { include: ["Popout"] });
      if (!popoutInstance || !popoutInstance.updateOffsets) return;
      popoutInstance.updateOffsets();
    };
    if (!e.addedNodes.length || !(e.addedNodes[0] instanceof Element)) return;
    const element = e.addedNodes[0];
    const popout = element.querySelector(`[class*="userPopout_"], [class*="outer_"]`) ?? element;
    if (!popout || !popout.matches(`[class*="userPopout_"], [class*="outer_"]`)) return;
    const props = Utils.findInTree(ReactUtils.getInternalInstance(popout), (m) => m && m.user, { walkable: ["memoizedProps", "return"] });
    popoutMount(props);
  }
  bindPopouts() {
    this.observer = this.patchPopouts.bind(this);
  }
  unbindPopouts() {
    this.observer = void 0;
  }
  async bindContextMenus() {
    this.patchChannelContextMenu();
    this.patchGuildContextMenu();
    this.patchUserContextMenu();
  }
  unbindContextMenus() {
    for (const cancel of this.contextMenuPatches) cancel();
  }
  patchGuildContextMenu() {
    this.contextMenuPatches.push(ContextMenu.patch("guild-context", (retVal, props) => {
      if (!props?.guild) return retVal;
      const newItem = ContextMenu.buildItem({
        label: this.strings.contextMenuLabel,
        action: () => {
          this.showModal(this.createModalGuild(props.guild.name, props.guild));
        }
      });
      retVal.props.children?.splice(1, 0, newItem);
    }));
  }
  patchChannelContextMenu() {
    this.contextMenuPatches.push(ContextMenu.patch("channel-context", (retVal, props) => {
      const newItem = ContextMenu.buildItem({
        label: this.strings.contextMenuLabel,
        action: () => {
          if (!Object.keys(props.channel.permissionOverwrites).length) return UI.showToast(`#${props.channel.name} has no permission overrides`, { type: "info" });
          this.showModal(this.createModalChannel(props.channel.name, props.channel, props.guild));
        }
      });
      retVal.props.children?.splice(1, 0, newItem);
    }));
  }
  patchUserContextMenu() {
    this.contextMenuPatches.push(ContextMenu.patch("user-context", (retVal, props) => {
      const guild = GuildStore?.getGuild(props.guildId);
      if (!guild) return;
      const newItem = ContextMenu.buildItem({
        label: this.strings.contextMenuLabel,
        action: () => {
          const user = MemberStore?.getMember(props.guildId, props.user.id);
          if (!user) return;
          const name = user.nick ? user.nick : props.user.username;
          this.showModal(this.createModalUser(name, user, guild));
        }
      });
      retVal?.props?.children?.[0]?.props?.children?.splice(2, 0, newItem);
    }));
  }
  showModal(modal) {
    const popout = document.querySelector(`[class*="userPopoutOuter-"]`);
    if (popout) popout.style.display = "none";
    const app = document.querySelector(".app-19_DXt");
    if (app) app.append(modal);
    else document.querySelector("#app-mount")?.append(modal);
    const closeModal = (event) => {
      if (event.key !== "Escape") return;
      modal.classList.add("closing");
      setTimeout(() => {
        modal.remove();
      }, 300);
    };
    document.addEventListener("keydown", closeModal, true);
    DOM.onRemoved(modal, () => document.removeEventListener("keydown", closeModal, true));
  }
  createModalChannel(name, channel, guild) {
    return this.createModal(`#${name}`, channel.permissionOverwrites, getRoles(guild), true);
  }
  createModalUser(name, user, guild) {
    const guildRoles = Object.assign({}, getRoles(guild));
    const userRoles = user.roles.slice(0).filter((r) => typeof guildRoles[r] !== "undefined");
    userRoles.push(guild.id);
    userRoles.sort((a, b) => {
      return guildRoles[b].position - guildRoles[a].position;
    });
    if (user.userId == guild.ownerId) {
      const ALL_PERMISSIONS = Object.values(DiscordPermissions).reduce((all, p) => all | p);
      userRoles.push(user.userId);
      guildRoles[user.userId] = { name: this.strings.modal.owner ?? "", permissions: ALL_PERMISSIONS };
    }
    return this.createModal(name, userRoles, guildRoles);
  }
  createModalGuild(name, guild) {
    return this.createModal(name, getRoles(guild));
  }
  createModal(title, displayRoles, referenceRoles, isOverride) {
    if (!referenceRoles) referenceRoles = displayRoles;
    const modal = DOM.parseHTML(formatString(formatString(this.modalHTML, this.strings.modal), { name: Utils.escapeHTML(title) }));
    const closeModal = () => {
      modal.classList.add("closing");
      setTimeout(() => {
        modal.remove();
      }, 300);
    };
    modal.querySelector(".callout-backdrop")?.addEventListener("click", closeModal);
    for (const r in displayRoles) {
      const role = Array.isArray(displayRoles) ? displayRoles[r] : r;
      const user = UserStore?.getUser(role) || { getAvatarURL: () => AvatarDefaults.DEFAULT_AVATARS[Math.floor(Math.random() * AvatarDefaults.DEFAULT_AVATARS.length)], username: role };
      const member = MemberStore?.getMember(SelectedGuildStore?.getGuildId() ?? "", role) || { colorString: "" };
      const item = DOM.parseHTML(!isOverride || displayRoles[role].type == 0 ? modalbutton_default : formatString(modalbuttonuser_default, { avatarUrl: user.getAvatarURL(null, 16, true) }));
      if (!isOverride || displayRoles[role].type == 0) item.style.color = referenceRoles[role].colorString;
      else item.style.color = member.colorString;
      if (isOverride) item.querySelector(".role-name").innerHTML = Utils.escapeHTML(displayRoles[role].type == 0 ? referenceRoles[role].name : user.username);
      else item.querySelector(".role-name").innerHTML = Utils.escapeHTML(referenceRoles[role].name);
      modal.querySelector(".role-scroller").append(item);
      item.addEventListener("click", () => {
        modal.querySelectorAll(".role-item.selected").forEach((e) => e.classList.remove("selected"));
        item.classList.add("selected");
        const allowed = isOverride ? displayRoles[role].allow : referenceRoles[role].permissions;
        const denied = isOverride ? displayRoles[role].deny : null;
        const permList = modal.querySelector(".perm-scroller");
        permList.innerHTML = "";
        for (const perm in DiscordPermissions) {
          const element = DOM.parseHTML(modalitem_default);
          const permAllowed = (allowed & DiscordPermissions[perm]) == DiscordPermissions[perm];
          const permDenied = isOverride ? (denied & DiscordPermissions[perm]) == DiscordPermissions[perm] : !permAllowed;
          if (!permAllowed && !permDenied) continue;
          if (permAllowed) {
            element.classList.add("allowed");
            element.prepend(DOM.parseHTML(permallowed_default));
          }
          if (permDenied) {
            element.classList.add("denied");
            element.prepend(DOM.parseHTML(permdenied_default));
          }
          element.querySelector(".perm-name").textContent = getPermString(perm) || perm.split("_").map((n) => n[0].toUpperCase() + n.slice(1).toLowerCase()).join(" ");
          permList.append(element);
        }
      });
      item.addEventListener("contextmenu", (e) => {
        ContextMenu.open(e, ContextMenu.buildMenu([
          {
            label: getHashString("rCaznZ") ?? "Copy ID",
            action: () => {
              ElectronModule?.copy(role);
            }
          }
        ]));
      });
    }
    modal.querySelector(".role-item")?.click();
    return modal;
  }
  getSettingsPanel() {
    return this.buildSettingsPanel((_, id, checked) => {
      if (id == "popouts") {
        if (checked) this.bindPopouts();
        else this.unbindPopouts();
      }
      if (id == "contextMenus") {
        if (checked) this.bindContextMenus();
        this.unbindContextMenus();
      }
      if (id == "displayMode") this.setDisplayMode(checked);
    });
  }
};

/*@end@*/