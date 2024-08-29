import {
  Text,
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Flex,
  Image,
  Icon,
  useTheme,
} from "@chakra-ui/react"

import cardCircles from "@/assets/cardCircles.svg"
import lightCardCircles from "@/assets/lightCardCircles.svg"
import cardSquares from "@/assets/cardSquares.svg"
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi"
import { useState, useEffect } from "react"

type statCardType = {
  icon: string
  text: string
  value: string
  percentage: number
  theme?: string | null
  width?: string | null
}

const StatCards = ({ text, value, percentage, theme, width }: statCardType) => {
  const chakraTheme = useTheme()
  const centerFlex = {
    justifyContent: "center",
    alignItems: "center",
  }
  const cardHeaderText = {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "28px",
    letterSpacing: "-0.6px",
    // color:"brand.primary",
  }

  const cardValueText = {
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "4px",
    // lineHeight: "40px",
    color: "#00000",
    mt: "2px",
  }

  const percentageFlex = {
    justifyContent: "flex-start",
    alignItems: "baseline",
    mt: "4px",
  }

  const percentageText = {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "24px",
    paddingLeft: "8px",
  }

  const cardPercentage = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "14px",
    lineHeight: "24px",
  }

  const cardBgImg = {
    position: "absolute",
    bottom: "0",
    right: "0",
  }

  const [monetary, setMonetary] = useState(false)
  useEffect(() => {
    if (text.includes("value")) {
      setMonetary(true)
    } else {
      setMonetary(false)
    }
  })

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      py="21px"
      px="24px"
      boxShadow="none"
      w={{ base: width ? "50%" : "32%" }}
      h={{ base: "137px" }}
      borderRadius="12px"
      style={{
        background:
          theme === "light" ? "#fff" : chakraTheme.colors.brand.primary,
        border: `1px solid ${chakraTheme.colors.brand.primary}`,
        color: theme === "light" ? chakraTheme.colors.brand.primary : "#fff",
      }}
    >
      <Flex sx={centerFlex}></Flex>

      <Stack>
        <CardBody p="0px">
          <Heading
            sx={cardHeaderText}
            textStyle="headText"
            textTransform="capitalize"
          >
            {text}
          </Heading>

          <Text textStyle="headText" sx={cardValueText}>
            {value}
          </Text>

          <Flex p="0px" mt="0px" sx={percentageFlex} alignItems="baseline">
            <Box
              sx={cardPercentage}
              color={percentage > 0 ? "#57C7A1" : "#D02F44"}
            >
              {`${percentage}%`}{" "}
              <Icon
                as={percentage > 0 ? FiArrowUpRight : FiArrowDownLeft}
                color={percentage > 0 ? "#57C7A1" : "#D02F44"}
              />
            </Box>
            <Text textStyle="headText" sx={percentageText}>
              Since last month
            </Text>
          </Flex>
          {!monetary && theme === "light" && (
            <Image src={lightCardCircles} alt="" sx={cardBgImg} />
          )}
          {!monetary && theme !== "light" && (
            <Image src={cardCircles} alt="" sx={cardBgImg} />
          )}
          {monetary && <Image src={cardSquares} alt="" sx={cardBgImg} />}
        </CardBody>
      </Stack>
    </Card>
  )
}

export default StatCards
