import { profileData } from "../_data";

export function CapabilityMap() {
  const { capabilities, centerBadge } = profileData;

  return (
    <div className="capability-map" aria-label="Three-part capability map">
      {capabilities.map((cap) => (
        <div key={cap.n} className={cap.className}>
          <small>{cap.n}</small>
          <strong>
            {cap.strong[0]}
            <br />
            {cap.strong[1]}
          </strong>
          <span>{cap.span}</span>
        </div>
      ))}
      <div className="map-center">
        {centerBadge.symbol}
        <br />
        {centerBadge.name}
      </div>
    </div>
  );
}
