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
import IssueVoucher from "@/modules/Agent/Payments" // Existing form for voucher buying
import FundingForm from "@/modules/Agent/Payments/Funding" // New form for account funding
import { colors } from "@/theme/colors"
import { getDayPeriod } from "@/utils/getDayPeriod"
import usersService from "@/services/usersServices" // Import the service for fetching data
import Auth from "@/utils/auth"
import VoucherModal from "@/modules/Agent/Payments/VoucherModal" // Import VoucherModal

const Index: React.FC = () => {
  const [isIssueVoucherOpen, setIssueVoucherOpen] = useState(false)
  const [isFundingFormOpen, setFundingFormOpen] = useState(false)
  const [agentData, setAgentData] = useState({
    firstName: "",
    totalVoucherSales: 0,
    walletBalance: 0,
  })
  const [loading, setLoading] = useState(true)

  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false) // New state for VoucherModal
  const [issuedVoucherDetails, setIssuedVoucherDetails] = useState<any>(null) // Store issued voucher details

  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100")
  const cardShadow = useColorModeValue("lg", "dark-lg")

  // Function to format numbers with commas
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  // Fetch agent dashboard info when the component mounts
  React.useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const agentId = Auth.getAgentId() // Get userId from local storage

        if (agentId) {
          const data = await usersService.fetchAgentDashboardInfo(agentId)
          setAgentData(data)
        } else {
          console.error("Agent ID (userId) not found in local storage")
        }
      } catch (error) {
        console.error("Error fetching agent dashboard info:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardInfo()
  }, [])

  const refreshWalletBalance = async () => {
    try {
      const agentId = Auth.getAgentId()
      if (agentId) {
        const data = await usersService.fetchAgentDashboardInfo(agentId)
        setAgentData(data)
      } else {
        console.error("Agent ID (userId) not found in local storage")
      }
    } catch (error) {
      console.error("Error refreshing wallet balance:", error)
    }
  }

  const handleVoucherSuccess = (voucher: any) => {
    console.log("Voucher issued successfully:", voucher) // Add this line
    if (voucher && voucher.driver) {
      setIssuedVoucherDetails(voucher)
      setIsVoucherModalOpen(true) // Open the voucher modal
    } else {
      console.error("Voucher details are missing")
    }
  }

  if (loading) {
    return <Text>Loading dashboard...</Text>
  }

  return (
    <Box py="6" px="5" bg="#F6F6F6" minH="100vh">
      <Flex mb="10px" justifyContent="space-between">
        <Text fontSize="28px" fontWeight={500}>
          Good {getDayPeriod()} {agentData.firstName}!
        </Text>
        <Flex>
          <Button
            bg="brand.primary"
            color="white"
            leftIcon={<Icon as={HiOutlineTicket} />}
            onClick={() => setIssueVoucherOpen(true)}
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
                  as={CgProfile}
                  w="32px"
                  h="32px"
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Agent Name"
          value={agentData.firstName}
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
                  as={TbCurrencyNaira}
                  w="32px"
                  h="32px"
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Total Voucher Sales"
          value={formatCurrency(agentData.totalVoucherSales)}
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
                  as={MdOutlineAccountBalanceWallet}
                  w="32px"
                  h="32px"
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
          name="Wallet Balance"
          value={formatCurrency(agentData.walletBalance)}
        />
      </SimpleGrid>

      {/* Voucher Buying Payment Form */}
      <Modal
        isOpen={isIssueVoucherOpen}
        onClose={() => {
          setIssueVoucherOpen(false)
        }}
        isCentered
        size="2x1"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="980px" maxH="calc(100vh - 150px)" overflowY="auto">
          <IssueVoucher
            onClose={() => setIssueVoucherOpen(false)}
            onSuccess={refreshWalletBalance} // Refresh wallet balance on success
            onVoucherIssued={handleVoucherSuccess} // Handle voucher issuance
          />
        </ModalContent>
      </Modal>

      {/* Voucher Modal for displaying the issued voucher */}
      {issuedVoucherDetails &&
        issuedVoucherDetails.driver &&
        isVoucherModalOpen && (
          <VoucherModal
            isOpen={isVoucherModalOpen}
            onClose={() => {
              setIsVoucherModalOpen(false)
              setIssueVoucherOpen(false) // Close both modals when done
            }}
            voucherDetails={{
              driverName: issuedVoucherDetails.driver.fullName,
              vehiclePlateNumber:
                issuedVoucherDetails.driver.vehiclePlateNumber,
              type: issuedVoucherDetails.voucher.type,
              amount: issuedVoucherDetails.voucher.price,
              qrCode: issuedVoucherDetails.voucher.qrCode,
            }}
          />
        )}

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
            isOpen={isFundingFormOpen}
            onClose={() => setFundingFormOpen(false)}
            onSuccess={refreshWalletBalance} // Updated this line
          />
        </ModalContent>
      </Modal>

      <Transactions />
    </Box>
  )
}

export default Index
