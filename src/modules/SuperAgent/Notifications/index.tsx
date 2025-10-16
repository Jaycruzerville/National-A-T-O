import NotificationNumber from "@/reusables/NotificationNumber"
import { Avatar } from "@chakra-ui/avatar"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"

const data = [
  {
    date: "23/04/2023",
    name: "Bo jackson",
    text: "Bilikisu Fadesere made a claim request",
    avatar: "https://picsum.photos/200/300",
    time: "10:12PM",
  },
  {
    date: "23/04/2023",
    name: "Peter paul",
    text: "Bilikisu Fadesere made a claim request",
    avatar: "https://picsum.photos/200/300",
    time: "10:12PM",
  },
  {
    date: "23/04/2023",
    name: "John Smith",
    text: "Bilikisu Fadesere made a claim request",
    avatar: "https://picsum.photos/200/300",
    time: "10:12PM",
  },
  {
    date: "24/04/2023",
    name: "John Adam",
    text: "Bilikisu Fadesere made a claim request",
    avatar: "https://picsum.photos/200/300",
    time: "10:12PM",
  },
  {
    date: "24/04/2023",
    name: "Claim Request",
    text: "Bilikisu Fadesere made a claim request",
    avatar: "https://picsum.photos/200/300",
    time: "10:12PM",
  },
  {
    date: "24/04/2023",
    name: "Bolu Adekojo",
    text: "Bilikisu Fadesere made a claim request",
    avatar: "https://picsum.photos/200/300",
    time: "10:12PM",
  },
]

const index = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupDataByDate = data.reduce((group: any, arr) => {
    const { date } = arr
    group[date] = group[date] ?? []
    group[date].push(arr)
    return group
  }, {})

  const dataKeys = Object.keys(groupDataByDate)

  const today = new Date().toLocaleDateString()

  return (
    <Box>
      <Flex p="20px" bgColor="brand.bgLight" alignItems="center" gap="12px">
        <Heading fontSize="24px" color="#0B1023">
          Notifications
        </Heading>
        <NotificationNumber num={3} bgColor="brand.primary" color="#fff" />
      </Flex>
      {dataKeys.map((key) => (
        <Box p="20px" key={key}>
          <Text fontSize="18px" fontWeight="700">
            {key === today ? "Today" : key}
          </Text>
          {groupDataByDate[key].map(
            ({
              name,
              text,
              time,
            }: {
              avatar: string
              date: string
              name: string
              text: string
              time: string
            }) => (
              <Flex pt="20px" key={name}>
                <Flex
                  px="10px"
                  py="12px"
                  bgColor="#EEF1FD"
                  alignItems="center"
                  borderBottom="0.5px solid #C9C9C9"
                  justifyContent="space-between"
                  width="full"
                  cursor="pointer"
                  borderRadius="4px"
                >
                  <Flex gap="20px" alignItems="center">
                    <Avatar
                      name={name}
                      bgColor="brand.primary"
                      color="#ffffff"
                      size="sm"
                    />
                    <Box>
                      <Text
                        color="brand.primary"
                        fontSize="12px"
                        fontWeight="500"
                      >
                        {name}
                      </Text>
                      <Text color="#3f3f44" fontSize="12px">
                        {text}
                      </Text>
                    </Box>
                    <Text color=" #3f3f4466" fontSize="10px" alignSelf="start">
                      {time}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            )
          )}
        </Box>
      ))}
    </Box>
  )
}

export default index
