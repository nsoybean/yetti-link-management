import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react'

function DeleteModal({
  handleDelete,
  closeModal,
  isModalOpen,
  isDeleteModalLoading,
}: DeleteModalProps) {
  return (
    <Modal onClose={closeModal} isOpen={isModalOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle='headerBold' color='brand.dark'>
          Confirm Delete?
        </ModalHeader>
        <ModalCloseButton onClick={closeModal} />
        <ModalBody>
          <Text textStyle='normal'>
            Are you sure you want to delete the article?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            fontWeight='bold'
            variant='destructiveButton'
            onClick={handleDelete}
            isLoading={isDeleteModalLoading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal

interface DeleteModalProps {
  handleDelete: () => void
  closeModal: () => void
  isModalOpen: boolean
  isDeleteModalLoading: boolean
}
