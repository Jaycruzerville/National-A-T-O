import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  // Image,
  // Spacer,
  Text,
} from "@chakra-ui/react"
// import footerImg from "@/assets/footer-illustration.svg"
import { Button as btnStyle } from "@/theme/Button"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const listVariants = {
  initial: { y: "20px", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { staggerChildren: 0.5, ease: "easeInOut", duration: 0.9 },
  },
}

const VisionAndFAQ = () => {
  const navigate = useNavigate()
  const faqArray = [
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

  return (
    <Box as="section" w="full" mt={{ base: "20px", md: "121px" }}>
      {/* <Box
        w={{ base: "100%", md: "full" }}
        h={{ base: "120px", md: "374px" }}
        mx={{ base: 0, md: "auto" }}
        bgColor="brand.primaryDark"
      >
        <Flex
          maxW="1312px"
          px={"52px"}
          mx={{ base: 0, md: "auto" }}
          alignItems="center"
        >
          <Box
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1.6,
                ease: "easeInOut",
              },
            }}
            as={motion.div}
            w={{ base: "full", md: "452px" }}
            color="white"
            my="20px"
            textAlign={{ base: "center", md: "left" }}
          >
            <Text fontSize={{ base: "20px", md: "36px" }} fontWeight="900">
              Our Vision
            </Text>
            <Text
              fontWeight="500"
              fontSize={{ base: "12px", md: "18px" }}
              lineHeight={{ base: "15px", md: "28px" }}
              mt={{ base: "2", md: "20px" }}
            >
              To be the Financial Service Provider for the Informal Sector
            </Text>
          </Box>
          <Spacer />

          <Image
            src={footerImg}
            transform="translateY(-85px)"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      </Box> */}

      <Flex
        flexDirection="column"
        maxW="816px"
        w={{ base: "80%", md: "full" }}
        mx="auto"
        my="40px"
      >
        <Text
          fontSize={{ base: "20px", md: "36px" }}
          fontWeight="700"
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1.6,
              ease: "easeInOut",
            },
          }}
          as={motion.div}
        >
          Frequently Asked Questions
        </Text>

        <Accordion
          defaultIndex={[0]}
          allowToggle
          allowMultiple
          mt="12px"
          mb="32px"
          as={motion.div}
          variants={listVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {faqArray.map(({ question, answer }) => (
            <AccordionItem
              key={question}
              my="12px"
              alignItems="center"
              border="1px solid #CCCCCC"
              borderRadius="8px"
              as={motion.div}
              variants={listVariants}
            >
              <AccordionButton h={{ base: "53px", md: "104px" }}>
                <Box
                  as="span"
                  flex="1"
                  color="brand.textDark"
                  fontWeight="700"
                  textAlign="left"
                  fontSize={{ base: "11px", md: "16px" }}
                >
                  {question}
                </Box>
                <AccordionIcon color="brand.primaryDark" />
              </AccordionButton>
              <AccordionPanel pb={4}>{answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Button
          sx={btnStyle.variants["app-primary"]}
          mx="auto"
          mb={{ base: "0", md: "20px" }}
          w={{ base: "107px", md: "171px" }}
          h={{ base: "28px", md: "48px" }}
          fontSize={{ base: "10px", md: "16px" }}
          initial={{ opacity: 0, x: -30 }}
          viewport={{ once: true }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1.6,
              ease: "easeInOut",
            },
          }}
          as={motion.button}
          onClick={() => navigate("/faq")}
        >
          See More
        </Button>
      </Flex>
    </Box>
  )
}

export default VisionAndFAQ
