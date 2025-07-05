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

type PersonFormValues = {
  Email: string
  Password: string
  PhoneNumber: string
  FirstName: string
  LastName: string
  Country?: string
  Region?: string
  Settlement?: string
  ZipCode?: string
  MainPhoto: FileList
}

type CompanyFormValues = {
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<PersonFormValues & CompanyFormValues>()

  const mainPhoto = watch('MainPhoto')

  useEffect(() => {
    if (mainPhoto && mainPhoto.length > 0) {
      const file = mainPhoto[0]
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }, [mainPhoto])

  const onRemovePhoto = () => {
    setValue('MainPhoto', new DataTransfer().files)
    setPreview(null)
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData()

    formData.append('Email', data.Email)
    formData.append('Password', data.Password)
    formData.append('PhoneNumber', data.PhoneNumber)
    formData.append('MainPhoto', data.MainPhoto?.[0] || '')

    if (userType === 'person') {
      formData.append('FirstName', data.FirstName)
      formData.append('LastName', data.LastName)
      formData.append('Country', data.Country || '')
      formData.append('Region', data.Region || '')
      formData.append('Settlement', data.Settlement || '')
      formData.append('ZipCode', data.ZipCode || '')
    } else {
      formData.append('Name', data.Name)
      formData.append('Country', data.Country)
      formData.append('Region', data.Region)
      formData.append('Settlement', data.Settlement)
      formData.append('ZipCode', data.ZipCode)
      formData.append('RegistrationAdress', data.RegistrationAdress)
      formData.append('СompanyRegistrationNumber', data.СompanyRegistrationNumber)
      formData.append('EstimatedAt', data.EstimatedAt)
      if (data.Description) formData.append('Description', data.Description)
    }

    setLoading(true)
    try {
      const endpoint =
        userType === 'person'
          ? '/Users/add-person-user'
          : '/Users/add-company-user'

      await axiosUser.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      toast.success(`${userType === 'person' ? 'Person' : 'Company'} registered!`)
      reset()
      router.push('/login')
    } catch (err: any) {
      console.error(err)
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Unexpected error occurred'
      toast.error('Registration failed', { description: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-center sm:text-left">
          Register as {userType === 'person' ? 'Person' : 'Company'}
        </h2>

        <ToggleGroup type="single" value={userType} onValueChange={(v) => v && setUserType(v as any)} className="flex gap-2">
          <ToggleGroupItem value="person">Person</ToggleGroupItem>
          <ToggleGroupItem value="company">Company</ToggleGroupItem>
        </ToggleGroup>

        {/* Shared Fields */}
        <div className="grid gap-1">
          <Label>Email</Label>
          <Input required type="email" {...register('Email', { required: true })} />
        </div>

        <div className="grid gap-1">
          <Label>Password</Label>
          <Input required type="password" {...register('Password', { required: true })} />
        </div>

        <div className="grid gap-1">
          <Label>Phone Number</Label>
          <Input required type="tel" {...register('PhoneNumber', { required: true })} />
        </div>

        {/* Person Fields */}
        {userType === 'person' && (
          <>
            <div className="grid gap-1">
              <Label>First Name</Label>
              <Input required {...register('FirstName', { required: true })} />
            </div>
            <div className="grid gap-1">
              <Label>Last Name</Label>
              <Input required {...register('LastName', { required: true })} />
            </div>
          </>
        )}

        {/* Company Fields */}
        {userType === 'company' && (
          <>
            <div className="grid gap-1">
              <Label>Company Name</Label>
              <Input required {...register('Name', { required: true })} />
            </div>
            <div className="grid gap-1">
              <Label>Registration Address</Label>
              <Input required {...register('RegistrationAdress', { required: true })} />
            </div>
            <div className="grid gap-1">
              <Label>Company Registration Number</Label>
              <Input required {...register('СompanyRegistrationNumber', { required: true })} />
            </div>
            <div className="grid gap-1">
              <Label>Established At</Label>
              <Input required type="date" {...register('EstimatedAt', { required: true })} />
            </div>
            <div className="grid gap-1">
              <Label>Description (optional)</Label>
              <Input {...register('Description')} />
            </div>
          </>
        )}

        {/* Shared Address Fields */}
        <div className="grid gap-1">
          <Label>Country</Label>
          <Input required={userType === 'company'} {...register('Country')} />
        </div>

        <div className="grid gap-1">
          <Label>Region</Label>
          <Input required={userType === 'company'} {...register('Region')} />
        </div>

        <div className="grid gap-1">
          <Label>Settlement</Label>
          <Input required={userType === 'company'} {...register('Settlement')} />
        </div>

        <div className="grid gap-1">
          <Label>ZIP Code</Label>
          <Input required={userType === 'company'} {...register('ZipCode')} />
        </div>

        {/* Photo */}
        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-16 h-16">
              {preview ? <AvatarImage src={preview} /> : <AvatarFallback>?</AvatarFallback>}
            </Avatar>

            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="secondary"
                onClick={() => document.getElementById('main-photo')?.click()}
              >
                Choose Photo
              </Button>

              <input
                id="main-photo"
                type="file"
                accept="image/*"
                className="hidden"
                {...register('MainPhoto')}
              />

              {preview && (
                <Button type="button" variant="destructive" onClick={onRemovePhoto}>
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </div>
  )
}
