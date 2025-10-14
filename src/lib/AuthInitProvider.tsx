'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

export default function AuthInitProvider() {
  const { checkAuth } = useAuthStore()
  const { user, fetchProfile } = useUserStore()


  useEffect(() => {
    if (!user) {
        checkAuth()
        fetchProfile() 
    }
  }, [checkAuth, fetchProfile, user])

  return null
}

