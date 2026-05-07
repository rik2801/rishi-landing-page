import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study-detail";

export const metadata: Metadata = {
  title: "Duorin — Case Study — Rishi Kiran",
  description:
    "An AI styling assistant that turns wardrobe, weather, calendar, and preference signals into daily outfit decisions users can trust.",
};

export default function DuorinCaseStudyPage() {
  return (
    <CaseStudyDetail
      name="Duorin"
      titleHref="https://www.duorin.com"
      titleSiteBracket="https://www.duorin.com"
      heroStatement="An AI styling assistant that turns wardrobe, weather, calendar, and preference signals into daily outfit decisions users can trust."
      role="Product Designer (Design + Build)"
      duration="Dec 2025 – Present"
      designBuild="Figma (flows, system design) · React Native · Expo · FastAPI · PostgreSQL · Redis · AI-assisted decision logic"
      leadership="Led a cross-functional team of 6 across engineering, ML, and growth"
      metaGridVariant="bordered"
      whyItMatters={[
        "Personal styling is a high-frequency decision surface: if users do not trust the product, they churn before model quality gets a fair test.",
        "The hard problem is not generating attractive outfits. It is earning trust through explainable, contextual recommendations that hold up on real mornings.",
        "The product reduces decision fatigue through clear logic and actionable outcomes.",
      ]}
      problem={{
        intro:
          "Most styling apps fail because they optimize for option volume, not decision quality. Recommendations look good but ignore context, so users cannot trust them when they need to get dressed.",
        bullets: [
          "Trust breaks when users cannot follow why an outfit was selected.",
          "Calendar, weather, and wardrobe signals must compound in a clear order.",
          "Too many weak options increase cognitive load instead of reducing it.",
        ],
      }}
      coreInsight="Styling is not an inspiration problem — it is a decision problem."
      coreInsightDifferentiator="Most styling apps optimize for inspiration. Duorin optimizes for decision certainty."
      productEvolution={{
        oldImageSrc: "/old-scan.jpg",
        oldImageAlt:
          "Duorin stylist verdict screen evaluating a single shirt with score and Must Buy recommendation",
        oldImageWidth: 811,
        oldImageHeight: 1699,
        newVideoSrc: "/new-scan.mov",
        beforeTitle: "Item-level verdict",
        afterTitle: "Clearer item-level decisions",
        beforeCaption:
          "Users evaluated one garment at a time. Outfit assembly still happened manually.",
        afterCaption:
          "New garments are evaluated before they enter the wardrobe. Decisions are clearer and easier to act on.",
        afterNote:
          "This improved item-level clarity, but users still had to assemble outfits themselves.",
        narrative:
          "Duorin separates two decisions: what enters the wardrobe, and what gets worn.\n\nClear verdicts help users decide what enters the wardrobe, reducing noise in later outfit decisions.",
      }}
      systemOverview={{
        intro: "Duorin is a decision pipeline, not a single feature.",
        pipelineNodes: ["Wardrobe Upload", "Item Evaluation", "Outfit Generation"],
        sections: [
          {
            heading: "Wardrobe Ingestion",
            bullets: [
              "Normalize wardrobe images",
              "Extract type, color, silhouette",
              "Store embeddings for matching",
            ],
          },
          {
            heading: "Item Evaluation / Style Scan",
            bullets: [
              "Score compatibility with wardrobe",
              "Check undertone and preference fit",
              "Detect overlaps and gaps",
              "Filter weak items before entry",
            ],
          },
          {
            heading: "Outfit Generation",
            bullets: [
              "Apply constraints in sequence",
              "Calendar → weather → wardrobe",
              "Generate a small set of viable outfits",
            ],
          },
        ],
        principle: {
          statement: "Better inputs \u2192 better decisions \u2192 better recommendations",
          detail:
            "Controlling what enters the wardrobe improves the quality of downstream outfit decisions.",
        },
      }}
      earlySignalsFromBeta={{
        paragraphs: [
          "Duorin is currently in a live beta with around 20 active users.",
          "These are early directional signals, not statistical conclusions.",
        ],
        bullets: [
          "Users hesitated when recommendation reasoning was not explicit",
          "Item-level clarity improved, but outfit decision fatigue remained",
          "Wardrobe quality strongly affected recommendation quality",
        ],
        insight:
          "Improving input quality and decision clarity upstream has an outsized impact on trust and usability.",
      }}
      keyProductDecisions={[
        "Context before inspiration",
        "Explainability before magic",
        "Fewer, stronger recommendations over endless browsing",
        "Honest empty states over weak AI guesses",
      ]}
      approach={[
        {
          decision: "Design for daily decision-making, not browsing.",
          whyItMattered:
            "Repeat use depends on reliable outcomes during ordinary days.",
        },
        {
          decision: "Make outfit logic explainable at the point of decision.",
          whyItMattered:
            "Trust increases when users can see why each recommendation appears.",
        },
        {
          decision: "Handle missing wardrobe data and weak matches as explicit states.",
          whyItMattered:
            "Clear gaps preserve trust better than vague recommendations.",
        },
      ]}
      systemLogic={{
        input:
          "Calendar events, weather conditions, available wardrobe items, and user style preferences.",
        logic:
          "Apply constraints in sequence, filter invalid items, score viable combinations, and prioritize diverse outfits that fit the day.",
        output:
          "A small set of context-ranked outfit decisions with visible reasoning and clear next actions.",
      }}
      systemLogicTitle="Outfit Generation Logic"
      impact={[
        "Recommendations became predictable instead of arbitrary.",
        "Users could trace why each outfit appeared.",
        "Decision time reduced to a few viable choices.",
      ]}
      reflection={{
        limitationLabel: "Current limitation:",
        nextIterationLabel: "Next iteration focus:",
        didNotWork:
          "The system initially emphasized output quality over decision transparency. Users could not trace the reasoning behind recommendations, which reduced trust even when results were correct.",
        improveNext:
          "Make reasoning first-class in the UI, expose why each recommendation appears, add confidence indicators, and support quick item-level adjustments to keep users within the decision flow.",
      }}
    />
  );
}
