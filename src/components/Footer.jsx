import Link from 'next/link'
import { brandName, copyright, COPY } from '@/lib/copy'

const Footer = ({ company, logoSrc, groups, whatsappUrl }) => {
  const year = new Date().getFullYear()
  const brand = brandName(company)

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src={logoSrc} alt={brand} className="logo" />
          <p>{company?.footerBlurb}</p>
        </div>

        <div className="site-footer__column">
          <h3>{COPY.footerProducts}</h3>
          <ul>
            {(groups || []).map((group) => (
              <li key={group.slug}>
                <Link href={`/produtos#${group.slug}`}>{group.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>{COPY.footerInstitutional}</h3>
          <ul>
            <li>
              <Link href="/sobre">{COPY.footerAbout}</Link>
            </li>
            <li>
              <Link href="/contato">{COPY.footerContactLink}</Link>
            </li>
            {company?.instagramUrl && (
              <li>
                <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer">
                  {COPY.footerInstagram}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>{COPY.footerContact}</h3>
          <ul>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {company?.phone}
              </a>
            </li>
            <li className="site-footer__address">{company?.address}</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>{copyright(year)}</span>
      </div>
    </footer>
  )
}

export default Footer
