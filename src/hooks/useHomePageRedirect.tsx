"use client"
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UseHomePageRedirect(){
  const checkAuth = useAuthStore(s => s.checkAuth)
  const user = useUserStore(s => s.user);
  const router = useRouter();
  const authLoading = useAuthStore(s => s.authLoading)
  const isLoggedIn = useAuthStore(s => s.isLoggedIn)

  useEffect(() => {
    console.log("[/redirect called]")
    if(!user || !isLoggedIn){
      checkAuth()
    }
  }, [])

  useEffect(() => {
    if (!authLoading) {
      if (isLoggedIn) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [isLoggedIn, authLoading, router])

  return null
}