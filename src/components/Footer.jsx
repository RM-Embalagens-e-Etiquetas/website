import Link from 'next/link'
import { copy, copyright } from '@/lib/copy'

const Footer = ({ site, logoSrc, groups, whatsappUrl }) => {
  const year = new Date().getFullYear()
  const brand = copy(site, 'brandName')

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src={logoSrc} alt={brand} className="logo" />
          <p>{site?.footerBlurb}</p>
        </div>

        <div className="site-footer__column">
          <h3>{copy(site, 'footerProducts')}</h3>
          <ul>
            {(groups || []).map((group) => (
              <li key={group.slug}>
                <Link href={`/produtos#${group.slug}`}>{group.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>{copy(site, 'footerInstitutional')}</h3>
          <ul>
            <li>
              <Link href="/sobre">{copy(site, 'footerAbout')}</Link>
            </li>
            <li>
              <Link href="/contato">{copy(site, 'footerContactLink')}</Link>
            </li>
            {site?.instagramUrl && (
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                  {copy(site, 'footerInstagram')}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="site-footer__column">
          <h3>{copy(site, 'footerContact')}</h3>
          <ul>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {site?.phone}
              </a>
            </li>
            <li className="site-footer__address">{site?.address}</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>{copyright(site, year)}</span>
      </div>
    </footer>
  )
}

export default Footer
