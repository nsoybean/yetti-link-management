import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: '0px',
    },
  }),
}

// define custom styles for funky variant
const variants = {
  custom: definePartsStyle({
    container: {
      border: '1px solid #E2E8F0',
      boxShadow: 'sm',
      borderRadius: '8px',
      _dark: {
        border: '1px solid #84888c',
      },
    },
    body: {
      padding: '0px',
    },
    footer: {
      padding: '0 12px 12px 12px',
    },
  }),
}

// export variants in the component theme
export const cardTheme = defineMultiStyleConfig({ variants, sizes })
