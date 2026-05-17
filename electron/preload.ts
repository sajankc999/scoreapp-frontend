import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  readData: () => ipcRenderer.invoke('read-data'),
  writeData: (data: Record<string, any>) => ipcRenderer.invoke('write-data', data),
  saveImage: (fileName: string, buffer: ArrayBuffer) => ipcRenderer.invoke('save-image', { fileName, buffer }),
})