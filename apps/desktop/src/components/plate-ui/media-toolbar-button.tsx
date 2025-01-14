'use client'

import React from 'react'
import { withRef } from '@udecode/cn'
import {
  useMediaToolbarButton,
  type ImagePlugin,
  type MediaEmbedPlugin,
} from '@udecode/plate-media/react'
import { ImageIcon } from 'lucide-react'
import { ToolbarButton } from './toolbar'

export const MediaToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: typeof ImagePlugin.key | typeof MediaEmbedPlugin.key
  }
>(({ nodeType, ...rest }, ref) => {
  const { props } = useMediaToolbarButton({ nodeType })

  return (
    <ToolbarButton ref={ref} {...props} {...rest}>
      <ImageIcon />
    </ToolbarButton>
  )
})
