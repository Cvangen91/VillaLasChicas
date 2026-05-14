import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import PageLayout from '../components/layout/PageLayout'
import fullVillaImage from '../../bilder/fullvilla.avif'
import exteriorEntryImage from '../../bilder/exteriour1.avif'
import sofaImage from '../../bilder/Sofarod.jpg'
import poolMainImage from '../../bilder/basseng1.avif'
import diningImage from '../../bilder/Spisestue.jpg'
import kitchenImage from '../../bilder/kjokken.jpg'
import bedroom1Image from '../../bilder/soverom1.avif'
import bedroom2Image from '../../bilder/soverom2en.avif'
import bedroom2AltImage from '../../bilder/soverom2to.avif'
import bedroom3Image from '../../bilder/soverom3.jpeg'
import bedroom4Image from '../../bilder/soverom4en.avif'
import bedroom4AltImage from '../../bilder/soverom4to.avif'
import bathroom1Image from '../../bilder/bad1.avif'
import bathroom2Image from '../../bilder/bad2en.avif'
import bathroom2AltImage from '../../bilder/bad2to.avif'
import bathroom3Image from '../../bilder/bad3.avif'
import poolAltImage1 from '../../bilder/basseng3.avif'
import poolAltImage2 from '../../bilder/basseng4.avif'
import poolAltImage3 from '../../bilder/basseng5.avif'
import poolAltImage4 from '../../bilder/basseng7.avif'
import poolAltImage5 from '../../bilder/baseng8.avif'
import poolAltImage6 from '../../bilder/basseng24.avif'
import exteriorImage1 from '../../bilder/exteriour2.avif'
import exteriorImage2 from '../../bilder/exteriour3.avif'
import exteriorImage3 from '../../bilder/exteriour4.avif'
import exteriorImage4 from '../../bilder/exteriour5.avif'
import exteriorImage5 from '../../bilder/exteriour6.avif'
import exteriorImage6 from '../../bilder/exteriour7.avif'
import exteriorImage7 from '../../bilder/exteriour8.avif'
import exteriorImage8 from '../../bilder/exteriour9.avif'
import exteriorImage9 from '../../bilder/exteriour10.avif'
import exteriorImage10 from '../../bilder/exteriour11.avif'
import exteriorImage11 from '../../bilder/exteriour12.avif'
import exteriorImage12 from '../../bilder/exteriour13.avif'
import exteriorImage13 from '../../bilder/exteriour14.avif'
import garageImage from '../../bilder/garage2biler.jpeg'
import buddhaImage from '../../bilder/Buddha.jpg'
import balconyImage from '../../bilder/Balkong.jpg'
import birdViewImage from '../../bilder/Fugleperspektiv.jpg'
import nightPoolImage from '../../bilder/Nattbad.jpg'
import omVillaImage from '../../bilder/Omvillabilde.avif'
import './pages.css'
import './About.css'

