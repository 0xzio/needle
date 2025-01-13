import { listen } from '@tauri-apps/api/event'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { db } from '@penx/local-db'

export async function watchDesktopLogin() {
  const appWindow = getCurrentWebviewWindow()
}
