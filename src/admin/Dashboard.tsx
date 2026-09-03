import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { mediaUrl } from '@/lib/media-url'
import { Icon } from './Icon'

const LINE_ICON = {
  sacolas: 'bag',
  etiquetas: 'tag',
  'tags-e-acessorios': 'spark',
  embalagens: 'box',
}

export default async function Dashboard() {
  const payload = await getPayload({ config: configPromise })
  const [homeConfig, categories, groups] = await Promise.all([
    payload.findGlobal({ slug: 'home-config', depth: 1 }),
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

  const heroImage = mediaUrl(homeConfig.heroImage)

  return (
    <div className="rm-board">
      <header className="rm-board__intro">
        <p className="rm-board__eyebrow">Painel da RM Embalagens</p>
        <h1>Catálogo e dados da empresa</h1>
        <p>
          Aqui você gerencia produtos, fotos, contatos e o que aparece na home. Textos do site (menu,
          títulos das páginas) são definidos pelo desenvolvedor.
        </p>
      </header>

      <ol className="rm-steps">
        <li>
          <span>1</span>
          <div>
            <strong>Escolha</strong>
            <em>Use o menu ou os cartões abaixo</em>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>Altere</strong>
            <em>Troque foto, nome, texto ou destaque</em>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>Salve</strong>
            <em>O botão Salvar fica no canto direito</em>
          </div>
        </li>
      </ol>

      <section className="rm-board__section">
        <h2>Empresa e home</h2>
        <p className="rm-board__hint">Contatos, logo, seções da home e destaques.</p>
        <div className="rm-board__grid rm-board__grid--pages">
          <a className="rm-card" href="/admin/globals/company">
            <div className="rm-card__media rm-card__media--plain rm-card__media--phone">
              <Icon name="brand" />
            </div>
            <div className="rm-card__body">
              <strong>Dados da empresa</strong>
              <span>Logo, telefone, WhatsApp, Instagram e endereço</span>
            </div>
          </a>
          <a className="rm-card" href="/admin/globals/home-config">
            <div
              className={`rm-card__media ${heroImage ? '' : 'rm-card__media--plain rm-card__media--plain'}`}
            >
              {heroImage ? <img src={heroImage} alt="" /> : <Icon name="home" />}
              <span className="rm-card__badge">
                <Icon name="home" />
              </span>
            </div>
            <div className="rm-card__body">
              <strong>Configuração da home</strong>
              <span>Seções, fotos, diferenciais e destaques</span>
            </div>
          </a>
        </div>
      </section>

      <section className="rm-board__section rm-board__catalog">
        <div className="rm-board__section-head">
          <div>
            <h2>Catálogo</h2>
            <p className="rm-board__hint">Linhas de produtos e categorias com fotos.</p>
          </div>
          <a className="rm-board__add" href="/admin/collections/product-categories/create">
            <Icon name="plus" />
            Novo produto
          </a>
        </div>
      </section>

      {groups.docs.map((group) => {
        const items = categories.docs.filter((category) => {
          const related = category.group
          const groupId = typeof related === 'object' ? related?.id : related
          return String(groupId) === String(group.id)
        })

        return (
          <section key={group.id} id={group.slug} className="rm-board__section rm-board__line">
            <div className="rm-board__section-head">
              <div>
                <h2>{group.title}</h2>
                <p className="rm-board__hint">{group.description}</p>
              </div>
              <div className="rm-board__actions">
                <a className="rm-board__ghost" href={`/admin/collections/product-groups/${group.id}`}>
                  Nome e texto da linha
                </a>
                <a className="rm-board__add" href="/admin/collections/product-categories/create">
                  <Icon name="plus" />
                  Novo
                </a>
              </div>
            </div>
            <div className="rm-board__grid rm-board__grid--products">
              {items.map((category) => {
                const cover = mediaUrl(category.gallery?.[0])
                return (
                  <a
                    key={category.id}
                    className="rm-card"
                    href={`/admin/collections/product-categories/${category.id}`}
                  >
                    <div className={`rm-card__media ${cover ? '' : 'rm-card__media--plain'}`}>
                      {cover ? <img src={cover} alt="" /> : <Icon name={LINE_ICON[group.slug] || 'bag'} />}
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
