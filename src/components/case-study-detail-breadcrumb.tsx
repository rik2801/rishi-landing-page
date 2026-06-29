"use client";

import { useSearchParams } from "next/navigation";
import { CaseStudiesBreadcrumb } from "@/components/case-studies-breadcrumb";

type CaseStudyDetailBreadcrumbProps = {
  projectName: string;
};

export function CaseStudyDetailBreadcrumb({ projectName }: CaseStudyDetailBreadcrumbProps) {
  const searchParams = useSearchParams();
  const isInteractive = searchParams.get("mode") === "interactive";

  const crumbs = isInteractive
    ? [
        { label: "Case Studies", href: "/case-studies" },
        { label: "Interactive", href: "/case-studies/interactive" },
        { label: projectName },
      ]
    : [
        { label: "Case Studies", href: "/case-studies" },
        { label: "Classic", href: "/case-studies/classic" },
        { label: projectName },
      ];

  return <CaseStudiesBreadcrumb crumbClassName="case-study-back" crumbs={crumbs} />;
}
