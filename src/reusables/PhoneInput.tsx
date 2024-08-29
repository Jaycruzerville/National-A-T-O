import { ChangeEventHandler, useRef, useState } from "react"
import {
  Box,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react"
import parsePhoneNumber, { CountryCode } from "libphonenumber-js"
import { countries } from "@/data/countries"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { Country, SearchCountryList } from "./SearchCountryList"

interface PageInputProps extends InputProps {
  placeholder?: string
}

const PageInput = ({ placeholder, ...rest }: PageInputProps) => {
  return (
    <Input
      {...rest}
      size="lg"
      sx={{
        border: "1px solid",
        borderColor: "gray.500",
        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        background: "#fff",
      }}
      placeholder={placeholder ?? ""}
      _placeholder={{
        fontFamily: "'Cabinet Grotesk', sans-serif",
        color: "#607F88",
        fontSize: "14px",
      }}
    />
  )
}

type PhoneInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
  name?: string
  defaultValue?: string
  setInternationalFormat?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}

const PhoneInput = ({
  onChange,
  value,
  name,
  setInternationalFormat,
  defaultValue,
}: PhoneInputProps) => {
  const [country, setCountry] = useState<Country>({
    code: "NG",
    label: "Nigeria",
    phone: "234",
  })
  const { isOpen, onToggle, onClose } = useDisclosure()
  const ref = useRef(null)
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  })

  const onCountryChange = (item: Country) => {
    setCountry(item)
    onClose()
  }

  return (
    <Box ref={ref} position="relative">
      <InputGroup>
        <InputLeftElement
          width="fit-content"
          cursor="pointer"
          onClick={onToggle}
          mr="200px"
        >
          <Flex mt={2.5} ml={4} gap="1" align="center">
            <Image
              boxSize="12px"
              width="16px"
              src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
            />
            <Text
              color="#5C6F7F"
              fontWeight={600}
              fontSize="14px"
            >{`+${country.phone}`}</Text>
            {isOpen ? (
              <ChevronUpIcon boxSize={5} color="#003E51" />
            ) : (
              <ChevronDownIcon boxSize={5} color="#003E51" />
            )}
            <Divider
              orientation="vertical"
              color="#CBD6E0"
              height="25px"
              opacity={1}
            />
          </Flex>
        </InputLeftElement>
        <PageInput
          pl="33%"
          type="tel"
          value={value}
          name={name ?? "phone"}
          defaultValue={defaultValue ?? ""}
          onChange={(e) => {
            if (setInternationalFormat) {
              const phone = parsePhoneNumber(
                e.target.value,
                country.code as CountryCode
              )?.formatInternational()
              setInternationalFormat(phone)
            }
            onChange(e)
          }}
        />
      </InputGroup>

      {isOpen ? (
        <SearchCountryList data={countries} onChange={onCountryChange} />
      ) : null}
    </Box>
  )
}

export default PhoneInput
