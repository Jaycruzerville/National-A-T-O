import { Text, Box, Flex, Container, Icon } from "@chakra-ui/react"
import PFP from "@/assets/profilePic.svg"
import { format } from "date-fns"

type agentCardType = {
  userCount: number | null
  lastActive: string
  dateCreated: string
  editModal: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>
  position: string
}

import { ReactComponent as phoneImage } from "@/assets/agentCardPhone.svg"
import { ReactComponent as emailImage } from "@/assets/agentCardEmail.svg"
import { ReactComponent as addressImage } from "@/assets/agentCardAddress.svg"
import { useEffect } from "react"

const AgentCard = ({
  data,
  userCount,
  lastActive,
  dateCreated,
  editModal,
  position,
}: agentCardType) => {
  const agentCardContainer = {
    width: "100%",
    bg: "white",
    borderRadius: "12px",
    py: "24px",
    px: "16px",
  }
  const agentImage = {
    width: "120px",
    height: "120px",
    margin: "0 auto",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
  const centered = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }

  const agentName = {
    mt: "4px",
    color: "#003E51",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "28px",
  }
  const positionStyle = {
    color: "#000",
    opacity: "0.5",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
  }
  const agentInfo = {
    mt: "24px",
    color: "#003E51",
    fontWeight: 700,
    lineHeight: "28px",
  }

  const moreInfoText = {
    color: "#003E51",
    fontWeight: 700,
    lineHeight: "28px",
  }

  const agentInfoFlex = {
    marginTop: "20px",
  }

  const editDetails = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }
  const editDetailsBtn = {
    px: "15.5px",
    py: "4px",
    border: "1px solid #071655",
    display: "inline-block",
    width: "fit-content",
    margin: "28px auto",
    cursor: "pointer",
    color: "brand.primary",
    fontWeight: 700,
    lineHeight: "28px",
    borderRadius: "4px",
  }

  const agentDetailsDark = {
    mt: "10px",
    color: "#000",
    fontWeight: 400,
    lineHeight: "28px",
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
  }, [data])

  return (
    <Container sx={agentCardContainer}>
      <Box sx={centered}>
        <Box sx={agentImage}>
          <img
            src={data?.profilePicture ?? PFP}
            alt="pfp"
            style={{ height: 120, width: 120 }}
          />
        </Box>

        <Text textStyle="headText" sx={agentName} textTransform="capitalize">
          {data?.PropertyName
            ? data.PropertyName
            : `${data?.firstName ?? `-`} ${data?.lastName ?? `-`}`}
        </Text>
        <Text textStyle="headText" sx={positionStyle}>
          {position}
        </Text>
      </Box>
      <Box sx={agentInfo}>
        <Flex sx={agentInfoFlex} gap="20px">
          <Icon as={emailImage} height="24px" width="24px" />
          <Text textStyle="headText">{data?.email ?? "-"}</Text>
        </Flex>
        <Flex sx={agentInfoFlex} gap="20px">
          <Icon as={phoneImage} height="24px" width="24px" />
          <Text textStyle="headText">{data?.phoneNumber ?? "-"}</Text>
        </Flex>
        <Flex sx={agentInfoFlex} gap="20px">
          <Icon as={addressImage} height="24px" width="24px" />
          <Text textStyle="headText">
            {data?.PropertyAddress
              ? data.PropertyAddress
              : data?.agentAddress?.state &&
                `${data?.agentAddress?.location ?? ``} ${
                  data?.agentAddress?.lga ?? ``
                } LGA, ${data?.agentAddress?.state ?? ``} State ${
                  data?.agentAddress?.country ?? ``
                }`}
          </Text>
        </Flex>
      </Box>
      {position !== "Property" && (
        <Box sx={editDetails} onClick={editModal}>
          <Text textStyle="headText" sx={editDetailsBtn}>
            Edit details
          </Text>
        </Box>
      )}
      {position === "Customer" ? (
        <Box>
          <Flex justifyContent="space-between">
            <Box>
              <Text textStyle="headText" sx={agentDetailsDark}>
                Date of Birth
              </Text>
              <Text textStyle="headText" sx={moreInfoText}>
                {data?.dob ? format(new Date(data?.dob), "dd MMMM yyyy") : "--"}
              </Text>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Text textStyle="headText" sx={agentDetailsDark}>
                Gender
              </Text>
              <Text
                textStyle="headText"
                sx={moreInfoText}
                textTransform="capitalize"
              >
                {data?.gender ? data?.gender.toLowerCase() : "--"}
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between">
            <Box>
              <Text textStyle="headText" sx={agentDetailsDark}>
                Last Date Active
              </Text>
              <Text textStyle="headText" sx={moreInfoText}>
                {lastActive
                  ? format(new Date(lastActive), "dd MMMM yyyy")
                  : "--"}
              </Text>
            </Box>
            <Box>
              <Text textStyle="headText" sx={agentDetailsDark}>
                Date Created
              </Text>
              <Text textStyle="headText" sx={moreInfoText}>
                {dateCreated
                  ? format(new Date(dateCreated), "dd MMMM yyyy")
                  : "--"}
              </Text>
            </Box>
          </Flex>
        </Box>
      ) : (
        <Flex sx={centered} gap="10px">
          <Box>
            <Text textStyle="headText" sx={agentDetailsDark}>
              Number of Users
            </Text>
            <Text textStyle="headText" sx={moreInfoText}>
              {new Intl.NumberFormat("en-GB").format(userCount ?? 0)}
            </Text>
          </Box>
          <Box>
            <Text textStyle="headText" sx={agentDetailsDark}>
              Last Active
            </Text>
            <Text textStyle="headText" sx={moreInfoText}>
              {lastActive && format(new Date(lastActive), "dd MMMM yyyy")}
            </Text>
          </Box>
          <Box>
            <Text textStyle="headText" sx={agentDetailsDark}>
              Date Created
            </Text>
            <Text textStyle="headText" sx={moreInfoText}>
              {dateCreated && format(new Date(dateCreated), "dd MMMM yyyy")}
            </Text>
          </Box>
        </Flex>
      )}
    </Container>
  )
}

export default AgentCard
