import React, { useState } from "react"
import {
  Container,
  Flex,
  Text,
  Box,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StatCards from "@/reusables/StatCards"
import SuperAdminService from "@/services/superAdminServices"
import PropertyInfo from "@/reusables/PropertyInfo"
import { IError } from "@/types"
import { useQuery } from "@tanstack/react-query"
import MapComponent from "@/reusables/MapComponent"
import "leaflet/dist/leaflet.css"
import { useParams } from "react-router-dom"
import { getPercentageChange } from "@/utils/getStatPercentile"
import InvoicePDF from "@/reusables/InvoicePdf"
import useScript from "@/reusables/payment/remita/useScript" // Adjust the path accordingly
import { makePayment } from "@/reusables/payment/remita/paymentHandler" // Correctly import the makePayment function
import { FeatureCollection } from "geojson"

type PaymentDetailsBase = {
  email: string
  firstName: string
  lastName: string
  amount: string
  narration: string
}

const PropertyDetails: React.FC = () => {
  const toast = useToast()
  const { id } = useParams<{ id: string }>()
  const [paymentCode, setPaymentCode] = useState("")

  const generatePaymentCode = () => {
    return `PC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  const handleGenerateInvoice = () => {
    const code = generatePaymentCode()
    setPaymentCode(code)
  }

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsBase>({
    email: "jefferson@ighalo.com",
    firstName: "Jefferson",
    lastName: "Ighalo",
    amount: "19999",
    narration: "Property payment",
  })

  const updatePaymentDetails = () => {
    setPaymentDetails((prevDetails: PaymentDetailsBase) => ({
      ...prevDetails,
      amount: "20999", // New amount
    }))
  }

  const proceedToPayment = () => {
    updatePaymentDetails()
    makePayment(paymentDetails)
  }

  useScript(
    "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js",
    () => {
      console.log("Remita script loaded")
    }
  )

  const { data: propertyDetails } = useQuery({
    queryKey: ["Property-details", { id }],
    queryFn: SuperAdminService.getPropertyDetails,
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
  })

  const mockDetails = {
    PropertyID: "67363883GY7878382T7F",
    LocalGovernment: "Amuwo Odofin",
    DistrictArea: "Odofin District",
    Street: "Kwame Nkrumah Avenue",
    HouseNumber: "15B",
    PropertyUsage: "Commercial",
    LandArea: "15G",
    TotalBuildingFootprint: "123",
    AssessedValue: "8,987,789.98",
    LandUseCharge: "100,837.98",
    BalanceCarriedForward: "100,837.98",
    State: "Lagos State",
    Latitude: "6.457033576389855",
    Longitude: "3.292990616327566",
    TotalAmountDue: "200,477,983.78",
    DiscountedAmountDue: "199,378,092.98",
    PaymentCode: paymentCode,
    OverdueCharges: "5000", // Added missing property
  }

  const coordinates: [number, number] = [
    parseFloat(mockDetails.Latitude),
    parseFloat(mockDetails.Longitude),
  ]

  const mockGeoJSON: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [coordinates[1], coordinates[0]],
        },
      },
    ],
  }

  const agentTotal = [
    {
      id: 1,
      icon: totalUsers,
      text: "Total Payments Made",
      value: `₦${new Intl.NumberFormat("en-GB").format(
        propertyDetails?.totalTransactionValue?.currentMonth ?? 0
      )}`,
      percentage: getPercentageChange(
        parseInt(propertyDetails?.registeredUsers?.currentMonth),
        parseInt(propertyDetails?.registeredUsers?.previousMonth)
      )?.percentageChange,
    },
    {
      id: 2,
      icon: totalTransactions,
      text: `Property value as of ${new Date().toLocaleString("en-US", {
        month: "long",
      })}`,
      value: `₦${new Intl.NumberFormat("en-GB").format(
        propertyDetails?.totalTransactionValue?.currentMonth ?? 0
      )}`,
      percentage: getPercentageChange(
        parseInt(propertyDetails?.totalTransactionValue?.currentMonth),
        parseInt(propertyDetails?.totalTransactionValue?.previousMonth)
      )?.percentageChange,
    },
  ]

  return (
    <Container maxW="100%" px="0px" background="#E8E8E8">
      <Flex sx={agentStatus} h={{ base: "68px" }}>
        <Flex sx={spaceFlex}>
          <Text textStyle="headText" sx={agentName}>
            {propertyDetails?.PropertyName}
          </Text>
        </Flex>
      </Flex>

      <Tabs sx={selectedContainerStyles} maxW="100%" px="0px" isLazy>
        <TabList sx={selectorStyles} maxW="100%">
          <Tab sx={selectorBox} color="brand.primary">
            Overview
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel sx={selectedContainerStyles} maxW="100%" px="20px" h="100%">
            <Flex sx={alignFlex} gap="8px" pb="20px">
              <Box sx={spaceFlex} w="66.6%">
                <Flex gap="8px">
                  {agentTotal.map(({ id, icon, text, value, percentage }) => (
                    <StatCards
                      key={id}
                      icon={icon}
                      text={text}
                      value={value}
                      percentage={percentage}
                      width="50%"
                    />
                  ))}
                </Flex>
                <Box sx={spaceFlex} w="99%">
                  <PropertyInfo details={mockDetails} />
                </Box>
                <Flex mt="20px" gap="10px" width="full">
                  <Button
                    bg="brand.primary"
                    color="white"
                    width="full"
                    _hover={{ backgroundColor: "gray[400]" }}
                    onClick={proceedToPayment}
                  >
                    Proceed to Payment
                  </Button>
                  <PDFDownloadLink
                    document={
                      <InvoicePDF
                        details={{ ...mockDetails, PaymentCode: paymentCode }}
                      />
                    }
                    fileName="invoice.pdf"
                  >
                    {({ loading }) =>
                      loading ? (
                        <Button
                          bg="brand.primary"
                          color="white"
                          isLoading
                          width="full"
                        >
                          Loading...
                        </Button>
                      ) : (
                        <Button
                          bg="brand.primary"
                          color="white"
                          width="full"
                          onClick={handleGenerateInvoice}
                        >
                          Generate Invoice
                        </Button>
                      )
                    }
                  </PDFDownloadLink>
                </Flex>
              </Box>
              <Box w="33.3%">
                <Container maxW="100%" px="0px" background="#E8E8E8">
                  <MapComponent
                    coordinates={coordinates}
                    propertyData={{
                      name: mockDetails.PropertyID,
                      description: `Located at ${mockDetails.Street}, ${mockDetails.State}`,
                    }}
                    geojsonData={mockGeoJSON}
                  />
                </Container>
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

const agentStatus = {
  alignItems: "center",
  justifyContent: "space-between",
  background: "#EEF1FD",
  px: "20px",
}
const agentName = {
  color: "#0B1023",
  lineHeight: "100%",
  fontSize: "20px",
  fontWeight: 700,
  fontStyle: "normal",
}

const spaceFlex = {
  justifyContent: "space-between",
  alignItems: "center",
}

const alignFlex = {
  justifyContent: "space-between",
  alignItems: "flex-start",
}

const selectorStyles = {
  p: "20px",
  background: " #FFFFFF",
  marginTop: "0px",
  mx: "0px",
}

const selectorBox = {
  w: "135px",
  textAlign: "center",
  paddingBottom: "8px",
  fontSize: "13px",
  fontWeight: 500,
  lineHeight: "16px",
  color: "brand.primary",
  cursor: "pointer",
  background: "#FFF",
  whiteSpace: "nowrap",
}
const selectedContainerStyles = {
  background: "#E8E8E8",
  mt: "0px",
  paddingBottom: "20px",
}

export default PropertyDetails
