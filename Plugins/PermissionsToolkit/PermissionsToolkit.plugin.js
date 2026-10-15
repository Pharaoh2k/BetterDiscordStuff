/**
 * @name PermissionsToolkit
 * @author Pharaoh2k
 * @description Allows you to Inspect user and role permissions, compare roles or users side-by-side, look up who has specific permissions, and scan for dangerous configurations.
 * @version 1.0.0
 * @authorId 874825550408089610
 * @website https://pharaoh2k.github.io/BetterDiscordStuff/
 * @source https://github.com/Pharaoh2k/BetterDiscordStuff/blob/main/Plugins/PermissionsToolkit/PermissionsToolkit.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/main/Plugins/PermissionsToolkit/PermissionsToolkit.plugin.js
 */

/*
 CODENAME: The-Actual-Competent-Plugin
 
 Based on the MIT licensed PermissionsViewer plugin & RoleMembers plugin by Zerebos, but almost completely rewritten and expanded with many new features and improvements. See the GitHub repo for a full changelog and credits.
*/

/*
This project includes code originally licensed under the following license:
Copyright 2017-2024 Zerebos www.zerebos.com
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software the rights to use, copy, modify, merge, publish, distribute, and
to permit persons to whom the Software is furnished to do so, subject to the
following conditions:
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
 * Copyright © 2026-present Pharaoh2k. All rights reserved.
 * Unauthorized copying, modification, or redistribution of this code is prohibited without prior written consent from the author.
 * This restriction applies only to Pharaoh2k's original contributions and does
 * not affect the code covered by the Zerebos license notice above.
***
 * Contributions are welcome via GitHub pull requests. 
 * Please ensure submissions align with the project's guidelines and coding standards.
*/
"use strict";
const { React, Utils, Data, DOM, Patcher, Logger, UI, Webpack, ContextMenu, Hooks, Net, Plugins } = new BdApi("PermissionsToolkit");
const { Filters } = Webpack;
const RcE = React.createElement;
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
			const nodePath = require("path");
			const updateTarget = nodePath.join(__dirname, nodePath.basename(__filename));
			require("fs").writeFileSync(updateTarget, text);
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
		Logger.info(`showChangelog: last=${last}, current=${this.version}`);
		if (last === this.version) { Logger.info("Skipping: versions match"); return; }
		Data.save('version', this.version);
		if (!last) { Logger.info("Skipping: fresh install"); return; }
		try {
			const res = await Net.fetch(this.urls.changelog);
			Logger.info(`Changelog fetch status: ${res.status}`);
			if (res.status !== 200) return;
			const md = await res.text();
			const changes = this.parseChangelog(md, last, this.version);
			Logger.info("Parsed changes:", changes);
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
		const remoteName = /@name\s+([^\n\r]+)/.exec(text)?.[1]?.trim();
		if (!remoteName) return { ok: false, reason: "Missing @name" };
		if (remoteName !== this.name) return { ok: false, reason: `Unexpected @name (${remoteName})` };
		const remoteVersion = /@version\s+([\d.]+)/.exec(text)?.[1];
		if (!remoteVersion) return { ok: false, reason: "Missing @version" };
		if (!text.includes("module.exports")) return { ok: false, reason: "Missing module.exports" };
		if (!text.includes("@updateUrl")) return { ok: false, reason: "Missing @updateUrl header" };
		return { ok: true, version: remoteVersion };
	}
}
module.exports = (() => {
  const config = {
    config: [
      {
        type: "switch",
        id: "contextMenus",
        name: "Context Menus",
        note: "Adds a button to view permissions in context menus.",
        value: true
      },
      {
        type: "switch",
        id: "popouts",
        name: "Popouts",
        note: "Shows a user's total permissions in their popout similar to roles.",
        value: true
      },
      {
        type: "switch",
        id: "rememberFilter",
        name: "Remember Filter",
        note: "Remembers your last selected permission filter across sessions.",
        value: false
      },
      {
        type: "switch",
        id: "autoUpdate",
        name: "Auto Update-Check",
        note: "Automatically check for updates on startup and every 24 hours.",
        value: true
      }
    ],
    strings: {
      es: {
        contextMenuLabel: "Permisos",
        byRoleLabel: "Por Rol",
        compareRolesLabel: "Comparar Roles",
        permissionLookupLabel: "Búsqueda de Permisos",
        popoutLabel: "Permisos",
        allowed: "Permitido", denied: "Denegado", neutral: "Neutral", notGranted: "Sin efecto",
        all: "Todos", different: "Diferentes", shared: "Compartidos", yes: "Sí", no: "No",
        specialViews: "Vistas Especiales", serverRoles: "Roles del Servidor", users: "Usuarios",
        searchRoles: "Buscar roles...", searchPermissions: "Buscar permisos...",
        noMatchSearch: "Ningún permiso coincide con esta búsqueda",
        noMatchFilter: "Ningún permiso coincide con este filtro",
        noRoleData: "No hay datos de rol disponibles",
        noRolesFound: "No se encontraron roles",
        noRolesHavePermission: "Ningún rol tiene este permiso",
        needTwoRoles: "Este servidor necesita al menos 2 roles para comparar.",
        roleALabel: "Rol A", roleBLabel: "Rol B",
        permissionLabel: "Permiso",
        onlyLabel: "Solo {{name}}",
        both: "Ambos:", neither: "Ninguno:",
        diffSingular: "{{count}} diferencia encontrada",
        diffPlural: "{{count}} diferencias encontradas",
        identicalPerms: "\u2713 Estos roles tienen permisos idénticos",
        selectPermission: "Selecciona un Permiso",
        selectPermissionHint: "Elige cualquier permiso de la barra lateral para ver cada rol que lo tiene.",
        rolesWithPermission: "Roles con este permiso",
        dangerous: "Peligroso", viaAdmin: "vía Admin", rolesCount: "Roles", cachedMembersNote: "Solo se muestran los miembros en caché - es posible que no todos aparezcan en servidores grandes.",
        permissionsTab: "Permisos", membersTab: "Miembros ({{count}})", searchMembers: "Buscar miembros...", noMembersFound: "No se encontraron miembros", noMembersAvailable: "No hay miembros en caché disponibles",
        overrides: "Anulaciones",
        rolesAriaLabel: "Roles", permissionsAriaLabel: "Permisos",
        swapRoles: "Intercambiar roles", viewAllPermissions: "Ver todos los permisos",
        close: "Cerrar", settings: "Ajustes", noOverrides: "#{{name}} no tiene anulaciones de permisos",
        missingGuildData: "Faltan datos del servidor para este canal.",
        memberNotFound: "No se encontraron datos del miembro",
        permissionsModuleError: "Error al cargar el módulo de permisos de Discord. Algunas funciones pueden no funcionar.",
        allPermissions: "Todos los Permisos", permissionsFallback: "Permisos",
        securityAuditLabel: "Auditoría de Seguridad",
        auditCritical: "Crítico", auditWarning: "Advertencia", auditInfo: "Info",
        auditNoIssues: "No se encontraron problemas", auditNoIssuesDesc: "La configuración de permisos de este servidor se ve bien.",
        auditSearchFindings: "Buscar hallazgos...",
        auditDangerousEveryone: "Permisos peligrosos en @everyone",
        auditDangerousEveryoneDesc: "@everyone tiene {{perms}} que podría ser explotado por cualquier miembro.",
        auditTooManyAdmins: "Demasiados roles de administrador",
        auditTooManyAdminsDesc: "{{count}} roles tienen permiso de Administrador. Limite el acceso de administrador para reducir riesgos.",
        auditHighPrivilegeRole: "Rol con muchos privilegios y muchos miembros",
        auditHighPrivilegeRoleDesc: "\"{{role}}\" tiene permisos peligrosos y está asignado a {{count}} miembros en caché.",
        auditPermissiveOverwrite: "Anulación permisiva de canal para @everyone",
        auditPermissiveOverwriteDesc: "#{{channel}} otorga permisos peligrosos a @everyone mediante anulaciones de canal.",
        auditAffectedPerms: "Permisos afectados",
        compareUsersLabel: "Comparar Usuarios", userALabel: "Usuario A", userBLabel: "Usuario B",
        auditMemberCount: "{{count}} miembros",
        swapUsers: "Intercambiar usuarios", needTwoUsers: "Se necesitan al menos 2 miembros en caché para comparar.",
        identicalUserPerms: "\u2713 Estos usuarios tienen permisos idénticos",
        modal: {
          header: "Permisos de {{name}}",
          permissionsLabel: "Permisos",
          owner: "@propietario",
          effectivePermissions: "Permisos Efectivos"
        },
        trace: {
          grantedBy: "Otorgado por", viaOwner: "vía Propietario del Servidor",
          channelAllows: "Permite", channelDenies: "Deniega",
          noOverride: "Sin anulación de canal", userOverride: "anulación de usuario", roleOverride: "anulación de rol"
        }
      },
      pt: {
        contextMenuLabel: "Permissões",
        byRoleLabel: "Por Cargo",
        compareRolesLabel: "Comparar Cargos",
        permissionLookupLabel: "Pesquisa de Permissões",
        popoutLabel: "Permissões",
        allowed: "Permitido", denied: "Negado", neutral: "Neutro", notGranted: "Inativo",
        all: "Todos", different: "Diferentes", shared: "Compartilhados", yes: "Sim", no: "Não",
        specialViews: "Visualizações Especiais", serverRoles: "Cargos do Servidor", users: "Usuários",
        searchRoles: "Pesquisar cargos...", searchPermissions: "Pesquisar permissões...",
        noMatchSearch: "Nenhuma permissão corresponde a esta pesquisa",
        noMatchFilter: "Nenhuma permissão corresponde a este filtro",
        noRoleData: "Nenhum dado de cargo disponível",
        noRolesFound: "Nenhum cargo encontrado",
        noRolesHavePermission: "Nenhum cargo tem esta permissão",
        needTwoRoles: "Este servidor precisa de pelo menos 2 cargos para comparar.",
        roleALabel: "Cargo A", roleBLabel: "Cargo B",
        permissionLabel: "Permissão",
        onlyLabel: "Apenas {{name}}",
        both: "Ambos:", neither: "Nenhum:",
        diffSingular: "{{count}} diferença encontrada",
        diffPlural: "{{count}} diferenças encontradas",
        identicalPerms: "\u2713 Estes cargos têm permissões idênticas",
        selectPermission: "Selecione uma Permissão",
        selectPermissionHint: "Escolha qualquer permissão da barra lateral para ver cada cargo que a possui.",
        rolesWithPermission: "Cargos com esta permissão",
        dangerous: "Perigoso", viaAdmin: "via Admin", rolesCount: "Cargos", cachedMembersNote: "Apenas membros em cache são exibidos - nem todos podem aparecer em servidores grandes.",
        permissionsTab: "Permissões", membersTab: "Membros ({{count}})", searchMembers: "Pesquisar membros...", noMembersFound: "Nenhum membro encontrado", noMembersAvailable: "Nenhum membro em cache disponível",
        overrides: "Substituições",
        rolesAriaLabel: "Cargos", permissionsAriaLabel: "Permissões",
        swapRoles: "Trocar cargos", viewAllPermissions: "Ver todas as permissões",
        close: "Fechar", settings: "Configurações", noOverrides: "#{{name}} não tem substituições de permissões",
        missingGuildData: "Dados do servidor ausentes para este canal.",
        memberNotFound: "Dados do membro não encontrados",
        permissionsModuleError: "Falha ao carregar o módulo de permissões do Discord. Algumas funcionalidades podem não funcionar.",
        allPermissions: "Todas as Permissões", permissionsFallback: "Permissões",
        securityAuditLabel: "Auditoria de Segurança",
        auditCritical: "Crítico", auditWarning: "Aviso", auditInfo: "Info",
        auditNoIssues: "Nenhum problema encontrado", auditNoIssuesDesc: "A configuração de permissões deste servidor parece boa.",
        auditSearchFindings: "Pesquisar descobertas...",
        auditDangerousEveryone: "Permissões perigosas em @everyone",
        auditDangerousEveryoneDesc: "@everyone tem {{perms}} que pode ser explorado por qualquer membro.",
        auditTooManyAdmins: "Muitos cargos de administrador",
        auditTooManyAdminsDesc: "{{count}} cargos têm permissão de Administrador. Limite o acesso de administrador para reduzir riscos.",
        auditHighPrivilegeRole: "Cargo privilegiado com muitos membros",
        auditHighPrivilegeRoleDesc: "\"{{role}}\" tem permissões perigosas e está atribuído a {{count}} membros em cache.",
        auditPermissiveOverwrite: "Substituição permissiva de canal para @everyone",
        auditPermissiveOverwriteDesc: "#{{channel}} concede permissões perigosas a @everyone via substituições de canal.",
        auditAffectedPerms: "Permissões afetadas",
        compareUsersLabel: "Comparar Utilizadores", userALabel: "Utilizador A", userBLabel: "Utilizador B",
        swapUsers: "Trocar utilizadores", needTwoUsers: "Necessita de pelo menos 2 membros em cache para comparar.",
        auditMemberCount: "{{count}} membros",
        identicalUserPerms: "\u2713 Estes utilizadores têm permissões idênticas",
        modal: {
          header: "Permissões de {{name}}",
          permissionsLabel: "Permissões",
          owner: "@dono",
          effectivePermissions: "Permissões Efetivas"
        },
        trace: {
          grantedBy: "Concedido por", viaOwner: "via Proprietário do Servidor",
          channelAllows: "Permite", channelDenies: "Nega",
          noOverride: "Sem substituição de canal", userOverride: "substituição de utilizador", roleOverride: "substituição de cargo"
        }
      },
      de: {
        contextMenuLabel: "Berechtigungen",
        byRoleLabel: "Nach Rolle",
        compareRolesLabel: "Rollen vergleichen",
        permissionLookupLabel: "Berechtigungssuche",
        popoutLabel: "Berechtigungen",
        allowed: "Erlaubt", denied: "Verweigert", neutral: "Neutral", notGranted: "Nicht gesetzt",
        all: "Alle", different: "Unterschiedlich", shared: "Gemeinsam", yes: "Ja", no: "Nein",
        specialViews: "Spezialansichten", serverRoles: "Serverrollen", users: "Benutzer",
        searchRoles: "Rollen suchen...", searchPermissions: "Berechtigungen suchen...",
        noMatchSearch: "Keine Berechtigungen entsprechen dieser Suche",
        noMatchFilter: "Keine Berechtigungen entsprechen diesem Filter",
        noRoleData: "Keine Rollendaten verfügbar",
        noRolesFound: "Keine Rollen gefunden",
        noRolesHavePermission: "Keine Rolle hat diese Berechtigung",
        needTwoRoles: "Dieser Server benötigt mindestens 2 Rollen zum Vergleichen.",
        roleALabel: "Rolle A", roleBLabel: "Rolle B",
        permissionLabel: "Berechtigung",
        onlyLabel: "Nur {{name}}",
        both: "Beide:", neither: "Keine:",
        diffSingular: "{{count}} Unterschied gefunden",
        diffPlural: "{{count}} Unterschiede gefunden",
        identicalPerms: "\u2713 Diese Rollen haben identische Berechtigungen",
        selectPermission: "Berechtigung auswählen",
        selectPermissionHint: "Wähle eine Berechtigung aus der Seitenleiste, um alle Rollen zu sehen, die sie haben.",
        rolesWithPermission: "Rollen mit dieser Berechtigung",
        dangerous: "Gefährlich", viaAdmin: "über Admin", rolesCount: "Rollen", cachedMembersNote: "Es werden nur zwischengespeicherte Mitglieder angezeigt - bei großen Servern fehlen möglicherweise einige.",
        permissionsTab: "Berechtigungen", membersTab: "Mitglieder ({{count}})", searchMembers: "Mitglieder suchen...", noMembersFound: "Keine Mitglieder gefunden", noMembersAvailable: "Keine zwischengespeicherten Mitglieder verfügbar",
        overrides: "Überschreibungen",
        rolesAriaLabel: "Rollen", permissionsAriaLabel: "Berechtigungen",
        swapRoles: "Rollen tauschen", viewAllPermissions: "Alle Berechtigungen anzeigen",
        close: "Schließen", settings: "Einstellungen", noOverrides: "#{{name}} hat keine Berechtigungsüberschreibungen",
        missingGuildData: "Fehlende Serverdaten für diesen Kanal.",
        memberNotFound: "Mitgliedsdaten nicht gefunden",
        permissionsModuleError: "Discord-Berechtigungsmodul konnte nicht geladen werden. Einige Funktionen funktionieren möglicherweise nicht.",
        allPermissions: "Alle Berechtigungen", permissionsFallback: "Berechtigungen",
        securityAuditLabel: "Sicherheitsprüfung",
        auditCritical: "Kritisch", auditWarning: "Warnung", auditInfo: "Info",
        auditNoIssues: "Keine Probleme gefunden", auditNoIssuesDesc: "Die Berechtigungskonfiguration dieses Servers sieht gut aus.",
        auditSearchFindings: "Ergebnisse suchen...",
        auditDangerousEveryone: "Gefährliche @everyone-Berechtigungen",
        auditDangerousEveryoneDesc: "@everyone hat {{perms}}, die von jedem Mitglied ausgenutzt werden könnten.",
        auditTooManyAdmins: "Zu viele Admin-Rollen",
        auditTooManyAdminsDesc: "{{count}} Rollen haben Administratorberechtigung. Beschränken Sie den Admin-Zugriff, um Risiken zu reduzieren.",
        auditHighPrivilegeRole: "Privilegierte Rolle mit vielen Mitgliedern",
        auditHighPrivilegeRoleDesc: "\"{{role}}\" hat gefährliche Berechtigungen und ist {{count}} zwischengespeicherten Mitgliedern zugewiesen.",
        auditPermissiveOverwrite: "Permissive @everyone-Kanalüberschreibung",
        auditPermissiveOverwriteDesc: "#{{channel}} gewährt @everyone gefährliche Berechtigungen über Kanalüberschreibungen.",
        auditAffectedPerms: "Betroffene Berechtigungen",
        compareUsersLabel: "Benutzer vergleichen", userALabel: "Benutzer A", userBLabel: "Benutzer B",
        auditMemberCount: "{{count}} Mitglieder",
        swapUsers: "Benutzer tauschen", needTwoUsers: "Es werden mindestens 2 zwischengespeicherte Mitglieder zum Vergleichen benötigt.",
        identicalUserPerms: "\u2713 Diese Benutzer haben identische Berechtigungen",
        modal: {
          header: "{{name}}s Berechtigungen",
          permissionsLabel: "Berechtigungen",
          owner: "@eigentümer",
          effectivePermissions: "Effektive Berechtigungen"
        },
        trace: {
          grantedBy: "Gewährt durch", viaOwner: "über Servereigentümer",
          channelAllows: "Erlaubt", channelDenies: "Verweigert",
          noOverride: "Keine Kanalüberschreibung", userOverride: "Benutzerüberschreibung", roleOverride: "Rollenüberschreibung"
        }
      },
      en: {
        contextMenuLabel: "Permissions",
        byRoleLabel: "By Role",
        compareRolesLabel: "Compare Roles",
        permissionLookupLabel: "Permission Lookup",
        popoutLabel: "Permissions",
        allowed: "Allowed", denied: "Denied", neutral: "Neutral", notGranted: "Unset",
        all: "All", different: "Different", shared: "Shared", yes: "Yes", no: "No",
        specialViews: "Special Views", serverRoles: "Server Roles", users: "Users",
        searchRoles: "Search roles...", searchPermissions: "Search permissions...",
        noMatchSearch: "No permissions match this search",
        noMatchFilter: "No permissions match this filter",
        noRoleData: "No role data available",
        noRolesFound: "No roles found",
        noRolesHavePermission: "No roles have this permission",
        needTwoRoles: "This server needs at least 2 roles to compare.",
        roleALabel: "Role A", roleBLabel: "Role B",
        permissionLabel: "Permission",
        onlyLabel: "Only {{name}}",
        both: "Both:", neither: "Neither:",
        diffSingular: "{{count}} difference found",
        diffPlural: "{{count}} differences found",
        identicalPerms: "\u2713 These roles have identical permissions",
        selectPermission: "Select a Permission",
        selectPermissionHint: "Pick any permission from the sidebar to see every role that has it.",
        rolesWithPermission: "Roles with this permission",
        dangerous: "Dangerous", viaAdmin: "via Admin", rolesCount: "Roles", cachedMembersNote: "Only cached members are shown - not all may appear in large servers.",
        permissionsTab: "Permissions", membersTab: "Members ({{count}})", searchMembers: "Search members...", noMembersFound: "No members found", noMembersAvailable: "No cached members available",
        overrides: "Overrides",
        rolesAriaLabel: "Roles", permissionsAriaLabel: "Permissions",
        swapRoles: "Swap roles", viewAllPermissions: "View all permissions",
        close: "Close", settings: "Settings", noOverrides: "#{{name}} has no permission overrides",
        missingGuildData: "Missing guild data for this channel.",
        memberNotFound: "Could not find member data",
        permissionsModuleError: "Failed to load Discord permissions module. Some features may not work.",
        allPermissions: "All Permissions", permissionsFallback: "Permissions",
        securityAuditLabel: "Security Audit",
        auditCritical: "Critical", auditWarning: "Warning", auditInfo: "Info",
        auditNoIssues: "No issues found", auditNoIssuesDesc: "This server's permission configuration looks good.",
        auditSearchFindings: "Search findings...",
        auditDangerousEveryone: "Dangerous @everyone permissions",
        auditDangerousEveryoneDesc: "@everyone has {{perms}} which could be exploited by any server member.",
        auditTooManyAdmins: "Too many admin roles",
        auditTooManyAdminsDesc: "{{count}} roles have Administrator permission. Limit admin access to reduce risk.",
        auditHighPrivilegeRole: "High-privilege role with many members",
        auditHighPrivilegeRoleDesc: "\"{{role}}\" has dangerous permissions and is assigned to {{count}} cached members.",
        auditPermissiveOverwrite: "Permissive @everyone channel overwrite",
        auditPermissiveOverwriteDesc: "#{{channel}} grants dangerous permissions to @everyone via channel overwrites.",
        auditAffectedPerms: "Affected permissions",
        auditMemberCount: "{{count}} members",
        compareUsersLabel: "Compare Users", userALabel: "User A", userBLabel: "User B",
        swapUsers: "Swap users", needTwoUsers: "Need at least 2 cached members to compare.",
        identicalUserPerms: "\u2713 These users have identical permissions",
        modal: {
          header: "{{name}}'s Permissions",
          permissionsLabel: "Permissions",
          owner: "@owner",
          effectivePermissions: "Effective Permissions"
        },
        trace: {
          grantedBy: "Granted by", viaOwner: "via Server Owner",
          channelAllows: "Allows", channelDenies: "Denies",
          noOverride: "No channel override", userOverride: "user override", roleOverride: "role override"
        }
      },
      ru: {
        contextMenuLabel: "Полномочия",
        byRoleLabel: "По роли",
        compareRolesLabel: "Сравнить роли",
        permissionLookupLabel: "Поиск разрешений",
        popoutLabel: "Полномочия",
        allowed: "Разрешено", denied: "Запрещено", neutral: "Нейтрально", notGranted: "Не задано",
        all: "Все", different: "Различные", shared: "Общие", yes: "Да", no: "Нет",
        specialViews: "Специальные представления", serverRoles: "Роли сервера", users: "Пользователи",
        searchRoles: "Поиск ролей...", searchPermissions: "Поиск полномочий...",
        noMatchSearch: "Нет полномочий, соответствующих этому поиску",
        noMatchFilter: "Нет полномочий, соответствующих этому фильтру",
        noRoleData: "Нет данных о ролях",
        noRolesFound: "Роли не найдены",
        noRolesHavePermission: "Ни одна роль не имеет этого полномочия",
        needTwoRoles: "Для сравнения на сервере должно быть как минимум 2 роли.",
        roleALabel: "Роль A", roleBLabel: "Роль B",
        permissionLabel: "Полномочие",
        onlyLabel: "Только {{name}}",
        both: "Обе:", neither: "Ни одна:",
        diffSingular: "{{count}} различие найдено",
        diffPlural: "{{count}} различий найдено",
        identicalPerms: "\u2713 Эти роли имеют идентичные полномочия",
        selectPermission: "Выберите полномочие",
        selectPermissionHint: "Выберите любое полномочие на боковой панели, чтобы увидеть все роли, которые его имеют.",
        rolesWithPermission: "Роли с этим полномочием",
        dangerous: "Опасно", viaAdmin: "через Администратора", rolesCount: "Роли", cachedMembersNote: "Показаны только кэшированные участники - на больших серверах могут отображаться не все.",
        permissionsTab: "Полномочия", membersTab: "Участники ({{count}})", searchMembers: "Поиск участников...", noMembersFound: "Участники не найдены", noMembersAvailable: "Нет кэшированных участников",
        overrides: "Переопределения",
        rolesAriaLabel: "Роли", permissionsAriaLabel: "Полномочия",
        swapRoles: "Поменять роли", viewAllPermissions: "Показать все полномочия",
        close: "Закрыть", settings: "Настройки", noOverrides: "#{{name}} не имеет переопределений полномочий",
        missingGuildData: "Отсутствуют данные сервера для этого канала.",
        memberNotFound: "Данные участника не найдены",
        permissionsModuleError: "Не удалось загрузить модуль полномочий Discord. Некоторые функции могут не работать.",
        allPermissions: "Все полномочия", permissionsFallback: "Полномочия",
        securityAuditLabel: "Аудит безопасности",
        auditCritical: "Критический", auditWarning: "Предупреждение", auditInfo: "Инфо",
        auditNoIssues: "Проблем не обнаружено", auditNoIssuesDesc: "Конфигурация полномочий этого сервера выглядит хорошо.",
        auditSearchFindings: "Поиск результатов...",
        auditDangerousEveryone: "Опасные полномочия @everyone",
        auditDangerousEveryoneDesc: "@everyone имеет {{perms}}, что может быть использовано любым участником.",
        auditTooManyAdmins: "Слишком много ролей администратора",
        auditTooManyAdminsDesc: "{{count}} ролей имеют полномочие Администратора. Ограничьте доступ администратора для снижения рисков.",
        auditHighPrivilegeRole: "Привилегированная роль с множеством участников",
        auditHighPrivilegeRoleDesc: "\"{{role}}\" имеет опасные полномочия и назначена {{count}} кэшированным участникам.",
        auditPermissiveOverwrite: "Разрешительное переопределение канала для @everyone",
        auditPermissiveOverwriteDesc: "#{{channel}} предоставляет опасные полномочия @everyone через переопределения канала.",
        auditAffectedPerms: "Затронутые полномочия",
        auditMemberCount: "{{count}} участников",
        compareUsersLabel: "Сравнить пользователей", userALabel: "Пользователь A", userBLabel: "Пользователь B",
        swapUsers: "Поменять пользователей", needTwoUsers: "Для сравнения нужно как минимум 2 кэшированных участника.",
        identicalUserPerms: "\u2713 Эти пользователи имеют идентичные полномочия",
        modal: {
          header: "Полномочия {{name}}",
          permissionsLabel: "Полномочия",
          owner: "Владелец",
          effectivePermissions: "Итоговые полномочия"
        },
        trace: {
          grantedBy: "Предоставлено", viaOwner: "через Владельца сервера",
          channelAllows: "Разрешает", channelDenies: "Запрещает",
          noOverride: "Нет переопределений канала", userOverride: "пользовательское переопределение", roleOverride: "ролевое переопределение"
        }
      },
      fr: {
        contextMenuLabel: "Permissions",
        byRoleLabel: "Par rôle",
        compareRolesLabel: "Comparer les rôles",
        permissionLookupLabel: "Recherche de permissions",
        popoutLabel: "Permissions",
        allowed: "Autorisé", denied: "Refusé", neutral: "Neutre", notGranted: "Non défini",
        all: "Tous", different: "Différents", shared: "Partagés", yes: "Oui", no: "Non",
        specialViews: "Vues spéciales", serverRoles: "Rôles du serveur", users: "Utilisateurs",
        searchRoles: "Rechercher des rôles...", searchPermissions: "Rechercher des permissions...",
        noMatchSearch: "Aucune permission ne correspond à cette recherche",
        noMatchFilter: "Aucune permission ne correspond à ce filtre",
        noRoleData: "Aucune donnée de rôle disponible",
        noRolesFound: "Aucun rôle trouvé",
        noRolesHavePermission: "Aucun rôle n'a cette permission",
        needTwoRoles: "Ce serveur a besoin d'au moins 2 rôles pour comparer.",
        roleALabel: "Rôle A", roleBLabel: "Rôle B",
        permissionLabel: "Permission",
        onlyLabel: "Seulement {{name}}",
        both: "Les deux :", neither: "Aucun :",
        diffSingular: "{{count}} différence trouvée",
        diffPlural: "{{count}} différences trouvées",
        identicalPerms: "\u2713 Ces rôles ont des permissions identiques",
        selectPermission: "Sélectionner une Permission",
        selectPermissionHint: "Choisissez une permission dans la barre latérale pour voir chaque rôle qui la possède.",
        rolesWithPermission: "Rôles avec cette permission",
        dangerous: "Dangereux", viaAdmin: "via Admin", rolesCount: "Rôles", cachedMembersNote: "Seuls les membres en cache sont affichés - certains peuvent manquer sur les grands serveurs.",
        permissionsTab: "Permissions", membersTab: "Membres ({{count}})", searchMembers: "Rechercher des membres...", noMembersFound: "Aucun membre trouvé", noMembersAvailable: "Aucun membre en cache disponible",
        overrides: "Remplacements",
        rolesAriaLabel: "Rôles", permissionsAriaLabel: "Permissions",
        swapRoles: "Échanger les rôles", viewAllPermissions: "Voir toutes les permissions",
        close: "Fermer", settings: "Paramètres", noOverrides: "#{{name}} n'a aucun remplacement de permissions",
        missingGuildData: "Données du serveur manquantes pour ce salon.",
        memberNotFound: "Données du membre introuvables",
        permissionsModuleError: "Échec du chargement du module de permissions Discord. Certaines fonctionnalités peuvent ne pas fonctionner.",
        allPermissions: "Toutes les Permissions", permissionsFallback: "Permissions",
        securityAuditLabel: "Audit de Sécurité",
        auditCritical: "Critique", auditWarning: "Avertissement", auditInfo: "Info",
        auditNoIssues: "Aucun problème trouvé", auditNoIssuesDesc: "La configuration des permissions de ce serveur semble correcte.",
        auditSearchFindings: "Rechercher des résultats...",
        auditDangerousEveryone: "Permissions dangereuses pour @everyone",
        auditDangerousEveryoneDesc: "@everyone a {{perms}} qui pourrait être exploité par n'importe quel membre.",
        auditTooManyAdmins: "Trop de rôles administrateur",
        auditTooManyAdminsDesc: "{{count}} rôles ont la permission Administrateur. Limitez l'accès administrateur pour réduire les risques.",
        auditHighPrivilegeRole: "Rôle privilégié avec beaucoup de membres",
        auditHighPrivilegeRoleDesc: "\"{{role}}\" a des permissions dangereuses et est attribué à {{count}} membres en cache.",
        auditPermissiveOverwrite: "Remplacement permissif de salon pour @everyone",
        auditPermissiveOverwriteDesc: "#{{channel}} accorde des permissions dangereuses à @everyone via des remplacements de salon.",
        auditAffectedPerms: "Permissions affectées",
        compareUsersLabel: "Comparer les utilisateurs", userALabel: "Utilisateur A", userBLabel: "Utilisateur B",
        auditMemberCount: "{{count}} membres",
        swapUsers: "Échanger les utilisateurs", needTwoUsers: "Au moins 2 membres en cache sont nécessaires pour comparer.",
        identicalUserPerms: "\u2713 Ces utilisateurs ont des permissions identiques",
        modal: {
          header: "Permissions de {{name}}",
          permissionsLabel: "Permissions",
          owner: "@propriétaire",
          effectivePermissions: "Permissions effectives"
        },
        trace: {
          grantedBy: "Accordé par", viaOwner: "via Propriétaire du serveur",
          channelAllows: "Autorise", channelDenies: "Refuse",
          noOverride: "Aucun remplacement de salon", userOverride: "remplacement utilisateur", roleOverride: "remplacement de rôle"
        }
      },
      nl: {
        contextMenuLabel: "Permissies",
        byRoleLabel: "Per rol",
        compareRolesLabel: "Rollen vergelijken",
        permissionLookupLabel: "Permissie opzoeken",
        popoutLabel: "Permissies",
        allowed: "Toegestaan", denied: "Geweigerd", neutral: "Neutraal", notGranted: "Niet ingesteld",
        all: "Alle", different: "Verschillend", shared: "Gedeeld", yes: "Ja", no: "Nee",
        specialViews: "Speciale weergaven", serverRoles: "Serverrollen", users: "Gebruikers",
        searchRoles: "Rollen zoeken...", searchPermissions: "Permissies zoeken...",
        noMatchSearch: "Geen permissies komen overeen met deze zoekopdracht",
        noMatchFilter: "Geen permissies komen overeen met dit filter",
        noRoleData: "Geen rolgegevens beschikbaar",
        noRolesFound: "Geen rollen gevonden",
        noRolesHavePermission: "Geen rol heeft deze permissie",
        needTwoRoles: "Deze server heeft minstens 2 rollen nodig om te vergelijken.",
        roleALabel: "Rol A", roleBLabel: "Rol B",
        permissionLabel: "Permissie",
        onlyLabel: "Alleen {{name}}",
        both: "Beide:", neither: "Geen:",
        diffSingular: "{{count}} verschil gevonden",
        diffPlural: "{{count}} verschillen gevonden",
        identicalPerms: "\u2713 Deze rollen hebben identieke permissies",
        selectPermission: "Selecteer een Permissie",
        selectPermissionHint: "Kies een permissie uit de zijbalk om elke rol te zien die deze heeft.",
        rolesWithPermission: "Rollen met deze permissie",
        dangerous: "Gevaarlijk", viaAdmin: "via Admin", rolesCount: "Rollen", cachedMembersNote: "Alleen leden in de cache worden getoond - niet iedereen verschijnt op grote servers.",
        permissionsTab: "Permissies", membersTab: "Leden ({{count}})", searchMembers: "Leden zoeken...", noMembersFound: "Geen leden gevonden", noMembersAvailable: "Geen gecachte leden beschikbaar",
        overrides: "Overschrijvingen",
        rolesAriaLabel: "Rollen", permissionsAriaLabel: "Permissies",
        swapRoles: "Rollen wisselen", viewAllPermissions: "Alle permissies bekijken",
        close: "Sluiten", settings: "Instellingen", noOverrides: "#{{name}} heeft geen permissieoverschrijvingen",
        missingGuildData: "Ontbrekende servergegevens voor dit kanaal.",
        memberNotFound: "Lidgegevens niet gevonden",
        permissionsModuleError: "Kan de Discord-permissiemodule niet laden. Sommige functies werken mogelijk niet.",
        allPermissions: "Alle Permissies", permissionsFallback: "Permissies",
        securityAuditLabel: "Beveiligingsaudit",
        auditCritical: "Kritiek", auditWarning: "Waarschuwing", auditInfo: "Info",
        auditNoIssues: "Geen problemen gevonden", auditNoIssuesDesc: "De permissieconfiguratie van deze server ziet er goed uit.",
        auditSearchFindings: "Resultaten zoeken...",
        auditDangerousEveryone: "Gevaarlijke @everyone-permissies",
        auditDangerousEveryoneDesc: "@everyone heeft {{perms}} die door elk lid kan worden misbruikt.",
        auditTooManyAdmins: "Te veel admin-rollen",
        auditTooManyAdminsDesc: "{{count}} rollen hebben Beheerder-permissie. Beperk admin-toegang om risico's te verminderen.",
        auditHighPrivilegeRole: "Geprivilegieerde rol met veel leden",
        auditHighPrivilegeRoleDesc: "\"{{role}}\" heeft gevaarlijke permissies en is toegewezen aan {{count}} gecachte leden.",
        auditPermissiveOverwrite: "Permissieve @everyone kanaaloverschrijving",
        auditPermissiveOverwriteDesc: "#{{channel}} verleent gevaarlijke permissies aan @everyone via kanaaloverschrijvingen.",
        auditAffectedPerms: "Getroffen permissies",
        auditMemberCount: "{{count}} leden",
        compareUsersLabel: "Gebruikers vergelijken", userALabel: "Gebruiker A", userBLabel: "Gebruiker B",
        swapUsers: "Gebruikers wisselen", needTwoUsers: "Er zijn minstens 2 gecachte leden nodig om te vergelijken.",
        identicalUserPerms: "\u2713 Deze gebruikers hebben identieke permissies",
        modal: {
          header: "{{name}}'s Permissies",
          permissionsLabel: "Permissies",
          owner: "@eigenaar",
          effectivePermissions: "Effectieve permissies"
        },
        trace: {
          grantedBy: "Verleend door", viaOwner: "via Servereigenaar",
          channelAllows: "Staat toe", channelDenies: "Weigert",
          noOverride: "Geen kanaaloverschrijving", userOverride: "gebruikersoverschrijving", roleOverride: "roloverschrijving"
        }
      }
    }
  };
  const styles = `
:root {
  /* Backgrounds */
  --pt-bg-primary: #2b2d31;
  --pt-bg-surface: #1e1f22;
  --pt-bg-hover: #35373c;
  --pt-bg-active: #404249;
  --pt-bg-alt: #3f4147;
  --pt-bg-secondary: #383a3f;
  --pt-bg-strong: #4e5058;
  --pt-bg-darkest: #111214;
  --pt-bg-card: #232428;
  --pt-bg-focus: #1a1b1e;
  /* Text */
  --pt-text-light: #f2f3f5;
  --pt-text-default: #dbdee1;
  --pt-text-muted: #96979e;
  --pt-text-muted-alt: #949ba4;
  --pt-text-subtle: #b5bac1;
  /* Status */
  --pt-status-allowed: #23a55a;
  --pt-status-denied: #f23f43;
  --pt-status-warning: #f0b232;
  --pt-status-owner-gold: #F1C40F;
  /* Brand */
  --pt-brand: #5865f2;
  --pt-brand-light: #7289da;
  /* Role indicator */
  --pt-role-indicator-default: #949ba4;
  /* Translucent */
  --pt-border-divider: rgba(255,255,255,0.03);
  --pt-badge-bg: rgba(255,255,255,0.04);
  --pt-tint-green: rgba(35,165,90,0.15);
  --pt-tint-blue: rgba(88,101,242,0.1);
  --pt-tint-yellow: rgba(240,178,50,0.12);
  --pt-tint-yellow-alt: rgba(240,178,50,0.1);
  --pt-shadow: rgba(0,0,0,0.4);
}
.member-perms-header { color: var(--text-default, #efeff1); display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; line-height: 1.3333333333333333; }
.member-perms { display: flex; flex-wrap: wrap; margin-top: 2px; max-height: 160px; overflow-y: auto; overflow-x: hidden; }
.member-perms .member-perm .perm-circle { border-radius: 50%; height: 12px; margin: 0 8px 0 5px; width: 12px; }
.perm-details-button { cursor: pointer; height: 12px; width: 12px; background: none; border: none; padding: 0; display: flex; align-items: center; justify-content: center; }
.perm-details-button svg { fill: var(--text-muted, #96979e); height: 12px; width: 12px; }
.member-perms::-webkit-scrollbar-thumb, .member-perms::-webkit-scrollbar-track { background-clip: padding-box; border-radius: 7.5px; border-style: solid; border-width: 3px; visibility: hidden; }
.member-perms:hover::-webkit-scrollbar-thumb, .member-perms:hover::-webkit-scrollbar-track { visibility: visible; }
.member-perms::-webkit-scrollbar-track { border-width: initial; background-color: transparent; border: 2px solid transparent; }
.member-perms::-webkit-scrollbar-thumb { border: 2px solid transparent; border-radius: 4px; cursor: move; background-color: var(--scrollbar-auto-thumb, #666770); }
.member-perms::-webkit-scrollbar { height: 8px; width: 8px; }
/* Permission Viewer Modal */
.pt-unified-modal * { box-sizing: border-box; }
.pt-unified-modal > header { display: none; }
.pt-unified-modal > [class*="body__"] { overflow: hidden !important; scrollbar-gutter: auto !important; }
.pt-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-bottom: 1px solid var(--background-accent, #393a41); }
.pt-header-title { display: flex; align-items: center; gap: 12px; min-width: 0; }
.pt-header-avatar { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; object-fit: cover; }
.pt-header-fallback { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: var(--text-default, #efeff1); background: linear-gradient(135deg, var(--pt-brand), var(--pt-brand-light)); }
.pt-header-text h2 { margin: 0; font-size: 20px; font-weight: 600; line-height: 1.2; color: var(--text-default, #efeff1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pt-header-text p { margin: 2px 0 0 0; font-size: 13px; color: var(--text-muted, #96979e); }
.pt-header-actions { display: flex; align-items: center; gap: 4px; }
.pt-header-btn { display: flex; align-items: center; justify-content: center; padding: 8px; border: none; border-radius: 4px; background: transparent; color: var(--text-muted, #96979e); cursor: pointer; }
.pt-header-btn:hover { color: var(--text-default, #efeff1); background: var(--background-mod-subtle, rgba(151,151,159,0.08)); }
.pt-modal-content { display: flex; flex: 1; overflow: hidden; }
.pt-sidebar { display: flex; flex-direction: column; width: 270px; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-right: 1px solid var(--background-accent, #393a41); }
.pt-sidebar-search { padding: 12px; border-bottom: 1px solid var(--background-accent, #393a41); }
.pt-sidebar-body { flex: 1; overflow-y: auto; padding: 8px; scrollbar-width: thin; scrollbar-color: var(--background-accent, #393a41) transparent; }
.pt-sidebar-roles { width: 100%; }
.pt-sidebar-section { margin-bottom: 16px; }
.pt-sidebar-section:last-child { margin-bottom: 8px; }
.pt-section-label { color: var(--text-muted, #96979e); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 8px 8px 4px; }
.pt-role-btn { display: flex; align-items: center; gap: 10px; width: 100%; margin-bottom: 2px; padding: 8px 10px; border: none; border-radius: 4px; text-align: left; cursor: pointer; color: var(--text-default, #efeff1); background: transparent; font-size: 14px; font-family: inherit; }
.pt-role-btn:hover { color: var(--text-default, #efeff1); background: var(--background-mod-subtle, rgba(151,151,159,0.08)); }
.pt-role-btn.active { color: var(--text-default, #efeff1); background: var(--background-mod-strong, rgba(151,151,159,0.2)); }
.pt-role-indicator { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; width: 14px; height: 14px; border-radius: 50%; }
.pt-role-avatar { width: 18px; height: 18px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.pt-role-icon { width: 18px; height: 18px; border-radius: 4px; object-fit: cover; margin-left: auto; flex-shrink: 0; }
.pt-role-name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.pt-main-content { display: flex; flex: 1; flex-direction: column; overflow: hidden; }
.pt-content-search { padding: 12px 20px; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-bottom: 1px solid var(--background-accent, #393a41); }
.pt-main-body { flex: 1; overflow-y: auto; padding: 20px; scrollbar-width: thin; scrollbar-color: var(--background-accent, #393a41) transparent; }
.pt-search-field { position: relative; }
.pt-search-field.with-icon input { padding: 9px 12px 9px 36px; }
.pt-search-field input { width: 100%; padding: 9px 10px; border: none; border-radius: 4px; font-size: 14px; color: var(--text-default, #efeff1); background: var(--background-base-lower, #1a1a1e); outline: none; font-family: inherit; }
.pt-search-field input::placeholder { color: var(--text-muted, #96979e); }
.pt-search-field input:focus { background: var(--background-base-lowest, #121214); }
.pt-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted, #96979e); pointer-events: none; display: flex; }
.pt-perm-category { margin-bottom: 24px; }
.pt-perm-category:last-child { margin-bottom: 0; }
.pt-category-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted, #96979e); width: 100%; background: none; border: none; padding: 0; cursor: pointer; font-family: inherit; text-align: left; transition: opacity 0.15s; }
.pt-category-header:hover { opacity: 0.7; }
.pt-category-header::after { content: ""; flex: 1; height: 1px; background: linear-gradient(to right, var(--background-accent, #393a41), transparent); }
.pt-perm-list { display: flex; flex-direction: column; gap: 2px; }
.pt-perm-item { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 14px; border-radius: 4px; background: var(--background-surface-higher, #1c1c1f); }
.pt-perm-item:hover { background: var(--background-base-lowest, #121214); }
.pt-perm-info { display: flex; align-items: flex-start; gap: 12px; flex: 1; min-width: 0; }
.pt-perm-status-icon { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; margin-top: 2px; flex-shrink: 0; }
.pt-perm-square { width: 18px; height: 18px; border-radius: 3px; }
.pt-perm-details { min-width: 0; }
.pt-perm-name { font-size: 14px; font-weight: 500; color: var(--text-default, #efeff1); }
.pt-perm-description { font-size: 12px; line-height: 1.4; color: var(--text-muted, #96979e); }
.pt-status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 3px; font-size: 12px; font-weight: 500; white-space: nowrap; width: 82px; flex-shrink: 0; justify-content: flex-start; }
.pt-status-badge svg { width: 14px; height: 14px; flex-shrink: 0; }
.pt-perm-square.allowed, .pt-status-badge.allowed { color: var(--pt-status-allowed); background: color-mix(in srgb, var(--pt-status-allowed) 12%, transparent); }
.pt-perm-square.denied, .pt-status-badge.denied { color: var(--pt-status-denied); background: color-mix(in srgb, var(--pt-status-denied) 12%, transparent); }
.pt-perm-square.neutral, .pt-status-badge.neutral { color: var(--text-muted, #96979e); background: color-mix(in srgb, var(--pt-text-muted-alt) 12%, transparent); }
.pt-empty-state { padding: 12px; font-size: 13px; color: var(--text-muted, #96979e); }
@media (max-width: 768px) {
    .pt-modal-content { flex-direction: column; }
    .pt-sidebar { width: 100%; max-height: 200px; border-right: none; border-bottom: 1px solid var(--background-accent, #393a41); }
    .pt-sidebar-body { display: flex; gap: 4px; overflow-x: auto; overflow-y: hidden; }
    .pt-sidebar-section { display: flex; gap: 4px; margin-bottom: 0; }
    .pt-section-label { display: none; }
    .pt-role-btn { flex-shrink: 0; width: auto; }
    .pt-perm-item { flex-direction: column; align-items: flex-start; }
    .pt-perm-item .pt-status-badge { width: 100%; justify-content: center; }
}
.pt-diff-selector-row { display: flex; align-items: flex-end; gap: 12px; padding: 14px 20px 0; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); }
.pt-diff-role-select-wrap { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.pt-diff-role-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted, #96979e); }
.pt-diff-role-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.pt-diff-swap-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); color: var(--text-muted, #96979e); cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.15s, transform 0.2s; }
.pt-diff-swap-btn:hover { background: var(--background-mod-strong, rgba(151,151,159,0.2)); transform: rotate(180deg); }
.pt-diff-filter-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 10px 20px 12px; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-bottom: 1px solid var(--background-accent, #393a41); }
.pt-diff-filter-btn { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 6px; border: 1px solid transparent; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); color: var(--text-muted, #96979e); font-size: 12px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all 0.15s; }
.pt-diff-filter-btn:hover { opacity: 0.85; }
.pt-diff-count-badge { min-width: 18px; height: 18px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; padding: 0 4px; }
.pt-diff-search { margin-left: auto; position: relative; display: flex; align-items: center; }
.pt-diff-search-icon { position: absolute; left: 9px; color: var(--text-muted, #96979e); pointer-events: none; display: flex; }
.pt-diff-search input { background: var(--background-surface-high, #242429); border: none; border-radius: 6px; padding: 6px 10px 6px 30px; color: var(--text-default, #efeff1); font-size: 13px; outline: none; width: 200px; font-family: inherit; }
.pt-diff-search input::placeholder { color: var(--text-muted, #96979e); }
.pt-diff-col-headers { display: grid; grid-template-columns: 1fr 120px 120px; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-bottom: 1px solid var(--background-accent, #393a41); padding: 0 20px; }
.pt-diff-search input:focus { background: var(--background-base-lowest); }
.pt-diff-col-hdr { padding: 10px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted, #96979e); display: flex; align-items: center; justify-content: center; gap: 6px; }
.pt-diff-col-hdr:not(:first-child) { border-left: 1px solid var(--background-accent, #393a41); }
.pt-diff-col-hdr:first-child { justify-content: flex-start; }
.pt-diff-body { flex: 1; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--background-accent, #393a41) transparent; }
.pt-diff-body::-webkit-scrollbar { width: 6px; }
.pt-diff-body::-webkit-scrollbar-track { background: transparent; }
.pt-diff-body::-webkit-scrollbar-thumb { background: var(--background-accent, #393a41); border-radius: 3px; }
.pt-diff-cat-btn { width: 100%; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border: none; border-bottom: 1px solid var(--background-accent, #393a41); padding: 7px 20px; display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-muted, #96979e); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; font-family: inherit; text-align: left; transition: opacity 0.15s; }
.pt-diff-cat-btn:hover { opacity: 0.7; }
.pt-diff-cat-count { background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-radius: 8px; padding: 1px 7px; font-size: 11px; font-weight: 600; color: var(--text-subtle, #abacb2); }
.pt-diff-cat-chevron { transition: transform 0.2s ease; flex-shrink: 0; fill: currentColor; }
.pt-diff-cat-chevron.open { transform: rotate(90deg); }
.pt-diff-cat-badges { margin-left: auto; display: flex; gap: 4px; flex-shrink: 0; }
.pt-diff-mini-badge { border-radius: 4px; padding: 1px 6px; font-size: 10px; font-weight: 700; }
.pt-diff-row { display: grid; grid-template-columns: 1fr 120px 120px; border-bottom: 1px solid var(--pt-border-divider); transition: filter 0.1s; }
.pt-diff-row:hover { filter: brightness(1.5); }
.pt-diff-perm-cell { padding: 10px 20px; display: flex; flex-direction: column; gap: 2px; }
.pt-diff-perm-name { font-size: 13px; font-weight: 500; color: var(--text-default, #efeff1); display: flex; align-items: center; gap: 6px; }
.pt-diff-perm-name.muted { color: var(--text-muted, #96979e); }
.pt-diff-accent { width: 3px; height: 14px; border-radius: 2px; flex-shrink: 0; }
.pt-diff-perm-desc { font-size: 11px; color: var(--text-muted, #96979e); line-height: 1.4; }
.pt-diff-val-cell { border-left: 1px solid var(--background-accent, #393a41); display: flex; align-items: center; justify-content: center; padding: 10px 0; }
.pt-diff-yes-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.pt-diff-no-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 4px; font-size: 11px; font-weight: 600; background: var(--pt-badge-bg); color: var(--text-muted, #96979e); }
.pt-diff-footer { background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-top: 1px solid var(--background-accent, #393a41); padding: 10px 20px; display: flex; align-items: center; gap: 16px; font-size: 12px; color: var(--text-muted, #96979e); flex-wrap: wrap; }
.pt-diff-footer-chip { display: flex; align-items: center; gap: 6px; }
.pt-diff-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.pt-diff-footer-note { margin-left: auto; font-style: italic; }
.pt-rl-sidebar { width: 270px; flex-shrink: 0; display: flex; flex-direction: column; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-right: 1px solid var(--background-accent, #393a41); }
.pt-rl-cat-btn { display: flex; align-items: center; gap: 4px; width: 100%; padding: 8px 6px; border: none; background: transparent; color: var(--text-muted, #96979e); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; font-family: inherit; }
.pt-rl-cat-btn:hover { opacity: 0.8; }
.pt-rl-perm-btn { display: flex; align-items: center; gap: 8px; width: 100%; padding: 7px 10px 7px 22px; border: none; border-radius: 4px; text-align: left; cursor: pointer; color: var(--text-default, #efeff1); background: transparent; font-size: 13px; font-family: inherit; margin-bottom: 1px; }
.pt-rl-perm-btn:hover { background: var(--background-mod-subtle, rgba(151,151,159,0.08)); }
.pt-rl-perm-btn.active { background: var(--background-mod-strong, rgba(151,151,159,0.2)); color: var(--text-default, #efeff1); }
.pt-rl-perm-banner { padding: 16px 20px; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-bottom: 1px solid var(--background-accent, #393a41); flex-shrink: 0; }
.pt-rl-section-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted, #96979e); }
.pt-tab-bar { display: flex; align-items: stretch; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-bottom: 1px solid var(--background-accent, #393a41); padding: 0 8px; flex-shrink: 0; overflow-x: auto; }
.pt-tab-btn { display: inline-flex; align-items: center; gap: 7px; padding: 0 14px; height: 44px; border: none; border-bottom: 2px solid transparent; background: transparent; color: var(--text-muted, #96979e); font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer; transition: color 0.15s, border-bottom-color 0.15s, background 0.15s; white-space: nowrap; flex-shrink: 0; }
.pt-tab-btn:hover { color: var(--text-default, #efeff1); background: var(--background-mod-subtle, rgba(151,151,159,0.08)); }
.pt-tab-btn.active { color: var(--text-default, #efeff1); border-bottom-color: var(--pt-brand); background: var(--background-base-lowest, #121214);}
.pt-tab-btn svg { opacity: 0.8; }
.pt-tab-btn.active svg { opacity: 1; }
.pt-tab-panel { display: flex; flex: 1; overflow: hidden; flex-direction: column; }
.pt-tab-panel > .pt-modal-content { flex: 1; }
/* Utility */
.pt-hash-icon { font-size: 14px; font-weight: 700; line-height: 1; }
.pt-text-truncate { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.pt-admin-shield { margin-left: auto; color: var(--pt-status-warning); display: flex; }
/* Diff panel */
.pt-diff-dot-inline { display: inline-block; }
.pt-diff-dot-green { background: var(--pt-status-allowed); }
.pt-diff-dot-gray { background: var(--pt-bg-strong); }
.pt-diff-mini-badge-shared { background: var(--pt-tint-green); color: var(--pt-status-allowed); }
.pt-diff-empty-center { flex: 1; display: flex; align-items: center; justify-content: center; color: var(--text-muted, #96979e); font-size: 14px; }
/* Lookup panel - sidebar */
.pt-rl-cat-group { margin-bottom: 4px; }
.pt-rl-count-badge { margin-left: auto; font-size: 10px; color: var(--text-muted, #96979e); background: var(--background-surface-high, #242429); border-radius: 8px; padding: 1px 6px; }
.pt-rl-indicator-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
/* Lookup panel - banner */
.pt-rl-banner-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.pt-rl-banner-body { min-width: 0; }
.pt-rl-banner-title { font-size: 16px; font-weight: 600; color: var(--text-default, #efeff1); display: flex; align-items: center; gap: 8px; }
.pt-rl-dangerous-badge { font-size: 10px; font-weight: 600; color: var(--pt-status-warning); background: var(--pt-tint-yellow); padding: 2px 8px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
.pt-rl-banner-desc { font-size: 13px; color: var(--text-muted, #96979e); margin-top: 4px; line-height: 1.4; }
.pt-rl-roles-count { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 4px; background: var(--pt-tint-blue); color: var(--pt-brand); font-size: 13px; font-weight: 600; white-space: nowrap; }
.pt-rl-roles-count-number { font-size: 18px; line-height: 1; }
.pt-rl-roles-count-label { font-size: 11px; font-weight: 500; opacity: 0.8; }
/* Lookup panel - results */
.pt-rl-no-roles { padding: 40px; text-align: center; color: var(--text-muted, #96979e); font-size: 14px; }
.pt-rl-section-wrap { margin-bottom: 24px; }
.pt-rl-check-icon { display: flex; color: var(--pt-status-allowed); }
.pt-rl-holder-count { font-size: 10px; background: var(--background-surface-high, #242429); border-radius: 8px; padding: 1px 6px; }
.pt-rl-divider-line { flex: 1; height: 1px; background: linear-gradient(to right, var(--pt-bg-alt), transparent); }
.pt-rl-role-list { display: flex; flex-direction: column; gap: 2px; }
.pt-rl-role-dot { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; }
.pt-rl-role-name { font-size: 14px; font-weight: 500; flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.pt-rl-via-admin { font-size: 11px; color: var(--pt-status-warning); background: var(--pt-tint-yellow-alt); padding: 2px 8px; border-radius: 3px; font-weight: 500; display: flex; align-items: center; gap: 4px; }
.pt-rl-role-pos { font-size: 11px; color: var(--text-muted, #96979e); }
/* Lookup panel - members */
.pt-rl-member-row { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 4px; background: var(--background-secondary-alt, #393a41); }
.pt-rl-member-row:hover { background: var(--background-mod-normal, rgba(151,151,159,0.16)); }
.pt-rl-member-avatar { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.pt-rl-member-avatar-fallback { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--text-default, #efeff1); background: linear-gradient(135deg, var(--pt-brand), var(--pt-brand-light)); }
.pt-rl-member-info { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 6px; }
.pt-rl-member-name { font-size: 14px; font-weight: 500; color: var(--text-default, #efeff1); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.pt-rl-member-nick { font-size: 12px; color: var(--text-muted, #96979e); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.pt-rl-cached-note { display: flex; align-items: center; gap: 6px; padding: 8px 12px; margin-top: 12px; border-radius: 4px; font-size: 12px; color: var(--text-muted, #96979e); background: var(--background-secondary-alt, #393a41); border-left: 3px solid var(--background-accent, #393a41); }
/* Avatar stack */
.pt-rl-avatar-stack { display: flex; align-items: center; margin-left: auto; flex-shrink: 0; }
.pt-rl-stack-avatar, .pt-rl-stack-avatar-fallback { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--background-secondary-alt, #393a41); margin-left: -6px; object-fit: cover; flex-shrink: 0; position: relative; }
.pt-rl-stack-avatar:first-child, .pt-rl-stack-avatar-fallback:first-child { margin-left: 0; }
.pt-rl-stack-avatar-fallback { display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: var(--text-default, #efeff1); background: linear-gradient(135deg, var(--pt-brand), var(--pt-brand-light)); }
.pt-rl-stack-overflow { font-size: 11px; color: var(--text-muted, #96979e); margin-left: 4px; white-space: nowrap; }
/* Role card */
.pt-rl-role-card { margin-bottom: 2px; }
.pt-rl-role-card-header { cursor: pointer; width: 100%; border: none; text-align: left; font-family: inherit; font-size: 14px; display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 4px; background: var(--background-secondary-alt, #393a41); color: var(--text-default, #efeff1); }
.pt-rl-role-card-header:hover { background: var(--background-mod-subtle, rgba(151,151,159,0.08)); }
.pt-rl-role-card-body { padding: 4px 0 8px 40px; display: flex; flex-direction: column; gap: 2px; }
/* ByRole sub-tabs */
.pt-subtab-bar { display: flex; gap: 0; border-bottom: 1px solid var(--background-accent, #393a41); margin-bottom: 12px; }
.pt-subtab { padding: 8px 16px; font-size: 13px; font-weight: 600; color: var(--text-muted, #96979e); background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; font-family: inherit; transition: color 0.15s, border-color 0.15s; }
.pt-subtab:hover { color: var(--text-default, #efeff1); }
.pt-subtab.active { color: var(--text-default, #efeff1); border-bottom-color: var(--text-brand, #798df9); background: var(--background-base-lowest, #121214);}
/* Lookup panel - empty state */
.pt-rl-empty-state { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: var(--text-muted, #96979e); padding: 40px; }
.pt-rl-empty-icon { width: 72px; height: 72px; border-radius: 50%; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); display: flex; align-items: center; justify-content: center; }
.pt-rl-empty-title { font-size: 16px; font-weight: 600; color: var(--text-subtle, #abacb2); }
.pt-rl-empty-hint { font-size: 13px; text-align: center; max-width: 260px; line-height: 1.5; }
/* Security Audit Panel */
.pt-audit-clean { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: var(--pt-status-allowed); padding: 40px; text-align: center; }
.pt-audit-clean svg { width: 48px; height: 48px; opacity: 0.8; }
.pt-audit-clean h3 { font-size: 18px; font-weight: 600; margin: 0; }
.pt-audit-clean p { font-size: 13px; color: var(--text-muted, #96979e); margin: 0; max-width: 300px; }
.pt-audit-summary { display: flex; gap: 8px; padding: 12px 16px; flex-wrap: wrap; }
.pt-audit-severity-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 16px; border: 1px solid var(--background-accent, #393a41); background: var(--background-mod-subtle, rgba(151,151,159,0.08)); color: var(--text-default, #efeff1); font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
.pt-audit-severity-chip:hover { background: var(--background-mod-normal, rgba(151,151,159,0.16)); }
.pt-audit-severity-chip.active { border-color: var(--chip-color, #5865f2); background: color-mix(in srgb, var(--chip-color, #5865f2) 15%, transparent); }
.pt-audit-chip-count { font-weight: 700; font-size: 12px; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); border-radius: 10px; padding: 1px 7px; }
.pt-audit-findings { display: flex; flex-direction: column; gap: 8px; padding: 8px 16px 16px; }
.pt-audit-finding { border-radius: 8px; background: var(--background-base-lower, #1a1a1e); border: 1px solid var(--background-accent, #393a41); overflow: hidden; transition: border-color 0.15s; }
.pt-audit-finding.expanded { border-color: var(--background-mod-strong, rgba(151,151,159,0.2)); }
.pt-audit-finding-header { display: flex; align-items: center; gap: 10px; padding: 10px 14px; cursor: pointer; user-select: none; }
.pt-audit-finding-header:hover { background: var(--background-mod-normal, rgba(151,151,159,0.16)); }
.pt-audit-severity-badge { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 13px; flex-shrink: 0; }
.pt-audit-finding-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pt-audit-finding-title { font-size: 14px; font-weight: 600; color: var(--text-default, #efeff1); }
.pt-audit-finding-desc { font-size: 12px; color: var(--text-muted, #96979e); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pt-audit-entity { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted, #96979e); flex-shrink: 0; max-width: 140px; flex-wrap: nowrap; }
.pt-audit-chevron { transition: transform 0.2s; display: flex; flex-shrink: 0; }
.pt-audit-chevron.open { transform: rotate(180deg); }
.pt-audit-finding-detail { padding: 0 14px 12px; border-top: 1px solid var(--background-accent, #393a41); }
.pt-audit-detail-label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text-muted, #96979e); margin: 10px 0 6px; letter-spacing: 0.02em; }
.pt-audit-perm-chips { display: flex; flex-wrap: wrap; gap: 4px; }
.pt-audit-perm-chip { display: inline-block; padding: 3px 8px; border-radius: 4px; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); color: var(--text-default, #efeff1); font-size: 12px; }
.pt-audit-member-count { display: block; margin-top: 8px; font-size: 12px; color: var(--text-muted, #96979e); }
/* Permission Trace */
.pt-trace-item-wrap { border-radius: 6px; transition: background 0.15s; }
.pt-trace-item-wrap .pt-perm-item { cursor: pointer; }
.pt-trace-clickable:hover { background: var(--background-mod-normal, rgba(151,151,159,0.16)); }
.pt-trace-chevron { display: flex; align-items: center; transition: transform 0.2s; color: var(--text-muted, #96979e); }
.pt-trace-chevron.open { transform: rotate(180deg); }
.pt-trace-card { padding: 8px 12px 10px 36px; background: var(--background-secondary-alt, #393a41); border-radius: 0 0 6px 6px; margin-top: -2px; }
.pt-trace-section { margin-bottom: 8px; }
.pt-trace-section-label { display: block; font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--text-muted, #96979e); margin-bottom: 4px; letter-spacing: 0.02em; }
.pt-trace-role-list { display: flex; flex-direction: column; gap: 4px; }
.pt-trace-role-row { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-default, #efeff1); }
.pt-trace-via-owner { display: flex; align-items: center; gap: 6px; padding: 4px 0; font-size: 13px; color: var(--pt-status-owner-gold); font-weight: 600; }
.pt-trace-via-owner svg { width: 14px; height: 14px; }
.pt-trace-channel-status { font-size: 12px; padding: 4px 0; font-weight: 500; }
.pt-trace-channel-status.allowed { color: var(--pt-status-allowed); }
.pt-trace-channel-status.denied { color: var(--pt-status-denied); }
.pt-trace-no-override { font-size: 12px; color: var(--text-muted, #96979e); font-style: italic; padding: 4px 0; }
.pt-trace-badge-wrap { display: flex; align-items: center; gap: 6px; }
.pt-diff-footer.no-border { border-top: none; padding-top: 0; }
.pt-diff-select-chevron { display: flex; color: var(--text-muted, #96979e); }
/* User Selector / Compare Users */
.pt-user-select-wrap { position: relative; flex: 1; min-width: 0; }
.pt-user-select-trigger { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 10px; background: var(--background-surface-high, #242429); border: 1px solid transparent; border-radius: 6px; color: var(--text-default, #efeff1); font-size: 14px; cursor: pointer; transition: border-color 0.15s; }
.pt-user-select-trigger:hover { border-color: var(--background-mod-strong, rgba(151,151,159,0.2)); }
.pt-user-select-avatar { width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; object-fit: cover; }
.pt-user-select-avatar-fallback { width: 24px; height: 24px; border-radius: 50%; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0; color: var(--text-muted, #96979e); }
.pt-user-select-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pt-user-select-dropdown { position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 1000; background: var(--background-base-lowest, #121214); border-radius: 8px; border: 1px solid var(--background-accent, #393a41); box-shadow: 0 8px 24px var(--pt-shadow); max-height: 260px; display: flex; flex-direction: column; overflow: hidden; }
.pt-user-select-search { width: 100%; padding: 8px 10px; border: none; border-bottom: 1px solid var(--background-accent, #393a41); background: transparent; color: var(--text-default, #efeff1); font-size: 13px; outline: none; box-sizing: border-box; font-family: inherit; }
.pt-user-select-search::placeholder { color: var(--text-muted, #96979e); }
.pt-user-select-list { overflow-y: auto; flex: 1; padding: 4px; scrollbar-width: thin; scrollbar-color: var(--background-accent, #393a41) transparent; }
.pt-user-select-list::-webkit-scrollbar { width: 6px; }
.pt-user-select-list::-webkit-scrollbar-thumb { background: var(--background-accent, #393a41); border-radius: 3px; }
.pt-user-select-list::-webkit-scrollbar-track { background: transparent; }
.pt-user-select-option { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 13px; color: var(--text-default, #efeff1); background: none; border: none; width: 100%; text-align: left; font-family: inherit; }
.pt-user-select-option:hover { background: var(--background-mod-normal, rgba(151,151,159,0.16)); }
.pt-user-select-option.active { background: color-mix(in srgb, var(--brand-500, #5865f2) 15%, transparent); }
.pt-user-select-opt-avatar { width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; object-fit: cover; }
.pt-user-select-opt-avatar-fallback { width: 28px; height: 28px; border-radius: 50%; background: var(--background-mod-subtle, rgba(151,151,159,0.08)); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; flex-shrink: 0; color: var(--text-muted, #96979e); }
.pt-user-select-opt-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.pt-user-select-opt-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; font-weight: 500; color: var(--text-default, #efeff1); }
.pt-user-select-opt-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: var(--text-muted, #96979e); }
.pt-user-select-owner-badge { display: inline-flex; align-items: center; flex-shrink: 0; margin-left: 2px; font-size: 14px; }
.pt-user-select-empty { padding: 16px; text-align: center; color: var(--text-muted, #96979e); font-size: 13px; }
    `;
  const PT_ROLE_DEFAULT_COLOR = "#949ba4";
  const safeBigInt = (value, fallback = 0n) => {
    try { return BigInt(value ?? 0); } catch (err) { Logger.warn("Failed to convert to BigInt:", err); return fallback; }
  };
  const createIcon = (d, size = 14) => () => RcE("svg", {
    viewBox: "0 0 24 24", fill: "currentColor", width: String(size), height: String(size), "aria-hidden": "true"
  }, RcE("path", { d }));
  const checkPath = "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z";
  const CheckIcon = createIcon(checkPath);
  const DeniedIcon = createIcon("M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.68-4.9L16.9 18.32C15.55 19.37 13.85 20 12 20zm6.32-3.1L7.1 5.68C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.68 4.9z");
  const NeutralIcon = createIcon("M19 13H5v-2h14v2z");
  const SearchIcon = createIcon("M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z", 16);
  const CloseIcon = createIcon("M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z", 24);
  const SwapIcon = createIcon("M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z", 16);
  const SmallCheckIcon = createIcon(checkPath, 13);
  const SmallXIcon = createIcon("M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z", 13);
  const PersonIcon = createIcon("M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z");
  const PeopleIcon = createIcon("M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z", 18);
  const AuditShieldIcon = createIcon("M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm1 15h-2v-2h2v2zm0-4h-2V7h2v5z", 16);
  const CrownIcon = createIcon("M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z");
  const HashIcon = () => RcE("span", { className: "pt-hash-icon" }, "#");
  const ShieldIcon = createIcon("M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z", 14);
  const ArrowIcon = createIcon("M10 17l5-5-5-5v10z", 20);
  const ReverseIcon = createIcon("M7.5 21.5L3 17l4.5-4.5 1.05 1.05L5.6 16.5H16v-4h1.5v5.5H5.6l2.95 2.95-1.05 1.05zM6.5 12V6.5h11.9l-2.95-2.95L16.5 2.5 21 7l-4.5 4.5-1.05-1.05 2.95-2.95H8V12H6.5z", 18);
  const ChevronDownIcon = createIcon("M7 10l5 5 5-5z");
  const DetailsIcon = createIcon("M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z", 20);
  const GearIcon = createIcon("M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1112 8.4a3.6 3.6 0 010 7.2z", 18);
  const formatString = (str, values) => {
    for (const key in values) {
      str = str.replaceAll(`{{${key}}}`, values[key]);
    }
    return str;
  };
  const isOverwriteEmpty = (overwrite) => {
    if (!overwrite) return true;
    return safeBigInt(overwrite.allow) === 0n && safeBigInt(overwrite.deny) === 0n;
  };
  const matchesPermSearch = (p, q) => !q || p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
  const hasOverwrites = (channel) => {
    const overwrites = channel.permissionOverwrites;
    if (!overwrites) return false;
    const ids = Object.keys(overwrites);
    if (!ids.length) return false;
    for (const id of ids) {
      if (!isOverwriteEmpty(overwrites[id])) return true;
    }
    return false;
  };
  const statusIcons = { allowed: CheckIcon, denied: DeniedIcon, neutral: NeutralIcon };
  const getRoleIconUrl = (role) => role?.icon ? `https://cdn.discordapp.com/role-icons/${role.id}/${role.icon}.webp` : undefined;
  const getGuildIconUrl = (guild) => guild?.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=128&quality=lossless` : undefined;
  const getAvatar = (user) => user?.getAvatarURL(null, 128, true);
  const insertContextMenuItem = (retVal, newItem) => {
    const children = retVal.props.children;
    if (!Array.isArray(children)) return;
    const newChildren = [...children];
    newChildren.splice(Math.min(1, newChildren.length), 0, newItem);
    retVal.props.children = newChildren;
  };
  const insertContextMenuItemInGroup = (retVal, newItem, position = 2) => {
    const groups = retVal.props.children;
    if (!Array.isArray(groups)) return;
    const group = groups.find(g => Array.isArray(g?.props?.children));
    const children = group?.props?.children;
    if (!Array.isArray(children)) return;
    const newChildren = [...children];
    newChildren.splice(Math.min(position, newChildren.length), 0, newItem);
    group.props.children = newChildren;
  };
  const isSpecialView = e => !e.avatarUrl && e.position === undefined;
  const isServerRole = e => !e.avatarUrl && e.position !== undefined;
  const sortByPositionDesc = (a, b) => (b.position ?? -1) - (a.position ?? -1);
  const sortIdsByPositionDesc = (ids, rolesMap) => ids.sort((a, b) => (rolesMap[b]?.position ?? -1) - (rolesMap[a]?.position ?? -1));
  const isUser = e => Boolean(e.avatarUrl);
  const renderSearchField = ({ placeholder, ariaLabel, value, onChange, withIcon = false }) =>
    RcE("div", { className: `pt-search-field${withIcon ? " with-icon" : ""}` },
      withIcon && RcE("span", { className: "pt-search-icon" }, RcE(SearchIcon)),
      RcE("input", { type: "text", placeholder, "aria-label": ariaLabel, value, onChange: (e) => onChange(e.target.value) })
    );
  const renderFilterChips = (chips, activeKey, setActiveKey) =>
    chips.map(chip =>
      RcE("button", {
        key: chip.key, type: "button",
        className: "pt-diff-filter-btn",
        style: activeKey === chip.key ? { background: `color-mix(in srgb, ${chip.color} 18%, var(--pt-bg-secondary))`, borderColor: chip.color, color: chip.color } : {},
        onClick: () => setActiveKey(chip.key)
      },
        RcE("span", { className: "pt-diff-count-badge", style: { background: chip.color } }, chip.count),
        chip.label
      )
    );
  const renderPermInfo = (perm) => RcE("div", { className: "pt-perm-info" },
    RcE("div", { className: "pt-perm-status-icon" },
      RcE("span", { className: `pt-perm-square ${perm.status}` })
    ),
    RcE("div", { className: "pt-perm-details" },
      RcE("div", { className: "pt-perm-name" }, perm.name),
      perm.description && RcE("div", { className: "pt-perm-description" }, perm.description)
    )
  );
  const renderStatusBadge = (perm, strings) => RcE("div", { className: `pt-status-badge ${perm.status}` },
    RcE(statusIcons[perm.status]), " ", strings[perm.status]
  );
  const renderPermissionItem = (perm, strings) => RcE("div", {
    key: perm.id, className: "pt-perm-item", role: "listitem"
  },
    renderPermInfo(perm),
    renderStatusBadge(perm, strings)
  );
  const TraceablePermissionItem = ({ perm, strings, statusLabels, traceData, getChannelOverride }) => {
    const [expanded, setExpanded] = React.useState(false);
    const trace = traceData?.[perm.id];
    const toggle = React.useCallback(() => setExpanded(p => !p), []);
    return RcE("div", { className: `pt-trace-item-wrap${expanded ? " pt-trace-open" : ""}` },
      RcE("div", {
        className: "pt-perm-item pt-trace-clickable", role: "listitem",
        onClick: toggle, tabIndex: 0,
        onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }
      },
        renderPermInfo(perm),
        RcE("div", { className: "pt-trace-badge-wrap" },
          renderStatusBadge(perm, statusLabels),
          RcE("span", { className: `pt-trace-chevron${expanded ? " open" : ""}` }, RcE(ChevronDownIcon))
        )
      ),
      expanded && trace && RcE("div", { className: "pt-trace-card" },
        trace.grantingRoles.length > 0 && RcE("div", { className: "pt-trace-section" },
          RcE("span", { className: "pt-trace-section-label" }, strings.trace.grantedBy),
          RcE("div", { className: "pt-trace-role-list" },
            trace.grantingRoles.map(r =>
              RcE("div", { key: r.id, className: "pt-trace-role-row" },
                RcE("span", { className: "pt-rl-role-dot", style: { backgroundColor: r.colorString || PT_ROLE_DEFAULT_COLOR } }),
                RcE("span", null, r.name),
                r.isViaAdmin && RcE("span", { className: "pt-rl-via-admin" }, RcE(ShieldIcon), " Admin")
              )
            )
          )
        ),
        trace.viaOwner && RcE("div", { className: "pt-trace-via-owner" },
          RcE(CrownIcon), " ", strings.trace.viaOwner
        ),
        (() => {
          const override = getChannelOverride?.(perm.id);
          if (!override) return RcE("div", { className: "pt-trace-no-override" }, strings.trace.noOverride);
          const source = override.type === "user" ? strings.trace.userOverride : strings.trace.roleOverride;
          const effect = override.status === "allowed" ? strings.trace.channelAllows : strings.trace.channelDenies;
          const label = source + " - " + effect;
          return RcE("div", { className: `pt-trace-channel-status ${override.status}` }, label);
        })()
      )
    );
  };
  const renderSidebarSection = (section, firstSectionId, firstButtonRef, activeEntity, handleTabClick, handleRoleContextMenu) =>
    RcE("div", { key: section.id, className: "pt-sidebar-section" },
      RcE("div", { className: "pt-section-label" }, section.label),
      section.entities.map((entity, index) =>
        RcE("button", {
          key: entity.id,
          ref: (section.id === firstSectionId && index === 0) ? firstButtonRef : null,
          type: "button",
          role: "tab",
          className: `pt-role-btn${entity.id === activeEntity.id ? " active" : ""}`,
          "aria-selected": entity.id === activeEntity.id,
          onClick: () => handleTabClick(entity.id),
          onContextMenu: (e) => handleRoleContextMenu(entity.id, e),
          title: entity.name
        },
          entity.avatarUrl
            ? RcE("img", { className: "pt-role-avatar", src: entity.avatarUrl, alt: "" })
            : RcE("span", { className: "pt-role-indicator", style: { backgroundColor: entity.color || PT_ROLE_DEFAULT_COLOR } }),
          RcE("span", { className: "pt-role-name" }, entity.name),
          !entity.avatarUrl && entity.iconUrl && RcE("img", { className: "pt-role-icon", src: entity.iconUrl, alt: "" })
        )
      )
    );
  const expandedToggleUpdater = (name) => (prev) => {
    const next = new Set(prev);
    if (next.has(name)) next.delete(name); else next.add(name);
    return next;
  };
  const buildPermPredicate = (diff, filter, search) => {
    const q = search.trim().toLowerCase();
    return (p) => {
      const d = diff[p.id];
      const matchesFilter = filter === "all" ||
        (filter === "unique_a" && d === "only_a") ||
        (filter === "unique_b" && d === "only_b") ||
        (filter === "shared" && d === "shared") ||
        (filter === "different" && (d === "only_a" || d === "only_b"));
      return matchesFilter && matchesPermSearch(p, q);
    };
  };
  const computeDiff = (mapA, mapB, categories) => {
    const result = {};
    for (const cat of categories) {
      for (const perm of cat.permissions) {
        const inA = mapA[perm.id] === "allowed";
        const inB = mapB[perm.id] === "allowed";
        if (inA && inB) result[perm.id] = "shared";
        else if (inA && !inB) result[perm.id] = "only_a";
        else if (!inA && inB) result[perm.id] = "only_b";
        else result[perm.id] = "neither";
      }
    }
    return result;
  };
  const computeStats = (diff) => {
    const s = { only_a: 0, only_b: 0, shared: 0, neither: 0 };
    for (const v of Object.values(diff)) s[v]++;
    return s;
  };
  const getHoldersForPermission = (permId, guildRoles, buildPermissionsMapFn) => {
    const roles = [];
    for (const role of Object.values(guildRoles)) {
      const permMap = buildPermissionsMapFn(role, false);
      if (permMap[permId] !== "allowed") continue;
      const viaAdmin = permId !== "ADMINISTRATOR" && permMap["ADMINISTRATOR"] === "allowed";
      roles.push({ ...role, viaAdmin });
    }
    roles.sort(sortByPositionDesc);
    return roles;
  };
  const getMembersOfRole = (guildId, roleId, MemberStore, UserStore) => {
    const members = MemberStore.getMembers(guildId);
    if (!Array.isArray(members) || members.length === 0) return [];
    const isEveryone = roleId === guildId;
    const result = [];
    for (const member of members) {
      if (!member.userId) continue;
      if (isEveryone || (member.roles || []).includes(roleId)) {
        const user = UserStore.getUser(member.userId);
        result.push({
          id: member.userId,
          username: user?.globalName ?? user?.username ?? member.userId,
          nick: member.nick,
          avatarUrl: getAvatar(user)
        });
      }
    }
    result.sort((a, b) => (a.nick ?? a.username).localeCompare(b.nick ?? b.username));
    return result;
  };
  const DANGEROUS_EVERYONE_PERMS = [
    "ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_GUILD",
    "MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MENTION_EVERYONE", "MANAGE_MESSAGES"
  ];
  const CRITICAL_PERMS = new Set(["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_GUILD"]);
  const SEVERITY_ORDER = { critical: 0, warning: 1, info: 2 };
  const runAuditRules = (ctx) => {
    const { guildId, roles, buildPermissionsMap, DiscordPermissions, MemberStore, channels, getPermString, strings } = ctx;
    const findings = [];
    if (!roles || !DiscordPermissions) return findings;
    const everyoneRole = roles[guildId];
    if (everyoneRole) {
      const permMap = buildPermissionsMap(everyoneRole, false);
      const critPerms = [], warnPerms = [];
      for (const permKey of DANGEROUS_EVERYONE_PERMS) {
        if (permMap[permKey] === "allowed") {
          (CRITICAL_PERMS.has(permKey) ? critPerms : warnPerms).push(permKey);
        }
      }
      if (critPerms.length > 0) {
        findings.push({
          id: "everyone_critical", severity: "critical",
          title: strings.auditDangerousEveryone,
          description: formatString(strings.auditDangerousEveryoneDesc, { perms: critPerms.map(p => getPermString(p)).join(", ") }),
          entityName: "@everyone", entityColor: everyoneRole.colorString || PT_ROLE_DEFAULT_COLOR,
          permissionIds: critPerms
        });
      }
      if (warnPerms.length > 0) {
        findings.push({
          id: "everyone_warning", severity: "warning",
          title: strings.auditDangerousEveryone,
          description: formatString(strings.auditDangerousEveryoneDesc, { perms: warnPerms.map(p => getPermString(p)).join(", ") }),
          entityName: "@everyone", entityColor: everyoneRole.colorString || PT_ROLE_DEFAULT_COLOR,
          permissionIds: warnPerms
        });
      }
    }
    const adminRoles = [];
    for (const role of Object.values(roles)) {
      const permMap = buildPermissionsMap(role, false);
      if (permMap["ADMINISTRATOR"] === "allowed") adminRoles.push(role);
    }
    if (adminRoles.length > 1) {
      findings.push({
        id: "too_many_admins", severity: adminRoles.length > 3 ? "critical" : "warning",
        title: strings.auditTooManyAdmins,
        description: formatString(strings.auditTooManyAdminsDesc, { count: adminRoles.length }),
        entityName: adminRoles.map(r => r.name).join(", "), entityColor: "#f0b232",
        permissionIds: ["ADMINISTRATOR"]
      });
    }
    for (const role of Object.values(roles)) {
      if (role.id === guildId) continue;
      const permMap = buildPermissionsMap(role, false);
      const dangerousPerms = [...CRITICAL_PERMS].filter(p => permMap[p] === "allowed");
      if (dangerousPerms.length === 0) continue;
      let memberCount = 0;
      const members = MemberStore.getMembers(guildId);
      if (Array.isArray(members)) {
        for (const m of members) {
          if ((m.roles || []).includes(role.id)) memberCount++;
        }
      }
      if (memberCount >= 10) {
        findings.push({
          id: `high_priv_${role.id}`, severity: memberCount >= 25 ? "critical" : "warning",
          title: strings.auditHighPrivilegeRole,
          description: formatString(strings.auditHighPrivilegeRoleDesc, { role: role.name, count: memberCount }),
          entityName: role.name, entityColor: role.colorString || PT_ROLE_DEFAULT_COLOR,
          permissionIds: dangerousPerms, memberCount
        });
      }
    }
    if (Array.isArray(channels)) {
      for (const channel of channels) {
        const ow = channel.permissionOverwrites[guildId];
        if (!ow || isOverwriteEmpty(ow)) continue;
        const allowBits = safeBigInt(ow.allow);
        const flaggedPerms = [];
        for (const permKey of DANGEROUS_EVERYONE_PERMS) {
          const permValue = DiscordPermissions[permKey];
          if (permValue && (allowBits & permValue) === permValue) flaggedPerms.push(permKey);
        }
        if (flaggedPerms.length > 0) {
          findings.push({
            id: `channel_ow_${channel.id}`, severity: flaggedPerms.some(p => CRITICAL_PERMS.has(p)) ? "critical" : "warning",
            title: strings.auditPermissiveOverwrite,
            description: formatString(strings.auditPermissiveOverwriteDesc, { channel: channel.name }),
            entityName: `#${channel.name}`, entityColor: "#949ba4",
            permissionIds: flaggedPerms
          });
        }
      }
    }
    findings.sort((a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9));
    return findings;
  };
  const MemberRow = ({ m, onContextMenu }) =>
    RcE("div", { className: "pt-rl-member-row", onContextMenu: onContextMenu ? (e) => onContextMenu(m.id, e) : undefined },
      m.avatarUrl
        ? RcE("img", { className: "pt-rl-member-avatar", src: m.avatarUrl, alt: "" })
        : RcE("span", { className: "pt-rl-member-avatar-fallback" }, m.username[0].toUpperCase()),
      RcE("div", { className: "pt-rl-member-info" },
        RcE("span", { className: "pt-rl-member-name" }, m.nick ?? m.username),
        m.nick && RcE("span", { className: "pt-rl-member-nick" }, m.username)
      ),
    );
  const MAX_STACK_AVATARS = 5;
  const MemberAvatarStack = ({ members, maxVisible = MAX_STACK_AVATARS }) => {
    const visible = members.slice(0, maxVisible);
    const overflow = members.length - maxVisible;
    return RcE("div", { className: "pt-rl-avatar-stack" },
      visible.map((m, i) =>
        m.avatarUrl
          ? RcE("img", { key: m.id, className: "pt-rl-stack-avatar", src: m.avatarUrl, alt: "", title: m.nick ?? m.username, style: { zIndex: maxVisible - i } })
          : RcE("span", { key: m.id, className: "pt-rl-stack-avatar-fallback", title: m.nick ?? m.username, style: { zIndex: maxVisible - i } }, m.username[0].toUpperCase())
      ),
      overflow > 0 && RcE("span", { className: "pt-rl-stack-overflow" }, `+${overflow}`)
    );
  };
  const LookupRoleCardStack = ({ role, guildId, getMembersOfRoleFn }) => {
    const members = React.useMemo(() => getMembersOfRoleFn(guildId, role.id), [guildId, role.id, getMembersOfRoleFn]);
    if (members.length === 0) return RcE("span", { className: "pt-rl-holder-count" }, "0");
    return RcE(React.Fragment, null,
      RcE(MemberAvatarStack, { members }),
      RcE("span", { className: "pt-rl-holder-count" }, members.length)
    );
  };
  const LookupRoleCard = ({ role, guildId, getMembersOfRoleFn, strings, onMemberContextMenu }) => {
    const [expanded, setExpanded] = React.useState(false);
    const members = React.useMemo(
      () => expanded ? getMembersOfRoleFn(guildId, role.id) : null,
      [expanded, guildId, role.id, getMembersOfRoleFn]
    );
    return RcE("div", { className: "pt-rl-role-card" },
      RcE("button", { className: "pt-rl-role-card-header", type: "button", onClick: () => setExpanded(prev => !prev) },
        RcE("span", { className: `pt-diff-cat-chevron${expanded ? " open" : ""}` }, RcE(ArrowIcon)),
        RcE("span", { className: "pt-rl-role-dot", style: { background: role.colorString || PT_ROLE_DEFAULT_COLOR } }),
        RcE("span", { className: "pt-rl-role-name", style: { color: role.colorString || PT_ROLE_DEFAULT_COLOR } }, role.name),
        role.icon && RcE("img", { className: "pt-role-icon", src: getRoleIconUrl(role), alt: "" }),
        role.viaAdmin && RcE("span", { className: "pt-rl-via-admin" }, RcE(ShieldIcon), " ", strings.viaAdmin),
        RcE("span", { className: "pt-rl-role-pos" }, `pos ${role.position ?? 0}`),
        !expanded && RcE(LookupRoleCardStack, { role, guildId, getMembersOfRoleFn })
      ),
      expanded && members && RcE("div", { className: "pt-rl-role-card-body" },
        members.length === 0
          ? RcE("div", { className: "pt-rl-cached-note" }, strings.cachedMembersNote)
          : members.map(m => RcE(MemberRow, { key: m.id, m, onContextMenu: onMemberContextMenu }))
      )
    );
  };
  const ByRolePanel = ({ byRoleTabs, categories, onRoleContextMenu, onMemberContextMenu, getMembersOfRoleFn, guildId, strings, traceData, getChannelOverride, isOverwriteContext, initialFilter, onFilterChange, ...ariaPanelProps }) => {
    const [activeTabId, setActiveTabId] = React.useState(() => byRoleTabs[0]?.id ?? "");
    const [roleSearch, setRoleSearch] = React.useState("");
    const [permissionSearch, setPermissionSearch] = React.useState("");
    const [permissionFilter, _setPermissionFilter] = React.useState(initialFilter ?? "all");
    const setPermissionFilter = React.useCallback((f) => { _setPermissionFilter(f); onFilterChange?.(f); }, [onFilterChange]);
    const [activeSubTab, setActiveSubTab] = React.useState("permissions");
    const [memberSearch, setMemberSearch] = React.useState("");
    const [expanded, setExpanded] = React.useState(() => {
      const s = new Set();
      for (const cat of categories) s.add(cat.name);
      return s;
    });
    const toggleCat = React.useCallback((name) => { setExpanded(expandedToggleUpdater(name)); }, []);
    const statusLabels = React.useMemo(() => ({
      allowed: strings.allowed, denied: strings.denied,
      neutral: isOverwriteContext ? strings.neutral : strings.notGranted
    }), [strings, isOverwriteContext]);
    const firstButtonRef = React.useRef(null);
    React.useEffect(() => {
      if (firstButtonRef.current) firstButtonRef.current.focus();
    }, []);
    const groupedSections = React.useMemo(() => {
      const specialViews = byRoleTabs.filter(isSpecialView);
      const serverRoles = byRoleTabs.filter(isServerRole).sort(sortByPositionDesc);
      const users = byRoleTabs.filter(isUser);
      const sections = [];
      if (specialViews.length > 0) sections.push({ id: "special", label: strings.specialViews, entities: specialViews });
      if (serverRoles.length > 0) sections.push({ id: "roles", label: strings.serverRoles, entities: serverRoles });
      if (users.length > 0) sections.push({ id: "users", label: strings.users, entities: users });
      return sections;
    }, [byRoleTabs, strings]);
    const filteredSections = React.useMemo(() => {
      const query = roleSearch.trim().toLowerCase();
      if (!query) return groupedSections;
      const result = [];
      for (const section of groupedSections) {
        const filtered = section.entities.filter(e => e.name.toLowerCase().includes(query));
        if (filtered.length > 0) result.push({ ...section, entities: filtered });
      }
      return result;
    }, [groupedSections, roleSearch]);
    const activeEntity = React.useMemo(() => {
      let found = null, first = null;
      for (const section of groupedSections) {
        for (const entity of section.entities) {
          if (!first) first = entity;
          if (entity.id === activeTabId) { found = entity; break; }
        }
        if (found) break;
      }
      return found || first;
    }, [groupedSections, activeTabId]);
    const statusCounts = React.useMemo(() => {
      if (!activeEntity) return { allowed: 0, denied: 0, neutral: 0 };
      const counts = { allowed: 0, denied: 0, neutral: 0 };
      const search = permissionSearch.trim().toLowerCase();
      const permissions = activeEntity.permissions;
      for (const category of categories) {
        for (const p of category.permissions) {
          if (!matchesPermSearch(p, search)) continue;
          counts[permissions[p.id] ?? "neutral"]++;
        }
      }
      return counts;
    }, [categories, activeEntity, permissionSearch]);
    const roleMembers = React.useMemo(() => {
      if (!getMembersOfRoleFn || !guildId || !activeEntity) return null;
      if (isSpecialView(activeEntity) || isUser(activeEntity)) return null;
      return getMembersOfRoleFn(guildId, activeEntity.id);
    }, [getMembersOfRoleFn, guildId, activeEntity]);
    const filteredMembers = React.useMemo(() => {
      if (!roleMembers) return null;
      const q = memberSearch.trim().toLowerCase();
      if (!q) return roleMembers;
      return roleMembers.filter(m =>
        (m.nick ?? "").toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q)
      );
    }, [roleMembers, memberSearch]);
    const visibleCategories = React.useMemo(() => {
      if (!activeEntity) return [];
      const search = permissionSearch.trim().toLowerCase();
      const permissions = activeEntity.permissions;
      const result = [];
      for (const category of categories) {
        const perms = [];
        for (const p of category.permissions) {
          if (!matchesPermSearch(p, search)) continue;
          const status = permissions[p.id] ?? "neutral";
          if (permissionFilter !== "all" && status !== permissionFilter) continue;
          perms.push({ ...p, status });
        }
        if (perms.length > 0) result.push({ name: category.name, permissions: perms });
      }
      return result;
    }, [categories, activeEntity, permissionSearch, permissionFilter]);
    const handleTabClick = React.useCallback((id) => {
      setActiveTabId(id);
      setPermissionSearch("");
      setPermissionFilter("all");
      setMemberSearch("");
    }, []);
    let mainContent;
    if (activeEntity && visibleCategories.length > 0) {
      mainContent = visibleCategories.map(category =>
        RcE("section", { key: category.name, className: "pt-perm-category" },
          RcE("button", { className: "pt-category-header", type: "button", onClick: () => toggleCat(category.name) },
            RcE("span", { className: `pt-diff-cat-chevron${expanded.has(category.name) ? " open" : ""}` }, RcE(ArrowIcon)),
            category.name
          ),
          expanded.has(category.name) && RcE("div", { className: "pt-perm-list" }, category.permissions.map(perm =>
            traceData ? RcE(TraceablePermissionItem, { key: perm.id, perm, strings, statusLabels, traceData, getChannelOverride }) : renderPermissionItem(perm, statusLabels)
          ))
        )
      );
    } else if (activeEntity) {
      mainContent = RcE("div", { className: "pt-empty-state" },
        permissionFilter === "all" ? strings.noMatchSearch : strings.noMatchFilter
      );
    } else {
      mainContent = RcE("div", { className: "pt-empty-state" }, strings.noRoleData);
    }
    const filterChips = [
      { key: "all", label: strings.all, count: statusCounts.allowed + statusCounts.denied + statusCounts.neutral, color: "#949ba4" },
      { key: "allowed", label: strings.allowed, count: statusCounts.allowed, color: "#23a55a" },
      { key: "denied", label: strings.denied, count: statusCounts.denied, color: "#f23f43" },
      { key: "neutral", label: statusLabels.neutral, count: statusCounts.neutral, color: "#949ba4" },
    ];
    const showSubTabs = roleMembers !== null;
    const subTabBar = showSubTabs && RcE("div", { className: "pt-subtab-bar" },
      RcE("button", {
        className: `pt-subtab${activeSubTab === "permissions" ? " active" : ""}`,
        type: "button",
        onClick: () => { setActiveSubTab("permissions"); setMemberSearch(""); }
      }, strings.permissionsTab),
      RcE("button", {
        className: `pt-subtab${activeSubTab === "members" ? " active" : ""}`,
        type: "button",
        onClick: () => { setActiveSubTab("members"); setPermissionSearch(""); setPermissionFilter("all"); }
      }, formatString(strings.membersTab, { count: roleMembers ? roleMembers.length : 0 }))
    );
    let membersContent;
    if (activeSubTab === "members" && showSubTabs) {
      if (!filteredMembers || filteredMembers.length === 0) {
        membersContent = RcE("div", { className: "pt-empty-state" },
          roleMembers && roleMembers.length > 0 ? strings.noMembersFound : strings.noMembersAvailable
        );
      } else {
        membersContent = RcE(React.Fragment, null,
          filteredMembers.map(m => RcE(MemberRow, { key: m.id, m, onContextMenu: onMemberContextMenu })),
          RcE("div", { className: "pt-rl-cached-note" }, strings.cachedMembersNote)
        );
      }
    }
    return RcE("div", { className: "pt-tab-panel", ...ariaPanelProps },
      RcE("div", { className: "pt-modal-content" },
        RcE("aside", { className: "pt-sidebar", "aria-label": strings.rolesAriaLabel },
          RcE("div", { className: "pt-sidebar-search" },
            renderSearchField({ placeholder: strings.searchRoles, ariaLabel: strings.searchRoles, value: roleSearch, onChange: setRoleSearch })
          ),
          RcE("div", { className: "pt-sidebar-body" },
            filteredSections.length === 0
              ? RcE("div", { className: "pt-empty-state" }, strings.noRolesFound)
              : RcE("div", { className: "pt-sidebar-roles", role: "tablist", "aria-label": strings.rolesAriaLabel },
                filteredSections.map(section =>
                  renderSidebarSection(section, filteredSections[0].id, firstButtonRef, activeEntity, handleTabClick, onRoleContextMenu)
                )
              )
          )
        ),
        RcE("div", { className: "pt-main-content" },
          RcE("div", { className: "pt-content-search" },
            activeSubTab === "members" && showSubTabs
              ? renderSearchField({ placeholder: strings.searchMembers, ariaLabel: strings.searchMembers, value: memberSearch, onChange: setMemberSearch, withIcon: true })
              : renderSearchField({ placeholder: strings.searchPermissions, ariaLabel: strings.searchPermissions, value: permissionSearch, onChange: setPermissionSearch, withIcon: true })
          ),
          subTabBar,
          activeSubTab === "permissions" && RcE("div", { className: "pt-diff-filter-row" },
            renderFilterChips(filterChips, permissionFilter, setPermissionFilter)
          ),
          RcE("div", { className: "pt-main-body", role: "list", "aria-label": activeSubTab === "members" ? strings.searchMembers : strings.permissionsAriaLabel },
            activeSubTab === "members" && showSubTabs ? membersContent : mainContent
          )
        )
      )
    );
  };
  const useDiffPanel = (permMapA, permMapB, categories, initialFilter, onFilterChange) => {
    const [permissionFilter, _setPermissionFilter] = React.useState(initialFilter ?? "all");
    const setPermissionFilter = React.useCallback((f) => { _setPermissionFilter(f); onFilterChange?.(f); }, [onFilterChange]);
    const [permissionSearch, setPermissionSearch] = React.useState("");
    const [expanded, setExpanded] = React.useState(() => {
      const s = new Set();
      for (const cat of categories) s.add(cat.name);
      return s;
    });
    const diff = React.useMemo(() => computeDiff(permMapA, permMapB, categories), [permMapA, permMapB, categories]);
    const stats = React.useMemo(() => computeStats(diff), [diff]);
    const toggleCat = React.useCallback((name) => { setExpanded(expandedToggleUpdater(name)); }, []);
    const visibleCategories = React.useMemo(() => {
      const predicate = buildPermPredicate(diff, permissionFilter, permissionSearch);
      const result = [];
      for (const cat of categories) {
        const perms = cat.permissions.filter(predicate);
        if (perms.length > 0) result.push({ ...cat, permissions: perms });
      }
      return result;
    }, [diff, permissionFilter, permissionSearch, categories]);
    return { permissionFilter, setPermissionFilter, permissionSearch, setPermissionSearch, expanded, diff, stats, toggleCat, visibleCategories };
  };
  const useDiffRenderCallbacks = (diff, permMapA, permMapB, colors, expanded, toggleCat, strings) => {
    const { colorA, colorB } = colors;
    const renderValCell = React.useCallback((hasIt, status, isA) => {
      const color = isA ? colorA : colorB;
      let badgeBg, badgeColor;
      if (hasIt) {
        badgeBg = status === "shared" ? "var(--pt-tint-green)" : `color-mix(in srgb, ${color} 15%, transparent)`;
        badgeColor = status === "shared" ? "var(--pt-status-allowed)" : color;
      }
      return RcE("div", { className: "pt-diff-val-cell" },
        hasIt
          ? RcE("span", { className: "pt-diff-yes-badge", style: { background: badgeBg, color: badgeColor } }, RcE(SmallCheckIcon), strings.yes)
          : RcE("span", { className: "pt-diff-no-badge" }, RcE(SmallXIcon), strings.no)
      );
    }, [colorA, colorB, strings]);
    const renderRow = React.useCallback((perm) => {
      const status = diff[perm.id] ?? "neither";
      const inA = permMapA[perm.id] === "allowed";
      const inB = permMapB[perm.id] === "allowed";
      const accentColorMap = { only_a: colorA, only_b: colorB, shared: "var(--pt-status-allowed)" };
      const accentColor = accentColorMap[status] ?? null;
      const rowBgMap = {
        only_a: `color-mix(in srgb, ${colorA} 7%, transparent)`,
        only_b: `color-mix(in srgb, ${colorB} 7%, transparent)`,
        shared: "color-mix(in srgb, var(--pt-status-allowed) 5%, transparent)"
      };
      return RcE("div", { key: perm.id, className: "pt-diff-row", style: { background: rowBgMap[status] ?? "transparent" } },
        RcE("div", { className: "pt-diff-perm-cell" },
          RcE("div", { className: `pt-diff-perm-name${status === "neither" ? " muted" : ""}` },
            accentColor && RcE("span", { className: "pt-diff-accent", style: { background: accentColor } }),
            perm.name
          ),
          perm.description && RcE("div", { className: "pt-diff-perm-desc" }, perm.description)
        ),
        renderValCell(inA, status, true),
        renderValCell(inB, status, false)
      );
    }, [diff, permMapA, permMapB, colorA, colorB, renderValCell]);
    const renderCatHeader = React.useCallback((cat, permsInCat) => {
      const isOpen = expanded.has(cat.name);
      let onlyA = 0, onlyB = 0, sharedCount = 0;
      for (const p of permsInCat) {
        const d = diff[p.id];
        if (d === "only_a") onlyA++;
        else if (d === "only_b") onlyB++;
        else if (d === "shared") sharedCount++;
      }
      return RcE("button", { key: `cat-${cat.name}`, className: "pt-diff-cat-btn", onClick: () => toggleCat(cat.name), type: "button" },
        RcE("span", { className: `pt-diff-cat-chevron${isOpen ? " open" : ""}` }, RcE(ArrowIcon)),
        cat.name,
        RcE("span", { className: "pt-diff-cat-count" }, permsInCat.length),
        RcE("div", { className: "pt-diff-cat-badges" },
          onlyA > 0 && RcE("span", { className: "pt-diff-mini-badge", style: { background: `color-mix(in srgb, ${colorA} 20%, transparent)`, color: colorA } }, `+${onlyA} A`),
          onlyB > 0 && RcE("span", { className: "pt-diff-mini-badge", style: { background: `color-mix(in srgb, ${colorB} 20%, transparent)`, color: colorB } }, `+${onlyB} B`),
          sharedCount > 0 && RcE("span", { className: "pt-diff-mini-badge pt-diff-mini-badge-shared" }, `${sharedCount} \u2713`)
        )
      );
    }, [expanded, diff, colorA, colorB, toggleCat]);
    return { renderRow, renderCatHeader };
  };
  const buildDiffChips = (nameA, colorA, nameB, colorB, stats, strings) => [
    { key: "all", label: strings.all, count: stats.only_a + stats.only_b + stats.shared + stats.neither, color: "#949ba4" },
    { key: "different", label: strings.different, count: stats.only_a + stats.only_b, color: "#f0b132" },
    { key: "unique_a", label: formatString(strings.onlyLabel, { name: nameA }), count: stats.only_a, color: colorA },
    { key: "unique_b", label: formatString(strings.onlyLabel, { name: nameB }), count: stats.only_b, color: colorB },
    { key: "shared", label: strings.shared, count: stats.shared, color: "#23a55a" },
  ];
  const buildDiffLabel = (stats, strings, identicalLabel) => {
    const totalDiff = stats.only_a + stats.only_b;
    const diffTemplate = totalDiff === 1 ? strings.diffSingular : strings.diffPlural;
    return totalDiff === 0 ? (identicalLabel ?? strings.identicalPerms) : formatString(diffTemplate, { count: totalDiff });
  };
  const renderDiffFilterRow = (chips, activeFilter, setFilter, search, setSearch, strings) =>
    RcE("div", { className: "pt-diff-filter-row" },
      renderFilterChips(chips, activeFilter, setFilter),
      RcE("div", { className: "pt-diff-search" },
        RcE("span", { className: "pt-diff-search-icon" }, RcE(SearchIcon)),
        RcE("input", { type: "text", placeholder: strings.searchPermissions, "aria-label": strings.searchPermissions, value: search, onChange: (e) => setSearch(e.target.value) })
      )
    );
  const renderDiffColHeaders = (nameA, colorA, nameB, colorB, strings) =>
    RcE("div", { className: "pt-diff-col-headers" },
      RcE("div", { className: "pt-diff-col-hdr" }, strings.permissionLabel),
      RcE("div", { className: "pt-diff-col-hdr" },
        RcE("span", { className: "pt-diff-dot pt-diff-dot-inline", style: { background: colorA } }), nameA
      ),
      RcE("div", { className: "pt-diff-col-hdr" },
        RcE("span", { className: "pt-diff-dot pt-diff-dot-inline", style: { background: colorB } }), nameB
      )
    );
  const renderDiffBody = (visibleCategories, expanded, renderCatHeader, renderRow, strings) =>
    RcE("div", { className: "pt-diff-body" },
      visibleCategories.length === 0
        ? RcE("div", { className: "pt-empty-state" }, strings.noMatchFilter)
        : visibleCategories.map(cat =>
          RcE(React.Fragment, { key: cat.name },
            renderCatHeader(cat, cat.permissions),
            expanded.has(cat.name) && cat.permissions.map(renderRow)
          )
        )
    );
  const renderDiffFooter = (nameA, colorA, nameB, colorB, stats, diffLabel, strings) =>
    RcE("div", { className: "pt-diff-footer" },
      RcE("div", { className: "pt-diff-footer-chip" },
        RcE("span", { className: "pt-diff-dot", style: { background: colorA } }),
        RcE("span", null, formatString(strings.onlyLabel, { name: nameA }) + ":"), RcE("strong", null, stats.only_a)
      ),
      RcE("div", { className: "pt-diff-footer-chip" },
        RcE("span", { className: "pt-diff-dot", style: { background: colorB } }),
        RcE("span", null, formatString(strings.onlyLabel, { name: nameB }) + ":"), RcE("strong", null, stats.only_b)
      ),
      RcE("div", { className: "pt-diff-footer-chip" },
        RcE("span", { className: "pt-diff-dot pt-diff-dot-green" }),
        RcE("span", null, strings.both), RcE("strong", null, stats.shared)
      ),
      RcE("div", { className: "pt-diff-footer-chip" },
        RcE("span", { className: "pt-diff-dot pt-diff-dot-gray" }),
        RcE("span", null, strings.neither), RcE("strong", null, stats.neither)
      ),
      RcE("span", { className: "pt-diff-footer-note" }, diffLabel)
    );
  const ComparePanel = ({ guildRoles, sortedRoleList, categories, buildPermissionsMap, strings, initialFilter, onFilterChange, ...ariaPanelProps }) => {
    const [roleAId, setRoleAId] = React.useState(() => sortedRoleList[0]?.id ?? "");
    const [roleBId, setRoleBId] = React.useState(() => sortedRoleList[1]?.id ?? "");
    const [roleSearchA, setRoleSearchA] = React.useState("");
    const [roleSearchB, setRoleSearchB] = React.useState("");
    const roleA = guildRoles[roleAId];
    const roleB = guildRoles[roleBId];
    const colorA = roleA?.colorString || "#5865f2";
    const colorB = roleB?.colorString || PT_ROLE_DEFAULT_COLOR;
    const permMapA = React.useMemo(() => roleA ? buildPermissionsMap(roleA, false) : {}, [roleA, buildPermissionsMap]);
    const permMapB = React.useMemo(() => roleB ? buildPermissionsMap(roleB, false) : {}, [roleB, buildPermissionsMap]);
    const dp = useDiffPanel(permMapA, permMapB, categories, initialFilter, onFilterChange);
    const { setPermissionFilter, setPermissionSearch } = dp;
    const { renderRow, renderCatHeader } = useDiffRenderCallbacks(dp.diff, permMapA, permMapB, { colorA, colorB }, dp.expanded, dp.toggleCat, strings);
    const handleSwap = React.useCallback(() => {
      setRoleAId(roleBId); setRoleBId(roleAId);
      setRoleSearchA(""); setRoleSearchB("");
      setPermissionFilter("all"); setPermissionSearch("");
    }, [roleAId, roleBId, setPermissionFilter, setPermissionSearch]);
    if (sortedRoleList.length < 2) {
      return RcE("div", { className: "pt-tab-panel", ...ariaPanelProps },
        RcE("div", { className: "pt-diff-empty-center" }, strings.needTwoRoles)
      );
    }
    const nameA = roleA?.name ?? strings.roleALabel;
    const nameB = roleB?.name ?? strings.roleBLabel;
    const chips = buildDiffChips(nameA, colorA, nameB, colorB, dp.stats, strings);
    const diffLabel = buildDiffLabel(dp.stats, strings);
    return RcE("div", { className: "pt-tab-panel", ...ariaPanelProps },
      RcE("div", { className: "pt-diff-selector-row" },
        RcE(SearchableSelector, { label: strings.roleALabel, color: colorA, selectedId: roleAId, excludeId: roleBId, items: sortedRoleList, search: roleSearchA, onSearchChange: setRoleSearchA, onChange: (id) => { setRoleAId(id); setPermissionFilter("all"); setPermissionSearch(""); }, filterFn: roleFilterFn, renderTriggerContent: roleTriggerContent, renderOption: roleRenderOption, searchPlaceholder: strings.searchRoles, emptyText: strings.noRolesFound }),
        RcE("button", { type: "button", className: "pt-diff-swap-btn", onClick: handleSwap, title: strings.swapRoles, "aria-label": strings.swapRoles }, RcE(SwapIcon)),
        RcE(SearchableSelector, { label: strings.roleBLabel, color: colorB, selectedId: roleBId, excludeId: roleAId, items: sortedRoleList, search: roleSearchB, onSearchChange: setRoleSearchB, onChange: (id) => { setRoleBId(id); setPermissionFilter("all"); setPermissionSearch(""); }, filterFn: roleFilterFn, renderTriggerContent: roleTriggerContent, renderOption: roleRenderOption, searchPlaceholder: strings.searchRoles, emptyText: strings.noRolesFound })
      ),
      renderDiffFilterRow(chips, dp.permissionFilter, setPermissionFilter, dp.permissionSearch, setPermissionSearch, strings),
      renderDiffColHeaders(nameA, colorA, nameB, colorB, strings),
      renderDiffBody(dp.visibleCategories, dp.expanded, renderCatHeader, renderRow, strings),
      renderDiffFooter(nameA, colorA, nameB, colorB, dp.stats, diffLabel, strings)
    );
  };
  const SearchableSelector = ({ label, color, selectedId, excludeId, items, search, onSearchChange, onChange, filterFn, renderTriggerContent, renderOption, searchPlaceholder, emptyText }) => {
    const [open, setOpen] = React.useState(false);
    const wrapRef = React.useRef(null);
    React.useEffect(() => {
      if (!open) return;
      const handler = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);
    const selected = items.find(m => m.id === selectedId);
    const filtered = React.useMemo(() => {
      const q = search.trim().toLowerCase();
      return items.filter(m => {
        if (m.id === excludeId) return false;
        if (!q) return true;
        return filterFn(m, q);
      });
    }, [items, excludeId, search, filterFn]);
    return RcE("div", { className: "pt-diff-role-select-wrap pt-user-select-wrap", ref: wrapRef },
      RcE("div", { className: "pt-diff-role-label" }, label),
      RcE("button", {
        type: "button", className: "pt-user-select-trigger", style: { borderColor: `${color}44` },
        onClick: () => { setOpen(!open); onSearchChange(""); }
      },
        RcE("span", { className: "pt-diff-role-dot", style: { background: color } }),
        renderTriggerContent(selected),
        RcE("span", { className: "pt-diff-select-chevron" }, RcE(ChevronDownIcon))
      ),
      open && RcE("div", { className: "pt-user-select-dropdown" },
        RcE("input", {
          type: "text", className: "pt-user-select-search", placeholder: searchPlaceholder,
          value: search, onChange: (e) => onSearchChange(e.target.value), autoFocus: true
        }),
        RcE("div", { className: "pt-user-select-list" },
          filtered.length === 0
            ? RcE("div", { className: "pt-user-select-empty" }, emptyText)
            : filtered.map(item => RcE("button", {
                key: item.id, type: "button",
                className: `pt-user-select-option${item.id === selectedId ? " active" : ""}`,
                onClick: () => { onChange(item.id); setOpen(false); }
              }, renderOption(item)))
        )
      )
    );
  };
  const userFilterFn = (m, q) => m.displayName.toLowerCase().includes(q) || m.nick?.toLowerCase().includes(q) || m.username.toLowerCase().includes(q);
  const userTriggerContent = (selected) => RcE(React.Fragment, null,
    selected?.avatarUrl
      ? RcE("img", { className: "pt-user-select-avatar", src: selected.avatarUrl, alt: "" })
      : RcE("span", { className: "pt-user-select-avatar-fallback" }, (selected?.displayName[0] ?? "?").toUpperCase()),
    RcE("span", { className: "pt-user-select-name", style: selected?.colorString ? { color: selected.colorString } : undefined }, selected?.nick ?? selected?.displayName ?? "Select...")
  );
  const userRenderOption = (m) => RcE(React.Fragment, null,
    m.avatarUrl
      ? RcE("img", { className: "pt-user-select-opt-avatar", src: m.avatarUrl, alt: "" })
      : RcE("span", { className: "pt-user-select-opt-avatar-fallback" }, m.displayName[0].toUpperCase()),
    RcE("div", { className: "pt-user-select-opt-info" },
      RcE("span", { className: "pt-user-select-opt-name", style: m.colorString ? { color: m.colorString } : undefined }, m.nick ?? m.displayName),
      m.nick && RcE("span", { className: "pt-user-select-opt-sub" }, m.username)
    ),
    m.isOwner && RcE("span", { className: "pt-user-select-owner-badge" }, "\u{1F451}")
  );
  const roleFilterFn = (r, q) => r.name.toLowerCase().includes(q);
  const roleTriggerContent = (selected) => RcE("span", { className: "pt-user-select-name", style: { fontWeight: 600 } }, selected?.name ?? "Select...");
  const roleRenderOption = (r) => RcE(React.Fragment, null,
    RcE("span", { className: "pt-diff-role-dot", style: { background: r.colorString || PT_ROLE_DEFAULT_COLOR } }),
    RcE("span", { className: "pt-user-select-opt-name" }, r.name)
  );
  const CompareUsersPanel = ({ guildId, categories, buildUserPermissionsMap, MemberStore, UserStore, GuildStore, strings, initialFilter, onFilterChange, ...ariaPanelProps }) => {
    const guild = GuildStore.getGuild(guildId);
    const memberList = React.useMemo(() => {
      const members = MemberStore.getMembers(guildId);
      if (!Array.isArray(members) || members.length === 0) return [];
      return members.map(m => {
        const user = UserStore.getUser(m.userId);
        return {
          id: m.userId, username: user?.username ?? m.userId,
          displayName: user?.globalName ?? user?.username ?? m.userId,
          nick: m.nick, avatarUrl: getAvatar(user),
          isOwner: guild && m.userId === guild.ownerId,
          colorString: m.colorString || null
        };
      }).sort((a, b) => (a.nick ?? a.displayName).localeCompare(b.nick ?? b.displayName));
    }, [guildId, guild, MemberStore, UserStore]);
    const [userAId, setUserAId] = React.useState(() => memberList[0]?.id ?? "");
    const [userBId, setUserBId] = React.useState(() => memberList[1]?.id ?? "");
    const [userSearchA, setUserSearchA] = React.useState("");
    const [userSearchB, setUserSearchB] = React.useState("");
    const userA = memberList.find(m => m.id === userAId);
    const userB = memberList.find(m => m.id === userBId);
    const colorA = "#5865f2";
    const colorB = "#eb459e";
    const permMapA = React.useMemo(() => userAId && guild ? buildUserPermissionsMap(userAId, guild) : {}, [userAId, guild, buildUserPermissionsMap]);
    const permMapB = React.useMemo(() => userBId && guild ? buildUserPermissionsMap(userBId, guild) : {}, [userBId, guild, buildUserPermissionsMap]);
    const dp = useDiffPanel(permMapA, permMapB, categories, initialFilter, onFilterChange);
    const { setPermissionFilter, setPermissionSearch } = dp;
    const { renderRow, renderCatHeader } = useDiffRenderCallbacks(dp.diff, permMapA, permMapB, { colorA, colorB }, dp.expanded, dp.toggleCat, strings);
    const handleSwap = React.useCallback(() => {
      setUserAId(userBId); setUserBId(userAId);
      setUserSearchA(""); setUserSearchB("");
      setPermissionFilter("all"); setPermissionSearch("");
    }, [userAId, userBId, setPermissionFilter, setPermissionSearch]);
    if (memberList.length < 2) {
      return RcE("div", { className: "pt-tab-panel", ...ariaPanelProps },
        RcE("div", { className: "pt-diff-empty-center" }, strings.needTwoUsers)
      );
    }
    const nameA = userA?.nick ?? userA?.displayName ?? strings.userALabel;
    const nameB = userB?.nick ?? userB?.displayName ?? strings.userBLabel;
    const chips = buildDiffChips(nameA, colorA, nameB, colorB, dp.stats, strings);
    const diffLabel = buildDiffLabel(dp.stats, strings, strings.identicalUserPerms);
    return RcE("div", { className: "pt-tab-panel", ...ariaPanelProps },
      RcE("div", { className: "pt-diff-selector-row" },
        RcE(SearchableSelector, { label: strings.userALabel, color: colorA, selectedId: userAId, excludeId: userBId, items: memberList, search: userSearchA, onSearchChange: setUserSearchA, onChange: (id) => { setUserAId(id); setPermissionFilter("all"); setPermissionSearch(""); }, filterFn: userFilterFn, renderTriggerContent: userTriggerContent, renderOption: userRenderOption, searchPlaceholder: strings.searchMembers, emptyText: strings.noMembersFound }),
        RcE("button", { type: "button", className: "pt-diff-swap-btn", onClick: handleSwap, title: strings.swapUsers, "aria-label": strings.swapUsers }, RcE(SwapIcon)),
        RcE(SearchableSelector, { label: strings.userBLabel, color: colorB, selectedId: userBId, excludeId: userAId, items: memberList, search: userSearchB, onSearchChange: setUserSearchB, onChange: (id) => { setUserBId(id); setPermissionFilter("all"); setPermissionSearch(""); }, filterFn: userFilterFn, renderTriggerContent: userTriggerContent, renderOption: userRenderOption, searchPlaceholder: strings.searchMembers, emptyText: strings.noMembersFound })
      ),
      renderDiffFilterRow(chips, dp.permissionFilter, setPermissionFilter, dp.permissionSearch, setPermissionSearch, strings),
      renderDiffColHeaders(nameA, colorA, nameB, colorB, strings),
      renderDiffBody(dp.visibleCategories, dp.expanded, renderCatHeader, renderRow, strings),
      renderDiffFooter(nameA, colorA, nameB, colorB, dp.stats, diffLabel, strings),
      RcE("div", { className: "pt-diff-footer no-border" },
        RcE("span", { className: "pt-diff-footer-note" }, strings.cachedMembersNote)
      )
    );
  };
  const LookupPanel = ({ categories, guildRoles, buildPermissionsMap, getMembersOfRoleFn, onMemberContextMenu, guildId, strings, ...ariaPanelProps }) => {
    const [selectedPermId, setSelectedPermId] = React.useState(() => categories[0]?.permissions[0]?.id ?? null);
    const [search, setSearch] = React.useState("");
    const [expandedCats, setExpandedCats] = React.useState(() => new Set(categories.map(c => c.name)));
    const detailRef = React.useRef(null);
    const selectedPerm = React.useMemo(() => {
      if (!selectedPermId) return null;
      for (const cat of categories) {
        const found = cat.permissions.find(p => p.id === selectedPermId);
        if (found) return found;
      }
      return null;
    }, [selectedPermId, categories]);
    const holders = React.useMemo(
      () => selectedPermId ? getHoldersForPermission(selectedPermId, guildRoles, buildPermissionsMap) : null,
      [selectedPermId, guildRoles, buildPermissionsMap]
    );
    const filteredCategories = React.useMemo(() => {
      const q = search.trim().toLowerCase();
      if (!q) return categories;
      const result = [];
      for (const cat of categories) {
        const filtered = cat.permissions.filter(p => matchesPermSearch(p, q));
        if (filtered.length > 0) result.push({ ...cat, permissions: filtered });
      }
      return result;
    }, [search, categories]);
    const toggleCat = React.useCallback(name => {
      setExpandedCats(expandedToggleUpdater(name));
    }, []);
    React.useEffect(() => {
      if (selectedPermId && detailRef.current) detailRef.current.scrollTop = 0;
    }, [selectedPermId]);
    const renderPermButton = React.useCallback((perm) => {
      const isActive = selectedPermId === perm.id;
      return RcE("button", { key: perm.id, type: "button", className: `pt-rl-perm-btn${isActive ? " active" : ""}`, onClick: () => setSelectedPermId(perm.id) },
        RcE("span", { className: "pt-rl-indicator-dot", style: { background: isActive ? "var(--pt-brand)" : "var(--background-accent, #393a41)" } }),
        RcE("span", { className: "pt-text-truncate" }, perm.name),
        perm.id === "ADMINISTRATOR" && RcE("span", { className: "pt-admin-shield" }, RcE(ShieldIcon))
      );
    }, [selectedPermId]);
    const sidebarContent = filteredCategories.length === 0
      ? RcE("div", { className: "pt-empty-state" }, strings.noMatchSearch)
      : filteredCategories.map(cat =>
        RcE("div", { key: cat.name, className: "pt-rl-cat-group" },
          RcE("button", { className: "pt-rl-cat-btn", type: "button", onClick: () => toggleCat(cat.name) },
            RcE("span", { className: `pt-diff-cat-chevron${expandedCats.has(cat.name) ? " open" : ""}` }, RcE(ArrowIcon)),
            cat.name,
            RcE("span", { className: "pt-rl-count-badge" }, cat.permissions.length)
          ),
          expandedCats.has(cat.name) && cat.permissions.map(renderPermButton)
        )
      );
    const permBanner = selectedPerm && RcE("div", { className: "pt-rl-perm-banner" },
      RcE("div", { className: "pt-rl-banner-row" },
        RcE("div", { className: "pt-rl-banner-body" },
          RcE("div", { className: "pt-rl-banner-title" },
            selectedPerm.name,
            selectedPerm.id === "ADMINISTRATOR" && RcE("span", { className: "pt-rl-dangerous-badge" }, strings.dangerous)
          ),
          selectedPerm.description && RcE("div", { className: "pt-rl-banner-desc" }, selectedPerm.description)
        ),
        RcE("div", { className: "pt-rl-roles-count" },
          RcE("span", { className: "pt-rl-roles-count-number" }, holders.length),
          RcE("span", { className: "pt-rl-roles-count-label" }, strings.rolesCount)
        )
      )
    );
    let resultsContent;
    if (holders) {
      if (holders.length === 0) {
        resultsContent = RcE("div", { className: "pt-rl-no-roles" }, strings.noRolesHavePermission);
      } else {
        resultsContent = RcE("div", { className: "pt-rl-section-wrap" },
          RcE("div", { className: "pt-rl-section-header" },
            RcE("span", { className: "pt-rl-check-icon" }, RcE(CheckIcon)),
            strings.rolesWithPermission,
            RcE("span", { className: "pt-rl-holder-count" }, holders.length),
            RcE("span", { className: "pt-rl-divider-line" })
          ),
          RcE("div", { className: "pt-rl-role-list" },
            holders.map(role =>
              RcE(LookupRoleCard, { key: role.id, role, guildId, getMembersOfRoleFn, onMemberContextMenu, strings })
            )
          )
        );
      }
    }
    const emptyState = RcE("div", { className: "pt-rl-empty-state" },
      RcE("div", { className: "pt-rl-empty-icon" }, RcE(ReverseIcon)),
      RcE("div", { className: "pt-rl-empty-title" }, strings.selectPermission),
      RcE("div", { className: "pt-rl-empty-hint" }, strings.selectPermissionHint)
    );
    return RcE("div", { className: "pt-tab-panel", ...ariaPanelProps },
      RcE("div", { className: "pt-modal-content" },
        RcE("div", { className: "pt-rl-sidebar" },
          RcE("div", { className: "pt-sidebar-search" },
            renderSearchField({ placeholder: strings.searchPermissions, ariaLabel: strings.searchPermissions, value: search, onChange: setSearch, withIcon: true })
          ),
          RcE("div", { className: "pt-sidebar-body" }, sidebarContent)
        ),
        RcE("div", { className: "pt-main-content" },
          selectedPerm
            ? RcE(React.Fragment, null,
              permBanner,
              RcE("div", { ref: detailRef, className: "pt-main-body", role: "list", "aria-label": strings.rolesWithPermission }, resultsContent)
            )
            : emptyState
        )
      )
    );
  };
  const SEVERITY_COLORS = { critical: "#f23f43", warning: "#f0b232", info: "#5865f2" };
  const AuditPanel = ({ guildRoles, guildId, buildPermissionsMap, MemberStore, channels, DiscordPermissions, getPermString, strings, ...ariaPanelProps }) => {
    const [severityFilter, setSeverityFilter] = React.useState("all");
    const [search, setSearch] = React.useState("");
    const [expandedFindings, setExpandedFindings] = React.useState(() => new Set());
    const searchLower = search.toLowerCase();
    const findings = React.useMemo(() => runAuditRules({
      guildId, roles: guildRoles, buildPermissionsMap, DiscordPermissions, MemberStore, channels, getPermString, strings
    }), [guildId, guildRoles, buildPermissionsMap, DiscordPermissions, MemberStore, channels, getPermString, strings]);
    const severityCounts = React.useMemo(() => {
      const counts = { critical: 0, warning: 0, info: 0 };
      for (const f of findings) counts[f.severity] = (counts[f.severity] || 0) + 1;
      return counts;
    }, [findings]);
    const matchesFindingSearch = React.useCallback((f, q) =>
      f.title.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.entityName.toLowerCase().includes(q) ||
      f.permissionIds.some(p => getPermString(p).toLowerCase().includes(q))
      , [getPermString]);
    const filteredFindings = React.useMemo(() => {
      let result = findings;
      if (severityFilter !== "all") result = result.filter(f => f.severity === severityFilter);
      if (searchLower) result = result.filter(f => matchesFindingSearch(f, searchLower));
      return result;
    }, [findings, severityFilter, searchLower, matchesFindingSearch]);
    const toggleFinding = React.useCallback((id) => { setExpandedFindings(expandedToggleUpdater(id)); }, []);
    const severityChips = React.useMemo(() => [
      { key: "all", label: strings.all, count: findings.length },
      { key: "critical", label: strings.auditCritical, count: severityCounts.critical, color: SEVERITY_COLORS.critical },
      { key: "warning", label: strings.auditWarning, count: severityCounts.warning, color: SEVERITY_COLORS.warning },
      { key: "info", label: strings.auditInfo, count: severityCounts.info, color: SEVERITY_COLORS.info }
    ], [strings, findings.length, severityCounts]);
    if (findings.length === 0) {
      return RcE("div", { className: "pt-tab-panel", ...ariaPanelProps },
        RcE("div", { className: "pt-audit-clean" },
          RcE(AuditShieldIcon),
          RcE("h3", null, strings.auditNoIssues),
          RcE("p", null, strings.auditNoIssuesDesc)
        )
      );
    }
    return RcE("div", { className: "pt-tab-panel", ...ariaPanelProps },
      RcE("div", { className: "pt-audit-summary" },
        severityChips.map(chip =>
          RcE("button", {
            key: chip.key, type: "button",
            className: `pt-audit-severity-chip${severityFilter === chip.key ? " active" : ""}`,
            style: chip.color ? { "--chip-color": chip.color } : undefined,
            onClick: () => setSeverityFilter(chip.key)
          }, chip.label, " ", RcE("span", { className: "pt-audit-chip-count" }, chip.count))
        )
      ),
      RcE("div", { className: "pt-diff-filter-row" },
        renderSearchField({ placeholder: strings.auditSearchFindings, ariaLabel: strings.auditSearchFindings, value: search, onChange: setSearch, withIcon: true })
      ),
      RcE("div", { className: "pt-main-body pt-audit-findings" },
        filteredFindings.map(finding => {
          const isExpanded = expandedFindings.has(finding.id);
          return RcE("div", {
            key: finding.id,
            className: `pt-audit-finding${isExpanded ? " expanded" : ""}`
          },
            RcE("div", {
              className: "pt-audit-finding-header",
              role: "button", tabIndex: 0,
              onClick: () => toggleFinding(finding.id),
              onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleFinding(finding.id); } }
            },
              RcE("span", {
                className: "pt-audit-severity-badge",
                style: { backgroundColor: SEVERITY_COLORS[finding.severity] }
              }, { critical: "!", warning: "\u26A0", info: "i" }[finding.severity]),
              RcE("div", { className: "pt-audit-finding-text" },
                RcE("span", { className: "pt-audit-finding-title" }, finding.title),
                RcE("span", { className: "pt-audit-finding-desc" }, finding.description)
              ),
              RcE("span", { className: "pt-audit-entity" },
                RcE("span", { className: "pt-role-indicator", style: { backgroundColor: finding.entityColor } }),
                finding.entityName
              ),
              RcE("span", { className: `pt-audit-chevron${isExpanded ? " open" : ""}` }, RcE(ChevronDownIcon))
            ),
            isExpanded && RcE("div", { className: "pt-audit-finding-detail" },
              RcE("span", { className: "pt-audit-detail-label" }, strings.auditAffectedPerms),
              RcE("div", { className: "pt-audit-perm-chips" },
                finding.permissionIds.map(pId =>
                  RcE("span", { key: pId, className: "pt-audit-perm-chip" }, getPermString(pId))
                )
              ),
              finding.memberCount != null && RcE("span", { className: "pt-audit-member-count" },
                formatString(strings.auditMemberCount, { count: finding.memberCount })
              )
            )
          );
        }),
        filteredFindings.length === 0 && RcE("div", { className: "pt-empty-state" },
          RcE("p", null, strings.noMatchFilter)
        )
      )
    );
  };
  return class PermissionsToolkit {
    constructor(meta) {
      this.meta = meta;
      this.defaultSettings = {};
      this._resetState();
      for (const item of config.config) {
        this.defaultSettings[item.id] = item.value;
      }
      this.settings = Utils.extend({}, this.defaultSettings);
      this.updateManager = new UpdateManager(meta.name, meta.version, "Pharaoh2k/BetterDiscordStuff");
    }
    _resetState() {
      this.ModalActions = null;
      this.ManaModule = null;
      this._modalKey = "pt-permissions-modal";
      this._UnifiedModalComponent = null;
      this._PopoutPermissions = null;
      this._patchedRoles = false;
      this._patchedProfile = false;
      this._permSpecGetter = null;
      this._permSpecCache = null;
      this._permSpecCacheLocale = null;
      this._stringsCache = null;
      this._stringsCacheLocale = null;
      this._specManager = null;
      this.GuildStore = null;
      this.GuildRoleStore = null;
      this.MemberStore = null;
      this.UserStore = null;
      this.ChannelStore = null;
      this.SelectedChannelStore = null;
      this.GuildChannelStore = null;
      this.UserContextMenu = null;
      this.TextClasses = null;
      this.ElectronModule = null;
      this.intlModule = null;
      this.LocaleManager = null;
      this.I18n = null;
      this.LocaleData = null;
      this.AvatarDefaults = null;
      this.DiscordPermissions = null;
      this.ALL_PERMISSIONS = 0n;
      this.RoleClasses = null;
      this.contextMenuPatches = [];
      this.stopped = true;
    }
    start() {
      this.stopped = false;
      this._startGeneration = (this._startGeneration ?? 0) + 1;
      Logger.info(`version ${this.meta.version} has started.`);
      try {
        this.settings = this._loadSettings();
      } catch (e) {
        Logger.warn("Failed to load settings, using defaults:", e);
        this.settings = Utils.extend({}, this.defaultSettings);
      }
      this.updateManager.start(this.settings.autoUpdate);
      this._abortController = new AbortController();
      this._initModules();
      this._PopoutPermissions = this.createPopoutPermissionsComponent();
      this._UnifiedModalComponent = this.createUnifiedModalComponent();
      DOM.addStyle(styles);
      this.patchRolesComponent();
      this.patchProfileModal();
      if (this.settings.contextMenus) {
        this._bindContextMenus();
      }
    }
    stop() {
      Logger.info(`version ${this.meta.version} has stopped.`);
      this.updateManager.stop();
      DOM.removeStyle();
      Patcher.unpatchAll();
      this._abortController?.abort();
      this._unbindContextMenus();
      if (this.ModalActions) {
        this.ModalActions.closeModal(this._modalKey);
      }
      this._resetState();
    }
    _initModules() {
      const Stores = Webpack.Stores;
      this.GuildStore = Stores.GuildStore;
      this.GuildRoleStore = Stores.GuildRoleStore;
      this.MemberStore = Stores.GuildMemberStore;
      this.UserStore = Stores.UserStore;
      this.ChannelStore = Stores.ChannelStore;
      this.SelectedChannelStore = Stores.SelectedChannelStore;
      this.GuildChannelStore = Stores.GuildChannelStore;
      // The user context menu is lazy-loaded. Pick it up when Discord loads it rather than force-loading
      // chunks: the old forceLoad trigger now matches Discord's main app module and froze Discord for minutes.
      Webpack.waitForModule(Filters.bySource("user-context", "data-menu-migrated"), { defaultExport: false, signal: this._abortController.signal })
        .then(mod => { this.UserContextMenu ??= mod?.default ?? null; })
        .catch(() => {});
      this.TextClasses = Webpack.getByKeys("defaultColor", "text-xs/normal", { searchExports: true }) ?? {};
      const mods = Webpack.getBulkKeyed({
        DiscordPermissions: {
          filter: Filters.byKeys("ADD_REACTIONS", "ADMINISTRATOR"),
          searchExports: true
        },
        AvatarDefaults: {
          filter: Filters.byKeys("DEFAULT_AVATARS")
        },
        AvatarDefaultsFB1: {
          filter: Filters.byKeys("DEFAULT_CHANNEL_ICON")
        },
        AvatarDefaultsFB2: {
          filter: Filters.byKeys("canUseWebp")
        },
        ElectronModule: {
          filter: Filters.byKeys("copy", "cut", "paste"),
          searchExports: true
        },
        intlModule: {
          filter: Filters.byKeys("intl", "t"),
          searchExports: true
        },
        LocaleManager: {
          filter: Filters.byKeys("locale", "initialize"),
          searchExports: true
        },
        I18n: {
          filter: Filters.byKeys("Messages", "loadPromise"),
          searchExports: true
        },
        LocaleData: {
          filter: Filters.bySource("Copy ID", "JSON.parse"),
          searchExports: false
        }
      });
      this.ElectronModule = mods.ElectronModule;
      this.intlModule = mods.intlModule;
      this.LocaleManager = mods.LocaleManager;
      this.I18n = mods.I18n;
      this.LocaleData = mods.LocaleData?.default ?? null;
      this.ModalActions = Webpack.getByKeys('openModal', 'hasModalOpen');
      this.ManaModule = {
        Modal: Webpack.getModule(
          Filters.combine(Filters.byStrings('actionBarInput', 'notice'), Filters.not(Filters.byStrings('caretConfig'))),
          { searchExports: true }
        ),
        ConfirmModal: Webpack.getByKeys('ConfirmModal')?.ConfirmModal,
        ModalSize: Webpack.getByKeys('SMALL', 'MEDIUM', 'LARGE', 'DYNAMIC', { searchExports: true }),
      };
      const permSpecMod = Webpack.getMangled(
        Filters.bySource("VIEW_CHANNEL", "SEND_MESSAGES", "KICK_MEMBERS", "flag", "description"),
        { _permSpecGetter: Filters.byStrings("VIEW_CHANNEL", "SEND_MESSAGES", "KICK_MEMBERS") }
      );
      this._permSpecGetter = permSpecMod?._permSpecGetter ?? null;
      this._specManager = Webpack.getByKeys("generateGuildPermissionSpec");
      this.AvatarDefaults = mods.AvatarDefaults ?? mods.AvatarDefaultsFB1 ?? mods.AvatarDefaultsFB2;
      if (mods.DiscordPermissions) {
        const normalized = {};
        for (const [k, v] of Object.entries(mods.DiscordPermissions)) {
          try {
            normalized[k] = (typeof v === "bigint") ? v : BigInt(v);
          } catch (err) { Logger.warn("Failed to normalize permission value:", k, err); }
        }
        this.DiscordPermissions = normalized;
        this.ALL_PERMISSIONS = Object.values(normalized).reduce((acc, p) => acc | p, 0n);
      } else {
        Logger.error("Could not find DiscordPermissions module!");
        this.notify(this.strings.permissionsModuleError, "error", 5000);
      }
      const popoutRoleClasses = Webpack.getByKeys("roleCircle", "dot", { searchExports: true });
      const roleClasses = Webpack.getByKeys("role", "roleName", "roleListContainer", { searchExports: true });
      this.RoleClasses = {
        role: roleClasses?.role,
        roleCircle: popoutRoleClasses?.roleCircle,
        roleName: roleClasses?.roleName,
      };
    }
    get strings() {
      const locale = this.LocaleManager?.locale?.split("-")[0] ?? "en";
      if (this._stringsCache && this._stringsCacheLocale === locale) return this._stringsCache;
      this._stringsCacheLocale = locale;
      const base = config.strings.en;
      const loc = config.strings[locale];
      if (!loc || loc === base) { this._stringsCache = base; return base; }
      this._stringsCache = { ...base, ...loc, modal: { ...base.modal, ...loc.modal }, trace: { ...base.trace, ...loc.trace } };
      return this._stringsCache;
    }
    _getPermissionSpecMap() {
      const fn = this._permSpecGetter;
      if (typeof fn !== "function") return null;
      const locale = this.I18n?._chosenLocale ?? this.LocaleManager?.locale ?? "en-US";
      if (this._permSpecCache && this._permSpecCacheLocale === locale) return this._permSpecCache;
      this._permSpecCacheLocale = locale;
      let spec = null;
      try { spec = fn({}); } catch (err) { Logger.warn("Permission spec getter failed:", err); }
      this._permSpecCache = (spec && typeof spec === "object") ? spec : null;
      return this._permSpecCache;
    }
    getDefinitions(guild) {
      if (!this.DiscordPermissions) return [];
      const findPermKeyForFlag = (flag) => Object.keys(this.DiscordPermissions).find(
        key => this.DiscordPermissions[key] === flag
      ) ?? "";
      const resolvePermEntry = (perm, locale) => {
        const id = findPermKeyForFlag(perm.flag);
        let name = "";
        try {
          if (typeof perm.title === "string") name = perm.title;
          else if (typeof perm.title === "function") name = perm.title(locale) ?? "";
        } catch (err) { Logger.warn("Failed to resolve permission title:", err); }
        if (!name) name = this._formatPermName(id);
        let description = "";
        try {
          const raw = perm.description;
          if (typeof raw === "string") {
            description = raw;
          } else if (typeof raw === "function") {
            const result = raw(locale);
            if (typeof result === "string") description = result;
            else if (result?.ast?.[0]) description = String(result.ast[0]);
            else if (Array.isArray(result)) description = String(result[0] ?? "");
          } else if (Array.isArray(raw)) {
            description = String(raw[0] ?? "");
          }
        } catch (err) { Logger.warn("Failed to resolve permission description:", err); }
        return { id, name, description };
      };
      try {
        if (this._specManager && guild) {
          const specs = this._specManager.generateGuildPermissionSpec(guild);
          if (Array.isArray(specs) && specs.length > 0) {
            const locale = this.I18n?._chosenLocale ?? this.LocaleManager?.locale ?? "en-US";
            return specs.map(category => ({
              name: typeof category.title === "string" ? category.title : this.strings.permissionsFallback,
              permissions: (category.permissions || []).map(perm => resolvePermEntry(perm, locale))
                .filter(p => p.id)
            })).filter(c => c.permissions.length > 0);
          }
        }
      } catch (err) {
        Logger.warn("getDefinitions with specManager failed:", err);
      }
      const allPerms = Object.keys(this.DiscordPermissions).map(key => ({
        id: key,
        name: this.getPermString(key),
        description: ""
      }));
      return [{ name: this.strings.allPermissions, permissions: allPerms }];
    }
    getPermString(perm) {
      const spec = this._getPermissionSpecMap();
      const bit = this.DiscordPermissions[perm];
      if (spec && bit != null) {
        const entry = spec[bit.toString()];
        const title = entry?.title;
        try {
          if (typeof title === "string" && title.trim()) return title;
          if (typeof title === "function") {
            const t = title();
            if (typeof t === "string" && t.trim()) return t;
          }
        } catch (err) { Logger.warn("Failed to get permission string:", err); }
      }
      return this._formatPermName(perm);
    }
    _formatPermName(perm) {
      if (!perm) return "";
      return perm.split("_").map(n => n[0].toUpperCase() + n.slice(1).toLowerCase()).join(" ");
    }
    getHashString(hash) {
      try {
        return this.intlModule?.intl.string(this.intlModule.t[hash]) ?? null;
      } catch (err) {
        Logger.warn("Failed to get hash string:", err);
        return null;
      }
    }
    getLocaleString(target) {
      try {
        if (!this.LocaleData) return target;
        for (const [key, val] of Object.entries(this.LocaleData)) {
          if (Array.isArray(val) && val.length === 1 && val[0] === target) {
            return this.getHashString(key) ?? target;
          }
        }
      } catch (err) { Logger.warn("Failed to get locale string:", err); }
      return target;
    }
    getRoles(guild) {
      return guild.roles ?? this.GuildRoleStore.getRolesSnapshot(guild.id);
    }
    _getGuildChannels(guildId) {
      if (!this.GuildChannelStore) return [];
      try {
        const data = this.GuildChannelStore.getChannels(guildId);
        if (!data) return [];
        const channelIds = new Set();
        const channels = [];
        const extract = (arr) => {
          if (!Array.isArray(arr)) return;
          for (const entry of arr) {
            const ch = entry?.channel ?? entry;
            if (ch?.id && !channelIds.has(ch.id)) {
              channelIds.add(ch.id);
              const full = this.ChannelStore.getChannel(ch.id);
              if (full) channels.push(full);
            }
          }
        };
        for (const key of Object.keys(data)) extract(data[key]);
        return channels;
      } catch (err) { Logger.warn("Failed to get guild channels:", err); return []; }
    }
    _loadSettings() {
      return Utils.extend({}, this.defaultSettings, Data.load("settings") ?? {});
    }
    _saveSettings() {
      Data.save("settings", this.settings);
    }
    notify(content, type = "warning", duration = 3000) {
      UI.showNotification({ title: this.meta.name, content, type, duration });
    }
    getSettingsPanel() {
      const settings = config.config.map(setting => ({
        ...setting,
        value: this.settings[setting.id] ?? setting.value
      }));
      settings.push(
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
      );
      return UI.buildSettingsPanel({
        onChange: (_, id, value) => {
          this.settings[id] = value;
          this._saveSettings();
          if (id === "contextMenus") {
            if (value) this._bindContextMenus();
            else this._unbindContextMenus();
          }
          if (id === "rememberFilter" && !value) {
            Data.save("savedFilter", "all");
          }
          if (id === "autoUpdate") {
            this.updateManager.stop();
            if (value) this.updateManager.start(true);
          }
        },
        settings
      });
    }
    _computeUserPermissions(userId, guild, member) {
      const roles = this.getRoles(guild);
      if (!roles || !this.DiscordPermissions) return { permissions: [], roleColors: new Map() };
      const userRoles = [...member.roles];
      userRoles.push(guild.id);
      sortIdsByPositionDesc(userRoles, roles);
      const seenPerms = new Set();
      const permissionsArray = [];
      const roleColors = new Map();
      let hasAdmin = false;
      if (userId === guild.ownerId) {
        hasAdmin = true;
      }
      for (const roleId of userRoles) {
        const role = roles[roleId];
        if (!role) continue;
        const rolePerms = safeBigInt(role.permissions);
        const adminPerm = this.DiscordPermissions.ADMINISTRATOR;
        if (adminPerm && (rolePerms & adminPerm) === adminPerm) {
          hasAdmin = true;
        }
        for (const permKey in this.DiscordPermissions) {
          const permValue = this.DiscordPermissions[permKey];
          const hasPerm = (rolePerms & permValue) === permValue;
          if (hasPerm && !seenPerms.has(permKey)) {
            seenPerms.add(permKey);
            permissionsArray.unshift(permKey);
            roleColors.set(permKey, role.colorString || PT_ROLE_DEFAULT_COLOR);
          }
        }
      }
      if (hasAdmin) {
        for (const permKey in this.DiscordPermissions) {
          if (!seenPerms.has(permKey)) {
            seenPerms.add(permKey);
            permissionsArray.unshift(permKey);
            roleColors.set(permKey, roleColors.get("ADMINISTRATOR") || PT_ROLE_DEFAULT_COLOR);
          }
        }
      }
      return { permissions: permissionsArray, roleColors };
    }
    _computePermissionTrace(userId, guild, member) {
      const roles = this.getRoles(guild);
      if (!roles || !this.DiscordPermissions) return {};
      const userRoles = [...member.roles, guild.id];
      sortIdsByPositionDesc(userRoles, roles);
      const trace = {};
      const isOwner = userId === guild.ownerId;
      for (const permKey in this.DiscordPermissions) {
        const permValue = this.DiscordPermissions[permKey];
        const entry = { grantingRoles: [], viaOwner: isOwner };
        for (const roleId of userRoles) {
          const role = roles[roleId];
          if (!role) continue;
          const rolePerms = safeBigInt(role.permissions);
          const hasDirect = (rolePerms & permValue) === permValue;
          const hasAdmin = permKey !== "ADMINISTRATOR" && this.DiscordPermissions.ADMINISTRATOR && (rolePerms & this.DiscordPermissions.ADMINISTRATOR) === this.DiscordPermissions.ADMINISTRATOR;
          if (hasDirect) {
            entry.grantingRoles.push({ id: role.id, name: role.name, colorString: role.colorString, position: role.position, isDirect: true, isViaAdmin: false });
          } else if (hasAdmin) {
            entry.grantingRoles.push({ id: role.id, name: role.name, colorString: role.colorString, position: role.position, isDirect: false, isViaAdmin: true });
          }
        }
        if (entry.grantingRoles.length > 0 || entry.viaOwner) trace[permKey] = entry;
      }
      return trace;
    }
    _getChannelOverrideForPerm(permKey, userId, member, channel) {
      if (!channel?.permissionOverwrites || !this.DiscordPermissions) return null;
      const permValue = this.DiscordPermissions[permKey];
      if (!permValue) return null;
      const userOw = channel.permissionOverwrites[userId];
      if (userOw && !isOverwriteEmpty(userOw)) {
        const allow = safeBigInt(userOw.allow);
        const deny = safeBigInt(userOw.deny);
        if ((deny & permValue) === permValue) return { status: "denied", type: "user" };
        if ((allow & permValue) === permValue) return { status: "allowed", type: "user" };
      }
      const userRoles = member?.roles || [];
      let roleAllow = 0n, roleDeny = 0n;
      for (const roleId of userRoles) {
        const ow = channel.permissionOverwrites[roleId];
        if (!ow || isOverwriteEmpty(ow)) continue;
        roleAllow |= safeBigInt(ow.allow);
        roleDeny |= safeBigInt(ow.deny);
      }
      let evAllow = 0n, evDeny = 0n;
      const evOw = channel.permissionOverwrites[channel.guild_id];
      if (evOw && !isOverwriteEmpty(evOw)) {
        evAllow = safeBigInt(evOw.allow);
        evDeny = safeBigInt(evOw.deny);
      }
      if ((roleAllow & permValue) === permValue) return { status: "allowed", type: "role" };
      if ((roleDeny & permValue) === permValue) return { status: "denied", type: "role" };
      if ((evDeny & permValue) === permValue) return { status: "denied", type: "role" };
      if ((evAllow & permValue) === permValue) return { status: "allowed", type: "role" };
      return null;
    }
    createPopoutPermissionsComponent() {
      const defaultSettings = this.defaultSettings;
      return ({ user, guildId }) => {
        const rawSettings = Hooks.useData("settings");
        const settings = React.useMemo(() => Utils.extend({}, defaultSettings, rawSettings ?? {}), [rawSettings]);
        const { guild, member, name } = Hooks.useStateFromStores(
          [this.GuildStore, this.MemberStore, this.GuildRoleStore],
          () => {
            const guild = this.GuildStore.getGuild(guildId);
            const member = this.MemberStore.getMember(guildId, user.id);
            const displayName = this.MemberStore.getNick(guildId, user.id) ?? user.globalName ?? user.username ?? "User";
            const name = displayName === user.username ? displayName : `${displayName} (${user.username})`;
            return { guild, member, name };
          },
          [guildId, user.id]
        );
        const permData = React.useMemo(() => {
          if (!guild || !member) return null;
          return this._computeUserPermissions(user.id, guild, member);
        }, [guild, member, user]);
        if (!settings.popouts) return null;
        if (!permData || permData.permissions.length === 0) {
          return null;
        }
        const strings = this.strings;
        const handleDetailsClick = () => {
          this.showModal(this.createModalUser(name, member, guild));
        };
        return RcE("div", null,
          RcE("div", { className: "member-perms-header" },
            RcE("div", null, strings.popoutLabel),
            RcE("button", {
              className: "perm-details-button", type: "button",
              onClick: handleDetailsClick,
              "aria-label": strings.viewAllPermissions,
              title: strings.viewAllPermissions
            },
              RcE(DetailsIcon)
            )
          ),
          RcE("div", { className: "member-perms", role: "list" },
            permData.permissions.map(permKey => {
              const color = permData.roleColors.get(permKey) || PT_ROLE_DEFAULT_COLOR;
              return RcE("div", {
                className: `member-perm ${this.RoleClasses.role || ""}`,
                key: permKey,
                role: "listitem"
              },
                RcE("div", {
                  className: `perm-circle ${this.RoleClasses.roleCircle || ""}`,
                  style: { backgroundColor: color }
                }),
                RcE("div", {
                  className: `${this.TextClasses["text-xs/normal"] || ""} ${this.RoleClasses.roleName || ""} ${this.TextClasses.defaultColor || ""}`.trim()
                }, this.getPermString(permKey))
              );
            })
          )
        );
      };
    }
    _buildPermissionsMap(roleOrOverwrite, isOverwrite) {
      if (!this.DiscordPermissions) return {};
      const perms = {};
      const allowBits = safeBigInt(isOverwrite ? roleOrOverwrite.allow : roleOrOverwrite.permissions);
      const denyBits = isOverwrite ? safeBigInt(roleOrOverwrite.deny) : 0n;
      const adminPerm = this.DiscordPermissions.ADMINISTRATOR;
      const hasAdmin = !isOverwrite && adminPerm && (allowBits & adminPerm) === adminPerm;
      for (const permKey in this.DiscordPermissions) {
        const permValue = this.DiscordPermissions[permKey];
        if (hasAdmin) {
          perms[permKey] = "allowed";
        } else {
          const isAllowed = (allowBits & permValue) === permValue;
          const isDenied = (denyBits & permValue) === permValue;
          if (isAllowed) perms[permKey] = "allowed";
          else if (isDenied) perms[permKey] = "denied";
          else perms[permKey] = "neutral";
        }
      }
      return perms;
    }
    _buildUserPermissionsMap(userId, guild) {
      if (!this.DiscordPermissions) return {};
      const member = this.MemberStore.getMember(guild.id, userId);
      if (!member) return {};
      const { permissions } = this._computeUserPermissions(userId, guild, member);
      const permSet = new Set(permissions);
      const perms = {};
      for (const permKey in this.DiscordPermissions) {
        perms[permKey] = permSet.has(permKey) ? "allowed" : "denied";
      }
      return perms;
    }
    createUnifiedModalComponent() {
      const buildPermissionsMapBound = this._buildPermissionsMap.bind(this);
      const getMembersOfRoleBound = (guildId, roleId) => getMembersOfRole(guildId, roleId, this.MemberStore, this.UserStore);
      const getStrings = () => this.strings;
      const getLocaleString = (target) => this.getLocaleString(target);
      const copyToClipboard = (id) => this.ElectronModule?.copy(id);
      const UserStore = this.UserStore;
      const ChannelStore = this.ChannelStore;
      const SelectedChannelStore = this.SelectedChannelStore;
      const getUserContextMenu = () => this.UserContextMenu ??= Webpack.getBySource("user-context", "data-menu-migrated", { defaultExport: false })?.default ?? null;
      const renderUserContextMenu = (UserCtxMenu, user, guildId, channel) => (menuProps) =>
        RcE(UserCtxMenu, { ...menuProps, user, guildId, channel });
      const computeTraceBound = this._computePermissionTrace.bind(this);
      const getChannelOverrideBound = this._getChannelOverrideForPerm.bind(this);
      const GuildStoreRef = this.GuildStore;
      const MemberStoreRef = this.MemberStore;
      const buildUserPermissionsMapBound = this._buildUserPermissionsMap.bind(this);
      const DiscordPermissionsRef = this.DiscordPermissions;
      const getPermStringBound = this.getPermString.bind(this);
      const getGuildChannelsBound = this._getGuildChannels.bind(this);
      const getSettings = () => this.settings;
      const saveSettings = () => this._saveSettings();
      const bindContextMenus = () => this._bindContextMenus();
      const unbindContextMenus = () => this._unbindContextMenus();
      const configItems = config.config;
      const VALID_FILTERS = new Set(["all", "allowed", "denied", "neutral"]);
      const handleSettingsToggle = (s, item) => {
        s[item.id] = !s[item.id];
        saveSettings();
        if (item.id === "contextMenus") {
          if (s[item.id]) bindContextMenus();
          else unbindContextMenus();
        }
        if (item.id === "rememberFilter" && !s[item.id]) {
          Data.save("savedFilter", "all");
        }
      };
      const buildSettingsMenuItems = (s) => {
        return configItems.map(item => {
          const action = handleSettingsToggle.bind(null, s, item);
          return { type: "toggle", label: item.name, checked: s[item.id] ?? item.value, action };
        });
      };
      const getSavedFilter = () => {
        const s = getSettings();
        if (!s.rememberFilter) return "all";
        const saved = Data.load("savedFilter");
        return VALID_FILTERS.has(saved) ? saved : "all";
      };
      const onFilterChange = (filter) => {
        const s = getSettings();
        if (s.rememberFilter) Data.save("savedFilter", filter);
      };
      return ({ title, subtitle, avatarUrl, entityTabs, entityTabLabel, entityTabIcon, byRoleTabs, guildRoles, sortedRoleList, categories, initialTab, guildId, traceContext, isOverwriteContext, onClose }) => {
        const initialFilter = React.useMemo(getSavedFilter, []);
        const strings = getStrings();
        const copyIdLabel = getLocaleString("Copy ID");
        const handleRoleContextMenu = React.useCallback((entityId, e) => {
          ContextMenu.open(e, ContextMenu.buildMenu([{
            label: copyIdLabel,
            action: copyToClipboard.bind(null, entityId)
          }]));
        }, [copyIdLabel]);
        const handleMemberContextMenu = React.useCallback((userId, e) => {
          const UserCtxMenu = getUserContextMenu();
          if (!UserCtxMenu) return handleRoleContextMenu(userId, e);
          const user = UserStore.getUser(userId);
          if (!user) return handleRoleContextMenu(userId, e);
          const channelId = SelectedChannelStore.getChannelId();
          const channel = channelId ? ChannelStore.getChannel(channelId) : null;
          ContextMenu.open(e, renderUserContextMenu(UserCtxMenu, user, guildId, channel));
        }, [guildId, handleRoleContextMenu]);
        const hasEntityTab = entityTabs && entityTabs.length > 0;
        const tabDefs = React.useMemo(() => {
          const defs = [];
          if (hasEntityTab) defs.push({ id: "entity", label: entityTabLabel ?? strings.modal.permissionsLabel, icon: entityTabIcon ?? PersonIcon });
          defs.push(
            { id: "by_role", label: strings.byRoleLabel, icon: ShieldIcon },
            { id: "compare_roles", label: strings.compareRolesLabel, icon: SwapIcon },
            { id: "compare_users", label: strings.compareUsersLabel, icon: PeopleIcon },
            { id: "perm_lookup", label: strings.permissionLookupLabel, icon: ReverseIcon },
            { id: "security_audit", label: strings.securityAuditLabel, icon: AuditShieldIcon }
          );
          return defs;
        }, [hasEntityTab, entityTabLabel, entityTabIcon, strings]);
        const [activeTab, setActiveTab] = React.useState(initialTab ?? tabDefs[0].id);
        const handleTabBarKeyDown = React.useCallback((e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          const buttons = Array.from(e.currentTarget.querySelectorAll('[role="tab"]'));
          const focusedIdx = buttons.indexOf(document.activeElement);
          if (focusedIdx === -1) return;
          const nextIdx = e.key === "ArrowRight"
            ? (focusedIdx + 1) % buttons.length
            : (focusedIdx + buttons.length - 1) % buttons.length;
          buttons[nextIdx].focus();
          setActiveTab(tabDefs[nextIdx].id);
        }, [tabDefs]);
        const handleTabClick = React.useCallback((e) => setActiveTab(e.currentTarget.dataset.tabId), []);
        const renderTab = React.useCallback((tab) => RcE("button", {
          key: tab.id, type: "button", role: "tab",
          id: `pt-tab-${tab.id}`,
          "data-tab-id": tab.id,
          "aria-controls": `pt-tabpanel-${tab.id}`,
          className: `pt-tab-btn${activeTab === tab.id ? " active" : ""}`,
          "aria-selected": activeTab === tab.id,
          onClick: handleTabClick
        }, RcE(tab.icon), " ", tab.label), [activeTab, handleTabClick]);
        const traceData = React.useMemo(() => {
          if (!traceContext) return null;
          const guild = GuildStoreRef.getGuild(guildId);
          if (!guild) return null;
          return computeTraceBound(traceContext.userId, guild, traceContext.member);
        }, [traceContext, guildId]);
        const getChannelOverride = React.useCallback((permKey) => {
          if (!traceContext) return null;
          const channelId = SelectedChannelStore.getChannelId();
          const channel = channelId ? ChannelStore.getChannel(channelId) : null;
          if (!channel) return null;
          return getChannelOverrideBound(permKey, traceContext.userId, traceContext.member, channel);
        }, [traceContext]);
        const panelProps = { role: "tabpanel", id: `pt-tabpanel-${activeTab}`, "aria-labelledby": `pt-tab-${activeTab}` };
        let panel;
        if (activeTab === "entity" && hasEntityTab) {
          panel = RcE(ByRolePanel, { key: "entity", ...panelProps, byRoleTabs: entityTabs, categories, onRoleContextMenu: handleRoleContextMenu, onMemberContextMenu: handleMemberContextMenu, getMembersOfRoleFn: getMembersOfRoleBound, guildId, strings, traceData, getChannelOverride, isOverwriteContext: isOverwriteContext ?? false, initialFilter, onFilterChange });
        } else if (activeTab === "by_role") {
          panel = RcE(ByRolePanel, { key: "by_role", ...panelProps, byRoleTabs, categories, onRoleContextMenu: handleRoleContextMenu, onMemberContextMenu: handleMemberContextMenu, getMembersOfRoleFn: getMembersOfRoleBound, guildId, strings, isOverwriteContext: false, initialFilter, onFilterChange });
        } else if (activeTab === "compare_roles") {
          panel = RcE(ComparePanel, { key: "compare_roles", ...panelProps, guildRoles, sortedRoleList, categories, buildPermissionsMap: buildPermissionsMapBound, strings, initialFilter, onFilterChange });
        } else if (activeTab === "compare_users") {
          panel = RcE(CompareUsersPanel, { key: "compare_users", ...panelProps, guildId, categories, buildUserPermissionsMap: buildUserPermissionsMapBound, MemberStore: MemberStoreRef, UserStore, GuildStore: GuildStoreRef, strings, initialFilter, onFilterChange });
        } else if (activeTab === "security_audit") {
          const channels = getGuildChannelsBound(guildId);
          panel = RcE(AuditPanel, { key: "security_audit", ...panelProps, guildRoles, guildId, buildPermissionsMap: buildPermissionsMapBound, MemberStore: MemberStoreRef, channels, DiscordPermissions: DiscordPermissionsRef, getPermString: getPermStringBound, strings });
        } else {
          panel = RcE(LookupPanel, { key: "perm_lookup", ...panelProps, categories, guildRoles, buildPermissionsMap: buildPermissionsMapBound, getMembersOfRoleFn: getMembersOfRoleBound, onMemberContextMenu: handleMemberContextMenu, guildId, strings });
        }
        const showGuildHeader = hasEntityTab && activeTab !== "entity";
        const guild = showGuildHeader ? GuildStoreRef.getGuild(guildId) : null;
        const displayTitle = showGuildHeader && guild ? guild.name : title;
        const displaySubtitle = showGuildHeader ? null : subtitle;
        const displayAvatarUrl = showGuildHeader ? getGuildIconUrl(guild) : avatarUrl;
        const avatarElement = displayAvatarUrl
          ? RcE("img", { className: "pt-header-avatar", src: displayAvatarUrl, alt: "" })
          : RcE("div", { className: "pt-header-fallback" }, "#");
        const headerTitle = RcE("div", { className: "pt-header-title" },
          avatarElement,
          RcE("div", { className: "pt-header-text" },
            RcE("h2", { id: "pt-unified-title" }, displayTitle),
            displaySubtitle && RcE("p", null, displaySubtitle)
          )
        );
        const openSettingsMenu = React.useCallback((e) => {
          ContextMenu.open(e, ContextMenu.buildMenu(buildSettingsMenuItems(getSettings())));
        }, []);
        const header = RcE("div", { className: "pt-modal-header" },
          headerTitle,
          RcE("div", { className: "pt-header-actions" },
            RcE("button", { type: "button", className: "pt-header-btn", onClick: openSettingsMenu, "aria-label": strings.settings }, RcE(GearIcon)),
            RcE("button", { type: "button", className: "pt-header-btn", onClick: onClose, "aria-label": strings.close }, RcE(CloseIcon))
          )
        );
        const tabBar = RcE("div", { className: "pt-tab-bar", role: "tablist", onKeyDown: handleTabBarKeyDown },
          tabDefs.map(tab => renderTab(tab))
        );
        return RcE("div", { style: { height: "72vh", display: "flex", flexDirection: "column", overflow: "hidden" } }, header, tabBar, panel);
      };
    }
    createModalUser(name, member, guild) {
      const roles = this.getRoles(guild);
      const guildRoles = roles ? { ...roles } : {};
      const memberRoles = member.roles.filter(r => guildRoles[r] !== undefined);
      memberRoles.push(guild.id);
      sortIdsByPositionDesc(memberRoles, guildRoles);
      if (member.userId === guild.ownerId) {
        memberRoles.unshift(member.userId);
        guildRoles[member.userId] = {
          name: this.strings.modal.owner,
          permissions: this.ALL_PERMISSIONS,
          colorString: "#F1C40F",
          iconUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjb2xvci1taXgoaW4gb2tsYWIsIGhzbCgzOC40NTUgY2FsYygxKjEwMCUpIDQzLjEzNyUgLzEpIDEwMCUsICMwMDAgMCUpIiBkPSJNNSAxOGExIDEgMCAwIDAtMSAxIDMgMyAwIDAgMCAzIDNoMTBhMyAzIDAgMCAwIDMtMyAxIDEgMCAwIDAtMS0xSDVaTTMuMDQgNy43NmExIDEgMCAwIDAtMS41MiAxLjE1bDIuMjUgNi40MmExIDEgMCAwIDAgLjk0LjY3aDE0LjU1YTEgMSAwIDAgMCAuOTUtLjcxbDEuOTQtNi40NWExIDEgMCAwIDAtMS41NS0xLjFsLTQuMTEgMy0zLjU1LTUuMzMuODItLjgyYS44My44MyAwIDAgMCAwLTEuMThsLTEuMTctMS4xN2EuODMuODMgMCAwIDAtMS4xOCAwbC0xLjE3IDEuMTdhLjgzLjgzIDAgMCAwIDAgMS4xOGwuODIuODItMy42MSA1LjQyLTQuNDEtMy4wN1oiPjwvcGF0aD48L3N2Zz4="
        };
      }
      const userInstance = this.UserStore.getUser(member.userId);
      const tabs = memberRoles.map(roleId => {
        const role = guildRoles[roleId];
        return this._buildRoleTab({ id: roleId, role, isOverwrite: false });
      });
      const effectivePermMap = this._buildUserPermissionsMap(member.userId, guild);
      tabs.unshift({
        id: "@effective",
        name: this.strings.modal.effectivePermissions,
        color: "#5865f2",
        permissions: effectivePermMap,
        position: undefined,
        iconUrl: undefined,
        avatarUrl: undefined
      });
      return this._buildModalData(formatString(this.strings.modal.header, { name }), getAvatar(userInstance), tabs, guild, this.strings.modal.permissionsLabel, PersonIcon, { userId: member.userId, member });
    }
    createModalChannel(name, channel, guild) {
      const overwrites = channel.permissionOverwrites;
      const referenceRoles = this.getRoles(guild) ?? {};
      const tabs = Object.keys(overwrites).map(id => {
        const overwrite = overwrites[id];
        if (overwrite.type === 0) {
          const role = referenceRoles[id];
          return this._buildRoleTab({ id, role, isOverwrite: true, overwrite });
        }
        const user = this.UserStore.getUser(id);
        const defaultAvatars = this.AvatarDefaults?.DEFAULT_AVATARS;
        let fallback = null;
        if (defaultAvatars?.length) {
          const idx = Number(safeBigInt(id) % BigInt(defaultAvatars.length));
          fallback = defaultAvatars[idx];
        }
        return this._buildRoleTab({ id, role: { name: user?.username ?? id }, isOverwrite: true, avatarUrl: getAvatar(user) ?? fallback, overwrite });
      });
      return this._buildModalData(`#${name}`, getGuildIconUrl(guild), tabs, guild, this.strings.overrides, HashIcon);
    }
    _buildRoleTab({ id, role, isOverwrite, avatarUrl, overwrite }) {
      return {
        id,
        name: role?.name ?? id,
        color: role?.colorString,
        permissions: this._buildPermissionsMap(overwrite ?? role, isOverwrite),
        position: role?.position || undefined,
        iconUrl: role?.iconUrl || getRoleIconUrl(role),
        avatarUrl
      };
    }
    _buildModalData(title, avatarUrl, tabs, guild, entityTabLabel, entityTabIcon, traceContext) {
      return { title, avatarUrl, tabs, categories: this.getDefinitions(guild), guild, entityTabLabel, entityTabIcon, traceContext };
    }
    _buildRoleTabsAndList(guild) {
      const roles = this.getRoles(guild) ?? {};
      const byRoleTabs = Object.keys(roles)
        .map(roleId => this._buildRoleTab({ id: roleId, role: roles[roleId], isOverwrite: false }))
        .sort(sortByPositionDesc);
      const sortedRoleList = Object.values(roles).sort(sortByPositionDesc);
      return { roles, byRoleTabs, sortedRoleList };
    }
    showModal(modalData) {
      const guild = modalData.guild;
      this._openUnifiedModal(guild, {
        title: modalData.title,
        subtitle: guild.name,
        avatarUrl: modalData.avatarUrl,
        entityTabs: modalData.tabs,
        entityTabLabel: modalData.entityTabLabel,
        entityTabIcon: modalData.entityTabIcon,
        categories: modalData.categories,
        initialTab: "entity",
        traceContext: modalData.traceContext,
        isOverwriteContext: !modalData.traceContext,
      });
    }
    showGuildModal(guild, initialTab = "by_role") {
      this._openUnifiedModal(guild, {
        title: guild.name,
        subtitle: null,
        avatarUrl: getGuildIconUrl(guild),
        entityTabs: null,
        entityTabLabel: null,
        entityTabIcon: null,
        categories: this.getDefinitions(guild),
        initialTab,
      });
    }
    _openUnifiedModal(guild, overrides) {
      const { roles, byRoleTabs, sortedRoleList } = this._buildRoleTabsAndList(guild);
      this._showGenericModal(this._UnifiedModalComponent, {
        ...overrides,
        byRoleTabs,
        guildRoles: roles,
        sortedRoleList,
        guildId: guild.id,
      });
    }
    _showGenericModal(Component, props) {
      if (!this.ModalActions || !this.ManaModule?.Modal) {
        Logger.error("Mana modal modules not available.");
        return;
      }
      this.ModalActions.closeModal(this._modalKey);
      const ManaModal = this.ManaModule.Modal;
      this.ModalActions.openModal(manaProps =>
        RcE(ManaModal, { ...manaProps, size: 'xxl', paddingSize: 'none' },
          RcE(Component, { ...props, onClose: manaProps.onClose })
        )
      , { modalKey: this._modalKey });
      requestAnimationFrame(() => {
        const containers = document.querySelectorAll('[data-mana-component="modal"]');
        const container = containers[containers.length - 1];
        if (container) container.classList.add('pt-unified-modal');
      });
    }
    async _patchModule(flag, filter, name, callback) {
      if (this.stopped || this[flag]) return;
      const generation = this._startGeneration;
      // Wait for the component itself: its module is lazy-loaded with the profile UI, and a source
      // filter on the module also matched translation modules that load at startup.
      await Webpack.waitForModule(filter, { searchExports: true, signal: this._abortController.signal }).catch(() => null);
      if (this.stopped || this._startGeneration !== generation) return;
      const [mod, key] = Webpack.getWithKey(filter) ?? [];
      if (!mod) {
        Logger.error(`Could not find ${name} for patching.`);
        return;
      }
      Patcher.after(mod, key, callback);
      this[flag] = true;
    }
    _injectRolePermissions(_, [props], retVal) {
      if (this.stopped || !this.settings.popouts) return retVal;
      if (!props.guild || !props.userId) return retVal;
      const { userId, guild } = props;
      const user = this.UserStore.getUser(userId);
      if (!user) return retVal;
      const permissionsElement = RcE(this._PopoutPermissions, {
        key: "permissions-viewer-popout",
        user,
        guildId: guild.id
      });
      if (!retVal) return permissionsElement;
      return RcE(React.Fragment, null, retVal, permissionsElement);
    }
    async patchRolesComponent() {
      // Roles list in the user popout
      await this._patchModule("_patchedRoles", Filters.byStrings("onExpand", "onCollapse", "overflowCount"), "Roles", this._injectRolePermissions.bind(this));
    }
    async patchProfileModal() {
      // Roles list in the profile modal; the modal component itself is no longer exported
      await this._patchModule(
        "_patchedProfile",
        Filters.combine(Filters.byStrings("roleCount", "allowEditing"), Filters.not(Filters.byStrings("onExpand"))),
        "UserProfileModal roles",
        this._injectRolePermissions.bind(this)
      );
    }
    _bindContextMenus() {
      this.patchGuildContextMenu();
      this.patchChannelContextMenu();
      this.patchUserContextMenu();
    }
    _unbindContextMenus() {
      for (const cancel of this.contextMenuPatches) {
        cancel();
      }
      this.contextMenuPatches = [];
    }
    _patchContextMenu(menuId, callback) {
      this.contextMenuPatches.push(ContextMenu.patch(menuId, callback));
    }
    _buildContextMenuItem(action) {
      return ContextMenu.buildItem({ label: this.strings.contextMenuLabel, action });
    }
    patchGuildContextMenu() {
      this._patchContextMenu("guild-context", (retVal, props) => {
        if (!props.guild) return;
        insertContextMenuItem(retVal, this._buildContextMenuItem(
          () => this.showGuildModal(props.guild)
        ));
      });
    }
    patchChannelContextMenu() {
      this._patchContextMenu("channel-context", (retVal, props) => {
        if (!props.channel) return;
        insertContextMenuItem(retVal, this._buildContextMenuItem(() => {
          if (!props.guild) {
            this.notify(this.strings.missingGuildData);
            return;
          }
          if (!hasOverwrites(props.channel)) {
            this.notify(formatString(this.strings.noOverrides, { name: props.channel.name }), "info");
            return;
          }
          this.showModal(this.createModalChannel(props.channel.name, props.channel, props.guild));
        }));
      });
    }
    patchUserContextMenu() {
      this._patchContextMenu("user-context", (retVal, props) => {
        const { guildId, user } = props;
        if (!guildId || !user) return;
        const guild = this.GuildStore.getGuild(guildId);
        if (!guild) return;
        insertContextMenuItemInGroup(retVal, this._buildContextMenuItem(() => {
          const member = this.MemberStore.getMember(guildId, user.id);
          if (!member) {
            this.notify(this.strings.memberNotFound);
            return;
          }
          const displayName = member.nick ?? user.globalName ?? user.username;
          const modalName = displayName === user.username ? displayName : `${displayName} (${user.username})`;
          this.showModal(this.createModalUser(modalName, member, guild));
        }));
      });
    }
  };
})();