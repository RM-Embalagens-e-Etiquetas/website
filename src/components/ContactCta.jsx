const ContactCta = () => {
  return (
    <section className="contact-cta">
      <div className="section-inner contact-cta__inner">
        <div>
          <span className="eyebrow eyebrow--on-dark">Vamos conversar</span>
          <h2>Pronto para elevar a apresentação da sua marca?</h2>
          <p>
            Envie sua ideia, quantidade e prazo — retornamos com um orçamento personalizado para o
            seu projeto.
          </p>
        </div>

        <div className="contact-cta__actions">
          <a
            href="https://wa.me/5521964282763"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary"
          >
            <i className="fab fa-whatsapp" aria-hidden="true"></i> Falar no WhatsApp
          </a>
          <a
            href="https://www.instagram.com/rmembalagens/"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--outline-light"
          >
            <i className="fab fa-instagram" aria-hidden="true"></i> Ver no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactCta
