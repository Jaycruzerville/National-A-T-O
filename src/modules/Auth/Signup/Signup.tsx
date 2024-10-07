import React from "react"
import {
  Box,
  Flex,
  Heading,
  Image,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  useToast,
} from "@chakra-ui/react"
import { colors } from "@/theme/colors"
import "@/App.css"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import logo from "@/assets/Kano_logo.svg"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation } from "@tanstack/react-query"
import authService from "@/services/authService"
import { Link as RouteLink, useNavigate } from "react-router-dom"
import { IError } from "@/types"

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { username, password } = values // Only extract username and password
      const payload = { username, password } // Prepare payload with just these fields
      mutate(payload)
    },
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload: { username: string; password: string }) =>
      authService.signup(payload),
    onError: (error: IError) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred during registration",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Signup successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      navigate("/auth/signin")
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
        <Image
          src={logo}
          w="20%"
          alt="Company Logo"
          mb={4}
          style={{ display: "block", margin: "0 auto" }}
        />
        <Heading mb={4} textAlign="center" color={colors.brand.primary}>
          REGISTER
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={!!formik.errors.username}
            id="username"
            isRequired
          >
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </FormControl>
          <FormControl
            isInvalid={!!formik.errors.password}
            id="password"
            isRequired
            mt={4}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl
            isInvalid={!!formik.errors.confirmPassword}
            id="confirm-password"
            isRequired
            mt={4}
          >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            bg={colors.brand.primary}
            color="white"
            w="full"
            mt={4}
            _hover={{ bg: colors.brand.primaryDark }}
            isLoading={isLoading}
            type="submit"
          >
            Register
          </Button>
        </form>
        <Text mt={3} textAlign="center">
          Already have an account?{" "}
          <Link as={RouteLink} to="/auth/signin" color={colors.brand.primary}>
            Sign in
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}

export default Signup
