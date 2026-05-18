import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import fullViewImage from '../../../bilder/Fullview.jpg'
import poolImage from '../../../bilder/Basseng.jpg'
import balconyImage from '../../../bilder/Balkong.jpg'
import diningImage from '../../../bilder/Spisestue.jpg'
import livingImage from '../../../bilder/Sofarod.jpg'
import birdViewImage from '../../../bilder/Fugleperspektiv.jpg'
import arrowLeft from '../../../bilder/arrowleft.png'
import arrowRight from '../../../bilder/arrowright.png'
import closeIcon from '../../../bilder/x.svg'
import './ImageGallery.css'

function ImageGallery({ texts }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxZoom, setLightboxZoom] = useState(1)
  const [zoomOrigin, setZoomOrigin] = useState('center center')
  const touchStartX = useRef(null)
  const touchStartDistance = useRef(null)
  const imageWrapRef = useRef(null)
  const lightboxModalRef = useRef(null)
  const lightboxCloseButtonRef = useRef(null)
  const lastFocusedElementRef = useRef(null)
  const gallerySlides = [
    fullViewImage,
    livingImage,
    poolImage,
    balconyImage,
    diningImage,
    birdViewImage,
  ]

  const title = texts?.galleryTitle ?? 'Gallery'
  const previousLabel = texts?.galleryPrev ?? 'Previous image'
  const nextLabel = texts?.galleryNext ?? 'Next image'
  const showLabel = texts?.galleryShow ?? 'Show gallery image'
  const swipeHint = texts?.gallerySwipeHint ?? 'Swipe'
  const galleryDescriptions = texts?.galleryImageDescriptions ?? [
    'Full view',
    'Living room',
    'Pool area',
    'Balcony',
    'Dining area',
    'Bird view',
  ]
  const currentDescription = galleryDescriptions[currentImageIndex] ?? `${title} ${currentImageIndex + 1}`
  const previousIndex = (currentImageIndex - 1 + gallerySlides.length) % gallerySlides.length
  const nextIndex = (currentImageIndex + 1) % gallerySlides.length

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallerySlides.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)
  }

  useEffect(() => {
    setLightboxZoom(1)
  }, [currentImageIndex, isLightboxOpen])

  useEffect(() => {
    if (!isLightboxOpen) return

    const handleWheel = (event) => {
      if (!event.ctrlKey) return
      event.preventDefault()
      
      // Beregn musepositionen relative til bildecontaineren
      if (imageWrapRef.current) {
        const rect = imageWrapRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const xPercent = (x / rect.width) * 100
        const yPercent = (y / rect.height) * 100
        setZoomOrigin(`${xPercent}% ${yPercent}%`)
      }
      
      const zoomSpeed = 0.22
      const delta = event.deltaY > 0 ? -zoomSpeed : zoomSpeed
      const newZoom = Math.max(1, lightboxZoom + delta)
      setLightboxZoom(Math.min(newZoom, 3))
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    return () => document.removeEventListener('wheel', handleWheel)
  }, [isLightboxOpen, lightboxZoom])

  useEffect(() => {
    if (!isLightboxOpen) return undefined

    lastFocusedElementRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusableElements = () => {
      if (!lightboxModalRef.current) return []
      return Array.from(
        lightboxModalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('disabled'))
    }

    const focusCloseButton = () => {
      if (lightboxCloseButtonRef.current) {
        lightboxCloseButtonRef.current.focus()
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (!focusableElements.length) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey) {
        if (activeElement === firstElement || !lightboxModalRef.current?.contains(activeElement)) {
          event.preventDefault()
          lastElement.focus()
        }
      } else if (activeElement === lastElement || !lightboxModalRef.current?.contains(activeElement)) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    requestAnimationFrame(focusCloseButton)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)

      if (lastFocusedElementRef.current instanceof HTMLElement) {
        lastFocusedElementRef.current.focus()
      }
    }
  }, [isLightboxOpen])

  const handleTouchStart = (event) => {
    // Handle swipe
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
    
    // Handle pinch-zoom
    if (event.touches.length === 2) {
      const touch1 = event.touches[0]
      const touch2 = event.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      touchStartDistance.current = distance
      event.preventDefault()
    }
  }

  const handleTouchEnd = (event) => {
    // Handle pinch-zoom
    if (event.touches.length === 2) {
      const touch1 = event.touches[0]
      const touch2 = event.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      
      if (touchStartDistance.current !== null) {
        const ratio = distance / touchStartDistance.current
        const newZoom = Math.max(1, lightboxZoom * ratio)
        setLightboxZoom(Math.min(newZoom, 3))
        event.preventDefault()
      }
      touchStartDistance.current = null
      return
    }
    
    // Handle swipe
    if (touchStartX.current === null) return

    const touchEndX = event.changedTouches[0]?.clientX
    if (typeof touchEndX !== 'number') {
      touchStartX.current = null
      return
    }

    const deltaX = touchEndX - touchStartX.current
    const swipeThreshold = 40

    if (deltaX <= -swipeThreshold) {
      nextImage()
    } else if (deltaX >= swipeThreshold) {
      prevImage()
    }

    touchStartX.current = null
  }

  return (
    <section className="image-gallery-section">
      <div className="image-gallery-wrap">
        <h2 className="image-gallery-title">{title}</h2>

        <div className="image-gallery-frame">
          <div
            className="image-gallery-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className="image-gallery-preview image-gallery-preview--side image-gallery-preview-button"
              onClick={() => setCurrentImageIndex(previousIndex)}
              aria-label={previousLabel}
            >
              <img
                src={gallerySlides[previousIndex]}
                alt=""
                className="image-gallery-image image-gallery-image--ghost"
              />
            </button>

            <button
              type="button"
              className="image-gallery-preview image-gallery-preview--active image-gallery-preview-button"
              onClick={() => setIsLightboxOpen(true)}
              aria-label={`${showLabel} ${currentImageIndex + 1}: ${currentDescription}`}
            >
              <img
                src={gallerySlides[currentImageIndex]}
                alt={`${title} ${currentImageIndex + 1}`}
                className="image-gallery-image"
                style={{ cursor: 'zoom-in' }}
              />
            </button>

            <button
              type="button"
              className="image-gallery-preview image-gallery-preview--side image-gallery-preview-button"
              onClick={() => setCurrentImageIndex(nextIndex)}
              aria-label={nextLabel}
            >
              <img
                src={gallerySlides[nextIndex]}
                alt=""
                className="image-gallery-image image-gallery-image--ghost"
              />
            </button>
          </div>


          <button
            className="image-gallery-nav image-gallery-nav--prev"
            onClick={prevImage}
            aria-label={previousLabel}
          >
            <img src={arrowLeft} alt="" className="image-gallery-nav-icon" />
          </button>

          <button
            className="image-gallery-nav image-gallery-nav--next"
            onClick={nextImage}
            aria-label={nextLabel}
          >
            <img src={arrowRight} alt="" className="image-gallery-nav-icon" />
          </button>

          <div className="image-gallery-counter">
            {currentImageIndex + 1} / {gallerySlides.length}
          </div>

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
            fill="#FFFFFF"
          />
        </svg>
      </div>

    {isLightboxOpen && createPortal(
      <div className="about-photo-lightbox-backdrop" onClick={() => setIsLightboxOpen(false)}>
        <section
          className="about-photo-lightbox image-gallery-lightbox-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} ${currentImageIndex + 1}`}
          ref={lightboxModalRef}
          onClick={e => e.stopPropagation()}
        >
          <header className="about-photo-lightbox-header">
            <div className="about-photo-lightbox-meta">
              <p>{title}</p>
              <span>{currentImageIndex + 1}/{gallerySlides.length}<span className="about-photo-lightbox-meta-label-inline"> · {currentDescription}</span></span>
            </div>
            <button type="button" className="about-photo-modal-close" onClick={() => setIsLightboxOpen(false)} aria-label="Lukk" ref={lightboxCloseButtonRef}>
              <img src={closeIcon} alt="" className="image-gallery-close-icon" />
            </button>
          </header>

          <div
            className="about-photo-lightbox-image-wrap"
            ref={imageWrapRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className="about-photo-lightbox-arrow about-photo-lightbox-arrow--prev"
              onClick={prevImage}
              aria-label={previousLabel}
            >
              <img src={arrowLeft} alt="" className="about-photo-lightbox-arrow-icon" />
            </button>

            <img
              src={gallerySlides[currentImageIndex]}
              alt={`${title} ${currentImageIndex + 1}`}
              className="about-photo-lightbox-image"
              style={{ transform: `scale(${lightboxZoom})`, transformOrigin: zoomOrigin }}
            />

            <button
              type="button"
              className="about-photo-lightbox-arrow about-photo-lightbox-arrow--next"
              onClick={nextImage}
              aria-label={nextLabel}
            >
              <img src={arrowRight} alt="" className="about-photo-lightbox-arrow-icon" />
            </button>

            <div className="image-gallery-mobile-pill" aria-hidden="true">
              <span className="image-gallery-mobile-swipe">
                <img src={arrowLeft} alt="" className="image-gallery-mobile-swipe-icon" />
                <span>{swipeHint}</span>
                <img src={arrowRight} alt="" className="image-gallery-mobile-swipe-icon" />
              </span>
              <span className="image-gallery-mobile-zoom">🔍☝️ Zoom</span>
            </div>
          </div>
        </section>
      </div>,
      document.body
    )}
  </section>
  )
}

export default ImageGallery
