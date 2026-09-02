'use client'

import { usePathname } from 'next/navigation'

const GUIDES = [
  {
    test: (pathname: string) => pathname.startsWith('/admin/globals/home'),
    title: 'Página inicial',
    text: 'Aqui você muda o banner, as fotos, os textos e os botões da primeira página do site.',
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/globals/about'),
    title: 'Sobre a empresa',
    text: 'História, foto e valores da página Sobre.',
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/globals/contact'),
    title: 'Contato',
    text: 'Textos da página Contato. Telefone e Instagram ficam em Logo, menu e WhatsApp.',
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/globals/site'),
    title: 'Logo, menu e WhatsApp',
    text: 'Logo, nome, menu, WhatsApp, Instagram, endereço, rodapé e botões que aparecem no site inteiro.',
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/collections/product-groups'),
    title: 'Linha do catálogo',
    text: 'Aqui você muda o nome e o texto desta linha na página Produtos. As fotos ficam em cada produto, no menu Catálogo.',
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/collections/product-categories/create'),
    title: 'Novo produto',
    text: 'Coloque as fotos, o nome, o texto e escolha a linha (Sacolas, Etiquetas, Tags ou Embalagens). A primeira foto vira a capa.',
  },
  {
    test: (pathname: string) => pathname === '/admin/collections/product-categories',
    title: 'Catálogo',
    text: 'Os produtos ficam dentro das linhas, como no site. Clique na foto para editar. O título da seção muda em “Nome e texto da linha”.',
    save: false,
  },
  {
    test: (pathname: string) => pathname.startsWith('/admin/collections/product-categories/'),
    title: 'Produto',
    text: 'Troque as fotos, o nome e o texto deste produto. A primeira foto é a capa no site.',
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
