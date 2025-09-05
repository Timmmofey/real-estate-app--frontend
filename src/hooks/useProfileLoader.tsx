"use client"

import { useEffect } from "react"
import { AxiosError } from "axios"
import { useUserStore } from "@/stores/userStore"
import { isApiValidationError } from "@/lib/errors"

export function useProfileLoader() {
  const { fetchProfile, user } = useUserStore()

  useEffect(() => {
    const load = async () => {
      try {
        await fetchProfile()
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            try {
              await fetchProfile()
            } catch (e) {
              console.error("Profile load failed even after refresh", e)
            }
          } else {
            console.error("Axios error", err.response?.data || err.message)
          }
        } else if (isApiValidationError(err)) {
          console.error("Validation error", err.errors)
        } else {
          console.error("Unexpected error", err)
        }
      }
    }
    load()
  }, [fetchProfile])

  return user
}
