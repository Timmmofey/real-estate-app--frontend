'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SettlementAutocomplete } from '@/components/settlement-autocomplete'
import { COUNTRIES, REGIONS_BY_COUNTRY } from '@/constants/location'
import { ZIP_PATTERNS_BY_COUNTRY } from '@/constants/zipValidators'
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormClearErrors,
  UseFormWatch,
} from 'react-hook-form'
import { useTypedTranslations } from '@/hooks/useTypedTranslations'
import { useTranslations } from 'next-intl'
import { UserRole } from '@/types/user'

type Props = {
  register: UseFormRegister<any>
  watch: UseFormWatch<any>
  setValue: UseFormSetValue<any>
  clearErrors?: UseFormClearErrors<any>
  errors?: FieldErrors
  userRole?: UserRole
}

export function AddressFields({ register, watch, setValue, clearErrors, errors, userRole }: Props) {
  const country = watch('Country') ?? ''
  const region = watch('Region') ?? ''
  const settlement = watch('Settlement') ?? ''
  const t = useTypedTranslations("addressFields")
  const nt = useTranslations()
  
  
  console.log("[adress field]", country, region, settlement)

  return (
    <>
      <div className="grid gap-1">
        <Label>{t("countryLabel")}</Label>
        <Select
          value={country || '__DELETE__'}
          onValueChange={(val) => {
            setValue('Country', val)
            setValue('Region', '__DELETE__')
            setValue('Settlement', '')
            setValue('ZipCode', '')
            setValue('RegistrationAdress', '')
            clearErrors?.(['Region', 'Settlement', 'ZipCode'])
          }}
        >
          <SelectTrigger className="w-full text-md sm:text-sm">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code} className='text-lg sm:text-sm'>
                {nt(`countries.${c.code}`)}
              </SelectItem>
            ))}
            <SelectItem className='text-muted-foreground text-lg sm:text-sm' value="__DELETE__">{t("none")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1">
        <Label>{t("regionLabel")}</Label>
        <Select
          value={region || '__DELETE__'}
          disabled={!country || !REGIONS_BY_COUNTRY[country]}
          onValueChange={(val) => {
            setValue('Region', val)
            setValue('Settlement', '')
            setValue('ZipCode', '')
            setValue('RegistrationAdress', '')
            clearErrors?.(['Settlement', 'ZipCode'])
          }}
        >
          <SelectTrigger className="w-full text-md sm:text-sm">
            <SelectValue placeholder={t("regionPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className='text-muted-foreground text-lg sm:text-sm' value='__DELETE__'>{t("none")}</SelectItem>
            {(REGIONS_BY_COUNTRY[country] || [])
              .sort((a, b) =>
                nt(`regions.${country}.${a.code}`).localeCompare(
                  nt(`regions.${country}.${b.code}`)
                )
              )
              .map((r) => (
                <SelectItem key={r.code} value={r.code} className='text-lg sm:text-sm'>
                  {nt(`regions.${country}.${r.code}`)}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <SettlementAutocomplete
        country={country || undefined}
        region={region || undefined}
        value={settlement}
        onChange={(val) => {
          setValue('Settlement', val)
          clearErrors?.(['Settlement', 'ZipCode'])
          setValue('ZipCode', '')
          setValue('RegistrationAdress', '')
        }}
        placeholder={t("settlementPlaceholder")}
        disabled={region == "__DELETE__" || region == ""}
      />

      {userRole === 'Company' && (
        <div className="grid gap-1">
          <Label> {t("streetLabel")}</Label>
          <Input disabled={!settlement} placeholder={t("streetPlaceholder")} {...register('RegistrationAdress', { required: true })} />
        </div>
      )}

      <div className="grid gap-1">
        <Label>{t("zipLabel")}</Label>
        <Input
          disabled={!settlement}
          placeholder={t("zipPlaceholder")}
          {...register('ZipCode', {
            required: userRole === 'Company' ? 'Required' : false,
            validate: (val) => {
              if (!val) return true
              if (!country) return true
              const pattern = ZIP_PATTERNS_BY_COUNTRY[country]
              if (!pattern) return true
              return pattern.regex.test(val) || `${t("zipFormat")} ${pattern.hint}`
            },
            onChange: () => clearErrors?.('ZipCode'),
          })}
        />
        {errors?.ZipCode && (
          <p className="text-sm text-red-500 mt-1">{errors.ZipCode.message?.toString()}</p>
        )}
      </div>
    </>
  )
}