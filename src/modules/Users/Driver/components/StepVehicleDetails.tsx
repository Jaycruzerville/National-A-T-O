// steps/StepTwo.tsx
import React from "react"
import {
  Box,
  Button,
  VStack,
  Select,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react"
import vehicleData from "@/data/vehicleData.json"
import { colors } from "@/theme/colors"

interface VehicleDetailsData {
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  vehiclePlateNumber: string
  vin: string
}

interface StepTwoProps {
  nextStep: () => void
  prevStep: () => void
  updateFormData: (data: Partial<VehicleDetailsData>) => void
  initialValues: Partial<VehicleDetailsData>
}

const StepTwo: React.FC<StepTwoProps> = ({
  nextStep,
  prevStep,
  updateFormData,
  initialValues,
}) => {
  const [vehicleMake, setVehicleMake] = React.useState<string>(
    initialValues.vehicleMake || ""
  )
  const [vehicleModel, setVehicleModel] = React.useState<string>(
    initialValues.vehicleModel || ""
  )
  const [vehicleYear, setVehicleYear] = React.useState<string>(
    initialValues.vehicleYear || ""
  )
  const [vehiclePlateNumber, setVehiclePlateNumber] = React.useState<string>(
    initialValues.vehiclePlateNumber || ""
  )
  const [vin, setVin] = React.useState<string>(initialValues.vin || "")

  const makes = Array.from(new Set(vehicleData.map((v) => v.make)))
  const models = vehicleMake
    ? vehicleData.filter((v) => v.make === vehicleMake).map((v) => v.model)
    : []
  const years = Array.from(new Set(vehicleData.map((v) => v.year)))

  const handleNext = () => {
    updateFormData({
      vehicleMake,
      vehicleModel,
      vehicleYear,
      vehiclePlateNumber,
      vin,
    })
    nextStep()
  }

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>Vehicle Make</FormLabel>
          <Select
            placeholder="Select Make"
            value={vehicleMake}
            onChange={(e) => {
              setVehicleMake(e.target.value)
              setVehicleModel("") // reset model on make change
            }}
          >
            {makes.map((make, index) => (
              <option key={index} value={make}>
                {make}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>Vehicle Model</FormLabel>
          <Select
            placeholder="Select Model"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
          >
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>Vehicle Year</FormLabel>
          <Select
            placeholder="Select Year"
            value={vehicleYear}
            onChange={(e) => setVehicleYear(e.target.value)}
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>
            License Plate Number
          </FormLabel>
          <Input
            placeholder="Enter Plate Number"
            value={vehiclePlateNumber}
            onChange={(e) => setVehiclePlateNumber(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>VIN</FormLabel>
          <Input
            placeholder="Enter Vehicle Identification Number"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
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

export default StepTwo
