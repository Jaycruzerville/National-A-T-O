import { useState } from "react"
import {
  Container,
  Flex,
  Text,
  Box,
  Icon,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StatCards from "@/reusables/StatCards"
import StyledTable from "@/reusables/StyledTable"
import SuperAdminService from "@/services/superAdminServices"
import PropertyInfo from "@/reusables/PropertyInfo"
import { IError } from "@/types"
import { useQuery } from "@tanstack/react-query"
import MapComponent from "@/reusables/MapComponent"
import "leaflet/dist/leaflet.css"
import { BiSort } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { getPercentageChange } from "@/utils/getStatPercentile"
import { format } from "date-fns"
import { FeatureCollection } from "geojson"

const PropertyDetails = () => {
  const toast = useToast()
  const { id } = useParams()
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    page: 1,
  })

  const updateParams = ({
    filterValues,
  }: {
    filterValues: Record<string, unknown>
  }) => {
    setTableParams({ ...tableParams, ...filterValues })
  }

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
    PaymentCode: "10020-56353-2728",
    OverdueCharges: "800,009,890",
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

  const { data: propertyCustomers, isLoading: loadingProperties } = useQuery({
    queryKey: [
      "Property-customers",
      {
        id,
        pageSize: tableParams.pageSize,
        page: tableParams.page,
      },
    ],
    queryFn: SuperAdminService.getPropertyCustomers,
    enabled: tabIndex === 1,
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

  type Agent = {
    id: number
    firstName: string
    lastName: string
    customerCode: string
    phoneNum: string
    location: string
    noOfPlans: string
    status: string
    lastDateActive: string
    dateCreated: string
  }

  const columns: ColumnDef<Agent>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <Button
          gap="4px"
          p="0px"
          _hover={{ backgroundColor: "none" }}
          _active={{ background: "none" }}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <Icon as={BiSort} color="brand.primary" />
        </Button>
      ),
      cell: (info: CellContext<Agent, any>) => (
        <Box>{`${info.row.original.firstName} ${info.row.original.lastName}`}</Box>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "totalPlans",
      header: ({ column }) => (
        <Button
          gap="4px"
          p="0px"
          _hover={{ backgroundColor: "none" }}
          _active={{ background: "none" }}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plans <Icon as={BiSort} color="brand.primary" />
        </Button>
      ),
      cell: (info: CellContext<Agent, any>) => (
        <Box>{new Intl.NumberFormat("en-GB").format(info.getValue() ?? 0)}</Box>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: CellContext<Agent, any>) => (
        <Box
          bgColor={info.getValue() === "ACTIVE" ? "#9BFDD4" : "#DCDBDD"}
          p="4px 8px"
          width="fit-content"
          borderRadius="4px"
          fontSize="12px"
          color={info.getValue() === "ACTIVE" ? "#027A48" : "#202020"}
          fontWeight="500"
        >
          {info.getValue().toLowerCase()}
        </Box>
      ),
    },
    {
      accessorKey: "lastPaymentDate",
      header: "Last Txn Date",
      cell: (info: CellContext<Agent, any>) => (
        <Box>
          {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
        </Box>
      ),
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      cell: (info: CellContext<Agent, any>) => (
        <Box>
          {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
        </Box>
      ),
    },
  ]

  const agentTotal = [
    {
      id: 1,
      icon: totalUsers,
      text: "Total users",
      value: propertyDetails?.data?.registeredUsersCount ?? 0,
      percentage: getPercentageChange(
        parseInt(propertyDetails?.data?.registeredUsers?.currentMonth),
        parseInt(propertyDetails?.data?.registeredUsers?.previousMonth)
      )?.percentageChange,
    },
    {
      id: 2,
      icon: totalTransactions,
      text: `Transaction value for ${new Date().toLocaleString("en-US", {
        month: "long",
      })}`,
      value: `₦${new Intl.NumberFormat("en-GB").format(
        propertyDetails?.data?.totalTransactionValue?.currentMonth ?? 0
      )}`,
      percentage: getPercentageChange(
        parseInt(propertyDetails?.data?.totalTransactionValue?.currentMonth),
        parseInt(propertyDetails?.data?.totalTransactionValue?.previousMonth)
      )?.percentageChange,
    },
  ]

  return (
    <Container maxW="100%" px="0px" background="#E8E8E8">
      <Flex sx={agentStatus} h={{ base: "68px" }}>
        <Flex sx={spaceFlex}>
          <Text textStyle="headText" sx={agentName}>
            {propertyDetails?.data?.PropertyName}
          </Text>
        </Flex>
      </Flex>

      <Tabs
        sx={selectedContainerStyles}
        maxW="100%"
        px="0px"
        isLazy
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList sx={selectorStyles} maxW="100%">
          <Tab sx={selectorBox} color="brand.primary">
            Overview
          </Tab>
          <Tab sx={selectorBox}>Payment History</Tab>
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

          <TabPanel
            sx={selectedContainerStyles}
            maxW="100%"
            px="20px"
            h="calc(100vh - 266px)"
          >
            <Box p="20px" bg="#FFF">
              <StyledTable
                data={propertyCustomers?.data ?? []}
                columns={columns}
                loading={loadingProperties}
                pagination={{
                  pageSize: tableParams?.pageSize,
                  currentPage: tableParams?.page,
                  totalPages: propertyCustomers?.pagination?.numberOfPages,
                  updateFn: updateParams,
                }}
              />
            </Box>
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
