import { theme } from "@/theme"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ChakraProvider } from "@chakra-ui/react"
import Fonts from "@/theme/fonts"

type Props = {
  children: React.ReactNode
}

const reactQueryConfig = {
  refetchOnWindowFocus: false,
  retry: 2,
}
const reactQueryMutationConfig = {
  refetchOnWindowFocus: false,
  retry: 0,
}

const defaultOptions = {
  queries: reactQueryConfig,
  mutations: reactQueryMutationConfig,
}

const queryClient = new QueryClient({
  defaultOptions,
})

const Providers = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Fonts />
        {props.children}
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default Providers
