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

// import FAQTabs from "./components/FAQTabs"

const FAQPage = () => {
  const pensionArray = [
    {
      question:
        "What measures are in place to ensure the privacy and security of data collected by the system?",
      answer:
        "The system uses encrypted data protocols to ensure that all collected information is secure. Additionally, it adheres to strict privacy regulations, ensuring that personal data is not misused or accessible to unauthorized parties.",
    },
    {
      question:
        "How will the fee collection process work under the new system? ",
      answer:
        "The fee collection will be fully automated through the ERP system, allowing drivers to make payments online or through agents at designated locations. Payments will be linked to the vehicle’s registration, and a digital voucher will be issued as proof of payment.",
    },
    {
      question: "What happens if a driver fails to pay the required fees?",
      answer:
        "The ERP system will automatically flag any unpaid fees and notify the relevant authorities. Enforcement officers will be able to verify payment status in real-time, and penalties may be applied for non-compliance, including fines or temporary suspension of the vehicle’s operating license.",
    },

    {
      question: "How will the system monitor drivers and their vehicles?  ",
      answer:
        "Each vehicle will be equipped with a GPS tracker and a unique QR code. The GPS will provide real-time updates on the vehicle’s location, speed, and status, while the QR code allows for quick identification by both citizens and enforcement officers.",
    },
    {
      question:
        "Can the system detect and respond to violations, such as overspeeding or unauthorized routes?",
      answer:
        "Yes, the system is designed to monitor speed and route compliance. If a vehicle exceeds the speed limit or deviates from an authorized route, an alert is sent to the authorities, who can take immediate action, such as issuing a fine or sending a warning to the driver.",
    },
    {
      question:
        "What measures are in place to ensure the accuracy of fee payments and vehicle monitoring?",
      answer:
        "The ERP system uses advanced algorithms to cross-check data, ensuring that all fee payments are accurately recorded and that vehicle monitoring is precise. Regular audits and system updates will further ensure the integrity of the data and the system’s reliability.",
    },
    {
      question: "How will this system benefit daily commuters in Kano State?",
      answer:
        "The system will reduce traffic jams, shorten travel times, and create a smoother driving experience for commuters by optimizing traffic light timings and monitoring congestion points in real time.",
    },
  ]

  const insuranceArray = [
    {
      question:
        "What measures are in place to ensure the privacy and security of data collected by the system?",
      answer:
        "The system uses encrypted data protocols to ensure that all collected information is secure. Additionally, it adheres to strict privacy regulations, ensuring that personal data is not misused or accessible to unauthorized parties.",
    },
    {
      question:
        "How will the fee collection process work under the new system? ",
      answer:
        "The fee collection will be fully automated through the ERP system, allowing drivers to make payments online or through agents at designated locations. Payments will be linked to the vehicle’s registration, and a digital voucher will be issued as proof of payment.",
    },
    {
      question: "What happens if a driver fails to pay the required fees?",
      answer:
        "The ERP system will automatically flag any unpaid fees and notify the relevant authorities. Enforcement officers will be able to verify payment status in real-time, and penalties may be applied for non-compliance, including fines or temporary suspension of the vehicle’s operating license.",
    },

    {
      question: "How will the system monitor drivers and their vehicles?  ",
      answer:
        "Each vehicle will be equipped with a GPS tracker and a unique QR code. The GPS will provide real-time updates on the vehicle’s location, speed, and status, while the QR code allows for quick identification by both citizens and enforcement officers.",
    },
    {
      question:
        "Can the system detect and respond to violations, such as overspeeding or unauthorized routes?",
      answer:
        "Yes, the system is designed to monitor speed and route compliance. If a vehicle exceeds the speed limit or deviates from an authorized route, an alert is sent to the authorities, who can take immediate action, such as issuing a fine or sending a warning to the driver.",
    },
  ]

  const tabsArray: Array<string> = ["Land Use Charge"]
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
          pr={{ base: "", md: "20px" }}
          gap={{ base: "30px", md: "56px" }}
        >
          {tabsArray.map((item) => (
            <Box key={item}>
              <Text
                textTransform={"capitalize"}
                color={selected === item ? "brand.primary" : "#869289"}
                cursor="pointer"
                onClick={() => setSelected(item)}
                fontSize={{ base: "16px", md: "20px" }}
              >
                {item}
              </Text>
            </Box>
          ))}
        </Flex>

        <Accordion
          defaultIndex={[0]}
          // allowToggle
          // allowMultiple
          mt="12px"
          mb="32px"
        >
          {selected === "Micro Pension"
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
