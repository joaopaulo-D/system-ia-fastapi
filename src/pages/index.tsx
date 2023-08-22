import { Box, Button, Flex, VStack, Image, Text } from "@chakra-ui/react";

import Link from "next/link";

export default function Home(){
  return (
    <Flex h="100vh">
      <Flex w="60%" alignItems="center" justifyContent="center">
        <VStack w="full">
          <Box mb={50}>
            <Text fontSize={30} color="gray.200">SISTEMA DE DIAGNOSTICOS</Text>
            {/* <Text>teste</Text> */}
          </Box>
          <Button as={Link} href="/results" w="30%" bg="red.500">
            <Text color="white">ACESSAR</Text>
          </Button>
        </VStack>
      </Flex>
      <Box w="40%">
        {/* <Button ml="auto" onClick={onButtonClick}>
          {buttonText}
        </Button> */}
        <Image src="https://d1k1f4n2h095ym.cloudfront.net/bg-login.jpg" alt="tes" boxSize="100%" h="100vh"/>
      </Box>
    </Flex>
  )
}