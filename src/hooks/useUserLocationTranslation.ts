'use client'

import { useMemo } from 'react'
import { useAutoTranslate } from '@/hooks/useAutoTranslate'
import { useUserStore } from '@/stores/userStore'
import { useTranslations, useLocale } from 'next-intl'
import { Languages } from '@/constants/languages'

export function useUserLocationTranslation() {
  const nt = useTranslations()
  const locale = useLocale()
  const { user } = useUserStore()

  const countryName = useMemo(() => {
    if (!user?.country) return null
    console.log("country triggered", user.country)
    try {
      const translation = nt(`countries.${user.country.toUpperCase()}`)
      return translation?.includes('countries.') ? user.country : translation
    } catch (error) {
      console.warn('Country translation not found:', user.country, error)
      return user.country
    }
  }, [locale, user?.country]) 

  const regionName = useMemo(() => {
    if (!user?.country || !user?.region) return null
    console.log("region triggered", user.country, user.region)
    try {
      const translation = nt(`regions.${user.country}.${user.region}`)
      return translation?.includes('regions.') ? user.region : translation
    } catch (error) {
      console.warn('Region translation not found:', user.country, user.region, error)
      return user.region
    }
  }, [locale, user?.country, user?.region])

  const { translated: translatedSettlement, loading: settlementLoading } = useAutoTranslate(
    user?.settlement ?? null,
    locale ?? null,
    locale === Languages.EN
  )

  console.log(`doNotTranslate = ${locale === Languages.EN}`)

  return useMemo(() => ({
    countryName: user?.country ? countryName : '',
    regionName: user?.region ? regionName : '',
    translatedSettlement: user?.settlement ? translatedSettlement : '',
    settlementLoading,
  }), [countryName, regionName, translatedSettlement, settlementLoading, user?.country, user?.region, user?.settlement])
}
