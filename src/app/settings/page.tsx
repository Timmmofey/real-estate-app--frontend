"use client"
import { Container } from "@/components/container";
import EditCompanyAccountSettingsForm from "@/components/edit-company-account-settings-form";
import EditPersonAccountSettingsForm from "@/components/edit-person-account-settings-form";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isApiValidationError } from "@/lib/errors";
import { useAuthGuard } from "@/lib/useAuthGuard";
import { useTypedTranslations } from "@/lib/useTypedTranslations";
import { useUserStore } from "@/stores/userStore";
import { AxiosError } from "axios";
import { useEffect } from "react";
import EditProfilePage from "../editprofile/page";
import EditPersonProfileForm from "@/components/edit-person-profile-form";
import EditCompanyProfileForm from "@/components/edit-company-profile-form";
import { Separator } from "@/components/ui/separator";
import { Mail, PencilLine, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";




export default function SettingsPage() {
    // useAuthGuard()
    
    const { fetchProfile, user } = useUserStore()
    // const t = useTypedTranslations("editProfilePage")
  

    // useEffect(() => {
    //     const load = async () => {
    //     try {
    //         await fetchProfile()
    //     } catch (err: unknown) {
    //         if (err instanceof AxiosError) {
    //         if (err.response?.status === 401) {
    //             try {
    //             await fetchProfile()
    //             } catch (e) {
    //             console.error("Profile load failed even after refresh", e)
    //             }
    //         } else {
    //             console.error("Axios error", err.response?.data || err.message)
    //         }
    //         }
    //         else if (isApiValidationError(err)) {
    //         console.error("Validation error", err.errors)
    //         }
    //         else {
    //         console.error("Unexpected error", err)
    //         }
    //     }
    //     }

    //     load()
    // }, [fetchProfile])


    // if (!user) return <Skeleton className="h-40 w-full" />

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
                                 <div className="w-full flex items-center gap-4 p-2 border rounded">
                                    <Mail className="h-6 w-6 flex-shrink-0" />

                                    <div className="flex flex-col flex-grow">
                                        <span className="text-sm font-medium">Email</span>
                                        <span className="text-sm text-muted-foreground">{user?.email ?? "email@email.com"}</span>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        className=" text-right justify-end flex items-center gap-2"
                                    >
                                        Edit
                                        <PencilLine className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="w-full flex items-center gap-4 p-2 border rounded">
                                    <Phone className="h-6 w-6 flex-shrink-0" />

                                    <div className="flex flex-col flex-grow">
                                        <span className="text-sm font-medium">Phone Number</span>
                                        <span className="text-sm text-muted-foreground">{user?.email ?? "88005553535"}</span>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        className=" text-right justify-end flex items-center gap-2"
                                    >
                                        Edit
                                        <PencilLine className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <Separator className="my-7"/>

                            <h2 className="text-lg font-semibold mb-5">Devices and activity</h2>


                        </TabsContent>

                        <TabsContent value="contacts">
                            
                        </TabsContent>
                    </Tabs>
            </Card>
        </Container>
    )
}