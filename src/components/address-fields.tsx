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

type Props = {
  register: UseFormRegister<any>
  watch: UseFormWatch<any>
  setValue: UseFormSetValue<any>
  clearErrors?: UseFormClearErrors<any>
  errors?: FieldErrors
  userType?: 'person' | 'company'
}

export function AddressFields({ register, watch, setValue, clearErrors, errors, userType }: Props) {
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
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {nt(`countries.${c.code}`)}
              </SelectItem>
            ))}
            <SelectItem className='text-muted-foreground' value="__DELETE__">{t("none")}</SelectItem>
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
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("regionPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {(REGIONS_BY_COUNTRY[country] || []).map((r) => (
              <SelectItem key={r.code} value={r.code}>
                {nt(`regions.${country}.${r.code}`)}
              </SelectItem>
            ))}
            <SelectItem className='text-muted-foreground' value='__DELETE__'>{t("none")}</SelectItem>
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
        disabled={region == "__DELETE__"}
      />

      {userType === 'company' && (
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
            required: userType === 'company' ? 'Required' : false,
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