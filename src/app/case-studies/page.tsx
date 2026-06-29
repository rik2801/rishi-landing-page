import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies — Rishi Kiran",
  description:
    "Choose how to explore product design and UX case studies — classic reading format or an interactive 3D experience.",
};

const MODES = [
  {
    id: "classic",
    title: "Classic",
    description: "Read the case studies in a traditional, recruiter-friendly format.",
    cta: "Open Classic",
    href: "/case-studies/classic",
  },
  {
    id: "interactive",
    title: "Interactive",
    description: "Explore the same work through an immersive 3D experience.",
    cta: "Enter Interactive",
    href: "/case-studies/interactive",
  },
] as const;

export default function CaseStudiesModePage() {
  return (
    <div className="site-container site-container--case-studies">
      <div className="case-studies-mode-page">
        <p className="case-studies-home-line">
          <Link href="/" className="link case-studies-home-link">
            Rishi Kiran
          </Link>
        </p>

        <header className="case-studies-mode-header">
          <h1 className="case-studies-mode-title">How would you like to explore my work?</h1>
        </header>

        <div className="case-studies-mode-grid">
          {MODES.map((mode) => (
            <article key={mode.id} className="case-studies-mode-card">
              <h2 className="case-studies-mode-card-title">{mode.title}</h2>
              <p className="case-studies-mode-card-desc">{mode.description}</p>
              <div className="case-studies-mode-card-cta">
                <Link href={mode.href} className="link">
                  {mode.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
