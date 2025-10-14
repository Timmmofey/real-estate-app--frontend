'use client'

import { useAuthStore } from '@/stores/authStore'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check, PencilLine, Search } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import { useAuthGuard } from '@/lib/useAuthGuard'
import { Container } from '@/components/container'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import FsLightbox from 'fslightbox-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useTypedTranslations } from '@/lib/useTypedTranslations'
import {useUserLocationTranslation} from '@/hooks/useUserLocationTranslation'
import { useUserStore } from '@/stores/userStore'

export default function ProfilePage() {
  useAuthGuard()
  
  const { isLoggedIn, authLoading } = useAuthStore()
  const { user, fetchProfile, userLoading } = useUserStore()
  const [avatarToggler, setAvatarToggler] = useState(false)
  const t = useTypedTranslations("profilePage")
  
  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile()
    }
    loadProfile()
  }, [fetchProfile])
  
  const {countryName, regionName, translatedSettlement} = useUserLocationTranslation()
  
  if (userLoading || !user) {
    return (
      <Container>
        <Card className="max-w-3xl mx-auto p-6 shadow rounded-xl space-y-6 mt-3.5">
          <div className="flex items-center gap-4">
            <Skeleton className="w-25 h-25 sm:w-40 sm:h-40 rounded-full" />

            <div className="flex-1 space-y-2 py-1">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>
        </Card>
      </Container>
    )
  }

  if (!isLoggedIn && !authLoading) {
    return <div className="p-4 text-center">{t("notAuthorized")}</div>
  }

  return (
    <Container>
      <Card className="max-w-3xl mx-auto p-6 shadow rounded-xl space-y-6 mt-3.5">
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className={cn("relative group", user.mainPhotoUrl ? "cursor-pointer" : "cursor-auto")} onClick={user.mainPhotoUrl ? () => setAvatarToggler(!avatarToggler) : ()=>{return 0}}>
              <Avatar className="w-25 h-25 sm:w-40 sm:h-40 shadow-lg">
                <AvatarImage src={user.mainPhotoUrl ?? undefined} />
                <AvatarFallback className="text-4xl">
                  {user.userType === 'person'
                    ? user.firstName[0]?.toUpperCase()
                    : user.name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className={cn(user.mainPhotoUrl != undefined ? "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full" : "hidden")}>
                <Search  className="w-10 h-10 text-white translate-y-5.5 sm:translate-y-10.5" />
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='flex'>
                {user.userType === 'person' ? (
                  <h1 className="text-xl sm:text-2xl font-bold flex">
                    {user.firstName} {user.lastName} 
                  </h1>
                ) : (
                  <h1 className="text-2xl font-bold">{user.name} <Check /></h1>
                )}
                
                {
                  user.isVerified && 
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Check className="translate-y-1 translate-x-1.5 cursor-pointer" />
                      </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>{user.userType === "person" ? t("verifiedUser") : t("verifiedCompany")}</p>
                        </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                 }
              </div>

              <p className="text-muted-foreground">
                {countryName} {regionName} {translatedSettlement}
              </p>
            </div>
          </div>
          <Link href="/editprofile" className='absolute -bottom-3 -right-1 sm:top-1 sm:right-1'>
            <Button variant="ghost" className=" text-muted-foreground">
                {t("edit")}
              <PencilLine />
            </Button>
          </Link>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className='text-muted-foreground text-center'>{t('someContent')}</p>
        </div>

        <FsLightbox
          toggler={avatarToggler}
          sources={[user.mainPhotoUrl]}
          type="image"
        />

      </Card>
    </Container>
  )
}
