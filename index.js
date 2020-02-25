const { app, BrowserWindow, remote } = require("electron")
const path = require('path')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })

  window.loadFile("./app.html")

  window.on('closed', () => {
    window = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
    }
})

app.on('activate', () => {
  if (mainWindow === null) {
      createWindow();
    }
})
