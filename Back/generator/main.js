const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
}

// Обработчики для диалогов
ipcMain.handle('dialog:openFile', async (event, options) => {
  const result = await dialog.showOpenDialog(options);
  return result;
});

ipcMain.handle('dialog:saveFile', async (event, options) => {
  const result = await dialog.showSaveDialog(options);
  return result;
});

ipcMain.handle('file:read', async (event, filePath) => {
  return fs.readFileSync(filePath, 'utf8');
});

ipcMain.handle('file:write', async (event, filePath, content) => {
  return fs.writeFileSync(filePath, content, 'utf8');
});

app.whenReady().then(createWindow);