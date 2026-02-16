"use client"

import { OAuthProvider, providerOrder } from "@/constants/oAuthProvider"
import axiosUser from "@/lib/axiosUser"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { useUserStore } from "@/stores/userStore"
import { toast } from "sonner"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"
import { useTypedTranslations } from "@/hooks/useTypedTranslations"

type OAuthProviderResponseDto = {
  id: string,
  userId: string,
  oAuthProviderName: OAuthProvider
}

export function OAuthSection() {
  const [loading, setLoading] = useState(true)
  const [connectedProvider, setConnectedProvider] = useState<OAuthProvider[]>([])
  const { resolvedTheme } = useTheme()
  const user = useUserStore(s => s.user)
  const [openDialogProvider, setOpenDialogProvider] = useState<OAuthProvider | null>(null)

  const t = useTypedTranslations("oAuthSection")

  const loadOAuthAccounts = async () => {
    try {
      setLoading(true)
      const res = await axiosUser.get("Users/get-my-o-auth-accounts")
      const providers = res.data.map((p: OAuthProviderResponseDto) => p.oAuthProviderName)
      setConnectedProvider(providers)
    } catch (e) {
      toast.error(t("loadError"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOAuthAccounts()
  }, [])

  const handleLinkOauth = (provider: OAuthProvider) => {
    if (loading) return
    const authBaseUrl = process.env.NEXT_PUBLIC_API_AUTH_SERVICE_URL
    if (!authBaseUrl) {
      toast.error(t("authServiceUrlNotConfigured"))
      return
    }
    const path = provider === OAuthProvider.Google ? "google" : "apple"
    window.location.href = `${authBaseUrl}/auth/${path}`
  }

  const handleUnlinkOAuthAccount = async (provider: OAuthProvider) => {
    try {
      await axiosUser.post("/Users/unlink-oauth-account-from-me", null, { params: { provider } })
      await loadOAuthAccounts()
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-3">
        {Object.keys(OAuthProvider).map(s => (
          <Skeleton key={s} className="w-full h-20 rounded"/>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {Object.values(OAuthProvider)
        .sort((a, b) => providerOrder[a] - providerOrder[b])
        .map(provider => {
          const isConnected = connectedProvider.includes(provider)

          let description = ""
          if (provider === OAuthProvider.Google) {
            description = isConnected ? t("connectedGoogleDescription") : t("connectGoogleDescription")
          } else if (provider === OAuthProvider.Apple) {
            description = isConnected ? t("connectedAppleDescription") : t("connectAppleDescription")
          }

          const connectLabel = provider === OAuthProvider.Google ? t("connectWithGoogle") : t("connectWithApple")
          const disconnectLabel = provider === OAuthProvider.Google ? t("disconnectGoogle") : t("disconnectApple")
          const disconnectTitle = provider === OAuthProvider.Google ? t("disconnectGoogleTitle") : t("disconnectAppleTitle")
          const disconnectDescription = provider === OAuthProvider.Google ? t("disconnectGoogleDescription") : t("disconnectAppleDescription")

          return (
            <div
              key={provider}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded border p-4 gap-2"
            >
              <div className="flex items-center gap-3">
                {provider === OAuthProvider.Apple && (
                  <Image
                    src={resolvedTheme === "light" ? "/Apple_logo_black.svg" : "/Apple_logo_white.webp"}
                    alt="Apple icon"
                    width={36}
                    height={36}
                  />
                )}
                {provider === OAuthProvider.Google && (
                  <Image src="/google-logo.png" alt="Google icon" width={36} height={36}/>
                )}
                <div className="flex flex-col">
                  <span className="font-medium">{provider}</span>
                  <span className="text-sm text-muted-foreground">{description}</span>
                </div>
              </div>

              {isConnected ? (
                user?.isOAuthOnly && connectedProvider.length <= 1
                  ? null
                  : <Dialog open={openDialogProvider === provider} onOpenChange={(open) => setOpenDialogProvider(open ? provider : null)}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">{disconnectLabel}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{disconnectTitle}</DialogTitle>
                          <DialogDescription>{disconnectDescription}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild><Button variant="outline">{t("cancel")}</Button></DialogClose>
                          <DialogClose asChild>
                            <Button variant="destructive" onClick={async () => { await handleUnlinkOAuthAccount(provider); setOpenDialogProvider(null) }}>
                              {disconnectLabel}
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
              ) : (
                <Button onClick={() => handleLinkOauth(provider)}>{connectLabel}</Button>
              )}
            </div>
          )
        })}
    </div>
  )
}
