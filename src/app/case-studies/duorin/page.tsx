import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study-detail";

export const metadata: Metadata = {
  title: "Duorin, Case Study, Rishi Kiran",
  description:
    "An AI styling assistant that turns wardrobe, weather, calendar, and preference signals into daily outfit decisions users can trust.",
};

export default function DuorinCaseStudyPage() {
  return (
    <CaseStudyDetail
      contentStructure="duorin-merged"
      sectionHeadingGlyph
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
        title: "Why Duorin Exists",
        paragraphs: [
          "Most styling products treat fashion as an inspiration problem. They generate endless outfit ideas, yet rarely answer the one question people have before leaving home: \"What should I wear today?\"",
          "Duorin takes a different approach, combining wardrobe, weather, calendar, preferences, and styling intelligence into one daily decision instead of more inspiration.",
        ],
      }}
      whyItMatters={[]}
      problem={{ intro: "", bullets: [] }}
      productBet={{
        title: "The Product Bet",
        tocLabel: "The Product Bet",
        paragraphs: [
          "A useful AI stylist needs more than image generation. It has to understand the user's wardrobe, personal style, daily context, and the situations they dress for. Duorin was built on one principle: better context creates better decisions.",
        ],
        callout: "Context matters more than more recommendations.",
        calloutHighlight: "Context",
      }}
      signals={{
        title: "What Duorin Understands",
        tocLabel: "What Duorin Understands",
        intro:
          "Before making a recommendation, Duorin combines multiple signals about the user and their day.",
        cards: [
          {
            label: "Wardrobe",
            body: "Everything the user already owns.",
            iconSrc: "/icons/wardrobe.webp",
            iconAlt: "Wardrobe icon",
          },
          {
            label: "Weather",
            body: "What is appropriate today.",
            iconSrc: "/icons/weather.webp",
            iconAlt: "Weather icon",
          },
          {
            label: "Calendar",
            body: "Where the user is going.",
            iconSrc: "/icons/calendar.webp",
            iconAlt: "Calendar icon",
            labelFootnote: { href: "#privacy", ariaLabel: "Privacy by Design" },
          },
          {
            label: "Preferences",
            body: "Personal taste and style.",
            iconSrc: "/icons/designed-and-built.webp",
            iconAlt: "Preferences icon",
          },
          {
            label: "Body Signals",
            body: "Fit, silhouette and undertones.",
            iconSrc: "/icons/body-signals.webp",
            iconAlt: "Body signals icon",
          },
          {
            label: "Styling Knowledge",
            body: "Fashion rules, garment compatibility and colour theory.",
            iconSrc: "/icons/styling-knowledge.webp",
            iconAlt: "Styling knowledge icon",
          },
        ],
      }}
      privacyContext={{
        title: "Privacy by Design",
        tocLabel: "Privacy by Design",
        paragraphs: [
          "Duorin uses calendar context to improve outfit recommendations without relying on raw personal data.",
          "Calendar events are interpreted on-device into simple context signals such as occasion, timing, and formality. Only those signals are used to personalize recommendations, keeping personal event details private.",
          "This keeps recommendations personal without exposing users' calendar information.",
        ],
      }}
      systemsProcessLayer={{
        title: "Building the Wardrobe Intelligence Layer",
        paragraphs: [
          "Before Duorin could reason about weather, calendar, or taste, it needed a clear picture of what the user already owned. That meant turning messy fashion images into structured garment data the system could work with.",
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
        artifact: {
          src: "/Artifact1.png",
          alt: "Hand-drawn notebook sketch of image cleaning and wardrobe analysis pipeline from inspiration image to structured garment data",
          width: 1085,
          height: 1450,
          caption:
            "Early system sketch exploring how unstructured fashion images become structured wardrobe intelligence.",
        },
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
