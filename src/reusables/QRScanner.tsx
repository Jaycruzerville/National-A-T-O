import React, { useState, useRef, useEffect } from "react"
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Spinner,
} from "@chakra-ui/react"
import QrScanner from "qr-scanner"
import { MdQrCodeScanner } from "react-icons/md"
import driverService from "../services/driverService"
import superAgentService from "@/services/superAgentServices"
import Auth from "@/utils/auth"

interface QRScannerProps {
  isOpen: boolean
  onClose: () => void
  onScanSuccess?: (data: any) => void
}

interface ScannedDriverData {
  driverId: string
  tag: string
  fullName: string
  vehiclePlateNumber: string
  vehicleType: string
  phoneNumber: string
  approvalDate: string
  paymentStatus: "paid" | "unpaid"
  lastPaymentDate?: string
  nextPaymentDue?: string
}

const QRScanner: React.FC<QRScannerProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
}) => {
  const [scanning, setScanning] = useState(false)
  const [scannedData, setScannedData] = useState<ScannedDriverData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)
  const toast = useToast()

  useEffect(() => {
    if (isOpen && !scannerRef.current) {
      if (videoRef.current) {
        const scanner = new QrScanner(
          videoRef.current,
          (result) => handleScan(result),
          {
            onDecodeError: (error) => console.error("QR decode error:", error),
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        )
        scannerRef.current = scanner
        scanner.start().catch((err) => {
          console.error("Failed to start QR scanner:", err)
          setError("Failed to access camera")
        })
      }
    } else if (!isOpen && scannerRef.current) {
      scannerRef.current.stop()
      scannerRef.current.destroy()
      scannerRef.current = null
    }
  }, [isOpen])

  const handleScan = async (result: QrScanner.ScanResult) => {
    if (result && !scanning) {
      setScanning(true)
      setLoading(true)
      setError(null)

      try {
        const qrData = JSON.parse(result.data)

        // Call the backend API to get driver details and payment status
        const response = await driverService.scanDriverQR(qrData)

        if (response.success) {
          setScannedData(response.data)
          onScanSuccess?.(response.data)
        } else {
          setError("Failed to retrieve driver information")
        }
      } catch (err) {
        console.error("Error scanning QR code:", err)
        setError("Invalid QR code or network error")
      } finally {
        setLoading(false)
        setScanning(false)
      }
    }
  }

  const handleFileScan = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        const result = await QrScanner.scanImage(file)
        handleScan(result)
      } catch (err) {
        console.error("Error scanning file:", err)
        setError("Failed to scan QR code from image")
      }
    }
  }

  const handleFileComplaint = async () => {
    if (!scannedData) return

    try {
      const userId = Auth.getAgentId()
      if (!userId) {
        toast({
          title: "Error",
          description: "Unable to identify user. Please log in again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return
      }

      const complaintData = {
        driverId: scannedData.driverId,
        complaintType: "defaulter",
        description: `Driver ${scannedData.fullName} (${scannedData.tag}) has not paid daily levy. Vehicle: ${scannedData.vehiclePlateNumber}`,
        reportedBy: userId,
      }

      await superAgentService.addComplaint(complaintData)

      toast({
        title: "Complaint Filed",
        description: "Defaulter complaint has been filed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      onClose()
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to file complaint",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const resetScanner = () => {
    setScannedData(null)
    setError(null)
    setScanning(false)
  }

  const closeModal = () => {
    resetScanner()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <MdQrCodeScanner />
            <Text>QR Code Scanner</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {!scannedData ? (
            <VStack spacing={4}>
              <Text fontSize="sm" color="gray.600">
                Position the QR code within the camera frame to scan
              </Text>

              <Box
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
                p={4}
                w="100%"
                maxW="300px"
                h="300px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {loading ? (
                  <Spinner size="xl" color="brand.primary" />
                ) : (
                  <video
                    ref={videoRef}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    playsInline
                    muted
                  />
                )}
              </Box>

              <Text fontSize="sm" color="gray.500">
                Or upload a QR code image:
              </Text>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileScan}
                style={{ display: "none" }}
                id="qr-file-input"
              />
              <Button
                as="label"
                htmlFor="qr-file-input"
                colorScheme="blue"
                variant="outline"
                size="sm"
              >
                Upload QR Image
              </Button>

              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </VStack>
          ) : (
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="bold">
                Driver Information
              </Text>

              <Box
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
              >
                <VStack align="stretch" spacing={2}>
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">Name:</Text>
                    <Text>{scannedData.fullName}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">Tag:</Text>
                    <Text>{scannedData.tag}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">Vehicle:</Text>
                    <Text>
                      {scannedData.vehicleType} -{" "}
                      {scannedData.vehiclePlateNumber}
                    </Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">Phone:</Text>
                    <Text>{scannedData.phoneNumber}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text fontWeight="semibold">Payment Status:</Text>
                    <Badge
                      colorScheme={
                        scannedData.paymentStatus === "paid" ? "green" : "red"
                      }
                    >
                      {scannedData.paymentStatus.toUpperCase()}
                    </Badge>
                  </HStack>
                  {scannedData.lastPaymentDate && (
                    <HStack justify="space-between">
                      <Text fontWeight="semibold">Last Payment:</Text>
                      <Text>
                        {new Date(
                          scannedData.lastPaymentDate
                        ).toLocaleDateString()}
                      </Text>
                    </HStack>
                  )}
                  {scannedData.nextPaymentDue && (
                    <HStack justify="space-between">
                      <Text fontWeight="semibold">Next Due:</Text>
                      <Text>
                        {new Date(
                          scannedData.nextPaymentDue
                        ).toLocaleDateString()}
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </Box>

              {scannedData.paymentStatus === "unpaid" && (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle>Defaulter Detected!</AlertTitle>
                  <AlertDescription>
                    This driver has not paid their daily levy. You can file a
                    complaint.
                  </AlertDescription>
                </Alert>
              )}

              <HStack spacing={4} justify="center">
                <Button onClick={resetScanner} variant="outline">
                  Scan Another
                </Button>
                {scannedData.paymentStatus === "unpaid" && (
                  <Button colorScheme="red" onClick={handleFileComplaint}>
                    File Complaint
                  </Button>
                )}
              </HStack>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default QRScanner
