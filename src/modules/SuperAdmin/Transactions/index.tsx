/* eslint-disable @typescript-eslint/no-empty-function */
import { useDeferredValue, useState } from "react"
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  Icon,
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
import StatCards from "@/reusables/StatCards"
import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StyledTable from "@/reusables/StyledTable"
import Filter from "@/reusables/Filter"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"
import { SwitchStatus } from "@/reusables/SwitchStatus"
import SuperAdminService from "@/services/superAdminServices"
import { useProperty } from "@/hooks/useProperty"
import { IError } from "@/types"
import { formatToCurrency } from "@/utils/formatToCurrency"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import searchLight from "@/assets/search-light.svg"
// import useStateAndLGA from "@/hooks/useStateAndLGA"
import { getPercentageChange } from "@/utils/getStatPercentile"
import { BiSort } from "react-icons/bi"

type Transactions = {
  num: number
  transactionId: string
  customerName: string
  plan: string
  amount: string
  transactionType: string
  collector: string
  association: string
  status: string
  date: string
}

const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "transactionReference",
    header: "Transaction ID",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Transactions, any>) => (
      <>{info.getValue().split("-")[0].toUpperCase()}</>
    ),
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <Button
        gap="4px"
        _hover={{ backgroundColor: "none" }}
        p="0px"
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer Name <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Transactions, any>) => (
      <>{formatToCurrency(info.getValue())}</>
    ),
  },
  {
    accessorKey: "transactionType",
    header: "Action",
  },

  {
    accessorKey: "association",
    header: "Association",
  },
  {
    accessorKey: "transactionStatus",
    header: "Status",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Transactions, any>) => (
      <>{SwitchStatus(info.getValue())}</>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Transactions, any>) => (
      <Box>
        {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
      </Box>
    ),
  },
  {
    accessorKey: "transactionAction",
    header: "Type",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Transactions, any>) => (
      <Text
        fontWeight="bold"
        color={
          info.getValue().toLowerCase() === "credit"
            ? "#027A48"
            : info.getValue().toLowerCase() === "debit"
            ? "#D92D20"
            : "#202020"
        }
      >
        {info.getValue()}
      </Text>
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
const index = () => {
  const toast = useToast()
  const { Property } = useProperty()
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
    search: "",
  })

  const [filters, setFilters] = useState(initParams)

  const deferredSearchValue = useDeferredValue(tableParams.search)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const navigate = useNavigate()

  const { data: transactionsList, isLoading: loadingTransactions } = useQuery({
    queryKey: [
      "all_transactions",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        transactionType: tableParams.type,
        transactionAction: tableParams.action,
        transactionStatus: tableParams.status,
        planType: tableParams.plan,
        search: deferredSearchValue,
        startDate: tableParams.startDate,
        endDate: tableParams.endDate,
        association: tableParams.association,
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

  const { data: transactionDetails, isLoading: loadingTransactionDetails } =
    useQuery({
      queryKey: ["transaction_details", { id: transactionId }],
      enabled: !!transactionId,
      queryFn: SuperAdminService.getTransactionsDetails,
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

  const { data: transactionStats } = useQuery({
    queryKey: ["transaction_stats"],
    queryFn: SuperAdminService.getTransactionsStats,
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

  const statData = [
    {
      id: 1,
      icon: totalUsers,
      text: "Total transaction value",
      value: formatToCurrency(
        transactionStats?.data?.totalTransactionValue ?? 0
      ),
      percentage: getPercentageChange(
        parseInt(transactionStats?.data?.totalTransactionValue),
        parseInt(transactionStats?.data?.totalTransactionValueLastMonth)
      )?.percentageChange,
    },
    {
      id: 2,
      icon: totalTransactions,
      text: "Total Assets value",
      value: formatToCurrency(transactionStats?.data?.totalClaimValue ?? 0),
      percentage: getPercentageChange(
        parseInt(transactionStats?.data?.totalClaimValue),
        parseInt(transactionStats?.data?.totalClaimValueLastMonth)
      )?.percentageChange,
    },
    {
      id: 3,
      icon: totalTransactions,
      text: "Total remittance",
      value: formatToCurrency(
        transactionStats?.data?.totalRemittanceValue ?? 0
      ),
      percentage: getPercentageChange(
        parseInt(transactionStats?.data?.totalRemittanceValue),
        parseInt(transactionStats?.data?.totalRemittanceValueLastMonth)
      )?.percentageChange,
    },
  ]

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowClick = (id: any) => {
    setTransactionId(id)
    onOpen()
  }

  return (
    <>
      <Flex
        justifyContent="space-between"
        p="20px"
        bgColor="brand.bgLight"
        alignItems="center"
      >
        <Heading fontSize="28px" color="#0B1023">
          Transactions
        </Heading>
      </Flex>
      <Box bg="#F6F6F6" p="20px">
        <Flex gap="20px" justify="start" align="center">
          {statData.map(({ id, icon, text, value, percentage }) => (
            <StatCards
              key={id}
              icon={icon}
              text={text}
              value={value}
              percentage={percentage}
            />
          ))}
        </Flex>
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
                <Select
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
                  {Property?.map(
                    (
                      {
                        PropertyName,
                        id,
                      }: { PropertyName: string; id: string },
                      index: number
                    ) => (
                      <option value={id} key={index}>
                        {PropertyName}
                      </option>
                    )
                  )}
                </Select>
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
            data={transactionsList?.data}
            columns={columns}
            onRowClick={(row) => handleRowClick(row?.id)}
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
          <ModalOverlay />
          <ModalContent>
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
                      {transactionDetails?.data?.createdAt &&
                        format(
                          new Date(transactionDetails?.data?.createdAt),
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
                      Transaction Type:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {transactionDetails?.data?.transactionType ?? "-"}
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
                      initiated by:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      -
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
                      Customer Name:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {transactionDetails?.data?.customerName ?? "-"}
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
                      Customer ID:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {transactionDetails?.data?.customerCode ?? "-"}
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
                      Customer Phone Number:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {transactionDetails?.data?.customerPhone ?? "-"}
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
                      {formatToCurrency(transactionDetails?.data?.amount ?? 0)}
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
                      Plan Paid for:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                    >
                      {transactionDetails?.data?.plan ?? "-"}
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
                      -
                    </Text>
                  </ListItem>
                </UnorderedList>
              </ModalBody>
            )}

            <ModalFooter justifyContent="center" pt="62px" pb="42px">
              <Button
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
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  )
}

export default index
