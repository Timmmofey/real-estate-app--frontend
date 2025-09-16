"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosUser from "@/lib/axiosUser";
import { useTypedTranslations } from "@/lib/useTypedTranslations";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangeEmailPage(){
    const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [oldEmailCofirmationCode, setOldEmailCofirmationCode] = useState<string>("")
    const [newEmail, setNewEmail] = useState<string>("")
    const [newEmailCofirmationCode, setNewEmailCofirmationCode] = useState<string>("")
    const router = useRouter();
    
    const t = useTypedTranslations("changeEmailPage")
    
    const handleSetResetCodeToOldEmail= async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axiosUser.post('/Users/start-email-change-via-email')
            toast.success(t("step1_success"))
            setStep(2)
        } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error(err.response?.data || err.message)
            toast.error(t("step1_error"))
        }
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmOldEmail= async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axiosUser.post('/Users/confirm-current-email', {verificationCode: oldEmailCofirmationCode})
            toast.success(t("step2_success"))
            setStep(3)
        } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error(err.response?.data || err.message)
        }
        toast.error(t("step2_error"))
        } finally {
            setLoading(false)
        }
    }

    const sendConfirmationCodeToNewEmail= async (e: React.FormEvent)=> {
        e.preventDefault()    
        setLoading(true)
        try {
            await axiosUser.post('/Users/send-new-email-cofirmation-code', {email: newEmail})
            toast.success(t("step3_success"))
            setStep(4)
        } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error(err.response?.data || err.message)
        }
        toast.error(t("step3_error"))
        } finally {
            setLoading(false)
        }
    }

    const ConfirmNewEmail= async (e: React.FormEvent)=> {
        e.preventDefault()
        setLoading(true)
        try {
            await axiosUser.post('/Users/confirm-new-email', {verificationCode: newEmailCofirmationCode})
            toast.success(t("step4_success"))
            setStep(5)
        } catch (err: unknown) {
        if (err instanceof AxiosError) {
            console.error(err.response?.data || err.message)
            toast.error(t("step4_error"))
        }
        } finally {
            setLoading(false)
        }
    }

    const CompleteEmailChange= async (e: React.FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        try {
            await axiosUser.post('/Users/complete-email-change-via-email', {verificationCode: newEmailCofirmationCode})
            toast.success(t("step5_success"))
            router.back()
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error(err.response?.data || err.message)
                toast.error(t("step5_error"))
            }
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="max-w-md w-full mx-auto mt-10 px-4">
            <h1 className="text-2xl font-semibold mb-6 text-center">{t("title")}</h1>
            <p>{t("step")}: {step} {t("of")} 5</p>

            {step === 1 && (
                <form onSubmit={handleSetResetCodeToOldEmail} className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {t("step1_description")}
                    </p>
                    <Button type="submit">
                        {t("step1_button")}
                    </Button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleConfirmOldEmail} className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {t("step2_description")}
                    </p>
                    <div className="grid gap-1">
                        <Label>{t("step2_label")}</Label>
                        <Input
                            type="text"
                            value={oldEmailCofirmationCode}
                            onChange={(e) => setOldEmailCofirmationCode(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? t("step2_button_loading") : t("step2_button")}
                    </Button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={sendConfirmationCodeToNewEmail} className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {t("step3_description")}
                    </p>
                    <div className="grid gap-1">
                        <Label>{t("step3_label")}</Label>
                        <Input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? t("step3_button_loading") : t("step3_button")}
                    </Button>
                </form>
            )}

            {step === 4 && (
                <form onSubmit={ConfirmNewEmail} className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {t("step4_description")}
                    </p>
                    <div className="grid gap-1">
                        <Label>{t("step4_label")}</Label>
                        <Input
                            type="text"
                            value={newEmailCofirmationCode}
                            onChange={(e) => setNewEmailCofirmationCode(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? t("step4_button_loading") : t("step4_button")}
                    </Button>
                </form>
            )}

            {step === 5 && (
                <form onSubmit={CompleteEmailChange} className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        {t("step5_description")}
                    </p>
                    <Button type="submit" className="w-full">
                        {t("step5_button")}
                    </Button>
                </form>
            )}
        </div>
    )
}