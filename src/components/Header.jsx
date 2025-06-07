import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuState = (isOpen) => {
    setMenuOpen(isOpen);
  };

  return (
    <header className="main-container">
      <div className="item">
        <a href="index.html"><img src="/src/assets/img/logo.png" alt="logo" className="logo" /></a>

        <div className={`nav-bar ${menuOpen ? 'active' : ''}`} id="menu">
          <i className="fas fa-arrow-left minimize mobile" onClick={() => menuState(false)}></i>
          <nav>
            <a href="#" className="nav-item active" onClick={() => menuState(false)}><i className="fas fa-home"></i>HOME</a>
            <a href="#produtos" className="nav-item" onClick={() => menuState(false)}><i className="fal fa-shopping-cart"></i>PRODUTOS</a>
            <a href="#sobre" className="nav-item" onClick={() => menuState(false)}><i className="fal fa-info-circle"></i>SOBRE NÓS</a>
            <a href="#parceiros" className="nav-item" onClick={() => menuState(false)}><i className="fal fa-user-friends"></i>PARCEIROS</a>
            <a href="#contato" className="nav-item" onClick={() => menuState(false)}><i className="fal fa-phone-alt"></i>CONTATO</a>
          </nav>
        </div>

        <i className="fas fa-bars menu mobile" onClick={() => menuState(true)}></i>
      </div>
    </header>
  );
};

export default Header;
