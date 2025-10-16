import React, { useState } from "react"
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { MdOutlineAccountBalanceWallet } from "react-icons/md"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { TbCurrencyNaira } from "react-icons/tb"
import { CgProfile } from "react-icons/cg"
import { MdOutlineAdd } from "react-icons/md"
import MiniStatistics from "@/reusables/MiniStatistics"
import IconBox from "@/reusables/icons/IconBox"
import Transactions from "@/reusables/Transactions"
import IssueVoucher from "@/modules/Agent/Payments" // Existing form for voucher buying
import FundingForm from "@/modules/Agent/Payments/Funding" // New form for account funding
import QRScanner from "@/reusables/QRScanner" // Import QR Scanner
import { colors } from "@/theme/colors"
import { getDayPeriod } from "@/utils/getDayPeriod"
import usersService from "@/services/usersServices"
import Auth from "@/utils/auth"
import VoucherModal from "../Payments/VoucherModal"

const Index: React.FC = () => {
  const [isIssueVoucherOpen, setIssueVoucherOpen] = useState(false)
  const [isFundingFormOpen, setFundingFormOpen] = useState(false)
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false) // New state for QR Scanner
  const [agentData, setAgentData] = useState({
    firstName: "",
    totalAgentsCreated: 0,
    totalSubmissions: 0,
    walletBalance: 0,
  })
  const [voucherSalesData, setVoucherSalesData] = useState({
    totalAmount: 0,
    totalCount: 0,
    todaySales: 0,
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

  // Fetch superAgent dashboard info when the component mounts
  React.useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const superAgentId = Auth.getSuperAgentId()

        if (superAgentId) {
          const data = await usersService.getSuperAgentSummary({
            queryKey: ["superAgentSummary", { id: superAgentId }],
          })
          setAgentData(data)

          // Also fetch voucher sales data
          const salesData = await usersService.getAgentVoucherSales(
            superAgentId
          )
          setVoucherSalesData(salesData)
        } else {
          console.error("SuperAgent ID not found in local storage")
        }
      } catch (error) {
        console.error("Error fetching superAgent dashboard info:", error)
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

        // Also refresh voucher sales data
        const salesData = await usersService.getAgentVoucherSales(agentId)
        setVoucherSalesData(salesData)
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
    <Box
      py={{ base: "4", md: "6" }}
      px={{ base: "3", md: "5" }}
      bg="#F6F6F6"
      minH="100vh"
    >
      <Flex
        mb={{ base: "4", md: "10px" }}
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justifyContent={{ base: "flex-start", md: "space-between" }}
        gap={{ base: "4", md: "0" }}
      >
        <Text
          fontSize={{ base: "24px", md: "28px" }}
          fontWeight={500}
          mb={{ base: "0", md: "0" }}
        >
          Good {getDayPeriod()} {agentData.firstName}!
        </Text>
        <Flex
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "2", sm: "3" }}
          w={{ base: "full", md: "auto" }}
        >
          <Button
            bg="brand.primary"
            color="white"
            leftIcon={<Icon as={MdOutlineAdd} />}
            onClick={() => setIssueVoucherOpen(true)}
            w={{ base: "full", sm: "auto" }}
            size={{ base: "md", md: "md" }}
          >
            Get Voucher
          </Button>
          <Button
            bg="blue.500"
            color="white"
            leftIcon={<Icon as={HiOutlineUserGroup} />}
            onClick={() => setIsQRScannerOpen(true)}
            w={{ base: "full", sm: "auto" }}
            size={{ base: "md", md: "md" }}
          >
            Scan QR
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        gap={{ base: "16px", md: "20px" }}
        mb="20px"
      >
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w={{ base: "48px", md: "56px" }}
              h={{ base: "48px", md: "56px" }}
              bg={boxBg}
              icon={
                <Icon
                  as={CgProfile}
                  w={{ base: "24px", md: "32px" }}
                  h={{ base: "24px", md: "32px" }}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="SuperAgent Name"
          value={agentData.firstName}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w={{ base: "48px", md: "56px" }}
              h={{ base: "48px", md: "56px" }}
              bg={boxBg}
              icon={
                <Icon
                  as={HiOutlineUserGroup}
                  w={{ base: "24px", md: "32px" }}
                  h={{ base: "24px", md: "32px" }}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Agents Created"
          value={agentData.totalAgentsCreated.toString()}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w={{ base: "48px", md: "56px" }}
              h={{ base: "48px", md: "56px" }}
              bg={boxBg}
              icon={
                <Icon
                  as={TbCurrencyNaira}
                  w={{ base: "24px", md: "32px" }}
                  h={{ base: "24px", md: "32px" }}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Total Voucher Sales"
          value={formatCurrency(voucherSalesData.totalAmount)}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w={{ base: "48px", md: "56px" }}
              h={{ base: "48px", md: "56px" }}
              bg={boxBg}
              icon={
                <Icon
                  as={MdOutlineAccountBalanceWallet}
                  w={{ base: "24px", md: "32px" }}
                  h={{ base: "24px", md: "32px" }}
                  color={colors.brand.primary}
                />
              }
            />
          }
          endContent={
            <Button
              bg={colors.brand.primary}
              color="white"
              size={{ base: "xs", md: "sm" }}
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
        size={{ base: "full", md: "2xl" }}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          maxW={{ base: "100vw", md: "980px" }}
          maxH={{ base: "100vh", md: "calc(100vh - 150px)" }}
          m={{ base: "0", md: "auto" }}
          borderRadius={{ base: "0", md: "md" }}
          overflowY="auto"
        >
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
        size={{ base: "full", md: "2xl" }}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          maxW={{ base: "100vw", md: "980px" }}
          maxH={{ base: "100vh", md: "calc(100vh - 150px)" }}
          m={{ base: "0", md: "auto" }}
          borderRadius={{ base: "0", md: "md" }}
          overflowY="auto"
        >
          <FundingForm
            isOpen={isFundingFormOpen}
            onClose={() => setFundingFormOpen(false)}
            onSuccess={refreshWalletBalance} // Updated this line
          />
        </ModalContent>
      </Modal>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
      />

      {/* Recent Transactions Section */}
      <Box mt={{ base: "4", md: "6" }}>
        <Text
          fontSize={{ base: "18px", md: "20px" }}
          fontWeight="600"
          mb="4"
          color="brand.primary"
        >
          Recent Transactions
        </Text>
        <Box
          bg="white"
          borderRadius="12px"
          p={{ base: "3", md: "4" }}
          boxShadow="sm"
          overflowX={{ base: "auto", md: "visible" }}
        >
          <Transactions />
        </Box>
      </Box>
    </Box>
  )
}

export default Index
