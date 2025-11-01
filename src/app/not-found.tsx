'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'



export default function NotFound() {

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-4 mt-5 text-center'
      )}
    >
      <Card className="max-w-md w-full shadow-lg border border-border bg-background">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">404 — Страница не найдена</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Похоже, вы зашли не туда 😅  
            Попробуйте вернуться на главную страницу.
          </p>
          <Link href="/" passHref>
            <Button variant="default" className="w-full">
              На главную
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
