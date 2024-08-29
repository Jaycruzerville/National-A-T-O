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
} from "@chakra-ui/react"
import { BsEye } from "react-icons/bs"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import StyledTable from "@/reusables/StyledTable"
import AcceptClaimModal from "./components/AcceptClaimModal"
import RejectClaimModal from "./components/RejectClaimModal"
import ViewReceiptModal from "@/reusables/ViewReceiptModal"
import { useNavigate, useParams } from "react-router-dom"
import { formatDate } from "@/utils/formatDate"
import SuperAdminService from "@/services/superAdminServices"
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

const ClaimsDetails: React.FC = () => {
  const { id: applicationId } = useParams<{ id: string }>()
  const [applicationData, setApplicationData] = useState<any>(null)
  const [customerApplications, setCustomerApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingCustomerApplications, setLoadingCustomerApplications] =
    useState(true)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (!applicationId) {
      toast({
        title: "Error",
        description: "No application ID found in the URL.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      navigate("/claims")
      return
    }

    const fetchApplicationDetails = async () => {
      try {
        const response = await SuperAdminService.getClaimsDetails(applicationId)
        if (response && response.data) {
          setApplicationData(response.data)
          // Hardcoding customerId to 22 for now
          fetchCustomerApplications("22")
        } else {
          toast({
            title: "Error",
            description: "No data found for this application.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load application details.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      } finally {
        setLoading(false)
      }
    }

    const fetchCustomerApplications = async (customerId: string) => {
      try {
        const response = await SuperAdminService.getCustomerApplications(
          customerId,
          {
            pageNo: 0,
            pageSize: 10,
          }
        )
        if (response && response.data?.content) {
          setCustomerApplications(response.data.content)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load customer applications.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      } finally {
        setLoadingCustomerApplications(false)
      }
    }

    fetchApplicationDetails()
  }, [applicationId, toast, navigate])

  const claimsColumns: ColumnDef<any>[] = [
    {
      accessorKey: "property.propertyName",
      header: "Property Name",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "property.propertyStreetName",
      header: "Street Name",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "property.city",
      header: "City",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "property.state",
      header: "State",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "property.surveyPlanNumber",
      header: "Survey Plan Number",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "property.purchaseDate",
      header: "Purchase Date",
      cell: (info: CellContext<any, any>) => (
        <Text>{formatDate(info.getValue())}</Text>
      ),
    },
    {
      accessorKey: "documents",
      header: "Documents",
      cell: () => {
        const documents = [
          ...(applicationData?.property?.propertyPictures || []),
          applicationData?.property?.certificateOfOccupancy,
        ].filter(Boolean)

        return documents.length > 0 ? (
          <ViewReceiptModal images={documents} />
        ) : (
          <Text>No documents available</Text>
        )
      },
    },
    {
      accessorKey: "applicationStatus",
      header: "Status",
      cell: () => {
        if (
          applicationData?.applicationStatus === "Approved" ||
          applicationData?.applicationStatus === "Rejected"
        ) {
          return <Box></Box>
        }
        return (
          <Flex gap="10px">
            <AcceptClaimModal
              customerId={applicationData?.property?.id}
              claimId={applicationData?.applicationId}
            />
            <RejectClaimModal
              customerId={applicationData?.property?.id}
              claimId={applicationData?.applicationId}
            />
          </Flex>
        )
      },
    },
  ]

  const customerApplicationsColumns: ColumnDef<any>[] = [
    {
      accessorKey: "applicationId",
      header: "Application ID",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "applicationType",
      header: "Application Type",
      cell: (info: CellContext<any, any>) => <Text>{info.getValue()}</Text>,
    },
    {
      accessorKey: "applicationStatus",
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
          {applicationData?.applicantName} |{" "}
          {applicationData?.assignedPropertyId || "No Property Assigned"}
        </Text>
        <Button
          variant="app-primary"
          fontWeight="normal"
          size="sm"
          rightIcon={<BsEye />}
          onClick={() =>
            navigate(`/customers/${applicationData?.property?.id}`)
          }
          isDisabled={!applicationData?.property?.id}
        >
          View Customer
        </Button>
      </Flex>

      <Box sx={{ m: "20px" }}>
        {/* First Table */}
        <Box mb={"24px"} p="20px" bg="#fff">
          <StyledTable
            data={applicationData ? [applicationData] : []}
            columns={claimsColumns}
            loading={loading}
            paddingBottom="23px"
          />
        </Box>

        {/* Claim Reason and Claim History */}
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
              {applicationData?.applicationType}
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
            {applicationData ? (
              <VStack align="start">
                <Stack direction="row" spacing={4} align="center" mb="24px">
                  <Box position="relative">
                    <Box
                      w="26px"
                      h="26px"
                      bgColor={"brand.primary"}
                      borderRadius="50%"
                    ></Box>
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
                    <Tooltip label="Claim Initiated">
                      <Text
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        maxWidth="200px"
                        overflow="hidden"
                        fontSize="12px"
                        fontWeight={600}
                      >
                        Claim Initiated
                      </Text>
                    </Tooltip>
                  </Box>
                  <Text fontSize="12px" color={"#2D4875"} marginLeft="auto">
                    {applicationData?.createDate &&
                      format(
                        new Date(applicationData?.createDate),
                        "dd MM yyyy"
                      )}
                  </Text>
                </Stack>
              </VStack>
            ) : (
              <Text>No history available</Text>
            )}
          </Box>
        </Flex>

        {/* Customer Applications Table */}
        <Box mt="10px" p="20px" bg="#fff">
          <Text
            fontWeight={700}
            fontSize="20px"
            color="brand.primary"
            mb="12px"
          >
            Other Applications by {applicationData?.applicantName}
          </Text>
          <StyledTable
            data={customerApplications}
            columns={customerApplicationsColumns}
            loading={loadingCustomerApplications}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ClaimsDetails
