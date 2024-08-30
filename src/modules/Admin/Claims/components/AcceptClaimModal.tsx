import usersService from "@/services/usersServices"
import { IError } from "@/types"
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"

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
  const [assessedValue, setAssessedValue] = useState("")
  const [totalAmountDue, setTotalAmountDue] = useState("")
  const [discountedAmountDue, setDiscountedAmountDue] = useState("")

  const { mutate } = useMutation({
    mutationFn: usersService.toggleClaimsStatus,
    onSuccess: () => {
      toast({
        title: "Success",
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
        title: "Oops",
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
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" /> {/* Ensure darker overlay */}
        <ModalContent
          w="408px"
          bg="white"
          color="black"
          borderRadius="md"
          boxShadow="lg"
          opacity="1"
        >
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
            <FormControl mt={4}>
              <FormLabel>Assessed Value</FormLabel>
              <Input
                placeholder="Enter assessed value"
                value={assessedValue}
                onChange={(e) => setAssessedValue(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Total Amount Due</FormLabel>
              <Input
                placeholder="Enter total amount due"
                value={totalAmountDue}
                onChange={(e) => setTotalAmountDue(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Discounted Amount Due</FormLabel>
              <Input
                placeholder="Enter discounted amount due"
                value={discountedAmountDue}
                onChange={(e) => setDiscountedAmountDue(e.target.value)}
              />
            </FormControl>
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
