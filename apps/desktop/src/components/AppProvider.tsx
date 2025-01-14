import { createContext, FC, PropsWithChildren, useEffect, useRef } from 'react'
import { Box } from '@fower/react'
import { useAtomValue } from 'jotai'
import { appEmitter } from '@penx/event'
import { appLoadingAtom, store } from '@penx/store'
import { LogoSpinner } from '@penx/widget'
import { AppService } from './services/AppService'

export const appContext = createContext({} as { app: AppService })

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const loading = useAtomValue(appLoadingAtom)
  const appRef = useRef(new AppService())
  const { Provider } = appContext

  useEffect(() => {
    if (!appRef.current.inited) {
      appRef.current.init()
    }
  }, [])

  const inited = useRef(false)
  useEffect(() => {
    if (inited.current) return
    inited.current = true
    appEmitter.emit('LOAD_CLOUD_SPACES')
  }, [])

  if (loading) {
    return (
      <Box toCenter h-80vh>
        <LogoSpinner />
      </Box>
    )
  }

  return <Provider value={{ app: appRef.current }}>{children}</Provider>
}
