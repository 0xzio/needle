import { Box } from '@fower/react'
import { Logo } from '@penx/widget'
import { LoginByTokenForm } from './LoginByTokenForm'

export const LoginByToken = () => {
  return (
    <Box>
      <Box mx-auto className="nav" toCenter py3 px={[18, 0]}>
        <Logo />
      </Box>

      <Box fontBold text3XL mb6 textCenter>
        Login to PenX
      </Box>

      <Box column toCenterX gap2 mb4>
        <Box gray600 textLG textCenter>
          Login to https://penx.io，get a token from user settings，then use
          token to login to App
        </Box>
      </Box>

      <LoginByTokenForm />
    </Box>
  )
}
