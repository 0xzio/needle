import { IPost } from '@/common/types'
import { CommandItem } from '@/components/command-components'
import { ArrowRight, DownloadCloud } from 'lucide-react'
import { ListItemIcon } from '../../ListItemIcon'

interface PostItemProps {
  item: IPost
  onSelect: (item: IPost) => void
}

export function PostItem({ item, onSelect }: PostItemProps) {
  function handleSelect(item: IPost) {
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
