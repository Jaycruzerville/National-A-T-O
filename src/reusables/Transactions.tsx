/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useDeferredValue, useState } from "react"
import {
  Box,
  // Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import StyledTable from "@/reusables/StyledTable"
import Filter from "@/reusables/Filter"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"
import { SwitchStatus } from "@/reusables/SwitchStatus"
import usersService from "@/services/usersServices"
//import { useDriver } from "@/hooks/useDriver"
import { IError } from "@/types"
import { formatToCurrency } from "@/utils/formatToCurrency"
import { format } from "date-fns"
// import { useNavigate } from "react-router-dom"
import searchLight from "@/assets/search-light.svg"
// import { BiSort } from "react-icons/bi"
//  Driver from "@/modules/Users/Driver"
import Auth from "@/utils/auth"
// import agentServices from "@/services/agentServices"

type Transactions = {
  _id: string
  agentId: string
  agent?: {
    firstName: string
    lastName: string
  }
  amount: number
  reference: string
  status: string
  createdAt: string
  gateway: string // added if needed for display
}

const initParams = {
  search: "",
  status: "",
  type: "",
  action: "",
  plan: "",
  transactionValue: "",
  association: "",
  startDate: "",
  endDate: "",
}

const getColumns = (userRole: string | null): ColumnDef<Transactions>[] => [
  {
    accessorKey: "reference", // This matches the API response
    header: "Transaction ID",
    cell: (info: CellContext<Transactions, unknown>) => {
      const value = info.getValue() as string
      return <>{value?.toUpperCase?.() ?? "-"}</>
    },
  },
  ...(userRole === "Admin"
    ? [
        {
          accessorKey: "agent",
          header: "Agent Name",
          cell: (info: CellContext<Transactions, unknown>) => {
            const agent = info.getValue() as
              | { firstName: string; lastName: string }
              | undefined
            return <>{agent ? `${agent.firstName} ${agent.lastName}` : "-"}</>
          },
        },
      ]
    : []),
  {
    accessorKey: "amount", // Use "amount" as per your API response
    header: "Amount",
    cell: (info: CellContext<Transactions, unknown>) => {
      const value = info.getValue() as number
      return <>{formatToCurrency(value)}</>
    },
  },
  {
    accessorKey: "gateway", // Corresponds to the "gateway" field in the API response
    header: "Gateway",
  },
  {
    accessorKey: "status", // Use "status" to display transaction status
    header: "Status",
    cell: (info: CellContext<Transactions, unknown>) => {
      const value = info.getValue() as string
      return <>{SwitchStatus(value)}</>
    },
  },
  {
    accessorKey: "createdAt", // Use "createdAt" for the date
    header: "Date",
    cell: (info: CellContext<Transactions, unknown>) => {
      const value = info.getValue() as string
      return <Box>{value && format(new Date(value), "yyyy-MM-dd")}</Box>
    },
  },
]

interface TransactionsProps {
  limit?: number
  showFilters?: boolean // eslint-disable-line @typescript-eslint/no-unused-vars
  compact?: boolean // eslint-disable-line @typescript-eslint/no-unused-vars
}

const TransactionsPage: React.FC<TransactionsProps> = ({
  limit = 10,
  // showFilters = true,
  // compact = false,
}) => {
  const toast = useToast()
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: limit,
    page: 1,
    search: "",
  })

  const [filters, setFilters] = useState(initParams)
  const deferredSearchValue = useDeferredValue(tableParams.search)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  // const navigate = useNavigate()

  const userRole = Auth.getUserRole()
  const agentId = Auth.getAgentId()
  const columns = getColumns(userRole)

  // Fetch transactions using the agent-specific endpoint for dashboard
  const { data: transactionsList, isLoading: loadingTransactions } = useQuery({
    queryKey: [
      "dashboard_transactions",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        search: deferredSearchValue,
      },
    ],
    queryFn: () => {
      if (!agentId) {
        throw new Error("Agent ID is required")
      }
      return usersService.getTransactionsByAgentId(agentId)
    },
    enabled: !!agentId, // Only run query if agentId exists
    onError: (error: IError) => {
      console.error("Transaction fetch error:", error)
      toast({
        title: "Error",
        description: error?.message || "Failed to load transactions",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
  })

  // Fetch specific transaction details by ID
  const { data: transactionDetails, isLoading: loadingTransactionDetails } =
    useQuery({
      queryKey: ["transaction_details", transactionId],
      enabled: !!transactionId,
      queryFn: () => usersService.getTransactionById(transactionId as string),
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

  interface Params {
    param?: string
    value?: number | string
    filterValues?: Record<string, unknown>
  }
  const updateParams = ({ param, value, filterValues }: Params) => {
    if (param) {
      setTableParams({ ...tableParams, [param]: value })
    } else {
      setTableParams({ ...tableParams, ...filterValues })
    }
  }

  const updateFilters = (filter: string, value: unknown) => {
    setFilters({ ...filters, [filter]: value })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleRowClick = (id: string) => {
    setTransactionId(id) // Set the transaction ID
    onOpen() // Open the modal
  }

  return (
    <>
      <Flex
        justifyContent="space-between"
        p="20px"
        bgColor="white"
        alignItems="center"
      ></Flex>
      <Box bg="#F6F6F6" p={{ base: "10px", md: "20px" }}>
        <Flex
          bg="brand.primary"
          py={{ base: "8px", md: "12px" }}
          px={{ base: "16px", md: "40px" }}
          mt={{ base: "16px", md: "40px" }}
          borderTopRadius="12px"
          gap={{ base: "12px", md: "20px" }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "stretch", md: "center" }}
        >
          <Text
            color="#ffffff"
            fontSize={{ base: "16px", md: "20px" }}
            fontWeight="500"
            mb={{ base: "8px", md: "0" }}
          >
            Transactions
          </Text>
          <InputGroup width={{ base: "100%", md: "237px" }}>
            <InputRightElement height="100%">
              <Image src={searchLight} />
            </InputRightElement>
            <Input
              placeholder="Search Transactions"
              fontSize={{ base: "14px", md: "12px" }}
              borderRadius="4px"
              height={{ base: "40px", md: "28px" }}
              border="1px solid #C0C9D8"
              bgColor="#ffffff"
              _placeholder={{
                fontSize: { base: "12px", md: "10px" },
                letterSpacing: "-0.02em",
                lineHeight: "12px",
                color: "#000e1a",
                opacity: "0.5",
              }}
              _hover={{ borderColor: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              onChange={(e) =>
                updateParams({ param: "search", value: e.target.value })
              }
            />
          </InputGroup>
          <Filter
            handleClear={() => {
              setFilters(initParams)
              updateParams({ filterValues: initParams })
            }}
            handleFilter={() => updateParams({ filterValues: filters })}
          >
            <Text
              fontWeight="500"
              lineHeight="25px"
              fontSize={{ base: "18px", md: "20px" }}
              letterSpacing="-1px"
              pb="12px"
            >
              Status & Type
            </Text>
            <Flex
              gap="12px"
              pb="20px"
              flexDirection={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  Status
                </FormLabel>
                <Select
                  placeholder="Select Transaction Status"
                  _placeholder={{ color: "#003E51" }}
                  name="transactionStatus"
                  fontSize="14px"
                  value={filters.status}
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => updateFilters("status", e.target.value)}
                >
                  <option value="Success">Successful</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  Action
                </FormLabel>
                <Select
                  placeholder="Select Transaction Action"
                  _placeholder={{ color: "#003E51" }}
                  name="type"
                  value={filters.type}
                  fontSize="14px"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => updateFilters("type", e.target.value)}
                >
                  <option value="Topup">Top up</option>
                  <option value="Payout">Payout</option>
                  <option value="Plan">Plan</option>
                  <option value="Funding">FUnding</option>
                  <option value="Plan Receivable">Plan Receivable</option>
                  <option value="Claim withfrawal">Claim withdrawal</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl width={{ base: "100%", md: "50%" }} pb="20px">
              <FormLabel
                lineHeight="20px"
                fontWeight="500"
                fontSize="0.75rem"
                color="#003E51"
              >
                Type
              </FormLabel>
              <Select
                placeholder="Select Transaction Type"
                _placeholder={{ color: "#003E51" }}
                name="transactionAction"
                value={filters.action}
                fontSize="14px"
                _hover={{ outline: "none" }}
                _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                height="48px"
                onChange={(e) => updateFilters("action", e.target.value)}
              >
                <option value="CREDIT">Credit</option>
                <option value="DEBIT">Debit</option>
              </Select>
            </FormControl>
            <Text
              fontWeight="500"
              lineHeight="25px"
              fontSize={{ base: "18px", md: "20px" }}
              letterSpacing="-1px"
              pb="12px"
            >
              Plan & Association
            </Text>
            <Flex
              gap="12px"
              pb="20px"
              flexDirection={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  Plan
                </FormLabel>
                <Select
                  placeholder="Select Plan"
                  _placeholder={{ color: "#003E51" }}
                  name="plan"
                  fontSize="14px"
                  _hover={{ outline: "none" }}
                  value={filters.plan}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => updateFilters("plan", e.target.value)}
                >
                  <option value="Micro Pension">Micro Pension</option>
                  <option value="Micro Insurance">Micro Insurance</option>
                  <option value="Micro Savings">Micro Savings</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  Association
                </FormLabel>
                {/* <Select
                  placeholder="Select Association"
                  _placeholder={{ color: "#003E51" }}
                  name="status"
                  value={filters.association}
                  fontSize="14px"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => updateFilters("association", e.target.value)}
                >
                  {Driver?.map(
                    (
                      { DriverName, id }: { DriverName: string; id: string },
                      index: number
                    ) => (
                      <option value={id} key={index}>
                        {DriverName}
                      </option>
                    )
                  )}
                </Select> */}
              </FormControl>
            </Flex>

            <Text
              fontWeight="500"
              lineHeight="25px"
              fontSize={{ base: "18px", md: "20px" }}
              letterSpacing="-1px"
              pb="12px"
            >
              Date Range
            </Text>
            <Flex
              gap="12px"
              pb="20px"
              flexDirection={{ base: "column", md: "row" }}
            >
              <FormControl
                mb={{ base: "10px", md: "20px" }}
                width={{ base: "100%", md: "50%" }}
              >
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  From
                </FormLabel>
                <Input
                  size="lg"
                  width="100%"
                  placeholder="Select start Date"
                  px="14px"
                  type="date"
                  name="startDate"
                  max={new Date().toISOString().split("T")[0]}
                  value={filters.startDate}
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  onChange={(e) => updateFilters("startDate", e.target.value)}
                />
              </FormControl>
              <FormControl
                mb={{ base: "10px", md: "20px" }}
                width={{ base: "100%", md: "50%" }}
              >
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  To
                </FormLabel>
                <Input
                  size="lg"
                  width="100%"
                  placeholder="Select end Date"
                  px="14px"
                  type="date"
                  name="endDate"
                  max={new Date().toISOString().split("T")[0]}
                  value={filters.endDate}
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  onChange={(e) => updateFilters("endDate", e.target.value)}
                />
              </FormControl>
            </Flex>
          </Filter>
        </Flex>
        <Box mt="20px" bg="#ffffff" overflowX={{ base: "auto", md: "visible" }}>
          <StyledTable
            data={transactionsList}
            columns={columns}
            onRowClick={(row) => handleRowClick(String(row._id))}
            loading={loadingTransactions}
            pagination={{
              pageSize: tableParams?.pageSize,
              currentPage: tableParams?.page,
              totalPages: transactionsList?.pagination?.numberOfPages,
              updateFn: updateParams,
            }}
          />
        </Box>
      </Box>
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "full", md: "lg" }}
        >
          <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
          <ModalContent
            bg="white"
            color="black"
            p={{ base: 3, md: 5 }}
            borderRadius="md"
            boxShadow="lg"
            opacity="1"
            mx={{ base: 2, md: "auto" }}
            my={{ base: 2, md: "auto" }}
          >
            <ModalCloseButton
              top={{ base: "1rem", md: "3rem" }}
              color="brand.primary"
              onClick={() => setTransactionId(null)}
            />
            <ModalHeader
              pt={{ base: "20px", md: "40px" }}
              fontWeight="500"
              fontSize={{ base: "24px", md: "36px" }}
              lineHeight={{ base: "30px", md: "45px" }}
              letterSpacing="-2px"
              color="brand.primary"
              pb="0px"
            >
              Transactions Details
            </ModalHeader>
            <Divider
              borderColor="brand.primary"
              margin="0px 1rem"
              width="auto"
            />
            {loadingTransactionDetails ? (
              <Box
                h="300px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="brand.primary"
                  size="lg"
                />
              </Box>
            ) : (
              <ModalBody>
                <UnorderedList
                  pt={{ base: "30px", md: "50px" }}
                  ml="0px"
                  px={{ base: "20px", md: "46px" }}
                  display="flex"
                  flexDir="column"
                  gap="10px"
                >
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Transaction Date:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {format(
                        new Date(transactionDetails?.createdAt),
                        "yyyy-MM-dd"
                      )}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Reference ID:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {transactionDetails?.reference ?? "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Amount:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {formatToCurrency(transactionDetails?.amount ?? 0)}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Status
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {transactionDetails?.status ?? "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Payment channel:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {transactionDetails?.gateway ?? "-"}
                    </Text>
                  </ListItem>
                </UnorderedList>
              </ModalBody>
            )}

            <ModalFooter
              justifyContent="center"
              pt={{ base: "30px", md: "62px" }}
              pb={{ base: "20px", md: "42px" }}
            >
              {/* <Button
                width="fit-content"
                fontSize="20px"
                fontWeight={600}
                p="12px 20px"
                bg="brand.primary"
                size="lg"
                color="#ffffff"
                _active={{ backgroundColor: "none" }}
                _hover={{ backgroundColor: "none", opacity: "0.8" }}
                onClick={() =>
                  transactionDetails?.data?.customerId
                    ? navigate(
                        `/customers/${transactionDetails?.data?.customerId}`
                      )
                    : toast({
                        title: "Error",
                        description: "No customer details found",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                      })
                }
              >
                View customer details
              </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  )
}

export default TransactionsPage
