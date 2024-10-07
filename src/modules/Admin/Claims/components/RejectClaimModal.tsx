import React from "react"
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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import usersService from "@/services/usersServices"
import { IError } from "@/types"

interface RejectClaimModalProps {
  claimId?: string // Make claimId optional
}

const RejectClaimModal: React.FC<RejectClaimModalProps> = ({ claimId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fontFamily = "'Cabinet Grotesk', sans-serif"
  const [review, setReview] = React.useState("")
  const queryClient = useQueryClient()
  const toast = useToast()

  const { mutate } = useMutation({
    mutationFn: () => {
      if (claimId) {
        return usersService.declineSubmission(claimId, review)
      }
      return Promise.reject(new Error("No claim ID provided"))
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Submission Rejected",
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
        title: "Error",
        description: error?.message || "Failed to reject submission",
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
        bgColor={"#F7CECA"}
        borderRadius="4px"
        fontSize="12px"
        color={"#D92D20"}
        fontWeight="500"
        h={"26px"}
        onClick={onOpen}
      >
        Reject
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
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
            Rejection
          </ModalHeader>
          <ModalCloseButton top="25px" />
          <ModalBody pb={6}>
            <Text
              fontSize={"18px"}
              fontWeight={700}
              fontFamily={fontFamily}
              color="#101828"
            >
              Reject Submission
            </Text>
            <Textarea
              color={"#667085"}
              fontSize={"14px"}
              fontFamily={fontFamily}
              outline="#D9DDE3"
              focusBorderColor="#D9DDE3"
              mt="6px"
              h="231px"
              placeholder="Enter Reason"
              _placeholder={{
                color: "#003E51",
              }}
              value={review}
              onChange={(e) => {
                setReview(e.target.value)
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                mutate() // Trigger the mutation
                onClose()
              }}
              bgColor="brand.primary"
              color="white"
              w="100%"
              h="48px"
              fontWeight={500}
              isDisabled={!claimId} // Disable button if claimId is missing
            >
              Reject Submission
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default RejectClaimModal
