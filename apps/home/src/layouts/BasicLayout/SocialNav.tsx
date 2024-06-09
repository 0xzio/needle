import { ReactNode } from 'react'
import { Box } from '@fower/react'
import { IconDiscord, IconGitHub, IconTwitter } from '@penx/icons'
import { StyledLink } from '~/components/StyledLink'

type NavItem = {
  text?: ReactNode
  icon?: ReactNode
  to: string
  isExternal?: boolean
}

export const SocialNav = () => {
  const navData: NavItem[] = [
    {
      icon: <IconDiscord fillBlack fillWhite--dark />,
      to: 'https://discord.gg/nyVpH9njDu',
      isExternal: true,
    },
    {
      icon: <IconTwitter black size={20} />,
      to: 'https://twitter.com/coder_zion',
      isExternal: true,
    },
    {
      icon: <IconGitHub black />,
      to: 'https://github.com/penxio/penx',
      isExternal: true,
    },
  ]

  return (
    <Box listNone toCenterY gap6 textBase display={['none', 'flex']}>
      {navData.map((item, i) => {
        if (item.isExternal) {
          return (
            <Box key={i}>
              <Box
                as="a"
                href={item.to}
                target="_blank"
                cursorPointer
                gray600
                toCenterY
                gap1
                brand500--hover
                noUnderline
                transitionCommon
              >
                {item.text && <Box>{item.text}</Box>}
                {!!item.icon && item.icon}
                {/* <Box inlineFlex>
                  <ExternalLink size={16}></ExternalLink>
                </Box> */}
              </Box>
            </Box>
          )
        }

        return (
          <Box key={i}>
            <StyledLink href={item.to} gray600 brand500--hover transitionCommon>
              {item.text}
            </StyledLink>
          </Box>
        )
      })}
    </Box>
  )
}
