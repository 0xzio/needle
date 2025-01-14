import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Box } from '@fower/react'

interface BindingHotkeyProps {}

export const BindingHotkey = ({}: BindingHotkeyProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          size="sm"
          className="w-[160px]"
          placeholder="Set Hotkey"
          // maxW-160
          // borderBrand500={isOpen}
          // border
          // bgAmber100--i={isOpen}
          // ring-1={isOpen}
        />
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Box>Coming soon</Box>
      </PopoverContent>
    </Popover>
  )
}
