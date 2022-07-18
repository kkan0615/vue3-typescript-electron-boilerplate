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

// autoUpdater.on('update-not-available', () => {
//
//   new Notification({
//     title: 'update is not available',
//     body: 'update is not available',
//   }).show()
//
//   BrowserWindow.getAllWindows().map(window => {
//     window.webContents.send('update-available')
//   })
// })

/**
 * Check update is existed
 */
autoUpdater.on('update-available', () => {
  console.log('update is available')

  // inform update is available with notification
  new Notification({
    title: 'update is available',
    body: 'update is available',
  }).show()

  BrowserWindow.getAllWindows().map(window => {
    window.webContents.send('update-available')
  })
})

/**
 * Update program
 */
ipcMain.on('check-update',async () => {
  await autoUpdater.checkForUpdates()
})

/**
 * Update program
 */
ipcMain.on('update-program',async () => {
  await autoUpdater.quitAndInstall()
})

