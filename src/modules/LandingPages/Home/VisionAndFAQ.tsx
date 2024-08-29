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
