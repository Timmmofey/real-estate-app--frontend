import { Button } from "@/components/ui/button"
import { Copy, PencilLine } from "lucide-react"
import { toast } from "sonner"
import { ReactNode } from "react"
import { Skeleton } from "./ui/skeleton"
import { useTypedTranslations } from "@/lib/useTypedTranslations"

type ContactCardProps = {
  icon: ReactNode
  label: string
  value?: string
  copyText?: string
  onEdit?: () => void
}

export function ContactCard({ icon, label, value, copyText, onEdit }: ContactCardProps) {
    const t = useTypedTranslations("contactCard")
    

    return (
        value ?

        <div className="relative w-full max-w-[50%] flex items-center gap-4 p-2 border-2 rounded">
            <div className="h-6 w-6 flex-shrink-0">{icon}</div>

            <div
                className="flex flex-col flex-grow cursor-pointer select-none"
                onClick={() => {
                    if (copyText) {
                        navigator.clipboard.writeText(copyText)
                        toast.success(`${label} ${t("clipboard")}`)
                    }
                }}
            >
                <span className="text-sm font-medium flex items-center gap-2">
                {label}
                <Copy className="h-3 w-3" />
                </span>
                <span className="text-sm text-muted-foreground">{value}</span>
            </div>

            <Button
                variant="ghost"
                className="absolute top-0 right-0 text-right justify-end flex items-center gap-2"
                onClick={onEdit}
            >
                {t("edit")}
                <PencilLine className="h-4 w-4" />
            </Button>
        </div> 

        :
        
        <Skeleton className="w-full h-15 rounded"/> 
  )
}
