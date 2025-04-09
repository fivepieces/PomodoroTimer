const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    resizable: false, // Prevent resizing
    frame: false, // Hide the window frame (title bar)
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load the HTML file
  mainWindow.loadFile("src/index.html");

  // Set the menu bar visibility to false
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setAutoHideMenuBar(true);

  // Listen for minimize and close window events
  ipcMain.on("minimize-window", () => {
    mainWindow.minimize();
  });

  ipcMain.on("close-window", () => {
    mainWindow.close();
  });
};

// When Electron is ready, create the window
app.whenReady().then(() => {
  createWindow();

  // Recreate the window on macOS if no other windows are open
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit the app when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});