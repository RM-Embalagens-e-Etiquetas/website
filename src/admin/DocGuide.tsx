'use client'

import { usePathname } from 'next/navigation'

const GUIDES = [
  {
    test: (pathname: string) => pathname.startsWith('/admin/globals/company'),
    title: 'Dados da empresa',
    text: 'Logo, telefone, WhatsApp, Instagram, endereço e texto do rodapé.',
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/globals/home-config'),
    title: 'Configuração da home',
    text: 'Quais seções aparecem, fotos, destaques, diferenciais e mensagem de contato.',
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/collections/product-groups'),
    title: 'Linha do catálogo',
    text: 'Nome e descrição desta linha de produtos. As fotos ficam em cada produto.',
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/collections/product-categories/create'),
    title: 'Novo produto',
    text: 'Fotos, nome, descrição e linha (Sacolas, Etiquetas, Tags ou Embalagens). A primeira foto vira a capa.',
  },
  {
    test: (pathname: string) => pathname === '/admin/collections/product-categories',
    title: 'Catálogo',
    text: 'Produtos organizados por linha. Clique para editar fotos, nome e descrição.',
    save: false,
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/collections/product-categories/'),
    title: 'Produto',
    text: 'Fotos, nome e descrição deste produto. A primeira foto é a capa no site.',
  },
]

export default function DocGuide() {
  const pathname = usePathname() || ''
  const guide = GUIDES.find((item) => item.test(pathname))
  if (!guide || pathname === '/admin') return null

  return (
    <div className="rm-docguide">
      <strong>{guide.title}</strong>
      <p>{guide.text}</p>
      {guide.save === false ? null : (
        <p className="rm-docguide__save">
          Quando terminar, clique em <b>Salvar</b> no canto direito.
        </p>
      )}
    </div>
  )
}
