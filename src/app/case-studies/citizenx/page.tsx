import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study-detail";

export const metadata: Metadata = {
  title: "CitizenX — Case Study — Rishi Kiran",
  description:
    "Civic comparison tool using manifesto-based questions — case study in progress.",
};

export default function CitizenxCaseStudyPage() {
  return (
    <CaseStudyDetail
      inProgress
      name="CitizenX"
      heroStatement="A civic comparison concept that steers voters toward policy-aligned choices using structured questions grounded in party positions rather than personality framing."
      role="Product Designer · Information architecture"
      duration="Concept"
      stack="Content modeling · question design · transparency notes · accessibility considerations"
      whyItMatters={[
        "Civic tools compete with headlines and identity politics — design determines whether comparison feels grounded or performative.",
        "If mapping party positions is opaque, users cannot evaluate tradeoffs; transparency is the product’s credibility.",
        "The opportunity is to support judgment without pretending false precision — a stance that scales to content maintenance and public scrutiny.",
      ]}
      problem={{
        intro:
          "Voters often encounter party information through headlines and personality narratives. The design challenge was to support comparison on substance while staying transparent about sourcing limits and avoiding false precision.",
        bullets: [
          "Questions needed to map to verifiable positions without collapsing nuance into misleading scores.",
          "The UI had to remain approachable for occasional voters and skeptical readers alike.",
          "Bias reduction is a design problem as much as a content problem — framing shapes trust.",
        ],
      }}
      approach={[
        {
          decision: "Structure comparisons around issue dimensions users actually vote on locally.",
          whyItMattered:
            "Abstract national labels dilute decision quality when local governance matters.",
        },
        {
          decision: "Expose sourcing and confidence plainly next to each mapped stance.",
          whyItMattered:
            "If provenance is hidden, the product becomes another confidence trick dressed as objectivity.",
        },
        {
          decision: "Prefer guided reflection over a single ranked winner as the default output.",
          whyItMattered:
            "A composite score implies mathematical certainty the underlying content cannot honestly support.",
        },
      ]}
      systemLogic={{
        input:
          "Curated manifesto excerpts, party statements, and user priorities collected through a calm interview-style flow.",
        logic:
          "Map responses to policy dimensions, weight user priorities, surface disagreements, and flag low-confidence matches.",
        output:
          "Side-by-side rationale, gaps where positions are unclear, and suggested follow-up reading rather than a numeric mandate.",
      }}
      impact={[
        "Sharpened the product stance: transparency over sensational certainty.",
        "Identified content operations risks early — maintenance cost scales with election cycles and sourcing quality.",
        "Produced a credible skeleton for testing comprehension and trust with a small panel.",
      ]}
      reflection={{
        didNotWork:
          "Early wireframes optimized for speed-to-result; testers wanted slower, inspectable reasoning first.",
        improveNext:
          "Validate question sets with subject-matter review and run literacy-focused usability sessions before visual polish.",
      }}
    />
  );
}
