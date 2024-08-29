import { Box } from "@chakra-ui/react"
import { ReactComponent as Logo } from "@/assets/nigeriapng.svg"
import { motion } from "framer-motion"

const Fallback = () => {
  return (
    <Box
      as={motion.div}
      animate={{
        scale: [0.5, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
          ease: "backInOut",
        },
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Logo style={{ width: 80, height: 80 }} />
    </Box>
  )
}

export default Fallback
