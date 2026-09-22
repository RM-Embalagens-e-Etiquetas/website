'use client'

import { useField } from '@payloadcms/ui'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

/** Preenche a categoria quando o produto é criado de dentro de uma categoria existente. */
export default function PrefillGroup() {
  const params = useSearchParams()
  const preset = params.get('group')
  const { formInitializing, setValue, value } = useField<number | string | null>({ path: 'group' })
  const tries = useRef(0)

  useEffect(() => {
    if (formInitializing || !preset) return
    if (value !== undefined && value !== null && value !== '') return
    if (tries.current >= 5) return
    const numeric = Number(preset)
    if (!Number.isFinite(numeric)) return
    tries.current += 1
    setValue(numeric, true)
  }, [formInitializing, preset, setValue, value])

  return null
}
