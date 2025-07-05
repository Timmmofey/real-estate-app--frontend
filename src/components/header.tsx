'use client'

import React from 'react'
import { Container } from './container'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore } from '@/stores/authStore'
import UserSidebar from './userSidebar'

const Header: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  return (
    <header className='border-b'>
      <Container className='h-12 p-5 flex justify-between items-center'>
        <Link href="/">
          <Image
            width={30}
            height={30}
            src='https://www.svgrepo.com/show/266496/chat-speech-bubble.svg'
            alt='Logo'
          />
        </Link>

        {isLoggedIn ? (
          <UserSidebar />
        ) : (
          <Link href="/login" className='text-[12px] text-right'>
            Sign in <br /> Sign up
          </Link>
        )}
      </Container>
    </header>
  )
}

export default Header
