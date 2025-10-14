import { createApiClient } from "./apiClientFactory"
import { createSetupAuthInterceptor } from "./setupAuthInterceptor"

const axiosUser = createApiClient({
  baseURL: "http://localhost:5120/api",
  withCredentials: true,
  setupInterceptors: createSetupAuthInterceptor(), 
})

export default axiosUser