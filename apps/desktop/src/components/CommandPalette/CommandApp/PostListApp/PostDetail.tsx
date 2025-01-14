import { IPost } from '@/common/types'
import LoadingDots from '@/components/icons/loading-dots'
import { useQuery } from '@tanstack/react-query'
import { api, trpc } from '@penx/trpc-client'
import { Post } from './Post/Post'

interface PostDetailProps {
  item: IPost
}

export function PostDetail({ item }: PostDetailProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['post', item.slug],
    queryFn: async () => {
      const post = await api.post.bySlug.query(item.slug)
      return post as IPost
    },
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-20 ">
        <LoadingDots className="bg-foreground/50"></LoadingDots>
      </div>
    )
  }

  return <Post post={item} />
}
