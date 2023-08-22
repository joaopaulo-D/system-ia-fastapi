import { Box, Flex, HStack, Heading, Icon, Image, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useDisclosure } from "@chakra-ui/react";

import { AiOutlineFileDone, AiFillDelete, AiOutlineCheckCircle, AiFillFileImage } from "react-icons/ai";
import {MdDownloading } from "react-icons/md";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { useEffect, useState } from "react";

import { Results } from "@/dtos/Results";
import { api } from "@/service/api";
import ModalExame from "@/components/Modals/Exame";
import ModalResult from "@/components/Modals/Result";

export default function UserList() {

  const [results, setResults] = useState<Results[]>([]);
  const [modalExame, setModalExame] = useState<any>(null);
  const [modalResult, setModalResult] = useState<any>(null);

  const { isOpen: isOpenModalExame, onOpen: onOpenModalExame, onClose: onCloseModalExame } = useDisclosure();
  const { isOpen: isOpenModalViewResult, onOpen: onOpenModalViewResult, onClose: onCloseModalViewResult } = useDisclosure();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function getAllResults() {
    try {
      const response = await api.get("/results")

      if (response) {
        setResults(response.data.results)
      }

    } catch (error) {
      console.log(error)
    }
  }

  function handleModalExame(id: string, imagem: string, name: string, data_result: string){
    setModalExame({
      id: id,
      imagem: imagem,
      name: name,
      data_result: data_result
    })
  }

  function handleModaResult(
    data_nascimento: string,
    data_result: string, 
    id: string, 
    imagem: string, 
    name: string, 
    classe: number, 
    result_id: string,
    score: number,
  ){
    setModalResult({
      id: id,
      imagem: imagem,
      name: name,
      data_result: data_result,
      classe : classe,
      data_nascimento: data_nascimento,
      result_id:  result_id,
      score: score
    })
  }

  useEffect(() => {
    getAllResults()
  }, [])

  return (
    <Box>
      <Header menuVisible={false}/>
      <Flex w="100%" my="6" mx="auto" px="6">
        <Box flex="1" borderRadius={8} p="8" borderColor="whiteAlpha.100" borderWidth={2}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="bold">Upload</Heading>
          </Flex>

          <Table colorScheme="whiteAlpha" borderRadius={8} borderColor="whiteAlpha.100" borderWidth={2}>
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300"></Th>
                <Th color="gray.300">Nome</Th>
                {isWideVersion && <Th color="gray.300">ID</Th>}
                <Th color="gray.300">Upload</Th>
                <Th color="gray.300">Resultado</Th>
                <Th color="gray.300">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {results.map((r) => (
                <>
                  <Tr key={r.id} _hover={{ bg: "gray.800" }}>
                    <Td px={["4", "4", "6"]}>
                      <Box>
                        {r.imagem ? (
                          <Image src={r.imagem} alt="" w={55} h={55} />
                        ):(
                          <Icon as={MdDownloading} fontSize={20}/>
                        )}
                      </Box>
                    </Td>
                    <Td>
                      {r.name}
                    </Td>
                    {isWideVersion && <Td>{r.result_id}</Td>}
                    <Td>
                      <HStack>
                        <Icon as={AiOutlineCheckCircle} fontSize={20} color="green.400" />
                        <Text color="green.400">Upload completo</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack>
                        <Icon as={AiOutlineCheckCircle} fontSize={20} color="green.400" />
                        <Text color="green.400">Resultado gerado</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack>
                        <Icon as={AiFillFileImage} fontSize={20} onClick={() => {
                          handleModalExame(r.result_id, r.imagem, r.name, r.data_result)
                          onOpenModalExame()
                        }} />
                        <Icon as={AiOutlineFileDone} fontSize={20} onClick={() => {
                          handleModaResult(r.data_nascimento, r.data_result, r.id, r.imagem, r.name, r.classe, r.result_id, r.score)
                          onOpenModalViewResult()
                        }} />
                        <Icon as={AiFillDelete} fontSize={20} color="red.500" onClick={() => alert("deletar")} />
                      </HStack>
                    </Td>
                  </Tr>
                </>
              ))}
            </Tbody>
          </Table>
          <Pagination />
        </Box>

        {isOpenModalExame ? <ModalExame data={modalExame} isOpen={isOpenModalExame} onClose={onCloseModalExame}/> : null}
        {isOpenModalViewResult ? <ModalResult data={modalResult} isOpen={isOpenModalViewResult} onClose={onCloseModalViewResult}/> : null}
      </Flex>
    </Box>
  )
}
