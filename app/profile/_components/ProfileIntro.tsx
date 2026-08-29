import { profileData } from "../_data";

export function ProfileIntro() {
  const { subtitle, headingLines, emphasis } = profileData.intro;
  return (
    <div className="profile-intro">
      <small>{subtitle}</small>
      <h1>
        {headingLines.map((line, idx) => (
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
