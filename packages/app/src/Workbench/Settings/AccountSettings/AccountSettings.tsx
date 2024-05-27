import { Box } from '@fower/react'
import { Divider, Tag } from 'uikit'
import { useSession } from '@penx/session'
import { PersonalToken } from './PersonalToken'
import { UpdatePassword } from './UpdatePassword'

export function AccountSettings() {
  const { data } = useSession()
  return (
    <Box>
      <Box toCenterY gap2>
        <Box text2XL fontBold>
          Account Settings
        </Box>

        <Tag
          variant="light"
          colorScheme="gray400"
          display={['none', 'none', 'flex']}
        >
          {data.userId}
        </Tag>
      </Box>

      <PersonalToken />
      <UpdatePassword />
    </Box>
  )
}
