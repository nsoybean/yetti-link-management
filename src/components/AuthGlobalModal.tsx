import { useContext, useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'

import { AuthContext } from '../api/context/authContext'
import { AuthStateEnum } from '../types'
import { SignInButton } from './SignInButton'

const whiteListedPathNames = ['/home', '/']

function AuthGlobalModal() {
  console.log('🚀 AuthGlobalModal')
  const { authState } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalHeader, setModalHeader] = useState<string>('')
  const [modalBody, setModalBody] = useState<string>('')
  const [allowModalClose, setAllowModalClose] = useState<boolean>(false)

  useEffect(() => {
    if (
      // prompt user to sign in if not authenticated && at protected routes
      authState !== AuthStateEnum.AUTHENTICATED &&
      !whiteListedPathNames.includes(window.location.pathname)
    ) {
      switch (authState) {
        case AuthStateEnum.SESSION_EXPIRED:
          setModalHeader(AuthStateEnum.SESSION_EXPIRED)
          setModalBody('Please sign in again')
          onOpen()
          break
        case AuthStateEnum.UNAUTHENTICATED:
          setModalHeader(AuthStateEnum.UNAUTHENTICATED)
          setModalBody('Please sign in')
          onOpen()
          break
        case AuthStateEnum.UNAUTHORIZED:
          setModalHeader(AuthStateEnum.UNAUTHORIZED)
          setModalBody('You do not have permission to view this page 😔')
          setAllowModalClose(true) // allow modal to close
          onOpen()
          break
      }
    }
  }, [authState])

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={authState === AuthStateEnum.UNAUTHORIZED}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeader}</ModalHeader>
        {allowModalClose && <ModalCloseButton />}
        <ModalBody>{modalBody}</ModalBody>

        <ModalFooter>
          {allowModalClose && (
            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
          )}
          <SignInButton />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AuthGlobalModal
