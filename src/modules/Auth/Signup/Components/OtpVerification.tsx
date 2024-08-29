import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
  useDisclosure,
  Link,
} from "@chakra-ui/react"
import { useState } from "react"

const OTPVerification = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [otp, setOtp] = useState("")

  const handleVerifyClick = () => {
    console.log("Verify OTP:", otp)
    // Add your verification logic here
  }

  const handleResendClick = () => {
    console.log("Resend OTP")
    // Add your resend logic here
  }

  // Open the modal when the component mounts or based on certain conditions
  // useEffect(() => {
  //   onOpen();
  // }, [onOpen]);

  return (
    <>
      {/* This button is just for demonstration purposes. */}
      {/* In your application, you may trigger 'onOpen' in different ways */}
      <Button onClick={onOpen}>Open OTP Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="4">
              We Have Sent A One Time Password To +234******86003
            </Text>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr="3" onClick={handleVerifyClick}>
              Verify
            </Button>
            <Link color="red.500" onClick={handleResendClick}>
              Did not get OTP? Resend
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OTPVerification
