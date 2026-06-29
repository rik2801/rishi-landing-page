import { Suspense, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyDetailBreadcrumb } from "@/components/case-study-detail-breadcrumb";
import { CaseStudiesBreadcrumb } from "@/components/case-studies-breadcrumb";
import { AutoplayVideo } from "@/components/autoplay-video";
import { CaseStudySectionHeading } from "@/components/section-heading-glyph";
import { CaseStudyTOC } from "@/components/case-study-toc";
import {
  buildCaseStudyTocItems,
  CASE_STUDY_SECTION_IDS,
} from "@/lib/case-study-sections";

export type CaseStudyApproachItem = {
  decision: string;
  whyItMattered: string;
};

export type CaseStudySystemOverviewSection = {
  heading: string;
  bullets?: string[];
};

export type CaseStudySystemsProcessStep = {
  title: string;
  description: string;
};

export type CaseStudyDecisionCard = {
  label: string;
  body?: string;
  bullets?: string[];
  iconSrc?: string;
  iconAlt?: string;
  /** Optional footnote link rendered after the label (e.g. Calendar → privacy). */
  labelFootnote?: { href: string; ariaLabel?: string };
};

/** Decision-led narrative: short scannable cards after core insight. */
export type CaseStudyDecisionEngine = {
  title: string;
  intro?: string | string[];
  cards: CaseStudyDecisionCard[];
  /** TOC label; defaults to "Decision Engine". */
  tocLabel?: string;
};

/** Duorin merged: product principle narrative replacing beta pivot story. */
export type CaseStudyProductBet = {
  title?: string;
  tocLabel?: string;
  paragraphs: string[];
  callout: string;
  /** Leading phrase rendered with the brand gradient (remainder stays default text color). */
  calloutHighlight?: string;
};

/** Duorin merged: scannable signal cards before wardrobe intelligence layer. */
export type CaseStudySignals = {
  title: string;
  tocLabel?: string;
  intro: string;
  cards: CaseStudyDecisionCard[];
};

/** Duorin merged: on-device calendar boundary before systems narrative. */
export type CaseStudyPrivacyContext = {
  title?: string;
  tocLabel?: string;
  paragraphs: string[];
};

export type CaseStudyStrategyTimelineEntry = {
  label: string;
  body: string;
};

/** Beta-to-strategy timeline with connected alternating steps. */
export type CaseStudyStrategyTimeline = {
  title: string;
  intro?: string;
  entries: CaseStudyStrategyTimelineEntry[];
  quote?: string;
  artifact?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
};

/** Notebook artifact between strategy timeline and systems narrative. */
export type CaseStudyProductThinkingShift = {
  title?: string;
  paragraphs?: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  caption?: string;
  closing?: string;
};

export type CaseStudyProductArtifactImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudyProductArtifact = {
  title: string;
  layout: "compare" | "single";
  images: CaseStudyProductArtifactImage[];
  caption: string;
};

/** Visual-first product screenshots between systems narrative and evolution. */
export type CaseStudyProductArtifacts = {
  title?: string;
  artifacts: CaseStudyProductArtifact[];
};

/** Large closing product screenshot after evolution narrative. */
export type CaseStudyFinalExperience = {
  title?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    imageClassName?: string;
    sizes?: string;
  };
  caption?: string;
  outcomeChips?: string[];
  description?: string | string[];
  whatChanged?: {
    before: string[];
    after: string[];
  };
  closingParagraph?: string;
};

export type CaseStudyWalkthroughVideo = {
  title: string;
  caption: string;
  src?: string;
};

/** Stacked product demo videos after final experience. */
export type CaseStudyProductWalkthrough = {
  title?: string;
  videos: CaseStudyWalkthroughVideo[];
};

/** Systems-heavy case studies: upstream process pipeline with optional visual. */
export type CaseStudySystemsProcessLayer = {
  title: string;
  paragraphs: string[];
  steps: CaseStudySystemsProcessStep[];
  artifact?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  visual?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  /** Shown when `visual` is omitted. */
  visualPlaceholder?: string;
  postVisualInsight?: string;
};

function siteBracketFromUrl(href: string): string {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    return `(${host})`;
  } catch {
    return "(site)";
  }
}

export type CaseStudyProseSection = {
  title?: string;
  paragraphs: string[];
};

export type CaseStudyProductEvolution = {
  oldImageSrc: string;
  oldImageAlt: string;
  oldImageWidth: number;
  oldImageHeight: number;
  newVideoSrc: string;
  beforeTitle?: string;
  afterTitle?: string;
  summary: string;
  afterNote?: string;
  narrative?: string;
};

export type CaseStudyScopeStripItem = {
  label: string;
  iconSrc: string;
  iconAlt: string;
};

