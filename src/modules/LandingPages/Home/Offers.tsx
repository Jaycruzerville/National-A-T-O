import { Container, Image, useMediaQuery } from "@chakra-ui/react"
import financeLady from "@/assets/financeLady.svg"
import signal from "@/assets/signal.svg"
import interest from "@/assets/interest.svg"
import cashLady from "@/assets/cashLady.svg"
import Offer from "@/reusables/Offer"
// import earnings from "@/assets/earnings.svg"
import chatIcon from "@/assets/chatIcon.svg"
import herobook from "@/assets/hero-book-icon.svg"
import happyMan from "@/assets/happyMan.svg"
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
        header="Land Use Charge"
        subText="More comfortable and seamless Payment Process, We help you;"
        list={[
          "Pay your land use charges effortlessly through our app.",
          "Get a clear breakdown of what you're paying for, ensuring transparency in every transaction.",
          "Keep track of all your past payments and stay organized with your land use charge commitments.",
          "Reach out to our customer support for any assistance with your land use charge payments.",
          "Receive real-time notifications about any changes or new policies related to land use charges.",
        ]}
      >
        <>
          <Image
            src={financeLady}
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
        header="Armenities Fee"
        subText=""
        list={[
          "Accountability",
          "Transparency",
          "Flexibility",
          "Must be a Nigerian citizen",
        ]}
        eligibility
      >
        <>
          <Image
            src={happyMan}
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
        subText="Take advantage of competitive interest rates as you save for your goals"
        savingsList={[
          {
            icon: signal,
            headerText: "Flexible payment plan",
            paragraph:
              "You have the right to choose how much you would like to pay",
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
          src={cashLady}
          px="6.5%"
          pb={{ base: "2.1rem", md: "3.8rem" }}
          pt={{ base: "4.3rem", md: "7.8rem" }}
        />
      </Offer>
    </Container>
  )
}

export default Offers
