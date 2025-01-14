import { useSession } from '@penx/session'
import { trpc } from '@penx/trpc-client'

declare enum PostType {
  ARTICLE = 'ARTICLE',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  NFT = 'NFT',
  FIGMA = 'FIGMA',
  NOTE = 'NOTE',
}
declare enum GateType {
  FREE = 'FREE',
  PAID = 'PAID',
}
declare enum PostStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
}

export type IPost = {
  id: string
  title: string
  description: string
  content: any
  slug: string
  cid: string
  nodeId: string
  creationId: number
  type: PostType
  gateType: GateType
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
  status: PostStatus
  featured: boolean
  collectible: boolean
  image: string | null
  commentCount: number
  publishedAt: Date
  archivedAt: Date
  createdAt: Date
  updatedAt: Date
  userId: string
}

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
