'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type Health = {
  production?: boolean
  blobConfigured?: boolean
  audit?: {
    total: number
    orphans: number
    broken: number
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

  if (audit && audit.broken > 0) {
    warnings.push(
      `${audit.broken} foto(s) quebrada(s) no banco — remova e envie de novo (não ficam pretas no site).`,
    )
  }

  if (audit && audit.orphans > 50) {
    warnings.push(`${audit.orphans} arquivos órfãos no banco (lixo técnico — peça limpeza ao suporte).`)
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
