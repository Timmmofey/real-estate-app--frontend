'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axiosUser from '@/lib/axiosUser'
import { toast } from 'sonner'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AddressFields } from '@/components/address-fields'
import { useTypedTranslations } from '@/lib/useTypedTranslations'
import { Card } from '@/components/ui/card'
import { AxiosError } from 'axios'
import { UserType } from '@/types/user'

type PersonSignUpFormValues = {
  Email: string
  Password: string
  PhoneNumber: string
  FirstName: string
  LastName: string
  Country?: string | null
  Region?: string | null
  Settlement?: string | null
  ZipCode?: string | null
  MainPhoto: FileList
}

type CompanySignUpFormValues = {
  Email: string
  Password: string
  PhoneNumber: string
  Name: string
  Country: string
  Region: string
  Settlement: string
  ZipCode: string
  RegistrationAdress: string
  СompanyRegistrationNumber: string
  EstimatedAt: string
  Description?: string
  MainPhoto: FileList
}

export default function RegisterUserForm() {
  const [userType, setUserType] = useState<'person' | 'company'>('person')
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const t = useTypedTranslations("signUpPage")

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<PersonSignUpFormValues & CompanySignUpFormValues>({
    defaultValues: {
      Country: 'none',
      Region: 'none',
      Settlement: '',
      ZipCode: '',
    },
  })

  const mainPhoto = watch('MainPhoto')

  useEffect(() => {
    let url: string | undefined
    if (mainPhoto && mainPhoto.length > 0) {
      url = URL.createObjectURL(mainPhoto[0])
      setPreview(url)
    }
    return () => {
      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [mainPhoto])

  const appendField = (formData: FormData, key: string, value: string | Blob | null | undefined) => {
    if (value === '' || value === undefined) return
    if (value === null) {
      formData.append(key, '')
    } else {
      formData.append(key, value)
    }
  }

  const onRemovePhoto = () => {
    setValue('MainPhoto', new DataTransfer().files)
    setPreview(null)
  }

  const onSubmit = async (data: PersonSignUpFormValues & CompanySignUpFormValues) => {
    const prepared = {
      ...data,
      Country: data.Country ?? null,
      Region: data.Region ?? null,
      Settlement: data.Settlement ?? null,
    }
    const formData = new FormData()
    appendField(formData, 'Email', prepared.Email)
    appendField(formData, 'Password', prepared.Password)
    appendField(formData, 'PhoneNumber', prepared.PhoneNumber)
    if (prepared.MainPhoto?.[0]) appendField(formData, 'MainPhoto', prepared.MainPhoto[0])

    if (userType === 'person') {
      appendField(formData, 'FirstName', prepared.FirstName)
      appendField(formData, 'LastName', prepared.LastName)
      appendField(formData, 'Country', prepared.Country)
      appendField(formData, 'Region', prepared.Region)
      appendField(formData, 'Settlement', prepared.Settlement)
      appendField(formData, 'ZipCode', prepared.ZipCode || null)
    } else {
      appendField(formData, 'Name', prepared.Name)
      appendField(formData, 'Country', prepared.Country)
      appendField(formData, 'Region', prepared.Region)
      appendField(formData, 'Settlement', prepared.Settlement)
      appendField(formData, 'ZipCode', prepared.ZipCode)
      appendField(formData, 'RegistrationAdress', prepared.RegistrationAdress)
      appendField(formData, 'СompanyRegistrationNumber', prepared.СompanyRegistrationNumber)
      appendField(formData, 'EstimatedAt', prepared.EstimatedAt)
      appendField(formData, 'Description', prepared.Description || null)
    }

    setLoading(true)
    try {
      const endpoint =
        userType === 'person' ? '/Users/add-person-user' : '/Users/add-company-user'

      await axiosUser.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      toast.success(`${userType === 'person' ? t("personRegisteredToast") : t("companyRegisteredToast")} !`)
      reset()
      router.push('/login')
    } catch (err: unknown) {
      let message = 'Unexpected error occurred'

      if (err instanceof AxiosError) {
        message =
          (err.response?.data)?.error ||
          (err.response?.data)?.message ||
          message
        console.error(err.response?.data || err.message)
      } else if (err instanceof Error) {
        message = err.message
        console.error(err)
      } else {
        console.error(err)
      }

      toast.error(t("unexpectedErrorToast"), { description: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="px-4 max-w-2xl mx-auto my-3 sm:px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-center sm:text-left">
          {t("registerAs")} {userType === 'person' ? t("person") : t("company")}
        </h2>

        <ToggleGroup
          type="single"
          value={userType}
          onValueChange={(v) => v && setUserType(v as UserType)}
          className="flex gap-2"
        >
          <ToggleGroupItem value="person">{t("person")}</ToggleGroupItem>
          <ToggleGroupItem value="company">{t("company")}</ToggleGroupItem>
        </ToggleGroup>

        {/* Shared Fields */}
        <div className="grid gap-1">
          <Label>{t("email")}</Label>
          <Input required type="email" {...register('Email', { required: true })} />
        </div>

        <div className="grid gap-1">
          <Label>{t("password")}</Label>
          <Input required type="password" {...register('Password', { required: true })} />
        </div>

        <div className="grid gap-1">
          <Label>{t("password")}</Label>
          <Input required type="tel" {...register('PhoneNumber', { required: true })} />
        </div>

        
        {/* Person Fields */}
        {userType === 'person' && (
          <>
            <div className="grid gap-1">
              <Label>{t("firstName")}</Label>
              <Input required {...register('FirstName', { required: true })} />
            </div>
            <div className="grid gap-1">
              <Label>{t("lastName")}</Label>
              <Input required {...register('LastName', { required: true })} />
            </div>
          </>
        )}

        {/* Company Fields */}
        {userType === 'company' && (
          <>
            <div className="grid gap-1">
              <Label>{t("companyName")}</Label>
              <Input required {...register('Name', { required: true })} />
            </div>
            <div className="grid gap-1">
              <Label>{t("companyRegistrationNumber")}</Label>
              <Input
                required
                minLength={9}
                maxLength={9}
                type="number"
                {...register('СompanyRegistrationNumber', { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <Label>{t("establishedAt")}</Label>
              <Input required type="date" {...register('EstimatedAt', { required: true })} />
            </div>
            <div className="grid gap-1">
              <Label>{t("description")}</Label>
              <Input {...register('Description')} />
            </div>
          </>
        )}

         {/* Shared Address Fields */}
         <AddressFields
          register={register}
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          userType={userType}
        />

        {/* Photo */}
        <div className="space-y-2">
          <Label>{t("profilePhoto")}</Label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={preview ?? undefined} alt="Avatar preview" onError={() => setPreview(null)} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Button type="button" variant="secondary" onClick={() => document.getElementById('main-photo')?.click()}>
                {t("choosePhoto")}
              </Button>

              <input id="main-photo" type="file" accept="image/*" className="hidden" {...register('MainPhoto')} />

              {preview && (
                <Button type="button" variant="destructive" onClick={onRemovePhoto}>
                  <Trash2 className="w-4 h-4" /> {t("remove")}
                </Button>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t("registering") : t("register")}
        </Button>
      </form>
    </Card>
  )
}
