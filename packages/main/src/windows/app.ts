import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'

export let appWindow: BrowserWindow | undefined

export const createAppWindow = async () => {
  // Create the browser window.
  appWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
    webPreferences: {
      webviewTag: false,
      nodeIntegration: false,
      contextIsolation: true,
      // Electron current directory will be at `dist/main`, we need to include
      // the preload script from this relative path: `../preload/index.cjs`.
      preload: path.join(__dirname, '../preload/index.cjs'),
    },
  })
  // When it's close, window object should be changed to "undefined"
  appWindow.on('close', destroyAppWindow)

  const pageUrl = isDev
    ? process.env['VITE_DEV_SERVER_URL'] || 'http://localhost:3000'
    : new URL('../dist/renderer/index.html', `file://${__dirname}`).toString()

  if (isDev) {
    // Open chrome devtools
    appWindow.webContents.openDevTools()
  }

  await appWindow.loadURL(pageUrl)
}

export const destroyAppWindow = async () => {
  if (appWindow) {
    appWindow.destroy()
    appWindow = undefined
  }
}
