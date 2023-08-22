import { Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

interface ModalExameParams {
  data: {
    id: string;
    imagem: string;
    name: string;
    data_result: string;
  }
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalExame({ data, isOpen, onClose }: ModalExameParams){

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg="transparent">
        <ModalHeader>
          <Text fontSize="md">{data.id}</Text>
          <Text fontSize="md">{data.name}</Text>
          <Text fontSize="md">{data.data_result}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={data.imagem}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}