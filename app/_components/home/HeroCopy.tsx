import { RoundLink } from "../ui/RoundLink";
import { siteConfig } from "../../_data/site";

export function HeroCopy() {
  return (
    <section className="hero-copy">
      <h1>
        Complex systems.<br />
        <em>Grounded craft.</em>
      </h1>
      <p className="hero-deck">
        Frontend-focused full-stack engineer in Austin, Texas. Turning dense domain rules into legible architecture, reliable systems, and software teams actually enjoy maintaining.
      </p>
      <div className="hero-index">
        <div className="hero-index-item">
          <small>FOCUS</small>
          <span>Frontend architecture & full-stack data workflows</span>
        </div>
        <div className="hero-index-item">
          <small>ORIGIN</small>
          <span>Austin, Texas · Available for select engagements</span>
        </div>
      </div>
      <RoundLink href="/work">
        Explore<br />
        the archive
      </RoundLink>
    </section>
  );
}
