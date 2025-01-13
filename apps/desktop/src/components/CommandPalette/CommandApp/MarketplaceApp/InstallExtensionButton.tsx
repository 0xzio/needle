import { fetchInstallationJSON } from '@/common/fetchInstallationJSON'
import { IExtensionItem } from '@/common/types'
import LoadingCircle from '@/components/icons/loading-circle'
import { Button } from '@/components/ui/button'
import { useLoadCommands } from '@/hooks/useItems'
import { Box } from '@fower/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { db } from '@penx/local-db'
import { Manifest } from '@penx/model'
import { api } from '@penx/trpc-client'

interface Props {
  item: IExtensionItem
}

export function InstallExtensionButton({ item }: Props) {
  const manifest = new Manifest(item.manifest as any)

  const { refetch: refetchExtensions } = useQuery({
    queryKey: ['extension', 'installed'],
    queryFn: () => db.listExtensions(),
  })

  const { refetch: refetchCommands } = useLoadCommands()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['extension', item.id],
    mutationFn: async () => {
      const json = await fetchInstallationJSON(manifest.name)

      if (json) {
        const { name, ...data } = json
        await db.upsertExtension(name, data as any)
        await refetchCommands()
      }
    },
  })

  return (
    <Button
      className="w-[90px]"
      size="sm"
      disabled={isPending}
      onClick={async () => {
        try {
          await mutateAsync()
          await refetchExtensions()
          await api.extension.increaseInstallationCount.mutate({
            name: manifest.name,
          })
        } catch (error) {
          console.log('install error', error)
        }
      }}
    >
      {isPending && <LoadingCircle />}
      <Box>Install</Box>
    </Button>
  )
}
