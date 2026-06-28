"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useRouter } from "next/navigation";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/rik-character.glb";
const TYPE_SPEED = 28;
const EXIT_FADE_MS = 900;
const CONFIRM_IDLE_WAIT_MS = 1500;
const CONFIRM_FALLBACK_MS = 4000;
const CONFIRM_FADE_AT = 0.9;

const STORAGE = {
  hasVisitedIntro: "rik_hasVisitedIntro",
  lastViewedCaseStudy: "rik_lastViewedCaseStudy",
  animationUsage: "rik_animationUsage",
} as const;

/** Case-study exit sequence (repeats): bow → idle → rope → bow → idle×4 → bow → idle → rope → idle */
const CONFIRM_TRANSITION_SEQUENCE = [
  "bow",
  "idle",
  "rope",
  "bow",
  "idle",
  "idle",
  "idle",
  "idle",
  "bow",
  "idle",
  "rope",
  "idle",
] as const;

/** Return-to-hero sequence (repeats): idle → standup → jump → idle → burpee → idle → standup → idle×3 → standup */
const RETURN_ENTRY_SEQUENCE = [
  "idle",
  "standup",
  "jump",
  "idle",
  "burpee",
  "idle",
  "standup",
  "idle",
  "idle",
  "idle",
  "standup",
] as const;

type ConfirmStep = (typeof CONFIRM_TRANSITION_SEQUENCE)[number];
type ReturnStep = (typeof RETURN_ENTRY_SEQUENCE)[number];

type AnimationUsage = {
  returnSequenceIndex: number;
  confirmSequenceIndex: number;
};

const DEFAULT_ANIMATION_USAGE: AnimationUsage = {
  returnSequenceIndex: 0,
  confirmSequenceIndex: 0,
};

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * ANIMATION GUARDRAILS — one animation per scenario; no mid-scenario switching
 * ═══════════════════════════════════════════════════════════════════════════
 * NEVER USE: Idle_2, Idle_02, Idle_03, Idle_4, Alert (waiting), Idle_8 (waiting)
 * Waiting idle: Idle_11 only (never Idle_4).
 * SCENARIO 1 — First visit OR dev Reset: Casual_Walk entry (always).
 * SCENARIO 3 — Return visit (repeating sequence, then loops):
 *   Idle_11 → standup → Jump_Over_Obstacle → Idle_11 → Burpee_Exercise → Idle_11
 *   → standup → Idle_11×3 → standup → (repeat)
 *   Stand_Up_* in GLB, else Agree_Gesture for standup steps
 * Case study transition (repeating sequence, then loops):
 *   Gentlemans_Bow → Idle_11 → Upside_Down_Rope_Hang → Gentlemans_Bow → Idle_11×4
 *   → Gentlemans_Bow → Idle_11 → Upside_Down_Rope_Hang → Idle_11 → (repeat)
 * NEVER USE for talk: Talk_with_Right_Hand_Open, Talk_with_Left_Hand_Raised,
 *   Talk_with_Left_Hand_on_Hip, Stand_Talking_Angry
 */
const ANIM = {
  walk: "Casual_Walk",
  talk: "Talk_with_Hands_Open",
  fallback: "Idle_11",
  wait: "Idle_11",
  returnBurpee: "Burpee_Exercise",
  returnJump: "Jump_Over_Obstacle",
  returnStandUp: "Stand_Up_3",
  returnStandUpFallback: "Agree_Gesture",
  confirmBow: "Gentlemans_Bow",
  confirmRopeHang: "Upside_Down_Rope_Hang",
} as const;

const FORBIDDEN_IDLE_ANIMS = new Set(["Idle_2", "Idle_02", "Idle_03", "Idle_4", "Idle_8", "Alert"]);

const RETURN_STAND_UP_CANDIDATES = [
  "Stand_Up_3",
  "Stand_Up_2",
  "Stand_Up",
  "Stand_Up_1",
] as const;

function resolveReturnStandUpClip(
  actions: Record<string, THREE.AnimationAction | null | undefined>,
) {
  for (const name of RETURN_STAND_UP_CANDIDATES) {
    if (actions[name]) return name;
  }

  if (actions[ANIM.returnStandUpFallback]) return ANIM.returnStandUpFallback;
  return null;
}

