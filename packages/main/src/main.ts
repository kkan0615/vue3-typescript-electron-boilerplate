import { app } from 'electron'
import { createAppWindow } from './windows/app'
import { autoUpdater } from 'electron-updater'
import './utils/autoUpdete'
import './services'

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
