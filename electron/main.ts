import { app, BrowserWindow,ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import * as fs from 'fs'
import * as path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,   // required
      nodeIntegration: false,   // keep this off
    },
    width: 1200,
    height: 800,
  });
  console.log("ENV:",process.env.VITE_DEV_SERVER_URL);
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

const dataFilePath = path.join(app.getPath('userData'), 'data.json')

ipcMain.handle('read-data', async () => {
  if (!fs.existsSync(dataFilePath)) return {}
  const raw = fs.readFileSync(dataFilePath, 'utf-8')
  return JSON.parse(raw)
})

ipcMain.handle('write-data', async (_event, newData) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), 'utf-8')
  return { success: true }
})