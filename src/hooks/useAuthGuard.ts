'use client'

import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/userStore'

export function useAuthGuard() {
  const checkAuth = useAuthStore(state => state.checkAuth)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  
  const router = useRouter()

  useEffect(() => {
    console.log("[useAuthGuard] tried", isLoggedIn)
    if(!isLoggedIn){
      console.log("[useAuthGuard] called")
      const verifyAuth = async () => {
        await checkAuth()
        const { user } = useUserStore.getState()
        if (!user) router.replace('/login')
      }
    verifyAuth()
    }

  }, [])
}
