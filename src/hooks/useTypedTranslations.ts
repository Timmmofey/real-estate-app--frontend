import { useTranslations as nextUseTranslations } from "next-intl"
import type { Messages } from "../types/messages"

type Namespace = keyof Messages
type KeyOf<N extends Namespace> = keyof Messages[N] & string

export function useTypedTranslations<N extends Namespace | undefined = undefined>(
  namespace?: N
) {
  const t = nextUseTranslations()

  return ((key: N extends undefined ? string : KeyOf<N>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    return t(fullKey as never)
  }) as (key: N extends undefined ? string : KeyOf<N>) => string
}