function isReturnStandUpClip(name: string) {
  return (
    (RETURN_STAND_UP_CANDIDATES as readonly string[]).includes(name) ||
    name === ANIM.returnStandUpFallback
  );
}

function returnStepToAnim(
  step: ReturnStep,
  actions: Record<string, THREE.AnimationAction | null | undefined>,
): { preferred: string; loop: boolean } | null {
  if (step === "idle") return { preferred: ANIM.fallback, loop: true };
  if (step === "jump") return { preferred: ANIM.returnJump, loop: false };
  if (step === "burpee") return { preferred: ANIM.returnBurpee, loop: false };

  const standUp = resolveReturnStandUpClip(actions);
  if (!standUp) return null;
  return { preferred: standUp, loop: false };
}

function pickReturnEntryAnim(
  actions: Record<string, THREE.AnimationAction | null | undefined>,
): { name: string; loop: boolean } {
  const usage = readAnimationUsage();
  const sequenceLength = RETURN_ENTRY_SEQUENCE.length;
  let index = usage.returnSequenceIndex % sequenceLength;

  for (let attempt = 0; attempt < sequenceLength; attempt += 1) {
    const step = RETURN_ENTRY_SEQUENCE[index];
    const mapped = returnStepToAnim(step, actions);
    if (!mapped) {
      index = (index + 1) % sequenceLength;
      continue;
    }

    const { preferred, loop } = mapped;
    const resolved = resolveAnimation(actions, preferred);

    if (step === "idle" || actions[preferred] || isReturnStandUpClip(resolved)) {
      return { name: resolved, loop };
    }

    index = (index + 1) % sequenceLength;
  }

  return { name: resolveAnimation(actions, ANIM.fallback), loop: true };
}

function recordReturnEntryUse() {
  const usage = readAnimationUsage();
  usage.returnSequenceIndex = (usage.returnSequenceIndex + 1) % RETURN_ENTRY_SEQUENCE.length;
  saveAnimationUsage(usage);
}

const WALK_DURATION = 2.8;
const WALK_START = { scale: 0.72, y: -1.8, z: 4.2 };
const WALK_END = { scale: 1.7, y: -1.8, z: 0 };
/** Return jump only — deep in scene, ~20% closer than initial wide framing; other anims stay at WALK_END. */
const JUMP_RETURN_START = { scale: 1.08, y: -1.8, z: -1.8 };

type IntroPhase =
  | "fade-in"
  | "walking"
  | "returning"
  | "talking"
  | "waiting"
  | "preview"
  | "confirming"
  | "exiting";

type CaseStudy = {
  label: string;
  href: string;
  description: string;
};

type DialogueMode = "opening" | "preview" | null;

const CASE_STUDIES: CaseStudy[] = [
  {
    label: "Duorin",
    href: "/case-studies/duorin",
    description:
      "An AI stylist that helps users make confident outfit decisions. Built around taste, context, and real-world wardrobe behavior.",
  },
  {
    label: "SnacknU",
    href: "/case-studies/snacknu",
    description:
      "A student-focused food marketplace designed around convenience, timing, and campus behavior.",
  },
  {
    label: "They're Waiting",
    href: "/case-studies/theyre-waiting",
    description:
      "A nudge-based experience that helps people reconnect with others through small, timely emotional prompts.",
  },
  {
    label: "CitizenX",
    href: "/case-studies/citizenx",
    description:
      "A civic experience focused on making public participation clearer, simpler, and easier to act on.",
  },
];

function readIntroMemory() {
  if (typeof window === "undefined") {
    return { hasVisitedIntro: false, lastViewedHref: null as string | null };
  }

  return {
    hasVisitedIntro: localStorage.getItem(STORAGE.hasVisitedIntro) === "true",
    lastViewedHref: localStorage.getItem(STORAGE.lastViewedCaseStudy),
  };
}

function saveLastViewedCaseStudy(href: string) {
  localStorage.setItem(STORAGE.lastViewedCaseStudy, href);
}

function clearIntroMemory() {
  localStorage.removeItem(STORAGE.hasVisitedIntro);
  localStorage.removeItem(STORAGE.lastViewedCaseStudy);
  localStorage.removeItem("rik_skipNarration");
  localStorage.removeItem(STORAGE.animationUsage);
}

