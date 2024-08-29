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
import SuperAdminService from "@/services/superAdminServices"
import { format } from "date-fns"
import { BiSort } from "react-icons/bi"

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "assignedPropertyId",
    header: ({ column }) => (
      <Button
        paddingLeft={0}
        gap="4px"
        _hover={{ backgroundColor: "none" }}
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Property ID <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
  },
  {
    accessorKey: "propertyName",
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
    accessorKey: "propertyHouseNumber",
    header: "House Number",
  },
  {
    accessorKey: "propertyStreetName",
    header: "Street Name",
  },
  {
    accessorKey: "propertyType",
    header: "Type",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "propertyOwnerName",
    header: "Owner Name",
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
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

const VNOPropertPage = () => {
  const navigate = useNavigate()
  const { customerId } = useParams()
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
    customerId, // Add customerId to the params
  })
  const [filters, setFilters] = useState(initParams)

  const { data: PropertyList, isLoading: loadingProperty } = useQuery({
    queryKey: [
      "propertiesVerifiedNoOwners",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        searchQuery: tableParams.searchQuery,
        status: tableParams.status,
        customerId, // Pass customerId in the query
      },
    ],
    queryFn: SuperAdminService.getVerifiedNoOwnersProperties,
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
          All Properties Verified No Owners
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
                  placeholder="Select Property Status"
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
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => updateFilters("dateCreated", e.target.value)}
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
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    updateFilters("lastActiveDate", e.target.value)
                  }
                />
              </FormControl>
            </Flex>
          </Filter>
        </Flex>
      </Flex>
      <Box p="20px">
        <StyledTable
          data={PropertyList?.data?.content || []}
          columns={columns}
          loading={loadingProperty}
          onRowClick={(row) => navigate(`/Property/${row.id}`)}
          pagination={{
            pageSize: tableParams?.pageSize,
            currentPage: tableParams?.page,
            totalPages: PropertyList?.data?.page?.totalPages || 0,
            updateFn: updateParams,
          }}
        />
      </Box>
    </Box>
  )
}

export default VNOPropertPage
