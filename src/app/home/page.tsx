'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthGuard } from '@/lib/useAuthGuard'
import { useTypedTranslations } from '@/lib/useTypedTranslations'
import { useUserStore } from '@/stores/userStore'


export default function HomePage() {
    const user = useUserStore((state) => state.user)
    const t = useTypedTranslations("homePage")

    useAuthGuard()

    return (
        <div className="flex h-full items-center justify-center px-4 bg-muted">
            <Card className="w-full max-w-md">
                <CardHeader>
                <CardTitle className="text-center text-2xl">
                    {t('welcome')}, {user?.userType === 'person'
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