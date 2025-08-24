import { Languages } from "@/constants/languages";
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { en } from "../messages/en";
import { ru } from "../messages/ru";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get("classified_app_locale")?.value as Languages | undefined;
  const locale: Languages = cookieLocale || Languages.EN;

  const messagesMap: Record<Languages, typeof en> = {
    en,
    ru
    };

  return {
    locale,
    messages: messagesMap[locale],
  };
});