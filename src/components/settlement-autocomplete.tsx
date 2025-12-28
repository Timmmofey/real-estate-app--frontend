// 'use client'

// import { useState, useEffect, useRef, KeyboardEvent } from 'react'
// import { useDebounce } from 'use-debounce'
// import axios from 'axios'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { useTypedTranslations } from '@/hooks/useTypedTranslations'
// import { useLocaleStore } from '@/stores/localeStore'
// import { BrushCleaning } from 'lucide-react'
// import { SettlementDto } from '@/types/settlementDto'
// import { Separator } from './ui/separator'

// type Option = {
//   label: string
//   value: string
//   formatted: string
// }

// type Props = {
//   country?: string
//   region?: string
//   value?: string
//   onChange: (val: string) => void
//   placeholder?: string
//   disabled: boolean
// }

// export function SettlementAutocomplete({
//   country,
//   region,
//   value,
//   onChange,
//   placeholder,
//   disabled,
// }: Props) {
//   const normalize = (v?: string | null) => (v === undefined || v === null || v === 'none' ? '' : v)

//   const [input, setInput] = useState<string>(normalize(value))
//   const [debouncedInput] = useDebounce(input, 400)
//   const [options, setOptions] = useState<Option[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [open, setOpen] = useState(false)
//   const [highlighted, setHighlighted] = useState<number>(-1)
//   const [active, setActive] = useState(false)
//   const locale = useLocaleStore(state => state.locale || 'en')
  
//   const containerRef = useRef<HTMLDivElement | null>(null)
//   const listboxId = useRef(`settlement-listbox-${Math.random().toString(36).slice(2)}`)
  
//   const t = useTypedTranslations('settlementAutocomplete')
  
//   const lastQueryRef = useRef<string | null>(null)
//   const initLocaleDoneRef = useRef(false)
  
//   const committedValueRef = useRef<string>(normalize(value))
//   const selectionMadeRef = useRef(false) 
  
//   useEffect(() => {
//     const v = normalize(value)
//     committedValueRef.current = v

//     const match = options.find(o => o.value === v)
//     if (match) {
//       setInput(match.label)
//     } else {
//       setInput(v)
//     }

//     if (!v) {
//       setOpen(false)
//       setOptions([])
//       setHighlighted(-1)
//     }
//   }, [value])

//   useEffect(() => {
//     const v = normalize(value)

//     if (locale == "en" ) return

//     if (!v) {
//       setInput('')
//       return
//     }

//     // защита от двойного вызова в React Strict Mode
//     if (initLocaleDoneRef.current) return
//     initLocaleDoneRef.current = true


//     const loadInitialLabel = async () => {
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_GEO_SERVICE_URL}/Geo/suggestsettlements?query=${v}&countryCode=${country}&regionCode=${region}&type=city`
//         )


//         const r: SettlementDto | undefined = data?.[0]
//         if (!r) return

//         const englishName = r.settlement || v

//         let localizedLabel = englishName
//         let formatted = r.displayName || englishName

//         if (locale !== 'en') {
//           localizedLabel =
//             r.other_Settlement_Names[locale] ||
//             r.other_Settlement_Names[locale.split('-')[0]] ||
//             englishName

//           formatted =
//             r.other_DisplayName_Names[locale] ||
//             r.other_DisplayName_Names[locale.split('-')[0]] ||
//             formatted
//         }

//         setInput(localizedLabel)

//         setOptions([
//           {
//             label: localizedLabel,
//             value: englishName,
//             formatted,
//           },
//         ])

//         committedValueRef.current = englishName
//       } catch (e) {
//         console.error(e)
//       }
//     }

//     loadInitialLabel()

//   }, [])


//   useEffect(() => {
//     if (disabled) {
//       setInput('')
//       setOpen(false)
//       setOptions([])
//       setHighlighted(-1)
//       if (normalize(value) !== '') {
//         onChange('')
//       }
//     }
//   }, [disabled])


//   useEffect(() => {
//     if (!active || disabled || !open) return
//     const query = debouncedInput.trim()
//     if (query.length < 3) {
//       setOptions([])
//       setLoading(false)
//       setError(null)
//       return
//     }

//     if (lastQueryRef.current === query) return

//     const ac = new AbortController()
//     let cancelled = false

//     const fetchSettlements = async () => {
//       setLoading(true)
//       setError(null)
      
//       if (cancelled || !region) return

//       try {
//         const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_GEO_SERVICE_URL}/Geo/suggestsettlements?query=${debouncedInput}&countryCode=${country}&regionCode=${region}&type=city`)
        
//         console.log(data)
//         const results = data ?? []
//         console.log(results)

