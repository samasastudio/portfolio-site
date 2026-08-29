import { ProfileIntro } from "./_components/ProfileIntro";
import { Manifesto } from "./_components/Manifesto";
import { CapabilityMap } from "./_components/CapabilityMap";
import { ToolsWall } from "./_components/ToolsWall";

export default function ProfilePage() {
  return (
    <section className="profile-grid">
      <ProfileIntro />
      <Manifesto />
      <CapabilityMap />
      <ToolsWall />
    </section>
  );
}
