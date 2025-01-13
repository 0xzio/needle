import { composeAtom, setConfig, setTheme } from '@fower/react'

export function initFower() {
  composeAtom('heading1', {
    text3XL: true,
    fontSemibold: true,
    mb: 20,
  })

  composeAtom('heading2', {
    textXL: true,
    fontSemibold: true,
    mb: 8,
  })

  setConfig({
    inline: false,
    prefix: 'penx-',
    mode: {
      currentMode: 'dark',
      autoDarkMode: {
        enabled: true,
        mappings: {
          black: 'neutral100',
          bgWhite: 'neutral900',
        },
      },
    },
  })

  setTheme({
    colors: {
      brand50: '#fdf2f8',
      brand100: '#fce7f3',
      brand200: '#fbcfe8',
      brand300: '#f9a8d4',
      brand400: '#f472b6',
      brand500: '#ec4899',
      brand600: '#db2777',
      brand700: '#be123c',
      brand800: '#9f1239',
      brand900: '#881337',
    },
    shadows: {
      popover:
        '0 0 0 1px rgba(0,0,0,.08),0px 1px 1px rgba(0,0,0,.02),0px 4px 8px -4px rgba(0,0,0,.04),0px 16px 24px -8px rgba(0,0,0,.06)',
    },
  })
}
