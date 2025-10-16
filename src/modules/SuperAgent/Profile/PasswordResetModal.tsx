import React from "react"
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Icon,
  Text,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import eye from "@/assets/eye.svg"
import { ReactComponent as Passed } from "@/assets/checked.svg"
import { ReactComponent as Failed } from "@/assets/cancel.svg"
import { useTestPassword } from "@/hooks/useTestPassword"
import authService from "@/services/authService"

const PasswordResetModal = ({
  isOpen,
  onClose,
  email,
}: {
  isOpen: boolean
  onClose: () => void
  email: string // Add email prop
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Required"),
      newPassword: Yup.string().required("Required"),
      newPasswordConfirmation: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Passwords don't match"
      ),
    }),
    onSubmit: async (values) => {
      try {
        await authService.changePassword({
          newPassword: values.newPassword,
          email, // Use the email prop
        })
        toast({
          title: "Success",
          description: "Password changed successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        onClose() // Close the modal on success
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        }
      }
    },
  })

  const test = useTestPassword(formik.values.newPassword)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" color="black" opacity="1">
        <ModalHeader
          mt="30px"
          letterSpacing="-2px"
          fontWeight={500}
          fontSize="36px"
          color="#202020"
        >
          Change Password
        </ModalHeader>
        <ModalCloseButton mt="35px" color="#0B3142" fontWeight="bold" />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <VStack gap="6px">
              <FormControl isInvalid={!!formik.errors.currentPassword}>
                <Box mt="12px">
                  <FormLabel fontSize="14px" color="#003E5180">
                    Enter Current Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name="currentPassword"
                      size="lg"
                      type={showPassword ? "text" : "password"}
                      placeholder={"Enter your password"}
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                    />
                    <InputRightElement mt="5px">
                      <Image
                        my="auto"
                        src={eye}
                        onClick={togglePassword}
                      ></Image>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </FormControl>
              <FormControl isInvalid={!!formik.errors.newPassword}>
                <Box mt="12px">
                  <FormLabel fontSize="14px" color="#003E5180">
                    Enter new Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name="newPassword"
                      size="lg"
                      type={showPassword ? "text" : "password"}
                      placeholder={"Enter your password"}
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                    />
                    <InputRightElement mt="5px">
                      <Image
                        my="auto"
                        src={eye}
                        onClick={togglePassword}
                      ></Image>
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </FormControl>
              <FormControl isInvalid={!!formik.errors.newPasswordConfirmation}>
                <Box mt="12px">
                  <FormLabel fontSize="14px" color="#003E5180">
                    Re-enter new Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name="newPasswordConfirmation"
                      size="lg"
                      type={showPassword ? "text" : "password"}
                      placeholder={"Enter your password"}
                      value={formik.values.newPasswordConfirmation}
                      onChange={formik.handleChange}
                    />
                    <InputRightElement mt="5px">
                      <Image
                        my="auto"
                        src={eye}
                        onClick={togglePassword}
                      ></Image>
                    </InputRightElement>
                  </InputGroup>
                  {!!formik.errors.newPasswordConfirmation && (
                    <FormErrorMessage>
                      {formik.errors.newPasswordConfirmation}
                    </FormErrorMessage>
                  )}
                </Box>
              </FormControl>
            </VStack>
            <VStack align="start" gap="4px" mt="20px">
              {[
                { status: test.lowerCaseTest, text: "One lowercase letter" },
                { status: test.upperCaseTest, text: "One uppercase letter" },
                { status: test.numberTest, text: "One number" },
                {
                  status: test.specialCharacterTest,
                  text: "One special character",
                },
              ].map(({ status, text }, index) => (
                <Flex key={index} gap="8px">
                  <Icon as={status ? Passed : Failed} />
                  <Text fontSize="12px" fontWeight={500}>
                    {text}
                  </Text>
                </Flex>
              ))}
            </VStack>
            <Button
              isDisabled={
                !formik.dirty ||
                Object.keys(formik.errors).length > 0 ||
                !Object.values(test).every((value) => value)
              }
              type="submit"
              width="100%"
              mt="20px"
              mb="40px"
              variant="app-primary"
              size="lg"
            >
              Change Password
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PasswordResetModal
