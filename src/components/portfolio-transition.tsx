"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CINEMATIC_ENTER_KEY = "rik_cinematicEnter";
const CINEMATIC_REVEAL_MS = 750;

export function PortfolioTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let shouldReveal = false;

    try {
      if (sessionStorage.getItem(CINEMATIC_ENTER_KEY) === "1") {
        sessionStorage.removeItem(CINEMATIC_ENTER_KEY);
        shouldReveal = true;
      }
    } catch {
      /* ignore */
    }

    const pendingOverlay =
      shouldReveal || root.classList.contains("portfolio-cinematic-enter");

    if (!pendingOverlay) return;

    root.classList.remove("portfolio-cinematic-enter--revealing");
    root.classList.add("portfolio-cinematic-enter");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        root.classList.add("portfolio-cinematic-enter--revealing");
      });
    });

    const cleanup = window.setTimeout(() => {
      root.classList.remove("portfolio-cinematic-enter", "portfolio-cinematic-enter--revealing");
    }, CINEMATIC_REVEAL_MS + 80);

    return () => {
      window.clearTimeout(cleanup);
    };
  }, [pathname]);

  return null;
}

export function markCinematicEnter() {
  try {
    sessionStorage.setItem(CINEMATIC_ENTER_KEY, "1");
  } catch {
    /* ignore */
  }
}
