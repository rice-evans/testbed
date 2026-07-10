import { X } from 'lucide-react';

// A single-image viewer for timeline "attachment" chips (Certificates, Education,
// Experience, Events). Deliberately reuses the same visual language as the media
// gallery lightbox (see Media.jsx / .lightbox styles) but with no prev/next arrows —
// there's only ever one attachment open at a time — and the attachment's label is
// shown underneath as the caption instead of a photo caption.
const AttachmentLightbox = ({ attachment, onClose }) => {
  if (!attachment) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <button
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close attachment"
      >
        <X size={20} strokeWidth={2.5} />
      </button>

      <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <img
          src={attachment.url}
          alt={attachment.label}
          className="lightbox__img"
          decoding="async"
        />
        {attachment.label && (
          <p className="lightbox__caption">{attachment.label}</p>
        )}
      </div>
    </div>
  );
};

export default AttachmentLightbox;
