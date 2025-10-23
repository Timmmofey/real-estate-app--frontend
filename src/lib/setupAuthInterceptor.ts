import type { AxiosInstance } from "axios"
import axiosAuth from "./axiosAuth";

export function createSetupAuthInterceptor() {
  return function setupAuthInterceptor(client: AxiosInstance) {
    let isRefreshing = false
    let failedQueue: Array<{ resolve: () => void; reject: (err: unknown) => void }> = []

    const processQueue = (error?: unknown) => {
      failedQueue.forEach(p => {
        if (error) p.reject(error)
        else p.resolve()
      })
      failedQueue = []
    }

    client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        const url = originalRequest?.url ?? ""
        
        const excludedPaths = ['/Auth/Login-via-two-factor-auth', '/Auth/Login', '/Auth/Refresh']
        const isExcluded = excludedPaths.some(path => url.includes(path))
        
        if (isExcluded) {
          return Promise.reject(error)
        }

        if ((error.response?.status === 401 || error.response?.status === 403)
          && !originalRequest._retry
          ) {
          console.log("[interceptor] 401 on", url)

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve: () => resolve(client(originalRequest)), reject })
            })
          }

          originalRequest._retry = true
          isRefreshing = true

          try {
            console.log("[interceptor] calling refresh via refreshClient")
            await axiosAuth.post("/Auth/Refresh", {}, { withCredentials: true })

            console.log("[interceptor] refresh ok, retrying queued requests")
            processQueue(null)
            return client(originalRequest)
          } catch (err) {
            console.error("[interceptor] refresh failed", err)
            processQueue(err)
            return Promise.reject(err)
          } finally {
            isRefreshing = false
          }
        }

        return Promise.reject(error)
      }
    )
  }
}