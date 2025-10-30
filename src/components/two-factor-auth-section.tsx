"use client"

import React, { useState } from "react"
import axiosUser from "@/lib/axiosUser" 
import { useUserStore } from "@/stores/userStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Check } from "lucide-react"
import { toast } from "sonner"
import { useTypedTranslations } from "@/hooks/useTypedTranslations"

export default function TwoFactorAuthSection() {
  const user = useUserStore((s) => s.user)

  const isEnabled = !!user?.isTwoFactorEnabled

  const [modalOpen, setModalOpen] = useState(false)
  const [action, setAction] = useState<"enable" | "disable">("enable")
  const [step, setStep] = useState<"start" | "requested">("start")
  const [loadingRequest, setLoadingRequest] = useState(false)
  const [loadingToggle, setLoadingToggle] = useState(false)
  const [code, setCode] = useState("")

  const t = useTypedTranslations("twoFactorAuthSection")
  

  const openModalFor = (act: "enable" | "disable") => {
    setAction(act)
    setStep("start")
    setCode("")
    setModalOpen(true)
  }

  const requestCode = async () => {
    setLoadingRequest(true)
    try {
      await axiosUser.post("/Users/request-toggle-two-factor-authentication-code")
      toast.success(t("codeSentToast"))
      setStep("requested")
    } catch (e: unknown) {
      console.error(e)
      toast.error(t("requestErrorToast")) 
    } finally {
      setLoadingRequest(false)
    }
  }

  const submitToggle = async () => {
    if (!code.trim()) {
      toast.error(t("emptyCodeToast"))
      return
    }

    setLoadingToggle(true)
    try {
      await axiosUser.post("/Users/toggle-two-factor-authentication", { code: code.trim() })
      toast.success(
        isEnabled ? t("disabledSuccessToast") : t("enabledSuccessToast")
      )
      setModalOpen(false)
      setStep("start")
      setCode("")
      await useUserStore.getState().fetchProfile()
    } catch (e: unknown) {
      console.error(e)
      toast.error(t("confirmErrorToast")) 
    } finally {
      setLoadingToggle(false)
    }
  }


  return (
    <>
      <div className="w-full max-w-lg">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm">{t("currentStatus")}</div>
              <div className="font-medium mt-1 flex items-center gap-2">
                {isEnabled ? (
                  <>
                    <Check className="h-4 w-4" /> {t("enabled")}
                  </>
                ) : (
                  t("disabled")
                )}
              </div>
            </div>

            <div>
              <Button onClick={() => openModalFor(isEnabled ? "disable" : "enable")}>
                {isEnabled ? t("disable") : t("enable")}
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{t("infoText")}</p>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "enable" ? t("enableTitle") : t("disableTitle")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <p>
              {action === "enable"
                ? t("enableDescription")
                : t("disableDescription")}
            </p>

            {step === "start" && (
              <div className="flex gap-2">
                <Button onClick={requestCode} disabled={loadingRequest}>
                  {loadingRequest ? t("requesting") : t("requestCode")}
                </Button>
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  {t("cancel")}
                </Button>
              </div>
            )}

            {step === "requested" && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="code">{t("codeLabel")}</Label>
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={t("enterCodePlaceholder")}
                    className="mt-2"
                    autoFocus
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={submitToggle} disabled={loadingToggle}>
                    {loadingToggle ? t("confirming") : t("confirm")}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setStep("start")
                      setCode("")
                    }}
                  >
                    {t("back")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter />
        </DialogContent>
      </Dialog>
    </>
  )
}
