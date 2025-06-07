import React from 'react';

const Contact = () => {
  return (
    <section className="main-container">
      <div className="item" id="contato">
        <div className="item header">
          <h1 className="main-title title"><b>CONTRATE NOSSOS SERVIÇOS</b></h1>
          <h2 className="sub-title title">
            <i className="far fa-map-marker-alt"></i> NOSSA EMPRESA SE LOCALIZA EM
            <span className="main-color"><b>CAMPO GRANDE - RIO DE JANEIRO</b></span>
          </h2>
        </div>

        <div className="item contact">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58809.48443130842!2d-43.61131257623399!3d-22.891496795245867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9be17999363715%3A0x46c3f27867ad9332!2sCampo%20Grande%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1662176077455!5m2!1spt-BR!2sbr"
            width="560"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="contact-text">
            <div className="item header">
              <h1 className="main-title title">ENTRE EM CONTATO</h1>
              <h2 className="sub-title title">
                <span className="thin">
                  Fale conosco pelo nosso Instagram ou Whatsapp
                </span>
              </h2>
            </div>

            <div className="contacts">
              <div className="contact-media">
                <div className="content">
                  <i className="fab fa-whatsapp"></i><b>(21) 96428-2763</b>
                </div>
                <a href="https://wa.me/5521964282763" target="_blank" rel="noopener noreferrer" className="contact-button">MENSAGEM</a>
              </div>

              <div className="contact-media">
                <div className="content">
                  <i className="fab fa-instagram"></i><b>@RMEMBALAGENS</b>
                </div>
                <a href="https://www.instagram.com/rmembalagens/" target="_blank" rel="noopener noreferrer" className="contact-button">MENSAGEM</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
