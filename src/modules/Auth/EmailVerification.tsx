// src/components/EmailVerificationPage.jsx
import { Box, Button, Text, VStack, Image, Container } from "@chakra-ui/react"
import { ReactComponent as Logo } from "@/assets/Kano_logo.svg"
import email from "@/assets/emailveri.png"
import star from "@/assets/star1.png"
import star2 from "@/assets/star2.png"
import star3 from "@/assets/star3.png"
import check from "@/assets/emailcheck.png"
import { useNavigate } from "react-router-dom"

const EmailVerificationPage = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate("/auth/signin")
  }

  const stars = [
    { src: star, size: ["15px", "20px", "25px"] },
    { src: star2, size: ["20px", "25px", "30px"] },
    { src: star3, size: ["10px", "15px", "20px"] },
    { src: star, size: ["15px", "20px", "25px"] },
    { src: star2, size: ["20px", "25px", "30px"] },
    { src: star3, size: ["10px", "15px", "20px"] },
    { src: star, size: ["15px", "20px", "25px"] },
    { src: star2, size: ["20px", "25px", "30px"] },
    { src: star3, size: ["10px", "15px", "20px"] },
    { src: star, size: ["15px", "20px", "25px"] },
    { src: star2, size: ["20px", "25px", "30px"] },
    { src: star3, size: ["10px", "15px", "20px"] },
  ]

  const starPositions = [
    { top: "-30px", left: "40px" },
    { top: "-40px", left: "100px" },
    { top: "10px", left: "150px" },
    { top: "50px", left: "-40px" },
    { top: "60px", left: "200px" },
    { top: "100px", left: "0px" },
    { top: "90px", left: "160px" },
    { top: "-10px", left: "-30px" },
    { top: "-20px", left: "180px" },
    { top: "120px", left: "180px" },
    { top: "80px", left: "-50px" },
    { top: "90px", left: "220px" },
  ]

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      p={[4, 6, 8]} // Padding for mobile responsiveness
    >
      {/* Add oval shapes */}
      <Box
        position="absolute"
        top={["150px", "200px", "200px"]}
        bottom="20px"
        left={["-20%", "-30%", "-43%"]}
        width={["800px", "1200px", "1482px"]}
        height={["300px", "500px", "666px"]}
        bg="#E0FFE9"
        borderRadius="60%"
        zIndex={0}
      />
      <Box
        position="absolute"
        top={["226.52px", "326.52px", "326.52px"]}
        bottom="0"
        left={["50px", "150px", "289.2px"]}
        width={["600px", "800px", "976px"]}
        height={["200px", "300px", "462px"]}
        bg="#E0FFE9"
        borderRadius="60%"
        zIndex={0}
        transform="rotate(-8.75deg)"
      />
      <Box
        position="absolute"
        top={["273.66px", "373.66px", "373.66px"]}
        bottom="0"
        left={["30%", "45%", "61%"]}
        width={["500px", "600px", "780px"]}
        height={["200px", "300px", "400px"]}
        bg="#E0FFE9"
        borderRadius="60%"
        zIndex={0}
        transform="rotate(-10.75deg)"
      />

      <Container centerContent zIndex={1}>
        <Box height={["70px", "100px", "140px"]} /> {/* Spacer Box */}
        <VStack spacing={[2, 4, 6]} p={10}>
          <Logo
            style={{
              width: "120px",
              height: "40px",
              position: "absolute",
              top: "20px",
              left: "20px",
            }}
          />
          <Box position="relative" display="inline-block">
            <Image
              src={email} // Replace with the path to your image
              boxSize={["100px", "120px", "150px"]}
            />
            <Image
              src={check} // Replace with the path to your image
              boxSize={["30px", "35px", "45px"]}
              position="absolute"
              bottom="0"
              right="-15px"
            />
            {stars.map((star, index) => (
              <Image
                key={index}
                src={star.src}
                boxSize={star.size}
                position="absolute"
                top={starPositions[index].top}
                left={starPositions[index].left}
              />
            ))}
          </Box>
          <Box textAlign="center" mx="auto" maxW={["300px", "500px", "800px"]}>
            <Text
              color="active.800"
              fontWeight="bold"
              fontSize={["md", "lg", "xl"]}
              mb={2}
            >
              Thank you! Your email has been successfully verified.
            </Text>
            <Text color={"gray.700"} fontSize={["md", "lg", "xl"]}>
              You can now proceed to login or explore our application.
            </Text>
          </Box>
          <Button
            colorScheme="green"
            bg="green.400"
            color="white"
            _hover={{ bg: "green.500" }}
            size={["md", "lg", "lg"]}
            onClick={handleButtonClick}
            mt={4}
          >
            Let’s go
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

export default EmailVerificationPage