function readAnimationUsage(): AnimationUsage {
  if (typeof window === "undefined") return { ...DEFAULT_ANIMATION_USAGE };

  const raw = localStorage.getItem(STORAGE.animationUsage);
  if (!raw) return { ...DEFAULT_ANIMATION_USAGE };

  try {
    return { ...DEFAULT_ANIMATION_USAGE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_ANIMATION_USAGE };
  }
}

function saveAnimationUsage(usage: AnimationUsage) {
  localStorage.setItem(STORAGE.animationUsage, JSON.stringify(usage));
}

function confirmStepToAnim(step: ConfirmStep): { preferred: string; loop: boolean } {
  if (step === "bow") return { preferred: ANIM.confirmBow, loop: false };
  if (step === "rope") return { preferred: ANIM.confirmRopeHang, loop: false };
  return { preferred: ANIM.fallback, loop: true };
}

function pickConfirmTransitionAnim(
  actions: Record<string, THREE.AnimationAction | null | undefined>,
): { name: string; loop: boolean } {
  const usage = readAnimationUsage();
  const sequenceLength = CONFIRM_TRANSITION_SEQUENCE.length;
  let index = usage.confirmSequenceIndex % sequenceLength;

  for (let attempt = 0; attempt < sequenceLength; attempt += 1) {
    const step = CONFIRM_TRANSITION_SEQUENCE[index];
    const { preferred, loop } = confirmStepToAnim(step);
    const resolved = resolveAnimation(actions, preferred);

    if (step === "idle" || actions[preferred]) {
      return { name: resolved, loop };
    }

    index = (index + 1) % sequenceLength;
  }

  return { name: resolveAnimation(actions, ANIM.fallback), loop: true };
}

function recordConfirmTransitionUse() {
  const usage = readAnimationUsage();
  usage.confirmSequenceIndex =
    (usage.confirmSequenceIndex + 1) % CONFIRM_TRANSITION_SEQUENCE.length;
  saveAnimationUsage(usage);
}

function markIntroVisited() {
  localStorage.setItem(STORAGE.hasVisitedIntro, "true");
}

function getCaseStudyByHref(href: string) {
  return CASE_STUDIES.find((study) => study.href === href);
}

function getCaseStudyLabel(href: string) {
  return getCaseStudyByHref(href)?.label ?? "that case study";
}

function orderCaseStudies(lastViewedHref: string | null) {
  if (!lastViewedHref) return CASE_STUDIES;

  const remaining = CASE_STUDIES.filter((study) => study.href !== lastViewedHref);
  const lastViewed = getCaseStudyByHref(lastViewedHref);
  return lastViewed ? [...remaining, lastViewed] : CASE_STUDIES;
}

function getPreviewDialogue(study: CaseStudy) {
  const articleMatch = study.description.match(/^(An |A )/);
  if (articleMatch) {
    const article = articleMatch[0] === "An " ? "an " : "a ";
    const rest = study.description.slice(articleMatch[0].length);
    return `${study.label} is ${article}${rest} Want to take a look?`;
  }

  return `${study.description} Want to take a look?`;
}

function resolveAnimation(
  actions: Record<string, THREE.AnimationAction | null | undefined>,
  preferred: string,
) {
  if (actions[preferred]) return preferred;
  if (actions[ANIM.fallback]) return ANIM.fallback;
  const first = Object.keys(actions).find((key) => actions[key]);
  return first ?? ANIM.fallback;
}

function pickWaitIdle() {
  return ANIM.wait;
}

