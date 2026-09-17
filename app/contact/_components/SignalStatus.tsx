import { contactData } from "../_data";

export function SignalStatus() {
  const { statusText, badge, availability, location, focus } = contactData.signal;

  return (
    <div className="signal">
      <div className="signal-top">
        <span className="signal-badge">{badge}</span>
        <span className="signal-indicator">
          <i /> {statusText}
        </span>
      </div>
      <div className="signal-body">
        <strong>{availability}</strong>
        <div className="signal-meta">
          <div className="signal-row">
            <small>LOCATION</small>
            <span>{location}</span>
          </div>
          <div className="signal-row">
            <small>FOCUS</small>
            <span>{focus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
