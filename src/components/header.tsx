import React from 'react'
import { Container } from './container'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    isAuthorizaed: boolean
}

const Header: React.FC<Props> = ({isAuthorizaed}) => {
  return (
    <header>
        <Container className='h-12 p-5 flex justify-between items-center '>
            <Link href="#">
                <Image width={30} height={30} src='https://www.svgrepo.com/show/266496/chat-speech-bubble.svg'  alt='Logo'/>
            </Link>
            {
                isAuthorizaed ? 
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                :
                <Link href="#" className='text-[12px]'>
                    Sign in <br /> Sign up
                </Link>
            }
            
        </Container>
    </header>
  )
}

export default Header