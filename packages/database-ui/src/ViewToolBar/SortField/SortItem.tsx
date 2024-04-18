import { Box } from '@fower/react'
import { SortAsc } from 'lucide-react'
import { CloseButton, Switch } from 'uikit'
import { Sort } from '@penx/model-types'
import { useDatabaseContext } from '../../DatabaseContext'

interface Props {
  sort: Sort
}
export const SortItem = ({ sort }: Props) => {
  const { currentView, columns, deleteSort } = useDatabaseContext()

  async function removeSort(columnId: string) {
    deleteSort(currentView.id, columnId)
  }

  async function toggleSort(isAscending: boolean) {
    console.log('========isAscending:', isAscending)
  }

  const column = columns.find((col) => col.id === sort.columnId)!

  return (
    <Box toBetween key={sort.columnId}>
      <Box toCenterY gap1>
        <Box textXS gray400>
          Sort by
        </Box>
        <Box textSM>{column?.props.displayName}</Box>
      </Box>
      <Box toCenterY gap2>
        <Box toCenterY textXS gray400 gap1>
          <Switch
            size={12}
            checked={sort.isAscending}
            onChange={(e) => toggleSort(e.target.checked)}
          >
            Ascending
          </Switch>
        </Box>
        <CloseButton size={20} onClick={() => removeSort(sort.columnId)} />
      </Box>
    </Box>
  )
}
