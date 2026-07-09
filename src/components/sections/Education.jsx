// Add, remove, or edit entries here — newest first.
const SCHOOLS = [
  // --- YOUR NEW SCHOOL GOES HERE ---
  {
    school: "43 Flight School, South Africa",
    degree: "Integrated Airline Transport Pilots License (iATPL)",
    dates: "2026 — 2027",
    notes: [
      "Attending 43 Flight School, South Africa in November 2026 for iATPL Pilot Training."
    ]
  }, // <--- THIS COMMA IS IMPORTANT! It separates the two school blocks.
  
  {
    school: 'Marlborough College Malaysia',
    degree: 'International Baccalaureate & IGCSE', 
    dates: '2021 — 2026',
    // 1. Change notes from a string ('') to an array of strings ([])
    notes: [
      'Hundred (Year 10) - Upper Sixth (Year 13)',
      'School Prefect & Deputy Head of House',
      'Peer Mentor',
      'Part-Time Tennis Coach for Pre-Prep & Prep students',
      'Winner, Lectern Club (School public speaking competition)',
      '3× Housemaster’s Commendations',
      'Senior School Choir',
      'Senior School Chamber Choir',
      '1st Team Tennis',
      "Duke of Edinburgh’s International Award – Bronze, Silver & Gold",
      "Participated in and helped plan school charity events, raising funds for the Rotary Orphanage and Kechara Soup Kitchen"
    ]
  }
];

const Education = () => {
  return (
    <ol className="timeline">
      {SCHOOLS.map((s, i) => (
        <li className="timeline__entry" key={`${s.school}-${i}`}>
          <div className="timeline__when">{s.dates}</div>
          <div className="timeline__main">
            <h3 className="timeline__title">{s.school}</h3>
            <p className="timeline__subtitle">{s.degree}</p>
            
            {/* 2. Map through the notes array to create bullet points */}
            {s.notes && s.notes.length > 0 && (
              <ul className="timeline__notes-list">
                {s.notes.map((note, index) => (
                  <li key={index} className="timeline__note">{note}</li>
                ))}
              </ul>
            )}
            
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Education;
