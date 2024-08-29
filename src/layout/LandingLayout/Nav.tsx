import { HamburgerIcon } from "@chakra-ui/icons"
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react"
import { Link as RouteLink, useNavigate } from "react-router-dom"
// import { ReactComponent as CloseIcon } from "@/assets/closeIcon.svg"
import { ReactComponent as Logo } from "@/assets/nigeriapng.svg"

const Nav = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
  const { isOpen, onToggle, onClose } = useDisclosure()
  const navigate = useNavigate()

  const links = [
    { name: "FAQs", path: "/faq" },
    { name: "Privacy", path: "/privacy-policy" },
    { name: "Contact Us", path: "/contact" },
    { name: "Sign Up", path: "/auth/signup" },
  ]

  return (
    <>
      <Flex
        as="nav"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: "10px", md: "25px" }}
        py={{ base: "10px", md: "15px" }}
        bg="white"
        boxShadow="sm"
      >
        <Box as="button" onClick={() => navigate("/")} sx={{ unset: "all" }}>
          <Logo style={{ width: "120px", height: "50px" }} />
        </Box>
        {isSmallScreen ? (
          <IconButton
            onClick={onToggle}
            icon={<HamburgerIcon boxSize="6" color="brand.primary" />}
            aria-label="menu"
            variant="ghost"
          />
        ) : (
          <Flex gap="4" align="center">
            {links.map((link) => (
              <Link
                key={link.name}
                as={RouteLink}
                to={link.path}
                fontSize="lg"
                fontWeight="medium"
                color="brand.primary"
                _hover={{ textDecoration: "underline" }}
              >
                {link.name}
              </Link>
            ))}
          </Flex>
        )}
      </Flex>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="white">
          <DrawerBody>
            <Flex
              direction="column"
              gap="4"
              pt="4"
              alignItems="center"
              onClick={onClose}
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  as={RouteLink}
                  to={link.path}
                  fontSize="lg"
                  fontWeight="medium"
                  color="brand.primary"
                  _hover={{ textDecoration: "underline" }}
                >
                  {link.name}
                </Link>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Nav
