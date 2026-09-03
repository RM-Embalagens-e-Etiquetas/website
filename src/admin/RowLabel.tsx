'use client'

import { useRowLabel } from '@payloadcms/ui'

const SECTION_LABELS: Record<string, string> = {
  marquee: 'Faixa de produtos',
  proof: 'Faixa de fotos',
  differentiators: 'Diferenciais',
  catalog: 'Prévia do catálogo',
  'about-teaser': 'Resumo sobre a empresa',
  'contact-cta': 'Chamada WhatsApp',
}

type Row = {
  title?: string
  value?: string
  label?: string
  section?: string
}

export default function RowLabel() {
  const { data, rowNumber } = useRowLabel<Row>()
  const text = data?.title || data?.value || data?.label || SECTION_LABELS[data?.section || '']
  return <span>{text || `Item ${rowNumber ?? ''}`}</span>
}
