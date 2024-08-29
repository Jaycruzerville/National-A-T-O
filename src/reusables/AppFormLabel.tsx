import { FormLabel } from "@chakra-ui/react"

const AppFormLabel = ({ title }: { title: string }) => {
  return (
    <FormLabel
      fontSize="14px"
      lineHeight="24px"
      color="brand.primary"
      fontWeight={700}
    >
      {title}
    </FormLabel>
  )
}

export default AppFormLabel
