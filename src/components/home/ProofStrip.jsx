import { getCategoryCover } from '@/lib/getProductImages'

const FEATURED_SLUGS = ['sacolas-algodao', 'etiquetas-bordadas', 'chaveiros', 'lacres-seguranca']

const ProofStrip = () => {
  const items = FEATURED_SLUGS.map((slug) => ({ slug, src: getCategoryCover(slug) })).filter(
    (item) => item.src
  )

  return (
    <section className="proof-strip">
      <div className="section-inner">
        <div className="proof-strip__frame">
          <span className="proof-strip__label">Prova fotográfica — 01</span>
          <div className="proof-strip__grid">
            {items.map((item) => (
              <div className="proof-strip__cell" key={item.slug}>
                <img src={item.src} alt="Produto RM Embalagens" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProofStrip
