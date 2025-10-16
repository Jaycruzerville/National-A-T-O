/* eslint-disable @typescript-eslint/no-empty-function */
import { useDeferredValue, useState } from "react"
import {
  Box,
  // Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Spinner,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import StyledTable from "@/reusables/StyledTable"
import Filter from "@/reusables/Filter"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"
import { SwitchStatus } from "@/reusables/SwitchStatus"
import usersService from "@/services/usersServices"
//import { useDriver } from "@/hooks/useDriver"
import { IError } from "@/types"
import { formatToCurrency } from "@/utils/formatToCurrency"
import { format } from "date-fns"
// import { useNavigate } from "react-router-dom"
import searchLight from "@/assets/search-light.svg"
// import { BiSort } from "react-icons/bi"
//  Driver from "@/modules/Users/Driver"
import Auth from "@/utils/auth"

type DailyVouchers = {
  _id: string
  driverId: string
  voucherCode: string
  amount: number
  status: string
  createdAt: string
  expiryDate: string
  vehicleType: string
  route: string
}

const columns: ColumnDef<DailyVouchers>[] = [
  {
    accessorKey: "voucherCode",
    header: "Voucher Code",
    cell: (info: CellContext<DailyVouchers, any>) => (
      <>{info.getValue().toUpperCase()}</>
    ),
  },
  {
    accessorKey: "amount",
    header: "Fee Amount",
    cell: (info: CellContext<DailyVouchers, any>) => (
      <>{formatToCurrency(info.getValue())}</>
    ),
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
  },
  {
    accessorKey: "route",
    header: "Route",
  },
  {
    accessorKey: "status",
    header: "Status",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<DailyVouchers, any>) => (
      <>{SwitchStatus(info.getValue())}</>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Used",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (info: CellContext<DailyVouchers, any>) => (
      <Box>
        {info?.getValue() && format(new Date(info?.getValue()), "yyyy-MM-dd")}
      </Box>
    ),
  },
]

const initParams = {
  search: "",
  status: "",
  vehicleType: "",
  route: "",
  startDate: "",
  endDate: "",
}

