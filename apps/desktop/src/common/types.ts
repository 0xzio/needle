import { IListItem } from 'penx'
import { FilterItem, IDatabaseNode } from '@penx/model-types'

export interface ICommandItem extends IListItem {
  keywords: string[]
  data: {
    type: 'Database' | 'Command' | 'Application'
    alias: string
    database: IDatabaseNode
    assets: Record<string, string>
    filters: Record<string, FilterItem[]>
    runtime: 'worker' | 'iframe'
    commandName: string
    extensionSlug: string
    extensionIcon: string
    isDeveloping: boolean

    applicationPath: string
    isApplication: boolean
    appIconPath?: string
  }
}

export type IExtensionItem = {
  id: string
  userId: string
  name: string
  title: string
  manifest: string
  readme: string
  logo: string
  installationCount: number
  starCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
}

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
