import { BrandMark } from "../ui/BrandMark";
import { LiveClock } from "./LiveClock";
import { siteConfig } from "../../_data/site";

export function TopBar() {
  return (
    <header className="topbar">
      <BrandMark />
      <div className="status">
        <span className="pulse" /> {siteConfig.status}
      </div>
      <LiveClock />
      <div className="edition" aria-label="Site edition">
        {siteConfig.edition}
      </div>
    </header>
  );
}
