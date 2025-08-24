'use client'

import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2 } from 'lucide-react'
import axiosUser from '@/lib/axiosUser'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { AddressFields } from './address-fields'
import { useTypedTranslations } from '@/lib/useTypedTranslations'
import { useUserStore } from '@/stores/userStore'

interface FormValues  {
  Name: string
  Country: string
  Region: string
  Settlement: string
  ZipCode: string
  RegistrationAdress: string
  СompanyRegistrationNumber: string
  EstimatedAt: string 
  Description: string
  MainPhoto: FileList
  DeleteMainPhoto: boolean
}

export default function EditCompanyProfileForm() {
  const user = useUserStore(s => s.user)
  const [preview, setPreview] = useState<string | null>(user?.mainPhotoUrl || null)
  const [loading, setLoading] = useState(false)
  const t = useTypedTranslations("editCompanyProfileForm")

  const { register, handleSubmit, watch, setValue, reset, clearErrors, formState: { errors }  } = useForm<FormValues>({
    defaultValues: {
      Name: '',
      Country: '',
      Region: '',
      Settlement: '',
      ZipCode: '',
      RegistrationAdress: '',
      СompanyRegistrationNumber: '',
      EstimatedAt: '',
      Description: '',
      DeleteMainPhoto: false
    }
  })

  useEffect(() => {
        if (user && user.userType === 'company') {
        reset({
            Name: user.name,
            Country: user.country,
            Region: user.region,
            Settlement: user.settlement,
            ZipCode: user.zipCode,
            RegistrationAdress: user.registrationAdress,
            СompanyRegistrationNumber: user.сompanyRegistrationNumber,
            EstimatedAt: user.estimatedAt,
            Description: user.description ?? '',
            DeleteMainPhoto: false
        })
        setPreview(user.mainPhotoUrl || null)
        }
    }, [user, reset])

  const mainPhoto = watch('MainPhoto')

  useEffect(() => {
    if (mainPhoto && mainPhoto.length > 0) {
      const file = mainPhoto[0]
      setPreview(URL.createObjectURL(file))
      setValue('DeleteMainPhoto', false)
    }
  }, [mainPhoto, setValue])

  if (!user || user.userType !== 'company') {
    return <p>Not a company profile</p>
  }

  const onDeletePhoto = () => {
    setValue('DeleteMainPhoto', true)
    setPreview(null)
  }

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()
    formData.append('Name', data.Name)
    formData.append('Country', data.Country)
    formData.append('Region', data.Region)
    formData.append('Settlement', data.Settlement)
    formData.append('ZipCode', data.ZipCode)
    formData.append('RegistrationAdress', data.RegistrationAdress)
    formData.append('СompanyRegistrationNumber', data.СompanyRegistrationNumber)
    formData.append('EstimatedAt', data.EstimatedAt)
    formData.append('Description', data.Description)

    if (data.MainPhoto && data.MainPhoto.length > 0) {
      formData.append('MainPhoto', data.MainPhoto[0])
    }
    if (data.DeleteMainPhoto) {
      formData.append('DeleteMainPhoto', 'true')
    }

    setLoading(true)
    try {
      await axiosUser.patch('/Users/edit-company-profile-main-info', formData)
      await useUserStore.getState().fetchProfile()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-1">
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input id="name" placeholder="Company Name" {...register('Name')} />
      </div>
      <AddressFields
          register={register}
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
          errors={errors}
          userType="company"
      />
      {/* <div className="grid gap-1">
        <Label htmlFor="registrationAdress">{t("registrationAddressLabel")}</Label>
        <Input id="registrationAdress" {...register('RegistrationAdress')} />
      </div> */}
      <div className="grid gap-1">
        <Label htmlFor="companyRegNum">{t("companyRegNumLabel")}</Label>
        <Input id="companyRegNum" {...register('СompanyRegistrationNumber')} />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="estimatedAt">{t("estimatedAtLabel")}</Label>
        <Input id="estimatedAt" type="date" {...register('EstimatedAt')} />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="description">{t("descriptionLabel")}</Label>
        <Textarea id="description" rows={4} {...register('Description')} />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">{t("companyPhotoLabel")}</Label>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            {preview ? (
              <AvatarImage src={preview} alt={t("companyPhotoAlt")} />
            ) : (
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => document.getElementById('upload-photo')?.click()}
            >
              {t("choosePhoto")}
            </Button>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              className="hidden"
              {...register('MainPhoto')}
              onChange={(e) => {
                const files = e.target.files
                if (files && files.length > 0) {
                  setPreview(URL.createObjectURL(files[0]))
                  setValue('MainPhoto', files)
                  setValue('DeleteMainPhoto', false)
                }
              }}
            />
            {preview && (
              <Button type="button" variant="destructive" onClick={onDeletePhoto}>
                <Trash2 className="w-4 h-4" /> {t("deletePhoto")}
              </Button>
            )}
          </div>
        </div>
      </div>

      <input type="hidden" {...register('DeleteMainPhoto')} />

      <Button type="submit" disabled={loading}>
        {loading ? t("saving") : t("save")}
      </Button>
    </form>
  )
}
