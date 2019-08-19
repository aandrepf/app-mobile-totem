import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
const args = require('electron-args');

// tslint:disable-next-line:prefer-const
let win: BrowserWindow;
let cli = args(`
    app
    Usage
    $ app --arg
    $ app --arg=value
    Options
    --debug     modo debug [Default: false]
    --ssl       protocolo de segurança [Default: false]
    --endpoint  ip ou hostname do totem
    `,
    {
    default: {
        debug: false,
        ssl: false
    }
});

console.log('MODO DEBUG ATIVADO?', cli.flags.debug);

const fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

const filepath = 'C:/inetpub/wwwroot/HubSGA/appsettings.json';

app.on('ready', () => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
        // console.log('An error ocurred reading the file :' + err.message);
        return;
    }
    // Change how to handle the file content
    // console.log('The file content is : ' + data);
  });
  createWindow();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
    win = new BrowserWindow({
        // width: 1366, height: 768
        // fullscreen: true,
        resizable: false,
        kiosk: true
    });

    // win.setAutoHideMenuBar(true);

    // carrega a aplicação baseada no local onde esta o app minificado
    win.loadURL(
        url.format({
          pathname: path.join(__dirname, `./dist/index.html`),
          protocol: 'file:',
          slashes: true,
        })
      );

      // abre o DEVTOOLS do Chrome
      if (cli.flags.debug){
        win.webContents.openDevTools();
      }

      // fecha o electron
      win.on('closed', () => {
        win = null;
        app.quit();
      });
  }

