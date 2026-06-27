export type CaseStudyTocItem = {
  id: string;
  label: string;
};

export const CASE_STUDY_SECTION_IDS = {
  overview: "overview",
  heroScreenshot: "hero-screenshot",
  personalMotivation: "personal-motivation",
  whyBuiltDuorin: "why-i-built-duorin",
  whyThisMatters: "why-this-matters",
  theProblem: "the-problem",
  turningPoint: "the-turning-point",
  betaLearnings: "beta-learnings",
  coreInsight: "core-insight",
  decisionEngine: "decision-engine",
  intelligenceLayer: "building-the-intelligence-layer",
  finalProduct: "final-product",
  strategyTimeline: "what-changed-our-thinking",
  productThinkingShift: "product-thinking-shift",
  hiddenProblem: "the-hidden-problem",
  systemsProcessLayer: "systems-process-layer",
  productArtifacts: "product-artifacts",
  postInsightScreenshot: "post-insight-screenshot",
  productEvolution: "product-evolution",
  finalExperience: "final-experience",
  productWalkthrough: "product-walkthrough",
  systemOverview: "system-overview",
  earlySignalsFromBeta: "early-signals-from-beta",
  biasReduction: "bias-reduction",
  operationalConstraints: "operational-constraints",
  keyProductDecisions: "key-product-decisions",
  designApproach: "design-approach",
  postApproachScreenshot: "post-approach-screenshot",
  processArtifact: "process-artifact",
  systemLogic: "system-logic",
  postServiceLoopScreenshot: "post-service-loop-screenshot",
  stakeholderReality: "stakeholder-reality",
  postSystemScreenshot: "post-system-screenshot",
  impact: "impact",
  postImpactScreenshot: "post-impact-screenshot",
  reflection: "reflection",
} as const;

export type CaseStudyTocSource = {
  contentStructure?: "duorin-merged";
  heroScreenshot?: unknown;
  personalMotivation?: { title?: string };
  betaLearnings?: unknown;
  coreInsight?: string;
  decisionEngine?: { tocLabel?: string };
  strategyTimeline?: { title: string };
  productThinkingShift?: { title?: string };
  hiddenProblem?: { title?: string };
  systemsProcessLayer?: { title: string };
  productArtifacts?: { title?: string };
  postInsightScreenshot?: unknown;
  productEvolution?: unknown;
  finalExperience?: { title?: string };
  productWalkthrough?: { title?: string };
  systemOverview?: { title?: string };
  earlySignalsFromBeta?: { title?: string };
  biasReduction?: unknown;
  operationalConstraints?: unknown[];
  keyProductDecisions?: unknown[];
  approach?: unknown[];
  postApproachScreenshot?: unknown;
  processArtifactScreenshot?: unknown;
  systemLogic?: unknown;
  systemLogicTitle?: string;
  postServiceLoopScreenshot?: unknown;
  stakeholderReality?: string;
  postSystemScreenshot?: unknown;
  postImpactScreenshot?: unknown;
  reflection?: { title?: string };
};

