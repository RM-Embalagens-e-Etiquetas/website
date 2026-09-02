'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import logo from '@/assets/img/logo.png'

const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setMenuOpen(false)

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand" onClick={closeMenu}>
          <img src={logo.src} alt="RM Embalagens" className="logo" />
          <span>RM Embalagens</span>
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
            {NAV_LINKS.map((link) => (
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
              href="https://wa.me/5521964282763"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
              onClick={closeMenu}
            >
              Solicitar orçamento
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
