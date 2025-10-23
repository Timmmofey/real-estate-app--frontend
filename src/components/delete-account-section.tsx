import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { OctagonX } from "lucide-react";
import { useTypedTranslations } from "@/lib/useTypedTranslations";
import { useUserStore } from "@/stores/userStore";

export default function DeleteAccountSection(){
    const router = useRouter();
    const t = useTypedTranslations("deleteAccountSection")
    const deleteAccount = useUserStore(state => state.deleteAccount)
    
    const handleDeleteAccount = async () => {
    try {
            deleteAccount()
            router.replace("/login")
            toast.success(t("succesToast"))
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error(err.response?.data || err.message)
                toast.error(t("errorToast"))
            }
        } 
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger className="items-center justify-center whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 flex gap-1 w-full text-xs h-9 px-4 py-2 has-[>svg]:px-3 ">
                <OctagonX />
                {t("deleteAccount")}
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