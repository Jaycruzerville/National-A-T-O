import { Box } from "@chakra-ui/react"
import { useState } from "react" // Import useState hook
import Header from "./Header"
import Sidebar from "./old-Sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false) // Sidebar is closed by default

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Box display="flex" flexDirection="column" overflowY="scroll">
        <Box display="flex" flex="1">
          {/* Sidebar */}
          <Sidebar isMobileOpen={isMobileOpen} />
          {/* Main content */}
          <Box
            flex="1"
            pt="4rem"
            transition="margin-left 0.3s ease"
            marginLeft={{ base: isMobileOpen ? "60%" : "0", md: "250px" }} // Sidebar width offset for medium screens and above
            ml={isMobileOpen ? "15%" : "0"} // Adjust based on sidebar width
            w={{ base: "full", md: "auto" }} // Use 'auto' or set to a specific value if you want to limit the width on larger screens
          >
            {children}
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Layout
