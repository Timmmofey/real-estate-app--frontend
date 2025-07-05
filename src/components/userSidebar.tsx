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

export default function UserSidebar() {
  const [open, setOpen] = React.useState(false)
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    setOpen(false)
    router.push('/')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetHeader>
            <SheetTitle className="sr-only">User Menu</SheetTitle>
            <SheetDescription className="sr-only">
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

      <SheetContent side="right" className="w-[280px] p-5 flex flex-col justify-between">
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
                <div>
                  <p className="font-semibold text-lg">
                    {user.userType === 'person'
                      ? `${user.firstName} ${user.lastName}`
                      : user.name}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {user.country} {user.region} {user.settlement}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Navigation */}
              <div className="space-y-1">
                <Link href="/profile">
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </Link>
                <Link href="/my-listings">
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                    <Home className="w-4 h-4" />
                    My Listings
                  </Button>
                </Link>
                <Link href="/favorites">
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                    <Heart className="w-4 h-4" />
                    Favorites
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                    <MessageSquare className="w-4 h-4" />
                    Messages
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                    <LifeBuoy className="w-4 h-4" />
                    Support
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">User not logged in</p>
          )}
        </div>

        {/* Logout button fixed to bottom */}
        <div className="pt-4 border-t mt-6">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
