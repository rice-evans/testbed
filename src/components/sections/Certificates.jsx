// Add, remove, or edit entries here — newest first.
const CERTS = [
  {
    name: 'Certificate Name',
    issuer: 'Issuing Organization',
    dates: 'Issued Jan 2025',
    credentialId: 'Credential ID (optional)'
  }
];

const Certificates = () => {
  return (
    <ol className="timeline">
      {CERTS.map((c, i) => (
        <li className="timeline__entry" key={`${c.name}-${i}`}>
          <div className="timeline__when">{c.dates}</div>
          <div className="timeline__main">
            <h3 className="timeline__title">{c.name}</h3>
            <p className="timeline__subtitle">{c.issuer}</p>
            {c.credentialId && <p className="timeline__note">{c.credentialId}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Certificates;
