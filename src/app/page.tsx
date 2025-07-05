"use client"
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const user = useAuthStore((state) => state.user)
  const router = useRouter();

  useEffect(() => {
    checkAuth()
      if (user !== null) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [])

  return (
    <>
    </>
  );
}
