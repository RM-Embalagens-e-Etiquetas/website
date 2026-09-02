import Link from 'next/link'
import { PRODUCT_GROUPS, getCategoriesByGroup } from '@/lib/productCategories'
import { getCategoryCover } from '@/lib/getProductImages'

const CatalogPreview = () => {
  return (
    <section className="catalog-preview">
      <div className="section-inner">
        <div className="section-heading">
          <span className="eyebrow">Catálogo</span>
          <h2>Uma linha completa de embalagens e etiquetas</h2>
          <p>
            Da sacola ao acabamento final, produzimos os itens que acompanham a experiência de
            compra da sua marca.
          </p>
        </div>

        <div className="catalog-preview__grid">
          {PRODUCT_GROUPS.map((group) => {
            const categories = getCategoriesByGroup(group.slug)
            const cover = getCategoryCover(categories[0]?.slug)

            return (
              <Link
                key={group.slug}
                href={`/produtos#${group.slug}`}
                className="catalog-group-card"
              >
                <div className="catalog-group-card__media">
                  {cover && <img src={cover} alt={group.title} loading="lazy" />}
                </div>
                <div className="catalog-group-card__body">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <span className="catalog-group-card__count">
                    {categories.length} categorias
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="catalog-preview__footer">
          <Link href="/produtos" className="button button--primary">
            Explorar catálogo completo
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CatalogPreview
