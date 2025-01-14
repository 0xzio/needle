import { atom, useAtom } from 'jotai'
import { IListItem, LoadingType } from 'penx'

type MarketplaceUI = {
  type: 'marketplace'
}

type ClipboardHistoryUI = {
  type: 'clipboard-history'
}

type TodayUI = {
  type: 'today'
}

type DatabaseUI = {
  type: 'database'
}

type DatabaseListUI = {
  type: 'databases'
}

type PostListUI = {
  type: 'posts'
}

type PageListUI = {
  type: 'pages'
}

type SettingsUI = {
  type: 'settings'
}

type LoadingUI = {
  type: 'loading'
  data: LoadingType
}

type MarkdownUI = {
  type: 'markdown'
  content: string
}

type ListUI = {
  type: 'list'
  items: IListItem[]
}

type RenderUI = {
  type: 'render'
  component: any
}

export type CommandAppUI =
  | ListUI
  | MarkdownUI
  | LoadingUI
  | MarketplaceUI
  | TodayUI
  | DatabaseUI
  | ClipboardHistoryUI
  | RenderUI
  | DatabaseListUI
  | PostListUI
  | PageListUI
  | SettingsUI

export const commandUIAtom = atom<CommandAppUI>({} as CommandAppUI)

export function useCommandAppUI() {
  const [ui, setUI] = useAtom(commandUIAtom)

  return {
    ui,
    isList: ui.type === 'list',
    setUI,
  }
}
