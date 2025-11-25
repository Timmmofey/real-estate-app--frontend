"use client"

import { useEffect } from "react"
import { useUserStore } from "@/stores/userStore"

export function useProfileLoader() {
  const fetchProfile= useUserStore(store => store.fetchProfile)

  useEffect(() => {
    console.log("[useProfileLoader] called")
    const load = async () => {
      try {
        await fetchProfile()
      } catch (err: unknown) {
        console.error("Unexpected error", err)
      }
    }
    load()
  }, [])

  return 
}
