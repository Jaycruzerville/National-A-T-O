/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Flex,
  Text,
  useToast,
  Stack,
  VStack,
  Tooltip,
  Image,
} from "@chakra-ui/react"
import { BsEye } from "react-icons/bs"
import { RiMotorbikeFill } from "react-icons/ri" // Motorbike
import { FaTaxi, FaBusAlt } from "react-icons/fa" // Taxi, Bus
import { MdElectricRickshaw } from "react-icons/md" // Rickshaw
import { CellContext, ColumnDef } from "@tanstack/react-table"
import StyledTable from "@/reusables/StyledTable"
import ViewReceiptModal from "@/reusables/ViewReceiptModal"
import RejectClaimModal from "./components/RejectClaimModal" // Import RejectClaimModal
import { useNavigate, useParams } from "react-router-dom"
import { formatDate } from "@/utils/formatDate"
import usersService from "@/services/usersServices"
import { format } from "date-fns"

interface HistoryColorMap {
  [key: string]: {
    bg: string
    color: string
  }
}

const historyColorMap: HistoryColorMap = {
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

// Helper function to get the appropriate vehicle icon with customizable size
const getVehicleIcon = (vehicleType: any, size = 27) => {
  switch (vehicleType) {
    case "Motorbike":
      return <RiMotorbikeFill size={size} />
    case "Taxi":
      return <FaTaxi size={size} />
    case "Bus":
      return <FaBusAlt size={size} />
    case "Tricycle":
      return <MdElectricRickshaw size={size} />
    default:
      return null
  }
}

const DriverSubmissionDetails: React.FC = () => {
  const { id: submissionId } = useParams<{ id: string }>()
  const [submissionData, setSubmissionData] = useState<any>(null)
  const [customerSubmissions, setCustomerSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingCustomerSubmissions, setLoadingCustomerSubmissions] =
    useState(true)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!submissionId) {
      toast({
        title: "Error",
        description: "No submission ID found in the URL.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      navigate("/driver-submissions")
      return
    }

    const fetchSubmissionDetails = async () => {
      try {
        const response = await usersService.getDriverSubmissionDetails(
          submissionId
        )

        if (response) {
          setSubmissionData(response)
          fetchCustomerSubmissions(response.userId._id) // Dynamically fetch customer submissions by userId
        } else {
          toast({
            title: "Error",
            description: "No data found for this submission.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load submission details.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      } finally {
        setLoading(false)
      }
    }

    const fetchCustomerSubmissions = async (userId: string) => {
      try {
        const response = await usersService.getCustomerClaims(userId, {
          pageNo: 0,
          pageSize: 10,
        })
        if (response && response.data?.content) {
          setCustomerSubmissions(response.data.content)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load customer submissions.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      } finally {
        setLoadingCustomerSubmissions(false)
      }
    }

    fetchSubmissionDetails()
  }, [submissionId, toast, navigate])

  const handleApprove = async () => {
    try {
      await usersService.approveSubmission(submissionId)
      toast({
        title: "Success",
        description: "Submission approved successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      // Optionally refetch data after approval
      setSubmissionData({ ...submissionData, status: "approved" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve the submission",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    }
  }

  const submissionColumns: ColumnDef<any>[] = [
    {
      accessorKey: "fullName",
      header: "Driver Name",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "street",
      header: "Street Name",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "lga",
      header: "LGA",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "licenseExpiryDate",
      header: "License Expiry Date",
      cell: (info: CellContext<any, any>) => (
        <Text>{formatDate(info.getValue())}</Text>
      ),
    },
    {
      accessorKey: "vehiclePlateNumber",
      header: "Vehicle Plate Number",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "driverImage",
      header: "Documents",
      cell: (info: CellContext<any, any>) => {
        const baseUrl = "http://localhost:5000"
        const buildUrl = (img: string) =>
          img.startsWith("http") ? img : `${baseUrl}/${img}`

        const documents = [
          ...(Array.isArray(info.row.original?.vehicleImages)
            ? info.row.original?.vehicleImages.map(buildUrl)
            : []),
          ...(Array.isArray(info.row.original?.driverLicenseImage)
            ? info.row.original?.driverLicenseImage.map(buildUrl)
            : []),
          ...(Array.isArray(info.row.original?.vehicleRegistrationImage)
            ? info.row.original?.vehicleRegistrationImage.map(buildUrl)
            : []),
          ...(Array.isArray(info.row.original?.driverImage)
            ? info.row.original?.driverImage.map(buildUrl)
            : []),
        ].filter(Boolean)

        return documents.length > 0 ? (
          <ViewReceiptModal images={documents} />
        ) : (
          <Text>No documents available</Text>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: () => {
        if (
          submissionData?.status === "approved" ||
          submissionData?.status === "rejected"
        ) {
          return <Text>{submissionData?.status}</Text>
        }
        return (
          <Flex gap="10px">
            <Button
              bgColor={"#9BFDD4"}
              borderRadius="4px"
              fontSize="12px"
              color={"#027A48"}
              fontWeight="500"
              h={"26px"}
              onClick={handleApprove}
            >
              Approve
            </Button>
            <RejectClaimModal claimId={submissionId} />
          </Flex>
        )
      },
    },
  ]

  const customerSubmissionsColumns: ColumnDef<any>[] = [
    {
      accessorKey: "submissionId",
      header: "Submission ID",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "vehicleType",
      header: "Vehicle Type",
      cell: (info: CellContext<any, any>) => (
        <Flex alignItems="center" gap="8px">
          {getVehicleIcon(info.getValue())}
          <Text>{info.getValue()}</Text>
        </Flex>
      ),
    },
    {
      accessorKey: "submissionStatus",
      header: "Status",
      cell: (info: CellContext<any, any>) => (
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
              historyColorMap[info.getValue().toLowerCase()]?.bg || "#DCDBDD"
            }
            color={
              historyColorMap[info.getValue().toLowerCase()]?.color || "#202020"
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
      accessorKey: "createDate",
      header: "Date Created",
      cell: (info: CellContext<any, any>) => (
        <Text>{formatDate(info.getValue())}</Text>
      ),
    },
  ]

  return (
    <Box bgColor="#f6f6f6" h="100vh">
      <Flex
        justifyContent="space-between"
        p="20px"
        bgColor="brand.bgLight"
        alignItems="center"
        gap="10px"
      >
        <Text fontSize="20px" fontWeight={700} color="#0B1023">
          {submissionData?.fullName} |{" "}
          {submissionData?.vehiclePlateNumber || "No Vehicle Assigned"}
        </Text>
        <Button
          variant="app-primary"
          fontWeight="normal"
          size="sm"
          rightIcon={<BsEye />}
          onClick={() => navigate(`/customers/${submissionData?.userId?._id}`)}
          isDisabled={!submissionData?.userId?._id}
        >
          View Customer
        </Button>
      </Flex>

      <Box sx={{ m: "20px" }}>
        <Box mb={"24px"} p="20px" bg="#fff">
          <StyledTable
            data={submissionData ? [submissionData] : []}
            columns={submissionColumns}
            loading={loading}
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
              Submission Reason
            </Text>
            <Flex alignItems="center" gap="8px">
              {getVehicleIcon(submissionData?.vehicleType)}
              <Text fontWeight={600} fontSize="14px">
                {submissionData?.vehicleType}
              </Text>
            </Flex>
            <Text fontWeight={600} mt="8px" fontSize="14px">
              Vehicle Make: {submissionData?.vehicleMake || "N/A"}
            </Text>
            <Text fontWeight={600} mt="4px" fontSize="14px">
              VIN: {submissionData?.vin || "N/A"}
            </Text>
            {submissionData?.driverImage && (
              <Box mt="12px">
                <Text fontWeight={600} fontSize="14px" mb="4px">
                  Driver Image:
                </Text>
                <Image
                  src={
                    Array.isArray(submissionData?.driverImage)
                      ? `${
                          submissionData?.driverImage[0].startsWith("http")
                            ? ""
                            : "http://localhost:5000/"
                        }${submissionData?.driverImage[0]}`
                      : `${
                          submissionData?.driverImage.startsWith("http")
                            ? ""
                            : "http://localhost:5000/"
                        }${submissionData?.driverImage}`
                  }
                  alt="Driver"
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="8px"
                />
              </Box>
            )}
          </Box>

          <Box bgColor={"white"} w="60%" px="20px" py="20px">
            <Text
              fontWeight={700}
              fontSize="20px"
              color={"brand.primary"}
              mb="12px"
            >
              Submission History
            </Text>
            {submissionData ? (
              <VStack align="start">
                {/* Initial status - Submission Initiated */}
                <Stack direction="row" spacing={4} align="center" mb="24px">
                  <Box position="relative">
                    <Box
                      w="26px"
                      h="26px"
                      bgColor={"brand.primary"}
                      borderRadius="50%"
                    />
                  </Box>
                  <Box minWidth="80px">
                    <Text
                      width="fit-content"
                      fontWeight={600}
                      px="8px"
                      py="4px"
                      bgColor={historyColorMap["initiated"]?.bg}
                      color={historyColorMap["initiated"]?.color}
                      borderRadius="4px"
                      textAlign="center"
                      fontSize="12px"
                    >
                      Initiated
                    </Text>
                  </Box>
                  <Box width="200px">
                    <Tooltip label="Submission Initiated">
                      <Text
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        maxWidth="200px"
                        overflow="hidden"
                        fontSize="12px"
                        fontWeight={600}
                      >
                        Submission Initiated
                      </Text>
                    </Tooltip>
                  </Box>
                  <Text fontSize="12px" color={"#2D4875"} marginLeft="auto">
                    {submissionData?.submittedAt &&
                      format(
                        new Date(submissionData?.submittedAt),
                        "dd MM yyyy"
                      )}
                  </Text>
                </Stack>

                {/* Approved status */}
                {submissionData?.status === "approved" &&
                  submissionData?.approvedAt && (
                    <Stack direction="row" spacing={4} align="center" mb="24px">
                      <Box position="relative">
                        <Box
                          w="26px"
                          h="26px"
                          bgColor={"#9BFDD4"}
                          borderRadius="50%"
                        />
                      </Box>
                      <Box minWidth="80px">
                        <Text
                          width="fit-content"
                          fontWeight={600}
                          px="8px"
                          py="4px"
                          bgColor={historyColorMap["approved"]?.bg}
                          color={historyColorMap["approved"]?.color}
                          borderRadius="4px"
                          textAlign="center"
                          fontSize="12px"
                        >
                          Approved
                        </Text>
                      </Box>
                      <Box width="200px">
                        <Tooltip label="Submission Approved">
                          <Text
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            maxWidth="200px"
                            overflow="hidden"
                            fontSize="12px"
                            fontWeight={600}
                          >
                            Submission Approved
                          </Text>
                        </Tooltip>
                      </Box>
                      <Text fontSize="12px" color={"#2D4875"} marginLeft="auto">
                        {submissionData?.approvedAt &&
                          format(
                            new Date(submissionData?.approvedAt),
                            "dd MM yyyy"
                          )}
                      </Text>
                    </Stack>
                  )}

                {/* Rejected status */}
                {submissionData?.status === "rejected" &&
                  submissionData?.rejectedAt && (
                    <Stack direction="row" spacing={4} align="center" mb="24px">
                      <Box position="relative">
                        <Box
                          w="26px"
                          h="26px"
                          bgColor={"#F7CECA"}
                          borderRadius="50%"
                        />
                      </Box>
                      <Box minWidth="80px">
                        <Text
                          width="fit-content"
                          fontWeight={600}
                          px="8px"
                          py="4px"
                          bgColor={historyColorMap["rejected"]?.bg}
                          color={historyColorMap["rejected"]?.color}
                          borderRadius="4px"
                          textAlign="center"
                          fontSize="12px"
                        >
                          Rejected
                        </Text>
                      </Box>
                      <Box width="200px">
                        <Tooltip label="Submission Rejected">
                          <Text
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            maxWidth="200px"
                            overflow="hidden"
                            fontSize="12px"
                            fontWeight={600}
                          >
                            Submission Rejected
                          </Text>
                        </Tooltip>
                      </Box>
                      <Text fontSize="12px" color={"#2D4875"} marginLeft="auto">
                        {submissionData?.rejectedAt &&
                          format(
                            new Date(submissionData?.rejectedAt),
                            "dd MM yyyy"
                          )}
                      </Text>
                    </Stack>
                  )}
              </VStack>
            ) : (
              <Text>No history available</Text>
            )}
          </Box>
        </Flex>

        <Box mt="10px" p="20px" bg="#fff">
          <Text
            fontWeight={700}
            fontSize="20px"
            color="brand.primary"
            mb="12px"
          >
            Other Submissions by {submissionData?.fullName}
          </Text>
          <StyledTable
            data={customerSubmissions}
            columns={customerSubmissionsColumns}
            loading={loadingCustomerSubmissions}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DriverSubmissionDetails
