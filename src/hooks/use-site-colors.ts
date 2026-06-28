"use client";

import { useSyncExternalStore } from "react";

export type SiteColors = {
  bg: string;
  fg: string;
};

const SSR_COLORS: SiteColors = { bg: "#ffffff", fg: "#000000" };

let cachedSnapshot: SiteColors = SSR_COLORS;

function getSnapshot(): SiteColors {
  if (typeof window === "undefined") return SSR_COLORS;

  const styles = getComputedStyle(document.documentElement);
  const bg = styles.getPropertyValue("--bg").trim() || SSR_COLORS.bg;
  const fg = styles.getPropertyValue("--fg").trim() || SSR_COLORS.fg;

  if (cachedSnapshot.bg === bg && cachedSnapshot.fg === fg) {
    return cachedSnapshot;
  }

  cachedSnapshot = { bg, fg };
  return cachedSnapshot;
}

function getServerSnapshot(): SiteColors {
  return SSR_COLORS;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style", "class"],
  });

  window.addEventListener("storage", onStoreChange);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useSiteColors(): SiteColors {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
