import { CONTACT, COPY, SEO } from '@/lib/copy'
import { getCompany, whatsappUrl } from '@/lib/cms'

export async function generateMetadata() {
  return {
    title: SEO.contactTitle,
    description: SEO.contactDescription,
  }
}

export default async function ContatoPage() {
  const company = await getCompany()
  const waUrl = whatsappUrl(company.whatsapp)

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          {CONTACT.eyebrow && <span className="eyebrow">{CONTACT.eyebrow}</span>}
          <h1>{CONTACT.title}</h1>
          <p>{CONTACT.lead}</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-inner contact-section__inner">
          <div className="contact-section__info">
            <div className="contact-method">
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              <div>
                <h3>{COPY.contactWhatsapp}</h3>
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  {company.phone}
                </a>
              </div>
            </div>

            {company.instagramUrl && (
              <div className="contact-method">
                <i className="fab fa-instagram" aria-hidden="true"></i>
                <div>
                  <h3>{COPY.contactInstagram}</h3>
                  <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {company.instagramHandle || '@rmembalagens'}
                  </a>
                </div>
              </div>
            )}

            {company.address && (
              <div className="contact-method">
                <i className="fal fa-map-marker-alt" aria-hidden="true"></i>
                <div>
                  <h3>{COPY.contactAddress}</h3>
                  <span>{company.address}</span>
                </div>
              </div>
            )}
          </div>

          {company.mapEmbedUrl && (
            <iframe
              src={company.mapEmbedUrl}
              width="560"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={company.address || 'Mapa'}
            ></iframe>
          )}
        </div>
      </section>

      <section className="how-to-order">
        <div className="section-inner">
          <div className="section-heading">
            {CONTACT.stepsEyebrow && <span className="eyebrow">{CONTACT.stepsEyebrow}</span>}
            <h2>{CONTACT.stepsTitle}</h2>
          </div>

          <ol className="steps-grid">
            {CONTACT.steps.map((step, index) => (
              <li key={step.title} className="step-card">
                <span className="step-card__number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="how-to-order__cta">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="button button--primary">
              {CONTACT.ctaLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
