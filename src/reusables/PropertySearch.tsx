import React, { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Select,
  Heading,
} from "@chakra-ui/react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { lgaofo } from "@/data"
import { colors } from "@/theme/colors"
import "@/App.css"

interface PropertySearchProps {
  onClose?: () => void // Make onClose optional
}

const PropertySearch: React.FC<PropertySearchProps> = ({ onClose }) => {
  const navigate = useNavigate()
  const [selectedState, setSelectedState] = useState("")
  const [selectedLocalGov, setSelectedLocalGov] = useState("")

  const handleSearch = async () => {
    if (onClose) {
      onClose()
    }
    Swal.fire({
      title: "Property Not Found!",
      text: "Would you like to register a new Property?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Register Property",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Register Property", navigate to RegisterProperty
        navigate("/Property/register") // Update this with your path to the RegisterProperty component
      } else if (result.dismiss === Swal.DismissReason.cancel && onClose) {
        // Optional: Close the modal if there's one
        onClose()
      }
    })
  }

  return (
    <Box
      bg={colors.gray[100]}
      p="18px"
      w="auto"
      mb={5}
      maxW="800px"
      boxShadow="0px 8px 32px rgba(0, 0, 0, 0.06)"
      borderRadius="4px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="86vh"
    >
      <Heading textAlign="center" color={colors.brand.primary} mb="4">
        Find Property
      </Heading>
      <Tabs isFitted variant="enclosed" colorScheme="blue">
        <TabList mb="1em">
          <Tab>By Address</Tab>
          <Tab>By Property ID</Tab>
          <Tab>Info</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={2}>
              <FormControl id="state" isRequired>
                <FormLabel>State</FormLabel>
                <Select
                  placeholder="Select State"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {Object.keys(lgaofo).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl id="local-government" isRequired>
                <FormLabel>Local Government</FormLabel>
                <Select
                  placeholder="Select Local Government"
                  value={selectedLocalGov}
                  onChange={(e) => setSelectedLocalGov(e.target.value)}
                  mt={4}
                >
                  {lgaofo[selectedState] &&
                    lgaofo[selectedState].map((lg) => (
                      <option key={lg} value={lg}>
                        {lg}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <FormControl id="house-number" isRequired>
                <FormLabel>House Number</FormLabel>
                <Input placeholder="Enter House Number" />
              </FormControl>
              <FormControl id="street-name" isRequired>
                <FormLabel>Street Name</FormLabel>
                <Input placeholder="Enter Street Name" />
              </FormControl>
              <Button
                mt={4}
                bg={colors.brand.primary}
                color="white"
                w="full"
                _hover={{ bg: colors.brand.primaryDark }}
                onClick={handleSearch}
              >
                Search by Address
              </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <FormControl id="Property-id" isRequired>
              <FormLabel>Property Identification Number</FormLabel>
              <Input placeholder="Enter Property ID" />
              <Button
                mt={4}
                bg={colors.brand.primary}
                color="white"
                w="full"
                _hover={{ bg: colors.brand.primaryDark }}
                onClick={handleSearch}
              >
                Search by Property ID
              </Button>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <Text>
              For more information on how to use this tool or other inquiries,
              please contact our support team or visit our help center.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default PropertySearch
