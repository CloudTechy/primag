import { app, BrowserWindow } from 'electron'
const { dialog, ipcMain, } = require('electron')
import db from './module/database'
import callback from './module/callback'
import store from '../renderer/store'
import product from './module/product'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
db.DBCon.catch((err) => { dialog.showErrorBox('Database Error', err); app.quit() })

let win
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  win = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })

  win.loadURL(winURL)
  win.webContents.on('did-finish-load', callback.sendProducts)
  ipcMain.on('get-product', callback.getProduct)
  ipcMain.on('all-product', callback.allProduct)
  ipcMain.on('delete-product', callback.deleteProduct)
  ipcMain.on('add-product', callback.addProduct)
  ipcMain.on('edit-product', callback.editProduct)
  win.on('closed', () => {
    win = null
  })
}
product.all().then(res =>store.dispatch('setProducts',res))
.catch(err => store.dispatch('setProducts', {error : err.message}))

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
