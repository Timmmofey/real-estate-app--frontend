"use client"
import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/stores/userStore";
import EditPersonProfileForm from "@/components/edit-person-profile-form";
import EditCompanyProfileForm from "@/components/edit-company-profile-form";
import { Separator } from "@/components/ui/separator";
import { ContactCard } from "@/components/сontact-сard";
import { useProfileLoader } from "@/hooks/useProfileLoader";
import { DeviceAndActivitySection } from "@/components/device-and-activity-section";
import { useAuthGuard } from "@/lib/useAuthGuard";
import { Mail, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useTypedTranslations } from "@/lib/useTypedTranslations";
import DeleteAccountSection from "@/components/delete-account-section";

export default function SettingsPage() {
    useAuthGuard()
    useProfileLoader()
    const router = useRouter();
    const t = useTypedTranslations("settingsPage")
    
    
    const user  = useUserStore(s => s.user)
    
    if (!user) return <Skeleton className="h-40 w-full" />

    return(
        <Container>
            <Card className="max-w-xl mx-auto p-6 my-3">
                <h1 className="text-2xl font-semibold">{t("title")}</h1>
                    <Tabs defaultValue="account" className="w-full">
                        <ScrollArea className="w-full block">
                            <TabsList className="inline-flex w-max">
                                <TabsTrigger value="account" className="shrink-0">{t("account")}</TabsTrigger>
                                <TabsTrigger value="contacts" className="shrink-0">{t("contacts")}</TabsTrigger>
                                <TabsTrigger value="security" className="shrink-0">{t("security")}</TabsTrigger>
                                <TabsTrigger value="payments" className="shrink-0">{t("payments")}</TabsTrigger>
                                <TabsTrigger value="subscriptions" className="shrink-0">{t("subscriptions")}</TabsTrigger>
                            </TabsList>
                            <ScrollBar  orientation="horizontal" />
                        </ScrollArea>

                        <TabsContent value="account">
                            <h2 className="text-lg font-semibold mb-5">{t("profileInfo")}</h2>

                            {user?.userType === "person" ? (
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

                            <h2 className="text-lg font-semibold mb-5">{t("devicesAndActivity")}</h2>

                            <DeviceAndActivitySection/>

                            <Separator className="my-7"/>

                            <h2 className="text-lg font-semibold mb-5">Delete account</h2>
                            
                            <DeleteAccountSection/>
                        </TabsContent>

                        <TabsContent value="contacts">
                            
                        </TabsContent>
                    </Tabs>
            </Card>
        </Container>
    )
}