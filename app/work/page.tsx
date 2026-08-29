import { ProjectArchive } from "./_components/ProjectArchive";
import { projects, archiveTitle } from "./_data";

export default function WorkPage() {
  return (
    <ProjectArchive
      items={projects}
      subtitle={archiveTitle.subtitle}
      note={archiveTitle.note}
    />
  );
}
