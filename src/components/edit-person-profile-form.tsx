'use client'

import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import axiosUser from '@/lib/axiosUser'
import { useAuthStore } from '@/stores/authStore'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'

type FormValues = {
    FirstName: string
    LastName: string
    Country: string
    Region: string
    Settlement: string
    ZipCode: string
    MainPhoto: FileList
    DeleteMainPhoto: boolean
}

export default function EditPersonProfileForm() {
    const user = useAuthStore(state => state.user)
    const [preview, setPreview] = useState<string | null>(user!.mainPhotoUrl || null)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
        FirstName: user!.firstName,
        LastName:  user!.lastName,
        Country:   user!.country ?? '',
        Region:    user!.region ?? '',
        Settlement:user!.settlement  ?? '',
        ZipCode:   user!.zipCode   ?? '',
        DeleteMainPhoto: false
    }
    })

    const mainPhoto = watch('MainPhoto')

    useEffect(() => {
    if (mainPhoto && mainPhoto.length > 0) {
        const file = mainPhoto[0]
        const url = URL.createObjectURL(file)
        setPreview(url)
        setValue('DeleteMainPhoto', false)
    }
    }, [mainPhoto, setValue])
    if (!user || user.userType !== 'person') {
        return <p>Not a person profile</p>
    }

    const onDeletePhoto = () => {
        setValue('DeleteMainPhoto', true)
        setPreview(null)
        }

        const onSubmit = async (data: FormValues) => {
        const formData = new FormData()
        formData.append('FirstName', data.FirstName)
        formData.append('LastName',  data.LastName)
        formData.append('Country',   data.Country)
        formData.append('Region',    data.Region)
        formData.append('Settlement',data.Settlement)
        formData.append('ZipCode',   data.ZipCode)

        if (data.MainPhoto && data.MainPhoto.length > 0) {
            formData.append('MainPhoto', data.MainPhoto[0])
        }
        if (data.DeleteMainPhoto) {
            formData.append('DeleteMainPhoto', 'true')
        }

        setLoading(true)
        try {
            await axiosUser.patch('/Users/edit-person-profile-main-info', formData)
            await useAuthStore.getState().fetchProfile()
        } finally {
            setLoading(false)
        }
    }

return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className='grid gap-1'>
            <Label htmlFor="firstName">First Name</Label>
            <Input id='firstName' placeholder="First Name" {...register('FirstName')} />
        </div>
        <div className='grid gap-1'>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id='lastName' placeholder="Last Name"  {...register('LastName')} />
        </div>
        <div className='grid gap-1'>
            <Label htmlFor="country">Country</Label>
            <Input id='country' placeholder="Country"    {...register('Country')} />
        </div>
        <div className='grid gap-1'>
            <Label htmlFor="region">Region</Label>
            <Input id='region' placeholder="Region"     {...register('Region')} />
        </div>
        <div className='grid gap-1'>
            <Label htmlFor="settlement">Settlement</Label>
            <Input id='settlement' placeholder="Settlement" {...register('Settlement')} />
        </div>
        <div className='grid gap-1'>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input id='zipCode' placeholder="ZIP Code"   {...register('ZipCode')} />
        </div>

        <div className="space-y-2">
            <Label className="text-sm font-medium">Profile Photo</Label>
            <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                {preview ? (
                    <AvatarImage src={preview} alt="Avatar preview" />
                ) : (
                    <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                )}
                </Avatar>

                <div className="flex flex-col gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => document.getElementById('upload-photo')?.click()}
                    className="w-fit"
                >
                    Choose new main photo
                </Button>

                <input
                    id='upload-photo'
                    type="file"
                    accept="image/*"
                    className='hidden'
                    {...register('MainPhoto')}
                />

                {preview && (
                    <Button
                    type="button"
                    variant="destructive"
                    onClick={onDeletePhoto}
                    >
                    <Trash2 className="w-4 h-4" />
                        Delete main photo
                    </Button>
                )}
                </div>
            </div>
        </div>

        <input type="hidden" {...register('DeleteMainPhoto')} />

        <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
        </Button>
    </form>
)
}

