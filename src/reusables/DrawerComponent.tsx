import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react"
import React from "react"
import { BsPlusCircle } from "react-icons/bs"

interface Props {
  children: React.ReactNode
  title: string
  buttonText: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const DrawerComponent = ({
  children,
  title,
  buttonText,
  isOpen,
  onOpen,
  onClose,
}: Props) => {
  const btnRef = React.useRef(null)

  return (
    <>
      <Button
        rightIcon={<BsPlusCircle width="12px" height="12px" size={16} />}
        _hover={{ backgroundColor: "none", opacity: "5" }}
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
        {buttonText}
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay>
          <DrawerContent
            // This will set the background to a semi-transparent dark shade
            sx={{
              backdropFilter: "blur(10px)",
              backgroundColor: "#ffff",
            }}
          >
            <DrawerCloseButton top="50px" />
            <DrawerHeader
              pt="40px"
              fontWeight="700"
              fontSize="28px"
              lineHeight="45px"
              letterSpacing="-2px"
              pb="0px"
              textStyle="headText"
            >
              {title}
            </DrawerHeader>
            <DrawerBody pb="40px">{children}</DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default DrawerComponent
