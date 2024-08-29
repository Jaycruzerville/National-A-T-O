import PropTypes from "prop-types"
import {
  // Avatar,
  Box,
  Flex,
  // HStack,
  //VStack,
  Text,
  Icon,
} from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
// import { FiUsers } from "react-icons/fi"
import { AiOutlineCreditCard } from "react-icons/ai"
// import { IoSettingsOutline } from "react-icons/io5"
// import { IoGiftOutline } from "react-icons/io5"
// import { IoIosPeople } from "react-icons/io"
// import { IoMdPeople } from "react-icons/io"
import {
  MdOutlineNotifications,
  //   MdLaptopWindows,
} from "react-icons/md"
import { HiOutlineBuildingOffice } from "react-icons/hi2"

import { RiDashboardFill } from "react-icons/ri"
import { TbLogout } from "react-icons/tb"
import { superAdmin } from "@/routes/paths"
import Auth from "@/utils/auth"
import React from "react"
// import { useState } from "react"
// import NotificationNumber from "@/reusables/NotificationNumber"

interface SidebarProps {
  isMobileOpen: boolean
}

export const agentMenuItems = [
  {
    title: "Dashboard",
    path: superAdmin.DASHBOARD,
    icon: RiDashboardFill,
  },
  // {
  //   title: "Agents",
  //   path: superAdmin.AGENTS,
  //   icon: FiUsers,
  // },
  // {
  //   title: "Super Agents",
  //   path: superAdmin.SUPERAGENTS,
  //   icon: MdLaptopWindows,
  // },
  {
    title: "Properties",
    path: superAdmin.Property,
    icon: HiOutlineBuildingOffice,
  },
  // {
  //   title: "Claims",
  //   path: superAdmin.CLAIMS,
  //   icon: IoGiftOutline,
  // },
  {
    title: "Transactions",
    path: superAdmin.TRANSACTIONS,
    icon: AiOutlineCreditCard,
  },
  // {
  //   title: "Customers",
  //   path: superAdmin.CUSTOMERS,
  //   icon: IoIosPeople,
  // },
  // {
  //   title: "Service Providers",
  //   path: superAdmin.SERVICEPROVIDERS,
  //   icon: IoMdPeople,
  // },
  {
    title: "Notifications",
    path: superAdmin.NOTIFICATIONS,
    icon: MdOutlineNotifications,
  },
  // {
  //   title: "Settings",
  //   path: superAdmin.SETTINGS,
  //   icon: IoSettingsOutline,
  //   position: "bottom",
  // },
  // {
  //   title: "Logout",
  //   path: "/",
  //   icon: HiOutlineArrowTopRightOnSquare,
  //   position: "bottom",
  // },
]

const logoutItem = {
  title: "Logout",
  path: "/",
  icon: TbLogout,
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const headerHeight = "78px"

  // Active and inactive styles
  const activeBg = "#fff" // white background for active link
  const inactiveBg = "transparent" // transparent for inactive
  const activeColor = "brand.primary" // color for text and icon when active
  const inactiveColor = "#fff" // white color text and icon when inactive

  return (
    <Box
      display={{ base: isMobileOpen ? "block" : "none", md: "block" }}
      position="fixed"
      top={headerHeight}
      left="0"
      h="calc(100vh - 78px)"
      w={{ base: "full", md: "250px" }}
      zIndex={10}
      bg="brand.primary"
      p="4"
      // overflowY="auto"
      transition="all 0.3s ease"
      boxShadow="xl"
    >
      <Flex direction="column" mt="3" h="full" pt="4">
        {agentMenuItems.map(({ title, icon, path }) => {
          const isActive = location.pathname.includes(path) // Adjust if you have nested paths

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
                bg: isActive ? activeBg : "brand.hover", // some hover color from your theme
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
                  display={{ base: "none", md: "block" }}
                >
                  {title}
                </Text>
              </Flex>
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
                display={{ base: "none", md: "block" }}
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

Sidebar.propTypes = {
  isMobileOpen: PropTypes.bool.isRequired,
}

export default Sidebar
