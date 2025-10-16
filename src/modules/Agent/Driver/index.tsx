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
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import searchLight from "@/assets/search-light.svg"
import StyledTable from "@/reusables/StyledTable"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useNavigate, useParams } from "react-router-dom"
import Filter from "@/reusables/Filter"
import AddDriver from "./components/AddDriver"
import usersService from "@/services/usersServices"
import { format } from "date-fns"
import { BiSort } from "react-icons/bi"

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "DriverName",
    header: ({ column }) => (
      <Button
        paddingLeft={0}
        gap="4px"
        _hover={{ backgroundColor: "none" }}
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
  },
  {
    accessorKey: "DriverCategory",
    header: "Category",
  },
  {
    accessorKey: "DriverAddress",
    header: "Location",
  },
  {
    accessorKey: "DriverState",
    header: "State",
  },
  {
    accessorKey: "DriverLGA",
    header: "LGA",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        paddingLeft={0}
        gap="4px"
        _hover={{ backgroundColor: "none" }}
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: (info: CellContext<any, any>) => (
      <Box>{format(new Date(info.getValue()), "yyyy-MM-dd")}</Box>
    ),
  },
]

const initParams = {
  searchQuery: "",
  status: "",
  registeredUsers: "",
}

const DriverPage = () => {
  const navigate = useNavigate()
  const { userId } = useParams()
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
    userId, // Add userId to the params
  })
  const [filters, setFilters] = useState(initParams)

  const { data: DriverList, isLoading: loadingDriver } = useQuery({
    queryKey: [
      "properties",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        searchQuery: tableParams.searchQuery,
        status: tableParams.status,
        userId, // Pass userId in the query
      },
    ],
    queryFn: usersService.getProperties,
  })

  const updateParams = ({ param, value, filterValues }: any) => {
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

  return (
    <Box bgColor="brand.bgLight" alignItems="center" p={{ base: "4", md: "6" }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "stretch", md: "center" }}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        gap={{ base: "4", md: "0" }}
        mb={{ base: "4", md: "0" }}
      >
        <Heading
          fontSize={{ base: "18px", md: "20px" }}
          color="#0B1023"
          mb={{ base: "2", md: "0" }}
        >
          All Properties
        </Heading>
        <InputGroup
          width={{ base: "100%", md: "237px" }}
          mb={{ base: "3", md: "0" }}
        >
          <InputRightElement height="100%">
            <Image src={searchLight} />
          </InputRightElement>
          <Input
            placeholder="Search"
            fontSize={{ base: "14px", md: "12px" }}
            borderRadius="4px"
            height={{ base: "40px", md: "28px" }}
            border="1px solid #C0C9D8"
            bgColor="#ffffff"
            _placeholder={{
              fontSize: { base: "12px", md: "10px" },
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
        <Flex
          gap={{ base: "2", md: "8px" }}
          alignItems="center"
          direction={{ base: "column", sm: "row" }}
          w={{ base: "full", md: "auto" }}
        >
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
              fontSize={{ base: "18px", md: "20px" }}
              letterSpacing="-1px"
              pb="12px"
            >
              Status
            </Text>
            <Flex gap="12px" direction={{ base: "column", md: "row" }}>
              <FormControl width={{ base: "100%", md: "50%" }}>
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  Status
                </FormLabel>
                <Select
                  placeholder="Select Driver Status"
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
                  <option value="VERIFIED">Verified</option>
                  <option value="PENDING">Pending</option>
                  <option value="DECLINED">Declined</option>
                </Select>
              </FormControl>
            </Flex>
            <Text
              fontWeight="500"
              lineHeight="25px"
              fontSize={{ base: "18px", md: "20px" }}
              letterSpacing="-1px"
              pt="20px"
              pb="12px"
            >
              Date
            </Text>
            <Flex
              gap="12px"
              width="100%"
              mb="5rem"
              direction={{ base: "column", md: "row" }}
            >
              <FormControl width={{ base: "100%", md: "50%" }}>
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
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => updateFilters("dateCreated", e.target.value)}
                />
              </FormControl>
              <FormControl width={{ base: "100%", md: "50%" }}>
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
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    updateFilters("lastActiveDate", e.target.value)
                  }
                />
              </FormControl>
            </Flex>
          </Filter>
          <AddDriver />
        </Flex>
      </Flex>
      <Box p={{ base: "4", md: "5" }}>
        <StyledTable
          data={DriverList?.data || []}
          columns={columns}
          loading={loadingDriver}
          onRowClick={(row) => navigate(`/Driver/${row.id}`)}
          pagination={{
            pageSize: tableParams?.pageSize,
            currentPage: tableParams?.page,
            totalPages: DriverList?.data?.page?.totalPages || 0,
            updateFn: updateParams,
          }}
        />
      </Box>
    </Box>
  )
}

export default DriverPage
