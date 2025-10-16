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
import usersService from "@/services/usersServices"
import DrawerComponent from "@/reusables/DrawerComponent"
import AppFormLabel from "@/reusables/AppFormLabel"
import Drivertype from "@/data/Drivertype"
import Driversize from "@/data/Driversize"
import { nigerianStates } from "@/data"
import { IError } from "@/types"

const AddDriver: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(null)
  const [transferDate, setTransferDate] = useState<Date | null>(null)
  const [DriverPictures, setDriverPictures] = useState<File[]>([])
  const [ownershipDocuments, setOwnershipDocuments] = useState<File[]>([])
  const [certificateOfOccupancy, setCertificateOfOccupancy] =
    useState<File | null>(null)

  const queryClient = useQueryClient()
  const toast = useToast()

  const handleFileUpload = async (file: File) => {
    try {
      const filePath = await usersService.uploadFile(file)
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

  const { mutate, isLoading } = useMutation(usersService.registerDriver, {
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
        description: "Driver registered successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      queryClient.invalidateQueries({ queryKey: ["properties"] })
      onClose()
    },
  })

  const formik = useFormik({
    initialValues: {
      DriverName: "",
      DriverHouseNumber: "",
      DriverStreetName: "",
      city: "",
      state: "",
      DriverSize: "",
      sizeUnit: "",
      DriverType: "",
      surveyPlanNumber: "",
    },
    validationSchema: Yup.object({
      DriverName: Yup.string().required("Required"),
      DriverHouseNumber: Yup.string().required("Required"),
      DriverStreetName: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      DriverSize: Yup.string().required("Required"),
      sizeUnit: Yup.string().required("Required"),
      DriverType: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // Handle file uploads
        const DriverPicturePaths = await Promise.all(
          DriverPictures.map((file) => handleFileUpload(file))
        )

        const ownershipDocumentPaths = await Promise.all(
          ownershipDocuments.map((file) => handleFileUpload(file))
        )

        const certificatePath = certificateOfOccupancy
          ? await handleFileUpload(certificateOfOccupancy)
          : ""

        // Construct the final payload
        const payload = {
          DriverName: values.DriverName,
          DriverHouseNumber: values.DriverHouseNumber,
          DriverStreetName: values.DriverStreetName,
          city: values.city,
          state: values.state,
          DriverSize: values.DriverSize,
          sizeUnit: values.sizeUnit,
          DriverType: values.DriverType,
          surveyPlanNumber: values.surveyPlanNumber,
          purchaseDate: purchaseDate
            ? purchaseDate.toISOString().split("T")[0]
            : "",
          transferReleaseDate: transferDate
            ? transferDate.toISOString().split("T")[0]
            : "",
          DriverPictures: DriverPicturePaths,
          ownershipDocuments: ownershipDocumentPaths,
          certificateOfOccupancy: certificatePath,
        }

        // Trigger the mutation with the JSON payload
        mutate(payload)
      } catch (error) {
        console.error("Error registering Driver", error)
      }
    },
  })

  return (
    <DrawerComponent
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      title="Add New Driver"
      buttonText="Add Driver"
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDir="column" gap="12px">
          <FormControl isInvalid={!!formik.errors.DriverName}>
            <AppFormLabel title="Driver Name" />
            <Input
              placeholder="Enter Driver Name"
              name="DriverName"
              onChange={formik.handleChange}
              value={formik.values.DriverName}
            />
            {!!formik.errors.DriverName && (
              <Text color="red" fontSize="sm">
                {formik.errors.DriverName}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.DriverHouseNumber}>
            <AppFormLabel title="Driver House Number" />
            <Input
              placeholder="Enter Driver House Number"
              name="DriverHouseNumber"
              onChange={formik.handleChange}
              value={formik.values.DriverHouseNumber}
            />
            {!!formik.errors.DriverHouseNumber && (
              <Text color="red" fontSize="sm">
                {formik.errors.DriverHouseNumber}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!formik.errors.DriverStreetName}>
            <AppFormLabel title="Driver Street Name" />
            <Input
              placeholder="Enter Driver Street Name"
              name="DriverStreetName"
              onChange={formik.handleChange}
              value={formik.values.DriverStreetName}
            />
            {!!formik.errors.DriverStreetName && (
              <Text color="red" fontSize="sm">
                {formik.errors.DriverStreetName}
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

          <FormControl isInvalid={!!formik.errors.DriverSize}>
            <AppFormLabel title="Driver/Land Size" />
            <Input
              placeholder="Enter Driver Size"
              name="DriverSize"
              onChange={formik.handleChange}
              value={formik.values.DriverSize}
            />
            {!!formik.errors.DriverSize && (
              <Text color="red" fontSize="sm">
                {formik.errors.DriverSize}
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
              {Driversize.map((unit, index) => (
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

          <FormControl isInvalid={!!formik.errors.DriverType}>
            <AppFormLabel title="Driver Type" />
            <Select
              placeholder="Select Driver Type"
              name="DriverType"
              onChange={formik.handleChange}
              value={formik.values.DriverType}
            >
              {Drivertype.map((type, index) => (
                <option key={index} value={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </Select>
            {!!formik.errors.DriverType && (
              <Text color="red" fontSize="sm">
                {formik.errors.DriverType}
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
            <AppFormLabel title="Driver Pictures" />
            <Input
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setDriverPictures(Array.from(e.target.files))
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

          <Button
            bgColor="brand.primary"
            type="submit"
            color="#ffffff"
            height="48px"
            _hover={{ bgColor: "none", opacity: "0.8" }}
            isLoading={isLoading}
          >
            Register Driver
          </Button>
        </Flex>
      </form>
    </DrawerComponent>
  )
}

export default AddDriver
