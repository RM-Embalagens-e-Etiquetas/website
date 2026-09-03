import { COPY, DEFAULT_CTA_TEXT, HOME } from '@/lib/copy'

const ContactCta = ({ config, company, whatsappUrl }) => {
  const instagramUrl = company?.instagramUrl
  const text = config?.ctaText || DEFAULT_CTA_TEXT

  return (
    <section className="contact-cta">
      <div className="section-inner contact-cta__inner">
        <div>
          {HOME.ctaEyebrow && <span className="eyebrow eyebrow--on-dark">{HOME.ctaEyebrow}</span>}
          <h2>{HOME.ctaTitle}</h2>
          {text && <p>{text}</p>}
        </div>

        <div className="contact-cta__actions">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="button button--primary">
            <i className="fab fa-whatsapp" aria-hidden="true"></i> {COPY.ctaWhatsapp}
          </a>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline-light"
            >
              <i className="fab fa-instagram" aria-hidden="true"></i> {COPY.ctaInstagram}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactCta
