import { X } from 'lucide-react';

const AttachmentLightbox = ({ attachment, onClose }) => {
  if (!attachment) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__stage" onClick={e => e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose} aria-label="Close document">
          <X size={20} strokeWidth={2.5} />
        </button>
        <iframe 
          src={attachment.url} 
          className="lightbox__pdf" 
          title={attachment.label}
        />
        <p className="lightbox__caption">{attachment.label}</p>
      </div>
    </div>
  );
};

export default AttachmentLightbox;
