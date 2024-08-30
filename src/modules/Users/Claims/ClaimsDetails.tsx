import React, { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { BsEye } from "react-icons/bs"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import StyledTable from "@/reusables/StyledTable"
import AcceptClaimModal from "./components/AcceptClaimModal"
import RejectClaimModal from "./components/RejectClaimModal"
import ViewReceiptModal from "@/reusables/ViewReceiptModal"
import { IError } from "@/types"
import usersService from "@/services/usersServices"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { formatToCurrency } from "@/utils/formatToCurrency"
import { formatDate } from "@/utils/formatDate"
import { format } from "date-fns"

const historyColorMap: { [K: string]: { bg: string; color: string } } = {
  initiated: {
    bg: "#DFE5FD",
    color: "#071655",
  },
  inReview: {
    bg: "#DCDBDD",
    color: "#202020",
  },
  processing: {
    bg: "#FEF0C7",
    color: "#DC6803",
  },
  approved: {
    bg: "#9BFDD4",
    color: "#027A48",
  },
  rejected: {
    bg: "#F7CECA",
    color: "#D92D20",
  },
}

const ClaimsDetails = () => {
  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    page: 1,
  })

  const _updateParams = ({
    filterValues,
  }: {
    filterValues: Record<string, unknown>
  }) => {
    setTableParams({ ...tableParams, ...filterValues })
  }

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
    textTransform: "capitalize",
  }

  const spaceFlex = {
    justifyContent: "space-between",
    alignItems: "center",
  }

  type claimsData = {
    planInformation: string
    claimAmount: string
    totalClaim: string
    totalRemittance: string
    lastPaymentDate: string
    documents: string
    actions: string
  }

  type otherClaimsData = {
    planInformation: string
    amount: string
    status: string
    reason: string
    documents: string
    dateInitiated: string
  }

  const toast = useToast()
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: claimsDetails, isLoading } = useQuery(
    ["claims-details", id],
    () => usersService.getClaimsDetails(id!),
    {
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
    }
  )

  const { data: claimsList, isLoading: loadingClaims } = useQuery(
    ["claims-list"],
    usersService.getClaims,
    {
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
    }
  )

  const claimsColumns: ColumnDef<claimsData>[] = [
    {
      accessorKey: "claimType",
      header: "Plan Information",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info: CellContext<claimsData, any>) => {
        return <Text>{formatToCurrency(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "totalClaims",
      header: "Total claims",
      cell: (info: CellContext<claimsData, any>) => {
        return <Text>{formatToCurrency(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "totalRemittance",
      header: "Total Remittance",
      cell: (info: CellContext<claimsData, any>) => {
        return <Text>{formatToCurrency(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "lastPaymentDate",
      header: "Last Payment Date",
      cell: (info: CellContext<claimsData, any>) => {
        return <Text>{formatDate(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "supportingDocuments",
      header: "Documents",
      cell: (info: CellContext<claimsData, any>) => {
        const images: string[] = info
          .getValue()
          .map((document: { url: string }) => document.url)

        return <ViewReceiptModal images={images} />
      },
    },
    ...(claimsDetails?.data.status !== "Approved" &&
    claimsDetails?.data.status !== "Rejected"
      ? [
          {
            accessorKey: "status",
            header: "Actions",
            cell: () => (
              <Flex gap="10px">
                <AcceptClaimModal
                  customerId={claimsDetails?.data.customerDetails.id}
                  claimId={claimsDetails?.data.id}
                />
                <RejectClaimModal
                  customerId={claimsDetails?.data.customerDetails.id}
                  claimId={claimsDetails?.data.id}
                />
              </Flex>
            ),
          },
        ]
      : []),
  ]

  const otherClaimsColumns: ColumnDef<otherClaimsData>[] = [
    {
      accessorKey: "claimType",
      header: "Plan Information",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: (info: CellContext<otherClaimsData, any>) => {
        return <Text>{formatToCurrency(info.getValue())}</Text>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info: CellContext<otherClaimsData, any>) => (
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
                : info.getValue().toLowerCase() === "processing"
                ? "#FEF0C7"
                : info.getValue().toLowerCase() === "disapproved"
                ? "#F7CECA"
                : info.getValue().toLowerCase() === "rejected"
                ? "#F7CECA"
                : "#DCDBDD"
            }
            color={
              info.getValue().toLowerCase() === "approved"
                ? "#027A48"
                : info.getValue().toLowerCase() === "processing"
                ? "#DC6803"
                : info.getValue().toLowerCase() === "disapproved"
                ? "#D92D20"
                : info.getValue().toLowerCase() === "rejected"
                ? "#D92D20"
                : "#202020"
            }
            h="100%"
            p="4px 8px"
          >
            {info.getValue().toLowerCase() === "disapproved"
              ? "Rejected"
              : info.getValue()}
          </Text>
        </Flex>
      ),
    },
    {
      accessorKey: "reason",
      cell: (info: CellContext<otherClaimsData, any>) => (
        <Tooltip label={info.getValue()}>
          <Text
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            maxWidth="60px"
            overflow="hidden"
          >
            {info.getValue()}
          </Text>
        </Tooltip>
      ),
    },
    {
      accessorKey: "supportingDocuments",
      header: "Documents",
      cell: (info: CellContext<otherClaimsData, any>) => {
        const images: string[] = info
          .getValue()
          .map((document: { url: string }) => document.url)

        return <ViewReceiptModal images={images} />
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Initiated",
      cell: (info: CellContext<otherClaimsData, any>) => {
        return <Text>{formatDate(info.getValue())}</Text>
      },
    },
  ]

  return (
    <Box bgColor="#f6f6f6" h="100vh">
      <Flex sx={agentStatus} h={{ base: "68px" }}>
        <Flex sx={spaceFlex}>
          <Text sx={agentName}>
            {claimsDetails?.data.customerDetails.customerName} |{" "}
            {claimsDetails?.data.customerDetails.customerCode}
          </Text>
        </Flex>

        <Button
          variant="app-primary"
          fontWeight="normal"
          size="sm"
          rightIcon={<BsEye />}
          onClick={() => navigate(`/customers/${claimsDetails?.data?.id}`)}
        >
          View Customer
        </Button>
      </Flex>
      <Box sx={{ m: "20px" }}>
        <Box mb={"24px"} p="20px" bg="#fff">
          <StyledTable
            data={claimsDetails?.data && [claimsDetails?.data]}
            columns={claimsColumns}
            loading={isLoading}
            paddingBottom="23px"
          />
        </Box>

        <Flex justifyContent={"space-between"} mb="20px" gap="20px">
          <Box bgColor={"white"} w="40%" px="24px" py="20px">
            <Text
              fontWeight={700}
              fontSize="20px"
              color={"brand.primary"}
              mb="12px"
            >
              Claim Reason
            </Text>
            <Text fontWeight={400} fontSize="14px">
              {claimsDetails?.data.reason}
            </Text>
          </Box>
          <Box bgColor={"white"} w="60%" px="20px" py="20px">
            <Text
              fontWeight={700}
              fontSize="20px"
              color={"brand.primary"}
              mb="12px"
            >
              Claim History
            </Text>

            {claimsDetails?.data?.claimHistory?.map(
              (
                { id, event, message, createdAt }: { [K: string]: string },
                index: number
              ) => (
                <VStack key={id} align="start">
                  <Stack direction="row" spacing={4} align="center" mb="24px">
                    <Box position="relative">
                      <Box
                        w="26px"
                        h="26px"
                        bgColor={"brand.primary"}
                        borderRadius="50%"
                      ></Box>
                      {index > 0 && (
                        <Box
                          position="absolute"
                          border="1px dashed"
                          borderColor={"brand.primary"}
                          h="24px"
                          bottom="100%"
                          left="45%"
                        ></Box>
                      )}
                    </Box>
                    <Box minWidth="80px">
                      <Text
                        key={id}
                        width="fit-content"
                        fontWeight={600}
                        px="8px"
                        py="4px"
                        bgColor={historyColorMap[event.toLowerCase()]?.bg}
                        color={historyColorMap[event.toLowerCase()]?.color}
                        borderRadius="4px"
                        textAlign="center"
                        fontSize="12px"
                      >
                        {event}
                      </Text>
                    </Box>
                    <Box width="200px">
                      <Tooltip label={message}>
                        <Text
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          maxWidth="200px"
                          overflow="hidden"
                          fontSize="12px"
                          fontWeight={600}
                        >
                          {message}
                        </Text>
                      </Tooltip>
                    </Box>
                    <Text
                      key={id}
                      fontSize="12px"
                      color={"#2D4875"}
                      marginLeft="auto"
                    >
                      {createdAt && format(new Date(createdAt), "dd MM yyyy")}
                    </Text>
                  </Stack>
                </VStack>
              )
            )}
          </Box>
        </Flex>

        <Box mt="10px" p="20px" bg="#fff">
          <Text
            sx={{
              color: "brand.primary",
              pb: "12px",
              fontSize: "20px",
              fontWeight: 700,
              fontStyle: "normal",
              textTransform: "capitalize",
            }}
          >
            Other Claims by {claimsDetails?.data.customerDetails.customerName}
          </Text>
          <StyledTable
            data={
              claimsList?.data &&
              claimsList?.data?.filter((item: any) => {
                return (
                  item?.customerName ===
                    claimsDetails?.data.customerDetails.customerName &&
                  item?.id !== claimsDetails?.data.id
                )
              })
            }
            columns={otherClaimsColumns}
            paddingBottom="23px"
            loading={loadingClaims}
            pagination={{
              pageSize: tableParams?.pageSize,
              currentPage: tableParams?.page,
              totalPages: claimsList?.pagination?.numberOfPages,
              updateFn: _updateParams,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ClaimsDetails
