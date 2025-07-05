'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'


export default function HomePage() {
    const router = useRouter()
    const user = useAuthStore((state) => state.user)
    const checkAuth = useAuthStore((state) => state.checkAuth)

    useEffect(() => {
        checkAuth()
        if (user !== null) {
        router.push('/home');
        } else {
        router.push('/login');
        }
    }, [])

    return (
        <div className="flex h-full items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                <CardTitle className="text-center text-2xl">
                    Welcome, {user?.userType === 'person'
                    ? `${user.firstName} ${user.lastName}`
                    : user?.name || 'User'}
                </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                <p className="text-center text-muted-foreground">
                    Some very cool features that will be created here <br /> but later :)
                </p>
                </CardContent>
            </Card>
        </div>
    )
}