import { contactData } from "../_data";

export function ContactCopy() {
  return (
    <>
      <div className="contact-copy">
        <p>{contactData.body}</p>
        <a href={contactData.cta.url} target="_blank" rel="noreferrer">
          <span>{contactData.cta.label}</span>
          <b>{contactData.cta.linkText}</b>
        </a>
      </div>
      <div className="fineprint">
        {contactData.fineprint.map((line, idx) => (
          <span key={idx} className="fineprint-line">
            {line}
          </span>
        ))}
      </div>
    </>
  );
}
