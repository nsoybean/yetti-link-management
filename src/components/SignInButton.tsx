import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import AuthAPI from '../api/AuthAPI'

export const SignInButton = () => {
  return (
    <Button
      colorScheme='purple'
      variant='primary'
      as={Link}
      to={AuthAPI.getGoogleLoginUrl()}
    >
      Sign in
    </Button>
  )
}
