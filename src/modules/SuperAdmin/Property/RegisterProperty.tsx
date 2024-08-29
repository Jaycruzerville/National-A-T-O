import React, { useState } from "react"
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Select,
  SimpleGrid,
  VStack,
  Button,
  Divider,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Tooltip,
  useToast,
} from "@chakra-ui/react"
import { AttachmentIcon, InfoOutlineIcon } from "@chakra-ui/icons"
import naijaStates from "@/data/naijaStates"
import propertytype from "@/data/Propertytype"
import propertysize from "@/data/Propertysize"
import { colors } from "@/theme/colors"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import SuperAdminService from "@/services/superAdminServices"

interface RegisterPropertyProps {
  onClose: () => void
}

const RegisterProperty: React.FC<RegisterPropertyProps> = ({ onClose }) => {
  const [purchaseDate, setPurchaseDate] = useState<Date | null>(null)
  const [transferDate, setTransferDate] = useState<Date | null>(null)
  const [propertyPictures, setPropertyPictures] = useState<File[]>([])
  const [ownershipDocuments, setOwnershipDocuments] = useState<File[]>([])
  const [certificateOfOccupancy, setCertificateOfOccupancy] =
    useState<File | null>(null)

  const [formValues, setFormValues] = useState({
    propertyName: "",
    propertyHouseNumber: "",
    propertyStreetName: "",
    city: "",
    state: "",
    propertySize: "",
    sizeUnit: "",
    propertyType: "",
    surveyPlanNumber: "",
  })

  const [isOwnershipConfirmed, setIsOwnershipConfirmed] = useState(false)
  const [isInformationCorrect, setIsInformationCorrect] = useState(false)

  const toast = useToast()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    if (!isOwnershipConfirmed || !isInformationCorrect) {
      toast({
        title: "Error",
        description: "Please confirm all required checkboxes.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    console.log("Property Pictures:", propertyPictures)
    console.log("Ownership Documents:", ownershipDocuments)
    console.log("Certificate of Occupancy:", certificateOfOccupancy)

    try {
      // Ensure files are selected
      if (
        propertyPictures.length === 0 ||
        ownershipDocuments.length === 0 ||
        !certificateOfOccupancy
      ) {
        toast({
          title: "Error",
          description: "Please select the required files.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return
      }

      // Upload files
      console.log(
        "Uploading property pictures, ownership documents, and certificate of occupancy..."
      )

      const propertyPicturePaths = await Promise.all(
        propertyPictures.map((file) => SuperAdminService.uploadFile(file))
      )
      console.log("Uploaded property pictures paths:", propertyPicturePaths)

      const ownershipDocumentPaths = await Promise.all(
        ownershipDocuments.map((file) => SuperAdminService.uploadFile(file))
      )
      console.log("Uploaded ownership documents paths:", ownershipDocumentPaths)

      const certificatePath = await SuperAdminService.uploadFile(
        certificateOfOccupancy
      )
      console.log("Uploaded certificate of occupancy path:", certificatePath)

      // Ensure required fields are not empty
      if (
        !formValues.propertyName ||
        !purchaseDate ||
        !transferDate ||
        !certificatePath
      ) {
        toast({
          title: "Error",
          description: "Please fill out all required fields.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return
      }

      // Create JSON payload
      const payload = {
        propertyName: formValues.propertyName,
        propertyHouseNumber: formValues.propertyHouseNumber,
        propertyStreetName: formValues.propertyStreetName,
        city: formValues.city,
        state: formValues.state,
        propertySize: formValues.propertySize,
        sizeUnit: formValues.sizeUnit,
        propertyType: formValues.propertyType,
        surveyPlanNumber: formValues.surveyPlanNumber,
        purchaseDate: purchaseDate
          ? purchaseDate.toISOString().split("T")[0]
          : "",
        transferReleaseDate: transferDate
          ? transferDate.toISOString().split("T")[0]
          : "",
        propertyPictures: propertyPicturePaths,
        ownershipDocuments: ownershipDocumentPaths,
        certificateOfOccupancy: certificatePath,
      }

      console.log("Payload being sent:", payload)

      // Send JSON payload
      await SuperAdminService.registerProperty(payload)

      toast({
        title: "Success",
        description: "Property registered successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      onClose()
    } catch (error) {
      console.error("Error registering property:", error)
      toast({
        title: "Error",
        description: "Failed to register property.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Box
      bgColor={colors.brand.bgLight}
      p="20px"
      mx={0}
      w="full"
      h="auto"
      overflowY="auto"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading color={colors.brand.primary}>Register Property</Heading>
      </Flex>

      <p>
        All fields with <span style={{ color: "red" }}>*</span> are required
      </p>

      <Divider borderColor={colors.brand.primary} mb="6" />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <VStack align="stretch" spacing={5}>
          <InputField
            label="Property House Number"
            name="propertyHouseNumber"
            placeholder="Enter Property No."
            isRequired={true}
            value={formValues.propertyHouseNumber}
            onChange={handleInputChange}
          />
          <InputField
            label="City"
            name="city"
            placeholder="Enter City"
            isRequired={true}
            value={formValues.city}
            onChange={handleInputChange}
          />
          <InputField
            label="Property/Land Size"
            name="propertySize"
            placeholder="Property Size"
            isRequired={true}
            value={formValues.propertySize}
            onChange={handleInputChange}
          />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <InputField
            label="Property Name"
            name="propertyName"
            placeholder="Enter Property Name"
            isRequired={true}
            value={formValues.propertyName}
            onChange={handleInputChange}
          />
          <InputField
            label="Property Street Name"
            name="propertyStreetName"
            placeholder="Enter Street Name"
            isRequired={true}
            value={formValues.propertyStreetName}
            onChange={handleInputChange}
          />
          <SelectField
            label="State"
            name="state"
            options={naijaStates}
            isRequired={true}
            value={formValues.state}
            onChange={handleInputChange}
          />
          <SelectField
            label="Size Unit"
            name="sizeUnit"
            options={propertysize}
            isRequired={true}
            value={formValues.sizeUnit}
            onChange={handleInputChange}
          />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <FormControl isRequired>
            <FormLabel>
              Property Type/Purpose of Use
              <Tooltip
                label="Select the type of property, e.g., Residential, Commercial"
                aria-label="Property Type Tooltip"
              >
                <InfoOutlineIcon ml={2} />
              </Tooltip>
            </FormLabel>
            <Select
              placeholder="-- Select Property Type --"
              name="propertyType"
              value={formValues.propertyType}
              onChange={handleInputChange}
            >
              {propertytype.map((option, index) => (
                <option key={index} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
          <FileUploadField
            label="Property Pictures"
            isRequired={true}
            multiple={true}
            accept="image/*,application/pdf"
            onChange={(e) => {
              if (e.target.files) {
                setPropertyPictures(Array.from(e.target.files))
              }
            }}
          />
          <FileUploadField
            label="Ownership Documents"
            isRequired={true}
            multiple={true}
            accept="image/*,application/pdf"
            onChange={(e) => {
              if (e.target.files) {
                setOwnershipDocuments(Array.from(e.target.files))
              }
            }}
          />
          <FileUploadField
            label="Certificate of Occupancy"
            isRequired={true}
            accept="image/*,application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setCertificateOfOccupancy(e.target.files[0])
                console.log(
                  "Selected Certificate of Occupancy:",
                  e.target.files[0]
                )
              }
            }}
          />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <InputField
            label="Survey Plan Number (Not Required)"
            name="surveyPlanNumber"
            placeholder="Enter Survey Plan Number"
            value={formValues.surveyPlanNumber}
            onChange={handleInputChange}
          />
          <FormControl isRequired>
            <FormLabel>Purchase Date</FormLabel>
            <DatePicker
              selected={purchaseDate}
              onChange={(date) => setPurchaseDate(date)}
              placeholderText="Select Date"
              customInput={<Input />}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Transfer/Release Date</FormLabel>
            <DatePicker
              selected={transferDate}
              onChange={(date) => setTransferDate(date)}
              placeholderText="Select Date"
              customInput={<Input />}
            />
          </FormControl>
        </VStack>
      </SimpleGrid>

      <VStack align="stretch" mt={8}>
        <Checkbox
          isChecked={isOwnershipConfirmed}
          onChange={(e) => setIsOwnershipConfirmed(e.target.checked)}
        >
          Confirm that this property belongs to the person with the attached
          name and email address to this account.
        </Checkbox>
        <Checkbox
          isChecked={isInformationCorrect}
          onChange={(e) => setIsInformationCorrect(e.target.checked)}
        >
          Confirm that all information included in this form is correct and
          discrepancies will lead to this property verification application
          being rejected when submitted.
        </Checkbox>
      </VStack>

      <Button
        mt={8}
        px={8}
        py={3}
        bg={colors.brand.primary}
        color="white"
        _hover={{ bg: colors.brand.primaryDark }}
        fontSize="lg"
        onClick={handleSubmit}
      >
        Register Property
      </Button>
    </Box>
  )
}

interface InputFieldProps {
  label: string
  placeholder: string
  isRequired?: boolean
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  isRequired = false,
  name,
  value,
  onChange,
}) => (
  <FormControl isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Input
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  </FormControl>
)

interface SelectFieldProps {
  label: string
  options: string[]
  isRequired?: boolean
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  isRequired = false,
  name,
  value,
  onChange,
}) => (
  <FormControl isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Select
      placeholder={`-- Select ${label.split(" ")[1]} --`}
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </Select>
  </FormControl>
)

interface FileUploadFieldProps {
  label: string
  isRequired?: boolean
  multiple?: boolean
  accept?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  isRequired = false,
  multiple = false,
  accept,
  onChange,
}) => (
  <FormControl isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <AttachmentIcon color="gray.300" />
      </InputLeftElement>
      <Input
        type="file"
        p="0.5rem"
        multiple={multiple}
        accept={accept}
        onChange={onChange}
      />
    </InputGroup>
  </FormControl>
)

export default RegisterProperty
