"use client"
import { Container } from "@/components/container"
import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserStore } from "@/stores/userStore"
import EditPersonProfileForm from "@/components/edit-person-profile-form"
import EditCompanyProfileForm from "@/components/edit-company-profile-form"
import { Separator } from "@/components/ui/separator"
import { ContactCard } from "@/components/сontact-сard"
import { useProfileLoader } from "@/hooks/useProfileLoader"
import { DeviceAndActivitySection } from "@/components/device-and-activity-section"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { IdCard, KeyRound, Lock, LogIn, Mail, Phone, RotateCcwKey } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter, useSearchParams } from "next/navigation"
import { useTypedTranslations } from "@/hooks/useTypedTranslations"
import DeleteAccountSection from "@/components/delete-account-section"
import TwoFactorAuthSection from "@/components/two-factor-auth-section"
import ChangePasswordSection from "@/components/сhange-password-section"
import CreatePasswordSection from "@/components/create-password-section"
import { OAuthSection } from "@/components/o-auth-section"
import { toast } from "sonner";
import { useTranslations } from "next-intl"
import { useEffect } from "react"

enum TabsNames  {
    account = "account",
    contacts = "contacts",
    security = "security",
    payments = "payments",
    subscriptions = "subscriptions"
}

export default function SettingsPage() {
    useAuthGuard()
    useProfileLoader()
    
    const searchParams = useSearchParams()
    const defaultTab = searchParams.get('tab') as TabsNames
    const toastType = searchParams.get('toast-type') as "success"
    const toastMsg = searchParams.get('toast') as string
    
    const router = useRouter()
    const t = useTypedTranslations("settingsPage")
    const nt = useTranslations()

    useEffect(()=> {
        if (toastMsg){
            if (toastType == "success"){
                toast.success(`${nt(`settingsPage.${toastMsg}`)}`)
            } 
            else{
                toast.error(`${nt(`settingsPage.${toastMsg}`)}`)
            }
        }
    },[])
    
    
    const user  = useUserStore(s => s.user)
    
    if (!user) return <Skeleton className="h-40 w-full" />

    return(
        <Container>
            <Card className="max-w-xl mx-auto p-6 my-3">
                <h1 className="text-2xl font-semibold">{t("title")}</h1>
                <Tabs defaultValue={defaultTab || TabsNames.account} className="w-full">
                    <ScrollArea className="w-full block mb-5">
                        <TabsList className="inline-flex w-max">
                            <TabsTrigger value={TabsNames.account} className="shrink-0">{t("account")}</TabsTrigger>
                            <TabsTrigger value={TabsNames.contacts} className="shrink-0">{t("contacts")}</TabsTrigger>
                            <TabsTrigger value={TabsNames.security} className="shrink-0">{t("security")}</TabsTrigger>
                            <TabsTrigger value={TabsNames.payments} className="shrink-0">{t("payments")}</TabsTrigger>
                            <TabsTrigger value={TabsNames.subscriptions} className="shrink-0">{t("subscriptions")}</TabsTrigger>
                        </TabsList>
                        <ScrollBar  orientation="horizontal" />
                    </ScrollArea>

                    <TabsContent value="account">
                        <h2 className="text-lg font-semibold mb-5">{t("profileInfo")}</h2>

                        {user?.userRole === "Person" ? (
                            <EditPersonProfileForm />
                        ) : (
                            <EditCompanyProfileForm />
                        )}

                        <Separator className="my-7"/>

                        <h2 className="text-lg font-semibold mb-5">{t("contactInfo")}</h2>

                        <div className="flex flex-col sm:flex-row gap-3">
                            
                            <ContactCard
                                icon={<Mail />}
                                label="Email"
                                value={user?.email}
                                copyText={user?.email}
                                onEdit={() => router.push("/changeemail")}
                            />

                            <ContactCard
                                icon={<Phone />}
                                label={t("phone")}
                                value={user?.phoneNumer}
                                copyText={user?.phoneNumer}
                                onEdit={() => console.log("Edit phone")}
                            />

                        </div>

                        <Separator className="my-7"/>

                        {/* <h2 className="text-lg font-semibold mb-5">{t("devicesAndActivity")}</h2>

                        <DeviceAndActivitySection/>

                        <Separator className="my-7"/> */}

                        <h2 className="text-lg font-semibold mb-5">{t("deleteAccount")}</h2>
                        
                        <DeleteAccountSection/>
                    </TabsContent>

                    <TabsContent value="contacts">
                        <div className="flex flex-col sm:flex-row gap-3">
                            
                            <ContactCard
                                icon={<Mail />}
                                label="Email"
                                value={user?.email}
                                copyText={user?.email}
                                onEdit={() => router.push("/changeemail")}
                            />

                            <ContactCard
                                icon={<Phone />}
                                label={t("phone")}
                                value={user?.phoneNumer}
                                copyText={user?.phoneNumer}
                                onEdit={() => console.log("Edit phone")}
                            />

                        </div>
                    </TabsContent>
                
                    <TabsContent value="security">
                        <div className="flex items-center gap-2 mb-5">
                            { user.isOAuthOnly ? <KeyRound className="h-5 w-5"/> : <RotateCcwKey className="h-5 w-5" />}
                            <h2 className="text-lg font-semibold">{user.isOAuthOnly ? t("createPassword") : t("changePassword")}</h2>
                        </div>
                            { user.isOAuthOnly ? <CreatePasswordSection /> : <ChangePasswordSection /> }
                        <Separator className="my-7"/>

                        <div className="flex items-center gap-2 mb-5">
                            <LogIn className="h-5 w-5" />
                            <h2 className="text-lg font-semibold">{t("externalAuthMethods")}</h2>
                        </div>
                        <OAuthSection/>
                        
                        <Separator className="my-7"/>


                        <div className="flex items-center gap-2 mb-5">
                            <IdCard className="h-5 w-5" />
                            <h2 className="text-lg font-semibold">{t("twoFactorAuth")}</h2>
                        </div>
                        <TwoFactorAuthSection/>

                        <Separator className="my-7"/>

                        <div className="flex items-center gap-2 mb-5">
                            <Lock className="h-5 w-5" />
                            <h2 className="text-lg font-semibold">{t("devicesAndActivity")}</h2>
                        </div>
                        <DeviceAndActivitySection/>
                    </TabsContent>
                </Tabs>
            </Card>
        </Container>
    )
}