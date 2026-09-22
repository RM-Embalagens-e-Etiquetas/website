'use client'

import { usePathname } from 'next/navigation'

import { isAdminDocumentForm } from './form-routes'

export default function SaveReminder() {
  const pathname = usePathname() || ''
  if (!isAdminDocumentForm(pathname)) return null

  return (
    <div className="rm-save-reminder" role="status">
      <span>
        Para publicar no site, use o botão <strong>Salvar</strong> no canto superior direito (ou abaixo
        do formulário no celular).
      </span>
    </div>
  )
}
