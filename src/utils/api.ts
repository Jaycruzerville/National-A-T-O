import authService from "@/services/authService"
import axios from "axios"
import Auth from "./auth"

// export const base_url = import.meta.env.VITE_APP_BASE_URL

export const base_url = "http://localhost:5000/"

const Api = axios.create({
  baseURL: base_url,
})

let isRefreshing = false

Api.interceptors.request.use(
  (config) => {
    if (Auth.isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${Auth.getToken()}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        // If already refreshing, wait or reject
        return Promise.reject(error)
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const token = await authService.refreshAccessToken()
        isRefreshing = false
        const newRequest = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          },
        }
        return Api(newRequest)
      } catch (refreshError) {
        isRefreshing = false
        // Refresh failed, logout
        Auth.logOut()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default Api
