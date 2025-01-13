import { IListItem } from 'penx'
import { RouterOutputs } from '@penx/api'
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

export type IExtensionItem = RouterOutputs['extension']['all'][0]

// export type IExtensionItem = {
//   id: string
//   userId: string
//   name: string
//   title: string
//   manifest: string
//   readme: string
//   logo: string
//   installationCount: number
//   starCount: number
//   commentCount: number
//   createdAt: string
//   updatedAt: string
// }
