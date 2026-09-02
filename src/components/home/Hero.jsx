import Link from 'next/link'
import { mediaUrl } from '@/lib/cms'

function TitleWithAccent({ title, accent }) {
  if (!title) return null
  if (!accent || !title.includes(accent)) return title

  const parts = title.split(accent)
  return (
    <>
      {parts[0]}
      <span className="accent">{accent}</span>
      {parts.slice(1).join(accent)}
    </>
  )
}

const Hero = ({ home, whatsappUrl }) => {
  const image = mediaUrl(home?.heroImage)

  return (
    <section className="hero">
      <div className="hero__media">
        {image && <img src={image} alt="" role="presentation" loading="eager" />}
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          {home?.heroEyebrow && (
            <span className="eyebrow eyebrow--on-dark">{home.heroEyebrow}</span>
          )}
          <h1>
            <TitleWithAccent title={home?.heroTitle} accent={home?.heroAccent} />
          </h1>
          {home?.heroLead && <p className="hero__lead">{home.heroLead}</p>}

          <div className="hero__actions">
            <Link href="/produtos" className="button button--invert">
              {home?.heroPrimaryLabel || 'Ver catálogo completo'}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline-light"
            >
              {home?.heroSecondaryLabel || 'Solicitar orçamento'}
            </a>
          </div>
        </div>

        <dl className="hero__stats">
          {(home?.stats || []).map((stat) => (
            <div key={stat.label} className="hero__stat">
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Hero
