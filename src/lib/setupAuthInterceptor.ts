import type { AxiosInstance } from "axios"
import refreshClient from "./refreshClient"

let globalIsRefreshing = false
let globalFailedQueue: Array<{ resolve: (value?: unknown) => void; reject: (err: unknown) => void }> = []
const installedInterceptors = new WeakMap<AxiosInstance, number>()

export function createSetupAuthInterceptor() {
  return function setupAuthInterceptor(client: AxiosInstance) {

    if (installedInterceptors.has(client)) return () => {
      const id = installedInterceptors.get(client)
      if (id !== undefined) client.interceptors.response.eject(id)
      installedInterceptors.delete(client)
    }

    const processQueue = (error?: unknown) => {
      globalFailedQueue.forEach(p => {
        if (error) p.reject(error)
        else p.resolve()
      })
      globalFailedQueue = []
    }

    const interceptorId = client.interceptors.response.use(
      res => res,
      async (error) => {
        const originalRequest = error.config
        const url = originalRequest?.url ?? ""

        const excludedPaths = ['/Auth/Login-via-two-factor-auth', '/Auth/Login', '/Auth/Refresh']
        if (excludedPaths.some(path => url.includes(path))) {
          return Promise.reject(error)
        }

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
          if (globalIsRefreshing) {
            return new Promise((resolve, reject) => {
              globalFailedQueue.push({
                resolve: () => resolve(client(originalRequest)),
                reject,
              })
            })
          }

          originalRequest._retry = true
          globalIsRefreshing = true

          try {
            await refreshClient.post('/Auth/Refresh', {}, { withCredentials: true })
            processQueue(null)
            return client(originalRequest)
          } catch (err) {
            processQueue(err)
            return Promise.reject(err)
          } finally {
            globalIsRefreshing = false
          }
        }

        return Promise.reject(error)
      }
    )

    installedInterceptors.set(client, interceptorId)

    return () => {
      client.interceptors.response.eject(interceptorId)
      installedInterceptors.delete(client)
    }
  }
}
