'use client'

import { useForm } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import axiosUser from '@/lib/axiosUser'
import { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { AddressFields } from './address-fields'
import { useTypedTranslations } from '@/lib/useTypedTranslations'
import { useUserStore } from '@/stores/userStore'
import { toast } from 'sonner'

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
    const {user, fetchProfile} = useUserStore()
    const [preview, setPreview] = useState<string | null>(user!.mainPhotoUrl || null)
    const [loading, setLoading] = useState(false)
    const t = useTypedTranslations("editPersonProfileForm")

    const { register, handleSubmit, watch, setValue, reset,  clearErrors, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
        FirstName: '',
        LastName: '',
        Country: '',
        Region: '',
        Settlement: '',
        ZipCode: '',
        DeleteMainPhoto: false,
    }
    })

    useEffect(() => {
        const loadProfile = async () => {
          await fetchProfile()
        }
        loadProfile()
      }, [fetchProfile])

    useEffect(() => {
        if (user && user.userType === 'person') {
        reset({
            FirstName: user.firstName,
            LastName: user.lastName,
            Country: user.country ?? '',
            Region: user.region ?? '',
            Settlement: user.settlement ?? '',
            ZipCode: user.zipCode ?? '',
            DeleteMainPhoto: false,
        })
        setPreview(user.mainPhotoUrl || null)
        }
    }, [user, reset])

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
        setValue('MainPhoto', null as never)
        setPreview(null)

        const input = document.getElementById('upload-photo') as HTMLInputElement | null
        if (input) {
            input.value = ''
        }
    }

    const onSubmit = async (data: FormValues) => {
        const formData = new FormData()
        formData.append('FirstName',  data.FirstName)
        formData.append('LastName',   data.LastName)
        formData.append('Country',    data.Country || '__DELETE__')
        formData.append('Region',     data.Region || '__DELETE__')
        formData.append('Settlement', data.Settlement || '__DELETE__')
        formData.append('ZipCode',    data.ZipCode || '__DELETE__')

        if (data.MainPhoto && data.MainPhoto.length > 0) {
            formData.append('MainPhoto', data.MainPhoto[0])
        }
        if (data.DeleteMainPhoto) {
            formData.append('DeleteMainPhoto', 'true')
        }

        console.log('[form] onSubmit called', { data })
        setLoading(true)

        try {
            console.log('[form] about to call axiosUser.patch /Users/edit-person-profile-main-info')
            const res = await axiosUser.patch('/Users/edit-person-profile-main-info', formData)
            console.log('[form] axiosUser.patch response:', res && res.status, res && res.data)
            await useUserStore.getState().fetchProfile()
            toast.success(t("successToast"))
        } catch (err) {
            console.error('[form] axiosUser.patch FAILED:', err)
            // покажем пользователю
            const message =
            err?.response?.data?.message ||
            err?.response?.data?.Message ||
            err?.message ||
            'Request failed'
            toast.error(String(message))
        } finally {
            setLoading(false)
            console.log('[form] finished, loading=false')
        }
        }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className='grid gap-1'>
                <Label htmlFor="firstName">{t("firstNameLabel")}</Label>
                <Input id='firstName' placeholder="First Name" {...register('FirstName')} />
            </div>
            <div className='grid gap-1'>
                <Label htmlFor="lastName">{t("lastNameLabel")}</Label>
                <Input id='lastName' placeholder="Last Name"  {...register('LastName')} />
            </div>
            <AddressFields
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                userType="person"
            />
            <div className="space-y-2">
                <Label className="text-sm font-medium">{t("profilePhotoLabel")}</Label>
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage
                            src={preview ?? undefined}           
                            alt="Avatar preview"
                            onError={() => setPreview(null)}  
                        />
                        <AvatarFallback>
                            {user.firstName?.[0]?.toUpperCase() || '?'}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => document.getElementById('upload-photo')?.click()}
                        className="w-fit"
                    >
                        {t("choosePhoto")}
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
                            {t("deletePhoto")}
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