import { isSyncEnabled, LOCAL_USER_ID } from '@penx/constants'
import { db } from '@penx/local-db'
import { Node, Space } from '@penx/model'
import { ISpace } from '@penx/model-types'
import {
  getActiveSpaceId,
  getAuthorizedUser,
  getLocalSession,
  setActiveSpaceId,
} from '@penx/storage'
import { store } from '@penx/store'

export class AppService {
  inited = false

  private async tryToGetActiveSpace(): Promise<{
    activeSpace: ISpace
    spaces: ISpace[]
  }> {
    const session = await getLocalSession()
    let spaces = await db.listSpaces(session?.id, session)
    let activeSpace: ISpace

    if (session) {
      const activeSpaceId = await getActiveSpaceId()

      const space = spaces.find((space) => space.id === activeSpaceId)
      if (space) {
        activeSpace = space
      } else {
        activeSpace = spaces[0]
        await setActiveSpaceId(activeSpace.id)
      }
    } else {
      activeSpace = spaces.find((item) => item.userId === LOCAL_USER_ID)!

      if (!activeSpace) {
        activeSpace = await db.createLocalSpace()
        spaces = await db.listSpaces(undefined, session)
      }
    }

    return { activeSpace, spaces }
  }

  async init() {
    try {
      console.log('app init....')

      this.inited = true

      const { activeSpace, spaces } = await this.tryToGetActiveSpace()

      let nodes = await db.listNodesBySpaceId(activeSpace.id)

      store.space.setActiveSpace(activeSpace)
      store.space.setSpaces(spaces)

      // console.log('appService=======nodes:', nodes)

      // get nodesLastUpdatedAt and try to pull from cloud

      if (nodes.length) {
        const todayNode = await db.getNodeByDate(activeSpace.id)

        if (!todayNode) {
          await this.createAndGoToTodayNode(activeSpace.id)
          store.app.setAppLoading(false)
          return
        }

        let activeNodes = activeSpace.activeNodeIds
          .map((id) => {
            return nodes.find((n) => n.id === id)!
          })
          .filter((n) => !!n)

        store.node.setNodes(nodes)

        // if (!activeNodes.length) {
        //   const rootNode = nodes.find((n) => new Node(n).isRootNode)!

        //   store.node.selectNode(rootNode)
        // } else {
        //   store.node.setActiveNodes(activeNodes)
        // }

        console.log('====store.router.getName():', store.router.getName())

        if (!store.router.getName()) {
          store.router.routeTo('GENERAL')
        }
      }

      store.app.setAppLoading(false)
    } catch (error) {
      console.log('===========app init error:', error)
      // TODO: fallback to old data
      store.app.setAppLoading(false)
    }
  }

  private async createAndGoToTodayNode(spaceId: string) {
    const todayNode = await db.getOrCreateTodayNode(spaceId)
    const nodes = await db.listNodesBySpaceId(spaceId)
    store.node.setNodes(nodes)
    store.node.selectNode(todayNode)
  }

  private async tryToSync(space: ISpace) {}
}
