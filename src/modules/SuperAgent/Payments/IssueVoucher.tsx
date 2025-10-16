import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  Spinner,
  Flex,
  useToast,
} from "@chakra-ui/react"
import usersService from "@/services/usersServices" // Import the service to fetch vouchers and drivers
import Auth from "@/utils/auth"

interface Voucher {
  _id: string
  type: string
  price: number
  category: string
}

interface Driver {
  tag: string
  fullName: string
  vehiclePlateNumber: string
  vehicleType: string
}

interface PaymentFormProps {
  onClose: () => void
  onSuccess: () => void // Function to refresh wallet balance
  onVoucherIssued: (voucher: Voucher) => void // Function to handle issued voucher
}

const IssueVoucher: React.FC<PaymentFormProps> = ({
  // eslint-disable-next-line unused-imports/no-unused-vars
  onClose,
  onVoucherIssued,
}) => {
  const [driverTag, setDriverTag] = useState<string>("")
  const [driverDetails, setDriverDetails] = useState<Driver | null>(null)
  const [selectedVoucherType, setSelectedVoucherType] =
    useState<Voucher | null>(null)
  // Store the full voucher type object
  const [vouchers, setVouchers] = useState<Voucher[]>([]) // Dynamic vouchers from backend
  const [loading, setLoading] = useState<boolean>(false)
  const [voucherLoading, setVoucherLoading] = useState<boolean>(true) // New loading state for vouchers
  const toast = useToast()

  // Fetch vouchers from the backend on component mount
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setVoucherLoading(true) // Start loading vouchers
        const response = await usersService.getVouchers() // Fetch vouchers from backend
        setVouchers(response) // Set the vouchers from backend
      } catch (error) {
        console.error("Error fetching vouchers:", error)
        toast({
          title: "Error fetching vouchers",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setVoucherLoading(false) // End loading vouchers
      }
    }
    fetchVouchers() // Call the function
  }, [toast])

  // Handle searching for the driver by tag
  const handleSearchDriver = async () => {
    if (!driverTag) return

    setLoading(true)
    try {
      const response = await usersService.getDriverByTag(driverTag)
      setDriverDetails(response) // Set driver details
      const { vehicleType } = response

      // Standardize "Tricycle" and "Keke" for voucher matching
      const standardizedVehicleType =
        vehicleType.toLowerCase() === "tricycle"
          ? "keke"
          : vehicleType.toLowerCase()

      // Automatically select the voucher based on standardized vehicle type
      const selectedVoucher = vouchers.find(
        (voucher) =>
          voucher.type.toLowerCase() === standardizedVehicleType &&
          voucher.category === "Driver Levy"
      )

      if (selectedVoucher) {
        setSelectedVoucherType(selectedVoucher)
      } else {
        setSelectedVoucherType(null)
        toast({
          title: "No voucher available",
          description: `No voucher found for vehicle type: ${vehicleType}. Available voucher types: ${vouchers
            .map((v) => v.type)
            .join(", ")}`,
          status: "warning",
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error fetching driver details:", error)
      toast({
        title: "Driver not found",
        description: "Please check the tag and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!driverDetails || !selectedVoucherType) return

    try {
      const payload = {
        driverTag: driverDetails.tag,
        voucherTypeId: selectedVoucherType._id,
        agentId: Auth.getAgentId(),
      }

      const response = await usersService.issueVoucher(payload)
      toast({
        title: "Voucher Issued",
        description: "The voucher was successfully issued to the driver.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      // Call the onVoucherIssued function passed as prop
      if (onVoucherIssued) {
        onVoucherIssued(response) // Pass the response data (voucher details) to the dashboard
      }

      onClose()
    } catch (error) {
      console.error("Error issuing voucher:", error)
      toast({
        title: "Error",
        description: "Failed to issue the voucher.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  if (voucherLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Box p={{ base: 4, md: 6 }} bg={"gray.100"} minH="100vh">
      <Heading
        mb={4}
        textAlign="center"
        size={{ base: "md", md: "lg" }}
        color={"brand.primary"}
      >
        Issue Voucher
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={{ base: 3, md: 4 }}>
          {/* Search by Driver Tag */}
          <FormControl id="driverTag" isRequired>
            <FormLabel>Driver Tag</FormLabel>
            <VStack spacing={2} align="stretch">
              <Input
                placeholder="Enter Driver Tag"
                value={driverTag}
                onChange={(e) => setDriverTag(e.target.value)}
                bg={"white"}
                size={{ base: "md", md: "md" }}
              />
              <Button
                bg={"brand.primary"}
                color={"white"}
                onClick={handleSearchDriver}
                alignSelf="flex-end"
                size={{ base: "sm", md: "md" }}
                w={{ base: "full", md: "auto" }}
              >
                Search
              </Button>
            </VStack>
          </FormControl>

          {/* Driver details */}
          {loading ? (
            <Spinner />
          ) : driverDetails ? (
            <>
              <FormControl id="driverName" isRequired>
                <FormLabel>Driver Name</FormLabel>
                <Input value={driverDetails.fullName} isReadOnly bg={"white"} />
              </FormControl>

              <FormControl id="vehiclePlateNumber" isRequired>
                <FormLabel>Vehicle Plate Number</FormLabel>
                <Input
                  value={driverDetails.vehiclePlateNumber}
                  isReadOnly
                  bg={"white"}
                />
              </FormControl>

              <FormControl id="voucherType" isRequired>
                <FormLabel>Voucher Type</FormLabel>
                <Input
                  value={selectedVoucherType?.type || ""}
                  isReadOnly
                  bg={"white"}
                />
              </FormControl>

              <FormControl id="amount" isRequired>
                <FormLabel>Amount To Pay (₦)</FormLabel>
                <Input
                  type="number"
                  value={selectedVoucherType?.price || ""}
                  isReadOnly
                  bg={"white"}
                />
              </FormControl>
            </>
          ) : null}

          <VStack spacing={3} w="full">
            <Button
              bg={"brand.primary"}
              color={"white"}
              _hover={{ bg: "brand.primaryDark" }}
              type="submit"
              isDisabled={!driverDetails || !selectedVoucherType}
              w="full"
              size={{ base: "md", md: "md" }}
            >
              Submit For Processing
            </Button>
            <Flex w="full" gap={3} direction={{ base: "column", sm: "row" }}>
              <Button
                bg={"gray.300"}
                color={"white"}
                _hover={{ bg: "gray.400" }}
                type="reset"
                onClick={() => {
                  setDriverTag("")
                  setDriverDetails(null)
                  setSelectedVoucherType(null)
                }}
                flex={1}
                size={{ base: "md", md: "md" }}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                borderColor="gray.300"
                color="gray.700"
                _hover={{ bg: "gray.50" }}
                onClick={onClose}
                flex={1}
                size={{ base: "md", md: "md" }}
              >
                Cancel
              </Button>
            </Flex>
          </VStack>
        </VStack>
      </form>
    </Box>
  )
}

IssueVoucher.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onVoucherIssued: PropTypes.func.isRequired, // New prop for handling issued voucher
}

export default IssueVoucher
