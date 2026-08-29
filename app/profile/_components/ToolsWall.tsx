import { profileData } from "../_data";

export function ToolsWall() {
  const { label, tools } = profileData.workingSet;

  return (
    <div className="tools">
      <small>{label}</small>
      <p>{tools}</p>
    </div>
  );
}
