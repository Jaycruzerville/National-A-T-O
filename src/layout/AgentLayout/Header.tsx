import React from "react"
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
import { AiOutlineSetting } from "react-icons/ai"
import Notification from "@/modules/Users/Notifications"
import { HiOutlineLogout } from "react-icons/hi"
import Auth from "@/utils/auth"
import { ReactComponent as Logo } from "@/assets/Kano_logo.svg" // Ensure the logo path is correct

// Define the menu items that will be used in the sidebar and mobile dropdown
const agentMenuItems = [
  {
    title: "Dashboard",
    path: "/dashboard", // Update this path according to your routes
    icon: MdLaptopWindows, // Update the icon according to your needs
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: AiOutlineSetting,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: RiNotification2Fill,
  },
]

interface HeaderProps {
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Auth.logOut()
    navigate("/")
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
      <Flex justifyContent="space-between" alignItems="center">
        {/* Hamburger Menu for Mobile Screens */}
        <Box display={{ base: "inline-flex", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
              variant="ghost"
              size="sm"
              bg="brand.primary"
              color="white"
            />
            <MenuList>
              {agentMenuItems.map(({ title, path, icon }) => (
                <MenuItem
                  key={title}
                  icon={<Icon as={icon} />}
                  onClick={() => navigate(path)}
                >
                  {title}
                </MenuItem>
              ))}
              <MenuItem icon={<HiOutlineLogout />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* Logo centered on small screens */}
        <Box
          as="button"
          onClick={() => navigate("/")}
          sx={{ unset: "all" }}
          flex="1"
          textAlign="center"
          display={{ base: "inline-flex", md: "flex" }} // Ensures logo stays in the center on small screens
          justifyContent={{ base: "center", md: "flex-start" }} // Center on small screens
        >
          <Logo style={{ width: "120px", height: "40px" }} />
        </Box>

        {/* Rest of the Header */}
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
                    users
                  </Text>
                </VStack>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<MdLaptopWindows />}
                onClick={() => navigate("/profile")}
              >
                Profile
              </MenuItem>
              <MenuItem
                icon={<AiOutlineSetting />}
                onClick={() => navigate("/settings")}
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

export default Header
