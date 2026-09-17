import { profileData } from "../_data";

export function ToolsWall() {
  const { label, groups } = profileData.workingSet;

  return (
    <div className="tools">
      <div className="tools-top">
        <small>{label}</small>
        <span className="tools-spec">STACK SPECIFICATION</span>
      </div>
      <div className="tools-list">
        {groups.map((group) => (
          <div key={group.discipline} className="tool-row">
            <span className="tool-discipline">{group.discipline}</span>
            <p className="tool-items">{group.stack}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
