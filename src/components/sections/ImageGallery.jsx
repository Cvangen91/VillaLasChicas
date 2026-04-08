import { useState } from 'react'
import fullViewImage from '../../../bilder/Fullview.jpg'
import poolImage from '../../../bilder/Basseng.jpg'
import balconyImage from '../../../bilder/Balkong.jpg'
import diningImage from '../../../bilder/Spisestue.jpg'
import './ImageGallery.css'

function ImageGallery({ texts }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const gallerySlides = [fullViewImage, poolImage, balconyImage, diningImage]

  const title = texts?.galleryTitle ?? 'Gallery'
  const previousLabel = texts?.galleryPrev ?? 'Previous image'
  const nextLabel = texts?.galleryNext ?? 'Next image'
  const showLabel = texts?.galleryShow ?? 'Show gallery image'

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallerySlides.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)
  }

  return (
    <section className="image-gallery-section">
      <div className="image-gallery-wrap">
        <h2 className="image-gallery-title">{title}</h2>

        <div className="image-gallery-frame">
          <img
            src={gallerySlides[currentImageIndex]}
            alt={`${title} ${currentImageIndex + 1}`}
            className="image-gallery-image"
          />

          <button
            className="image-gallery-nav image-gallery-nav--prev"
            onClick={prevImage}
            aria-label={previousLabel}
          >
            ‹
          </button>

          <button
            className="image-gallery-nav image-gallery-nav--next"
            onClick={nextImage}
            aria-label={nextLabel}
          >
            ›
          </button>

          <div className="image-gallery-dots">
            {gallerySlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`${showLabel} ${index + 1}`}
                className={`image-gallery-dot ${currentImageIndex === index ? 'is-active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="image-gallery-wave-bottom" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,72 C160,18 320,118 520,82 C760,40 930,22 1200,68 L1200,120 L0,120 Z"
            fill="#FFF8F3"
          />
        </svg>
      </div>
    </section>
  )
}

export default ImageGallery
