import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  PRODUCT_CATEGORIES,
  PRODUCT_GROUPS,
  getCategoriesByGroup,
  getCategoryBySlug,
} from '@/lib/productCategories'
import { getProductImages, getCategoryCover } from '@/lib/getProductImages'
import ProductGallery from '@/components/products/ProductGallery'

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}

  return {
    title: `${category.title} | RM Embalagens`,
    description: category.description,
  }
}

export default async function ProductCategoryPage({ params }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const images = getProductImages(category.slug)
  const group = PRODUCT_GROUPS.find((item) => item.slug === category.group)
  const related = getCategoriesByGroup(category.group).filter(
    (item) => item.slug !== category.slug
  )

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          <div className="breadcrumb">
            <Link href="/produtos">Produtos</Link>
            <span>/</span>
            <span>{group?.title}</span>
            <span>/</span>
            <span>{category.title}</span>
          </div>
          <span className="eyebrow">{group?.title}</span>
          <h1>{category.title}</h1>
          <p>{category.description}</p>

          <div className="page-header__actions">
            <a
              href="https://wa.me/5521964282763"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              Encomendar este produto
            </a>
            <Link href="/produtos" className="button button--ghost">
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="product-gallery-section">
        <div className="section-inner">
          {images.length > 0 ? (
            <ProductGallery images={images} />
          ) : (
            <p>Novas fotos desta categoria em breve.</p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-categories">
          <div className="section-inner">
            <div className="section-heading section-heading--left">
              <h2>Outras categorias em {group?.title}</h2>
            </div>
            <div className="related-categories__grid">
              {related.map((item) => {
                const cover = getCategoryCover(item.slug)
                return (
                  <Link key={item.slug} href={`/produtos/${item.slug}`} className="mini-card">
                    <div className="mini-card__media">
                      {cover && <img src={cover} alt={item.title} loading="lazy" />}
                    </div>
                    <span>{item.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
