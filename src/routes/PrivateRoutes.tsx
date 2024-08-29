import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authPaths } from "./paths"
import Auth from "@/utils/auth"
import { Box, CircularProgress } from "@chakra-ui/react"

type PrivaterouteProps = {
  children: React.ReactNode
}

export default function PrivateRoutes({ children }: PrivaterouteProps) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!Auth.isAuthenticated()) {
      navigate(`/auth${authPaths.SIGNIN}`)
    }
  }, [navigate])

  if (Auth.getUserRole() === null || Auth.getUserRole() === undefined) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "80vh", width: "100%" }}
      >
        <CircularProgress color="brand.primary" />
      </Box>
    )
  }

  return <>{children}</>
}
