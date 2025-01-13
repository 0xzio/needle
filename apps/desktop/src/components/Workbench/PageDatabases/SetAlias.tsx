import { Input } from '@/components/ui/input'
import { db } from '@penx/local-db'
import { IDatabaseNode } from '@penx/model-types'

interface Props {
  database: IDatabaseNode
}

export const SetAlias = ({ database }: Props) => {
  return (
    <Input
      size="sm"
      placeholder="Set Alias"
      className="max-w-[160px]"
      defaultValue={database.props.commandAlias || ''}
      onChange={async (e) => {
        await db.updateDatabaseProps(database.id, {
          commandAlias: e.target.value,
        })
      }}
    />
  )
}
