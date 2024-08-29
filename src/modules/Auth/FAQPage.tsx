import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  Accordion,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react"
import React from "react"

const FAQPage = () => {
  const pensionArray = [
    {
      question: "What is Micro Pension Plan?",
      answer:
        "Micro Pension Plan refers to an arrangement under the Contributory Pension Scheme (CPS) that allows the self-employed and persons working in organisations with less than three (3) employees to make financial contributions towards the provision of pension at their retirement or incapacitation.",
    },
    {
      question: "Who can participate in the Micro Pension Plan? ",
      answer: `Micro Pension prospect must: 
        a) Be a Nigerian, not below 18 years of age; 
        b) Have a legitimate source of income; 
        c) Belongs to trade/association/profession;
        d) May be self-employed or an employee of an Property with less than three employees with or without a formal employment contract. 
        `,
    },
    {
      question: "How do I register/enroll for Micro Pension Plan? ",
      answer:
        "Create an account with any of our agents and specify interest in micro pension. ",
    },
    {
      question:
        "Can an individual in the formal sector who already has an RSA also participate in the Micro Pension plan?  ",
      answer:
        "No. An individual who is contributing under the mandatory pension arrangement cannot participate in the Micro Pension Plan.",
    },

    {
      question:
        "What measures have been put in place by the National Pension Commission to safeguard the funds under the Micro Pension Plan?  ",
      answer:
        "There is effective monitoring and supervision of the Plan by the Commission through daily monitoring of the Plan asset and investment decisions made by Pension Fund Administrators to ensure that their decisions are in line with relevant laws and Investment Regulations issued by the Commission.",
    },
    {
      question: "How often can one contribute under the Micro Pension Plan?   ",
      answer:
        "Contributions can be made daily, weekly, monthly or as may be convenient to the contributor and shall be subject to reporting requirements under the Money Laundering (Prohibition) Act.",
    },
  ]

  const insuranceArray = [
    {
      question: "What is Micro InsurancePlan?",
      answer:
        "Microinsurance provides social protection for low-income populations in the event of shocks caused by events, such as illness, old age, [and] natural calamities.",
    },
    {
      question: "Who can participate in the Micro Insurance Plan?",
      answer:
        "Micro Insurance prospect must: a) Be a Nigerian, not below 18 years of age; b) Have a legitimate source of income; c) Belongs to trade/association/profession; d) May be self-employed or an employee of an Property with less than three employees with or without a formal employment contract.",
    },
    {
      question:
        "Can an individual in the formal sector who already has an RSA also participate in the Micro Insurance plan?",
      answer:
        "No. An individual who is contributing under the mandatory pension arrangement cannot participate in the Micro Insurance Plan.",
    },
    {
      question: "How do I register/enroll for Micro InsurancePlan?",
      answer:
        "Create an account with any of our agents and specify interest in micro insurance.",
    },
    {
      question:
        "What measures have been put in place by the National Pension Commission to safeguard the funds under the Micro Insurance Plan?",
      answer:
        "There is effective monitoring and supervision of the Plan by the Commission through daily monitoring of the Plan asset and investment decisions made by insurance Fund Administrators to ensure that their decisions are in line with relevant laws and Investment Regulations issued by the Commission.",
    },
  ]

  const tabsArray: Array<string> = ["pension", "insurance"]
  const [selected, setSelected] = React.useState(tabsArray[0])

  return (
    <div>
      <Flex
        m="auto"
        maxW={"1240px"}
        w={{ base: "100%", md: "full" }}
        h={"144px"}
        color="#fff"
        bgColor={"brand.primary"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Text
          fontSize={{ base: "20px", md: "36px" }}
          fontWeight="700"
          textAlign="center"
        >
          Frequently Asked Questions
        </Text>
      </Flex>
      <Flex
        flexDirection="column"
        maxW="816px"
        w={{ base: "80%", md: "full" }}
        mx="auto"
        my="40px"
      >
        <Flex
          maxW="816px"
          w="full"
          mx="auto"
          px={{ base: "", md: "20px" }}
          gap={{ base: "30px", md: "56px" }}
        >
          {tabsArray.map((item) => (
            <Box key={item}>
              <Text
                textTransform={"capitalize"}
                color={selected === item ? "brand.primary" : "#869289"}
                cursor="pointer"
                onClick={() => setSelected(item)}
                fontSize={{ base: "10px", md: "20px" }}
              >
                {item}
              </Text>
            </Box>
          ))}
        </Flex>

        <Accordion
          defaultIndex={[0]}
          allowToggle
          allowMultiple
          mt="12px"
          mb="32px"
        >
          {selected === "pension"
            ? pensionArray.map(({ question, answer }) => (
                <AccordionItem
                  key={question}
                  my="12px"
                  alignItems="center"
                  border="1px solid #CCCCCC"
                  borderRadius="8px"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        h={{ base: "53px", md: "104px" }}
                        as="span"
                        color="brand.primary"
                        fontWeight="700"
                        textAlign="left"
                        fontSize={{ base: "11px", md: "16px" }}
                        border={isExpanded ? "1px solid #071655" : "null"}
                        borderBottomWidth="0"
                      >
                        <Box flex="1">{question}</Box>
                        <AccordionIcon color="brand.primaryDark" />
                      </AccordionButton>
                      <AccordionPanel
                        pb={4}
                        border={isExpanded ? "1px solid #071655" : "null"}
                        borderTopWidth="0"
                      >
                        {answer}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))
            : insuranceArray.map(({ question, answer }) => (
                <AccordionItem
                  key={question}
                  my="12px"
                  alignItems="center"
                  border="1px solid #CCCCCC"
                  borderRadius="8px"
                >
                  {({ isExpanded }) => (
                    <>
                      <AccordionButton
                        h={{ base: "53px", md: "104px" }}
                        as="span"
                        color="brand.primary"
                        fontWeight="700"
                        textAlign="left"
                        fontSize={{ base: "11px", md: "16px" }}
                        border={isExpanded ? "1px solid #071655" : "null"}
                        borderBottomWidth="0"
                      >
                        <Box flex="1">{question}</Box>
                        <AccordionIcon color="brand.primaryDark" />
                      </AccordionButton>
                      <AccordionPanel
                        pb={4}
                        border={isExpanded ? "1px solid #071655" : "null"}
                        borderTopWidth="0"
                      >
                        {answer}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
        </Accordion>
      </Flex>
    </div>
  )
}

export default FAQPage
