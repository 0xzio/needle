import { CommandGroup } from '@/components/command-components'
import { Skeleton } from '@/components/ui/skeleton'
import { usePosts } from '@/hooks/usePosts'
import { open } from '@tauri-apps/plugin-shell'
import { PostItem } from './PostItem'

export function PostListApp() {
  const { posts, isLoading, error } = usePosts()

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
    <CommandGroup>
      {posts?.map((item) => {
        return (
          <PostItem
            key={item.id}
            item={item}
            onSelect={() => {
              // setExtension(item)
              // setPosition('COMMAND_APP_DETAIL')
            }}
          />
        )
      })}
    </CommandGroup>
  )
}
