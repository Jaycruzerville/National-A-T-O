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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CellContext, ColumnDef } from "@tanstack/react-table"

import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StatCards from "@/reusables/StatCards"
import StyledTable from "@/reusables/StyledTable"
import AgentCard from "@/reusables/AgentCard"
import LineChart from "@/reusables/LineChart"
import PieChart from "@/reusables/PieChart"
import EditAgentModal from "@/reusables/EditAgentModal"
import SuperAdminService from "@/services/superAdminServices"
import { BiSort } from "react-icons/bi"

import ClaimsSnippet from "@/reusables/ClaimsSnippet"
import BarChart from "@/reusables/BarChart"
import { getMonths, getYearsList } from "@/utils/getYearsList"
import { format } from "date-fns"
import { getPercentageChange } from "@/utils/getStatPercentile"
import AgentStatusPopover from "@/reusables/AgentStatusPopover"
import { SwitchStatus } from "@/reusables/SwitchStatus"

import mockAgents from "@/data/appdetmock"
import { IError } from "@/types" // Assuming you have an error interface defined

interface Agent {
  id: string
  firstName: string
  lastName: string
  customerCode: string
  phoneNumber: string
  location: string
  noOfPlans: string
  status: string
  lastDateActive: string
  dateCreated: string
  lastPaymentDate: string
}

interface AgentTransaction {
  totalTransactionCount: number
  dayNumber: string
}

interface AgentSummary {
  monthCount: number
  monthName: string
  genderDistribution: {
    MALE: number
    FEMALE: number
    Unknown: number
  }
  topOccupations: { count: number; name: string }[]
}

const AgentsDetails: React.FC = () => {
  const toast = useToast()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }
  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    page: 1,
  })

  const queryClient = useQueryClient()

  interface FilterValues {
    [key: string]: any
  }

  const updateParams = ({ filterValues }: { filterValues: FilterValues }) => {
    setTableParams({ ...tableParams, ...filterValues })
  }

  const [chartFilters, setChartFilters] = useState({
    userStatus: "ACTIVE",
    userYear: `${new Date().getFullYear()}`,
    remittancePlan: "All plans",
    remittanceMonth: `${getMonths[new Date().getMonth() - 1]}`,
    planType: "",
  })

  const updateChartFilter = (key: string, payload: any) => {
    setChartFilters({ ...chartFilters, [key]: payload })
  }

  const { data: appDetails } = useQuery(
    ["agent-details", id],
    () => SuperAdminService.getAgentDetails(id!),
    {
      enabled: !!id,
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
    }
  )

  const { data: agentSummary } = useQuery({
    queryKey: [
      "agent-summary",
      {
        id,
        year: parseInt(chartFilters.userYear),
        status: chartFilters.userStatus.toUpperCase(),
        planType: chartFilters.planType,
      },
    ],
    queryFn: () => SuperAdminService.getAgentSummary(id!),
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

  const { data: agentTransactions } = useQuery({
    queryKey: [
      "agent-transactions",
      { id, month: chartFilters.remittanceMonth },
    ],
    queryFn: () => SuperAdminService.getAgentTransactions(id!),
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

  const { data: agentCustomers, isLoading: loadingCustomers } = useQuery({
    queryKey: [
      "agent-customers",
      {
        id,
        pageSize: tableParams.pageSize,
        page: tableParams.page,
      },
    ],
    queryFn: () => SuperAdminService.getAgentCustomers(id!, tableParams),
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

  const { mutate: toggleAgent, isLoading: togglingAgent } = useMutation(
    SuperAdminService.toggleAgentStatus,
    {
      onSuccess: () => {
        onClosePopover()
        queryClient.invalidateQueries(["agent-details"])
      },
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
    }
  )

  const handleClientToggle = () => {
    const payload = {
      id,
      status: appDetails?.data?.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
      userType: "agents",
    }
    toggleAgent(payload)
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
      value: appDetails?.data?.registeredUsersCount ?? 0,
      percentage: getPercentageChange(
        parseInt(appDetails?.data?.registeredUsers.currentMonth),
        parseInt(appDetails?.data?.registeredUsers.previousMonth)
      )?.percentageChange,
    },
    {
      id: 2,
      icon: totalTransactions,
      text: `Transaction value for ${new Date().toLocaleString("en-US", {
        month: "long",
      })}`,
      value: `₦${new Intl.NumberFormat("en-GB", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(appDetails?.data?.totalTransactionValue.currentMonth ?? 0)}`,
      percentage: getPercentageChange(
        parseInt(appDetails?.data?.totalTransactionValue.currentMonth),
        parseInt(appDetails?.data?.totalTransactionValue.previousMonth)
      )?.percentageChange,
    },
  ]

  const agentStatusMap: { [key: string]: string } = {
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
            {`${appDetails?.data?.firstName ?? `-`} ${
              appDetails?.data?.lastName ?? `-`
            } | ${appDetails?.data?.agentCode ?? `-`}`}
          </Text>
          <Box ml="10px" textTransform="capitalize">
            {SwitchStatus(
              agentStatusMap[appDetails?.data?.status],
              appDetails?.data?.status.toLowerCase()
            )}
          </Box>
        </Flex>
        {appDetails?.data && (
          <AgentStatusPopover
            isOpen={isOpenPopover}
            onClose={onClosePopover}
            onOpen={onOpenPopover}
            status={appDetails?.data?.status}
            ActionButton={
              <Button
                isLoading={togglingAgent}
                onClick={handleClientToggle}
                variant={
                  appDetails?.data?.status === "ACTIVE"
                    ? "app-danger"
                    : "app-safety"
                }
              >
                {appDetails?.data?.status === "ACTIVE"
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
                      ({ totalTransactionCount }: AgentTransaction) =>
                        totalTransactionCount
                    )}
                    xLabel={agentTransactions?.data?.map(
                      ({ dayNumber }: AgentTransaction) => dayNumber
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
                      ({ monthCount }: AgentSummary) => monthCount
                    )}
                    xLabel={agentSummary?.data?.userGraph?.map(
                      ({ monthName }: AgentSummary) => monthName.substring(0, 3)
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
                  data={appDetails?.data}
                  userCount={appDetails?.data?.registeredUsersCount}
                  lastActive={appDetails?.data?.lastActiveDate}
                  dateCreated={appDetails?.data?.createdAt}
                  editModal={onOpen}
                />
                <ClaimsSnippet data={appDetails?.data?.recentClaims} />
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
                data={agentCustomers?.data ?? mockAgents}
                columns={columns}
                loading={loadingCustomers}
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
        data={appDetails?.data}
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
