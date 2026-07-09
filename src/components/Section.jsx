const Section = ({ id, index, eyebrow, title, children, register, noEyebrow = false, variant }) => {
  return (
    <section
      id={id}
      ref={el => register(id, el)}
      className={`section${noEyebrow ? ' section--flush' : ''}${variant ? ` section--${variant}` : ''}`}
    >
      {!noEyebrow && (
        <div className="section__head">
          <span className="section__eyebrow">
            <span className="section__eyebrow-index">{index}</span>
            {eyebrow}
          </span>
        </div>
      )}
      {title && <h2 className="section__title">{title}</h2>}
      <div className="section__body">{children}</div>
    </section>
  );
};

export default Section;
