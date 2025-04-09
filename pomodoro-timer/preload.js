const { contextBridge, ipcRenderer } = require("electron");

// Expose functions to the renderer process - so minimize and close window from the toolbar
contextBridge.exposeInMainWorld("electron", {
  minimize: () => ipcRenderer.send("minimize-window"),
  close: () => ipcRenderer.send("close-window"),
});