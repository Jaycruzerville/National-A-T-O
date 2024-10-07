import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  useToast,
  Heading,
} from "@chakra-ui/react"
import PaystackPop from "@paystack/inline-js"
import usersService from "@/services/usersServices" // Adjust the path as needed
import { colors } from "@/theme/colors"
import Auth from "@/utils/auth"
import { useQueryClient } from "@tanstack/react-query" // Import useQueryClient

interface FundingFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void // Add this line
}

const FundingForm: React.FC<FundingFormProps> = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState("")
  const [gateway, setGateway] = useState("paystack")
  const [email, setEmail] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [verificationMessage, setVerificationMessage] = useState("")
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isSuccess, setIsSuccess] = useState(false)
  const queryClient = useQueryClient()

  const toast = useToast() // Use toast for notifications

  useEffect(() => {
    const storedEmail =
      localStorage.getItem("email") || "ogunsakinjoshua@gmail.com"
    setEmail(storedEmail)
  }, [])

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleGatewayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGateway(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsVerifying(true)

    try {
      const paymentData = {
        email,
        amount,
        gateway,
      }

      const response = await usersService.initializeFundingTransaction(
        paymentData
      )
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { authorizationUrl, reference } = response

      if (gateway === "paystack") {
        const paystack = new PaystackPop()
        paystack.newTransaction({
          key: "pk_test_32df4595b3735ddc88c7bcf0f1d3f8c6b676f4dd", // Replace with your Paystack public key
          reference: reference,
          amount: parseInt(amount) * 100, // Convert to kobo (for naira)
          email: email,
          onSuccess: async (transaction: { reference: string }) => {
            await verifyPayment(transaction.reference)
          },
          onCancel: () => {
            setVerificationMessage("Payment cancelled.")
            setShowModal(true)
            setIsVerifying(false)
          },
        })
      }
    } catch (error) {
      console.error("Error initializing payment:", error)
      setVerificationMessage("Error initializing payment. Please try again.")
      setShowModal(true)
      setIsVerifying(false)
    }
  }

  const verifyPayment = async (reference: string) => {
    try {
      const agentId = Auth.getAgentId() // Call the function to get agentId
      if (!agentId) {
        throw new Error("Agent ID not found")
      }

      const verificationData = await usersService.verifyFundingTransaction({
        reference,
        gateway: "paystack", // We're handling Paystack here
      })

      if (verificationData.status === "success") {
        setVerificationMessage(
          `Wallet funded with ₦${verificationData.walletBalance}. Transaction reference: ${verificationData.reference}`
        )
        setIsSuccess(true)

        // Store the transaction details after successful verification
        await storeTransaction({
          agentId: agentId, // Use the agentId obtained
          amount: parseInt(amount), // Use the amount entered by the user, not walletBalance
          reference: verificationData.reference,
          gateway: "paystack", // Assuming paystack was used
          status: "success", // Payment success
        })

        // Show success toast notification
        toast({
          title: "Payment Successful",
          description: `Your wallet has been funded with ₦${verificationData.walletBalance}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        })

        // Call the onSuccess function to refresh the dashboard
        onSuccess()
        // Invalidate the transactions list query
        queryClient.invalidateQueries(["all_transactions"])
        onClose() // Close the modal after success
      } else {
        setVerificationMessage("Payment verification failed. Please try again.")
        setIsSuccess(false)

        toast({
          title: "Payment Failed",
          description: "Payment verification failed. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        })

        onClose() // Close the modal
      }

      setShowModal(false) // Close the verification modal
    } catch (error) {
      console.error("Payment verification failed:", error)
      setVerificationMessage("Error verifying payment. Please try again.")
      setIsSuccess(false)
      setShowModal(false) // Close the verification modal

      toast({
        title: "Payment Error",
        description: "An error occurred while verifying the payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      })

      onClose() // Close the modal
    } finally {
      setIsVerifying(false)
    }
  }

  const storeTransaction = async (transactionData: {
    agentId: string
    amount: number
    reference: string
    gateway: string
    status: string
  }) => {
    try {
      const response = await usersService.storeTransaction(transactionData)
      console.log("Transaction stored successfully:", response)
    } catch (error) {
      console.error("Error storing transaction:", error)
    }
  }

  return (
    <Box p={6} bg={colors.gray[100]}>
      <Heading mb={4} textAlign="center" size="lg" color={colors.brand.primary}>
        Fund Account
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="gateway" isRequired>
            <FormLabel>Select Payment Gateway</FormLabel>
            <Select value={gateway} onChange={handleGatewayChange}>
              <option value="paystack">Paystack</option>
              <option value="remita">Remita</option>
            </Select>
          </FormControl>

          <FormControl id="amount" isRequired>
            <FormLabel>Amount To Fund (₦)</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </FormControl>

          <HStack spacing={4}>
            <Button
              bg={colors.brand.primary}
              color={colors.white.text}
              _hover={{ bg: colors.brand.primaryDark }}
              type="submit"
              isDisabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Proceed to Payment"}
            </Button>
            <Button
              bg={colors.gray[300]}
              color={colors.white.text}
              _hover={{ bg: colors.gray[400] }}
              type="reset"
              onClick={() => setAmount("")}
            >
              Reset
            </Button>
          </HStack>
        </VStack>
      </form>

      {/* Loader */}
      {isVerifying && (
        <Flex justifyContent="center" alignItems="center" mt={6}>
          <Spinner size="lg" />
          <Text ml={4}>Verifying Payment...</Text>
        </Flex>
      )}

      {/* Modal for Success/Error Message */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text>{verificationMessage}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default FundingForm
