'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useTypedTranslations } from '@/hooks/useTypedTranslations'
import { useUserStore } from '@/stores/userStore'


export default function HomePage() {
    const user = useUserStore((state) => state.user)
    const t = useTypedTranslations("homePage")

    useAuthGuard()

    return (
        <div className="flex h-full items-center justify-center px-4 bg-muted mt-5">
            <Card className="w-full max-w-md">
                <CardHeader>
                <CardTitle className="text-center text-2xl">
                    {t('welcome')}, {user?.userRole === 'Person'
                    ? `${user.firstName} ${user.lastName}`
                    : user?.name || 'User'}
                </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                <p className="text-center text-muted-foreground">
                    {t("homeMessage")}
                </p>
                </CardContent>
            </Card>
        </div>
    )
}