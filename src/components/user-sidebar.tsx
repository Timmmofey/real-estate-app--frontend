'use client'

import * as React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  User,
  Settings,
  LogOut,
  Home,
  Heart,
  MessageSquare,
  LifeBuoy
} from "lucide-react"
import { useAuthStore } from '@/stores/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "react-responsive"
import { useUserLocationTranslation } from '@/hooks/useUserLocationTranslation'
import { useTypedTranslations } from '@/hooks/useTypedTranslations'
import { LocaleSelect } from './language-select'
import { ModeSelect } from './mode-select'
import { useUserStore } from '@/stores/userStore'

interface UserSidebarProps {
  className?: string
}

export default function UserSidebar({className}: UserSidebarProps) {  
  const [open, setOpen] = React.useState(false)
  const user = useUserStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const router = useRouter()
  const {countryName, regionName, translatedSettlement} = useUserLocationTranslation()

  
  const isDesktop = useMediaQuery({ query: '(min-width: 640px)' })
  const handleLogout = async () => {
    await logout()
    setOpen(false)
    router.push('/')
  }
  const t = useTypedTranslations("userSideBar");
  

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetHeader className="hidden">
            <SheetTitle>User Menu</SheetTitle>
            <SheetDescription>
              Panel for accessing user profile and settings
            </SheetDescription>
          </SheetHeader>
        <SheetTrigger asChild>
          <button className='cursor-pointer'>
            <Avatar>
              <AvatarImage
                src={user?.mainPhotoUrl}
                alt={user?.userType === "person"
                  ? `${user.firstName} ${user.lastName}`
                  : user?.name || "User"}
              />
              <AvatarFallback>
                {user?.userType === "person"
                  ? `${user.firstName?.[0] ?? "?"}${user.lastName?.[0] ?? ""}`
                  : user?.name?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>
          </button>
        </SheetTrigger>

        <SheetContent side={isDesktop ? "right" : "left"} className="w-[280px] p-5 flex flex-col justify-between">
          <div>
            <SheetHeader className="p-0 m-0">
              <SheetTitle className="sr-only">User Menu</SheetTitle>
            </SheetHeader>

            {user ? (
              <div className="space-y-6">
                {/* User info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={user.mainPhotoUrl} alt="User avatar" />
                    <AvatarFallback>
                      {user.userType === 'person'
                        ? `${user.firstName?.[0]}${user.lastName?.[0]}`
                        : user.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='pt-1.5'>
                    <p className="font-semibold text-lg leading-tight">
                      {user.userType === 'person'
                        ? `${user.firstName} ${user.lastName}`
                        : user.name}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {countryName} {regionName} {translatedSettlement}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Navigation */}
                <div className="space-y-1">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                      <User className="w-4 h-4" />
                        {t("profileLink")}
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                      <Settings className="w-4 h-4" />
                        {t("settingsLink")}
                    </Button>
                  </Link>
                  <Link href="/my-listings">
                    <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                      <Home className="w-4 h-4" />
                      {t("myListings")}
                    </Button>
                  </Link>
                  <Link href="/favorites">
                    <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                      <Heart className="w-4 h-4" />
                      {t("favorites")}
                    </Button>
                  </Link>
                  <Link href="/messages">
                    <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                      <MessageSquare className="w-4 h-4" />
                      {t("messages")}
                    </Button>
                  </Link>
                  <Link href="/support">
                    <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                      <LifeBuoy className="w-4 h-4" />
                      {t("support")}
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {t("logInError")}
              </p>
            )}
          </div>
          
          <Separator />
          <div className="flex gap-5">
            <LocaleSelect/>
            <ModeSelect/>
          </div>

          <div className="pt-4 border-t mt-6">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
                {t("logout")}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
    
  )
}
