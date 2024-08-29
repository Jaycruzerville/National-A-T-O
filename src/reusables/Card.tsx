import { Box, useStyleConfig, BoxProps } from "@chakra-ui/react"
import React, { ReactNode } from "react"

// Define an interface for the component's props that extends the BoxProps from Chakra UI
interface CardProps extends BoxProps {
  variant?: string // Add any additional props you expect, like 'variant'
  children: ReactNode // 'children' should be a ReactNode type
}

// The component now uses the CardProps interface for its props

const Card: React.FC<CardProps> = ({ variant, children, ...rest }) => {
  const styles = useStyleConfig("Card", { variant })

  return (
    <Box __css={styles} {...rest} borderRadius="lg" p="4">
      {children}
    </Box>
  )
}

export default Card
