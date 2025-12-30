export enum OAuthProvider {
    Google = "Google",
    Apple = "Apple"
}

export const providerOrder: Record<OAuthProvider, number> = {
  [OAuthProvider.Google]: 0,
  [OAuthProvider.Apple]: 1,
}