export {}

declare global {
  interface Window {
    electronAPI: {
      readData: () => Promise<Record<string, any>>
      writeData: (data: Record<string, any>) => Promise<{ success: boolean }>
      saveImage: (fileName: string, buffer: ArrayBuffer) => Promise<string>
    }
  }
}