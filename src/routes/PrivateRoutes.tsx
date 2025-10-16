import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authPaths } from "./paths"
import Auth from "@/utils/auth"
import { Box, CircularProgress } from "@chakra-ui/react"
import authService from "@/services/authService"

type PrivaterouteProps = {
  children: React.ReactNode
}

export default function PrivateRoutes({ children }: PrivaterouteProps) {
  const navigate = useNavigate()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(Auth.isAuthenticated())

  useEffect(() => {
    const checkAuth = async () => {
      if (!Auth.isAuthenticated()) {
        // Try to refresh token
        setIsRefreshing(true)
        try {
          await authService.refreshAccessToken()
          setIsAuthenticated(true)
        } catch (error) {
          // Refresh failed, redirect to login
          navigate(`/auth${authPaths.SIGNIN}`)
        } finally {
          setIsRefreshing(false)
        }
      } else {
        setIsAuthenticated(true)
      }
    }

    checkAuth()
  }, [navigate])

  if (isRefreshing || !isAuthenticated) {
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
