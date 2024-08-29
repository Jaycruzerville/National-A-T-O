import { useState } from "react"
import useStateAndLGA from "@/hooks/useStateAndLGA"
import DrawerComponent from "@/reusables/DrawerComponent"
import AppFormLabel from "@/reusables/AppFormLabel"
import SuperAdminService from "@/services/superAdminServices"
import type { IError } from "@/types"
import {
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
  useToast,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useGetRoleId } from "@/hooks/useGetRoleId"
import { useProperty } from "@/hooks/useProperty"
import PhoneInput from "@/reusables/PhoneInput"

const AddAgentSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  address: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  lga: Yup.string().required("Required"),
})

const AddNewAgentDrawer = () => {
  const [selectedState, setselectedState] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<
    string | undefined
  >()
  const { states, LGAs, loadingLGAs } = useStateAndLGA(selectedState)
  const { roleId } = useGetRoleId("Agent")
  const { Property } = useProperty()
  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate, isLoading } = useMutation(SuperAdminService.addAgent, {
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
        description: "Agent added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      queryClient.invalidateQueries({ queryKey: ["agents"] })
      onClose()
    },
  })

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      state: "",
      lga: "",
      Property: null,
    },
    validationSchema: AddAgentSchema,
    onSubmit: (values) => {
      const data: Record<string, unknown> = {
        invites: [
          {
            ...values,
            phoneNumber: formattedPhoneNumber?.replace(/\s/g, ""),
            roleId,
            PropertyId: values.Property,
          },
        ],
      }
      Object.keys(data).forEach((k) => data[k] == null && delete data[k])

      mutate(data)
    },
  })

  return (
    <DrawerComponent
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Add new Agent"
      buttonText="Add new agent"
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" gap="12px">
          <FormControl isInvalid={!!errors.firstName}>
            <AppFormLabel title="Firstname" />
            <Input
              type="firstName"
              placeholder="Enter Agent Firstname"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="firstName"
              name="firstName"
              height="48px"
              onChange={handleChange}
              value={values.firstName}
            />
            {!!errors.firstName && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.firstName}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.lastName}>
            <AppFormLabel title="Lastname" />
            <Input
              type="lastName"
              placeholder="Enter Agent lastname"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="lastName"
              name="lastName"
              height="48px"
              onChange={handleChange}
              value={values.lastName}
            />
            {!!errors.lastName && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.lastName}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.phoneNumber}>
            <AppFormLabel title="Phone Number" />
            <PhoneInput
              onChange={handleChange}
              value={values.phoneNumber}
              name="phoneNumber"
              setInternationalFormat={setFormattedPhoneNumber}
            />
            {!!errors.phoneNumber && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.phoneNumber}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <AppFormLabel title="Email" />
            <Input
              type="email"
              placeholder="Enter Agent Email Address"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="email"
              name="email"
              height="48px"
              onChange={handleChange}
              value={values.email}
            />
            {!!errors.email && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.email}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.address}>
            <AppFormLabel title="Address" />
            <Input
              type="text"
              placeholder="Enter Agent Full Address"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="address"
              name="address"
              height="48px"
              onChange={handleChange}
              value={values.address}
            />
            {!!errors.address && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.address}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.Property}>
            <AppFormLabel title="Select Property/Union (optional)" />
            <Select
              placeholder="Select Agent Property/Union"
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="Property"
              onChange={handleChange}
            >
              {Property?.map(
                (
                  { PropertyName, id }: { PropertyName: string; id: string },
                  index: number
                ) => (
                  <option value={id} key={index}>
                    {PropertyName}
                  </option>
                )
              )}
            </Select>
            {!!errors.Property && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.Property}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.state}>
            <AppFormLabel title="Select State" />
            <Select
              placeholder="Select Agent State"
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="state"
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
            {!!errors.state && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.state}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.lga}>
            <AppFormLabel title="Select LGA" />
            <Select
              placeholder={loadingLGAs ? "loading...." : "Select Agent LGA"}
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="lga"
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
            {!!errors.state && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.state}
              </Text>
            )}
          </FormControl>
          <Spacer />
          <Button
            bgColor="brand.primary"
            type="submit"
            color="#ffffff"
            height="48px"
            _hover={{ bgColor: "none", opacity: "0.8" }}
            isLoading={isLoading}
          >
            Add Agent
          </Button>
        </Flex>
      </form>
    </DrawerComponent>
  )
}

export default AddNewAgentDrawer
