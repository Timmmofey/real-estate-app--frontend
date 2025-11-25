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
import { useTypedTranslations } from '@/hooks/useTypedTranslations'
import { useUserStore } from '@/stores/userStore'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import axios, { AxiosError } from 'axios'

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
    const user = useUserStore(state => state.user)
    const isLoading = useUserStore(state => state.userLoading)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [preview, setPreview] = useState<string | null>(user!.mainPhotoUrl || null)
    const t = useTypedTranslations("editPersonProfileForm")

    const { register, handleSubmit, watch, setValue, clearErrors, formState: { errors } } = useForm<FormValues>({
        defaultValues: user && user.userType === 'person' ? {
            FirstName: user.firstName || '',
            LastName: user.lastName || '',
            Country: user.country || '',
            Region: user.region || '',
            Settlement: user.settlement || '',
            ZipCode: user.zipCode || '',
            DeleteMainPhoto: false,
        } : {
            FirstName: '',
            LastName: '',
            Country: '',
            Region: '',
            Settlement: '',
            ZipCode: '',
            DeleteMainPhoto: false,
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

        try {
            setIsSubmitting(true)

            await axiosUser.patch('/Users/edit-person-profile-main-info', formData)
            await useUserStore.getState().fetchProfile()
            toast.success(t("successToast"))
        } catch (err) {
            console.error('[form] axiosUser.patch FAILED:', err)

            let message = 'Request failed'

            if (axios.isAxiosError(err)) {
                const data = err.response?.data as AxiosError

                message =
                data?.message ||    
                err.message ||      
                'Request failed'
            } else if (err instanceof Error) {
                message = err.message
            }

            toast.error(String(message))
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isSubmitting && (!user || user.userType !== 'person' || isLoading)) {
        return (
            <div className="space-y-4">
                <div className='grid gap-1'>
                    <Skeleton className="h-3 w-25" />
                    <Skeleton className="h-8.5 w-full" />
                </div>
                <div className='grid gap-1'>
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8.5 w-full" />
                </div>
                <div className='grid gap-1'>
                    <Skeleton className="h-3 w-18" />
                    <Skeleton className="h-8.5 w-full" />
                </div>
                <div className='grid gap-1'>
                    <Skeleton className="h-3 w-15" />
                    <Skeleton className="h-8.5 w-full" />
                </div>
                <div className='grid gap-1'>
                    <Skeleton className="h-3 w-25" />
                    <Skeleton className="h-8.5 w-full" />
                </div>
                <div className='grid gap-1'>
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8.5 w-full" />
                </div>
                <div className="space-y-3">
                    <Skeleton className="h-3 w-32" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div className="flex flex-col gap-2 w-[120px]">
                            <Skeleton className="h-9 w-full rounded-md" />
                            <Skeleton className="h-9 w-full rounded-md" />
                        </div>
                    </div>
                </div>
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid gap-1">
                <Label htmlFor="firstName">{t("firstNameLabel")}</Label>
                <Input id="firstName" placeholder="First Name" {...register('FirstName')} />
            </div>

            <div className="grid gap-1">
                <Label htmlFor="lastName">{t("lastNameLabel")}</Label>
                <Input id="lastName" placeholder="Last Name" {...register('LastName')} />
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
                            id="upload-photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
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

            <Button type="submit" disabled={isLoading || isSubmitting}>
                {isSubmitting ? (
                    t("saving")
                ) : (
                    t("save")
                )}
            </Button>
        </form>
    )
}