export type CaseStudyScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudyDetailProps = {
  name: string;
  /** Optional live product URL shown as a small bracketed link next to the title, e.g. (duorin.com) */
  titleHref?: string;
  /** Overrides visible link text when `titleHref` is set; defaults to (hostname) from URL */
  titleSiteBracket?: string;
  heroStatement: string;
  role: ReactNode;
  duration: string;
  /** Meta row label “Stack / Tools” (omit when `designBuild` is set). */
  stack?: string;
  /** Replaces stack row; label renders as DESIGN + BUILD. */
  designBuild?: string;
  /** Optional fourth meta row; label renders as LEADERSHIP. */
  leadership?: string;
  /** Optional label override for the fourth meta row. */
  leadershipLabel?: string;
  /** Duorin: visible bordered CSS-grid meta cells vs editorial dividers. */
  metaGridVariant?: "editorial" | "bordered";
  /** 2–3 short paragraphs: why the problem matters for users, product, or business */
  whyItMatters: string[];
  /** After hero/meta, before Why This Matters. */
  personalMotivation?: CaseStudyProseSection;
  /** Optional before/after narrative (e.g. Duorin product evolution) */
  productEvolution?: CaseStudyProductEvolution;
  heroScreenshot?: CaseStudyScreenshot;
  heroScreenshotCompact?: boolean;
  heroScreenshotCaption?: ReactNode;
  postInsightScreenshot?: CaseStudyScreenshot;
  postInsightScreenshotCompact?: boolean;
  postInsightScreenshotCaption?: ReactNode;
  /** After Design Approach, before system logic / Service Loop. */
  postApproachScreenshot?: CaseStudyScreenshot;
  postApproachScreenshotCaption?: ReactNode;
  /** Sketch/process artifact between Design Approach and Service Loop. */
  processArtifactScreenshot?: CaseStudyScreenshot;
  processArtifactCaption?: ReactNode;
  postSystemScreenshot?: CaseStudyScreenshot;
  postSystemScreenshotCaption?: ReactNode;
  /** Extra vertical pause before the post-system screenshot (e.g. after system logic). */
  postSystemScreenshotLeadSpace?: boolean;
  /** After system logic / Service Loop, before Stakeholder Reality when present. */
  postServiceLoopScreenshot?: CaseStudyScreenshot;
  postServiceLoopScreenshotCaption?: ReactNode;
  postServiceLoopScreenshotLeadSpace?: boolean;
  postImpactScreenshot?: CaseStudyScreenshot;
  postImpactScreenshotCaption?: ReactNode;
  /** Extra vertical pause before the post-impact screenshot (e.g. after Impact). */
  postImpactScreenshotLeadSpace?: boolean;
  systemOverview?: {
    title?: string;
    intro: string;
    pipelineNodes?: string[];
    sections: CaseStudySystemOverviewSection[];
    principle?: {
      statement: string;
      detail: string;
    };
  };
  earlySignalsFromBeta?: {
    title?: string;
    paragraphs: string[];
    bullets: string[];
    insight: string;
    closing?: string;
  };
  biasReduction?: {
    paragraphs: string[];
  };
  operationalConstraints?: string[];
  /** Duorin: high-level product principles */
  keyProductDecisions?: string[];
  problem: {
    intro: string;
    bullets: string[];
  };
  /** Placed after The Problem, before Core Insight (e.g. Duorin beta learnings). */
  betaLearnings?: {
    paragraphs: string[];
    bullets: string[];
    closing?: string;
    callout: string;
  };
  coreInsight?: string;
  coreInsightDifferentiator?: string;
  /** After Core Insight — decision-led narrative with scannable cards. */
  decisionEngine?: CaseStudyDecisionEngine;
  /** Duorin merged: replaces turning point / beta pivot narrative. */
  productBet?: CaseStudyProductBet;
  /** Duorin merged: signal cards before wardrobe intelligence layer. */
  signals?: CaseStudySignals;
  /** Duorin merged: privacy-aware calendar context boundary. */
  privacyContext?: CaseStudyPrivacyContext;
  /** After decision engine — beta observations to product strategy timeline. */
  strategyTimeline?: CaseStudyStrategyTimeline;
  /** After strategy timeline — notebook artifact on product shift. */
  productThinkingShift?: CaseStudyProductThinkingShift;
  /** Before systems process — upstream problem bridge. */
  hiddenProblem?: CaseStudyProseSection;
  /** After strategy timeline — upstream systems/process narrative. */
  systemsProcessLayer?: CaseStudySystemsProcessLayer;
  /** After systems process — large visual product screenshots. */
  productArtifacts?: CaseStudyProductArtifacts;
  /** After product evolution — closing full-width product screenshot. */
  finalExperience?: CaseStudyFinalExperience;
  /** After final experience — stacked product demo videos. */
  productWalkthrough?: CaseStudyProductWalkthrough;
  approach?: CaseStudyApproachItem[];
  systemLogic?: {
    input: string;
    logic: string;
    output: string;
  };
  systemLogicTitle?: string;
  /** Placed immediately after Input/Logic/Output flow (e.g. stakeholder grounding). */
  stakeholderReality?: string;
  /** Page-specific screenshot rhythm presets. */
  screenshotPresentation?: "snacknu" | "theyre-waiting" | "citizenx";
  impact: string[];
  reflection: {
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    /** Duorin merged: impact bullets under "What changed:" */
    whatChanged?: string[];
    /** Duorin merged: learning paragraphs under "What I learned:" */
    whatLearned?: string[];
    didNotWork?: string;
    improveNext?: string;
    /** When both are set, labels render on their own line above each paragraph (Duorin). */
    limitationLabel?: string;
    nextIterationLabel?: string;
  };
  /** Duorin: merged section headings and TOC order. */
  contentStructure?: "duorin-merged";
  /** Compact facts shown after hero meta (e.g. team size, beta users). */
  scopeStrip?: CaseStudyScopeStripItem[];
  /** Duorin only: gradient glyph before major section headings. */
  sectionHeadingGlyph?: boolean;
  inProgress?: boolean;
};

