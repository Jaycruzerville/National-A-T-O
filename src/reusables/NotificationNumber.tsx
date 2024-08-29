import { Flex } from "@chakra-ui/react"

interface Props {
  num: number
  bgColor: string
  color: string
}
const NotificationNumber = ({ num, bgColor, color }: Props) => {
  return (
    <Flex
      justifyContent="center"
      alignContent="center"
      height="20px"
      width="20px"
      bgColor={bgColor}
      borderRadius="full"
      color={color}
      fontSize="14px"
      fontWeight="bold"
    >
      {num}
    </Flex>
  )
}

export default NotificationNumber
