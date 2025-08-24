import type { ApiValidationError } from "@/types/apiValidationError"

export function isApiValidationError(error: unknown): error is ApiValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "title" in error &&
    "errors" in error
  )
}
