import { IPage, IPost } from '@/common/types'
import LoadingDots from '@/components/icons/loading-dots'
import { useQuery } from '@tanstack/react-query'
import { api, trpc } from '@penx/trpc-client'
import { Page } from './Page/Page'

interface PostDetailProps {
  item: IPage
}

export function PageDetail({ item }: PostDetailProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['page', item.id],
    queryFn: async () => {
      const page = await api.page.byId.query(item.id)
      return page as IPage
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-20 ">
        <LoadingDots className="bg-foreground/50"></LoadingDots>
      </div>
    )
  }

  return <Page page={data!} />
}
