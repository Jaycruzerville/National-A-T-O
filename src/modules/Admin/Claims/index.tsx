import React, { useState, useMemo } from "react"
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
import { DownloadIcon } from "@chakra-ui/icons"
import { BiSort } from "react-icons/bi"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useDeferredValue } from "react"
import searchLight from "@/assets/search-light.svg"
import ClaimTable from "@/reusables/ClaimTable"
import Filter from "@/reusables/Filter"
import usersServices from "@/services/usersServices"
import { IError } from "@/types"
import { formatDate } from "@/utils/formatDate"
import { CellContext, ColumnDef } from "@tanstack/react-table"

type DriverSubmissionData = {
  _id: string
  fullName: string
  phoneNumber: string
  vehicleType: string
  vehiclePlateNumber: string
  status: string
  submittedAt: string
  handlerName: string | null
}

const DriverSubmissions: React.FC = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const initParams = useMemo(
    () => ({
      searchQuery: "",
      pageNo: 0,
      pageSize: 10,
      status: "",
      vehicleType: "",
      dateSubmitted: "",
    }),
    []
  )

  const [tableParams, setTableParams] = useState(initParams)
  const [filters, setFilters] = useState(initParams)
  const [loadingSubmissionId, setLoadingSubmissionId] = useState<string | null>(
    null
  )

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

  const updateFilters = (filter: keyof typeof initParams, value: unknown) => {
    setFilters({ ...filters, [filter]: value })
  }

  // Fetch driver submissions using usersServices.getDriverSubmissions
  const { data: driverSubmissions, isLoading: loadingSubmissions } = useQuery({
    queryKey: [
      "driver-submissions-list",
      {
        pageNo: tableParams.pageNo,
        pageSize: tableParams.pageSize,
        searchQuery: deferredSearchValue,
      },
    ],
    queryFn: usersServices.getDriverSubmissions, // Use the correct service function
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

  const handleButtonClick = (submissionId: string) => {
    setLoadingSubmissionId(submissionId)
    // handleSubmission(submissionId)
  }

  const handleViewButtonClick = (submissionId: string) => {
    navigate(`/claims/${submissionId}`)
  }

  const columns: ColumnDef<DriverSubmissionData>[] = useMemo(
    () => [
      {
        accessorKey: "fullName", // Correct field from backend response
        header: ({ column }) => (
          <Button
            gap="4px"
            p="0px"
            _hover={{ backgroundColor: "none" }}
            _active={{ background: "none" }}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Full Name <Icon as={BiSort} color="brand.primary" />
          </Button>
        ),
      },
      {
        accessorKey: "phoneNumber", // Correct field from backend response
        header: "Phone Number",
      },
      {
        accessorKey: "vehicleType", // Correct field from backend response
        header: "Vehicle Type",
      },
      {
        accessorKey: "vehiclePlateNumber", // Correct field from backend response
        header: "Vehicle Plate Number",
      },
      {
        accessorKey: "status", // Correct field from backend response
        header: "Status",
        cell: (info: CellContext<DriverSubmissionData, any>) => (
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
                info.getValue().toLowerCase() === "approved"
                  ? "#9BFDD4"
                  : info.getValue().toLowerCase() === "pending"
                  ? "#FEF0C7"
                  : info.getValue().toLowerCase() === "rejected"
                  ? "#F7CECA"
                  : "#DCDBDD"
              }
              color={
                info.getValue().toLowerCase() === "approved"
                  ? "#027A48"
                  : info.getValue().toLowerCase() === "pending"
                  ? "#DC6803"
                  : info.getValue().toLowerCase() === "rejected"
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
        accessorKey: "submittedAt", // Correct field from backend response
        header: "Date Submitted",
        cell: (info: CellContext<DriverSubmissionData, any>) => {
          return <Text>{formatDate(info.getValue())}</Text>
        },
      },
      {
        accessorKey: "handlerName", // Correct field from backend response
        header: "Handled by",
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info: CellContext<DriverSubmissionData, any>) => {
          const submissionId = info.row.original._id // Use the correct field for ID
          const handlerName = info.row.original.handlerName
          return (
            <Flex gap="10px">
              {!handlerName && (
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleButtonClick(submissionId)}
                  isLoading={loadingSubmissionId === submissionId}
                >
                  Handle
                </Button>
              )}
              <Button
                size="sm"
                bgColor="#FEF0C7"
                color="#DC6803"
                onClick={() => handleViewButtonClick(submissionId)}
              >
                View
              </Button>
            </Flex>
          )
        },
      },
    ],
    [loadingSubmissionId]
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
          Driver Submissions
        </Heading>
        <Spacer />
        <InputGroup width="237px" h="28px">
          <InputRightElement height="100%">
            <Image src={searchLight} />
          </InputRightElement>
          <Input
            placeholder="Search with driver name or phone number"
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
              Vehicle Type & Status
            </Text>
            <Flex gap="12px">
              <FormControl>
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  Vehicle Type
                </FormLabel>
                <Select
                  placeholder="Select vehicle type"
                  _placeholder={{ color: "#003E51" }}
                  name="vehicleType"
                  value={filters.vehicleType}
                  fontSize="14px"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => {
                    updateFilters("vehicleType", e.target.value)
                  }}
                >
                  <option value="Taxi">Taxi</option>
                  <option value="Tricycle">Tricycle</option>
                  <option value="Motorbike">Motorbike</option>
                  <option value="Bus">Bus</option>
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
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
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
                  Date Submitted
                </FormLabel>
                <Input
                  size="lg"
                  width="100%"
                  placeholder="Select Date"
                  px="14px"
                  type="date"
                  name="dateSubmitted"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  value={filters.dateSubmitted}
                  onChange={(e) =>
                    updateFilters("dateSubmitted", e.target.value)
                  }
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
        <ClaimTable
          data={driverSubmissions || []}
          columns={columns}
          loading={loadingSubmissions}
          pagination={{
            pageSize: tableParams?.pageSize,
            currentPage: tableParams?.pageNo,
            totalPages: Math.ceil(
              (driverSubmissions?.length || 0) / tableParams.pageSize
            ),
            updateFn: updateParams,
          }}
        />
      </Box>
    </Box>
  )
}
export default DriverSubmissions
