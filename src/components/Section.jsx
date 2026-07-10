const Section = ({ id, index, eyebrow, title, children, register, noEyebrow = false, variant, attachments }) => {
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

      {/* Global Attachment Layer: Automatically grabs and renders chip elements if passed */}
      {attachments && attachments.length > 0 && (
        <div className="section__attachments">
          {attachments.map((file, i) => (
            <a 
              key={i} 
              href={file.url} 
              className="attachment-chip" 
              download
              target="_blank" 
              rel="noreferrer"
            >
              {/* Optional Paperclip SVG code can go right here */}
              <span>{file.name}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Section;
