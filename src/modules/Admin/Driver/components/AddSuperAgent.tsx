import useStateAndLGA from "@/hooks/useStateAndLGA"
import AppFormLabel from "@/reusables/AppFormLabel"
import DrawerComponent from "@/reusables/DrawerComponent"
import usersService from "@/services/usersServices"
import { IError } from "@/types"
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Select,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"

const AddSuperAgentDrawer = () => {
  const [selectedState, setselectedState] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { states, LGAs, loadingLGAs } = useStateAndLGA(selectedState)
  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate, isLoading } = useMutation(usersService.addSuperAgent, {
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
        description: "SuperAgent added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      queryClient.invalidateQueries({ queryKey: ["superagents"] })
      onClose()
    },
  })

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      DriverName: "",
      DriverDescription: "",
      DriverAddress: "",
      DriverCategory: "",
      state: "",
      lga: "",
      adminFirstName: "",
      adminLastName: "",
      adminPhoneNumber: "",
      adminEmail: "",
    },
    validationSchema: Yup.object({
      DriverName: Yup.string().required("Required"),
      DriverDescription: Yup.string().required("Required"),
      DriverAddress: Yup.string().required("Required"),
      DriverCategory: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      lga: Yup.string().required("Required"),
      adminFirstName: Yup.string().required("Required"),
      adminLastName: Yup.string().required("Required"),
      adminPhoneNumber: Yup.string().required("Required"),
      adminEmail: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const {
        adminFirstName,
        adminLastName,
        adminEmail,
        adminPhoneNumber,
        state,
        lga,
        ...otherValues
      } = values
      const data = {
        ...otherValues,
        stateId: state,
        lgaId: lga,
        DriverAdminDetails: {
          adminFirstName,
          adminLastName,
          adminEmail,
          adminPhoneNumber,
        },
      }
      mutate(data)
    },
  })

  return (
    <DrawerComponent
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Add new Driver"
      buttonText="Add Driver"
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" gap="12px">
          <FormControl isInvalid={!!errors.DriverName}>
            <AppFormLabel title="Union/Driver name" />
            <Input
              type="name"
              placeholder="Enter Union Name"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="name"
              name="DriverName"
              height="48px"
              onChange={handleChange}
              value={values.DriverName}
            />{" "}
            {!!errors.DriverName && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.DriverName}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.DriverCategory}>
            <AppFormLabel title="Select category" />
            <Select
              placeholder="Select Driver Category"
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="DriverCategory"
              onChange={(e) => {
                handleChange(e)
              }}
            >
              {[
                {
                  name: "Transport",
                  id: 1,
                },
                {
                  name: "Academic",
                  id: 2,
                },
                {
                  name: "Health",
                  id: 3,
                },
                {
                  name: "Education",
                  id: 3,
                },
                {
                  name: "Religious",
                  id: 3,
                },
                {
                  name: "Artisans",
                  id: 3,
                },
              ]?.map(({ name, id }: { name: string; id: number }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </Select>
            {!!errors.DriverCategory && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.DriverCategory}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.DriverDescription}>
            <AppFormLabel title="Description" />
            <Input
              type="name"
              placeholder="Enter Union Name"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="name"
              name="DriverDescription"
              height="48px"
              onChange={handleChange}
              value={values.DriverDescription}
            />{" "}
            {!!errors.DriverDescription && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.DriverDescription}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.DriverAddress}>
            <AppFormLabel title="Address" />
            <Input
              type="text"
              placeholder="Enter Agent Full Address"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="address"
              name="DriverAddress"
              height="48px"
              onChange={handleChange}
              value={values.DriverAddress}
            />{" "}
            {!!errors.DriverAddress && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.DriverAddress}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.state}>
            <AppFormLabel title="Select state" />
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
          <Heading
            fontSize="24px"
            lineHeight="32px"
            fontWeight={700}
            letterSpacing={-1}
          >
            SuperAgent Admin
          </Heading>
          <FormControl isInvalid={!!errors.adminFirstName}>
            <AppFormLabel title="Firstname" />
            <Input
              type="name"
              placeholder="Enter Admin Firstname"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="name"
              name="adminFirstName"
              height="48px"
              onChange={handleChange}
              value={values.adminFirstName}
            />{" "}
            {!!errors.adminFirstName && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.adminFirstName}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.adminLastName}>
            <AppFormLabel title="Lastname" />
            <Input
              type="name"
              placeholder="Enter Admin lastname"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="name"
              name="adminLastName"
              height="48px"
              onChange={handleChange}
              value={values.adminLastName}
            />{" "}
            {!!errors.adminLastName && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.adminLastName}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.adminPhoneNumber}>
            <AppFormLabel title="Phone Number" />
            <Input
              placeholder="Enter Agent Phone Number"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="number"
              name="adminPhoneNumber"
              height="48px"
              onChange={handleChange}
              value={values.adminPhoneNumber}
            />{" "}
            {!!errors.adminPhoneNumber && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.adminPhoneNumber}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.adminEmail}>
            <AppFormLabel title="Email" />
            <Input
              type="email"
              placeholder="Enter Agent Email Address"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="email"
              name="adminEmail"
              height="48px"
              onChange={handleChange}
              value={values.adminEmail}
            />{" "}
            {!!errors.adminEmail && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.adminEmail}
              </Text>
            )}
          </FormControl>

          <Button
            bgColor="brand.primary"
            type="submit"
            color="#ffffff"
            height="48px"
            _hover={{ bgColor: "none", opacity: "0.8" }}
            isLoading={isLoading}
          >
            Add Driver
          </Button>
        </Flex>
      </form>
    </DrawerComponent>
  )
}

export default AddSuperAgentDrawer
