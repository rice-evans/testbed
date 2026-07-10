import { useState } from 'react';
import { Paperclip } from 'lucide-react';
import AttachmentLightbox from '../AttachmentLightbox.jsx';

// Add, remove, or edit entries here — newest first.
// attachments: optional array of { label, url } — shown as small linked chips below the entry.
const CERTS = [
  {
    name: 'Medical Certificate 3rd Class',
    issuer: 'Federal Aviation Administration',
    dates: 'December 2024',
    attachments: [
      // { label: 'Certificate PDF', url: '/attachments/faa-medical.pdf' },
    ]
  },
  {
    name: '5th Place - TSL Essay Competition',
    issuer: 'Trust for Sustainable Living',
    dates: 'July 2025',
    attachments: [
      { label: 'TSL Certificate', url: '/attachments/TSL-5th-Place.jpg' }
    ]
  },
  {
    name: 'Silver Award - Senior BPhO',
    issuer: 'British Physics Olympiad',
    dates: 'Feb 2025',
    attachments: []
  },
  {
    name: '5th Place - TSL Essay Competition',
    issuer: 'Trust for Sustainable Living',
    dates: 'May 2025',
    attachments: []
  },
  {
    name: "Silver Award - DOfE",
    issuer: "The Duke of Edinburgh's International Award",
    dates: 'Feb 2025',
    attachments: []
  },
  {
    name: "Bronze Award - DOfE",
    issuer: "The Duke of Edinburgh's International Award",
    dates: 'Jan 2025',
    attachments: []
  },
  {
    name: "Top 100 - Pivotal Contest",
    issuer: "Pivotal Contests 2024 Essay Competition",
    dates: 'Aug 2024',
    attachments: []
  }
];

const Certificates = () => {
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <>
      <ol className="timeline">
        {CERTS.map((c, i) => (
          <li className="timeline__entry" key={`${c.name}-${i}`}>
            <div className="timeline__when">{c.dates}</div>
            <div className="timeline__main">
              <h3 className="timeline__title">{c.name}</h3>
              <p className="timeline__subtitle">{c.issuer}</p>
              {c.credentialId && <p className="timeline__note">{c.credentialId}</p>}
              {c.attachments?.length > 0 && (
                <div className="timeline__attachments">
                  {c.attachments.map((a, j) => (
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

export default Certificates;
