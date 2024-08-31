import { Box } from "@chakra-ui/react"
import { useState } from "react"
import Header from "./Header"
import Sidebar from "./old-Sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        overflowY="scroll"
      >
        {/* Sidebar will only show on medium screens and up */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Box
          flex="1"
          pt={{ base: "4rem", md: "0" }}
          transition="margin-left 0.3s ease"
          marginLeft={{ base: "0", md: isSidebarOpen ? "250px" : "0" }}
          w={{ base: "full", md: "auto" }}
        >
          {children}
        </Box>
      </Box>
    </div>
  )
}

export default Layout
