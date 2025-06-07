import React from 'react';

const Products = () => {
  const products = [
    { name: 'SACOLA PLÁSTICA MODELO ALÇA VAZADA', imgSrc: '/src/assets/img/inicial/vazada.png', alt: 'Sacola plástica modelo alça vazada' },
    { name: 'SACOLA PLÁSTICA MODELO ALÇA FITA', imgSrc: '/src/assets/img/inicial/fita.png', alt: 'Sacola plástica modelo alça fita' },
    { name: 'SACOLA PLÁSTICA MODELO CADEADO', imgSrc: '/src/assets/img/inicial/cadeado.png', alt: 'Sacola plástica modelo cadeado' },
    { name: 'SACOLA PLÁSTICA MODELO ALÇA OMBRO', imgSrc: '/src/assets/img/placeholder-produto.png', alt: 'Sacola plástica modelo alça ombro' },
    { name: 'SACOLA PLÁSTICA MODELO ALÇA CAMISETA', imgSrc: '/src/assets/img/inicial/camiseta.png', alt: 'Sacola plástica modelo alça camiseta' },
    { name: 'SACOLA EM TNT COMUM', imgSrc: '/src/assets/img/inicial/tnt.jpeg', alt: 'Sacola em TNT comum' },
    { name: 'SACOLA EM TNT METALIZADO', imgSrc: '/src/assets/img/placeholder-produto.png', alt: 'Sacola em TNT metalizado' },
    { name: 'SACOLA ALGODÃO', imgSrc: '/src/assets/img/placeholder-produto.png', alt: 'Sacola algodão' },
    { name: 'SACOLA PAPEL', imgSrc: '/src/assets/img/inicial/papel.jpeg', alt: 'Sacola papel' },
    { name: 'ETIQUETAS BORDADAS', imgSrc: '/src/assets/img/inicial/etiqueta-bordada.jpeg', alt: 'Etiquetas bordadas' },
    { name: 'ETIQUETA EM METAL', imgSrc: '/src/assets/img/placeholder-produto.png', alt: 'Etiqueta em metal' },
    { name: 'PRODUTOS GRÁFICOS', imgSrc: '/src/assets/img/inicial/produtos-graficos.jpeg', alt: 'Produtos gráficos' },
  ];

  return (
    <section className="main-container">
      <div className="item" id="produtos">
        <div className="item header">
          <h1 className="main-title title"><b>NOSSOS PRODUTOS</b></h1>
          <h2 className="sub-title title">
            <i className="fa fa-truck"></i> ENVIAMOS PARA
            <span className="main-color"><b>TODO O BRASIL</b></span>
          </h2>
        </div>

        <div className="catalog item">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <div className="mask">
                <h2 className="main-title title">{product.name}</h2>
                <a href="https://www.instagram.com/rmembalagens/" target="_blank" rel="noopener noreferrer" className="order">ENCOMENDAR</a>
              </div>
              <img src={product.imgSrc} alt={product.alt} />
            </div>
          ))}
        </div>
        <a href="https://www.instagram.com/rmembalagens/" target="_blank" rel="noopener noreferrer" className="title sub-title more">
          <i className="fas fa-list"></i>CONFERIR MAIS CATEGORIAS
        </a>
      </div>
    </section>
  );
};

export default Products;
