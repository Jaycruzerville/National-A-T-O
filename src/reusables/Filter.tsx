import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Divider } from "@chakra-ui/layout"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal"
import { IoFilterOutline } from "react-icons/io5"
import React from "react"

interface Props {
  children: React.ReactNode
  handleFilter: () => void
  handleClear: () => void
}

const Filter = ({ children, handleFilter, handleClear }: Props) => {
  const btnRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        leftIcon={<IoFilterOutline />}
        bg="#ffffff"
        variant="solid"
        color="brand.primary"
        border="0.5px solid #ACACAC"
        height="28px"
        ref={btnRef}
        width="59px"
        fontSize="10px"
        fontWeight="500"
        borderRadius="4px"
        onClick={onOpen}
      >
        Filter
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />{" "}
        {/* Add a darker background overlay */}
        <ModalContent bg="brand.bgLight" px="0">
          <ModalCloseButton top="3rem" color="brand.primary" />
          <ModalHeader
            pt="40px"
            fontWeight="500"
            fontSize="36px"
            lineHeight="45px"
            letterSpacing="-2px"
            color="brand.primary"
            pb="0px"
          >
            Filter
          </ModalHeader>
          <Divider borderColor="brand.primary" margin="0px 1rem" width="auto" />
          <ModalBody pt="28px" px="20px">
            {children}
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="space-between"
            borderTop="1px solid"
            pt="4px"
            marginX="20px"
            px="0px"
            pb="20px"
          >
            <Button
              p="0"
              textDecoration="underline"
              bg="none"
              fontSize="20px"
              lineHeight="25px"
              letterSpacing="-1px"
              _hover={{ bgColor: "none", opacity: "0.8" }}
              fontWeight="500"
              onClick={() => {
                handleClear()
                onClose()
              }}
            >
              Clear all
            </Button>
            <Button
              bgColor="brand.primary"
              color="#FFFFFF"
              width="191px"
              height="48px"
              _hover={{ bgColor: "none", opacity: "0.8" }}
              fontSize="20px"
              type="submit"
              fontWeight="500"
              onClick={() => {
                handleFilter()
                onClose()
              }}
            >
              Show results
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Filter
