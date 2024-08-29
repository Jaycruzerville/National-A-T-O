import PhoneInput from "@/reusables/PhoneInput"
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  InputProps,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"

interface PageInputProps extends InputProps {
  placeholder?: string
}

const PageFormLabel = ({ label }: { label: string }) => {
  return <FormLabel color="#003E51">{label}</FormLabel>
}

const PageInput = ({ placeholder, ...rest }: PageInputProps) => {
  return (
    <Input
      textStyle="headText"
      {...rest}
      size="lg"
      sx={{
        border: "1px solid",
        borderColor: "gray.500",
        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        background: "#fff",
      }}
      placeholder={placeholder ?? ""}
      _placeholder={{
        color: "#607F88",
        fontSize: "14px",
      }}
    />
  )
}

const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      phone: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  return (
    <Container maxW="container.xl" mt={{ base: "20px", md: "10px" }}>
      <Box textStyle="headText">
        <Flex wrap="wrap">
          <Box
            color="#fff"
            p="10"
            bg="brand.primaryDark"
            width={{ base: "100%", md: "40%" }}
          >
            <Heading size={{ base: "lg", md: "xl" }} fontWeight={700}>
              Come talk with Us
            </Heading>
            <Text mt="4">
              Would you like to learn more about GIS-GRP? How to be an Agent or
              you just want to benefit from GIS-GRP services
            </Text>
            <VStack align="flex-start" mt="5" spacing="5">
              <Heading fontSize="24px">Contact Info</Heading>
              <Text fontWeight={700}>Phone Number: (234) 812 345 6789</Text>
              <Text fontWeight={700}>Email: Hello@GIS-GRP.com</Text>
              <Text fontWeight={700}>Address: Lagos State</Text>
            </VStack>
          </Box>
          <Box bg="brand.bgLight" p="5" width={{ base: "100%", md: "60%" }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing="3">
                <FormControl isInvalid={!!formik.errors.fullName}>
                  <PageFormLabel label="Full Name" />
                  <PageInput
                    name="fullName"
                    placeholder="Kindly enter your full name"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                  />
                </FormControl>
                <Flex gap="3" wrap={{ base: "wrap", md: "nowrap" }}>
                  <FormControl isInvalid={!!formik.errors.phone}>
                    <PageFormLabel label="Phone Number" />
                    <PhoneInput
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                  </FormControl>
                  <FormControl isInvalid={!!formik.errors.email}>
                    <PageFormLabel label="Email Address" />
                    <PageInput
                      name="email"
                      placeholder="Kindly enter your email address"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </FormControl>
                </Flex>
                <FormControl isInvalid={!!formik.errors.message}>
                  <PageFormLabel label="Message" />
                  <Textarea
                    name="message"
                    rows={10}
                    placeholder="Please enter your message"
                    resize="none"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    sx={{
                      border: "1px solid",
                      borderColor: "gray.500",
                      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                      background: "#fff",
                    }}
                    _placeholder={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      color: "#607F88",
                      fontSize: "14px",
                    }}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fontSize="16px"
                  size="lg"
                  width="200px"
                  variant="app-primary"
                  bg="brand.primaryDark"
                >
                  Send Message
                </Button>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Box>
    </Container>
  )
}

export default ContactPage
