import React, { useState, useEffect } from "react"
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  Center,
} from "@chakra-ui/react"
import {
  FaArrowCircleUp,
  FaTruck,
  FaBusAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaQrcode,
} from "react-icons/fa"
import QRCode from "react-qr-code"
import DailyVouchers from "@/reusables/DailyVouchers"
import MiniStatistics from "@/reusables/MiniStatistics"
import IconBox from "@/reusables/icons/IconBox"
import RegisterDriver from "@/modules/Users/Driver/RegisterDriver"
import { colors } from "@/theme/colors"
import { getDayPeriod } from "@/utils/getDayPeriod"
import lookupService from "@/services/lookupService"

interface DriverProfile {
  name: string
  vehicle: string
  status: string
  qrCodeValue: string
  registrationDate: string
}

const Index: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<DriverProfile | null>(
    null
  )
  const [isRegisterDriverOpen, setRegisterDriverOpen] = useState(false)
  const [isBuyVoucherOpen, setBuyVoucherOpen] = useState(false)
  const [isPendingApproval, setIsPendingApproval] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const status = await lookupService.getDriverSubmissionStatus()
        if (!status.submitted) {
          setRegisterDriverOpen(true)
        } else if (status.status === "pending") {
          setIsPendingApproval(true)
        } else {
          const profile = await lookupService.getDriverProfile()
          setSelectedDriver({
            name: profile.fullName,
            vehicle: `${profile.vehicleType} ${profile.vehicleMake} ${profile.plateNumber} ${profile.vin}`,
            status: profile.activeForDay ? "Active" : "Inactive",
            qrCodeValue: profile.qrCode,
            registrationDate: new Date(
              profile.registrationDate
            ).toLocaleDateString(),
          })
        }
      } catch (error) {
        console.error("Dashboard initialization failed:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeDashboard()
  }, [hasSubmitted])

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color={colors.brand.primary} />
      </Center>
    )
  }

  return (
    <Box py="6" px="5" bg="#F6F6F6" minH="100vh">
      {isPendingApproval && (
        <Box
          bg={colors.gray[100]}
          p={4}
          mb={6}
          borderRadius="md"
          color={colors.gray[600]}
        >
          <Text fontWeight="medium">
            Your registration is pending approval from a SuperAgent. Please
            check back later.
          </Text>
        </Box>
      )}

      <Flex mb="10px" justifyContent="space-between" alignItems="center">
        <Text
          fontSize="28px"
          fontWeight={500}
          display={{ base: "none", md: "block" }}
        >
          Good {getDayPeriod()} Folashade!
        </Text>
        <Flex gap="4">
          <Button
            bg={colors.brand.primary}
            color="white"
            leftIcon={<Icon as={FaTruck} />}
            onClick={() => setRegisterDriverOpen(true)}
          >
            Add Driver
          </Button>
          <Button
            bg={colors.active[800]}
            color="white"
            leftIcon={<Icon as={FaQrcode} />}
            onClick={() => setBuyVoucherOpen(true)}
          >
            Buy Voucher
          </Button>
        </Flex>
      </Flex>

      <Flex mb="20px" direction={{ base: "column", lg: "row" }}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing="20px"
          flex="3"
          mb={{ base: "20px", lg: "0" }}
        >
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={colors.gray[100]}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={FaTruck}
                    color={colors.brand.primary}
                  />
                }
              />
            }
            name="Driver"
            value={selectedDriver ? selectedDriver.name : "No Driver Selected"}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={colors.gray[100]}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={FaBusAlt}
                    color={colors.brand.primary}
                  />
                }
              />
            }
            name="Vehicle"
            value={selectedDriver ? selectedDriver.vehicle : "No Vehicle"}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={colors.gray[100]}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={
                      selectedDriver?.status === "Active"
                        ? FaCheckCircle
                        : FaTimesCircle
                    }
                    color={
                      selectedDriver?.status === "Active"
                        ? colors.success[800]
                        : colors.danger[800]
                    }
                  />
                }
              />
            }
            name="Status"
            value={selectedDriver ? selectedDriver.status : "Unknown"}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={colors.gray[100]}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={FaArrowCircleUp}
                    color={colors.brand.primary}
                  />
                }
              />
            }
            name="Registration Date"
            value={selectedDriver ? selectedDriver.registrationDate : "Unknown"}
          />
        </SimpleGrid>

        <Box
          p="16px"
          bg={colors.white.text}
          borderRadius="15px"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          ml={{ base: "0", lg: "20px" }}
          flex="1"
        >
          <Icon
            as={FaQrcode}
            w={6}
            h={6}
            mb="10px"
            color={colors.brand.primary}
          />
          <QRCode value={selectedDriver?.qrCodeValue || ""} size={128} />
          <Text mt="10px" fontSize="md" color={colors.brand.textPrimary}>
            QR Code
          </Text>
        </Box>
      </Flex>

      <DailyVouchers />

      <Modal
        isOpen={isRegisterDriverOpen}
        onClose={() => setRegisterDriverOpen(false)}
        isCentered
        size="2x1"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="980px" maxH="calc(100vh - 150px)" overflowY="auto">
          <RegisterDriver
            onClose={() => setRegisterDriverOpen(false)}
            setHasSubmitted={setHasSubmitted}
          />
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isBuyVoucherOpen}
        onClose={() => setBuyVoucherOpen(false)}
        isCentered
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <Box p="4">
            <Text>Buy Voucher Functionality Here</Text>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Index
