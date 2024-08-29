import { Box } from "@chakra-ui/react"

export const SwitchStatus = (status: string, content?: string) => {
  switch (status) {
    case "Successful":
      return (
        <Box
          bgColor="#9BFDD4"
          p="4px 8px"
          borderRadius="4px"
          fontSize="12px"
          color="#027A48"
          width="fit-content"
          fontWeight="500"
        >
          {content ?? "Successful"}
        </Box>
      )
    case "Success":
      return (
        <Box
          bgColor="#9BFDD4"
          p="4px 8px"
          borderRadius="4px"
          fontSize="12px"
          color="#027A48"
          width="fit-content"
          fontWeight="500"
        >
          {content ?? "Successful"}
        </Box>
      )
    case "Failed":
      return (
        <Box
          bgColor="#F7CECA"
          p="4px 8px"
          borderRadius="4px"
          fontSize="12px"
          color="#D92D20"
          width="fit-content"
          fontWeight="500"
        >
          {content ?? "Failed"}
        </Box>
      )
    default:
      return (
        <Box
          bgColor="#FEF0C7"
          p="4px 8px"
          borderRadius="4px"
          width="fit-content"
          fontSize="12px"
          color="#DC6803"
          fontWeight="500"
        >
          {content ?? "Pending"}
        </Box>
      )
  }
}
