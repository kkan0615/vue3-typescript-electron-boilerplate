import { IpcRendererEvent } from 'electron'

export const useElectron = () => {
  const renderer = (window as any).renderer

  return {
    // eslint-disable-next-line no-unused-vars
    send: renderer.send as <T = any>(channel: string, args?: T) => void,
    // eslint-disable-next-line no-unused-vars
    on: renderer.on as <T = any>(channel: string, listener?: (event: IpcRendererEvent, args?: T) => void) => void,
    // eslint-disable-next-line no-unused-vars
    off: renderer.off as (channel: string, listener?: (event: IpcRendererEvent) => void) => void,
    // eslint-disable-next-line no-unused-vars
    invoke: renderer.invoke as <T = any>(channel: string, args?: T) => Promise<any>,
  }
}
