import { positionAtom } from '@/hooks/useCommandPosition'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { appEmitter } from '@penx/event'
import { store } from '@penx/store'

const isDev = import.meta.env.MODE === 'development'

export async function handleEscape() {
  const appWindow = getCurrentWindow()
  const mainWindow = await WebviewWindow.getByLabel('main')

  document.addEventListener('keydown', async (event) => {
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
      appWindow.hide()
    }
  })
}
