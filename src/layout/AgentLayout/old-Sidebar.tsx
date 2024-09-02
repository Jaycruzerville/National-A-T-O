import React from "react"
import { Box, Flex, Text, Icon } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { ImFilesEmpty } from "react-icons/im"
import { AiOutlineCreditCard } from "react-icons/ai"
import { MdOutlineNotifications } from "react-icons/md"
import { RiDashboardFill } from "react-icons/ri"
import { TbLogout } from "react-icons/tb"
import { Admin } from "@/routes/paths"
import Auth from "@/utils/auth"

export const agentMenuItems = [
  {
    title: "Dashboard",
    path: Admin.DASHBOARD,
    icon: RiDashboardFill,
  },
  {
    title: "Vouchers",
    path: Admin.CLAIMS,
    icon: ImFilesEmpty,
  },
  {
    title: "Transactions",
    path: Admin.TRANSACTIONS,
    icon: AiOutlineCreditCard,
  },
  {
    title: "Notifications",
    path: Admin.NOTIFICATIONS,
    icon: MdOutlineNotifications,
  },
]

const logoutItem = {
  title: "Logout",
  path: "/",
  icon: TbLogout,
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const headerHeight = "78px"

  const activeBg = "#fff"
  const inactiveBg = "transparent"
  const activeColor = "brand.primary"
  const inactiveColor = "#fff"

  return (
    <Box
      display={{ base: "none", md: "block" }} // Sidebar shows on medium screens and up
      position="fixed"
      top={headerHeight}
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
          const isActive = location.pathname === path

          return (
            <Box key={title}>
              <Box
                bg={isActive ? activeBg : inactiveBg}
                p="12px 20px"
                borderRadius="4px"
                mb="1"
                cursor="pointer"
                onClick={() => navigate(path)}
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
                    display={{ base: "none", md: "block" }} // Ensure text is visible on medium and up
                  >
                    {title}
                  </Text>
                </Flex>
              </Box>
            </Box>
          )
        })}
        <Flex direction="column" mt="auto" pb="4">
          <Box
            bg={location.pathname === logoutItem.path ? activeBg : inactiveBg}
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
                as={logoutItem.icon}
                color={
                  location.pathname === logoutItem.path
                    ? activeColor
                    : inactiveColor
                }
                boxSize="6"
                mr="4"
              />
              <Text
                color={
                  location.pathname === logoutItem.path
                    ? activeColor
                    : inactiveColor
                }
                fontWeight="bold"
                fontSize="sm"
                display={{ base: "none", md: "block" }} // Ensure text is visible on medium and up
              >
                {logoutItem.title}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Sidebar
