import jwt_decode from "jwt-decode"

const setToken = (token: string) => {
  console.log("Setting token:", token)
  localStorage.setItem("token", token)
}

const setRefreshToken = (token: string) => {
  console.log("Setting refresh token:", token)
  localStorage.setItem("refreshToken", token)
}

const getToken = () => {
  return localStorage.getItem("token")
}

const getRefreshToken = () => {
  return localStorage.getItem("refreshToken")
}

const getDecodedJwt = () => {
  try {
    const token = getToken()
    return jwt_decode(token!)
  } catch (e) {
    return {}
  }
}

const setUserRole = (role: string) => {
  console.log("Setting user role:", role)
  localStorage.setItem("role", role)
}

const setUserEmail = (email: string) => {
  console.log("Setting user email:", email)
  localStorage.setItem("email", email)
}

const setUserData = (user: object) => {
  console.log("Setting user data:", user)
  localStorage.setItem("Data", JSON.stringify(user))
}

const getUserEmail = () => {
  return localStorage.getItem("email")
}

const getUserRole = () => {
  return localStorage.getItem("role")
}

const removeTokens = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("role")
}

const logOut = () => {
  removeTokens()
  window.location.replace("/auth")
}

const isAuthenticated = () => {
  try {
    const decodedToken = getDecodedJwt()
    const { exp } = decodedToken as { exp: number }
    const currentTime = Date.now() / 1000

    return exp > currentTime
  } catch (e) {
    return false
  }
}
const setuserId = (userId: string | number) => {
  console.log("Setting customer ID:", userId)
  localStorage.setItem("userId", userId.toString())
}

const getuserId = () => {
  return localStorage.getItem("userId")
}

const setAgentId = (agentId: string) => {
  localStorage.setItem("agentId", agentId)
}

const getAgentId = () => {
  return localStorage.getItem("agentId")
}

const setDriverId = (driverId: string) => {
  localStorage.setItem("driverId", driverId)
}

const getDriverId = () => {
  return localStorage.getItem("driverId")
}

const setAdminId = (adminId: string) => {
  localStorage.setItem("adminId", adminId)
}

const getAdminId = () => {
  return localStorage.getItem("adminId")
}

const Auth = {
  isAuthenticated,
  getDecodedJwt,
  setuserId,
  getuserId,
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  setUserRole,
  setUserEmail,
  getUserEmail,
  getUserRole,
  removeTokens,
  logOut,
  setUserData,
  setAgentId,
  getAgentId,
  setDriverId,
  getDriverId,
  setAdminId,
  getAdminId,
}

export default Auth
