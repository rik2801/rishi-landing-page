"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const CARD_COUNT = 26;
const CARD_WIDTH = 300;
const CARD_HEIGHT = 407;
const CENTER_INDEX = 12;
const HALF_RANGE = CARD_COUNT / 2;
const SCROLL_SCALE = 100;

const STEP_X = 142;
const STEP_Y = -107;
const DEPTH_PER_POS = 32;
const FRONT_Z = 80;
const CARD_TILT_Y_MAX = 36;
const CARD_TILT_Y = -(CARD_TILT_Y_MAX * 0.8);
const CARD_TILT_X = -8;
const SCALE_AT_BACK = 0.62;
const SCALE_BACK = SCALE_AT_BACK * 0.3;
const SCALE_MID = 1;
const SCALE_FRONT = 1.3;
const SCALE_POS_BACK = 11;
const SCALE_POS_MID = 0;
const SCALE_POS_FRONT = -11;

function clamp01(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getCardScale(pos: number) {
  if (pos >= SCALE_POS_MID) {
    const t = smoothstep(
      clamp01((SCALE_POS_BACK - pos) / (SCALE_POS_BACK - SCALE_POS_MID)),
    );
    return lerp(SCALE_BACK, SCALE_MID, t);
  }

  const t = smoothstep(
    clamp01((SCALE_POS_MID - pos) / (SCALE_POS_MID - SCALE_POS_FRONT)),
  );
  return lerp(SCALE_MID, SCALE_FRONT, t);
}

function distanceToRect(
  x: number,
  y: number,
  rect: { left: number; top: number; right: number; bottom: number },
) {
  const dx = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0;
  const dy = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0;
  return Math.hypot(dx, dy);
}

function getHoverSlop(cardScale: number) {
  return Math.max(52, 110 * (1 - cardScale * 0.45));
}

const HOVER_Z_LIFT = 40;
const HOVER_SCALE_BOOST = 1.035;

const HOVER_LABELS = [
  "Afterglow",
  "Motion Blur",
  "Ghost Index",
  "Signal Drift",
  "Soft Meridian",
  "Frame Echo",
  "Parallel Sun",
  "Night Relay",
] as const;

const GLITCH_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789░▒▓█■□◆◇{}[]()+-~|/\\";

function ScrambleLabel({
  text,
  active,
  className,
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }

    setDisplay(
      text
        .split("")
        .map((char) =>
          char === " "
            ? " "
            : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
        )
        .join(""),
    );

    let frame = 0;
    const totalFrames = 24;
    const interval = window.setInterval(() => {
      frame += 1;

      const progress = frame / totalFrames;
      const resolvedCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, i) => {
          if (char === " ") {
            return " ";
          }
          if (i < resolvedCount) {
            return char;
          }

          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");

      setDisplay(next);

      if (frame >= totalFrames) {
        setDisplay(text);
        window.clearInterval(interval);
      }
    }, 17);

    return () => window.clearInterval(interval);
  }, [text, active]);

  return <span className={className}>{display}</span>;
}

const CARD_IMAGES = [
  "/homepage.webp",
  "/classic-mode-preview.webp",
  "/interactive-mode-preview.webp",
  "/swippable-interface.webp",
  "/citizenx-landing.webp",
  "/citizenx-results-mobile.webp",
  "/snacknu/student-homepage.webp",
  "/snacknu/sketch-paper.webp",
  "/duorin/artifacts/style-scan-output.png",
  "/duorin/artifacts/outfit-recommendations.png",
  "/stats.webp",
  "/Notification.webp",
  "/Artifact1.png",
  "/old-scan.jpg",
] as const;

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

function getConveyorPos(index: number, scroll: number): number {
  return wrap(
    -HALF_RANGE,
    HALF_RANGE,
    index - CENTER_INDEX - scroll / SCROLL_SCALE,
  );
}

function getSlotLabel(index: number, scroll: number): string {
  const slot =
    (((index - CENTER_INDEX - scroll / SCROLL_SCALE) % CARD_COUNT) +
      CARD_COUNT) %
    CARD_COUNT;
  return String(Math.round(slot)).padStart(2, "0");
}

type PlaneProps = {
  index: number;
  offset: MotionValue<number>;
  waveIntensity: MotionValue<number>;
  hoveredIndex: number | null;
  faceRef: (element: HTMLDivElement | null) => void;
};

