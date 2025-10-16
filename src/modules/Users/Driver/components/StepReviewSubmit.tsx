// steps/StepFour.tsx
import React, { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  Text,
  VStack,
  useToast,
  Flex,
} from "@chakra-ui/react"
import usersService from "@/services/usersServices"

interface DriverFormData {
  fullName?: string
  gender?: string
  dateOfBirth?: string
  street?: string
  licenseState?: string
  lga?: string
  licenseNumber?: string
  licenseExpiryDate?: string
  driverType?: string
  driverLicenseFile?: File
  driverPictures?: File[]
  vehicleMake?: string
  vehicleModel?: string
  vehicleYear?: string
  vehiclePlateNumber?: string
  vin?: string
  vehiclePictures?: File[]
  contactMethod?: string[]
}

interface StepFourProps {
  prevStep: () => void
  onClose: () => void
  formData: DriverFormData
  setHasSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  toast: ReturnType<typeof useToast>
}

const StepFour: React.FC<StepFourProps> = ({
  prevStep,
  onClose,
  formData,
  setHasSubmitted,
  toast,
}) => {
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!termsAgreed || !privacyAgreed) {
      toast({
        title: "Error",
        description: "You must agree to the terms and privacy policy.",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
      return
    }

    try {
      setIsSubmitting(true)

      // Upload files
      let driverLicensePath = { path: "" }
      if (formData.driverLicenseFile) {
        driverLicensePath = await usersService.uploadFile(
          formData.driverLicenseFile
        )
      }
      const driverPicturePaths = await Promise.all(
        (formData.driverPictures || []).map((file: File) =>
          usersService.uploadFile(file)
        )
      )

      // Construct payload
      const payload = {
        ...formData,
        driverLicenseImage: driverLicensePath.path,
        driverImage: driverPicturePaths[0]?.path || "",
        preferredContactMethod:
          formData.contactMethod?.[0]?.toLowerCase() || "",
        termsAgreed,
        privacyPolicyAgreed: privacyAgreed,
      }

      await usersService.registerDriver(payload)

      toast({
        title: "Success",
        description: "Driver registration submitted for approval.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      setHasSubmitted(true)
      onClose()
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Error",
        description: "Something went wrong while submitting.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box>
      <VStack spacing={6} align="start">
        <Text fontWeight="bold">
          Please review your details and accept the agreements:
        </Text>

        <Checkbox
          isChecked={termsAgreed}
          onChange={(e) => setTermsAgreed(e.target.checked)}
        >
          I agree to the Terms and Conditions
        </Checkbox>
        <Checkbox
          isChecked={privacyAgreed}
          onChange={(e) => setPrivacyAgreed(e.target.checked)}
        >
          I agree to the Privacy Policy
        </Checkbox>
      </VStack>

      <Flex justify="space-between" mt={10}>
        <Button onClick={prevStep} variant="outline" colorScheme="gray">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          colorScheme="purple"
          isLoading={isSubmitting}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  )
}

export default StepFour
