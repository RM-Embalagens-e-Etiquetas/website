import React, { useEffect, useState, useCallback } from 'react';

const Main = () => {
  const images = [
    { src: '/src/assets/img/inicial/IMG-20220726-WA0033.jpg', alt: '1' },
    { src: '/src/assets/img/inicial/IMG-20220726-WA0045.jpg', alt: '2' },
    { src: '/src/assets/img/inicial/IMG-20220726-WA0051.jpg', alt: '3' },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideTo = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Muda a imagem a cada 3 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, [images.length]);

  // Efeito para o estilo de transform do carrossel
  useEffect(() => {
    const carouselImagesElement = document.getElementById('carousel-images');
    if (carouselImagesElement) {
      carouselImagesElement.style.transform = `translate(-${currentIndex * 100}%, 0)`;
    }
  }, [currentIndex]);

  return (
    <main className="main-container">
      <div className="item">
        <div className="header">
          <h2 className="sub-title title">O que fazemos?</h2>
          <h1 className="main-title title">
            Geramos <span className="main-color">Valor</span>
            Para a sua Empresa!!
          </h1>
          <div className="button">
            <a className="main-button" href="https://www.instagram.com/rmembalagens/" target="_blank" rel="noopener noreferrer">FAÇA SUA ENCOMENDA</a>
          </div>
        </div>

        <div id="carousel">
          <div className="main-img">
            <div id="carousel-images">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  data-index={index}
                  className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            <div className="customs">
              <span className="main-color">
                <label>EMBALAGENS</label>
                <label>PERSONALIZADAS</label>
              </span>
            </div>
            <div id="carousel-buttons">
              {images.map((_, index) => (
                <span
                  key={index}
                  data-index={index}
                  className={`carousel-button ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => slideTo(index)} // Adicionado onClick para mudar slide
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