//         const mapped: Option[] = results.map((r: SettlementDto, i: number) => {
//           const englishName = r.settlement || `unknown-${i}`

//           let localizedLabel = englishName
//           let formatted = r.displayName || englishName

//           if (locale !== 'en') {
//             localizedLabel = r.other_Settlement_Names[locale] || r.other_Settlement_Names[locale.split('-')[0]] || englishName
//             formatted = r.other_DisplayName_Names[locale] || r.other_DisplayName_Names[locale.split('-')[0]] || formatted
//           }

//           return { label: localizedLabel, value: englishName, formatted }
//         })

//         console.log( mapped)

//         setOptions(mapped)
//         setHighlighted(mapped.length > 0 ? 0 : -1)
//       } catch (err: any) {
//         if (!axios.isCancel(err)) {
//           console.error(err)
//           setError(t('error'))
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSettlements()

//     return () => {
//       cancelled = true
//       ac.abort()
//     }
//   }, [debouncedInput, country, region, disabled, active, locale, open])

//   useEffect(() => {
//     const onDocClick = (e: MouseEvent) => {
//       if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
//         setOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', onDocClick)
//     return () => document.removeEventListener('mousedown', onDocClick)
//   }, [])

//   useEffect(() => {
//     if (!open) {
//       if (selectionMadeRef.current) {
//         // выбор был — сбросим флаг и ничего не откатываем
//         selectionMadeRef.current = false
//         return
//       }

//       // откатываем к committedValueRef (ищем метку в options, иначе показываем само значение)
//       const committed = committedValueRef.current
//       const match = options.find(o => o.value === committed)
//       const label = match ? match.label : committed
//       setInput(label)
//     }
//   }, [open, options])


//   const selectOption = (opt: Option | null) => {
//     // пометим, что выбор сделан, чтобы эффект закрытия не откатил значение
//     selectionMadeRef.current = true

//     if (opt === null) {
//       committedValueRef.current = ''
//       setInput('')
//       setOptions([])
//       setHighlighted(-1)
//       onChange('') 
//       setOpen(false)
//       return
//     }

//     committedValueRef.current = opt.value
//     setInput(opt.label)
//     setOptions([])
//     setHighlighted(-1)
//     onChange(opt.value)
//     setOpen(false)
//   }


//   const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (disabled) return
//     if (!open) {
//       if (e.key === 'ArrowDown' && options.length > 0) {
//         setOpen(true)
//         e.preventDefault()
//       }
//       return
//     }

//     if (e.key === 'ArrowDown') {
//       e.preventDefault()
//       setHighlighted((prev) => (prev < options.length - 1 ? prev + 1 : 0))
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault()
//       setHighlighted((prev) => (prev > 0 ? prev - 1 : options.length - 1))
//     } else if (e.key === 'Enter') {
//       e.preventDefault()
//       if (highlighted >= 0 && highlighted < options.length) {
//         selectOption(options[highlighted])
//       }
//     } else if (e.key === 'Escape') {
//       e.preventDefault()
//       setOpen(false) 
//     }
//   }

//   return (
//     <div ref={containerRef} className="relative">
//       <div className='grid gap-1'>
//         <Label>{t('settlement')}</Label>
//         <Input
//           placeholder={placeholder}
//           value={input}
//           onChange={(e) => {
//             const v = e.target.value
//             // ВАЖНО: не вызываем внешнее onChange при наборе — значение будет подтверждено только при выборе
//             setInput(v)

//             if (!disabled) {
//               setOpen(true)
//               setActive(true)
//             }
//           }}
//           onFocus={() => {
//             if (!disabled) {
//               setOpen(true)
//               setActive(true)
//             }
//           }}
//           onBlur={() => setActive(false)}
//           onKeyDown={onKeyDown}
//           autoComplete="off"
//           aria-autocomplete="list"
//           aria-controls={listboxId.current}
//           aria-expanded={open}
//           role="combobox"
//           disabled={disabled}
//         />
//       </div>

//       {open && !disabled && (
//         <div
//           id={listboxId.current}
//           role="listbox"
//           className="absolute z-20 mt-1 w-full max-h-64 overflow-auto rounded-md border bg-secondary shadow-lg"
//         >
//           {loading && <div className="p-2 text-center text-sm">{t('loading')}</div>}

//           {error && <div className="p-2 text-center text-sm text-red-600">{error}</div>}

//           {!loading && !error && options.length === 0 && (
//             <div>
//               {input.length > 0 && 
//               <div>
//                 <div
//                   key="__clear__"
//                   role="option"
//                   aria-selected={false}
//                   onMouseDown={(e) => {
//                     e.preventDefault()
//                     selectOption(null)
//                   }}
//                   className="flex gap-3 cursor-pointer px-3 py-2 text-sm text-destructive hover:bg-secondary"
//                 >
//                   <BrushCleaning />
//                   {t("clear")}
//                 </div>
//                 <Separator/>
//               </div>
//               }
//               <div className="p-2 text-sm text-center text-muted-foreground">{t('noResults')}</div>
//             </div>
            
