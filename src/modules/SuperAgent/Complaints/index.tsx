import React, { useState } from "react"
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Avatar,
  Icon,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Divider,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react"
import {
  MdOutlineReportProblem,
  MdOutlinePerson,
  MdOutlineAccessTime,
  MdOutlineLocationOn,
  MdOutlineReply,
} from "react-icons/md"
import { useQuery } from "@tanstack/react-query"
import superAgentServices from "@/services/superAgentServices"
import { format } from "date-fns"

interface Complaint {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  customerName: string
  customerPhone: string
  location: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
  responses?: ComplaintResponse[]
}

interface ComplaintResponse {
  id: string
  message: string
  author: string
  createdAt: string
  isFromSuperAgent: boolean
}

const Complaints: React.FC = () => {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  )
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [responseStatus, setResponseStatus] = useState("")
  const toast = useToast()

  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  // Fetch complaints
  const { data: complaints, isLoading } = useQuery({
    queryKey: ["superAgentComplaints"],
    queryFn: superAgentServices.getComplaints,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange"
      case "in-progress":
        return "blue"
      case "resolved":
        return "green"
      case "closed":
        return "gray"
      default:
        return "gray"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "green"
      case "medium":
        return "yellow"
      case "high":
        return "orange"
      case "urgent":
        return "red"
      default:
        return "gray"
    }
  }

  const handleRespondToComplaint = async () => {
    if (!selectedComplaint || !responseMessage.trim()) return

    try {
      // Here you would call the API to respond to the complaint
      // await superAgentServices.respondToComplaint(selectedComplaint.id, {
      //   message: responseMessage,
      //   status: responseStatus || selectedComplaint.status
      // })

      toast({
        title: "Response sent successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      setIsResponseModalOpen(false)
      setResponseMessage("")
      setResponseStatus("")
      setSelectedComplaint(null)
    } catch (error) {
      toast({
        title: "Failed to send response",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  if (isLoading) {
    return (
      <Box p={6}>
        <Text>Loading complaints...</Text>
      </Box>
    )
  }

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="brand.primary">
          Customer Complaints
        </Heading>
        <HStack spacing={4}>
          <Badge colorScheme="orange" px={3} py={1} borderRadius="full">
            {complaints?.filter((c: Complaint) => c.status === "pending")
              .length || 0}{" "}
            Pending
          </Badge>
          <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
            {complaints?.filter((c: Complaint) => c.status === "in-progress")
              .length || 0}{" "}
            In Progress
          </Badge>
          <Badge colorScheme="green" px={3} py={1} borderRadius="full">
            {complaints?.filter((c: Complaint) => c.status === "resolved")
              .length || 0}{" "}
            Resolved
          </Badge>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {complaints?.map((complaint: Complaint) => (
          <Card
            key={complaint.id}
            bg={cardBg}
            border="1px"
            borderColor={borderColor}
            borderRadius="lg"
            shadow="md"
            _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={() => setSelectedComplaint(complaint)}
          >
            <CardHeader pb={2}>
              <Flex justify="space-between" align="start">
                <VStack align="start" spacing={1} flex={1}>
                  <Text fontWeight="bold" fontSize="md" noOfLines={2}>
                    {complaint.title}
                  </Text>
                  <HStack>
                    <Badge
                      colorScheme={getPriorityColor(complaint.priority)}
                      size="sm"
                    >
                      {complaint.priority.toUpperCase()}
                    </Badge>
                    <Badge
                      colorScheme={getStatusColor(complaint.status)}
                      size="sm"
                    >
                      {complaint.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </HStack>
                </VStack>
                <Icon as={MdOutlineReportProblem} color="red.500" boxSize={5} />
              </Flex>
            </CardHeader>

            <CardBody pt={0}>
              <VStack align="start" spacing={3}>
                <HStack>
                  <Icon as={MdOutlinePerson} color="gray.500" boxSize={4} />
                  <Text fontSize="sm" color="gray.600">
                    {complaint.customerName}
                  </Text>
                </HStack>

                <HStack>
                  <Icon as={MdOutlineLocationOn} color="gray.500" boxSize={4} />
                  <Text fontSize="sm" color="gray.600" noOfLines={1}>
                    {complaint.location}
                  </Text>
                </HStack>

                <HStack>
                  <Icon as={MdOutlineAccessTime} color="gray.500" boxSize={4} />
                  <Text fontSize="sm" color="gray.600">
                    {format(new Date(complaint.createdAt), "MMM dd, yyyy")}
                  </Text>
                </HStack>

                <Text fontSize="sm" color="gray.700" noOfLines={3}>
                  {complaint.description}
                </Text>

                {complaint.responses && complaint.responses.length > 0 && (
                  <HStack>
                    <Icon as={MdOutlineReply} color="blue.500" boxSize={4} />
                    <Text fontSize="sm" color="blue.600">
                      {complaint.responses.length} response
                      {complaint.responses.length !== 1 ? "s" : ""}
                    </Text>
                  </HStack>
                )}
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Complaint Detail Modal */}
      <Modal
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justify="space-between" align="center">
              <Text>{selectedComplaint?.title}</Text>
              <HStack>
                <Badge
                  colorScheme={getPriorityColor(
                    selectedComplaint?.priority || ""
                  )}
                >
                  {selectedComplaint?.priority.toUpperCase()}
                </Badge>
                <Badge
                  colorScheme={getStatusColor(selectedComplaint?.status || "")}
                >
                  {selectedComplaint?.status.replace("-", " ").toUpperCase()}
                </Badge>
              </HStack>
            </Flex>
          </ModalHeader>

          <ModalBody>
            <VStack align="start" spacing={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Customer Details
                </Text>
                <HStack spacing={4}>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.600">
                      Name
                    </Text>
                    <Text>{selectedComplaint?.customerName}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.600">
                      Phone
                    </Text>
                    <Text>{selectedComplaint?.customerPhone}</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                    <Text fontSize="sm" color="gray.600">
                      Location
                    </Text>
                    <Text>{selectedComplaint?.location}</Text>
                  </VStack>
                </HStack>
              </Box>

              <Divider />

              <Box w="full">
                <Text fontWeight="bold" mb={2}>
                  Description
                </Text>
                <Text
                  bg="gray.50"
                  p={3}
                  borderRadius="md"
                  whiteSpace="pre-wrap"
                >
                  {selectedComplaint?.description}
                </Text>
              </Box>

              {selectedComplaint?.responses &&
                selectedComplaint.responses.length > 0 && (
                  <Box w="full">
                    <Text fontWeight="bold" mb={3}>
                      Response History
                    </Text>
                    <VStack spacing={3} align="start">
                      {selectedComplaint.responses.map((response) => (
                        <Box
                          key={response.id}
                          bg={response.isFromSuperAgent ? "blue.50" : "gray.50"}
                          p={3}
                          borderRadius="md"
                          w="full"
                        >
                          <Flex justify="space-between" align="start" mb={2}>
                            <HStack>
                              <Avatar size="sm" name={response.author} />
                              <Text fontWeight="medium">{response.author}</Text>
                              {response.isFromSuperAgent && (
                                <Badge colorScheme="blue" size="sm">
                                  SuperAgent
                                </Badge>
                              )}
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                              {format(
                                new Date(response.createdAt),
                                "MMM dd, yyyy HH:mm"
                              )}
                            </Text>
                          </Flex>
                          <Text whiteSpace="pre-wrap">{response.message}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              leftIcon={<MdOutlineReply />}
              onClick={() => setIsResponseModalOpen(true)}
              mr={3}
            >
              Respond
            </Button>
            <Button variant="ghost" onClick={() => setSelectedComplaint(null)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Response Modal */}
      <Modal
        isOpen={isResponseModalOpen}
        onClose={() => {
          setIsResponseModalOpen(false)
          setResponseMessage("")
          setResponseStatus("")
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Respond to Complaint</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Response Message</FormLabel>
                <Textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder="Enter your response..."
                  rows={4}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Update Status (Optional)</FormLabel>
                <Select
                  value={responseStatus}
                  onChange={(e) => setResponseStatus(e.target.value)}
                  placeholder="Keep current status"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleRespondToComplaint}
              isDisabled={!responseMessage.trim()}
            >
              Send Response
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsResponseModalOpen(false)
                setResponseMessage("")
                setResponseStatus("")
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Complaints
