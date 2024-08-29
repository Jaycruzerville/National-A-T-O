import { useState, ChangeEvent } from "react"
import useStateAndLGA from "@/hooks/useStateAndLGA"
import DrawerComponent from "@/reusables/DrawerComponent"
import AppFormLabel from "@/reusables/AppFormLabel"
import SuperAdminService from "@/services/superAdminServices"
import type { IError } from "@/types"
import uploadImage from "@/assets/uploadImage.svg"
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
  Image,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useGetRoleId } from "@/hooks/useGetRoleId"

import PhoneInput from "@/reusables/PhoneInput"

const AddAgentSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  address: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  lga: Yup.string().required("Required"),
  license: Yup.string().required("Required"),
})

const AddNewServiceProviderDrawer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFileName, setSelectedFileName] = useState<string | undefined>(
    ""
  )

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setSelectedFile(file || null)
    setSelectedFileName(file?.name || "")
    console.log(selectedFile)
  }
  const updateFilters = (filter: string, value: unknown) => {
    setFilters({ ...filters, [filter]: value })
  }

  // const handleFileUpload = () => {
  //   //file upload logic
  //   console.log(selectedFile)
  // }
  const initParams = {
    searchQuery: "",
    status: "",
    registeredUsers: "",
  }
  const [filters, setFilters] = useState(initParams)
  const [selectedState, setselectedState] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<
    string | undefined
  >()
  const { states, LGAs, loadingLGAs } = useStateAndLGA(selectedState)
  const { roleId } = useGetRoleId("Agent")
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
        description: "Service Provider added successfully",
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
      Name: "",
      Status: "",
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
      title="Add New Service Provider"
      buttonText="Add new Service Provider"
    >
      <form onSubmit={handleSubmit}>
        <Flex flexDir="column" gap="12px">
          <FormControl isInvalid={!!errors.Name}>
            <AppFormLabel title="Name" />
            <Input
              type="Name"
              placeholder="Enter Service Provider Name"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="Name"
              name="Name"
              height="48px"
              onChange={handleChange}
              value={values.Name}
            />
            {!!errors.Name && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.Name}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.Status}>
            <AppFormLabel title="Select Category" />
            <Select
              placeholder="Select Service Provider Category"
              _placeholder={{ color: "#003E51" }}
              name="status"
              // value={filters.status}
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              height="48px"
              onChange={(e) => updateFilters("status", e.target.value)}
            >
              <option value="">All</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">InActive</option>
            </Select>
            {!!errors.Status && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.Status}
              </Text>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.address}>
            <AppFormLabel title="Address" />
            <Input
              type="text"
              placeholder="Enter Service Provider Full Address"
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
          <FormControl isInvalid={!!errors.state}>
            <AppFormLabel title="Select State" />
            <Select
              placeholder="Select Service Provider State"
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
          <FormControl isInvalid={!!errors.state}>
            <AppFormLabel title="Upload License(s)" />

            <Button
              style={{
                width: "100%",

                justifyContent: "flex-start",
                backgroundColor: "#A0AEC4",
                border: "1px solid #D9DDE3",
                height: "68px",
              }}
            >
              <Flex>
                <Image src={uploadImage} style={{ marginRight: "8px" }} />
                <label
                  htmlFor="file-input"
                  style={{
                    height: "48px",
                    flexWrap: "wrap",
                    fontSize: "14px",
                    wordWrap: "break-word",
                    fontWeight: "400",
                    color: "#003E51",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {selectedFile ? (
                    selectedFileName
                  ) : (
                    <>
                      <Text>
                        Select file to upload or drag and drop (.docx, .pdf).
                      </Text>
                      <Text style={{ textAlign: "left" }}>
                        Maximum file size is 2MB
                      </Text>
                    </>
                  )}
                </label>
              </Flex>

              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Button>

            {/* <Button onClick={handleFileChange}>Upload</Button> */}
            {!!errors.state && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.state}
              </Text>
            )}
          </FormControl>
          <Text
            style={{
              color: "#202020",
              fontWeight: 700,
              fontSize: "28px",
              letterSpacing: "-2px",
            }}
          >
            Service Provider Contact Person
          </Text>
          <FormControl isInvalid={!!errors.Name}>
            <AppFormLabel title="Name" />
            <Input
              type="Name"
              placeholder="Enter Contact Person Name"
              fontSize="14px"
              _hover={{ outline: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              _placeholder={{ color: "#003E5160" }}
              id="Name"
              name="Name"
              height="48px"
              onChange={handleChange}
              value={values.Name}
            />
            {!!errors.Name && (
              <Text as="span" fontSize="10px" pt="12px" color="red">
                {errors.Name}
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
              placeholder="Enter Contact Person Email"
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

          <Spacer />
          <Button
            bgColor="brand.primary"
            type="submit"
            color="#ffffff"
            height="48px"
            _hover={{ bgColor: "none", opacity: "0.8" }}
            isLoading={isLoading}
          >
            Add Add Service Provider
          </Button>
        </Flex>
      </form>
    </DrawerComponent>
  )
}

export default AddNewServiceProviderDrawer
