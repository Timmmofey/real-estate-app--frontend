"use client"
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const checkAuth = useAuthStore(s => s.checkAuth)
  const user = useUserStore(s => s.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        await checkAuth();
      } catch {
        try{
          await checkAuth();
        } finally {
          setLoading(false);
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [loading, user, router]);

  return null;
}
