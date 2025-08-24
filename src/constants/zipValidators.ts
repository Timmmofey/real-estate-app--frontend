export const ZIP_PATTERNS_BY_COUNTRY: Record<string, { regex: RegExp; hint: string }> = {
  US: { regex: /^\d{5}(-\d{4})?$/, hint: "5 numbers or ZIP+4 (example: 12345 or 12345-6789)" },
  CA: { regex: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, hint: "6 symbols, letter-number-letter (example: K1A 0B1)" }
}