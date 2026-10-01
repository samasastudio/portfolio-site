import { siteConfig } from "../../_data/site";

export function BrandEmblem() {
  return (
    <div className="brand-field">
      <div className="brand-header">
        <span className="brand-glyph" aria-hidden="true">✦</span>
        <span className="brand-caption brand-caption-top">
          SAM ASA JOHNSON<br />
          FOLIO RECORD · 2026
        </span>
      </div>
      <div className="brand-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.snakeMarkImage}
          alt="Monolith datacenter towers rising in a desert landscape under a radiating sun with saguaro cacti and lightning strikes in a bold linocut style"
        />
      </div>
      <div className="brand-footer">
        <span className="brand-caption brand-caption-bottom">
          AUSTIN, TEXAS<br />
          30.2672° N, 97.7431° W
        </span>
        <span className="brand-glyph" aria-hidden="true">✦</span>
      </div>
    </div>
  );
}
