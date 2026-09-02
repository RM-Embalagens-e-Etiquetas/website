'use client'

import { useRowLabel } from '@payloadcms/ui'

type Row = {
  title?: string
  value?: string
  label?: string
}

export default function RowLabel() {
  const { data, rowNumber } = useRowLabel<Row>()
  const text = data?.title || data?.value || data?.label
  return <span>{text || `Item ${rowNumber ?? ''}`}</span>
}
