import React, { useState, useEffect } from "react"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { makePayment } from "@/reusables/payment/remita/paymentHandler" // Adjust the import path as needed
import useScript from "@/reusables/payment/remita/useScript" // Adjust the import path as needed
import { colors } from "@/theme/colors"

interface FundingFormProps {
  isOpen: boolean
  onClose: () => void
}

const FundingForm: React.FC<FundingFormProps> = ({ onClose }) => {
  const [amount, setAmount] = useState("")

  // Hardcoded payment details retrieved from local storage
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [narration] = useState("Funding account for Boulevard")

  useEffect(() => {
    // Retrieve details from local storage
    const storedEmail =
      localStorage.getItem("email") || "defaultEmail@example.com"
    const storedFirstName = localStorage.getItem("firstName") || "John"
    const storedLastName = localStorage.getItem("lastName") || "Doe"

    setEmail(storedEmail)
    setFirstName(storedFirstName)
    setLastName(storedLastName)
  }, [])

  // Load the Remita payment script
  useScript(
    "https://remitademo.net/payment/v1/remita-pay-inline.bundle.js",
    () => console.log("Remita script loaded successfully")
  )

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Prepare the payment details
    const paymentDetails = {
      email,
      firstName,
      lastName,
      amount,
      narration,
    }

    // Initiate the payment
    makePayment(paymentDetails)
    onClose() // Close the modal after submission
  }

  return (
    <Box p={6} bg={colors.gray[100]}>
      <Heading mb={4} textAlign="center" size="lg" color={colors.brand.primary}>
        Fund Account
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
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
            >
              Proceed to Payment
            </Button>
            <Button
              bg={colors.gray[300]}
              color={colors.white.text}
              _hover={{ bg: colors.gray[400] }}
              type="reset"
              onClick={() => setAmount("")} // Clear the amount input on reset
            >
              Reset
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  )
}

export default FundingForm
