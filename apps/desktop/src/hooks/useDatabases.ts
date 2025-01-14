import { IDatabase } from '@/lib/model/IDatabase'
import { useQuery } from '@tanstack/react-query'
import { useSession } from '@penx/session'
import { api } from '@penx/trpc-client'

export function useDatabases() {
  const { data: session } = useSession()
  return useQuery({
    queryKey: ['databases'],
    queryFn: async () => {
      const list = await api.database.list.query({
        siteId: session?.siteId,
      })
      return list as IDatabase[]
    },
    enabled: !!session?.siteId,
  })
}
