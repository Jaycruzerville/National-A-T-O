/* eslint-disable @typescript-eslint/no-empty-function */
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
  useToast,
  Spacer,
} from "@chakra-ui/react"
import { useState, useDeferredValue } from "react"
import { useQuery } from "@tanstack/react-query"
import searchLight from "@/assets/search-light.svg"
import StyledTable from "@/reusables/StyledTable"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import Filter from "@/reusables/Filter"
import AddSuperAgentDrawer from "./components/AddSuperAgent"
import SuperAdminService from "@/services/superAdminServices"
import { IError } from "@/types"
import { format } from "date-fns"
import { BiSort } from "react-icons/bi"

type Agent = {
  id: string
  firstName: string
  lastName: string
  agentCode: string
  phoneNumber: string
  businessAddress: string
  registeredUsers: string
  status: string
  lastActiveDate: string
  dateCreated?: string
  createdAt?: string
}

const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        gap="4px"
        _hover={{ backgroundColor: "none" }}
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Agent, any>) => (
      <Box>
        {`${info.row.original.firstName} ${info.row.original.lastName}`}
      </Box>
    ),
  },
  {
    accessorKey: "agentCode",
    header: "Agent ID",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "businessAddress",
    header: "Location",
  },
  {
    accessorKey: "registeredUsers",
    header: ({ column }) => (
      <Button
        gap="4px"
        _hover={{ backgroundColor: "none" }}
        _active={{ background: "none" }}
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Users <Icon as={BiSort} color="brand.primary" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Agent, any>) => (
      <Box
        bgColor={info.getValue() === "ACTIVE" ? "#9BFDD4" : "#DCDBDD"}
        p="4px 8px"
        borderRadius="4px"
        fontSize="12px"
        width="fit-content"
        color="#202020"
        fontWeight="500"
        textTransform="capitalize"
      >
        {info.getValue().toLowerCase()}
      </Box>
    ),
  },
  {
    accessorKey: "lastActiveDate",
    header: "Last Date Active",
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<Agent, any>) => (
      <Box>{format(new Date(info.getValue()), "yyyy-MM-dd")}</Box>
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
  const toast = useToast()
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
  })
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

  const { data: superAgentList, isLoading: loadingSuperAgents } = useQuery({
    queryKey: [
      "superagents",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        searchQuery: deferredSearchValue,
        status: tableParams.status,
      },
    ],
    queryFn: SuperAdminService.getSuperAgents,
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
            All Super Agents
          </Heading>
          <Spacer />
          <InputGroup width="237px">
            <InputRightElement height="100%">
              <Image src={searchLight} />
            </InputRightElement>
            <Input
              placeholder="Search with Agent name or phone number"
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
                Users and Status
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
                    placeholder="Select User Status"
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
                    <option value="INACTIVE">Inactive</option>
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
                    onChange={(e) =>
                      updateFilters("dateCreated", e.target.value)
                    }
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
            <AddSuperAgentDrawer />
          </Flex>
        </Flex>
        <Box p="20px">
          <StyledTable
            data={
              superAgentList?.data
                ? superAgentList?.data?.map((data: Agent) => ({
                    ...data,
                    dateCreated: new Date(),
                  }))
                : []
            }
            columns={columns}
            loading={loadingSuperAgents}
            onRowClick={(row) => navigate(`/superagents/${row.id}`)}
            pagination={{
              pageSize: tableParams?.pageSize,
              currentPage: tableParams?.page,
              totalPages: superAgentList?.pagination?.numberOfPages,
              updateFn: updateParams,
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default index