/** Derives TOC items from rendered case study sections, in document order. */
export function buildCaseStudyTocItems(source: CaseStudyTocSource): CaseStudyTocItem[] {
  const items: CaseStudyTocItem[] = [
    { id: CASE_STUDY_SECTION_IDS.overview, label: "Overview" },
  ];

  if (source.contentStructure === "duorin-merged") {
    if (source.personalMotivation) {
      items.push({
        id: CASE_STUDY_SECTION_IDS.whyBuiltDuorin,
        label: source.personalMotivation.title ?? "Why I Built Duorin",
      });
    }

    items.push({
      id: CASE_STUDY_SECTION_IDS.turningPoint,
      label: "The Turning Point",
    });

    if (source.decisionEngine) {
      items.push({
        id: CASE_STUDY_SECTION_IDS.decisionEngine,
        label: source.decisionEngine.tocLabel ?? "Decision Engine",
      });
    }

    if (source.hiddenProblem || source.systemsProcessLayer) {
      items.push({
        id: CASE_STUDY_SECTION_IDS.intelligenceLayer,
        label: source.systemsProcessLayer?.title ?? "Building the Intelligence Layer",
      });
    }

    if (source.productEvolution) {
      items.push({
        id: CASE_STUDY_SECTION_IDS.productEvolution,
        label: "Product Evolution",
      });
    }

    if (source.finalExperience || source.productWalkthrough) {
      items.push({
        id: CASE_STUDY_SECTION_IDS.finalProduct,
        label: source.finalExperience?.title ?? "Final Product",
      });
    }

    items.push({
      id: CASE_STUDY_SECTION_IDS.reflection,
      label: source.reflection?.title ?? "Reflection",
    });

    return items;
  }

  if (source.personalMotivation) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.personalMotivation,
      label: source.personalMotivation.title ?? "Personal Motivation",
    });
  }

  items.push(
    { id: CASE_STUDY_SECTION_IDS.whyThisMatters, label: "Why This Matters" },
    { id: CASE_STUDY_SECTION_IDS.theProblem, label: "The Problem" },
  );

  if (source.betaLearnings) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.betaLearnings,
      label: "What We Learned During Beta",
    });
  }

  if (source.coreInsight) {
    items.push({ id: CASE_STUDY_SECTION_IDS.coreInsight, label: "Core Insight" });
  }

  if (source.decisionEngine) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.decisionEngine,
      label: source.decisionEngine.tocLabel ?? "Decision Engine",
    });
  }

  if (source.strategyTimeline) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.strategyTimeline,
      label: source.strategyTimeline.title,
    });
  }

  if (source.productThinkingShift) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.productThinkingShift,
      label: source.productThinkingShift.title ?? "Product Thinking Shift",
    });
  }

  if (source.hiddenProblem) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.hiddenProblem,
      label: source.hiddenProblem.title ?? "The Hidden Problem",
    });
  }

  if (source.systemsProcessLayer) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.systemsProcessLayer,
      label: source.systemsProcessLayer.title,
    });
  }

  if (source.productArtifacts) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.productArtifacts,
      label: source.productArtifacts.title ?? "Product Artifacts",
    });
  }

  if (source.productEvolution) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.productEvolution,
      label: "Product Evolution",
    });
  }

  if (source.finalExperience) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.finalExperience,
      label: source.finalExperience.title ?? "Final Experience",
    });
  }

  if (source.productWalkthrough) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.productWalkthrough,
      label: source.productWalkthrough.title ?? "Product Walkthrough",
    });
  }

  if (source.systemOverview) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.systemOverview,
      label: source.systemOverview.title ?? "System Overview",
    });
  }

  if (source.earlySignalsFromBeta) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.earlySignalsFromBeta,
      label: source.earlySignalsFromBeta.title ?? "Early Signals from Beta",
    });
  }

  if (source.biasReduction) {
    items.push({ id: CASE_STUDY_SECTION_IDS.biasReduction, label: "Bias Reduction" });
  }

  if (source.operationalConstraints?.length) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.operationalConstraints,
      label: "Operational Constraints",
    });
  }

  if (source.keyProductDecisions?.length) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.keyProductDecisions,
      label: "Key Product Decisions",
    });
  }

  if (source.approach?.length) {
    items.push({ id: CASE_STUDY_SECTION_IDS.designApproach, label: "Design Approach" });
  }

  if (source.systemLogic) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.systemLogic,
      label: source.systemLogicTitle ?? "System Logic",
    });
  }

  if (source.stakeholderReality) {
    items.push({
      id: CASE_STUDY_SECTION_IDS.stakeholderReality,
      label: "Stakeholder Reality",
    });
  }

  items.push({ id: CASE_STUDY_SECTION_IDS.impact, label: "Impact" });
  items.push({
    id: CASE_STUDY_SECTION_IDS.reflection,
    label: source.reflection?.title ?? "Reflection",
  });

  return items;
}
