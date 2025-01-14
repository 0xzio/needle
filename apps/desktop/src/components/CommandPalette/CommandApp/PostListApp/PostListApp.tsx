import { useState } from 'react'
import { IPost } from '@/common/types'
import { CommandGroup } from '@/components/command-components'
import { usePosts } from '@/components/CommandPalette/CommandApp/PostListApp/hooks/usePosts'
import { Skeleton } from '@/components/ui/skeleton'
import { useCommandPosition } from '@/hooks/useCommandPosition'
import { PostDetail } from './PostDetail'
import { PostItem } from './PostItem'

export function PostListApp() {
  const { posts, isLoading, error } = usePosts()
  const [post, setPost] = useState<IPost>(null as any)
  const { isCommandAppDetail, setPosition } = useCommandPosition()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        {Array(20)
          .fill('')
          .map((_, index) => (
            <Skeleton key={index} className="h-12" />
          ))}
      </div>
    )
  }

  return (
    <div>
      {isCommandAppDetail && <PostDetail item={post} />}
      {!isCommandAppDetail &&
        posts?.map((item) => {
          return (
            <PostItem
              key={item.id}
              item={item}
              onSelect={() => {
                setPost(item)
                setPosition('COMMAND_APP_DETAIL')
              }}
            />
          )
        })}
    </div>
    // <CommandGroup>
    // </CommandGroup>
  )
}
