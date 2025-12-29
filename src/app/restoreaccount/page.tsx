"use client"
import axiosUser from "@/lib/axiosUser"
import { useTypedTranslations } from "@/hooks/useTypedTranslations"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function RestoreAccountPage() {
    const t = useTypedTranslations("restoreAccountPage")
    const [loading, setLoading] = useState(false)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const router = useRouter()

    const handleRestoreAccount = async () => {
        setLoading(true)
        try {
            await axiosUser.post("/Users/restore-deleted-account")
            toast.success(t("restoreSuccess"))
            router.replace("/login")
        } catch (err) {
            console.error(err)
            toast.error(t("restoreError"))
        } finally {
            setLoading(false)
        }
    }

    const handleCompletelyDeleteAccount = async () => {
        setLoading(true)
        try {
            await axiosUser.delete("/Users/permanantly-delete-account", { withCredentials: true })
            toast.success(t("deleteSuccess"))
            router.replace("/login")
        } catch (err) {
            console.error(err)
            toast.error(t("deleteError"))
        } finally {
            setLoading(false)
            setConfirmDeleteOpen(false)
        }
    }

    return (
        <div className="max-w-md w-full mx-auto mt-10 px-4 space-y-6">
            <h1 className="text-2xl font-semibold text-center">{t("title")}</h1>
            <p className="text-sm text-muted-foreground text-center">{t("description")}</p>

            <div className="flex flex-col gap-4">
                <Button onClick={handleRestoreAccount} disabled={loading} className="w-full">
                    {loading ? t("restoreLoading") : t("restoreButton")}
                </Button>

                <Button 
                    variant="destructive" 
                    className="w-full" 
                    onClick={() => setConfirmDeleteOpen(true)}
                >
                    {t("deleteButton")}
                </Button>
            </div>

            <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("deleteConfirmTitle")}</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground mt-2">{t("deleteConfirmDescription")}</p>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
                            {t("cancel")}
                        </Button>
                        <Button variant="destructive" onClick={handleCompletelyDeleteAccount} disabled={loading}>
                            {loading ? t("deleteLoading") : t("deleteConfirmButton")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
