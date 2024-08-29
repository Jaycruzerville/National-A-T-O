import { Box } from "@chakra-ui/react"
import Footer from "./Footer"
import Nav from "./Nav"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nav />
      <Box minH="80vh" overflowX="hidden">
        {children}
      </Box>
      <Footer />
    </div>
  )
}

export default LandingLayout
