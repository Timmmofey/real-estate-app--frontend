// import { AxiosInstance } from "axios";

// export function setupAuthInterceptor(client: AxiosInstance) {
//   let isRefreshing = false
//   let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (error: unknown) => void }> = []

//   const processQueue = (error: unknown, token: string | null = null) => {
//     failedQueue.forEach(prom => {
//       if (error) {
//         prom.reject(error)
//       } else {
//         prom.resolve(token)
//       }
//     })
//     failedQueue = []
//   }

//   client.interceptors.response.use(
//     response => response,
//     async error => {
//       const originalRequest = error.config

//       if (error.response?.status === 401 && !originalRequest._retry) {
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject })
//           })
//             .then(() => client(originalRequest))
//             .catch(err => Promise.reject(err))
//         }

//         originalRequest._retry = true
//         isRefreshing = true

//         try {
//           await client.post('/Auth/Refresh')
//           processQueue(null)
//           return client(originalRequest)
//         } catch (err) {
//           processQueue(err, null)
//           return Promise.reject(err)
//         } finally {
//           isRefreshing = false
//         }
//       }

//       return Promise.reject(error)
//     }
//   )
// }

import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axiosUser from './axiosUser'

export function setupAuthInterceptor(client: AxiosInstance = axiosUser) {
  let isRefreshing = false
  let failedQueue: Array<{ resolve: () => void; reject: (err: any) => void }> = []

  const processQueue = (error: any = null) => {
    failedQueue.forEach(p => {
      if (error) p.reject(error)
      else p.resolve()
    })
    failedQueue = []
  }

  client.interceptors.response.use(
    r => r,
    async (error) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

      const excludedPaths = ['/Auth/Login-via-two-factor-auth', '/Auth/Login']
      const requestUrl = originalRequest.url || ''
      const isExcluded = excludedPaths.some(path => requestUrl.includes(path))

      if (error.response?.status === 401 && !originalRequest._retry && !isExcluded) {
        if (isRefreshing) {
          // пока идёт refresh — ставим запрос в очередь и дождёмся
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve: () => resolve(client(originalRequest)), reject })
          })
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          // запрос refresh (cookie отправится автоматом благодаря withCredentials)
          await client.post('/Auth/Refresh')
          // refresh успешен
          processQueue(null)
          return client(originalRequest) // повторим исходный запрос
        } catch (err) {
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