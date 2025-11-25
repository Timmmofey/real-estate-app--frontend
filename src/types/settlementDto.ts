export type SettlementDto = {
  settlement: string
  other_Settlement_Names: Record<string, string> // например { en: "Houston", ru: "Хьюстон" }
  displayName: string
  other_DisplayName_Names: Record<string, string> // например { en: "Houston, TX, USA", ru: "Хьюстон, Техас, США" }
}
