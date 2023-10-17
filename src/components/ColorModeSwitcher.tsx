import * as React from 'react'
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  Tooltip,
} from '@chakra-ui/react'
import { HiOutlineSun, HiMoon } from 'react-icons/hi'

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(HiOutlineSun, HiMoon)

  return (
    <Tooltip label='Toggle Light/ Dark' borderRadius={4} hasArrow arrowSize={8}>
      <IconButton
        fontSize='lg'
        variant='ghost'
        color='current'
        onClick={toggleColorMode}
        icon={<SwitchIcon size={25} />}
        aria-label={`Switch to ${text} mode`}
        {...props}
      />
    </Tooltip>
  )
}
