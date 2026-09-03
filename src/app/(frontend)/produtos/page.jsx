import CategoryCard from '@/components/products/CategoryCard'
import { PAGES, SEO } from '@/lib/copy'
import { categoryCover, getProductCategories, getProductGroups } from '@/lib/cms'

export async function generateMetadata() {
  return {
    title: SEO.catalogTitle,
    description: SEO.catalogDescription,
  }
}

export default async function ProdutosPage() {
  const [groups, categories] = await Promise.all([getProductGroups(), getProductCategories()])

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          <span className="eyebrow">{PAGES.catalog.eyebrow}</span>
          <h1>{PAGES.catalog.title}</h1>
          <p>{PAGES.catalog.lead}</p>
        </div>
      </section>

      {groups.map((group) => {
        const groupCategories = categories
          .filter((category) => {
            const related = category.group
            const groupId = typeof related === 'object' ? related.id : related
            return groupId === group.id
          })
          .map((category) => ({
            ...category,
            cover: categoryCover(category),
            photoCount: category.gallery?.length || 0,
          }))

        return (
          <section key={group.slug} id={group.slug} className="product-group">
            <div className="section-inner">
              <div className="section-heading section-heading--left">
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>

              <div className="category-grid">
                {groupCategories.map((category) => (
                  <CategoryCard key={category.slug} category={category} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
