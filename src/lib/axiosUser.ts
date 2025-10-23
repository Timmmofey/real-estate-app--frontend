import { createApiClient } from "./apiClientFactory"
import { createSetupAuthInterceptor } from "./setupAuthInterceptor"

const axiosUser = createApiClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_USER_SERVICE_URL}`,
  withCredentials: true,
  setupInterceptors: createSetupAuthInterceptor(), 
})

export default axiosUser