const DailyVouchersPage = () => {
  const toast = useToast()
  const [tableParams, setTableParams] = useState({
    ...initParams,
    pageSize: 10,
    page: 1,
    search: "",
  })

  const [filters, setFilters] = useState(initParams)
  const deferredSearchValue = useDeferredValue(tableParams.search)
  const [voucherId, setVoucherId] = useState<string | null>(null)
  // const navigate = useNavigate()

  const driverId = Auth.getDriverId()

  // Fetch daily vouchers by driver ID if driverId is not null
  const { data: vouchersList, isLoading: loadingVouchers } = useQuery({
    queryKey: [
      "daily_vouchers",
      {
        pageSize: tableParams.pageSize,
        page: tableParams.page,
        search: deferredSearchValue,
      },
    ],
    queryFn: () => {
      if (!driverId) {
        throw new Error("Driver ID is null")
      }
      return usersService.getDailyVouchersByDriverId(driverId)
    },
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
    enabled: !!driverId, // Ensure query only runs if driverId is not null
  })

  // Fetch specific voucher details by ID
  const { data: voucherDetails, isLoading: loadingVoucherDetails } = useQuery({
    queryKey: ["voucher_details", voucherId],
    enabled: !!voucherId,
    queryFn: () => usersService.getVoucherById(voucherId as string),
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

  const updateFilters = (filter: string, value: unknown) => {
    setFilters({ ...filters, [filter]: value })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleRowClick = (id: string) => {
    setVoucherId(id) // Set the voucher ID
    onOpen() // Open the modal
  }

  return (
    <>
      <Box bg="#F6F6F6" p={{ base: "10px", md: "20px" }}>
        <Flex
          bg="brand.primary"
          py="12px"
          px={{ base: "20px", md: "40px" }}
          mt={{ base: "20px", md: "40px" }}
          borderTopRadius="12px"
          gap={{ base: "10px", md: "20px" }}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          <Text
            color="#ffffff"
            fontSize={{ base: "18px", md: "20px" }}
            fontWeight="500"
          >
            Daily Voucher Fees
          </Text>
          <Spacer />
          <InputGroup width={{ base: "100%", md: "237px" }}>
            <InputRightElement height="100%">
              <Image src={searchLight} />
            </InputRightElement>
            <Input
              placeholder="Search Vouchers"
              fontSize="12px"
              borderRadius="4px"
              height="28px"
              border="1px solid #C0C9D8"
              bgColor="#ffffff"
              _placeholder={{
                fontSize: "10px",
                letterSpacing: "-0.02em",
                lineHeight: "12px",
                color: "#000e1a",
                opacity: "0.5",
              }}
              _hover={{ borderColor: "none" }}
              _focusVisible={{ borderColor: "none", boxShadow: "none" }}
              onChange={(e) =>
                updateParams({ param: "search", value: e.target.value })
              }
            />
          </InputGroup>
          <Filter
            handleClear={() => {
              setFilters(initParams)
              updateParams({ filterValues: initParams })
            }}
            handleFilter={() => updateParams({ filterValues: filters })}
          >
            <Text
              fontWeight="500"
              lineHeight="25px"
              fontSize={{ base: "18px", md: "20px" }}
              letterSpacing="-1px"
              pb="12px"
            >
              Status & Vehicle
            </Text>
            <Flex
              gap="12px"
              pb="20px"
              flexDirection={{ base: "column", md: "row" }}
            >
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
                  placeholder="Select Voucher Status"
                  _placeholder={{ color: "#003E51" }}
                  name="voucherStatus"
                  fontSize="14px"
                  value={filters.status}
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => updateFilters("status", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Used">Used</option>
                  <option value="Expired">Expired</option>
                  <option value="Cancelled">Cancelled</option>
                </Select>
              </FormControl>
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
                  placeholder="Select Vehicle Type"
                  _placeholder={{ color: "#003E51" }}
                  name="vehicleType"
                  value={filters.vehicleType}
                  fontSize="14px"
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  height="48px"
                  onChange={(e) => updateFilters("vehicleType", e.target.value)}
                >
                  <option value="Bus">Bus</option>
                  <option value="Taxi">Taxi</option>
                  <option value="Tricycle">Tricycle</option>
                  <option value="Motorcycle">Motorcycle</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl width={{ base: "100%", md: "50%" }} pb="20px">
              <FormLabel
                lineHeight="20px"
                fontWeight="500"
                fontSize="0.75rem"
                color="#003E51"
              >
                Route
              </FormLabel>
              <Select
                placeholder="Select Route"
                _placeholder={{ color: "#003E51" }}
                name="route"
                value={filters.route}
                fontSize="14px"
                _hover={{ outline: "none" }}
                _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                height="48px"
                onChange={(e) => updateFilters("route", e.target.value)}
              >
                <option value="Kano-Lagos">Kano-Lagos</option>
                <option value="Kano-Abuja">Kano-Abuja</option>
                <option value="Kano-Port Harcourt">Kano-Port Harcourt</option>
                <option value="Kano-Ibadan">Kano-Ibadan</option>
              </Select>
            </FormControl>
            <Text
              fontWeight="500"
              lineHeight="25px"
              fontSize={{ base: "18px", md: "20px" }}
              letterSpacing="-1px"
              pb="12px"
            >
              Date Range
            </Text>
            <Flex
              gap="12px"
              pb="20px"
              flexDirection={{ base: "column", md: "row" }}
            >
              <FormControl
                mb={{ base: "10px", md: "20px" }}
                width={{ base: "100%", md: "50%" }}
              >
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  From
                </FormLabel>
                <Input
                  size="lg"
                  width="100%"
                  placeholder="Select start Date"
                  px="14px"
                  type="date"
                  name="startDate"
                  max={new Date().toISOString().split("T")[0]}
                  value={filters.startDate}
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  onChange={(e) => updateFilters("startDate", e.target.value)}
                />
              </FormControl>
              <FormControl
                mb={{ base: "10px", md: "20px" }}
                width={{ base: "100%", md: "50%" }}
              >
                <FormLabel
                  lineHeight="20px"
                  fontWeight="500"
                  fontSize="0.75rem"
                  color="#003E51"
                >
                  To
                </FormLabel>
                <Input
                  size="lg"
                  width="100%"
                  placeholder="Select end Date"
                  px="14px"
                  type="date"
                  name="endDate"
                  max={new Date().toISOString().split("T")[0]}
                  value={filters.endDate}
                  _hover={{ outline: "none" }}
                  _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                  onChange={(e) => updateFilters("endDate", e.target.value)}
                />
              </FormControl>
            </Flex>
          </Filter>
        </Flex>
        <Box mt="20px" bg="#ffffff">
          <StyledTable
            data={vouchersList}
            columns={columns}
            onRowClick={(row) => handleRowClick(String(row._id))}
            loading={loadingVouchers}
            pagination={{
              pageSize: tableParams?.pageSize,
              currentPage: tableParams?.page,
              totalPages: vouchersList?.pagination?.numberOfPages,
              updateFn: updateParams,
            }}
          />
        </Box>
      </Box>
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "full", md: "lg" }}
        >
          <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
          <ModalContent
            bg="white"
            color="black"
            p={{ base: 3, md: 5 }}
            borderRadius="md"
            boxShadow="lg"
            opacity="1"
            mx={{ base: 2, md: "auto" }}
            my={{ base: 2, md: "auto" }}
          >
            <ModalCloseButton
              top={{ base: "1rem", md: "3rem" }}
              color="brand.primary"
              onClick={() => setVoucherId(null)}
            />
            <ModalHeader
              pt={{ base: "20px", md: "40px" }}
              fontWeight="500"
              fontSize={{ base: "24px", md: "36px" }}
              lineHeight={{ base: "30px", md: "45px" }}
              letterSpacing="-2px"
              color="brand.primary"
              pb="0px"
            >
              Voucher Details
            </ModalHeader>
            <Divider
              borderColor="brand.primary"
              margin="0px 1rem"
              width="auto"
            />
            {loadingVoucherDetails ? (
              <Box
                h="300px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="brand.primary"
                  size="lg"
                />
              </Box>
            ) : (
              <ModalBody>
                <UnorderedList
                  pt={{ base: "30px", md: "50px" }}
                  ml="0px"
                  px={{ base: "20px", md: "46px" }}
                  display="flex"
                  flexDir="column"
                  gap="10px"
                >
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Voucher Code:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {voucherDetails?.voucherCode?.toUpperCase() ?? "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Fee Amount:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {formatToCurrency(voucherDetails?.amount ?? 0)}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Vehicle Type:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {voucherDetails?.vehicleType ?? "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Route:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {voucherDetails?.route ?? "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Status:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {voucherDetails?.status ?? "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Date Used:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {voucherDetails?.createdAt
                        ? format(
                            new Date(voucherDetails.createdAt),
                            "yyyy-MM-dd"
                          )
                        : "-"}
                    </Text>
                  </ListItem>
                  <ListItem
                    listStyleType="none"
                    display="flex"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", md: "center" }}
                    gap={{ base: 1, md: 0 }}
                  >
                    <Text
                      color="#8E8E8E"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      Expiry Date:
                    </Text>
                    <Text
                      color="#202020"
                      letterSpacing="-1px"
                      fontWeight={600}
                      lineHeight="25px"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {voucherDetails?.expiryDate
                        ? format(
                            new Date(voucherDetails.expiryDate),
                            "yyyy-MM-dd"
                          )
                        : "-"}
                    </Text>
                  </ListItem>
                </UnorderedList>
              </ModalBody>
            )}

            <ModalFooter
              justifyContent="center"
              pt={{ base: "30px", md: "62px" }}
              pb={{ base: "20px", md: "42px" }}
            >
              {/* Additional actions can be added here */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  )
}

export default DailyVouchersPage
