import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Icon } from './Icon'

function mediaSrc(doc) {
  if (!doc || typeof doc !== 'object') return null
  if (doc.filename) return `/api/media/file/${encodeURIComponent(doc.filename)}`
  return doc.url || null
}

const PAGES = [
  {
    href: '/admin/globals/home',
    title: 'Início',
    hint: 'Banner, fotos e textos da primeira página',
    imageFrom: 'home',
    icon: 'home',
  },
  {
    href: '/admin/globals/about',
    title: 'Sobre',
    hint: 'História, foto e valores',
    imageFrom: 'about',
    icon: 'about',
  },
  {
    href: '/admin/globals/contact',
    title: 'Contato',
    hint: 'Textos e passos para pedir orçamento',
    icon: 'contact',
    tone: 'contact',
  },
]

const LINE_ICON = {
  sacolas: 'bag',
  etiquetas: 'tag',
  'tags-e-acessorios': 'spark',
  embalagens: 'box',
}

export default async function Dashboard() {
  const payload = await getPayload({ config: configPromise })
  const [home, about, categories, groups] = await Promise.all([
    payload.findGlobal({ slug: 'home', depth: 1 }),
    payload.findGlobal({ slug: 'about', depth: 1 }),
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

  const pageImages = {
    home: mediaSrc(home.heroImage),
    about: mediaSrc(about.image) || mediaSrc(home.aboutImage),
  }

  return (
    <div className="rm-board">
      <header className="rm-board__intro">
        <p className="rm-board__eyebrow">Painel da RM Embalagens</p>
        <h1>O que você quer alterar no site?</h1>
        <p>
          O menu da esquerda segue o site: empresa, páginas e catálogo por linha. Clique, troque e
          aperte <strong>Salvar</strong>.
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
            <em>Troque foto, nome, texto ou botão</em>
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
        <h2>Empresa</h2>
        <p className="rm-board__hint">Aparece no site inteiro: logo, menu, WhatsApp e rodapé.</p>
        <div className="rm-board__grid rm-board__grid--pages">
          <a className="rm-card" href="/admin/globals/site">
            <div className="rm-card__media rm-card__media--plain rm-card__media--phone">
              <Icon name="brand" />
            </div>
            <div className="rm-card__body">
              <strong>Logo, menu e WhatsApp</strong>
              <span>Logo, telefone, Instagram, endereço e botões</span>
            </div>
          </a>
        </div>
      </section>

      <section className="rm-board__section">
        <h2>Páginas do site</h2>
        <p className="rm-board__hint">O que o cliente vê em Início, Sobre e Contato.</p>
        <div className="rm-board__grid rm-board__grid--pages">
          {PAGES.map((page) => {
            const image = page.imageFrom ? pageImages[page.imageFrom] : null
            return (
              <a key={page.href} className="rm-card" href={page.href}>
                <div
                  className={`rm-card__media ${image ? '' : `rm-card__media--plain rm-card__media--${page.tone || 'plain'}`}`}
                >
                  {image ? <img src={image} alt="" /> : <Icon name={page.icon} />}
                  <span className="rm-card__badge">
                    <Icon name={page.icon} />
                  </span>
                </div>
                <div className="rm-card__body">
                  <strong>{page.title}</strong>
                  <span>{page.hint}</span>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      <section className="rm-board__section rm-board__catalog">
        <div className="rm-board__section-head">
          <div>
            <h2>Catálogo</h2>
            <p className="rm-board__hint">
              Igual ao site: 4 linhas, e dentro de cada uma os produtos com foto.
            </p>
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
                const cover = mediaSrc(category.gallery?.[0])
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
