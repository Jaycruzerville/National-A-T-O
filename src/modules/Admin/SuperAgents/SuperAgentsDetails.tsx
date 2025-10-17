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
  useDisclosure,
  Button,
} from "@chakra-ui/react"

import { CellContext, ColumnDef } from "@tanstack/react-table"

import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StatCards from "@/reusables/StatCards"
import StyledTable from "@/reusables/StyledTable"
import LineChart from "@/reusables/LineChart"
import superAgentService from "@/services/superAgentServices"
import AgentCard from "@/reusables/AgentCard"
import { IError } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import EditAgentModal from "@/reusables/EditAgentModal"
import { BiSort } from "react-icons/bi"

import ClaimsSnippet from "@/reusables/ClaimsSnippet"
import { useParams } from "react-router-dom"
import { getMonths } from "@/utils/getYearsList"
import { getPercentageChange } from "@/utils/getStatPercentile"
import { format } from "date-fns"
import AgentStatusPopover from "@/reusables/AgentStatusPopover"
import { SwitchStatus } from "@/reusables/SwitchStatus"

const SuperAgentsDetails = () => {
  const toast = useToast()
  const { id } = useParams()
  const [chartFilters, setChartFilters] = useState({
    userStatus: "Active",
    userYear: `${new Date().getFullYear()}`,
    remittancePlan: "All plans",
    remittanceMonth: `${getMonths[new Date().getMonth() - 1]}`,
    planType: "",
  })
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    page: 1,
  })

  const queryClient = useQueryClient()

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

  const { data: superAgentDetails } = useQuery({
    queryKey: ["superagent-details", { id }],
    queryFn: () => superAgentService.getSuperAgentDetails(id as string),
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

  // const { data: superAgentSummary } = useQuery({
  //   queryKey: [
  //     "superagent-summary",
  //     {
  //       id,
  //       year: parseInt(chartFilters.userYear),
  //       status: chartFilters.userStatus.toUpperCase(),
  //       planType: chartFilters.planType,
  //     },
  //   ],
  //   queryFn: () => superAgentService.getSuperAgentSummary(
  //     id as string,
  //     parseInt(chartFilters.userYear),
  //     chartFilters.userStatus.toUpperCase(),
  //     chartFilters.planType
  //   ),
  //   onError: (error: IError) => {
  //     toast({
  //       title: "Error",
  //       description: error?.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top",
  //     })
  //   },
  // })

  const { data: superAgentTransactions } = useQuery({
    queryKey: [
      "superagent-transactions",
      { id, month: chartFilters.remittanceMonth },
    ],
    queryFn: () => superAgentService.getTransactions(id as string),
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

  const { data: getComplaints, isLoading: loadingCustomers } = useQuery({
    queryKey: ["superagent-customers"],
    queryFn: () => superAgentService.getComplaints(),
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
    superAgentService.toggleAgentStatus,
    {
      onSuccess: () => {
        onClosePopover()
        queryClient.invalidateQueries(["superagent-details"])
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
      id: id ?? "",
      status:
        superAgentDetails?.data?.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
      userType: "super-agents",
    }
    toggleAgent(payload)
  }

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Agent, any>) => (
        <Box>
          {`${info.row.original.firstName} ${info.row.original.lastName}`}
        </Box>
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Agent, any>) => (
        <Box>{new Intl.NumberFormat("en-GB").format(info.getValue() ?? 0)}</Box>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Agent, any>) => (
        <Box>
          {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
        </Box>
      ),
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      value: superAgentDetails?.data?.registeredUsersCount ?? 0,
      percentage: getPercentageChange(
        parseInt(superAgentDetails?.data?.registeredUsers.currentMonth),
        parseInt(superAgentDetails?.data?.registeredUsers.previousMonth)
      )?.percentageChange,
    },
    {
      id: 2,
      icon: totalTransactions,
      text: `Transaction value for ${new Date().toLocaleString("en-US", {
        month: "long",
      })}`,
      value: `₦${new Intl.NumberFormat("en-GB").format(
        superAgentDetails?.data?.totalTransactionValue.currentMonth ?? 0
      )}`,
      percentage: getPercentageChange(
        parseInt(superAgentDetails?.data?.totalTransactionValue.currentMonth),
        parseInt(superAgentDetails?.data?.totalTransactionValue.previousMonth)
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
    <Container maxW="100%" px="0px" background="#E8E8E8">
      <Flex sx={agentStatus} h={{ base: "68px" }} mt="10px">
        <Flex sx={spaceFlex}>
          <Text mt="15px" textStyle="headText" sx={agentName}>
            {`${superAgentDetails?.firstName ?? `-`} ${
              superAgentDetails?.lastName ?? `-`
            } | ${superAgentDetails?.tag ?? `-`}`}
          </Text>
          <Box ml="10px" textTransform="capitalize">
            {SwitchStatus(
              agentStatusMap[superAgentDetails?.data?.status],
              superAgentDetails?.data?.status.toLowerCase()
            )}
          </Box>
        </Flex>
        <AgentStatusPopover
          isOpen={isOpenPopover}
          onClose={onClosePopover}
          onOpen={onOpenPopover}
          status={superAgentDetails?.data?.status}
          ActionButton={
            <Button
              isLoading={togglingAgent}
              onClick={handleClientToggle}
              variant={
                superAgentDetails?.data?.status === "ACTIVE"
                  ? "app-danger"
                  : "app-safety"
              }
            >
              {superAgentDetails?.data?.status === "ACTIVE"
                ? "Deactivate"
                : "Activate"}
            </Button>
          }
        />
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
          {/* <Tab sx={selectorBox}>SuperAgent Details</Tab> */}
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
                    dataSet_2={superAgentTransactions?.data?.map(
                      ({
                        totalTransactionAmount,
                      }: {
                        totalTransactionAmount: number
                      }) => totalTransactionAmount
                    )}
                    xLabel={superAgentTransactions?.data?.map(
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

                <ClaimsSnippet data={superAgentDetails?.driverSubmissions} />
              </Box>
              <Box w="33.3%">
                <AgentCard
                  position="SuperAgent"
                  data={superAgentDetails}
                  userCount={superAgentDetails?.data?.registeredUsersCount}
                  lastActive={superAgentDetails?.data?.lastActiveDate}
                  dateCreated={superAgentDetails?.createdAt}
                  editModal={onOpen}
                />
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
                data={getComplaints?.data ?? []}
                columns={columns}
                loading={loadingCustomers}
                pagination={{
                  pageSize: tableParams?.pageSize,
                  currentPage: tableParams?.page,
                  totalPages: getComplaints?.pagination?.numberOfPages,
                  updateFn: updateParams,
                }}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <EditAgentModal
        data={superAgentDetails?.data}
        isOpen={isOpen}
        onClose={onClose}
        userType="Super Agent"
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
  background: "#E8E8E8",
  mt: "0px",
  paddingBottom: "20px",
}

export default SuperAgentsDetails
