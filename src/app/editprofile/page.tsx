"use client"

import { Skeleton } from "@/components/ui/skeleton"
import EditPersonProfileForm from "@/components/edit-person-profile-form"
import EditCompanyProfileForm from "@/components/edit-company-profile-form"
import { useAuthGuard } from "@/lib/useAuthGuard"
import { Card } from "@/components/ui/card"
import { useTypedTranslations } from "@/lib/useTypedTranslations"
import { Container } from "@/components/container"
import { useUserStore } from "@/stores/userStore"
import { useProfileLoader } from "@/hooks/useProfileLoader"

export default function EditProfilePage() {
  useAuthGuard()
  useProfileLoader()

  const user = useUserStore(s => s.user)
  const t = useTypedTranslations("editProfilePage")
  
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
