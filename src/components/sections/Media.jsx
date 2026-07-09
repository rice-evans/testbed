import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Masonry from '../Masonry';

const PREVIEW_PHOTOS = [
  { id: "1", img: "/Gallery1.jpeg" },
  { id: "2", img: "/Gallery2.jpg" },
  { id: "3", img: "Gallery3.jpg" },
  { id: "4", img: "Gallery4.jpg" },
  { id: "5", img: "Gallery5.JPG" },
  { id: "6", img: "Gallery6.jpg" },
];

const MASONRY_ITEMS = [
  { id: "m1", img: "/Gallery1.jpeg", url: "#", height: 450 },
  { id: "m2", img: "/Gallery2.jpg", url: "#", height: 320 },
  { id: "m3", img: "Gallery3.jpg", url: "#", height: 500 },
  { id: "m4", img: "Gallery4.jpg", url: "#", height: 380 },
  { id: "m5", img: "Gallery5.JPG", url: "#", height: 550 },
  { id: "m6", img: "Gallery6.jpg", url: "#", height: 300 },
  { id: "m7", img: "Gallery7.jpeg", url: "#", height: 480 },
  { id: "m8", img: "Gallery8.jpg", url: "#", height: 340 },
  { id: "m9", img: "https://picsum.photos/id/1074/600/900?grayscale", url: "#", height: 460 },
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
            <img src={photo.img} alt={`Portfolio Media ${photo.id}`} />
          </div>
        ))}

        {/* 6th Interactive Component Tile */}
        <div 
          className="media-tile media-tile--more" 
          onClick={() => setIsModalOpen(true)}
        >
          <img 
            src={PREVIEW_PHOTOS[5].img} 
            alt="View More Trigger Backdrop" 
            className="media-tile__blurred-img"
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
            <Masonry
              /* Pass mapped array where clicking items redirects into our Lightbox handler */
              items={MASONRY_ITEMS.map((item, idx) => ({
                ...item,
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Media;
