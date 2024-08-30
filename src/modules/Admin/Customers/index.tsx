import React, { useMemo, useState } from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { BiSort } from "react-icons/bi"
import { useDeferredValue } from "react"
import { DownloadIcon } from "@chakra-ui/icons"
import usersService from "@/services/usersServices"
import searchLight from "@/assets/search-light.svg"
import StyledTable from "@/reusables/StyledTable" // Corrected import
import Filter from "@/reusables/Filter"
import { ColumnDef } from "@tanstack/react-table"

const Customers: React.FC = () => {
  const toast = useToast()

  const initParams = useMemo(
    () => ({
      searchQuery: "",
      pageNo: 0,
      pageSize: 10,
    }),
    []
  )

  const [tableParams, setTableParams] = useState(initParams)
  const [filters, setFilters] = useState(initParams)
  const deferredSearchValue = useDeferredValue(tableParams.searchQuery)

  const updateParams = ({
    param,
    value,
    filterValues,
  }: {
    param?: keyof typeof initParams
    value?: string | number | null
    filterValues?: Partial<typeof initParams>
  }) => {
    if (param && value !== undefined) {
      setTableParams({ ...tableParams, [param]: value })
    } else if (filterValues) {
      setTableParams({ ...tableParams, ...filterValues })
    }
  }

  const onFilter = () => {
    updateParams({ filterValues: filters })
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  const updateFilters = (filter: keyof typeof initParams, value: unknown) => {
    setFilters({ ...filters, [filter]: value })
  }

  const { data: customerList, isLoading: loadingCustomers } = useQuery({
    queryKey: [
      "customers-list",
      {
        pageNo: tableParams.pageNo,
        pageSize: tableParams.pageSize,
        searchQuery: deferredSearchValue,
      },
    ],
    queryFn: usersService.getCustomers,
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to load customers.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
  })

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "customerId",
        header: "Customer ID",
      },
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
            First Name <BiSort />
          </Button>
        ),
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "roleName",
        header: "Role",
      },
    ],
    []
  )

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
          Customers
        </Heading>
        <Spacer />
        <InputGroup width="237px" h="28px">
          <InputRightElement height="100%">
            <Image src={searchLight} />
          </InputRightElement>
          <Input
            placeholder="Search with customer name or email"
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
            {/* Pass children content here or an empty fragment */}
            <>{/* Filter Content Goes Here */}</>
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
          data={customerList?.data?.content || []}
          columns={columns}
          loading={loadingCustomers}
          pagination={{
            pageSize: tableParams?.pageSize,
            currentPage: tableParams?.pageNo,
            totalPages: customerList?.data?.page?.totalPages || 0,
            updateFn: updateParams,
          }}
        />
      </Box>
    </Box>
  )
}

export default Customers
