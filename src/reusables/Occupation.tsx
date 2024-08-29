import { Box, Text, Flex, Progress } from "@chakra-ui/react"

type OccupationType = {
  occupation: string
  occupationValue: number
}

const Occupation = ({ occupation, occupationValue }: OccupationType) => {
  const spaceFlex = {
    justifyContent: "end",
    alignItems: "center",
  }
  const gapFlex = {
    flexDirection: "column",
  }
  const occupationText = {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
    whiteSpace: "nowrap",
    color: "#1E2022",
  }

  return (
    <Box>
      <Flex sx={gapFlex}>
        <Flex sx={spaceFlex} w="100%" mt="1.5vh">
          <Text sx={occupationText}>{occupation}</Text>

          <Progress
            // colorScheme="brand"
            value={occupationValue}
            borderRadius="10px"
            w="80%"
            h="4px"
            max={5000}
            ml="4px"

            // bg="#EDEDED"
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Occupation
