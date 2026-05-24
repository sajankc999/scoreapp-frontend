import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => "pong",
  // readData: () => ipcRenderer.invoke('read-data'),
  // writeData: (data: Record<string, any>) => ipcRenderer.invoke('write-data', data),
  readTeam: ()=> ipcRenderer.invoke("read-teams"),
  writeTeam:(data:Record<string,any>)=>ipcRenderer.invoke("write-teams",data),
  saveImage:(fileName: string, buffer: ArrayBuffer) => ipcRenderer.invoke('save-image', { fileName, buffer }),
})