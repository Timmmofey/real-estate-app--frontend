import { createApiClient } from "./apiClientFactory"
import { createSetupAuthInterceptor } from "./setupAuthInterceptor"

const axiosAuth = createApiClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_AUTH_SERVICE_URL}`,
  withCredentials: true,
  setupInterceptors: createSetupAuthInterceptor(), 
})

export default axiosAuth