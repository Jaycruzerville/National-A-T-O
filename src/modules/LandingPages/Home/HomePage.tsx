import Hero from "./Hero"
import Offers from "./Offers"
// import PensionCalculator from "./PensionCalculator"
import { Box } from "@chakra-ui/react"
import VisionAndFAQ from "./VisionAndFAQ"
const HomePage = () => {
  return (
    <Box>
      <Hero />
      <Offers />
      {/* <PensionCalculator /> */}
      <VisionAndFAQ />
    </Box>
  )
}
export default HomePage
