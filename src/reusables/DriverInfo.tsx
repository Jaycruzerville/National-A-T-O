import React from "react"
import {
  Box,
  VStack,
  HStack,
  Text,
  Divider,
  Image,
  Badge,
  SimpleGrid,
  Center,
} from "@chakra-ui/react"

type DriverDetails = {
  fullName: string
  phoneNumber: string
  vehicleType: string
  vehiclePlateNumber: string
  vin: string
  tag: string
  qrCode?: string // QR code is optional
  approved: boolean
  activeForDay: boolean
  createdAt: string
}

const DriverInfo: React.FC<{ details: DriverDetails }> = ({ details }) => {
  const formatDate = (date: string) => new Date(date).toLocaleDateString()

  return (
    <Center py={6}>
      <Box
        maxW="lg"
        w="full"
        bg="white"
        boxShadow="2xl"
        rounded="lg"
        p={6}
        textAlign="center"
      >
        {/* Driver Name and QR Code */}
        <HStack justifyContent="center" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold" color="teal.600">
            {details.fullName}
          </Text>
          {details.qrCode && (
            <Image src={details.qrCode} alt="QR Code" boxSize={70} />
          )}
        </HStack>

        {/* Driver Status */}
        <HStack justifyContent="center" mt={2} mb={4}>
          <Badge
            px={3}
            py={1}
            borderRadius="md"
            colorScheme={details.approved ? "green" : "red"}
          >
            {details.approved ? "Approved" : "Not Approved"}
          </Badge>
          <Badge
            px={3}
            py={1}
            borderRadius="md"
            colorScheme={details.activeForDay ? "blue" : "gray"}
          >
            {details.activeForDay ? "Active Today" : "Inactive"}
          </Badge>
        </HStack>

        {/* Divider */}
        <Divider my={4} />

        {/* Vehicle Information */}
        <SimpleGrid columns={2} spacing={4}>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">
              Phone Number
            </Text>
            <Text>{details.phoneNumber}</Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">
              Vehicle Type
            </Text>
            <Text>{details.vehicleType}</Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">
              Plate Number
            </Text>
            <Text>{details.vehiclePlateNumber}</Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">
              VIN
            </Text>
            <Text>{details.vin}</Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">
              Tag
            </Text>
            <Text>{details.tag}</Text>
          </Box>
        </SimpleGrid>

        {/* Divider */}
        <Divider my={4} />

        {/* Created At */}
        <VStack spacing={4} mt={4}>
          <Box>
            <Text fontSize="md" fontWeight="semibold" color="gray.500">
              Created At
            </Text>
            <Text>{formatDate(details.createdAt)}</Text>
          </Box>
        </VStack>
      </Box>
    </Center>
  )
}

export default DriverInfo
