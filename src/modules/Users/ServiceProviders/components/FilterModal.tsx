import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Divider, Flex, Text } from "@chakra-ui/layout"
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
import React, { useState } from "react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Select } from "@chakra-ui/select"
import { Input } from "@chakra-ui/input"
import { useFormik } from "formik"

interface FormValue {
  status: string
  numberOfUsers: number
  dateCreated: string
  lastActiveDate: string
}

const FilterModal = () => {
  const btnRef = React.useRef(null)
  const [, setFormValues] = useState<FormValue>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { handleChange, handleSubmit, values, resetForm } =
    useFormik<FormValue>({
      initialValues: {
        status: "",
        numberOfUsers: 0,
        dateCreated: "",
        lastActiveDate: "",
      },
      onSubmit: (values) => {
        setFormValues(values)
      },
    })

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
        <ModalOverlay />
        <ModalContent px="0">
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
            <form onSubmit={handleSubmit}>
              <Text
                fontWeight="500"
                lineHeight="25px"
                fontSize="20px"
                letterSpacing="-1px"
                pb="12px"
              >
                Status & Value
              </Text>
              <Flex gap="12px">
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Status
                  </FormLabel>
                  <Select
                    placeholder="Select Provider Status"
                    _placeholder={{ color: "#003E51" }}
                    name="status"
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    height="48px"
                    onChange={handleChange}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Transaction Value
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter number of users"
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    _placeholder={{ color: "#003E51" }}
                    id="address"
                    height="48px"
                    name="numberOfUsers"
                    onChange={handleChange}
                    value={values.numberOfUsers}
                  />
                </FormControl>
              </Flex>
              <Text
                fontWeight="500"
                lineHeight="25px"
                fontSize="20px"
                letterSpacing="-1px"
                pt="20px"
                pb="12px"
              >
                Date
              </Text>
              <Flex gap="12px" width="100%">
                <FormControl width="50%">
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Date Created
                  </FormLabel>
                  <Input
                    size="lg"
                    width="100%"
                    placeholder="Select Date"
                    px="14px"
                    type="date"
                    name="dateCreated"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    value={values.dateCreated}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl width="50%">
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Last Active Date
                  </FormLabel>
                  <Input
                    px="14px"
                    width="100%"
                    size="lg"
                    placeholder="Select Date"
                    name="lastActiveDate"
                    onChange={handleChange}
                    type="date"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    value={values.lastActiveDate}
                  />
                </FormControl>
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="space-between"
            borderTop="1px solid"
            pt="4px"
            marginX="20px"
            mt="5rem"
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
                resetForm()
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
            >
              Show 35 results
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FilterModal
