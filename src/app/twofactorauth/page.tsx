"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosAuth from "@/lib/axiosAuth"
import { useTypedTranslations } from "@/hooks/useTypedTranslations"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function TwoFactorAuthPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [confirmationCode, setConfirmationCode] = useState<string>("")
    const t = useTypedTranslations("twoFactorAuthPage")
    const router = useRouter()

    const handleSendConfirmationCode = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!confirmationCode.trim()) {
            toast.error(t("emptyCodeError"))
            return
        }

        setLoading(true)
        try {
            await axiosAuth.post('/Auth/Login-via-two-factor-auth', `"${confirmationCode}"`, {
                headers: { 'Content-Type': 'application/json' }
            })

            toast.success(t("successMessage"))
            router.push("/home")
        } catch (err: unknown) {
            let errorMessage = t("genericError")
            if (err instanceof AxiosError) {
                console.error(err.response?.data || err.message)
                errorMessage = t("invalidCodeMessage")
            }
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md w-full mx-auto mt-10 px-4">
            <h1 className="text-2xl font-semibold mb-6 text-center">{t("title")}</h1>

            <form onSubmit={handleSendConfirmationCode} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {t("description")}
                </p>
                <div className="grid gap-1">
                    <Label>{t("formLabel")}</Label>
                    <Input
                        type="text"
                        value={confirmationCode}
                        onChange={(e) => setConfirmationCode(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? t("buttonLoading") : t("button")}
                </Button>
            </form>
        </div>
    )
}