function assertWaitIdleAllowed(name: string) {
  if (FORBIDDEN_IDLE_ANIMS.has(name)) {
    throw new Error(`[character-intro] Forbidden wait idle: ${name}`);
  }
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function playAnimation(
  actions: Record<string, THREE.AnimationAction | null | undefined>,
  activeRef: MutableRefObject<THREE.AnimationAction | null>,
  name: string,
  loop: boolean,
  forceReplay = false,
) {
  const resolved = resolveAnimation(actions, name);
  const next = actions[resolved];
  if (!next) return resolved;

  if (!forceReplay && activeRef.current?.getClip().name === resolved) {
    if (loop) return resolved;
    if (activeRef.current.isRunning()) return resolved;
  }

  activeRef.current?.fadeOut(0.35);
  next.reset().fadeIn(0.35).play();
  next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
  next.clampWhenFinished = !loop;
  activeRef.current = next;
  return resolved;
}

function isCloseUpPhase(phase: IntroPhase) {
  return (
    phase === "returning" ||
    phase === "talking" ||
    phase === "waiting" ||
    phase === "preview" ||
    phase === "confirming" ||
    phase === "exiting"
  );
}

function isTalkPhase(phase: IntroPhase) {
  return phase === "talking" || phase === "preview";
}

type CharacterProps = {
  phase: IntroPhase;
  activeAnim: string;
  activeAnimLoop: boolean;
  onWalkComplete: () => void;
  onReturnComplete: () => void;
  onConfirmFadeStart: () => void;
  onActionsReady: (actions: Record<string, THREE.AnimationAction | null | undefined>) => void;
  onAnimationResolved: (name: string) => void;
};

function Character({
  phase,
  activeAnim,
  activeAnimLoop,
  onWalkComplete,
  onReturnComplete,
  onConfirmFadeStart,
  onActionsReady,
  onAnimationResolved,
}: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATH);
  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene);
  const activeAction = useRef<THREE.AnimationAction | null>(null);
  const walkProgress = useRef(0);
  const walkFinished = useRef(false);
  const walkEnteredRef = useRef(false);
  const returnDoneRef = useRef(false);
  const returnStartedRef = useRef(false);
  const confirmStartedRef = useRef(false);
  const confirmFadeTriggeredRef = useRef(false);
  const confirmIdleElapsedRef = useRef(0);

  useEffect(() => {
    onActionsReady(actions);
  }, [actions, onActionsReady]);

  useEffect(() => {
    if (phase === "walking") {
      if (!walkEnteredRef.current) {
        walkEnteredRef.current = true;
        walkProgress.current = 0;
        walkFinished.current = false;
      }

      const name = playAnimation(actions, activeAction, ANIM.walk, true, true);
      onAnimationResolved(name);
      return;
    }

    walkEnteredRef.current = false;

    if (phase === "returning") {
      if (!returnStartedRef.current) {
        const resolved = resolveAnimation(actions, activeAnim);
        if (!actions[resolved]) return;

        returnStartedRef.current = true;
        returnDoneRef.current = false;
        const name = playAnimation(actions, activeAction, activeAnim, activeAnimLoop, true);
        onAnimationResolved(name);
      }
      return;
    }

    returnStartedRef.current = false;

    if (phase === "waiting") {
      assertWaitIdleAllowed(activeAnim);
      const name = playAnimation(actions, activeAction, activeAnim, true);
      onAnimationResolved(name);
      return;
    }

    if (isTalkPhase(phase)) {
      const name = playAnimation(actions, activeAction, ANIM.talk, true);
      onAnimationResolved(name);
      return;
    }

    if (phase === "confirming") {
      if (!confirmStartedRef.current) {
        const resolved = resolveAnimation(actions, activeAnim);
        if (!actions[resolved]) return;

        confirmStartedRef.current = true;
        confirmFadeTriggeredRef.current = false;
        confirmIdleElapsedRef.current = 0;
        const name = playAnimation(actions, activeAction, activeAnim, activeAnimLoop, true);
        onAnimationResolved(name);
      }
      return;
    }

    confirmStartedRef.current = false;

    if (phase === "exiting") {
      // Hold the final confirm pose — do not replay the clip during the white fade.
      return;
    }
  }, [actions, phase, activeAnim, activeAnimLoop, onAnimationResolved]);

  useEffect(() => {
    if (phase !== "returning") return;

    const returnWaitMs = activeAnimLoop ? CONFIRM_IDLE_WAIT_MS : 2800;

    const fallbackTimer = window.setTimeout(() => {
      if (!returnDoneRef.current) {
        returnDoneRef.current = true;
        onReturnComplete();
      }
    }, returnWaitMs);

    const handleFinished = (event: THREE.Event) => {
      if (activeAnimLoop) return;
      const action = (event as THREE.Event & { action?: THREE.AnimationAction }).action;
      if (!action || returnDoneRef.current) return;
      returnDoneRef.current = true;
      onReturnComplete();
    };

    mixer.addEventListener("finished", handleFinished);
    return () => {
      window.clearTimeout(fallbackTimer);
      mixer.removeEventListener("finished", handleFinished);
    };
  }, [mixer, onReturnComplete, phase, activeAnimLoop]);

  useEffect(() => {
    if (phase !== "confirming") return;

    const fallbackMs = (activeAnimLoop ? CONFIRM_IDLE_WAIT_MS : CONFIRM_FALLBACK_MS) * CONFIRM_FADE_AT;
    const fallbackTimer = window.setTimeout(() => {
      if (!confirmFadeTriggeredRef.current) {
        confirmFadeTriggeredRef.current = true;
        onConfirmFadeStart();
      }
    }, fallbackMs);

    return () => window.clearTimeout(fallbackTimer);
  }, [phase, activeAnimLoop, onConfirmFadeStart]);

  useFrame((_, delta) => {
    const group = groupRef.current;

    if (group) {
      if (phase === "walking" && !walkFinished.current) {
        walkProgress.current = Math.min(1, walkProgress.current + Math.min(delta, 0.05) / WALK_DURATION);
        const t = easeOutCubic(walkProgress.current);

        group.scale.setScalar(lerp(WALK_START.scale, WALK_END.scale, t));
        group.position.set(0, WALK_START.y, lerp(WALK_START.z, WALK_END.z, t));

        if (walkProgress.current >= 1) {
          walkFinished.current = true;
          group.scale.setScalar(WALK_END.scale);
          group.position.set(0, WALK_END.y, WALK_END.z);
          onWalkComplete();
        }
      } else if (phase === "fade-in" || (phase === "walking" && !walkFinished.current)) {
        group.scale.setScalar(WALK_START.scale);
        group.position.set(0, WALK_START.y, WALK_START.z);
      } else if (phase === "returning" && activeAnim === ANIM.returnJump) {
        group.scale.setScalar(JUMP_RETURN_START.scale);
        group.position.set(0, JUMP_RETURN_START.y, JUMP_RETURN_START.z);
      } else if (isCloseUpPhase(phase)) {
        group.scale.setScalar(WALK_END.scale);
        group.position.set(0, WALK_END.y, WALK_END.z);
      }
    }

    if (phase !== "confirming" || confirmFadeTriggeredRef.current) return;

    if (activeAnimLoop) {
      confirmIdleElapsedRef.current += delta;
      if (confirmIdleElapsedRef.current >= (CONFIRM_IDLE_WAIT_MS / 1000) * CONFIRM_FADE_AT) {
        confirmFadeTriggeredRef.current = true;
        onConfirmFadeStart();
      }
      return;
    }

    const action = activeAction.current;
    if (!action) return;

    const duration = action.getClip().duration;
    if (duration <= 0) return;

    if (action.time / duration >= CONFIRM_FADE_AT) {
      confirmFadeTriggeredRef.current = true;
      onConfirmFadeStart();
    }
  });

  return (
    <group ref={groupRef} scale={WALK_START.scale} position={[0, WALK_START.y, WALK_START.z]}>
      <primitive object={gltf.scene} rotation={[0, 0, 0]} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

export default function CharacterIntroPage() {
  const router = useRouter();
  const [lastViewedHref, setLastViewedHref] = useState<string | null>(null);
  const [phase, setPhase] = useState<IntroPhase>("fade-in");
  const [fadeOut, setFadeOut] = useState(false);
  const [exitFade, setExitFade] = useState(false);
  const [displayedDialogue, setDisplayedDialogue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [showPreviewActions, setShowPreviewActions] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [activeAnim, setActiveAnim] = useState<string>(ANIM.walk);
  const [activeAnimLoop, setActiveAnimLoop] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState<string>(ANIM.walk);
  const [isRouting, setIsRouting] = useState(false);
  const [actionsReady, setActionsReady] = useState(false);
  const [fadeDone, setFadeDone] = useState(false);
  const [flowKey, setFlowKey] = useState(0);

  const fullDialogueRef = useRef("");
  const typewriterIntervalRef = useRef<number | null>(null);
  const onTypewriterDoneRef = useRef<(() => void) | null>(null);
  const dialogueModeRef = useRef<DialogueMode>(null);
  const dialogueLinesRef = useRef<string[]>([]);
  const dialogueStepRef = useRef(0);
  const talkBlockActiveRef = useRef(false);
  const actionsRef = useRef<Record<string, THREE.AnimationAction | null | undefined>>({});
  /** Reset always replays Casual_Walk — bypass return-entry even if memory was stale. */
  const forceWalkIntroRef = useRef(false);
  const pendingRouteRef = useRef<string | null>(null);
  const confirmExitStartedRef = useRef(false);

  const handleActionsReady = useCallback(
    (actions: Record<string, THREE.AnimationAction | null | undefined>) => {
      actionsRef.current = actions;
      setActionsReady(true);
    },
    [],
  );

  const handleAnimationResolved = useCallback((name: string) => {
    setCurrentAnimation(name);
  }, []);

  const clearTypewriter = useCallback(() => {
    if (typewriterIntervalRef.current !== null) {
      window.clearInterval(typewriterIntervalRef.current);
      typewriterIntervalRef.current = null;
    }
  }, []);

  const startTalkBlock = useCallback(() => {
    if (talkBlockActiveRef.current) return;
    talkBlockActiveRef.current = true;
    setPhase("talking");
    setActiveAnim(ANIM.talk);
    setActiveAnimLoop(true);
    setCurrentAnimation(ANIM.talk);
  }, []);

  const enterWaiting = useCallback(() => {
    talkBlockActiveRef.current = false;
    const idle = pickWaitIdle();
    assertWaitIdleAllowed(idle);
    setPhase("waiting");
    setActiveAnim(idle);
    setActiveAnimLoop(true);
    setCurrentAnimation(idle);
    setShowChoices(true);
    setShowPreviewActions(false);

    if (!readIntroMemory().hasVisitedIntro) {
      markIntroVisited();
    }
  }, []);

  const startTypewriter = useCallback(
    (text: string, onDone?: () => void) => {
      clearTypewriter();
      fullDialogueRef.current = text;
      setDisplayedDialogue("");
      setIsTyping(true);
      onTypewriterDoneRef.current = onDone ?? null;

      let index = 0;
      typewriterIntervalRef.current = window.setInterval(() => {
        index += 1;
        setDisplayedDialogue(text.slice(0, index));

        if (index >= text.length) {
          clearTypewriter();
          setIsTyping(false);
          onTypewriterDoneRef.current?.();
          onTypewriterDoneRef.current = null;
        }
      }, TYPE_SPEED);
    },
    [clearTypewriter],
  );

  const runOpeningStep = useCallback(() => {
    const lines = dialogueLinesRef.current;
    const step = dialogueStepRef.current;

    if (step >= lines.length) {
      enterWaiting();
      return;
    }

    startTalkBlock();
    startTypewriter(lines[step], () => {
      dialogueStepRef.current += 1;
      window.setTimeout(() => {
        if (dialogueStepRef.current >= lines.length) {
          enterWaiting();
        } else {
          runOpeningStep();
        }
      }, 400);
    });
  }, [enterWaiting, startTalkBlock, startTypewriter]);

  const beginOpeningDialogue = useCallback(() => {
    const memory = readIntroMemory();

    if (memory.lastViewedHref) {
      const caseStudyName = getCaseStudyLabel(memory.lastViewedHref);
      dialogueLinesRef.current = [
        `How was ${caseStudyName}?`,
        "Want to look at something else?",
      ];
    } else {
      dialogueLinesRef.current = [
        "Hey, I'm Rishi.",
        "You're probably here for the case studies.",
        "Which one do you want to look at?",
      ];
    }

    dialogueModeRef.current = "opening";
    dialogueStepRef.current = 0;
    talkBlockActiveRef.current = false;
    runOpeningStep();
  }, [runOpeningStep]);

  const beginPreviewDialogue = useCallback(
    (study: CaseStudy) => {
      dialogueModeRef.current = "preview";
      talkBlockActiveRef.current = true;
      setPhase("preview");
      setActiveAnim(ANIM.talk);
      setCurrentAnimation(ANIM.talk);
      setShowPreviewActions(false);
      startTypewriter(getPreviewDialogue(study), () => {
        talkBlockActiveRef.current = false;
        const idle = pickWaitIdle();
        setPhase("waiting");
        setActiveAnim(idle);
        setCurrentAnimation(idle);
        setShowPreviewActions(true);
      });
    },
    [startTypewriter],
  );

  const proceedToNextDialogueStep = useCallback(() => {
    const mode = dialogueModeRef.current;

    if (mode === "opening") {
      runOpeningStep();
      return;
    }

    if (mode === "preview") {
      talkBlockActiveRef.current = false;
      const idle = pickWaitIdle();
      setPhase("waiting");
      setActiveAnim(idle);
      setCurrentAnimation(idle);
      setShowPreviewActions(true);
    }
  }, [runOpeningStep]);

  const skipTypewriter = useCallback(() => {
    if (isTyping) {
      clearTypewriter();
      setDisplayedDialogue(fullDialogueRef.current);
      setIsTyping(false);
      onTypewriterDoneRef.current?.();
      onTypewriterDoneRef.current = null;
      return;
    }

    proceedToNextDialogueStep();
  }, [clearTypewriter, isTyping, proceedToNextDialogueStep]);

  const resetIntroFlow = useCallback(() => {
    clearTypewriter();
    clearIntroMemory();
    forceWalkIntroRef.current = true;

    fullDialogueRef.current = "";
    onTypewriterDoneRef.current = null;
    dialogueModeRef.current = null;
    dialogueLinesRef.current = [];
    dialogueStepRef.current = 0;
    talkBlockActiveRef.current = false;
    forceWalkIntroRef.current = true;
    pendingRouteRef.current = null;
    confirmExitStartedRef.current = false;

    setLastViewedHref(null);
    setPhase("fade-in");
    setFadeOut(false);
    setExitFade(false);
    setDisplayedDialogue("");
    setIsTyping(false);
    setShowChoices(false);
    setShowPreviewActions(false);
    setSelectedStudy(null);
    setIsRouting(false);
    setActionsReady(false);
    setFadeDone(false);
    setActiveAnim(ANIM.walk);
    setActiveAnimLoop(true);
    setCurrentAnimation(ANIM.walk);
    setFlowKey((key) => key + 1);
  }, [clearTypewriter]);

  useEffect(() => {
    const memory = readIntroMemory();
    setLastViewedHref(memory.lastViewedHref);

    const timer = window.setTimeout(() => setFadeDone(true), 950);
    return () => window.clearTimeout(timer);
  }, [flowKey]);

  useEffect(() => {
    if (!fadeDone || phase !== "fade-in") return;

    const useReturnEntry =
      Boolean(readIntroMemory().lastViewedHref) && !forceWalkIntroRef.current;

    if (useReturnEntry) {
      if (!actionsReady) return;

      const picked = pickReturnEntryAnim(actionsRef.current);
      recordReturnEntryUse();
      setActiveAnim(picked.name);
      setActiveAnimLoop(picked.loop);
      setCurrentAnimation(picked.name);
      setPhase("returning");
      return;
    }

    if (!actionsReady) return;

    forceWalkIntroRef.current = false;
    setActiveAnim(ANIM.walk);
    setActiveAnimLoop(true);
    setCurrentAnimation(ANIM.walk);
    setPhase("walking");
  }, [fadeDone, actionsReady, phase, flowKey]);

  useEffect(() => {
    if (phase !== "walking" && phase !== "returning") return;
    const frame = requestAnimationFrame(() => setFadeOut(true));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => () => clearTypewriter(), [clearTypewriter]);

  const handleWalkComplete = useCallback(() => {
    beginOpeningDialogue();
  }, [beginOpeningDialogue]);

  const handleReturnComplete = useCallback(() => {
    beginOpeningDialogue();
  }, [beginOpeningDialogue]);

  const handleConfirmFadeStart = useCallback(() => {
    if (confirmExitStartedRef.current) return;
    confirmExitStartedRef.current = true;

    const href = pendingRouteRef.current;
    if (!href) return;

    setExitFade(true);
    setPhase("exiting");

    window.setTimeout(() => {
      pendingRouteRef.current = null;
      router.push(href);
    }, EXIT_FADE_MS);
  }, [router]);

  const handleCaseStudySelect = (study: CaseStudy) => {
    if (isRouting || !showChoices) return;

    setShowChoices(false);
    setSelectedStudy(study);
    beginPreviewDialogue(study);
  };

  const handleViewFullCaseStudy = () => {
    if (!selectedStudy || isRouting) return;

    setIsRouting(true);
    setShowPreviewActions(false);
    confirmExitStartedRef.current = false;

    const picked = pickConfirmTransitionAnim(actionsRef.current);
    recordConfirmTransitionUse();
    pendingRouteRef.current = selectedStudy.href;
    setActiveAnim(picked.name);
    setActiveAnimLoop(picked.loop);
    setCurrentAnimation(picked.name);
    setPhase("confirming");
    startTypewriter("Good choice. Let's go.");

    saveLastViewedCaseStudy(selectedStudy.href);
    setLastViewedHref(selectedStudy.href);
  };

  const handleBackToChoices = () => {
    if (isRouting) return;

    clearTypewriter();
    setIsTyping(false);
    setDisplayedDialogue("");
    setShowPreviewActions(false);
    setSelectedStudy(null);
    dialogueModeRef.current = null;
    talkBlockActiveRef.current = false;
    enterWaiting();
  };

  const choiceStudies = useMemo(
    () => orderCaseStudies(lastViewedHref),
    [lastViewedHref],
  );

  const overlayHidden = fadeOut && !exitFade;
  const showDialogueBox = displayedDialogue.length > 0 || isTyping;

  return (
    <main className="character-intro-page">
      <button
        type="button"
        className="character-intro-dev-reset"
        onClick={resetIntroFlow}
      >
        Reset
      </button>

      <div className="character-intro-debug" aria-hidden="true">
        <p>phase: {phase}</p>
        <p>animation: {currentAnimation}</p>
      </div>

      <div
        className={`character-intro-canvas-wrap${
          phase === "fade-in" ? " character-intro-canvas-wrap--hidden" : ""
        }`}
        aria-hidden={phase === "fade-in"}
      >
        <Canvas camera={{ position: [0, 1.4, 5], fov: 35 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 4, 5]} intensity={2} />

          <Suspense fallback={null}>
            <Character
              key={flowKey}
              phase={phase}
              activeAnim={activeAnim}
              activeAnimLoop={activeAnimLoop}
              onWalkComplete={handleWalkComplete}
              onReturnComplete={handleReturnComplete}
              onConfirmFadeStart={handleConfirmFadeStart}
              onActionsReady={handleActionsReady}
              onAnimationResolved={handleAnimationResolved}
            />
          </Suspense>
        </Canvas>
      </div>

      <div
        className={`character-intro-fade${overlayHidden ? " character-intro-fade--out" : ""}`}
        aria-hidden="true"
      />

      <div className="character-intro-ui">
        {showDialogueBox ? (
          <div className="character-dialogue-box" role="status" aria-live="polite">
            <button
              type="button"
              className="character-dialogue-skip"
              onClick={skipTypewriter}
            >
              Skip
            </button>
            <p className="character-dialogue-kicker">Rishi Kiran</p>
            <p className="character-dialogue-text">{displayedDialogue}</p>
          </div>
        ) : null}

        {showChoices ? (
          <div className="character-intro-choices" role="group" aria-label="Choose a case study">
            {choiceStudies.map((study) => (
              <button
                key={study.href}
                type="button"
                className="character-intro-choice-btn"
                onClick={() => handleCaseStudySelect(study)}
                disabled={isRouting}
              >
                {study.label}
              </button>
            ))}
          </div>
        ) : null}

        {showPreviewActions && selectedStudy ? (
          <div className="character-intro-actions" role="group" aria-label="Preview actions">
            <button
              type="button"
              className="character-intro-action-btn character-intro-action-btn--primary"
              onClick={handleViewFullCaseStudy}
              disabled={isRouting}
            >
              View full case study
            </button>
            <button
              type="button"
              className="character-intro-action-btn"
              onClick={handleBackToChoices}
              disabled={isRouting}
            >
              Back to choices
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
