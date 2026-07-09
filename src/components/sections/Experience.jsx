// Add, remove, or edit entries here — newest first.
const JOBS = [
  {
    role: 'Job Title',
    company: 'Company Name',
    dates: '2023 — Present',
    location: 'City, Country',
    points: [
      'A concrete accomplishment or responsibility, written as one clear sentence.',
      'A second highlight — a metric, a shipped project, a team you led.'
    ]
  },
  {
    role: 'Previous Job Title',
    company: 'Previous Company',
    dates: '2020 — 2023',
    location: 'City, Country',
    points: ['What you owned in this role and what came of it.']
  }
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
