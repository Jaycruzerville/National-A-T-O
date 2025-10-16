// steps/StepThree.tsx
import React, { useState } from "react"
import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  useToast,
  Flex,
  Text,
} from "@chakra-ui/react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { colors } from "@/theme/colors"

interface LicenseInfoData {
  licenseNumber: string
  licenseExpiryDate: string
  driverType: string
  driverLicenseFile: File
  driverPictures: File[]
}

interface StepThreeProps {
  nextStep: () => void
  prevStep: () => void
  updateFormData: (data: Partial<LicenseInfoData>) => void
  initialValues: Partial<LicenseInfoData>
}

const StepThree: React.FC<StepThreeProps> = ({
  nextStep,
  prevStep,
  updateFormData,
  initialValues,
}) => {
  const toast = useToast()
  const [licenseNumber, setLicenseNumber] = useState<string>(
    initialValues.licenseNumber || ""
  )
  const [licenseExpiryDate, setLicenseExpiryDate] = useState<Date | null>(
    initialValues.licenseExpiryDate
      ? new Date(initialValues.licenseExpiryDate)
      : null
  )
  const [driverType, setDriverType] = useState<string>(
    initialValues.driverType || ""
  )
  const [driverLicenseFile, setDriverLicenseFile] = useState<File | null>(null)
  const [driverPictures, setDriverPictures] = useState<File[]>([])

  const handleNext = () => {
    if (
      !licenseNumber ||
      !licenseExpiryDate ||
      !driverType ||
      !driverLicenseFile
    ) {
      toast({
        title: "Error",
        description: "Please fill all required fields and upload documents.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    updateFormData({
      licenseNumber,
      licenseExpiryDate: licenseExpiryDate.toISOString().split("T")[0],
      driverType,
      driverLicenseFile,
      driverPictures,
    })

    nextStep()
  }

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>License Number</FormLabel>
          <Input
            placeholder="Enter License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>
            License Expiry Date
          </FormLabel>
          <DatePicker
            selected={licenseExpiryDate}
            onChange={(date) => setLicenseExpiryDate(date)}
            customInput={<Input />}
            placeholderText="Select Expiry Date"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>Driver Type</FormLabel>
          <RadioGroup value={driverType} onChange={setDriverType}>
            <Stack direction="row">
              <Radio value="Taxi">Taxi</Radio>
              <Radio value="Tricycle">Keke</Radio>
              <Radio value="Motorbike">Bike</Radio>
              <Radio value="Bus">Bus</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>
            Upload Driver&apos;s License
          </FormLabel>
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file && file.size > 5 * 1024 * 1024) {
                // 5MB limit
                toast({
                  title: "File too large",
                  description: "License file must be less than 5MB",
                  status: "error",
                })
                return
              }
              setDriverLicenseFile(file || null)
            }}
          />
          {driverLicenseFile && (
            <Text fontSize="sm" color="gray.600">
              Selected: {driverLicenseFile.name}
            </Text>
          )}
        </FormControl>

        <FormControl>
          <FormLabel color={colors.brand.primary}>
            Upload Driver Picture(s)
          </FormLabel>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || [])
              const oversized = files.filter((f) => f.size > 5 * 1024 * 1024)
              if (oversized.length > 0) {
                toast({
                  title: "Files too large",
                  description: "All pictures must be less than 5MB",
                  status: "error",
                })
                return
              }
              setDriverPictures(files)
            }}
          />
          {driverPictures.length > 0 && (
            <Text fontSize="sm" color="gray.600">
              Selected: {driverPictures.length} file(s)
            </Text>
          )}
        </FormControl>
      </VStack>

      <Flex justify="space-between" mt={10}>
        <Button onClick={prevStep} variant="outline" colorScheme="gray">
          Back
        </Button>
        <Button onClick={handleNext} colorScheme="purple">
          Continue
        </Button>
      </Flex>
    </Box>
  )
}

export default StepThree
