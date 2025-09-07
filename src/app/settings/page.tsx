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

export default function SettingsPage() {
    useAuthGuard()
    useProfileLoader()
    
    
    const user  = useUserStore(s => s.user)
    
    if (!user) return <Skeleton className="h-40 w-full" />

    return(
        <Container>
            <Card className="max-w-xl mx-auto p-6 my-3">
                <h1 className="text-2xl font-semibold">Settings</h1>
                    <Tabs defaultValue="account" className="w-full">
                        <ScrollArea className="w-full block">
                            <TabsList className="inline-flex w-max">
                                <TabsTrigger value="account" className="shrink-0">Account</TabsTrigger>
                                <TabsTrigger value="contacts" className="shrink-0">Contacts</TabsTrigger>
                                <TabsTrigger value="security" className="shrink-0">Security</TabsTrigger>
                                <TabsTrigger value="payments" className="shrink-0">Payments</TabsTrigger>
                                <TabsTrigger value="subscriptions" className="shrink-0">Subscriptions</TabsTrigger>
                            </TabsList>
                            <ScrollBar  orientation="horizontal" />
                        </ScrollArea>

                        <TabsContent value="account">
                            <h2 className="text-lg font-semibold mb-5">Profile info</h2>

                            {user?.userType === "person" ? (
                                <EditPersonProfileForm />
                            ) : (
                                <EditCompanyProfileForm />
                            )}

                            <Separator className="my-7"/>

                            <h2 className="text-lg font-semibold mb-5">Contact info</h2>

                            <div className="flex flex-col sm:flex-row gap-3">
                                
                                <ContactCard
                                    icon={<Mail />}
                                    label="Email"
                                    value={user?.email}
                                    copyText={user?.email}
                                    onEdit={() => console.log("Edit email")}
                                />

                                <ContactCard
                                    icon={<Phone />}
                                    label="Phone"
                                    value={user?.phoneNumer}
                                    copyText={user?.phoneNumer}
                                    onEdit={() => console.log("Edit phone")}
                                />

                            </div>

                            <Separator className="my-7"/>

                            <h2 className="text-lg font-semibold mb-5">Devices and activity</h2>

                           <DeviceAndActivitySection/>

                        </TabsContent>

                        <TabsContent value="contacts">
                            
                        </TabsContent>
                    </Tabs>
            </Card>
        </Container>
    )
}