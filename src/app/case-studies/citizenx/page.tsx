import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study-detail";

export const metadata: Metadata = {
  title: "Citizen-X — Case Study — Rishi Kiran",
  description:
    "Politically neutral decision-mapping system for live election cycles under incomplete and shifting manifesto data.",
};

export default function CitizenxCaseStudyPage() {
  return (
    <CaseStudyDetail
      name="Citizen-X"
      heroStatement="A politically neutral decision-mapping system built during the Tamil Nadu election cycle, where policy data was incomplete, timelines shifted, and interpretation quality determined trust."
      heroScreenshot={{
        src: "/citizenx-landing.webp",
        alt: "Citizen-X landing experience",
        width: 1536,
        height: 1024,
      }}
      role="Product Designer · Research & Decision Systems"
      duration="Mar 2026 - May 2026"
      metaGridVariant="bordered"
      designBuild="Research synthesis · Information architecture · React · Question mapping · Weighting systems · AI-assisted weighting review"
      leadership="Worked across a politically diverse 3-person team to reduce weighting bias and validate interpretation consistency"
      whyItMatters={[
        "During the Tamil Nadu election cycle, voter decisions were often shaped by headlines, identity, and fragmented information rather than direct policy comparison. Citizen-X explored whether manifesto positions could be translated into a structured decision system that remained understandable, transparent, and politically neutral under real election timelines.",
      ]}
      problem={{
        intro:
          "The design problem was operational, not cosmetic: build a system that could sustain political neutrality while policy sources changed in real time and some parties withheld or delayed official manifesto detail until late in the election cycle.",
        bullets: [
          "Manifesto completeness varied sharply across parties, creating uneven evidence quality for policy mapping.",
          "The questionnaire needed to represent ambiguity instead of forcing false certainty into binary matches.",
          "Weighting choices required multi-perspective review to reduce interpretation drift and partisan framing risk.",
        ],
      }}
      coreInsight="Political alignment is not a binary preference problem - it is an interpretation problem. Most civic tools compress nuance into oversimplified scores. Citizen-X focused on exposing reasoning, weighting tradeoffs, and handling uncertainty instead of pretending certainty."
      postInsightScreenshot={{
        src: "/citizenx-question-flow.webp",
        alt: "Citizen-X question mapping flow",
        width: 1536,
        height: 1024,
      }}
      postInsightScreenshotCaption="Issue-by-issue tradeoff flow used during live cycle testing"
      approach={[
        {
          decision:
            "Mapped pre-manifesto positions from speeches, interviews, campaign statements, and public appearances so users could compare before decision urgency peaked.",
          whyItMattered:
            "Live election timing pressure meant waiting for complete manifestos would delay usefulness until after peak decision moments.",
        },
        {
          decision:
            "Recalibrated policy mappings and weights as official manifestos were released, replacing inferred positions with verified manifesto evidence.",
          whyItMattered:
            "Dynamic recalculation preserved momentum early while improving recommendation fidelity as source quality improved.",
        },
        {
          decision:
            "Designed outputs around rationale and tradeoff visibility rather than a single winner score.",
          whyItMattered:
            "When policy language is ambiguous, transparent reasoning is more trustworthy than high-confidence ranking theater.",
        },
      ]}
      systemLogicTitle="Decision Mapping System"
      systemLogic={{
        input:
          "Issue-weighted user responses combined with manifesto excerpts, campaign statements, and confidence-graded policy evidence.",
        logic:
          "Translate positions into issue dimensions, apply user weighting, mark uncertainty where evidence is partial, and recalculate mappings when official manifesto updates land.",
        output:
          "Transparent side-by-side reasoning with confidence context, unresolved ambiguity flags, and policy tradeoff visibility instead of a black-box match score.",
      }}
      postSystemScreenshot={{
        src: "/citizenx-results-mobile.webp",
        alt: "Citizen-X mobile results view",
        width: 853,
        height: 1844,
      }}
      biasReduction={{
        paragraphs: [
          "The project intentionally included collaborators with different policy perspectives to challenge interpretation consistency and reduce unilateral weighting bias.",
          "Where ambiguity existed, manifesto excerpts and public statements were cross-reviewed and compared before weights were finalized.",
        ],
      }}
      operationalConstraints={[
        "Manifestos were released at different times across parties",
        "Some policy positions required inferred mapping before official publication",
        "Policy stances evolved during the active campaign period",
        "Weight recalibration occurred after manifesto releases",
      ]}
      earlySignalsFromBeta={{
        title: "Early Signals",
        paragraphs: [
          "Citizen-X reached roughly 2,000-3,000 users organically during the Tamil Nadu state election cycle through short-form social distribution without paid marketing.",
        ],
        bullets: [
          "Users engaged more with issue-by-issue tradeoff comparison than final ranking outputs.",
          "Users spent more time revisiting issue tradeoffs before checking final alignment outputs.",
        ],
        insight:
          "The strongest pull was not finding a single best match - it was understanding why positions diverged across issues under real uncertainty.",
      }}
      impact={[
        "Validated that political neutrality depends on repeatable interpretation workflows, not interface tone alone.",
        "Demonstrated that ambiguity handling can increase trust when confidence and sourcing are explicit.",
        "Established a maintainable recalibration path for shifting manifesto releases during active campaign timelines.",
        "While initially tested during the Tamil Nadu state election cycle, the underlying comparison model was intentionally structured to adapt across different electoral systems and policy environments.",
      ]}
      reflection={{
        didNotWork:
          "The hardest problem was not interface clarity - it was maintaining interpretive consistency under incomplete and evolving political information. Small wording changes could significantly alter perceived alignment outcomes.",
        improveNext:
          "Reduce ambiguity in policy mapping, expose confidence levels more explicitly, and separate verified manifesto positions from inferred campaign statements within the recommendation flow.",
        limitationLabel: "Current limitation:",
        nextIterationLabel: "Next iteration focus:",
      }}
    />
  );
}
