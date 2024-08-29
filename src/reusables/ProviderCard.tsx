import { Text, Box, Flex, Container } from "@chakra-ui/react"

type providerCardType = {
  name: string
  position: string
  email: string
  phone: string
  address: string
  lastActive: string
  dateCreated: string
  editModal: () => void
}

import phoneImage from "@/assets/agentCardPhone.svg"
import emailImage from "@/assets/agentCardEmail.svg"
import addressImage from "@/assets/agentCardAddress.svg"

const ProviderCard = ({
  name,
  email,
  //   position,
  phone,
  address,
  lastActive,
  dateCreated,
  editModal,
}: providerCardType) => {
  const providerCardContainer = {
    width: "100%",
    height: "857px",
    bg: "white",
    borderRadius: "12px",
    py: "24px",
    px: "16px",
  }

  const centered = {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }

  const providerName = {
    mt: "4px",
    color: "#003E51",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "28px",
  }
  const idStyle = {
    color: "brand.primary",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "24px",
  }
  const providerInfo = {
    mt: "24px",
    color: "#003E51",
    fontWeight: 700,
    // fontSize: "20px",
    lineHeight: "28px",
  }

  const infoText = {
    marginLeft: "22px",
  }

  const moreInfoText = {
    color: "#003E51",
    fontWeight: 700,
    // fontSize: "20px",
    lineHeight: "28px",
  }

  const providerInfoFlex = {
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
    margin: "24px auto",
    cursor: "pointer",
    color: "brand.primary",
    fontWeight: 700,
    // fontSize: "20px",
    lineHeight: "28px",
    borderRadius: "4px",
  }

  const providerDetailsDark = {
    mt: "20px",
    color: "#000",
    fontWeight: 400,
    // fontSize: "20px",
    lineHeight: "28px",
  }

  return (
    <Container sx={providerCardContainer}>
      <Box sx={centered}>
        <Text textStyle="headText" sx={providerName}>
          {name}
        </Text>
        <Text textStyle="headText" sx={idStyle}>
          {/* {position} */}
          ID3876W
        </Text>
      </Box>
      <Box sx={providerInfo}>
        <Flex sx={providerInfoFlex}>
          <img src={emailImage} alt="" />
          <Text textStyle="headText" sx={infoText}>
            {email}
          </Text>
        </Flex>
        <Flex sx={providerInfoFlex}>
          <img src={phoneImage} alt="" />
          <Text textStyle="headText" sx={infoText}>
            {phone}
          </Text>
        </Flex>
        <Flex sx={providerInfoFlex}>
          <img src={addressImage} alt="" />
          <Text textStyle="headText" sx={infoText}>
            {address}
          </Text>
        </Flex>
      </Box>
      <Box sx={editDetails} onClick={editModal}>
        <Text textStyle="headText" sx={editDetailsBtn}>
          Edit details
        </Text>
      </Box>
      <Flex sx={centered} gap="0px">
        <Box>
          <Text textStyle="headText" sx={providerDetailsDark}>
            Last Date Active
          </Text>
          <Text textStyle="headText" sx={moreInfoText}>
            {lastActive}
          </Text>
        </Box>
        <Box>
          <Text textStyle="headText" sx={providerDetailsDark}>
            Date Created
          </Text>
          <Text textStyle="headText" sx={moreInfoText}>
            {dateCreated}
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}

export default ProviderCard
