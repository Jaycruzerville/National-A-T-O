import { useState } from "react"
import {
  Container,
  Flex,
  Text,
  Box,
  useToast,
  Tabs,
  Icon,
  Button,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { BiSort } from "react-icons/bi"
import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StatCards from "@/reusables/StatCards"
import StyledTable from "@/reusables/StyledTable"
import LineChart from "@/reusables/LineChart"
import PieChart from "@/reusables/PieChart"
import BarChart from "@/reusables/BarChart"
import AgentCard from "@/reusables/AgentCard"
import ClaimsSnippet from "@/reusables/ClaimsSnippet"
import usersService from "@/services/usersServices"
import { IError } from "@/types"
import { format } from "date-fns"
import { getMonths, getYearsList } from "@/utils/getYearsList"
import { getPercentageChange } from "@/utils/getStatPercentile"
import AgentStatusPopover from "@/reusables/AgentStatusPopover"
import { SwitchStatus } from "@/reusables/SwitchStatus"
import EditAgentModal from "@/reusables/EditAgentModal"

const AgentsDetails = () => {
  const toast = useToast()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [tabIndex, setTabIndex] = useState(0)
  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    page: 1,
  })
  const [chartFilters, setChartFilters] = useState({
    userStatus: "ACTIVE",
    userYear: `${new Date().getFullYear()}`,
    remittancePlan: "All plans",
    remittanceMonth: `${getMonths[new Date().getMonth() - 1]}`,
    planType: "",
  })

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const updateParams = ({
    filterValues,
  }: {
    filterValues: Record<string, unknown>
  }) => {
    setTableParams({ ...tableParams, ...filterValues })
  }

  const updateChartFilter = (key: string, payload: string) => {
    setChartFilters({ ...chartFilters, [key]: payload })
  }

  // Fetch agent details
  const { data: agentData } = useQuery({
    queryKey: ["agent-details", id],
    queryFn: () => usersService.getAgentDetails(id!),
    enabled: !!id,
    onError: (error: IError) => {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    },
  })

  // Dummy data for agent summary
  const agentSummary = {
    data: {
      userGraph: [
        { monthName: "January", monthCount: 20 },
        { monthName: "February", monthCount: 25 },
        { monthName: "March", monthCount: 15 },
      ],
      genderDistribution: {
        MALE: 60,
        FEMALE: 40,
        Unknown: 10,
      },
      topOccupations: [
        { name: "Engineer", count: 30 },
        { name: "Doctor", count: 25 },
        { name: "Teacher", count: 20 },
      ],
    },
  }

  // Dummy data for agent transactions
  const agentTransactions = {
    data: [
      { dayNumber: 1, totalTransactionCount: 50 },
      { dayNumber: 2, totalTransactionCount: 75 },
      { dayNumber: 3, totalTransactionCount: 30 },
    ],
  }

  // Dummy data for agent customers
  const agentCustomers = {
    data: [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        customerCode: "C001",
        phoneNum: "1234567890",
        location: "Lagos",
        noOfPlans: "3",
        status: "ACTIVE",
        lastDateActive: "2024-09-10",
        dateCreated: "2024-01-01",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        customerCode: "C002",
        phoneNum: "0987654321",
        location: "Abuja",
        noOfPlans: "2",
        status: "INACTIVE",
        lastDateActive: "2024-08-25",
        dateCreated: "2024-02-10",
      },
    ],
    pagination: {
      numberOfPages: 1,
    },
  }

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (error || !agentData) {
  //   return <div>Failed to load agent details</div>
  // }

  const { mutate: toggleAgent, isLoading: togglingAgent } = useMutation(
    usersService.toggleAgentStatus,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["agent-details"])
      },
      onError: (error: IError) => {
        toast({
          title: "Error",
          description: error?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      },
    }
  )

  const handleClientToggle = () => {
    const payload = {
      id,
      status: agentData?.data?.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
      userType: "agents",
    }
    toggleAgent(payload)
  }

  // Table columns for agent customers
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
      accessorKey: "phoneNum",
      header: "Phone Number",
    },
    {
      accessorKey: "noOfPlans",
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
      accessorKey: "lastDateActive",
      header: "Last Active Date",
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
      value: agentData?.data?.registeredUsersCount ?? 0,
      percentage: getPercentageChange(
        parseInt(agentData?.data?.registeredUsers?.currentMonth ?? "0"),
        parseInt(agentData?.data?.registeredUsers?.previousMonth ?? "0")
      )?.percentageChange,
    },
    {
      id: 2,
      icon: totalTransactions,
      text: `Month of ${new Date().toLocaleString("en-US", {
        month: "long",
      })}`,
      value: `₦${new Intl.NumberFormat("en-GB", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(agentData?.data?.totalTransactionValue?.currentMonth ?? 0)}`,
      percentage: getPercentageChange(
        parseInt(agentData?.data?.totalTransactionValue?.currentMonth ?? "0"),
        parseInt(agentData?.data?.totalTransactionValue?.previousMonth ?? "0")
      )?.percentageChange,
    },
  ]

  const agentStatusMap: { [k: string]: string } = {
    ACTIVE: "Successful",
    BLOCKED: "Failed",
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenPopover,
    onOpen: onOpenPopover,
    onClose: onClosePopover,
  } = useDisclosure()

  return (
    <Container maxW="100%" px="0px" background="#f6f6f6">
      <Flex sx={agentStatus} h={{ base: "68px" }}>
        <Flex sx={spaceFlex}>
          <Text textStyle="headText" sx={agentName}>
            {`${agentData?.firstName ?? `-`} ${agentData?.lastName ?? `-`} | ${
              agentData?.tag ?? `-`
            }`}
          </Text>
          <Box ml="10px" textTransform="capitalize">
            {SwitchStatus(
              agentStatusMap[agentData?.data?.status],
              agentData?.data?.status.toLowerCase()
            )}
          </Box>
        </Flex>
        {agentData?.data && (
          <AgentStatusPopover
            isOpen={isOpenPopover}
            onClose={onClosePopover}
            onOpen={onOpenPopover}
            status={agentData?.data?.status}
            ActionButton={
              <Button
                isLoading={togglingAgent}
                onClick={handleClientToggle}
                variant={
                  agentData?.data?.status === "ACTIVE"
                    ? "app-danger"
                    : "app-safety"
                }
              >
                {agentData?.data?.status === "ACTIVE"
                  ? "Deactivate"
                  : "Activate"}
              </Button>
            }
          />
        )}
      </Flex>

      <Tabs isLazy index={tabIndex} onChange={handleTabsChange}>
        <TabList sx={selectorStyles} maxW="100%">
          <Tab sx={selectorBox}>Overview</Tab>
          <Tab sx={selectorBox}>Registered Users</Tab>
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
                <Flex sx={spaceFlex} gap="8px" mt="8px" w="100%">
                  <LineChart
                    width={"100%"}
                    chartHeader={"Remittances"}
                    labels={[""]}
                    dataSet_1={[0]}
                    dataSet_2={agentTransactions?.data?.map(
                      ({
                        totalTransactionCount,
                      }: {
                        totalTransactionCount: number
                      }) => totalTransactionCount
                    )}
                    xLabel={agentTransactions?.data?.map(
                      ({ dayNumber }: { dayNumber: number }) => dayNumber
                    )}
                    filters={[
                      {
                        name: "planType",
                        default: "All",
                        options: [
                          "Micro Pension",
                          "Micro Insurance",
                          "Micro Savings",
                        ],
                      },
                      {
                        name: "remittanceMonth",
                        default: getMonths[new Date().getMonth() - 1],
                        options: getMonths,
                      },
                    ]}
                    filterUpdateFn={updateChartFilter}
                  />
                </Flex>
                <Flex sx={spaceFlex} gap="8px" mt="8px" pb="0px">
                  <LineChart
                    width={"100%"}
                    chartHeader={"Users"}
                    labels={[""]}
                    dataSet_1={[0]}
                    dataSet_2={agentSummary?.data?.userGraph?.map(
                      ({ monthCount }: { monthCount: number }) => monthCount
                    )}
                    xLabel={agentSummary?.data?.userGraph?.map(
                      ({ monthName }: { monthName: string }) =>
                        monthName.substring(0, 3)
                    )}
                    filters={[
                      {
                        name: "userStatus",
                        default: "Active",
                        options: ["Active", "Inactive"],
                      },
                      {
                        name: "userYear",
                        default: `${new Date().getFullYear()}`,
                        options: getYearsList(5),
                      },
                    ]}
                    filterUpdateFn={updateChartFilter}
                  />
                </Flex>
                <Flex sx={spaceFlex} gap="8px" mt="8px" pb="0px">
                  <Box
                    w="50%"
                    h={{ base: "349px" }}
                    background="#FFF"
                    borderRadius="12px"
                  >
                    <PieChart
                      chartHeader={"Gender of users"}
                      data={[
                        agentSummary?.data?.genderDistribution?.MALE,
                        agentSummary?.data?.genderDistribution?.FEMALE,
                        agentSummary?.data?.genderDistribution?.Unknown,
                      ]}
                      labels={["Male", "Female", "Unknown"]}
                      customLegend={[
                        {
                          title: "Male",
                          count: agentSummary?.data?.genderDistribution?.MALE,
                          color: "#3661EC",
                        },
                        {
                          title: "Female",
                          count: agentSummary?.data?.genderDistribution?.FEMALE,
                          color: "#2FD0C6",
                        },
                        {
                          title: "Unknown",
                          count:
                            agentSummary?.data?.genderDistribution?.Unknown,
                          color: "#D02F44",
                        },
                      ]}
                    />
                  </Box>
                  <Box
                    w={{ base: "50%" }}
                    h={{ base: "349px" }}
                    background="#FFF"
                    borderRadius="12px"
                    p="24px"
                  >
                    <Text
                      mb="14px"
                      textStyle="headText"
                      sx={occupationHeaderStyles}
                    >
                      Occupation of users
                    </Text>

                    <Box
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      display="flex"
                    >
                      <BarChart
                        orientation="horizontal"
                        data={agentSummary?.data?.topOccupations?.map(
                          ({ count }: { count: number }) => count
                        )}
                        labels={agentSummary?.data?.topOccupations?.map(
                          ({ name }: { name: string }) => name
                        )}
                      />
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Box w="33.3%">
                <AgentCard
                  position="Agent"
                  data={agentData}
                  userCount={agentData?.data?.registeredUsersCount}
                  lastActive={agentData?.data?.lastActiveDate}
                  dateCreated={agentData?.data?.createdAt}
                  editModal={onOpen}
                />
                <ClaimsSnippet data={agentData?.data?.recentClaims} />
              </Box>
            </Flex>
          </TabPanel>

          <TabPanel
            sx={selectedContainerStyles}
            maxW="100%"
            px="20px"
            h="calc(100vh - 246px)"
          >
            <Box p="20px" bg="#FFF">
              <StyledTable
                data={agentCustomers?.data ?? []}
                columns={columns}
                loading={false}
                pagination={{
                  pageSize: tableParams?.pageSize,
                  currentPage: tableParams?.page,
                  totalPages: agentCustomers?.pagination?.numberOfPages,
                  updateFn: updateParams,
                }}
                onRowClick={(row) => navigate(`/customers/${row.id}`)}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <EditAgentModal
        data={agentData?.data}
        isOpen={isOpen}
        onClose={onClose}
        userType="Agent"
      />
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
  background: "#f6f6f6",
  paddingBottom: "20px",
}

const occupationHeaderStyles = {
  fontWeight: 700,
  fontSize: "20px",
  lineHeight: "32px",
}

export default AgentsDetails
