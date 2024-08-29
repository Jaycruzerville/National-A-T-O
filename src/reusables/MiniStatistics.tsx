// Chakra imports
// Chakra imports
import PropTypes from "prop-types"
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  BoxProps,
} from "@chakra-ui/react"
// Custom components
import Card from "@/reusables/Card.js"
// Custom icons
import React from "react"

interface MiniStatisticsProps extends BoxProps {
  // Make sure to extend BoxProps
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  name: string
  growth?: string | number
  value: string | number
}

const MiniStatistics: React.FC<MiniStatisticsProps> = ({
  startContent,
  endContent,
  name,
  growth,
  value,
  ...rest
}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white")
  const textColorSecondary = "secondaryGray.600"

  return (
    <Card py="15px" {...rest}>
      <Flex
        my="auto"
        h="100%"
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}
      >
        {startContent}

        <Stat my="auto" ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight="100%"
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}
          >
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "2xl",
            }}
          >
            {value}
          </StatNumber>
          {growth ? (
            <Flex align="center">
              <Text color="green.500" fontSize="xs" fontWeight="700" me="5px">
                {growth}
              </Text>
              <Text color="secondaryGray.600" fontSize="xs" fontWeight="400">
                since last month
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms="auto" w="max-content">
          {endContent}
        </Flex>
      </Flex>
    </Card>
  )
}

MiniStatistics.propTypes = {
  startContent: PropTypes.node,
  endContent: PropTypes.node,
  name: PropTypes.string.isRequired,
  growth: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

// Define default props for optional props
MiniStatistics.defaultProps = {
  startContent: null,
  endContent: null,
  growth: "",
}

export default MiniStatistics
