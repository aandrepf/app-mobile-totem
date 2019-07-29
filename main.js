"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var args = require('electron-args');
// tslint:disable-next-line:prefer-const
var win;
var cli = args("\n    app\n    Usage\n    $ app --arg\n    $ app --arg=value\n    Options\n    --debug     modo debug [Default: false]\n    --ssl       protocolo de seguran\u00E7a [Default: false]\n    --endpoint  ip ou hostname do totem\n    ", {
    default: {
        debug: false,
        ssl: false
    }
});
console.log('MODO DEBUG ATIVADO?', cli.flags.debug);
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
var filepath = 'C:/inetpub/wwwroot/HubSGA/appsettings.json';
electron_1.app.on('ready', function () {
    fs.readFile(filepath, 'utf-8', function (err, data) {
        if (err) {
            console.log('An error ocurred reading the file :' + err.message);
            return;
        }
        // Change how to handle the file content
        console.log('The file content is : ' + data);
    });
    createWindow();
});
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({
        // width: 1366, height: 768
        // fullscreen: true,
        resizable: false,
        kiosk: true
    });
    // win.setAutoHideMenuBar(true);
    // carrega a aplicação baseada no local onde esta o app minificado
    win.loadURL(url.format({
        pathname: path.join(__dirname, "./dist/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    // abre o DEVTOOLS do Chrome
    if (cli.flags.debug) {
        win.webContents.openDevTools();
    }
    // fecha o electron
    win.on('closed', function () {
        win = null;
        electron_1.app.quit();
    });
}
//# sourceMappingURL=main.js.map