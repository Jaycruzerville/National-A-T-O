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
import usersService from "@/services/usersServices"
import { colors } from "@/theme/colors"
import "@/App.css"

const VerifyEmail = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const token = new URLSearchParams(window.location.search).get("token")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!token) {
      setError("Invalid or expired verification link.")
      return
    }

    setError("")
    setLoading(true)

    try {
      await usersService.setAgentPassword(token, password)
      toast({
        title: "Success",
        description: "Password set successfully! Your account is now active.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      navigate("/login")
    } catch (error) {
      setError("Failed to set password. Try again or contact support.")
    } finally {
      setLoading(false)
    }
  }

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
        <form onSubmit={handleSubmit}>
          <Heading mb={4} textAlign="center" color={colors.brand.primary}>
            Create Your Password
          </Heading>
          <FormControl id="password" isRequired>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your new password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              size="lg"
              minLength={6}
              sx={{
                border: "1px solid",
                borderColor: "gray.500",
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                background: "#fff",
              }}
              focusBorderColor="#0C288D"
            />
          </FormControl>
          <FormControl id="confirmPassword" isRequired mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              size="lg"
              minLength={6}
              sx={{
                border: "1px solid",
                borderColor: "gray.500",
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                background: "#fff",
              }}
              focusBorderColor="#0C288D"
            />
          </FormControl>
          {error && (
            <Box color="red" mt={2} fontSize="14px" textAlign="center">
              {error}
            </Box>
          )}
          <Button
            type="submit"
            bg={colors.brand.primary}
            color="white"
            w="full"
            mt={4}
            _hover={{ bg: colors.brand.primaryDark }}
            isLoading={loading}
            isDisabled={!password || !confirmPassword}
          >
            {loading ? "Creating..." : "Create Password"}
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

export default VerifyEmail
