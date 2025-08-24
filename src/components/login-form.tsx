'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/authStore"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useTypedTranslations } from "@/lib/useTypedTranslations"
import { AxiosError } from "axios"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const login = useAuthStore((s) => s.login)
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const t = useTypedTranslations("loginForm")
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(emailOrPhone, password)
      toast.success("Logged in successfuly!")
      router.push('/home');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
              console.error(err.response?.data || err.message)
            }
      toast.error(t('toastErrorDescription'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">{t("emailLabel")}</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="m@example.com or 12345..."
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("passwordLabel")}</Label>
                  <a
                    href="/resetpassword"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t("forgotPassword")}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t("loginButtonLoading") : t("loginButton")}
                </Button>
                <Button variant="outline" className="w-full" disabled={loading}>
                  {t("loginGoogle")}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("signupPrompt")}{" "}
              <a href="/signup" className="underline underline-offset-4">
                {t("signupLink")}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
