import isEqual from 'react-fast-compare'
import { format } from 'date-fns'
import { atom } from 'jotai'
import { ELEMENT_TODO, TODO_DATABASE_NAME } from '@penx/constants'
import { ArraySorter, db, getCommonNode, getNewNode } from '@penx/local-db'
import { Node } from '@penx/model'
import {
  EditorMode,
  ICellNode,
  IColumnNode,
  IDatabaseNode,
  IDatabaseRootNode,
  INode,
  IOptionNode,
  IRootNode,
  IRowNode,
  ISpace,
  IViewNode,
  NodeType,
  ViewType,
} from '@penx/model-types'
import { StoreType } from '../store-types'

type FindOptions<T = INode> = {
  where?: Partial<T>
  limit?: number
  orderByDESC?: boolean
  sortBy?: keyof T
}

export type TodoRecord = {
  row: IRowNode
  sourceNode: Node
  todoNode: Node
}

export const nodesAtom = atom<INode[]>([])

export const activeNodesAtom = atom<INode[]>([])

export class NodeStore {
  constructor(private store: StoreType) {}

  getNodes() {
    return this.store.get(nodesAtom)
  }

  setNodes(nodes: INode[]) {
    return this.store.set(nodesAtom, nodes)
  }

  setActiveNodes(nodes: INode[]) {
    return this.store.set(activeNodesAtom, nodes)
  }

  getActiveNodes() {
    return this.store.get(activeNodesAtom)
  }

  setFirstActiveNodes(node: INode) {
    const [_, ...activeNodes] = this.getActiveNodes()
    const newActiveNodes = [node, ...activeNodes]
    this.setActiveNodes([...newActiveNodes])
    return newActiveNodes
  }

  getNode(id: string) {
    const nodes = this.getNodes()
    return nodes.find((node) => node.id === id)!
  }

  getTodayNode = () => {
    let nodes = this.getNodes()
    return nodes.find((node) => node.date === format(new Date(), 'yyyy-MM-dd'))!
  }

  getRootNode = () => {
    let nodes = this.getNodes()
    const node = nodes.find((node) => node.type === NodeType.ROOT)!
    return node as IRootNode
  }

  getDatabaseRootNode = () => {
    const nodes = this.getNodes()
    return nodes.find(
      (node) => node.type === NodeType.DATABASE_ROOT,
    ) as IDatabaseRootNode
  }

  getDatabaseNodes = () => {
    const node = this.getDatabaseRootNode()
    if (!node?.children) return []
    return node.children.map((id) => this.getNode(id) as IDatabaseNode)
  }

  getDatabaseByName(tagName: string) {
    const nodes = this.getNodes()

    let databaseNode = nodes.find(
      (node) => node.type === NodeType.DATABASE && node.props.name === tagName,
    )

    return databaseNode
  }

  getDatabase(id: string) {
    const space = this.store.space.getActiveSpace()
    const database = this.getNode(id) as IDatabaseNode
    const columns = this.find({
      where: {
        type: NodeType.COLUMN,
        spaceId: space.id,
        databaseId: id,
      },
    }) as IColumnNode[]

    const rows = this.find({
      where: {
        type: NodeType.ROW,
        spaceId: space.id,
        databaseId: id,
      },
      sortBy: 'createdAt',
      orderByDESC: false,
    }) as IRowNode[]

    const views = (
      this.find({
        where: {
          type: NodeType.VIEW,
          spaceId: space.id,
          databaseId: id,
        },
      }) as IViewNode[]
    ).sort((a, b) => (a.props.viewType === ViewType.TABLE ? -1 : 1))

    const cells = this.find({
      where: {
        type: NodeType.CELL,
        spaceId: space.id,
        databaseId: id,
      },
    }) as ICellNode[]

    const options = this.find({
      where: {
        type: NodeType.OPTION,
        spaceId: space.id,
        databaseId: id,
      },
    }) as IOptionNode[]

    return {
      database,
      views,
      columns,
      rows,
      cells,
      options,
    }
  }

  getCells(databaseId: string) {
    const nodes = this.getNodes()
    let cells = nodes.filter(
      (node) => node.type === NodeType.CELL && node.parentId === databaseId,
    )
    return cells as ICellNode[]
  }

