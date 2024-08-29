import {
  Container,
  Flex,
  Text,
  Box,
  useToast,
  useDisclosure,
  Image,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import deactivateAgent from "@/assets/deactivateAgent.svg"
import totalUsers from "@/assets/totalUsers.svg"
import totalTransactions from "@/assets/totalTransaction.svg"
import StatCards from "@/reusables/StatCards"
import StyledTable from "@/reusables/StyledTable"
import FilterModal from "./components/FilterModal"

import ProviderCard from "@/reusables/ProviderCard"
import LineChart from "@/reusables/LineChart"
import EditAgentModal from "@/reusables/EditAgentModal"
import SuperAdminService from "@/services/superAdminServices"
import { IError } from "@/types"

import blueEye from "@/assets/blueEye.svg"

type Claims = {
  num: number
  customerName: string
  amount: string
  status: string
  documents: string
  date: string
}

const ServiceProviderDetails = () => {
  const toast = useToast()
  const { id } = useParams()
  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    page: 1,
  })

  const updatePlansParams = ({
    filterValues,
  }: {
    filterValues: Record<string, unknown>
  }) => {
    setTableParams({ ...tableParams, ...filterValues })
  }

  const { data: appDetails } = useQuery({
    queryKey: ["agent-details", id],
    queryFn: () => SuperAdminService.getAgentDetails(id!),
    enabled: !!id,
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

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { data: agentCustomers } = useQuery({
    queryKey: ["agent-customers", { id }],
    queryFn: () =>
      SuperAdminService.getAgentCustomers(id as string, tableParams),
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

  // eslint-disable-next-line no-console
  console.log(appDetails, agentCustomers)

  const agentTotal = [
    {
      id: 1,
      icon: totalUsers,
      text: "Total transaction value",
      value: appDetails?.data?.registeredUsers.currentMonth ?? 0,
      percentage: 12,
    },
    {
      id: 2,
      icon: totalTransactions,
      text: "Total claim value",
      value: `₦${new Intl.NumberFormat("en-GB", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(appDetails?.data?.transactionValue.currentMonth ?? 0)}`,
      percentage: 12,
    },
    {
      id: 3,
      icon: totalTransactions,
      text: "Total claims",
      value: `₦${new Intl.NumberFormat("en-GB", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(appDetails?.data?.transactionValue.currentMonth ?? 0)}`,
      percentage: 12,
    },
  ]

  const agentStatus = {
    alignItems: "center",
    justifyContent: "space-between",
    background: "#EEF1FD",
    px: "20px",
  }
  const agentName = {
    color: "#0B1023",
    lineHeight: "100%",
    fontSize: "20px",
    fontWeight: 700,
    fontStyle: "normal",
  }
  const agentTag = {
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "18px",
    color: "#027A48",
    marginLeft: "12px",
    px: "8px",
    py: "4px",
    justifyContent: "center",
    alignItems: "center",
    background: "#98FDD4",
    borderRadius: "4px",
  }

  const dot = {
    width: "5px",
    height: "5px",
    background: "#027A48",
    marginRight: "8px",
    borderRadius: "50%",
  }
  const spaceFlex = {
    justifyContent: "space-between",
    alignItems: "center",
  }
  const alignFlex = {
    justifyContent: "space-between",
    alignItems: "flex-start",
  }

  const deactivateBtn = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    px: "12px",
    py: "9px",
    color: "#FFF",
    fontSize: "10px",
    fontWeight: 500,
    background: "#D02F44",
    cursor: "pointer",
    borderRadius: "4px",
  }

  const selectedContainerStyles = {
    background: "#f6f6f6",
    paddingBottom: "20px",
  }

  const columns: ColumnDef<Claims>[] = [
    {
      accessorKey: "customerName",
      header: "Customer Name",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Claims, any>) => (
        <Box
          width="fit-content"
          bgColor={
            info.getValue() === "Approved"
              ? "#9BFDD4"
              : info.getValue() === "Under Review"
              ? "#DCDBDD"
              : info.getValue() === "Rejected"
              ? "#F7CECA"
              : "#FEF0C7"
          }
          p="4px 8px"
          borderRadius="4px"
          fontSize="12px"
          color={
            info.getValue() === "Approved"
              ? "#027A48"
              : info.getValue() === "Under Review"
              ? "#202020"
              : info.getValue() === "Rejected"
              ? "#D92D20"
              : "#DC6803"
          }
          fontWeight="500"
        >
          {info.getValue()}
        </Box>
      ),
    },
    {
      accessorKey: "documents",
      header: "Documents",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (info: CellContext<Claims, any>) => (
        <Box
          width="fit-content"
          bgColor="#E9F0FC"
          p="4px 8px"
          borderRadius="4px"
          fontSize="12px"
          color="#0F3470"
          fontWeight="500"
          display="flex"
          flexDirection="row"
        >
          <Image src={blueEye} mr="4px" />
          {info.getValue()}
        </Box>
      ),
    },
    {
      accessorKey: "date",
      header: "Date initiated",
    },
  ]

  const defaultData: Claims[] = [
    {
      num: 1,
      customerName: "Bilikisu Faderera",
      amount: "NGN30,000.00",
      status: "Approved",
      documents: "View",
      date: "28 Nov 2022",
    },
    {
      num: 2,

      customerName: "Bilikisu Faderera",
      amount: "NGN30,000.00",
      status: "Rejected",
      documents: "View",
      date: "28 Nov 2022",
    },
    {
      num: 3,

      customerName: "Bilikisu Faderera",
      amount: "NGN30,000.00",
      status: "Processed",
      documents: "View",
      date: "28 Nov 2022",
    },
    {
      num: 4,
      customerName: "Bilikisu Faderera",
      amount: "NGN30,000.00",
      status: "Under Review",
      documents: "View",
      date: "28 Nov 2022",
    },
  ]

  const [data] = useState([...defaultData])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Container maxW="100%" px="0px" background="#f6f6f6">
      <Flex sx={agentStatus} h={{ base: "68px" }}>
        <Flex sx={spaceFlex}>
          <Text textStyle="headText" sx={agentName}>
            {`${appDetails?.data?.firstName ?? `-`} ${
              appDetails?.data?.lastName ?? `-`
            } | ${appDetails?.data?.agentCode ?? `-`}`}
          </Text>
          <Flex sx={agentTag}>
            <Box sx={dot}></Box>
            <Text textStyle="headText">Active</Text>
          </Flex>
        </Flex>
        <Flex sx={deactivateBtn}>
          <Text textStyle="headText">Deactivate Agent</Text>
          <img src={deactivateAgent} alt="" style={{ marginLeft: "8px" }} />
        </Flex>
      </Flex>

      <Box
        sx={selectedContainerStyles}
        maxW="100%"
        px="20px"
        h="100%"
        marginTop="20px"
      >
        <Flex sx={alignFlex} gap="8px" pb="20px">
          <Box sx={spaceFlex} w="66.6%">
            <Flex gap="8px">
              {agentTotal.map(({ id, icon, text, value, percentage }) => (
                <StatCards
                  key={id}
                  icon={icon}
                  text={text}
                  value={value}
                  percentage={percentage}
                  width="33.3%"
                />
              ))}
            </Flex>
            <Flex sx={spaceFlex} gap="8px" mt="8px" w="100%">
              <LineChart
                width={"100%"}
                chartHeader={"Users"}
                labels={[""]}
                dataSet_1={[0]}
                dataSet_2={[
                  150, 120, 280, 180, 10, 320, 200, 220, 280, 290, 200, 150,
                ]}
                xLabel={[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ]}
              />
            </Flex>
            <Flex sx={spaceFlex} gap="8px" mt="8px" pb="0px">
              <Container sx={selectedContainerStyles} maxW="100%" px="0px">
                <Box p="20px" bg="#FFF" borderTopRadius="20px">
                  <Flex justifyContent="space-between" pb="10px">
                    <Text fontSize="18px" fontWeight="700" lineHeight="22px">
                      Claims
                    </Text>
                    <FilterModal />
                  </Flex>
                  <StyledTable
                    data={data}
                    columns={columns}
                    pagination={{
                      pageSize: tableParams?.pageSize,
                      currentPage: tableParams?.page,
                      totalPages: 1,
                      updateFn: updatePlansParams,
                    }}
                  />
                </Box>
              </Container>
            </Flex>
          </Box>
          <Box w="33.3%" h="100%">
            <ProviderCard
              name={`${appDetails?.data?.firstName ?? `-`} ${
                appDetails?.data?.lastName ?? `-`
              }`}
              position={"Agent"}
              email={appDetails?.data?.email ?? "-"}
              phone={appDetails?.data?.phoneNumber ?? "-"}
              address={"3, The Rock Drive, Lekki, Omisore LGA, Oyo State"}
              lastActive={"28 Nov 2022"}
              dateCreated={"28 Nov 2022"}
              editModal={onOpen}
            />
          </Box>
        </Flex>
      </Box>

      <EditAgentModal
        isOpen={isOpen}
        onClose={onClose}
        userType="Agent"
        data={{ firstName: "Ban", lastName: "Kuli" }}
      />
    </Container>
  )
}

export default ServiceProviderDetails
