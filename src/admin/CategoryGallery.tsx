import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { mediaUrl } from '@/lib/media-url'
import ScrollToLine from './ScrollToLine'

export default async function CategoryGallery() {
  const payload = await getPayload({ config: configPromise })
  const [categories, groups] = await Promise.all([
    payload.find({
      collection: 'product-categories',
      depth: 1,
      limit: 50,
      sort: 'order',
    }),
    payload.find({
      collection: 'product-groups',
      depth: 0,
      limit: 20,
      sort: 'order',
    }),
  ])

  return (
    <div className="rm-catalog">
      <ScrollToLine />
      <p className="rm-board__hint">
        Cada categoria (Sacolas, Etiquetas, Tags e Embalagens) agrupa os produtos. O produto novo entra
        aqui, dentro da categoria. Clique na foto para editar.
      </p>
      {groups.docs.map((group) => {
        const items = categories.docs.filter((category) => {
          const related = category.group
          const groupId = typeof related === 'object' ? related?.id : related
          return String(groupId) === String(group.id)
        })

        return (
          <section key={group.id} id={group.slug} className="rm-catalog__line">
            <div className="rm-catalog__line-head">
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className="rm-board__actions">
                <a href={`/admin/collections/product-groups/${group.id}`}>Nome e texto da categoria</a>
                <a href={`/admin/collections/product-categories/create?group=${group.id}`}>Novo produto</a>
              </div>
            </div>
            <div className="rm-gallery">
              {items.map((category) => {
                const cover = mediaUrl(category.gallery?.[0])
                return (
                  <a
                    key={category.id}
                    className="rm-card"
                    href={`/admin/collections/product-categories/${category.id}`}
                  >
                    <div className={`rm-card__media ${cover ? '' : 'rm-card__media--plain'}`}>
                      {cover ? <img src={cover} alt="" /> : <span>{category.title.slice(0, 1)}</span>}
                    </div>
                    <div className="rm-card__body">
                      <strong>{category.title}</strong>
                      <span>
                        {category.gallery?.length
                          ? `${category.gallery.length} foto${category.gallery.length === 1 ? '' : 's'}`
                          : 'Sem foto'}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
