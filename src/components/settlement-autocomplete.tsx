/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { useDebounce } from 'use-debounce'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTypedTranslations } from '@/lib/useTypedTranslations'

type Option = { name: string; formatted: string }

type Props = {
  country?: string
  region?: string
  value?: string
  onChange: (val: string) => void
  placeholder?: string
  disabled: boolean
}

export function SettlementAutocomplete({
  country,
  region,
  value,
  onChange,
  placeholder,
  disabled,
}: Props) {
  const normalize = (v?: string | null) => (v === undefined || v === null || v === 'none' ? '' : v)

  const [input, setInput] = useState<string>(normalize(value))
  const [debouncedInput] = useDebounce(input, 400)
  const [options, setOptions] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState<number>(-1)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const listboxId = useRef(`settlement-listbox-${Math.random().toString(36).slice(2)}`)

  const t = useTypedTranslations("settlementAutocomplete")

  // Синхронизация локального input с внешним value
  useEffect(() => {
    const v = normalize(value)
    setInput(v)
    if (!v) {
      setOpen(false)
      setOptions([])
      setHighlighted(-1)
    }
  }, [value])

  useEffect(() => {
    if (disabled) {
      setInput('')
      setOpen(false)
      setOptions([])
      setHighlighted(-1)

      if (normalize(value) !== '') {
        onChange('') 
      }
    }
  }, [disabled]) 

  useEffect(() => {
    if (disabled) return
    if (debouncedInput.trim().length < 3) {
      setOptions([])
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false
    const fetchSettlements = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data } = await axios.get('/api/geoapify', {
          params: { text: `${debouncedInput} ${region || ''} ${country || ''}` },
        })
        if (cancelled) return
        const results = data?.results || []
        const mapped: Option[] = results.map((r: any, i: number) => ({
          formatted: r.formatted,
          name: r.properties?.city || r.formatted?.split(',')[0] || `${debouncedInput}-${i}`,
        }))
        setOptions(mapped)
        setHighlighted(mapped.length > 0 ? 0 : -1)
      } catch (e) {
        if (cancelled) return
        console.error(e)
        setError(t("error"))
        setOptions([])
        setHighlighted(-1)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchSettlements()
    return () => {
      cancelled = true
    }
  }, [debouncedInput, country, region, disabled])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const selectOption = (opt: Option) => {
    setInput(opt.name) 
    onChange(opt.name) 
    setOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (!open) {
      if (e.key === 'ArrowDown' && options.length > 0) {
        setOpen(true)
        e.preventDefault()
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((prev) => (prev < options.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((prev) => (prev > 0 ? prev - 1 : options.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlighted >= 0 && highlighted < options.length) {
        selectOption(options[highlighted])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className='grid gap-1'>
        <Label>{t("settlement")}</Label>
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e) => {
            const v = e.target.value
            setInput(v)
            onChange(v) 
            if (!disabled) setOpen(true)
          }}
          onFocus={() => !disabled && setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listboxId.current}
          aria-expanded={open}
          role="combobox"
          disabled={disabled}
        />
      </div>

      {open && !disabled && (
        <div
          id={listboxId.current}
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-64 overflow-auto rounded-md border bg-secondary shadow-lg"
        >
          {loading && <div className="p-2 text-center text-sm">{t("loading")}</div>}

          {error && <div className="p-2 text-center text-sm text-red-600">{error}</div>}

          {!loading && !error && options.length === 0 && (
            <div className="p-2 text-sm text-center text-muted-foreground">{t("noResults")}</div>
          )}

          {!loading && !error && options.length > 0 && (
            <ul className="divide-y" role="presentation">
              {options.map((opt, idx) => {
                const isHighlighted = idx === highlighted
                return (
                  <li
                    key={opt.formatted + idx}
                    role="option"
                    aria-selected={isHighlighted}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      selectOption(opt)
                    }}
                    onMouseEnter={() => setHighlighted(idx)}
                    className={`cursor-pointer px-3 py-2 text-sm ${isHighlighted ? 'bg-secondary' : ''}`}
                  >
                    {opt.formatted}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
