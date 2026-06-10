import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";

// const {app} = require("electron");

// app.commandLine.appendSwitch('ozone-platform', 'x11');
// app.commandLine.appendSwitch('disable-gpu');

const appRoot = app.getAppPath();
console.log(appRoot);
// const appRoot = path.dirname(__filename);

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(appRoot, "electron/dist/preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    width: 1200,
    height: 800,
  });

  console.log("ENV:", process.env.VITE_DEV_SERVER_URL);
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(appRoot, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  const appDataDir = app.getPath("userData");
  const userDataDir = path.join(appDataDir, "userData");
  console.log("User data path is:", userDataDir);

  fs.mkdirSync(userDataDir, { recursive: true });

  const paths = {
    settings: path.join(userDataDir, "settings.json"),
    teams: path.join(userDataDir, "teams.json"),
    images: path.join(userDataDir, "images"),
  };

  fs.mkdirSync(paths.images, { recursive: true });

  const defaultPaths = {
    settings: path.join(appRoot, "electron/defaults/settings.json"),
    teams: path.join(appRoot, "electron/defaults/teams.json"),
  };

  if (!fs.existsSync(paths.settings)) {
    fs.copyFileSync(defaultPaths.settings, paths.settings);
  }

  if (!fs.existsSync(paths.teams)) {
    fs.copyFileSync(defaultPaths.teams, paths.teams);
  }

  // if(!fs.existsSync(paths.images)){
  //   fs.mkdir(paths.images,{recursive:true},(err)=>{
  //     if (err) throw err;
  //   })
  // }

  ipcMain.handle("read-teams", () => readJson(paths.teams));
  ipcMain.handle("write-teams", (_e, data) => writeJson(paths.teams, data));
  ipcMain.handle("save-image", (_e, { fileName, buffer }) => {
    const filePath = path.join(paths.images, fileName);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    return filePath;
  });
ipcMain.handle("get-image", async (_, imagePath) => {
  const ext = path.extname(imagePath).toLowerCase();

  let mime = "image/png";

  if (ext === ".jpg" || ext === ".jpeg") mime = "image/jpeg";
  else if (ext === ".webp") mime = "image/webp";

  const buffer = fs.readFileSync(imagePath);

  return `data:${mime};base64,${buffer.toString("base64")}`;
});

ipcMain.handle("remove-image", async (_, imagePath: string) => {
  fs.unlink(imagePath, (err) => {
    if (err) throw err;
    console.log("deleted");
  });
});

  // if (!fs.existsSync(paths.teams)) {
  //   fs.copyFileSync(defaultPaths.teams, paths.teams);
  // }

  createWindow();
});

function readJson(filePath: string) {
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJson(filePath: string, data: Record<string, any>) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  return { success: true };
}
