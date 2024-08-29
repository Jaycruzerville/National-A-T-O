import { Box, Flex, Tag, Text, Link } from "@chakra-ui/react"
import { format } from "date-fns"
import { Link as RouteLink } from "react-router-dom"

interface Iclaim {
  id: string
  planType: string | null
  amount: number | null
  status: string | null
  createdAt: string | null
}

type ClaimsProp = {
  data: Iclaim[]
}

const ClaimsSnippet = ({ data }: ClaimsProp) => {
  return (
    <Box
      px="4"
      pt="5"
      pb="3"
      borderRadius="12px"
      bg="#fff"
      width="100%"
      mt="8px"
    >
      <Flex justify="space-between" align="baseline" color="#1A1A1A">
        <Text fontWeight={700} fontSize="20px" color="#071655">
          Claims
        </Text>
        <Link
          px="20px"
          py="4px"
          mb="28px"
          background="#071655"
          color="#fff"
          fontWeight={400}
          fontSize="14px"
          as={RouteLink}
          to="/claims"
          lineHeight="24px"
          borderRadius="8px"
          cursor="pointer"
        >
          View All
        </Link>
      </Flex>
      <Box minH="400px">
        {data
          ?.slice(0, 5)
          ?.map(({ planType, amount, status, createdAt }, index) => (
            <Flex
              key={index}
              mt="8px"
              justify="space-between"
              pb="8px"
              borderBottom="1px solid"
              borderColor="#B8B8B8"
            >
              <Box>
                <Text fontWeight={500} color="#202020">
                  {planType ?? `-`}
                </Text>
                <Text
                  color="#202020"
                  fontSize="14px"
                  fontWeight={200}
                  opacity="0.5"
                >
                  {createdAt && format(new Date(createdAt), "MMMM dd, yyyy")}
                </Text>
              </Box>
              <Box textAlign="right">
                <Text lineHeight="28px" fontWeight={500} color="#202020">
                  &#x20a6;
                  {new Intl.NumberFormat("en-GB", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(amount ?? 0)}
                </Text>
                {status && (
                  <Tag
                    colorScheme={status === "Pending" ? "pending" : "active"}
                  >
                    {status === "Pending" ? "Pending" : "Active"}
                  </Tag>
                )}
              </Box>
            </Flex>
          ))}
      </Box>
    </Box>
  )
}

export default ClaimsSnippet
