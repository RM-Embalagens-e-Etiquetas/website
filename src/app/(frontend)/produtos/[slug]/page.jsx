import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/products/ProductGallery'
import { copy } from '@/lib/copy'
import {
  categoryCover,
  galleryImages,
  getCategoriesByGroupId,
  getCategoryBySlug,
  getSite,
  whatsappUrl,
} from '@/lib/cms'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return {}

  return {
    title: `${category.title} | RM Embalagens`,
    description: category.description,
  }
}

export default async function ProductCategoryPage({ params }) {
  const { slug } = await params
  const [category, site] = await Promise.all([getCategoryBySlug(slug), getSite()])
  if (!category) notFound()

  const images = galleryImages(category)
  const group = typeof category.group === 'object' ? category.group : null
  const relatedDocs = group ? await getCategoriesByGroupId(group.id) : []
  const related = relatedDocs.filter((item) => item.slug !== category.slug)
  const waUrl = whatsappUrl(site.whatsapp)

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          <div className="breadcrumb">
            <Link href="/produtos">{copy(site, 'navProducts')}</Link>
            <span>/</span>
            <span>{group?.title}</span>
            <span>/</span>
            <span>{category.title}</span>
          </div>
          <span className="eyebrow">{group?.title}</span>
          <h1>{category.title}</h1>
          <p>{category.description}</p>

          <div className="page-header__actions">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="button button--primary">
              {copy(site, 'productOrder')}
            </a>
            <Link href="/produtos" className="button button--ghost">
              {copy(site, 'productBack')}
            </Link>
          </div>
        </div>
      </section>

      <section className="product-gallery-section">
        <div className="section-inner">
          {images.length > 0 ? (
            <ProductGallery images={images} />
          ) : (
            <p>{copy(site, 'galleryEmpty')}</p>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-categories">
          <div className="section-inner">
            <div className="section-heading section-heading--left">
              <h2>
                {copy(site, 'relatedPrefix')} {group?.title}
              </h2>
            </div>
            <div className="related-categories__grid">
              {related.map((item) => {
                const cover = categoryCover(item)
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
