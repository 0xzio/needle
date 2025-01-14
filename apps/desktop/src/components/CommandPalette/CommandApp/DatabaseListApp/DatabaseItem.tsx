import { CommandItem } from '@/components/command-components'
import { IDatabase } from '@/lib/model/IDatabase'
import { ArrowRight } from 'lucide-react'

interface DatabaseItemProps {
  item: IDatabase
  onSelect: (item: IDatabase) => void
}

export function DatabaseItem({ item, onSelect }: DatabaseItemProps) {
  function handleSelect(item: IDatabase) {
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
        <div className="text-sm">{item.name}</div>
      </div>

      <div className="flex items-center">
        <ArrowRight size={16} />
      </div>
    </CommandItem>
  )
}
