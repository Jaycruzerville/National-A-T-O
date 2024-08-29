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
      question: "What is Land Use Charge and is it Legal?",
      answer:
        "Land Use Charge is a consolidation of all Property and land based rates and charges payable under Lands Rates, Neighborhood Improvement Charge and Tenement Rates Laws of Lagos State. The Land Use Charge derives its legitimacy from the Lagos State Land Use Charge Law 2020.",
    },
    {
      question: "Who is liable to Pay Land Use Charge? ",
      answer:
        "The owner of a Property is liable to pay Land Use Charge in respect of any taxable Property. The “Owner’’ in relation to any Property includes an occupier with a lease of at least ten (10) years or any person for the time being receiving proceeds on the Property in connection with which the word is used, whether on own account or as agent or trustee for any other person who would receive the sum if such Property were let to a tenant, and the holder of a Property directly from the State, whether under lease, license or otherwise;",
    },
    {
      question:
        "Are Property Owners Supposed to Pay for Assessment of Their Property?",
      answer:
        "Assessment of properties for the purpose of Land Use Charge is free and Property Owners are not expected to make any payment whatsoever for the service provided by the Lagos State Government.",
    },

    {
      question:
        "What measures have been put in place by the National Pension Commission to safeguard the funds under the Micro Pension Plan?  ",
      answer:
        "There is effective monitoring and supervision of the Plan by the Commission through daily monitoring of the Plan asset and investment decisions made by Pension Fund Administrators to ensure that their decisions are in line with relevant laws and Investment Regulations issued by the Commission.",
    },
    {
      question: "How do we compute Land Use Charge on a Property?",
      answer:
        "LUC = [(LA x LR) + (BA x BR x DR)] x RR x CR\n\n" +
        "LUC = annual amount of Land Use Charge in Naira\n\n" +
        "LA = the area of the land parcel in square metres\n\n" +
        "LR = the average Market Value of a land parcel in the neighbourhood, on a per square metre basis in Naira, based on the market value of the Property as determined by professional valuers appointed by the Commissioner for that purpose.\n\n" +
        "BA = the total developed floor area of the building on the plot of land in square metres, or the total floor area of an apartment unit in a building where the apartment has a separate ownership title.\n\n" +
        "BR = the average construction value of medium quality buildings and improvements in the neighbourhood, on a per square metre basis in Naira, based on the market value of the Property as determined by professional valuers appointed by the Commissioner for that purpose.\n\n" +
        "RR = the rate of relief from tax (if any) applicable to the Owner Occupier in the circumstances shall be determined by the Commissioner and shall be published in the State Government Official Gazette and in one or more newspapers circulating within the State and reviewed by the Commissioner once every five (5) years.\n\n" +
        "CR = the annual charge rate expressed as a percentage of the assessed Market Value of the Property and which may, at the State Government’s discretion, vary between (a) owner-occupied and other Property; (b) residential Property and commercial (revenue-generating) Property; (c) physically-challenged persons; and (d) persons who have been resident at the same location for at least twelve (12) years, minors, and retired owners and occupiers, on the one hand, and other owners and occupiers on the other.\n\n" +
        "DR = The depreciation rate for the building and improvement of land which accounts for the building being of a higher or lower value than the average buildings in the neighbourhood and which also accounts for the degree of completion of construction of the building.",
    },
    {
      question: "Who is responsible for the assessment of a Property and when?",
      answer:
        "Properties can be assessed by authorized persons appointed by the commissioner. The authorized persons can carry out their assessment between the hours of 7.001.m and 5.00p.m.",
    },
    {
      question: "What is Relief Rate And how do we apply for Relief Rates?",
      answer:
        "Relief Rate is the rate fixed to reduce the burden of Property Owners on payment of Land Use Charge.\n\n" +
        "The Relief Rates has two (2) components i.e. General and Specific reliefs. The general relief is 40% on all properties and specific reliefs on application to the Commissioner of Finance.",
    },
    {
      question: "I Own An ‘Empty Land’, Am I Liable to Pay?",
      answer: "Yes. Since, Land Use Charge includes all land based rates.",
    },
  ]

  const insuranceArray = [
    {
      question: "What is Land Use Charge and is it Legal?",
      answer:
        "Land Use Charge is a consolidation of all Property and land based rates and charges payable under Lands Rates, Neighborhood Improvement Charge and Tenement Rates Laws of Lagos State. The Land Use Charge derives its legitimacy from the Lagos State Land Use Charge Law 2020.",
    },
    {
      question: "Who is liable to Pay Land Use Charge? ",
      answer:
        "The owner of a Property is liable to pay Land Use Charge in respect of any taxable Property. The “Owner’’ in relation to any Property includes an occupier with a lease of at least ten (10) years or any person for the time being receiving proceeds on the Property in connection with which the word is used, whether on own account or as agent or trustee for any other person who would receive the sum if such Property were let to a tenant, and the holder of a Property directly from the State, whether under lease, license or otherwise;",
    },
    {
      question:
        "Are Property Owners Supposed to Pay for Assessment of Their Property?",
      answer:
        "Assessment of properties for the purpose of Land Use Charge is free and Property Owners are not expected to make any payment whatsoever for the service provided by the Lagos State Government.",
    },

    {
      question:
        "What measures have been put in place by the National Pension Commission to safeguard the funds under the Micro Pension Plan?  ",
      answer:
        "There is effective monitoring and supervision of the Plan by the Commission through daily monitoring of the Plan asset and investment decisions made by Pension Fund Administrators to ensure that their decisions are in line with relevant laws and Investment Regulations issued by the Commission.",
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
          allowToggle
          allowMultiple
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
