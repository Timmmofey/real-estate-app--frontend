"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export function useAutoTranslate(text?: string | null, targetLang: string = "en", doNotTranslate: boolean = false) {
  const [translated, setTranslated] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!text) {
      return
    }

    if (!text || doNotTranslate) {
      setTranslated(text || null)
      setLoading(false)
      return
    }

    if (doNotTranslate) {
      setTranslated(text)
      setLoading(false)
      return 
    }

    let cancelled = false

    const run = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data } = await axios.get(
          "http://localhost:5229/api/Translation/translate",
          {
            params:{
              text: text,
              targetLanguage: targetLang
            }
          }
        )
        console.log("Api called")

        if (!cancelled) {
          setTranslated(data)
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
