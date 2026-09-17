"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import type { ProjectItem } from "../../_types/project";

interface ProjectArchiveProps {
  items: ProjectItem[];
  subtitle: string;
  note: string;
}

export function ProjectArchive({ items, subtitle, note }: ProjectArchiveProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = items[active] || items[0];

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % items.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = items.length - 1;
    }

    if (nextIndex !== null) {
      setActive(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section className="work-grid">
      <div className="section-title">
        <small>{subtitle}</small>
        <h1>
          The<br />
          <em>working</em><br />
          archive.
        </h1>
        <p>{note}</p>
      </div>

      <div className="project-list" role="tablist" aria-label="Projects">
        {items.map((item, i) => (
          <button
            key={item.n}
            ref={(el) => { tabRefs.current[i] = el; }}
            id={`tab-${item.n}`}
            role="tab"
            tabIndex={active === i ? 0 : -1}
            aria-selected={active === i}
            aria-controls="project-panel"
            onClick={() => setActive(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            <small>FILE {item.n}</small>
            <span>{item.title}</span>
            <b>{active === i ? "✦" : "＋"}</b>
          </button>
        ))}
      </div>

      <article
        className="project-card"
        role="tabpanel"
        id="project-panel"
        aria-labelledby={`tab-${project.n}`}
        tabIndex={0}
      >
        <div className="card-top">
          <span>{project.tag}</span>
          <span>{project.n} / {items.length < 10 ? `0${items.length}` : items.length}</span>
        </div>
        <div className="card-stamp">
          SAM<br />
          JOHNSON<br />
          AUSTIN
        </div>
        <h2>{project.title}</h2>
        <p>{project.body}</p>
        <div className="result">
          <small>Operating principle</small>
          <strong>{project.result}</strong>
        </div>
        <div className="stack">{project.stack}</div>
      </article>
    </section>
  );
}
