// 'use client'

// import { useEffect } from 'react'
// import { useAuthStore } from '@/stores/authStore'

// export default function AuthInitProvider() {
//   const { user, checkAuth, fetchProfile } = useAuthStore()

//   useEffect(() => {
//     if (!user) {
//         checkAuth()
//         fetchProfile() 
//     }
//   }, [user])

//   return null
// }

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

