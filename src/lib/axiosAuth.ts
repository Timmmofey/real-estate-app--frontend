import { createApiClient } from "./apiClientFactory"
import { setupAuthInterceptor } from "./setupAuthInterceptor"

const axiosAuth = createApiClient({
  baseURL: "http://localhost:5003/api",
  withCredentials: true,
  setupInterceptors: setupAuthInterceptor,
})

export default axiosAuth
