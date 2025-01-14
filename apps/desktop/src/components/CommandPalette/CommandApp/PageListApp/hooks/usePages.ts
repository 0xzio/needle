import { IPage, IPost } from '@/common/types'
import { useSession } from '@penx/session'
import { trpc } from '@penx/trpc-client'

export function usePages() {
  const { data: session } = useSession()

  const {
    data = [],
    isLoading,
    ...rest
  } = trpc.page.list.useQuery({
    siteId: session?.siteId,
  })

  return {
    ...(rest as Record<string, any>),
    error: rest?.error,
    isLoading: isLoading as boolean,
    pages: data as IPage[],
  }
}
