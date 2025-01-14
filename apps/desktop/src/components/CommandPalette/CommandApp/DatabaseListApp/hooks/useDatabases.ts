import { IDatabase } from '@/lib/model/IDatabase'
import { useSession } from '@penx/session'
import { trpc } from '@penx/trpc-client'

export function useDatabases() {
  const { data: session } = useSession()

  const {
    data = [],
    isLoading,
    ...rest
  } = trpc.database.list.useQuery({
    siteId: session?.siteId,
  })

  return {
    ...(rest as Record<string, any>),
    error: rest?.error,
    isLoading: isLoading as boolean,
    databases: data as IDatabase[],
  }
}
