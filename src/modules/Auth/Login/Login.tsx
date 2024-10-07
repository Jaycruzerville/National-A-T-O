import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react"
import eye from "@/assets/eye.svg" // Assuming this is your eye icon path
import { Link as RouteLink } from "react-router-dom"
import Auth from "@/utils/auth"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import * as Yup from "yup"
import authService from "@/services/authService"
import type { IError } from "@/types"
import "../../../App.css"
import logo from "@/assets/Kano_logo.svg" // Logo import path

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const toast = useToast()

  // Change form field to `username` instead of `email`
  const formik = useFormik({
    initialValues: {
      username: "", // Changed from email to username
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"), // Validation for username
      password: Yup.string().required("Required"),
    }),
    onSubmit: () => {
      mutate()
    },
  })

  // Adjust mutation to reflect `username` login
  const { mutate, isLoading } = useMutation({
    mutationFn: () => authService.login(formik.values),
    onError: (error: IError) => {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
    onSuccess: (response) => {
      console.log("Login successful", response)

      // Correctly destructure response
      const { accessToken, refreshToken, role, user, email } = response // Use response directly

      // Store the tokens and role
      Auth.setToken(accessToken)
      Auth.setRefreshToken(refreshToken)
      Auth.setUserRole(role)
      Auth.setUserEmail(email)
      Auth.setUserData(user)

      if (user?.id) {
        Auth.setuserId(user.id)
      } else {
        console.error("userId not found in response")
      }

      // Redirect based on user role
      if (role === "Driver") {
        window.location.replace("/super-admin")
      } else {
        window.location.replace("/")
      }
    },
  })

  useEffect(() => {
    if (Auth.getUserRole()) {
      window.location.replace("/")
    }
  }, [])

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h="100vh"
      className="office-bg"
    >
      <Box
        bg={"#EEF1FD"}
        p="40px"
        w="408px"
        boxShadow="0px 8px 32px rgba(0, 0, 0, 0.06)"
        borderRadius="4px"
      >
        <Image
          src={logo}
          w="30%"
          alt="Company Logo"
          mb={4}
          style={{ display: "block", margin: "0 auto" }}
        />

        <form onSubmit={formik.handleSubmit}>
          {/* Change label and input name to `Username` */}
          <FormControl isInvalid={!!formik.errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              name="username" // Changed from email to username
              type="text" // Use text input for username
              placeholder="Enter your Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </FormControl>

          <FormControl mt={4} isInvalid={!!formik.errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <InputRightElement height="100%">
                <Button onClick={togglePassword} size="sm">
                  <Image src={eye} alt="Toggle visibility" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Text textAlign="right" mt={2}>
            <Link as={RouteLink} to="/auth/forgot-password">
              Forgot Password?
            </Link>
          </Text>

          <Button
            mt={4}
            w="full"
            color="white"
            bg="brand.primary"
            isLoading={isLoading}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Flex>
  )
}

export default Login
