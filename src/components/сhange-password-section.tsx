"use client"

import React, { useState } from "react"
import axiosUser from "@/lib/axiosUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { useTypedTranslations } from "@/hooks/useTypedTranslations"
import Link from "next/link"
import { Separator } from "./ui/separator"

export default function ChangePasswordSection() {
  const t = useTypedTranslations("changePasswordSection")

  const [open, setOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const openModal = () => {
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      toast.error(t("emptyFieldsToast"))
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error(t("passwordMismatchToast"))
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("oldPassword", oldPassword)
      formData.append("newPassword", newPassword)

      await axiosUser.post("/Users/change-user-password", formData)
      toast.success(t("successToast"))

      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setOpen(false)
    } catch (err) {
      console.error(err)
      toast.error(t("errorToast"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between gap-5 max-w-lg">
        <div>
          <p className="text-xs text-muted-foreground">{t("changePasswordHint")}</p>
        </div>

        <div>
          <Button onClick={openModal} className="min-w-[140px]">
            {t("changePassword")}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("changePassword")}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <Label htmlFor="oldPassword">{t("oldPasswordLabel")}</Label>
              <Input
                id="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder={t("oldPasswordPlaceholder")}
                className="mt-2"
                autoFocus
              />
            </div>
            
            <Separator/>

            <div>
              <Label htmlFor="newPassword">{t("newPasswordLabel")}</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("newPasswordPlaceholder")}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("confirmPasswordPlaceholder")}
                className="mt-2"
              />
            </div>
            <div className=" flex flex-col-reverse items-end gap-3 sm:flex sm:flex-row sm:justify-between sm:items-baseline">
              <Button variant="link" type="button">
                <Link href={"/resetpassword"}>
                  {t("forgotPassword")}
                </Link>
              </Button>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={closeModal} type="button">
                  {t("cancel")}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? t("changing") : t("changePassword")}
                </Button>
              </div>
            </div>

          </form>

          <DialogFooter />
        </DialogContent>
      </Dialog>
    </>
  )
}
