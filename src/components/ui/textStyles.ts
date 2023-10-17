export const FONT_WEIGHT = {
  BOLD: 'bold',
  SEMI: 600,
  NORMAL: 'normal',
}

const textStyles = {
  landingBig: {
    fontSize: '6rem',
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: '7rem',
  },
  landingSmall: {
    fontSize: '3.5rem',
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: '4rem',
  },
  display1: {
    fontSize: '4.8rem',
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: '6rem',
  },
  display2: {
    fontSize: '4rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '4.8rem',
  },
  h1Semi: {
    fontSize: '3.2rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '4.0rem',
  },
  body1Semi: {
    fontSize: '2rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '2.8rem',
  },
  body1: {
    fontSize: '2rem',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '2.8rem',
  },
  body1Bold: {
    fontSize: '2rem',
    fontWeight: FONT_WEIGHT.BOLD,
    lineHeight: '2.8rem',
  },
  body2: {
    fontSize: '1.6rem',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '2.4rem',
  },
  body2Semi: {
    fontSize: '1.6rem',
    fontWeight: FONT_WEIGHT.SEMI,
    lineHeight: '2.4rem',
    _dark: {
      color: `#ddd8fe`,
    },
  },
  notesSmall: {
    fontSize: '0.8rem',
    fontWeight: FONT_WEIGHT.NORMAL,
    lineHeight: '1.2rem',
  },
  headerBold: {
    fontSize: '1.2em',
    fontWeight: FONT_WEIGHT.BOLD,
    lineheight: '1.4em',
    _dark: {
      color: `white`,
    },
  },
  cardTitle: {
    fontSize: {
      base: '0.9em',
      sm: '0.9em',
      lg: '1.2em',
    },
    fontWeight: FONT_WEIGHT.BOLD,
    lineheight: {
      base: '1.2em',
      sm: '1.2em',
      lg: '1.4em',
    },
    _dark: {
      color: `white`,
    },
  },
  cardBody: {
    fontSize: {
      base: '0.8em',
      sm: '0.8em',
      lg: '1em',
    },
    fontWeight: FONT_WEIGHT.NORMAL,
    lineheight: {
      base: '1.1em',
      sm: '1.1em',
      lg: '1.2em',
    },
    _dark: {
      color: 'whiteAlpha.700',
    },
  },
  normal: {
    fontSize: {
      base: '0.8em',
      sm: '0.8em',
      lg: '1em',
    },
    fontWeight: FONT_WEIGHT.NORMAL,
    lineheight: {
      base: '1.1em',
      sm: '1.1em',
      lg: '1.2em',
    },
    _dark: {
      color: `#f7f7f7`,
    },
  },
}

export type TextStyles = typeof textStyles

export default textStyles
