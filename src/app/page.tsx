"use client"
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const checkAuth = useAuthStore(s => s.checkAuth)
  const user = useUserStore(s => s.user);
  const router = useRouter();
  const authLoading = useAuthStore(s => s.authLoading)

  useEffect(() => {    
    checkAuth();      
  }, [checkAuth]);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [authLoading, user, router]);

  return null;
}
