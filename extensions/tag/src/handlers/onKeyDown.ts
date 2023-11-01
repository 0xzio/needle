import { someNode } from '@penx/editor-queries'
import { OnKeyDown } from '@penx/extension-typings'
import { isTag } from '../isTag'
import { keyDownEmitter } from '../keyDownEmitter'

export const onKeyDown: OnKeyDown = (editor, e) => {
  // if block selector popover is open
  const somePopoverNode = () =>
    someNode(editor, {
      match: (n) => isTag(n),
    })

  const { key } = e

  switch (key) {
    case 'ArrowUp':
      if (somePopoverNode()) {
        e.preventDefault()
        keyDownEmitter.emit('ArrowUp')
      }

      break
    case 'ArrowDown':
      if (somePopoverNode()) {
        e.preventDefault()
        keyDownEmitter.emit('ArrowDown')
      }

      break
    case 'Enter':
      if (somePopoverNode()) {
        e.preventDefault()
        keyDownEmitter.emit('Enter')
      }

      break
  }
}
