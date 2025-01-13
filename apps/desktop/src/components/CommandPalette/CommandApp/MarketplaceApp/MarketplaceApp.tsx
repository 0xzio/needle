import { useState } from 'react'
import { IExtensionItem } from '@/common/types'
import { Skeleton } from '@/components/ui/skeleton'
import { useCommandPosition } from '@/hooks/useCommandPosition'
import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import { RouterOutputs } from '@penx/api'
import { BASE_URL } from '@penx/constants'
import { db } from '@penx/local-db'
import { trpc } from '@penx/trpc-client'
import { StyledCommandGroup } from '../../CommandComponents'
import { ExtensionDetail } from './ExtensionDetail'
import { ExtensionItem } from './ExtensionItem'

export function MarketplaceApp() {
  // const { data = [], isLoading } = useQuery({
  //   queryKey: ['extension', 'all'],
  //   queryFn: async () => {
  //     const res: any[] = await fetch(
  //       `${BASE_URL}/api/trpc/extension.all?batch=1&input=%7B%220%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D`,
  //     ).then((res) => res.json())

  //     return res[0].result.data.json as IExtensionItem[]
  //   },
  // })

  const { data = [], isLoading } = trpc.extension.all.useQuery()

  const { data: extensions = [] } = useQuery({
    queryKey: ['extension', 'installed'],
    queryFn: () => db.listExtensions(),
  })

  const { isCommandAppDetail, setPosition } = useCommandPosition()
  const [extension, setExtension] = useState<IExtensionItem>(null as any)

  if (isLoading)
    return (
      <Box column gap1>
        <Skeleton className="h-18" />
        <Skeleton className="h-18" />
        <Skeleton className="h-18" />
      </Box>
    )

  return (
    <StyledCommandGroup>
      {isCommandAppDetail && (
        <ExtensionDetail item={extension} extensions={extensions} />
      )}
      {!isCommandAppDetail &&
        data?.map((item) => {
          return (
            <ExtensionItem
              key={item.id}
              item={item}
              extensions={extensions}
              onSelect={() => {
                setExtension(item)
                setPosition('COMMAND_APP_DETAIL')
              }}
            />
          )
        })}
    </StyledCommandGroup>
  )
}
