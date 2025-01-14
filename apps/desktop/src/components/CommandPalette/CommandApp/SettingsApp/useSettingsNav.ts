import { atom, useAtom } from 'jotai'

export enum SettingsNavType {
  General = 'General',
  Extensions = 'Extensions',
  Feedback = 'Feedback',
  About = 'About',
}

const settingsNavAtom = atom(SettingsNavType.General)

export function useSettingsNav() {
  const [selected, setSelected] = useAtom(settingsNavAtom)
  return { selected, setSelected }
}
