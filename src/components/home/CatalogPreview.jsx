import Link from 'next/link'

const CatalogPreview = ({ home, groups }) => {
  return (
    <section className="catalog-preview">
      <div className="section-inner">
        <div className="section-heading">
          {home?.catalogEyebrow && <span className="eyebrow">{home.catalogEyebrow}</span>}
          <h2>{home?.catalogTitle}</h2>
          {home?.catalogLead && <p>{home.catalogLead}</p>}
        </div>

        <div className="catalog-preview__grid">
          {(groups || []).map((group) => (
            <Link
              key={group.slug}
              href={`/produtos#${group.slug}`}
              className="catalog-group-card"
            >
              <div className="catalog-group-card__media">
                {group.cover && <img src={group.cover} alt={group.title} loading="lazy" />}
              </div>
              <div className="catalog-group-card__body">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <span className="catalog-group-card__count">
                  {group.count} {group.count === 1 ? 'categoria' : 'categorias'}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="catalog-preview__footer">
          <Link href="/produtos" className="button button--primary">
            {home?.catalogButtonLabel || 'Explorar catálogo completo'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CatalogPreview
