import { Box, Flex, Text, Image, Spacer } from "@chakra-ui/react"
import User from "@/assets/lbUser.png"
import { ReactComponent as TrophyIcon } from "@/assets/trophy.svg"

const Leaderboard = ({
  count = 6,
  title,
}: {
  count?: number
  title: string
}) => {
  return (
    <Box borderRadius="8px" p="32px 24px" bg="#FCFCFC">
      <Text mb="24px" color="#292638" fontWeight={700}>
        {title}
      </Text>
      {Array.from(new Array(count)).map((item, index) => (
        <Flex
          key={item}
          bg="#fff"
          borderRadius="9px"
          p="15px 24px"
          width="100%"
          _hover={{ background: "#071655" }}
          role="group"
          cursor="pointer"
          align="center"
        >
          <Image src={User} width="30px" height="30px" borderRadius="50%" />
          <Box ml="14px">
            <Text
              mb="1"
              fontSize="12px"
              color="#292638"
              _hover={{ color: "#fff" }}
              _groupHover={{ color: "#fff" }}
            >
              Shade Badmus
            </Text>
            <Text
              mb="1"
              fontSize="12px"
              fontWeight={700}
              color="#071655"
              _hover={{ color: "#fff" }}
              _groupHover={{ color: "#fff" }}
            >
              NGN {new Intl.NumberFormat("en-GB").format(3000000 ?? 0)}
            </Text>
          </Box>
          <Spacer />
          <Box>
            {index === 0 ? (
              <TrophyIcon />
            ) : (
              <Text
                color="#071655"
                fontSize="12px"
                fontWeight={700}
                _hover={{ color: "#fff" }}
                _groupHover={{ color: "#fff" }}
              >
                {index + 1}
              </Text>
            )}
          </Box>
        </Flex>
      ))}
    </Box>
  )
}

export default Leaderboard
