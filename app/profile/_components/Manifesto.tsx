import { profileData } from "../_data";

export function Manifesto() {
  return (
    <div className="manifesto">
      {profileData.manifesto.paragraphs.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
    </div>
  );
}
