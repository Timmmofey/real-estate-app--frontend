import { createApiClient } from "./apiClientFactory"

const axiosAuth = createApiClient({
  baseURL: "http://localhost:5003/api",
  withCredentials: true,
})

export default axiosAuth