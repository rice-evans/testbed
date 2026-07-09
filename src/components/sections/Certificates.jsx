// Add, remove, or edit entries here — newest first.
const CERTS = [
  {
    name: 'Medical Certificate 3rd Class',
    issuer: 'Federal Aviation Administration',
    dates: 'December 2024',
  },

  {
    name: '5th Place - TSL Essay Competition',
    issuer: 'Trust for Sustainable Living',
    dates: 'May 2025',
  },

{
    name: 'Silver Award - Senior BPhO',
    issuer: 'British Physics Olympiad',
    dates: 'Feb 2025',
  },

{
    name: '5th Place - TSL Essay Competition',
    issuer: 'Trust for Sustainable Living',
    dates: 'May 2025',
  },

{
    name: "Silver Award - DOfE",
    issuer: "The Duke of Edinburgh's International Award",
    dates: 'Feb 2025',
  },

{
    name: "Bronze Award - DOfE",
    issuer: "The Duke of Edinburgh's International Award",
    dates: 'Jan 2025',
  },

{
    name: "Top 100 - Pivotal Contest",
    issuer: "Pivotal Contests 2024 Essay Competition",
    dates: 'Aug 2024',
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
