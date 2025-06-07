import React from 'react';

const About = () => {
  return (
    <section className="main-container">
      <div className="item" id="sobre">
        <div className="item header">
          <h1 className="title main-title">SOBRE NÓS</h1>
          <h2 className="title sub-title">
            <i className="fal fa-info-circle"></i>
            <span className="main-color">DETALHES</span> SOBRE A EMPRESA
          </h2>
        </div>

        <div className="item content">
          <img
            src="/src/assets/img/inicial/IMG-20220726-WA0040.jpg"
            alt="sobre nós"
            id="sobre-img"
          />

          <div className="about">
            <div className="info">
              <h1 className="title main-title">QUEM SOMOS?</h1>
              <p className="info-text">
                A <span className="bold">RM Embalagens</span> é uma fabricante,
                vendedora e distribuidora de embalagens, etiquetas, envelopes,
                lacres e outros produtos com a cara da sua marca.
              </p>
            </div>
            <div className="info">
              <h1 className="title main-title">NOSSO NEGÓCIO</h1>
              <p className="info-text">
                Oferecemos <span className="bold">todo tipo</span> de arte visual
                para publicidade e comportamento de materiais para o seu
                negócio.
              </p>
            </div>
            <div className="info">
              <h1 className="title main-title">NOSSOS CLIENTES</h1>
              <p className="info-text">
                <i className="fal fa-external-link"></i>
                <span className="bold">
                  <a href="https://www.instagram.com/rmembalagens/" target="_blank" rel="noopener noreferrer">
                    CLIQUE AQUI
                  </a>
                </span>
                E CONFIRA NOSSOS CLIENTES EM NOSSO
                <span className="bold">INSTAGRAM</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
