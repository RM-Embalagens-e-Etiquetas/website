import CategoryCard from '@/components/products/CategoryCard'
import { categoryCover, getProductCategories, getProductGroups, getSite } from '@/lib/cms'

export async function generateMetadata() {
  const site = await getSite()
  return {
    title: site.catalogSeoTitle || 'Produtos | RM Embalagens',
    description:
      site.catalogSeoDescription ||
      'Catálogo completo de sacolas, etiquetas, tags e acabamentos personalizados da RM Embalagens.',
  }
}

export default async function ProdutosPage() {
  const [site, groups, categories] = await Promise.all([
    getSite(),
    getProductGroups(),
    getProductCategories(),
  ])

  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          <span className="eyebrow">{site.catalogPageEyebrow || 'Catálogo'}</span>
          <h1>{site.catalogPageTitle || 'Nossos produtos'}</h1>
          <p>
            {site.catalogPageLead ||
              'Explore nossas linhas de produção por categoria. Cada item pode ser personalizado com as cores, materiais e a arte da sua marca.'}
          </p>
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
