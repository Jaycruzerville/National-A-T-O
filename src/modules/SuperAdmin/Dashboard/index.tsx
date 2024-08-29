import React, { useState, useEffect } from "react"
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Modal,
  ModalOverlay,
  SimpleGrid,
  FormLabel,
  Select,
  ModalContent,
  useColorModeValue,
  Button,
  Icon,
} from "@chakra-ui/react"
import { MdAddTask, MdAdd, MdOutlineAccountBalanceWallet } from "react-icons/md"
import { BsHouses } from "react-icons/bs"
import { FaArrowCircleUp } from "react-icons/fa"
import { RiMailSendLine } from "react-icons/ri"
import { TbCurrencyNaira } from "react-icons/tb"
import { HiOutlineBuildingOffice } from "react-icons/hi2"
import MiniStatistics from "@/reusables/MiniStatistics"
import IconBox from "@/reusables/icons/IconBox"
import Transactions from "@/reusables/Transactions"
import RegisterProperty from "@/modules/SuperAdmin/Property/RegisterProperty"
import { colors } from "@/theme/colors"
import { getDayPeriod } from "@/utils/getDayPeriod"

interface Property {
  id: number
  name: string
  value: string
  payments: string
  tasks: string
  projects: string
}

const Index: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  )
  const [isRegisterPropertyOpen, setRegisterPropertyOpen] = useState(false)
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100")
  const cardShadow = useColorModeValue("lg", "dark-lg")

  useEffect(() => {
    setProperties([
      {
        id: 1,
        name: "Ascorn",
        value: "18,409,300",
        payments: "750,400",
        tasks: "10",
        projects: "3",
      },
      {
        id: 2,
        name: "Boulevard",
        value: "27,579,360",
        payments: "950,900",
        tasks: "15",
        projects: "4",
      },
    ])
  }, [])

  return (
    <Box py="6" px="5" bg="#F6F6F6" minH="100vh">
      <Flex mb="10px" justifyContent="space-between">
        <Text fontSize="28px" fontWeight={500}>
          Good {getDayPeriod()} Folashade!
        </Text>
        <Flex>
          <Menu>
            <MenuButton
              as={Button}
              bg="brand.primary"
              color="white"
              rightIcon={<Icon as={MdAddTask} />}
              mr="4"
            >
              Select Property
            </MenuButton>
            <MenuList>
              {properties.map((prop) => (
                <MenuItem
                  key={prop.id}
                  onClick={() => setSelectedProperty(prop)}
                >
                  {prop.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button
            bg="brand.primary"
            color="white"
            leftIcon={<Icon as={MdAdd} />}
            onClick={() => setRegisterPropertyOpen(true)}
          >
            Add Property
          </Button>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" mb="20px">
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={HiOutlineBuildingOffice}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Property"
          value={selectedProperty ? selectedProperty.name : "Null"}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={TbCurrencyNaira}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Pending Payments"
          value={`₦${selectedProperty ? selectedProperty.payments : "0"}`}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
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
          growth="+23%"
          name="Assets value"
          value={`₦${selectedProperty ? selectedProperty.value : "0"}`}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={MdOutlineAccountBalanceWallet}
                  color={colors.brand.primary}
                />
              }
            />
          }
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance"></FormLabel>
              <Select
                id="balance"
                variant="mini"
                mt="5px"
                me="0px"
                defaultValue="NGN"
              >
                <option value="usd">NGN</option>
                <option value="eur">EUR</option>
                <option value="gba">GBA</option>
              </Select>
            </Flex>
          }
          name="Your balance"
          value="0"
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="28px"
                  h="28px"
                  as={RiMailSendLine}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="New Messages"
          value={`${selectedProperty ? selectedProperty.tasks : "0"}`}
        />
        <MiniStatistics
          shadow={cardShadow}
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon
                  w="32px"
                  h="32px"
                  as={BsHouses}
                  color={colors.brand.primary}
                />
              }
            />
          }
          name="Total Buildings"
          value={`${selectedProperty ? selectedProperty.projects : "0"}`}
        />
      </SimpleGrid>
      <Modal
        isOpen={isRegisterPropertyOpen}
        onClose={() => setRegisterPropertyOpen(false)}
        isCentered
        size="2x1"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent maxW="980px" maxH="calc(100vh - 150px)" overflowY="auto">
          <RegisterProperty onClose={() => setRegisterPropertyOpen(false)} />
        </ModalContent>
      </Modal>
      <Transactions />
    </Box>
  )
}

export default Index
