import Link from 'next/link'

const HERO_STATS = [
  { value: '16', label: 'linhas de produto' },
  { value: '100%', label: 'personalização de arte' },
  { value: 'BR', label: 'envio para todo o país' },
]

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__media">
        <img src="/hero.jpg" alt="" role="presentation" loading="eager" />
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <span className="eyebrow eyebrow--on-dark">Fabricante e distribuidora de embalagens</span>
          <h1>
            Embalagens e etiquetas que constroem a <span className="accent">identidade</span> da
            sua marca
          </h1>
          <p className="hero__lead">
            Produzimos sacolas, etiquetas, tags e acabamentos personalizados para marcas que
            valorizam apresentação, consistência e qualidade em cada detalhe.
          </p>

          <div className="hero__actions">
            <Link href="/produtos" className="button button--invert">
              Ver catálogo completo
            </Link>
            <a
              href="https://wa.me/5521964282763"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--outline-light"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>

        <dl className="hero__stats">
          {HERO_STATS.map((stat) => (
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
