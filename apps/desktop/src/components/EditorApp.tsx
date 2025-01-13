import { ErrorBoundary } from 'react-error-boundary'
import { isProd, isServer } from '@penx/constants'
import { appEmitter } from '@penx/event'
import { useHideLogoLoader } from '@penx/hooks'
import { useSession } from '@penx/session'
import { ClientOnly } from '@penx/widget'
import { AppProvider } from './AppProvider'
import { HotkeyBinding } from './HotkeyBinding'
import { Workbench } from './Workbench/Workbench'

if (!isServer) {
}

export const EditorApp = () => {
  const { data: session } = useSession()
  // console.log('Editor App============session:', session)

  useHideLogoLoader()

  return (
    <ClientOnly>
      <HotkeyBinding />
      <AppProvider>
        <Workbench />
      </AppProvider>
    </ClientOnly>
  )
}
