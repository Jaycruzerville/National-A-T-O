import { Container, Image, useMediaQuery } from "@chakra-ui/react"
import tricycle from "@/assets/tricycle.png"
import signal from "@/assets/signal.svg"
import interest from "@/assets/interest.svg"
import heroheader2 from "@/assets/heroheader2.png"
import Offer from "@/reusables/Offer"
// import earnings from "@/assets/earnings.svg"
import chatIcon from "@/assets/chatIcon.svg"
import herobook from "@/assets/hero-book-icon.svg"
import motorbike from "@/assets/motorbike.png"
import repayIcon from "@/assets/repayIcon.svg"
// import loanAmount from "@/assets/loanAmount.svg"
// import MicroInsurance from "./MicroInsurance"
// import { motion } from "framer-motion"

const Offers = () => {
  const [isSmallerThan1400] = useMediaQuery("(max-width: 1400px)")

  return (
    <Container
      maxW="container.xl"
      pt={{ base: "1.43rem", md: "2.5rem" }}
      px={{ sm: 4, md: isSmallerThan1400 ? "5%" : 0 }}
    >
      {/* <Heading
        initial={{ opacity: 0, y: 30 }}
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
        fontSize={{ base: "24px", md: "4xl" }}
        fontWeight="bold"
        textAlign="center"
      >
        Services
      </Heading> */}
      <Offer
        header="Mission"
        subText="Seamless and Robust ERP System, We engage in:"
        list={[
          "Enhance Government Revenue and Transparency.",
          "Improve Public Safety and Security.",
          "Foster Economic Opportunities and Employment.",
          "Streamline Operations and Policy Enforcement.",
          "Promote Strategic Collaboration.",
        ]}
      >
        <>
          <Image
            src={tricycle}
            pt={{ base: "6.75rem", md: "10.5rem" }}
            pb={{ base: "2.8rem", md: "0px" }}
          />
          <Image
            src={herobook}
            position="absolute"
            width={{ base: "3.5rem", md: "auto" }}
            height={{ base: "3rem", md: "auto" }}
            left={{ base: "-1rem", md: "-2rem" }}
            top="5%"
          />
          <Image
            src={chatIcon}
            position="absolute"
            width={{ base: "3.5rem", md: "auto" }}
            height={{ base: "auto" }}
            bottom={{ base: "3.5rem", md: "5.5rem" }}
            left={{ base: "-1rem", md: "-2rem" }}
          />
        </>
      </Offer>
      <Offer
        header="Vision"
        subText="Principles"
        list={[
          "Accountability",
          "Safety",
          "Economic Empowerment",
          "Operational Excellence",
          "Collaborative Growth",
        ]}
        eligibility
      >
        <>
          <Image
            src={motorbike}
            pt={{ base: "5.8rem", md: "7rem" }}
            pb={{ base: "2.25rem", md: "auto" }}
          />
          {/* <Image
            src={loanAmount}
            position="absolute"
            width={{ base: "9.8rem", md: "auto" }}
            height={{ base: "3rem", md: "auto" }}
            right={{ sm: 0, base: "-1.7rem", md: "-2.1rem" }}
            top={{ base: "1rem", md: "2rem" }}
          /> */}
          <Image
            src={repayIcon}
            position="absolute"
            left={{ base: "-1rem", md: "-2rem" }}
            top={{ base: "3.4rem", md: "6rem" }}
            width={{ base: "8.4rem", md: "auto" }}
            height={{ base: "2.5rem", md: "auto" }}
          />
        </>
      </Offer>
      {/* <MicroInsurance /> */}
      <Offer
        header=""
        subText="Centralization and Policy Enforcement"
        savingsList={[
          {
            icon: signal,
            headerText: "Automation of Fee Collection",
            paragraph:
              "ERadicate street-level extortion, contributing to a cleaner and more orderly environment in the state",
          },
          {
            icon: interest,
            headerText: "Data Visualization",
            paragraph:
              "Get the tranparency and accountability on the application",
          },
        ]}
        savings
      >
        <Image
          src={heroheader2}
          px="6.5%"
          pb={{ base: "2.1rem", md: "3.8rem" }}
          pt={{ base: "4.3rem", md: "7.8rem" }}
        />
      </Offer>
    </Container>
  )
}

export default Offers
