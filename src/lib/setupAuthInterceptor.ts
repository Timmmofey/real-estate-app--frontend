import { AxiosInstance } from "axios";

export function setupAuthInterceptor(client: AxiosInstance) {
  let isRefreshing = false
  let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (error: unknown) => void }> = []

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })
    failedQueue = []
  }

  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(() => client(originalRequest))
            .catch(err => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          await client.post('/Auth/Refresh')
          processQueue(null)
          return client(originalRequest)
        } catch (err) {
          processQueue(err, null)
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    }
  )
}
