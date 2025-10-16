/* eslint-disable @typescript-eslint/no-empty-function */
import { useDeferredValue, useState } from "react"
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Icon,
  InputGroup,
  InputRightElement,
  Select,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react"
import searchLight from "@/assets/search-light.svg"

import { DownloadIcon } from "@chakra-ui/icons"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import StyledTable from "@/reusables/StyledTable"
import { useNavigate } from "react-router-dom"
import Filter from "@/reusables/Filter"
import usersService from "@/services/usersServices"
import { IError } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { BiSort } from "react-icons/bi"

import { formatToCurrency } from "@/utils/formatToCurrency"
import { formatDate } from "@/utils/formatDate"
import Auth from "@/utils/auth"

type claimsData = {
  id: string
  firstName: string
  lastName: string
  claimID: string
  amount: string
  initiatedBy: string
  PlanType: string
  status: string
  documents?: string | undefined
  dateInitiated: string
}

const columns: ColumnDef<claimsData>[] = [
  {
    accessorKey: "driverName",
    header: ({ column }) => (
      <Button
        gap="4px"
        p="0px"
        _hover={{ backgroundColor: "none" }}
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Driver Name <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
  },
  {
    accessorKey: "driverTag",
    header: "Driver Tag",
  },
  {
    accessorKey: "voucherCode",
    header: "Voucher Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<claimsData, any>) => {
      return <Text>{formatToCurrency(info.getValue())}</Text>
    },
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<claimsData, any>) => (
      <Flex
        justifyContent={"flex-start"}
        alignSelf="center"
        h="26px"
        borderRadius="4px"
        fontSize="12px"
        fontWeight="500"
      >
        <Text
          bgColor={
            info.getValue().toLowerCase() === "active"
              ? "#9BFDD4"
              : info.getValue().toLowerCase() === "expired"
              ? "#F7CECA"
              : "#DCDBDD"
          }
          color={
            info.getValue().toLowerCase() === "active"
              ? "#027A48"
              : info.getValue().toLowerCase() === "expired"
              ? "#D92D20"
              : "#202020"
          }
          h="100%"
          p="4px 8px"
        >
          {info.getValue()}
        </Text>
      </Flex>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Issued",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<claimsData, any>) => {
      return <Text>{formatDate(info.getValue())}</Text>
    },
  },
]

const Claims = () => {
  const navigate = useNavigate()

  const initParams = {
    searchQuery: "",
    startDate: "",
    endDate: "",
    voucherType: "",
    status: "",
  }

  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
  })
  const toast = useToast()
  const [filters, setFilters] = useState(initParams)
  const deferredSearchValue = useDeferredValue(tableParams.searchQuery)

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

  const onFilter = () => {
    updateParams({ filterValues: filters })
  }

  const updateFilters = (filter: string, value: unknown) => {
    setFilters({ ...filters, [filter]: value })
  }

  const { data: claimsList, isLoading: loadingClaims } = useQuery({
    queryKey: [
      "superagent-vouchers",
      {
        superAgentId: Auth.getSuperAgentId(),
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        searchQuery: deferredSearchValue,
        startDate: tableParams.startDate,
        endDate: tableParams.endDate,
        voucherType: tableParams.voucherType,
        status: tableParams.status,
      },
    ],
    queryFn: usersService.getVouchersBySuperAgent,
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

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        p="20px"
        bgColor="brand.bgLight"
        alignItems="center"
        gap="10px"
      >
        <Heading fontSize="20px" color="#0B1023">
          Issued Vouchers
        </Heading>
        <Spacer />
        <InputGroup width="237px" h="28px">
          <InputRightElement height="100%">
            <Image src={searchLight} />
          </InputRightElement>
          <Input
            placeholder="Search with driver name or tag"
            fontSize="12px"
            borderRadius="4px"
            height="28px"
            border="1px solid #C0C9D8"
            bgColor="#ffffff"
            _placeholder={{
              fontSize: "10px",
              letterSpacing: "-0.02em",
              lineHeight: "12px",
              color: "#D5D5D5",
            }}
            _hover={{ borderColor: "none" }}
            _focusVisible={{ borderColor: "none", boxShadow: "none" }}
            onChange={(e) =>
              updateParams({ param: "searchQuery", value: e.target.value })
            }
          />
        </InputGroup>

        <Flex gap="8px" alignItems="center">
          <Filter
            handleFilter={onFilter}
            handleClear={() => {
              setFilters(initParams)
              updateParams({ filterValues: initParams })
            }}
          >
            <Text
              fontWeight="500"
              lineHeight="25px"
              fontSize="20px"
              letterSpacing="-1px"
              pb="12px"
            >
              Voucher & status
            </Text>
            <Flex gap="12px">
              <FormControl>
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  Voucher Type
                </FormLabel>
                <Select
                  placeholder="Select type"
                  _placeholder={{ color: "#003E51" }}
                  name="voucherType"
                  value={filters.voucherType}
                  fontSize="14px"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => {
                    updateFilters("voucherType", e.target.value)
                  }}
                >
                  <option value="Keke">Keke</option>
                  <option value="Taxi">Taxi</option>
                  <option value="1day">1 Day</option>
                  <option value="3hrs">3 Hours</option>
                  <option value="5hrs">5 Hours</option>
                </Select>
              </FormControl>
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
                  placeholder="Select status"
                  _placeholder={{ color: "#003E51" }}
                  fontSize="14px"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  name="status"
                  value={filters.status}
                  onChange={(e) => {
                    updateFilters("status", e.target.value)
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                </Select>
              </FormControl>
            </Flex>

            <Text
              fontWeight="500"
              lineHeight="25px"
              fontSize="20px"
              letterSpacing="-1px"
              pt="20px"
              pb="12px"
            >
              Date Range
            </Text>
            <Flex gap="12px" width="100%" mb="5rem">
              <FormControl width="50%">
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  Start Date
                </FormLabel>
                <Input
                  size="lg"
                  width="100%"
                  placeholder="Select Date"
                  px="14px"
                  type="date"
                  name="startDate"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  value={filters.startDate}
                  onChange={(e) => updateFilters("startDate", e.target.value)}
                />
              </FormControl>
              <FormControl width="50%">
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  End Date
                </FormLabel>
                <Input
                  size="lg"
                  width="100%"
                  placeholder="Select Date"
                  px="14px"
                  type="date"
                  name="endDate"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  value={filters.endDate}
                  onChange={(e) => updateFilters("endDate", e.target.value)}
                />
              </FormControl>
            </Flex>
          </Filter>
          <Button
            rightIcon={<DownloadIcon />}
            _hover={{ backgroundColor: "none", opacity: "0.5" }}
            bg="brand.primary"
            color="#ffffff"
            height="28px"
            variant="solid"
            fontSize="10px"
            fontWeight="500"
            borderRadius="4px"
          >
            <Text>Download</Text>
          </Button>
        </Flex>
      </Flex>

      <Box p="20px">
        <StyledTable
          data={
            claimsList?.data
              ? claimsList?.data?.map((data: claimsData) => ({
                  ...data,
                }))
              : []
          }
          columns={columns}
          onRowClick={(row) => navigate(`/claims/${row.id}`)}
          loading={loadingClaims}
          pagination={{
            pageSize: tableParams?.pageSize,
            currentPage: tableParams?.page,
            totalPages: claimsList?.pagination?.numberOfPages,
            updateFn: updateParams,
          }}
        />
      </Box>
    </Box>
  )
}

export default Claims
