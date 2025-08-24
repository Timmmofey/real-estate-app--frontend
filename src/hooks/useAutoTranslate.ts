"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export function useAutoTranslate(text?: string | null, targetLang: string = "en") {
  const [translated, setTranslated] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!text) {
      // setTranslated(null)
      return
    }

    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data } = await axios.get(
          "https://translate.googleapis.com/translate_a/single",
          {
            params: {
              client: "gtx",
              sl: "auto",
              tl: targetLang,
              dt: "t",
              q: text,
            },
          }
        )
        console.log("Api called")

        if (!cancelled) {
          setTranslated(data[0][0][0])
        }
      } catch (e) {
        if (!cancelled) {
          console.error("Translation error:", e)
          setError("Translation failed")
          setTranslated(text) 
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [text, targetLang])

  return { translated, loading, error }
}
