import { atom, useAtom } from 'jotai'

export const dateAtom = atom<Date>(new Date())
export function useDate() {
  const [date, setDate] = useAtom(dateAtom)
  return { date, setDate }
}
