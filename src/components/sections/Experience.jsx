import { useState } from 'react';
import AttachmentChip from '../AttachmentChip.jsx';
import AttachmentLightbox from '../AttachmentLightbox.jsx';

// Add, remove, or edit entries here — newest first.
// attachments: optional array of { label, url } — shown as small linked chips below the entry.
const JOBS = [
  {
    role: 'Cadet Pilot',
    company: 'Asia Corporate Jet',
    dates: '2026 — Present',
    location: 'XSP, Singapore',
    points: [
      'Joined as the 1st Cadet Pilot At Asia Corporate Jet.',
      'Recieved sponsorship to attend 43 Air School to obtain my SACAA CPL and ATPLs.'
    ],
    attachments: [
      // { label: 'Offer Letter', url: '/attachments/acj-offer.pdf' },
    ]
  },
];

const Experience = () => {
  const [openAttachment, setOpenAttachment] = useState(null);

  return (
    <ol className="timeline">
      {JOBS.map((job, i) => (
        <li className="timeline__entry" key={`${job.company}-${i}`}>
          <div className="timeline__when">{job.dates}</div>
          <div className="timeline__main">
            <h3 className="timeline__title">{job.role}</h3>
            <p className="timeline__subtitle">
              {job.company} <span className="timeline__loc">· {job.location}</span>
            </p>
            {job.points?.length > 0 && (
              <ul className="timeline__points">
                {job.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            )}
            {job.attachments?.length > 0 && (
              <div className="timeline__attachments">
                {job.attachments.map((a, j) => (
                  <AttachmentChip key={j} attachment={a} onOpen={setOpenAttachment} />
                ))}
              </div>
            )}
          </div>
        </li>
      ))}

      <AttachmentLightbox attachment={openAttachment} onClose={() => setOpenAttachment(null)} />
    </ol>
  );
};

export default Experience;
