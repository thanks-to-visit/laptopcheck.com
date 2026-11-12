import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LoadingLogo } from './LoadingLogo';
import { LoadingStatus } from './LoadingStatus';

export const LoadingScreen = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [stageIndex, setStageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    const wait = (ms) =>
      new Promise((resolve) => {
        const id = setTimeout(resolve, ms);
        timers.push(id);
      });

    const preloadLogo = () =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = '/icon.svg';
        const fallback = setTimeout(resolve, 260);
        timers.push(fallback);
      });

    const waitForDomReady = () =>
      new Promise((resolve) => {
        if (document.readyState === 'complete') {
          requestAnimationFrame(() => resolve());
          return;
        }
        const onLoad = () => {
          window.removeEventListener('load', onLoad);
          requestAnimationFrame(() => resolve());
        };
        window.addEventListener('load', onLoad, { once: true });
        const fallback = setTimeout(resolve, 260);
        timers.push(fallback);
      });

    const runSequence = async () => {
      // Stage 0: Preparing Dead Pixel Test
      await Promise.all([preloadLogo(), wait(260)]);
      if (cancelled) return;

      // Stage 1: Preparing Battery Report
      setStageIndex(1);
      const fontsReady = document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();
      await Promise.all([fontsReady, wait(260)]);
      if (cancelled) return;

      // Stage 2: Preparing Keyboard Test
      setStageIndex(2);
      await Promise.all([waitForDomReady(), wait(260)]);
      if (cancelled) return;

      // Stage 3: LaptopCheck is ready! (total ~1000ms)
      setStageIndex(3);
      await wait(220);
      if (cancelled) return;

      setIsExiting(true);
      await wait(shouldReduceMotion ? 0 : 150);
      if (!cancelled) {
        onComplete?.();
      }
    };

    // Safety guard to guarantee no infinite loading state
    const safetyTimeout = setTimeout(() => {
      if (!cancelled) {
        setStageIndex(3);
        setIsExiting(true);
        const finishId = setTimeout(() => {
          if (!cancelled) onComplete?.();
        }, shouldReduceMotion ? 0 : 150);
        timers.push(finishId);
      }
    }, 1500);
    timers.push(safetyTimeout);

    runSequence();

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: 'easeOut' }}
      className="fixed inset-0 z-50 min-h-screen w-full bg-[#FAFAFA] text-[#171717] flex flex-col items-center justify-center px-6 py-10"
      style={{
        fontFamily:
          "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      aria-label="Loading LaptopCheck"
    >
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 w-full max-w-md">
        <LoadingLogo />
        <LoadingStatus stageIndex={stageIndex} />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
