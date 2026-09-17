import { siteConfig } from "../../_data/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <span>
        © {siteConfig.copyrightYear} / {siteConfig.copyrightHolder}
      </span>
      <span className="ticker">{siteConfig.tickerText}</span>
      <a
        href={siteConfig.linkedinUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn profile (opens in new window)"
      >
        LI ↗
      </a>
    </footer>
  );
}
