import React, { ReactElement } from "react"
import { Flex, FlexProps } from "@chakra-ui/react"

// Define an interface for the component's props that extends FlexProps from Chakra UI
interface IconBoxProps extends FlexProps {
  icon: ReactElement // Specify that 'icon' should be a React element
}

const IconBox: React.FC<IconBoxProps> = ({ icon, ...rest }) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"50%"}
      {...rest}
    >
      {icon}
    </Flex>
  )
}

export default IconBox
