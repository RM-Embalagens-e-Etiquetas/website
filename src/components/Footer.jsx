import React from 'react';

const Footer = () => {
  return (
    <footer className="main-container">
      <div className="main-container">
        <div className="end">
          <a href="index.html">
            <img src="/src/assets/img/logo.png" alt="logo" className="logo" />
          </a>
          <a href="index.html">RM EMBALAGENS</a>
        </div>

        <ul>
          <li>
            <a href="https://www.instagram.com/rmembalagens/" target="_blank" rel="noopener noreferrer">
              Trabalhe conosco
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/rmembalagens/" target="_blank" rel="noopener noreferrer">
              Contato via e-mail
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/rmembalagens/" target="_blank" rel="noopener noreferrer">Parceria</a>
          </li>
        </ul>
      </div>

      <div className="main-container copyright-container">
        <span className="thin">
          <span className="desc">RM EMBALAGENS | </span>FABRICANTE E DISTRIBUIDORA NACIONAL
        </span>
      </div>
    </footer>
  );
};

export default Footer;
