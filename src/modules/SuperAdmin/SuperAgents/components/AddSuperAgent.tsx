import useStateAndLGA from "@/hooks/useStateAndLGA"
import AppFormLabel from "@/reusables/AppFormLabel"
import DrawerComponent from "@/reusables/DrawerComponent"
import SuperAdminService from "@/services/superAdminServices"
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

  const { mutate, isLoading } = useMutation(SuperAdminService.addSuperAgent, {
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
      PropertyName: "",
      PropertyDescription: "",
      PropertyAddress: "",
      PropertyCategory: "",
      state: "",
      lga: "",
      adminFirstName: "",
      adminLastName: "",
      adminPhoneNumber: "",
      adminEmail: "",
    },
    validationSchema: Yup.object({
      PropertyName: Yup.string().required("Required"),
      PropertyDescription: Yup.string().required("Required"),
      PropertyAddress: Yup.string().required("Required"),
      PropertyCategory: Yup.string().required("Required"),
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
        PropertyAdminDetails: {
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
      title="Add new SuperAgent"
      buttonText="Add SuperAgent"
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" gap="12px">
          <FormControl isInvalid={!!errors.PropertyName}>
            <AppFormLabel title="Union/Property name" />
            <Input
              type="name"
              placeholder="Enter Union Name"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="name"
              name="PropertyName"
              height="48px"
              onChange={handleChange}
              value={values.PropertyName}
            />{" "}
            {!!errors.PropertyName && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.PropertyName}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.PropertyCategory}>
            <AppFormLabel title="Select category" />
            <Select
              placeholder="Select Property Category"
              _placeholder={{ color: "#003E5160" }}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              name="PropertyCategory"
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
            {!!errors.PropertyCategory && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.PropertyCategory}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.PropertyDescription}>
            <AppFormLabel title="Description" />
            <Input
              type="name"
              placeholder="Enter Union Name"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="name"
              name="PropertyDescription"
              height="48px"
              onChange={handleChange}
              value={values.PropertyDescription}
            />{" "}
            {!!errors.PropertyDescription && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.PropertyDescription}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.PropertyAddress}>
            <AppFormLabel title="Address" />
            <Input
              type="text"
              placeholder="Enter Agent Full Address"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="address"
              name="PropertyAddress"
              height="48px"
              onChange={handleChange}
              value={values.PropertyAddress}
            />{" "}
            {!!errors.PropertyAddress && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.PropertyAddress}
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
            Add SuperAgent
          </Button>
        </Flex>
      </form>
    </DrawerComponent>
  )
}

export default AddSuperAgentDrawer
