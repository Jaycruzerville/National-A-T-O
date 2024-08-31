import React from "react"
import { Box, Flex, Text, Icon } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { AiOutlineCreditCard } from "react-icons/ai"
import { MdOutlineNotifications } from "react-icons/md"
import { RiDashboardFill } from "react-icons/ri"
import { TbLogout } from "react-icons/tb"
import Auth from "@/utils/auth"

export const agentMenuItems = [
  {
    title: "Dashboard",
    path: "/dashboard", // Example path
    icon: RiDashboardFill,
  },
  {
    title: "Transactions",
    path: "/transactions", // Example path
    icon: AiOutlineCreditCard,
  },
  {
    title: "Notifications",
    path: "/notifications", // Example path
    icon: MdOutlineNotifications,
  },
]

interface SidebarProps {
  isSidebarOpen: boolean // Prop for controlling sidebar visibility
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const activeBg = "#fff"
  const inactiveBg = "transparent"
  const activeColor = "brand.primary"
  const inactiveColor = "#fff"

  return (
    <Box
      display={{ base: "none", md: isSidebarOpen ? "block" : "none" }} // Hide sidebar completely on small screens
      position="fixed"
      top="78px"
      left="0"
      h="calc(100vh - 78px)"
      w="250px"
      zIndex={10}
      bg="brand.primary"
      p="4"
      transition="all 0.3s ease"
      boxShadow="xl"
    >
      <Flex direction="column" mt="3" h="full" pt="4">
        {agentMenuItems.map(({ title, icon, path }) => {
          const isActive = location.pathname.includes(path)

          return (
            <Box
              key={title}
              bg={isActive ? activeBg : inactiveBg}
              p="12px 20px"
              borderRadius="4px"
              mb="1"
              cursor="pointer"
              onClick={() => {
                if (title === "Logout") {
                  Auth.logOut()
                } else {
                  navigate(path)
                }
              }}
              _hover={{
                bg: isActive ? activeBg : "brand.hover",
              }}
            >
              <Flex align="center">
                <Icon
                  as={icon}
                  color={isActive ? activeColor : inactiveColor}
                  boxSize="6"
                  mr="4"
                />
                <Text
                  color={isActive ? activeColor : inactiveColor}
                  fontWeight={isActive ? "bold" : "normal"}
                  fontSize="sm"
                  display={{ base: "none", md: "block" }} // Ensure text is hidden on small screens
                >
                  {title}
                </Text>
              </Flex>
            </Box>
          )
        })}
        <Flex direction="column" mt="auto" pb="4">
          <Box
            bg={location.pathname === "/" ? activeBg : inactiveBg}
            p="12px 20px"
            borderRadius="4px"
            mb="1"
            cursor="pointer"
            onClick={() => {
              Auth.logOut()
            }}
            _hover={{
              bg: "brand.hover",
            }}
          >
            <Flex align="center">
              <Icon
                as={TbLogout}
                color={location.pathname === "/" ? activeColor : inactiveColor}
                boxSize="6"
                mr="4"
              />
              <Text
                color={location.pathname === "/" ? activeColor : inactiveColor}
                fontWeight="bold"
                fontSize="sm"
                display={{ base: "none", md: "block" }} // Ensure text is hidden on small screens
              >
                Logout
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Sidebar
