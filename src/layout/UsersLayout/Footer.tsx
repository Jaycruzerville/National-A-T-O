import { Box, Flex, Image, Text } from "@chakra-ui/react"
import fb from "@/assets/fb-icon.svg"
import insta from "@/assets/insta-icon.svg"
import twitter from "@/assets/twitter-icon.svg"
import linkedin from "@/assets/linkedin-icon.svg"

const Footer = () => {
  const dateObj = new Date()
  const year = dateObj.getFullYear()

  return (
    <Box as="section" w="full" mt={{ base: "20px", md: "121px" }}>
      <Flex
        w={{ base: "100%", md: "full" }}
        mx="auto"
        h={{ base: "152px", md: "112px" }}
        alignItems={"center"}
        bgColor="brand.primaryDark"
      >
        <Flex
          w="1092px"
          h="32px"
          mx="auto"
          alignItems="center"
          justifyContent={"space-around"}
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: "14px", md: "0" }}
          color={"white"}
          fontSize={{ base: "12px", md: "18px" }}
        >
          <Text>Lagos State</Text>
          <Flex gap={{ base: "4px", md: "16px" }} alignItems="center">
            <Text mr={{ base: "0", md: "12px" }}>Follow us</Text>
            <Image w={{ base: "20px", md: "32px" }} src={fb} alt="" />
            <Image w={{ base: "20px", md: "32px" }} src={insta} alt="" />
            <Image w={{ base: "20px", md: "32px" }} src={twitter} alt="" />
            <Image w={{ base: "20px", md: "32px" }} src={linkedin} alt="" />
          </Flex>
          <Text>GIS-GRP © {year}</Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
