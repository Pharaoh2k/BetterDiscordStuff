/**
 * @name DownloadAudio
 * @version 1.0.0
 * @website https://x.com/_Pharaoh2k
 * @source https://raw.githubusercontent.com/Pharaoh2k/BetterDiscordStuff/refs/heads/main/Plugins/AudioDownloader.plugin.js
 * @authorId 874825550408089610
 * @description Adds “Download audio” to the right-click menu on messages containing voice-notes or audio attachments.
 * @author Pharaoh2k
 */
 
const TAG = "DownloadAudio";
const {shell} = require("electron");

const DEV = false;
const log = (...a)=> DEV && console.log(`[${TAG}]`, ...a);

module.exports = class DownloadAudio {

 start() {
  BdApi.ContextMenu.patch("message", this.patchMenu);
  log("menu patched");
 }

 stop() {
  BdApi.ContextMenu.unpatch("message", this.patchMenu);
 }

 patchMenu = (menuTree, ctx) => {
      const audio = this.findAudio(ctx.message);
      if (!audio) return;

      const CM   = BdApi.ContextMenu;
      const slot = menuTree.props.children.props.children;

      slot.push(CM.buildItem({type: "separator"}));
      slot.push(CM.buildItem({
           type : "text",
           id   : "download-audio",
           label: "Download Audio",
           action: () => this.openInBrowser(audio.url)
      }));
 }

 findAudio(msg = {}) {
      if (msg.voiceMessageSettings?.audioURL)
         return {url: msg.voiceMessageSettings.audioURL};

      const att = msg.attachments?.find(a =>
          ((a.contentType ?? a.content_type) || "")
              .startsWith("audio") ||
          /\.(mp3|wav|m4a|flac|ogg)$/i.test(a.filename)
      );
      return att && {url: att.url};
 }

 openInBrowser(link) {
      try {
           shell.openExternal(link);
           BdApi.UI.showToast(
                "Opened in browser – hit save if it doesn’t auto-download.",
                {type: "success"}
           );
      } catch (err) {
           console.error(`[${TAG}]`, err);
           BdApi.UI.showToast("Could not open link", {type: "error"});
      }
 }
};
