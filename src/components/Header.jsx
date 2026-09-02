'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { copy } from '@/lib/copy'

const Header = ({ site, logoSrc, whatsappUrl }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const brand = copy(site, 'brandName')

  const nav = [
    { href: '/', label: copy(site, 'navHome') },
    { href: '/produtos', label: copy(site, 'navProducts') },
    { href: '/sobre', label: copy(site, 'navAbout') },
    { href: '/contato', label: copy(site, 'navContact') },
  ]

  const closeMenu = () => setMenuOpen(false)
  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand" onClick={closeMenu}>
          <img src={logoSrc} alt={brand} className="logo" />
          <span>{brand}</span>
        </Link>

        <div className={`nav-bar ${menuOpen ? 'open' : ''}`} id="menu">
          <button
            type="button"
            className="nav-bar__close mobile"
            onClick={closeMenu}
            aria-label="Fechar menu"
          >
            <i className="fas fa-times"></i>
          </button>
          <nav>
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item ${isActive(link.href) ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
              onClick={closeMenu}
            >
              {copy(site, 'headerCta')}
            </a>
          </nav>
        </div>

        <button
          type="button"
          className="menu mobile"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  )
}

export default Header
