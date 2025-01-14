import { useState } from 'react'
import { useCurrentCommand } from '@/hooks/useCurrentCommand'
import { Box } from '@fower/react'
import { invoke } from '@tauri-apps/api/core'
import { appEmitter } from '@penx/event'
import { IconLogo } from '@penx/icons'
import { Button } from '../ui/button'
import { ListItemIcon } from './ListItemIcon'
import { ActionPopover } from './SearchBar/ActionPopover'

interface Props {
  footerHeight: number
}

export const CommandPaletteFooter = ({ footerHeight }: Props) => {
  const { currentCommand } = useCurrentCommand()
  return (
    <Box
      data-tauri-drag-region
      h={footerHeight}
      borderTop
      borderNeutral200
      // bg="#F2ECEA"
      // bgWhite
      toCenterY
      px3
      toBetween
    >
      {currentCommand && currentCommand.data.extensionIcon ? (
        <ListItemIcon icon={currentCommand.data.extensionIcon} />
      ) : (
        <IconLogo
          fillBlack
          stroke="black"
          onClick={() => {
            // alert('Please select an extension to open its settings.')
            invoke('toggle_devtools')
          }}
        />
      )}
      <Box
        data-tauri-drag-region
        flex-1
        h-100p
        onClick={() => {
          appEmitter.emit('FOCUS_SEARCH_BAR_INPUT')
        }}
      ></Box>

      <ActionPopover />
    </Box>
  )
}
