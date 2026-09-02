import ContactCta from '@/components/ContactCta'
import { copy } from '@/lib/copy'
import { getAbout, getHome, getSite, mediaUrl, whatsappUrl } from '@/lib/cms'

export async function generateMetadata() {
  const about = await getAbout()
  return {
    title: about.seoTitle || 'Sobre | RM Embalagens',
    description:
      about.seoDescription ||
      'Conheça a RM Embalagens: fabricante e distribuidora de embalagens, etiquetas e acessórios personalizados.',
  }
}

export default async function SobrePage() {
  const [about, home, site] = await Promise.all([getAbout(), getHome(), getSite()])
  const image = mediaUrl(about.image)
  const waUrl = whatsappUrl(site.whatsapp)

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          {about.eyebrow && <span className="eyebrow">{about.eyebrow}</span>}
          <h1>{about.title}</h1>
          <p>{about.lead}</p>
        </div>
      </section>

      <section className="about-section">
        <div className="section-inner about-section__inner">
          {image && <img src={image} alt={copy(site, 'brandName')} className="about-section__img" />}

          <div className="about-section__content">
            {about.whoTitle && <h2>{about.whoTitle}</h2>}
            {about.whoText && <p>{about.whoText}</p>}
            {about.businessTitle && <h2>{about.businessTitle}</h2>}
            {about.businessText && <p>{about.businessText}</p>}
            {about.clientsTitle && <h2>{about.clientsTitle}</h2>}
            {about.clientsText && (
              <p>
                {about.clientsText}{' '}
                {site.instagramUrl && (
                  <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {copy(about, 'instagramCta')}
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="section-inner">
          <div className="section-heading">
            {about.valuesEyebrow && <span className="eyebrow">{about.valuesEyebrow}</span>}
            <h2>{about.valuesTitle}</h2>
          </div>
          <div className="values-grid">
            {(about.values || []).map((value) => (
              <div key={value.title} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta home={home} site={site} whatsappUrl={waUrl} />
    </>
  )
}
