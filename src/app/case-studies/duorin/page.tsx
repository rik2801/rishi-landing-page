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
      personalMotivation={{
        paragraphs: [
          "I found myself spending more time deciding what to wear than I wanted to admit.",
          "Most styling apps generated endless inspiration, but none answered the simple question I cared about:",
          "\u201cWhat should I wear today?\u201d",
          "Duorin started as an attempt to solve that problem.",
        ],
      }}
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
      betaLearnings={{
        paragraphs: [
          "Duorin entered beta focused on generating recommendations. Early usage showed that output quality alone was not enough.",
          "Several consistent patterns appeared:",
        ],
        bullets: [
          "Users wanted complete outfit suggestions — not more individual options.",
          "Recommendation reasoning had to be visible at the point of decision.",
          "Wardrobe quality mattered more than ranking — missing essentials broke downstream recommendations.",
          "Weather, schedule, and occasion drove usefulness more than visual styling alone.",
        ],
        closing:
          "These observations shifted the product from inspiration toward decision support.",
        callout:
          "The strongest signal from beta: users wanted faster daily decisions, not more fashion inspiration.",
      }}
      coreInsight="Styling is not an inspiration problem — it is a decision problem."
      coreInsightDifferentiator="Most styling apps optimize for inspiration. Duorin optimizes for decision certainty."
      decisionEngine={{
        title: "From Recommendation Engine to Decision Engine",
        tocLabel: "From Recommendation Engine to Decision Engine",
        cards: [
          {
            label: "Before",
            bullets: [
              "More recommendations",
              "Hidden reasoning",
              "Item-focused decisions",
              "Inspiration-first experience",
            ],
          },
          {
            label: "After",
            bullets: [
              "Fewer strong recommendations",
              "Visible reasoning",
              "Complete outfit decisions",
              "Confidence-first experience",
            ],
          },
        ],
      }}
      productThinkingShift={{
        paragraphs: [
          "What changed was not the interface.",
          "What changed was our understanding of the problem.",
          "We started by assuming users wanted more outfit recommendations.",
          "Beta feedback showed the opposite.",
          "Users rarely asked for more options. They wanted confidence that the option in front of them was the right one.",
          "That realization shifted Duorin from a recommendation engine into a decision engine.",
        ],
        image: {
          src: "/Artifact3.png",
          alt: "Hand-drawn product thinking artifact showing how beta observations shifted Duorin from more recommendations to clearer decisions.",
          width: 1024,
          height: 1536,
        },
        closing:
          "This shift became the foundation for every major product decision that followed.",
      }}
      hiddenProblem={{
        paragraphs: [
          "Better recommendations were not limited by recommendation logic.",
          "They were limited by input quality.",
          "Before Duorin could help users decide what to wear, it first had to understand what they actually owned.",
        ],
      }}
      systemsProcessLayer={{
        title: "Building the Wardrobe Intelligence Layer",
        paragraphs: [
          "Before Duorin could generate trustworthy outfit recommendations, it needed reliable wardrobe data.",
          "The challenge was transforming unstructured fashion images into structured garments the system could reason about.",
        ],
        steps: [
          {
            title: "Image Input",
            description: "User uploads or saves a fashion image.",
          },
          {
            title: "Garment Isolation",
            description:
              "The system cleans the image and separates the clothing item from the original photo.",
          },
          {
            title: "Attribute Detection",
            description:
              "The item is analyzed for type, color, material, pattern, sleeve, neckline, and fit.",
          },
          {
            title: "Wardrobe Intelligence",
            description:
              "The structured item becomes usable for matching, gap detection, and outfit generation.",
          },
        ],
        insight:
          "The pipeline turned raw images into structured garments before any outfit logic ran.",
        artifact: {
          src: "/Artifact1.png",
          alt: "Hand-drawn notebook sketch of image cleaning and wardrobe analysis pipeline from inspiration image to structured garment data",
          width: 1085,
          height: 1450,
          caption:
            "Early system sketch showing how unstructured fashion images were transformed into structured wardrobe intelligence. The goal was not outfit generation first—it was creating reliable garment data that recommendation logic could trust.",
        },
        postVisualInsight:
          "Improving garment extraction and attribute detection upstream produced larger gains than tuning recommendation logic downstream.",
      }}
      productEvolution={{
        oldImageSrc: "/old-scan.jpg",
        oldImageAlt:
          "Duorin stylist verdict screen evaluating a single shirt with score and Must Buy recommendation",
        oldImageWidth: 811,
        oldImageHeight: 1699,
        newVideoSrc: "/new-scan.mov",
        summary:
          "From evaluating individual garments to recommending complete, context-aware outfits.",
      }}
      finalExperience={{
        description: [
          "The final experience combines wardrobe data, weather, calendar events, and personal preferences into a small set of outfit decisions.",
          "Instead of asking users to browse dozens of combinations, Duorin narrows the decision to a few strong options that fit the day.",
        ],
      }}
      productWalkthrough={{
        videos: [
          {
            title: "Wardrobe Intelligence",
            src: "/wardrobe.mp4",
            caption:
              "Unstructured fashion images are transformed into wardrobe-ready data.",
          },
          {
            title: "Stylist verdict",
            src: "/stylist-verdict.mp4",
            caption: "New garments are evaluated before entering the wardrobe.",
          },
          {
            title: "Daily Outfit Recommendation",
            src: "/outfit-recommendation.mp4",
            caption:
              "Calendar, weather, wardrobe, and preferences combine into a small set of outfit decisions.",
          },
        ],
      }}
      systemOverview={{
        title: "How Duorin Works",
        intro: "Duorin is a decision pipeline, not a single feature.",
        pipelineNodes: ["Wardrobe Upload", "Stylist verdict", "Outfit Generation"],
        sections: [
          {
            heading: "Wardrobe Upload",
            bullets: [
              "Turn fashion images into structured wardrobe data that the system can understand.",
            ],
          },
          {
            heading: "Stylist verdict",
            bullets: [
              "Evaluate new garments before they enter the wardrobe, helping users reduce noise and improve recommendation quality.",
            ],
          },
          {
            heading: "Outfit Generation",
            bullets: [
              "Combine wardrobe data, weather, calendar events, and personal preferences into daily outfit decisions.",
            ],
          },
        ],
      }}
      impact={[
        "Users spent less time browsing combinations.",
        "Recommendation reasoning became easier to understand.",
        "Wardrobe quality issues became visible earlier in the workflow.",
        "Trust improved when recommendations explained why they appeared.",
      ]}
      reflection={{
        title: "What Duorin Taught Me",
        paragraphs: [
          "The biggest lesson was that recommendation quality alone does not create trust.",
          "Users were willing to accept imperfect recommendations when the reasoning was clear.",
          "The project changed how I think about AI products. The challenge is rarely generating outputs. The challenge is helping users trust them enough to act.",
        ],
      }}
    />
  );
}
