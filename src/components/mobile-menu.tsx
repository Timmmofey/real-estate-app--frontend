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
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import { NavLink } from '@/types/navLink'
import { LocaleSelect } from './language-select'
import { ModeSelect } from './mode-select'
import { useTypedTranslations } from '@/hooks/useTypedTranslations'
import { Container } from './container'

type Props = {
  links: NavLink[]
  className: string
}

export  function MobileMenu({links, className }: Props) {
  const [open, setOpen] = React.useState(false)
  const t = useTypedTranslations("mobileMenu")

  return (
    <Container className={className}>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetHeader className="hidden">
                <SheetTitle>User Menu</SheetTitle>
                <SheetDescription>
                    Panel for accessing user profile and settings
                </SheetDescription>
                </SheetHeader>
            <SheetTrigger  asChild>
                <Menu/>
            </SheetTrigger>

            <SheetContent side="left" className="w-[280px] p-5 flex flex-col justify-between">
                <div className="py-15 ">
                    <SheetHeader className="p-0 m-0">
                        <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                    </SheetHeader>

                    {/* Navigation */}
                    <div className="space-y-1">
                        <Link href="/" key="home">
                            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                                {t("Home")}
                            </Button>
                        </Link>
                        {links.map((l) => {
                            return(
                                <Link href={l.url} key={l.name}>
                                    <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                                        {l.name}
                                    </Button>
                                </Link>
                            )
                        })}
                    </div>

                    <Separator className='my-10 '/>

                    <div className='flex w-full gap-5'>
                        <LocaleSelect/>
                        <ModeSelect/>
                    </div>
                </div>

            </SheetContent>
        </Sheet>
    </Container>
  )
}
