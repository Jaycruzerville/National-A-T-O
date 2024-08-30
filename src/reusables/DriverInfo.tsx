import React from "react"
import { Box, VStack, Text, Divider, SimpleGrid } from "@chakra-ui/react"

type DriverDetails = {
  DriverID: string
  LocalGovernment: string
  DistrictArea: string
  Street: string
  HouseNumber: string
  DriverUsage: string
  LandArea: string
  TotalBuildingFootprint: string
  AssessedValue: string
  LandUseCharge: string
  BalanceCarriedForward: string
  TotalAmountDue: string
  DiscountedAmountDue: string
  PaymentCode: string
  OverdueCharges: string
}

const DriverInfo: React.FC<{ details: DriverDetails }> = ({ details }) => {
  const formatCurrency = (amount: string) => {
    const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ""))
    return `₦${numericAmount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
    })}`
  }

  const DriverInfoStyle = {
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
    padding: "20px",
    margin: "10px",
    width: "100%",
    maxWidth: "100%",
    fontSize: "14px",
  }

  const infoItemStyle = {
    paddingY: "2",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }

  return (
    <VStack sx={DriverInfoStyle} spacing={4} align="stretch">
      <Text fontSize="lg" fontWeight="bold">
        Driver Information
      </Text>
      <Divider />
      <SimpleGrid columns={2} spacing={4}>
        {Object.entries(details).map(([key, value]) => (
          <Box key={key} sx={infoItemStyle}>
            <Text fontWeight="semibold" textTransform="capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </Text>
            <Text>
              {key.toLowerCase().includes("value") ||
              key.toLowerCase().includes("amount") ||
              key.toLowerCase().includes("charge")
                ? formatCurrency(value)
                : value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default DriverInfo
