'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

export default function AuthInitProvider() {
  const checkAuth = useAuthStore(state => state.checkAuth)
  const user = useUserStore(state => state.user)

  console.log(`[AuthInitProvider] called, user:${user}`)

  useEffect(() => {
    if (!user) {
        console.log("[AuthInitProvider] worked")
        checkAuth()
    }
  }, [checkAuth, user])

  return null
}

