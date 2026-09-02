'use client'

import { useCallback, useEffect, useState } from 'react'

const ProductGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const close = useCallback(() => setActiveIndex(null), [])

  const showPrev = useCallback(
    (event) => {
      event?.stopPropagation()
      setActiveIndex((current) => (current === null ? null : (current - 1 + images.length) % images.length))
    },
    [images.length]
  )

  const showNext = useCallback(
    (event) => {
      event?.stopPropagation()
      setActiveIndex((current) => (current === null ? null : (current + 1) % images.length))
    },
    [images.length]
  )

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') showPrev()
      if (event.key === 'ArrowRight') showNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIndex, close, showPrev, showNext])

  return (
    <>
      <div className="product-gallery">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="product-gallery__item"
            onClick={() => setActiveIndex(index)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button type="button" className="lightbox__close" onClick={close} aria-label="Fechar">
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>

          <button
            type="button"
            className="lightbox__nav lightbox__nav--prev"
            onClick={showPrev}
            aria-label="Foto anterior"
          >
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </button>

          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="lightbox__image"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            type="button"
            className="lightbox__nav lightbox__nav--next"
            onClick={showNext}
            aria-label="Próxima foto"
          >
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>

          <span className="lightbox__counter">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  )
}

export default ProductGallery
