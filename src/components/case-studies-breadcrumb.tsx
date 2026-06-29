import Link from "next/link";

export type CaseStudiesCrumb = {
  label: string;
  href?: string;
};

type CaseStudiesBreadcrumbProps = {
  crumbs: CaseStudiesCrumb[];
  className?: string;
  crumbClassName?: string;
  overlay?: boolean;
};

export function CaseStudiesBreadcrumb({
  crumbs,
  className = "",
  crumbClassName = "",
  overlay = false,
}: CaseStudiesBreadcrumbProps) {
  const lineClass = [
    "case-studies-crumb-line",
    overlay ? "case-studies-crumb-line--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const crumbClass = ["case-studies-crumb", crumbClassName].filter(Boolean).join(" ");

  return (
    <nav className={lineClass} aria-label="Breadcrumb">
      <p className={crumbClass}>
        {crumbs.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`}>
            {index > 0 ? " · " : null}
            {crumb.href ? (
              <Link href={crumb.href} className="link case-studies-crumb-link">
                {crumb.label}
              </Link>
            ) : (
              <span className="case-studies-crumb-current">{crumb.label}</span>
            )}
          </span>
        ))}
      </p>
    </nav>
  );
}
