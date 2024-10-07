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
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react"
import usersService from "@/services/usersServices" // Import the service to fetch vouchers and drivers
import Auth from "@/utils/auth"

interface PaymentFormProps {
  onClose: () => void
  onSuccess: () => void // Function to refresh wallet balance
  onVoucherIssued: (voucher: any) => void // Function to handle issued voucher
}

const IssueVoucher: React.FC<PaymentFormProps> = ({
  // eslint-disable-next-line unused-imports/no-unused-vars
  onClose,
  onVoucherIssued,
}) => {
  const [driverTag, setDriverTag] = useState<string>("")
  const [driverDetails, setDriverDetails] = useState<any>(null)
  const [voucherType, setVoucherType] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [vouchers, setVouchers] = useState<Record<string, any>[]>([]) // Dynamic vouchers from backend
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
        setVoucherType(selectedVoucher.type)
        setAmount(selectedVoucher.price.toString())
      } else {
        setVoucherType("")
        setAmount("")
        toast({
          title: "No voucher available",
          description: `No voucher found for vehicle type: ${vehicleType}`,
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
    try {
      const payload = {
        driverTag: driverDetails.tag,
        voucherType: { type: voucherType, price: parseFloat(amount) },
        agentId: Auth.getAgentId(),
      }

      const response = await usersService.issueVoucher(payload)
      console.log("Voucher response:", response) // Add this to debug
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
    <Box p={6} bg={"gray.100"}>
      <Heading mb={4} textAlign="center" size="lg" color={"brand.primary"}>
        Issue Voucher
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {/* Search by Driver Tag */}
          <FormControl id="driverTag" isRequired>
            <FormLabel>Driver Tag</FormLabel>
            <HStack>
              <Input
                placeholder="Enter Driver Tag"
                value={driverTag}
                onChange={(e) => setDriverTag(e.target.value)}
                bg={"white"}
              />
              <Button
                bg={"brand.primary"}
                color={"white"}
                onClick={handleSearchDriver}
              >
                Search
              </Button>
            </HStack>
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
                <Input value={voucherType} isReadOnly bg={"white"} />
              </FormControl>

              <FormControl id="amount" isRequired>
                <FormLabel>Amount To Pay (₦)</FormLabel>
                <Input type="number" value={amount} isReadOnly bg={"white"} />
              </FormControl>
            </>
          ) : null}

          <HStack spacing={4}>
            <Button
              bg={"brand.primary"}
              color={"white"}
              _hover={{ bg: "brand.primaryDark" }}
              type="submit"
              isDisabled={!driverDetails || !voucherType}
            >
              Submit For Processing
            </Button>
            <Button
              bg={"gray.300"}
              color={"white"}
              _hover={{ bg: "gray.400" }}
              type="reset"
              onClick={() => {
                setDriverTag("")
                setDriverDetails(null)
                setVoucherType("")
                setAmount("")
              }}
            >
              Reset
            </Button>
          </HStack>
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
