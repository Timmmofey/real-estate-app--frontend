// 'use client'

// import { useForm } from 'react-hook-form'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Label } from '@/components/ui/label'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Trash2 } from 'lucide-react'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import axiosUser from '@/lib/axiosUser'
// import { toast } from 'sonner'
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
// import { AddressFields } from '@/components/address-fields'
// import { useTypedTranslations } from '@/hooks/useTypedTranslations'
// import { Card } from '@/components/ui/card'
// import { AxiosError } from 'axios'
// import { UserType } from '@/types/user'
// import { CreateCompanyUserDto, CreatePersonUserDto } from '@/types/singUpDtos'

// type FormValues = CreatePersonUserDto & CreateCompanyUserDto

// export default function RegisterUserForm() {
//   const [userType, setUserType] = useState<'Person' | 'company'>('Person')
//   const [preview, setPreview] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()
//   const t = useTypedTranslations("signUpPage")

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     getValues,
//     reset,
//     formState: { errors },
//     clearErrors,
//   } = useForm<FormValues>({
//       defaultValues: {
//         common: { email: '', phoneNumber: '', mainPhoto: undefined },
//         profile: {
//           address: { country: null, region: null, settlement: null, zipCode: null },
//         },
//         password: '',
//       },
//   })

//   const mainPhoto = watch('common.mainPhoto')

//   useEffect(() => {
//     let url: string | undefined
//     if (mainPhoto && mainPhoto.length > 0) {
//       url = URL.createObjectURL(mainPhoto[0])
//       setPreview(url)
//     }
//     return () => {
//       if (url) URL.revokeObjectURL(url)
//     }
//   }, [mainPhoto])

//   const appendField = (formData: FormData, key: string, value: string | Blob | null | undefined) => {
//     if (value === '' || value === undefined) return
//     if (value === null) {
//       formData.append(key, '')
//     } else {
//       formData.append(key, value)
//     }
//   }

//   const onRemovePhoto = () => {
//     setValue('common.mainPhoto', undefined)
//     setPreview(null)
//   }

//   const onSubmit = async (data: FormValues) => {
//     const formData = new FormData()
    

// // значения, которые реально регистрирует AddressFields (топ-левел)
//   const all = getValues() as any

//   const registrationAddressTop = all.RegistrationAdress ?? null
//     // Shared fields
//     appendField(formData, 'common.email', data.common.email)
//     appendField(formData, 'common.phoneNumber', data.common.phoneNumber)
//     appendField(formData, 'password', data.password)
//     if (data.common.mainPhoto?.[0]) appendField(formData, 'common.mainPhoto', data.common.mainPhoto[0])

//     if (userType === 'Person') {
//       appendField(formData, 'profile.firstName', data.profile.firstName)
//       appendField(formData, 'profile.lastName', data.profile.lastName)
//       appendField(formData, 'profile.address.country', all.Country)
//       appendField(formData, 'profile.address.region', all.Region)
//       appendField(formData, 'profile.address.settlement', all.Settlement)
//       appendField(formData, 'profile.address.zipCode', all.ZipCode)
//     } else {
//       appendField(formData, 'profile.name', data.profile.name)
//       appendField(formData, 'profile.registrationAdress', data.profile.registrationAdress)
//       appendField(formData, 'profile.companyRegistrationNumber', data.profile.companyRegistrationNumber)
//       appendField(formData, 'profile.estimatedAt', data.profile.estimatedAt)
//       appendField(formData, 'profile.description', data.profile.description || null)
//       appendField(formData, 'profile.address.country', all.Country)
//       appendField(formData, 'profile.address.region', all.Region)
//       appendField(formData, 'profile.address.settlement', all.Settlement)
//       appendField(formData, 'profile.address.zipCode', all.ZipCode)
//       appendField(formData, 'RegistrationAdress', registrationAddressTop)
//     }

//     console.log(`location ${data.profile.address.country},${data.profile.address.region},${data.profile.address.settlement},,${data.profile.address.zipCode}`)

//     setLoading(true)
//     try {
//       const endpoint = userType === 'Person' ? '/Users/add-Person-user' : '/Users/add-company-user'
//       await axiosUser.post(endpoint, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })

