"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudyTocItem } from "@/lib/case-study-sections";

type CaseStudyTOCProps = {
  items: CaseStudyTocItem[];
};

const SCROLL_LOCK_MS = 900;
const MIN_MARKER_STEP_MS = 12;
const MAX_MARKER_STEP_MS = 24;
const SCROLL_END_MS = 80;
/** Matches `.case-study-hero[id], .case-study-section[id] { scroll-margin-top: 5.5rem; }` */
const SECTION_ACTIVATION_OFFSET = 88;

function resolveActiveSection(items: CaseStudyTocItem[]): string {
  if (!items.length) return "";

  const nearBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

  if (nearBottom) {
    return items[items.length - 1].id;
  }

  let activeId = items[0].id;

  for (const { id } of items) {
    const element = document.getElementById(id);
    if (!element) continue;

    if (element.getBoundingClientRect().top <= SECTION_ACTIVATION_OFFSET) {
      activeId = id;
      continue;
    }

    break;
  }

  return activeId;
}

function indexForId(items: CaseStudyTocItem[], id: string): number {
  return items.findIndex((item) => item.id === id);
}

export function CaseStudyTOC({ items }: CaseStudyTOCProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const itemsRef = useRef(items);
  const isClickScrolling = useRef(false);
  const scrollLockTimer = useRef<number | null>(null);
  const scrollEndTimer = useRef<number | null>(null);
  const targetActiveIdRef = useRef(items[0]?.id ?? "");
  const displayIndexRef = useRef(0);
  const pendingIndicesRef = useRef<number[]>([]);
  const lastStepAtRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollDeltaRef = useRef(0);
  const isScrollingRef = useRef(false);

  itemsRef.current = items;

  const clearScrollLock = useCallback(() => {
    isClickScrolling.current = false;
    if (scrollLockTimer.current !== null) {
      window.clearTimeout(scrollLockTimer.current);
      scrollLockTimer.current = null;
    }
  }, []);

  const setActiveImmediate = useCallback((id: string) => {
    const currentItems = itemsRef.current;
    const index = indexForId(currentItems, id);
    if (index === -1) return;

    pendingIndicesRef.current = [];
    displayIndexRef.current = index;
    targetActiveIdRef.current = id;
    lastStepAtRef.current = performance.now();
    setActiveId(id);
  }, []);

  const enqueueToTarget = useCallback((targetIndex: number) => {
    const displayIndex = displayIndexRef.current;
    const pending = pendingIndicesRef.current;

    if (targetIndex === displayIndex) return;

    const direction = Math.sign(targetIndex - displayIndex);
    if (direction === 0) return;

    if (pending.length > 0) {
      const queueDirection = Math.sign(pending[pending.length - 1] - displayIndex);
      if (queueDirection !== 0 && queueDirection !== direction) {
        pending.length = 0;
      }
    }

    if (direction > 0) {
      const start = pending.length > 0 ? pending[pending.length - 1] + 1 : displayIndex + 1;
      for (let i = start; i <= targetIndex; i++) {
        if (!pending.includes(i)) pending.push(i);
      }
      return;
    }

    const start = pending.length > 0 ? pending[pending.length - 1] - 1 : displayIndex - 1;
    for (let i = start; i >= targetIndex; i--) {
      if (!pending.includes(i)) pending.push(i);
    }
  }, []);

  const syncScrollTarget = useCallback(() => {
    if (isClickScrolling.current) return;

    const currentItems = itemsRef.current;
    const targetId = resolveActiveSection(currentItems);
    const targetIndex = indexForId(currentItems, targetId);
    if (targetIndex === -1) return;

    targetActiveIdRef.current = targetId;
    enqueueToTarget(targetIndex);
  }, [enqueueToTarget]);

  const getStepInterval = useCallback(() => {
    const pendingCount = pendingIndicesRef.current.length;
    const scrollDelta = lastScrollDeltaRef.current;

    if (pendingCount === 0) return MAX_MARKER_STEP_MS;

    if (scrollDelta > 80) {
      return Math.max(MIN_MARKER_STEP_MS, Math.min(18, Math.round(110 / pendingCount)));
    }

    if (scrollDelta > 30 || isScrollingRef.current) {
      return Math.max(14, Math.min(20, Math.round(130 / pendingCount)));
    }

    return MAX_MARKER_STEP_MS;
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    lastScrollDeltaRef.current = Math.abs(currentScrollY - lastScrollYRef.current);
    lastScrollYRef.current = currentScrollY;
    isScrollingRef.current = true;

    syncScrollTarget();

    if (scrollEndTimer.current !== null) {
      window.clearTimeout(scrollEndTimer.current);
    }

    scrollEndTimer.current = window.setTimeout(() => {
      isScrollingRef.current = false;
      syncScrollTarget();
    }, SCROLL_END_MS);
  }, [syncScrollTarget]);

  const scrollToSection = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      clearScrollLock();
      isClickScrolling.current = true;
      setActiveImmediate(id);

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      scrollLockTimer.current = window.setTimeout(() => {
        isClickScrolling.current = false;
        scrollLockTimer.current = null;
        setActiveImmediate(resolveActiveSection(itemsRef.current));
      }, SCROLL_LOCK_MS);
    },
    [clearScrollLock, setActiveImmediate],
  );

  useEffect(() => {
    if (!items.length) return;

    lastScrollYRef.current = window.scrollY;
    setActiveImmediate(resolveActiveSection(items));

    const sectionElements = items
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(syncScrollTarget, {
      root: null,
      rootMargin: `-${SECTION_ACTIVATION_OFFSET}px 0px -35% 0px`,
      threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
    });

    sectionElements.forEach((element) => observer.observe(element));
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", syncScrollTarget, { passive: true });

    let rafId = 0;

    const drainMarkerQueue = (now: number) => {
      if (!isClickScrolling.current) {
        const currentItems = itemsRef.current;
        const pending = pendingIndicesRef.current;
        const stepInterval = getStepInterval();

        if (pending.length > 0 && now - lastStepAtRef.current >= stepInterval) {
          const nextIndex = pending.shift()!;
          displayIndexRef.current = nextIndex;
          lastStepAtRef.current = now;
          setActiveId(currentItems[nextIndex].id);
        } else if (pending.length === 0) {
          const targetIndex = indexForId(currentItems, targetActiveIdRef.current);
          if (targetIndex !== -1 && displayIndexRef.current !== targetIndex) {
            enqueueToTarget(targetIndex);
          }
        }
      }

      rafId = window.requestAnimationFrame(drainMarkerQueue);
    };

    rafId = window.requestAnimationFrame(drainMarkerQueue);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", syncScrollTarget);
      window.cancelAnimationFrame(rafId);
      if (scrollEndTimer.current !== null) {
        window.clearTimeout(scrollEndTimer.current);
      }
      clearScrollLock();
    };
  }, [items, syncScrollTarget, handleScroll, clearScrollLock, setActiveImmediate, enqueueToTarget, getStepInterval]);

  if (!items.length) return null;

  return (
    <nav className="case-study-toc" aria-label="Case study sections">
      <div className="case-study-toc-shell">
        <ol className="case-study-toc-list">
          {items.map(({ id, label }) => {
            const isActive = id === activeId;

            return (
              <li key={id} className="case-study-toc-item">
                <button
                  type="button"
                  className={`case-study-toc-row${isActive ? " case-study-toc-row--active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => scrollToSection(id)}
                >
                  <span className="case-study-toc-label">{label}</span>
                  <span className="case-study-toc-marker" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
