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
import youtubeOverlayImage from '../../bilder/Youtubeoverlegg1.png'
import arrowLeft from '../../bilder/arrowleft.png'
import arrowRight from '../../bilder/arrowright.png'
import closeIcon from '../../bilder/x.svg'
import './pages.css'
import './About.css'

function About({ texts, setLanguage, language }) {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [isMapExpanded, setIsMapExpanded] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [photoZoom, setPhotoZoom] = useState(1)
  const [photoZoomOrigin, setPhotoZoomOrigin] = useState('center center')
  const photoTouchStartX = useRef(null)
  const photoTouchStartDistance = useRef(null)
  const photoImageWrapRef = useRef(null)
  const embeddedMapUrl = 'https://www.google.com/maps?q=Fuengirola%2C%20Andalusia%2C%20Spain&z=11&output=embed'
  const embeddedVideoUrl = 'https://www.youtube.com/embed/AUY3gvKTbxc?autoplay=1&rel=0'
  
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
    freeParking: '🅿️',
    pool: '🏊',
    tv: '📺',
    washingMachine: '👕🫧',
    airConditioning: '❄️',
    indoorFireplace: '🔥',
    firepit: '🔥🪵',
    outdoorDining: '🍽️🌿',
    bbq: '🍖',
    smokeAlarm: '🚨',
    coAlarm: '🚨',
    fireExtinguisher: '🧯',
    firstAid: '⛑️',
    hostGreets: '🙋🤝',
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
    {
      key: 'main',
      src: fullVillaImage,
      alt: photoSectionsText.exterior || 'Exterior',
      sectionKey: 'exterior',
      imageIndex: 0,
    },
    {
      key: 'entry',
      src: exteriorEntryImage,
      alt: photoSectionsText.additional || 'Additional photos',
      sectionKey: 'exterior',
      imageIndex: 2,
    },
    {
      key: 'living',
      src: sofaImage,
      alt: photoSectionsText.livingRoom || 'Living room',
      sectionKey: 'living-room',
      imageIndex: 0,
    },
    {
      key: 'pool',
      src: poolMainImage,
      alt: photoSectionsText.pool || 'Pool',
      sectionKey: 'pool',
      imageIndex: 0,
    },
    {
      key: 'dining',
      src: diningImage,
      alt: photoSectionsText.diningArea || 'Dining area',
      sectionKey: 'dining',
      imageIndex: 0,
    },
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
      images: [fullVillaImage, omVillaImage, exteriorEntryImage, exteriorImage1, exteriorImage2, exteriorImage3, exteriorImage4, exteriorImage5, exteriorImage6, exteriorImage7, exteriorImage8, exteriorImage9, exteriorImage10, exteriorImage11, exteriorImage12, exteriorImage13, balconyImage, birdViewImage],
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

  useEffect(() => {
    setPhotoZoom(1)
  }, [selectedPhotoIndex])

  useEffect(() => {
    if (selectedPhotoIndex === null) return

    const handleWheel = (event) => {
      if (!event.ctrlKey) return
      event.preventDefault()
      
      // Beregn musepositionen relative til bildecontaineren
      if (photoImageWrapRef.current) {
        const rect = photoImageWrapRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const xPercent = (x / rect.width) * 100
        const yPercent = (y / rect.height) * 100
        setPhotoZoomOrigin(`${xPercent}% ${yPercent}%`)
      }
      
      const zoomSpeed = 0.22
      const delta = event.deltaY > 0 ? -zoomSpeed : zoomSpeed
      const newZoom = Math.max(1, photoZoom + delta)
      setPhotoZoom(Math.min(newZoom, 3))
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    return () => document.removeEventListener('wheel', handleWheel)
  }, [selectedPhotoIndex, photoZoom])

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

  const getLightboxIndexBySection = (sectionKey, sectionImageIndex) => {
    let runningIndex = 0

    for (const section of photoSections) {
      if (section.groups) {
        const groupImageCount = section.groups.reduce((sum, group) => sum + group.images.length, 0)

        if (section.key === sectionKey) {
          return runningIndex + sectionImageIndex
        }

        runningIndex += groupImageCount
      } else {
        if (section.key === sectionKey) {
          return runningIndex + sectionImageIndex
        }

        runningIndex += section.images.length
      }
    }

    return null
  }

  const handleOpenFromCollage = (sectionKey, sectionImageIndex) => {
    const photoIndex = getLightboxIndexBySection(sectionKey, sectionImageIndex)
    if (photoIndex === null || photoIndex < 0 || photoIndex >= photoLightboxImages.length) return

    setSelectedPhotoIndex(photoIndex)
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
    // Handle swipe
    photoTouchStartX.current = event.changedTouches[0]?.clientX ?? null
    
    // Handle pinch-zoom
    if (event.touches.length === 2) {
      const touch1 = event.touches[0]
      const touch2 = event.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      photoTouchStartDistance.current = distance
      event.preventDefault()
    }
  }

  const handlePhotoTouchEnd = (event) => {
    // Handle pinch-zoom
    if (event.touches.length === 2) {
      const touch1 = event.touches[0]
      const touch2 = event.touches[1]
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      )
      
      if (photoTouchStartDistance.current !== null) {
        const ratio = distance / photoTouchStartDistance.current
        const newZoom = Math.max(1, photoZoom * ratio)
        setPhotoZoom(Math.min(newZoom, 3))
        event.preventDefault()
      }
      photoTouchStartDistance.current = null
      return
    }
    
    // Handle swipe
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
        </section>

        <section className="page-section page-section--bottom about-section about-section--faq">
          <div className="page-wide">
            <section className="about-photo-card" aria-label={photoTourTitle}>
              <h3 className="about-photo-title">{photoTourTitle}</h3>

              <div className="about-photo-collage">

                <figure className="about-photo-main">
                  <button
                    type="button"
                    className="about-photo-collage-button"
                    onClick={() => handleOpenFromCollage(collageImages[0].sectionKey, collageImages[0].imageIndex)}
                    aria-label={collageImages[0].alt}
                  >
                    <img src={collageImages[0].src} alt={collageImages[0].alt} className="about-photo-image" />
                  </button>
                </figure>

                <div className="about-photo-side-grid">
                  {collageImages.slice(1).map((item, index) => (
                    <figure key={item.key} className="about-photo-side-item">
                      <button
                        type="button"
                        className="about-photo-collage-button"
                        onClick={() => handleOpenFromCollage(item.sectionKey, item.imageIndex)}
                        aria-label={item.alt}
                      >
                        <img src={item.src} alt={item.alt} className="about-photo-image" />
                      </button>
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

            {/* Lukk section før showAllPhotos starter */}


            {showAllPhotos && createPortal(
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
                    <button type="button" className="about-photo-modal-close" onClick={handleCloseAllPhotos} aria-label={photoClose}>
                      <img src={closeIcon} alt="" className="about-photo-modal-close-icon" />
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
              </div>,
              document.body
            )}

            {selectedPhoto && createPortal(
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
                      <span>{selectedPhotoIndex + 1}/{photoLightboxImages.length}<span className="about-photo-lightbox-meta-label-inline"> · {selectedPhoto.label}</span></span>
                    </div>
                    <button type="button" className="about-photo-modal-close" onClick={handleCloseSelectedPhoto} aria-label={photoClose}>
                      <img src={closeIcon} alt="" className="about-photo-modal-close-icon" />
                    </button>
                  </header>

                  <div
                    className="about-photo-lightbox-image-wrap"
                    ref={photoImageWrapRef}
                    onTouchStart={handlePhotoTouchStart}
                    onTouchEnd={handlePhotoTouchEnd}
                  >
                    <button
                      type="button"
                      className="about-photo-lightbox-arrow about-photo-lightbox-arrow--prev"
                      onClick={showPreviousPhoto}
                      aria-label={photoPrevious}
                    >
                      <img src={arrowLeft} alt="" className="about-photo-lightbox-arrow-icon" />
                    </button>


                    <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="about-photo-lightbox-image" style={{ transform: `scale(${photoZoom})`, transformOrigin: photoZoomOrigin }} />

                    <button
                      type="button"
                      className="about-photo-lightbox-arrow about-photo-lightbox-arrow--next"
                      onClick={showNextPhoto}
                      aria-label={photoNext}
                    >
                      <img src={arrowRight} alt="" className="about-photo-lightbox-arrow-icon" />
                    </button>

                    <div className="about-photo-mobile-pill" aria-hidden="true">
                      <span className="about-photo-mobile-swipe">
                        <img src={arrowLeft} alt="" className="about-photo-mobile-swipe-icon" />
                        <span>{texts?.gallerySwipeHint ?? 'Swipe'}</span>
                        <img src={arrowRight} alt="" className="about-photo-mobile-swipe-icon" />
                      </span>
                      <span className="about-photo-mobile-zoom">🔍☝️ Zoom</span>
                    </div>
                  </div>

                </section>
              </div>,
              document.body
            )}

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
              <h3 className="about-map-title">{texts.about.locationTitle ?? 'Location'}</h3>
              <div className="about-map-container">
                <button
                  type="button"
                  className="about-map-expand-button"
                  onClick={() => setIsMapExpanded(true)}
                  aria-label={texts.about.mapExpandButton ?? 'Forstørr kart'}
                >
                  🔍 {texts.about.mapExpandButton ?? 'Forstørr kart'}
                </button>
                <iframe
                  src={embeddedMapUrl}
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

            {isMapExpanded && createPortal(
              <div
                className="about-map-modal-backdrop"
                onClick={() => setIsMapExpanded(false)}
              >
                <div
                  className="about-map-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="about-map-modal-close"
                    onClick={() => setIsMapExpanded(false)}
                    aria-label={texts.about.mapCloseLabel ?? 'Close map'}
                  >
                    ✕
                  </button>
                  <iframe
                    src={embeddedMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Villa Las Chicas Location Expanded"
                  ></iframe>
                </div>
              </div>,
              document.body
            )}

            {/* FAQ section */}
            <div className="page-faq-header">
              <p className="page-eyebrow">{texts.about.faqEyebrow ?? 'FAQ'}</p>
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

                <div className="about-info-block">
                  <h4 className="about-info-subtitle">{texts.about.overviewTitle ?? 'Om villaen'}</h4>
                  <ul className="about-info-bullet-list">
                    {[texts.about.text1, texts.about.textrooms, texts.about.text2, texts.about.extraText]
                      .filter(Boolean)
                      .map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                  </ul>
                </div>

                {texts.about.transportInfoTitle ? (
                  <div className="about-info-block">
                    <h4 className="about-info-subtitle">{texts.about.transportInfoTitle}</h4>
                    <ul className="about-info-bullet-list">
                      {(texts.about.transportInfo ?? []).map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {texts.about.servicesTitle ? (
                  <div className="about-info-block">
                    <h4 className="about-info-subtitle">{texts.about.servicesTitle}</h4>
                    <ul className="about-info-bullet-list">
                      {(texts.about.serviceHighlights ?? []).map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {(texts.about.distances ?? []).length > 0 ? (
                  <div className="about-distance-wrap">
                    <h4 className="about-info-subtitle">{texts.about.distancesTitle ?? 'Avstander'}</h4>
                    <div className="about-distance-grid">
                      {texts.about.distances.map((item) => (
                        <div key={item.label} className="about-distance-item">
                          <span className="about-distance-label">{item.label}</span>
                          <span className="about-distance-value">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {texts.about.managementNote ? (
                  <p className="page-faq-answer page-faq-answer--compact">{texts.about.managementNote}</p>
                ) : null}

                <h4 className="about-info-subtitle">{texts.about.videoSectionTitle ?? 'Video'}</h4>
                <p className="page-faq-answer page-faq-answer--video">{texts.about.videoInfoText}</p>
                <div className="about-video-embed-wrap">
                  {isVideoLoaded ? (
                    <iframe
                      className="about-video-embed"
                      src={embeddedVideoUrl}
                      title="Villa Las Chicas Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <button
                      type="button"
                      className="about-video-preview"
                      onClick={() => setIsVideoLoaded(true)}
                      aria-label={texts.about.videoSectionTitle ?? 'Play video'}
                    >
                      <img
                        src={youtubeOverlayImage}
                        alt="Villa Las Chicas video preview"
                        className="about-video-preview-image"
                      />
                      <span className="about-video-preview-play" aria-hidden="true">
                        <span className="about-video-preview-play-icon"></span>
                      </span>
                    </button>
                  )}
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