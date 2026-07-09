// Add, remove, or edit entries here — newest first.
const EVENTS = [
  {
    name: 'Event or Conference Name',
    role: 'Speaker — "Talk title goes here"',
    dates: 'Mar 2025',
    location: 'City, Country'
  }
];

const Events = () => {
  return (
    <ol className="timeline">
      {EVENTS.map((e, i) => (
        <li className="timeline__entry" key={`${e.name}-${i}`}>
          <div className="timeline__when">{e.dates}</div>
          <div className="timeline__main">
            <h3 className="timeline__title">{e.name}</h3>
            <p className="timeline__subtitle">
              {e.role} <span className="timeline__loc">· {e.location}</span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Events;
