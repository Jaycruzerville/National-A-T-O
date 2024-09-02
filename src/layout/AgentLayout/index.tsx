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
        <Sidebar />
        <Box
          flex="1"
          pt={{ base: "6rem", md: "4rem" }}
          transition="margin-left 0.3s ease"
          ml={{ base: "0", md: "250px" }} // Ensures content is not overlapped by the sidebar
          w={{ base: "full", md: "auto" }}
        >
          {children}
        </Box>
      </Box>
    </div>
  )
}

export default Layout
