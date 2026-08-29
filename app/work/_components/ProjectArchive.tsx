"use client";

import { useState } from "react";
import type { ProjectItem } from "../../_types/project";

interface ProjectArchiveProps {
  items: ProjectItem[];
  subtitle: string;
  note: string;
}

export function ProjectArchive({ items, subtitle, note }: ProjectArchiveProps) {
  const [active, setActive] = useState(0);
  const project = items[active] || items[0];

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
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
          >
            <small>FILE {item.n}</small>
            <span>{item.title}</span>
            <b>{active === i ? "✦" : "＋"}</b>
          </button>
        ))}
      </div>

      <article className="project-card" aria-live="polite">
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
