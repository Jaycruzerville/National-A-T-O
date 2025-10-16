import React, { useEffect, useState } from "react"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Flex,
  useToast,
} from "@chakra-ui/react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import lookupService from "@/services/lookupService"
import { colors } from "@/theme/colors"

interface PersonalInfoData {
  fullName: string
  gender: string
  dateOfBirth: string
  street: string
  licenseState: string
  lga: string
}

interface StepOneProps {
  nextStep: () => void
  updateFormData: (data: Partial<PersonalInfoData>) => void
  initialValues: Partial<PersonalInfoData>
}

const StepOne: React.FC<StepOneProps> = ({
  nextStep,
  updateFormData,
  initialValues,
}) => {
  const toast = useToast()

  const [dob, setDob] = useState<Date | null>(
    initialValues?.dateOfBirth ? new Date(initialValues.dateOfBirth) : null
  )

  const [formData, setFormData] = useState<PersonalInfoData>({
    fullName: initialValues?.fullName || "",
    gender: initialValues?.gender || "",
    dateOfBirth: initialValues?.dateOfBirth || "",
    street: initialValues?.street || "",
    licenseState: initialValues?.licenseState || "",
    lga: initialValues?.lga || "",
  })

  const [states, setStates] = useState<{ _id: string; name: string }[]>([])
  const [lgas, setLgas] = useState<string[]>([])
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingLgas, setLoadingLgas] = useState(false)

  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true)
      try {
        const data = await lookupService.getStates()
        setStates(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch states",
          status: "error",
        })
      } finally {
        setLoadingStates(false)
      }
    }
    loadStates()
  }, [])

  useEffect(() => {
    if (formData.licenseState) {
      const fetchLgas = async () => {
        setLoadingLgas(true)
        try {
          const selected = states.find((s) => s.name === formData.licenseState)
          if (selected?._id) {
            const data = await lookupService.getLGAs(selected._id)
            const sorted = data.map((lga: { name: string }) => lga.name).sort()
            setLgas(sorted)
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load LGAs",
            status: "error",
          })
        } finally {
          setLoadingLgas(false)
        }
      }
      fetchLgas()
    }
  }, [formData.licenseState, states])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (
      !formData.fullName ||
      !formData.gender ||
      !dob ||
      !formData.street ||
      !formData.licenseState ||
      !formData.lga
    ) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        status: "error",
      })
      return
    }

    updateFormData({
      ...formData,
      dateOfBirth: dob.toISOString().split("T")[0],
    })
    nextStep()
  }

  return (
    <Box>
      <VStack spacing={5} align="stretch">
        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>Full Name</FormLabel>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            bg="white"
            borderColor={colors.brand.primary}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>Gender</FormLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Select Gender"
            bg="white"
            borderColor={colors.brand.primary}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>

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

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>Street</FormLabel>
          <Input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Enter street name"
            bg="white"
            borderColor={colors.brand.primary}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>State</FormLabel>
          <Select
            name="licenseState"
            value={formData.licenseState}
            onChange={handleChange}
            placeholder={loadingStates ? "Loading states..." : "Select State"}
            bg="white"
            borderColor={colors.brand.primary}
            disabled={loadingStates}
          >
            {states.map((state) => (
              <option key={state._id} value={state.name}>
                {state.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={colors.brand.primary}>LGA</FormLabel>
          <Select
            name="lga"
            value={formData.lga}
            onChange={handleChange}
            placeholder={loadingLgas ? "Loading LGAs..." : "Select LGA"}
            bg="white"
            borderColor={colors.brand.primary}
            disabled={loadingLgas || !formData.licenseState}
          >
            {lgas.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
      </VStack>

      <Flex mt={8} justify="flex-end">
        <Button onClick={handleNext} bg={colors.brand.primary} color="white">
          Continue
        </Button>
      </Flex>
    </Box>
  )
}

export default StepOne
