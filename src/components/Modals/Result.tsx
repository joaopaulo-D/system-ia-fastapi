import { Box, Center, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Progress, Flex, VStack } from "@chakra-ui/react";

import { Results } from "@/dtos/Results";

interface ModalResultParams {
  data: Results
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalResult({ data, isOpen, onClose }: ModalResultParams) {

  return (
    <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg="gray.900">
        <ModalHeader>
          <Text>RELATORIO</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center bg="gray.800" p={3} w="full" rounded={2}>
            <Text>DADOS GERAIS</Text>
          </Center>
          <Box px={2} py={4}>
            <HStack w="full" justifyContent="space-between">
              <HStack w="50%">
                <Text>Nome:</Text>
                <Text>{data.name}</Text>
              </HStack>
              <HStack w="50%">
                <Text>Data de Nascimento:</Text>
                <Text>{data.data_nascimento}</Text>
              </HStack>
            </HStack>
            <HStack w="full" justifyContent="space-between">
              <HStack w="50%">
                <Text>ID do resultado:</Text>
                <Text>{data.result_id}</Text>
              </HStack>
              <HStack w="50%">
                <Text>Data do resultado:</Text>
                <Text>{data.data_result}</Text>
              </HStack>
            </HStack>
          </Box>
          <Center bg="gray.800" p={3} w="full" rounded={2}>
            <Text>DESFECHO</Text>
          </Center>
          <Flex>
            <Flex w="50%">
              <Image src={data.imagem} alt={data.name} />
            </Flex>
            <Flex w="50%" p={2}>
              <VStack w="full">
                <Text>Normal</Text>
                <Progress value={data.score} colorScheme={data.classe == 0 ? "green" : "gray"} w="full" />
                <Text>{`${data.classe == 0 ? data.score : (100-data.score)}%`}</Text>
              </VStack>
              <VStack w="full">
                <Text>Pneumonia</Text>
                <Progress value={data.score} colorScheme={data.classe == 1 ? "red" : "gray"} w="full" />
                <Text>{`${data.classe == 1 ? data.score : (data.score-100)}%`}</Text>
              </VStack>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}