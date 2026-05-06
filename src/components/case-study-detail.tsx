import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type CaseStudyApproachItem = {
  decision: string;
  whyItMattered: string;
};

export type CaseStudySystemOverviewSection = {
  heading: string;
  bullets?: string[];
};

function siteBracketFromUrl(href: string): string {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    return `(${host})`;
  } catch {
    return "(site)";
  }
}

export type CaseStudyProductEvolution = {
  oldImageSrc: string;
  oldImageAlt: string;
  oldImageWidth: number;
  oldImageHeight: number;
  newVideoSrc: string;
  beforeTitle?: string;
  afterTitle?: string;
  beforeCaption: string;
  afterCaption: string;
  afterNote?: string;
  narrative: string;
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
  /** Duorin: visible bordered CSS-grid meta cells vs editorial dividers. */
  metaGridVariant?: "editorial" | "bordered";
  /** 2–3 short paragraphs: why the problem matters for users, product, or business */
  whyItMatters: string[];
  /** Optional before/after narrative (e.g. Duorin product evolution) */
  productEvolution?: CaseStudyProductEvolution;
  heroScreenshot?: CaseStudyScreenshot;
  postInsightScreenshot?: CaseStudyScreenshot;
  postInsightScreenshotCaption?: string;
  postSystemScreenshot?: CaseStudyScreenshot;
  systemOverview?: {
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
  coreInsight?: string;
  coreInsightDifferentiator?: string;
  approach: CaseStudyApproachItem[];
  systemLogic: {
    input: string;
    logic: string;
    output: string;
  };
  systemLogicTitle?: string;
  impact: string[];
  reflection: {
    didNotWork: string;
    improveNext: string;
    /** When both are set, labels render on their own line above each paragraph (Duorin). */
    limitationLabel?: string;
    nextIterationLabel?: string;
  };
  inProgress?: boolean;
};

export function CaseStudyDetail(props: CaseStudyDetailProps) {
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
    metaGridVariant = "editorial",
    whyItMatters,
    productEvolution,
    heroScreenshot,
    postInsightScreenshot,
    postInsightScreenshotCaption,
    postSystemScreenshot,
    systemOverview,
    earlySignalsFromBeta,
    biasReduction,
    operationalConstraints,
    keyProductDecisions,
    problem,
    coreInsight,
    coreInsightDifferentiator,
    approach,
    systemLogic,
    systemLogicTitle,
    impact,
    reflection,
    inProgress,
  } = props;

  return (
    <div className="case-study-detail-wrap">
      <div className="case-study-detail-inner">
        <p className="case-study-back">
          <Link href="/" className="link">
            Home
          </Link>
          {" · "}
          <Link href="/case-studies" className="link">
            Case Studies
          </Link>
        </p>

        {inProgress ? (
          <p className="case-study-kicker" aria-live="polite">
            Case study in progress — structure and narrative are being finalized.
          </p>
        ) : null}

        <header className="case-study-hero">
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
                  <dt>Leadership</dt>
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
                  <dt>Leadership</dt>
                  <dd>{leadership}</dd>
                </div>
              ) : null}
            </dl>
          )}
        </header>

        {heroScreenshot ? (
          <section className="case-study-section case-study-screenshot-block case-study-screenshot-block--hero">
            <Image
              src={heroScreenshot.src}
              alt={heroScreenshot.alt}
              width={heroScreenshot.width}
              height={heroScreenshot.height}
              sizes="(max-width: 900px) 100vw, 820px"
              className="case-study-screenshot case-study-screenshot--hero"
              draggable={false}
            />
          </section>
        ) : null}

        <section className="case-study-section case-study-section--after-hero">
          <h2 className="case-study-section-heading">Why this matters</h2>
          {whyItMatters.map((paragraph, i) => (
            <p key={i} className="case-study-prose">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="case-study-section">
          <h2 className="case-study-section-heading">The Problem</h2>
          <p className="case-study-prose">{problem.intro}</p>
          <ul className="case-study-bullets">
            {problem.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        {coreInsight ? (
          <section className="case-study-section">
            <h2 className="case-study-section-heading">Core Insight</h2>
            <p className="case-study-prose">{coreInsight}</p>
            {coreInsightDifferentiator ? (
              <p className="case-study-prose case-study-core-diff">
                {coreInsightDifferentiator}
              </p>
            ) : null}
          </section>
        ) : null}

        {postInsightScreenshot ? (
          <section className="case-study-section case-study-screenshot-block case-study-screenshot-block--post-insight">
            <div className="case-study-screenshot-stack">
              <Image
                src={postInsightScreenshot.src}
                alt={postInsightScreenshot.alt}
                width={postInsightScreenshot.width}
                height={postInsightScreenshot.height}
                sizes="(max-width: 900px) 92vw, 680px"
                className="case-study-screenshot case-study-screenshot--post-insight"
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
          <section className="case-study-section">
            <h2 className="case-study-section-heading">Product Evolution</h2>
            <div className="case-study-evolution-compare">
              <div className="case-study-evolution-card">
                <p className="case-study-evolution-card-label">Before</p>
                {productEvolution.beforeTitle ? (
                  <p className="case-study-evolution-card-title">
                    {productEvolution.beforeTitle}
                  </p>
                ) : null}
                <div className="case-study-evolution-card-frame">
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
                <p className="case-study-evolution-caption">
                  {productEvolution.beforeCaption}
                </p>
              </div>
              <div className="case-study-evolution-card">
                <p className="case-study-evolution-card-label">After</p>
                {productEvolution.afterTitle ? (
                  <p className="case-study-evolution-card-title">
                    {productEvolution.afterTitle}
                  </p>
                ) : null}
                <div className="case-study-evolution-card-frame">
                  <video
                    src={productEvolution.newVideoSrc}
                    className="case-study-evolution-media"
                    preload="metadata"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    disablePictureInPicture
                    draggable={false}
                  />
                </div>
                <p className="case-study-evolution-caption">
                  {productEvolution.afterCaption}
                </p>
              </div>
            </div>
            <div className="case-study-evolution-narrative">
              {productEvolution.afterNote ? (
                <p className="case-study-evolution-note">
                  {productEvolution.afterNote}
                </p>
              ) : null}
              <p className="case-study-prose">{productEvolution.narrative}</p>
            </div>
          </section>
        ) : null}

        {systemOverview ? (
          <section className="case-study-section case-study-system-overview">
            <h2 className="case-study-section-heading">System Overview</h2>
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
          <section className="case-study-section">
            <h2 className="case-study-section-heading">
              {earlySignalsFromBeta.title ?? "Early Signals from Beta"}
            </h2>
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
          <section className="case-study-section">
            <h2 className="case-study-section-heading">Bias Reduction</h2>
            {biasReduction.paragraphs.map((paragraph) => (
              <p key={paragraph} className="case-study-prose">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {operationalConstraints?.length ? (
          <section className="case-study-section">
            <h2 className="case-study-section-heading">Operational Constraints</h2>
            <ul className="case-study-bullets">
              {operationalConstraints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {keyProductDecisions?.length ? (
          <section className="case-study-section">
            <h2 className="case-study-section-heading">Key product decisions</h2>
            <ul className="case-study-bullets case-study-bullets--dash case-study-key-decisions">
              {keyProductDecisions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="case-study-section">
          <h2 className="case-study-section-heading">Design Approach</h2>
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

        <section className="case-study-section">
          <h2 className="case-study-section-heading">
            {systemLogicTitle ?? "System Logic"}
          </h2>
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

        {postSystemScreenshot ? (
          <section className="case-study-section case-study-screenshot-block case-study-screenshot-block--post-system">
            <Image
              src={postSystemScreenshot.src}
              alt={postSystemScreenshot.alt}
              width={postSystemScreenshot.width}
              height={postSystemScreenshot.height}
              sizes="(max-width: 900px) 62vw, 360px"
              className="case-study-screenshot case-study-screenshot--post-system"
              draggable={false}
            />
          </section>
        ) : null}

        <section className="case-study-section">
          <h2 className="case-study-section-heading">Impact</h2>
          <ul className="case-study-bullets">
            {impact.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="case-study-section">
          <h2 className="case-study-section-heading">Reflection</h2>
          {reflection.limitationLabel !== undefined &&
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
          )}
        </section>
      </div>
    </div>
  );
}
