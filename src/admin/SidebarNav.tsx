'use client'

import type { MouseEvent, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useNav } from '@payloadcms/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from './Icon'

type Product = {
  id: number | string
  title: string
}

type Group = {
  id: number | string
  title: string
  slug: string
  products: Product[]
}

const LINE_ICON = {
  sacolas: 'bag',
  etiquetas: 'tag',
  'tags-e-acessorios': 'spark',
  embalagens: 'box',
}

function useHash() {
  const [hash, setHash] = useState('')

  useEffect(() => {
    const sync = () => setHash(window.location.hash.replace('#', ''))
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return hash
}

function isActive(pathname: string, href: string, match: 'prefix' | 'exact') {
  if (match === 'exact') return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavLink({
  href,
  icon,
  children,
  match = 'prefix',
  nested = false,
}: {
  href: string
  icon?: string
  children: ReactNode
  match?: 'prefix' | 'exact'
  nested?: boolean
}) {
  const pathname = usePathname() || ''
  const active = isActive(pathname, href, match)

  return (
    <Link
      href={href}
      className={`rm-nav__link ${nested ? 'rm-nav__link--nested' : ''} ${active ? 'rm-nav__link--active' : ''}`}
    >
      {active ? <span className="rm-nav__dot" /> : null}
      {icon ? <Icon name={icon} /> : null}
      <span>{children}</span>
    </Link>
  )
}

function LineNav({ group }: { group: Group }) {
  const pathname = usePathname() || ''
  const hash = useHash()
  const catalogHref = `/admin/collections/product-categories#${group.slug}`
  const lineHref = `/admin/collections/product-groups/${group.id}`
  const productHref = (id: number | string) => `/admin/collections/product-categories/${id}`
  const onCatalog = pathname === '/admin/collections/product-categories'
  const editingLine = pathname === lineHref || pathname.startsWith(`${lineHref}/`)
  const activeProduct = group.products.find((product) => pathname === productHref(product.id))
  const lineActive = editingLine || Boolean(activeProduct) || (onCatalog && hash === group.slug)
  const [open, setOpen] = useState(lineActive)

  useEffect(() => {
    if (lineActive) setOpen(true)
  }, [lineActive])

  const openCatalog = (event: MouseEvent<HTMLAnchorElement>) => {
    window.sessionStorage.setItem('rm-line', group.slug)
    if (onCatalog) {
      event.preventDefault()
      document.getElementById(group.slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    }
    setOpen(true)
  }

  return (
    <div className={`rm-nav__line ${lineActive ? 'rm-nav__line--active' : ''}`}>
      <div className="rm-nav__line-row">
        <Link
          href={catalogHref}
          className={`rm-nav__link ${lineActive ? 'rm-nav__link--active' : ''}`}
          onClick={openCatalog}
        >
          {lineActive ? <span className="rm-nav__dot" /> : null}
          <Icon name={LINE_ICON[group.slug as keyof typeof LINE_ICON] || 'bag'} />
          <span>{group.title}</span>
          <span className="rm-nav__count">{group.products.length}</span>
        </Link>
        <button
          type="button"
          className={`rm-nav__toggle ${open ? 'rm-nav__toggle--open' : ''}`}
          aria-expanded={open}
          aria-label={open ? `Recolher ${group.title}` : `Mostrar produtos de ${group.title}`}
          onClick={() => setOpen((current) => !current)}
        >
          <Icon name="chevron" />
        </button>
      </div>

      {open ? (
        <div className="rm-nav__children">
          {group.products.map((product) => (
            <NavLink key={product.id} href={productHref(product.id)} match="exact" nested>
              {product.title}
            </NavLink>
          ))}
          <NavLink href={lineHref} match="exact" nested>
            Nome e texto da linha
          </NavLink>
        </div>
      ) : null}
    </div>
  )
}

function CloseNavOnRoute() {
  const pathname = usePathname()
  const { setNavOpen } = useNav()

  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  return null
}

export default function SidebarNav({ groups }: { groups: Group[] }) {
  return (
    <nav className="rm-nav" aria-label="Conteúdo do site">
      <CloseNavOnRoute />
      <NavLink href="/admin" icon="home" match="exact">
        Painel
      </NavLink>

      <p className="rm-nav__label">Empresa</p>
      <NavLink href="/admin/globals/site" icon="brand">
        Logo, menu e WhatsApp
      </NavLink>

      <p className="rm-nav__label">Páginas do site</p>
      <NavLink href="/admin/globals/home" icon="home">
        Início
      </NavLink>
      <NavLink href="/admin/globals/about" icon="about">
        Sobre
      </NavLink>
      <NavLink href="/admin/globals/contact" icon="contact">
        Contato
      </NavLink>

      <p className="rm-nav__label">Catálogo</p>
      {groups.map((group) => (
        <LineNav key={group.id} group={group} />
      ))}
      <NavLink href="/admin/collections/product-categories/create" icon="plus" match="exact">
        Novo produto
      </NavLink>
    </nav>
  )
}
