import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react"
import searchLight from "@/assets/search-light.svg"
import ArrowUpDown from "@/assets/arrow-up-down.svg"
import { useQuery } from "@tanstack/react-query"
import StyledTable from "@/reusables/StyledTable"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useDeferredValue, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { BsPlusCircle } from "react-icons/all"
import { superAdmin } from "@/routes/paths"
import SuperAdminService from "@/services/superAdminServices"
import { IError } from "@/types"
import Filter from "@/reusables/Filter"
import { format } from "date-fns"
import AddNewServiceProviderDrawer from "./components/AddNewServiceProviderDrawer"

type Customer = {
  id: string
  address: string
  customerCode: string
  dateCreated: string
  firstName: string
  lastName: string
  lastPaymentDate: string
  lga: string
  phoneNumber: string
  PropertyName: string
  status: string
  totalRemittance: number
}

const columns: ColumnDef<Customer>[] = [
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
        Name <Image src={ArrowUpDown} />
      </Button>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Customer, any>) => (
      <Box>
        {`${info.row.original.firstName} ${info.row.original.lastName}`}
      </Box>
    ),
  },
  {
    accessorKey: "customerCode",
    header: "Customer ID",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "lga",
    header: "LGA",
  },
  {
    accessorKey: "PropertyName",
    header: "Association",
  },
  {
    accessorKey: "status",
    header: "Status",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Customer, any>) => (
      <Box
        bgColor={info.getValue() === "ACTIVE" ? "#9BFDD4" : "#DCDBDD"}
        p="4px 8px"
        borderRadius="4px"
        fontSize="12px"
        color={info.getValue() === "ACTIVE" ? "#027A48" : "#202020"}
        fontWeight="500"
      >
        {info.getValue()}
      </Box>
    ),
  },
  {
    accessorKey: "totalRemittance",
    header: "Total Remittances",
  },
  {
    accessorKey: "lastPaymentDate",
    header: "Last Payment Date",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Customer, any>) => (
      <Box>
        {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
      </Box>
    ),
  },
]

const initParams = {
  searchQuery: "",
  status: "",
  registeredUsers: "",
}

const index = () => {
  const navigate = useNavigate()
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

  const { data: customersList, isLoading: loadingCustomers } = useQuery({
    queryKey: [
      "customers-list",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        searchQuery: deferredSearchValue,
        status: tableParams.status,
      },
    ],
    queryFn: SuperAdminService.getCustomers,
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
    <>
      <Box>
        <Flex p="20px" bgColor="brand.bgLight" alignItems="center" gap="8px">
          <Heading fontSize="20px" color="#0B1023">
            All Service Providers
          </Heading>
          <Spacer />
          <InputGroup width="237px">
            <InputRightElement height="100%">
              <Image src={searchLight} />
            </InputRightElement>
            <Input
              placeholder="Search with Agent name or phone number"
              color="#D5D5D5"
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
                Status & Value
              </Text>
              <Flex gap="12px">
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
                    placeholder="Select Provider Status"
                    _placeholder={{ color: "#003E51" }}
                    name="status"
                    value={filters.status}
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    height="48px"
                    onChange={(e) => updateFilters("status", e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">InActive</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Transaction Value
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Transaction Value"
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    _placeholder={{ color: "#003E51" }}
                    id="address"
                    height="48px"
                    name="numberOfUsers"
                    onChange={(e) => updateFilters("status", e.target.value)}
                  />
                </FormControl>
              </Flex>
              <Box style={{ width: "49%", marginTop: "20px" }}>
                <Text
                  fontWeight="500"
                  lineHeight="25px"
                  fontSize="20px"
                  letterSpacing="-1px"
                  pb="12px"
                >
                  Service Category
                </Text>
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Category
                  </FormLabel>
                  <Select
                    placeholder="Select Provider Status"
                    _placeholder={{ color: "#003E51" }}
                    name="status"
                    value={filters.status}
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    height="48px"
                    onChange={(e) => updateFilters("status", e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">InActive</option>
                  </Select>
                </FormControl>
              </Box>
              <Text
                fontWeight="500"
                lineHeight="25px"
                fontSize="20px"
                letterSpacing="-1px"
                pt="20px"
                pb="12px"
              >
                Date
              </Text>
              <Flex gap="12px" width="100%" mb="5rem">
                <FormControl width="50%">
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Date Created
                  </FormLabel>
                  <Input
                    size="lg"
                    width="100%"
                    placeholder="Select Date"
                    px="14px"
                    type="date"
                    name="dateCreated"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  />
                </FormControl>
                <FormControl width="50%">
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Last Active Date
                  </FormLabel>
                  <Input
                    px="14px"
                    width="100%"
                    size="lg"
                    placeholder="Select Date"
                    name="lastActiveDate"
                    type="date"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  />
                </FormControl>
              </Flex>
            </Filter>
            <AddNewServiceProviderDrawer />
          </Flex>
        </Flex>
        <Box p="20px">
          <StyledTable
            data={
              customersList?.data
                ? customersList?.data?.map((data: Customer) => ({
                    ...data,
                  }))
                : []
            }
            columns={columns}
            onRowClick={(row) =>
              navigate(`${superAdmin.SERVICEPROVIDERS}/${row.id}`)
            }
            loading={loadingCustomers}
            pagination={{
              pageSize: tableParams?.pageSize,
              currentPage: tableParams?.page,
              totalPages: customersList?.pagination?.numberOfPages,
              updateFn: updateParams,
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default index
