"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function InitialLoader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let frameId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let completed = false;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const target = Math.min(94, Math.floor(elapsed / 18));

      setProgress((previous) => {
        if (completed) {
          return previous;
        }
        return target > previous ? target : previous;
      });

      if (!completed) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const complete = () => {
      completed = true;
      cancelAnimationFrame(frameId);
      setProgress(100);
      timeoutId = setTimeout(() => setIsVisible(false), 420);
    };

    frameId = requestAnimationFrame(tick);

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    return () => {
      completed = true;
      cancelAnimationFrame(frameId);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("load", complete);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--foreground)] text-[var(--paper)]"
        >
          <div className="w-[min(86vw,420px)] space-y-3">
            <p className="display text-4xl tracking-tight sm:text-5xl">Loading</p>
            <div className="h-[1px] w-full overflow-hidden bg-[rgba(255,255,255,0.22)]">
              <motion.div
                className="h-full bg-[var(--paper)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
              />
            </div>
            <p className="text-right text-sm tracking-[0.18em]">{progress}%</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
