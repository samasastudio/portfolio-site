import { siteConfig } from "../../_data/site";

export function BrandEmblem() {
  return (
    <div className="brand-field">
      <span className="brand-caption brand-caption-top">
        SAM ASA JOHNSON<br />
        FOLIO RECORD · 2026
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={siteConfig.snakeMarkImage}
        alt="Snake winding through a computer in a bold flash tattoo style"
      />
      <span className="brand-caption brand-caption-bottom">
        AUSTIN, TEXAS<br />
        30.2672° N, 97.7431° W
      </span>
    </div>
  );
}
