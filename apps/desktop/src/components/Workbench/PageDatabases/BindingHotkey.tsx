import { Input } from '@/components/ui/input'
import { Box } from '@fower/react'
import { IDatabaseNode } from '@penx/model-types'

interface BindingHotkeyProps {
  database: IDatabaseNode
}

export const BindingHotkey = ({ database }: BindingHotkeyProps) => {
  return null
  // return (
  //   <Popover>
  //     <PopoverTrigger>
  //       {({ isOpen }) => (
  //         <Input
  //           size="sm"
  //           placeholder="Set Hotkey"
  //           borderBrand500={isOpen}
  //           border
  //           bgAmber100--i={isOpen}
  //           // ring-1={isOpen}
  //         />
  //       )}
  //     </PopoverTrigger>
  //     <PopoverContent p4>
  //       <Box>Coming soon</Box>
  //     </PopoverContent>
  //   </Popover>
  // )
}
