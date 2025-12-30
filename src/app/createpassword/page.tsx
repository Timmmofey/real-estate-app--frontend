'use client'
import SetPasswordMultiStepForm from '@/components/set-password-multi-step-form'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CreatePasswordPage() {
  const user = useUserStore(user => user.user)
  const router = useRouter()

  useEffect(()=>{
    if (!user || !user.isOAuthOnly){
      router.back()
    }
  },[router, user])

  return (
    <SetPasswordMultiStepForm formType='CreatePassword'/>
  )
}
