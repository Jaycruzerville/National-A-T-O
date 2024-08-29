import React from "react"
import {
  Box,
  Button,
  Heading,
  Flex,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  FormControl,
  SimpleGrid,
  Link,
} from "@chakra-ui/react"
import eye from "@/assets/eye.svg"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { colors } from "@/theme/colors"
import "../../../App.css"

const PasswordReset = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      newPasswordConfirmation: "",
      otp: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Password is required"),
      otp: Yup.string().required("OTP is required"),
      newPasswordConfirmation: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords don't match")
        .required("Confirm your password"),
    }),
    onSubmit: () => {
      // Handle password reset logic here
      navigate("/")
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
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
        <form onSubmit={formik.handleSubmit}>
          <Heading mb={4} textAlign="center" color={colors.brand.primary}>
            Reset Password
          </Heading>
          <SimpleGrid columns={1} spacing={6} mb={4}>
            <FormControl id="otp">
              <FormLabel>OTP</FormLabel>
              <Input
                type="text"
                placeholder="Enter OTP"
                onChange={formik.handleChange}
                value={formik.values.otp}
              />
            </FormControl>
            <FormControl id="new-password">
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                />
                <InputRightElement>
                  <Image src={eye} onClick={togglePasswordVisibility} />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirm-password">
              <FormLabel>Confirm New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  onChange={formik.handleChange}
                  value={formik.values.newPasswordConfirmation}
                />
                <InputRightElement>
                  <Image src={eye} onClick={togglePasswordVisibility} />
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </SimpleGrid>
          <Button
            type="submit"
            bg={colors.brand.primary}
            color="white"
            w="full"
            mt={4}
            _hover={{ bg: colors.brand.primaryDark }}
            isDisabled={!formik.isValid || formik.isSubmitting}
          >
            Reset Password
          </Button>
          <Text mt={4} textAlign="center">
            Remember your password?{" "}
            <Link color={colors.brand.primary} href="/login">
              Login
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  )
}

export default PasswordReset
