const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 780,
        height: 517,
        frame: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, './UI/index.html'));

    mainWindow.webContents.openDevTools();

    const menuTemplate = [{
        label: 'File',
        submenu: [{
            label: 'Close',
            click: () => {
                mainWindow.close();
            }
        }]
    }];



    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.executeJavaScript(`
            const bar = document.querySelector('.bar');

            bar.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            function handleMouseDown(e) {
                window.postMessage({ type: 'drag-start', clientX: e.clientX, clientY: e.clientY });
            }

            function handleMouseMove(e) {
                window.postMessage({ type: 'drag-move', clientX: e.clientX, clientY: e.clientY });
            }

            function handleMouseUp() {
                window.postMessage({ type: 'drag-end' });
            }
        `);
    });
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('web-contents-created', (event, contents) => {
    contents.on('will-attach-webview', (event) => {
        event.preventDefault();
    });
});