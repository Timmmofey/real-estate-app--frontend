import axios, { AxiosInstance } from "axios"

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

  if (setupInterceptors) {
    setupInterceptors(client)
  }

  return client
}
