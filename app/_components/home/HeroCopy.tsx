import { RoundLink } from "../ui/RoundLink";
import { siteConfig } from "../../_data/site";

export function HeroCopy() {
  return (
    <section className="hero-copy">
      <div className="eyebrow">
        <span>{siteConfig.role}</span>
        <span>{siteConfig.location}</span>
      </div>
      <h1>
        Wild<br />
        <em>ideas.</em><br />
        Clear systems.
      </h1>
      <p className="hero-deck">
        I turn complicated product and engineering problems into software people can understand, use, and keep building.
      </p>
      <div className="hero-index">
        <span>React / TypeScript</span>
        <span>Full-stack delivery</span>
        <span>Team enablement</span>
      </div>
      <RoundLink href="/work">
        Open the<br />
        work index
      </RoundLink>
    </section>
  );
}
