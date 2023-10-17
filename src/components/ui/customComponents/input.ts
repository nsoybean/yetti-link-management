import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
})

// Defining a custom variant
const variantCustom = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    field: {
      boxShadow: 'md',
      border: '0px solid',
      bg: 'gray.50',
      borderTopRightRadius: 'full',
      borderBottomRightRadius: 'full',
      _dark: {
        bg: 'whiteAlpha.50',
      },

      _hover: {
        bg: 'gray.200',
        _dark: {
          bg: 'whiteAlpha.200',
        },
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _focusVisible: {
        bg: 'gray.200',
        _dark: {
          bg: 'whiteAlpha.200',
        },
      },
    },
    addon: {
      boxShadow: 'md',
      border: '0px solid',
      borderColor: 'transparent',
      borderTopLeftRadius: 'full',
      borderBottomLeftRadius: 'full',
      bg: `${c}.main`,
      color: 'white',
      _dark: {
        bg: `${c}.main`,
        color: `white`,
      },
    },
    element: {
      size: 'lg',
      bg: 'transparent',
      rounded: 'full',
      border: 'transparent',
      borderColor: 'gray.100',
      _dark: {
        bg: 'whiteAlpha.50',
        borderColor: 'whiteAlpha.100',
      },
    },
  }
})

const variants = {
  custom: variantCustom,
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: 'custom',
  },
})
