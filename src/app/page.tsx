"use client"
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {checkAuth, authLoading} = useAuthStore()
  const {user, userLoading} = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      await checkAuth();
    };

    run()

    if (!userLoading) {
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, []);

  return (
    <>
      
    </>
  );
}
