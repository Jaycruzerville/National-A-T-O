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
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
  useToast,
} from "@chakra-ui/react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import naijaStates from "@/data/naijaStates"
import usersService from "@/services/usersServices"
import vehicleData from "@/data/vehicleData.json"
import { colors } from "@/theme/colors"

interface RegisterDriverProps {
  onClose: () => void
}

const RegisterDriver: React.FC<RegisterDriverProps> = ({ onClose }) => {
  const [dob, setDob] = useState<Date | null>(null)
  const [licenseExpiryDate, setLicenseExpiryDate] = useState<Date | null>(null)
  const [formValues, setFormValues] = useState({
    fullName: "",
    gender: "",
    street: "",
    lga: "",
    phoneNumber: "",
    licenseNumber: "",
    licenseState: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehiclePlateNumber: "",
    vin: "",
    driverType: "",
    contactMethod: [] as string[],
    termsAgreed: false,
    privacyPolicyAgreed: false,
  })

  const [driverLicenseFile, setDriverLicenseFile] = useState<File | null>(null)
  const [vehicleRegistrationFile, setVehicleRegistrationFile] =
    useState<File | null>(null)
  const [driverPictures, setDriverPictures] = useState<File[]>([])
  const [vehiclePictures, setVehiclePictures] = useState<File[]>([])

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

  const handleContactMethodChange = (method: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      contactMethod: prevState.contactMethod.includes(method)
        ? prevState.contactMethod.filter((item) => item !== method)
        : [...prevState.contactMethod, method],
    }))
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
  ) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async () => {
    if (!formValues.termsAgreed || !formValues.privacyPolicyAgreed) {
      toast({
        title: "Error",
        description: "Please agree to the Terms and Privacy Policy.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    try {
      // Ensure required files are selected
      if (!driverLicenseFile || !vehicleRegistrationFile) {
        toast({
          title: "Error",
          description: "Please upload all required documents.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return
      }

      // Log vehiclePictures to check if files are correctly selected
      console.log("Vehicle Pictures Selected:", vehiclePictures)

      // Upload files
      const driverLicensePath = await usersService.uploadFile(driverLicenseFile)
      const vehicleRegistrationPath = await usersService.uploadFile(
        vehicleRegistrationFile
      )

      const driverPicturePaths = await Promise.all(
        driverPictures.map((file) => usersService.uploadFile(file))
      )
      const vehiclePicturePaths = await Promise.all(
        vehiclePictures.map((file) => usersService.uploadFile(file))
      )

      // Create JSON payload
      const payload = {
        ...formValues,
        dateOfBirth: dob ? dob.toISOString().split("T")[0] : "",
        licenseExpiryDate: licenseExpiryDate
          ? licenseExpiryDate.toISOString().split("T")[0]
          : "",
        driverLicenseImage: driverLicensePath.path,
        vehicleRegistrationImage: vehicleRegistrationPath.path,
        driverImage: driverPicturePaths[0]?.path || "",
        vehicleImages: vehiclePicturePaths.map((pic) => pic.path), // Ensure vehicle pictures are mapped to paths
        preferredContactMethod: formValues.contactMethod[0]?.toLowerCase(),
        vehicleType: formValues.driverType,
      }

      console.log("Final Payload:", payload)

      await usersService.registerDriver(payload)

      toast({
        title: "Success",
        description: "Driver registered successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      onClose()
    } catch (error) {
      console.error("Error registering driver:", error)
      toast({
        title: "Error",
        description: "Failed to register driver.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  // Extract unique makes and models from the vehicle data
  const makes = Array.from(new Set(vehicleData.map((v) => v.make)))
  const models = formValues.vehicleMake
    ? vehicleData
        .filter((v) => v.make === formValues.vehicleMake)
        .map((v) => v.model)
    : []
  const years = Array.from(new Set(vehicleData.map((v) => v.year)))

  return (
    <Box
      bgColor={colors.brand.bgLight}
      p="20px"
      mx={0}
      w="full"
      h="auto"
      overflowY="auto"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading color={colors.brand.primary}>Register Driver</Heading>
      </Flex>

      <p>
        All fields with <span style={{ color: "red" }}>*</span> are required
      </p>
      <Divider borderColor={colors.brand.primary} mb="6" />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <VStack align="stretch" spacing={5}>
          <InputField
            label="Full Name"
            name="fullName"
            placeholder="Enter Full Name"
            isRequired={true}
            value={formValues.fullName}
            onChange={handleInputChange}
          />
          <FormControl isRequired>
            <FormLabel color={colors.brand.primary}>Date of Birth</FormLabel>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              placeholderText="Select Date"
              customInput={<Input />}
              wrapperClassName="date-picker"
            />
          </FormControl>
          <SelectField
            label="Gender"
            name="gender"
            options={["Male", "Female"]}
            isRequired={true}
            value={formValues.gender}
            onChange={handleInputChange}
          />
          <InputField
            label="Street"
            name="street"
            placeholder="Enter Street"
            isRequired={true}
            value={formValues.street}
            onChange={handleInputChange}
          />
          <InputField
            label="LGA"
            name="lga"
            placeholder="Enter LGA"
            isRequired={true}
            value={formValues.lga}
            onChange={handleInputChange}
          />

          <FormControl isRequired>
            <FormLabel color={colors.brand.primary}>Driver Type</FormLabel>
            <RadioGroup
              name="driverType"
              onChange={(value) =>
                setFormValues({ ...formValues, driverType: value })
              }
              value={formValues.driverType}
            >
              <Stack direction="row">
                <Radio value="Taxi">Taxi</Radio>
                <Radio value="Tricycle">Keke</Radio>
                <Radio value="Motorbike">Bike</Radio>
                <Radio value="Bus">Bus</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FileUploadField
            label="Upload Driver's License"
            isRequired={true}
            onChange={(e) => setDriverLicenseFile(e.target.files?.[0] || null)}
          />
          <FileUploadField
            label="Upload Driver Pictures;"
            isRequired={false}
            multiple={true}
            accept="image/*"
            onChange={(e) => handleFileChange(e, setDriverPictures)}
          />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <InputField
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            isRequired={true}
            value={formValues.phoneNumber}
            onChange={handleInputChange}
          />
          <InputField
            label="License Number"
            name="licenseNumber"
            placeholder="Enter License Number"
            isRequired={true}
            value={formValues.licenseNumber}
            onChange={handleInputChange}
          />
          <SelectField
            label="License State"
            name="licenseState"
            options={naijaStates}
            isRequired={true}
            value={formValues.licenseState}
            onChange={handleInputChange}
          />
          <FormControl isRequired>
            <FormLabel color={colors.brand.primary}>
              License Expiry Date
            </FormLabel>
            <DatePicker
              selected={licenseExpiryDate}
              onChange={(date) => setLicenseExpiryDate(date)}
              placeholderText="Select Date"
              customInput={<Input />}
              wrapperClassName="date-picker"
            />
          </FormControl>
          <SelectField
            label="Vehicle Make"
            name="vehicleMake"
            options={makes}
            isRequired={true}
            value={formValues.vehicleMake}
            onChange={handleInputChange}
          />
          <SelectField
            label="Vehicle Model"
            name="vehicleModel"
            options={models}
            isRequired={true}
            value={formValues.vehicleModel}
            onChange={handleInputChange}
          />
          <SelectField
            label="Year"
            name="vehicleYear"
            options={years.map(String)}
            isRequired={true}
            value={formValues.vehicleYear}
            onChange={handleInputChange}
          />
          <InputField
            label="License Plate Number"
            name="vehiclePlateNumber"
            placeholder="Enter License Plate Number"
            isRequired={true}
            value={formValues.vehiclePlateNumber}
            onChange={handleInputChange}
          />
          <InputField
            label="Vehicle Identification Number (VIN)"
            name="vin"
            placeholder="Enter VIN"
            isRequired={true}
            value={formValues.vin}
            onChange={handleInputChange}
          />

          <FileUploadField
            label="Upload Vehicle Registration"
            isRequired={true}
            onChange={(e) =>
              setVehicleRegistrationFile(e.target.files?.[0] || null)
            }
          />
          <FileUploadField
            label="Upload Vehicle Pictures"
            isRequired={false}
            multiple={true}
            accept="image/*"
            onChange={(e) => handleFileChange(e, setVehiclePictures)}
          />
        </VStack>

        <VStack align="stretch" spacing={5}>
          <FormControl>
            <FormLabel color={colors.brand.primary}>
              Preferred Contact Method
            </FormLabel>
            <Stack spacing={5} direction="row">
              <Checkbox
                isChecked={formValues.contactMethod.includes("Phone")}
                onChange={() => handleContactMethodChange("Phone")}
              >
                Phone
              </Checkbox>
              <Checkbox
                isChecked={formValues.contactMethod.includes("Email")}
                onChange={() => handleContactMethodChange("Email")}
              >
                Email
              </Checkbox>
              <Checkbox
                isChecked={formValues.contactMethod.includes("SMS")}
                onChange={() => handleContactMethodChange("SMS")}
              >
                SMS
              </Checkbox>
            </Stack>
          </FormControl>
        </VStack>

        <VStack align="stretch" spacing={5}>
          <Checkbox
            isChecked={formValues.termsAgreed}
            onChange={(e) =>
              setFormValues({ ...formValues, termsAgreed: e.target.checked })
            }
          >
            I agree to the Terms and Conditions
          </Checkbox>
          <Checkbox
            isChecked={formValues.privacyPolicyAgreed}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                privacyPolicyAgreed: e.target.checked,
              })
            }
          >
            I agree to the Privacy Policy
          </Checkbox>
        </VStack>
      </SimpleGrid>

      <Button
        mt={8}
        px={8}
        py={3}
        bg={colors.brand.primary} // Primary color
        color="white"
        _hover={{ bg: colors.brand.primaryDark }} // Darker primary on hover
        fontSize="lg"
        onClick={handleSubmit}
      >
        Submit
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
    <FormLabel color={colors.brand.primary}>{label}</FormLabel>
    <Input
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      bg="white"
      borderColor={colors.brand.primary}
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
    <FormLabel color={colors.brand.primary}>{label}</FormLabel>
    <Select
      placeholder={`-- Select ${label.split(" ")[0]} --`}
      name={name}
      value={value}
      onChange={onChange}
      bg="white"
      borderColor={colors.brand.primary}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
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
    <FormLabel color={colors.brand.primary}>{label}</FormLabel>
    <Input
      type="file"
      p="0.5rem"
      multiple={multiple}
      accept={accept}
      onChange={onChange}
      bg="white"
      borderColor={colors.brand.primary}
    />
  </FormControl>
)

export default RegisterDriver
