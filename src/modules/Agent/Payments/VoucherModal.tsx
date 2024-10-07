import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react"

interface VoucherModalProps {
  isOpen: boolean
  onClose: () => void
  voucherDetails: {
    driverName: string
    vehiclePlateNumber: string
    type: string
    amount: string
    qrCode: string
  }
}

const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  voucherDetails,
}) => {
  const toast = useToast()

  const handlePrint = () => {
    // Open print window
    window.print()
    toast({
      title: "Printing voucher...",
      status: "info",
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"white"}>
        <ModalHeader>Voucher Details</ModalHeader>
        <ModalBody>
          <Text>Driver Name: {voucherDetails.driverName}</Text>
          <Text>Vehicle Plate: {voucherDetails.vehiclePlateNumber}</Text>
          <Text>Voucher Type: {voucherDetails.type}</Text>
          <Text>Amount: ₦{voucherDetails.amount}</Text>
          <Text>
            <img src={voucherDetails.qrCode} alt="QR Code" width="150px" />
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button bg="brand.primary" textColor={"white"} onClick={handlePrint}>
            Print Voucher
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default VoucherModal
