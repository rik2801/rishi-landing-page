"use client";

import { useEffect, useRef } from "react";

type AutoplayVideoProps = {
  src: string;
  className?: string;
};

function tryPlay(video: HTMLVideoElement) {
  if (video.paused) {
    void video.play().catch(() => {});
  }
}

export function AutoplayVideo({ src, className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    tryPlay(video);

    const onReady = () => tryPlay(video);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay(video);
      },
      { threshold: 0.2 },
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      preload="auto"
      autoPlay
      muted
      loop
      playsInline
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      draggable={false}
    />
  );
}
