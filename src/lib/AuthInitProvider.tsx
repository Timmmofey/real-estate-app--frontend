'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

export default function AuthInitProvider() {
  const { user, checkAuth, fetchProfile } = useAuthStore()

  useEffect(() => {
    if (!user) {
        checkAuth()
        fetchProfile() 
    }
  }, [user])

  return null
}
