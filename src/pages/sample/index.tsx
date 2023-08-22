import React, { useState } from "react";

import { Box, Flex, Button, FormControl, Select, FormLabel, Text, HStack, Center } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "@/components/Form/Input";
import { Header } from "@/components/Header";
import { api } from "@/service/api";

export default function Sample() {

  const [name, setName] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [image, setImage] = useState<any>(null);

  const [message, setMessage] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0])
    }
  }

  const handleCreateSample = async () => {

    const formData = new FormData()
    formData.append('image', image, image.name)
    formData.append('name', name)
    formData.append('data_nascimento', dataNascimento)
      
    try {
      const response = await api.post("create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if(response){
        setMessage(response?.data.message)
      }

    } catch (error) { 
      console.log(error)
    }
  }

  return (
    <Box>
      <Header menuVisible/>
      <Flex w="100%" my="6" mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <form method="post">
            <FormControl mb={6} isRequired>
              <FormLabel htmlFor="name">NOME</FormLabel>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
            <FormControl mb={6} isRequired>
              <FormLabel htmlFor="data_nascimento">DATA DE NASCIMENTO</FormLabel>
              <Input
                type="datetime-local"
                name="data_nascimento"
                id="data_nascimento"
                placeholder=" "
                onChange={(event) => setDataNascimento(event.target.value)}
              />
            </FormControl>
            <FormControl mb={6} isRequired>
              <FormLabel htmlFor="image">EXAME</FormLabel>
              <Input
                type="file"
                accept="image/*"
                name="image"
                id="image"
                onChange={handleImageChange}
              />
            </FormControl>
            <HStack justifyContent="space-between">
              <Button size="md" mt={4} onClick={handleCreateSample}>
                <Text color="red.500">ENVIAR AMOSTRA</Text>
              </Button>
              {message ? (
                <Center w="80" bg="green.500" p={2} rounded={2}>
                  <Text color="white">Amostra casdatra com sucesso!</Text>
                </Center>
              ) : null}
            </HStack>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}
