"use client"

import React, {useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Languages } from "@/constants/languages"
import { getCookie, setCookie } from "cookies-next"

export function LocaleSelect() {
    const [locale, setLocale] = useState<Languages>()
    const router = useRouter()

    useEffect(()=>{
        const cookieLocale = getCookie("classified_app_locale") as Languages | undefined
        
        const availableLanguages = Object.values(Languages)

        if (cookieLocale && availableLanguages.includes(cookieLocale as Languages)) {
            setLocale(cookieLocale as Languages)
        } 
        else {
            const browserLocale= navigator.language.slice(0,2);
            if (browserLocale && availableLanguages.includes(browserLocale as Languages)){
                setLocale(browserLocale as Languages) 
                setCookie("classified_app_locale", browserLocale, { path: "/", maxAge: 60 * 60 * 24 * 365 }) 
            }
            else {
                    setLocale(Languages.EN)
                }
            }
    }, [router])

    const changeLocale = (language: Languages) => {
        setLocale(language)
        setCookie("classified_app_locale", language, { path: "/", maxAge: 60 * 60 * 24 * 365 }) 
        router.refresh()
    }
 
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {locale}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLocale(Languages.EN)}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLocale(Languages.RU)}>
                    Русский
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}
