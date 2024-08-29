import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import iconVerified from "../assets/iconVerified.svg"

const listVariants = {
  initial: { x: "20px", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { staggerChildren: 0.5, ease: "easeInOut", duration: 0.9 },
  },
}

type Props = {
  header: string
  subText: string
  list?: string[]
  savings?: boolean
  savingsList?: {
    icon: string
    headerText: string
    paragraph: string
  }[]
  children: JSX.Element
  eligibility?: boolean
}

const Offer = ({
  header,
  subText,
  list,
  savings,
  savingsList,
  children,
  eligibility,
}: Props) => {
  return (
    <Stack
      direction={{
        base: "column-reverse",
        md: eligibility ? "row-reverse" : "row",
      }}
      pt={{ base: "1.25rem", md: "3.75rem" }}
      align="center"
      key={header}
      wrap={{ base: "wrap", lg: "nowrap" }}
      // justifyContent="space-between"
      gap={{ base: "0.75rem", md: "3rem", lg: "15%" }}
    >
      <Box width={{ base: "100%", xl: "34rem" }}>
        <Heading
          initial={{ opacity: 0, x: 30 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1.2,
              ease: "easeInOut",
            },
          }}
          viewport={{ once: true }}
          as={motion.div}
          fontWeight="extrabold"
          color="brand.textDark"
          fontSize={{ base: "24px", md: "4xl", xl: "5xl" }}
        >
          {header}
        </Heading>
        <Text
          initial={{ opacity: 0, y: 5 }}
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
          pt="0.5rem"
          color="brand.textGrey"
          fontSize={{ base: "0.75rem", md: "1.25rem" }}
          fontWeight="bold"
          lineHeight={{ base: "0.93rem", md: "1.8rem" }}
        >
          {subText}
        </Text>
        {eligibility && (
          <Text
            pt={{ base: "0.5rem", md: "1rem" }}
            color="brand.textGrey"
            fontSize={{ base: "0.75rem", md: "1.25rem" }}
            lineHeight={{ base: "0.93rem", md: "2rem" }}
          >
            Eligibility
          </Text>
        )}
        <Flex
          pt={{ base: "0.75rem", md: "1.2rem" }}
          gap={{ base: "12px", md: "4px" }}
          direction="column"
          as={motion.div}
          variants={listVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {!savings
            ? list?.map((l) => (
                <Flex
                  gap="0.75rem"
                  alignItems="start"
                  key={l}
                  as={motion.div}
                  variants={listVariants}
                >
                  <Image
                    src={iconVerified}
                    pt={{ base: "2px", md: "6px" }}
                    width={{ base: "0.7rem", md: "auto" }}
                  />
                  <Text
                    color="brand.textGrey"
                    fontSize={{ base: "12px", md: "16px", xl: "18px" }}
                    lineHeight={{ base: "0.93rem", md: "2rem" }}
                  >
                    {l}
                  </Text>
                </Flex>
              ))
            : savingsList?.map(({ icon, headerText, paragraph }) => (
                <Flex
                  key={icon}
                  gap="0.75rem"
                  alignItems="flex-start"
                  as={motion.div}
                  variants={listVariants}
                >
                  <Image
                    src={icon}
                    pt={{ base: "0px", md: "6px" }}
                    width={{ base: "1.25rem", md: "auto" }}
                    height={{ base: "1.25rem", md: "auto" }}
                  />
                  <Box>
                    <Heading
                      as="h4"
                      fontSize={{ base: "12px", md: "16px", xl: "18px" }}
                      lineHeight={{ base: "0.93rem", md: "2rem" }}
                      color="brand.textGrey"
                      fontWeight={600}
                    >
                      {headerText}
                    </Heading>
                    <Text
                      pt={{ base: "2px", md: "0.2rem" }}
                      fontSize={{ base: "12px", md: "16px", xl: "18px" }}
                      color="brand.textGrey"
                      fontWeight="normal"
                    >
                      {paragraph}
                    </Text>
                  </Box>
                </Flex>
              ))}
        </Flex>
        <Button
          initial={{ opacity: 0, x: 30 }}
          viewport={{ once: true }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1.8,
              ease: "easeInOut",
            },
          }}
          as={motion.button}
          variant="app-primary"
          width={{ base: "7.25rem", md: "11.56rem" }}
          height={{ base: "1.75rem", md: "3rem" }}
          mt={{ base: "20px", md: "25px" }}
          fontSize={{ base: "10px", md: "1rem" }}
        >
          Learn More
        </Button>
      </Box>

      <Flex
        initial={{ opacity: 0, y: -50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        viewport={{ once: true }}
        as={motion.div}
        backgroundColor="#EEF1FD"
        borderRadius="8px"
        position="relative"
        justifyContent="center"
        width={{ base: "100%", xl: "fit-content" }}
      >
        {children}
      </Flex>
    </Stack>
  )
}

export default Offer
