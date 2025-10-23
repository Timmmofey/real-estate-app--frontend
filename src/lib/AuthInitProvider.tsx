'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

export default function AuthInitProvider() {
  const { checkAuth } = useAuthStore()
  const { user } = useUserStore()


  useEffect(() => {
    if (!user) {
        checkAuth()
    }
  }, [checkAuth, user])

  return null
}

