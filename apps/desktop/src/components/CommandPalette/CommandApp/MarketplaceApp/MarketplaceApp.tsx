import { useState } from 'react'
import { IExtensionItem } from '@/common/types'
import { Skeleton } from '@/components/ui/skeleton'
import { useCommandPosition } from '@/hooks/useCommandPosition'
import { useExtensions } from '@/hooks/useExtensions'
import { Box } from '@fower/react'
import { useQuery } from '@tanstack/react-query'
import { db } from '@penx/local-db'
import { StyledCommandGroup } from '../../CommandComponents'
import { ExtensionDetail } from './ExtensionDetail'
import { ExtensionItem } from './ExtensionItem'

export function MarketplaceApp() {
  const { extensions: remoteExtensions, isLoading } = useExtensions()

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
        remoteExtensions?.map((item) => {
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
