import { defaultWindowIcon } from '@tauri-apps/api/app'
import { invoke } from '@tauri-apps/api/core'
import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'
// import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { getCurrentWindow } from '@tauri-apps/api/window'

let trayIconCreated = false

export async function createTrayIcon() {
  if (trayIconCreated) {
    console.log('Tray icon already exists.')
    return
  }

  const menu = await Menu.new({
    items: [
      {
        id: 'show',
        text: 'Show',
        action: async () => {
          const window = getCurrentWindow()
          await window.show()
        },
      },
      {
        id: 'quit',
        text: 'Quit',
        action: async () => {
          await invoke('exit')
        },
      },
    ],
  })

  const tray = await TrayIcon.new({
    menu,
    menuOnLeftClick: true,
    // here you can add a tray menu, title, tooltip, event handler, etc
    icon: await defaultWindowIcon(),
    action: async (event) => {
      switch (event.type) {
        case 'Click':
          console.log(
            `mouse ${event.button} button pressed, state: ${event.buttonState}`,
          )

          const window = getCurrentWindow()
          await window.show()
          break
        case 'DoubleClick':
          console.log(`mouse ${event.button} button pressed`)
          break
      }
    },
  })
  trayIconCreated = true
}
