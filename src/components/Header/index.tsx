import { Avatar, Box, Button, Center, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { RiMenuLine } from "react-icons/ri"
import { Logo } from "./Logo"
import { SearchBox } from "./SearchBox"
import Link from "next/link"

interface HeaderParams {
  menuVisible: boolean;
}

export function Header({ menuVisible }: HeaderParams) {

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <>
      <Box w="100%" my="6" mx="auto" px="6">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Logo />

          <Flex alignItems={'center'}>
            {menuVisible ? (
              <Link href="/results">

                <Button bg="transparent" _hover={{ bg: "none" }}>
                  <Text color="white" _hover={{ color: "gray.200" }}>RESULTADOS</Text>
                </Button>
              </Link>
            ) : (
              <Link href="/sample">
                <Button bg="transparent" _hover={{ bg: "none" }}>
                  <Text color="white" _hover={{ color: "gray.200" }}>CADASTRAR AMOSTRA</Text>
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
