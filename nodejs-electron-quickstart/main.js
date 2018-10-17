// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const setupPug = require('electron-pug')
const url = require('url')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

var orderPosition = 1

async function createWindow () {
   // Setup app to use pug view engine
   await setUpOurPug()
   // Create the browser window.
   mainWindow = new BrowserWindow({width: 800, height: 600, title: 'main-win'})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/index.pug'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

async function setUpOurPug(params=null) {

  const locals = params
  try {
    let pug = await setupPug({pretty: true}, params)
    pug.on('error', err => console.error('electron-pug error', err))
  } catch (err) {
    // Could not initiate 'electron-pug'
    console.log(err)
  }
}



ipcMain.on('show-order-page', function(event) {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/order.pug'),
      protocol: 'file:',
      slashes: true
    }))
});

ipcMain.on('show-home', function(event) {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/index.pug'),
      protocol: 'file:',
      slashes: true
    }))
});

ipcMain.on('place-order', async function(event, params) {

    params['position'] = orderPosition
    orderPosition += 1
    // Load confirmation page
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'views/order_submitted.pug'),
      protocol: 'file:',
      slashes: true
    }))
    // When renderer process for new page is ready, send
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('confirm-order' , params);
    })
});





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
