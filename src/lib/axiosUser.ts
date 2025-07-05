import { createApiClient } from "./apiClientFactory"
import axiosAuth from "./axiosAuth"

const axiosUser = createApiClient({
  baseURL: "http://localhost:5120/api",
  withCredentials: true,
  setupInterceptors: (client) => {
    let isRefreshing = false

    client.interceptors.response.use(
      res => res,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) return Promise.reject(error)

          originalRequest._retry = true
          isRefreshing = true

          try {
            await axiosAuth.post("/Auth/refresh", {}, { withCredentials: true })
            isRefreshing = false
            return client(originalRequest)
          } catch (refreshErr) {
            isRefreshing = false
            return Promise.reject(refreshErr)
          }
        }

        return Promise.reject(error)
      }
    )
  }
})

export default axiosUser
