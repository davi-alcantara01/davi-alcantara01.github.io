const { app, BrowserWindow } = require('electron');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        fullscreen: false,
        maximizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.maximize();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
