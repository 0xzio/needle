import { IPage } from '@/common/types'
import { IBlock } from '../model/IBlock'

/**
 * page to slate
 */
export function pageToSlate(page: IPage) {
  const serializer = new PageToSlateSerializer(page)
  return serializer.getEditorValue()
}

export class PageToSlateSerializer {
  blockMap = new Map<string, IBlock>()

  constructor(private page: IPage) {
    const blocks = page.blocks as any as IBlock[]

    for (const item of blocks) {
      this.blockMap.set(item.id, item)
    }
  }

  getEditorValue() {
    return this.getBlockContent()
  }

  getBlockContent() {
    const value: any[] = []

    const blockIds = this.page.children as string[]
    for (const id of blockIds) {
      const block = this.blockMap.get(id)!
      if (!block) continue
      value.push({
        ...(block.content as any),
        id: block.id,
      })
    }

    return value
  }
}
