/* eslint-disable @typescript-eslint/no-empty-function */
import { useDeferredValue, useState } from "react"
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
  Spacer,
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

type Transactions = {
  _id: string
  agentId: string
  amount: number
  reference: string
  status: string
  createdAt: string
  gateway: string // added if needed for display
}

const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "reference", // This matches the API response
    header: "Transaction ID",
    cell: (info: CellContext<Transactions, any>) => (
      <>{info.getValue().toUpperCase()}</>
    ),
  },
  {
    accessorKey: "amount", // Use "amount" as per your API response
    header: "Amount",
    cell: (info: CellContext<Transactions, any>) => (
      <>{formatToCurrency(info.getValue())}</>
    ),
  },
  {
    accessorKey: "gateway", // Corresponds to the "gateway" field in the API response
    header: "Gateway",
  },
  {
    accessorKey: "status", // Use "status" to display transaction status
    header: "Status",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Transactions, any>) => (
      <>{SwitchStatus(info.getValue())}</>
    ),
  },
  {
    accessorKey: "createdAt", // Use "createdAt" for the date
    header: "Date",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Transactions, any>) => (
      <Box>
        {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
      </Box>
    ),
  },
]

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

const TransactionsPage = () => {
  const toast = useToast()
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
    search: "",
  })

  const [filters, setFilters] = useState(initParams)
  const deferredSearchValue = useDeferredValue(tableParams.search)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  // const navigate = useNavigate()

  const agentId = Auth.getAgentId()

  // Fetch transactions by agent ID if agentId is not null
  const { data: transactionsList, isLoading: loadingTransactions } = useQuery({
    queryKey: [
      "all_transactions",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        search: deferredSearchValue,
      },
    ],
    queryFn: () => {
      if (!agentId) {
        throw new Error("Agent ID is null")
      }
      return usersService.getTransactionsByAgentId(agentId)
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
    enabled: !!agentId, // Ensure query only runs if agentId is not null
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
      <Box bg="#F6F6F6" p="20px">
        <Flex
          bg="brand.primary"
          py="12px"
          px="40px"
          mt="40px"
          borderTopRadius="12px"
          gap="20px"
        >
          <Text color="#ffffff" fontSize="20px" fontWeight="500">
            Transactions
          </Text>
          <Spacer />
          <InputGroup width="237px">
            <InputRightElement height="100%">
              <Image src={searchLight} />
            </InputRightElement>
            <Input
              placeholder="Search Transactions"
              fontSize="12px"
              borderRadius="4px"
              height="28px"
              border="1px solid #C0C9D8"
              bgColor="#ffffff"
              _placeholder={{
                fontSize: "10px",
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
              fontSize="20px"
              letterSpacing="-1px"
              pb="12px"
            >
              Status & Type
            </Text>
            <Flex gap="12px" pb="20px">
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
            <FormControl width="50%" pb="20px">
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
              fontSize="20px"
              letterSpacing="-1px"
              pb="12px"
            >
              Plan & Association
            </Text>
            <Flex gap="12px" pb="20px">
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
              fontSize="20px"
              letterSpacing="-1px"
              pb="12px"
            >
              Date Range
            </Text>
            <Flex gap="12px" pb="20px">
              <FormControl mb="20px" width="50%">
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
              <FormControl mb="20px" width="50%">
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
        <Box mt="20px" bg="#ffffff">
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
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
          <ModalContent
            bg="white"
            color="black"
            p={5}
            borderRadius="md"
            boxShadow="lg"
            opacity="1"
          >
            <ModalCloseButton
              top="3rem"
              color="brand.primary"
              onClick={() => setTransactionId(null)}
            />
            <ModalHeader
              pt="40px"
              fontWeight="500"
              fontSize="36px"
              lineHeight="45px"
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
                  pt="50px"
                  ml="0px"
                  px="46px"
                  display="flex"
                  flexDir="column"
                  gap="10px"
                >
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      Transaction Date:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
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
                    justifyContent="space-between"
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      Reference ID:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {transactionDetails?.reference ?? "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      Amount:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {formatToCurrency(transactionDetails?.amount ?? 0)}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      Status
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {transactionDetails?.status ?? "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      Payment channel:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {transactionDetails?.gateway ?? "-"}
                    </Text>
                  </ListItem>
                </UnorderedList>
              </ModalBody>
            )}

            <ModalFooter justifyContent="center" pt="62px" pb="42px">
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
