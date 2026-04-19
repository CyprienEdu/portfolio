"use client";

import Lenis from "lenis";
import { useEffect } from "react";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.25,
    });

    let frameId = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