function Plane({
  index,
  offset,
  waveIntensity,
  hoveredIndex,
  faceRef,
}: PlaneProps) {
  const isHovered = hoveredIndex === index;
  const hoverZ = useMotionValue(0);
  const hoverScale = useMotionValue(1);
  const hoverZIndexBoost = useMotionValue(0);
  const labelRef = useRef<HTMLSpanElement>(null);

  const springHoverZ = useSpring(hoverZ, { stiffness: 420, damping: 32 });
  const springHoverScale = useSpring(hoverScale, { stiffness: 420, damping: 32 });
  const springZIndexBoost = useSpring(hoverZIndexBoost, {
    stiffness: 420,
    damping: 32,
  });

  const updateLabel = (scroll: number) => {
    if (labelRef.current) {
      labelRef.current.textContent = getSlotLabel(index, scroll);
    }
  };

  useLayoutEffect(() => {
    updateLabel(offset.get());
  }, [index, offset]);

  useMotionValueEvent(offset, "change", updateLabel);

  useEffect(() => {
    animate(hoverZ, isHovered ? HOVER_Z_LIFT : 0, {
      type: "spring",
      stiffness: 420,
      damping: 32,
    });
    animate(hoverScale, isHovered ? HOVER_SCALE_BOOST : 1, {
      type: "spring",
      stiffness: 420,
      damping: 32,
    });
    animate(hoverZIndexBoost, isHovered ? 500 : 0, {
      type: "spring",
      stiffness: 420,
      damping: 32,
    });
  }, [hoverScale, hoverZ, hoverZIndexBoost, isHovered]);

  const x = useTransform([offset, waveIntensity], ([scroll, wave]) => {
    const pos = getConveyorPos(index, scroll as number);
    const ripple =
      Math.sin(pos * 0.62 + (scroll as number) * 0.007) *
      (wave as number) *
      18;
    return pos * STEP_X + ripple;
  });

  const y = useTransform([offset, waveIntensity], ([scroll, wave]) => {
    const pos = getConveyorPos(index, scroll as number);
    const ripple =
      Math.cos(pos * 0.58 + (scroll as number) * 0.006) *
      (wave as number) *
      12;
    return pos * STEP_Y + ripple;
  });

  const z = useTransform(
    [offset, waveIntensity, springHoverZ],
    ([scroll, wave, liftZ]) => {
      const pos = getConveyorPos(index, scroll as number);
      const ripple =
        Math.sin(pos * 0.84 + (scroll as number) * 0.009) *
        (wave as number) *
        24;
      return FRONT_Z - pos * DEPTH_PER_POS + ripple + (liftZ as number);
    },
  );

  const rotateY = useTransform(waveIntensity, (wave) => {
    return CARD_TILT_Y + (wave as number) * -3;
  });

  const rotateX = useTransform(waveIntensity, (wave) => {
    return CARD_TILT_X + (wave as number) * 2;
  });

  const scale = useTransform(
    [offset, springHoverScale],
    ([scroll, hoverScaleValue]) => {
      const pos = getConveyorPos(index, scroll as number);
      return getCardScale(pos) * (hoverScaleValue as number);
    },
  );

  const zIndex = useTransform(
    [offset, springZIndexBoost],
    ([scroll, boost]) => {
      const pos = getConveyorPos(index, scroll);
      return Math.round(4000 - pos * 55 + (boost as number));
    },
  );

  const opacity = useTransform([offset, waveIntensity], ([scroll]) => {
    const pos = getConveyorPos(index, scroll as number);
    return Math.abs(pos) > 12 ? 0 : 1;
  });

  const label = HOVER_LABELS[index % HOVER_LABELS.length];
  const image = CARD_IMAGES[index % CARD_IMAGES.length];

  return (
    <motion.div
      className={styles.plane}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginLeft: -CARD_WIDTH / 2,
        marginTop: -CARD_HEIGHT / 2,
        x,
        y,
        z,
        rotateX,
        rotateY,
        scale,
        opacity,
        zIndex,
      }}
    >
      <span ref={labelRef} className={styles.planeLabel} />
      <div ref={faceRef} className={styles.planeInner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.planeImage} src={image} alt="" draggable={false} />
      </div>
      {isHovered ? (
        <div className={styles.hoverLabel}>
          <div className={styles.hoverLine} />
          <ScrambleLabel
            text={label.toUpperCase()}
            active={isHovered}
            className={styles.hoverLabelText}
          />
        </div>
      ) : null}
    </motion.div>
  );
}

