import { copy } from '@/lib/copy'

const ContactCta = ({ home, site, whatsappUrl }) => {
  const instagramUrl = site?.instagramUrl
  const whatsappLabel = home?.ctaWhatsapp || copy(site, 'ctaWhatsapp')
  const instagramLabel = home?.ctaInstagram || copy(site, 'ctaInstagram')

  return (
    <section className="contact-cta">
      <div className="section-inner contact-cta__inner">
        <div>
          {home?.ctaEyebrow && <span className="eyebrow eyebrow--on-dark">{home.ctaEyebrow}</span>}
          <h2>{home?.ctaTitle}</h2>
          {home?.ctaText && <p>{home.ctaText}</p>}
        </div>

        <div className="contact-cta__actions">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button--primary">
            <i className="fab fa-whatsapp" aria-hidden="true"></i> {whatsappLabel}
          </a>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline-light"
            >
              <i className="fab fa-instagram" aria-hidden="true"></i> {instagramLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactCta
