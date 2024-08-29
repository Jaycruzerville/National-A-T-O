import React, { useState } from "react"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  GridItem,
  Button,
  Checkbox,
  Heading,
  //useToast,
} from "@chakra-ui/react"
import { colors } from "@/theme/colors"

import {
  nigerianStates,
  titles,
  occupations,
  gender,
  maritalstatus,
  nationality,
  lgaofo,
  stateofr,
} from "@/data"

const Application = () => {
  // const toast = useToast()
  const [lgas, setLgas] = useState<string[]>([])

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value
    setLgas(lgaofo[state] || [])
  }

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const formData = new FormData(event.currentTarget)
  //   if (process.env.NODE_ENV === "development") {
  //     console.log("Form Data Submitted", Object.fromEntries(formData.entries()))
  //   }
  //   toast({
  //     title: "Application Submitted",
  //     description: "Your TIN application has been submitted.",
  //     status: "success",
  //     duration: 5000,
  //     isClosable: true,
  //   })
  // }

  return (
    <Box bg={colors.gray[100]} p={10} minH="100vh" className="office-bg">
      <Box
        as="form" // Casting Box as a form element
        // onSubmit={handleSubmit}
        maxW="960px"
        mx="auto"
        p={6}
        bg="white"
        borderRadius="lg"
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
      >
        <Heading mb={6} textAlign="center" color={colors.brand.primary}>
          Tax Identification Number Application
        </Heading>

        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={6}
        >
          <GridItem>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Select name="title" placeholder="Select title">
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input name="firstName" placeholder="First Name" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Middle Name</FormLabel>
              <Input name="middleName" placeholder="Middle Name" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input name="lastName" placeholder="Last Name" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input name="email" type="email" placeholder="Email Address" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input name="phone" type="tel" placeholder="Phone Number" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Phone Number 2</FormLabel>
              <Input name="phone2" type="tel" placeholder="Phone Number 2" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Ward</FormLabel>
              <Input name="ward" type="tel" placeholder="Ward" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>NIN</FormLabel>
              <Input name="nin" type="tel" placeholder="NIN" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Occupation</FormLabel>
              <Select name="occupation" placeholder="Select Occupation">
                {occupations.map((occupation) => (
                  <option key={occupation} value={occupation}>
                    {occupation}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" placeholder="Select Gender">
                {gender.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Marital Status</FormLabel>
              <Select name="maritalstatus" placeholder="Select">
                {maritalstatus.map((maritalstatus) => (
                  <option key={maritalstatus} value={maritalstatus}>
                    {maritalstatus}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" name="dob" placeholder="dd-mm-yyyy" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Nationality</FormLabel>
              <Select name="nationality" placeholder="Select">
                {nationality.map((nationality) => (
                  <option key={nationality} value={nationality}>
                    {nationality}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>State of Origin</FormLabel>
              <Select
                name="stateoforigin"
                onChange={handleStateChange}
                placeholder="Select State"
              >
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>LGA of Origin</FormLabel>
              <Select name="lgaofo" placeholder="Select LGA">
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>House No</FormLabel>
              <Input name="houseno" placeholder="House No" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>Street Name</FormLabel>
              <Input name="street" placeholder="Street Name" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>City of Residence</FormLabel>
              <Input
                name="residencecity"
                placeholder="Enter City of Residence"
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>State of Residence</FormLabel>
              <Select name="stateofr" placeholder="Select">
                {stateofr.map((stateofr) => (
                  <option key={stateofr} value={stateofr}>
                    {stateofr}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isRequired>
              <FormLabel>LGA of Residence</FormLabel>
              <Select name="lgafo" placeholder="Select">
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <Checkbox isRequired>I agree to the terms and conditions.</Checkbox>
          </GridItem>

          <GridItem colSpan={2}>
            <Button
              type="submit"
              bg={colors.brand.primary}
              color={colors.white.text}
              _hover={{ bg: colors.brand.primaryDark }}
              size="lg"
              width="full"
            >
              Submit Application
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}

export default Application
