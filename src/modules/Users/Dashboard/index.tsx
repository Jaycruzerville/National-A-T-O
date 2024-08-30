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
import Transactions from "@/reusables/Transactions"
import MiniStatistics from "@/reusables/MiniStatistics"
import IconBox from "@/reusables/icons/IconBox"
import RegisterDriver from "@/modules/Users/Driver/RegisterDriver"
import { colors } from "@/theme/colors"
import { getDayPeriod } from "@/utils/getDayPeriod"

interface Driver {
  id: number
  name: string
  vehicle: string
  status: string // Active or Inactive
  qrCodeValue: string
  registrationDate: string
}

const Index: React.FC = () => {
  const [, setDrivers] = useState<Driver[]>([])
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [isRegisterDriverOpen, setRegisterDriverOpen] = useState(false)
  const [isBuyVoucherOpen, setBuyVoucherOpen] = useState(false)

  useEffect(() => {
    const driver = {
      id: 1,
      name: "John Doe",
      vehicle: "Toyota Camry 2019",
      status: "Active",
      qrCodeValue: "QR-1234567890",
      registrationDate: "2023-08-30",
    }
    setDrivers([driver])
    setSelectedDriver(driver)
  }, [])

  return (
    <Box py="6" px="5" bg="#F6F6F6" minH="100vh">
      <Flex mb="10px" justifyContent="space-between" alignItems="center">
        <Text fontSize="28px" fontWeight={500}>
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
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" mb="20px">
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
                    selectedDriver && selectedDriver.status === "Active"
                      ? FaCheckCircle
                      : FaTimesCircle
                  }
                  color={
                    selectedDriver && selectedDriver.status === "Active"
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
        <Box
          p="16px"
          bg={colors.white.text}
          borderRadius="15px"
          boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
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
      <Transactions /> {/* Transaction table remains here */}
      <Modal
        isOpen={isRegisterDriverOpen}
        onClose={() => setRegisterDriverOpen(false)}
        isCentered
        size="2x1"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="980px" maxH="calc(100vh - 150px)" overflowY="auto">
          <RegisterDriver onClose={() => setRegisterDriverOpen(false)} />
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
          {/* You can place the Buy Voucher form or functionality here */}
          <Box p="4">
            <Text>Buy Voucher Functionality Here</Text>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Index
