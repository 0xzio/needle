import { defaultWindowIcon } from '@tauri-apps/api/app'
import { Menu } from '@tauri-apps/api/menu'
import { TrayIcon } from '@tauri-apps/api/tray'

export async function createTrayIcon() {
  const menu = await Menu.new({
    items: [
      {
        id: 'quit',
        text: 'Quit',
        action: () => {
          console.log('quit pressed')
        },
      },
    ],
  })
  console.log('created tray icon>>>>>>>>>>>>')

  const options = {
    menu,
    menuOnLeftClick: true,
    // here you can add a tray menu, title, tooltip, event handler, etc
    icon: await defaultWindowIcon(),
  }
  const tray = await TrayIcon.new(options)
}
