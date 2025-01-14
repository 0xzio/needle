import { IPage } from '@/common/types'
import { CommandItem } from '@/components/command-components'
import { ArrowRight } from 'lucide-react'
import { ListItemIcon } from '../../ListItemIcon'

interface PostItemProps {
  item: IPage
  onSelect: (item: IPage) => void
}

export function PageItem({ item, onSelect }: PostItemProps) {
  function handleSelect(item: IPage) {
    onSelect(item)
  }

  return (
    <CommandItem
      key={item.id}
      className="py-2 justify-between"
      value={item.id}
      onSelect={() => handleSelect(item)}
      onClick={() => handleSelect(item)}
    >
      <div className="flex items-center gap-2">
        {/* <ListItemIcon icon={icon} /> */}
        <div className="text-sm">{item.title}</div>
      </div>

      <div className="flex items-center">
        <ArrowRight size={16} />
      </div>
    </CommandItem>
  )
}
