import { Box } from '@fower/react'
import { useModalContext } from 'uikit'
import { SettingsType } from '@penx/constants'
import { AccountSettings } from '../AccountSettings/AccountSettings'
// import { LocalBackup } from '../LocalBackup/LocalBackup'
import { SpaceSettings } from '../SpaceSettings/SpaceSettings'

export const SettingsContent = () => {
  const { data } = useModalContext<{ type: SettingsType; spaceId?: string }>()
  const { type, spaceId = '' } = data

  return (
    <Box p10 flex-1 overflow={['auto']}>
      {type === SettingsType.ACCOUNT_SETTINGS && <AccountSettings />}
      {type === SettingsType.SPACE && <SpaceSettings spaceId={spaceId} />}
    </Box>
  )
}
