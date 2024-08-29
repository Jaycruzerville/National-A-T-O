import { Input } from "./Input"
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
import { Button } from "./Button"
import { colors } from "./colors"
import { textStyles } from "./textStyles"

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
}

const fonts = {
  heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", "Ubuntu", sans-serif`,
  body: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", "Ubuntu", sans-serif`,
}

const components = {
  Button,
  Input,
}

export const theme = extendTheme({
  colors,
  textStyles,
  components,
  breakpoints,
  fonts,
})

export const customTheme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "green",
    components: ["Progress"],
  })
)
