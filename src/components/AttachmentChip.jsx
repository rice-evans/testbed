import { Paperclip } from 'lucide-react';

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

// Renders one attachment pill. Image attachments (jpg/png/webp/...) open in the
// shared in-page lightbox, matching the media gallery. Everything else (PDFs, etc.)
// opens/downloads the normal browser way, since a single flat image can't display
// a multi-page document.
const AttachmentChip = ({ attachment, onOpen }) => {
  const isImage = IMAGE_EXT.test(attachment.url);

  if (isImage) {
    return (
      <button
        type="button"
        className="attachment-chip"
        onClick={() => onOpen(attachment)}
      >
        <Paperclip size={11} strokeWidth={2} />
        {attachment.label}
      </button>
    );
  }

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="attachment-chip"
    >
      <Paperclip size={11} strokeWidth={2} />
      {attachment.label}
    </a>
  );
};

export default AttachmentChip;
