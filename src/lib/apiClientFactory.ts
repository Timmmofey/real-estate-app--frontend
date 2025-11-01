import axios, { AxiosInstance } from "axios"
import { useLocaleStore } from "@/stores/localeStore"

interface CreateApiClientOptions {
  baseURL: string
  withCredentials?: boolean
  setupInterceptors?: (client: AxiosInstance) => void
}

export function createApiClient({
  baseURL,
  withCredentials = false,
  setupInterceptors,
}: CreateApiClientOptions): AxiosInstance {
  const client = axios.create({
    baseURL,
    withCredentials,
  })

  // interceptor для Accept-Language
  client.interceptors.request.use((config) => {
    config.headers = config.headers || {}

    // клиентская локаль через getState()
    if (typeof window !== "undefined") {
      const locale = useLocaleStore.getState().locale
      config.headers["Accept-Language"] = locale || navigator.language || "en"
    } else {
      // серверная локаль (SSR fallback)
      config.headers["Accept-Language"] = "en"
    }

    return config
  })

  if (setupInterceptors) {
    setupInterceptors(client)
  }

  return client
}
