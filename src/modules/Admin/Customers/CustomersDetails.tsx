import { useState } from "react"
import {
  Container,
  Flex,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
  Tooltip,
  useToast,
} from "@chakra-ui/react"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StatCards from "@/reusables/StatCards"
import StyledTable from "@/reusables/StyledTable"
import LineChart from "@/reusables/LineChart"
import FilterModal from "./components/FilterModal"
import ViewReceiptModal from "@/reusables/ViewReceiptModal"
import AgentCard from "@/reusables/AgentCard"
import EditAgentModal from "@/reusables/EditAgentModal"
import SuperAdminService from "@/services/superAdminServices"
import { useQuery } from "@tanstack/react-query"
import { IError } from "@/types"
import { useParams } from "react-router-dom"
import { getPercentageChange } from "@/utils/getStatPercentile"
import { months } from "@/data/mock"
import { formatToCurrency } from "@/utils/formatToCurrency"
import { SwitchStatus } from "@/reusables/SwitchStatus"
import { format } from "date-fns"

const CustomerDetails = () => {
  const toast = useToast()
  const { id } = useParams()
  const [chartFilters, setChartFilters] = useState({
    remittancePlan: "",
    remittanceMonth: `${months[new Date().getMonth() - 1]}`,
  })

  const [plansTableParams, setPlansTableParams] = useState({
    pageSize: 10,
    page: 1,
  })
  const [claimsTableParams, setClaimsTableParams] = useState({
    pageSize: 10,
    page: 1,
  })

  const [recentTransactionsParam, setRecentTransactionsParam] = useState({
    pageSize: 10,
    page: 1,
    status: "",
    id,
  })

  const updateClaimsParams = ({
    filterValues,
  }: {
    filterValues: Record<string, unknown>
  }) => {
    setClaimsTableParams({ ...claimsTableParams, ...filterValues })
  }

  const updateRecentTransactionsParams = ({
    filterValues,
  }: {
    filterValues: Record<string, unknown>
  }) => {
    setRecentTransactionsParam({ ...recentTransactionsParam, ...filterValues })
  }

  const updatePlansParams = ({
    filterValues,
  }: {
    filterValues: Record<string, unknown>
  }) => {
    setPlansTableParams({ ...plansTableParams, ...filterValues })
  }
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }
  const updateChartFilter = (key: string, payload: string) => {
    setChartFilters({ ...chartFilters, [key]: payload })
  }

  const { data: customerDetails } = useQuery({
    queryKey: ["customer-details", { id }],
    queryFn: SuperAdminService.getCustomerDetails,
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

  const { data: customerTransactions } = useQuery({
    queryKey: [
      "customer-transactions",
      {
        id,
        planType: chartFilters.remittancePlan,
        month: chartFilters.remittanceMonth,
      },
    ],
    queryFn: SuperAdminService.getCustomersTransactions,
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

  const { data: customerPlans, isLoading: loadingPlans } = useQuery({
    queryKey: [
      "customer-plans",
      {
        id,
        pageSize: plansTableParams.pageSize,
        page: plansTableParams.page,
      },
    ],
    queryFn: SuperAdminService.getCustomerPlans,
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

  const { data: customerClaims, isLoading: loadingClaims } = useQuery({
    queryKey: [
      "customer-claims",
      {
        id,
        pageSize: claimsTableParams.pageSize,
        page: claimsTableParams.page,
      },
    ],
    queryFn: SuperAdminService.getCustomerClaims,
    enabled: tabIndex === 2,
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

  const { data: transactionsList, isLoading: loadingTransactionList } =
    useQuery({
      queryKey: [
        "all_customer_transactions",
        {
          page_size: recentTransactionsParam.pageSize,
          page: recentTransactionsParam.page,
          transactionStatus: recentTransactionsParam.status,
          customer_id: id,
        },
      ],
      queryFn: SuperAdminService.getTransactions,
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

  type CustomerStats = {
    num: number
    plan: string
    amount: string
    totalAmount: string
    collector: string
    status: string
    date: string
  }

  type Plans = {
    number: number
    planType: string
    contributionFrequency: string
    totalRemittance: string
    amount: number
    status: string
    lastActiveDate: string
    createdAt: string
  }

  type Claims = {
    number: number
    planInfo: string
    amount: string
    status: string
    reason: string
    documents: string
    dateCreated: string
  }

  const columns: ColumnDef<CustomerStats>[] = [
    {
      accessorKey: "plan",
      header: "Plan",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "amount",
      header: "Total Amount",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<CustomerStats, any>) => (
        <>{formatToCurrency(info.getValue())}</>
      ),
    },
    {
      accessorKey: "collector",
      header: "Collector",
    },
    {
      accessorKey: "transactionStatus",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<CustomerStats, any>) => (
        <>{SwitchStatus(info.getValue())}</>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<CustomerStats, any>) => (
        <Box>
          {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
        </Box>
      ),
    },
  ]

  const PlanColumns: ColumnDef<Plans>[] = [
    {
      accessorKey: "planType",
      header: "Plan",
    },
    {
      accessorKey: "contributionFrequency",
      header: "Frequency",
    },
    {
      accessorKey: "expectedAmount",
      header: "Remmitance",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Plans, any>) => (
        <Text>
          {`₦${new Intl.NumberFormat("en-GB", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(info.getValue() ?? 0)}`}
        </Text>
      ),
    },
    {
      accessorKey: "contributedAmount",
      header: "Total Amount",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Plans, any>) => (
        <Text>
          {`₦${new Intl.NumberFormat("en-GB", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(info.getValue() ?? 0)}`}
        </Text>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Plans, any>) => (
        <Box
          width="fit-content"
          textTransform="capitalize"
          bgColor={info.getValue() === "Active" ? "#9BFDD4" : "#DCDBDD"}
          p="4px 8px"
          borderRadius="4px"
          fontSize="12px"
          color={info.getValue() === "Active" ? "#027A48" : "#202020"}
          fontWeight="500"
        >
          {info.getValue().toLowerCase()}
        </Box>
      ),
    },
    {
      accessorKey: "lastActiveDate",
      header: "Last Date Active",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Plans, any>) => (
        <Box>
          {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
        </Box>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Plans, any>) => (
        <Box>
          {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
        </Box>
      ),
    },
  ]

  const ClaimsColumns: ColumnDef<Claims>[] = [
    {
      accessorKey: "claimType",
      header: "Plan",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Claims, any>) => (
        <Text>
          {`₦${new Intl.NumberFormat("en-GB", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(info.getValue() ?? 0)}`}
        </Text>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Claims, any>) => (
        <Box
          width="fit-content"
          bgColor={
            info.getValue() === "Approved"
              ? "#9BFDD4"
              : info.getValue() === "Rejected"
              ? "#F7CECA"
              : info.getValue() === "Processing"
              ? "#FEF0C7"
              : "#DCDBDD"
          }
          p="4px 8px"
          borderRadius="4px"
          fontSize="12px"
          color={
            info.getValue() === "Approved"
              ? "#027A48"
              : info.getValue() === "Disapproved"
              ? "#D92D20"
              : info.getValue() === "Processing"
              ? "#DC6803"
              : "#202020"
          }
          fontWeight="500"
        >
          {info.getValue()}
        </Box>
      ),
    },
    {
      accessorKey: "reason",
      header: "Reason",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Claims, any>) => (
        <Tooltip label={info.getValue()}>
          <Text
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            maxWidth="60px"
            overflow="hidden"
          >
            {info.getValue()}
          </Text>
        </Tooltip>
      ),
    },
    {
      accessorKey: "supportingDocuments",
      header: "Documents",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Claims, any>) => {
        const images: string[] = info
          .getValue()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((document: any) => document.url)

        return <ViewReceiptModal images={images} />
      },
    },
    {
      accessorKey: "date",
      header: "Date Initiated",
    },
  ]

  const agentTotal = [
    {
      id: 1,
      icon: totalUsers,
      text: "Total transaction value",
      value: `₦${new Intl.NumberFormat("en-GB", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(
        customerDetails?.data?.totalTransactionValue.currentMonth ?? 0
      )}`,
      percentage: getPercentageChange(
        parseInt(customerDetails?.data?.totalTransactionValue.currentMonth),
        parseInt(customerDetails?.data?.totalTransactionValue.previousMonth)
      )?.percentageChange,
    },
    {
      id: 2,
      icon: totalTransactions,
      text: "Total claim value",
      value: `₦${new Intl.NumberFormat("en-GB", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(customerDetails?.data?.totalClaimsValue.currentMonth ?? 0)}`,
      percentage: getPercentageChange(
        parseInt(customerDetails?.data?.totalClaimsValue.currentMonth),
        parseInt(customerDetails?.data?.totalClaimsValue.previousMonth)
      )?.percentageChange,
    },
  ]

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
  const agentTag = {
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "18px",
    color: "#027A48",
    marginLeft: "12px",
    px: "8px",
    py: "4px",
    justifyContent: "center",
    alignItems: "center",
    background: "#98FDD4",
    borderRadius: "4px",
  }

  const dot = {
    width: "5px",
    height: "5px",
    background: "#027A48",
    marginRight: "8px",
    borderRadius: "50%",
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
  }
  const selectedContainerStyles = {
    background: "#f6f6f6",
    paddingBottom: "20px",
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container maxW="100%" px="0px" background="#f6f6f6">
      <Flex sx={agentStatus} h={{ base: "68px" }}>
        <Flex sx={spaceFlex}>
          <Text sx={agentName} textTransform="capitalize">
            {`${customerDetails?.data?.firstName ?? `-`} ${
              customerDetails?.data?.lastName ?? `-`
            } | ${customerDetails?.data?.customerCode ?? `-`}`}
          </Text>
          <Flex sx={agentTag}>
            <Box sx={dot}></Box>
            <Text>Active</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex>
        <Tabs isLazy width="100%" index={tabIndex} onChange={handleTabsChange}>
          <TabList sx={selectorStyles} maxW="100%">
            <Tab sx={selectorBox}>Overview</Tab>
            <Tab sx={selectorBox}>Plans</Tab>
            <Tab sx={selectorBox}>Claims</Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              sx={selectedContainerStyles}
              maxW="100%"
              px="20px"
              h="100%"
            >
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
                  <Flex sx={spaceFlex} gap="20px" mt="20px" w="100%">
                    <LineChart
                      width={"100% "}
                      chartHeader={"Remittances"}
                      labels={[""]}
                      dataSet_1={[0]}
                      dataSet_2={customerTransactions?.data?.map(
                        ({
                          totalTransactionAmount,
                        }: {
                          totalTransactionAmount: number
                        }) => totalTransactionAmount
                      )}
                      xLabel={customerTransactions?.data?.map(
                        ({ dayNumber }: { dayNumber: number }) => dayNumber
                      )}
                      filters={[
                        {
                          name: "remittancePlan",
                          default: "All",
                          options: [
                            "Micro Pension",
                            "Micro Insurance",
                            "Micro Savings",
                          ],
                        },
                        {
                          name: "remittanceMonth",
                          default: `${new Date().getMonth()}`,
                          options: months,
                        },
                      ]}
                      filterUpdateFn={updateChartFilter}
                    />
                  </Flex>
                  <Container sx={selectedContainerStyles} maxW="100%" px="0px">
                    <Box p="20px" bg="#FFF" borderTopRadius="20px" mt="10px">
                      <Flex justifyContent="space-between" pb="10px">
                        <Text
                          fontSize="18px"
                          fontWeight="700"
                          lineHeight="22px"
                        >
                          Transactions
                        </Text>
                        <FilterModal />
                      </Flex>
                      <StyledTable
                        data={transactionsList?.data ?? []}
                        columns={columns}
                        loading={loadingTransactionList}
                        pagination={{
                          pageSize: recentTransactionsParam?.pageSize,
                          currentPage: recentTransactionsParam?.page,
                          totalPages:
                            transactionsList?.pagination?.numberOfPages,
                          updateFn: updateRecentTransactionsParams,
                        }}
                      />
                    </Box>
                  </Container>
                </Box>
                <Box w="33.3%">
                  <AgentCard
                    position="Customer"
                    data={customerDetails?.data}
                    userCount={customerDetails?.data?.registeredUsers?.total}
                    lastActive={customerDetails?.data?.lastActiveDate}
                    dateCreated={customerDetails?.data?.dateCreated}
                    editModal={onOpen}
                  />
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel maxW="100%" px="20px" h="calc(100vh - 246px)">
              <Box p="20px" bg="#FFF">
                <StyledTable
                  data={customerPlans?.data ?? []}
                  columns={PlanColumns}
                  loading={loadingPlans}
                  pagination={{
                    pageSize: plansTableParams?.pageSize,
                    currentPage: plansTableParams?.page,
                    totalPages: customerPlans?.pagination?.numberOfPages,
                    updateFn: updatePlansParams,
                  }}
                />
              </Box>
            </TabPanel>
            <TabPanel maxW="100%" px="20px" h="calc(100vh - 246px)">
              <Box p="20px" bg="#FFF">
                <StyledTable
                  data={customerClaims?.data ?? []}
                  columns={ClaimsColumns}
                  loading={loadingClaims}
                  pagination={{
                    pageSize: claimsTableParams?.pageSize,
                    currentPage: claimsTableParams?.page,
                    totalPages: customerClaims?.pagination?.numberOfPages,
                    updateFn: updateClaimsParams,
                  }}
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
      <EditAgentModal
        data={customerDetails?.data}
        isOpen={isOpen}
        onClose={onClose}
        userType="Customer"
      />
    </Container>
  )
}

export default CustomerDetails
