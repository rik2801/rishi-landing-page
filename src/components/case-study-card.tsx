import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

export type CaseStudyCardAccent = {
  image: string;
  bg?: string;
  band?: string;
  rotation?: number;
  offsetY?: number;
};

export type CaseStudyCardProps = {
  title: string;
  description: string;
  roleLabel: string;
  href: string;
  featured?: boolean;
  cta?: string;
  accent: CaseStudyCardAccent;
};

export function CaseStudyCard({
  title,
  description,
  roleLabel,
  href,
  featured,
  cta = "View case study",
  accent,
}: CaseStudyCardProps) {
  const bandRotation = accent.rotation ?? -4;
  const bandOffsetY = accent.offsetY ?? 0;
  const accentStyle = accent.bg
    ? ({
        "--card-accent-bg": accent.bg,
        "--card-accent-band": accent.band,
      } as CSSProperties)
    : undefined;

  return (
    <article
      className={
        featured ? "case-study-card case-study-card--featured" : "case-study-card"
      }
      style={accentStyle}
    >
      <div className="case-study-card-accent" aria-hidden="true">
        <Image
          src={accent.image}
          alt=""
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="case-study-card-accent-image"
          draggable={false}
        />
        {accent.bg ? <div className="case-study-card-accent-base" /> : null}
        {accent.band ? (
          <div
            className="case-study-card-accent-band"
            style={{
              transform: `scale(1.2) rotate(${bandRotation}deg) translateY(${bandOffsetY}px)`,
            }}
          />
        ) : null}
        <div className="case-study-card-accent-scrim" />
        <div className="case-study-card-accent-grain" />
      </div>
      {featured ? (
        <p className="case-study-card-featured-label">Featured</p>
      ) : null}
      <div className="case-study-card-body">
        <div className="case-study-card-header">
          <h2 className="case-study-card-title">{title}</h2>
        </div>
        <p className="case-study-card-role">{roleLabel}</p>
        <p className="case-study-card-desc">{description}</p>
        <div className="case-study-card-cta">
          <Link href={href} className="link case-study-card-link">
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
