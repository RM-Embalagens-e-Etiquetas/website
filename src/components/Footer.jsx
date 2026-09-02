import Link from 'next/link'
import logo from '@/assets/img/logo.png'
import { PRODUCT_GROUPS } from '@/lib/productCategories'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src={logo.src} alt="RM Embalagens" className="logo" />
          <p>
            Fabricante e distribuidora de embalagens, etiquetas e acessórios
            personalizados para marcas em todo o Brasil.
          </p>
        </div>

        <div className="site-footer__column">
          <h3>Produtos</h3>
          <ul>
            {PRODUCT_GROUPS.map((group) => (
              <li key={group.slug}>
                <Link href={`/produtos#${group.slug}`}>{group.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>Institucional</h3>
          <ul>
            <li>
              <Link href="/sobre">Sobre a empresa</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/rmembalagens/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>Atendimento</h3>
          <ul>
            <li>
              <a href="https://wa.me/5521964282763" target="_blank" rel="noopener noreferrer">
                (21) 96428-2763
              </a>
            </li>
            <li className="site-footer__address">Campo Grande — Rio de Janeiro, RJ</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {year} RM Embalagens — Fabricante e distribuidora nacional</span>
      </div>
    </footer>
  )
}

export default Footer
