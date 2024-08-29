import { Button } from "@chakra-ui/button"
import {
  Select,
  Text,
  Input,
  Box,
  // Modal,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useToast,
  Drawer,
} from "@chakra-ui/react"
import useStateAndLGA from "@/hooks/useStateAndLGA"
import { useEffect, useState } from "react"
import ProfilePicture from "@/modules/SuperAdmin/Profile/ProfilePicture"
import { useFormik } from "formik"
import PhoneInput from "./PhoneInput"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import SuperAdminService from "@/services/superAdminServices"
import { IError } from "@/types"

type AgentModalType = {
  userType: "Agent" | "Super Agent" | "Customer"
  isOpen: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
}

const EditAgentModal = ({
  userType,
  onClose,
  isOpen,
  data,
}: AgentModalType) => {
  const [selectedState, setselectedState] = useState("Abia")
  const queryClient = useQueryClient()
  const toast = useToast()
  const { states, LGAs, loadingLGAs } = useStateAndLGA(selectedState)
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<
    string | undefined
  >("")
  const [image, setImage] = useState<File | null>(null)
  const { mutate, isLoading } = useMutation(SuperAdminService.editUser, {
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
    onSuccess: () => {
      toast({
        title: "Success",
        description: `${userType} updated successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      queryClient.invalidateQueries({
        queryKey: [`${userType.toLowerCase()}-details`],
      })
      onClose()
    },
  })

  const { handleChange, handleSubmit, values, resetForm } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      state: "",
      lga: "",
      email: "",
    },
    onSubmit: async (values) => {
      const { state, address, lga, ...rest } = values
      const formData = new FormData()
      if (image !== null) {
        formData.append("image", image)
      }
      formData.append("firstName", rest.firstName)
      formData.append("lastName", rest.lastName)
      formData.append(
        "phoneNumber",
        rest?.phoneNumber?.replace(/\s/g, "") ?? ""
      )
      formData.append("address", address)
      formData.append("stateId", state)
      formData.append("lgaId", lga)
      formData.append("userType", userType.split(" ").join("-").toLowerCase())
      formData.append("id", data?.id)
      mutate(formData)
    },
  })
  useEffect(() => {
    resetForm({
      values: {
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
        address: data?.agentAddress?.location,
        state: data?.agentAddress?.state,
        lga: data?.agentAddress?.country,
        email: data?.email,
      },
    })
  }, [isOpen])
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
      <DrawerOverlay />
      <form onSubmit={handleSubmit}>
        <DrawerContent
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            width: "420px",
          }}
        >
          <DrawerHeader>
            <Text textStyle="headText">Edit {userType ?? ""}</Text>
          </DrawerHeader>
          <DrawerCloseButton top="2.2rem" color="brand.primary" />
          <DrawerBody>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "0px",
                position: "relative",
                marginBottom: "25px",
              }}
            >
              <ProfilePicture
                defaultImage={data?.profilePicture}
                image={image}
                setImage={setImage}
              />
            </Box>
            <Flex gap="8px">
              <Box>
                <Text
                  style={{
                    marginTop: "12px",
                    color: "#003E51",
                    fontSize: "14px",
                    fontWeight: "Bold",
                  }}
                >
                  Firstname
                </Text>
                <Input
                  variant="outline"
                  name="firstName"
                  defaultValue={values.firstName}
                  value={values.firstName}
                  onChange={handleChange}
                  color="#003E51"
                  fontSize="14px"
                  style={{ marginTop: "6px", height: "48px" }}
                />
              </Box>
              <Box>
                <Text
                  style={{
                    marginTop: "12px",
                    color: "#003E51",
                    fontSize: "14px",
                    fontWeight: "Bold",
                  }}
                >
                  Lastname
                </Text>
                <Input
                  variant="outline"
                  name="lastName"
                  defaultValue={values.lastName}
                  value={values.lastName}
                  onChange={handleChange}
                  color="#003E51"
                  fontSize="14px"
                  style={{ marginTop: "6px", height: "48px" }}
                />
              </Box>
            </Flex>
            <Text
              style={{
                marginTop: "12px",
                color: "#003E51",
                fontSize: "14px",
                fontWeight: "Bold",
              }}
            >
              Phone Number
            </Text>
            <PhoneInput
              onChange={handleChange}
              value={values.phoneNumber}
              defaultValue={values.phoneNumber}
              name="phoneNumber"
              setInternationalFormat={setFormattedPhoneNumber}
            />
            <Text
              style={{
                marginTop: "12px",
                color: "#003E51",
                fontSize: "14px",
                fontWeight: "Bold",
              }}
            >
              Email
            </Text>
            <Input
              variant="outline"
              name="email"
              onChange={handleChange}
              defaultValue={values.email}
              value={values.email}
              disabled
              color="#003E51"
              fontSize="14px"
              style={{ marginTop: "6px", height: "48px" }}
            />
            <Text
              style={{
                marginTop: "12px",
                color: "#003E51",
                fontSize: "14px",
                fontWeight: "Bold",
              }}
            >
              Address
            </Text>
            <Input
              variant="outline"
              name="address"
              defaultValue={values.address}
              value={values.address}
              onChange={handleChange}
              color="#003E51"
              fontSize="14px"
              style={{ marginTop: "6px", height: "48px" }}
            />
            <Text
              style={{
                marginTop: "12px",
                color: "#003E51",
                fontSize: "14px",
                fontWeight: "Bold",
              }}
            >
              Select State
            </Text>
            <Select
              placeholder={values?.state ?? ""}
              _placeholder={{ color: "#003E51" }}
              name="state"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              height="48px"
              marginTop="6px"
              onChange={(e) => {
                handleChange(e)
                setselectedState(e.target.value)
              }}
            >
              {states?.map(
                ({ name, id }: { name: string; id: string }, index: number) => (
                  <option value={id} key={index}>
                    {name}
                  </option>
                )
              )}
            </Select>
            <Text
              style={{
                marginTop: "12px",
                color: "#003E51",
                fontSize: "14px",
                fontWeight: "Bold",
              }}
            >
              Select LGA
            </Text>
            <Select
              placeholder={values?.lga ?? ""}
              _placeholder={{
                color: "#003E51",
                fontSize: "14px",
                fontWeight: "Bold",
              }}
              name="lga"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              height="48px"
              marginTop="6px"
              onChange={handleChange}
              isDisabled={loadingLGAs}
            >
              {LGAs?.map(
                ({ name, id }: { name: string; id: string }, index: number) => (
                  <option value={id} key={index}>
                    {name}
                  </option>
                )
              )}
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button
              type="submit"
              isLoading={isLoading}
              backgroundColor="brand.primary"
              style={{
                width: "100%",
                height: "48px",
                color: "#fff",
                borderRadius: "4px",
              }}
            >
              Save changes
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  )
}

export default EditAgentModal
