'use client'

import { usePathname } from 'next/navigation'

export default function HowToBar() {
  const pathname = usePathname() || ''
  if (pathname === '/admin' || pathname === '/admin/') return null

  return (
    <div className="rm-howto">
      <p className="rm-howto__title">Como alterar o site</p>
      <ol>
        <li>
          <span>1</span> Clique no que quer mudar
        </li>
        <li>
          <span>2</span> Troque o texto ou a foto
        </li>
        <li>
          <span>3</span> Clique em <strong>Salvar</strong>
        </li>
      </ol>
    </div>
  )
}
