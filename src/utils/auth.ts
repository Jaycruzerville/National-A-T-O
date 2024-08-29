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
const setCustomerId = (customerId: string | number) => {
  console.log("Setting customer ID:", customerId)
  localStorage.setItem("customerId", customerId.toString())
}

const getCustomerId = () => {
  return localStorage.getItem("customerId")
}

const Auth = {
  isAuthenticated,
  getDecodedJwt,
  setCustomerId,
  getCustomerId,
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  setUserRole,
  getUserRole,
  removeTokens,
  logOut,
}

export default Auth
