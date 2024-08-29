import React from "react"
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { Document, Page, pdfjs } from "react-pdf"
import Eye from "@/assets/blue-eye-icon.svg"
import Back from "@/assets/back-icon.svg"
import Forward from "@/assets/forward-icon.svg"
import { Link as RouteLink } from "react-router-dom"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const ViewReceiptModal = ({ images }: { images: string[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const fontFamily = "'Cabinet Grotesk', sans-serif"

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((currentIndex + 1) % images.length)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length)
    }
  }
  const toast = useToast()

  return (
    <>
      <Button
        fontSize="12px"
        gap={"4px"}
        width="73px"
        height="24px"
        onClick={(e) => {
          e.stopPropagation()
          if (images?.length < 1) {
            toast({
              title: "oops!",
              description: "No supporting documents",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            })
          } else {
            onOpen()
          }
        }}
      >
        <Image src={Eye} />
        View
      </Button>

      {images?.length > 0 && (
        <Modal
          closeOnOverlayClick
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size={"3xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize={"24px"}
              fontWeight={500}
              fontFamily={fontFamily}
              top="24px"
            ></ModalHeader>
            <ModalCloseButton top="25px" />
            <ModalBody pb={6}>
              <Text
                fontSize={"24px"}
                fontWeight={700}
                fontFamily={fontFamily}
                color="#101828"
                textAlign={"center"}
              >
                {`${currentIndex + 1} / ${images.length}`}
              </Text>
              <Flex justifyContent="center" alignItems="center">
                <Button
                  onClick={handlePrev}
                  variant="unstyled"
                  mr="31px"
                  disabled={currentIndex === 0}
                >
                  <Image src={Back} alt="Previous" />
                </Button>
                <Box w="80%" minH="400px">
                  {images[currentIndex].endsWith(".pdf") ? (
                    <Document file={images[currentIndex]}>
                      <Page pageNumber={1} />
                    </Document>
                  ) : (
                    <Image
                      src={images[currentIndex]}
                      alt="Document"
                      w="100%"
                      h="auto"
                      maxH={"600px"}
                      minH={"300px"}
                      objectFit="contain"
                    />
                  )}
                </Box>
                <Button
                  onClick={handleNext}
                  variant="unstyled"
                  ml="31px"
                  disabled={currentIndex === images.length - 1}
                >
                  <Image src={Forward} alt="Next" transform="rotate(180deg)" />
                </Button>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                bgColor="brand.primary"
                color="white"
                mx={"auto"}
                fontWeight={500}
                as={RouteLink}
                to={images[currentIndex]}
                download="download"
                target="_blank"
                rel="noreferrer"
                size="md"
                _hover={{ bgColor: "brand.primary", opacity: 0.8 }}
              >
                Download
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default ViewReceiptModal
