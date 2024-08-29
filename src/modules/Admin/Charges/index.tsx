import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  useToast,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react"
import searchLight from "@/assets/search-light.svg"
import StyledTable from "@/reusables/StyledTable"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { format } from "date-fns"
import mockAgents from "@/data/overmock"
import Filter from "@/reusables/Filter"

type Agent = {
  id: string
  property: string
  state: string
  address: string
  status: string
  amountDue: string
  lastActiveDate: string
}

const Index = () => {
  const toast = useToast()

  const handleNotify = (id: string) => {
    console.log("Notify agent with ID:", id)

    toast({
      title: "Notification Sent",
      description: `A notification was sent to agent ID: ${id}`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    })

    // Add any additional logic for the notification here
  }

  const columns: ColumnDef<Agent>[] = [
    {
      accessorKey: "property",
      header: "Property",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: CellContext<Agent, any>) => (
        <Box
          bgColor={info.getValue() === "ACTIVE" ? "#9BFDD4" : "#DCDBDD"}
          p="4px 8px"
          borderRadius="4px"
          width="fit-content"
          fontSize="12px"
          color="#202020"
          fontWeight="500"
          textTransform="capitalize"
        >
          {info.getValue().toLowerCase()}
        </Box>
      ),
    },
    {
      accessorKey: "amountDue",
      header: "Amount Due",
    },
    {
      accessorKey: "lastActiveDate",
      header: "Last Date Active",
      cell: (info: CellContext<Agent, any>) => (
        <Box>
          {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
        </Box>
      ),
    },
    {
      accessorKey: "notify",
      header: "Actions",
      cell: (info: CellContext<Agent, any>) => (
        <Box
          as="button"
          onClick={() => handleNotify(info.row.original.id)}
          p="4px 8px"
          borderRadius="4px"
          width="fit-content"
          fontSize="12px"
          fontWeight="500"
          textTransform="capitalize"
          bgColor="#CBD5E0"
          color="#202020"
          _hover={{
            bgColor: "#A0AEC0",
          }}
          cursor="pointer"
        >
          Notify
        </Box>
      ),
    },
  ]

  const initParams = {
    searchQuery: "",
    status: "",
    amountDue: "",
    dateCreated: "",
    lastActiveDate: "",
  }

  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
  })
  const [filters, setFilters] = useState(initParams)

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

  const appList = mockAgents

  return (
    <>
      <Box>
        <Flex p="20px" bgColor="brand.bgLight" alignItems="center" gap="8px">
          <Heading fontSize="20px" color="#0B1023">
            Overdue Charges
          </Heading>
          <Spacer />
          <InputGroup width="237px">
            <InputRightElement height="100%">
              <Image src={searchLight} />
            </InputRightElement>
            <Input
              placeholder="Search with Property or Address"
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
                    max={new Date().toISOString().split("T")[0]}
                    value={filters.dateCreated}
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
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
                    max={new Date().toISOString().split("T")[0]}
                    value={filters.lastActiveDate}
                    type="date"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
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
            data={appList}
            columns={columns}
            loading={false}
            pagination={{
              pageSize: tableParams?.pageSize,
              currentPage: tableParams?.page,
              totalPages: 5,
              updateFn: setTableParams,
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Index
