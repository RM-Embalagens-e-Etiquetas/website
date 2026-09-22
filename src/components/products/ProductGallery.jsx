'use client'

import { useCallback, useEffect, useState } from 'react'

const ProductGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [hidden, setHidden] = useState(() => new Set())
  const visible = images.filter((image) => !hidden.has(image.src))

  const hide = (src) => {
    setHidden((current) => {
      const next = new Set(current)
      next.add(src)
      return next
    })
    setActiveIndex(null)
  }

  const close = useCallback(() => setActiveIndex(null), [])

  const showPrev = useCallback(
    (event) => {
      event?.stopPropagation()
      setActiveIndex((current) => (current === null ? null : (current - 1 + visible.length) % visible.length))
    },
    [visible.length]
  )

  const showNext = useCallback(
    (event) => {
      event?.stopPropagation()
      setActiveIndex((current) => (current === null ? null : (current + 1) % visible.length))
    },
    [visible.length]
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

  if (visible.length === 0) {
    return <p>Novas fotos desta categoria em breve.</p>
  }

  return (
    <>
      <div className="product-gallery">
        {visible.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="product-gallery__item"
            onClick={() => setActiveIndex(index)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" onError={() => hide(image.src)} />
          </button>
        ))}
      </div>

      {activeIndex !== null && visible[activeIndex] && (
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
            src={visible[activeIndex].src}
            alt={visible[activeIndex].alt}
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
            {activeIndex + 1} / {visible.length}
          </span>
        </div>
      )}
    </>
  )
}

export default ProductGallery
