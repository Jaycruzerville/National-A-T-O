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

const ApproveSubmissionModal = ({
  submissionId,
}: {
  submissionId: string
  userId: string
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fontFamily = "'Cabinet Grotesk', sans-serif"

  const toast = useToast()
  const queryClient = useQueryClient()
  const [assessedValue, setAssessedValue] = useState("")
  const [totalAmountDue, setTotalAmountDue] = useState("")
  const [discountedAmountDue, setDiscountedAmountDue] = useState("")

  // Mutation for approving submission
  const { mutate: approveSubmission } = useMutation({
    mutationFn: () => usersService.approveSubmission(submissionId), // Approve submission from userService
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Submission approved successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      queryClient.invalidateQueries({ queryKey: ["driver-submissions"] })
    },
    onError: (error: IError) => {
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      })
    },
  })

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
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
        <ModalContent
          w="408px"
          bg="white"
          color="black"
          borderRadius="md"
          boxShadow="lg"
        >
          <ModalHeader
            fontSize={"36px"}
            fontWeight={500}
            fontFamily={fontFamily}
            top="24px"
          >
            Approve Submission
          </ModalHeader>
          <ModalCloseButton top="25px" />
          <ModalBody pb={6}>
            <Text
              fontSize={"18px"}
              fontWeight={700}
              fontFamily={fontFamily}
              color="#101828"
            >
              Are you sure you want to approve this submission?
            </Text>
            <Text color="#667085" fontSize="14px" fontFamily={fontFamily}>
              This action is irreversible.
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
                approveSubmission() // Trigger the approval
                onClose()
              }}
              bgColor="brand.primary"
              color="white"
              w="100%"
              h="48px"
              fontWeight={500}
            >
              Approve Submission
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ApproveSubmissionModal
