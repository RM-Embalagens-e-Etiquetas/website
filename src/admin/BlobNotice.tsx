'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type Health = {
  production?: boolean
  blobConfigured?: boolean
  audit?: {
    brokenReferenced?: number
    blob: number
  } | null
}

export default function BlobNotice() {
  const pathname = usePathname() || ''
  const [health, setHealth] = useState<Health | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/media-health')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setHealth(data)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [pathname])

  if (!health?.production) return null

  const audit = health.audit
  const warnings: string[] = []

  if (!health.blobConfigured) {
    warnings.push('Armazenamento de fotos (Blob) não configurado neste deploy.')
  }

  const brokenInUse = audit?.brokenReferenced ?? 0
  if (brokenInUse > 0) {
    warnings.push(
      `${brokenInUse} foto(s) do catálogo não carregaram — remova na galeria e envie o arquivo de novo.`,
    )
  }

  if (warnings.length === 0) return null

  return (
    <div className="rm-blob-notice" role="status">
      <strong>Fotos e armazenamento</strong>
      <ul>
        {warnings.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </div>
  )
}
