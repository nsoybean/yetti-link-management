import { useContext } from 'react'
import {
  HStack,
  Popover,
  PopoverTrigger,
  Avatar,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  Portal,
  Button,
  Tooltip,
  Box,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { SignInButton } from './SignInButton'
import { AuthContext } from '../api/context/authContext'

export function ProfileManagementIcon() {
  const { authToken, setAuthToken } = useContext(AuthContext)
  const { onOpen, onClose, isOpen } = useDisclosure()
  let navigate = useNavigate()

  const handleSignOut = () => {
    // delete token from local storage
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      // reset
      setAuthToken({
        accessToken: '',
        email: '',
        picture: '',
        expiresIn: 0,
        expiresAt: 0,
        tokenType: '',
      })
    }

    // navigate to home page
    onClose()
    navigate('/home')
  }

  return (
    <HStack>
      {authToken.accessToken ? (
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          closeOnBlur={true}
          placement='bottom-start'
        >
          {/* tooltip and popover sharing same DOM workaround: https://github.com/chakra-ui/chakra-ui/issues/2843#issuecomment-748641805 */}
          <Tooltip label='Profile' borderRadius={4} hasArrow arrowSize={8}>
            <Box display='inline-block'>
              <PopoverTrigger>
                <Avatar
                  name={authToken.email}
                  src={authToken.picture}
                  size='sm'
                  cursor='pointer'
                />
              </PopoverTrigger>
            </Box>
          </Tooltip>

          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader fontWeight='bold'>{authToken.email}</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button onClick={handleSignOut} variant='primary'>
                  Sign Out
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      ) : (
        <SignInButton />
      )}
    </HStack>
  )
}

ProfileManagementIcon.propTypes = {}
