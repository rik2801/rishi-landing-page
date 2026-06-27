"use client";

import { useId, type ReactNode } from "react";

/** 2×2 D-shaped mark: flat inner edges, rounded outer corners, 1px center gap. */
export function SectionHeadingGlyph() {
  const uid = useId().replace(/:/g, "");
  const clipId = `section-heading-glyph-clip-${uid}`;
  const gradientId = `section-heading-glyph-gradient-${uid}`;

  return (
    <span className="section-heading-glyph" aria-hidden="true">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M7 0H2.5A2.5 2.5 0 0 0 0 2.5V7H7V0Z" />
            <path d="M8 0H12.5A2.5 2.5 0 0 1 15 2.5V7H8V0Z" />
            <path d="M0 8V12.5A2.5 2.5 0 0 0 2.5 15H7V8H0Z" />
            <path d="M8 8H15V12.5A2.5 2.5 0 0 1 12.5 15H8V8Z" />
          </clipPath>
          <radialGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            cx="3"
            cy="4"
            r="11"
          >
            <stop stopColor="#fc7e32" />
            <stop offset="0.34" stopColor="#fb5782" />
            <stop offset="0.68" stopColor="#e77ebd" />
            <stop offset="1" stopColor="#b34df3" />
          </radialGradient>
        </defs>
        <rect
          width="15"
          height="15"
          fill={`url(#${gradientId})`}
          clipPath={`url(#${clipId})`}
        />
      </svg>
    </span>
  );
}

type CaseStudySectionHeadingProps = {
  children: ReactNode;
  showGlyph?: boolean;
};

export function CaseStudySectionHeading({
  children,
  showGlyph = false,
}: CaseStudySectionHeadingProps) {
  if (!showGlyph) {
    return <h2 className="case-study-section-heading">{children}</h2>;
  }

  return (
    <h2 className="case-study-section-heading">
      <SectionHeadingGlyph />
      <span className="case-study-section-heading-text">{children}</span>
    </h2>
  );
}
