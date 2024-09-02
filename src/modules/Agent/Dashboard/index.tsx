import React, { useState } from "react"
import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  SimpleGrid,
  Button,
  Icon,
  useColorModeValue,
  ModalContent,
} from "@chakra-ui/react"
import { MdOutlineAccountBalanceWallet } from "react-icons/md"
import { HiOutlineTicket } from "react-icons/hi2"
import { TbCurrencyNaira } from "react-icons/tb"
import { CgProfile } from "react-icons/cg"
import MiniStatistics from "@/reusables/MiniStatistics"
import IconBox from "@/reusables/icons/IconBox"
import Transactions from "@/reusables/Transactions"
import PaymentForm from "../Payments" // Existing form for voucher buying
import FundingForm from "../Payments/Funding" // New form for account funding
import { colors } from "@/theme/colors"
import { getDayPeriod } from "@/utils/getDayPeriod"

const Index: React.FC = () => {
  const [isPaymentFormOpen, setPaymentFormOpen] = useState(false)
  const [isFundingFormOpen, setFundingFormOpen] = useState(false)

  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100")
  const cardShadow = useColorModeValue("lg", "dark-lg")

  // Use static data for "Boulevard"
  const selectedDriver = {
    id: 2,
    name: "AG-23-76",
    value: "27,579,360",
    payments: "950,900",
    tasks: "15",
    projects: "4",
  }

  return (
    <Box py="6" px="5" bg="#F6F6F6" minH="100vh">
      <Flex mb="10px" justifyContent="space-between">
        <Text fontSize="28px" fontWeight={500}>
          Good {getDayPeriod()} Kabiru!
        </Text>
        <Flex>
          <Button
            bg="brand.primary"
            color="white"
            leftIcon={<Icon as={HiOutlineTicket} />}
            onClick={() => setPaymentFormOpen(true)}
          >
            Get Voucher
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" mb="20px">
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={CgProfile}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Agent ID"
          value={selectedDriver.name}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={TbCurrencyNaira}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Total Voucher Sold"
          value={`₦${selectedDriver.payments}`}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdOutlineAccountBalanceWallet}
                  color={colors.brand.primary}
                />
              }
            />
          }
          endContent={
            <Button
              bg={colors.brand.primary}
              color="white"
              size="sm"
              onClick={() => setFundingFormOpen(true)}
            >
              Fund
            </Button>
          }
          name="Your balance"
          value="0"
        />
      </SimpleGrid>

      {/* Voucher Buying Payment Form */}
      <Modal
        isOpen={isPaymentFormOpen}
        onClose={() => setPaymentFormOpen(false)}
        isCentered
        size="2x1"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="980px" maxH="calc(100vh - 150px)" overflowY="auto">
          <PaymentForm
            onClose={() => setPaymentFormOpen(false)}
            selectedProduct={""}
          />
        </ModalContent>
      </Modal>

      {/* Account Funding Form */}
      <Modal
        isOpen={isFundingFormOpen}
        onClose={() => setFundingFormOpen(false)}
        isCentered
        size="2x1"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="980px" maxH="calc(100vh - 150px)" overflowY="auto">
          <FundingForm
            onClose={() => setFundingFormOpen(false)}
            isOpen={isFundingFormOpen}
          />
        </ModalContent>
      </Modal>

      <Transactions />
    </Box>
  )
}

export default Index
