import { Button } from '@/components/ui/button'
import { useAppMode } from '@/hooks/useAppMode'
import { currentDatabaseAtom } from '@/hooks/useCurrentDatabase'
import { isAddRowAtom } from '@/hooks/useIsAddRow'
import { Box } from '@fower/react'
import { invoke } from '@tauri-apps/api/core'
import {
  getCurrentWebviewWindow,
  WebviewWindow,
} from '@tauri-apps/api/webviewWindow'
import { Plus } from 'lucide-react'
import { db } from '@penx/local-db'
import { store } from '@penx/store'

interface Props {}

export const AddRowButton = ({}: Props) => {
  const { isEditor, setMode } = useAppMode()
  return (
    <Button
      size="lg"
      className="absolute right-2 rounded-full flex items-center gap-1"
      onClick={async () => {
        const appWindow = getCurrentWebviewWindow()
        setMode('EDITOR')

        await invoke('set_window_properties', {
          resizable: true,
          width: 1000.0,
          height: 800.0,
          focus: true,
        })

        await appWindow.center()
        setTimeout(async () => {
          appWindow.setFocus()

          const database = store.get(currentDatabaseAtom)

          let nodes = await db.listNodesBySpaceId(database.spaceId)
          store.node.setNodes(nodes)
          store.node.selectNode(database)
        }, 0)
      }}
    >
      <Box inlineFlex>
        <Plus size={16}></Plus>
      </Box>
      <Box>Add Row</Box>
    </Button>
  )
}
