import { app,ipcMain } from "electron";
import serve from "electron-serve";
import Store from "electron-store";
import { createWindow } from "./helpers";
import path from "path";
import {print} from './utils/print.utils'
const store = new Store();
const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const backgroundColor = (): string => {
    if (!store.get("theme")) {
      store.set("theme", "dark");
    }
    const dark = "#222";
    const light = "#DDD";

    if (store.get("theme") === "dark") {
      return light;
    }
    return dark;
  };

  const mainWindow = createWindow("main", {
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    title: "Bamyan",
    frame: true,
    backgroundColor: backgroundColor(),
    // webPreferences: {
    //   nodeIntegration: true,
    // },
    webPreferences: {
      // contextIsolation: true, // protect against prototype pollution
      nodeIntegration:true,
      
      // preload: app.isPackaged
      // ? path.join(__dirname, 'preload.js')
      // : path.join(__dirname, '/../.erb/dll/preload.js'),
      // nodeIntegration: true,
    }
  });
  ipcMain.on('ipc-example', async (event, arg) => {
    console.log("ipc",arg)
    // const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    // console.log(msgTemplate(arg));
    // event.reply('ipc-example', msgTemplate('pong'));
  });
  
ipcMain.on('print', async (event, item) => {
  console.log(item.order)

  console.log(item.order)
  print(item.order,item.ip)
  event.reply('printed');
});
  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
