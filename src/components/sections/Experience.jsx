// Add, remove, or edit entries here — newest first.
const JOBS = [
  {
    role: 'Cadet Pilot',
    company: 'Asia Corporate Jet',
    dates: '2026 — Present',
    location: 'XSP, Singapore',
    points: [
      'Joined as the 1st Cadet Pilot At Asia Corporate Jet.',
      'Recieved sponsorship to attend 43 Air School to obtain my SACAA CPL and ATPLs.'
    ]
  },
];

const Experience = () => {
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
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Experience;
