import {
  Container,
  Box,
  Text,
  Flex,
  SimpleGrid,
  Button,
  Image,
} from "@chakra-ui/react"

import healthInsurance from "@/assets/health-insurance.svg"
import businessInsurance from "@/assets/business-insurance.svg"
import vehicleInsurance from "@/assets/vehicle-insurance.svg"
import thirdPartyInsurance from "@/assets/third-party-insurance.svg"
import shield from "@/assets/shield.svg"
import { motion } from "framer-motion"

const listVariants = {
  initial: { x: "20px", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { staggerChildren: 0.5, ease: "easeInOut", duration: 0.9 },
  },
}

const features = [
  {
    id: 1,
    icon: healthInsurance,
    text: "Covers medical expenses that arise due to an illness.",
  },
  {
    id: 2,
    icon: businessInsurance,
    text: "It helps cover the costs associated with Property damage and liability claims.",
  },
  {
    id: 3,
    icon: vehicleInsurance,
    text: "Covers vehicle accidents for the vehicle owner",
  },
  {
    id: 4,
    icon: thirdPartyInsurance,
    text: "Medical expenses that arise due to an illness.",
  },
]

const MicroInsurance = () => {
  const boxStyles = {
    py: "45px",
    px: "20px",
    maxWidth: "300px",

    background: "#FFF",
    border: "1px solid #EDEDED",
    borderRadius: "4px",
    position: "relative",
    zIndex: "2",
    minHeight: "100%",
  }
  const MainTextStyles = {
    fontStyle: "normal",
    fontWeight: "800",
    color: "#333333",
    textAlign: "center",
  }
  const SubTextStyles = {
    fontStyle: "normal",
    fontWeight: "700",
    color: "#626262",
    marginTop: "4px",
    textAlign: "center",
  }
  const boxMainTextStyles = {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "18px",
    lineHeight: "18px",
    color: "#323232",
    marginTop: "16px",
  }
  const boxSubTextStyles = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "19px",
    color: "#626262",
    marginTop: "16px",
  }
  const containerStyles = {
    background: "#EEF1FD",

    overflow: "hidden",
    // maxWidth: "1312px",
    position: "relative",
    mx: "auto",
  }

  const rightStyles = {
    textAlign: "right",

    justifyContent: "flex-end",
    alignItems: "center",
  }

  return (
    <Container
      sx={containerStyles}
      maxW="container.xl"
      as="section"
      h={{ base: "fit-content", xl: "630px" }}
      py={{ base: "43px", lg: "75px" }}
      px={{ base: "17px", md: "25px", lg: "75px" }}
      mt={{ base: "20px", md: "56px" }}
      mb={{ base: "20px", md: "64px" }}
      borderRadius={{ base: "0px", md: "12px" }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column-reverse", xl: "row" }}
      >
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap="20px"
          mt={{ base: "20px", xl: "0px" }}
          as={motion.div}
          variants={listVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map(({ id, icon, text }) => (
            <Box
              as={motion.div}
              variants={listVariants}
              key={id}
              sx={boxStyles}
              w={{ base: "100%", xl: "auto" }}
              height={{ base: "240px", md: "auto" }}
            >
              <img src={icon} alt="" />
              <Text sx={boxMainTextStyles}>Business Insurance</Text>
              <Text sx={boxSubTextStyles}>{text}</Text>
            </Box>
          ))}
        </SimpleGrid>
        <Box
          sx={rightStyles}
          w={{ xl: "40%" }}
          initial={{ opacity: 0, x: 20 }}
          viewport={{ once: true }}
          whileInView={{
            opacity: 1,
            x1: 0,
            transition: {
              duration: 1.2,
              ease: "easeInOut",
            },
          }}
          as={motion.div}
        >
          <Text
            sx={MainTextStyles}
            fontSize={{ base: "20px", md: "48px" }}
            lineHeight={{ base: "25px", md: "34px", lg: "64px" }}
          >
            GIS Rental Pooling
          </Text>
          <Text
            sx={SubTextStyles}
            fontSize={{ base: "12px", md: "24px" }}
            lineHeight={{ base: "15px", md: "32px" }}
          >
            Pay seamlessly for what matters to you only
          </Text>
          <Button
            variant="app-primary"
            w="185px"
            h="48px"
            m="auto"
            marginTop="24px"
            lineHeight="24px"
            fontWeight="700"
            display={{ base: "none", xl: "flex" }}
          >
            Learn More
          </Button>
        </Box>
      </Flex>
      <Button
        variant="app-primary"
        w={{ base: "115px", md: "185px" }}
        h={{ base: "28px", md: "48px" }}
        m="auto"
        marginTop="24px"
        lineHeight="24px"
        fontWeight="700"
        fontSize={{ base: "10px", md: "16px" }}
        display={{ base: "flex", xl: "none" }}
      >
        Learn More
      </Button>
      <Image
        position="absolute"
        top={{ base: "-40px", md: "0px" }}
        right={{ base: "-40px", md: "0px" }}
        w={{ base: "181px", md: "auto" }}
        src={shield}
      ></Image>
    </Container>
  )
}

export default MicroInsurance
