import { app, Notification, dialog, ipcMain, BrowserWindow } from 'electron'
import { createAppWindow } from './windows/app'
import { autoUpdater } from 'electron-updater'
import isDev from 'electron-is-dev'

const isSingleInstance = app.requestSingleInstanceLock()

if (!isSingleInstance) {
  app.quit()
  process.exit(0)
}

app.on('second-instance', () => {
  createAppWindow().catch((err) =>
    console.error('Error while trying to prevent second-instance Electron event:', err)
  )
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  createAppWindow().catch((err) =>
    console.error('Error while trying to handle activate Electron event:', err)
  )
})

app
  .whenReady()
  .then(async () => {
    await createAppWindow()
    await autoUpdater.checkForUpdates()
  })
  .catch((e) => console.error('Failed to create window:', e))


autoUpdater.on('error', async (error, message) => {
  if (!isDev) {
    await dialog.showMessageBox(null as any, {
      type: 'error',
      title: 'Error: auto-updater',
      message: 'Error: auto-updater',
      detail: message,
    })
  }
})

autoUpdater.on('update-not-available', async () => {
  BrowserWindow.getAllWindows().map(window => {
    window.webContents.send('update-not-available')
  })
})

/**
 * Check update when update is available when program is executed.
 */
autoUpdater.on('update-available', (info) => {
  // @TODO: Change to confirm
  new Notification({
    title: 'update is available',
    body: `${info.version} is available`,
  }).show()

  BrowserWindow.getAllWindows().map(window => {
    window.webContents.send('update-available')
  })
})

/**
 * check update is ready
 * @return boolean - if update is ready return true, else, return false
 */
ipcMain.handle('check-update',async () => {
  await autoUpdater.checkForUpdates()
})

/**
 * Update program
 */
ipcMain.on('update-program',async () => {
  await autoUpdater.quitAndInstall()
})

