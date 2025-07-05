"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/stores/authStore"
import { Skeleton } from "@/components/ui/skeleton"
import EditPersonProfileForm from "@/components/edit-person-profile-form"
import EditCompanyProfileForm from "@/components/edit-company-profile-form"

export default function EditProfilePage() {
  const { user, fetchProfile } = useAuthStore()

  useEffect(() => {
    fetchProfile()
  }, [])

  if (!user) return <Skeleton className="h-40 w-full" />

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>
      {user.userType === "person" ? (
        <EditPersonProfileForm />
      ) : (
        <EditCompanyProfileForm />
      )}
    </div>
  )
}
