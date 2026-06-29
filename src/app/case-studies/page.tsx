import type { Metadata } from "next";
import Image from "next/image";
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
    description: "Read structured case studies in a traditional portfolio format.",
    cta: "Open",
    href: "/case-studies/classic",
    preview: "/classic-mode-preview.webp",
    previewAlt: "Preview of the classic case studies page",
  },
  {
    id: "interactive",
    title: "Interactive",
    description: "Explore projects through a conversational 3D guide.",
    cta: "Enter",
    href: "/case-studies/interactive",
    preview: "/interactive-mode-preview.webp",
    previewAlt: "Preview of the interactive 3D case studies experience",
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
          <h1 className="case-studies-mode-title">Two ways to explore the same work.</h1>
          <p className="case-studies-mode-subtitle">
            Choose the format that fits how you want to move through the case studies.
          </p>
        </header>

        <div className="case-studies-mode-grid">
          {MODES.map((mode) => (
            <Link
              key={mode.id}
              href={mode.href}
              className="case-studies-mode-card"
              aria-label={`${mode.title}: ${mode.description}`}
            >
              <div className="case-studies-mode-card-preview">
                <Image
                  src={mode.preview}
                  alt={mode.previewAlt}
                  fill
                  sizes="(min-width: 720px) 50vw, 100vw"
                  className="case-studies-mode-card-preview-img"
                  draggable={false}
                />
              </div>
              <div className="case-studies-mode-card-body">
                <h2 className="case-studies-mode-card-title">{mode.title}</h2>
                <p className="case-studies-mode-card-desc">{mode.description}</p>
                <span className="case-studies-mode-card-cta">
                  {mode.cta}
                  <span className="case-studies-mode-card-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
