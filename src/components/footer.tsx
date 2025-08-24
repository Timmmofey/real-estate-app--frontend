import { useTypedTranslations } from "@/lib/useTypedTranslations";

export default function Footer() {
  const t = useTypedTranslations()

  return (
    <footer className="w-full border-t p-4 text-center text-sm text-muted-foreground">
      © 2025 Classified. {t("footer.allRightsReserved")}.
    </footer>
  );
}