  getTodos() {
    let records: TodoRecord[] = []

    const todo = this.getDatabaseByName(TODO_DATABASE_NAME)
    if (!todo) return []

    const database = this.getDatabase(todo.id)

    for (const row of database.rows) {
      const rowCells = database.cells.filter((c) => c.props.rowId === row.id)!

      const sourceCell = rowCells.find((c) => c.props.data?.isTodoSource)

      if (!sourceCell) continue

      const sourceNode = this.getNode(sourceCell.props.data?.sourceId || '')

      if (!sourceNode) continue

      const todoCell = rowCells.find((c) => !!c.props.ref)

      if (!todoCell) continue

      const todoNode = this.getNode(todoCell.props.ref)

      if (!todoNode) continue

      records.push({
        row,
        sourceNode: new Node(sourceNode),
        todoNode: new Node(todoNode),
      })
    }
    return records
  }

  async selectNode(node: INode, index = 0, shouldCompare = true) {
    if (!this.store.router.isNode()) this.store.router.toNode()

    const activeNodes = this.getActiveNodes()

    if (
      shouldCompare &&
      index === 0 &&
      isEqual(activeNodes[0], node) &&
      this.store.router.isNode()
    ) {
      console.log('is equal node')
      return
    }

    // const editor = this.store.editor.getEditor(index)
    // const nodes = this.getNodes()
    // const activeSpace = this.store.space.getActiveSpace()
    // const isOutliner = activeSpace.editorMode === EditorMode.OUTLINER
    // const value = nodeToSlate(node, nodes, isOutliner)

    // TODO: the good way  is to clear the editor, but now has bug
    this.setActiveNodes([])
    setTimeout(async () => {
      this.setActiveNodes([node])

      // clearEditor(editor)
      // Transforms.insertNodes(editor, value)

      const newActiveNodes = this.setFirstActiveNodes(node)

      await db.updateSpace(this.store.space.getActiveSpace().id, {
        activeNodeIds: newActiveNodes.map((node) => node.id),
      })
    }, 20)
  }

  async selectInbox() {
    const space = this.store.space.getActiveSpace()
    let node = await db.getInboxNode(space.id)

    this.selectNode(node)
  }

  async selectTagBox() {
    const space = this.store.space.getActiveSpace()
    let node = await db.getDatabaseRootNode(space.id)

    this.selectNode(node)
  }

  async selectTrash() {
    const space = this.store.space.getActiveSpace()
    let node = await db.getTrashNode(space.id)

    this.selectNode(node)
  }

  // select the space root node
  async selectSpaceNode() {
    const space = this.store.space.getActiveSpace()
    let node = await db.getSpaceNode(space.id)

    this.selectNode(node)
  }

  async deleteNode(id: string) {
    const space = this.store.space.getActiveSpace()
    const node = this.store.node.getNode(id)
    await db.deleteNode(id)
    if (node.parentId) {
      // update parentNode children
      const parentNode = this.store.node.getNode(node.parentId)
      await db.updateNode(node.parentId, {
        children: parentNode.children.filter(
          (childId) => childId !== id && this.store.node.getNode(childId),
        ),
      })
    }

    const nodes = await db.listNodesBySpaceId(space.id)
    const todayNode = await db.getOrCreateTodayNode(space.id)
    this.setNodes(nodes)
    this.selectNode(todayNode)
  }

  async addTodo(text: string, isInTodoPage = false) {
    const space = this.store.space.getActiveSpace()

    const newNode = getCommonNode({
      spaceId: space.id,
      date: format(new Date(), 'yyyy-MM-dd'),
      element: [{ type: ELEMENT_TODO, children: [{ text }] }],
    })

    const todyNode = this.getTodayNode()

    await db.addNodesToToday(space.id, [newNode])

    await db.createTodoRow(space.id, newNode.id, todyNode.id)

    const nodes = await db.listNodesBySpaceId(space.id)

    console.log('=======isInTodoPage:', isInTodoPage)

    if (!isInTodoPage) {
      const newTodayNode = await db.getOrCreateTodayNode(space.id)

      this.selectNode(newTodayNode)
    }

    this.setNodes(nodes)
  }

