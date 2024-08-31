import React from "react"
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  VStack,
  HStack,
  Avatar,
  Textarea,
  Heading,
  // Image,
  FormHelperText,
} from "@chakra-ui/react"
import { colors } from "@/theme/colors" // Adjust the import path as needed
import profilePic from "@/assets/profilePic.svg"

const index = () => {
  // Placeholder function for form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Process form submission here
  }

  return (
    <Box p={6} bg={colors.gray[100]}>
      <Heading mb={4} textAlign="center" size="lg" color={colors.brand.primary}>
        Know Your Customer
      </Heading>
      <form onSubmit={handleSubmit}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          bg={colors.white}
        >
          <VStack spacing={4} align="stretch">
            <Heading size="md" mb={4} color={colors.brand.textPrimary}>
              Personal Information
            </Heading>

            <HStack spacing={4} alignItems="start">
              <Avatar size="xl" name="Joshua Ayodele" src={profilePic} />
              <VStack spacing={4} align="stretch" flex={1}>
                <HStack spacing={4}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input placeholder="Ebuka" />
                  </FormControl>

                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input placeholder="Musa-Olaleye" />
                  </FormControl>
                </HStack>

                <HStack spacing={4}>
                  <FormControl id="gender">
                    <FormLabel>Gender</FormLabel>
                    <Select placeholder="Select gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>

                  <FormControl id="dob">
                    <FormLabel>Date of Birth</FormLabel>
                    <Input type="date" />
                  </FormControl>
                </HStack>

                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="example@example.com" />
                </FormControl>

                <FormControl id="phone" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="tel" placeholder="0807 123 4567" />
                </FormControl>

                <FormControl id="bvn">
                  <FormLabel>Bank Verification Number (BVN)</FormLabel>
                  <Input placeholder="12345678901" />
                </FormControl>

                <FormControl id="nin">
                  <FormLabel>National Identification Number (NIN)</FormLabel>
                  <Input placeholder="12345678901" />
                </FormControl>
              </VStack>
            </HStack>

            <Heading size="md" mt={10} mb={4} color={colors.brand.textPrimary}>
              Address
            </Heading>
            <FormControl id="address1">
              <FormLabel>Address Line 1</FormLabel>
              <Input placeholder="123 Lovely Street" />
            </FormControl>

            <FormControl id="address2">
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <Input placeholder="Apartment, suite, etc. (optional)" />
            </FormControl>

            <FormControl id="city">
              <FormLabel>City</FormLabel>
              <Input placeholder="Abuja" />
            </FormControl>

            {/* Include other address details here... */}

            <FormControl id="proofOfAddress">
              <FormLabel>Proof of Address</FormLabel>
              <Input type="file" />
              <FormHelperText>Please upload a proof of address.</FormHelperText>
            </FormControl>

            <FormControl id="additionalInfo">
              <FormLabel>Additional Information</FormLabel>
              <Textarea placeholder="Enter any additional information here" />
            </FormControl>

            <Button
              mt={4}
              bg={colors.brand.primary}
              color={colors.white.text}
              _hover={{ bg: colors.brand.primaryDark }}
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </form>
    </Box>
  )
}

export default index
