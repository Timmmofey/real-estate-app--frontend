import axiosAuth from "@/lib/axiosAuth";
import { Bot, CircleQuestionMark, Monitor, OctagonX, Smartphone, Tablet, Tv } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { Languages } from "@/constants/languages";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useAuthStore } from "@/stores/authStore";
import { DeviceType } from "@/constants/deviceType";
import { useTypedTranslations } from "@/lib/useTypedTranslations";
import { useTranslations } from "next-intl";

type DeviceAndSessionResponceDto = {
    sessionId: string,
    deviceName: string,
    isCurrentSession: boolean | false
    lastActivity: string
    ipAddress?: string
    deviceType?: DeviceType | null,
    country?: string,
    settlement?: string
}

export function DeviceAndActivitySection(){
    const [sessions, setSessions] = useState<DeviceAndSessionResponceDto[]>()
    const [loading, setLoading] = useState(true)
    const [locale, setLocale] = useState("en-US");
    const [showAllOtherSessions, setShowAllOtherSessions] = useState(false);
    const logoutAll = useAuthStore((s) => s.logoutAll)
    const t = useTypedTranslations("deviceAndActivitySection")
    const nt = useTranslations()

    const filteredSessions = sessions
        ?.filter((s) => !s.isCurrentSession)
        .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());

    const displayedSessions = showAllOtherSessions
        ? filteredSessions
        : filteredSessions?.slice(0, 3);
    
    const deviceCounts = sessions?.reduce<Record<string, number>>((acc, s) => {
        const type = s.deviceType ?? "Unknown";
        acc[type] = (acc[type] || 0) + 1;
            return acc;
    }, {}) ?? {};

    const countriesCounts = sessions?.reduce<Record<string, number>>((acc, s) => {
        const country = s.country ?? "Unknown";
        acc[country] = (acc[country] || 0) + 1;
            return acc;
    }, {}) ?? {};

    useEffect(()=>{
        const load = async () => {
            try{
                const storedLocale = Cookies.get("classified_app_locale") as Languages | undefined;
                
                const locale = storedLocale === Languages.EN ? "en-US" : "ru-RU";
                setLocale(locale);

                const res = await axiosAuth.get("Auth/get-users-sessions")
                setSessions(res.data)
            } catch{

            } finally{
                setLoading(false)
            }
        }

        load()
    }, [])

    function setIcon(deviceType: DeviceType | null | undefined) {
        switch (deviceType) {
            case DeviceType.Mobile:
                return <Smartphone/>
            case DeviceType.Tablet:
                return <Tablet/>
            case DeviceType.Desktop:
                return <Monitor/>
            case DeviceType.SmartTv:
                return <Tv/>
            case DeviceType.Bot:
                return <Bot/>
            default:
                return <CircleQuestionMark />
        }
    }

    function formatLastActivity(lastActivity: string) {
        const date = new Date(lastActivity);

        return new Date(date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    async function handleLogoutAllSessions(){
        try{
            logoutAll()
        }
        catch{
            toast.error("Failer to logout all sessions")
        }
    }

    if(loading) return <Skeleton className="w-full h-15 rounded"/> 

    
    const currentSession= sessions?.find((s) => s.isCurrentSession == true)

    return(
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
                <h4 className="mb-2 font-semibold">{t("currentSession")}</h4>
                {currentSession && (
                    <div className="w-full flex items-center gap-4 p-3 border-2 rounded ">
                        <div className="h-6 w-6 flex-shrink-0">
                            {setIcon(currentSession.deviceType)}
                        </div>
                        <div className="flex flex-col flex-grow select-none">
                            <p className="text-sm font-medium">{currentSession.deviceName}</p>
                            <p className="text-xs text-muted-foreground">
                            {currentSession.country} {currentSession.settlement}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {t("activeNow")}
                            </p>
                        </div>
                    </div>
                )}

                <Separator className="my-3"/>

                <h4 className="mb-2 font-semibold">{t("otherSessions")}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                    {
                        displayedSessions?.length === 0 && <p className="text-sm text-center text-muted-foreground">{t("noOtherSessions")}</p>
                    }
                    {displayedSessions
                    ?.map((s) => (
                        <div
                        key={s.sessionId}
                        className="w-full flex items-center gap-4 p-3 border-2 rounded transition"
                        >
                        <div className="h-6 w-6 flex-shrink-0">{setIcon(s.deviceType)}</div>
                        <div className="flex flex-col flex-grow select-none">
                            <p className="text-sm font-medium">{s.deviceName}</p>
                            <p className="text-xs text-muted-foreground">
                            {s.country} {s.settlement}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {t("activeAt")} {formatLastActivity(s.lastActivity)}
                            </p>
                        </div>
                        </div>
                    ))}
                    {filteredSessions && filteredSessions.length > 3  && (
                        <button
                            className="mt-2 text-sm text-blue-500 hover:underline"
                            onClick={() => setShowAllOtherSessions(!showAllOtherSessions)}
                        >
                            { showAllOtherSessions ? t("hide") : (`${t("showMore")} (${filteredSessions.length - 3})`)}
                        </button>
                    )}
                </div>
            </div>
            
            <div className="sm:col-span-1">
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{t("totalSessions")}: {sessions?.length}</h4>
                    
                    <Separator/>

                    <div>
                        <h4 className=" font-semibold mb-2">{t("deviceUsage")}</h4>
                        {Object.entries(deviceCounts).map(([device, count], index, arr) => (
                            <div key={device}>
                                <div  className="flex justify-between items-end text-sm my-1.5">
                                    <span className="flex gap-3 items-end">{setIcon(device as DeviceType)} {nt(`deviceTypes.${device}`)}</span>
                                    <span>{count}</span>
                                </div>
                                {index + 1 < arr.length && <Separator />}
                            </div>
                        ))}
                    </div>

                    <Separator/>

                    <div>
                        <h4 className=" font-semibold mb-2">{t("locations")}</h4>
                        {Object.entries(countriesCounts).map(([country, count], index, arr) => (
                            <div key={country}>
                                <div  className="flex justify-between items-end text-sm my-1.5">
                                    <span className="flex gap-3 items-end"> {country}</span>
                                    <span>{count}</span>
                                </div>
                                {index + 1 < arr.length && <Separator />}
                            </div>
                        ))}
                    </div>

                    <Separator/>
                                  
                    <AlertDialog>
                        <AlertDialogTrigger >
                            <Button variant={"destructive"} className="flex gap-1 w-full text-xs"> 
                                <OctagonX />
                                {t("logoutAll")}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>{t("logoutConfirmTitle")}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {t("logoutConfirmDescription")}
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>{t("logoutCancel")}</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogoutAllSessions}>{t("logoutContinue")}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>

    )
    
}