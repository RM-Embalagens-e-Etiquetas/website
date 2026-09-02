const ITEMS = [
  {
    icon: 'fa-boxes-alt',
    title: 'Produção própria',
    description:
      'Acompanhamos cada etapa da fabricação, com controle de qualidade e prazos previsíveis.',
  },
  {
    icon: 'fa-swatchbook',
    title: 'Personalização completa',
    description:
      'Cores, materiais e artes exclusivas — cada pedido é desenvolvido para a identidade da marca.',
  },
  {
    icon: 'fa-truck',
    title: 'Envio para todo o Brasil',
    description:
      'Atendemos confecções, e-commerces e negócios locais em todas as regiões do país.',
  },
  {
    icon: 'fa-comments-alt',
    title: 'Atendimento direto',
    description:
      'Suporte próximo do orçamento à entrega, sem intermediários, via WhatsApp e Instagram.',
  },
]

const Differentiators = () => {
  return (
    <section className="differentiators">
      <div className="section-inner">
        <div className="section-heading">
          <span className="eyebrow">Por que a RM Embalagens</span>
          <h2>Estrutura e cuidado em cada etapa do processo</h2>
        </div>

        <div className="differentiators__grid">
          {ITEMS.map((item) => (
            <div key={item.title} className="differentiator-card">
              <i className={`fal ${item.icon}`} aria-hidden="true"></i>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Differentiators
