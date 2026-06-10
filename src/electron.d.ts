export {}

declare global {
  interface Window {
    electronAPI: {
      readTeam: () => Promise<Record<string, any>>
      writeTeam: (data: Record<string, any>) => Promise<{ success: boolean }>
      saveImage: (fileName: string, buffer: ArrayBuffer) => Promise<string>
      getImage: (
        imagePath: string
      ) => Promise<string>;
    }
  }
}