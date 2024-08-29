import { ChangeEvent, useState } from "react"
import { Box, Flex, Image, Input, List, ListItem, Text } from "@chakra-ui/react"

export type Country = {
  label: string
  code: string
  phone: string
}

export type Props = {
  data: Country[]
  onChange: (args: Country) => void
}

export const SearchCountryList = ({ data, onChange }: Props) => {
  const [filteredList, setFilteredList] = useState(data)
  const [selectedItem, setSelectedItem] = useState<Country | undefined>(
    undefined
  )

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    const result =
      data?.filter((item: Country) => {
        return item.label.toLowerCase().includes(value)
      }) || []
    setFilteredList(result)
  }

  return (
    <Box
      my={1}
      maxH="xs"
      bg="white"
      width="full"
      zIndex={999}
      height="auto"
      overflow="auto"
      borderRadius="lg"
      position="absolute"
      boxShadow="0px 1px 30px rgba(0, 0, 0, 0.1)"
      sx={{
        overflowY: "scroll",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "gray.100",
          boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.1)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#CDCED9",
        },
      }}
    >
      <Box position="sticky" top="0" padding={4} bg="white">
        <Input
          size="sm"
          type="search"
          borderRadius="md"
          autoComplete="off"
          placeholder="Search for country"
          onChange={(event) => handleSearch(event)}
          _focusWithin={{ borderColor: "secondary" }}
          _invalid={{ bg: "white", borderColor: "gray.50" }}
        />
      </Box>

      <List>
        {filteredList?.map((item: Country, index: number) => (
          <ListItem
            key={index}
            paddingY={2}
            color="#ACB9C4"
            cursor="pointer"
            fontWeight="500"
            textTransform="capitalize"
            onClick={() => {
              onChange(item)
              setSelectedItem(item)
            }}
            style={{ transition: "all .125s ease" }}
            _hover={{ bg: "gray.50", color: "#396070" }}
            sx={
              item?.code === selectedItem?.code
                ? { backgroundColor: "gray.50", color: "#396070" }
                : {}
            }
          >
            <Flex ml={4} gap="1">
              <Image
                boxSize="20px"
                src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
              />

              <Text as="span">{item?.label}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