//       toast.success(`${userType === 'Person' ? t("PersonRegisteredToast") : t("companyRegisteredToast")} !`)
//       reset()
//       router.push('/login')
//     } catch (err: unknown) {
//       let message = t("unexpectedErrorToast")
//       if (err instanceof AxiosError) {
//         const data = err.response?.data
//         if (data?.message && typeof data.message === 'object' && 'value' in data.message) {
//           message = data.message.value
//         } else {
//           message = data?.error || data?.message || message
//         }
//         console.error(data || err.message)
//       } else if (err instanceof Error) {
//         message = err.message
//         console.error(err)
//       } else console.error(err)
//       toast.error(message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="px-4 max-w-2xl mx-auto my-3 sm:px-6">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto">
//         <h2 className="text-xl font-semibold text-center sm:text-left">
//           {t("registerAs")} {userType === 'Person' ? t("Person") : t("company")}
//         </h2>

//         <ToggleGroup
//           type="single"
//           value={userType}
//           onValueChange={(v) => v && setUserType(v as UserType)}
//           className="flex gap-2"
//         >
//           <ToggleGroupItem value="Person">{t("Person")}</ToggleGroupItem>
//           <ToggleGroupItem value="company">{t("company")}</ToggleGroupItem>
//         </ToggleGroup>

//         {/* Shared Fields */}
//         <div className="grid gap-1">
//           <Label>{t("email")}</Label>
//           <Input required type="email" {...register('common.email', { required: true })} />
//         </div>
        
//         <div className="grid gap-1">
//           <Label>{t("phoneNumber")}</Label>
//           <Input required type="tel" {...register('common.phoneNumber', { required: true })} />
//         </div>

//         <div className="grid gap-1">
//           <Label>{t("password")}</Label>
//           <Input required type="password" {...register('password', { required: true })} />
//         </div>


        
//         {/* Person Fields */}
//         {userType === 'Person' && (
//           <>
//             <div className="grid gap-1">
//               <Label>{t("firstName")}</Label>
//               <Input required {...register('profile.firstName', { required: true })} />
//             </div>
//             <div className="grid gap-1">
//               <Label>{t("lastName")}</Label>
//               <Input required {...register('profile.lastName', { required: true })} />
//             </div>
//           </>
//         )}

//         {/* Company Fields */}
//         {userType === 'company' && (
//           <>
//             <div className="grid gap-1">
//               <Label>{t("companyName")}</Label>
//               <Input required {...register('profile.name', { required: true })} />
//             </div>
//             <div className="grid gap-1">
//               <Label>{t("companyRegistrationNumber")}</Label>
//               <Input
//                 required
//                 minLength={9}
//                 maxLength={9}
//                 type="number"
//                 {...register('profile.companyRegistrationNumber', { required: true })}
//               />
//             </div>
//             <div className="grid gap-1">
//               <Label>{t("establishedAt")}</Label>
//               <Input required type="date" {...register('profile.estimatedAt', { required: true })} />
//             </div>
//             <div className="grid gap-1">
//               <Label>{t("description")}</Label>
//               <Input {...register('profile.description')} />
//             </div>
//           </>
//         )}

//          {/* Shared Address Fields */}
//          <AddressFields
//           register={register}
//           watch={watch}
//           setValue={setValue}
//           clearErrors={clearErrors}
//           errors={errors}
//           userType={userType}
//         />

//         {/* Photo */}
//         <div className="space-y-2">
//           <Label>{t("profilePhoto")}</Label>
//           <div className="flex flex-col sm:flex-row items-center gap-4">
//             <Avatar className="w-16 h-16">
//               <AvatarImage src={preview ?? undefined} alt="Avatar preview" onError={() => setPreview(null)} />
//               <AvatarFallback>?</AvatarFallback>
//             </Avatar>

//             <div className="flex flex-col gap-2 w-full sm:w-auto">
//               <Button type="button" variant="secondary" onClick={() => document.getElementById('main-photo')?.click()}>
//                 {t("choosePhoto")}
//               </Button>

