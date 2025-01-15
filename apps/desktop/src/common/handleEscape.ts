import { appModeAtom } from '@/hooks/useAppMode'
import { positionAtom } from '@/hooks/useCommandPosition'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import {
  getCurrentWebviewWindow,
  WebviewWindow,
} from '@tauri-apps/api/webviewWindow'
import { appEmitter } from '@penx/event'
import { store } from '@penx/store'

const isDev = import.meta.env.MODE === 'development'

export async function handleEscape() {
  const appWindow = getCurrentWebviewWindow()
  const mainWindow = await WebviewWindow.getByLabel('main')

  document.addEventListener('keydown', async (event) => {
    const mode = store.get(appModeAtom)

    if (event.key === 'Escape') {
      const position = store.get(positionAtom)
      if (position === 'ROOT') {
        mainWindow?.hide()
      } else {
        appEmitter.emit('ON_ESCAPE_IN_COMMAND')
      }
    }
  })

  listen('tauri://blur', () => {
    if (!isDev) {
      const mode = store.get(appModeAtom)
      if (mode === 'COMMAND') {
        appWindow.hide()
      }
    }
  })
}
