import { IPost } from '@/common/types'
import { useSession } from '@penx/session'
import { trpc } from '@penx/trpc-client'

export function usePosts() {
  const { data: session } = useSession()
  const {
    data = [],
    isLoading,
    ...rest
  } = trpc.post.listSitePosts.useQuery({
    siteId: session?.siteId,
  })

  return {
    ...(rest as Record<string, any>),
    error: rest?.error,
    isLoading: isLoading as boolean,
    posts: data as IPost[],
  }
}
