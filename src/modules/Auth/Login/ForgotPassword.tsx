import React, { useState } from "react"
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import authService from "@/services/authService"
import type { IError } from "@/types"
import { colors } from "@/theme/colors"
import "@/App.css"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState("")

  const { mutate, isLoading } = useMutation({
    mutationFn: () => authService.initiateForgotPassword({ email }),
    onError: (error: IError) => {
      toast({
        title: "Error",
        description: error?.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
    onSuccess: () => {
      toast({
        title: "One more step",
        description: "An OTP has been sent to your email address",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
      navigate("/reset-password")
    },
  })

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h="100vh"
      className="office-bg"
    >
      <Box
        bg={colors.gray[100]}
        p="24px"
        w="auto"
        maxW="600px"
        boxShadow="0px 8px 32px rgba(0, 0, 0, 0.06)"
        borderRadius="4px"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutate()
          }}
        >
          <Heading mb={4} textAlign="center" color={colors.brand.primary}>
            Password Reset
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              size="lg"
              sx={{
                border: "1px solid",
                borderColor: "gray.500",
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                background: "#fff",
              }}
              focusBorderColor="#0C288D"
            />
          </FormControl>
          <Button
            type="submit"
            bg={colors.brand.primary}
            color="white"
            w="full"
            mt={4}
            _hover={{ bg: colors.brand.primaryDark }}
            isLoading={isLoading}
            isDisabled={!email}
          >
            Send Reset Instructions
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

export default ForgotPassword
