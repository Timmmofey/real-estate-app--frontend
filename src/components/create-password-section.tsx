"use client"

import { useTypedTranslations } from "@/hooks/useTypedTranslations"
import { Button } from "./ui/button"
import Link from "next/link"

export default function CreatePasswordSection() {
    const t = useTypedTranslations("createPasswordSection")
    
    return (
        <div className="flex items-center justify-between gap-5 max-w-lg">
            <p className="text-xs text-muted-foreground">{t("createPasswordHint")}</p>

            <Button className="min-w-[140px]">
                <Link href={"createpassword"}>
                    {t("createPassword")}
                </Link>
            </Button>
        </div>
    )
}