export function CaseStudyDetail(props: CaseStudyDetailProps) {
  const tocItems = buildCaseStudyTocItems(props);

  const {
    name,
    titleHref,
    titleSiteBracket,
    heroStatement,
    role,
    duration,
    stack,
    designBuild,
    leadership,
    leadershipLabel = "Leadership",
    metaGridVariant = "editorial",
    whyItMatters,
    personalMotivation,
    productEvolution,
    heroScreenshot,
    heroScreenshotCompact = false,
    heroScreenshotCaption,
    postInsightScreenshot,
    postInsightScreenshotCompact = false,
    postInsightScreenshotCaption,
    postApproachScreenshot,
    postApproachScreenshotCaption,
    processArtifactScreenshot,
    processArtifactCaption,
    postSystemScreenshot,
    postSystemScreenshotCaption,
    postSystemScreenshotLeadSpace = false,
    postServiceLoopScreenshot,
    postServiceLoopScreenshotCaption,
    postServiceLoopScreenshotLeadSpace = false,
    postImpactScreenshot,
    postImpactScreenshotCaption,
    postImpactScreenshotLeadSpace = false,
    systemOverview,
    earlySignalsFromBeta,
    biasReduction,
    operationalConstraints,
    keyProductDecisions,
    problem,
    betaLearnings,
    coreInsight,
    coreInsightDifferentiator,
    decisionEngine,
    productBet,
    signals,
    privacyContext,
    strategyTimeline,
    productThinkingShift,
    hiddenProblem,
    systemsProcessLayer,
    productArtifacts,
    finalExperience,
    productWalkthrough,
    approach,
    systemLogic,
    systemLogicTitle,
    stakeholderReality,
    screenshotPresentation,
    impact,
    reflection,
    inProgress,
    contentStructure,
    scopeStrip,
    sectionHeadingGlyph = false,
  } = props;

  const duorinMerged = contentStructure === "duorin-merged";

  const snacknuScreens = screenshotPresentation === "snacknu";
  const theyreWaitingScreens = screenshotPresentation === "theyre-waiting";
  const citizenxScreens = screenshotPresentation === "citizenx";
  const isPostApproachSketch = postApproachScreenshot?.src.includes("sketch-paper.webp") ?? false;
  const mobileUnifiedClass = "case-study-screenshot--snacknu-unified";
  const mobileUnifiedSizes = "(max-width: 900px) min(92vw, 300px), 300px";
  /** Mirrors `.case-study-screenshot--snacknu-unified`; inline so cached CSS cannot stale sizing. */
  const snacknuScreenshotStyle: CSSProperties | undefined = snacknuScreens
    ? { maxWidth: "min(92vw, 300px)", width: "100%", height: "auto" }
    : undefined;
  const sketchInlineStyle: CSSProperties = { width: "76.5%", height: "auto" };

  return (
    <>
      <CaseStudyTOC items={tocItems} />
      <div
        className={
          (snacknuScreens
            ? "case-study-detail-wrap case-study-detail-wrap--snacknu-screens"
            : theyreWaitingScreens
              ? "case-study-detail-wrap case-study-detail-wrap--theyre-waiting-screens"
              : citizenxScreens
                ? "case-study-detail-wrap case-study-detail-wrap--citizenx-screens"
                : "case-study-detail-wrap") +
          (sectionHeadingGlyph ? " case-study-detail-wrap--section-glyphs" : "")
        }
      >
        <div className="case-study-detail-inner">
        <Suspense
          fallback={
            <CaseStudiesBreadcrumb
              crumbClassName="case-study-back"
              crumbs={[
                { label: "Case Studies", href: "/case-studies" },
                { label: "Classic", href: "/case-studies/classic" },
                { label: name },
              ]}
            />
          }
        >
          <CaseStudyDetailBreadcrumb projectName={name} />
        </Suspense>

        {inProgress ? (
          <p className="case-study-kicker" aria-live="polite">
            Case study in progress — structure and narrative are being finalized.
          </p>
        ) : null}

        <header id={CASE_STUDY_SECTION_IDS.overview} className="case-study-hero">
          <h1 className="case-study-hero-name">
            {name}
            {titleHref ? (
              <>
                {" "}
                <a
                  href={titleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-title-site-link"
                >
                  {titleSiteBracket ?? siteBracketFromUrl(titleHref)}
                </a>
              </>
            ) : null}
          </h1>
          <p className="case-study-hero-statement">{heroStatement}</p>
          {metaGridVariant === "bordered" ? (
            <dl className="case-study-meta-grid case-study-meta-grid--bordered">
              <div className="case-study-meta-cell">
                <dt>Role</dt>
                <dd>{role}</dd>
              </div>
              <div className="case-study-meta-cell">
                <dt>Duration</dt>
                <dd>{duration}</dd>
              </div>
              {designBuild ? (
                <div className="case-study-meta-cell case-study-meta-cell-span">
                  <dt>Design + Build</dt>
                  <dd>{designBuild}</dd>
                </div>
              ) : stack ? (
                <div className="case-study-meta-cell case-study-meta-cell-span">
                  <dt>Stack / Tools</dt>
                  <dd>{stack}</dd>
                </div>
              ) : null}
              {leadership ? (
                <div className="case-study-meta-cell case-study-meta-cell-span">
                  <dt>{leadershipLabel}</dt>
                  <dd>{leadership}</dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <dl className="case-study-meta-grid">
              <div className="case-study-meta-row-first">
                <div>
                  <dt>Role</dt>
                  <dd>{role}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{duration}</dd>
                </div>
              </div>
              {designBuild ? (
                <div className="case-study-meta-span case-study-meta-row-mid">
                  <dt>Design + Build</dt>
                  <dd>{designBuild}</dd>
                </div>
              ) : stack ? (
                <div className="case-study-meta-span case-study-meta-row-mid">
                  <dt>Stack / Tools</dt>
                  <dd>{stack}</dd>
                </div>
              ) : null}
              {leadership ? (
                <div className="case-study-meta-span">
                  <dt>{leadershipLabel}</dt>
                  <dd>{leadership}</dd>
                </div>
              ) : null}
            </dl>
          )}
        </header>

        {scopeStrip?.length ? (
          <div className="case-study-scope-strip">
            {scopeStrip.map((item) => (
              <span key={item.label} className="case-study-scope-chip">
                <span className="case-study-scope-chip-icon-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.iconSrc}
                    alt={item.iconAlt}
                    className="case-study-scope-chip-icon"
                    width={160}
                    height={160}
                    draggable={false}
                  />
                </span>
                <span className="case-study-scope-chip-label">{item.label}</span>
              </span>
            ))}
          </div>
        ) : null}

        {heroScreenshot ? (
          <section
            id={CASE_STUDY_SECTION_IDS.heroScreenshot}
            className="case-study-section case-study-screenshot-block case-study-screenshot-block--hero"
          >
            <div className="case-study-screenshot-stack">
              <Image
                src={heroScreenshot.src}
                alt={heroScreenshot.alt}
                width={heroScreenshot.width}
                height={heroScreenshot.height}
                sizes={
                  snacknuScreens
                    ? mobileUnifiedSizes
                    : heroScreenshotCompact
                      ? "(max-width: 900px) 62vw, 360px"
                      : "(max-width: 900px) 100vw, 820px"
                }
                priority={snacknuScreens}
                unoptimized={snacknuScreens}
                style={snacknuScreenshotStyle}
                className={`case-study-screenshot ${
                  snacknuScreens
                    ? mobileUnifiedClass
                    : heroScreenshotCompact
                      ? "case-study-screenshot--post-system"
                      : "case-study-screenshot--hero"
                }`}
                draggable={false}
              />
              {heroScreenshotCaption ? (
                <p className="case-study-screenshot-caption">
                  {heroScreenshotCaption}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {personalMotivation ? (
          <section
            id={
              duorinMerged
                ? CASE_STUDY_SECTION_IDS.whyBuiltDuorin
                : CASE_STUDY_SECTION_IDS.personalMotivation
            }
            className="case-study-section case-study-section--after-hero"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {personalMotivation.title ??
                (duorinMerged ? "Why Duorin Exists" : "Personal Motivation")}
            </CaseStudySectionHeading>
            {personalMotivation.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className={`case-study-prose${
                  /^[\u201c"]/.test(paragraph) || paragraph === "What should I wear today?"
                    ? " case-study-prose--center"
                    : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {!duorinMerged ? (
          <section
            id={CASE_STUDY_SECTION_IDS.whyThisMatters}
            className={`case-study-section${
              personalMotivation ? "" : " case-study-section--after-hero"
            }`}
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Why this matters</CaseStudySectionHeading>
            {whyItMatters.map((paragraph, i) => (
              <p key={i} className="case-study-prose">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {duorinMerged && productBet ? (
          <section id={CASE_STUDY_SECTION_IDS.turningPoint} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {productBet.title ?? "The Product Bet"}
            </CaseStudySectionHeading>
            {productBet.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className={`case-study-prose${
                  /^[\u201c"]/.test(paragraph) ? " case-study-prose--center" : ""
                }`}
              >
                {paragraph}
              </p>
            ))}
            <p className="case-study-product-bet-callout">
              {productBet.calloutHighlight &&
              productBet.callout.startsWith(productBet.calloutHighlight) ? (
                <>
                  <span className="case-study-product-bet-callout-highlight">
                    {productBet.calloutHighlight}
                  </span>
                  {productBet.callout.slice(productBet.calloutHighlight.length)}
                </>
              ) : (
                productBet.callout
              )}
            </p>
          </section>
        ) : !duorinMerged ? (
          <>
            <section id={CASE_STUDY_SECTION_IDS.theProblem} className="case-study-section">
              <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>The Problem</CaseStudySectionHeading>
              <p className="case-study-prose">{problem.intro}</p>
              <ul className="case-study-bullets">
                {problem.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>

            {betaLearnings ? (
              <section id={CASE_STUDY_SECTION_IDS.betaLearnings} className="case-study-section">
                <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>What We Learned During Beta</CaseStudySectionHeading>
                {betaLearnings.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="case-study-prose">
                    {paragraph}
                  </p>
                ))}
                <ul className="case-study-bullets">
                  {betaLearnings.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {betaLearnings.closing ? (
                  <p className="case-study-prose case-study-prose-tight">{betaLearnings.closing}</p>
                ) : null}
                <div className="case-study-beta-insight">
                  <p className="case-study-prose case-study-prose-tight">{betaLearnings.callout}</p>
                </div>
              </section>
            ) : null}

            {coreInsight ? (
              <section id={CASE_STUDY_SECTION_IDS.coreInsight} className="case-study-section">
                <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Core Insight</CaseStudySectionHeading>
                <p className="case-study-prose">{coreInsight}</p>
                {coreInsightDifferentiator ? (
                  <p className="case-study-prose case-study-core-diff">
                    {coreInsightDifferentiator}
                  </p>
                ) : null}
              </section>
            ) : null}
          </>
        ) : null}

        {duorinMerged && signals ? (
          <section id={CASE_STUDY_SECTION_IDS.signals} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>{signals.title}</CaseStudySectionHeading>
            <p className="case-study-prose">{signals.intro}</p>
            <div className="case-study-decision-grid case-study-decision-grid--signal-cards">
              {signals.cards.map((card) => (
                <article key={card.label} className="case-study-decision-card">
                  <div className="case-study-decision-card-copy">
                    <p className="case-study-decision-label">
                      {card.label}
                      {card.labelFootnote ? (
                        <a
                          href={card.labelFootnote.href}
                          className="case-study-decision-label-footnote"
                          aria-label={card.labelFootnote.ariaLabel ?? "Privacy by Design"}
                        >
                          *
                        </a>
                      ) : null}
                    </p>
                    {card.body ? (
                      <p className="case-study-decision-body">{card.body}</p>
                    ) : null}
                  </div>
                  {card.iconSrc ? (
                    <span className="case-study-decision-card-icon-wrap" aria-hidden="true">
                      <Image
                        src={card.iconSrc}
                        alt={card.iconAlt ?? ""}
                        width={108}
                        height={108}
                        className="case-study-decision-card-icon"
                        draggable={false}
                      />
                    </span>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {decisionEngine ? (
          <section
            id={CASE_STUDY_SECTION_IDS.decisionEngine}
            className="case-study-section case-study-decision-engine"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>{decisionEngine.title}</CaseStudySectionHeading>
            {decisionEngine.intro
              ? (Array.isArray(decisionEngine.intro)
                  ? decisionEngine.intro
                  : [decisionEngine.intro]
                ).map((paragraph) => (
                  <p key={paragraph} className="case-study-prose">
                    {paragraph}
                  </p>
                ))
              : null}
            <div
              className={`case-study-decision-grid${
                decisionEngine.cards.length === 2 ? " case-study-decision-grid--pair" : ""
              }`}
            >
              {decisionEngine.cards.map((card) => (
                <article key={card.label} className="case-study-decision-card">
                  <p className="case-study-decision-label">{card.label}</p>
                  {card.bullets?.length ? (
                    <ul className="case-study-bullets case-study-bullets--dash case-study-decision-bullets">
                      {card.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : card.body ? (
                    <p className="case-study-decision-body">{card.body}</p>
                  ) : null}
                </article>
              ))}
            </div>
            {duorinMerged && productThinkingShift ? (
              <figure className="case-study-systems-artifact case-study-systems-artifact--thinking">
                <div className="case-study-evolution-card-frame case-study-systems-artifact-card">
                  <div className="case-study-systems-artifact-media-wrap">
                    <Image
                      src={productThinkingShift.image.src}
                      alt={productThinkingShift.image.alt}
                      width={productThinkingShift.image.width}
                      height={productThinkingShift.image.height}
                      sizes="(max-width: 900px) 92vw, 240px"
                      className="case-study-systems-artifact-image"
                      draggable={false}
                    />
                  </div>
                  {productThinkingShift.caption ? (
                    <figcaption className="product-evolution-summary">
                      {productThinkingShift.caption}
                    </figcaption>
                  ) : null}
                </div>
              </figure>
            ) : null}
          </section>
        ) : null}

        {strategyTimeline ? (
          <section
            id={CASE_STUDY_SECTION_IDS.strategyTimeline}
            className="case-study-section case-study-strategy-timeline-section"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>{strategyTimeline.title}</CaseStudySectionHeading>
            {strategyTimeline.intro ? (
              <p className="case-study-prose">{strategyTimeline.intro}</p>
            ) : null}
            <ol className="case-study-strategy-timeline">
              {strategyTimeline.entries.map((entry, index) => (
                <li key={entry.label} className="case-study-strategy-step">
                  <span className="case-study-strategy-marker" aria-hidden="true">
                    {index + 1}
                  </span>
                  <article className="case-study-strategy-card">
                    <p className="case-study-strategy-label">{entry.label}</p>
                    <p className="case-study-strategy-body">{entry.body}</p>
                  </article>
                </li>
              ))}
            </ol>
            {strategyTimeline.artifact ? (
              <figure className="case-study-strategy-artifact">
                <Image
                  src={strategyTimeline.artifact.src}
                  alt={strategyTimeline.artifact.alt}
                  width={strategyTimeline.artifact.width}
                  height={strategyTimeline.artifact.height}
                  sizes="(max-width: 900px) 92vw, 420px"
                  className="case-study-strategy-artifact-image"
                  draggable={false}
                />
                <figcaption className="case-study-strategy-artifact-caption">
                  {strategyTimeline.artifact.caption}
                </figcaption>
              </figure>
            ) : null}
            {strategyTimeline.quote ? (
              <div className="case-study-beta-insight">
                <p className="case-study-prose case-study-prose-tight">{strategyTimeline.quote}</p>
              </div>
            ) : null}
          </section>
        ) : null}

        {!duorinMerged && productThinkingShift ? (
          <section
            id={CASE_STUDY_SECTION_IDS.productThinkingShift}
            className="case-study-section case-study-systems-process"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {productThinkingShift.title ?? "Product Thinking Shift"}
            </CaseStudySectionHeading>
            {productThinkingShift.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="case-study-prose">
                {paragraph}
              </p>
            ))}
            <figure className="case-study-systems-artifact case-study-systems-artifact--thinking">
              <div className="case-study-evolution-card-frame case-study-systems-artifact-card">
                <div className="case-study-systems-artifact-media-wrap">
                  <Image
                    src={productThinkingShift.image.src}
                    alt={productThinkingShift.image.alt}
                    width={productThinkingShift.image.width}
                    height={productThinkingShift.image.height}
                    sizes="(max-width: 900px) 92vw, 240px"
                    className="case-study-systems-artifact-image"
                    draggable={false}
                  />
                </div>
                {productThinkingShift.caption ? (
                  <figcaption className="product-evolution-summary">
                    {productThinkingShift.caption}
                  </figcaption>
                ) : null}
                {productThinkingShift.closing ? (
                  <figcaption className="product-evolution-summary">
                    {productThinkingShift.closing}
                  </figcaption>
                ) : null}
              </div>
            </figure>
          </section>
        ) : null}

        {!duorinMerged && hiddenProblem ? (
          <section
            id={CASE_STUDY_SECTION_IDS.hiddenProblem}
            className="case-study-section"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {hiddenProblem.title ?? "The Hidden Problem"}
            </CaseStudySectionHeading>
            {hiddenProblem.paragraphs.map((paragraph) => (
              <p key={paragraph} className="case-study-prose">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {systemsProcessLayer ? (
          <section
            id={
              duorinMerged
                ? CASE_STUDY_SECTION_IDS.intelligenceLayer
                : CASE_STUDY_SECTION_IDS.systemsProcessLayer
            }
            className="case-study-section case-study-systems-process"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {systemsProcessLayer.title}
            </CaseStudySectionHeading>
            {systemsProcessLayer.paragraphs.map((paragraph) => (
              <p key={paragraph} className="case-study-prose">
                {paragraph}
              </p>
            ))}
            <div className="case-study-process-row">
              {systemsProcessLayer.steps.map((step, index) => (
                <article key={step.title} className="case-study-process-step">
                  <p className="case-study-process-step-num">{index + 1}</p>
                  <h3 className="case-study-process-step-title">{step.title}</h3>
                  <p className="case-study-process-step-desc">{step.description}</p>
                </article>
              ))}
            </div>
            {systemsProcessLayer.artifact ? (
              <figure className="case-study-systems-artifact">
                <div className="case-study-evolution-card-frame case-study-systems-artifact-card">
                  <div className="case-study-systems-artifact-media-wrap">
                    <Image
                      src={systemsProcessLayer.artifact.src}
                      alt={systemsProcessLayer.artifact.alt}
                      width={systemsProcessLayer.artifact.width}
                      height={systemsProcessLayer.artifact.height}
                      sizes="(max-width: 900px) 92vw, 288px"
                      className="case-study-systems-artifact-image"
                      draggable={false}
                    />
                  </div>
                  <figcaption className="product-evolution-summary">
                    {systemsProcessLayer.artifact.caption}
                  </figcaption>
                </div>
              </figure>
            ) : systemsProcessLayer.visual ? (
              <figure className="case-study-visual">
                <Image
                  src={systemsProcessLayer.visual.src}
                  alt={systemsProcessLayer.visual.alt}
                  width={systemsProcessLayer.visual.width}
                  height={systemsProcessLayer.visual.height}
                  sizes="(max-width: 900px) 100vw, 840px"
                  className="case-study-visual-image"
                  draggable={false}
                />
                <figcaption className="case-study-visual-caption">
                  {systemsProcessLayer.visual.caption}
                </figcaption>
              </figure>
            ) : systemsProcessLayer.visualPlaceholder ? (
              <div className="case-study-visual-placeholder" aria-label="Visual placeholder">
                <p className="case-study-visual-placeholder-kicker">Visual to add:</p>
                <p className="case-study-visual-placeholder-text">
                  {systemsProcessLayer.visualPlaceholder}
                </p>
              </div>
            ) : null}
            {systemsProcessLayer.postVisualInsight ? (
              <div className="case-study-beta-insight case-study-beta-insight--after-artifact">
                <p className="case-study-prose case-study-prose-tight">
                  {systemsProcessLayer.postVisualInsight}
                </p>
              </div>
            ) : null}
          </section>
        ) : null}

        {productArtifacts ? (
          <section
            id={CASE_STUDY_SECTION_IDS.productArtifacts}
            className="case-study-section case-study-artifacts-section"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {productArtifacts.title ?? "Product Artifacts"}
            </CaseStudySectionHeading>
            <div className="case-study-artifacts-list">
              {productArtifacts.artifacts.map((artifact) => (
                <article key={artifact.title} className="case-study-artifact">
                  <h3 className="case-study-artifact-title">{artifact.title}</h3>
                  <div
                    className={
                      artifact.layout === "compare"
                        ? "case-study-artifact-visual case-study-artifact-compare"
                        : "case-study-artifact-visual case-study-artifact-single"
                    }
                  >
                    {artifact.images.map((image) => (
                      <Image
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes={
                          artifact.layout === "compare"
                            ? "(max-width: 720px) 100vw, 420px"
                            : "(max-width: 900px) 72vw, 420px"
                        }
                        className="case-study-artifact-image"
                        draggable={false}
                      />
                    ))}
                  </div>
                  <p className="case-study-artifact-caption">{artifact.caption}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {postInsightScreenshot ? (
          <section
            id={CASE_STUDY_SECTION_IDS.postInsightScreenshot}
            className="case-study-section case-study-screenshot-block case-study-screenshot-block--post-insight"
          >
            <div className="case-study-screenshot-stack">
              <Image
                src={postInsightScreenshot.src}
                alt={postInsightScreenshot.alt}
                width={postInsightScreenshot.width}
                height={postInsightScreenshot.height}
                sizes={
                  postInsightScreenshotCompact
                    ? "(max-width: 900px) 62vw, 360px"
                    : "(max-width: 900px) 92vw, 680px"
                }
                className={`case-study-screenshot ${
                  postInsightScreenshotCompact
                    ? "case-study-screenshot--post-system"
                    : "case-study-screenshot--post-insight"
                }`}
                draggable={false}
              />
              {postInsightScreenshotCaption ? (
                <p className="case-study-screenshot-caption">
                  {postInsightScreenshotCaption}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {productEvolution ? (
          <section id={CASE_STUDY_SECTION_IDS.productEvolution} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Product Evolution</CaseStudySectionHeading>
            <div className="case-study-evolution-compare case-study-evolution-compare--panel">
              <div className="case-study-evolution-card-frame case-study-evolution-card-frame--compare">
                <div className="product-evolution-row">
                  <div className="case-study-evolution-media-slot product-evolution-column">
                    <p className="case-study-evolution-card-label">Before</p>
                    <Image
                      src={productEvolution.oldImageSrc}
                      alt={productEvolution.oldImageAlt}
                      width={productEvolution.oldImageWidth}
                      height={productEvolution.oldImageHeight}
                      sizes="(max-width: 520px) min(360px, 100vw), 360px"
                      className="case-study-evolution-media"
                      draggable={false}
                    />
                  </div>
                  <div className="case-study-evolution-compare-arrow" aria-hidden="true">
                    {Array.from({ length: 6 }, (_, index) => (
                      <span key={index} className="case-study-evolution-compare-arrow-dot" />
                    ))}
                    <span className="case-study-evolution-compare-arrow-chevron" aria-hidden="true">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 2L7 5L2 8"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="case-study-evolution-media-slot product-evolution-column">
                    <p className="case-study-evolution-card-label">After</p>
                    <AutoplayVideo
                      src={productEvolution.newVideoSrc}
                      className="case-study-evolution-media"
                    />
                  </div>
                </div>
                <p className="product-evolution-summary">{productEvolution.summary}</p>
              </div>
            </div>
          </section>
        ) : null}

        {duorinMerged && (finalExperience || productWalkthrough) ? (
          <section
            id={CASE_STUDY_SECTION_IDS.finalProduct}
            className="case-study-section case-study-final-experience"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {finalExperience?.title ?? "Final Product"}
            </CaseStudySectionHeading>
            {finalExperience?.description
              ? (Array.isArray(finalExperience.description)
                  ? finalExperience.description
                  : [finalExperience.description]
                )
                  .slice(0, 1)
                  .map((paragraph) => (
                    <p key={paragraph} className="case-study-prose">
                      {paragraph}
                    </p>
                  ))
              : null}
            {finalExperience?.image ? (
              <figure className="case-study-final-experience-figure">
                <Image
                  src={finalExperience.image.src}
                  alt={finalExperience.image.alt}
                  width={finalExperience.image.width}
                  height={finalExperience.image.height}
                  sizes={finalExperience.image.sizes ?? "(max-width: 900px) 100vw, 840px"}
                  className={
                    finalExperience.image.imageClassName ??
                    "case-study-final-experience-image"
                  }
                  draggable={false}
                />
                {finalExperience.caption ? (
                  <figcaption className="case-study-final-experience-caption">
                    {finalExperience.caption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
            {finalExperience?.description
              ? (Array.isArray(finalExperience.description)
                  ? finalExperience.description
                  : [finalExperience.description]
                )
                  .slice(1)
                  .map((paragraph) => (
                    <p
                      key={paragraph}
                      className="case-study-prose case-study-final-experience-closing"
                    >
                      {paragraph}
                    </p>
                  ))
              : null}
            {productWalkthrough ? (
              <div className="case-study-walkthrough-list">
                {productWalkthrough.videos.map((video) => (
                  <article key={video.title} className="case-study-walkthrough-block">
                    <h3 className="case-study-artifact-title">{video.title}</h3>
                    <div className="case-study-evolution-card-frame case-study-walkthrough-card">
                      <div className="case-study-walkthrough-media-wrap">
                        {video.src ? (
                          <AutoplayVideo
                            src={video.src}
                            className="case-study-evolution-media"
                          />
                        ) : (
                          <div
                            className="case-study-visual-placeholder case-study-walkthrough-placeholder"
                            aria-label="Video placeholder"
                          >
                            <p className="case-study-visual-placeholder-kicker">Video to add</p>
                          </div>
                        )}
                      </div>
                      <p className="product-evolution-summary">{video.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        ) : (
          <>
            {finalExperience ? (
              <section
                id={CASE_STUDY_SECTION_IDS.finalExperience}
                className="case-study-section case-study-final-experience"
              >
                <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
                  {finalExperience.title ?? "Final Experience"}
                </CaseStudySectionHeading>
                {finalExperience.image ? (
                  <figure className="case-study-final-experience-figure">
                    <Image
                      src={finalExperience.image.src}
                      alt={finalExperience.image.alt}
                      width={finalExperience.image.width}
                      height={finalExperience.image.height}
                      sizes={finalExperience.image.sizes ?? "(max-width: 900px) 100vw, 840px"}
                      className={
                        finalExperience.image.imageClassName ??
                        "case-study-final-experience-image"
                      }
                      draggable={false}
                    />
                    {finalExperience.caption ? (
                      <figcaption className="case-study-final-experience-caption">
                        {finalExperience.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}
                {finalExperience.outcomeChips?.length ? (
                  <div className="case-study-final-experience-chips">
                    {finalExperience.outcomeChips.map((chip) => (
                      <span key={chip} className="pipeline-step">
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}
                {finalExperience.description ? (
                  (Array.isArray(finalExperience.description)
                    ? finalExperience.description
                    : [finalExperience.description]
                  ).map((paragraph) => (
                    <p
                      key={paragraph}
                      className="case-study-prose case-study-final-experience-closing"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : null}
                {finalExperience.whatChanged ? (
                  <div className="case-study-final-experience-changes">
                    <p className="case-study-artifact-title">What Changed</p>
                    <div className="case-study-evolution-compare">
                      <div className="case-study-evolution-card">
                        <p className="case-study-evolution-card-label">Before</p>
                        <ul className="case-study-bullets case-study-bullets--dash">
                          {finalExperience.whatChanged.before.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="case-study-evolution-card">
                        <p className="case-study-evolution-card-label">After</p>
                        <ul className="case-study-bullets case-study-bullets--dash">
                          {finalExperience.whatChanged.after.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : null}
                {finalExperience.closingParagraph ? (
                  <p className="case-study-prose case-study-final-experience-closing">
                    {finalExperience.closingParagraph}
                  </p>
                ) : null}
              </section>
            ) : null}

            {productWalkthrough ? (
              <section
                id={CASE_STUDY_SECTION_IDS.productWalkthrough}
                className="case-study-section"
              >
                <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
                  {productWalkthrough.title ?? "Product Walkthrough"}
                </CaseStudySectionHeading>
                <div className="case-study-walkthrough-list">
                  {productWalkthrough.videos.map((video) => (
                    <article key={video.title} className="case-study-walkthrough-block">
                      <h3 className="case-study-artifact-title">{video.title}</h3>
                      <div className="case-study-evolution-card-frame case-study-walkthrough-card">
                        <div className="case-study-walkthrough-media-wrap">
                          {video.src ? (
                            <AutoplayVideo
                              src={video.src}
                              className="case-study-evolution-media"
                            />
                          ) : (
                            <div
                              className="case-study-visual-placeholder case-study-walkthrough-placeholder"
                              aria-label="Video placeholder"
                            >
                              <p className="case-study-visual-placeholder-kicker">Video to add</p>
                            </div>
                          )}
                        </div>
                        <p className="product-evolution-summary">{video.caption}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}

        {systemOverview ? (
          <section
            id={CASE_STUDY_SECTION_IDS.systemOverview}
            className="case-study-section case-study-system-overview"
          >
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {systemOverview.title ?? "System Overview"}
            </CaseStudySectionHeading>
            <p className="case-study-prose case-study-system-intro">
              {systemOverview.intro}
            </p>
            {systemOverview.pipelineNodes?.length ? (
              <div className="system-pipeline" aria-label="System flow">
                <div className="pipeline-step">{systemOverview.pipelineNodes[0]}</div>
                <div className="pipeline-arrow" aria-hidden>
                  →
                </div>
                <div className="pipeline-step">{systemOverview.pipelineNodes[1]}</div>
                <div className="pipeline-arrow" aria-hidden>
                  →
                </div>
                <div className="pipeline-step">{systemOverview.pipelineNodes[2]}</div>
              </div>
            ) : null}
            <div className="system-cards">
              {systemOverview.sections.map((section) => (
                <article key={section.heading} className="case-study-system-card">
                  <h3 className="case-study-system-heading">{section.heading}</h3>
                  {section.bullets?.length ? (
                    <ul className="case-study-system-bullets">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
            {systemOverview.principle ? (
              <div className="case-study-system-principle">
                <p className="case-study-system-principle-statement">
                  {systemOverview.principle.statement}
                </p>
                <p className="case-study-prose case-study-prose-tight case-study-system-principle-detail">
                  {systemOverview.principle.detail}
                </p>
              </div>
            ) : null}
          </section>
        ) : null}

        {earlySignalsFromBeta ? (
          <section id={CASE_STUDY_SECTION_IDS.earlySignalsFromBeta} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {earlySignalsFromBeta.title ?? "Early Signals from Beta"}
            </CaseStudySectionHeading>
            {earlySignalsFromBeta.paragraphs.map((paragraph) => (
              <p key={paragraph} className="case-study-prose">
                {paragraph}
              </p>
            ))}
            <ul className="case-study-bullets case-study-bullets--dash">
              {earlySignalsFromBeta.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className="case-study-prose case-study-prose-tight">
              A consistent pattern emerged:
            </p>
            <div className="case-study-beta-insight">
              <p className="case-study-prose case-study-prose-tight">
                {earlySignalsFromBeta.insight}
              </p>
            </div>
            {earlySignalsFromBeta.closing ? (
              <p className="case-study-prose case-study-prose-tight">
                {earlySignalsFromBeta.closing}
              </p>
            ) : null}
          </section>
        ) : null}

        {biasReduction ? (
          <section id={CASE_STUDY_SECTION_IDS.biasReduction} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Bias Reduction</CaseStudySectionHeading>
            {biasReduction.paragraphs.map((paragraph) => (
              <p key={paragraph} className="case-study-prose">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {operationalConstraints?.length ? (
          <section id={CASE_STUDY_SECTION_IDS.operationalConstraints} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Operational Constraints</CaseStudySectionHeading>
            <ul className="case-study-bullets">
              {operationalConstraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {keyProductDecisions?.length ? (
          <section id={CASE_STUDY_SECTION_IDS.keyProductDecisions} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Key product decisions</CaseStudySectionHeading>
            <ul className="case-study-bullets case-study-bullets--dash case-study-key-decisions">
              {keyProductDecisions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {approach?.length ? (
          <section id={CASE_STUDY_SECTION_IDS.designApproach} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Design Approach</CaseStudySectionHeading>
            <ol className="case-study-approach-list">
              {approach.map((item, i) => (
                <li key={i}>
                  <span className="case-study-approach-num">{i + 1}.</span>
                  <div className="case-study-approach-body">
                    <p className="case-study-approach-decision">{item.decision}</p>
                    <p className="case-study-approach-why">
                      <span className="case-study-approach-label">Why it mattered: </span>
                      {item.whyItMattered}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {postApproachScreenshot ? (
          <section
            id={CASE_STUDY_SECTION_IDS.postApproachScreenshot}
            className={`case-study-section case-study-screenshot-block${
              isPostApproachSketch
                ? " case-study-screenshot-block--artifact"
                : snacknuScreens
                  ? ""
                  : " case-study-screenshot-block--post-system"
            }`}
          >
            <div className="case-study-screenshot-stack">
              <Image
                src={postApproachScreenshot.src}
                alt={postApproachScreenshot.alt}
                width={postApproachScreenshot.width}
                height={postApproachScreenshot.height}
                sizes={
                  isPostApproachSketch
                    ? "(max-width: 900px) 92vw, 1061px"
                    : snacknuScreens
                      ? mobileUnifiedSizes
                      : "(max-width: 900px) 62vw, 360px"
                }
                unoptimized={snacknuScreens}
                style={isPostApproachSketch ? sketchInlineStyle : snacknuScreenshotStyle}
                className={`case-study-screenshot ${
                  isPostApproachSketch
                    ? "case-study-screenshot--process-artifact"
                    : snacknuScreens
                      ? mobileUnifiedClass
                      : "case-study-screenshot--post-system"
                }`}
                draggable={false}
              />
              {postApproachScreenshotCaption ? (
                <p className="case-study-screenshot-caption">{postApproachScreenshotCaption}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {processArtifactScreenshot ? (
          <section
            id={CASE_STUDY_SECTION_IDS.processArtifact}
            className="case-study-section case-study-screenshot-block case-study-screenshot-block--artifact"
          >
            <div className="case-study-screenshot-stack">
              <Image
                src={processArtifactScreenshot.src}
                alt={processArtifactScreenshot.alt}
                width={processArtifactScreenshot.width}
                height={processArtifactScreenshot.height}
                sizes="(max-width: 900px) 92vw, 1061px"
                className="case-study-screenshot case-study-screenshot--process-artifact"
                draggable={false}
              />
              {processArtifactCaption ? (
                <p className="case-study-screenshot-caption">{processArtifactCaption}</p>
              ) : null}
            </div>
          </section>
        ) : null}

        {systemLogic ? (
          <section id={CASE_STUDY_SECTION_IDS.systemLogic} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {systemLogicTitle ?? "System Logic"}
            </CaseStudySectionHeading>
            <div className="case-study-flow">
              <div className="case-study-flow-row">
                <span className="case-study-flow-label">Input</span>
                <span className="case-study-flow-text">{systemLogic.input}</span>
              </div>
              <div className="case-study-flow-row">
                <span className="case-study-flow-label">Logic</span>
                <span className="case-study-flow-text">{systemLogic.logic}</span>
              </div>
              <div className="case-study-flow-row">
                <span className="case-study-flow-label">Output</span>
                <span className="case-study-flow-text">{systemLogic.output}</span>
              </div>
            </div>
          </section>
        ) : null}

        {postServiceLoopScreenshot ? (
          <section
            id={CASE_STUDY_SECTION_IDS.postServiceLoopScreenshot}
            className={`case-study-section case-study-screenshot-block${
              snacknuScreens ? "" : " case-study-screenshot-block--post-system"
            }`}
          >
            <div className="case-study-screenshot-stack">
              {postServiceLoopScreenshotLeadSpace ? (
                <p className="case-study-screenshot-lead-space" aria-hidden="true">
                  &nbsp;
                </p>
              ) : null}
              <Image
                src={postServiceLoopScreenshot.src}
                alt={postServiceLoopScreenshot.alt}
                width={postServiceLoopScreenshot.width}
                height={postServiceLoopScreenshot.height}
                sizes={snacknuScreens ? mobileUnifiedSizes : "(max-width: 900px) 62vw, 360px"}
                unoptimized={snacknuScreens}
                style={snacknuScreenshotStyle}
                className={`case-study-screenshot ${
                  snacknuScreens ? mobileUnifiedClass : "case-study-screenshot--post-system"
                }`}
                draggable={false}
              />
              {postServiceLoopScreenshotCaption ? (
                <p className="case-study-screenshot-caption">
                  {postServiceLoopScreenshotCaption}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {stakeholderReality ? (
          <section id={CASE_STUDY_SECTION_IDS.stakeholderReality} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Stakeholder Reality</CaseStudySectionHeading>
            <p className="case-study-prose">{stakeholderReality}</p>
          </section>
        ) : null}

        {postSystemScreenshot ? (
          <section
            id={CASE_STUDY_SECTION_IDS.postSystemScreenshot}
            className={`case-study-section case-study-screenshot-block${
              snacknuScreens ? "" : " case-study-screenshot-block--post-system"
            }`}
          >
            <div className="case-study-screenshot-stack">
              {postSystemScreenshotLeadSpace ? (
                <p className="case-study-screenshot-lead-space" aria-hidden="true">
                  &nbsp;
                </p>
              ) : null}
              <Image
                src={postSystemScreenshot.src}
                alt={postSystemScreenshot.alt}
                width={postSystemScreenshot.width}
                height={postSystemScreenshot.height}
                sizes={snacknuScreens ? mobileUnifiedSizes : "(max-width: 900px) 62vw, 360px"}
                unoptimized={snacknuScreens}
                style={snacknuScreenshotStyle}
                className={`case-study-screenshot ${
                  snacknuScreens ? mobileUnifiedClass : "case-study-screenshot--post-system"
                }`}
                draggable={false}
              />
              {postSystemScreenshotCaption ? (
                <p className="case-study-screenshot-caption">
                  {postSystemScreenshotCaption}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {!duorinMerged ? (
          <section id={CASE_STUDY_SECTION_IDS.impact} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>Impact</CaseStudySectionHeading>
            <ul className="case-study-bullets">
              {impact.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {postImpactScreenshot ? (
          <section
            id={CASE_STUDY_SECTION_IDS.postImpactScreenshot}
            className={`case-study-section case-study-screenshot-block${
              snacknuScreens ? "" : " case-study-screenshot-block--post-system"
            }`}
          >
            <div className="case-study-screenshot-stack">
              {postImpactScreenshotLeadSpace ? (
                <p className="case-study-screenshot-lead-space" aria-hidden="true">
                  &nbsp;
                </p>
              ) : null}
              <Image
                src={postImpactScreenshot.src}
                alt={postImpactScreenshot.alt}
                width={postImpactScreenshot.width}
                height={postImpactScreenshot.height}
                sizes={snacknuScreens ? mobileUnifiedSizes : "(max-width: 900px) 62vw, 360px"}
                unoptimized={snacknuScreens}
                style={snacknuScreenshotStyle}
                className={`case-study-screenshot ${
                  snacknuScreens ? mobileUnifiedClass : "case-study-screenshot--post-system"
                }`}
                draggable={false}
              />
              {postImpactScreenshotCaption ? (
                <p className="case-study-screenshot-caption">
                  {postImpactScreenshotCaption}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {duorinMerged && privacyContext ? (
          <section id={CASE_STUDY_SECTION_IDS.privacyContext} className="case-study-section">
            <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
              {privacyContext.title ?? "Privacy by Design"}
            </CaseStudySectionHeading>
            {privacyContext.paragraphs.map((paragraph) => (
              <p key={paragraph} className="case-study-prose">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        <section id={CASE_STUDY_SECTION_IDS.reflection} className="case-study-section">
          <CaseStudySectionHeading showGlyph={sectionHeadingGlyph}>
            {reflection.title ?? "Reflection"}
          </CaseStudySectionHeading>
          {reflection.whatChanged?.length ? (
            <>
              <p className="case-study-reflection-label case-study-reflection-label--block">
                What changed:
              </p>
              <ul className="case-study-bullets">
                {reflection.whatChanged.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}
          {reflection.whatLearned?.length ? (
            <>
              <p className="case-study-reflection-label case-study-reflection-label--block case-study-reflection-label--after-body">
                What I learned:
              </p>
              {reflection.whatLearned.map((paragraph) => (
                <p key={paragraph} className="case-study-prose">
                  {paragraph}
                </p>
              ))}
            </>
          ) : null}
          {!reflection.whatChanged?.length && !reflection.whatLearned?.length ? (
            reflection.paragraphs?.length ? (
              reflection.paragraphs.map((paragraph) => (
                <p key={paragraph} className="case-study-prose">
                  {paragraph}
                </p>
              ))
            ) : reflection.bullets?.length ? (
              <ul className="case-study-bullets">
                {reflection.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : reflection.limitationLabel !== undefined &&
              reflection.nextIterationLabel !== undefined ? (
              <>
                <p className="case-study-reflection-label case-study-reflection-label--block">
                  {reflection.limitationLabel}
                </p>
                <p className="case-study-prose">{reflection.didNotWork}</p>
                <p className="case-study-reflection-label case-study-reflection-label--block case-study-reflection-label--after-body">
                  {reflection.nextIterationLabel}
                </p>
                <p className="case-study-prose case-study-prose-tight">{reflection.improveNext}</p>
              </>
            ) : (
              <>
                <p className="case-study-prose">
                  <span className="case-study-reflection-label">What did not work: </span>
                  {reflection.didNotWork}
                </p>
                <p className="case-study-prose case-study-prose-tight">
                  <span className="case-study-reflection-label">What I would improve next: </span>
                  {reflection.improveNext}
                </p>
              </>
            )
          ) : null}
        </section>
      </div>
    </div>
    </>
  );
}
