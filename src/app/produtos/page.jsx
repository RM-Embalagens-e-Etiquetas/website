import { PRODUCT_GROUPS, getCategoriesByGroup } from '@/lib/productCategories'
import CategoryCard from '@/components/products/CategoryCard'

export const metadata = {
  title: 'Produtos | RM Embalagens',
  description:
    'Catálogo completo de sacolas, etiquetas, tags e acabamentos personalizados da RM Embalagens.',
}

export default function ProdutosPage() {
  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          <span className="eyebrow">Catálogo</span>
          <h1>Nossos produtos</h1>
          <p>
            Explore nossas linhas de produção por categoria. Cada item pode ser personalizado com
            as cores, materiais e a arte da sua marca.
          </p>
        </div>
      </section>

      {PRODUCT_GROUPS.map((group) => {
        const categories = getCategoriesByGroup(group.slug)

        return (
          <section key={group.slug} id={group.slug} className="product-group">
            <div className="section-inner">
              <div className="section-heading section-heading--left">
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>

              <div className="category-grid">
                {categories.map((category) => (
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
