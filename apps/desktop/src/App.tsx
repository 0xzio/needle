import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { appEmitter } from '@penx/event'
import { StoreProvider } from '@penx/store'
import { TrpcProvider } from '@penx/trpc-client'
import '@glideapps/glide-data-grid/dist/index.css'
import { initFower } from './common/initFower'
import { MainApp } from './MainApp'
import '@/styles/globals.css'
import '@/styles/command.scss'
import { fixPathEnv } from 'tauri-plugin-shellx-api'
import { createTrayIcon } from './common/createTrayIcon'
import { handleEscape } from './common/handleEscape'
import { watchDesktopLogin } from './common/watchDesktopLogin'
import { watchExtensionDevChange } from './common/watchExtensionDevChange'
import { registerDefaultAppHotkey } from './components/BindAppHotkey'
import { useInitThemeMode } from './hooks/useInitThemeMode'

initFower()

async function init() {
  // createTrayIcon()
  handleEscape()
  watchExtensionDevChange()
  watchDesktopLogin()
  registerDefaultAppHotkey()
}

init()

function MyApp() {
  useEffect(() => {
    fixPathEnv() // without this, PATH variable may not be loaded and thus non-system shell commands may fail
    const handleSignOut = async () => {
      // const user = store.user.getUser()
      // await setMnemonicToLocal(user.id, '')
      // await clearAuthorizedUser()
      // await setLocalSession(null as any)
      // store.setToken(null as any)
      // store.user.setUser(null as any)
      // store.user.setMnemonic('')
      // appEmitter.emit('SIGN_OUT_SUCCESSFULLY')
    }
    appEmitter.on('SIGN_OUT', handleSignOut)
    return () => {
      appEmitter.off('SIGN_OUT', handleSignOut)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInitThemeMode()

  return (
    <StoreProvider>
      <TrpcProvider>
        <Toaster className="dark:hidden" richColors />
        <Toaster theme="dark" className="hidden dark:block" richColors />
        <MainApp />
        <div id="portal" />
      </TrpcProvider>
    </StoreProvider>
  )
}

export default MyApp
