import { FileContent } from './schema'

export interface FileDialogOptions {
  filters: Array<{
    name: string
    extensions: string[]
  }>
  properties?: string[]
  defaultPath?: string
}

export interface DialogResult {
  canceled: boolean
  filePaths: string[]
}

export interface ElectronAPI {
  openFileDialog: (options: FileDialogOptions) => Promise<DialogResult>
  saveFileDialog: (options: FileDialogOptions) => Promise<DialogResult>
  readFile: (filePath: string) => Promise<string>
  writeFile: (filePath: string, content: string) => Promise<void>
  generateTemplate: (filesData: FileContent[]) => Promise<string>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
