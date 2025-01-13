import LoadingCircle from '@/components/icons/loading-circle'
import { Button } from '@/components/ui/button'
import { useLoadCommands } from '@/hooks/useItems'
import { Box } from '@fower/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { db } from '@penx/local-db'

interface Props {
  localExtensionId: string
}

export function UninstallExtensionButton({ localExtensionId }: Props) {
  const { refetch: refetchExtensions } = useQuery({
    queryKey: ['extension', 'installed'],
    queryFn: () => db.listExtensions(),
  })

  const { refetch: refetchCommands } = useLoadCommands()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['extension', localExtensionId],
    mutationFn: () => db.deleteExtension(localExtensionId),
  })

  return (
    <Button
      w-90
      className="w-[90px]"
      size="sm"
      // w-80
      disabled={isPending}
      onClick={async () => {
        await mutateAsync()
        refetchExtensions()
        refetchCommands()
      }}
    >
      {isPending && <LoadingCircle />}
      <Box>Uninstall</Box>
    </Button>
  )
}
