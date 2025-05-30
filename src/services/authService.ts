import { IError } from "@/types"
import Api from "@/utils/api"
import Auth from "@/utils/auth"
import handleApiError from "@/utils/handleApiError"

type loginData = { username: string; password: string }

type signupData = {
  username: string
  password: string
}

type ChangePasswordData = {
  newPassword: string
  email: string
}

const login = async (params: loginData) => {
  try {
    const { data } = await Api.post("/api/auth/login", params) // Send username instead of email

    // Store tokens, role, and userId
    Auth.setToken(data.accessToken)
    Auth.setRefreshToken(data.refreshToken)
    Auth.setUserRole(data.role)
    Auth.setUserEmail(data.email)
    Auth.setUserData(data.user)

    // Store the corresponding ID based on role
    if (data.user.agentId) {
      Auth.setAgentId(data.user.agentId)
    } else if (data.user.driverId) {
      Auth.setDriverId(data.user.driverId)
    } else if (data.user.adminId) {
      Auth.setAdminId(data.user.adminId)
    }
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const signup = async (params: signupData) => {
  try {
    console.log("Signup request payload:", params)
    const { data } = await Api.post("/api/auth/signup", params)
    console.log("Signup response data:", data)
    return data
  } catch (e) {
    console.error("Signup error:", e)
    throw new Error(handleApiError(e as IError))
  }
}

const changePassword = async (params: ChangePasswordData) => {
  try {
    const { data } = await Api.post("/api/v1/auth/change-password/", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const getRoles = async () => {
  try {
    const { data } = await Api.get(`/auth/roles/`)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const refreshAccessToken = async () => {
  const params = {
    accessToken: Auth.getToken(),
    refreshToken: Auth.getRefreshToken(),
  }
  try {
    const { data } = await Api.post("/auth/refresh/", params)
    Auth.setToken(data?.accessToken)
    Auth.setRefreshToken(data?.refreshToken)
    return data?.accessToken
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const initiateForgotPassword = async (params: { email: string }) => {
  try {
    const { data } = await Api.post("/api/v1/auth/forgot-password/", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const initiatePasswordReset = async (params: { credential: string }) => {
  try {
    const { data } = await Api.post("auth/initiate-password-reset/", params)
    return data
  } catch (e) {
    throw new Error(handleApiError(e as IError))
  }
}

const authService = {
  login,
  signup,
  refreshAccessToken,
  changePassword,
  getRoles,
  initiateForgotPassword,
  initiatePasswordReset,
}

export default authService

// import Api from "@/utils/api"
// import { IError } from "@/types"
// import handleApiError from "@/utils/handleApiError"
// import Auth from "@/utils/auth"

// type loginData = { username: string; password: string }

// const login = async (params: loginData) => {
//   try {
//     const { data } = await Api.post("auth/login/", params) // Ensure this is the correct endpoint
//     return data
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const getRoles = async () => {
//   try {
//     const { data } = await Api.get("/auth/roles/")
//     return data
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const refreshAccessToken = async () => {
//   const params = {
//     accessToken: Auth.getToken(),
//     refreshToken: Auth.getRefreshToken(),
//   }
//   try {
//     const { data } = await Api.post("auth/refresh/", params)
//     Auth.setToken(data?.accessToken)
//     Auth.setRefreshToken(data?.refreshToken)
//     return data?.accessToken
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const initiatePasswordReset = async (params: { credential: string }) => {
//   try {
//     const { data } = await Api.post("auth/initiate-password-reset/", params)
//     return data
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const resetPassword = async (params: {
//   credential: string
//   newPassword: string
//   otp: string
// }) => {
//   try {
//     const { data } = await Api.post("auth/complete-password-reset/", params)
//     return data
//   } catch (e) {
//     throw new Error(handleApiError(e as IError))
//   }
// }

// const authService = {
//   login,
//   refreshAccessToken,
//   getRoles,
//   initiatePasswordReset,
//   resetPassword,
// }

// export default authService
