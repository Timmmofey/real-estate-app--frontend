"use client"

import { useEffect } from "react"
import { useLocaleStore } from "@/stores/localeStore"

export default function LocaleProvider({ locale }: { locale: string }) {
  const setLocale = useLocaleStore((s) => s.setLocale)

  useEffect(() => {
    setLocale(locale)
  }, [locale, setLocale])

  return null
}
