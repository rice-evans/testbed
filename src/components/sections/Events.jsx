import { useState } from 'react';
import { Paperclip } from 'lucide-react';
import AttachmentLightbox from '../AttachmentLightbox.jsx';

// Add, remove, or edit entries here — newest first.
// attachments: optional array of { label, url } — shown as small linked chips below the entry.
const EVENTS = [
  {
    name: 'Event or Conference Name',
    role: 'Speaker — "Talk title goes here"',
    dates: 'Mar 2025',
    location: 'City, Country',
    attachments: [
      // { label: 'Slides', url: '/attachments/talk-slides.pdf' },
    ]
  }
];

const Events = () => {
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <>
      <ol className="timeline">
        {EVENTS.map((e, i) => (
          <li className="timeline__entry" key={`${e.name}-${i}`}>
            <div className="timeline__when">{e.dates}</div>
            <div className="timeline__main">
              <h3 className="timeline__title">{e.name}</h3>
              <p className="timeline__subtitle">
                {e.role} <span className="timeline__loc">· {e.location}</span>
              </p>
              {e.attachments?.length > 0 && (
                <div className="timeline__attachments">
                  {e.attachments.map((a, j) => (
                    <button 
                      key={j} 
                      onClick={() => setActiveDoc(a)} 
                      className="attachment-chip"
                    >
                      <Paperclip size={11} strokeWidth={2} />
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      <AttachmentLightbox attachment={activeDoc} onClose={() => setActiveDoc(null)} />
    </>
  );
};

export default Events;