//           )}

//           {!loading && !error && options.length > 0 && (
//             <ul className="divide-y" role="presentation">
//               <li
//                 key="__clear__"
//                 role="option"
//                 aria-selected={false}
//                 onMouseDown={(e) => {
//                   e.preventDefault()
//                   selectOption(null)
//                 }}
//                 className="flex gap-3 cursor-pointer px-3 py-2 text-sm text-destructive hover:bg-secondary"
//               >
//                 <BrushCleaning />
//                  {t("clear")}
//               </li>
//               <p className="py-1.5 text-sm text-center text-muted-foreground" >{t("chooseFromTheList")}</p>
//               {options.map((opt, idx) => {
//                 const isHighlighted = idx === highlighted
//                 return (
//                   <li
//                     key={opt.value + idx}
//                     role="option"
//                     aria-selected={isHighlighted}
//                     onMouseDown={(e) => {
//                       e.preventDefault()
//                       selectOption(opt)
//                     }}
//                     onMouseEnter={() => setHighlighted(idx)}
//                     className={`cursor-pointer px-3 py-2 text-sm ${isHighlighted ? 'bg-secondary' : ''}`}
//                   >
//                     <div className='flex gap-1.5'>
//                       <div className="font-medium text-sm">{opt.label}</div>
//                       {opt.label != opt.value && <div className="text-sm text-muted-foreground"> ({opt.value})</div>}
//                     </div>
//                     <div className="text-xs text-muted-foreground">{opt.formatted}</div>
//                   </li>
//                 )
//               })}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { useDebounce } from 'use-debounce'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTypedTranslations } from '@/hooks/useTypedTranslations'
import { useLocaleStore } from '@/stores/localeStore'
import { BrushCleaning } from 'lucide-react'
import { SettlementDto } from '@/types/settlementDto'
import { Separator } from './ui/separator'

