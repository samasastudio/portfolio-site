"use client";

import { useEffect, useState } from "react";

export function useClock(timeZone = "America/Chicago"): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();

    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return time;
}
