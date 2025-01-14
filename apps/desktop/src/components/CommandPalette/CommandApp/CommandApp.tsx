import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Markdown } from '@/components/Markdown'
import { CommandAppUI } from '@/hooks/useCommandAppUI'
import { Box } from '@fower/react'
import { IListItem, isListJSON, isMarkdownJSON } from 'penx'
import { useSession } from '@penx/session'
import { LoginByToken } from '../LoginByToken/LoginByToken'
import { ClipboardHistoryApp } from './ClipboardHistoryApp'
import { DatabaseListApp } from './DatabaseListApp/DatabaseListApp'
import { ListApp } from './ListApp'
import { MarketplaceApp } from './MarketplaceApp/MarketplaceApp'
import { PageListApp } from './PageListApp/PageListApp'
import { PostListApp } from './PostListApp/PostListApp'
import { SettingsApp } from './SettingsApp/SettingsApp'
import { TodayApp } from './TodayApp'

interface CommandAppProps {
  currentCommand: IListItem
  ui: CommandAppUI
  loading: boolean
}

export const CommandApp = memo(
  function CommandApp({ loading, ui, currentCommand }: CommandAppProps) {
    const { data } = useSession()

    console.log('======ui.type:', ui.type)

    if (ui.type === 'marketplace') {
      return <MarketplaceApp />
    }

    if (ui.type === 'pages') {
      if (!data) return <LoginByToken />
      return <PageListApp />
    }

    if (ui.type === 'posts') {
      if (!data) return <LoginByToken />
      return <PostListApp />
    }

    if (ui.type === 'databases') {
      if (!data) return <LoginByToken />
      return <DatabaseListApp />
    }

    if (ui.type === 'settings') {
      return <SettingsApp />
    }

    if (ui.type === 'today') {
      if (!data) return <LoginByToken />
      return <TodayApp />
    }

    // if (ui.type === 'clipboard-history') {
    //   return <ClipboardHistoryApp />
    // }

    return null
  },
  (prev, next) => {
    if (!next.ui || Object.keys(next.ui).length === 0) return true

    if (
      // prev.loading === next.loading &&
      prev.currentCommand?.data?.commandName ===
        next.currentCommand?.data?.commandName &&
      isEqual(prev.ui, next.ui)
    ) {
      return true
    }
    return false
  },
)
