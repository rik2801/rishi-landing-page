import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "@/components/case-study-card";

export const metadata: Metadata = {
  title: "Case Studies — Rishi Kiran",
  description:
    "Selected product design, UX, and technical product work across AI, behavior design, marketplaces, and civic systems.",
};

type CaseStudyListItem = {
  title: string;
  description: string;
  roleLabel: string;
  href: string;
  featured?: boolean;
};

const CASE_STUDIES: CaseStudyListItem[] = [
  {
    title: "Duorin",
    description:
      "A context-aware AI styling product designed to reduce outfit decision fatigue through weather, calendar, wardrobe, and preference signals.",
    roleLabel: "AI Product · UX Engineering · Trust Systems",
    href: "/case-studies/duorin",
    featured: true,
  },
  {
    title: "They’re Waiting",
    description:
      "A behavioral productivity product using time-aware nudges, urgency design, and emotional accountability to reduce procrastination.",
    roleLabel: "Behavioral UX · Notification Strategy",
    href: "/case-studies/theyre-waiting",
  },
  {
    title: "SnacknU",
    description:
      "A closed-loop campus marketplace concept for redistributing unused snacks through lightweight supply, demand, and trust flows.",
    roleLabel: "Marketplace Systems · Service Design",
    href: "/case-studies/snacknu",
  },
  {
    title: "Citizen-X",
    description:
      "A civic product designed to help users compare political parties through manifesto-based questions instead of personality-driven bias.",
    roleLabel: "Civic UX · Information Architecture",
    href: "/case-studies/citizenx",
  },
];

export default function CaseStudiesIndexPage() {
  return (
    <div className="case-studies-page">
      <header className="case-studies-header">
        <p className="case-studies-home-line">
          <Link href="/" className="link case-studies-home-link">
            Rishi Kiran
          </Link>
        </p>
        <div className="case-studies-hero-row">
          <div className="case-studies-hero-copy">
            <h1 className="case-studies-title">Case Studies</h1>
            <p className="case-studies-subtitle">
              Selected product design, UX, and technical product work across AI, behavior design,
              marketplaces, and civic systems.
            </p>
            <p className="case-studies-positioning">
              I design AI and systems-heavy products where UX depends on logic, data, and trust — not just
              screens.
            </p>
          </div>
          <div className="case-studies-hero-art" aria-hidden="true">
            <img
              src="/rik.png"
              alt=""
              width={360}
              height={360}
              className="case-studies-rik-image"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </header>
      <div className="case-studies-work-block">
        <p className="case-studies-section-label">Selected work</p>
        <div className="case-studies-grid">
          {CASE_STUDIES.map((c) => (
            <CaseStudyCard
              key={c.href}
              title={c.title}
              description={c.description}
              roleLabel={c.roleLabel}
              href={c.href}
              featured={c.featured}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