export default function ScrollVelocityPlanesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, inside: false });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const offset = useMotionValue(0);
  const velocity = useVelocity(offset);
  const smoothVelocity = useSpring(velocity, {
    stiffness: 180,
    damping: 42,
    mass: 0.45,
  });
  const waveIntensity = useTransform(smoothVelocity, (value) =>
    Math.min(Math.abs(value ?? 0) / 900, 1),
  );

  const findHoveredCard = useCallback(
    (clientX: number, clientY: number) => {
      const scroll = offset.get();
      const candidates: {
        index: number;
        distance: number;
        z: number;
        exact: boolean;
        area: number;
      }[] = [];

      for (let index = 0; index < CARD_COUNT; index += 1) {
        const pos = getConveyorPos(index, scroll);
        if (Math.abs(pos) > 12) {
          continue;
        }

        const face = planeFaceRefs.current[index];
        if (!face) {
          continue;
        }

        const rect = face.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
          continue;
        }

        const z = Math.round(4000 - pos * 55);
        const distance = distanceToRect(clientX, clientY, rect);
        const exact = distance === 0;
        const area = rect.width * rect.height;

        if (exact) {
          candidates.push({ index, distance: 0, z, exact: true, area });
          continue;
        }

        const slop = getHoverSlop(getCardScale(pos));
        if (distance <= slop) {
          candidates.push({ index, distance, z, exact: false, area });
        }
      }

      if (candidates.length === 0) {
        return null;
      }

      const exactHits = candidates.filter((candidate) => candidate.exact);
      const pool = exactHits.length > 0 ? exactHits : candidates;

      pool.sort((a, b) => {
        if (a.exact !== b.exact) {
          return a.exact ? -1 : 1;
        }
        if (a.distance !== b.distance) {
          return a.distance - b.distance;
        }
        if (a.area !== b.area) {
          return a.area - b.area;
        }
        return b.z - a.z;
      });

      return pool[0]?.index ?? null;
    },
    [offset],
  );

  const updateHoveredCard = useCallback(
    (clientX: number, clientY: number) => {
      const next = findHoveredCard(clientX, clientY);
      setHoveredIndex((current) => (current === next ? current : next));
    },
    [findHoveredCard],
  );

  const setPlaneFaceRef = useCallback((index: number) => {
    return (element: HTMLDivElement | null) => {
      planeFaceRefs.current[index] = element;
    };
  }, []);

  const inertiaControl = useRef<ReturnType<typeof animate> | null>(null);

  useMotionValueEvent(offset, "change", () => {
    if (inertiaControl.current) {
      inertiaControl.current.stop();
      inertiaControl.current = null;
    }

    if (pointerRef.current.inside) {
      updateHoveredCard(pointerRef.current.x, pointerRef.current.y);
    }
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerRef.current = {
      x: event.clientX,
      y: event.clientY,
      inside: true,
    };
    updateHoveredCard(event.clientX, event.clientY);
  };

  const handlePointerLeave = () => {
    pointerRef.current.inside = false;
    setHoveredIndex(null);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY + event.deltaX * 0.35;
      offset.set(offset.get() + delta * 0.35);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [offset]);

  const handlePan = (
    _: PointerEvent,
    info: { delta: { x: number; y: number } },
  ) => {
    const delta = info.delta.y + info.delta.x * 0.35;
    offset.set(offset.get() - delta * 0.45);
  };

  const handlePanEnd = (
    _: PointerEvent,
    info: { velocity: { x: number; y: number } },
  ) => {
    const combinedVelocity = info.velocity.y + info.velocity.x * 0.35;
    if (Math.abs(combinedVelocity) < 40) {
      return;
    }

    inertiaControl.current = animate(offset, offset.get() - combinedVelocity * 0.12, {
      type: "inertia",
      velocity: -combinedVelocity * 0.12,
      power: 0.75,
      timeConstant: 280,
      modifyTarget: (target) => target,
    });
  };

  return (
    <main ref={containerRef} className={styles.page}>
      <motion.div
        className={styles.viewport}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className={styles.stage}>
          {Array.from({ length: CARD_COUNT }, (_, index) => (
            <Plane
              key={index}
              index={index}
              offset={offset}
              waveIntensity={waveIntensity}
              hoveredIndex={hoveredIndex}
              faceRef={setPlaneFaceRef(index)}
            />
          ))}
        </div>
      </motion.div>
      <p className={styles.hint}>Scroll to surf</p>
    </main>
  );
}
