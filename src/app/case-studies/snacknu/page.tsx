import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study-detail";

export const metadata: Metadata = {
  title: "SnacknU — Case Study — Rishi Kiran",
  description:
    "Campus marketplace concept for redistributing unused snacks — case study in progress.",
};

export default function SnacknuCaseStudyPage() {
  return (
    <CaseStudyDetail
      inProgress
      name="SnacknU"
      heroStatement="A closed-loop marketplace concept for moving surplus snacks on campus with lightweight listings, trust cues, and pickup flows tuned for student schedules."
      role="Product Designer · Systems & flows"
      duration="Concept / coursework-adjacent"
      metaGridVariant="bordered"
      stack="User journeys · service blueprint · low-fi UI · trust & safety notes"
      whyItMatters={[
        "Campus surplus is hyper-local and time-bound — coordination beats catalog breadth when inventory is messy and informal.",
        "Marketplace UX here is mostly trust, timing, and handoff clarity; weak flows create flakes and safety ambiguity, not just ‘bad UI’.",
        "The product question is whether a lightweight loop can work without heavy moderation — a pattern relevant to peer economies everywhere.",
      ]}
      problem={{
        intro:
          "Unused snacks cluster in dorms and common rooms while demand is hyper-local and time-sensitive. The open question was whether a minimal marketplace could coordinate supply and demand without heavy moderation overhead or fragile social norms.",
        bullets: [
          "Listings had to be fast to create and honest about condition and pickup constraints.",
          "Trust needed to rest on lightweight reputation rather than identity-heavy onboarding.",
          "The experience had to fail gracefully when inventory or pickup sync broke.",
        ],
      }}
      approach={[
        {
          decision: "Design listings around expiration and pickup windows first.",
          whyItMattered:
            "The product is a logistics-and-trust problem before it is a browsing problem.",
        },
        {
          decision: "Use explicit handoff states instead of open-ended chat for the core loop.",
          whyItMattered:
            "Reducing ambiguity in pickup reduces flakes and disputes without adding heavy dispute tooling.",
        },
        {
          decision: "Prototype demand signals as simple intents, not full carts.",
          whyItMattered:
            "Campus use is opportunistic; capturing intent early matters more than catalog completeness.",
        },
      ]}
      systemLogic={{
        input:
          "Offer posts with item, quantity, pickup window, and location hints; demand intents and optional ratings.",
        logic:
          "Match nearby demand, rank by freshness and reliability signals, and route notifications within quiet-hour rules.",
        output:
          "Confirmed pickup windows, lightweight confirmations, and feedback that tightens future matches.",
      }}
      impact={[
        "Mapped failure modes for flaking, unclear pickup spots, and allergic/safety ambiguity.",
        "Clarified what an MVP could omit versus what would erode trust if skipped.",
        "Left a structured backlog for pilot constraints on a single campus.",
      ]}
      reflection={{
        didNotWork:
          "Early diagrams assumed more inventory density than small pilots reliably provide; empty-network edges needed clearer storytelling.",
        improveNext:
          "Pair the flow with a focused pilot script and success criteria that privilege reliability over catalogue breadth.",
      }}
    />
  );
}
