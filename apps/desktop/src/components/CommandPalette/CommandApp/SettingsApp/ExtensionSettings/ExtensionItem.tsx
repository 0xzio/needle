import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Box } from '@fower/react'
import { useMutation } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { db } from '@penx/local-db'
import { IExtension } from '@penx/model-types'
import { ExtensionCommands } from './ExtensionCommands'
import { ExtensionIcon } from './ExtensionIcon'
import { useExtensions } from './useExtensions'

interface ExtensionItemProps {
  extension: IExtension
}

export function ExtensionItem({ extension }: ExtensionItemProps) {
  const { refetch } = useExtensions()
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['extension', extension.id],
    mutationFn: () => db.deleteExtension(extension.id),
  })
  const assets = extension?.assets || {}

  const isBuiltin = extension.name.startsWith('$penx_builtin_extension')
  const isDeveloping = extension.name.startsWith('$DEVELOPING-')

  return (
    <Box borderBottom borderNeutral100 pb3>
      <Box toCenterY toBetween>
        <Box toCenterY gap1>
          {/* <ExtensionIcon icon={assets?.[extension.icon!]} /> */}
          <Box>{extension.name}</Box>
          {isDeveloping && (
            <Badge size="sm" className="ml-2">
              Developing
            </Badge>
          )}

          {isBuiltin && (
            <Badge size="sm" className="ml-2">
              Builtin
            </Badge>
          )}
        </Box>
        <Box toCenterY gap1>
          <Button
            size="icon"
            variant="ghost"
            className="-mr-1 rounded-full"
            disabled={isPending || isBuiltin}
            onClick={async () => {
              if (isBuiltin) return
              await mutateAsync()
              refetch()
            }}
          >
            <Trash2 size={16} />
          </Button>
        </Box>
      </Box>
      <ExtensionCommands extension={extension} />
    </Box>
  )
}
