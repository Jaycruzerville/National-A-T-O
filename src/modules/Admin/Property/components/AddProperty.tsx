import React, { useState } from "react"
import {
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as Yup from "yup"
import { useFormik } from "formik"
import SuperAdminService from "@/services/superAdminServices"
import DrawerComponent from "@/reusables/DrawerComponent"
import AppFormLabel from "@/reusables/AppFormLabel"
import propertytype from "@/data/Propertytype"
import propertysize from "@/data/Propertysize"
import { nigerianStates } from "@/data"
import { IError } from "@/types"

const AddProperty: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(null)
  const [transferDate, setTransferDate] = useState<Date | null>(null)
  const [propertyPictures, setPropertyPictures] = useState<File[]>([])
  const [ownershipDocuments, setOwnershipDocuments] = useState<File[]>([])
  const [certificateOfOccupancy, setCertificateOfOccupancy] =
    useState<File | null>(null)

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleFileUpload = async (file: File) => {
    try {
      const filePath = await SuperAdminService.uploadFile(file)
      return filePath
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      throw error
    }
  }

  const { mutate, isLoading } = useMutation(
    SuperAdminService.registerProperty,
    {
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
          description: "Property registered successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        queryClient.invalidateQueries({ queryKey: ["properties"] })
        onClose()
      },
    }
  )

  const formik = useFormik({
    initialValues: {
      propertyName: "",
      propertyHouseNumber: "",
      propertyStreetName: "",
      city: "",
      state: "",
      propertySize: "",
      sizeUnit: "",
      propertyType: "",
      surveyPlanNumber: "",
      propertyOwnerName: "",
      assignedPropertyId: "",
    },
    validationSchema: Yup.object({
      propertyName: Yup.string().required("Required"),
      propertyHouseNumber: Yup.string().required("Required"),
      propertyStreetName: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      propertySize: Yup.string().required("Required"),
      sizeUnit: Yup.string().required("Required"),
      propertyType: Yup.string().required("Required"),
      propertyOwnerName: Yup.string().required("Required"),
      assignedPropertyId: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // Handle file uploads
        const propertyPicturePaths = await Promise.all(
          propertyPictures.map((file) => handleFileUpload(file))
        )

        const ownershipDocumentPaths = await Promise.all(
          ownershipDocuments.map((file) => handleFileUpload(file))
        )

        const certificatePath = certificateOfOccupancy
          ? await handleFileUpload(certificateOfOccupancy)
          : ""

        // Construct the final payload
        const payload = {
          propertyName: values.propertyName,
          propertyHouseNumber: values.propertyHouseNumber,
          propertyStreetName: values.propertyStreetName,
          city: values.city,
          state: values.state,
          propertySize: values.propertySize,
          sizeUnit: values.sizeUnit,
          propertyType: values.propertyType,
          surveyPlanNumber: values.surveyPlanNumber,
          purchaseDate: purchaseDate
            ? purchaseDate.toISOString().split("T")[0]
            : "",
          transferReleaseDate: transferDate
            ? transferDate.toISOString().split("T")[0]
            : "",
          propertyPictures: propertyPicturePaths,
          ownershipDocuments: ownershipDocumentPaths,
          certificateOfOccupancy: certificatePath,
          propertyOwnerName: values.propertyOwnerName,
          assignedPropertyId: values.assignedPropertyId,
          adminRegistration: true,
        }

        // Trigger the mutation with the JSON payload
        mutate(payload)
      } catch (error) {
        console.error("Error registering property", error)
      }
    },
  })

  return (
    <DrawerComponent
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Add New Property"
      buttonText="Add Property"
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDir="column" gap="12px">
          <FormControl isInvalid={!!formik.errors.propertyName}>
            <AppFormLabel title="Property Name" />
            <Input
              placeholder="Enter Property Name"
              name="propertyName"
              onChange={formik.handleChange}
              value={formik.values.propertyName}
            />
            {!!formik.errors.propertyName && (
              <Text color="red" fontSize="sm">
                {formik.errors.propertyName}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.propertyHouseNumber}>
            <AppFormLabel title="Property House Number" />
            <Input
              placeholder="Enter Property House Number"
              name="propertyHouseNumber"
              onChange={formik.handleChange}
              value={formik.values.propertyHouseNumber}
            />
            {!!formik.errors.propertyHouseNumber && (
              <Text color="red" fontSize="sm">
                {formik.errors.propertyHouseNumber}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.propertyStreetName}>
            <AppFormLabel title="Property Street Name" />
            <Input
              placeholder="Enter Property Street Name"
              name="propertyStreetName"
              onChange={formik.handleChange}
              value={formik.values.propertyStreetName}
            />
            {!!formik.errors.propertyStreetName && (
              <Text color="red" fontSize="sm">
                {formik.errors.propertyStreetName}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.city}>
            <AppFormLabel title="City" />
            <Input
              placeholder="Enter City"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
            {!!formik.errors.city && (
              <Text color="red" fontSize="sm">
                {formik.errors.city}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.state}>
            <AppFormLabel title="State" />
            <Select
              placeholder="Select State"
              name="state"
              onChange={formik.handleChange}
              value={formik.values.state}
            >
              {nigerianStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </Select>
            {!!formik.errors.state && (
              <Text color="red" fontSize="sm">
                {formik.errors.state}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.propertySize}>
            <AppFormLabel title="Property/Land Size" />
            <Input
              placeholder="Enter Property Size"
              name="propertySize"
              onChange={formik.handleChange}
              value={formik.values.propertySize}
            />
            {!!formik.errors.propertySize && (
              <Text color="red" fontSize="sm">
                {formik.errors.propertySize}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.sizeUnit}>
            <AppFormLabel title="Size Unit" />
            <Select
              placeholder="Select Size Unit"
              name="sizeUnit"
              onChange={formik.handleChange}
              value={formik.values.sizeUnit}
            >
              {propertysize.map((unit, index) => (
                <option key={index} value={unit.toLowerCase()}>
                  {unit}
                </option>
              ))}
            </Select>
            {!!formik.errors.sizeUnit && (
              <Text color="red" fontSize="sm">
                {formik.errors.sizeUnit}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.propertyType}>
            <AppFormLabel title="Property Type" />
            <Select
              placeholder="Select Property Type"
              name="propertyType"
              onChange={formik.handleChange}
              value={formik.values.propertyType}
            >
              {propertytype.map((type, index) => (
                <option key={index} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </Select>
            {!!formik.errors.propertyType && (
              <Text color="red" fontSize="sm">
                {formik.errors.propertyType}
              </Text>
            )}
          </FormControl>

          <FormControl>
            <AppFormLabel title="Survey Plan Number (Optional)" />
            <Input
              placeholder="Enter Survey Plan Number"
              name="surveyPlanNumber"
              onChange={formik.handleChange}
              value={formik.values.surveyPlanNumber}
            />
          </FormControl>

          <FormControl>
            <AppFormLabel title="Purchase Date" />
            <DatePicker
              selected={purchaseDate}
              onChange={(date) => setPurchaseDate(date)}
              placeholderText="Select Date"
              customInput={<Input />}
            />
          </FormControl>

          <FormControl>
            <AppFormLabel title="Transfer/Release Date" />
            <DatePicker
              selected={transferDate}
              onChange={(date) => setTransferDate(date)}
              placeholderText="Select Date"
              customInput={<Input />}
            />
          </FormControl>

          <FormControl>
            <AppFormLabel title="Property Pictures" />
            <Input
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setPropertyPictures(Array.from(e.target.files))
                }
              }}
            />
          </FormControl>

          <FormControl>
            <AppFormLabel title="Ownership Documents" />
            <Input
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setOwnershipDocuments(Array.from(e.target.files))
                }
              }}
            />
          </FormControl>

          <FormControl>
            <AppFormLabel title="Certificate of Occupancy" />
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setCertificateOfOccupancy(e.target.files[0])
                }
              }}
            />
          </FormControl>

          <FormControl isInvalid={!!formik.errors.propertyOwnerName}>
            <AppFormLabel title="Property Owner Name" />
            <Input
              placeholder="Enter Property Owner Name"
              name="propertyOwnerName"
              onChange={formik.handleChange}
              value={formik.values.propertyOwnerName}
            />
            {!!formik.errors.propertyOwnerName && (
              <Text color="red" fontSize="sm">
                {formik.errors.propertyOwnerName}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.assignedPropertyId}>
            <AppFormLabel title="Assigned Property ID" />
            <Input
              placeholder="Enter Assigned Property ID"
              name="assignedPropertyId"
              onChange={formik.handleChange}
              value={formik.values.assignedPropertyId}
            />
            {!!formik.errors.assignedPropertyId && (
              <Text color="red" fontSize="sm">
                {formik.errors.assignedPropertyId}
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
            Register Property
          </Button>
        </Flex>
      </form>
    </DrawerComponent>
  )
}

export default AddProperty
