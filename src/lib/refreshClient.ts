import { createApiClient } from "./apiClientFactory";

const refreshClient = createApiClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_AUTH_SERVICE_URL}`,
  withCredentials: true,
});

export default refreshClient;
