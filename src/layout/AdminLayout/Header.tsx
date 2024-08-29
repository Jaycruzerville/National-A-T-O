import PropTypes from "prop-types"
import {
  Button,
  Flex,
  GridItem,
  Avatar,
  VStack,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import { MdLaptopWindows } from "react-icons/md"
import { RiNotification2Fill } from "react-icons/ri"
import { colors } from "@/theme/colors"
import { AiOutlineSetting } from "react-icons/ai" // Import the settings icon
import { HiOutlineLogout } from "react-icons/hi" // Import the logout icon
import { superAdmin } from "@/routes/paths"
import Notification from "@/modules/SuperAdmin/Notifications"
import Auth from "@/utils/auth"
import { ReactComponent as Logo } from "@/assets/nigeriapng.svg"
import React from "react"

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Auth.logOut() // Make sure this function correctly logs the user out
    navigate("/") // Redirect to the homepage or login page after logout
  }

  return (
    <GridItem
      color="brand.primary"
      borderBottom="1px solid #C0C9D8"
      p="18px 20px"
      shadow="lg"
      position="fixed"
      top="0"
      right="0"
      left="0"
      zIndex="sticky"
      bg="white"
    >
      <Flex justifyContent="space-between">
        <Box as="button" onClick={() => navigate("/")} sx={{ unset: "all" }}>
          <Logo style={{ width: "120px", height: "40px" }} />
        </Box>
        <HStack spacing="2" align="center">
          <IconButton
            icon={<HamburgerIcon />}
            display={{ base: "inline-flex", md: "none" }}
            aria-label="Toggle sidebar"
            onClick={toggleSidebar}
            variant="ghost"
            size="sm"
            bg={colors.brand.primary}
            color={colors.brand.bgLight}
          />
        </HStack>
        <HStack spacing={4}>
          <Menu placement="bottom-end">
            <MenuButton>
              <Icon
                boxSize="24px"
                as={RiNotification2Fill}
                color="brand.primary"
              />
            </MenuButton>
            <MenuList
              p="5px"
              maxH="500px"
              overflow="scroll"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "gray.100",
                  boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.1)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#CDCED9",
                },
              }}
            >
              <Notification />
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <Flex align="center">
                <Avatar
                  name="Profile Name"
                  src="path/to/profile/image.jpg"
                  backgroundColor="brand.primary"
                />
                <VStack
                  display={{ base: "none", md: "block" }}
                  spacing="0"
                  alignItems="flex-start"
                  ml="2" // Add left margin to space the text from the avatar
                >
                  <Text color="brand.primary" fontSize="sm" fontWeight="bold">
                    Folashade Badru
                  </Text>
                  <Text color="brand.primary" fontSize="xs">
                    SuperAdmin
                  </Text>
                </VStack>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<MdLaptopWindows />}
                onClick={() => navigate(superAdmin.PROFILE)}
              >
                Profile
              </MenuItem>
              <MenuItem
                icon={<AiOutlineSetting />}
                onClick={() => navigate(superAdmin.SETTINGS)}
              >
                Settings
              </MenuItem>
              <MenuItem icon={<HiOutlineLogout />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </GridItem>
  )
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
}

export default Header
