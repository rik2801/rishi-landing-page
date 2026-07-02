import type { Metadata } from "next";
import { AutoplayVideo } from "@/components/autoplay-video";
import { CaseStudiesBreadcrumb } from "@/components/case-studies-breadcrumb";
import { CaseStudyCard, type CaseStudyCardAccent } from "@/components/case-study-card";

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
  accent: CaseStudyCardAccent;
};

const CASE_STUDIES: CaseStudyListItem[] = [
  {
    title: "Duorin",
    description:
      "A context-aware AI styling product designed to reduce outfit decision fatigue through weather, calendar, wardrobe, and preference signals.",
    roleLabel: "AI Product · UX Engineering · Trust Systems",
    href: "/case-studies/duorin",
    featured: true,
    accent: {
      image: "/card-bg/silver-orange.webp",
    },
  },
  {
    title: "Snack'nU",
    description:
      "A campus food-redistribution service concept for surfacing catered surplus after events and routing time-sensitive pickups to nearby students.",
    roleLabel: "Service Design · Campus Operations",
    href: "/case-studies/snacknu",
    accent: {
      image: "/card-bg/yellow-black.webp",
    },
  },
  {
    title: "They're Waiting",
    description:
      "A behavioral productivity product using time-aware nudges, urgency design, and emotional accountability to reduce procrastination.",
    roleLabel: "Behavioral UX · Notification Strategy",
    href: "/case-studies/theyre-waiting",
    accent: {
      image: "/card-bg/cool-red-neony.webp",
    },
  },
  {
    title: "Citizen-X",
    description:
      "A civic product designed to help users compare political parties through manifesto-based questions instead of personality-driven bias.",
    roleLabel: "Civic UX · Information Architecture",
    href: "/case-studies/citizenx",
    accent: {
      image: "/card-bg/panther-stripes.webp",
    },
  },
];

export default function CaseStudiesClassicPage() {
  return (
    <div className="case-studies-page">
      <header className="case-studies-header">
        <CaseStudiesBreadcrumb
          crumbs={[
            { label: "Case Studies", href: "/case-studies" },
            { label: "Classic" },
          ]}
        />
        <div className="case-studies-hero-row">
          <div className="case-studies-hero-copy">
            <h1 className="case-studies-title">Case Studies</h1>
            <p className="case-studies-subtitle">
              Selected product design, UX, and technical product work across AI, behavior design,
              marketplaces, and civic systems.
            </p>
          </div>
          <div className="case-studies-hero-art" aria-hidden="true">
            <AutoplayVideo src="/rik.webm" className="case-studies-rik-image" />
          </div>
        </div>
      </header>
      <div className="case-studies-work-block">
        <div className="case-studies-grid">
          {CASE_STUDIES.map((c) => (
            <CaseStudyCard
              key={c.href}
              title={c.title}
              description={c.description}
              roleLabel={c.roleLabel}
              href={c.href}
              featured={c.featured}
              accent={c.accent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
