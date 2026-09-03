import Link from 'next/link'
import { mediaUrl } from '@/lib/cms'
import { DEFAULT_HOME_STATS, HOME } from '@/lib/copy'

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

const Hero = ({ config, whatsappUrl }) => {
  const image = mediaUrl(config?.heroImage)
  const stats = config?.stats?.length ? config.stats : DEFAULT_HOME_STATS

  return (
    <section className="hero">
      <div className="hero__media">
        {image && <img src={image} alt="" role="presentation" loading="eager" />}
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          {HOME.heroEyebrow && <span className="eyebrow eyebrow--on-dark">{HOME.heroEyebrow}</span>}
          <h1>
            <TitleWithAccent title={HOME.heroTitle} accent={HOME.heroAccent} />
          </h1>
          {HOME.heroLead && <p className="hero__lead">{HOME.heroLead}</p>}

          <div className="hero__actions">
            <Link href="/produtos" className="button button--invert">
              {HOME.heroPrimaryLabel}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline-light"
            >
              {HOME.heroSecondaryLabel}
            </a>
          </div>
        </div>

        <dl className="hero__stats">
          {stats.map((stat) => (
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
