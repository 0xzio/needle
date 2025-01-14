import { useState } from 'react'
import { CommandGroup } from '@/components/command-components'
import { Skeleton } from '@/components/ui/skeleton'
import { useCommandPosition } from '@/hooks/useCommandPosition'
import { IDatabase } from '@/lib/model/IDatabase'
import { DatabaseDetail } from './DatabaseDetail'
import { DatabaseItem } from './DatabaseItem'
import { useDatabases } from './hooks/useDatabases'

export function DatabaseListApp() {
  const { databases, isLoading, error } = useDatabases()
  const [database, setDatabase] = useState<IDatabase>(null as any)
  const { isCommandAppDetail, setPosition } = useCommandPosition()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        {Array(20)
          .fill('')
          .map((_, index) => (
            <Skeleton key={index} className="h-12" />
          ))}
      </div>
    )
  }

  return (
    <CommandGroup>
      {isCommandAppDetail && <DatabaseDetail item={database} />}
      {!isCommandAppDetail &&
        databases?.map((item) => {
          return (
            <DatabaseItem
              key={item.id}
              item={item}
              onSelect={() => {
                setDatabase(item)
                setPosition('COMMAND_APP_DETAIL')
              }}
            />
          )
        })}
    </CommandGroup>
  )
}
