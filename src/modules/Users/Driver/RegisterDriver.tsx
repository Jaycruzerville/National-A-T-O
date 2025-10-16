import React, { useState } from "react"
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
  useToast,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import StepOne from "./components/StepPersonalnfo"
import StepTwo from "./components/StepLicenseInfo"
import StepThree from "./components/StepVehicleDetails"
import StepFour from "./components/StepReviewSubmit"
// import { colors } from "@/theme/colors"

interface DriverFormData {
  // Step 1: Personal Info
  fullName?: string
  gender?: string
  dateOfBirth?: string
  street?: string
  licenseState?: string
  lga?: string
  // Step 2: License Info
  licenseNumber?: string
  licenseExpiryDate?: string
  driverType?: string
  driverLicenseFile?: File
  driverPictures?: File[]
  // Step 3: Vehicle Details
  vehicleType?: string
  vehiclePlateNumber?: string
  vin?: string
  vehiclePictures?: File[]
  // Step 4: Review
  // Any additional fields
}

const steps = [
  { title: "Personal Info", description: "Basic Details" },
  { title: "License Info", description: "Licensing & Docs" },
  { title: "Vehicle Details", description: "Vehicle Information" },
  { title: "Review & Submit", description: "Review & Finalize" },
]

interface RegisterDriverStepperProps {
  onClose: () => void
  setHasSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

const RegisterDriverStepper: React.FC<RegisterDriverStepperProps> = ({
  onClose,
  setHasSubmitted,
}) => {
  const toast = useToast()
  const [formData, setFormData] = useState<DriverFormData>({})
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })

  const stepperOrientation = useBreakpointValue({
    base: "vertical",
    md: "horizontal",
  }) as "vertical" | "horizontal"

  const nextStep = () => setActiveStep(activeStep + 1)
  const prevStep = () => setActiveStep(activeStep - 1)

  const updateFormData = (data: Partial<DriverFormData>) => {
    setFormData((prev: DriverFormData) => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <Box
      p={{ base: 4, md: 8 }}
      bg="white"
      borderRadius="12px"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      mx="auto"
      maxW={{ base: "100%", md: "800px" }}
      w={{ base: "95%", md: "auto" }}
    >
      <Stepper
        index={activeStep}
        colorScheme="blue"
        size={{ base: "sm", md: "lg" }}
        mb={{ base: 6, md: 8 }}
        orientation={stepperOrientation}
        gap={{ base: 4, md: 0 }}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box
              flexShrink="0"
              textAlign={{ base: "left", md: "center" }}
              ml={{ base: 3, md: 0 }}
            >
              <Text as="h3" fontSize="sm" fontWeight="500" color="gray.600">
                {step.title}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {step.description}
              </Text>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box>
        {activeStep === 0 && (
          <StepOne
            nextStep={nextStep}
            updateFormData={updateFormData}
            initialValues={formData}
          />
        )}
        {activeStep === 1 && (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            initialValues={formData}
          />
        )}
        {activeStep === 2 && (
          <StepThree
            nextStep={nextStep}
            prevStep={prevStep}
            updateFormData={updateFormData}
            initialValues={formData}
          />
        )}
        {activeStep === 3 && (
          <StepFour
            prevStep={prevStep}
            onClose={onClose}
            formData={formData}
            setHasSubmitted={setHasSubmitted}
            toast={toast}
          />
        )}
      </Box>
    </Box>
  )
}

export default RegisterDriverStepper
