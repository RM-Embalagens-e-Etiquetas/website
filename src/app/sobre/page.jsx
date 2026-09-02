import aboutImage from '@/assets/img/inicial/sacolas/IMG-20220726-WA0040.jpg'
import ContactCta from '@/components/ContactCta'

export const metadata = {
  title: 'Sobre | RM Embalagens',
  description:
    'Conheça a RM Embalagens: fabricante e distribuidora de embalagens, etiquetas e acessórios personalizados.',
}

const VALUES = [
  {
    title: 'Qualidade em cada lote',
    description:
      'Materiais selecionados e processos de produção acompanhados de perto, do primeiro ao último item.',
  },
  {
    title: 'Personalização real',
    description:
      'Cada arte é desenvolvida para a marca do cliente — sem soluções genéricas ou modelos limitados.',
  },
  {
    title: 'Relacionamento próximo',
    description:
      'Atendimento direto, sem intermediários, para que cada pedido seja acompanhado de perto.',
  },
]

export default function SobrePage() {
  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          <span className="eyebrow">Sobre a empresa</span>
          <h1>Uma fabricante dedicada à identidade de cada marca</h1>
          <p>
            A RM Embalagens fabrica, vende e distribui embalagens, etiquetas, envelopes, lacres e
            demais itens com a cara da sua marca — unindo produção própria a um acompanhamento
            próximo em cada pedido.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="section-inner about-section__inner">
          <img src={aboutImage.src} alt="Produção RM Embalagens" className="about-section__img" />

          <div className="about-section__content">
            <h2>Quem somos</h2>
            <p>
              Somos uma fabricante, vendedora e distribuidora de embalagens, etiquetas,
              envelopes, lacres e outros produtos personalizados com a identidade da sua marca.
            </p>
            <h2>Nosso negócio</h2>
            <p>
              Oferecemos todo tipo de material gráfico e visual para publicidade e apresentação
              de produtos, atendendo confecções, e-commerces e negócios de todos os portes em
              todo o território nacional.
            </p>
            <h2>Nossos clientes</h2>
            <p>
              Trabalhamos com marcas de moda, beleza e varejo que buscam consistência visual em
              cada etapa da experiência de compra.{' '}
              <a
                href="https://www.instagram.com/rmembalagens/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Confira exemplos no nosso Instagram.
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="section-inner">
          <div className="section-heading">
            <span className="eyebrow">Como trabalhamos</span>
            <h2>Princípios que guiam cada entrega</h2>
          </div>
          <div className="values-grid">
            {VALUES.map((value) => (
              <div key={value.title} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
