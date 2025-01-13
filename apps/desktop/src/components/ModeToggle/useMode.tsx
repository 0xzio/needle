import { fowerStore } from '@fower/react'
import { atom, useAtom } from 'jotai'

interface Result {
  mode: string
  setMode: (mode: string) => void
}

const modeAtom = atom('')

export function useMode(): Result {
  const [mode, setModeState] = useAtom<string>(modeAtom)

  function setMode(mode: string) {
    setModeState(mode)
    fowerStore.setMode(mode)
  }

  return { mode, setMode } as Result
}
