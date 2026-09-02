import Link from 'next/link'
import { mediaUrl } from '@/lib/cms'

const AboutTeaser = ({ home }) => {
  const image = mediaUrl(home?.aboutImage)

  return (
    <section className="about-teaser">
      <div className="section-inner about-teaser__inner">
        <div className="about-teaser__media">
          {image && <img src={image} alt="Produção RM Embalagens" />}
        </div>

        <div className="about-teaser__content">
          {home?.aboutEyebrow && <span className="eyebrow">{home.aboutEyebrow}</span>}
          <h2>{home?.aboutTitle}</h2>
          <p>{home?.aboutText}</p>
          <Link href="/sobre" className="link-arrow">
            {home?.aboutLinkLabel || 'Conheça nossa história'}{' '}
            <i className="fal fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutTeaser
