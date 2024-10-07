import { useState } from "react"
import DrawerComponent from "@/reusables/DrawerComponent"
import AppFormLabel from "@/reusables/AppFormLabel"
import usersService from "@/services/usersServices"
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
import PhoneInput from "@/reusables/PhoneInput"
import lgaofo from "@/data/lgaofo" // Import the LGA data object

const AddAgentSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  lga: Yup.string().required("LGA is required"),
  union: Yup.string().required("Union is required"),
  nin: Yup.string()
    .length(11, "NIN must be 11 digits long")
    .required("NIN is required"),
})

const AddNewAgentDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<
    string | undefined
  >()
  useGetRoleId("Agent")
  const queryClient = useQueryClient()
  const toast = useToast()

  // Filter LGAs to only show Kano LGAs
  const kanoLGAs = lgaofo["Kano"] || [] // Access only Kano state LGAs

  const { mutate, isLoading } = useMutation(usersService.addAgent, {
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
      username: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      lga: "", // LGA field for Kano LGAs
      union: "", // Union field
      nin: "", // NIN field
    },
    validationSchema: AddAgentSchema,
    onSubmit: (values) => {
      const data = {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber:
          formattedPhoneNumber?.replace(/\s/g, "") || values.phoneNumber,
        email: values.email,
        address: values.address,
        lga: values.lga,
        union: values.union,
        nin: values.nin,
      }

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
          <FormControl isInvalid={!!errors.username}>
            <AppFormLabel title="Username" />
            <Input
              type="text"
              placeholder="Enter Username"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="username"
              name="username"
              height="48px"
              onChange={handleChange}
              value={values.username}
            />
            {!!errors.username && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.username}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.firstName}>
            <AppFormLabel title="Firstname" />
            <Input
              type="text"
              placeholder="Enter Firstname"
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
              type="text"
              placeholder="Enter Lastname"
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
              placeholder="Enter Email Address"
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
              placeholder="Enter Full Address"
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

          {/* LGA Selection (only Kano LGAs) */}
          <FormControl isInvalid={!!errors.lga}>
            <AppFormLabel title="Select LGA" />
            <Select
              placeholder="Select LGA"
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="lga"
              onChange={handleChange}
            >
              {kanoLGAs?.map((lgaName, index) => (
                <option value={lgaName} key={index}>
                  {lgaName}
                </option>
              ))}
            </Select>
            {!!errors.lga && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.lga}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.union}>
            <AppFormLabel title="Union" />
            <Input
              type="text"
              placeholder="Enter Union"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="union"
              name="union"
              height="48px"
              onChange={handleChange}
              value={values.union}
            />
            {!!errors.union && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.union}
              </Text>
            )}
          </FormControl>

          {/* NIN Field */}
          <FormControl isInvalid={!!errors.nin}>
            <AppFormLabel title="National Identification Number (NIN)" />
            <Input
              type="text"
              placeholder="Enter NIN"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="nin"
              name="nin"
              height="48px"
              onChange={handleChange}
              value={values.nin}
            />
            {!!errors.nin && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.nin}
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
