'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import axiosUser from '@/lib/axiosUser'
import { useRouter } from 'next/navigation'
import { useTypedTranslations } from '@/lib/useTypedTranslations'
import { AxiosError } from 'axios'

export default function ResetPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const t = useTypedTranslations("resetPasswordPage")

  const handleSendResetCode = async () => {
    setLoading(true)
    try {
      await axiosUser.post('/Users/start-password-reset-via-email', new URLSearchParams({ email }))
      toast.success(t("toastSendSuccess"))
      setStep(2)
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data || err.message)
      }
      toast.error(t("toastSendError"))
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
      setLoading(true)
      try {
          await axiosUser.post('/Users/get-password-reset-token-via-email', { email, verificationCode: code })
          toast.success(t("toastVerifySuccess"))
          setStep(3)
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          console.error(err.response?.data || err.message)
        }
          toast.error(t("toastVerifyError"))
      } finally {
          setLoading(false)
      }
  }

  const handleResetPassword = async () => {
    setLoading(true)
    try {
      await axiosUser.post(
        '/Users/complete-password-restoration-via-email',
        new URLSearchParams({ newPassword })
      )
      toast.success(t("toastVerifySuccess"))
      setStep(1)
      setEmail('')
      setCode('')
      setNewPassword('')
      router.push('/login')
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        console.error(err.response?.data || err.message)
      }
      toast.error(t("toastVerifyError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">{t("title")}</h1>

      {step === 1 && (
        <form className="space-y-4">
          <div className="grid gap-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleSendResetCode} disabled={loading} className="w-full">
            {loading ? t("sendButtonLoading") : t("sendButton")}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form className="space-y-4">
          <p className="text-sm text-muted-foreground">{t("codeDescription")}</p>
          <div className="grid gap-1">
            <Label>{t("verifyButton")}</Label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleVerifyCode} disabled={loading} className="w-full">
            {loading ?  t("verifyButtonLoading"): t("verifyButton")}
          </Button>
        </form>
      )}

      {step === 3 && (
        <form className="space-y-4">
          <div className="grid gap-1">
            <Label>{t("newPasswordLabel")}</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <Button onClick={handleResetPassword} disabled={loading} className="w-full">
            {loading ? t("resetButtonLoading") : t("resetButton")}
          </Button>
        </form>
      )}
    </div>
  )
}
