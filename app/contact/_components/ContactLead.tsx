import { contactData } from "../_data";

export function ContactLead() {
  const { subtitle, heading, emphasis } = contactData.lead;

  return (
    <div className="contact-lead">
      <small>{subtitle}</small>
      <h1>
        {heading.map((line, idx) => (
          <span key={idx}>
            {line}
            <br />
          </span>
        ))}
        <em>{emphasis}</em>
      </h1>
    </div>
  );
}
