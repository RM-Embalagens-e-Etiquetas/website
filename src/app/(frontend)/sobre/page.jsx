import ContactCta from '@/components/ContactCta'
import { ABOUT, COPY, SEO } from '@/lib/copy'
import { getCompany, getHomeConfig, whatsappUrl } from '@/lib/cms'

export async function generateMetadata() {
  return {
    title: SEO.aboutTitle,
    description: SEO.aboutDescription,
  }
}

export default async function SobrePage() {
  const [company, homeConfig] = await Promise.all([getCompany(), getHomeConfig()])
  const waUrl = whatsappUrl(company.whatsapp)

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          {ABOUT.eyebrow && <span className="eyebrow">{ABOUT.eyebrow}</span>}
          <h1>{ABOUT.title}</h1>
          <p>{ABOUT.lead}</p>
        </div>
      </section>

      <section className="about-section">
        <div className="section-inner about-section__inner">
          <div className="about-section__content">
            {ABOUT.whoTitle && <h2>{ABOUT.whoTitle}</h2>}
            {ABOUT.whoText && <p>{ABOUT.whoText}</p>}
            {ABOUT.businessTitle && <h2>{ABOUT.businessTitle}</h2>}
            {ABOUT.businessText && <p>{ABOUT.businessText}</p>}
            {ABOUT.clientsTitle && <h2>{ABOUT.clientsTitle}</h2>}
            {ABOUT.clientsText && (
              <p>
                {ABOUT.clientsText}{' '}
                {company.instagramUrl && (
                  <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {COPY.instagramCta}
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
            {ABOUT.valuesEyebrow && <span className="eyebrow">{ABOUT.valuesEyebrow}</span>}
            <h2>{ABOUT.valuesTitle}</h2>
          </div>
          <div className="values-grid">
            {ABOUT.values.map((value) => (
              <div key={value.title} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta config={homeConfig} company={company} whatsappUrl={waUrl} />
    </>
  )
}
