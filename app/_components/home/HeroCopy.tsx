import { RoundLink } from "../ui/RoundLink";
import { siteConfig } from "../../_data/site";

export function HeroCopy() {
  return (
    <section className="hero-copy">
      <h1>
        Complex systems.<br />
        <em>Clear interfaces.</em><br />
        Grounded craft.
      </h1>
      <p className="hero-deck">
        Frontend-focused full-stack engineer in Austin, Texas. Turning dense domain rules into legible architecture, reliable systems, and software teams actually enjoy maintaining.
      </p>
      <div className="hero-index">
        <div className="hero-index-item">
          <small>ARCHITECTURE</small>
          <span>React · TypeScript · RSC</span>
        </div>
        <div className="hero-index-item">
          <small>DELIVERY</small>
          <span>Full-Stack · Node · SQL</span>
        </div>
        <div className="hero-index-item">
          <small>PRACTICE</small>
          <span>DX · Design Systems · AI</span>
        </div>
      </div>
      <RoundLink href="/work">
        Explore<br />
        the archive
      </RoundLink>
    </section>
  );
}
