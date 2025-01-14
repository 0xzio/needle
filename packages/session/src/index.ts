import { createContext, useContext } from 'react'

type SessionData = {
  userId: string
  siteId: string
}

export interface SessionContextValue {
  data: SessionData
  loading: boolean
}

export const sessionContext = createContext<SessionContextValue>({
  data: null,
  loading: true,
} as any)

export const SessionProvider = sessionContext.Provider

export function useSession() {
  return useContext(sessionContext)
}
