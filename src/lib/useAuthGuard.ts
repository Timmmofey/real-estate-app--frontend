'use client'

import { useAuthStore } from '@/stores/authStore'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'

export function useAuthGuard() {
  const { checkAuth } = useAuthStore()
  const { user } = useUserStore()
  const router = useRouter()

  const sendToLogin = useCallback(() => {
    router.push('/login')
  }, [router])

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth()

        if (!useUserStore.getState().user) {
          sendToLogin()
        }
      } catch {
        sendToLogin()
      }
    }

    if (!useUserStore.getState().user) {
      verifyAuth()
    }
  }, [user, checkAuth, sendToLogin])
}
