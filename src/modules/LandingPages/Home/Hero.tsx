import React from "react"
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react"
import heroImg from "@/assets/hero-illustration.svg"
import confetti from "@/assets/confetti-overlay.svg"
import confettiMobile from "@/assets/confetti-mobile.svg"
import book from "@/assets/hero-book-icon.svg"
import smile from "@/assets/hero-smile-icon.svg"
import { motion } from "framer-motion"
import { Link as RouteLink } from "react-router-dom" // Ensure this import is correct

// Extend Chakra UI Box with motion
const MotionBox = motion(Box)
const MotionButton = motion(Button)

const Hero = () => {
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)")

  return (
    <Box
      px={{ sm: "10px", md: "40px", xl: "80px" }}
      py={{ base: "60px" }}
      pt={{ base: "30px", md: "20px" }}
      bgColor="brand.primary"
    >
      <Container maxW="container.xl">
        <Flex as="section" mx="auto" alignItems="center" position="relative">
          {isLargerThan1300 && (
            <>
              <Image src={confetti} position="absolute" />
              <Image src={confettiMobile} h="350px" position="absolute" />
              <Image
                src={book}
                bgColor="white"
                position="absolute"
                top="528px"
                left="621px"
                borderRadius="8px"
                transform="rotate(-15deg)"
                display={{ sm: "none", xl: "block" }}
              />
              <Image
                src={smile}
                position="absolute"
                bgColor="white"
                top="117px"
                right="37px"
                borderRadius="8px"
                transform="rotate(15deg)"
                display={{ sm: "none", xl: "block" }}
              />
            </>
          )}
          <MotionBox
            sx={{ flex: "1" }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.8,
                ease: "easeInOut",
              },
            }}
          >
            <Text
              sx={{
                color: "white",
                fontSize: { base: "36px", md: "40px", lg: "55px", xl: "64px" },
                fontWeight: "700",
                lineHeight: { base: "45px", lg: "65px", xl: "79px" },
                textTransform: "capitalize",
                mb: "12px",
                maxInlineSize: "12ch",
              }}
            >
              LAND USE & AMENITIES FEE
            </Text>
            <Text
              maxInlineSize={{ base: "40ch", md: "35ch" }}
              sx={{
                color: "#d9d9d9",
                fontSize: { base: "12px", md: "20px", xl: "24px" },
                fontWeight: "500",
                lineHeight: { base: "15px", md: "32px" },
              }}
            >
              This portal enables you to view and pay your Land Use and
              Amenities Fee, and to register and manage properties that have not
              been properly recorded by the State.
            </Text>
            <MotionButton
              as={RouteLink}
              to="/auth/signup"
              w={{ base: "full", sm: "auto" }}
              h={{ base: "44px", md: "60px" }}
              mt="32px"
              mb="20px"
              fontSize={{ base: "16px", md: "18px" }}
              px={{ base: "30px", md: "48px" }}
              py={{ base: "10px", md: "12px" }}
              bg="active.100" // Standout blue background
              color="white"
              _hover={{ bgColor: "gray.300" }} // Darker blue on hover for a nice effect
              initial={{ opacity: 0, x: 40 }}
              viewport={{ once: true }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1.8,
                  ease: "easeInOut",
                },
              }}
            >
              Get Started
            </MotionButton>
          </MotionBox>
          <Box>
            <Image
              boxSize={{ base: 500, xl: "100%" }}
              src={heroImg}
              alt="Hero Illustration"
              display={{ sm: "none", lg: "block" }}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Hero
