import type { Metadata } from "next";
import { CaseStudyDetail } from "@/components/case-study-detail";

export const metadata: Metadata = {
  title: "They’re Waiting — Case Study — Rishi Kiran",
  description:
    "Time-aware nudges and emotional accountability to reduce procrastination — case study in progress.",
};

export default function TheyreWaitingCaseStudyPage() {
  return (
    <CaseStudyDetail
      inProgress
      name="They’re Waiting"
      heroStatement="A productivity surface that uses time-aware friction, urgency, and light emotional accountability to interrupt procrastination loops without shame-based patterns."
      role="Product Designer · Prototype direction"
      duration="Exploration"
      stack="Figma · UX writing · notification flows · early interaction specs"
      whyItMatters={[
        "Avoidance is often emotional and temporal — products that only optimize lists miss the last mile before work starts.",
        "Notification and tone choices directly affect retention and trust; this work treats timing and copy as product decisions, not decorations.",
        "For teams shipping habit-adjacent tools, the thesis is whether interrupts can feel supportive without sliding into manipulation.",
      ]}
      problem={{
        intro:
          "Many productivity tools optimize for task capture and dashboards, not for the moment right before avoidance. The design question was how to create timely interrupts that feel supportive rather than punitive, especially around deadlines and obligations users already feel guilty about.",
        bullets: [
          "Nudges often arrive at the wrong emotional temperature — either too soft to matter or too aggressive to trust.",
          "Time sensitivity and social or emotional stakes needed to be represented without manipulative dark patterns.",
          "The system had to work alongside existing calendars and habits rather than replace them.",
        ],
      }}
      approach={[
        {
          decision: "Anchor prompts to concrete windows of time, not abstract ‘later’.",
          whyItMattered:
            "Vague reminders recycle procrastination. Anchoring to a specific soon window makes the next step easier to take.",
        },
        {
          decision: "Separate urgency from moral judgment in copy and visuals.",
          whyItMattered:
            "If the product reads as scolding, users disengage. The goal was honest time pressure without shame framing.",
        },
        {
          decision: "Prototype notification cadence as a first-class design surface.",
          whyItMattered:
            "The behavior change thesis lives or dies in timing, repetition, and quiet hours — not only in the in-app UI.",
        },
      ]}
      systemLogic={{
        input:
          "Calendar and deadline signals, user-stated intent, quiet hours, and lightweight feedback on whether a nudge helped.",
        logic:
          "Score tasks by time-to-deadline and avoidance risk, choose channel and tone, cap frequency, and adjust based on dismiss patterns.",
        output:
          "Short, time-bounded prompts with a single obvious action and optional reflection after completion.",
      }}
      impact={[
        "Clarified a repeatable structure for ‘interrupt’ moments versus ‘planning’ moments in the product narrative.",
        "Surfaced edge cases around emotional tone that need validation before any scaled rollout.",
        "Established a foundation for user testing around notification trust and frequency caps.",
      ]}
      reflection={{
        didNotWork:
          "Early storyboards over-relied on messaging metaphors that tested well in isolation but felt inconsistent as a system.",
        improveNext:
          "Run structured sessions on tone and timing with real schedules, and validate opt-out and snooze behavior before refining visuals.",
      }}
    />
  );
}
