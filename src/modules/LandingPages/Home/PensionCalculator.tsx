import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  StackDivider,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { NumberFormatValues, NumericFormat } from "react-number-format"
import PillTray from "../components/PillTray"
import { ReactComponent as CalendarIcon } from "@/assets/CalendarInput.svg"
import { motion } from "framer-motion"

const paymentFrequencyMap: Record<string, number> = {
  Monthly: 12,
  Weekly: 52,
  Daily: 365,
}

const FlexList = ({ children }: { children: React.ReactNode }) => (
  <Flex
    justifyContent="space-between"
    align="center"
    padding="10px"
    width="100%"
  >
    {children}
  </Flex>
)

const PensionCalculator = () => {
  const [isSmallerThan1400] = useMediaQuery("(max-width: 1400px)")

  const currentYear = new Date().getFullYear()
  const [frequency, setFrequency] = useState<string>("Daily")
  const [pensionValues, setPensionValues] = useState({
    amount: "",
    retirementYear: `${currentYear + 1}`,
    formattedAmount: "",
    savingsDuration: 0,
  })
  const [retirementBalance, setRetirementBalance] = useState(0)

  useEffect(() => {
    if (
      Number(pensionValues.retirementYear) < currentYear + 1 ||
      Number(pensionValues.retirementYear) > 2099
    ) {
      setRetirementBalance(0)
      return
    }
    const amount = Number(pensionValues.amount)
    const payFrequency: number = paymentFrequencyMap[frequency]
    const retirementYear = Number(pensionValues.retirementYear)
    const years =
      (retirementYear === 0 ? currentYear + 1 : retirementYear) - currentYear
    const totalamountSaved = amount * payFrequency * years
    const totalInterest: number = totalamountSaved * 0.1
    setRetirementBalance(totalamountSaved + totalInterest)
  }, [pensionValues, frequency])

  return (
    <Container
      maxW="container.xl"
      mt="40px"
      px={{ sm: 1, md: isSmallerThan1400 ? "5%" : 0 }}
    >
      <Box
        bg="brand.bgLight"
        borderRadius="8px"
        p={{ base: "16px", md: "22px", xl: "40px" }}
      >
        <Flex
          align="start"
          justify="space-between"
          wrap="wrap"
          initial={{ opacity: 0.2, y: 40 }}
          viewport={{ once: true }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1.8,
              ease: "easeInOut",
            },
          }}
          as={motion.div}
        >
          <Box py="40px">
            <Heading
              size={{ base: "lg", md: "xl" }}
              mb="12px"
              lineHeight="64px"
              color="brand.textDark"
            >
              Pension Calculator
            </Heading>
            <Text mb="6" color="brand.textDark" maxInlineSize="45ch">
              Not sure about how much to save for your retirement? Our Pension
              Calculator can help
            </Text>
            <Text
              mb="2"
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight={{ base: 600, md: 400 }}
              color="brand.textDark"
            >
              Saving Frequency
            </Text>
            <PillTray
              activePill={frequency}
              setPill={setFrequency}
              pills={["Daily", "Weekly", "Monthly"]}
            />
            <VStack mt="12px" spacing="12px">
              <Input
                as={NumericFormat}
                prefix={"₦"}
                size="lg"
                thousandSeparator=","
                placeholder="Amount"
                value={pensionValues.formattedAmount}
                onValueChange={(values: NumberFormatValues) => {
                  setPensionValues({
                    ...pensionValues,
                    formattedAmount: values.formattedValue,
                    amount: values.value,
                  })
                }}
                bg="#F2F5FA"
                height="56px"
                fontWeight="bold"
                color="brand.primary"
                _placeholder={{
                  opacity: 1,
                  color: "gray.300",
                  fontSize: "14px",
                  fontWeight: "normal",
                }}
              />
              <InputGroup>
                <InputRightElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<CalendarIcon style={{ marginTop: 15 }} />}
                />
                <FormControl>
                  <Input
                    isInvalid={
                      Number(pensionValues.retirementYear) < currentYear + 1 ||
                      Number(pensionValues.retirementYear) > 2099
                    }
                    errorBorderColor="red.300"
                    size="lg"
                    placeholder="Estimated Retirement year"
                    bg="#F2F5FA"
                    height="56px"
                    fontWeight="bold"
                    color="brand.primary"
                    value={pensionValues.retirementYear}
                    onChange={(e) => {
                      setPensionValues({
                        ...pensionValues,
                        retirementYear: e.target.value,
                      })
                    }}
                    _placeholder={{
                      opacity: 1,
                      color: "gray.300",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                  />
                  {(Number(pensionValues.retirementYear) < currentYear + 1 ||
                    Number(pensionValues.retirementYear) > 2099) && (
                    <Text color="red.500">{`Please input a year between ${
                      currentYear + 1
                    } and 2099`}</Text>
                  )}
                </FormControl>
              </InputGroup>
            </VStack>
          </Box>
          <Box bg="#fff" width={{ base: "100%", md: "375px" }}>
            <Heading size="sm" p="20px" bg="gray.400" color="brand.textDark">
              Estimated RSA Balance
            </Heading>
            <Box p="20px">
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing="10px"
              >
                <FlexList>
                  <Text color="brand.textDark">Contribution</Text>
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={700}
                    color="brand.textDark"
                  >
                    {pensionValues?.formattedAmount}
                  </Text>
                </FlexList>
                <FlexList>
                  <Text color="brand.textDark">Frequency</Text>
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={700}
                    color="brand.textDark"
                  >
                    {frequency}
                  </Text>
                </FlexList>
                <FlexList>
                  <Text color="brand.textDark">Interest</Text>
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={700}
                    color="brand.textDark"
                  >
                    10%
                  </Text>
                </FlexList>
                <FlexList>
                  <Text color="brand.textDark">Balance</Text>
                  <Text
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight={700}
                    color="brand.textDark"
                  >
                    ₦
                    {new Intl.NumberFormat("en-GB").format(
                      retirementBalance ?? 0
                    )}
                  </Text>
                </FlexList>
              </VStack>
              <Button
                mt="30px"
                width="100%"
                fontWeight="normal"
                size="lg"
                variant="app-primary"
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  )
}

export default PensionCalculator
