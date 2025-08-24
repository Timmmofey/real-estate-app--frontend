"use client"

import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import EditPersonProfileForm from "@/components/edit-person-profile-form"
import EditCompanyProfileForm from "@/components/edit-company-profile-form"
import { useAuthGuard } from "@/lib/useAuthGuard"
import { Card } from "@/components/ui/card"
import { useTypedTranslations } from "@/lib/useTypedTranslations"
import { Container } from "@/components/container"
import { useUserStore } from "@/stores/userStore"
import { isApiValidationError } from "@/lib/errors"
import { AxiosError } from "axios"

export default function EditProfilePage() {
  useAuthGuard()

  const { fetchProfile, user } = useUserStore()
  const t = useTypedTranslations("editProfilePage")
  

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
        }
        else if (isApiValidationError(err)) {
          console.error("Validation error", err.errors)
        }
        else {
          console.error("Unexpected error", err)
        }
      }
    }

    load()
  }, [fetchProfile])


  if (!user) return <Skeleton className="h-40 w-full" />

  return (
    <Container>
      <Card className="max-w-3xl mx-auto p-6 space-y-6 my-3">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        {user.userType === "person" ? (
          <EditPersonProfileForm />
        ) : (
          <EditCompanyProfileForm />
        )}
      </Card>
    </Container>
  )
}
