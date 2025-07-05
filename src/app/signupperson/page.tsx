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

type FormValues = {
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

export default function CreatePersonUserPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<FormValues>()

  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const mainPhoto = watch('MainPhoto')

  useEffect(() => {
    if (mainPhoto && mainPhoto.length > 0) {
      const file = mainPhoto[0]
      const url = URL.createObjectURL(file)
      setPreview(url)
    }
  }, [mainPhoto])

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData()
    formData.append('Email', data.Email)
    formData.append('Password', data.Password)
    formData.append('PhoneNumber', data.PhoneNumber)
    formData.append('FirstName', data.FirstName)
    formData.append('LastName', data.LastName)
    if (data.Country) formData.append('Country', data.Country)
    if (data.Region) formData.append('Region', data.Region)
    if (data.Settlement) formData.append('Settlement', data.Settlement)
    if (data.ZipCode) formData.append('ZipCode', data.ZipCode)
    if (data.MainPhoto && data.MainPhoto.length > 0) {
      formData.append('MainPhoto', data.MainPhoto[0])
    }

    setLoading(true)
    try {
      await axiosUser.post('/Users/add-person-user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      reset()
      toast.success("User created successfully!")
      router.push('/login')
    } catch (err: any) {
      console.error(err)

      const message =
        err?.response?.data?.error || // <-- главное сообщение от бэка
        err?.response?.data?.message || // запасной вариант
        "An unexpected error occurred"

      toast.error("Registration failed", {
        description: message,
      })
    } finally {
      setLoading(false)
    }

  }
  

  const onRemovePhoto = () => {
    setValue('MainPhoto', new DataTransfer().files)
    setPreview(null)
  }

  return ( 
        <div className="px-4 sm:px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-center sm:text-left">Register as Person</h2>

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

                <div className="grid gap-1">
                    <Label>First Name</Label>
                    <Input required {...register('FirstName', { required: true })} />
                </div>

                <div className="grid gap-1">
                    <Label>Last Name</Label>
                    <Input required {...register('LastName', { required: true })} />
                </div>

                <div className="grid gap-1">
                    <Label>Country</Label>
                    <Input {...register('Country')} />
                </div>

                <div className="grid gap-1">
                    <Label>Region</Label>
                    <Input {...register('Region')} />
                </div>

                <div className="grid gap-1">
                    <Label>Settlement</Label>
                    <Input {...register('Settlement')} />
                </div>

                <div className="grid gap-1">
                    <Label>ZIP Code</Label>
                    <Input {...register('ZipCode')} />
                </div>
                
                <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Avatar className="w-16 h-16">
                    {preview ? (
                        <AvatarImage src={preview} />
                    ) : (
                        <AvatarFallback>?</AvatarFallback>
                    )}
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
