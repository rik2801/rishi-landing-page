import Link from "next/link";

export type CaseStudyCardProps = {
  title: string;
  description: string;
  roleLabel: string;
  href: string;
  featured?: boolean;
  cta?: string;
};

export function CaseStudyCard({
  title,
  description,
  roleLabel,
  href,
  featured,
  cta = "View case study",
}: CaseStudyCardProps) {
  return (
    <article className={featured ? "case-study-card case-study-card--featured" : "case-study-card"}>
      <div className="case-study-card-header">
        <h2 className="case-study-card-title">{title}</h2>
        {featured ? (
          <p className="case-study-card-featured-label">Featured</p>
        ) : null}
      </div>
      <p className="case-study-card-role">{roleLabel}</p>
      <p className="case-study-card-desc">{description}</p>
      <div className="case-study-card-cta">
        <Link href={href} className="link">
          {cta}
        </Link>
      </div>
    </article>
  );
}
