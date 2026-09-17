import { profileData } from "../_data";

export function CapabilityMap() {
  const { capabilities, stampBadge } = profileData;

  return (
    <div className="capability-map" aria-label="Three-part capability map">
      <div className="cap-top">
        <small>ARCHITECTURAL DISCIPLINES</small>
        <div className="cap-stamp">
          {stampBadge.symbol} {stampBadge.name}
        </div>
      </div>
      <div className="cap-columns">
        {capabilities.map((cap) => (
          <div key={cap.n} className={cap.className}>
            <div className="cap-meta">
              <small>{cap.n}</small>
              <span className="cap-cat">{cap.category}</span>
            </div>
            <strong>
              {cap.strong[0]} {cap.strong[1]}
            </strong>
            <p>{cap.span}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
