'use client'

import React from 'react'
import { Container } from './container'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore } from '@/stores/authStore'
import UserSidebar from './user-sidebar'
import { ModeSelect } from './mode-select'
import { Button } from './ui/button'
import { LocaleSelect } from './language-select'
import { useTypedTranslations } from '@/lib/useTypedTranslations'
import { MobileMenu } from './mobile-menu'
import { Skeleton } from './ui/skeleton'
import { useUserStore } from '@/stores/userStore'
import { NavLink } from '@/types/navLink'


const Header: React.FC = () => {
  const {isLoggedIn} = useAuthStore()
  const{userLoading} = useUserStore()
  const t = useTypedTranslations("header");
  
  const links: NavLink[] = [
    {name: t("buyPage"), url: '/realestate'},
    {name: t("rentPage"), url: '/realestate'},
    {name: t("salePage"), url: '/addlisting'},
    {name: t("listingsPage"), url: '/mylistings'}
  ]

  return (
    <header className='border-b'>
      <Container className='h-12 flex  justify-between items-center'>
        <div className=' w-full flex gap-15 items-center'>
          <MobileMenu links={links} className="sm:hidden"/>
          <Link href="/">
            <Image
                className=''
                width={30}
                height={30}
                src='https://www.svgrepo.com/show/266496/chat-speech-bubble.svg'
                alt='Logo'
            />
          </Link>

          <div className='hidden sm:flex gap-3 sm:gap-7'>
            {links.map((l) => {
              return (<Link className='hover:opacity-75' key={l.name} href={l.url}>{l.name}</Link>)
            })}
          </div>

        </div>
        

        <div>

           {isLoggedIn ? (
              <UserSidebar/>
            ) : (
              userLoading ?
                <Skeleton className="w-8 h-8 rounded-full self-center"/>
              :
              <div className='flex flex-row gap-3'>
                <LocaleSelect/>
                <ModeSelect/>
                <Link href="/login" className='text-[12px] text-right'>
                  <Button variant={'outline'}> {t("signInUp")}</Button>
                </Link>
              </div> 
              
            )}
        </div>
      </Container>
    </header>
  )
}

export default Header
