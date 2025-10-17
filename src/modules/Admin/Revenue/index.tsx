import React, { useState, useEffect } from "react"
import {
  Box,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
  //   GridItem,
  Card,
  CardBody,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  //   Badge,
  Button,
  //   Select,
  Input,
  HStack,
  VStack,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface RevenueSummary {
  totalGrossAmount: number
  totalPlatformFee: number
  totalAgentCommission: number
  totalGovernmentRevenue: number
  totalTransactions: number
  driverVouchers: number
  parkingVouchers: number
}

interface DailyRevenue {
  _id: string
  totalGrossAmount: number
  totalPlatformFee: number
  totalAgentCommission: number
  totalGovernmentRevenue: number
  transactionCount: number
}

interface RevenueByState {
  _id: string
  totalGrossAmount: number
  totalPlatformFee: number
  totalAgentCommission: number
  totalGovernmentRevenue: number
  transactionCount: number
}

const RevenueDashboard: React.FC = () => {
  const [revenueSummary, setRevenueSummary] = useState<RevenueSummary | null>(
    null
  )
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([])
  const [revenueByState, setRevenueByState] = useState<RevenueByState[]>([])
  const [loading, setLoading] = useState(true)
  const [processingSettlement, setProcessingSettlement] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const toast = useToast()

  const fetchRevenueData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (startDate) params.append("startDate", startDate)
      if (endDate) params.append("endDate", endDate)

      const response = await fetch(`/api/revenue/summary?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setRevenueSummary(data.summary)
        setDailyRevenue(data.dailyRevenue)
        setRevenueByState(data.revenueByState)
      } else {
        throw new Error("Failed to fetch revenue data")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load revenue data",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const processSettlements = async () => {
    try {
      setProcessingSettlement(true)
      const response = await fetch("/api/revenue/process-settlements", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Success",
          description: `Settlements processed for ${data.successfulSettlements} agents`,
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        fetchRevenueData() // Refresh data
      } else {
        throw new Error("Failed to process settlements")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process settlements",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setProcessingSettlement(false)
    }
  }

  useEffect(() => {
    fetchRevenueData()
  }, [startDate, endDate])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  const chartData = {
    labels: dailyRevenue.map((item) => item._id),
    datasets: [
      {
        label: "Platform Fee",
        data: dailyRevenue.map((item) => item.totalPlatformFee),
        borderColor: "#3661EC",
        backgroundColor: "#3661EC",
        tension: 0.1,
      },
      {
        label: "Agent Commission",
        data: dailyRevenue.map((item) => item.totalAgentCommission),
        borderColor: "#2FD0C6",
        backgroundColor: "#2FD0C6",
        tension: 0.1,
      },
      {
        label: "Government Revenue",
        data: dailyRevenue.map((item) => item.totalGovernmentRevenue),
        borderColor: "#FF6B6B",
        backgroundColor: "#FF6B6B",
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Revenue Breakdown (Last 30 Days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return formatCurrency(value)
          },
        },
      },
    },
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="400px"
      >
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Box p={6} bg="#F6F6F6" minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Revenue Dashboard</Heading>
        <HStack>
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button
            colorScheme="blue"
            onClick={processSettlements}
            isLoading={processingSettlement}
            loadingText="Processing..."
          >
            Process Daily Settlements
          </Button>
        </HStack>
      </Flex>

      {revenueSummary && (
        <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Gross Revenue</StatLabel>
                <StatNumber>
                  {formatCurrency(revenueSummary.totalGrossAmount)}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  From all transactions
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Platform Fee (13-15%)</StatLabel>
                <StatNumber>
                  {formatCurrency(revenueSummary.totalPlatformFee)}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Kano Transport revenue
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Agent Commissions</StatLabel>
                <StatNumber>
                  {formatCurrency(revenueSummary.totalAgentCommission)}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Paid to agents
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Government Revenue</StatLabel>
                <StatNumber>
                  {formatCurrency(revenueSummary.totalGovernmentRevenue)}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  State/Local government
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>
      )}

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={8}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Revenue Trend
            </Heading>
            <Box height="300px">
              <Line data={chartData} options={chartOptions} />
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>
              Transaction Summary
            </Heading>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold">Total Transactions</Text>
                <Text fontSize="2xl">
                  {revenueSummary?.totalTransactions || 0}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Driver Vouchers</Text>
                <Text fontSize="2xl" color="blue.500">
                  {revenueSummary?.driverVouchers || 0}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Parking Vouchers</Text>
                <Text fontSize="2xl" color="green.500">
                  {revenueSummary?.parkingVouchers || 0}
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </Grid>

      <Card>
        <CardBody>
          <Heading size="md" mb={4}>
            Revenue by State
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>State</Th>
                <Th isNumeric>Gross Revenue</Th>
                <Th isNumeric>Platform Fee</Th>
                <Th isNumeric>Agent Commission</Th>
                <Th isNumeric>Government Revenue</Th>
                <Th isNumeric>Transactions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {revenueByState.map((state) => (
                <Tr key={state._id}>
                  <Td fontWeight="bold">{state._id}</Td>
                  <Td isNumeric>{formatCurrency(state.totalGrossAmount)}</Td>
                  <Td isNumeric>{formatCurrency(state.totalPlatformFee)}</Td>
                  <Td isNumeric>
                    {formatCurrency(state.totalAgentCommission)}
                  </Td>
                  <Td isNumeric>
                    {formatCurrency(state.totalGovernmentRevenue)}
                  </Td>
                  <Td isNumeric>{state.transactionCount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Alert status="info" mt={6}>
        <AlertIcon />
        Revenue data is updated in real-time. Platform fees (13-15%) support
        system operations, agent commissions incentivize distribution, and
        government revenue funds transportation regulation.
      </Alert>
    </Box>
  )
}

export default RevenueDashboard
