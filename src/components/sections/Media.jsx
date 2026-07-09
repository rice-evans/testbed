import { useState, useEffect, lazy, Suspense } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Masonry pulls in GSAP, which is only needed once someone actually opens the "view more"
// gallery — code-split it out of the main bundle so it's not downloaded/parsed on first load.
const Masonry = lazy(() => import('../Masonry'));

// `thumb` is a small, heavily-compressed version used everywhere photos are shown small (the
// grid and the masonry wall). `img` is the larger version, only ever loaded when a photo is
// opened full-size in the lightbox — so a visitor who never opens the gallery never downloads it.
const PREVIEW_PHOTOS = [
  { id: "1", thumb: "/Gallery1-thumb.webp", img: "/Gallery1.webp" },
  { id: "2", thumb: "/Gallery2-thumb.webp", img: "/Gallery2.webp" },
  { id: "3", thumb: "/Gallery3-thumb.webp", img: "/Gallery3.webp" },
  { id: "4", thumb: "/Gallery4-thumb.webp", img: "/Gallery4.webp" },
  { id: "5", thumb: "/Gallery5-thumb.webp", img: "/Gallery5.webp" },
  { id: "6", thumb: "/Gallery6-thumb.webp", img: "/Gallery6.webp" },
];

const MASONRY_ITEMS = [
  { id: "m1", thumb: "/Gallery1-thumb.webp", img: "/Gallery1.webp", url: "#", height: 450 },
  { id: "m2", thumb: "/Gallery2-thumb.webp", img: "/Gallery2.webp", url: "#", height: 320 },
  { id: "m3", thumb: "/Gallery3-thumb.webp", img: "/Gallery3.webp", url: "#", height: 500 },
  { id: "m4", thumb: "/Gallery4-thumb.webp", img: "/Gallery4.webp", url: "#", height: 380 },
  { id: "m5", thumb: "/Gallery5-thumb.webp", img: "/Gallery5.webp", url: "#", height: 550 },
  { id: "m6", thumb: "/Gallery6-thumb.webp", img: "/Gallery6.webp", url: "#", height: 300 },
  { id: "m7", thumb: "/Gallery7-thumb.webp", img: "/Gallery7.webp", url: "#", height: 480 },
  { id: "m8", thumb: "/Gallery8-thumb.webp", img: "/Gallery8.webp", url: "#", height: 340 },
  { id: "m9", thumb: "https://picsum.photos/id/1074/300/450?grayscale", img: "https://picsum.photos/id/1074/600/900?grayscale", url: "#", height: 460 },
];

const Media = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Tracks both the index AND which dataset ('preview' or 'masonry') is currently active
  const [lightbox, setLightbox] = useState({ index: null, source: null });

  useEffect(() => {
    if (isModalOpen || lightbox.index !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen, lightbox.index]);

  // Determine current active list and boundaries based on active source
  const currentArray = lightbox.source === 'masonry' ? MASONRY_ITEMS : PREVIEW_PHOTOS;
  const maxIndex = lightbox.source === 'masonry' ? 8 : 4; // 9 items vs 5 items

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: prev.index === 0 ? maxIndex : prev.index - 1
    }));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: prev.index === maxIndex ? 0 : prev.index + 1
    }));
  };

  // Intercepting click layouts inside custom external components 
  // If your Masonry item wrapper triggers default links, this overrides it cleanly
  const handleMasonryItemClick = (index, e) => {
    if (e) e.preventDefault();
    setLightbox({ index, source: 'masonry' });
  };

  return (
    <div className="section media-section">
      {/* Primary Landing Page Grid */}
      <div className="media-grid">
        {PREVIEW_PHOTOS.slice(0, 5).map((photo, index) => (
          <div 
            key={photo.id} 
            className="media-tile media-tile--clickable"
            onClick={() => setLightbox({ index, source: 'preview' })}
          >
            <img src={photo.thumb} alt={`Portfolio Media ${photo.id}`} loading="lazy" decoding="async" />
          </div>
        ))}

        {/* 6th Interactive Component Tile */}
        <div 
          className="media-tile media-tile--more" 
          onClick={() => setIsModalOpen(true)}
        >
          <img 
            src={PREVIEW_PHOTOS[5].thumb} 
            alt="View More Trigger Backdrop" 
            className="media-tile__blurred-img"
            loading="lazy"
            decoding="async"
          />
          <div className="media-tile__overlay">
            <span>View more</span>
          </div>
        </div>
      </div>

      {/* ---------- UNIFIED LIGHTBOX OVERLAY ---------- */}
      {lightbox.index !== null && (
        <div 
          className="lightbox" 
          onClick={() => setLightbox({ index: null, source: null })}
        >
          <button 
            className="lightbox__close" 
            onClick={() => setLightbox({ index: null, source: null })}
            aria-label="Close Lightbox"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          <button className="lightbox__arrow lightbox__arrow--left" onClick={handlePrev}>
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <img 
              src={currentArray[lightbox.index].img} 
              alt="Enlarged gallery view" 
              className="lightbox__img"
              decoding="async"
            />
          </div>

          <button className="lightbox__arrow lightbox__arrow--right" onClick={handleNext}>
            <ChevronRight size={28} />
          </button>
        </div>
      )}

      {/* Dynamic GSAP Masonry Portal Sheet */}
      <div className={`masonry-modal ${isModalOpen ? 'masonry-modal--open' : ''}`}>
        <button 
          className="masonry-modal__close" 
          onClick={() => setIsModalOpen(false)}
          aria-label="Close Gallery"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
        
        <div className="masonry-modal__content">
          <h2 className="masonry-modal__title">Media Gallery</h2>
          {isModalOpen && (
            <Suspense fallback={null}>
              <Masonry
                /* Masonry renders `img` as the tile's background — pass the small thumb here so
                   the wall itself stays cheap; the full-res version is only fetched if a tile is
                   opened in the lightbox (see handleMasonryItemClick, which reads from
                   MASONRY_ITEMS). */
                items={MASONRY_ITEMS.map((item, idx) => ({
                  ...item,
                  img: item.thumb,
                  onClick: (e) => handleMasonryItemClick(idx, e)
                }))}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
              />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default Media;
