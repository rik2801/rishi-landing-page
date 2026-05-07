import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study-detail";

export const metadata: Metadata = {
  title: "Snack'nU",
  description:
    "Campus food-redistribution service concept: catering surplus after events, time-sensitive pickup flows, and service design for campus operations.",
};

export default function SnacknuCaseStudyPage() {
  return (
    <CaseStudyDetail
      name="Snack'nU"
      screenshotPresentation="snacknu"
      heroStatement="A campus food-redistribution service concept designed to help catering teams surface edible surplus after events and route it to nearby students through time-sensitive pickup flows."
      heroScreenshot={{
        src: "/snacknu/student-homepage.webp",
        alt: "Student homepage screen",
        width: 902,
        height: 1743,
      }}
      heroScreenshotCaption={
        <>
          Student-facing pickup surface showing nearby surplus
          <br />
          opportunities and confirmed pickups.
        </>
      }
      heroScreenshotCompact
      role="Product Designer · Service Design"
      duration="Coursework-originated concept · Extended stakeholder exploration"
      metaGridVariant="bordered"
      designBuild="Service blueprinting · User journeys · Mobile flows · Stakeholder outreach · Operational constraints"
      leadershipLabel="Context"
      leadership="Started as a UX coursework project and expanded into stakeholder conversations with campus dining and wellness teams"
      whyItMatters={[
        "Campus food waste is not only an inventory problem — it is a coordination problem. After events, edible surplus often exists for a short window, but students nearby may never know it is available.",
        "Snack'nU explored whether a lightweight service loop could connect catering staff, surplus food, and students without creating heavy operational overhead.",
      ]}
      problem={{
        intro:
          "The problem was not demand. Students would take free food if they knew where and when it was available. The harder problem was coordinating surplus quickly enough for it to remain useful while keeping handoff, food safety, and operational responsibility clear. Generic email or team-channel announcements rarely matched how quickly surplus had to move.",
        bullets: [
          "Catering staff needed a fast listing flow that fit post-event cleanup.",
          "Students needed timely, location-aware alerts before food disappeared.",
          "Pickup flows had to reduce crowding, ambiguity, and unreliable handoffs.",
          "Institutional adoption depended on safety, liability, and communication constraints.",
        ],
      }}
      coreInsight="Food redistribution on campus is less like a marketplace and more like a time-sensitive service handoff."
      coreInsightDifferentiator="The value was not inventory browsing. The value was making surplus visible quickly, routing it to nearby demand, and reducing ambiguity at pickup."
      approach={[
        {
          decision: "Design for the catering staff workflow first.",
          whyItMattered:
            "If posting surplus takes too long during cleanup, the supply side fails before students ever see the food.",
        },
        {
          decision: "Treat pickup timing and location clarity as the core UX.",
          whyItMattered:
            "The product only works if students can act quickly without creating confusion, crowding, or unreliable handoffs.",
        },
        {
          decision: "Keep the student experience lightweight and alert-driven.",
          whyItMattered:
            "Campus surplus is opportunistic. Students should not need to browse a full marketplace to benefit from nearby availability.",
        },
      ]}
      postApproachScreenshot={{
        src: "/snacknu/sketch-paper.webp",
        alt: "Hand-drawn service blueprint sketch for Snack'nU surplus coordination",
        width: 1536,
        height: 1024,
      }}
      postApproachScreenshotCaption={
        <>
          Early service mapping for surplus coordination
          <br />
          and pickup flow.
        </>
      }
      systemLogicTitle="Service Loop"
      systemLogic={{
        input:
          "Catering staff post surplus details: item type, quantity, pickup window, location, and basic safety notes.",
        logic:
          "Notify nearby students, prioritize freshness and proximity, manage claimed interest, and reduce ambiguity around pickup timing.",
        output:
          "A short-lived pickup opportunity with clear location, timing, and confirmation states for both staff and students.",
      }}
      stakeholderReality="The concept moved beyond coursework into conversations with campus dining and wellness stakeholders. Interest existed, but adoption depended on institutional concerns around liability, communication ownership, food safety, and whether existing email-based channels were considered sufficient."
      postSystemScreenshot={{
        src: "/snacknu/student-facing-event-screen.webp",
        alt: "Student-facing event screen",
        width: 894,
        height: 1758,
      }}
      postSystemScreenshotCaption={
        <>
          Student event detail view showing menu, pickup window, location,
          <br />
          available servings, and non-guarantee disclaimer.
        </>
      }
      impact={[
        "Mapped the full surplus-to-pickup service loop from staff posting to student pickup.",
        "Identified institutional adoption risks early: liability, ownership, food safety, and communication speed.",
        "Clarified that reliability mattered more than feature breadth for an initial campus pilot.",
        "Turned a coursework prompt into a real stakeholder-facing service design exploration.",
      ]}
      reflection={{
        limitationLabel: "Current limitation:",
        nextIterationLabel: "Next iteration focus:",
        didNotWork:
          "The hardest challenge was not designing the app flow. It was aligning the operational, legal, and institutional responsibilities required for a real campus pilot.",
        improveNext:
          "Define a small controlled pilot with one dining partner, limited pickup windows, clear safety rules, and measurable success criteria around speed, reliability, and food recovered.",
      }}
    />
  );
}
