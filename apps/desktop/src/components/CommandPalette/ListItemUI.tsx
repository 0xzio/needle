import { ReactNode, useMemo } from 'react'
import { ICommandItem } from '@/common/types'
import { useCurrentCommand } from '@/hooks/useCurrentCommand'
import { Box, css, FowerHTMLProps } from '@fower/react'
import { IAccessory, isAccessoryObjectText } from 'penx'
import { StyledCommandItem } from './CommandComponents'
import { ListItemIcon } from './ListItemIcon'

interface ListItemUIProps extends Omit<FowerHTMLProps<'div'>, 'onSelect'> {
  index: number
  value?: any
  item: ICommandItem
  isListApp?: boolean
  titleLayout?: 'column' | 'row'
  showIcon?: boolean
  onSelect?: (item: ICommandItem) => void
}

export const ListItemUI = ({
  item,
  onSelect,
  index,
  titleLayout = 'row',
  isListApp = false,
  showIcon = true,
  value,
  ...rest
}: ListItemUIProps) => {
  const { currentCommand } = useCurrentCommand()

  const itemIcon = useMemo(() => {
    if (!isListApp) return item.icon
    const assets = currentCommand?.data?.assets || {}
    return assets[item.icon as string] || item.icon
  }, [isListApp, item, currentCommand])

  const title = typeof item.title === 'string' ? item.title : item.title.value

  const subtitle = useMemo(() => {
    if (item.subtitle === '$penx_builtin_extension') return ''
    return typeof item.subtitle === 'string'
      ? item.subtitle
      : item.subtitle?.value
  }, [item])
  if (item.type === 'list-heading') {
    return (
      <Box textXS gray400 pl-10 mb-2 mt2={index > 0}>
        {title}
      </Box>
    )
  }

  const keywords = [title, subtitle] as string[]
  if (item?.data?.alias) {
    keywords.push(item.data.alias)
  }

  return (
    <StyledCommandItem
      cursorPointer
      toCenterY
      toBetween
      px2
      py2
      gap4
      roundedLG
      black
      value={value || title}
      keywords={keywords}
      onSelect={() => {
        onSelect?.(item)
      }}
      onClick={() => {
        onSelect?.(item)
      }}
      {...rest}
    >
      <Box toCenterY gap2>
        {showIcon && (
          <ListItemIcon
            isApplication={item.data?.isApplication}
            icon={itemIcon as string}
          />
        )}
        <Box flexDirection={titleLayout} gapY1 toCenterY gapX2>
          <Box text-14>{title}</Box>
          <Box text-12 zinc400>
            {subtitle}
            {item.data.applicationPath}
          </Box>
          {item?.data?.alias && (
            <Box
              rounded
              textXS
              border
              borderNeutral200
              gray400
              h-20
              px-6
              toCenterY
            >
              {item.data.alias}
            </Box>
          )}
        </Box>
      </Box>
      {!!item.data?.type && (
        <Box textXS gray400>
          {item.data?.type}
        </Box>
      )}
      {item?.extra && (
        <Box toCenterY gap2 textXS gray600>
          {item.extra.map((extra, index) => (
            <Accessory key={index} item={extra} />
          ))}
        </Box>
      )}
    </StyledCommandItem>
  )
}

interface AccessoryProps {
  item: IAccessory
}
function Accessory({ item }: AccessoryProps) {
  const { currentCommand } = useCurrentCommand()
  const assets = currentCommand?.data?.assets || {}

  let text: ReactNode = useMemo(() => {
    if (typeof item.text === 'string' || typeof item.text === 'number') {
      return <Box>{item.text}</Box>
    }
    if (isAccessoryObjectText(item.text)) {
      return (
        <Box color={item.text.color || 'gray600'}>{item.text?.value || ''}</Box>
      )
    }
    return null
  }, [item.text])
  let tag: ReactNode = item.tag ? (
    <Box bgAmber500 white h-24 rounded px2 toCenterY>
      {item.tag.value}
    </Box>
  ) : null

  let icon: ReactNode = item.icon ? (
    <ListItemIcon roundedFull icon={assets[item.icon]} />
  ) : null

  return (
    <Box toCenterY gap1>
      {icon}
      {text}
      {tag}
    </Box>
  )
}
