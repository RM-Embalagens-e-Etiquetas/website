import Link from 'next/link'
import { mediaUrl } from '@/lib/cms'
import { DEFAULT_HOME_ABOUT_TEXT, HOME } from '@/lib/copy'

const AboutTeaser = ({ config }) => {
  const image = mediaUrl(config?.aboutImage)
  const text = config?.aboutText || DEFAULT_HOME_ABOUT_TEXT

  return (
    <section className="about-teaser">
      <div className="section-inner about-teaser__inner">
        <div className="about-teaser__media">
          {image && <img src={image} alt="Produção RM Embalagens" />}
        </div>

        <div className="about-teaser__content">
          {HOME.aboutEyebrow && <span className="eyebrow">{HOME.aboutEyebrow}</span>}
          <h2>{HOME.aboutTitle}</h2>
          <p>{text}</p>
          <Link href="/sobre" className="link-arrow">
            {HOME.aboutLinkLabel}{' '}
            <i className="fal fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutTeaser
