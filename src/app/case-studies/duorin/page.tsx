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
      contentStructure="duorin-merged"
      name="Duorin"
      titleHref="https://www.duorin.com"
      titleSiteBracket="https://www.duorin.com"
      heroStatement="An AI styling assistant that turns wardrobe, weather, calendar, and preference signals into daily outfit decisions users can trust."
      role="Product Designer (Design + Build)"
      duration="Dec 2025 – Present"
      designBuild="Figma (flows, system design) · React Native · Expo · FastAPI · PostgreSQL · Redis · AI-assisted decision logic"
      leadership="Led a cross-functional team of 6 across engineering, ML, and growth"
      metaGridVariant="bordered"
      scopeStrip={[
        {
          label: "6-person team",
          iconSrc: "/icons/6-members.webp",
          iconAlt: "Team icon",
        },
        {
          label: "43 beta users",
          iconSrc: "/icons/43-members.webp",
          iconAlt: "Beta users icon",
        },
      ]}
      personalMotivation={{
        title: "Why I Built Duorin",
        paragraphs: [
          "Most styling apps optimize for inspiration rather than decisions.",
          "They generate endless outfit combinations, but rarely answer the one question users actually have:",
          "\u201cWhat should I wear today?\u201d",
          "Duorin was built to explore whether AI could reduce decision fatigue instead of generating more inspiration.",
        ],
      }}
      whyItMatters={[]}
      problem={{
        intro:
          "Most styling apps optimize for option volume, not decision quality. Recommendations can look good but still fail when users cannot understand why they appeared or how they fit the day.",
        bullets: [],
      }}
      betaLearnings={{
        paragraphs: [
          "Early usage showed that output quality alone was not enough. Users wanted complete outfit suggestions, visible reasoning, and context from weather, schedule, and wardrobe.",
        ],
        bullets: [],
        callout:
          "Users wanted faster daily decisions, not more fashion inspiration.",
      }}
      coreInsight="Styling is not an inspiration problem. It is a decision problem."
      decisionEngine={{
        title: "Decision Engine",
        tocLabel: "Decision Engine",
        intro:
          "Beta feedback changed the product direction. Duorin shifted from generating more recommendations to helping users make fewer, clearer decisions.",
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
        image: {
          src: "/Artifact3.png",
          alt: "Hand-drawn product thinking artifact showing how beta observations shifted Duorin from more recommendations to clearer decisions.",
          width: 1024,
          height: 1536,
        },
        caption:
          "Beta feedback shifted Duorin from recommendation volume to decision confidence.",
      }}
      hiddenProblem={{
        paragraphs: [
          "Better recommendations were not limited by recommendation logic. They were limited by input quality.",
          "Before Duorin could help users decide what to wear, it first had to understand what they actually owned.",
          "That meant transforming unstructured fashion images into structured wardrobe data the system could reason about.",
        ],
      }}
      systemsProcessLayer={{
        title: "Building the Intelligence Layer",
        paragraphs: [],
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
            "Early system sketch for turning unstructured fashion images into wardrobe-ready data.",
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
        title: "Final Product",
        description: "Three moments define the final experience.",
      }}
      productWalkthrough={{
        videos: [
          {
            title: "Wardrobe Intelligence",
            src: "/wardrobe.mp4",
            caption:
              "Transforms raw fashion images into wardrobe-ready data.",
          },
          {
            title: "Stylist Verdict",
            src: "/stylist-verdict.mp4",
            caption: "Evaluates garments before they enter the wardrobe.",
          },
          {
            title: "Daily Outfit Recommendation",
            src: "/outfit-recommendation.mp4",
            caption:
              "Generates a few context-aware outfits for the day.",
          },
        ],
      }}
      impact={[]}
      reflection={{
        title: "Reflection",
        paragraphs: [
          "The biggest lesson was not how to improve recommendations.",
          "It was that users trusted explainable decisions more than perfect predictions.",
          "That changed how I think about AI products: the hard part is not generating outputs. It is helping users trust them enough to act.",
        ],
      }}
    />
  );
}
