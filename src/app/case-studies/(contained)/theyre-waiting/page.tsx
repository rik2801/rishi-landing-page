import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study-detail";

export const metadata: Metadata = {
  title: "They’re Waiting — Case Study — Rishi Kiran",
  description:
    "A behavioral accountability system that interrupts emotionally resisted tasks through timing, urgency, and lightweight social pressure.",
};

export default function TheyreWaitingCaseStudyPage() {
  return (
    <CaseStudyDetail
      screenshotPresentation="theyre-waiting"
      name="They’re Waiting"
      heroStatement="A behavioral accountability system designed to interrupt avoidance loops around emotionally resisted tasks using urgency, timing, and lightweight social pressure."
      heroScreenshot={{
        src: "/homepage.webp",
        alt: "They’re Waiting home screen",
        width: 440,
        height: 916,
      }}
      heroScreenshotCaption="Task overview and behavioral scheduling surface."
      heroScreenshotCompact
      role="Product Designer · Behavioral UX Systems"
      duration="Buildathon Prototype · 2026"
      metaGridVariant="bordered"
      designBuild="Interaction design · Notification systems · Voice task parsing · Behavioral timing flows · AI-assisted task extraction"
      leadershipLabel="Context"
      leadership="Built during a Replit buildathon to explore accountability mechanics around emotionally resisted tasks"
      whyItMatters={[
        "Most productivity systems optimize for organization, not avoidance. Users often know exactly what they need to do, but still delay emotionally resisted tasks because the friction is psychological, not informational.",
        "They’re Waiting explored whether timing, interruption mechanics, and lightweight accountability pressure could reduce procrastination without relying on shame-based productivity patterns.",
      ]}
      problem={{
        intro:
          "The product was built around the intent-versus-action gap: users repeatedly saw the same high-stakes tasks but still avoided them at the exact moment a decision had to be made.",
        bullets: [
          "Emotionally resisted tasks stayed visible in task lists for days while lower-friction work got completed first.",
          "Traditional reminders became background noise after repeated dismissals and stopped influencing behavior.",
          "Avoidance intensified near difficult actions such as outreach, follow-ups, and uncomfortable conversations.",
          "Most task apps captured plans well but failed at the exact moment action was postponed.",
        ],
      }}
      coreInsight="Productivity failure is often not a planning problem — it is an avoidance problem. The hardest tasks are usually emotionally resisted tasks: outreach, difficult conversations, follow-ups, or actions tied to rejection, uncertainty, or social discomfort. The product focused on interrupting avoidance at the moment action is delayed, not simply organizing tasks earlier."
      postInsightScreenshot={{
        src: "/Notification.webp",
        alt: "They’re Waiting accountability notification screen",
        width: 440,
        height: 916,
      }}
      postInsightScreenshotCaption={
        <>
          Time-aware interruption designed to surface emotionally resisted tasks
          <br />
          before avoidance escalates.
        </>
      }
      postInsightScreenshotCompact
      approach={[
        {
          decision:
            "Anchor tasks to real-time interruption windows instead of passive reminders.",
          whyItMattered:
            "Triggering prompts in narrow, context-aware windows created urgency at the point of likely delay rather than adding another item to a backlog.",
        },
        {
          decision:
            "Use swipe, snooze, and completion mechanics to force lightweight behavioral acknowledgment.",
          whyItMattered:
            "Each interruption required a small action: complete now, snooze intentionally, or swipe to acknowledge. This reduced passive dismissal and made avoidance patterns visible.",
        },
        {
          decision:
            "Treat notification tone and cadence as part of the product system, not decorative copywriting.",
          whyItMattered:
            "Escalation language, reminder spacing, and pressure limits directly affected trust and re-engagement, so messaging behavior was designed as core interaction logic.",
        },
      ]}
      systemLogicTitle="Behavioral Accountability System"
      systemLogic={{
        input:
          "Voice or typed task intent, deadlines, urgency windows, task category, and user interaction history.",
        logic:
          "Extract actionable tasks from natural language, parse date/time from speech or text, schedule interruption timing, escalate accountability pressure carefully, and adapt reminders based on snooze or dismiss behavior.",
        output:
          "Short high-attention prompts with immediate actions, swipe acknowledgment, optional snooze, completion confirmation, and lightweight progress tracking.",
      }}
      postSystemScreenshot={{
        src: "/swippable-interface.webp",
        alt: "They’re Waiting swipe interaction interface",
        width: 440,
        height: 916,
      }}
      postSystemScreenshotLeadSpace
      postSystemScreenshotCaption={
        <>
          High-friction completion flow using swipe acknowledgment
          <br />
          and intentional snooze actions.
        </>
      }
      impact={[
        "Validated an interruption model where swipe-to-complete and intentional snooze actions reduced passive reminder dismissal.",
        "Made behavioral response patterns measurable through completion visibility, snooze frequency, and repeated deferral tracking.",
        "Showed that accountability-style notification cadence can increase action on resisted tasks when escalation stays bounded and non-shaming.",
        "Established an interaction baseline for task parsing, categorization, and timing pressure that can be tested against real schedules.",
      ]}
      postImpactScreenshot={{
        src: "/stats.webp",
        alt: "They’re Waiting progress and deferral tracking stats",
        width: 440,
        height: 916,
      }}
      postImpactScreenshotLeadSpace
      postImpactScreenshotCaption={
        <>
          Behavioral tracking focused on follow-through patterns,
          <br />
          deferral frequency, and interruption response.
        </>
      }
      reflection={{
        didNotWork:
          "The hardest challenge was balancing accountability pressure without making the product feel manipulative or emotionally exhausting over time.",
        improveNext:
          "Validate interruption tolerance, escalation timing, and long-term notification fatigue using real user schedules and repeated task patterns.",
        limitationLabel: "Current limitation:",
        nextIterationLabel: "Next iteration focus:",
      }}
    />
  );
}
