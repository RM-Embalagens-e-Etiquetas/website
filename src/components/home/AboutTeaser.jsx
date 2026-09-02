import Link from 'next/link'
import aboutImage from '@/assets/img/inicial/sacolas/IMG-20220726-WA0040.jpg'

const AboutTeaser = () => {
  return (
    <section className="about-teaser">
      <div className="section-inner about-teaser__inner">
        <div className="about-teaser__media">
          <img src={aboutImage.src} alt="Produção RM Embalagens" />
        </div>

        <div className="about-teaser__content">
          <span className="eyebrow">Quem somos</span>
          <h2>Uma fabricante próxima de cada cliente</h2>
          <p>
            A RM Embalagens fabrica, vende e distribui embalagens, etiquetas, envelopes, lacres e
            demais itens de identidade visual. Trabalhamos com confecções, e-commerces e negócios
            de todos os portes, unindo produção própria a um acompanhamento próximo em cada
            pedido.
          </p>
          <Link href="/sobre" className="link-arrow">
            Conheça nossa história <i className="fal fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutTeaser
