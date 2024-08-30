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
import { useQuery, useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useDeferredValue } from "react"
import searchLight from "@/assets/search-light.svg"
import ClaimTable from "@/reusables/ClaimTable"
import Filter from "@/reusables/Filter"
import usersService from "@/services/usersServices"
import { IError } from "@/types"
import { formatDate } from "@/utils/formatDate"
import { CellContext, ColumnDef } from "@tanstack/react-table"

type ApplicationData = {
  applicationId: string
  applicantName: string
  assignedDriverId: string | null
  applicationType: string
  applicationStatus: string
  handlerName: string
  createDate: string
  comments: string | null
}

const Claims: React.FC = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const initParams = useMemo(
    () => ({
      searchQuery: "",
      pageNo: 0,
      pageSize: 10,
      initiatedBy: "",
      status: "",
      planType: "",
      dateInitiated: "",
    }),
    []
  )

  const [tableParams, setTableParams] = useState(initParams)
  const [filters, setFilters] = useState(initParams)
  const [loadingApplicationId, setLoadingApplicationId] = useState<
    string | null
  >(null)

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

  const {
    data: applicationsList,
    isLoading: loadingApplications,
    refetch,
  } = useQuery({
    queryKey: [
      "applications-list",
      {
        pageNo: tableParams.pageNo,
        pageSize: tableParams.pageSize,
        searchQuery: deferredSearchValue,
      },
    ],
    queryFn: usersService.getApplications,
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

  const { mutate: handleApplication } = useMutation({
    mutationFn: (applicationId: string) =>
      usersService.handleApplication(applicationId, {
        handlerName: "Admin Name",
      }), // Adjust payload as needed
    // eslint-disable-next-line unused-imports/no-unused-vars
    onError: (error: IError) => {
      setLoadingApplicationId(null)
      toast({
        title: "Error",
        description: "Failed to handle the application.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
    onSuccess: (response) => {
      setLoadingApplicationId(null)
      toast({
        title: "Success",
        description: "Application handled successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      console.log("Application handled:", response)
      refetch() // Refetch the applications list to update the table
    },
  })

  const handleButtonClick = (applicationId: string) => {
    setLoadingApplicationId(applicationId)
    handleApplication(applicationId)
  }

  const handleViewButtonClick = (applicationId: string) => {
    console.log("Navigating to application ID:", applicationId)
    navigate(`/claims/${applicationId}`)
  }

  const columns: ColumnDef<ApplicationData>[] = useMemo(
    () => [
      {
        accessorKey: "applicantName",
        header: ({ column }) => (
          <Button
            gap="4px"
            p="0px"
            _hover={{ backgroundColor: "none" }}
            _active={{ background: "none" }}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Applicant Name <Icon as={BiSort} color="brand.primary" />
          </Button>
        ),
      },
      {
        accessorKey: "applicationId",
        header: "Application ID",
      },
      {
        accessorKey: "applicationType",
        header: "Application Type",
      },
      {
        accessorKey: "applicationStatus",
        header: "Status",
        cell: (info: CellContext<ApplicationData, any>) => (
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
        accessorKey: "handlerName",
        header: "Handled by",
      },
      {
        accessorKey: "createDate",
        header: "Date Created",
        cell: (info: CellContext<ApplicationData, any>) => {
          return <Text>{formatDate(info.getValue())}</Text>
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info: CellContext<ApplicationData, any>) => {
          const applicationId = info.row.original.applicationId
          const handlerName = info.row.original.handlerName
          return (
            <Flex gap="10px">
              {!handlerName && (
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => handleButtonClick(applicationId)}
                  isLoading={loadingApplicationId === applicationId}
                >
                  Handle
                </Button>
              )}
              <Button
                size="sm"
                bgColor="#FEF0C7"
                color="#DC6803"
                onClick={() => handleViewButtonClick(applicationId)}
              >
                View
              </Button>
            </Flex>
          )
        },
      },
    ],
    [loadingApplicationId]
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
          Applications
        </Heading>
        <Spacer />
        <InputGroup width="237px" h="28px">
          <InputRightElement height="100%">
            <Image src={searchLight} />
          </InputRightElement>
          <Input
            placeholder="Search with applicant name or application ID"
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
              Plan & Status
            </Text>
            <Flex gap="12px">
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
                  placeholder="Select plan"
                  _placeholder={{ color: "#003E51" }}
                  name="planType"
                  value={filters.planType}
                  fontSize="14px"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => {
                    updateFilters("planType", e.target.value)
                  }}
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
                  <option value="Processing">Processing</option>
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
                  Date Initiated
                </FormLabel>
                <Input
                  size="lg"
                  width="100%"
                  placeholder="Select Date"
                  px="14px"
                  type="date"
                  name="dateInitiated"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  value={filters.dateInitiated}
                  onChange={(e) =>
                    updateFilters("dateInitiated", e.target.value)
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
          data={applicationsList?.data?.content || []}
          columns={columns}
          loading={loadingApplications}
          pagination={{
            pageSize: tableParams?.pageSize,
            currentPage: tableParams?.pageNo,
            totalPages: applicationsList?.data?.page?.totalPages || 0,
            updateFn: updateParams,
          }}
        />
      </Box>
    </Box>
  )
}

export default Claims
