'use client'

import { useMemo } from 'react'
import { useAutoTranslate } from '@/hooks/useAutoTranslate'
import { useUserStore } from '@/stores/userStore'
import { useTranslations, useLocale } from 'next-intl'

export function useUserLocationTranslation() {
  const nt = useTranslations()
  const locale = useLocale()
  const { user } = useUserStore()

  const countryName = useMemo(() => {
    if (!user?.country) return null
    console.log("country triggered")
    return nt(`countries.${user.country.toLocaleUpperCase()}`)
  }, [locale])

  const regionName = useMemo(() => {
    if (!user?.country || !user?.region) return null
    console.log("region triggered")
    return nt(`regions.${user.country}.${user.region}`)
  }, [locale])

  const { translated: translatedSettlement, loading: settlementLoading } = useAutoTranslate(
    user?.settlement ?? null,
    locale ?? null
  )

  return useMemo(() => ({
    countryName,
    regionName,
    translatedSettlement,
    settlementLoading,
  }), [countryName, regionName, translatedSettlement, settlementLoading])
}

