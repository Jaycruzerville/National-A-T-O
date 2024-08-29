import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Image,
  Stack,
  useTheme,
} from "@chakra-ui/react"
import React from "react"

const Register = () => {
  const theme = useTheme()

  // Dummy images, replace with actual image paths or components
  const personalIcon = "/path-to-personal-icon.svg"
  const soleSignatoryIcon = "/path-to-sole-signatory-icon.svg"
  const multiSignatoryIcon = "/path-to-multi-signatory-icon.svg"
  const governmentIcon = "/path-to-government-icon.svg"

  const options = [
    {
      title: "Personal",
      description:
        "For Individuals who make regular payments and receive money for their side business",
      icon: personalIcon,
    },
    {
      title: "Sole-Signatory",
      description: "For Registered Businesses with a Single Owner",
      icon: soleSignatoryIcon,
    },
    {
      title: "Multi-Signatory",
      description: "For Registered Businesses with Multiple Directors",
      icon: multiSignatoryIcon,
    },
    {
      title: "Government",
      description: "For Federal, State or Local Government Property",
      icon: governmentIcon,
    },
  ]

  return (
    <Box
      bg={theme.colors.gray[100]}
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 12 }}
    >
      <Box maxW={{ xl: "1200px" }} mx="auto">
        <Heading
          textAlign="center"
          mb={6}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
        >
          Create Account
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {options.map((option, index) => (
            <Stack
              key={index}
              align="center"
              spacing={6}
              p={6}
              borderRadius="lg"
              bg="white"
              boxShadow="md"
              minHeight="300px"
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "lg",
              }}
            >
              <Image
                boxSize="100px"
                src={option.icon}
                alt={option.title}
                mb={4} // Margin bottom for spacing
              />
              <Text fontWeight="bold" fontSize="xl">
                {option.title}
              </Text>
              <Text textAlign="center" fontSize="md">
                {option.description}
              </Text>
              <Button
                variant="app-primary"
                bg={theme.colors.brand.primary}
                _hover={{ bg: theme.colors.brand.primaryDark }}
                size="md"
                width="full" // Button to take full width of parent
              >
                Get Started
              </Button>
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default Register
