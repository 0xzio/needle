import { useEffect } from 'react'
import { Box } from '@fower/react'
import { Logo } from '@penx/widget'
import { BindAppHotkey, registerDefaultAppHotkey } from './BindAppHotkey'
import LoadingCircle from './icons/loading-circle'
import { Button } from './ui/button'

interface DesktopWelcomeProps {
  isLoading: boolean
  onGetStarted: () => void
}
export function DesktopWelcome({
  onGetStarted,
  isLoading,
}: DesktopWelcomeProps) {
  useEffect(() => {
    registerDefaultAppHotkey()
  }, [])

  return (
    <Box
      data-tauri-drag-region
      w-100p
      h-100p
      toCenter
      bgWhite
      column
      gap3
      black
    >
      <Box data-tauri-drag-region toCenterY gap2>
        <Box data-tauri-drag-region text2XL fontLight neutral400>
          Welcome to
        </Box>
        <Logo showImage={false}></Logo>
      </Box>
      <Box text3XL toCenterY gap2>
        <Box fontBold>Desktop client of PenX</Box>
      </Box>

      <BindAppHotkey />

      <Button
        variant="outline"
        size="lg"
        className="mt-5"
        disabled={isLoading}
        onClick={() => onGetStarted()}
      >
        {isLoading && <LoadingCircle />}
        <Box>Get Started</Box>
      </Button>
    </Box>
  )
}
