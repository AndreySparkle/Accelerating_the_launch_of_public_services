const { app, BrowserWindow } = require('electron');
const path = require('path');

// Добавляем импорт remote
require('@electron/remote/main').initialize();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Активируем remote для окна
  require('@electron/remote/main').enable(mainWindow.webContents);

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);