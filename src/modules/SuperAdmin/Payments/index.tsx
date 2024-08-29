import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { colors } from "@/theme/colors"

const products: Record<string, number> = {
  product1: 100.0,
  product2: 200.0,
  product3: 300.0,
  product4: 400.0,
  product5: 500.0,
  product6: 600.0,
}

const properties: Record<string, string> = {
  Property1: "Building",
  Property2: "Estate 2",
  Property3: "Complex 3",
}

interface PaymentFormProps {
  selectedProduct: string
}

const PaymentForm: React.FC<PaymentFormProps> = ({ selectedProduct }) => {
  const [selectedProperty, setSelectedProperty] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  useEffect(() => {
    if (selectedProduct && products[selectedProduct]) {
      setAmount(products[selectedProduct].toString())
    }
  }, [selectedProduct])

  const handlePropertyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProperty(event.target.value)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Uncomment the line below to log the form data for testing purposes
    // console.log({
    //   selectedProduct,
    //   selectedProperty,
    //   amount,
    // });
  }

  return (
    <Box p={6} bg={colors.gray[100]}>
      <Heading mb={4} textAlign="center" size="lg" color={colors.brand.primary}>
        Payments
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="selectProperty" isRequired>
            <FormLabel>Select Property to Pay For</FormLabel>
            <Select
              placeholder="Select a Property"
              value={selectedProperty}
              onChange={handlePropertyChange}
              bg={colors.white}
            >
              {Object.keys(properties).map((key) => (
                <option key={key} value={key}>
                  {properties[key]}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="product" isRequired>
            <FormLabel>Service Name</FormLabel>
            <Select
              placeholder="Select Product"
              value={selectedProduct}
              bg={colors.white}
              isReadOnly
            >
              {Object.keys(products).map((productKey) => (
                <option key={productKey} value={productKey}>
                  {`Product ${productKey.charAt(productKey.length - 1)}`}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="amount" isRequired>
            <FormLabel>Amount To Pay (₦)</FormLabel>
            <Input type="number" value={amount} onChange={handleAmountChange} />
          </FormControl>

          <HStack spacing={4}>
            <Button
              bg={colors.brand.primary}
              color={colors.white.text}
              _hover={{ bg: colors.brand.primaryDark }}
              type="submit"
            >
              Submit For Processing
            </Button>
            <Button
              bg={colors.gray[300]}
              color={colors.white.text}
              _hover={{ bg: colors.gray[400] }}
              type="reset"
            >
              Reset
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  )
}

PaymentForm.propTypes = {
  selectedProduct: PropTypes.string.isRequired,
}

export default PaymentForm
