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
  Spacer,
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

// Define the type for the driver data
interface Driver {
  _id: string
  fullName: string
  phoneNumber: string
  vehicleType: string
  vehiclePlateNumber: string
  tag: string
  approved: boolean
  createdAt: string
}

const columns: ColumnDef<Driver>[] = [
  {
    accessorKey: "fullName", // Driver's full name
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
    accessorKey: "vehicleType", // Driver's vehicle type (e.g., Tricycle)
    header: "Vehicle Type",
  },
  {
    accessorKey: "vehiclePlateNumber", // Driver's vehicle plate number
    header: "Vehicle Plate",
  },
  {
    accessorKey: "phoneNumber", // Driver's phone number
    header: "Phone Number",
  },
  {
    accessorKey: "approved", // Driver's approval status
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
    cell: (info: CellContext<Driver, any>) => (
      <Box
        bgColor={info.getValue() === true ? "#9BFDD4" : "#DCDBDD"} // Green for active, gray for inactive
        p="4px 8px"
        borderRadius="4px"
        width="fit-content"
        fontSize="12px"
        color="#202020"
        fontWeight="500"
        textTransform="capitalize"
      >
        {info.getValue() === true ? "Active" : "Inactive"}
      </Box>
    ),
  },
  {
    accessorKey: "createdAt", // Date the driver was created
    header: "Date Created",
    cell: (info: CellContext<Driver, any>) => (
      <Box>{format(new Date(info.getValue()), "yyyy-MM-dd")}</Box>
    ),
  },
]

const initParams = {
  searchQuery: "",
  status: "",
}

const DriverPage = () => {
  const navigate = useNavigate()
  const { state } = useParams() // Get state from URL params
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
  })
  const [filters, setFilters] = useState(initParams)

  const { data: DriverList, isLoading: loadingDriver } = useQuery({
    queryKey: [
      "drivers",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        searchQuery: tableParams.searchQuery,
        status: tableParams.status,
      },
      state, // Pass state to the query if it exists
    ],
    queryFn: usersService.getDrivers,
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
    <Box bgColor="brand.bgLight" alignItems="center" p="25">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading fontSize="20px" color="#0B1023">
          All Drivers
        </Heading>
        <Spacer />
        <InputGroup width="237px">
          <InputRightElement height="100%">
            <Image src={searchLight} />
          </InputRightElement>
          <Input
            placeholder="Search"
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
              Status
            </Text>
            <Flex gap="12px">
              <FormControl width="50%">
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
          </Filter>
          <AddDriver />
        </Flex>
      </Flex>
      <Box p="20px">
        <StyledTable
          data={DriverList?.data || []}
          columns={columns}
          loading={loadingDriver}
          onRowClick={(row) => {
            // Ensure the right path to _id is used
            const driverId = row?._id

            if (driverId) {
              navigate(`/Driver/${driverId}`) // Use the correct driver ID for navigation
            } else {
              console.error("Row data is missing _id:", row)
            }
          }}
          pagination={{
            pageSize: tableParams?.pageSize,
            currentPage: tableParams?.page,
            totalPages: DriverList?.pagination?.numberOfPages || 1,
            updateFn: updateParams,
          }}
        />
      </Box>
    </Box>
  )
}

export default DriverPage
