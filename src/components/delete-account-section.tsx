import axiosUser from "@/lib/axiosUser"
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { OctagonX } from "lucide-react";
import { useTypedTranslations } from "@/lib/useTypedTranslations";




export default function DeleteAccountSection(){
    const router = useRouter();
    const t = useTypedTranslations("deleteAccountSection")
    
    
    const handleDeleteAccount = async () => {
    try {
            await axiosUser.delete('/Users/delete-account')
            toast.success(t("succesToast"))
            router.back()
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error(err.response?.data || err.message)
                toast.error(t("errorToast"))
            }
        } 
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger >
                <Button variant={"destructive"} className="flex gap-1 w-full text-xs"> 
                    <OctagonX />
                    {t("deleteAccount")}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>{t("deleteAccountConfirmTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                    {t("deleteAccountConfirmDescription")}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>{t("cancelDelete")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount}>{t("deleteAccount")}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}