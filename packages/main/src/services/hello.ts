import { ipcMain } from 'electron'

ipcMain.on('hello-world',async () => {
  console.log('Hello world!')
})
