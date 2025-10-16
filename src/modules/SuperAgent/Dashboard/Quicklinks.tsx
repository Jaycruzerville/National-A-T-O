import React from "react"
import PropTypes from "prop-types"
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  VStack,
  Center,
  useTheme,
} from "@chakra-ui/react"

// Assume these icons are SVGs imported as React components
import transferMoneyIcon from "@/assets/loanAmount.svg" // replace with your icon paths
import payCableIcon from "@/assets/signal.svg"
import buyAirtimeIcon from "@/assets/checked.svg"
import buyDataIcon from "@/assets/shield.svg"
import buyElectricityIcon from "@/assets/interest.svg"
import payRemitaBillerIcon from "@/assets/repayIcon.svg"

const quickLinks = [
  { icon: transferMoneyIcon, title: "Transfer Money", productKey: "product1" },
  { icon: payCableIcon, title: "Pay Cable", productKey: "product2" },
  { icon: buyAirtimeIcon, title: "Buy Airtime", productKey: "product3" },
  { icon: buyDataIcon, title: "Buy Data", productKey: "product4" },
  {
    icon: buyElectricityIcon,
    title: "Buy Electricity",
    productKey: "product5",
  },
  {
    icon: payRemitaBillerIcon,
    title: "Pay Remita Biller",
    productKey: "product6",
  },
]

interface QuickLinksProps {
  onQuickLinkClick: (productKey: string) => void
}

const QuickLinks: React.FC<QuickLinksProps> = ({ onQuickLinkClick }) => {
  const theme = useTheme()
  // For navigating to the PaymentForm

  return (
    <Box p={4} borderRadius="md" bg={theme.colors.gray[50]}>
      <Text fontSize="xl" mb={4} fontWeight="bold" textAlign="center">
        Quicklinks
      </Text>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 6 }} spacing={4}>
        {quickLinks.map((link) => (
          <Center
            key={link.title}
            bg="white"
            p={4}
            borderRadius="md"
            shadow="sm"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            flexDirection="column" // Stack the items vertically
            onClick={() => onQuickLinkClick(link.productKey)} // Handle click event
          >
            <VStack spacing={3}>
              <Image src={link.icon} boxSize="50px" />
              <Text fontSize="md">{link.title}</Text>
            </VStack>
          </Center>
        ))}
      </SimpleGrid>
    </Box>
  )
}

QuickLinks.propTypes = {
  onQuickLinkClick: PropTypes.func.isRequired, // Mark as required function prop
}

export default QuickLinks
