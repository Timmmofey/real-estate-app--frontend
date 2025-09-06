'use client'

import React, { useEffect, useRef, useState } from 'react'
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

  const ref = useRef<HTMLDivElement>(null)

  const lastScrollRef = useRef(0)
  const offsetRef = useRef(0)
  const [offset, setOffset] = useState(0)
  const [height, setHeight] = useState(0)
  
  const links: NavLink[] = [
    {name: t("buyPage"), url: '/realestate'},
    {name: t("rentPage"), url: '/realestate'},
    {name: t("salePage"), url: '/addlisting'},
    {name: t("listingsPage"), url: '/mylistings'}
  ]

  useEffect(() => {
    if (!ref.current) return
    const updateHeight = () => setHeight(ref.current!.offsetHeight)
    updateHeight()

    const observer = new ResizeObserver(() => updateHeight())
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])


  useEffect(() => {
     const viewport = document.querySelector("[data-overlayscrollbars-viewport]") as HTMLElement | null
      if (!viewport) return

    const handleScroll = () => {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScrollRef.current

      let nextOffset = offsetRef.current + delta
      if (nextOffset < 0) nextOffset = 0
      if (nextOffset > height) nextOffset = height

      offsetRef.current = nextOffset
      lastScrollRef.current = currentScroll
      setOffset(nextOffset)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [height])


  return (
     <header className='border-b sticky top-0 z-50 bg-background' ref={ref} style={{
        transform: `translateY(-${offset}px)`,
        transition: "transform 0.1s linear"
      }}>
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