//               <input id="main-photo" type="file" accept="image/*" className="hidden" {...register('common.mainPhoto')} />

//               {preview && (
//                 <Button type="button" variant="destructive" onClick={onRemovePhoto}>
//                   <Trash2 className="w-4 h-4" /> {t("remove")}
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         <Button type="submit" className="w-full" disabled={loading}>
//           {loading ? t("registering") : t("register")}
//         </Button>
//       </form>
//     </Card>
//   )
// }

'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axiosUser from '@/lib/axiosUser'
import { toast } from 'sonner'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AddressFields } from '@/components/address-fields'
import { useTypedTranslations } from '@/hooks/useTypedTranslations'
import { Card } from '@/components/ui/card'
import { AxiosError } from 'axios'
import { UserRole } from '@/types/user'

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

export type CompleteOAuthRegistrationDto = {
  userRole: string

  phoneNumber: string
  password?: string

  mainPhoto?: File

  // Person
  firstName?: string
  lastName?: string
  country?: string | null
  region?: string | null
  settlement?: string | null
  zipCode?: string | null

  // Company
  name?: string
  registrationAdress?: string
  companyRegistrationNumber?: string
  description?: string
}

export default function RegisterUserForm() {
  const [userRole, setUserRole] = useState<UserRole>('Person')
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const t = useTypedTranslations("signUpPage")

  const searchParams = useSearchParams()
  const oauthEmail = searchParams.get('oauth')
  const isOAuth = Boolean(oauthEmail)

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
    
    
    if (isOAuth) {
      appendField(formData, 'UserRole', userRole)
    } else {
      appendField(formData, 'Email', data.Email)
    }
    appendField(formData, 'Password', prepared.Password)
    appendField(formData, 'PhoneNumber', prepared.PhoneNumber)
    
    if (prepared.MainPhoto?.[0]) appendField(formData, 'MainPhoto', prepared.MainPhoto[0])

    if (userRole === 'Person') {
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
      const endpoint = isOAuth
        ? '/Users/complete-oauth-registration'
        : userRole === 'Person'
          ? '/Users/add-Person-user'
          : '/Users/add-company-user'


      await axiosUser.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      toast.success(`${userRole === 'Person' ? t("personRegisteredToast") : t("companyRegisteredToast")} !`)
      reset()
      router.push('/login')
    } catch (err: unknown) {
      let message = t("unexpectedErrorToast")
      if (err instanceof AxiosError) {
        const data = err.response?.data

        if (data?.message && typeof data.message === 'object' && 'value' in data.message) {
          message = data.message.value
        } else {
          message = data?.error || data?.message || message
        }

        console.error(data || err.message)
      } else if (err instanceof Error) {
        message = err.message
        console.error(err)
      } else {
        console.error(err)
      }

      toast.error( message )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="px-4 max-w-2xl mx-auto my-3 sm:px-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-center sm:text-left">
          {t("registerAs")} {userRole === 'Person' ? t("person") : t("company")}
        </h2>

        <ToggleGroup
          type="single"
          value={userRole}
          onValueChange={(v) => v && setUserRole(v as UserRole)}
          className="flex gap-2"
        >
          <ToggleGroupItem value="Person">{t("person")}</ToggleGroupItem>
          <ToggleGroupItem value="Company">{t("company")}</ToggleGroupItem>
        </ToggleGroup>

        {/* Shared Fields */}
        {!isOAuth && (
          <div className="grid gap-1">
            <Label>{t("email")}</Label>
            <Input required type="email" {...register('Email')} />
          </div>
        )}

        
        <div className="grid gap-1">
          <Label>{t("phoneNumber")}</Label>
          <Input required type="tel" {...register('PhoneNumber', { required: true })} />
        </div>

        <div className="grid gap-1">
          <Label>{t("password")}</Label>
          <Input type="password" {...register('Password', { required: !isOAuth })} />
          {isOAuth && <p className="text-sm text-gray-500">Пароль не обязателен для регистрации через Google</p>}
        </div>


        
        {/* Person Fields */}
        {userRole === 'Person' && (
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
        {userRole === 'Company' && (
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
          userRole={userRole}
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