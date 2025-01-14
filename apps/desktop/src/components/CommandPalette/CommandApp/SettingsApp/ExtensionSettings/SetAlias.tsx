import { Input } from '@/components/ui/input'
import { db } from '@penx/local-db'
import { IExtension } from '@penx/model-types'

interface Props {
  command: IExtension['commands'][0]
  extension: IExtension
}

export const SetAlias = ({ command, extension }: Props) => {
  return (
    <Input
      size="sm"
      className="text-xs max-w-[100px]"
      placeholder="Set Alias"
      defaultValue={command.alias || ''}
      onChange={async (e) => {
        await db.updateCommandAlias(extension.id, command.name, e.target.value)
      }}
    />
  )
}
