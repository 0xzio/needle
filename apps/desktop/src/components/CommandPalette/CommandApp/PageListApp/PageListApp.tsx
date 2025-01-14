import { useState } from 'react'
import { IPage, IPost } from '@/common/types'
import { CommandGroup } from '@/components/command-components'
import { Skeleton } from '@/components/ui/skeleton'
import { useCommandPosition } from '@/hooks/useCommandPosition'
import { usePages } from './hooks/usePages'
import { PageDetail } from './PageDetail'
import { PageItem } from './PageItem'

export function PageListApp() {
  const { pages, isLoading, error } = usePages()
  const [page, setPage] = useState<IPage>(null as any)
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
      {isCommandAppDetail && <PageDetail item={page} />}
      {!isCommandAppDetail &&
        pages?.map((item) => {
          return (
            <PageItem
              key={item.id}
              item={item}
              onSelect={() => {
                setPage(item)
                setPosition('COMMAND_APP_DETAIL')
              }}
            />
          )
        })}
    </CommandGroup>
  )
}
