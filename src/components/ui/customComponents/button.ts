import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'

const baseStyle = defineStyle({
  borderRadius: 0, // disable the border radius
  fontWeight: 'normal', // change the font weight to normal
})

// Defining a custom variant
const fancy = defineStyle(() => {
  return {
    bg: `brand.main`,
    fontWeight: 'semibold',
    color: 'white',
    borderRadius: '3xl',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _dark: {
      bg: `brand.main`,
      color: 'gray.100',
    },

    _hover: {
      transform: 'scale(1.05, 1.05)',
      bg: `brand.main400`,

      _dark: {
        bg: `brand.main800`,
      },
    },

    _active: {
      bg: `brand.main400`,
      transform: 'scale(1, 1)',

      _dark: {
        bg: `brand.800`,
      },
    },
  }
})

const actionIcon = defineStyle(() => {
  return {
    color: '#655bad',
    borderRadius: '50%',
    border: 'none',
    bg: 'rgba(221,216,254,0.4)',
    _hover: {
      bg: 'rgba(221,216,254,0.9)',
    },
    _dark: {
      bg: 'rgba(74,93,128,0.3)',
      color: '#ffffffbe',
      _hover: {
        bg: '#3e4d69cc',
      },
    },
  }
})

const primary = defineStyle(() => {
  return {
    color: '#f7f7f7',
    rounded: '8',
    border: 'none',
    bg: 'brand.main',
    _hover: {
      bg: `brand.main400`,
    },
    _dark: {
      bg: 'f7f7f7',
      color: '#f7f7f7',
      _hover: {
        bg: 'brand.main800',
      },
    },
  }
})

const destructiveButton = defineStyle(() => {
  return {
    color: '#f7f7f7',
    rounded: '8',
    border: 'none',
    bg: '#da1e37',
    _hover: {
      bg: `#bd1f36`,
    },
    _dark: {
      bg: '#b21e35',
      color: '#f7f7f7',
      _hover: {
        bg: '#c71f37',
      },
    },
  }
})

const selectionButton = defineStyle(() => {
  return {
    color: '#000000',
    rounded: '8',
    border: 'none',
    bg: 'neutral.main',
    _active: {
      bg: 'black',
    },
    _hover: {
      bg: `brand.main400`,
    },
    _dark: {
      bg: '#2d3748',
      color: '#f7f7f7',
      _hover: {
        bg: 'brand.main800',
      },
    },
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle: { rounded: '8' },
  variants: {
    fancy: fancy,
    actionIcon: actionIcon,
    primary: primary,
    selectionButton: selectionButton,
    destructiveButton: destructiveButton,
  },
})
