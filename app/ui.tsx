"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Page = "home" | "work" | "profile" | "contact";

const nav: { href: string; label: string; id: Page }[] = [
  { href: "/", label: "Index", id: "home" },
  { href: "/work", label: "Selected work", id: "work" },
  { href: "/profile", label: "Profile", id: "profile" },
  { href: "/contact", label: "Contact", id: "contact" },
];

function Mark() {
  return <Link href="/" className="mark" aria-label="Sam Johnson, home"><span>SAM</span><b>ASA</b><span>JOHNSON</span></Link>;
}

function Frame({ page, children }: { page: Page; children: React.ReactNode }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    tick(); const timer = setInterval(tick, 30000); return () => clearInterval(timer);
  }, []);
  return (
    <main className={`site page-${page}`}>
      <header className="topbar">
        <Mark />
        <div className="status"><span className="pulse" /> Frontend systems / product engineering / DX</div>
        <div className="place">Austin, TX <span>{time || "--:--"} CT</span></div>
        <div className="edition" aria-label="Site edition">ED. 03</div>
      </header>
      <nav className="navrail" aria-label="Primary navigation">
        {nav.map((item, index) => (
          <Link key={item.id} href={item.href} className={page === item.id ? "active" : ""}>
            <small>0{index + 1}</small><span>{item.label}</span><b>↗</b>
          </Link>
        ))}
      </nav>
      <div className="stage" key={page}>{children}</div>
      <footer className="footer">
        <span>© 2026 / SAM ASA JOHNSON</span>
        <span className="ticker">BUILD THE SYSTEM · LEAVE THE MAP · MAKE THE HARD PART FEEL HUMAN</span>
        <a href="https://www.linkedin.com/in/sam-asa-johnson" target="_blank" rel="noreferrer">LI ↗</a>
      </footer>
    </main>
  );
}

function Home() {
  return (
    <>
      <section className="hero-copy">
        <div className="eyebrow"><span>Software engineer</span><span>Austin, Texas</span></div>
        <h1>Wild<br/><em>ideas.</em><br/>Clear systems.</h1>
        <p className="hero-deck">I turn complicated product and engineering problems into software people can understand, use, and keep building.</p>
        <div className="hero-index"><span>React / TypeScript</span><span>Full-stack delivery</span><span>Team enablement</span></div>
        <Link className="round-link" href="/work"><span>Open the<br/>work index</span><b>↘</b></Link>
      </section>
      <section className="hero-object" aria-label="Sam Johnson snake and computer emblem">
        <div className="brand-field">
          <span className="brand-caption brand-caption-top">PRODUCT CRAFT<br/>WITHOUT THE THEATER</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sam-johnson-snake-mark.png" alt="Snake winding through a computer in a bold flash tattoo style" />
          <span className="brand-caption brand-caption-bottom">EST. IN CURIOSITY<br/>REFINED IN PRODUCTION</span>
        </div>
        <div className="shelf shelf-one"><span>01</span><b>INTERFACE</b><i>MAKE IT LEGIBLE</i></div>
        <div className="shelf shelf-two"><span>02</span><b>SYSTEMS</b><i>MAKE IT DURABLE</i></div>
        <div className="shelf shelf-three"><span>03</span><b>TEAMS</b><i>MAKE IT SHARED</i></div>
      </section>
    </>
  );
}

const projects = [
  { n: "01", title: "Accounting analysis & reporting", tag: "Product engineering", body: "A full-stack financial workflow for insurance accounting—turning dense operational rules into a legible, maintainable interface.", stack: "React / TypeScript / Node / MSSQL", result: "SYSTEMS, NOT SCREENS" },
  { n: "02", title: "Shared component infrastructure", tag: "Frontend platform", body: "Organized a common React foundation used across teams, balancing API consistency, contribution patterns, and the reality of parallel delivery.", stack: "React / Design systems / DX", result: "ONE LANGUAGE, MANY TEAMS" },
  { n: "03", title: "AI-enabled engineering practice", tag: "Developer experience", body: "Piloted agentic workflows, shaped reusable project context, and taught teams how to use AI with more rigor than autocomplete.", stack: "Agents / Steering / Enablement", result: "TOOLS INTO PRACTICE" },
];

function Work() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  return (
    <section className="work-grid">
      <div className="section-title"><small>Selected work / 2022—26</small><h1>The<br/><em>working</em><br/>archive.</h1><p>Three representative systems. The details that belong to employers stay with employers.</p></div>
      <div className="project-list" role="tablist" aria-label="Projects">
        {projects.map((item, i) => <button key={item.n} role="tab" aria-selected={active === i} onClick={() => setActive(i)}><small>FILE {item.n}</small><span>{item.title}</span><b>{active === i ? "✦" : "＋"}</b></button>)}
      </div>
      <article className="project-card" aria-live="polite">
        <div className="card-top"><span>{project.tag}</span><span>{project.n} / 03</span></div>
        <div className="card-stamp">SAM<br/>JOHNSON<br/>AUSTIN</div>
        <h2>{project.title}</h2>
        <p>{project.body}</p>
        <div className="result"><small>Operating principle</small><strong>{project.result}</strong></div>
        <div className="stack">{project.stack}</div>
      </article>
    </section>
  );
}

function Profile() {
  return (
    <section className="profile-grid">
      <div className="profile-intro"><small>Profile / the short version</small><h1>Engineer.<br/>Translator.<br/><em>Wayfinder.</em></h1></div>
      <div className="manifesto"><p>I’m a frontend-focused full-stack engineer who likes the difficult middle: where product intent, technical systems, and the people building them need to agree.</p><p>At SelectQuote, I’ve built financial software across React, TypeScript, Node, MSSQL, and AWS—and served as a frontend SME helping teams make better, more durable decisions.</p></div>
      <div className="capability-map" aria-label="Three-part capability map">
        <div className="cap cap-a"><small>01</small><strong>Make it<br/>clear</strong><span>Interface & systems design</span></div>
        <div className="cap cap-b"><small>02</small><strong>Make it<br/>real</strong><span>Full-stack delivery</span></div>
        <div className="cap cap-c"><small>03</small><strong>Make it<br/>repeatable</strong><span>DX & team enablement</span></div>
        <div className="map-center">✦<br/>SAM J.</div>
      </div>
      <div className="tools"><small>Working set</small><p>React · TypeScript · JavaScript · Node.js · SQL · Zustand · TanStack Query · AWS · Design systems · AI-assisted development</p></div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-grid">
      <div className="contact-lead"><small>Contact / open channel</small><h1>Pull up<br/>a chair.<br/><em>Let’s talk.</em></h1></div>
      <div className="signal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/sam-johnson-snake-mark.png" alt=""/>
        <span><i/> Signal open</span>
      </div>
      <div className="contact-copy"><p>I’m interested in senior frontend, product engineering, and developer experience work—especially where craft and systems thinking are treated as the same job.</p><a href="https://www.linkedin.com/in/sam-asa-johnson" target="_blank" rel="noreferrer"><span>Start a conversation</span><b>LinkedIn ↗</b></a></div>
      <div className="fineprint">BASED IN AUSTIN, TEXAS<br/>WORKING ACROSS TIME ZONES</div>
    </section>
  );
}

export function Shell({ page }: { page: Page }) {
  return <Frame page={page}>{page === "home" ? <Home /> : page === "work" ? <Work /> : page === "profile" ? <Profile /> : <Contact />}</Frame>;
}
