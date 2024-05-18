import { Box } from '@fower/react'
import { WORKBENCH_NAV_HEIGHT } from '@penx/constants'
import { useNodeContext } from '@penx/node-hooks'
import { PaletteDrawer } from '../PaletteDrawer'
import { Breadcrumb } from './Breadcrumb'
import { ClosePanelButton } from './ClosePanelButton'
import { FavoriteButton } from './FavoriteButton'
import { MorePopover } from './MorePopover'
import { PublishPopover } from './PublishPopover'

export const PCNav = () => {
  const { node } = useNodeContext()

  if (!node) return null
  return (
    <Box
      data-tauri-drag-region
      h={WORKBENCH_NAV_HEIGHT}
      sticky
      top0
      toCenterY
      toBetween
      pl12
      pr2
      display={['none', 'none', 'inline-flex']}
      w-100p
      bgWhite
      zIndex-10
    >
      {node && <Breadcrumb />}

      <Box>
        {/* <PublishPopover /> */}
        <FavoriteButton />
        <ClosePanelButton />
        {/* <MorePopover /> */}
      </Box>
    </Box>
  )
}
