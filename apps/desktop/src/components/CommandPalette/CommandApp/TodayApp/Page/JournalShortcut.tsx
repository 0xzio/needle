import { forwardRef } from 'react'
import { Box, FowerHTMLProps } from '@fower/react'
import { addDays, format, subDays } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDate } from '../hooks/useDate'

interface Props extends FowerHTMLProps<'div'> {
  date?: string
}

export const JournalShortcut = forwardRef<HTMLDivElement, Props>(
  function DailyShortcut({ date, ...rest }, ref) {
    const currentDate = new Date(date ?? Date.now())
    const { setDate } = useDate()

    return (
      <Box ref={ref} textXS fontNormal toCenterY {...rest}>
        <Box
          bgGray100
          px2
          py-6
          roundedFull
          bgGray200--hover
          transitionColors
          cursorPointer
          onClick={() => {
            setDate(new Date())
          }}
        >
          Today
        </Box>
        <Box toCenterY gap2 ml2>
          <Box
            bgGray100
            circle5
            toCenter
            bgGray200--hover
            transitionColors
            cursorPointer
            onClick={() => {
              setDate(subDays(currentDate, 1))
            }}
          >
            <ChevronLeft size={16} />
          </Box>
          <Box
            bgGray100
            circle5
            toCenter
            bgGray200--hover
            transitionColors
            cursorPointer
            onClick={() => {
              setDate(addDays(currentDate, 1))
            }}
          >
            <ChevronRight size={16} />
          </Box>
        </Box>
      </Box>
    )
  },
)
