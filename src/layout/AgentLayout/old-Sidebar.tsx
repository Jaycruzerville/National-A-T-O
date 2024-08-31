import PropTypes from "prop-types"
import { Box, Flex, Text, Icon, Collapse } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom"
import { ImFilesEmpty } from "react-icons/im"
import { AiOutlineCreditCard } from "react-icons/ai"
import { IoIosPeople } from "react-icons/io"
import {
  MdOutlineNotifications,
  MdOutlineVerifiedUser,
  MdOutlineRealEstateAgent,
} from "react-icons/md"
import { HiOutlineBuildingOffice } from "react-icons/hi2"
import { RiDashboardFill, RiAwardFill } from "react-icons/ri"
import { TbLogout } from "react-icons/tb"
import { Admin } from "@/routes/paths"
import Auth from "@/utils/auth"
import React, { useState } from "react"

interface SidebarProps {
  isMobileOpen: boolean
}

export const agentMenuItems = [
  {
    title: "Dashboard",
    path: Admin.DASHBOARD,
    icon: RiDashboardFill,
  },
  {
    title: "Claims",
    path: Admin.CLAIMS,
    icon: ImFilesEmpty,
  },
  {
    title: "Properties",
    path: Admin.Driver,
    icon: HiOutlineBuildingOffice,
    subItems: [
      {
        title: "All Properties",
        path: Admin.Driver,
        icon: MdOutlineRealEstateAgent,
      },
      {
        title: "Verified with owners",
        path: Admin.Driver_VWO,
        icon: MdOutlineVerifiedUser,
      },
      {
        title: "Verified with no owners",
        path: Admin.Driver_VNO,
        icon: RiAwardFill,
      },
    ],
  },
  {
    title: "Charges",
    path: Admin.Charges,
    icon: ImFilesEmpty,
  },
  {
    title: "Users",
    path: Admin.CUSTOMERS,
    icon: IoIosPeople,
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

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const headerHeight = "78px"
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const activeBg = "#fff"
  const inactiveBg = "transparent"
  const activeColor = "brand.primary"
  const inactiveColor = "#fff"

  const toggleMenu = (menuTitle: string) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle)
  }

  const isSubItemActive = (path: string) => location.pathname === path

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
      transition="all 0.3s ease"
      boxShadow="xl"
    >
      <Flex direction="column" mt="3" h="full" pt="4">
        {agentMenuItems.map(({ title, icon, path, subItems }) => {
          const isActive = location.pathname === path
          const hasActiveSubItem = subItems?.some((subItem) =>
            isSubItemActive(subItem.path)
          )

          return (
            <Box key={title}>
              <Box
                bg={isActive || hasActiveSubItem ? activeBg : inactiveBg}
                p="12px 20px"
                borderRadius="4px"
                mb="1"
                cursor="pointer"
                onClick={() => {
                  if (subItems) {
                    toggleMenu(title)
                  } else {
                    navigate(path)
                  }
                }}
                _hover={{
                  bg: isActive || hasActiveSubItem ? activeBg : "brand.hover",
                }}
              >
                <Flex align="center">
                  <Icon
                    as={icon}
                    color={
                      isActive || hasActiveSubItem ? activeColor : inactiveColor
                    }
                    boxSize="6"
                    mr="4"
                  />
                  <Text
                    color={
                      isActive || hasActiveSubItem ? activeColor : inactiveColor
                    }
                    fontWeight={
                      isActive || hasActiveSubItem ? "bold" : "normal"
                    }
                    fontSize="sm"
                    display={{ base: "none", md: "block" }}
                  >
                    {title}
                  </Text>
                </Flex>
              </Box>
              {subItems && (
                <Collapse in={openMenu === title || hasActiveSubItem}>
                  <Box pl="8">
                    {subItems.map((subItem) => (
                      <Box
                        key={subItem.title}
                        bg={
                          isSubItemActive(subItem.path) ? activeBg : inactiveBg
                        }
                        p="10px 20px"
                        borderRadius="4px"
                        mb="1"
                        cursor="pointer"
                        onClick={() => {
                          navigate(subItem.path)
                          setOpenMenu(title) // keep the menu open when navigating to a sub-item
                        }}
                        _hover={{
                          bg: isSubItemActive(subItem.path)
                            ? activeBg
                            : "brand.hover",
                        }}
                      >
                        <Flex align="center">
                          <Icon
                            as={subItem.icon}
                            color={
                              isSubItemActive(subItem.path)
                                ? activeColor
                                : inactiveColor
                            }
                            boxSize="6"
                            mr="4"
                          />
                          <Text
                            color={
                              isSubItemActive(subItem.path)
                                ? activeColor
                                : inactiveColor
                            }
                            fontWeight={
                              isSubItemActive(subItem.path) ? "bold" : "normal"
                            }
                            fontSize="sm"
                          >
                            {subItem.title}
                          </Text>
                        </Flex>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              )}
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
