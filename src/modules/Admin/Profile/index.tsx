import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  useDisclosure,
  Stack,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import PasswordResetModal from "./PasswordResetModal"
// import ProfilePicture from "./ProfilePicture"
import agentImage from "@/assets/agentImage.svg"
import EditAgentModal from "@/reusables/EditAgentModal"
import { Divider } from "@chakra-ui/layout"

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: "Bilikisu Faderera",
      phone: "0802000000",
      email: "shadeblade@gmail.com",
      role: "Admin",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Required"),
      phone: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email address"),
      role: Yup.string(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Box>
      <Box padding="20px" bg="#EEF1FD">
        <Text
          fontSize="24px"
          fontWeight={700}
          fontFamily={`'Cabinet Grotesk', sans-serif`}
        >
          Profile
        </Text>
      </Box>
      <Box bg="#fff" p="20px 24px" h="100vh">
        {/* <ProfilePicture /> */}
        <Flex justify="space-between" align="center">
          <Stack direction="row" gap="8px" align="center">
            <img
              src={agentImage}
              alt="agent"
              style={{ cursor: "pointer", width: "66px", height: "66px" }}
            />
            <Box>
              <Text color="#003E51" fontWeight="bold">
                Bilikisu Faderera
              </Text>
              <Text fontSize="14px" color="#a7a7a7">
                Admin
              </Text>
            </Box>
          </Stack>
          <Box>
            <Text fontSize="14px">Date Created</Text>
            <Text color="#003E51" fontWeight="bold" fontSize="18px">
              28 Nov 2022
            </Text>
          </Box>
        </Flex>
        <Divider my="16px" />
        <Box mt="50px">
          <form onSubmit={formik.handleSubmit}>
            <VStack align="start" spacing="8px">
              <Flex align="center" gap="20px">
                <Text color="#000000" w="120px">
                  Email
                </Text>
                <Text color="#003E51" fontWeight="bold">
                  bilikisufaderera@gmail.com
                </Text>
              </Flex>
              <Flex align="center" gap="20px">
                <Text color="#000000" w="120px">
                  Phone number
                </Text>
                <Text color="#003E51" fontWeight="bold">
                  08102345678
                </Text>
              </Flex>
            </VStack>
            <Button
              // isDisabled={
              //   !formik.dirty || Object.keys(formik.errors).length > 0
              // }
              onClick={onOpenEdit}
              mt="40px"
              variant="outline"
              sx={{
                bg: "#fff",
                border: "1px solid #5C616A",
                color: "brand.primary",
              }}
            >
              Edit Details
            </Button>
          </form>
        </Box>
        <Button
          onClick={onOpen}
          mt="16px"
          size="sm"
          variant="outline"
          color="#2D4875"
        >
          Change Password
        </Button>
      </Box>
      <PasswordResetModal isOpen={isOpen} onClose={onClose} />
      <EditAgentModal
        data={{ firstName: "super", lastName: "admin" }}
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        userType="Agent"
      />
    </Box>
  )
}

export default index