function About({ texts, setLanguage, language }) {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const photoTouchStartX = useRef(null)
  
  // Scroll to hash anchor on mount and when hash changes
  useEffect(() => {
    const scrollToElement = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }
    
    scrollToElement()
    window.addEventListener('hashchange', scrollToElement)
    return () => window.removeEventListener('hashchange', scrollToElement)
  }, [])

  const faqItems = [
    ...(texts.about.faqs ?? [])
  ]
  const amenities = texts.about.amenities ?? []
  const unavailableAmenities = texts.about.unavailableAmenities ?? []

  // Featured amenities (main ones to show first)
  const featuredAmenitiesKeys = ['pool', 'kitchen', 'wifi', 'airConditioning', 'outdoorDining', 'washingMachine']
  
  const allAmenities = amenities || []
  const featuredAmenities = allAmenities.filter(item => featuredAmenitiesKeys.includes(item.key))
  const remainingAmenities = allAmenities.filter(item => !featuredAmenitiesKeys.includes(item.key))

  const amenityIconByKey = {
    kitchen: '🍽',
    wifi: '📶',
    freeParking: '🚗',
    pool: '🏊',
    tv: '📺',
    washingMachine: '🧺',
    airConditioning: '❄️',
    indoorFireplace: '🔥',
    firepit: '🔥',
    outdoorDining: '🍴',
    bbq: '🍖',
    smokeAlarm: '🚨',
    coAlarm: '⚠️',
    fireExtinguisher: '🧯',
    firstAid: '⛑️',
    hostGreets: '🤝',
    outdoorShower: '🚿',
  }

  const getAmenityIcon = (key) => amenityIconByKey[key] ?? '•'

  const photoTourTitle = texts.about.photoTourTitle || 'Photo tour'
  const photoShowAll = texts.about.photoShowAll || 'Show all photos'
  const photoClose = texts.about.photoClose || 'Close'
  const photoPrevious = texts.about.photoPrevious || 'Previous image'
  const photoNext = texts.about.photoNext || 'Next image'
  const photoSectionsText = texts.about.photoSections || {}

  const collageImages = [
    { key: 'main', src: fullVillaImage, alt: photoSectionsText.exterior || 'Exterior' },
    { key: 'entry', src: exteriorEntryImage, alt: photoSectionsText.additional || 'Additional photos' },
    { key: 'living', src: sofaImage, alt: photoSectionsText.livingRoom || 'Living room' },
    { key: 'pool', src: poolMainImage, alt: photoSectionsText.pool || 'Pool' },
    { key: 'dining', src: diningImage, alt: photoSectionsText.diningArea || 'Dining area' },
  ]

  const photoSections = [
    {
      key: 'living-room',
      title: photoSectionsText.livingRoom || 'Living room',
      images: [sofaImage, omVillaImage],
    },
    {
      key: 'kitchen',
      title: photoSectionsText.kitchen || 'Full kitchen',
      images: [kitchenImage],
    },
    {
      key: 'dining',
      title: photoSectionsText.diningArea || 'Dining area',
      images: [diningImage],
    },
    {
      key: 'bedrooms',
      title: photoSectionsText.bedrooms || 'Bedrooms',
      groups: [
        { title: `${photoSectionsText.bedrooms || 'Bedrooms'} 1`, images: [bedroom1Image] },
        { title: `${photoSectionsText.bedrooms || 'Bedrooms'} 2`, images: [bedroom2Image, bedroom2AltImage] },
        { title: `${photoSectionsText.bedrooms || 'Bedrooms'} 3`, images: [bedroom3Image] },
        { title: `${photoSectionsText.bedrooms || 'Bedrooms'} 4`, images: [bedroom4Image, bedroom4AltImage] },
      ],
    },
    {
      key: 'bathrooms',
      title: photoSectionsText.bathrooms || 'Bathrooms',
      groups: [
        // bad1.avif is the reference for Bathroom 1
        { title: `${photoSectionsText.bathrooms || 'Bathrooms'} 1`, images: [bathroom1Image] },
        { title: `${photoSectionsText.bathrooms || 'Bathrooms'} 2`, images: [bathroom2Image, bathroom2AltImage] },
        { title: `${photoSectionsText.bathrooms || 'Bathrooms'} 3`, images: [bathroom3Image] },
      ],
    },
    {
      key: 'exterior',
      title: photoSectionsText.exterior || 'Exterior',
      images: [omVillaImage, exteriorEntryImage, exteriorImage1, exteriorImage2, exteriorImage3, exteriorImage4, exteriorImage5, exteriorImage6, exteriorImage7, exteriorImage8, exteriorImage9, exteriorImage10, exteriorImage11, exteriorImage12, exteriorImage13, balconyImage, birdViewImage],
    },
    {
      key: 'pool',
      title: photoSectionsText.pool || 'Pool',
      images: [poolMainImage, poolAltImage1, poolAltImage2, poolAltImage3, poolAltImage4, poolAltImage5, poolAltImage6, nightPoolImage],
    },
    {
      key: 'additional',
      title: photoSectionsText.additional || 'Additional photos',
      images: [buddhaImage, garageImage],
    },
  ]

  const photoLightboxImages = photoSections.flatMap((section) => {
    if (section.groups) {
      return section.groups.flatMap((group) =>
        group.images.map((image, imageIndex) => ({
          src: image,
          alt: `${group.title} ${imageIndex + 1}`,
          label: group.title,
        }))
      )
    }

    return section.images.map((image, imageIndex) => ({
      src: image,
      alt: `${section.title} ${imageIndex + 1}`,
      label: section.title,
    }))
  })

  const selectedPhoto = selectedPhotoIndex !== null ? photoLightboxImages[selectedPhotoIndex] : null

  useEffect(() => {
    if (!showAllPhotos) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (selectedPhotoIndex !== null) {
          setSelectedPhotoIndex(null)
        } else {
          setShowAllPhotos(false)
        }
      } else if (selectedPhotoIndex !== null && event.key === 'ArrowLeft') {
        setSelectedPhotoIndex((previousIndex) => {
          if (previousIndex === null) return previousIndex
          return (previousIndex - 1 + photoLightboxImages.length) % photoLightboxImages.length
        })
      } else if (selectedPhotoIndex !== null && event.key === 'ArrowRight') {
        setSelectedPhotoIndex((previousIndex) => {
          if (previousIndex === null) return previousIndex
          return (previousIndex + 1) % photoLightboxImages.length
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [photoLightboxImages.length, selectedPhotoIndex, showAllPhotos])

  const handleShowAllPhotos = () => {
    setShowAllPhotos(true)
  }

  const handleCloseAllPhotos = () => {
    setShowAllPhotos(false)
    setSelectedPhotoIndex(null)
  }

  const handleOpenPhoto = (src, alt) => {
    const photoIndex = photoLightboxImages.findIndex((photo) => photo.src === src && photo.alt === alt)
    if (photoIndex >= 0) {
      setSelectedPhotoIndex(photoIndex)
    }
  }

  const handleCloseSelectedPhoto = () => setSelectedPhotoIndex(null)

  const showPreviousPhoto = () => {
    setSelectedPhotoIndex((previousIndex) => {
      if (previousIndex === null) return previousIndex
      return (previousIndex - 1 + photoLightboxImages.length) % photoLightboxImages.length
    })
  }

  const showNextPhoto = () => {
    setSelectedPhotoIndex((previousIndex) => {
      if (previousIndex === null) return previousIndex
      return (previousIndex + 1) % photoLightboxImages.length
    })
  }

  const handlePhotoTouchStart = (event) => {
    photoTouchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  const handlePhotoTouchEnd = (event) => {
    if (photoTouchStartX.current === null) return

    const touchEndX = event.changedTouches[0]?.clientX
    if (typeof touchEndX !== 'number') {
      photoTouchStartX.current = null
      return
    }

    const deltaX = touchEndX - photoTouchStartX.current
    const swipeThreshold = 40

    if (deltaX <= -swipeThreshold) {
      showNextPhoto()
    } else if (deltaX >= swipeThreshold) {
      showPreviousPhoto()
    }

    photoTouchStartX.current = null
  }

  const handlePhotoSectionJump = (sectionKey) => {
    const target = document.getElementById(`modal-photo-${sectionKey}`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <div className="page-shell about-shell">
        <section className="page-section about-section about-section--intro">
          <div className="page-narrow page-center">
            <p className="page-eyebrow">{texts.about.eyebrow}</p>
            <h1 className="page-title highlight-title">{texts.about.title}</h1>
            <p className="page-intro highlight-info">{texts.about.intro}</p>
          </div>

          <div className="about-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,54 C170,104 330,10 520,44 C760,88 930,104 1200,56 L1200,120 L0,120 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </section>

        <section className="page-section page-section--bottom about-section about-section--faq">
          <div className="page-wide">
            <section className="about-photo-card" aria-label={photoTourTitle}>
              <h3 className="about-photo-title">{photoTourTitle}</h3>

              <div className="about-photo-collage">
                <figure className="about-photo-main">
                  <img src={collageImages[0].src} alt={collageImages[0].alt} className="about-photo-image" />
                </figure>

                <div className="about-photo-side-grid">
                  {collageImages.slice(1).map((item, index) => (
                    <figure key={item.key} className="about-photo-side-item">
                      <img src={item.src} alt={item.alt} className="about-photo-image" />
                      {index === collageImages.slice(1).length - 1 ? (
                        <button type="button" className="about-photo-show-button" onClick={handleShowAllPhotos}>
                          {photoShowAll}
                        </button>
                      ) : null}
                    </figure>
                  ))}
                </div>
              </div>
            </section>

            {showAllPhotos
              ? createPortal(
                  <>
                    <div className="about-photo-modal-backdrop" onClick={handleCloseAllPhotos} role="presentation">
                      <section
                        className="about-photo-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label={photoTourTitle}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <header className="about-photo-modal-header">
                          <h4>{photoTourTitle}</h4>
                          <button type="button" className="about-photo-modal-close" onClick={handleCloseAllPhotos}>
                            <span aria-hidden="true">x</span> {photoClose}
                          </button>
                        </header>

                        <div className="about-photo-tour-nav" aria-label={photoTourTitle}>
                          {photoSections.map((section) => (
                            <button
                              type="button"
                              key={section.key}
                              className="about-photo-chip"
                              onClick={() => handlePhotoSectionJump(section.key)}
                            >
                              {section.title}
                            </button>
                          ))}
                        </div>

                        <div id="about-photo-tour" className="about-photo-modal-content">
                          {photoSections.map((section) => (
                            <article key={section.key} id={`modal-photo-${section.key}`} className="about-photo-tour-section">
                              <h4>{section.title}</h4>

                              {section.groups ? (
                                <div className="about-photo-group-stack">
                                  {section.groups.map((group) => (
                                    <div key={group.title} className="about-photo-subgroup">
                                      <h5>{group.title}</h5>
                                      <div className="about-photo-tour-grid">
                                        {group.images.map((image, imageIndex) => (
                                          <figure key={`${group.title}-${imageIndex}`} className="about-photo-tour-item">
                                            <button
                                              type="button"
                                              className="about-photo-thumb-button"
                                              onClick={() => handleOpenPhoto(image, `${group.title} ${imageIndex + 1}`)}
                                              aria-label={`${group.title} ${imageIndex + 1}`}
                                            >
                                              <img src={image} alt={`${group.title} ${imageIndex + 1}`} className="about-photo-image" />
                                            </button>
                                          </figure>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="about-photo-tour-grid">
                                  {section.images.map((image, imageIndex) => (
                                    <figure key={`${section.key}-${imageIndex}`} className="about-photo-tour-item">
                                      <button
                                        type="button"
                                        className="about-photo-thumb-button"
                                        onClick={() => handleOpenPhoto(image, `${section.title} ${imageIndex + 1}`)}
                                        aria-label={`${section.title} ${imageIndex + 1}`}
                                      >
                                        <img src={image} alt={`${section.title} ${imageIndex + 1}`} className="about-photo-image" />
                                      </button>
                                    </figure>
                                  ))}
                                </div>
                              )}
                            </article>
                          ))}
                        </div>
                      </section>
                    </div>

                    {selectedPhoto ? (
                      <div className="about-photo-lightbox-backdrop" onClick={handleCloseSelectedPhoto} role="presentation">
                        <section
                          className="about-photo-lightbox"
                          role="dialog"
                          aria-modal="true"
                          aria-label={selectedPhoto.alt}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <header className="about-photo-lightbox-header">
                            <div className="about-photo-lightbox-meta">
                              <p>{selectedPhoto.label}</p>
                              <span>{selectedPhotoIndex + 1}/{photoLightboxImages.length}</span>
                            </div>
                            <button type="button" className="about-photo-modal-close" onClick={handleCloseSelectedPhoto}>
                              <span aria-hidden="true">x</span> {photoClose}
                            </button>
                          </header>

                          <div
                            className="about-photo-lightbox-image-wrap"
                            onTouchStart={handlePhotoTouchStart}
                            onTouchEnd={handlePhotoTouchEnd}
                          >
                            <button
                              type="button"
                              className="about-photo-lightbox-arrow about-photo-lightbox-arrow--prev"
                              onClick={showPreviousPhoto}
                              aria-label={photoPrevious}
                            >
                              ‹
                            </button>

                            <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="about-photo-lightbox-image" />

                            <button
                              type="button"
                              className="about-photo-lightbox-arrow about-photo-lightbox-arrow--next"
                              onClick={showNextPhoto}
                              aria-label={photoNext}
                            >
                              ›
                            </button>
                          </div>

                        </section>
                      </div>
                    ) : null}
                  </>,
                  document.body
                )
              : null}

            {/* Amenities section */}
            <div className="about-amenities-card">
              <h3 className="about-amenities-title">{texts.about.amenitiesTitle}</h3>

              {/* Featured amenities (always shown) */}
              <div className="about-amenities-main">
                <div className="about-featured-amenities">
                  <div className="about-amenities-grid">
                    {featuredAmenities.map((amenity) => (
                      <div key={amenity.key} className="about-amenity-item">
                        <span className="about-amenity-icon" aria-hidden="true">{getAmenityIcon(amenity.key)}</span>
                        <div>
                          <p className="about-amenity-label">{amenity.label}</p>
                          {amenity.detail ? <p className="about-amenity-detail">{amenity.detail}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Show all amenities button */}
              {remainingAmenities.length > 0 ? (
                <button 
                  type="button" 
                  className="about-amenities-button"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities 
                    ? `${texts.about.amenitiesShowLess || 'Show less'}` 
                    : `${texts.about.amenitiesShowAll || 'Show all'} ${allAmenities.length} ${texts.about.amenitiesLabel || 'amenities'}`
                  }
                </button>
              ) : null}

              {/* Expanded amenities box */}
              {showAllAmenities && remainingAmenities.length > 0 ? (
                <div className="about-amenities-expanded">
                  <div className="about-amenities-grid">
                    {remainingAmenities.map((amenity) => (
                      <div key={amenity.key} className="about-amenity-item">
                        <span className="about-amenity-icon" aria-hidden="true">{getAmenityIcon(amenity.key)}</span>
                        <div>
                          <p className="about-amenity-label">{amenity.label}</p>
                          {amenity.detail ? <p className="about-amenity-detail">{amenity.detail}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Not included section */}
              {unavailableAmenities.length > 0 ? (
                <div className="about-unavailable-wrap">
                  <p className="about-unavailable-title">{texts.about.amenitiesUnavailableTitle}</p>
                  <ul className="about-unavailable-list">
                    {unavailableAmenities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {/* Google Maps section */}
            <div id="about-map" className="about-map-section">
              <h3 className="about-map-title">Location</h3>
              <div className="about-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.639321886206!2d-4.641227!3d36.737701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72e3e6f3e6f3e6f%3A0x1234567890!2sFuengirola%2C%20M%C3%A1laga!5e0!3m2!1sen!2ses!4v1234567890"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="about-map-iframe"
                  title="Villa Las Chicas Location"
                ></iframe>
              </div>
            </div>

            {/* FAQ section */}
            <div className="page-faq-header">
              <p className="page-eyebrow">FAQ</p>
              <h2 className="page-faq-title">{texts.about.faqTitle}</h2>
              <p className="page-faq-intro">{texts.about.faqIntro}</p>
            </div>

            <div className="page-faq-list">
              {faqItems.map((item) => (
                <details key={item.q} className="page-faq-item">
                  <summary className="page-faq-summary">{item.q}</summary>
                  <p className="page-faq-answer">{item.a}</p>
                </details>
              ))}
              <div className="page-faq-item page-faq-item--open page-faq-item--static">
                <div className="page-faq-summary page-faq-summary--static">{texts.about.moreInfoTitle}</div>
                <p className="page-faq-answer page-faq-answer--first">{texts.about.text1}</p>
                <p className="page-faq-answer">{texts.about.textrooms}</p>
                  <p className="page-faq-answer">{texts.about.text2}</p>
                  <p className="page-faq-answer">{texts.about.extraText}</p>
                <p className="page-faq-answer page-faq-answer--video">{texts.about.videoInfoText}</p>
                <div className="about-video-action">
                  <a
                    href="https://youtu.be/MT-3H6jAcFQ"
                    target="_blank"
                    rel="noreferrer"
                    className="page-primary-link"
                  >
                    {texts.about.videoLabel}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default About