"use client";

import { useEffect } from "react";

function isProtectedMedia(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLImageElement ||
    target instanceof HTMLVideoElement ||
    target instanceof HTMLCanvasElement ||
    target instanceof HTMLPictureElement
  );
}

function protectMediaNodes(root: ParentNode = document) {
  root.querySelectorAll("img, video, canvas").forEach((node) => {
    node.setAttribute("draggable", "false");
  });
}

export function MediaGuard() {
  useEffect(() => {
    const onContextMenu = (event: MouseEvent) => {
      if (isProtectedMedia(event.target)) {
        event.preventDefault();
      }
    };

    const onDragStart = (event: DragEvent) => {
      if (isProtectedMedia(event.target)) {
        event.preventDefault();
      }
    };

    protectMediaNodes();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            protectMediaNodes(node);
          }
        });
      }
    });

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("dragstart", onDragStart, true);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
      observer.disconnect();
    };
  }, []);

  return null;
}
