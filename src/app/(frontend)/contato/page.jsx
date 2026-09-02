import { copy } from '@/lib/copy'
import { getContact, getSite, whatsappUrl } from '@/lib/cms'

export async function generateMetadata() {
  const contact = await getContact()
  return {
    title: contact.seoTitle || 'Contato | RM Embalagens',
    description:
      contact.seoDescription ||
      'Fale com a RM Embalagens pelo WhatsApp ou Instagram e solicite um orçamento personalizado.',
  }
}

export default async function ContatoPage() {
  const [contact, site] = await Promise.all([getContact(), getSite()])
  const waUrl = whatsappUrl(site.whatsapp)

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          {contact.eyebrow && <span className="eyebrow">{contact.eyebrow}</span>}
          <h1>{contact.title}</h1>
          <p>{contact.lead}</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-inner contact-section__inner">
          <div className="contact-section__info">
            <div className="contact-method">
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              <div>
                <h3>{copy(contact, 'whatsappTitle')}</h3>
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  {site.phone}
                </a>
              </div>
            </div>

            {site.instagramUrl && (
              <div className="contact-method">
                <i className="fab fa-instagram" aria-hidden="true"></i>
                <div>
                  <h3>{copy(contact, 'instagramTitle')}</h3>
                  <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {site.instagramHandle || '@rmembalagens'}
                  </a>
                </div>
              </div>
            )}

            {site.address && (
              <div className="contact-method">
                <i className="fal fa-map-marker-alt" aria-hidden="true"></i>
                <div>
                  <h3>{copy(contact, 'addressTitle')}</h3>
                  <span>{site.address}</span>
                </div>
              </div>
            )}
          </div>

          {site.mapEmbedUrl && (
            <iframe
              src={site.mapEmbedUrl}
              width="560"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={site.address || 'Mapa'}
            ></iframe>
          )}
        </div>
      </section>

      <section className="how-to-order">
        <div className="section-inner">
          <div className="section-heading">
            {contact.stepsEyebrow && <span className="eyebrow">{contact.stepsEyebrow}</span>}
            <h2>{contact.stepsTitle}</h2>
          </div>

          <ol className="steps-grid">
            {(contact.steps || []).map((step, index) => (
              <li key={step.title} className="step-card">
                <span className="step-card__number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="how-to-order__cta">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="button button--primary">
              {contact.ctaLabel || 'Iniciar conversa no WhatsApp'}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
