// Add, remove, or edit entries here — newest first.
const SCHOOLS = [
  {
    school: 'University Name',
    degree: 'Degree, Field of Study',
    dates: '2016 — 2020',
    notes: 'Relevant coursework, honors, or activities.'
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
            {s.notes && <p className="timeline__note">{s.notes}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Education;
