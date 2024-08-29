import React, { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Image,
  FormLabel,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react"
import { colors } from "@/theme/colors" // Make sure the import path is correct
import "@/App.css"
import logo from "@/assets/laglogo.jpg" // Replace with the path to your logo image

const Retrieverecord = () => {
  const [taxid, setTaxid] = useState("")
  const toast = useToast()

  const handleSearch = () => {
    // Logic to handle the search goes here
    toast({
      title: "Search Initiated",
      description: `Searching for record with TAX-ID: ${taxid}`,
      status: "info",
      duration: 5000,
      isClosable: true,
    })
    // Further search logic would follow here
  }

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      p={6}
      className="office-bg"
    >
      <Box
        p={6}
        bg="rgba(255, 255, 255, 0.8)" // Giving a white background with some opacity
        w={["90%", "70%", "50%", "40%"]}
        boxShadow="xl"
        borderRadius="md"
        textAlign="center"
        backdropFilter="blur(10px)"
      >
        <Image
          src={logo}
          w="30%"
          alt="Company Logo"
          mb={4}
          style={{ display: "block", margin: "0 auto" }}
        />

        <Heading color={colors.brand.primary} fontSize="2xl" mb={4}>
          Retrieve TAX-ID Record
        </Heading>
        <Text fontSize="md" color={colors.gray[500]} mb={6}>
          Enter your TAX-ID
        </Text>
        <FormControl id="taxid" mb={4}>
          <FormLabel>Use only TAX-ID</FormLabel>
          <Input
            type="text"
            placeholder="Enter TAX-ID"
            value={taxid}
            onChange={(e) => setTaxid(e.target.value)}
            borderColor={colors.gray[300]}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={handleSearch}
          bg={colors.brand.primary}
          color={colors.white}
          _hover={{ bg: colors.brand.primaryDark }}
        >
          Search
        </Button>
      </Box>
    </Flex>
  )
}

export default Retrieverecord
