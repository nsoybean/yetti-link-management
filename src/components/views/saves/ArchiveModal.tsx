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

function ArchiveModal({
  handleArchive,
  closeModal,
  isModalOpen,
  isArchiveModalLoading,
  isArticleArchived,
}: ArchiveModalProps) {
  return (
    <Modal onClose={closeModal} isOpen={isModalOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle='headerBold' color='brand.dark'>
          {isArticleArchived ? 'Confirm?' : 'Confirm Archive?'}
        </ModalHeader>
        <ModalCloseButton onClick={closeModal} />
        <ModalBody>
          <Text textStyle='normal'>
            {isArticleArchived
              ? 'Are you sure you want to restore the article?'
              : 'Are you sure you want to archive the article?'}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            fontWeight='bold'
            variant='primary'
            onClick={handleArchive}
            isLoading={isArchiveModalLoading}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ArchiveModal

interface ArchiveModalProps {
  handleArchive: () => void
  closeModal: () => void
  isModalOpen: boolean
  isArchiveModalLoading: boolean
  isArticleArchived: boolean
}
