"use client"
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function LoginPage() {
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const router = useRouter();
  const nt = useTranslations()

  const searchParams = useSearchParams()
  const toastMsg = searchParams.get('toast')

  useEffect(()=>{
    if (toastMsg){
      toast.error(`${nt(`logInPage.${toastMsg}`)}`)
    }
  }, [])

  useEffect(() => {
    const run = async () => {
      await checkAuth();
      
      if (isLoggedIn === true) {
        router.push('/home')
      }
    };

    run()   
  }, [isLoggedIn])

  return (
    <div className="bg-muted flex flex-col items-center justify-center gap-6 p-6 md:p-10 min-h-full w-full">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
