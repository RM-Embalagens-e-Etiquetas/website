import React from 'react';

const Partners = () => {
  return (
    <section className="main-container">
      <div className="item" id="parceiros">
        <div className="item header">
          <h1 className="title main-title">NOSSOS PARCEIROS</h1>
          <h2 className="title sub-title">
            <i className="fal fa-handshake"></i>
            <span className="main-color">PARCERIAS</span> E SEUS SERVIÇOS
          </h2>
        </div>

        <div className="item partners">
          <div className="partner">
            <span className="bold main-color">José Roberto</span>
            <img
              src="/src/assets/img/inicial/jose.jpg"
              className="partner-photo"
              alt="Foto de José Roberto, parceiro da RM Embalagens"
            />
            <div className="partner-media">
              <a href="https://github.com/dev-jose-roberto" target="_blank" rel="noopener noreferrer"><i className="fas fa-globe-americas"></i></a>
              <a href="https://wa.me/5521997294566" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
              <a href="https://www.instagram.com/josee.nt/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
