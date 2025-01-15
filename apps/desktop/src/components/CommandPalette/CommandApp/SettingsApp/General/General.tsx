import { BindAppHotkey } from '@/components/BindAppHotkey'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Box, styled } from '@fower/react'
import { invoke } from '@tauri-apps/api/core'
import { db } from '@penx/local-db'
import { ThemeModeSelect } from './ThemeModeSelect'

interface Props {}

const Label = styled('div', ['neutral400', 'textXS'])
const Item = styled('div', ['neutral700', 'column', 'gap3'])

export const General = ({}: Props) => {
  return (
    <Box column gap8>
      <Box neutral900 fontMedium>
        General
      </Box>
      <Item>
        <Label>PenX Hotkey</Label>
        <BindAppHotkey />
      </Item>
      <Item>
        <Label>Theme Mode</Label>
        <ThemeModeSelect />
      </Item>

      <Item>
        <Label>Startup</Label>
        <div className="flex items-center gap-2">
          <Checkbox></Checkbox>
          <div>Auto launch PenX on startup</div>
        </div>
      </Item>

      <div>
        <Button
          size="sm"
          variant="outline"
          onClick={async () => {
            await invoke('open_devtools')
          }}
        >
          Open devtools
        </Button>
      </div>
    </Box>
  )
}
