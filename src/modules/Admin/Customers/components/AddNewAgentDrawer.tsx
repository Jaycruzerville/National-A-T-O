import useStateAndLGA from "@/hooks/useStateAndLGA"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import React, { useState } from "react"
import { BsPlusCircle } from "react-icons/bs"

interface FormValue {
  name: string
  number: string
  email: string
  address: string
  state: string
  lga: string
}

const AddNewAgentDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const [, setFormValues] = useState<FormValue>()
  const [selectedState, setselectedState] = useState("")
  const { states, LGAs } = useStateAndLGA(selectedState)

  const { handleChange, handleSubmit, values } = useFormik<FormValue>({
    initialValues: {
      name: "",
      number: "",
      email: "",
      address: "",
      state: "",
      lga: "",
    },
    onSubmit: (values) => {
      setFormValues(values)
    },
  })

  return (
    <>
      <Button
        rightIcon={<BsPlusCircle width="12px" height="12px" />}
        _hover={{ backgroundColor: "none", opacity: "0.5" }}
        bg="brand.primary"
        color="#ffffff"
        height="28px"
        variant="solid"
        fontSize="10px"
        fontWeight="500"
        borderRadius="4px"
        ref={btnRef}
        onClick={onOpen}
      >
        Add New Agent
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top="50px" />
          <DrawerHeader
            pt="40px"
            fontWeight="500"
            fontSize="36px"
            lineHeight="45px"
            letterSpacing="-2px"
            pb="0px"
          >
            Add New Agent
          </DrawerHeader>

          <DrawerBody pb="40px">
            <form onSubmit={handleSubmit}>
              <Flex flexDir="column" gap="12px">
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Name
                  </FormLabel>
                  <Input
                    type="name"
                    placeholder="Enter Agent Name"
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    _placeholder={{ color: "#003E51" }}
                    id="name"
                    name="name"
                    height="48px"
                    onChange={handleChange}
                    value={values.name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Phone Number
                  </FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter Agent Phone Number"
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    _placeholder={{ color: "#003E51" }}
                    id="number"
                    name="number"
                    height="48px"
                    onChange={handleChange}
                    value={values.number}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter Agent Email Address"
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    _placeholder={{ color: "#003E51" }}
                    id="email"
                    name="email"
                    height="48px"
                    onChange={handleChange}
                    value={values.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Address
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Agent Full Address"
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    _placeholder={{ color: "#003E51" }}
                    id="address"
                    name="address"
                    height="48px"
                    onChange={handleChange}
                    value={values.address}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Select State
                  </FormLabel>
                  <Select
                    placeholder="Select Agent State"
                    _placeholder={{ color: "#003E51" }}
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    name="state"
                    onChange={(e) => {
                      handleChange(e)
                      setselectedState(e.target.value)
                    }}
                  >
                    {states?.map((state: string, index: number) => (
                      <option value={state} key={index}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel
                    lineHeight="20px"
                    fontWeight="500"
                    fontSize="0.75rem"
                    color="#003E51"
                  >
                    Select LGA
                  </FormLabel>
                  <Select
                    placeholder="Select Agent LGA"
                    _placeholder={{ color: "#003E51" }}
                    fontSize="14px"
                    _hover={{ outline: "none" }}
                    _focusVisible={{ borderColor: "none", boxShadow: "none" }}
                    name="lga"
                    onChange={handleChange}
                  >
                    {LGAs?.map((LGA: string, index: number) => (
                      <option value={LGA} key={index}>
                        {LGA}
                      </option>
                    ))}{" "}
                  </Select>
                </FormControl>

                <Button
                  bgColor="brand.primary"
                  type="submit"
                  color="#ffffff"
                  height="48px"
                  _hover={{ bgColor: "none", opacity: "0.8" }}
                >
                  Add Agent
                </Button>
              </Flex>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddNewAgentDrawer
