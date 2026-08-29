"use client";

import { useClock } from "../../_hooks/useClock";
import { siteConfig } from "../../_data/site";

export function LiveClock() {
  const time = useClock(siteConfig.timeZone);

  return (
    <div className="place">
      {siteConfig.locationShort} <span>{time || "--:--"} CT</span>
    </div>
  );
}
