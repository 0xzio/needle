import { useEffect, useState } from 'react'
import { Box } from '@fower/react'
import { Command } from 'cmdk'
import { useCommandAppLoading } from '~/hooks/useCommandAppLoading'
import { useCommandAppUI } from '~/hooks/useCommandAppUI'
import { useCommandPosition } from '~/hooks/useCommandPosition'
import { useCurrentCommand } from '~/hooks/useCurrentCommand'
import { useHandleSelect } from '~/hooks/useHandleSelect'
import { useItems, useQueryCommands } from '~/hooks/useItems'
import { useReset } from '~/hooks/useReset'
import { CommandApp } from './CommandApp/CommandApp'
import { StyledCommand, StyledCommandList } from './CommandComponents'
import { CommandPaletteFooter } from './CommandPaletteFooter'
import { ListItemUI } from './ListItemUI'
import { SearchBar } from './SearchBar'

const code = `
document.body.innerHTML = '<div>hello world</div>'
`

const windowHeight = 470
const searchBarHeight = 54
const footerHeight = 40
const bodyHeight = windowHeight - searchBarHeight - footerHeight

export const CommandPalette = () => {
  const [q, setQ] = useState('')
  const { developingItems, productionItems } = useItems()

  // console.log('========items:', items)

  // console.log(
  //   '=========developingItems, productionItems:',
  //   developingItems,
  //   productionItems,
  // )

  const { isRoot, isCommandApp } = useCommandPosition()
  const { currentCommand } = useCurrentCommand()
  const { ui } = useCommandAppUI()
  const { loading } = useCommandAppLoading()

  const handleSelect = useHandleSelect()

  useQueryCommands()

  useReset(setQ)

  return (
    <StyledCommand
      id="command-palette"
      label="Command Menu"
      className="command-panel"
      // shadow="0 16px 70px rgba(0,0,0,.2)"
      w={['100%']}
      column
      absolute
      top-0
      left0
      right0
      bottom0
      zIndex-10000
      // bg="#F6F2F0"
      bgWhite
      style={
        {
          // backdropFilter: 'blur(200px)',
        }
      }
      loop
      filter={(value, search) => {
        // console.log('value:', value, 'search:', search)
        return 1
      }}
    >
      <SearchBar searchBarHeight={searchBarHeight} q={q} setQ={setQ} />
      <Box h={bodyHeight} overflowAuto relative>
        {isCommandApp &&
          currentCommand &&
          (currentCommand.data.runtime === 'iframe' ? (
            <Box relative h-100p>
              <Box
                as="iframe"
                id="command-app-iframe"
                width="100%"
                height="100%"
                p0
                m0
                absolute
                top0
                // src='https://penx.io'
              ></Box>
            </Box>
          ) : (
            <CommandApp
              loading={loading}
              ui={ui}
              currentCommand={currentCommand}
            />
          ))}

        {isRoot && (
          <>
            <StyledCommandList p2>
              {developingItems.length > 0 && (
                <Command.Group heading="Development">
                  {developingItems.map((item, index) => {
                    return (
                      <ListItemUI
                        key={index}
                        index={index}
                        item={item}
                        onSelect={(item) => handleSelect(item)}
                      />
                    )
                  })}
                </Command.Group>
              )}
              <Command.Group heading={isRoot ? 'Suggestions' : undefined}>
                {isRoot &&
                  productionItems.map((item, index) => {
                    return (
                      <ListItemUI
                        key={index}
                        index={index}
                        item={item}
                        onSelect={(item) => handleSelect(item)}
                      />
                    )
                  })}
              </Command.Group>
            </StyledCommandList>
          </>
        )}
      </Box>

      <CommandPaletteFooter footerHeight={footerHeight} />
    </StyledCommand>
  )
}

function splitStringByFirstSpace(str: string) {
  const index = str.indexOf(' ')
  if (index === -1) {
    return [str]
  }

  const firstPart = str.substring(0, index)
  const secondPart = str.substring(index + 1).trim()

  return [firstPart, secondPart]
}
