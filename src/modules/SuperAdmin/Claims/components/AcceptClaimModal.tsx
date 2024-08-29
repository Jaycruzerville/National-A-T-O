import SuperAdminService from "@/services/superAdminServices"
import { IError } from "@/types"
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"

const AcceptClaimModal = ({
  claimId,
  customerId,
}: {
  claimId: string
  customerId: string
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fontFamily = "'Cabinet Grotesk', sans-serif"

  const toast = useToast()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: SuperAdminService.toggleClaimsStatus,
    onSuccess: () => {
      toast({
        title: "success",
        description: "Claim Approved",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      queryClient.invalidateQueries({ queryKey: ["claims-list"] })
      queryClient.invalidateQueries({ queryKey: ["claims-details"] })
    },
    onError: (error: IError) => {
      toast({
        title: "opps",
        description: error?.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
  })

  const data = {
    status: "Approved",
  }

  return (
    <>
      <Button
        bgColor={"#9BFDD4"}
        borderRadius="4px"
        fontSize="12px"
        color={"#027A48"}
        fontWeight="500"
        h={"26px"}
        onClick={onOpen}
      >
        Approve
      </Button>

      <Modal closeOnOverlayClick isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="408px">
          <ModalHeader
            fontSize={"36px"}
            fontWeight={500}
            fontFamily={fontFamily}
            top="24px"
          >
            Acceptance
          </ModalHeader>
          <ModalCloseButton top="25px" />
          <ModalBody pb={6}>
            <Text
              fontSize={"18px"}
              fontWeight={700}
              fontFamily={fontFamily}
              color="#101828"
            >
              Accept claim
            </Text>
            <Text color="#667085" fontSize="14px" fontFamily={fontFamily}>
              Do you want to accept this claim? This action is irreversible
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                mutate({
                  customer_id: customerId,
                  claim_id: claimId,
                  data,
                })
                onClose()
              }}
              bgColor="brand.primary"
              color="white"
              w="100%"
              h="48px"
              fontWeight={500}
            >
              Accept Claim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AcceptClaimModal
