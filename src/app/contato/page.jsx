export const metadata = {
  title: 'Contato | RM Embalagens',
  description:
    'Fale com a RM Embalagens pelo WhatsApp ou Instagram e solicite um orçamento personalizado.',
}

const STEPS = [
  {
    title: 'Conte sua ideia',
    description: 'Envie o produto desejado, quantidade estimada e referências de arte, se houver.',
  },
  {
    title: 'Receba o orçamento',
    description: 'Retornamos com valores, prazos de produção e opções de personalização.',
  },
  {
    title: 'Acompanhe a produção',
    description: 'Após a confirmação, acompanhamos o pedido até a entrega em todo o Brasil.',
  },
]

export default function ContatoPage() {
  return (
    <>
      <section className="page-header">
        <div className="section-inner">
          <span className="eyebrow">Contato</span>
          <h1>Fale com a nossa equipe</h1>
          <p>
            Estamos à disposição para entender o seu projeto e apresentar a melhor solução em
            embalagens e etiquetas para a sua marca.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="section-inner contact-section__inner">
          <div className="contact-section__info">
            <div className="contact-method">
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              <div>
                <h3>WhatsApp</h3>
                <a href="https://wa.me/5521964282763" target="_blank" rel="noopener noreferrer">
                  (21) 96428-2763
                </a>
              </div>
            </div>

            <div className="contact-method">
              <i className="fab fa-instagram" aria-hidden="true"></i>
              <div>
                <h3>Instagram</h3>
                <a
                  href="https://www.instagram.com/rmembalagens/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @rmembalagens
                </a>
              </div>
            </div>

            <div className="contact-method">
              <i className="fal fa-map-marker-alt" aria-hidden="true"></i>
              <div>
                <h3>Localização</h3>
                <span>Campo Grande — Rio de Janeiro, RJ</span>
              </div>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58809.48443130842!2d-43.61131257623399!3d-22.891496795245867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9be17999363715%3A0x46c3f27867ad9332!2sCampo%20Grande%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1662176077455!5m2!1spt-BR!2sbr"
            width="560"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Campo Grande, Rio de Janeiro"
          ></iframe>
        </div>
      </section>

      <section className="how-to-order">
        <div className="section-inner">
          <div className="section-heading">
            <span className="eyebrow">Como funciona</span>
            <h2>Do orçamento à entrega em três passos</h2>
          </div>

          <ol className="steps-grid">
            {STEPS.map((step, index) => (
              <li key={step.title} className="step-card">
                <span className="step-card__number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="how-to-order__cta">
            <a
              href="https://wa.me/5521964282763"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              Iniciar conversa no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