  async openInNewPanel(nodeId: string) {
    const nodes = this.getNodes()
    const node = nodes.find((n) => n.id === nodeId)!
    const activeNodes = this.getActiveNodes()

    const newActiveNodes = [...activeNodes, node]
    this.setActiveNodes([...newActiveNodes])

    const space = this.store.space.getActiveSpace()
    await db.updateSpace(space.id, {
      activeNodeIds: newActiveNodes.map((node) => node.id),
    })
  }

  async closePanel(index: number) {
    const activeNodes = this.getActiveNodes()
    const newActiveNodes = activeNodes.filter((_, i) => i !== index)
    this.setActiveNodes([...newActiveNodes])

    const space = this.store.space.getActiveSpace()
    await db.updateSpace(space.id, {
      activeNodeIds: newActiveNodes.map((node) => node.id),
    })
  }

  async selectDailyNote(date: Date = new Date()) {
    const dateStr = format(date, 'yyyy-MM-dd')

    const space = this.store.space.getActiveSpace()
    const newNodes = await db.listNodesBySpaceId(space.id)

    let dateNode = newNodes.find(
      (node) => node.type === NodeType.DAILY && node.date === dateStr,
    )

    if (!dateNode) {
      dateNode = await db.createDailyNode({
        spaceId: space.id,
        date: dateStr,
      })
    }

    this.setNodes(newNodes)
    this.selectNode(dateNode)
  }

  async addTextToToday(text: string) {
    const space = this.store.space.getActiveSpace()
    const { todayNode } = await db.addTextToToday(space.id, text)
    const nodes = await db.listNodesBySpaceId(space.id)

    this.setNodes(nodes)
    this.selectNode(todayNode)
  }

  async addNodesToToday(nodes: INode[]) {
    const space = this.store.space.getActiveSpace()
    // const { todayNode } = await db.addTextToToday(space.id, text)
    console.log('===============nodes', nodes)

    // const newNodes = await db.listNodesBySpaceId(space.id)

    // this.setNodes(newNodes)
    // this.selectNode(todayNode)
  }

  async importSpace(space: ISpace, nodes: INode[] = []) {
    await db.createSpace(space, false)
    for (const node of nodes) {
      await db.createNode(node)
    }

    const activeNodes = space.activeNodeIds.map((id) => {
      return nodes.find((n) => n.id === id)!
    })

    const spaces = await db.listSpaces()

    this.store.space.setSpaces(spaces)
    this.store.router.toNode()
    this.store.node.setNodes(nodes)
    this.store.node.setActiveNodes(activeNodes)
    this.store.node.selectNode(activeNodes[0])
  }

  async createPageNode(input: Partial<INode> = {}) {
    const space = this.store.space.getActiveSpace()
    const node = await db.createPageNode(
      {
        collapsed: true,
        spaceId: space.id,
        ...input,
      },
      space,
    )

    const nodes = await db.listNodesBySpaceId(space.id)

    this.setNodes(nodes)
    this.selectNode(node)
    return node
  }

  async createDatabase(spaceId: string, name: string, shouldInitCells = false) {
    const nodes = this.getNodes()

    let databaseNode = nodes.find(
      (node) => node.type === NodeType.DATABASE && node.props.name === name,
    )

    if (!databaseNode) {
      databaseNode = await db.createDatabase({
        spaceId,
        name,
        shouldInitCells,
      })
    }

    const newNodes = await db.listNodesBySpaceId(databaseNode.spaceId)
    this.setNodes(newNodes)

    return databaseNode
  }

  find(options: FindOptions = {}): INode[] {
    const data = this.getNodes()
    let result: INode[] = []

    // handle where
    if (Reflect.has(options, 'where') && options.where) {
      const whereKeys = Object.keys(options.where)

      result = data.filter((item) => {
        const dataKeys = Object.keys(item)

        const every = whereKeys.every((key) => {
          return (
            dataKeys.includes(key) &&
            (item as any)[key] === (options.where as any)[key]
          )
        })

        return every
      })

      // handle sortBy
      if (Reflect.has(options, 'sortBy') && options.sortBy) {
        // sort data
        result = new ArraySorter<INode>(result).sortBy({
          desc: Reflect.has(options, 'orderByDESC') && options.orderByDESC,
          keys: [options.sortBy as string],
        })
      }

      if (Reflect.has(options, 'limit') && options.limit) {
        // slice data
        result = result.slice(0, +options.limit)
      }
    }

    return result
  }
}
