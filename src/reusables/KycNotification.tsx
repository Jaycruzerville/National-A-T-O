import React from "react"
// import PropTypes from "prop-types"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Text,
  Box,
} from "@chakra-ui/react"
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons"
import { colors } from "@/theme/colors"
import { useNavigate } from "react-router-dom"

import { ReactComponent as KycImage } from "@/assets/identity-verification-icon.svg"

type KycNotificationProps = {
  status: "rejected" | "approved" | "pending"
}

const KycNotification: React.FC<KycNotificationProps> = ({ status }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  let heading
  let message
  let icon

  if (status === "rejected") {
    heading = "KYC REJECTED"
    message =
      "Your KYC request has been rejected. Please review and resubmit your personal data to proceed."
    icon = <WarningIcon color="red.500" />
  } else if (status === "approved") {
    heading = "KYC APPROVED"
    message =
      "Your KYC has been successfully approved. You now have full access to our services."
    icon = <CheckCircleIcon color="green.500" />
  } else {
    heading = "KYC PENDING"
    message = "Please submit your KYC documents to proceed."
    icon = <InfoIcon color="blue.500" />
  }

  React.useEffect(() => {
    onOpen()
  }, [onOpen])

  const handleActionClick = () => {
    if (status === "rejected" || status === "pending") {
      navigate("/kycform")
    } else {
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{heading}</ModalHeader>
        <ModalBody>
          <Box display="flex" justifyContent="center" mt={6}>
            <KycImage width="150px" height="150px" />
          </Box>
          <Box textAlign="center">
            {icon}
            <Text mt={4}>{message}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={colors.brand.primary}
            color={colors.gray[100]}
            _hover={{
              bg: colors.brand.primaryDark,
            }}
            mr={3}
            onClick={handleActionClick}
          >
            {status === "rejected" || status === "pending"
              ? "Go to KYC Form"
              : "OK"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

// KycNotification.propTypes = {
//   status: PropTypes.oneOf(["rejected", "approved", "pending"]).isRequired,
// }

export default KycNotification