type Option = {
  label: string
  value: string
  formatted: string
}

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
  const [active, setActive] = useState(false)
  const locale = useLocaleStore(state => state.locale || 'en')
  
  const containerRef = useRef<HTMLDivElement | null>(null)
  const listboxId = useRef(`settlement-listbox-${Math.random().toString(36).slice(2)}`)
  
  const t = useTypedTranslations('settlementAutocomplete')
  
  const lastQueryRef = useRef<string | null>(null)
  const initLocaleDoneRef = useRef(false)
  
  const committedValueRef = useRef<string>(normalize(value))
  const selectionMadeRef = useRef(false) 
  
  useEffect(() => {
    const v = normalize(value)
    committedValueRef.current = v

    const match = options.find(o => o.value === v)
    if (match) {
      setInput(match.label)
    } else {
      setInput(v)
    }

    if (!v) {
      setOpen(false)
      setOptions([])
      setHighlighted(-1)
    }
  }, [value])

  useEffect(() => {
    const v = normalize(value)

    if (locale == "en" ) return

    if (!v) {
      setInput('')
      return
    }

    // защита от двойного вызова в React Strict Mode
    if (initLocaleDoneRef.current) return
    initLocaleDoneRef.current = true


    const loadInitialLabel = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_GEO_SERVICE_URL}/Geo/suggestsettlements?query=${v}&countryCode=${country}&regionCode=${region}&type=city`
        )


        const r: SettlementDto | undefined = data?.[0]
        if (!r) return

        const englishName = r.settlement || v

        let localizedLabel = englishName
        let formatted = r.displayName || englishName

        if (locale !== 'en') {
          localizedLabel =
            r.other_Settlement_Names[locale] ||
            r.other_Settlement_Names[locale.split('-')[0]] ||
            englishName

          formatted =
            r.other_DisplayName_Names[locale] ||
            r.other_DisplayName_Names[locale.split('-')[0]] ||
            formatted
        }

        setInput(localizedLabel)

        setOptions([
          {
            label: localizedLabel,
            value: englishName,
            formatted,
          },
        ])

        committedValueRef.current = englishName
      } catch (e) {
        console.error(e)
      }
    }

    loadInitialLabel()

  }, [])


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
    if (!active || disabled || !open) return
    const query = debouncedInput.trim()
    if (query.length < 3) {
      setOptions([])
      setLoading(false)
      setError(null)
      return
    }

    if (lastQueryRef.current === query) return

    const ac = new AbortController()
    let cancelled = false

    const fetchSettlements = async () => {
      setLoading(true)
      setError(null)
      
      if (cancelled || !region) return

      try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_GEO_SERVICE_URL}/Geo/suggestsettlements?query=${debouncedInput}&countryCode=${country}&regionCode=${region}&type=city`)
        
        console.log(data)
        const results = data ?? []
        console.log(results)

        const mapped: Option[] = results.map((r: SettlementDto, i: number) => {
          const englishName = r.settlement || `unknown-${i}`

          let localizedLabel = englishName
          let formatted = r.displayName || englishName

          if (locale !== 'en') {
            localizedLabel = r.other_Settlement_Names[locale] || r.other_Settlement_Names[locale.split('-')[0]] || englishName
            formatted = r.other_DisplayName_Names[locale] || r.other_DisplayName_Names[locale.split('-')[0]] || formatted
          }

          return { label: localizedLabel, value: englishName, formatted }
        })

        console.log( mapped)

        setOptions(mapped)
        setHighlighted(mapped.length > 0 ? 0 : -1)
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          console.error(err)
          setError(t('error'))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSettlements()

    return () => {
      cancelled = true
      ac.abort()
    }
  }, [debouncedInput, country, region, disabled, active, locale, open])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  useEffect(() => {
    if (!open) {
      if (selectionMadeRef.current) {
        // выбор был — сбросим флаг и ничего не откатываем
        selectionMadeRef.current = false
        return
      }

      // откатываем к committedValueRef (ищем метку в options, иначе показываем само значение)
      const committed = committedValueRef.current
      const match = options.find(o => o.value === committed)
      const label = match ? match.label : committed
      setInput(label)
    }
  }, [open, options])


  const selectOption = (opt: Option | null) => {
    selectionMadeRef.current = true

    if (opt === null) {
      committedValueRef.current = ''
      setInput('')
      // оставляем options пустым
      setOptions([])
      setHighlighted(-1)
      onChange('')
      setOpen(false)
      return
    }

    committedValueRef.current = opt.value
    setInput(opt.label)

    // важно: сохраняем выбранную опцию, чтобы эффект по value смог найти соответствие
    setOptions([opt])
    setHighlighted(-1)

    onChange(opt.value)
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
        <Label>{t('settlement')}</Label>
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e) => {
            const v = e.target.value
            // ВАЖНО: не вызываем внешнее onChange при наборе — значение будет подтверждено только при выборе
            setInput(v)

            if (!disabled) {
              setOpen(true)
              setActive(true)
            }
          }}
          onFocus={() => {
            if (!disabled) {
              setOpen(true)
              setActive(true)
            }
          }}
          onBlur={() => setActive(false)}
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
          {loading && <div className="p-2 text-center text-sm">{t('loading')}</div>}

          {error && <div className="p-2 text-center text-sm text-red-600">{error}</div>}

          {!loading && !error && options.length === 0 && (
            <div>
              {input.length > 0 && 
              <div>
                <div
                  key="__clear__"
                  role="option"
                  aria-selected={false}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    selectOption(null)
                  }}
                  className="flex gap-3 cursor-pointer px-3 py-2 text-sm text-destructive hover:bg-secondary"
                >
                  <BrushCleaning />
                  {t("clear")}
                </div>
                <Separator/>
              </div>
              }
              <div className="p-2 text-sm text-center text-muted-foreground">{t('noResults')}</div>
            </div>
            
          )}

          {!loading && !error && options.length > 0 && (
            <ul className="divide-y" role="presentation">
              <li
                key="__clear__"
                role="option"
                aria-selected={false}
                onMouseDown={(e) => {
                  e.preventDefault()
                  selectOption(null)
                }}
                className="flex gap-3 cursor-pointer px-3 py-2 text-sm text-destructive hover:bg-secondary"
              >
                <BrushCleaning />
                 {t("clear")}
              </li>
              <p className="py-1.5 text-sm text-center text-muted-foreground" >{t("chooseFromTheList")}</p>
              {options.map((opt, idx) => {
                const isHighlighted = idx === highlighted
                return (
                  <li
                    key={opt.value + idx}
                    role="option"
                    aria-selected={isHighlighted}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      selectOption(opt)
                    }}
                    onMouseEnter={() => setHighlighted(idx)}
                    className={`cursor-pointer px-3 py-2 text-sm ${isHighlighted ? 'bg-secondary' : ''}`}
                  >
                    <div className='flex gap-1.5'>
                      <div className="font-medium text-sm">{opt.label}</div>
                      {opt.label != opt.value && <div className="text-sm text-muted-foreground"> ({opt.value})</div>}
                    </div>
                    <div className="text-xs text-muted-foreground">{opt.formatted}</div>
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
