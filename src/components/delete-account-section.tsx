import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { OctagonX } from "lucide-react";
import { useTypedTranslations } from "@/hooks/useTypedTranslations";
import { useUserStore } from "@/stores/userStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { buttonVariants } from "./ui/button";

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
        <Dialog>
            <DialogTrigger
                className={buttonVariants({ variant: "destructive", className:"w-full" })}
            >
                <OctagonX />
                {t("deleteAccount")}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                <DialogTitle>{t("deleteAccountConfirmTitle")}</DialogTitle>
                <DialogDescription>
                    {t("deleteAccountConfirmDescription")}
                </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                <DialogClose
                    className={buttonVariants({ variant: "outline" })}
                >
                    {t("cancelDelete")}
                </DialogClose>
                <DialogClose
                    onClick={handleDeleteAccount}
                    className={buttonVariants({ variant: "destructive" })}
                >
                    {t("deleteAccount")}
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}