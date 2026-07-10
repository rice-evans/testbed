import { useState } from 'react';
import AttachmentChip from '../AttachmentChip.jsx';
import AttachmentLightbox from '../AttachmentLightbox.jsx';

// Add, remove, or edit entries here — newest first.
// attachments: optional array of { label, url } — shown as small linked chips below the entry.
const SCHOOLS = [
  {
    school: "43 Flight School, South Africa",
    degree: "Integrated Airline Transport Pilots License (iATPL)",
    dates: "2026 — 2027",
    notes: [
      "Attending 43 Flight School, South Africa in November 2026 for iATPL Pilot Training."
    ],
    attachments: [
      // { label: 'Enrolment Letter', url: '/attachments/43-enrolment.pdf' },
    ]
  },
  {
    school: 'Marlborough College Malaysia',
    degree: 'International Baccalaureate & IGCSE',
    dates: '2021 — 2026',
    notes: [
      'Hundred (Year 10) - Upper Sixth (Year 13)',
      'School Prefect & Deputy Head of House',
      'Peer Mentor',
      'Part-Time Tennis Coach for Pre-Prep & Prep students',
      'Winner, Lectern Club (School public speaking competition)',
      '3× Housemaster\'s Commendations',
      'Senior School Choir',
      'Senior School Chamber Choir',
      '1st Team Tennis',
      "Duke of Edinburgh's International Award – Bronze, Silver & Gold",
      "Participated in and helped plan school charity events, raising funds for the Rotary Orphanage and Kechara Soup Kitchen"
    ],
    attachments: [
      // { label: 'IB Transcript', url: '/attachments/ib-transcript.pdf' },
    ]
  }
];

const Education = () => {
  const [openAttachment, setOpenAttachment] = useState(null);

  return (
    <ol className="timeline">
      {SCHOOLS.map((s, i) => (
        <li className="timeline__entry" key={`${s.school}-${i}`}>
          <div className="timeline__when">{s.dates}</div>
          <div className="timeline__main">
            <h3 className="timeline__title">{s.school}</h3>
            <p className="timeline__subtitle">{s.degree}</p>
            {s.notes && s.notes.length > 0 && (
              <ul className="timeline__notes-list">
                {s.notes.map((note, index) => (
                  <li key={index} className="timeline__note">{note}</li>
                ))}
              </ul>
            )}
            {s.attachments?.length > 0 && (
              <div className="timeline__attachments">
                {s.attachments.map((a, j) => (
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

export default Education;
